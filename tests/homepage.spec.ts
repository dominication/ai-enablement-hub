import { expect, test, type Page } from '@playwright/test';
import { featuredCommunityLearning } from '../src/data/community';

const headline = 'Finde heraus, wie AI deine Arbeit unterstützen kann.';
const stageTitles = ['Aufgabe finden', 'Ausprobieren', 'Einordnen', 'Erfahrung nutzen'];
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
  await expect(hero.locator('.hero-description')).toHaveText('Starte bei einer konkreten Aufgabe. Finde einen passenden Use Case, probiere eine neue Arbeitsweise aus und nutze Erfahrungen anderer für deinen nächsten Schritt.');
  await expect(hero.getByRole('search')).toHaveCount(1);
  await expect(hero.getByRole('searchbox', { name: 'Was möchtest du erreichen?', exact: true })).toHaveAttribute('placeholder', 'Ich muss jede Woche einen Projektstatus erstellen.');
  await expect(hero.getByRole('button')).toHaveCount(1);
  await expect(hero.getByRole('button', { name: 'Use Case finden', exact: true })).toBeVisible();
  await expect(hero.getByRole('link')).toHaveCount(4);
  await expect(hero.locator('.hero-art')).toHaveAttribute('aria-hidden', 'true');
  await expect(hero.locator('.art-tile')).toHaveCount(4);
  await expect(page.locator('.art-caption')).toHaveCount(0);
  await expect(page.locator('main')).not.toContainText(/Neue Perspektiven|Gemeinsam weiterdenken/);
});

test('four orientation stages remain semantic guidance without progress or completion controls', async ({ page }) => {
  await page.goto('/');
  const orientation = page.getByRole('region', { name: 'So unterstützt dich der Hub', exact: true });
  await expect(orientation.getByRole('list')).toHaveCount(1);
  await expect(orientation.getByRole('listitem')).toHaveCount(4);
  await expect(orientation.getByRole('heading', { level: 3 })).toHaveText(stageTitles);
  await expect(orientation).toContainText('auch wenn ein Experiment angepasst oder beendet wurde');
  await expect(orientation.locator('button, a, input, progress, meter, [role="progressbar"], [aria-current="step"]')).toHaveCount(0);
  await expect(orientation).not.toContainText(/%|abgeschlossen|Level|Punkte/);
  expect(await page.locator('.home-sections > section').evaluateAll((sections) => sections.map((section) => section.getAttribute('aria-labelledby')))).toEqual(['orientation-title', 'featured-title', 'learning-title', 'guidelines-title']);
  await expect(page.locator('main h2')).toHaveText(['So unterstützt dich der Hub', 'Empfohlene Use Cases', 'Was andere gerade lernen', 'Welche Informationen darf ich verwenden?']);
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

test('featured journeys and library links work and shared learning stays a single Community entry', async ({ page }) => {
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
  await expect(page.locator('.learning-card')).toHaveCount(1);
  await expect(page.locator('.learning-card blockquote')).toHaveText(featuredCommunityLearning.summary);
  await expect(page.locator('.learning-card')).toContainText(featuredCommunityLearning.takeaway);
  await expect(page.locator('.learning-card')).toContainText('Fiktives Beispiel');
  await expect(page.locator('.home-learning-intro')).toHaveText('Erfahrungen zeigen nicht nur, was funktioniert hat, sondern auch, wo menschliche Einordnung, Anpassung oder ein bewusster Stopp sinnvoll waren.');
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
  const guidelines = page.getByRole('region', { name: 'Welche Informationen darf ich verwenden?' });
  await expect(guidelines).toContainText('Sicher mit AI arbeiten');
  await expect(guidelines.locator('.information-types a')).toHaveText(['Öffentlich', 'Intern', 'Vertraulich', 'Personendaten']);
  const link = guidelines.getByRole('link', { name: 'Guidelines ansehen', exact: true });
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
    const orientation = page.locator('.home-orientation');
    const positions = await orientation.getByRole('listitem').evaluateAll((items) => items.map((item) => ({ x: item.getBoundingClientRect().x, y: item.getBoundingClientRect().y })));
    if (width === 360) expect(new Set(positions.map((position) => position.x)).size).toBe(1);
    if (width >= 1024) expect(new Set(positions.map((position) => position.y)).size).toBe(1);
    const art = page.locator('.hero-art');
    if (width <= 768) await expect(art).toBeHidden();
    else await expect(art).toBeVisible();
    await expect(page.locator('.use-case-card')).toHaveCount(3);
    await expect(page.locator('.learning-card')).toHaveCount(1);
    await expect(page.locator('.guidelines-teaser')).toBeVisible();
    await page.screenshot({ path: testInfo.outputPath(`homepage-${width}.png`), fullPage: true });
  }
});
