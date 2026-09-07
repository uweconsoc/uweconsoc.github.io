# Adding content

All updatable content — articles, newsletter issues, and events — lives as markdown files with frontmatter under `src/content/`. This is the one folder to touch when adding or editing any of it; no `.astro`/`.js` code needs to change. Listing pages, archive pages, and (for articles/newsletter) each entry's own page pick up any file automatically.

## Newsletter issues

1. Take the member's write-up (from a doc, etc.) and pick a short, URL-safe slug for it, e.g. `my-issue-title`.
2. Create `src/content/newsletter/my-issue-title.md`.
3. Paste this frontmatter block at the top, then the body underneath in plain markdown (`##` headings, paragraphs, links, lists):

```md
---
title: "Issue Title Here"
date: 2026-08-12
author: "Research Team"
excerpt: "One or two sentence summary shown on the listing page."
---

Full body goes here, written in plain markdown.
```

4. Optional cover image: drop the image file under `src/content/newsletter/` alongside the markdown file, then add `cover: ./my-cover.jpg` to the frontmatter (pages fall back to a placeholder block when omitted).
5. Commit and push — the site rebuilds automatically via the existing GitHub Actions workflow.

### Field reference

| Field | Required | Notes |
|---|---|---|
| `title` | yes | Plain text, shown as the page heading. |
| `date` | yes | ISO format `YYYY-MM-DD`. Determines sort order and which term ("Winter/Spring/Fall YYYY") it's grouped under in the archive. |
| `author` | no | Defaults to `"Research Team"`. |
| `excerpt` | yes | One or two sentences shown on the listing/archive cards. |
| `cover` | no | Path to a cover image (optional — pages fall back to a placeholder block when omitted). |
| `coverAlt` | no | Alt text for the cover image. |

## Articles

Research articles are published from the original PDF directly — no manual transcription into markdown, and no manual cover image needed.

1. Pick a short, URL-safe slug for it, e.g. `my-article-title`.
2. Drop the PDF at `public/articles/my-article-title.pdf` — the filename (minus `.pdf`) must exactly match the slug from step 3.
3. Create `src/content/articles/my-article-title.md` with frontmatter only (no body needed):

```md
---
title: "Article Title Here"
date: 2026-08-12
author: "Research Team"
excerpt: "One or two sentence summary shown on the listing page."
---
```

4. Commit and push. On the next build, the article's cover thumbnail is automatically generated from page 1 of the PDF (see `src/lib/generate-article-covers.mjs`), and the article's page embeds the full PDF with a download-link fallback — nothing else to wire up.

### Field reference

| Field | Required | Notes |
|---|---|---|
| `title` | yes | Plain text, shown as the page heading. |
| `date` | yes | ISO format `YYYY-MM-DD`. Determines sort order and which term ("Winter/Spring/Fall YYYY") it's grouped under in the archive. |
| `author` | no | Defaults to `"Research Team"`. |
| `excerpt` | yes | One or two sentences shown on the listing/archive cards. |
| `coverAlt` | no | Alt text for the auto-generated cover image. |

There's no `pdf` or `cover` field — the PDF at `public/articles/<slug>.pdf` and the auto-generated cover are both found by matching the slug, not by frontmatter.

## Events

1. Pick a short, URL-safe slug from the event title, e.g. `winter-social`.
2. Create `src/content/events/winter-social.md`.
3. Paste this frontmatter block (no body needed — events don't have their own detail page):

```md
---
title: "Winter Social"
date: 2026-01-15
startTime: "18:00"
endTime: "20:00"
location: "SLC Great Hall"
description: "One or two sentence summary shown on the events page."
---
```

4. Commit and push. Any event with a `date` on or after today shows up as "upcoming" (on the homepage, `/events`, and gets Google Calendar / .ics "Add to Calendar" links); anything before today automatically moves to "past" (`/events/past/1`, `/events`'s past-events list) — nothing needs to be moved by hand. Note this split is computed at build time, so it only updates on the next deploy, not live in a visitor's browser.

### Field reference

| Field | Required | Notes |
|---|---|---|
| `title` | yes | Plain text, shown as the event title. |
| `date` | yes | ISO format `YYYY-MM-DD`. Determines whether the event is upcoming or past. |
| `startTime` | no | 24h `HH:MM`, e.g. `"18:00"`. Needed for the displayed time range and for "Add to Calendar" links to have a real start time. |
| `endTime` | no | 24h `HH:MM`. Falls back to `startTime` (a zero-length event) if omitted. |
| `location` | yes | Plain text, e.g. `"SLC Great Hall"`. |
| `description` | no | One or two sentences shown alongside the event; omit for a bare title/date/location entry. |
