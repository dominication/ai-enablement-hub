import { expect, test, type Locator } from '@playwright/test';

const entries = [
  { route: '/use-cases/interview-vorbereiten', task: 'Was du hier machst', result: 'Was du am Ende hast', ai: 'AI unterstützt', human: 'Du entscheidest', cta: 'Experiment starten', guard: 'Dieser Use Case verarbeitet Personendaten', metadata: '.recruiting-meta', note: '.recruiting-start p', items: 8 },
  { route: '/use-cases/projektstatus-vorbereiten', task: 'Was du hier machst', result: 'Was du am Ende hast', ai: 'AI unterstützt', human: 'Du entscheidest', cta: 'Workflow ausprobieren', guard: 'Projektinformationen bewusst verwenden', metadata: '.pm-metadata', note: '.pm-start p', items: 9 },
  { route: '/team-lab', task: 'Was ihr hier macht', result: 'Was ihr am Ende habt', ai: 'AI kann unterstützen bei', human: 'Ihr entscheidet gemeinsam', cta: 'Team Lab starten', guard: 'Nicht das Tool steht am Anfang', metadata: '.tl-meta', note: '.hub-journey-start > .tl-small', items: 6 },
];

async function expectBefore(first: Locator, second: Locator) {
  const next = await second.elementHandle();
  expect(await first.evaluate((element, following) => Boolean(following && element.compareDocumentPosition(following) & Node.DOCUMENT_POSITION_FOLLOWING), next)).toBe(true);
  const firstBox = await first.boundingBox();
  const secondBox = await second.boundingBox();
  expect(firstBox).not.toBeNull();
  expect(secondBox).not.toBeNull();
  expect(firstBox!.y + firstBox!.height).toBeLessThanOrEqual(secondBox!.y);
}

test('navigation reflects available features and retains active routes', async ({ page }) => {
  await page.goto('/');
  const header = page.getByRole('banner');
  await expect(header.getByRole('navigation').getByRole('link')).toHaveText(['Use Cases', 'Team Lab', 'Community', 'Guidelines']);
  await expect(header.getByRole('navigation').getByRole('link', { name: 'Learnings', exact: true })).toHaveCount(0);
  await expect(header.getByText('ML', { exact: true })).toHaveCount(0);
  await expect(header.getByRole('img', { name: 'Demo-Profil' })).toHaveCount(0);
  for (const [label, route] of [['Use Cases', '/use-cases'], ['Team Lab', '/team-lab'], ['Community', '/community'], ['Guidelines', '/guidelines'], ['Hilfe', '/help']]) {
    const link = header.getByRole('link', { name: label, exact: true });
    await expect(link).toHaveAttribute('href', route);
    await link.focus(); await page.keyboard.press('Enter');
    await expect(page).toHaveURL(route);
    await expect(link).toHaveAttribute('aria-current', 'page');
    await expect(header.locator('[aria-current="page"]')).toHaveCount(1);
  }
  await page.goto('/use-cases/projektstatus-vorbereiten/experiment');
  await expect(header.getByRole('link', { name: 'Use Cases', exact: true })).toHaveAttribute('aria-current', 'page');
});

test('each featured journey has a concise benefit and its original destination', async ({ page }) => {
  await page.goto('/');
  const cards = page.locator('.use-case-card');
  await expect(cards).toHaveCount(3);
  await expect(cards.locator('.hf-benefit')).toHaveText([
    'Bessere Fragen, strukturierte Vorbereitung und gezieltere Gespräche.',
    'Projektinformationen strukturieren und einen klaren Statusentwurf vorbereiten.',
    'Gemeinsam Ideen testen und herausfinden, was für eure Arbeit funktioniert.',
  ]);
  for (let index = 0; index < entries.length; index++) {
    const link = cards.nth(index).locator('.hf-primary');
    await expect(link).toHaveAttribute('href', entries[index].route);
    await link.click(); await expect(page).toHaveURL(entries[index].route);
    await page.goto('/');
  }
});

test('entry expectations, responsibility and original experiment destinations stay predictable', async ({ page }) => {
  for (const entry of entries) {
    await page.goto(entry.route);
    for (const name of [entry.task, entry.result, entry.ai, entry.human, entry.guard]) {
      await expect(page.getByRole('heading', { name, exact: true })).toBeVisible();
    }
    const back = page.getByRole('link', { name: '← Zurück zu den Use Cases', exact: true });
    if (entry.route === '/team-lab') {
      await expect(page.locator('main')).not.toContainText('Zurück zu den Use Cases');
      await expect(page.locator('.tl-detail .back-link')).toHaveCount(0);
    } else {
      await expect(back).toBeVisible();
      await expect(back).toHaveAttribute('href', '/use-cases');
    }
    await expect(page.locator('.entry-summary section p')).toHaveCount(2);
    await expect(page.locator('.entry-responsibility li')).toHaveCount(entry.items);
    if (entry.route !== '/team-lab') {
      await expect(page.getByRole('region', { name: 'Veränderte Arbeitsweise' })).toBeVisible();
      await expect(page.locator('.journey-workflow li')).toHaveCount(5);
    }
    const start = page.getByRole('link', { name: entry.cta, exact: true });
    await expect(start).toHaveAttribute('href', `${entry.route}/experiment`);
    await start.click(); await expect(page).toHaveURL(`${entry.route}/experiment`);
  }
});

test('header and entry pages fit all requested widths with usable actions', async ({ page }, testInfo) => {
  for (const width of [360, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const entry of entries) {
      await page.goto(entry.route);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      const links = page.getByRole('banner').getByRole('link');
      const boxes = await links.evaluateAll((elements) => elements.map((el) => {
        const r = el.getBoundingClientRect();
        return { left: r.left, right: r.right, top: r.top, bottom: r.bottom, width: r.width };
      }));
      for (let i = 0; i < boxes.length; i++) {
        expect(boxes[i].left).toBeGreaterThanOrEqual(0);
        expect(boxes[i].right).toBeLessThanOrEqual(width);
        expect(boxes[i].width).toBeGreaterThan(0);
        for (let j = i + 1; j < boxes.length; j++) {
          expect(boxes[i].right <= boxes[j].left || boxes[j].right <= boxes[i].left || boxes[i].bottom <= boxes[j].top || boxes[j].bottom <= boxes[i].top).toBe(true);
        }
      }
      await expect(page.getByRole('banner').getByText('Hilfe', { exact: true })).toBeVisible();
      const cta = page.getByRole('link', { name: entry.cta, exact: true });
      const summary = page.locator('.entry-summary');
      const metadata = page.locator(entry.metadata);
      const note = page.locator(entry.note);
      const responsibility = page.locator('.entry-responsibility');
      if (entry.route !== '/team-lab') await expectBefore(metadata, summary);
      else await expectBefore(summary, metadata);
      await expectBefore(metadata, cta);
      await expectBefore(cta, responsibility);
      await expectBefore(note, responsibility);
      await expectBefore(responsibility, page.getByRole('heading', { name: entry.guard, exact: true }));
      await expect(responsibility.getByRole('list')).toHaveCount(2);
      await expect(responsibility.getByRole('listitem')).toHaveCount(entry.items);
      await cta.scrollIntoViewIfNeeded(); await expect(cta).toBeInViewport();
      expect((await cta.boundingBox())?.height).toBeGreaterThanOrEqual(44);
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.screenshot({ path: testInfo.outputPath(`${entry.route.split('/').pop()}-${width}.png`), fullPage: true });
    }
  }
});
