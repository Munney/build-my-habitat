import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { chromium, devices } from "playwright";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const OUT_DIR = process.env.OUT_DIR || "artifacts/mobile-smoke";

const CASES = [
  {
    name: "betta",
    startPath:
      "/summary/betta?exp=experienced&enclosure=10g&filtration=hob&substrate=aquasoil&heating=100w%2Cthermometer&decor=live_easy%2Cbetta_log%2Cdriftwood&care=conditioner%2Cbacteria%2Ctestkit",
  },
  {
    name: "leopard-gecko",
    startPath:
      "/summary/leopard-gecko?exp=experienced&enclosure=40g&substrate=bioactive_bioactive_terra_sahara_18_qts_&heating=halogen_75w%2Cthermostat%2Cuvb_24&hides=warmhide%2Ccoolhide%2Chumidhide%2Ccorkbark_cork_bark_flat_4_pcs%2Cbranches_climbing_branches_4_pcs_14_16_&supplements=calcium_no_d3%2Cmultivitamin",
  },
];

function joinUrl(base, p) {
  return new URL(p, base).toString();
}

function safeFilePart(s) {
  return String(s)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function measureOverflow(page) {
  return await page.evaluate(() => {
    const doc = document.documentElement;
    const body = document.body;
    const scrollWidth = Math.max(
      doc?.scrollWidth || 0,
      body?.scrollWidth || 0,
      doc?.offsetWidth || 0,
      body?.offsetWidth || 0
    );
    const clientWidth = doc?.clientWidth || 0;
    const overflowPx = Math.max(0, scrollWidth - clientWidth);
    const hasOverflow = overflowPx > 2;

    const offenders = [];
    if (hasOverflow) {
      const max = 12;
      const elements = Array.from(document.querySelectorAll("*"));
      for (const el of elements) {
        if (offenders.length >= max) break;
        const rect = el.getBoundingClientRect?.();
        if (!rect) continue;
        if (rect.width <= 0 || rect.height <= 0) continue;

        const right = rect.left + rect.width;
        if (right > clientWidth + 2 || rect.left < -2) {
          const style = window.getComputedStyle(el);
          offenders.push({
            tag: el.tagName?.toLowerCase(),
            id: el.id || null,
            className: el.className ? String(el.className).slice(0, 120) : null,
            left: Math.round(rect.left),
            width: Math.round(rect.width),
            right: Math.round(right),
            overflowX: style?.overflowX || null,
            position: style?.position || null,
            display: style?.display || null,
          });
        }
      }
    }

    return {
      clientWidth,
      scrollWidth,
      overflowPx,
      hasOverflow,
      offenders,
      userAgent: navigator.userAgent,
    };
  });
}

async function runCase(context, testCase) {
  const page = await context.newPage();

  const consoleErrors = [];
  const pageErrors = [];

  page.on("console", (msg) => {
    if (msg.type() === "error") {
      consoleErrors.push({
        type: msg.type(),
        text: msg.text(),
        location: msg.location?.() || null,
      });
    }
  });
  page.on("pageerror", (err) => {
    pageErrors.push({ name: err?.name || "Error", message: err?.message || String(err) });
  });

  const startUrl = joinUrl(BASE_URL, testCase.startPath);

  const result = {
    name: testCase.name,
    startUrl,
    rateUrl: null,
    rendered: false,
    overflow: null,
    consoleErrors,
    pageErrors,
    screenshots: [],
  };

  await page.goto(startUrl, { waitUntil: "domcontentloaded", timeout: 45_000 });

  const rateLink = page.getByRole("link", { name: /rate\s*&\s*share\s*score/i });
  await rateLink.waitFor({ state: "visible", timeout: 20_000 });

  await Promise.all([
    page.waitForURL(/\/rate\/[^/]+\/.+/i, { timeout: 20_000 }),
    rateLink.click(),
  ]);

  result.rateUrl = page.url();

  // Basic render verification
  const h1 = page.getByRole("heading", { level: 1 });
  await h1.waitFor({ state: "visible", timeout: 20_000 });
  const titleText = (await h1.textContent()) || "";

  if (/invalid or expired/i.test(titleText)) {
    result.rendered = false;
  } else if (/rate my/i.test(titleText)) {
    result.rendered = true;
  } else {
    // Fallback: page has main content, but heading text is unexpected
    const main = page.locator("main");
    result.rendered = (await main.count()) > 0;
  }

  result.overflow = await measureOverflow(page);

  // Screenshot after navigation & layout settles a bit
  await page.waitForTimeout(500);
  const shotPath = path.join(
    OUT_DIR,
    `${safeFilePart(testCase.name)}-rate.png`
  );
  await page.screenshot({ path: shotPath, fullPage: true });
  result.screenshots.push(shotPath);

  await page.close();
  return result;
}

async function main() {
  await ensureDir(OUT_DIR);

  const device = devices["iPhone 13"] || devices["iPhone 12"];
  if (!device) {
    throw new Error("Playwright devices not found (expected iPhone 12/13).");
  }

  const browser = await chromium.launch({
    headless: true,
  });

  const context = await browser.newContext({
    ...device,
  });

  const results = [];
  for (const c of CASES) {
    results.push(await runCase(context, c));
  }

  await context.close();
  await browser.close();

  const summary = {
    baseUrl: BASE_URL,
    device: device.name || "iPhone",
    outDir: OUT_DIR,
    timestamp: new Date().toISOString(),
    results,
  };

  // Print machine-readable output for CI/log scanning
  // eslint-disable-next-line no-console
  console.log(JSON.stringify(summary, null, 2));

  const anyNotRendered = results.some((r) => !r.rendered);
  const anyOverflow = results.some((r) => r.overflow?.hasOverflow);
  const anyConsoleErrors = results.some((r) => (r.consoleErrors || []).length > 0);
  const anyPageErrors = results.some((r) => (r.pageErrors || []).length > 0);

  if (anyNotRendered || anyOverflow || anyConsoleErrors || anyPageErrors) {
    process.exitCode = 2;
  }
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exitCode = 1;
});

