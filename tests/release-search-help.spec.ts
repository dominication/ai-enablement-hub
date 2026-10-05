import { expect, test, type Page } from '@playwright/test';

async function noOverflow(page: Page) {
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
}

test('natural-language task intent wins over generic questions and team context', async ({ page }) => {
  const research = ['Recherche strukturieren und verdichten'];
  const team = ['AI Team Experiment'];
  const cases: [string, string[]][] = [
    ['Welche Fragen sind für meine Recherche noch offen?', research],
    ['Ich möchte für mein Team recherchieren.', research],
    ['Ich möchte einen Urlaubsplan für mein Team erstellen.', []],
    ['Ich möchte unser nächstes Team Experiment vorbereiten.', team],
    ['Wie können wir unsere Zusammenarbeit mit AI ausprobieren?', team],
    ['Ich muss Fragen für ein Interview vorbereiten.', ['Interview mit AI vorbereiten', 'Interviewnotizen strukturieren']],
    ['Ich möchte offene Fragen aus einem Meeting strukturieren.', ['Meeting-Ergebnisse aufbereiten']],
    ['Ich möchte die Notizen unseres Teams aus einem Meeting aufbereiten.', ['Meeting-Ergebnisse aufbereiten']],
  ];
  for (const [query, titles] of cases) {
    await page.goto(`/use-cases?q=${encodeURIComponent(query)}`);
    await expect(page.locator('.use-case-card h3')).toHaveText(titles);
    await expect(page.getByRole('status')).toHaveText(`${titles.length} passende Use Cases für «${query}»`);
    if (!titles.length) {
      await expect(page.getByRole('heading', { name: 'Noch kein passender Use Case dabei.' })).toBeVisible();
      await expect(page.getByText('Versuche einen anderen Begriff oder beschreibe die Aufgabe, bei der du Unterstützung suchst.')).toBeVisible();
      await page.getByRole('link', { name: 'Alle Use Cases ansehen' }).click();
      await expect(page.locator('.use-case-card')).toHaveCount(12);
    }
    await noOverflow(page);
  }
});

test('context terms still work alone but cannot guess an unsupported task in a longer query', async ({ page }) => {
  for (const query of ['team', 'teams', ' TEAM! ', 'Teams?', 'fragen']) {
    await page.goto(`/use-cases?q=${encodeURIComponent(query)}`);
    await expect(page.locator('.use-case-card h3')).toHaveText([query === 'fragen' ? 'Interview mit AI vorbereiten' : 'AI Team Experiment']);
  }
  for (const query of ['Ich habe Fragen zur Urlaubsplanung.', 'Ich möchte einen Urlaubsplan für unsere Teams erstellen.', 'Urlaubsplan team', 'Team Fragen']) {
    await page.goto(`/use-cases?q=${encodeURIComponent(query)}`);
    await expect(page.locator('.use-case-card')).toHaveCount(0);
    await expect(page.getByRole('heading', { name: 'Noch kein passender Use Case dabei.' })).toBeVisible();
  }
});

test('Help describes the reviewed scope and preserves the prototype limits', async ({ page }) => {
  const response = await page.goto('/help');
  await expect(page).toHaveTitle('Hilfe | AI Enablement Hub');
  expect(response?.status()).toBe(200);
  const main = page.locator('main');
  await expect(main).not.toContainText(/einen der drei Use Cases|eine Beispielerfahrung/);
  await expect(main).toContainText('passende Use Cases in der Bibliothek');
  await expect(main).toContainText('geführte Beispiele für Recruiting und Projektmanagement');
  await expect(main).toContainText('im Team Lab ein gemeinsames AI-Experiment vorbereiten');
  await expect(main).toContainText('In der Community findest du mehrere fiktive Erfahrungen');
  await expect(main).toContainText('angepassten oder bewusst beendeten Experimenten');
  await expect(main).toContainText('nicht dauerhaft gespeichert oder veröffentlicht');
  await expect(main).toContainText('Alle Inhalte und Personenbezüge sind fiktiv');
  await expect(main).toContainText('Es sind keine weiteren Personen verbunden');
  await expect(main).toContainText('keine Verbindung zu einem AI-Dienst');
  await expect(main).toContainText('ohne persönliche oder vertrauliche Informationen');
  for (const width of [360, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await noOverflow(page);
  }
  await page.getByRole('link', { name: 'Use Cases entdecken' }).click();
  await expect(page.locator('.use-case-card')).toHaveCount(12);
});
