# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

Other commands: `npm run build` (static build to `dist/`), `npm run preview` (preview the build), `npm run check` (runs `astro check` — TypeScript/template diagnostics via `@astrojs/check`, using the strict `astro/tsconfigs/strict` base in `tsconfig.json`). There is no test suite and no separate linter (e.g. ESLint) configured. As of this writing `npm run check` reports 26 pre-existing implicit-`any` errors in `src/pages/articles/archive.astro`, `src/pages/newspaper/archive.astro`, and `src/pages/events/past/[page].astro` — none introduced by recent work; fix opportunistically rather than as a blocking gate.

## Architecture

Astro 7 static site (`output: 'static'` in `astro.config.mjs`). Styling uses Tailwind CSS v4 via the `@tailwindcss/vite` plugin (not the deprecated `@astrojs/tailwind` integration) layered on top of a hand-written CSS custom-property design-token system — there is no `tailwind.config.js` (v4 uses CSS-first config).

- **Design tokens**: `src/styles/global.css` defines the color/font tokens (`--color-bg`, `--color-text`, `--color-card-bg`, etc.) on `:root`, with a `.section-light` class overriding the same custom-property names to produce a light-theme variant on a subtree (used by every inner page's `<main>`). The tokens actually consumed by shared component classes are re-declared in a `@theme inline` block so Tailwind's generated utilities keep referencing the same `var(--color-*)` names rather than baking in literals — this is what lets `.section-light` keep reskinning them.
- **Shared component classes**: also in `global.css`, under `@layer components` — `.card`, `.panel`, `.page-title`, `.page-subtitle`, `.section-header`, `.view-all` / `.view-all-page` / `.view-all-header` (three distinct variants — same visual idea, different color/size, used in different contexts; do not merge them), `.side-block-header`/`.side-block-title`, `.team-card`, `.team-photo`. These were extracted because they were byte-identical across several files; some deliberately keep small per-file overrides (e.g. `.section-header`'s `margin-bottom` varies by file, `.team-photo`'s `width`/`height` differs between the homepage preview and the full team page) — check here before writing a new one-off style that duplicates an existing shared pattern, and don't collapse the three `.view-all*` variants into one.
- **Everything else** is still per-component scoped `<style>` blocks (the idiomatic Astro single-file-component pattern: frontmatter script + template + scoped style in one file) — that's normal here, not disorganization.
- **Content model**: no CMS or content collections. Content lives in `src/data/*.js` (`articles.js`, `events.js`, `newsletter.js`, `team.js`) imported into pages/components, or in inline object arrays in a component's frontmatter for anything smaller. Follow whichever pattern the nearest existing page/component already uses.
- **Images**: local content images (team photos, logos) live in `src/assets/` and render via `astro:assets`'s `<Image />`, which requires an ESM-imported reference rather than a string path. Per-team-member photos are looked up dynamically through `resolvePhoto()` in `src/data/team.js`, built on `import.meta.glob('/src/assets/team/avatars/*.{jpg,jpeg,JPG,png}', { eager: true })` — the glob pattern must list both `jpg` and `JPG` explicitly (glob matching is case-sensitive on Linux/CI, and two of the current avatars use uppercase `.JPG`). `public/` is still the right place for the favicon and any asset that's referenced as a plain URL rather than through `<Image>` (e.g. `Layout.astro`'s `<link rel="icon">`).
- **Preloading critical images**: above-the-fold images (`Nav.astro`'s icon, `Hero.astro`'s banner) use `loading="eager" fetchpriority="high"` on their `<Image />` instead of Astro's lazy-loading default, and `Layout.astro` preloads them in `<head>` via `<link rel="preload" as="image">`. Since `astro:assets` hashes/optimizes image URLs at build time, the preload `href` must be computed with the same `getImage()` call rather than guessed — `Layout.astro` always resolves the nav icon this way (since `Nav` renders on nearly every page) and accepts an optional `preloadImage` prop for a page-specific critical image (e.g. `index.astro` passes the hero banner, since `Hero` only renders there).
- **Layout**: `src/layouts/Layout.astro` is a thin shell — loads `global.css` and Google Fonts (DM Sans, Playfair Display), sets `<title>`, renders `<slot />`. Pages compose it as `<Layout title="..."><Nav /><main>...</main><Footer /></Layout>`.
- **Routing**: standard file-based routing under `src/pages/`. One paginated dynamic route exists — `src/pages/events/past/[page].astro` — using Astro's built-in `getStaticPaths({ paginate })` / `Astro.props.page` (pageSize 10); follow this pattern for any other paginated archive pages.
- **Interactivity**: no framework hydration directives anywhere. Simple DOM behavior (e.g. `Nav.astro`'s dropdown menu) uses a plain `<script>` tag with `data-open`-style attribute toggling.
- **Imports**: components/layouts/data are imported via deep relative paths (e.g. `../../../layouts/Layout.astro`), not path aliases — match this convention.
- Known gap: `Nav.astro` links to `/join`, which has no corresponding page in `src/pages` yet.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
