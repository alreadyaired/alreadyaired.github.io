# EN3 × Champ project guide

This is a separate website project in Champ/en3-live. The existing sites/chande-recreation project is a read-only visual reference. Its files, original site, domain, and services are not changed.

**Offline design only. Do not publish or upload this project.** All visual resources and fonts needed by the prototype are stored locally. No external account or production services are connected.

## Run it
Run `npm run dev` from this project, then visit http://127.0.0.1:4183/. The preview reloads when files in dist change. No dependency installation is needed: the server uses Node built-ins.

## Edit it
- `home.html`: editable new homepage, with `{{explore}}` holding EN3's captured discovery section.
- `dist/champ.css`: the visual system, responsive layouts, and Chande-inspired theme.
- `dist/preview.js`: filters, local forms, fee calculator and safari prototype.
- `dist/motion.js`, `dist/collage.js`: smooth progress indicator, local motion controls and pinned ticket/stamp collage.
- `dist/grid-menu.js`: interactive black/red menu with the approved EN3 logo on hover.
- `dist/universal.css`: shared typography and the pin/location/IST header.
- `dist/journal.css`: readable journal index and all five article pages.
- `dist/ticket-auth.js`: local phone/code sign-in prototype. The sample code is 123456.
- `dist/assets/brand/`: approved icon, wordmark, favicon and app-icon exports.
- `dist/<route>/index.html`: editable public pages.
- `reference/`: untouched public HTML captured from EN3 for comparison. Do not serve this directory.
- `capture-report.json`: exact page, image, stylesheet, and font provenance.
- `resources/`: project documentation and inventories.

Edit the current files in `dist` for ongoing design work. The capture and setup/generation scripts are historical reference utilities and can overwrite later design changes. Do not run them for ordinary edits; keep backups before intentionally rebuilding captured content.

## Design
Chande's editorial grid and motion are adapted into an EN3 black/red design. The original hero photos were replaced with abstract branded panels. The header uses a red pin, location and IST time, with only a thin, eased scroll indicator below it. The partners form follows the Chande register reference. The journal uses sentence-case Instrument Sans for reading, with the Champ display face for section headings.

The browser's reduced-motion setting initially suppressed the effects. This design preview defaults to the user's requested full motion; choose Pause motion in the grid menu to pause locally. Computer settings are not changed. Fonts are preloaded locally and the first paint waits for the selected faces, preventing a fallback-font flash.

## Useful pages
- `/` — branded hero and scroll-pinned collage.
- `/blog` — themed journal with category filters.
- `/tickets` — phone, simulated verification and code sign-in.
- `/partners` — partner form in the Chande register layout.
- `/partners/platform` — retained product details and working fee calculator.
- `/gallery/` — local photo gallery and keyboard-accessible viewer.
- `/resources/` — source, content, design and asset resources.
- `/resources/responsive.html` — phone/tablet/desktop preview tool.

## Verify
Run `npm run check`. Inspect the live preview at desktop and phone widths. Public content was captured on 25 October 2026; event availability and prices are a snapshot.

## Boundaries
No production API endpoints, credentials, admin accounts, payments, real OTP, ticket issuance, or customer records are connected. Local booking is a clearly marked prototype. No sensitive inputs are saved to local storage. Theme preference alone persists. A static browser copy cannot recover private backend source.
