import { expect, test, type Page } from '@playwright/test';

const entry = '/use-cases/interview-vorbereiten';
const experiment = `${entry}/experiment`;

async function questions(page: Page) {
  await page.goto(experiment);
  await page.getByRole('button', { name: 'Weiter', exact: true }).click();
  await page.getByRole('button', { name: 'Unterlagen analysieren' }).click();
  await page.getByRole('button', { name: 'Interviewfragen entwickeln' }).click();
}
async function noOverflow(page: Page) {
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
}

test('full recruiting journey: source preview, edit, alternative, report, human review and reflection', async ({ page }, testInfo) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto(entry);
  await expect(page.getByRole('heading', { name: 'Interview mit AI vorbereiten', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Du entscheidest' })).toBeVisible();
  for (const statement of ['die Vorbereitung strukturieren', 'mögliche Interviewfragen ableiten', 'relevante Themen sichtbar machen', 'Fragen formulieren und ordnen', 'Kandidat:innen bewerten', 'Personalentscheidungen treffen', 'das Gespräch führen']) await expect(page.locator('.entry-responsibility')).toContainText(statement);
  await expect(page.locator('main')).not.toContainText(/objektiver|objektivere Bewertung/i);
  await expect(page.getByRole('region', { name: 'Veränderte Arbeitsweise' }).getByRole('listitem')).toHaveCount(5);
  const personalData = page.getByRole('complementary').filter({ hasText: 'Dieser Use Case verarbeitet Personendaten' });
  await expect(personalData).toContainText('Verwende für Bewerbungsunterlagen ausschliesslich dafür freigegebene Unternehmenslösungen. AI kann die Vorbereitung unterstützen, trifft aber keine Personalentscheidung.');
  await expect(personalData.getByRole('link', { name: 'Mehr zu Personendaten' })).toHaveAttribute('href', '/guidelines#4');
  await noOverflow(page);
  await page.screenshot({ path: testInfo.outputPath('recruiting-detail.png'), fullPage: true });
  await page.getByRole('link', { name: 'Experiment starten' }).click();
  await expect(page.getByRole('checkbox', { checked: true })).toHaveCount(3);
  await expect(page.getByRole('navigation', { name: 'Fortschritt' })).toContainText('1 von 4');
  await noOverflow(page);
  await page.getByRole('button', { name: 'Weiter', exact: true }).click();
  await expect(page.getByText('Demo-Unterlagen – alle Personen und Inhalte in diesem Prototyp sind fiktiv.')).toBeVisible();
  const cv = page.locator('.document-card').filter({ hasText: 'Lebenslauf einbeziehen' });
  await cv.getByText('Unterlage ansehen', { exact: true }).click();
  await expect(cv.getByText(/Als Change-Spezialist:in/)).toBeVisible();
  await noOverflow(page);
  await page.getByRole('button', { name: 'Unterlagen analysieren' }).click();
  await expect(page.getByRole('heading', { name: 'Kernanforderungen der Rolle' })).toBeVisible();
  await expect(page.locator('.requirement-list li')).toHaveCount(5);
  await expect(page.locator('.evidence-grid article')).toHaveCount(3);
  await noOverflow(page);
  await page.getByRole('button', { name: 'Interviewfragen entwickeln' }).click();
  await expect(page.locator('.question-card')).toHaveCount(5);
  await expect(page.getByRole('button', { name: 'Auswahl prüfen' })).toBeDisabled();
  const first = page.getByRole('article', { name: 'Veränderungsinitiative', exact: true });
  await first.getByRole('button', { name: 'Anpassen', exact: true }).click();
  await first.getByLabel('Interviewfrage bearbeiten').fill('Welche Veränderung hast du begleitet und was hast du daraus gelernt?');
  await first.getByRole('button', { name: 'Änderung übernehmen' }).click();
  await expect(first.locator('.question-text')).toHaveText('Welche Veränderung hast du begleitet und was hast du daraus gelernt?');
  await first.getByRole('button', { name: 'Übernehmen', exact: true }).click();
  await first.getByRole('button', { name: 'Alternative', exact: true }).click();
  await expect(first.getByRole('button', { name: 'Übernehmen', exact: true })).toHaveAttribute('aria-pressed', 'false');
  await expect(first.locator('.question-text')).toContainText('Beschreibe eine Veränderung');
  await first.getByRole('button', { name: 'Übernehmen', exact: true }).click();
  const second = page.getByRole('article', { name: 'Digitale Adoption', exact: true });
  const report = second.getByRole('button', { name: 'Problem melden' });
  await report.click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(report).toBeFocused();
  await report.click();
  await page.getByRole('radio', { name: 'missverständlich', exact: true }).check();
  await page.getByRole('button', { name: 'Feedback abgeben' }).click();
  await expect(second.getByText('Danke. Kritisches Feedback hilft, AI-Unterstützung besser einzuordnen.')).toBeVisible();
  await second.getByRole('button', { name: 'Übernehmen', exact: true }).click();
  await noOverflow(page);
  await page.screenshot({ path: testInfo.outputPath('recruiting-questions.png'), fullPage: true });
  await page.getByRole('button', { name: 'Auswahl prüfen' }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Deine Auswahl');
  await expect(page.locator('.question-card')).toHaveCount(2);
  await page.getByRole('button', { name: 'Digitale Adoption nach oben' }).click();
  await expect(page.locator('.question-card').first()).toHaveAttribute('aria-label', 'Digitale Adoption');
  const reviewFirst = page.getByRole('article', { name: 'Digitale Adoption', exact: true });
  await reviewFirst.getByRole('button', { name: 'Anpassen', exact: true }).click();
  await reviewFirst.getByLabel('Interviewfrage bearbeiten').fill('');
  await expect(reviewFirst.getByRole('button', { name: 'Änderung übernehmen' })).toBeDisabled();
  await reviewFirst.getByLabel('Interviewfrage bearbeiten').fill('Wie hast du die Wirkung beurteilt?');
  await reviewFirst.getByRole('button', { name: 'Änderung übernehmen' }).click();
  await page.getByRole('article', { name: 'Veränderungsinitiative', exact: true }).getByRole('button', { name: 'Entfernen', exact: true }).click();
  await noOverflow(page);
  await page.getByRole('button', { name: 'Vorbereitung abschliessen' }).click();
  await expect(page.getByRole('button', { name: 'Erfahrung speichern' })).toBeDisabled();
  await page.getByRole('radio', { name: 'teilweise hilfreich', exact: true }).check();
  await page.getByRole('checkbox', { name: 'offene Punkte erkennen', exact: true }).check();
  await page.getByLabel('Wo war deine eigene Einschätzung besonders wichtig?', { exact: false }).fill('Bei der Einordnung von Verantwortung.');
  await noOverflow(page);
  await page.getByRole('button', { name: 'Erfahrung speichern', exact: true }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Erfahrung gespeichert');
  await expect(page.locator('.completion-card')).toContainText('teilweise hilfreich');
  await expect(page.locator('.completion-card')).toContainText('Bei der Einordnung von Verantwortung.');
  await page.getByText('Deine 1 Interviewfragen ansehen').click();
  await expect(page.locator('.completed-questions')).toContainText('Wie hast du die Wirkung beurteilt?');
  await noOverflow(page);
  await page.reload();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Was möchtest du im Interview besser verstehen?');
  expect(errors).toEqual([]);
});

test('empty inputs are guarded and excluded documents cannot supply evidence', async ({ page }) => {
  await page.goto(experiment);
  for (const checkbox of await page.getByRole('checkbox').all()) await checkbox.uncheck();
  await expect(page.getByRole('button', { name: 'Weiter', exact: true })).toBeDisabled();
  await page.getByRole('checkbox', { name: 'Motivation für die Rolle', exact: true }).check();
  await page.getByRole('button', { name: 'Weiter', exact: true }).click();
  for (const checkbox of await page.getByRole('checkbox').all()) await checkbox.uncheck();
  await expect(page.getByRole('button', { name: 'Unterlagen analysieren' })).toBeDisabled();
  await page.getByRole('checkbox', { name: 'Stellenprofil einbeziehen' }).check();
  await page.getByRole('button', { name: 'Unterlagen analysieren' }).click();
  await expect(page.locator('.evidence-grid')).toHaveCount(0);
  await expect(page.locator('.motivation-excerpt')).toHaveCount(0);
  await expect(page.getByText(/Kein Lebenslauf ausgewählt/)).toBeVisible();
  await page.getByRole('button', { name: 'Interviewfragen entwickeln' }).click();
  await expect(page.locator('.question-card').first()).toHaveAttribute('aria-label', 'Motivation für die Rolle');
  await page.getByRole('button', { name: 'Übernehmen', exact: true }).first().click();
  await page.getByRole('button', { name: 'Auswahl prüfen' }).click();
  await page.getByRole('button', { name: 'Entfernen', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Vorbereitung abschliessen' })).toBeDisabled();
  await page.getByRole('button', { name: 'Zurück zu den Vorschlägen' }).click();
  await page.getByRole('button', { name: 'Zurück', exact: true }).click();
  await page.getByRole('button', { name: 'Zurück', exact: true }).click();
  await page.getByRole('checkbox', { name: 'Stellenprofil einbeziehen' }).uncheck();
  await page.getByRole('checkbox', { name: 'Motivationsschreiben einbeziehen' }).check();
  await page.getByRole('button', { name: 'Unterlagen analysieren' }).click();
  await expect(page.locator('.requirement-list')).toHaveCount(0);
  await expect(page.locator('.motivation-excerpt')).toBeVisible();
  await expect(page.getByText(/Kein Stellenprofil ausgewählt/)).toBeVisible();
});

test('sharing stays local and negative reflection is a valid outcome', async ({ page }) => {
  const mutations: string[] = [];
  page.on('request', (request) => { if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(request.method())) mutations.push(request.url()); });
  await questions(page);
  await page.getByRole('button', { name: 'Übernehmen', exact: true }).first().click();
  await page.getByRole('button', { name: 'Auswahl prüfen' }).click();
  await page.getByRole('button', { name: 'Vorbereitung abschliessen' }).click();
  await page.getByRole('radio', { name: 'kaum hilfreich', exact: true }).check();
  await page.getByRole('checkbox', { name: 'Fragen entwickeln', exact: true }).check();
  await page.getByRole('checkbox', { name: 'Kein erkennbarer Nutzen', exact: true }).check();
  await expect(page.getByRole('checkbox', { name: 'Fragen entwickeln', exact: true })).not.toBeChecked();
  await page.getByRole('button', { name: 'Mit anderen teilen', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Teilen in der Demo vorgemerkt' })).toBeVisible();
  await expect(page.locator('.completion-card')).toContainText('Es wurde kein Beitrag veröffentlicht und niemand benachrichtigt.');
  await expect(page.locator('.completion-card')).toContainText('Kein erkennbarer Nutzen');
  expect(mutations).toEqual([]);
  expect(await page.evaluate(() => Object.keys(localStorage))).toEqual([]);
  expect(await page.evaluate(() => Object.keys(sessionStorage))).toEqual([]);
});

test('existing application routes remain available', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.use-case-card')).toHaveCount(3);
  await noOverflow(page);
  for (const path of ['/use-cases', '/community', '/guidelines', '/help']) {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
  }
  await page.goto('/team-lab');
  await expect(page.getByRole('heading', { name: 'AI Team Experiment', exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Team Lab starten', exact: true })).toBeVisible();
});
