# Renato G. Beroy — Engineering Portfolio

A responsive React + Vite portfolio for internship and OJT applications. No backend or additional runtime dependencies.

## Run locally

Use `npm.cmd` on Windows to avoid PowerShell's npm.ps1 restriction.

```sh
npm.cmd install
npm.cmd run dev
```

```sh
npm.cmd run lint
npm.cmd run build
npm.cmd run preview
```

## Content and assets

- Edit personal details, navigation, skills, projects, education, training, and contact information in `src/data/portfolio.js`.
- Components are in `src/components/`; design tokens and resets are in `src/index.css`; component and responsive styling is in `src/App.css`.
- All nine projects use the supplied descriptions and documented project URLs. Repository links do not imply ownership of either GitHub profile.
- `public/images/` and `public/certificates/` are ready for actual public-safe media. Project visuals currently use labeled concept illustrations, not screenshots. Add an image path and meaningful `imageAlt` to each project when available. Missing or failed images fall back to an illustration.
- The Hero profile image is configured in `profile.image` and `profile.imageAlt` and scales up to 620px on desktop; preserve its original aspect ratio. The supplied filename is `renato-profile.jpg.jpg`.
- Human Activity Recognition and the MP3 player have no technology badges because specific tools were not supplied. Add only confirmed technologies.
- Set a training entry's `certificateUrl` to a real file in `/certificates/` to enable its certificate link; no certificate links are shown initially.
- Download CV is disabled until `profile.publicCvUrl` points to an approved, public-safe CV. Do not place an original private CV in `public/`.
- The public website includes only the supplied email and city/country. It contains no phone, residential address, CGPA, or personal social profile links.
- `.gitignore` excludes private source folders and common CV/resume PDF filenames. Gitignore does not prevent Vite from copying files in `public/`: review that directory before every build or deployment.
- Google Fonts supplies Inter and Space Grotesk; system fonts remain available if the service is blocked or offline.

## Interface

Responsive sticky navigation with active section indication, a mobile menu with Escape and outside-click handling, keyboard focus styles, a skip link, anchor offsets, reduced-motion support, category filters with announced result counts, lazy-loaded project media support, and email contact links. GeoSentry is explicitly labeled as a thesis in progress.

This project has not been deployed or published.

## Verification

`scripts/verify-browser.mjs` uses Node's built-in WebSocket client and a local Chromium debugging endpoint; it adds no package dependencies. With the app running and an isolated headless Edge/Chrome session on port 9222, run `node scripts/verify-browser.mjs`. Override `PORTFOLIO_QA_URL` to check a production preview. Reports and screenshots go to ignored `.qa/`.

The checks cover eight viewport widths (320–1440 px), project filter counts, external link attributes, section anchors, active navigation, menu selection, Escape/focus restoration, outside clicks, reduced motion, console exceptions, and local asset loading. Email links are checked without opening a mail client. External project destinations require a separate connectivity check.
