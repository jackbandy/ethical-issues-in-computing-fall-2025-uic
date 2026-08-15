-- NOTICE: This file created by an LLM coding system on 2026-08-15.

-- Pandoc Lua filter: expands an empty ```schedule code block into the course
-- schedule table, read from the same two files the website's schedule page
-- uses — docs/_includes/schedule.csv for the spine (weeks, dates, work due)
-- and docs/_includes/schedule-topics.md for what happens each day. Neither
-- table is ever written by hand.
--
-- Both files hold one entry per class meeting; the syllabus wants one row per
-- week, so days are merged and only top-level bullets survive (nested ones,
-- and everything under "### Sources", are detail that belongs on the website).

local ROOT = PANDOC_SCRIPT_FILE:gsub("[^/]*$", "")
local CSV = ROOT .. "../docs/_includes/schedule.csv"
local TOPICS = ROOT .. "../docs/_includes/schedule-topics.md"
-- Notes is a scratch column for the course author; nothing renders it.
local HEADERS = { "Unit", "Branch", "Week", "Date", "Station", "Due", "Notes" }
local OUT_HEADERS = { "Week", "Topic(s) / In-Class Activities", "Readings / Work Due" }
local WIDTHS = { 0.08, 0.52, 0.40 }

-- Splits one CSV line, honoring "quoted, fields" and "" escapes.
local function split_line(line)
  local fields, pos = {}, 1
  while pos <= #line + 1 do
    local value
    if line:sub(pos, pos) == '"' then
      value, pos = "", pos + 1
      while pos <= #line do
        local char = line:sub(pos, pos)
        if char ~= '"' then
          value, pos = value .. char, pos + 1
        elseif line:sub(pos + 1, pos + 1) == '"' then
          value, pos = value .. '"', pos + 2
        else
          pos = pos + 1
          break
        end
      end
      pos = pos + 1
    else
      local comma = line:find(",", pos, true)
      value = comma and line:sub(pos, comma - 1) or line:sub(pos)
      pos = comma and comma + 1 or #line + 2
    end
    fields[#fields + 1] = value
  end
  return fields
end

local function read_rows()
  local handle = io.open(CSV, "r")
  if not handle then
    error("schedule.lua: cannot read " .. CSV)
  end

  local rows, header = {}, nil
  for line in handle:lines() do
    line = line:gsub("^\239\187\191", ""):gsub("\r$", "")
    if line ~= "" then
      local fields = split_line(line)
      if not header then
        header = fields
        for i, name in ipairs(HEADERS) do
          if header[i] ~= name then
            error("schedule.lua: " .. CSV .. " header must be: " .. table.concat(HEADERS, ", "))
          end
        end
      else
        local row = {}
        for i, name in ipairs(HEADERS) do
          row[name] = fields[i] or ""
        end
        rows[#rows + 1] = row
      end
    end
  end
  handle:close()

  if #rows == 0 then
    error("schedule.lua: no schedule rows in " .. CSV)
  end
  return rows
end

-- "[Some Title](https://example.com)" -> "Some Title"; the PDF table has no
-- room for URLs and the website already carries the links.
local function unlink(text)
  text = text:gsub("%[([^%]]*)%]%b()", "%1")
  -- The 🔗 marks a link on the website; CMU Serif has no glyph for it.
  text = text:gsub("\240\159\148\151%s*", "")
  return text
end

-- Reads schedule-topics.md into topics["<week>|<day>"] = { "…", "…" }, keeping
-- only the top-level bullets of each section.
local function read_topics()
  local handle = io.open(TOPICS, "r")
  if not handle then
    error("schedule.lua: cannot read " .. TOPICS)
  end

  local sections, key, in_sources = {}, nil, false
  for line in handle:lines() do
    line = line:gsub("\r$", "")
    local week, day = line:match("^## Week (%d+), Day (%d+)")
    if week then
      key, in_sources = week .. "|" .. day, false
      sections[key] = {}
    elseif line:match("^###") then
      in_sources = true
    elseif key and not in_sources then
      local item = line:match("^%* (.+)$")
      if item then
        table.insert(sections[key], unlink(item))
      end
    end
  end
  handle:close()

  if next(sections) == nil then
    error("schedule.lua: no `## Week N, Day M` sections in " .. TOPICS)
  end
  return sections
end

local function weekly_rows(rows)
  local topics = read_topics()
  local weeks, order, day_of = {}, {}, {}

  -- Both meetings in a week often share a topic ("Book Presentations");
  -- list it once.
  local function add(list, items)
    for _, item in ipairs(items) do
      local seen = false
      for _, existing in ipairs(list) do
        seen = seen or existing == item
      end
      if item ~= "" and not seen then
        list[#list + 1] = item
      end
    end
  end

  for _, row in ipairs(rows) do
    local week = row.Week
    if not weeks[week] then
      weeks[week] = { week = week, topics = {}, due = {} }
      order[#order + 1] = week
    end
    day_of[week] = (day_of[week] or 0) + 1

    local key = week .. "|" .. day_of[week]
    if not topics[key] then
      error("schedule.lua: " .. TOPICS .. " has no `## Week " .. week ..
        ", Day " .. day_of[week] .. "` section")
    end
    add(weeks[week].topics, topics[key])
    add(weeks[week].due, { unlink(row.Due) })
  end

  local out = {}
  for _, week in ipairs(order) do
    local entry = weeks[week]
    out[#out + 1] = {
      entry.week,
      table.concat(entry.topics, "; "),
      table.concat(entry.due, "; "),
    }
  end
  return out
end

local function markdown_table(rows)
  local lines = {
    "| " .. table.concat(OUT_HEADERS, " | ") .. " |",
    "|:--|:--|:--|",
  }
  for _, row in ipairs(rows) do
    local cells = {}
    for i = 1, #OUT_HEADERS do
      cells[i] = (row[i] or ""):gsub("|", "\\|")
    end
    lines[#lines + 1] = "| " .. table.concat(cells, " | ") .. " |"
  end
  return table.concat(lines, "\n")
end

function CodeBlock(el)
  for _, class in ipairs(el.classes) do
    if class == "schedule" then
      local table_md = markdown_table(weekly_rows(read_rows()))
      local blocks = pandoc.read(table_md, "markdown").blocks
      local colspecs = {}
      for i, width in ipairs(WIDTHS) do
        colspecs[i] = { pandoc.AlignLeft, width }
      end
      blocks[1].colspecs = colspecs
      return blocks
    end
  end
  return nil
end
