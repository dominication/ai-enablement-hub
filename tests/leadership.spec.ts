import { expect, test, type Page } from '@playwright/test';

const topics = {
  uncertainty: 'Ich bin selbst unsicher wegen KI und meiner Rolle',
  useCases: 'Ich möchte mit meinem Team Use Cases finden',
  perspectives: 'In meinem Team gibt es unterschiedliche Perspektiven oder Bedenken',
  capacity: 'Uns fehlen Zeit und Ressourcen',
  governance: 'Wir haben Fragen zu Qualität, Daten und Verantwortung',
  orientation: 'Ziele, Erwartungen oder Spielräume sind noch nicht ganz klar',
  other: 'Etwas anderes',
} as const;

async function noOverflow(page: Page) {
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
}

async function openGuide(page: Page, title: string) {
  await page.goto('/leadership/experiment');
  await page.getByRole('button', { name: new RegExp(title) }).click();
}

async function showSupport(page: Page) {
  await page.getByRole('button', { name: 'Unterstützung ansehen' }).click();
}

async function createTakeaway(page: Page) {
  await page.getByRole('button', { name: 'Mitnahme erstellen' }).click();
}

test('entry, library and Team Lab integrate the seven-path guide without changing featured cases', async ({ page }) => {
  await page.goto('/leadership');
  await expect(page).toHaveTitle(/KI im Team begleiten/);
  await expect(page.getByRole('heading', { level: 1, name: 'KI im Team begleiten' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Was du hier findest' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Womit du starten kannst' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Eine passende Arbeitshilfe' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Anders als das Team Lab' })).toBeVisible();
  await expect(page.getByText(/Lokaler Prototyp ohne KI-Analyse/)).toBeVisible();
  await noOverflow(page);

  await page.getByRole('link', { name: 'Guide öffnen' }).click();
  await expect(page).toHaveURL('/leadership/experiment');
  await expect(page.getByRole('region', { name: 'Sieben Einstiegspunkte' }).getByRole('button')).toHaveCount(7);
  await expect(page.getByRole('navigation', { name: 'Fortschritt im gewählten Guide' })).toHaveCount(0);
  for (const title of Object.values(topics)) await expect(page.getByRole('button', { name: new RegExp(title) })).toBeVisible();

  await page.goto('/use-cases?q=f%C3%BChrung');
  await expect(page.locator('.use-case-card h3')).toHaveText(['KI im Team begleiten']);
  await expect(page.getByRole('link', { name: 'Guide öffnen' })).toBeVisible();
  await page.goto('/use-cases?q=team');
  await expect(page.locator('.use-case-card h3')).toHaveText(['KI Team Experiment']);
  await page.goto('/');
  await expect(page.locator('.use-case-card h3')).toHaveText(['Interview mit KI vorbereiten', 'Projektstatus mit KI vorbereiten', 'KI Team Experiment']);
  await page.goto('/team-lab');
  await expect(page.getByText(/findest du im Führungskräfte-Guide den passenden Einstieg/)).toBeVisible();
  await expect(page.getByRole('link', { name: 'Zu «KI im Team begleiten»' })).toHaveAttribute('href', '/leadership');
});

test('uncertainty path changes the offer and produces a personal, editable takeaway', async ({ page }) => {
  await openGuide(page, topics.uncertainty);
  const offers = [
    ['Eigene Situation einordnen', 'Meine persönliche Orientierung'],
    ['Mit meinem Team offen sprechen', 'Mein nächstes Teamgespräch'],
    ['Gespräch mit der Bereichsleitung vorbereiten', 'Meine Fragen an die Bereichsleitung'],
  ] as const;

  for (const [offer, outputTitle] of offers) {
    await page.getByRole('radio', { name: new RegExp(offer) }).check();
    await showSupport(page);
    await expect(page.getByRole('heading', { level: 2, name: offer })).toBeVisible();
    await page.locator('.leadership-check-list').getByRole('checkbox').first().check();
    await page.getByLabel(/Mein nächster Schritt/).fill('Ein offenes Gespräch vereinbaren.');
    await createTakeaway(page);
    await expect(page.getByRole('region', { name: new RegExp(`Editierbare Mitnahme: ${outputTitle}`) })).toBeVisible();
    await expect(page.getByLabel('Mein nächster Schritt')).toHaveValue('Ein offenes Gespräch vereinbaren.');
    if (offer !== offers.at(-1)?.[0]) {
      await page.getByRole('button', { name: 'Unterstützung bearbeiten' }).click();
      await page.getByRole('button', { name: 'Zur Orientierung' }).click();
    }
  }
});

test('use-case discovery path creates a moderation template without inventing a shortlist', async ({ page }) => {
  await openGuide(page, topics.useCases);
  await page.getByRole('radio', { name: /Wir haben noch keine konkreten Ideen/ }).check();
  await showSupport(page);
  await page.getByRole('checkbox', { name: 'Informationen suchen oder ordnen' }).check();
  await expect(page.getByRole('heading', { name: 'Moderationskarte für die gemeinsame Sammlung' })).toBeVisible();
  await createTakeaway(page);

  await expect(page.getByRole('region', { name: /Moderationsvorlage/ })).toContainText('Es wurde keine Shortlist erfunden oder vorausgewählt.');
  await expect(page.getByLabel('Manuell eingetragene Sammelaufgaben')).toHaveValue(/Noch keine Aufgaben eingetragen/);
  await expect(page.getByLabel('Mögliche Friktionsfelder')).toHaveValue('– Informationen suchen oder ordnen');
});

test('use-case ideas path shortlists only manually entered and explicitly selected tasks', async ({ page }) => {
  await openGuide(page, topics.useCases);
  await page.getByRole('radio', { name: /Wir haben bereits Ideen/ }).check();
  await showSupport(page);

  const cards = page.locator('.leadership-idea');
  const names = ['Statusnotizen prüfen', 'Freigaben dokumentieren', 'Personaldaten analysieren'];
  for (let index = 0; index < names.length; index += 1) await cards.nth(index).getByLabel('Arbeitsaufgabe').fill(names[index]);
  await cards.nth(0).getByRole('radio', { name: 'Weiter untersuchen' }).check();
  await cards.nth(0).getByLabel(/Offene Klärungsfragen/).fill('Welche Daten sind freigegeben?');
  await cards.nth(1).getByRole('radio', { name: 'Später' }).check();
  await cards.nth(2).getByRole('radio', { name: 'Nicht passend' }).check();
  await createTakeaway(page);

  await expect(page.getByLabel('Weiter untersuchen')).toHaveValue(/Statusnotizen prüfen[\s\S]*Welche Daten sind freigegeben/);
  await expect(page.getByLabel('Weiter untersuchen')).not.toHaveValue(/Freigaben dokumentieren|Personaldaten analysieren/);
  await expect(page.getByLabel('Später oder nicht passend')).toHaveValue(/Freigaben dokumentieren – Später betrachten[\s\S]*Personaldaten analysieren – Nicht passend/);
  await expect(page.getByText(/keine Sicherheitsfreigabe und keine Eignungszertifizierung/)).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Eine Aufgabe im Team Lab genauer untersuchen?' })).toBeVisible();
  await expect(page.getByText(/keine Daten übertragen/)).toBeVisible();
});

test('perspectives path preserves difference and builds the selected conversation format', async ({ page }) => {
  await openGuide(page, topics.perspectives);
  await page.getByRole('radio', { name: /Sorge vor Rollenveränderung/ }).check();
  await showSupport(page);
  await page.getByRole('radio', { name: /Kurze Einzelreflexion vor der Runde/ }).check();
  await page.getByRole('checkbox', { name: 'Was wissen wir über mögliche Rollenveränderungen tatsächlich?' }).check();
  await page.getByLabel(/Was muss ich nach dem Gespräch zurückmelden/).fill('Offene Rollenfragen an die Bereichsleitung geben.');
  await createTakeaway(page);

  await expect(page.getByLabel('Anliegen im Gespräch')).toHaveValue('Sorge vor Rollenveränderung');
  await expect(page.getByLabel('Gewähltes Format')).toHaveValue(/Kurze Einzelreflexion[\s\S]*Mögliche Nebenwirkung/);
  await expect(page.getByLabel('Ausgewählte Gesprächsfragen')).toHaveValue(/Rollenveränderungen tatsächlich/);
  await expect(page.getByText(/ohne Motive zu diagnostizieren/)).toBeVisible();
});

test('capacity path limits choices to two and treats pausing as a valid outcome', async ({ page }) => {
  await openGuide(page, topics.capacity);
  await page.getByRole('checkbox', { name: 'Keine Zeit für Erprobung' }).check();
  await page.getByRole('checkbox', { name: 'Zusätzlicher Kontrollaufwand' }).check();
  await showSupport(page);

  await page.getByRole('checkbox', { name: 'Vorerst keinen Versuch starten' }).check();
  await page.locator('.leadership-lever').filter({ hasText: 'Vorerst keinen Versuch starten' }).getByRole('radio', { name: 'Dafür brauche ich Abstimmung' }).check();
  await page.getByRole('checkbox', { name: 'Zusätzliche Prüfzeit ausdrücklich berücksichtigen' }).check();
  await expect(page.getByRole('checkbox', { name: 'Den Versuch kleiner zuschneiden' })).toBeDisabled();
  await createTakeaway(page);

  await expect(page.getByLabel('Beobachtete Engpässe')).toHaveValue(/Keine Zeit für Erprobung[\s\S]*Zusätzlicher Kontrollaufwand/);
  await expect(page.getByLabel('Denkbare Entlastungen')).toHaveValue(/Vorerst keinen Versuch starten – Dafür brauche ich Abstimmung/);
  await expect(page.getByText(/organisatorischen Zielkonflikt/)).toBeVisible();
});

test('governance path remains a checklist and never turns all-clear answers into approval', async ({ page }) => {
  await openGuide(page, topics.governance);
  await page.getByRole('checkbox', { name: 'Freigegebene KI-Werkzeuge' }).check();
  await showSupport(page);
  await expect(page.getByText('PRÜFPUNKTE, KEIN GREEN-LIGHT')).toBeVisible();
  const checks = page.locator('.leadership-governance-list fieldset');
  await expect(checks).toHaveCount(5);
  for (const check of await checks.all()) await check.getByRole('radio', { name: 'Bereits geklärt' }).check();
  await page.getByLabel(/Wer übernimmt die fachliche Prüfung/).fill('Fachverantwortliche Person');
  await expect(page.getByRole('link', { name: 'Guidelines ansehen' })).toHaveAttribute('href', '/guidelines');
  await createTakeaway(page);

  await expect(page.getByLabel('Prüfpunkte')).toHaveValue(/Bereits geklärt/);
  await expect(page.getByText(/ersetzt keine organisationsinterne Freigabe/)).toBeVisible();
  const handoff = page.locator('.leadership-handoff');
  await expect(handoff.getByRole('link', { name: 'Guidelines' })).toBeVisible();
  await expect(handoff.getByRole('link', { name: 'Hilfe' })).toBeVisible();
  await expect(page.getByRole('button', { name: /freigeben|genehmigen|green-light/i })).toHaveCount(0);
});

test('orientation path accepts an all-clear state without manufacturing open questions', async ({ page }) => {
  await openGuide(page, topics.orientation);
  await showSupport(page);
  const topicsList = page.locator('.leadership-clarity-list fieldset');
  await expect(topicsList).toHaveCount(5);
  for (const topic of await topicsList.all()) await topic.getByRole('radio', { name: 'Bereits klar' }).check();
  await createTakeaway(page);

  await expect(page.getByText(/Alle betrachteten Punkte sind als bereits klar markiert/)).toBeVisible();
  await expect(page.getByLabel('Noch offen')).toHaveValue('Keine offenen Punkte markiert.');
  await expect(page.getByLabel('Nächster Abstimmungsschritt')).toHaveValue(/Use-Case-Suche oder ins Team Lab/);
  const handoff = page.locator('.leadership-handoff');
  await expect(handoff.getByRole('link', { name: 'Use Cases' })).toBeVisible();
  await expect(handoff.getByRole('link', { name: 'Team Lab' })).toBeVisible();
});

test('other path copies the exact note, makes no interpretation and links to the six guides', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await openGuide(page, topics.other);
  const exactNote = 'Budget ≠ Zustimmung; zuerst mit Lea & Team klären. #42';
  await page.getByLabel(/Was beschäftigt mich/).fill(exactNote);
  await showSupport(page);
  await expect(page.locator('.leadership-guide-links').getByRole('button')).toHaveCount(6);
  await page.getByLabel('Was weiss ich schon?').fill('Der Zeitrahmen steht.');
  await page.getByLabel('Welche Unterstützung wäre als Nächstes hilfreich?').fill('Ein Gespräch ohne Vorentscheidung.');
  await createTakeaway(page);

  await expect(page.getByLabel('Was beschäftigt mich?')).toHaveValue(exactNote);
  await expect(page.getByText(/nicht analysiert, klassifiziert oder einem Guide zugeordnet/)).toBeVisible();
  await expect(page.getByText(/Keine KI-Auswertung, keine Keyword-Klassifikation/)).toBeVisible();
  await page.getByRole('button', { name: 'Mitnahme kopieren' }).click();
  await expect(page.getByRole('status')).toHaveText('Mitnahme kopiert.');
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain(exactNote);
});

test('topic changes retain local session state while reload and explicit reset clear it', async ({ page }) => {
  await openGuide(page, topics.uncertainty);
  await page.getByRole('radio', { name: /Mit meinem Team offen sprechen/ }).check();
  await showSupport(page);
  await page.getByLabel(/Persönliche Notiz/).fill('Lokaler Zwischenstand');
  await page.getByRole('button', { name: 'Anderes Anliegen wählen' }).first().click();
  await page.getByRole('button', { name: new RegExp(topics.capacity) }).click();
  await page.getByRole('button', { name: 'Anderes Anliegen wählen' }).first().click();
  await page.getByRole('button', { name: new RegExp(topics.uncertainty) }).click();
  await expect(page.getByRole('heading', { level: 1, name: 'Was könnte dir jetzt helfen?' })).toBeVisible();
  await expect(page.getByLabel(/Persönliche Notiz/)).toHaveValue('Lokaler Zwischenstand');

  await createTakeaway(page);
  await page.getByRole('button', { name: 'Diesen Guide neu starten' }).click();
  await expect(page.getByRole('heading', { level: 1, name: topics.uncertainty })).toBeVisible();
  await expect(page.getByRole('radio', { checked: true })).toHaveCount(0);
  await page.reload();
  await expect(page.getByRole('heading', { level: 1, name: 'Was beschäftigt dich gerade bei der KI-Einführung in deinem Team?' })).toBeVisible();
  expect(await page.evaluate(() => Object.keys(localStorage))).toEqual([]);
  expect(await page.evaluate(() => Object.keys(sessionStorage))).toEqual([]);
});

test('responsive layouts, keyboard focus and local-only behaviour hold at target widths', async ({ page }, testInfo) => {
  const errors: string[] = [];
  const mutations: string[] = [];
  const external: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('request', (request) => {
    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(request.method())) mutations.push(request.url());
    if (!['127.0.0.1', 'localhost'].includes(new URL(request.url()).hostname)) external.push(request.url());
  });

  for (const width of [360, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto('/leadership');
    await noOverflow(page);
    await page.goto('/leadership/experiment');
    await noOverflow(page);
  }

  const firstTopic = page.getByRole('button', { name: new RegExp(topics.uncertainty) });
  await firstTopic.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('heading', { level: 1, name: topics.uncertainty })).toBeFocused();
  await page.getByRole('radio', { name: /Eigene Situation einordnen/ }).focus();
  await page.keyboard.press('Space');
  await page.getByRole('button', { name: 'Unterstützung ansehen' }).focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('heading', { level: 1, name: 'Was könnte dir jetzt helfen?' })).toBeFocused();
  await expect(page.getByRole('navigation', { name: 'Fortschritt im gewählten Guide' }).getByRole('listitem')).toHaveCount(3);
  await page.screenshot({ path: testInfo.outputPath('leadership-guide.png'), fullPage: true });

  expect(errors).toEqual([]);
  expect(mutations).toEqual([]);
  expect(external).toEqual([]);
});

test('desktop stepper and existing experiment topline keep their non-mobile layout', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await openGuide(page, topics.uncertainty);
  const stepperColumns = await page.locator('.hub-experiment-stepper ol').evaluate((element) => getComputedStyle(element).gridTemplateColumns.split(' ').length);
  expect(stepperColumns).toBeGreaterThan(1);

  await page.goto('/use-cases/interview-vorbereiten/experiment');
  await expect(page.locator('.experiment-topline')).toHaveCSS('flex-direction', 'row');
});
