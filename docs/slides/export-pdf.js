// Export one deck to PDF, driven by build.sh.
//
// Reads its inputs from the environment:
//   CHROME_CMD      path to the Chrome/Chromium binary
//   PDF_BASE_URL    URL of the deck's .-pdf-export.html on the local server
//   PDF_SLIDE_COUNT number of slides build.sh counted in the HTML
//   PDF_SLIDE_DIR   directory to write PDF output into
//
// Writes a single deck.pdf into PDF_SLIDE_DIR; build.sh merges everything it
// finds there (sorted) into the final <deck>.pdf. Uses reveal.js's ?print-pdf
// layout, which lays every slide out at once with a page break between them,
// so one Page.printToPDF call produces the whole deck. Drives Chrome over the
// DevTools protocol directly rather than depending on puppeteer.
const { spawn } = require("node:child_process");
const fs = require("node:fs/promises");
const path = require("node:path");

const chrome = process.env.CHROME_CMD;
const baseUrl = process.env.PDF_BASE_URL;
const slideCount = Number(process.env.PDF_SLIDE_COUNT);
const slideDir = process.env.PDF_SLIDE_DIR;

for (const [name, value] of Object.entries({ CHROME_CMD: chrome, PDF_BASE_URL: baseUrl, PDF_SLIDE_DIR: slideDir })) {
  if (!value) {
    console.error(`export-pdf.js: ${name} is not set`);
    process.exit(1);
  }
}

const remotePort = 40000 + Math.floor(Math.random() * 20000);
const userData = path.join(process.env.TMPDIR || "/tmp", `slides-chrome-${Date.now()}`);
// margin=0.1 is reveal's own config (accepted as a query param in print view);
// it leaves a white ring so content is not flush against the page edge.
const printUrl = `${baseUrl}?print-pdf&controls=false&progress=false&margin=0.1`;

let chromeStderr = "";
let chromeExit = null;

const browser = spawn(chrome, [
  "--headless=new",
  "--disable-gpu",
  "--disable-dev-shm-usage",
  "--hide-scrollbars",
  "--no-sandbox",
  "--no-first-run",
  "--no-default-browser-check",
  "--force-color-profile=srgb",
  `--user-data-dir=${userData}`,
  "--remote-debugging-address=127.0.0.1",
  `--remote-debugging-port=${remotePort}`,
  "--window-size=1280,720",
  // Load the deck via the command line rather than a CDP Page.navigate: these
  // decks are self-contained HTML several MB wide, and navigating into one can
  // leave the renderer too busy to answer the navigate call at all.
  printUrl,
], { stdio: ["ignore", "ignore", "pipe"] });

browser.stderr.on("data", (chunk) => {
  chromeStderr += chunk.toString();
  if (chromeStderr.length > 8000) chromeStderr = chromeStderr.slice(-8000);
});

browser.on("exit", (code, signal) => {
  chromeExit = { code, signal };
});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getJson(resource) {
  const response = await fetch(`http://127.0.0.1:${remotePort}${resource}`);
  if (!response.ok) throw new Error(`${resource}: ${response.status}`);
  return response.json();
}

async function waitForDebugger() {
  for (let attempt = 0; attempt < 300; attempt += 1) {
    if (chromeExit) {
      throw new Error(`Chrome exited before debugger was ready: ${JSON.stringify(chromeExit)}\n${chromeStderr}`);
    }
    try {
      await getJson("/json/version");
      return;
    } catch {
      await sleep(100);
    }
  }
  throw new Error(`Timed out waiting for Chrome remote debugger\n${chromeStderr}`);
}

function createClient(webSocketUrl) {
  const socket = new WebSocket(webSocketUrl);
  let id = 0;
  const pending = new Map();

  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    if (message.id && pending.has(message.id)) {
      const { resolve, reject } = pending.get(message.id);
      pending.delete(message.id);
      if (message.error) reject(new Error(JSON.stringify(message.error)));
      else resolve(message.result);
    }
  };
  const ready = new Promise((resolve) => { socket.onopen = resolve; });

  function send(method, params = {}, timeoutMs = 30000) {
    const messageId = ++id;
    socket.send(JSON.stringify({ id: messageId, method, params }));
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        pending.delete(messageId);
        reject(new Error(`CDP timeout (${timeoutMs}ms) waiting for: ${method}`));
      }, timeoutMs);
      pending.set(messageId, {
        resolve: (r) => { clearTimeout(timer); resolve(r); },
        reject: (e) => { clearTimeout(timer); reject(e); },
      });
    });
  }

  return { socket, ready, send };
}

async function evaluate(client, expression) {
  const result = await client.send("Runtime.evaluate", { expression, returnByValue: true });
  return result.result?.value;
}

async function main() {
  try {
    await waitForDebugger();
    const tabs = await getJson("/json/list");
    const tab = tabs.find((entry) => entry.type === "page") || tabs[0];

    const client = createClient(tab.webSocketDebuggerUrl);
    await Promise.race([
      client.ready,
      new Promise((_, reject) => setTimeout(() => reject(new Error("Timed out connecting to Chrome WebSocket")), 10000)),
    ]);
    await client.send("Page.enable");
    await client.send("Runtime.enable");
    await client.send("Emulation.setEmulatedMedia", { media: "screen" });

    // Chrome is already loading printUrl; re-issue it so the load restarts in
    // a warmed-up renderer. Deliberately not awaited: on a multi-MB deck the
    // renderer can stay too busy to ever answer this call, and its answer is
    // not needed -- the readiness poll below is the real signal.
    client.send("Page.navigate", { url: printUrl }, 5000).catch(() => undefined);

    // Each probe can fail while the renderer is busy parsing a large deck;
    // that is expected, so keep trying rather than bailing.
    let isReady = false;
    for (let attempt = 0; attempt < 240; attempt += 1) {
      await sleep(500);
      try {
        // Reveal reports ready before it wraps the slides in .pdf-page
        // elements, so wait for the wrappers, not just the deck.
        if (await evaluate(client, "document.readyState === 'complete' && !!window.Reveal && Reveal.isReady() && document.querySelectorAll('.pdf-page').length > 0")) {
          isReady = true;
          break;
        }
      } catch { /* keep polling */ }
    }
    if (!isReady) throw new Error(`Timed out waiting for reveal.js print layout\n${chromeStderr}`);

    // Reveal wraps each printed slide in a .pdf-page. Fragments can add pages
    // beyond the slide count, so this is a floor, not an equality check.
    const pages = await evaluate(client, "document.querySelectorAll('.pdf-page').length");
    if (Number.isFinite(slideCount) && slideCount > 0 && pages < slideCount) {
      throw new Error(`Print layout produced ${pages} pages for ${slideCount} slides`);
    }

    // A slide taller than the printed page makes reveal grow its .pdf-page to
    // a multiple of the page height, which prints as a header-only sheet plus
    // an unnumbered continuation sheet. Report the count so the build surfaces
    // it; the fix belongs in the deck/theme, not here.
    const split = await evaluate(client, `(() => {
      const heights = Array.from(document.querySelectorAll(".pdf-page"), (p) => p.getBoundingClientRect().height);
      if (!heights.length) return 0;
      const pageHeight = Math.min.apply(null, heights);
      return heights.filter((h) => h > pageHeight + 1).length;
    })()`);
    if (split) console.log(`  note: ${split} slide(s) overflow onto a second page`);

    // Reveal stamps a bare sequence number into each page's .slide-number-pdf;
    // rewrite to the "N of total" format the live deck's slide number uses.
    await evaluate(client, `(() => {
      const nums = document.querySelectorAll(".slide-number-pdf");
      nums.forEach((el, i) => { el.textContent = (i + 1) + " of " + nums.length; });
    })()`);
    await client.send("Runtime.evaluate", { expression: "document.fonts.ready", awaitPromise: true });
    await sleep(500); // buffer for late-loading images

    const pdf = await client.send("Page.printToPDF", {
      landscape: false,
      printBackground: true,
      preferCSSPageSize: false,
      marginTop: 0.25,
      marginBottom: 0.25,
      marginLeft: 0.25,
      marginRight: 0.25,
      paperWidth: 13.333333,
      paperHeight: 7.5,
      displayHeaderFooter: false,
      generateDocumentOutline: true,
    }, 120000);

    await fs.mkdir(slideDir, { recursive: true });
    await fs.writeFile(path.join(slideDir, "deck.pdf"), Buffer.from(pdf.data, "base64"));
    client.socket.close();
  } finally {
    browser.kill();
    await fs.rm(userData, { recursive: true, force: true }).catch(() => undefined);
  }
}

main().catch((error) => {
  browser.kill();
  console.error(error);
  process.exit(1);
});
