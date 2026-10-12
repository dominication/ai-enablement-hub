import { expect, test, type Page } from '@playwright/test';

async function noOverflow(page: Page) {
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
}

async function chooseSupport(page: Page, label: string, responsibility: 'self' | 'alignment') {
  const support = page.locator('.leadership-support').filter({ hasText: label });
  await support.getByRole('checkbox').check();
  await support.getByRole('radio', { name: responsibility === 'self' ? 'Ich kann selbst handeln.' : 'Ich brauche Abstimmung mit anderen Stellen.' }).check();
}

async function reachReflection(page: Page) {
  await page.goto('/leadership/experiment');
  await page.getByRole('radio', { name: /Auftrag und Gestaltungsspielraum klären/ }).check();
  await page.getByRole('button', { name: 'Weiter', exact: true }).click();
  await page.getByRole('checkbox', { name: 'Welche konkreten Qualitätsprobleme werden befürchtet?' }).check();
  await page.getByRole('checkbox', { name: 'Wo fehlt dem Team Zeit oder Unterstützung?' }).check();
  await page.getByRole('button', { name: 'Perspektivwechsel anzeigen' }).click();
  await page.getByRole('button', { name: 'Weiter', exact: true }).click();
  await page.getByRole('radio', { name: /Zuerst gemeinsame Bestandsaufnahme/ }).check();
  await page.getByRole('button', { name: 'Weiter', exact: true }).click();
  await chooseSupport(page, 'Geschützte Zeit für Erprobung und Reflexion.', 'alignment');
  await chooseSupport(page, 'Gemeinsame fachliche Qualitätsprüfung.', 'self');
  await page.getByRole('checkbox', { name: 'Belastung und Zusammenarbeit.' }).check();
  await page.getByRole('button', { name: 'Weiter', exact: true }).click();
}

test('entry, library and Team Lab integrate the leadership journey without changing featured cases', async ({ page }) => {
  await page.goto('/leadership');
  await expect(page).toHaveTitle(/KI im Team begleiten/);
  await expect(page.getByRole('heading', { level: 1, name: 'KI im Team begleiten' })).toBeVisible();
  await expect(page.getByText('Veränderung beginnt nicht beim Tool. Sondern bei der gemeinsamen Arbeit.')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Was du hier machst' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Welche Situation dich erwartet' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Dein Begleitplan' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Anders als das Team Lab' })).toBeVisible();
  await expect(page.getByText(/Enterprise-Prototyp mit fiktiven Inhalten/)).toBeVisible();
  await noOverflow(page);
  await page.getByRole('link', { name: 'Journey starten' }).click();
  await expect(page).toHaveURL('/leadership/experiment');
  await expect(page.getByRole('navigation', { name: 'Phasen der Führungskräfte-Journey' }).getByRole('listitem')).toHaveCount(5);

  await page.goto('/use-cases?q=f%C3%BChrung');
  await expect(page.locator('.use-case-card h3')).toHaveText(['KI im Team begleiten']);
  await page.goto('/use-cases?q=team');
  await expect(page.locator('.use-case-card h3')).toHaveText(['KI Team Experiment']);
  await page.goto('/');
  await expect(page.locator('.use-case-card h3')).toHaveText(['Interview mit KI vorbereiten', 'Projektstatus mit KI vorbereiten', 'KI Team Experiment']);
  await page.goto('/team-lab');
  await expect(page.getByRole('link', { name: 'Zu «KI im Team begleiten»' })).toHaveAttribute('href', '/leadership');
});

test('five phases preserve state, reveal systemic context and produce an editable decision-based plan', async ({ page, context }, testInfo) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  const errors: string[] = [];
  const mutations: string[] = [];
  const external: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('request', (request) => {
    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(request.method())) mutations.push(request.url());
    if (new URL(request.url()).hostname !== '127.0.0.1') external.push(request.url());
  });
  await page.goto('/leadership/experiment');
  await expect(page.getByText('Alle Personen, Aussagen und Beobachtungen sind erfunden.')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Weiter', exact: true })).toBeDisabled();
  const action = page.getByRole('radio', { name: /Auftrag und Gestaltungsspielraum klären/ });
  await action.focus(); await page.keyboard.press('Space');
  await expect(action).toBeChecked();
  await expect(page.getByText('Was ist verbindlich – und was darf das Team selbst entscheiden?')).toBeVisible();
  await page.getByRole('button', { name: 'Weiter', exact: true }).click();
  await expect(page.getByRole('heading', { level: 1, name: 'Was steckt hinter den unterschiedlichen Aussagen?' })).toBeFocused();
  await expect(page.locator('.leadership-perspectives article')).toHaveCount(4);
  await page.getByRole('checkbox', { name: 'Welche konkreten Qualitätsprobleme werden befürchtet?' }).check();
  await page.getByRole('checkbox', { name: 'Wo fehlt dem Team Zeit oder Unterstützung?' }).check();
  await expect(page.getByRole('button', { name: 'Weiter', exact: true })).toBeDisabled();
  await page.getByRole('button', { name: 'Perspektivwechsel anzeigen' }).click();
  await expect(page.getByText(/Aus einem früheren Rollout ist zusätzliche Kontrollarbeit/)).toBeVisible();
  await expect(page.getByText(/keine psychologische Diagnose persönlicher Motive/)).toBeVisible();
  await page.getByRole('button', { name: 'Weiter', exact: true }).click();
  await page.getByRole('radio', { name: /Zuerst gemeinsame Bestandsaufnahme/ }).check();
  await expect(page.getByLabel('Gesprächsfrage 1')).toHaveValue(/Wo erleben wir heute Aufwand/);
  await page.getByLabel('Gesprächsfrage 2').fill('Welche Entscheidung treffen wir nach der gemeinsamen Auswertung?');
  await page.getByRole('button', { name: 'Weiter', exact: true }).click();

  const governance = page.locator('.leadership-governance').getByRole('checkbox');
  await expect(governance).toHaveCount(4);
  for (const checkbox of await governance.all()) { await expect(checkbox).toBeChecked(); await expect(checkbox).toBeDisabled(); }
  await chooseSupport(page, 'Geschützte Zeit für Erprobung und Reflexion.', 'alignment');
  await chooseSupport(page, 'Gemeinsame fachliche Qualitätsprüfung.', 'self');
  await expect(page.locator('.leadership-support').filter({ hasText: 'Kollegiale Unterstützung' }).getByRole('checkbox')).toBeDisabled();
  await expect(page.getByRole('checkbox', { name: /Qualität und fachliche Verlässlichkeit/ })).toBeChecked();
  await expect(page.getByRole('checkbox', { name: /Zeitaufwand einschliesslich zusätzlicher Kontrolle/ })).toBeChecked();
  await page.getByRole('checkbox', { name: 'Belastung und Zusammenarbeit.' }).check();
  await page.getByRole('button', { name: 'Zurück', exact: true }).click();
  await expect(page.getByLabel('Gesprächsfrage 2')).toHaveValue('Welche Entscheidung treffen wir nach der gemeinsamen Auswertung?');
  await page.getByRole('button', { name: 'Weiter', exact: true }).click();
  await page.getByRole('button', { name: 'Weiter', exact: true }).click();

  await expect(page.getByText(/nicht aus deinen vorherigen Entscheidungen berechnet/)).toBeVisible();
  await expect(page.locator('.leadership-illustrative li')).toHaveCount(5);
  await page.getByRole('radio', { name: /^Anpassen/ }).check();
  await page.getByLabel(/Was würde ich meinem Team/).fill('Wir grenzen den Einsatzbereich ein und planen die zusätzliche Qualitätsprüfung gemeinsam ein.');
  await page.getByRole('button', { name: 'Begleitplan erstellen' }).click();
  await expect(page.getByRole('heading', { level: 1, name: 'Mein Begleitplan – KI im Team' })).toBeVisible();
  const plan = page.getByRole('region', { name: 'Editierbarer Begleitplan' });
  await expect(plan).toContainText('1. Ausgangslage und Klärungsbedarf');
  await expect(page.getByLabel('1. Ausgangslage und Klärungsbedarf')).toHaveValue(/Ich kläre zuerst mit der Bereichsleitung/);
  await expect(page.getByLabel('2. Perspektiven und Fragen, die ich vertiefen möchte')).toHaveValue(/Qualitätsprobleme[\s\S]*Zeit oder Unterstützung/);
  await expect(page.getByLabel('3. Geplantes Vorgehen zur Beteiligung')).toHaveValue(/gemeinsame Bestandsaufnahme[\s\S]*Welche Entscheidung treffen wir/);
  await expect(page.getByLabel('4. Notwendige Rahmenbedingungen und Abhängigkeiten')).toHaveValue(/freigegebenen KI-Systems[\s\S]*Geschützte Zeit[\s\S]*Abstimmung mit anderen Stellen[\s\S]*Qualität und fachliche Verlässlichkeit[\s\S]*zusätzlicher Kontrolle/);
  await expect(page.getByLabel(/6. Reflexion und Entscheidung/)).toHaveValue(/Anpassen:[\s\S]*Wir grenzen den Einsatzbereich ein/);
  const nextStep = page.getByLabel('5. Nächster konkreter Schritt');
  await nextStep.fill('Auftrag und Kapazitätskonflikt mit der Bereichsleitung klären.');
  await nextStep.pressSequentially(' Weitere Abstimmung.');
  await expect(nextStep).toBeFocused();
  await page.getByRole('button', { name: 'Begleitplan kopieren' }).click();
  await expect(page.getByRole('status')).toHaveText('Begleitplan kopiert.');
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain('Auftrag und Kapazitätskonflikt mit der Bereichsleitung klären.');

  await page.getByRole('button', { name: 'Zur Journey zurückkehren' }).click();
  await page.getByRole('button', { name: /Auftrag/ }).click();
  await page.getByRole('radio', { name: /Einen kleinen Pilotversuch vorschlagen/ }).check();
  await page.getByRole('button', { name: /Reflexion/ }).click();
  await page.getByRole('button', { name: 'Begleitplan erstellen' }).click();
  await expect(page.getByLabel('1. Ausgangslage und Klärungsbedarf')).toHaveValue(/Ich schlage dem Team sofort einen kleinen Pilotversuch vor/);
  await expect(page.getByLabel('5. Nächster konkreter Schritt')).not.toHaveValue(/Kapazitätskonflikt/);
  await noOverflow(page);
  await page.screenshot({ path: testInfo.outputPath('leadership-plan.png'), fullPage: true });
  expect(errors).toEqual([]); expect(mutations).toEqual([]); expect(external).toEqual([]);
  expect(await page.evaluate(() => Object.keys(localStorage))).toEqual([]);
  expect(await page.evaluate(() => Object.keys(sessionStorage))).toEqual([]);
});

test('invalid earlier phases block downstream jumps and plan creation', async ({ page }) => {
  await reachReflection(page);
  await page.getByRole('radio', { name: /^Anpassen/ }).check();
  await page.getByLabel(/Was würde ich meinem Team/).fill('Wir prüfen die Voraussetzungen erneut.');

  await page.getByRole('button', { name: /Perspektiven/ }).click();
  await page.getByRole('checkbox', { name: 'Wo fehlt dem Team Zeit oder Unterstützung?' }).uncheck();
  await expect(page.getByRole('button', { name: /Beteiligung/ })).toBeDisabled();
  await expect(page.getByRole('button', { name: /Reflexion/ })).toBeDisabled();

  await page.getByRole('checkbox', { name: 'Wo fehlt dem Team Zeit oder Unterstützung?' }).check();
  await page.getByRole('button', { name: /Beteiligung/ }).click();
  await page.getByLabel('Gesprächsfrage 1').fill('');
  await expect(page.getByRole('button', { name: /Rahmen/ })).toBeDisabled();
  await expect(page.getByRole('button', { name: /Reflexion/ })).toBeDisabled();
});

test('desktop stepper and existing experiment topline keep their non-mobile layout', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/leadership/experiment');
  const stepperColumns = await page.locator('.hub-experiment-stepper ol').evaluate((element) => getComputedStyle(element).gridTemplateColumns.split(' ').length);
  expect(stepperColumns).toBeGreaterThan(1);

  await page.goto('/use-cases/interview-vorbereiten/experiment');
  await expect(page.locator('.experiment-topline')).toHaveCSS('flex-direction', 'row');
});

test('all action, participation and reflection variants remain non-judgemental and available', async ({ page }) => {
  await page.goto('/leadership/experiment');
  const actions: [RegExp, string][] = [
    [/Auftrag und Gestaltungsspielraum klären/, 'Was ist verbindlich – und was darf das Team selbst entscheiden?'],
    [/Einen kleinen Pilotversuch vorschlagen/, 'Welche Voraussetzungen müssen vor einem echten Versuch erfüllt sein?'],
    [/Die Einführung zunächst verschieben/, 'Wie kann ich den Kapazitätskonflikt mit der Bereichsleitung besprechen?'],
  ];
  for (const [name, reflection] of actions) {
    await page.getByRole('radio', { name }).check();
    await expect(page.getByText(reflection)).toBeVisible();
  }
  await expect(page.locator('.leadership-action-grid')).not.toContainText(/falsch|richtig/i);
  await page.getByRole('button', { name: 'Weiter', exact: true }).click();
  await page.getByRole('checkbox', { name: 'Welche konkreten Qualitätsprobleme werden befürchtet?' }).check();
  await page.getByRole('checkbox', { name: 'Welche bestehenden Tätigkeiten könnten tatsächlich entlastet werden?' }).check();
  await page.getByRole('button', { name: 'Perspektivwechsel anzeigen' }).click();
  await page.getByRole('button', { name: 'Weiter', exact: true }).click();
  for (const name of [/Klarer Auftrag mit konkretem Vorschlag/, /Zuerst gemeinsame Bestandsaufnahme/, /Kleine freiwillige Erkundungsgruppe/]) {
    await page.getByRole('radio', { name }).check();
    await expect(page.getByLabel('Gesprächsfrage 1')).not.toHaveValue('');
    await expect(page.getByLabel('Gesprächsfrage 2')).not.toHaveValue('');
  }

  for (const [outcome, expected] of [[/^Weiterführen/, 'Weiterführen'], [/^Anpassen/, 'Anpassen'], [/^Stoppen/, 'Stoppen']] as const) {
    await reachReflection(page);
    const option = page.getByRole('radio', { name: outcome });
    await option.check();
    await page.getByLabel(/Was würde ich meinem Team/).fill('Wir dokumentieren die Beobachtungen und besprechen die nächsten Schritte gemeinsam.');
    await page.getByRole('button', { name: 'Begleitplan erstellen' }).click();
    await expect(page.getByLabel(/6. Reflexion und Entscheidung/)).toHaveValue(new RegExp(`^${expected}:`));
  }
});

test('responsive layouts, focus order and local reset work across target widths', async ({ page }) => {
  for (const width of [360, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto('/leadership');
    await noOverflow(page);
    await page.goto('/leadership/experiment');
    await noOverflow(page);
  }
  const firstAction = page.getByRole('radio', { name: /Auftrag und Gestaltungsspielraum klären/ });
  await firstAction.focus();
  await page.keyboard.press('Space');
  await page.getByRole('button', { name: 'Weiter', exact: true }).focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('heading', { level: 1, name: 'Was steckt hinter den unterschiedlichen Aussagen?' })).toBeFocused();
  await page.reload();
  await expect(page.getByRole('heading', { level: 1, name: 'Was ist eigentlich unser Auftrag?' })).toBeVisible();
  await expect(page.getByRole('radio', { checked: true })).toHaveCount(0);
  await expect(page.getByRole('button', { name: /Perspektiven/ })).toBeDisabled();
});
