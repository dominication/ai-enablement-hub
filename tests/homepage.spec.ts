import { expect, test, type Page } from '@playwright/test';
import { homepageLearnings } from '../src/data/homepage';

const headline = 'Finde heraus, wie AI deine Arbeit unterstützen kann.';
const featured = [
  ['Interview mit AI vorbereiten', '/use-cases/interview-vorbereiten'],
  ['Projektstatus mit AI vorbereiten', '/use-cases/projektstatus-vorbereiten'],
  ['AI Team Experiment', '/team-lab'],
];
async function noOverflow(page: Page) {
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
}

test('homepage explains the product in order and keeps work search as its primary interaction', async ({ page }) => {
  const response = await page.goto('/');
  expect(response?.status()).toBe(200);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(headline);
  const hero = page.locator('.hero');
  await expect(hero.locator('.hero-description')).toHaveText('Praxisnahe Use Cases, Erfahrungen aus der Community und klare Orientierung für deine Arbeit mit AI.');
  await expect(hero.getByRole('search')).toHaveCount(1);
  await expect(hero.getByRole('searchbox', { name: 'Was möchtest du erreichen?', exact: true })).toHaveAttribute('placeholder', 'z. B. Projektstatus vorbereiten, Meetingnotizen strukturieren …');
  await expect(hero.getByRole('button')).toHaveCount(1);
  await expect(hero.getByRole('button', { name: 'Use Case finden', exact: true })).toBeVisible();
  await expect(hero.getByRole('link')).toHaveCount(4);
  await expect(hero.locator('.hf-hero-image')).toHaveAttribute('aria-hidden', 'true');
  await expect(hero.locator('.hf-hero-image img')).toHaveCount(1);
  expect(await hero.locator('img').evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
  await expect(page.locator('.art-caption')).toHaveCount(0);
  await expect(page.locator('main')).not.toContainText(/Neue Perspektiven|Gemeinsam weiterdenken/);
});

test('homepage follows the approved hierarchy and qualitative signals link to Standortbild', async ({ page }) => {
  await page.goto('/');
  const status = page.getByRole('region', { name: 'Wo stehen wir mit AI?', exact: true });
  await expect(status.locator('article')).toHaveCount(3);
  await expect(status.getByRole('heading', { level: 3 })).toHaveText(['Schon nutzbar', 'In Erprobung', 'Nächster Fokus']);
  await expect(status).not.toContainText(/\d|%|Score|Reifegradstufe|Ranking/);
  await expect(status.locator('progress, meter, [role="progressbar"]')).toHaveCount(0);
  expect(await page.locator('.home-sections > section').evaluateAll((sections) => sections.map((section) => section.getAttribute('aria-labelledby')))).toEqual(['featured-title', 'status-title', 'learning-title', 'guidelines-title']);
  await expect(page.locator('main h2')).toHaveText(['Beliebte Einstiege in deinen Arbeitsalltag', 'Wo stehen wir mit AI?', 'Was andere gerade lernen', 'Guidelines']);
  await status.getByRole('link', { name: 'Zum AI Standortbild' }).click();
  await expect(page).toHaveURL('/organisation');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('AI Standortbild');
});

test('all four homepage example searches lead to the reviewed library results', async ({ page }) => {
  const examples = [
    { term: 'Projektstatus', titles: ['Projektstatus mit AI vorbereiten'] },
    { term: 'Interviews', titles: ['Interview mit AI vorbereiten', 'Interviewnotizen strukturieren'] },
    { term: 'Meetings', titles: ['Meeting-Ergebnisse aufbereiten'] },
    { term: 'Recherche', titles: ['Recherche strukturieren und verdichten'] },
  ];
  for (const example of examples) {
    await page.goto('/');
    const link = page.locator('.search-examples').getByRole('link', { name: example.term, exact: true });
    await link.focus(); await page.keyboard.press('Enter');
    await expect(page).toHaveURL(`/use-cases?q=${encodeURIComponent(example.term)}`);
    await expect(page.locator('.use-case-card h3')).toHaveText(example.titles);
    await expect(page.locator('.use-case-card').filter({ hasText: 'AI Team Experiment' })).toHaveCount(0);
  }
});

test('featured journeys and library links work and three compact previews reference existing Community entries', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.use-case-card')).toHaveCount(3);
  await expect(page.locator('.use-case-card h3')).toHaveText(featured.map(([title]) => title));
  for (const [title, href] of featured) {
    await page.goto('/');
    const link = page.locator('.use-case-card h3').getByRole('link', { name: title, exact: true });
    await expect(link).toHaveAttribute('href', href);
    await link.click();
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(title);
  }
  await page.goto('/');
  await page.getByRole('link', { name: 'Alle Use Cases', exact: true }).click();
  await expect(page.locator('.use-case-card')).toHaveCount(12);
  await page.goto('/');
  await expect(page.locator('.hf-learning')).toHaveCount(3);
  await expect(page.locator('.hf-learning h3')).toHaveText(homepageLearnings.map((preview) => preview.title));
  for (const preview of homepageLearnings) {
    const card = page.locator('.hf-learning').filter({ hasText: preview.title });
    await expect(card).toContainText('Fiktives Beispiel');
    await expect(card.getByRole('link')).toHaveAttribute('href', preview.href);
  }
  await page.getByRole('link', { name: 'Weitere Erfahrungen', exact: true }).click();
  await expect(page).toHaveURL('/community');
  await expect(page.locator('.community-card')).toHaveCount(7);
});

test('keyboard search and Guidelines navigation work without external requests or persistence', async ({ page }) => {
  const external: string[] = [];
  const mutations: string[] = [];
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('request', (request) => {
    if (new URL(request.url()).hostname !== '127.0.0.1') external.push(request.url());
    if (!['GET', 'HEAD'].includes(request.method())) mutations.push(request.url());
  });
  await page.goto('/');
  const search = page.getByRole('searchbox', { name: 'Was möchtest du erreichen?', exact: true });
  await search.focus();
  await search.fill('Ich muss jede Woche einen Projektstatus erstellen.');
  expect(await page.locator('.search-field').evaluate((element) => getComputedStyle(element).outlineStyle)).not.toBe('none');
  await page.keyboard.press('Tab');
  const submit = page.getByRole('button', { name: 'Use Case finden', exact: true });
  await expect(submit).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('.use-case-card h3')).toHaveText(['Projektstatus mit AI vorbereiten']);
  await page.goto('/');
  const guidelines = page.getByRole('region', { name: 'Guidelines', exact: true });
  await expect(guidelines).toContainText('sicheren und verantwortungsvollen Einsatz');
  const link = guidelines.getByRole('link', { name: 'Zu den Guidelines', exact: true });
  await link.focus(); await page.keyboard.press('Enter');
  await expect(page).toHaveURL('/guidelines');
  await expect(page.locator('.guideline-item')).toHaveCount(4);
  expect(await page.evaluate(() => Object.keys(localStorage))).toEqual([]);
  expect(await page.evaluate(() => Object.keys(sessionStorage))).toEqual([]);
  expect(external).toEqual([]); expect(mutations).toEqual([]); expect(errors).toEqual([]);
});

test('homepage orientation and existing elements fit desktop, tablet and narrow mobile', async ({ page }, testInfo) => {
  for (const width of [360, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto('/');
    await noOverflow(page);
    const positions = await page.locator('.hf-status').evaluateAll((items) => items.map((item) => ({ x: item.getBoundingClientRect().x, y: item.getBoundingClientRect().y })));
    if (width === 360) expect(new Set(positions.map((position) => position.x)).size).toBe(1);
    if (width >= 1024) expect(new Set(positions.map((position) => position.y)).size).toBe(1);
    await expect(page.locator('.hf-hero-image')).toBeVisible();
    for (const selector of ['.use-case-card', '.hf-status', '.hf-learning', '.main-nav a']) {
      const boxes = await page.locator(selector).evaluateAll((elements) => elements.map((element) => { const r = element.getBoundingClientRect(); return { x: r.x, y: r.y, right: r.right, bottom: r.bottom }; }));
      for (let i = 0; i < boxes.length; i++) {
        expect(boxes[i].x).toBeGreaterThanOrEqual(0); expect(boxes[i].right).toBeLessThanOrEqual(width);
        for (let j = i + 1; j < boxes.length; j++) expect(boxes[i].right <= boxes[j].x || boxes[j].right <= boxes[i].x || boxes[i].bottom <= boxes[j].y || boxes[j].bottom <= boxes[i].y).toBe(true);
      }
    }
    for (const link of await page.locator('.hf-primary, .search-examples a, .hf-home .text-link').all()) expect((await link.boundingBox())!.height).toBeGreaterThanOrEqual(44);
    if (width === 1440) {
      expect((await page.locator('.use-case-grid').boundingBox())!.y).toBeLessThan(550);
      expect(await page.locator('.hf-home').evaluate((element) => element.getBoundingClientRect().height)).toBeLessThan(1400);
    }
    await expect(page.locator('.use-case-card')).toHaveCount(3);
    await expect(page.locator('.hf-learning')).toHaveCount(3);
    await expect(page.locator('.guidelines-teaser')).toBeVisible();
    for (const image of await page.locator('.hf-home img').all()) {
      await image.scrollIntoViewIfNeeded();
      await expect.poll(() => image.evaluate((element) => (element as HTMLImageElement).complete && (element as HTMLImageElement).naturalWidth > 0)).toBe(true);
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({ path: testInfo.outputPath(`homepage-${width}.png`), fullPage: true });
  }
});

test('homepage text and action tokens preserve AA contrast on the pale surfaces', async ({ page }) => {
  await page.goto('/');
  const tokens = await page.evaluate(() => {
    const style = getComputedStyle(document.documentElement);
    return Object.fromEntries(['ink', 'muted', 'petrol', 'page', 'mint', 'sky', 'apricot', 'surface'].map((name) => [name, style.getPropertyValue(`--hub-${name}`).trim()]));
  });
  function luminance(hex: string) {
    const raw = hex.replace('#', '');
    const normalized = raw.length === 3 ? [...raw].map((character) => character.repeat(2)).join('') : raw;
    const channels = normalized.match(/.{2}/g)!.map((channel) => parseInt(channel, 16) / 255).map((channel) => channel <= .04045 ? channel / 12.92 : ((channel + .055) / 1.055) ** 2.4);
    return channels[0] * .2126 + channels[1] * .7152 + channels[2] * .0722;
  }
  function contrast(a: string, b: string) { const values = [luminance(a), luminance(b)].sort((x, y) => y - x); return (values[0] + .05) / (values[1] + .05); }
  for (const foreground of ['ink', 'muted', 'petrol']) for (const background of ['page', 'mint', 'sky', 'apricot', 'surface']) expect(contrast(tokens[foreground], tokens[background])).toBeGreaterThanOrEqual(4.5);
  expect(contrast('#ffffff', tokens.petrol)).toBeGreaterThanOrEqual(4.5);
});
