# AI Enablement Hub

A German-language prototype of an internal enterprise platform for practical, responsible AI adoption. Employees can discover use cases, explore a team experiment, and learn from a fictional peer experience.

## Stack and cloud workflow

Next.js App Router, TypeScript, React, Tailwind CSS 4. Node.js 22 or later; `.nvmrc` selects Node 22. GitHub is the intended source of truth. All commands can run in a cloud checkout (Codex or GitHub Codespaces); no local files, secrets, database, authentication, or AI API are required.

```sh
npm ci
npm run dev
```

Run from the repository root. Development uses port 3000. In a cloud IDE, use its port-forwarding support. Check changes with:

```sh
npm run lint
npm run build
npm run typecheck
npm start
```

`npm start` serves the production build on port 3000. The search is a deterministic keyword filter of three demo use cases; it does not call an AI model. Search terms appear in the URL, so use general task descriptions without sensitive information.

## Structure

- `src/app/`: homepage, application layout, search results, and destination pages.
- `src/components/`: reusable header, search, cards, guidelines teaser, icons, and placeholder page.
- `src/data/content.ts`: typed, fictional use cases, search keywords, learning example, and information categories.
- `src/app/globals.css`: responsive visual system using Tailwind's CSS integration and shared component styles.

The homepage and the Recruiting journey are implemented. Project management and Team Lab remain previews. Community contains one fictional experience; Guidelines provides illustrative orientation, not an organisation's approved policy. The profile avatar is a placeholder. No user contributions are stored externally or durably.

## Deployment from GitHub

Push this project to the GitHub repository, then import it into Vercel or Netlify. Select the Next.js framework, the repository root, and Node.js 22 or later. Use `npm run build`; no environment variables are needed. Vercel supports Next.js directly; Netlify's Next.js integration handles the server-rendered search route. Keep the platform's framework output defaults; do not configure a static export. Deployments can run automatically on GitHub pushes. No deployment has been provisioned by this repository.

## Extending the prototype

Replace the content module with a typed data-access layer when real APIs are available, keeping presentation components independent. Enterprise identity, permissions, approved AI services, and organisation-specific policies can be introduced at service boundaries. Add the guided journeys separately; do not treat demo content or guidance as production records or approvals.

## Manual smoke checks

- Open the homepage and follow each navigation link and featured card.
- Search the example sentence about a weekly project status: the project-management card should appear.
- Search an unknown task: an empty state should offer all use cases.
- Verify the information-category links reach the corresponding Guidelines sections.
- Check keyboard focus, the skip link, and layouts at mobile and desktop widths.

## Recruiting journey

`/use-cases/interview-vorbereiten` introduces the use case; `/use-cases/interview-vorbereiten/experiment` runs the interactive demo. `src/data/recruiting.ts` owns all fictional role, candidate, CV, motivation, source references, open points, and question variants. `src/components/recruiting/` separates the overview, document picker, preparation, editable question cards, report dialog, and stateful flow. Styles reuse the existing visual tokens and are scoped to Recruiting components.

The four steps lead from interview focus through document selection and preparation to questions. Selected focuses determine question coverage; deselected sources cannot contribute evidence. No real AI analysis is performed. Changing the focus or documents resets derived questions and selections; going back without changes preserves them. Human review supports editing, removal, and keyboard-accessible reordering. Alternative questions must be adopted again. There are no rankings, scores, or hiring recommendations.

Reports capture the selected reason and exact question in React memory only. Reflection offers a no-benefit option; both saving and sharing show local confirmation without sending data. Reloading or leaving the flow discards session state. The browser-native report dialog supports keyboard focus containment, Escape, and focus restoration.

### Browser regression tests

```sh
npx playwright install chromium
npm run build
npm run test:e2e
```

Tests run against the production server on port 3100. In a cloud image with system Chromium, optionally set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium` for the test command instead of downloading a browser. This setting is for tests only; the application still requires no environment variables. The suite covers the complete flow, source exclusions, focus changes, empty selections, editing, alternatives, problem reporting, review, reflection, local-only sharing, mobile layout, and existing routes.
