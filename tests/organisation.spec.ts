import { expect, test, type Locator } from '@playwright/test';

const perspectives = ['Orientierung & Befähigung', 'Anwendung im Arbeitsalltag', 'Teams & Zusammenarbeit', 'Lernen & Austausch', 'Governance & Leitplanken'];

async function fitsWithoutOverlap(items: Locator, width: number) {
  const boxes = await items.evaluateAll((elements) => elements.map((element) => {
    const box = element.getBoundingClientRect();
    return { left: box.left, right: box.right, top: box.top, bottom: box.bottom };
  }));
  for (let i = 0; i < boxes.length; i++) {
    expect(boxes[i].left).toBeGreaterThanOrEqual(0);
    expect(boxes[i].right).toBeLessThanOrEqual(width);
    for (let j = i + 1; j < boxes.length; j++) {
      expect(boxes[i].right <= boxes[j].left || boxes[j].right <= boxes[i].left || boxes[i].bottom <= boxes[j].top || boxes[j].bottom <= boxes[i].top).toBe(true);
    }
  }
  return boxes;
}

test('Standortbild gives qualitative fictional orientation with three observations, five perspectives and three attention areas', async ({ page }) => {
  const response = await page.goto('/organisation');
  expect(response?.status()).toBe(200);
  await expect(page).toHaveTitle('AI Standortbild | AI Enablement Hub');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('AI Standortbild');
  await expect(page.getByText('Stand: Oktober 2026 · Fiktive Beispieldaten', { exact: true })).toBeVisible();
  await expect(page.locator('main')).toContainText('Es ist keine vollständige Reifegradmessung, sondern eine qualitative Orientierung.');
  await expect(page.locator('main h2')).toHaveText(['Was wir aktuell sehen', 'Fünf Perspektiven auf unsere aktuelle Situation', 'Was braucht jetzt Aufmerksamkeit?']);
  await expect(page.locator('.organisation-observations article')).toHaveCount(3);
  await expect(page.locator('.organisation-observations h3')).toHaveText(['Konkrete Anfänge', 'Lernen wird sichtbar', 'Noch offene Fragen']);
  await expect(page.locator('.organisation-perspective')).toHaveCount(5);
  await expect(page.locator('.organisation-perspective h3')).toHaveText(perspectives);
  for (const card of await page.locator('.organisation-perspective').all()) {
    await expect(card.locator('dt')).toHaveText(['Beobachtung', 'Offene Frage']);
    await expect(card.locator('dd')).toHaveCount(2);
    await expect(card.locator('dd').first()).not.toBeEmpty();
    await expect(card.locator('dd').last()).toHaveText(/\?$/);
    await expect(card.locator('details')).not.toHaveAttribute('open');
  }
  await expect(page.locator('.organisation-attention li')).toHaveCount(3);
  await expect(page.locator('.organisation-number')).toHaveText(['01', '02', '03']);
  await expect(page.locator('.organisation-number:not([aria-hidden="true"])')).toHaveCount(0);
  await expect(page.locator('.organisation-attention h3')).toHaveText(['Erfahrungen zwischen Teams nutzbarer machen', 'Datenleitplanken konkreter machen', 'Geeignete Use Cases gezielt weiter erproben']);
  await expect(page.locator('main progress, main meter, main [role="progressbar"], main [role="meter"]')).toHaveCount(0);
  await expect(page.locator('main')).not.toContainText(/%|Score|Reifegradstufe|Priorität|Rangliste|Schweregrad|Produktivitätssteigerung/);
});

test('Community and homepage link to Standortbild without adding it to primary navigation', async ({ page }) => {
  await page.goto('/community');
  await expect(page.locator('.community-card')).toHaveCount(7);
  const entry = page.getByRole('region', { name: 'Was lernen wir daraus als Organisation?' });
  await expect(entry.locator('.eyebrow')).toHaveText('ORGANISATION');
  expect(await entry.evaluate((element) => element.previousElementSibling?.className)).toBe('community-pattern');
  const link = entry.getByRole('link', { name: 'Standortbild ansehen', exact: true });
  await expect(link).toHaveAttribute('href', '/organisation');
  await link.focus(); await page.keyboard.press('Enter');
  await expect(page).toHaveURL('/organisation');
  await expect(page.getByRole('navigation', { name: 'Hauptnavigation' }).getByRole('link')).toHaveText(['Use Cases', 'Team Lab', 'Community', 'Guidelines']);
  await expect(page.getByRole('banner').getByRole('link', { name: 'Hilfe', exact: true })).toHaveAttribute('href', '/help');
  await expect(page.getByRole('banner').locator('a[href="/organisation"]')).toHaveCount(0);
  await page.goto('/');
  await expect(page.getByRole('region', { name: 'Wo stehen wir mit AI?' }).getByRole('link', { name: 'Zum AI Standortbild' })).toHaveAttribute('href', '/organisation');
  await expect(page.locator('.use-case-card')).toHaveCount(3);
});

test('evidence disclosures work by keyboard and reference existing Hub objects with working anchors', async ({ page }) => {
  await page.goto('/organisation');
  const destinations = new Set<string>();
  for (const details of await page.locator('.organisation-evidence').all()) {
    const summary = details.locator('summary');
    await summary.focus(); await page.keyboard.press('Enter');
    await expect(details).toHaveAttribute('open');
    expect(await summary.evaluate((element) => getComputedStyle(element).outlineStyle)).not.toBe('none');
    const links = details.getByRole('link');
    expect(await links.count()).toBeGreaterThanOrEqual(2);
    expect(await links.count()).toBeLessThanOrEqual(3);
    await page.keyboard.press('Tab'); await expect(links.first()).toBeFocused();
    for (const link of await links.all()) destinations.add((await link.getAttribute('href'))!);
    await summary.focus(); await page.keyboard.press('Space');
    await expect(details).not.toHaveAttribute('open');
  }
  for (const href of destinations) {
    await page.goto('/organisation');
    const response = await page.goto(href);
    expect(response?.status()).toBe(200);
    const anchor = new URL(page.url()).hash;
    if (anchor) await expect(page.locator(`[id="${anchor.slice(1)}"]`)).toBeVisible();
    else await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  }
});

test('Standortbild fits all requested widths with native disclosures and no overlap', async ({ page }, testInfo) => {
  for (const width of [360, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto('/organisation');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await fitsWithoutOverlap(page.locator('.organisation-observations article'), width);
    const boxes = await fitsWithoutOverlap(page.locator('.organisation-perspective'), width);
    if (width === 360) expect(new Set(boxes.map((box) => box.left)).size).toBe(1);
    if (width === 1440) expect(new Set(boxes.slice(0, 3).map((box) => box.top)).size).toBe(1);
    await fitsWithoutOverlap(page.locator('.organisation-attention li'), width);
    await page.screenshot({ path: testInfo.outputPath(`organisation-${width}.png`), fullPage: true });
    for (const summary of await page.locator('.organisation-evidence summary').all()) {
      await summary.focus(); await page.keyboard.press('Enter');
      expect((await summary.boundingBox())!.height).toBeGreaterThanOrEqual(44);
    }
    await fitsWithoutOverlap(page.locator('.organisation-perspective'), width);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({ path: testInfo.outputPath(`organisation-evidence-${width}.png`), fullPage: true });
    await page.goto('/community');
    const entry = page.locator('.community-organisation');
    await entry.scrollIntoViewIfNeeded();
    await expect(entry.getByRole('link', { name: 'Standortbild ansehen' })).toBeInViewport();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
});

test('organisation has no data submission, external calls or persistence', async ({ page }) => {
  const external: string[] = [], mutations: string[] = [], errors: string[] = [];
  page.on('request', (request) => {
    if (new URL(request.url()).hostname !== '127.0.0.1') external.push(request.url());
    if (!['GET', 'HEAD'].includes(request.method())) mutations.push(request.url());
  });
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/organisation');
  for (const summary of await page.locator('summary').all()) await summary.click();
  await expect(page.locator('main input, main form, main textarea, main select')).toHaveCount(0);
  expect(await page.evaluate(() => Object.keys(localStorage))).toEqual([]);
  expect(await page.evaluate(() => Object.keys(sessionStorage))).toEqual([]);
  expect(external).toEqual([]); expect(mutations).toEqual([]); expect(errors).toEqual([]);
});
