import { expect, test, type Page } from '@playwright/test';

const featured = ['Interview mit AI vorbereiten', 'Projektstatus mit AI vorbereiten', 'AI Team Experiment'];
const resources = [
  ['interviewnotizen-strukturieren', 'Interviewnotizen strukturieren', 'Recruiting', 'Personendaten'],
  ['projektrisiken-strukturieren', 'Projektrisiken strukturieren', 'Projektmanagement', 'Workflow'],
  ['meeting-ergebnisse-aufbereiten', 'Meeting-Ergebnisse aufbereiten', 'Zusammenarbeit', 'Intern'],
  ['workshop-vorbereiten', 'Workshop vorbereiten', 'Zusammenarbeit', 'Intern'],
  ['komplexe-inhalte-verstaendlich-machen', 'Komplexe Inhalte verständlich machen', 'Kommunikation', 'Intern'],
  ['praesentation-strukturieren', 'Präsentation strukturieren', 'Kommunikation', 'Intern'],
  ['dokumente-vergleichen', 'Dokumente vergleichen', 'Wissensarbeit', 'Intern'],
  ['recherche-strukturieren', 'Recherche strukturieren und verdichten', 'Wissensarbeit', 'Quellen prüfen'],
  ['entscheidungsoptionen-strukturieren', 'Entscheidungsoptionen strukturieren', 'Entscheidungen', 'Entscheidungsunterstützung'],
];
async function noOverflow(page: Page) {
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
}

test('library contains twelve working destinations and homepage retains only the three showcases', async ({ page }, testInfo) => {
  await page.goto('/');
  await expect(page.locator('.use-case-card h3')).toHaveText(featured);
  await noOverflow(page);
  const allCases = page.getByRole('link', { name: 'Alle Use Cases', exact: true });
  await allCases.focus();
  await expect(allCases).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/\/use-cases$/);
  await expect(page.locator('.use-case-card')).toHaveCount(12);
  await expect(page.getByRole('status')).toHaveText('12 Use Cases für deinen Arbeitsalltag');
  await expect(page.locator('main')).not.toContainText(/Demo-Auswahl|Drei Ideen|erst drei Beispiele/);
  const cards = page.locator('.use-case-card');
  const titles = await cards.locator('h3').allTextContents();
  expect([...titles].sort()).toEqual([...featured, ...resources.map((item) => item[1])].sort());
  const destinations = await cards.locator('h3 a').evaluateAll((links) => links.map((link) => ({ title: link.textContent, href: link.getAttribute('href')! })));
  expect(new Set(destinations.map((link) => link.href)).size).toBe(12);
  for (const card of await cards.all()) {
    await expect(card.locator('.card-action')).toHaveAttribute('href', (await card.locator('h3 a').getAttribute('href'))!);
  }
  await noOverflow(page);
  await page.screenshot({ path: testInfo.outputPath('use-case-library.png'), fullPage: true });
  for (const link of destinations) {
    const response = await page.goto(link.href);
    expect(response?.status()).toBe(200);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(link.title!);
    await noOverflow(page);
  }
});

test('all nine orientation pages offer concrete guidance without placeholder workflows', async ({ page }, testInfo) => {
  const errors: string[] = [];
  const unexpectedRequests: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('request', (request) => {
    if (new URL(request.url()).hostname !== '127.0.0.1' || !['GET', 'HEAD'].includes(request.method())) unexpectedRequests.push(request.url());
  });
  for (const [slug, title, category, context] of resources) {
    await page.goto(`/use-cases/${slug}`);
    await expect(page).toHaveTitle(new RegExp(title));
    const content = page.locator('.uc-overview');
    await expect(content.getByRole('heading', { level: 1 })).toHaveText(title);
    await expect(content.locator('.eyebrow')).toHaveText(category);
    await expect(content.locator('.uc-overview-meta')).toContainText(context);
    await expect(content.getByRole('region', { name: 'Wobei AI unterstützen kann' }).getByRole('listitem')).toHaveCount(3);
    await expect(content.getByRole('region', { name: 'Was bei dir bleibt' }).getByRole('listitem')).toHaveCount(3);
    await expect(content.getByRole('region', { name: 'So könntest du vorgehen' }).getByRole('listitem')).toHaveCount(3);
    await expect(content.getByRole('region', { name: 'Worauf du achten solltest' }).getByRole('listitem')).toHaveCount(3);
    await expect(content).not.toContainText(/Hier geht es bald weiter|coming soon|Vorschau|geplant|nächste Version|NOT INTERACTIVE/i);
    await expect(content.getByRole('link', { name: 'Experiment starten' })).toHaveCount(0);
    await expect(content.getByRole('button')).toHaveCount(0);
    await expect(content.locator('a[href="/guidelines"]')).toBeVisible();
    await noOverflow(page);
    if (slug === 'dokumente-vergleichen') await page.screenshot({ path: testInfo.outputPath('document-comparison-overview.png'), fullPage: true });
  }
  expect(errors).toEqual([]);
  expect(unexpectedRequests).toEqual([]);
  expect(await page.evaluate(() => Object.keys(localStorage))).toEqual([]);
  expect(await page.evaluate(() => Object.keys(sessionStorage))).toEqual([]);
});

test('realistic work intents find the relevant cases without substring false positives', async ({ page }) => {
  const searches: [string[], string[]][] = [
    [['interview', 'Interviews'], [featured[0], resources[0][1]]],
    [['interviewnotizen'], [resources[0][1]]],
    [['projektstatus', 'Ich muss jede Woche einen Projektstatus erstellen.'], [featured[1]]],
    [['risiken', 'projektrisiken'], [resources[1][1]]],
    [['meeting', 'meetings', 'meetingnotizen', 'entscheidungen aus meeting'], [resources[2][1]]],
    [['workshop', 'moderation'], [resources[3][1]]],
    [['verständlich machen', 'vereinfachen'], [resources[4][1]]],
    [['präsentation', 'PRAESENTATION', 'pra\u0308sentation', 'storyline'], [resources[5][1]]],
    [['dokumente vergleichen', 'vergleich'], [resources[6][1]]],
    [['recherche', 'informationen recherchieren', 'quellen'], [resources[7][1]]],
    [['entscheidung', 'optionen vergleichen'], [resources[8][1]]],
    [['team', 'teams', 'zusammenarbeit', 'experiment', 'arbeitsweise'], [featured[2]]],
  ];
  for (const [terms, expected] of searches) {
    for (const term of terms) {
      await page.goto(`/use-cases?q=${encodeURIComponent(term)}`);
      await expect(page.locator('.use-case-card h3')).toHaveText(expected);
      await expect(page.getByRole('status')).toHaveText(`${expected.length} passende Use Cases für «${term}»`);
      await noOverflow(page);
    }
  }
});

test('empty search stays honest and supports keyboard search and returning to the library', async ({ page }) => {
  for (const term of ['steam', 'teamleiterbewertung', 'experimentell', 'astronomie', '???']) {
    await page.goto(`/use-cases?q=${encodeURIComponent(term)}`);
    await expect(page.locator('.use-case-card')).toHaveCount(0);
    await expect(page.getByRole('heading', { name: 'Noch kein passender Use Case dabei.' })).toBeVisible();
    await expect(page.getByText('Versuche einen anderen Begriff oder beschreibe die Aufgabe, bei der du Unterstützung suchst.')).toBeVisible();
    await noOverflow(page);
  }
  const reset = page.getByRole('link', { name: 'Alle Use Cases ansehen' });
  await reset.focus(); await page.keyboard.press('Enter');
  await expect(page.locator('.use-case-card')).toHaveCount(12);
  await page.getByRole('searchbox').fill('meeting');
  await page.keyboard.press('Enter');
  await expect(page.locator('.use-case-card h3')).toHaveText([resources[2][1]]);
  const card = page.getByRole('link', { name: resources[2][1], exact: true });
  await card.focus(); await page.keyboard.press('Enter');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(resources[2][1]);
  const guidelines = page.locator('.uc-overview a[href="/guidelines"]');
  await guidelines.focus(); await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/\/guidelines$/);
  await page.goto('/use-cases?q=%20%20');
  await expect(page.locator('.use-case-card')).toHaveCount(12);
  const response = await page.goto('/use-cases/not-a-use-case');
  expect(response?.status()).toBe(404);
});

test('guidance makes responsibility specific to personal data, sources and decisions', async ({ page }) => {
  await page.goto('/use-cases/interviewnotizen-strukturieren');
  await expect(page.getByRole('region', { name: 'Worauf du achten solltest' })).toContainText('Personendaten');
  await expect(page.getByRole('region', { name: 'So könntest du vorgehen' })).toContainText('fiktive Notizen');
  await expect(page.getByRole('region', { name: 'Was bei dir bleibt' })).toContainText('AI bewertet oder rankt keine Kandidat:innen');
  await page.goto('/use-cases/recherche-strukturieren');
  await expect(page.getByRole('region', { name: 'Worauf du achten solltest' })).toContainText('AI-Zusammenfassungen sind keine Belege');
  await expect(page.getByRole('region', { name: 'So könntest du vorgehen' })).toContainText('Originalquellen');
  await page.goto('/use-cases/entscheidungsoptionen-strukturieren');
  await expect(page.getByRole('region', { name: 'Was bei dir bleibt' })).toContainText('Die Entscheidung selbst treffen');
  await expect(page.getByRole('region', { name: 'So könntest du vorgehen' })).toContainText('Verzichte auf Punktwerte und Rangfolgen');
  await expect(page.locator('.uc-overview input, .uc-overview button, .uc-overview [role="meter"]')).toHaveCount(0);
  await page.goto('/use-cases/meeting-ergebnisse-aufbereiten');
  await expect(page.getByRole('region', { name: 'Worauf du achten solltest' })).toContainText('AI weiss nicht automatisch, ob ein Diskussionspunkt eine endgültige Entscheidung ist');
});

test('library metadata and detail pages fit intermediate screen widths', async ({ page }) => {
  for (const width of [360, 768, 920, 1024]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/use-cases');
    await noOverflow(page);
    await page.goto('/use-cases/entscheidungsoptionen-strukturieren');
    await noOverflow(page);
  }
});
