import { expect, test, type Page } from '@playwright/test';

const migratedRoutes = [
  ['/team-lab', '.hub-team-detail'],
  ['/team-lab/experiment', '.hub-team-workshop'],
  ['/community', '.hub-community'],
  ['/guidelines', '.hub-guidelines'],
  ['/organisation', '.hub-organisation'],
  ['/help', '.hub-help'],
  ['/use-cases/recherche-strukturieren', '.hub-use-case-orientation'],
] as const;

async function expectNoOverflow(page: Page) {
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
}

test('remaining product areas use the shared Hub UI at all review widths', async ({ page }) => {
  const externalRequests: string[] = [];
  page.on('request', (request) => {
    const url = new URL(request.url());
    if (!['localhost', '127.0.0.1'].includes(url.hostname)) externalRequests.push(request.url());
  });

  for (const width of [360, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const [route, root] of migratedRoutes) {
      await page.goto(route);
      await expect(page.locator(root)).toBeVisible();
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      await expectNoOverflow(page);
    }
  }

  expect(externalRequests).toEqual([]);
});

test('all orientation pages share the migrated responsibility and guidance patterns', async ({ page }) => {
  for (const route of [
    '/use-cases/interviewnotizen-strukturieren',
    '/use-cases/projektrisiken-strukturieren',
    '/use-cases/meeting-ergebnisse-aufbereiten',
    '/use-cases/workshop-vorbereiten',
    '/use-cases/komplexe-inhalte-verstaendlich-machen',
    '/use-cases/praesentation-strukturieren',
    '/use-cases/dokumente-vergleichen',
    '/use-cases/recherche-strukturieren',
    '/use-cases/entscheidungsoptionen-strukturieren',
  ]) {
    await page.goto(route);
    await expect(page.locator('.hub-use-case-orientation')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Wobei AI unterstützen kann' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Was bei dir bleibt' })).toBeVisible();
    await expect(page.locator('.uc-overview-considerations .text-link')).toHaveAttribute('href', '/guidelines');
  }
});
