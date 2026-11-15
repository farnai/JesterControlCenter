# Jester Control Center

> **Independent Founder Management System & Launch Control Plane for Jester**

The **Jester Control Center** is a standalone, local-first management application and launch orchestration control plane. It coordinates launch milestones, tracks feature completion, manages acceptance tasks, and visualizes the complete code-grounded **User Journey Map** (45 functional nodes, 220 acceptance checks across 5 core journeys) without cluttering or coupling to the consumer-facing Jester product repository.

---

## 1. Architectural Role & Responsibilities

- **Personal Founder Control Plane:** Task CRUD, status workflows (Backlog → Ready → In Progress → Review → Done), and Founder approval gating.
- **Code-Grounded User Journey Map:** Visual 45-node interactive journey from registration to transits, discovery, relationships, messaging, and Stars economy.
- **Agent Brief & Acceptance Generator:** Automated briefs for AI coding agents and verification tracking.
- **Isolated State & Storage:** Cloudflare D1 (SQLite) backend with Drizzle ORM, preserving local task state independently from production databases.
- **Decoupled from Jester Product:** Jester consumer app (`frontend/`, `backend/`, `supabase/`) contains zero runtime dependencies on Control Center.

---

## 2. Directory Structure

```text
JesterControlCenter/
├── app/                  # Vinext / Next.js app router (JourneyMap, pages, api routes)
│   ├── api/records/      # D1 records API (tasks, decisions, events, audit log)
│   ├── JourneyMap.tsx    # Interactive 45-node User Journey Map
│   └── page.tsx          # Main control center dashboard & navigation
├── components/ui/        # 61 shadcn UI components
├── db/                   # Drizzle database connection and schema
├── docs/launch/          # Launch planning baseline and sitemap reports
│   ├── 2026-11-14-launch-planning-baseline.md
│   ├── TASK-LAUNCH-SITEMAP.json
│   └── TASK-LAUNCH-SITEMAP_report.md
├── drizzle/              # D1 SQL migrations
├── lib/                  # Journey map definition, seed data, task helpers
│   ├── journey-map.json  # 45 nodes, 220 checks
│   ├── journey-tasks.ts  # Task mapping and agent briefs
│   └── seed.json         # JST-001..040 launch milestone tasks
├── public/               # Public assets & Georgian fonts
├── scripts/              # Verification & runner scripts
│   ├── verify-journey-map.mjs  # Validates node IDs, sources in Jester, graph links
│   └── verify-workflow.mjs     # Tests D1 task CRUD, transitions, soft delete
├── LOCAL_WORKSPACE.md    # Local setup and workflow notes
└── USER_JOURNEY_MAP.md   # Generated markdown checklist of the journey map
```

---

## 3. Running Locally

### Prerequisites
- Node.js `>=22.13.0`
- Jester repository located side-by-side at `../Jester` or configured via `JESTER_REPO_ROOT`.

### Quickstart
```powershell
# 1. Install dependencies
npm ci

# 2. Typecheck
npx tsc --noEmit

# 3. Verify Journey Map code sources against Jester
node scripts/verify-journey-map.mjs

# 4. Verify task state machine and DB workflows
node scripts/verify-workflow.mjs

# 5. Build production bundle
npm run build

# 6. Initialize local D1 database (first run only)
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_great_felicia_hardy.sql

# 7. Start local server
npm start -- --port 5176
```

Open `http://127.0.0.1:5176/` in your browser.

---

## 4. Jester Repository Integration

To verify that journey map nodes match the real Jester repository without hardcoding local file paths, `scripts/verify-journey-map.mjs` checks:
1. Environment variable `JESTER_REPO_ROOT` if set.
2. Relative directory `../Jester` if present.
3. Fallback `../../..`.

---

## 5. Deployment Boundary

- Control Center is designed for private / founder hosting on Cloudflare Sites/Pages (`appgprj_6af8d16bdb9c8191b90c8d3001fe7c63`).
- **Never deploy Control Center alongside or inside the public Jester consumer product.**
