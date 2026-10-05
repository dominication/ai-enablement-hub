import { expect, test, type Page } from '@playwright/test';

const stories = [
  { title: 'Informationen erkennen ist nicht dasselbe wie ihre Bedeutung verstehen.', category: 'Projektmanagement', outcome: 'Weiterführen', href: '/use-cases/projektstatus-vorbereiten', useCase: 'Projektstatus mit AI vorbereiten' },
  { title: 'Ein plausibler AI-Vorschlag ist noch keine faire oder belegte Interviewfrage.', category: 'Recruiting', outcome: 'Anpassen', href: '/use-cases/interview-vorbereiten', useCase: 'Interview mit AI vorbereiten' },
  { title: 'Ein kleinerer Einsatzbereich kann sinnvoller sein als möglichst viel AI.', category: 'Teams', outcome: 'Anpassen', href: '/team-lab', useCase: 'AI Team Experiment' },
  { title: 'Ein bewusst beendetes Experiment ist ebenfalls ein gutes Ergebnis.', category: 'Teams', outcome: 'Stoppen', href: '/team-lab', useCase: 'AI Team Experiment' },
  { title: 'Struktur hilft – Verbindlichkeit entsteht im Team.', category: 'Zusammenarbeit', outcome: 'Weiterführen', href: '/use-cases/meeting-ergebnisse-aufbereiten', useCase: 'Meeting-Ergebnisse aufbereiten' },
  { title: 'Eine Zusammenfassung ist Orientierung, kein Beleg.', category: 'Wissensarbeit', outcome: 'Anpassen', href: '/use-cases/recherche-strukturieren', useCase: 'Recherche strukturieren und verdichten' },
  { title: 'Verständlicher darf nicht ungenauer bedeuten.', category: 'Kommunikation', outcome: 'Weiterführen', href: '/use-cases/komplexe-inhalte-verstaendlich-machen', useCase: 'Komplexe Inhalte verständlich machen' },
];
async function noOverflow(page: Page) {
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
}

test('Community presents seven fictional mixed experiences with working use case links', async ({ page }, testInfo) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/community');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Erfahrungen teilen. Gemeinsam besser entscheiden.');
  await expect(page.getByText('Alle Beiträge in diesem Prototyp sind fiktiv.', { exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Nicht nur Erfolg ist ein Learning' })).toBeVisible();
  await expect(page.getByRole('region', { name: 'Was ein gutes Learning sichtbar macht' }).getByRole('listitem')).toHaveCount(4);
  await expect(page.locator('.community-card')).toHaveCount(7);
  await expect(page.locator('.community-card h3')).toHaveText(stories.map((story) => story.title));
  await expect(page.getByRole('status')).toHaveText('7 fiktive Learnings · Alle Bereiche');
  await expect(page.locator('main')).not.toContainText(/Ein erster Einblick|Hier geht es bald weiter|nächsten Version|Jede Erfahrung bringt uns weiter/);
  await expect(page.locator('.community-page form, .community-page textarea, .community-page input')).toHaveCount(0);
  for (const story of stories) {
    const card = page.getByRole('article', { name: story.title, exact: true });
    await expect(card.locator('.eyebrow')).toHaveText(story.category);
    await expect(card.locator('.community-outcome')).toHaveText(`Entscheidung: ${story.outcome}`);
    await expect(card.getByRole('link', { name: `Zum Use Case: ${story.useCase}`, exact: true })).toHaveAttribute('href', story.href);
  }
  await noOverflow(page);
  await page.screenshot({ path: testInfo.outputPath('community-overview.png'), fullPage: true });
  for (const story of stories) {
    await page.goto('/community');
    await page.getByRole('article', { name: story.title, exact: true }).getByRole('link').click();
    await expect(page).toHaveURL(new RegExp(`${story.href}$`));
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(story.useCase);
  }
  expect(errors).toEqual([]);
});

test('filters operate locally by keyboard and do not change or persist the fictional entries', async ({ page }) => {
  const external: string[] = [];
  const mutations: string[] = [];
  page.on('request', (request) => {
    if (new URL(request.url()).hostname !== '127.0.0.1') external.push(request.url());
    if (!['GET', 'HEAD'].includes(request.method())) mutations.push(request.url());
  });
  await page.goto('/community');
  const baseline = await page.locator('.community-card').allTextContents();
  const filters = page.getByRole('group', { name: 'Learnings nach Arbeitsbereich filtern' });
  const cases = [
    { label: 'Recruiting', entries: [stories[1]] },
    { label: 'Projekte', entries: [stories[0]] },
    { label: 'Zusammenarbeit', entries: [stories[4]] },
    { label: 'Wissensarbeit', entries: [stories[5]] },
    { label: 'Teams', entries: [stories[2], stories[3]] },
    { label: 'Kommunikation', entries: [stories[6]] },
    { label: 'Alle', entries: stories },
  ];
  for (const [index, filter] of cases.entries()) {
    const button = filters.getByRole('button', { name: filter.label, exact: true });
    await button.focus();
    await expect(button).toBeFocused();
    await page.keyboard.press(index % 2 ? 'Space' : 'Enter');
    await expect(button).toHaveAttribute('aria-pressed', 'true');
    await expect(button).toBeFocused();
    await expect(filters.locator('[aria-pressed="true"]')).toHaveCount(1);
    await expect(page.locator('.community-card h3')).toHaveText(filter.entries.map((story) => story.title));
    await expect(page.getByRole('status')).toHaveText(`${filter.entries.length} ${filter.entries.length === 1 ? 'fiktives Learning' : 'fiktive Learnings'} · ${filter.label === 'Alle' ? 'Alle Bereiche' : filter.label}`);
    await expect(page).toHaveURL(/\/community$/);
    await noOverflow(page);
  }
  expect(await page.locator('.community-card').allTextContents()).toEqual(baseline);
  await filters.getByRole('button', { name: 'Teams', exact: true }).click();
  await page.reload();
  await expect(filters.getByRole('button', { name: 'Alle', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('.community-card')).toHaveCount(7);
  expect(await page.evaluate(() => Object.keys(localStorage))).toEqual([]);
  expect(await page.evaluate(() => Object.keys(sessionStorage))).toEqual([]);
  expect(external).toEqual([]); expect(mutations).toEqual([]);
});

test('details are keyboard accessible and all decisions receive the same neutral treatment', async ({ page }, testInfo) => {
  await page.goto('/community');
  const outcomeStyles = [];
  for (const story of [stories[0], stories[2], stories[3]]) {
    const card = page.getByRole('article', { name: story.title, exact: true });
    outcomeStyles.push(await card.locator('.community-outcome').evaluate((element) => {
      const style = getComputedStyle(element);
      const cardStyle = getComputedStyle(element.closest('article')!);
      return { color: style.color, background: style.backgroundColor, border: style.borderColor, weight: style.fontWeight, opacity: style.opacity, cardBackground: cardStyle.backgroundColor, cardBorder: cardStyle.borderColor };
    }));
  }
  expect(outcomeStyles[1]).toEqual(outcomeStyles[0]);
  expect(outcomeStyles[2]).toEqual(outcomeStyles[0]);
  const stopped = page.getByRole('article', { name: stories[3].title, exact: true });
  await expect(stopped).toContainText('drei Wochen');
  const summary = stopped.locator('summary');
  await expect(summary).toHaveAccessibleName(/^Erfahrung vertiefen\s*:\s*Ein bewusst beendetes Experiment ist ebenfalls ein gutes Ergebnis\.$/);
  await expect(stopped.locator('details')).not.toHaveAttribute('open');
  await summary.focus(); await page.keyboard.press('Enter');
  await expect(stopped.locator('details')).toHaveAttribute('open');
  await expect(stopped.getByRole('heading', { level: 4 })).toHaveText(['Was geholfen hat', 'Wo menschliche Einordnung wichtig war', 'Was nicht funktioniert hat', 'Was wir als Nächstes machen']);
  await expect(stopped.getByText(/Das Team kehrt zur bisherigen Arbeitsweise zurück/)).toBeVisible();
  await expect(stopped.getByText(/Zusätzliche Abstimmungen waren nötig/)).toBeVisible();
  await noOverflow(page);
  await stopped.screenshot({ path: testInfo.outputPath('stopped-learning-expanded.png') });
  await expect(summary).toBeFocused();
  await page.keyboard.press('Space');
  await expect(stopped.locator('details')).not.toHaveAttribute('open');
  await expect(stopped.getByText(/Das Team kehrt zur bisherigen Arbeitsweise zurück/)).toBeHidden();
  await page.keyboard.press('Tab');
  await expect(stopped.getByRole('link')).toBeFocused();
});

test('details preserve the work-specific limitations and human judgement behind every learning', async ({ page }) => {
  await page.goto('/community');
  for (const story of stories) {
    const card = page.getByRole('article', { name: story.title, exact: true });
    await card.locator('summary').click();
    await expect(card.getByRole('heading', { name: 'Was nicht funktioniert hat', exact: true })).toBeVisible();
    await expect(card.getByRole('heading', { name: 'Wo menschliche Einordnung wichtig war', exact: true })).toBeVisible();
    await noOverflow(page);
  }
  const project = page.getByRole('article', { name: stories[0].title, exact: true });
  await expect(project).toContainText('Auswirkungen auf den Pilot und andere Teams');
  await expect(project).toContainText('Eskalation');
  const recruiting = page.getByRole('article', { name: stories[1].title, exact: true });
  await expect(recruiting).toContainText('Fairness, Relevanz für die Rolle');
  await expect(recruiting).toContainText('Originalunterlagen');
  const adapted = page.getByRole('article', { name: stories[2].title, exact: true });
  await expect(adapted).toContainText('Priorisierung bleibt vollständig beim Team');
  const research = page.getByRole('article', { name: stories[5].title, exact: true });
  await expect(research).toContainText('Orientierung, kein Beleg');
  await expect(research).toContainText('Jede wichtige Aussage bleibt mit ihrer Originalquelle verknüpft');
  const meeting = page.getByRole('article', { name: stories[4].title, exact: true });
  await expect(meeting).toContainText('diskutierten Idee');
  await expect(meeting).toContainText('Bestätigte Entscheidungen werden während oder unmittelbar nach dem Meeting ausdrücklich markiert');
  const communication = page.getByRole('article', { name: stories[6].title, exact: true });
  await expect(communication).toContainText('Kritische Einschränkungen werden vor dem Umformulieren ausdrücklich markiert');
});

test('homepage keeps its single learning and familiar structure, backed by the Community experience', async ({ page }, testInfo) => {
  await page.goto('/');
  await expect(page.locator('.hero')).toHaveCount(1);
  await expect(page.locator('.use-case-card')).toHaveCount(3);
  await expect(page.locator('.learning-section')).toHaveCount(1);
  const learning = page.locator('.learning-card');
  await expect(learning).toHaveCount(1);
  await expect(learning.locator('.learning-label')).toHaveCount(1);
  await expect(learning.locator('.quote-layout blockquote')).toHaveCount(1);
  await expect(learning.locator('.learning-footer')).toHaveCount(1);
  await expect(learning).toContainText('Fiktives Beispiel');
  await expect(learning).toContainText(stories[0].title);
  await expect(page.locator('.guidelines-teaser')).toHaveCount(1);
  await expect(page.locator('.community-card, .community-filters')).toHaveCount(0);
  const quote = await learning.locator('blockquote').textContent();
  await noOverflow(page);
  await page.screenshot({ path: testInfo.outputPath('homepage-with-shared-learning.png'), fullPage: true });
  await page.getByRole('link', { name: 'Weitere Erfahrungen', exact: true }).click();
  await expect(page.getByRole('article', { name: stories[0].title, exact: true }).locator('.community-summary')).toHaveText(quote!);
});

test('Community stays readable at narrow and intermediate widths with expanded details', async ({ page }) => {
  for (const width of [360, 768, 1024]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/community');
    await noOverflow(page);
    await page.getByRole('group', { name: 'Learnings nach Arbeitsbereich filtern' }).getByRole('button', { name: 'Teams', exact: true }).click();
    await page.getByRole('article', { name: stories[3].title, exact: true }).locator('summary').click();
    await noOverflow(page);
  }
});
