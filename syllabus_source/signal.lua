-- NOTICE: This file created by an LLM coding system on 2026-08-17.

-- Pandoc Lua filter: lays out the CTA signal blocks in the "Use of Generative
-- AI/LLMs" section as drawing-beside-rule, the way a signal reads trackside —
-- you see the aspect first, then what it tells you to do. The HTML build gets
-- this from CSS flexbox (template.html); LaTeX has no such thing, so the div
-- is rewritten here into the \signalaspect* macros defined in template.tex.
--
-- The image stays a pandoc Image element rather than a raw \includegraphics so
-- that pandoc still converts the SVG to PDF on its way to xelatex.

local SIGNAL_WIDTH = "1.1in"

-- Everything in the block except the image paragraph, which is placed on its
-- own in the left-hand minipage.
local function body_blocks(div)
  local blocks = pandoc.List({})
  for _, block in ipairs(div.content) do
    local has_image = false
    pandoc.walk_block(block, { Image = function() has_image = true end })
    if has_image then
      -- skip
    elseif block.t == "Div" then
      blocks:extend(block.content)
    else
      blocks:insert(block)
    end
  end
  return blocks
end

function Div(el)
  if not (FORMAT:match("latex") and el.classes:includes("signal-aspect")) then
    return nil
  end

  local image = nil
  pandoc.walk_block(el, {
    Image = function(img)
      image = image or img
    end,
  })
  if not image then
    error("signal.lua: .signal-aspect block has no image")
  end
  image.attributes.width = SIGNAL_WIDTH

  local out = pandoc.List({
    pandoc.RawBlock("latex", "\\signalaspectstart"),
    pandoc.Plain({ image }),
    pandoc.RawBlock("latex", "\\signalaspectmid"),
  })
  out:extend(body_blocks(el))
  out:insert(pandoc.RawBlock("latex", "\\signalaspectend"))
  return out
end
