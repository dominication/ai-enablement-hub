import { expect, test, type Page } from '@playwright/test';

const workshop = '/team-lab/experiment';
const service = 'Wöchentlichen Service-Status erstellen';
const hypothesis = 'Wenn wir Informationen bündeln lassen, können wir die Prioritäten gemeinsam prüfen. Wir beobachten auch zusätzliche Kontrollarbeit.';
async function noOverflow(page: Page) {
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
}
async function toExperiment(page: Page) {
  await page.goto(workshop);
  await page.getByRole('button', { name: 'Gemeinsam fokussieren', exact: true }).click();
  await expect(page.getByRole('radio', { checked: true })).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Aufgabe gemeinsam untersuchen', exact: true })).toBeDisabled();
  await page.getByRole('radio', { name: `Unser Fokus: ${service}`, exact: true }).check();
  await page.getByRole('button', { name: 'Aufgabe gemeinsam untersuchen', exact: true }).click();
  await page.getByRole('button', { name: 'Voraussetzungen klären', exact: true }).click();
  await page.getByRole('button', { name: 'Experiment gestalten', exact: true }).click();
}
async function toRetro(page: Page) {
  await toExperiment(page);
  await page.getByRole('button', { name: 'Experiment vorbereiten', exact: true }).click();
  await page.getByRole('button', { name: 'Experiment starten', exact: true }).click();
  await page.getByRole('button', { name: 'Demo-Retrospektive ansehen', exact: true }).click();
}

test('full team canvas: custom contribution, mapping, criteria, adaptation and transparent learning', async ({ page }, testInfo) => {
  const errors: string[] = [];
  const mutations: string[] = [];
  const external: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('request', (request) => {
    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(request.method())) mutations.push(request.url());
    if (new URL(request.url()).hostname !== '127.0.0.1') external.push(request.url());
  });
  await page.goto('/team-lab');
  await expect(page.getByRole('heading', { name: 'AI Team Experiment', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Nicht das Tool steht am Anfang' })).toBeVisible();
  await noOverflow(page);
  await page.getByRole('link', { name: 'Team Lab starten', exact: true }).click();
  await expect(page.getByText('Demo-Team – alle Rollen, Beiträge und Inhalte sind fiktiv.')).toBeVisible();
  await expect(page.getByText(/es sind keine anderen Personen verbunden/)).toBeVisible();
  await expect(page.locator('.tl-activity-card')).toHaveCount(6);
  await page.getByRole('button', { name: 'Eigene Demo-Aufgabe ergänzen' }).click();
  await page.getByLabel('Aufgabe', { exact: true }).fill('Übergaben abstimmen');
  await page.getByLabel('Wo entsteht Reibung?', { exact: true }).fill('Rückfragen bleiben nach der Übergabe offen.');
  await page.getByRole('button', { name: 'Beitrag übernehmen', exact: true }).click();
  await expect(page.locator('.tl-activity-card')).toHaveCount(7);
  await page.getByRole('button', { name: 'Eigenen Beitrag bearbeiten' }).click();
  await page.getByLabel('Aufgabe', { exact: true }).fill('Übergaben gemeinsam klären');
  await page.getByRole('button', { name: 'Beitrag übernehmen', exact: true }).click();
  await expect(page.getByRole('checkbox', { name: 'Untersuchen: Übergaben gemeinsam klären', exact: true })).toBeChecked();
  await noOverflow(page);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: testInfo.outputPath('team-work-board.png'), fullPage: true });
  await page.getByRole('button', { name: 'Gemeinsam fokussieren', exact: true }).click();
  const focusCard = page.locator('.tl-focus-card').filter({ has: page.getByRole('heading', { name: service, exact: true }) });
  await focusCard.getByRole('combobox', { name: 'Kostet sie spürbar Zeit oder Aufmerksamkeit?', exact: true }).selectOption('mittel');
  await page.getByRole('radio', { name: `Unser Fokus: ${service}`, exact: true }).check();
  await expect(page.getByText('AI könnte bei Vorbereitung oder Strukturierung unterstützen. Die Beurteilung selbst bleibt beim Menschen.', { exact: false }).first()).toBeVisible();
  await page.getByRole('button', { name: 'Aufgabe gemeinsam untersuchen', exact: true }).click();
  const assignment = page.getByLabel('Zuordnung: Informationen aus Quellen sammeln', { exact: true });
  await assignment.focus();
  await page.keyboard.press('ArrowDown');
  await expect(assignment).toHaveValue('together');
  await expect(assignment).toBeFocused();
  await expect(page.getByRole('region', { name: 'Gemeinsam prüfen', exact: true })).toContainText('Informationen aus Quellen sammeln');
  await noOverflow(page);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: testInfo.outputPath('team-mapping.png'), fullPage: true });
  await page.getByRole('button', { name: 'Voraussetzungen klären', exact: true }).click();
  await page.getByRole('checkbox', { name: 'keine automatische Erwartung, dass Arbeit sofort schneller wird', exact: true }).check();
  await expect(page.getByText('Ein Experiment braucht Raum zum Lernen. Neue Arbeitsweisen können zunächst auch zusätzlichen Aufwand erzeugen.')).toBeVisible();
  await page.getByRole('button', { name: 'Experiment gestalten', exact: true }).click();
  await page.getByLabel('Unsere Hypothese', { exact: true }).fill(hypothesis);
  await page.getByLabel('Zeitraum', { exact: true }).selectOption('4 Wochen');
  await page.getByRole('checkbox', { name: 'Zusammenarbeit wird klarer', exact: true }).check();
  await page.getByRole('checkbox', { name: 'mehr statt weniger Arbeitsaufwand', exact: true }).check();
  await page.getByRole('button', { name: 'Experiment vorbereiten', exact: true }).click();
  const canvas = page.getByRole('article', { name: 'Experiment-Canvas' });
  await expect(canvas).toContainText(hypothesis);
  await expect(canvas).toContainText('4 Wochen');
  await expect(canvas).toContainText('mehr statt weniger Arbeitsaufwand');
  await expect(canvas).toContainText('Zusammenarbeit wird klarer');
  await expect(canvas).toContainText('keine automatische Erwartung, dass Arbeit sofort schneller wird');
  await noOverflow(page);
  await page.getByRole('button', { name: 'Experiment starten', exact: true }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Experiment vorbereitet');
  await expect(page.getByText(/Es wurde kein realer Versuch gestartet/)).toBeVisible();
  await page.getByRole('button', { name: 'Demo-Retrospektive ansehen', exact: true }).click();
  await expect(page.locator('.tl-retro-findings')).toContainText('zusätzliche Kontrollarbeit');
  await expect(page.getByRole('button', { name: 'Learning teilen', exact: true })).toBeDisabled();
  await page.getByRole('radio', { name: /^Anpassen und erneut testen/ }).check();
  await page.getByLabel('Was verändern wir beim nächsten Versuch?', { exact: true }).fill('Prüfung gemeinsam im Team durchführen.');
  await page.getByLabel('Was haben wir über unsere Arbeit gelernt?', { exact: true }).fill('Einordnung braucht Perspektiven aus mehreren Rollen.');
  await page.getByLabel('Was haben wir über die Zusammenarbeit mit AI gelernt?', { exact: true }).fill('Prüfen bleibt notwendig.');
  await page.getByLabel('Was sollten andere Teams wissen?', { exact: true }).fill('Kontrollarbeit bewusst einplanen.');
  await page.getByRole('button', { name: 'Learning teilen', exact: true }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Vorschau des Team-Learnings');
  const preview = page.getByRole('article', { name: 'Team-Learning' });
  await expect(preview).toContainText('Anpassen und erneut testen');
  await expect(preview).toContainText('Prüfung gemeinsam im Team durchführen.');
  await expect(preview).toContainText('Einordnung braucht Perspektiven aus mehreren Rollen.');
  await expect(page.getByText('So könnte dieses Learning für andere Teams sichtbar werden. Im Prototyp wird nichts veröffentlicht.')).toBeVisible();
  await page.getByRole('button', { name: 'Zurück zur Retrospektive', exact: true }).click();
  await expect(page.getByLabel('Was verändern wir beim nächsten Versuch?', { exact: true })).toHaveValue('Prüfung gemeinsam im Team durchführen.');
  await page.getByRole('radio', { name: /^Weiterführen/ }).check();
  await page.getByLabel('Was muss dauerhaft geklärt bleiben?', { exact: true }).fill('Freigabe und Zuständigkeiten bleiben beim Team.');
  await page.getByRole('button', { name: 'Learning teilen', exact: true }).click();
  await expect(preview).toContainText('Weiterführen');
  await expect(preview).toContainText('Freigabe und Zuständigkeiten bleiben beim Team.');
  await expect(preview).not.toContainText('Prüfung gemeinsam im Team durchführen.');
  await noOverflow(page);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: testInfo.outputPath('team-learning.png'), fullPage: true });
  await page.getByRole('button', { name: 'Vorschau bestätigen', exact: true }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Team Experiment abgeschlossen');
  await expect(page.locator('.tl-stage-heading')).toContainText('nicht veröffentlicht');
  await expect(page.getByRole('link', { name: 'Zur Community', exact: true })).toHaveAttribute('href', '/community');
  expect(errors).toEqual([]); expect(mutations).toEqual([]); expect(external).toEqual([]);
  expect(await page.evaluate(() => Object.keys(localStorage))).toEqual([]);
  expect(await page.evaluate(() => Object.keys(sessionStorage))).toEqual([]);
  await page.getByRole('button', { name: 'Neues Team Experiment starten', exact: true }).click();
  await expect(page.locator('.tl-activity-card')).toHaveCount(6);
  await expect(page.getByRole('checkbox', { checked: true })).toHaveCount(2);
  await page.getByRole('button', { name: 'Gemeinsam fokussieren', exact: true }).click();
  await expect(page.getByRole('radio', { checked: true })).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Aufgabe gemeinsam untersuchen', exact: true })).toBeDisabled();
});

test('stopping is an equal valid outcome and preview excludes stale continuation text', async ({ page }) => {
  await toRetro(page);
  const continueOption = page.getByRole('radio', { name: /^Weiterführen/ });
  await continueOption.check();
  const continueStyle = await continueOption.locator('..').evaluate((label) => ({ background: getComputedStyle(label).backgroundColor, border: getComputedStyle(label).borderColor }));
  await page.getByLabel('Was muss dauerhaft geklärt bleiben?', { exact: true }).fill('Nur für Weiterführen');
  const stop = page.getByRole('radio', { name: /^Stoppen/ });
  await stop.focus(); await page.keyboard.press('Space');
  const stopStyle = await stop.locator('..').evaluate((label) => ({ background: getComputedStyle(label).backgroundColor, border: getComputedStyle(label).borderColor }));
  expect(stopStyle).toEqual(continueStyle);
  await expect(page.getByText('Ein bewusst beendetes Experiment ist ebenfalls ein Ergebnis. Das Team weiss jetzt mehr darüber, wo AI in dieser Arbeit nicht sinnvoll unterstützt.')).toBeVisible();
  await page.getByRole('button', { name: 'Learning teilen', exact: true }).click();
  const preview = page.getByRole('article', { name: 'Team-Learning' });
  await expect(preview).toContainText('Stoppen');
  await expect(preview).toContainText('Den AI-Versuch beenden');
  await expect(preview).not.toContainText('Nur für Weiterführen');
  await page.getByRole('button', { name: 'Vorschau bestätigen', exact: true }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Team Experiment abgeschlossen');
  await page.reload();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Wo verlieren wir heute Zeit oder Energie?');
});

test('empty choices are guarded and a custom focus uses the general template', async ({ page }) => {
  await page.goto(workshop);
  for (const checkbox of await page.getByRole('checkbox').all()) await checkbox.uncheck();
  await expect(page.getByRole('button', { name: 'Gemeinsam fokussieren', exact: true })).toBeDisabled();
  await page.getByRole('button', { name: 'Eigene Demo-Aufgabe ergänzen' }).click();
  await page.getByLabel('Aufgabe', { exact: true }).fill('   ');
  await page.getByLabel('Wo entsteht Reibung?', { exact: true }).fill('Reibung');
  await expect(page.getByRole('button', { name: 'Beitrag übernehmen', exact: true })).toBeDisabled();
  await page.getByLabel('Aufgabe', { exact: true }).fill('Fiktive Übergaben klären');
  await page.getByRole('button', { name: 'Beitrag übernehmen', exact: true }).click();
  await page.getByRole('button', { name: 'Gemeinsam fokussieren', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Aufgabe gemeinsam untersuchen', exact: true })).toBeDisabled();
  await page.getByRole('radio', { name: 'Unser Fokus: Fiktive Übergaben klären', exact: true }).check();
  await page.getByRole('button', { name: 'Aufgabe gemeinsam untersuchen', exact: true }).click();
  await expect(page.locator('.tl-mapping-board article')).toHaveCount(6);
  await expect(page.locator('.tl-mapping-board')).not.toContainText('Finalen Status freigeben');
  await page.getByRole('button', { name: 'Voraussetzungen klären', exact: true }).click();
  await page.getByRole('button', { name: 'Experiment gestalten', exact: true }).click();
  await expect(page.getByLabel('Unsere Hypothese', { exact: true })).not.toHaveValue(/Statusquellen/);
  await page.getByLabel('Unsere Hypothese', { exact: true }).fill('');
  await expect(page.getByRole('button', { name: 'Experiment vorbereiten', exact: true })).toBeDisabled();
  await page.getByLabel('Unsere Hypothese', { exact: true }).fill('Wir untersuchen die Strukturierung der Übergabe.');
  const negatives = page.getByRole('group', { name: 'Worauf achten wir bewusst?', exact: true });
  for (const checkbox of await negatives.getByRole('checkbox').all()) await checkbox.uncheck();
  await expect(page.getByRole('button', { name: 'Experiment vorbereiten', exact: true })).toBeDisabled();
  await negatives.getByRole('checkbox', { name: 'Informationsverlust', exact: true }).check();
  await page.getByRole('button', { name: 'Experiment vorbereiten', exact: true }).click();
  await expect(page.getByRole('article', { name: 'Experiment-Canvas' })).toContainText('Fiktive Übergaben klären');
  await noOverflow(page);
});

test('search returns Team Lab only for relevant intent', async ({ page }) => {
  for (const term of ['team', 'teams', 'zusammenarbeit', 'experiment', 'arbeitsweise']) {
    await page.goto(`/use-cases?q=${encodeURIComponent(term)}`);
    await expect(page.locator('.use-case-card')).toHaveCount(1);
    await expect(page.locator('.use-case-card')).toContainText('AI Team Experiment');
  }
  for (const [term, title] of [['meeting', 'Meeting-Ergebnisse aufbereiten'], ['meetings', 'Meeting-Ergebnisse aufbereiten'], ['recherche', 'Recherche strukturieren und verdichten']]) {
    await page.goto(`/use-cases?q=${term}`);
    await expect(page.locator('.use-case-card')).toHaveCount(1);
    await expect(page.locator('.use-case-card h3')).toHaveText(title);
    await expect(page.locator('.use-case-card')).not.toContainText('AI Team Experiment');
  }
});

const preparedTitles = [service, 'Wiederkehrende Kundenanfragen sortieren', 'Meetings dokumentieren', 'Prozessinformationen aktuell halten', 'Schwierige Kundenfälle beurteilen', 'Übergaben zwischen Teams koordinieren'];
for (const title of [...preparedTitles, 'Eigene Prüfaufgabe']) {
  test(`explicit focus and neutral retrospective with all outcomes: ${title}`, async ({ page }) => {
    await page.goto(workshop);
    await expect(page.getByText('Mitarbeitergespräche vorbereiten', { exact: true })).toHaveCount(0);
    if (title === preparedTitles[5]) {
      const card = page.locator('.tl-activity-card').filter({ hasText: title });
      await expect(card).toContainText('Informationen, offene Punkte und Verantwortlichkeiten bei Übergaben zwischen Teams zusammenführen.');
      await expect(card).toContainText('Prozessverantwortung');
    }
    if (title === 'Eigene Prüfaufgabe') {
      await page.getByRole('button', { name: 'Eigene Demo-Aufgabe ergänzen' }).click();
      await page.getByLabel('Aufgabe', { exact: true }).fill(title);
      await page.getByLabel('Wo entsteht Reibung?', { exact: true }).fill('Informationen fehlen.');
      await page.getByRole('button', { name: 'Beitrag übernehmen', exact: true }).click();
    } else {
      await page.getByRole('checkbox', { name: `Untersuchen: ${title}`, exact: true }).check();
    }
    await page.getByRole('button', { name: 'Gemeinsam fokussieren', exact: true }).click();
    await expect(page.getByRole('radio', { checked: true })).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'Aufgabe gemeinsam untersuchen', exact: true })).toBeDisabled();
    if (title === preparedTitles[5]) {
      const card = page.locator('.tl-focus-card').filter({ has: page.getByRole('heading', { name: title, exact: true }) });
      const values = await card.getByRole('combobox').evaluateAll((items) => items.map((item) => (item as HTMLSelectElement).value));
      expect(values).toEqual(['ja', 'hoch', 'teilweise', 'hoch']);
    }
    const focus = page.getByRole('radio', { name: `Unser Fokus: ${title}`, exact: true });
    await focus.focus(); await page.keyboard.press('Space');
    await expect(focus).toBeChecked();
    await page.getByRole('button', { name: 'Aufgabe gemeinsam untersuchen', exact: true }).click();
    await expect(page.locator('.tl-focus-strip')).toContainText(title);
    await expect(page.locator('.tl-mapping-board article')).toHaveCount(title === service ? 7 : 6);
    await page.getByRole('button', { name: 'Voraussetzungen klären', exact: true }).click();
    await page.getByRole('button', { name: 'Experiment gestalten', exact: true }).click();
    if (title !== service) await expect(page.getByLabel('Unsere Hypothese', { exact: true })).not.toHaveValue(/Statusquellen/);
    await page.getByRole('button', { name: 'Experiment vorbereiten', exact: true }).click();
    await page.getByRole('button', { name: 'Experiment starten', exact: true }).click();
    await page.getByRole('button', { name: 'Demo-Retrospektive ansehen', exact: true }).click();
    await expect(page.getByText(/Kein Experiment wurde tatsächlich durchgeführt/)).toBeVisible();
    const findings = page.locator('.tl-retro-findings');
    await expect(findings).not.toContainText(/Statusinformationen|Statusquellen|nach zwei Wochen|Entwurf/);
    await expect(findings).toContainText('zusätzliche Kontrollarbeit');
    await expect(findings).toContainText('wiederkehrende Themen wurden leichter sichtbar');
    await expect(page.getByLabel('Was haben wir über unsere Arbeit gelernt?', { exact: true })).not.toHaveValue(/Status/);
    await noOverflow(page);
    for (const outcome of ['Weiterführen', 'Anpassen und erneut testen', 'Stoppen']) {
      await page.getByRole('radio', { name: new RegExp(`^${outcome}`) }).check();
      await page.getByRole('button', { name: 'Learning teilen', exact: true }).click();
      const preview = page.getByRole('article', { name: 'Team-Learning' });
      await expect(preview).toContainText(title);
      await expect(preview).toContainText(outcome);
      await noOverflow(page);
      await page.getByRole('button', { name: 'Zurück zur Retrospektive', exact: true }).click();
    }
  });
}

test('switching focus resets dependent edits and removing focus requires a fresh choice', async ({ page }) => {
  await toExperiment(page);
  await page.getByLabel('Unsere Hypothese', { exact: true }).fill('Alte Hypothese');
  await page.getByLabel('Zeitraum', { exact: true }).selectOption('4 Wochen');
  await page.getByRole('checkbox', { name: 'Zusammenarbeit wird klarer', exact: true }).check();
  await page.getByRole('button', { name: /Mensch & AI/ }).click();
  await page.getByLabel('Zuordnung: Informationen aus Quellen sammeln', { exact: true }).selectOption('human');
  await page.getByRole('button', { name: 'Voraussetzungen klären', exact: true }).click();
  await page.getByRole('button', { name: 'Experiment gestalten', exact: true }).click();
  await expect(page.getByLabel('Unsere Hypothese', { exact: true })).toHaveValue('Alte Hypothese');
  await page.getByRole('button', { name: 'Experiment vorbereiten', exact: true }).click();
  await page.getByRole('button', { name: 'Experiment starten', exact: true }).click();
  await page.getByRole('button', { name: 'Demo-Retrospektive ansehen', exact: true }).click();
  await page.getByRole('radio', { name: /^Weiterführen/ }).check();
  await page.getByLabel('Was muss dauerhaft geklärt bleiben?', { exact: true }).fill('Alter Folgeschritt');
  await page.getByLabel('Was haben wir über unsere Arbeit gelernt?', { exact: true }).fill('Alte Reflexion');
  await page.getByRole('button', { name: 'Fokus', exact: true }).click();
  await page.getByRole('radio', { name: 'Unser Fokus: Schwierige Kundenfälle beurteilen', exact: true }).check();
  await page.getByRole('button', { name: 'Aufgabe gemeinsam untersuchen', exact: true }).click();
  await expect(page.getByLabel('Zuordnung: Informationen zur Aufgabe sammeln', { exact: true })).toHaveValue('ai');
  await expect(page.locator('.tl-mapping-board')).not.toContainText('Finalen Status freigeben');
  await page.getByRole('button', { name: 'Voraussetzungen klären', exact: true }).click();
  await page.getByRole('button', { name: 'Experiment gestalten', exact: true }).click();
  await expect(page.getByLabel('Unsere Hypothese', { exact: true })).not.toHaveValue(/Alte Hypothese|Statusquellen/);
  await expect(page.getByLabel('Zeitraum', { exact: true })).toHaveValue('3 Wochen');
  await expect(page.getByRole('checkbox', { name: 'Zusammenarbeit wird klarer', exact: true })).not.toBeChecked();
  await page.getByRole('button', { name: 'Experiment vorbereiten', exact: true }).click();
  await page.getByRole('button', { name: 'Experiment starten', exact: true }).click();
  await page.getByRole('button', { name: 'Demo-Retrospektive ansehen', exact: true }).click();
  await expect(page.getByRole('radio', { checked: true })).toHaveCount(0);
  await expect(page.getByLabel('Was haben wir über unsere Arbeit gelernt?', { exact: true })).not.toHaveValue('Alte Reflexion');
  await page.getByRole('radio', { name: /^Weiterführen/ }).check();
  await expect(page.getByLabel('Was muss dauerhaft geklärt bleiben?', { exact: true })).not.toHaveValue('Alter Folgeschritt');
  await page.getByRole('button', { name: 'Arbeit', exact: true }).click();
  const checkbox = page.getByRole('checkbox', { name: 'Untersuchen: Schwierige Kundenfälle beurteilen', exact: true });
  await checkbox.uncheck(); await checkbox.check();
  await page.getByRole('button', { name: 'Gemeinsam fokussieren', exact: true }).click();
  await expect(page.getByRole('radio', { checked: true })).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Aufgabe gemeinsam untersuchen', exact: true })).toBeDisabled();
});
