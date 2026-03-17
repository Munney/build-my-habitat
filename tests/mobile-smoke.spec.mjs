import { test, expect, devices } from '@playwright/test';

const urls = {
  bettaSummary:
    'http://localhost:3000/summary/betta?enclosure=10g&filtration=sponge&substrate=gravel&heating=50w,thermometer&decor=live_easy,betta_log&care=conditioner,testkit',
  geckoSummary:
    'http://localhost:3000/summary/leopard-gecko?enclosure=40g&substrate=slate&heating=halogen_75w,thermostat,uvb_24&hides=warmhide,coolhide,humidhide&supplements=calcium_no_d3,multivitamin',
};

function attachConsoleCapture(page, testInfo) {
  const consoleEvents = [];
  const pageErrors = [];
  const requestFailures = [];

  page.on('console', (msg) => {
    consoleEvents.push({
      type: msg.type(),
      text: msg.text(),
      location: msg.location(),
    });
  });
  page.on('pageerror', (err) => {
    pageErrors.push(String(err));
  });
  page.on('requestfailed', (req) => {
    requestFailures.push({
      url: req.url(),
      failure: req.failure()?.errorText,
      method: req.method(),
      resourceType: req.resourceType(),
    });
  });

  async function flush(label) {
    const payload = {
      label,
      pageErrors,
      requestFailures,
      console: consoleEvents.filter((e) => e.type === 'error' || e.type === 'warning'),
    };
    await testInfo.attach(`${label}-console.json`, {
      body: Buffer.from(JSON.stringify(payload, null, 2)),
      contentType: 'application/json',
    });
  }

  return { flush, consoleEvents, pageErrors, requestFailures };
}

async function assertNoHorizontalScroll(page, testInfo, label) {
  const hasHorizontalScroll = await page.evaluate(() => {
    const doc = document.documentElement;
    return doc.scrollWidth > doc.clientWidth + 1;
  });
  await testInfo.attach(`${label}-hscroll.txt`, {
    body: Buffer.from(String(hasHorizontalScroll)),
    contentType: 'text/plain',
  });
  expect(hasHorizontalScroll, 'page should not horizontally scroll on mobile').toBeFalsy();
}

async function screenshot(page, testInfo, name) {
  await testInfo.attach(`${name}.png`, {
    body: await page.screenshot({ fullPage: true }),
    contentType: 'image/png',
  });
}

test.describe('Mobile smoke (iPhone 12)', () => {
  test.use({
    ...devices['iPhone 12'],
  });

  test('Betta summary: CTA + rate link works', async ({ page }, testInfo) => {
    const capture = attachConsoleCapture(page, testInfo);

    await page.goto(urls.bettaSummary, { waitUntil: 'networkidle' });
    await expect(page).toHaveURL(/\/summary\/betta/i);
    await screenshot(page, testInfo, 'betta-summary');
    await assertNoHorizontalScroll(page, testInfo, 'betta-summary');

    // CTA expectations (coarse): price text present, Amazon link/button visible, safety score visible.
    await expect(page.getByText(/\$/).first()).toBeVisible();
    const amazonCta =
      page.getByRole('link', { name: /amazon/i }).first() ??
      page.locator('a[href*="amazon."] , a[href*="amzn."] , a[href*="amazon.com"]').first();
    await expect(amazonCta).toBeVisible();
    await expect(page.getByText(/safety/i).first()).toBeVisible();

    // New header control
    const rateControl = page
      .getByRole('link', { name: /rate\s*&\s*share\s*score/i })
      .or(page.getByRole('button', { name: /rate\s*&\s*share\s*score/i }));
    await expect(rateControl).toBeVisible();
    await rateControl.click();
    await expect(page).toHaveURL(/\/rate\/betta\//i);
    await screenshot(page, testInfo, 'betta-rate');

    await capture.flush('betta');
  });

  test('Betta rate: share button no-crash, summary link returns with params', async ({ page }, testInfo) => {
    const capture = attachConsoleCapture(page, testInfo);

    // Navigate via summary->rate so query/slug shapes match production flow.
    await page.goto(urls.bettaSummary, { waitUntil: 'networkidle' });
    const rateControl = page
      .getByRole('link', { name: /rate\s*&\s*share\s*score/i })
      .or(page.getByRole('button', { name: /rate\s*&\s*share\s*score/i }));
    await rateControl.click();
    await expect(page).toHaveURL(/\/rate\/betta\//i);

    await screenshot(page, testInfo, 'betta-rate-entry');
    await assertNoHorizontalScroll(page, testInfo, 'betta-rate');

    // Scorecard should exist (coarse).
    await expect(page.getByText(/score/i).first()).toBeVisible();

    // Share build should not crash even if clipboard fails.
    const shareBtn = page.getByRole('button', { name: /share build/i });
    await expect(shareBtn).toBeVisible();
    await shareBtn.click();
    await page.waitForTimeout(250);
    expect(capture.pageErrors, 'No uncaught page errors after tapping Share build').toEqual([]);

    const backLink = page.getByRole('link', { name: /view full summary.*cart/i });
    await expect(backLink).toBeVisible();
    await backLink.click();
    await expect(page).toHaveURL(new RegExp(String.raw`/summary/betta\\?`));
    await expect(page).toHaveURL(/enclosure=10g/i);
    await screenshot(page, testInfo, 'betta-summary-return');

    await capture.flush('betta-rate');
  });

  test('Gecko summary: no export card, rate link works', async ({ page }, testInfo) => {
    const capture = attachConsoleCapture(page, testInfo);

    await page.goto(urls.geckoSummary, { waitUntil: 'networkidle' });
    await expect(page).toHaveURL(/\/summary\/leopard-gecko/i);
    await screenshot(page, testInfo, 'gecko-summary');
    await assertNoHorizontalScroll(page, testInfo, 'gecko-summary');

    // "Export Your Build" should be gone.
    await expect(page.getByText(/export your build/i)).toHaveCount(0);

    // CTA + safety (coarse).
    await expect(page.getByText(/\$/).first()).toBeVisible();
    await expect(page.getByText(/safety/i).first()).toBeVisible();

    const rateControl = page
      .getByRole('link', { name: /rate\s*&\s*share\s*score/i })
      .or(page.getByRole('button', { name: /rate\s*&\s*share\s*score/i }));
    await expect(rateControl).toBeVisible();
    await rateControl.click();
    await expect(page).toHaveURL(/\/rate\/leopard-gecko\//i);
    await screenshot(page, testInfo, 'gecko-rate');

    await capture.flush('gecko');
  });

  test('Gecko rate: share button no-crash, summary link returns with params', async ({ page }, testInfo) => {
    const capture = attachConsoleCapture(page, testInfo);

    await page.goto(urls.geckoSummary, { waitUntil: 'networkidle' });
    const rateControl = page
      .getByRole('link', { name: /rate\s*&\s*share\s*score/i })
      .or(page.getByRole('button', { name: /rate\s*&\s*share\s*score/i }));
    await rateControl.click();
    await expect(page).toHaveURL(/\/rate\/leopard-gecko\//i);

    await screenshot(page, testInfo, 'gecko-rate-entry');
    await assertNoHorizontalScroll(page, testInfo, 'gecko-rate');

    await expect(page.getByText(/score/i).first()).toBeVisible();

    const shareBtn = page.getByRole('button', { name: /share build/i });
    await expect(shareBtn).toBeVisible();
    await shareBtn.click();
    await page.waitForTimeout(250);
    expect(capture.pageErrors, 'No uncaught page errors after tapping Share build').toEqual([]);

    const backLink = page.getByRole('link', { name: /view full summary.*cart/i });
    await expect(backLink).toBeVisible();
    await backLink.click();
    await expect(page).toHaveURL(new RegExp(String.raw`/summary/leopard-gecko\\?`));
    await expect(page).toHaveURL(/enclosure=40g/i);
    await screenshot(page, testInfo, 'gecko-summary-return');

    await capture.flush('gecko-rate');
  });
});

