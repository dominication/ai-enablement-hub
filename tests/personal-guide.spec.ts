import { expect, test, type Page } from '@playwright/test';

const topics = {
  understand: 'Ich möchte erst verstehen, was KI für meine Arbeit bedeuten könnte',
  try: 'Ich möchte etwas Kleines und Sinnvolles ausprobieren',
  concerns: 'Ich habe Vorbehalte oder mache mir Sorgen um meine Arbeit',
  improve: 'Ich habe schon KI-Erfahrung und möchte besser damit arbeiten',
  pause: 'Ich weiss nicht, ob ich gerade Zeit oder Bedarf dafür habe',
  other: 'Etwas anderes',
} as const;

async function noOverflow(page: Page) {
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
}

async function openGuide(page: Page, topic: string) {
  await page.goto('/guides/personal/experiment');
  await page.getByRole('button', { name: new RegExp(topic) }).click();
  await expect(page.getByRole('heading', { level: 1, name: topic })).toBeFocused();
}

async function showOffers(page: Page) {
  await page.getByRole('button', { name: 'Praktische Angebote ansehen' }).click();
  await expect(page.getByRole('heading', { level: 1, name: 'Was könnte dir jetzt praktisch helfen?' })).toBeFocused();
  await expect(page.locator('.personal-offer')).toHaveCount(3);
}

async function createTakeaway(page: Page) {
  await page.getByRole('button', { name: 'Arbeitshilfe erstellen' }).click();
}

test('personal guide is integrated below Guides and clearly explains its local non-assessing model', async ({ page }) => {
  await page.goto('/guides/personal');
  await expect(page).toHaveTitle(/Persönlicher KI-Einstieg/);
  await expect(page.getByRole('heading', { level: 1, name: 'Persönlicher KI-Einstieg' })).toBeVisible();
  await expect(page.getByText(/ohne Bewertung und in deinem Tempo/)).toBeVisible();
  await expect(page.getByText(/Kein Quiz und kein Kompetenz-Score/)).toBeVisible();
  await expect(page.getByRole('link', { name: 'Persönlichen Guide öffnen' })).toHaveAttribute('href', '/guides/personal/experiment');
  await expect(page.getByRole('banner').getByRole('link', { name: 'Guides' })).toHaveAttribute('aria-current', 'page');
});

test('all six entry points expose three distinct offers and produce different work products', async ({ page }) => {
  const expected = [
    [topics.understand, 'Meine persönliche Orientierungsnotiz'],
    [topics.try, 'Vorbereitung für meinen begrenzten KI-Versuch'],
    [topics.concerns, 'Meine persönliche Gesprächs- und Klärungsnotiz'],
    [topics.improve, 'Meine Verbesserungs- und Reflexionsvorlage'],
    [topics.pause, 'Meine optionale Notiz für später'],
    [topics.other, 'Meine neutrale persönliche Notiz'],
  ] as const;

  for (const [topic, output] of expected) {
    await openGuide(page, topic);
    await showOffers(page);
    const offerTitles = await page.locator('.personal-offer strong').allTextContents();
    expect(new Set(offerTitles).size).toBe(3);
    await createTakeaway(page);
    await expect(page.getByRole('region', { name: `Editierbare Arbeitshilfe: ${output}` })).toBeVisible();
  }
});

test('understand path builds an orientation note from selections and manual entries', async ({ page }) => {
  await openGuide(page, topics.understand);
  await page.getByLabel(/Welche Tätigkeiten möchtest du besser verstehen/).fill('Fiktive Fachnotizen ordnen');
  await page.getByLabel(/Wo bleibt menschliches Urteil besonders wichtig/).fill('Fachliche Aussagen prüfen');
  await showOffers(page);
  await page.getByRole('checkbox', { name: /Möglichkeiten und Grenzen sortieren/ }).check();
  await page.getByLabel(/Meine offenen Fragen/).fill('Welche Werkzeuge sind freigegeben?');
  await createTakeaway(page);

  await expect(page.getByLabel('Beispiele aus meinem Arbeitsalltag')).toHaveValue('Fiktive Fachnotizen ordnen');
  await expect(page.getByLabel('Wo menschliches Urteil wichtig bleibt')).toHaveValue('Fachliche Aussagen prüfen');
  await expect(page.getByLabel('Was ich genauer betrachten möchte')).toHaveValue('– Möglichkeiten und Grenzen sortieren');
  await expect(page.getByLabel('Meine offenen Fragen')).toHaveValue('Welche Werkzeuge sind freigegeben?');
});

test('small experiment path respects open approvals and links to an existing use case', async ({ page }) => {
  await openGuide(page, topics.try);
  await page.getByRole('radio', { name: 'Eine andere unkritische Aufgabe selbst beschreiben' }).check();
  await page.getByLabel(/Eigene Aufgabe/).fill('Öffentliche Beispieltexte strukturieren');
  await showOffers(page);
  await page.getByRole('checkbox', { name: /Menschliche Prüfung planen/ }).check();
  await page.getByRole('radio', { name: /Freigaben sind noch offen/ }).check();
  await page.getByLabel(/Wie prüfst du das Ergebnis/).fill('Mit dem öffentlichen Ausgangstext vergleichen.');
  await createTakeaway(page);

  await expect(page.getByLabel('Kleine, unkritische Aufgabe')).toHaveValue('Öffentliche Beispieltexte strukturieren');
  await expect(page.getByLabel('Freigaben und Informationsrahmen')).toHaveValue(/erst nach Klärung/);
  await expect(page.getByText(/keine Werkzeug- oder Datenfreigabe/)).toBeVisible();
  await expect(page.getByRole('link', { name: 'Beispiel-Use-Case' })).toHaveAttribute('href', '/use-cases/komplexe-inhalte-verstaendlich-machen');
  await expect(page.getByText(/nicht dorthin übertragen/)).toBeVisible();
});

test('concerns path makes no motive attribution or reassurance promise', async ({ page }) => {
  await openGuide(page, topics.concerns);
  await page.getByLabel(/Was ist tatsächlich bekannt oder beobachtet/).fill('Ein neues Werkzeug wird geprüft.');
  await page.getByLabel(/Was ist für dich offen/).fill('Wie verändern sich meine Aufgaben?');
  await showOffers(page);
  await page.getByRole('checkbox', { name: /Gesichertes und Offenes trennen/ }).check();
  await page.getByLabel(/Was möchtest du in einem Gespräch ansprechen/).fill('Welche Entscheidungen stehen bereits fest?');
  await createTakeaway(page);

  await expect(page.getByText(/ohne Motive, Haltung oder persönliche Auswirkungen zu interpretieren/)).toBeVisible();
  await expect(page.getByText(/keine Aussagen über Arbeitsplatzsicherheit/)).toBeVisible();
  await expect(page.getByLabel('Was tatsächlich bekannt oder beobachtet ist')).toHaveValue('Ein neues Werkzeug wird geprüft.');
});

test('experienced path focuses on quality, workflow and human decision without a score', async ({ page }) => {
  await openGuide(page, topics.improve);
  await page.getByRole('checkbox', { name: 'Quellen und Nachvollziehbarkeit' }).check();
  await page.getByLabel(/Wie sieht dein heutiger Ablauf aus/).fill('Entwurf erstellen und Quellen öffnen.');
  await showOffers(page);
  await page.getByRole('checkbox', { name: /Qualität und Prüfaufwand vergleichen/ }).check();
  await page.getByLabel(/Welche Qualität und welcher Prüfaufwand entstehen/).fill('Zwei Quellen müssen manuell geprüft werden.');
  await page.getByLabel(/Wer prüft und entscheidet fachlich/).fill('Ich entscheide nach fachlicher Prüfung.');
  await createTakeaway(page);

  await expect(page.getByText(/kein Kompetenztest und keine Bewertung/)).toBeVisible();
  await expect(page.getByLabel('Mein Prüffokus')).toHaveValue('– Quellen und Nachvollziehbarkeit');
  await expect(page.getByLabel('Menschliche Prüfung und Entscheidung')).toHaveValue('Ich entscheide nach fachlicher Prüfung.');
  await expect(page.locator('progress, meter, [role="progressbar"], [data-score], [data-rating]')).toHaveCount(0);
  await expect(page.locator('main')).not.toContainText(/\d+\s*(Punkte|Score)|Ranking/i);
});

test('not-now path treats pausing as a complete result without requiring justification', async ({ page }) => {
  await openGuide(page, topics.pause);
  await page.getByRole('radio', { name: 'Vorerst nicht beginnen' }).check();
  await showOffers(page);
  await page.getByRole('checkbox', { name: /Vorerst nicht beginnen/ }).check();
  await createTakeaway(page);

  await expect(page.getByText('Vorerst nichts auszuprobieren ist das bewusst gewählte und vollständige Ergebnis.')).toBeVisible();
  await expect(page.getByLabel('Meine Entscheidung für jetzt')).toHaveValue('Vorerst nicht beginnen.');
  await expect(page.getByLabel('Was ich für mich festhalten möchte')).toHaveValue('Keine Begründung ergänzt – sie ist nicht erforderlich.');
  await expect(page.getByRole('heading', { name: 'Du musst jetzt nichts weiter tun' })).toBeVisible();
});

test('other path keeps exact text, never classifies it and supports editing and copying', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await openGuide(page, topics.other);
  const exactNote = 'Mein Thema passt nicht in eine Kategorie: α & #42.';
  await page.getByLabel(/Was beschäftigt mich/).fill(exactNote);
  await showOffers(page);
  await page.getByRole('checkbox', { name: /Eigene Notiz weiterführen/ }).check();
  await page.getByLabel(/Was weiss ich schon/).fill('Die Notiz bleibt lokal.');
  await createTakeaway(page);

  await expect(page.getByText(/keine Analyse, Klassifikation oder automatische Themenwahl/)).toBeVisible();
  await expect(page.getByLabel('Was beschäftigt mich?')).toHaveValue(exactNote);
  await page.getByLabel('Was beschäftigt mich?').fill(`${exactNote} Bearbeitet.`);
  await page.getByRole('button', { name: 'Arbeitshilfe kopieren' }).click();
  await expect(page.getByRole('status')).toHaveText('Persönliche Arbeitshilfe kopiert.');
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain(`${exactNote} Bearbeitet.`);
});

test('path switching preserves session state while reset and reload discard it', async ({ page }) => {
  await openGuide(page, topics.understand);
  await page.getByLabel(/Welche Tätigkeiten möchtest du besser verstehen/).fill('Lokaler Zwischenstand');
  await page.getByRole('button', { name: 'Anderes Anliegen wählen' }).click();
  await page.getByRole('button', { name: new RegExp(topics.pause) }).click();
  await page.getByRole('button', { name: 'Anderes Anliegen wählen' }).click();
  await page.getByRole('button', { name: new RegExp(topics.understand) }).click();
  await expect(page.getByLabel(/Welche Tätigkeiten möchtest du besser verstehen/)).toHaveValue('Lokaler Zwischenstand');

  await showOffers(page);
  await createTakeaway(page);
  await page.getByRole('button', { name: 'Diesen Guide neu starten' }).click();
  await expect(page.getByLabel(/Welche Tätigkeiten möchtest du besser verstehen/)).toHaveValue('');
  await page.reload();
  await expect(page.getByRole('heading', { level: 1, name: 'Was beschäftigt dich gerade im Umgang mit KI?' })).toBeVisible();
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
    for (const route of ['/guides', '/guides/personal', '/guides/personal/experiment']) {
      await page.goto(route);
      await noOverflow(page);
      await expect(page.getByRole('banner').getByRole('link', { name: 'Guides' })).toHaveAttribute('aria-current', 'page');
    }
  }

  const firstTopic = page.getByRole('button', { name: new RegExp(topics.understand) });
  await firstTopic.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('heading', { level: 1, name: topics.understand })).toBeFocused();
  await page.getByRole('button', { name: 'Praktische Angebote ansehen' }).focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('heading', { level: 1, name: 'Was könnte dir jetzt praktisch helfen?' })).toBeFocused();
  await expect(page.getByRole('navigation', { name: 'Fortschritt im persönlichen Guide' }).getByRole('listitem')).toHaveCount(3);
  await page.screenshot({ path: testInfo.outputPath('personal-guide.png'), fullPage: true });

  expect(errors).toEqual([]);
  expect(mutations).toEqual([]);
  expect(external).toEqual([]);
});
