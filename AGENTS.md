# AGENTS.md — AI Agent Guidelines for Jester Control Center

## What is Jester Control Center?

The **Jester Control Center** is the independent personal management system, launch control plane, and User Journey Map workspace for Jester. It operates on Cloudflare Vinext / Pages with Cloudflare D1 (SQLite) and Drizzle ORM.

## Project Boundary & Architecture Governance

1. **Dedicated Scope:** This repository is solely for launch planning, task management, milestone tracking, and the code-grounded User Journey Map. Consumer product features (mobile app, backend APIs, Supabase migrations) must be developed in `Jester` (`../Jester`).
2. **Coupling Prevention:** Never introduce runtime dependencies or imports from Jester product code into Control Center, or vice versa.
3. **Repository Verification:** When `scripts/verify-journey-map.mjs` checks code sources, it reads `../Jester` or the path specified in `JESTER_REPO_ROOT`. Never hardcode developer-specific absolute paths.
4. **Data Protection:** Local task records and audit history reside in Cloudflare D1. Never run destructive database drops or overwrite active records with seed data.
5. **Deployment Boundary:** Control Center deploys independently to private/founder hosting (Sites project `appgprj_6af8d16bdb9c8191b90c8d3001fe7c63`). Never deploy Control Center into consumer product environments.
6. **Authorization Rule:** Never execute `git push`, remote repo creation, or production deployment without explicit Founder authorization.
