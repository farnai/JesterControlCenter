# Launch planning baseline — 2026-11-14

## Scope and evidence limits

Founder requested repository analysis and questions before building a personal launch-management workspace. Target date is provisionally late January 2027, pending Founder confirmation. This is a planning baseline, not a release certification or exhaustive security audit.

Inspected current application routing, auth lifecycle, discovery query, onboarding validation, interpretation storage and endpoints, wallet API/UI, platform adapters, migrations, test fixtures, task records, and selected active product/design/architecture documents. No application code, user records, migrations, task statuses, or canonical product decisions were changed. No deployment, commit, seed, or database query was executed. External JesterAI implementation, hosting accounts, SMTP/OAuth configuration, real devices, and live browser journeys were not inspected.

## Current implementation map

| Area | Source evidence | Planning implication |
| --- | --- | --- |
| Entry/auth | `frontend/src/navigation/AppRoutes.tsx`, `frontend/src/core/auth/context.tsx`, auth pages | Registration, email verification, callback, recovery, session handling and cache clearing exist. Provider configuration and deliverability still need environment verification. |
| Onboarding/profile | `backend/app/profiles/router.py`, `backend/app/astrology/validation.py`, onboarding modules | Server completion checks and birth-data validation exist; optional unknown birth time is supported. Do not rebuild this from scratch. |
| Social identity | `backend/app/enrichment/router.py`, `supabase/migrations/034_interests_system_v2.sql`, `035_onboarding_v3_enrichment.sql` | Interests, personality descriptors and connection intentions have implementation beyond the older Wave descriptions. Visibility controls require runtime acceptance checks. |
| Discovery | `backend/app/discovery/router.py`, Discover UI | Authenticated, bounded, block-aware discovery with city/shared-interest/name filters, adult candidate filtering, ID/newest ordering. No evidence of personalized ranking in this service. |
| Human messaging | `backend/app/conversations/router.py`, `frontend/src/modules/chat/ChatPage.tsx`, `frontend/src/core/realtime/SocialSync.tsx`, migration 031 | Inbox/chat, read state, retry nonce and connection-driven lifecycle are implemented in source. Fresh two-user runtime validation remains necessary. This is distinct from JesterAI. |
| Notifications | `backend/app/connections/router.py`, notification API, AppShell | Connection notification producers exist, not just a read table. This does not establish push delivery. |
| Interpretation | `backend/app/interpretation/router.py`, `library.py`, `personal_catalog.py`, corpus JSON | Existing deterministic content pipeline and personal catalog. Copy rewriting must preserve semantic IDs and contracts. |
| Daily/weekly | `backend/app/astrology/transits.py`, interpretation router and weekly module, current Home | On-request transit computation and daily/weekly presentation exist. This does not prove a scheduled delivery system. README's claim that dynamic transits are only planned is stale. |
| Stars | `backend/app/wallet/`, migration 032, `WalletModal.tsx` | Wallet, ledger and unlock entitlements exist. UI explicitly says no real-money payments. No payment checkout/provider integration found in inspected application code. |
| Mobile foundation | `frontend/app.json`, `metro.config.js`, `package.json`, `frontend/src/platform/` | Expo/React Native configuration exists. Current app uses BrowserRouter, DOM and web adapters; native adapters are targets described in comments. No native build/device verification performed. |

## Release work identified from source

1. **Production routing/configuration:** `frontend/src/core/config/index.ts` forces non-local hostnames to same-origin Supabase and API URLs, overriding the configured separate URLs on those hosts. `frontend/vite.config.ts` supplies development proxies. A deployed topology must deliberately provide those routes or change configuration; a static upload alone is not proven sufficient.
2. **Internal surfaces:** `frontend/src/navigation/AppRoutes.tsx` registers visual lab, backend audit, smoke and content inspector routes without production conditions or ProtectedRoute wrappers. Sampled page modules contain no environment guard. `DebugBar.tsx` does have a development guard, and the private astrology debug endpoint rejects production. Preserve these distinctions; do not describe every debug facility as unguarded or infer a confirmed data leak.
3. **Production hardening:** inspected config defaults CORS/hosts to wildcard. `ALLOWED_HOSTS` and `SENTRY_DSN` exist as settings, but enforcement/initialization was not found in the inspected application wiring. JWT code explicitly prohibits production HS256. Need deployed origin policy, abuse limits, observability and verification rather than claiming all security is missing.
4. **Operations/public safety:** no mounted reporting/moderation or self-service account deletion flow found in inspected frontend/backend routers. Define product behavior, operational ownership and retention before implementation. No deletion is authorized by this audit.
5. **18+ coverage:** birth input validation rejects minors and Discovery filters adult candidates. However `validate_onboarding_completion` checks birth-data presence, not age, and `get_current_user` validates identity rather than adult eligibility. Review existing-account/direct-write/protected-social-API paths before declaring the full public policy verified. Older docs saying no age enforcement exists are also inaccurate.
6. **Deployment evidence:** no tracked `.github` workflow, Dockerfile/compose deployment, or common hosting manifest was found in the targeted repository search. External configuration may exist; ask Founder where it lives. Need staging, deployment/rollback procedure, backup restoration checks, mail delivery and production smoke verification.
7. **Content persistence:** `ContentLibrary` defaults to `InMemoryContentStore`; editing/approval modifies in-process dictionaries. Repo JSON loading is not a durable CMS. Choose repository-reviewed content for initial release or explicitly scope persistent editorial storage. Do not build a workspace content editor assuming those writes survive restart.
8. **Marketing entry:** `/welcome` redirects to registration. Root HTML still uses `lang="en"` and title `JESTER — Social Astrology & Synastry`. Plan Georgian metadata, public value explanation and share previews; final messaging remains a Founder decision.
9. **Performance:** build emits a roughly 992 kB minified JS chunk (242 kB gzip), 202 kB CSS and a 2.14 MB image. Vite warns about chunks above 500 kB. These are bundle observations, not measured mobile performance results. Investigate route splitting, internal-page exclusion and image delivery.
10. **UX consistency:** multiple shared/primitives UI families and old/new Home implementations coexist. Typography tokens use a system stack while root CSS self-hosts Noto Sans Georgian; registration CSS includes text below 12px. Assess active styles and rendered screens before changes. No visual acceptance has been performed in this audit.
11. **Discovery pagination defect candidate:** newest ordering uses `created_at DESC, id DESC`, while the shared cursor predicate remains `id > after`. Cursor/order mismatch is visible in source and needs targeted regression coverage and correction if newest pagination is used. Current Home requests only the first six newest records.
12. **Testing safety:** central fixture cleanup is non-destructive, but residual explicit deletion remains in `tests/database/test_database_security.py`, `tests/backend/test_discovery.py`, `tests/backend/test_profiles_self_healing.py`; QA preparation contains Admin user deletion and the old isolated regression runner drops its database. Do not execute these indiscriminately. Align verification with current AGENTS.md and canonical Data Manager before database tests.

## Documentation and task-state drift

- Current source supersedes stale README and Wave statements about daily transits, 18+ and monetization infrastructure.
- `docs/JESTER_PRODUCT_FOUNDATION.md` excludes open-ended AI chat, while Founder now requests JesterAI integration. Define the new role and update the governing decision explicitly before integration.
- Architecture v1.2 describes Free/Plus/Credits; current implementation uses Stars unlocks. Confirm the launch commercial model instead of treating either as the final approved price plan.
- Several Home iterations and Waves 2–4 remain in `.jester/tasks/review/`; no active/inbox work was present at inspection. These historical review states do not identify the current launch critical path.
- The blocked TASK-0002 records an interrupted orchestration experiment; it is not evidence of a current product launch blocker.
- Agent registry names/models are historical configuration, not evidence of current connected Codex/Gemini/Claude execution. Founder confirmed the team: Founder, Codex, Gemini, optionally Claude.

## Verification performed

| Command (working directory) | Result | Limit |
| --- | --- | --- |
| `git status --short` (root, before audit artifact) | Exit 0; clean | Local tracked worktree only |
| `npm.cmd run build` (`frontend`) | Exit 0; TypeScript + Vite pass; chunk-size warning | No deployed/runtime correctness claim |
| `npm.cmd test` (`frontend`) | Exit 0; 19 tests pass across date utilities, color guard and interest filtering | Narrow suite; not full component/browser coverage |

Full backend/database tests were intentionally not run because residual destructive operations were found and this analysis does not authorize them. No runtime/database-state or migration-application claims are made. No secrets were copied into this report.

## Proposed work ordering, subject to decisions

1. Agree launch audience, success criteria, public versus invitation beta, JesterAI requirement and monetization.
2. Reconcile current implementation with launch inventory; establish a safe verification path and staging topology.
3. In parallel work streams: core UX coherence, voice pilot then corpus rewrite, bounded JesterAI integration contract, public-safety/operations gates.
4. Integrate; run complete user journeys, privacy checks and real-device acceptance; execute closed beta.
5. Fix release blockers, rehearse rollback and make the public-launch decision from evidence.

## Founder questions for planning

1. Confirm late January 2027: open public release or invitation beta; what outcome defines success?
2. Which first audience/geography/language and acquisition channel will seed the social experience?
3. How many Founder hours per week, and what infrastructure/AI/marketing budget range is available?
4. Is integrated JesterAI mandatory on day one? Define its primary jobs, allowed context and readiness source separately from human messaging.
5. Is launch free or paid? How should Stars be obtained, and how should AI usage be limited?
6. Which product experience should dominate first use: self-insight, discovering people, relationship interpretation, or JesterAI?
7. Which screens are most unsatisfactory, and should the approved palette/logo remain while UX changes?
8. Which voice examples set the desired sarcasm intensity? Approve a small pilot before mass rewriting.
9. What domain, hosting/Supabase, email/OAuth accounts, support contact and legal/operator arrangements already exist outside this repo?
10. Who handles reports/support after release, and who will participate in the first closed beta?
11. What is the intended mobile-app timing and any requirement to share UI code? Native strategy remains an architectural decision.
12. Should the management workspace initially track decisions/tasks manually or need repository synchronization? Which Blauframe workflows must it retain?

These are decision inputs, not a requirement to answer every question before useful work can proceed. Prioritize launch scope, JesterAI, commercial model, audience and capacity first. No new task assignments or approval statuses were created.

## Founder follow-up — supersedes the open questions above where answered

Conversation decisions recorded for planning; this section is provenance, not a replacement for canonical domain specifications:

- Launch should be publicly accessible. Invitation-only beta is not selected; Founder is open to hearing benefits. Acquire and evaluate real users through advertising and content.
- Initial geographic marketing focus is Tbilisi, using TikTok, Facebook and other social channels.
- Self-understanding precedes discovering people; this is already established product intent, not a new question.
- JesterAI is intended as a separate integrated service for an optional audience with the Jester, contextualized by self/profile/relationship information.
- Initially no real-money collection. Future paid capabilities may be visibly marked coming soon. AI chat should provide three free questions plus five launch-gift questions. Reset period, grant eligibility and post-exhaustion UX remain to be specified; do not infer a daily allowance.
- Measure actual interest and interactions before finalizing Stars and the commercial system. Existing Stars code is not an instruction to launch a paid wallet.
- Total six-month budget is approximately GEL 20,000, including marketing, people, licenses and infrastructure. Self-funded operating costs after that period are a business objective, not a forecast or guarantee.
- Logo and palette are open for experimentation; previous visual choices are no longer final constraints for future explorations. Application implementation still follows the design approval workflow.
- Voice remains sharp intellectual sarcasm and shared humor, excluding humiliating attacks on vulnerabilities. Founder supplied concrete examples; do not ask again for a definition of this boundary.
- Several domains exist, final choice pending. Production infrastructure and other operational services are not yet set up according to Founder.
- The answer about a one-to-two-month interval appears to refer to native apps after observed user interest; confirm this interpretation. Support ownership and beta testers remain unanswered because question numbering shifted.
- Build a purpose-specific management workspace with required repository synchronization and Gemini task execution. No need to copy Blauframe's layout. Automated execution does not override existing review, data protection, commit, push or deployment rules.
- Team role proposal accepted for now: Founder decisions, Codex coordination/integration/verification, Gemini bounded execution/content, optional Claude independent review.

### Additional direct JesterAI source inspection

Read the Founder-designated local JesterAI checkout without changing it or running inference. References below are relative to that separate repository; no machine-specific paths are retained here.

- `backend/routes.py`: optional service-key guard exists. Chat identity is supplied through `payload.user_id`, not verified Supabase JWT identity. The supplied summary's claim about a user-ID header is not the current source behavior.
- Current history endpoint is `GET /api/conversations/{conversation_id}`. It uses the service auth guard, but no per-user conversation ownership check appears in this route or the memory interface. Chat also loads history by conversation ID. Integration must establish authenticated ownership, not merely attach a React client.
- `jester_core/quota/in_memory_quota.py`: process-local usage/reservations with atomic pre-inference reservation. Durable quotas across restart and multiple workers, idempotent retry handling and the launch bonus still require integration work.
- `jester_core/context_builder.py`: accepts birth date and arbitrary custom attributes and inserts context into the system prompt. Do not forward private birth records by default. Define a server-built allowlisted context DTO from approved signals; treat user text as untrusted data. Any external-provider disclosure needs an explicit product/data boundary.
- `persona/system_prompt.md` describes mocking weaknesses and escalating sarcasm when the user protests. This conflicts with the Founder's reiterated distinction between sarcasm and humiliating mockery; reconcile the prompt with the approved voice before public use.
- The supplied 42-test result and model-quality assessment are user-provided prior evidence, not independently reproduced in this follow-up. No claim that the service is fully production-ready follows from those counts.
- Main repo `docs/AI_BRIDGE_ARCHITECTURE.md` points to the separate JesterBridge repository for agent execution. Inspect its current implementation before designing another runner. A task JSON directory by itself does not execute Gemini.

### Suggested measurement and delivery decisions (not yet approved)

- Track source campaign, signup, onboarding completion, first self-insight, return visits, discovery, connection actions, AI question consumption, interest in planned features and cost. Avoid birth details, private messages and AI prompts in analytics.
- Measure return and value after the initial gift, not just free-chat consumption or button clicks. Future-feature interest is not evidence of willingness to pay.
- Keep task definitions and lifecycle in one canonical repository system; workspace edits should round-trip through controlled validation. A worker should claim a task, execute within scope, run verification and submit evidence for review. Remote publishing remains separately authorized.

## Founder clarification — launch experience and workspace scope

- The six-month operating budget starts at public launch. Approximate monthly spending is GEL 3,000; detailed allocation will be handled with the marketer from January. Exclude financial management from workspace V1. Keep implementation and recurring costs proportionate.
- Founder typically contributes 3–4 hours daily and will initially handle most support. A branded automatic responder is only an idea; preserve a clear path to human help for account, access and privacy issues.
- Native apps are deferred until interest is established after the web launch; the earlier one-to-two-month statement was confirmed in that context, not as a fixed delivery commitment.
- Launch AI chat is text-only: no image/video attachments. Provide three initial questions, then reveal five gift questions after exhaustion. The gift presentation should feel personal and use Jester's voice; exact copy remains to be authored. Suggested good-day/bad-day variants are creative proposals, not permission to claim knowledge of actual lived events from astrology. Use supported interpretation context without altering deterministic signals.
- Chat is the primary location for the gift experience. Daily Energy should offer sharing and a contextual action to ask Jester about oneself. Exact CTA copy and UI placement need design work. Do not reinterpret this as replacing self-understanding as the first product priority.
- Founder requested marketing analytics including Microsoft Clarity and Ahrefs; prepare a minimal measurement plan. No tracking SDK/account has been installed or enabled in this task.
- Recommended initial stack: GA4 for acquisition/activation/return events; Clarity restricted initially to approved public surfaces; Search Console and Ahrefs Free for public-site SEO. These are recommendations, not configured integrations. Exclude private chats, birth-data entry and sensitive profile/interpretation surfaces from session recording at launch; validate consent, URLs and event payloads before activation.
- Proposed launch events: signup, onboarding completion, first self-insight view, Daily Energy share action, context-to-chat entry, first successful AI answer, base quota exhausted, bonus granted/used, total quota exhausted and return visits. Track share initiation separately from any provable completion; do not claim a recipient received a share from a click alone. Do not send private content or raw account/person/conversation identifiers to advertising systems.
- Workspace V1 remains focused on milestones, tasks/dependencies, decisions/references, reviews and repository-backed execution status. Analytics setup is a tracked launch task, not a requirement to build an analytics dashboard inside the workspace.

Official sources checked for recommendations:
- https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-masking
- https://learn.microsoft.com/en-us/clarity/setup-and-installation/consent-mode
- https://support.google.com/analytics/answer/6004245
- https://ahrefs.com/webmaster-tools/
