import { expect, test, type Page } from '@playwright/test';

const navLabels = ['Use Cases', 'Guides', 'KI-Kompass', 'Team Lab', 'Community', 'Guidelines'];

async function noOverflow(page: Page) {
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
}

test('Guides overview distinguishes the available leadership guide from the planned personal entry', async ({ page }) => {
  const response = await page.goto('/guides');
  expect(response?.status()).toBe(200);
  await expect(page).toHaveTitle(/Guides/);
  await expect(page.getByRole('heading', { level: 1, name: 'Orientierung für deinen nächsten Schritt mit KI' })).toBeVisible();

  const available = page.locator('.guide-card-available');
  await expect(available).toContainText('Verfügbar');
  await expect(available.getByRole('heading', { name: 'KI im Team begleiten' })).toBeVisible();
  const leadership = available.getByRole('link', { name: 'Führungskräfte-Guide öffnen' });
  await expect(leadership).toHaveAttribute('href', '/leadership');
  await leadership.click();
  await expect(page).toHaveURL('/leadership');
  await expect(page.getByRole('heading', { level: 1, name: 'KI im Team begleiten' })).toBeVisible();

  await page.goto('/guides');
  const planned = page.locator('.guide-card-planned');
  await expect(planned).toContainText('Geplant');
  await expect(planned.getByRole('heading', { name: 'Persönlicher KI-Einstieg' })).toBeVisible();
  await expect(planned).toContainText('in Vorbereitung und noch nicht verfügbar');
  await expect(planned.getByRole('link')).toHaveCount(0);
  await expect(planned.getByRole('button')).toHaveCount(0);
});

test('homepage keeps exactly three featured cases and adds one compact guide entry directly below them', async ({ page }) => {
  await page.goto('/');
  const featured = page.getByRole('region', { name: 'Beliebte Einstiege in deinen Arbeitsalltag' });
  await expect(featured.locator('.use-case-card')).toHaveCount(3);
  await expect(featured.locator('.use-case-card h3')).toHaveText(['Interview mit KI vorbereiten', 'Projektstatus mit KI vorbereiten', 'KI Team Experiment']);

  const guideEntry = page.getByRole('region', { name: 'KI einführen und gemeinsam lernen' });
  await expect(guideEntry.getByRole('link', { name: 'Führungskräfte-Guide öffnen' })).toHaveAttribute('href', '/leadership');
  await expect(guideEntry.getByRole('link', { name: 'Alle Guides' })).toHaveAttribute('href', '/guides');
  const followsFeatured = await featured.evaluate((element, next) => Boolean(next && element.compareDocumentPosition(next) & Node.DOCUMENT_POSITION_FOLLOWING), await guideEntry.elementHandle());
  expect(followsFeatured).toBe(true);
  await expect(page.locator('.home-sections > section').nth(1)).toHaveClass(/hf-guide-entry/);
});

test('Guides navigation is keyboard accessible and active on the overview and leadership routes', async ({ page }) => {
  await page.goto('/');
  const navigation = page.getByRole('navigation', { name: 'Hauptnavigation' });
  await expect(navigation.getByRole('link')).toHaveText(navLabels);
  const guides = navigation.getByRole('link', { name: 'Guides', exact: true });
  await guides.focus();
  await expect(guides).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL('/guides');
  await expect(navigation.locator('[aria-current="page"]')).toHaveText('Guides');

  await page.goto('/leadership');
  await expect(navigation.locator('[aria-current="page"]')).toHaveText('Guides');
  await page.goto('/leadership/experiment');
  await expect(navigation.locator('[aria-current="page"]')).toHaveText('Guides');
});

test('header and Guides discovery fit all target widths without clipped or overlapping navigation', async ({ page }, testInfo) => {
  for (const width of [360, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const route of ['/', '/guides']) {
      await page.goto(route);
      await noOverflow(page);
      const navigation = page.getByRole('navigation', { name: 'Hauptnavigation' });
      await expect(navigation.getByRole('link')).toHaveText(navLabels);
      const boxes = await navigation.getByRole('link').evaluateAll((links) => links.map((link) => {
        const rect = link.getBoundingClientRect();
        return { left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom, width: rect.width, height: rect.height };
      }));
      for (let index = 0; index < boxes.length; index += 1) {
        expect(boxes[index].left).toBeGreaterThanOrEqual(0);
        expect(boxes[index].right).toBeLessThanOrEqual(width);
        expect(boxes[index].width).toBeGreaterThan(0);
        expect(boxes[index].height).toBeGreaterThanOrEqual(44);
        for (let other = index + 1; other < boxes.length; other += 1) {
          expect(boxes[index].right <= boxes[other].left || boxes[other].right <= boxes[index].left || boxes[index].bottom <= boxes[other].top || boxes[other].bottom <= boxes[index].top).toBe(true);
        }
      }
      for (const link of await navigation.getByRole('link').all()) {
        expect(await link.evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true);
      }
      await page.screenshot({ path: testInfo.outputPath(`${route === '/' ? 'home' : 'guides'}-${width}.png`), fullPage: true });
    }
  }
});
