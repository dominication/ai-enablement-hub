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

The homepage is complete for this scope. HR, project management, and Team Lab journeys are explicitly marked as previews. Community contains one fictional experience; Guidelines provides illustrative orientation, not an organisation's approved policy. The profile avatar is a placeholder. No user contributions are stored.

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
