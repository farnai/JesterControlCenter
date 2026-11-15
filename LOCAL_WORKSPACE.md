# Launch Control — local sitemap preparation

Based on the deployed Jester Launch Control source at commit `f1c6bf89d22a4e18d93c3658095b60d11303ff64`. The existing Sites project identity, records schema, task editor and approval workflow are preserved. No publication was performed.

## Run locally

Run these commands from this directory:

```powershell
npm ci
npx tsc --noEmit
node scripts/verify-journey-map.mjs
npm run build
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_great_felicia_hardy.sql
npm start -- --port 5176
```

Apply the schema command only when initializing a fresh local database. Open `http://127.0.0.1:5176/?map=REGISTER`. Local D1 state remains under ignored `.wrangler/state`; it is separate from hosted records.

## Contents and workflow

- `lib/journey-map.json`: code-grounded inventory, launch targets, open questions and acceptance checks.
- `USER_JOURNEY_MAP.md`: generated readable counterpart.
- `app/JourneyMap.tsx`: journeys, search, category filters, per-node detail and task access.
- `lib/journey-tasks.ts`: one browser-readable QA brief per node, with source references.
- Existing record initialization uses INSERT OR IGNORE: added tasks do not overwrite existing task edits. Later changes to seed briefs do not automatically update records already saved in a database.

The agent reads a task, verifies its individual criteria, records PASS / FAIL / BLOCKED / NOT RUN with evidence and submits Review. Implementation beyond the scoped audit needs a separate defined task. Founder approval is required for Done. An inventory entry is not runtime certification.

## Publishing boundary

This preparation is local only. Later publication should update the existing Sites project, preserve records, and verify the owner-only access boundary before exposing internal planning material. Do not copy local test records into the hosted database. GitHub/task synchronization is not implemented by this sitemap feature; agents still work through the browser and record their branch/commit evidence.
