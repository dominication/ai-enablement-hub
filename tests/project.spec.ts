import { expect, test, type Page } from '@playwright/test';

const detail = '/use-cases/projektstatus-vorbereiten';
const workspace = `${detail}/experiment`;
const addedContext = 'Der Test ist Voraussetzung für den extern vereinbarten Pilot. Zwei Teams sind abhängig. Eine weitere Verschiebung gefährdet den Go-live.';

async function openReview(page: Page) {
  await page.goto(workspace);
  await page.getByRole('button', { name: 'Veränderungen erkennen', exact: true }).click();
  await page.getByRole('button', { name: 'Veränderungen einordnen', exact: true }).click();
}
async function chooseHighRisk(page: Page) {
  await page.getByRole('radio', { name: 'hoch', exact: true }).check();
  await page.getByLabel('Welcher Kontext fehlt?', { exact: true }).fill(addedContext);
}
async function noOverflow(page: Page) {
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
}

test('complete workspace: evidence, keyboard risk judgement, editable status and local learning', async ({ page }, testInfo) => {
  const errors: string[] = [];
  const mutations: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('request', (request) => { if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(request.method())) mutations.push(request.url()); });
  await page.goto(detail);
  await expect(page.getByRole('heading', { name: 'Was verändert sich?' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Mehr Zeit für Steuerung statt Sammelarbeit' })).toBeVisible();
  await noOverflow(page);
  await page.screenshot({ path: testInfo.outputPath('project-detail.png'), fullPage: true });
  await page.getByRole('link', { name: 'Workflow ausprobieren', exact: true }).click();
  await expect(page.getByRole('checkbox', { checked: true })).toHaveCount(4);
  const source = page.locator('.pm-source-row').filter({ hasText: 'Meetingnotizen' });
  const preview = source.getByRole('button', { name: 'Vorschau ansehen' });
  await preview.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('dialog')).toContainText('Team Serviceprozesse');
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(preview).toBeFocused();
  await noOverflow(page);
  await page.getByRole('button', { name: 'Veränderungen erkennen', exact: true }).click();
  await expect(page.locator('.pm-change-timeline article')).toHaveCount(4);
  const delay = page.getByRole('article', { name: 'Integrationstest verschiebt sich um 7 Tage', exact: true });
  await delay.getByRole('button', { name: 'Quelle ansehen' }).click();
  await expect(page.getByRole('dialog')).toContainText('20. Oktober');
  await expect(page.getByRole('dialog')).toContainText('27. Oktober');
  await expect(page.getByRole('dialog').locator('.pm-evidence-entry')).toHaveCount(3);
  await page.getByRole('button', { name: 'Schliessen', exact: true }).click();
  await page.getByRole('button', { name: 'Veränderungen einordnen', exact: true }).click();
  await expect(page.locator('.pm-preliminary')).toContainText('Risiko: niedrig');
  await expect(page.getByRole('button', { name: 'Statusentwurf erstellen' })).toBeDisabled();
  const high = page.getByRole('radio', { name: 'hoch', exact: true });
  await high.focus();
  await page.keyboard.press('Space');
  await expect(high).toBeChecked();
  await page.getByLabel('Welcher Kontext fehlt?', { exact: true }).fill(addedContext);
  await expect(page.locator('.pm-your-assessment')).toContainText('Risiko: hoch');
  await expect(page.locator('.pm-your-assessment')).toContainText('Die Information war vorhanden. Ihre Bedeutung entstand erst durch deinen Projektkontext.');
  const pilot = page.getByRole('article', { name: 'Pilotgruppe wird von 30 auf 50 Personen erweitert', exact: true });
  await pilot.getByText('Anpassen / Kontext ergänzen', { exact: true }).click();
  await pilot.getByLabel('Zusätzlicher Kontext', { exact: true }).fill('Die Betreuungskapazität muss vorab geklärt werden.');
  await pilot.getByRole('button', { name: 'Bestätigen', exact: true }).click();
  await page.getByRole('article', { name: 'Verantwortung für die Kommunikation vor dem Pilot ist noch ungeklärt', exact: true }).getByRole('button', { name: 'Als nicht relevant markieren' }).click();
  await noOverflow(page);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: testInfo.outputPath('project-context.png'), fullPage: true });
  await page.getByRole('button', { name: 'Statusentwurf erstellen', exact: true }).click();
  await expect(page.getByLabel('Risiken', { exact: true })).toHaveValue(new RegExp('Risiko: hoch'));
  await expect(page.getByLabel('Risiken', { exact: true })).toHaveValue(new RegExp(addedContext.replaceAll('.', '\\.')));
  await expect(page.getByLabel('Gesamtstatus', { exact: true })).toHaveValue(/Formulierungsvorschlag/);
  await expect(page.getByLabel('Entscheidungen', { exact: true })).toHaveValue(/Betreuungskapazität/);
  await expect(page.getByLabel('Offene Punkte', { exact: true })).toHaveValue(/Noch nicht eingeordnete Hinweise/);
  await expect(page.getByLabel('Offene Punkte', { exact: true })).not.toHaveValue(/Kommunikation/);
  await expect(page.getByLabel('Nächste Schritte', { exact: true })).not.toHaveValue(/Pilotkommunikation/);
  await page.getByLabel('Gesamtstatus', { exact: true }).fill('angespannt – Pilotabhängigkeiten mit dem Lenkungskreis klären.');
  await page.getByLabel('Nächste Schritte', { exact: true }).fill('Testkoordination und abhängige Teams gemeinsam einladen.');
  await page.getByRole('button', { name: 'Einordnung prüfen', exact: true }).click();
  await page.getByRole('button', { name: 'Zum Statusentwurf', exact: true }).click();
  await expect(page.getByLabel('Nächste Schritte', { exact: true })).toHaveValue('Testkoordination und abhängige Teams gemeinsam einladen.');
  await page.getByRole('button', { name: 'Entscheidungen entfernen', exact: true }).click();
  await expect(page.getByLabel('Entscheidungen', { exact: true })).toHaveCount(0);
  await page.getByRole('button', { name: 'Entscheidungen wiederherstellen', exact: true }).click();
  await expect(page.getByLabel('Entscheidungen', { exact: true })).toHaveValue(/Betreuungskapazität/);
  await noOverflow(page);
  await page.evaluate(() => window.scrollTo(0, 0));
  await expect.poll(() => page.locator('.pm-document-section textarea').evaluateAll((fields) => fields.every((field) => field.scrollHeight <= field.clientHeight + 2))).toBe(true);
  await page.screenshot({ path: testInfo.outputPath('project-status.png'), fullPage: true });
  await page.getByRole('button', { name: 'Status finalisieren', exact: true }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Was hat sich in deiner Arbeit verändert?');
  await expect(page.getByRole('button', { name: 'Learning teilen', exact: true })).toBeDisabled();
  await page.getByRole('radio', { name: 'Informationen zusammentragen', exact: true }).check();
  await page.getByRole('checkbox', { name: 'Risiken bewerten', exact: true }).check();
  await page.getByRole('checkbox', { name: 'Stakeholder-Kontext', exact: true }).check();
  await page.getByLabel('Was würdest du beim nächsten Mal anders machen?', { exact: false }).fill('Pilotabhängigkeiten früher abstimmen.');
  await page.getByRole('button', { name: 'Learning teilen', exact: true }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Erfahrung gespeichert');
  await expect(page.locator('.pm-completion')).toContainText('Pilotabhängigkeiten früher abstimmen.');
  await expect(page.locator('.pm-completion')).toContainText('nicht veröffentlicht');
  await noOverflow(page);
  expect(mutations).toEqual([]);
  expect(errors).toEqual([]);
  expect(await page.evaluate(() => Object.keys(localStorage))).toEqual([]);
  expect(await page.evaluate(() => Object.keys(sessionStorage))).toEqual([]);
});

test('source selection constrains comparison and prevents unsupported assertions', async ({ page }) => {
  await page.goto(workspace);
  await page.getByRole('checkbox', { name: /Letzter Projektstatus/ }).uncheck();
  await expect(page.getByRole('button', { name: 'Veränderungen erkennen', exact: true })).toBeDisabled();
  await page.getByRole('checkbox', { name: /Letzter Projektstatus/ }).check();
  await page.getByRole('checkbox', { name: /Meetingnotizen/ }).uncheck();
  await page.getByRole('checkbox', { name: /Aufgaben & Meilensteine/ }).uncheck();
  await page.getByRole('checkbox', { name: /Entscheidungen & offene Punkte/ }).uncheck();
  await expect(page.getByRole('button', { name: 'Veränderungen erkennen', exact: true })).toBeDisabled();
  await page.getByRole('checkbox', { name: /Entscheidungen & offene Punkte/ }).check();
  await page.getByRole('button', { name: 'Veränderungen erkennen', exact: true }).click();
  await expect(page.locator('.pm-change-timeline article')).toHaveCount(2);
  await expect(page.locator('.pm-change-timeline')).not.toContainText('Integrationstest verschiebt');
  await page.getByRole('button', { name: 'Quelle ansehen', exact: true }).first().click();
  await expect(page.getByRole('dialog').locator('.pm-evidence-entry')).toHaveCount(2);
  await expect(page.getByRole('dialog')).not.toContainText('Meetingnotizen');
  await page.keyboard.press('Escape');
  await page.getByRole('button', { name: 'Veränderungen einordnen', exact: true }).click();
  await expect(page.getByRole('radio', { name: 'hoch', exact: true })).toHaveCount(0);
  const pilot = page.getByRole('article', { name: 'Pilotgruppe wird von 30 auf 50 Personen erweitert', exact: true });
  await pilot.getByRole('button', { name: 'Bestätigen', exact: true }).click();
  const dependency = page.getByRole('article', { name: 'Schnittstelle zu einem abhängigen System ist noch nicht bestätigt', exact: true });
  await dependency.getByRole('button', { name: 'Als nicht relevant markieren' }).click();
  await page.getByRole('button', { name: 'Statusentwurf erstellen', exact: true }).click();
  await expect(page.getByLabel('Wichtigste Veränderungen', { exact: true })).toHaveValue(/50 Personen/);
  await expect(page.getByLabel('Wichtigste Veränderungen', { exact: true })).not.toHaveValue(/Integrationstest|Schnittstelle/);
  await expect(page.getByLabel('Nächste Schritte', { exact: true })).not.toHaveValue(/Schnittstelle|Testkoordination/);
  await expect(page.getByLabel('Risiken', { exact: true })).toHaveValue(/Noch keine Risikoeinordnung/);
});

test('revised context refreshes drafts explicitly and empty documents cannot be finalised', async ({ page }) => {
  await openReview(page);
  await chooseHighRisk(page);
  await page.getByRole('button', { name: 'Statusentwurf erstellen', exact: true }).click();
  await page.getByLabel('Gesamtstatus', { exact: true }).fill('Eigene Formulierung');
  await page.getByRole('button', { name: 'Einordnung prüfen', exact: true }).click();
  await page.getByRole('radio', { name: 'mittel', exact: true }).check();
  await page.getByLabel('Welcher Kontext fehlt?', { exact: true }).fill('Ein Ersatzfenster ist verbindlich vereinbart.');
  await expect(page.getByText(/ersetzt den bisherigen Entwurf einschliesslich deiner Textänderungen/)).toBeVisible();
  await expect(page.getByRole('navigation', { name: 'Projektworkflow' }).getByRole('button', { name: /Status/ })).toBeDisabled();
  await page.getByRole('button', { name: 'Statusentwurf erstellen', exact: true }).click();
  await expect(page.getByLabel('Risiken', { exact: true })).toHaveValue(/Risiko: mittel/);
  await expect(page.getByLabel('Risiken', { exact: true })).toHaveValue(/Ersatzfenster/);
  await expect(page.getByLabel('Gesamtstatus', { exact: true })).not.toHaveValue('Eigene Formulierung');
  for (const title of ['Gesamtstatus', 'Wichtigste Veränderungen', 'Risiken', 'Entscheidungen', 'Offene Punkte', 'Nächste Schritte']) {
    await page.getByRole('button', { name: `${title} entfernen`, exact: true }).click();
  }
  await expect(page.getByRole('button', { name: 'Status finalisieren', exact: true })).toBeDisabled();
  await page.getByRole('button', { name: 'Gesamtstatus wiederherstellen', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Status finalisieren', exact: true })).toBeEnabled();
  await page.getByRole('button', { name: 'Quellenauswahl bearbeiten', exact: true }).click();
  await page.getByRole('checkbox', { name: /Meetingnotizen/ }).uncheck();
  await expect(page.getByRole('navigation', { name: 'Projektworkflow' }).getByRole('button', { name: /Status/ })).toBeDisabled();
  await page.getByRole('button', { name: 'Veränderungen erkennen', exact: true }).click();
  await page.getByRole('button', { name: 'Veränderungen einordnen', exact: true }).click();
  await expect(page.getByRole('radio', { checked: true })).toHaveCount(0);
  await expect(page.getByLabel('Welcher Kontext fehlt?', { exact: true })).toHaveValue('');
});

test('reuse starts an honest new demo preparation and reload clears state', async ({ page }) => {
  await openReview(page);
  await page.getByRole('radio', { name: 'hoch', exact: true }).check();
  await page.getByText('Projektwissen für dieses Demo-Beispiel', { exact: true }).click();
  await page.getByRole('button', { name: 'Beispielkontext übernehmen', exact: true }).click();
  await expect(page.getByLabel('Welcher Kontext fehlt?', { exact: true })).toHaveValue(/Zwei weitere Teams/);
  await page.getByRole('button', { name: 'Statusentwurf erstellen', exact: true }).click();
  await page.getByRole('button', { name: 'Status finalisieren', exact: true }).click();
  await page.getByRole('radio', { name: 'Keine erkennbare Entlastung', exact: true }).check();
  await page.getByRole('checkbox', { name: 'Entscheidungen', exact: true }).check();
  await page.getByRole('button', { name: 'Workflow wiederverwenden', exact: true }).click();
  await page.getByRole('button', { name: 'Aktuelle Vorbereitung behalten', exact: true }).click();
  await expect(page.getByRole('radio', { name: 'Keine erkennbare Entlastung', exact: true })).toBeChecked();
  await page.getByRole('button', { name: 'Workflow wiederverwenden', exact: true }).click();
  await page.getByRole('button', { name: 'Neue Vorbereitung starten', exact: true }).click();
  await expect(page.getByRole('checkbox', { checked: true })).toHaveCount(4);
  await expect(page.getByRole('status')).toContainText('dieselben fiktiven Beispieldaten');
  await page.getByRole('button', { name: 'Veränderungen erkennen', exact: true }).click();
  await page.getByRole('button', { name: 'Veränderungen einordnen', exact: true }).click();
  await expect(page.getByRole('radio', { checked: true })).toHaveCount(0);
  await expect(page.getByLabel('Welcher Kontext fehlt?', { exact: true })).toHaveValue('');
  await page.reload();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Welche Informationen möchtest du für den Status verwenden?');
});
