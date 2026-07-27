# AGENTS.md — EventTrail (CampusPulse)
### Master rules for every agent working in this workspace

This file is read by every agent Antigravity spawns in this project, before it plans or
writes anything. It is the source of truth for *what* we're building and *how* we work.
Detailed, topic-specific rules live in `.agents/rules/` — this file is the map to them.

---

## 1. What this project is

EventTrail (internally also called CampusPulse) is a serverless AWS campus event
management + navigation platform, built as an MCA academic project at ASIET (KTU),
submission deadline **October 20, 2026**.

Full specs live at the project root — read them before touching code:
- `@ProjectET.md` — product spec, user roles, functional requirements, data model
- `@BackendArchitecture.md` — the 6-module architecture and 12-week sprint plan
- `@DesignSystem.md` — screen-by-screen UI spec and shared states/behaviors

Stack: React (frontend) · Node.js/AWS Lambda (backend) · API Gateway · RDS MySQL +
DynamoDB · Cognito · SNS · S3/CloudFront · Leaflet.js + OpenRouteService (navigation).

## 2. The 6-module build order — do not skip ahead

1. **Foundation, Infra & Auth** — accounts, VPC, RDS base schema, Cognito, API Gateway, CI/CD
2. **Event Management** — event CRUD, approval workflow, venues
3. **RSVP & Smart Waitlist** — RSVP, seat counters, waitlist auto-promotion
4. **Notifications** — SNS email/SMS, reminders, preferences
5. **Campus Navigation** — outdoor (OpenRouteService) + indoor (floor-plan) routing
6. **Admin/Organizer Dashboards & Analytics** — cross-module reporting, final integration

Dependency chain: **1 → 2 → 3 → 4 → 6**, with **5 branching off 2** (navigation only needs
venue data, not RSVP/notifications). An agent must never build Module *N* against a stub
of Module *N-1* — check the prior module's exit criteria (defined in
`BackendArchitecture.md`) are actually met first. If they aren't, say so and stop.

## 3. Non-negotiable working rules

- **One module, one branch, one stack.** Never let Module 3's Lambda touch Module 2's
  table directly — only through an internal Lambda invocation or the shared API, per
  `BackendArchitecture.md` §1.
- **Every module ships its own tests before being wired into the frontend.** No
  "we'll test it later" — see `.agents/rules/backend-standards.md`.
- **Every module gets a completion document before being marked done.** This is not
  optional — see `.agents/rules/documentation-policy.md` and the
  `.agents/workflows/module-completion-doc.md` workflow.
- **Design tokens are fixed, not TBD.** `DesignSystem.md` lists placeholder tokens —
  the real, confirmed system is the Didasko Aesthetic. See
  `.agents/rules/frontend-design-system.md`. Do not invent new colors, radii, or shadow
  styles outside that spec.
- **Never mark a sprint "done" without checking it against the exit criteria** written
  for that module in `BackendArchitecture.md` §2. Vibes are not exit criteria.

## 4. Rules index

| File | Covers |
|---|---|
| `.agents/rules/backend-standards.md` | Lambda structure, IAM scoping, DB conventions, testing bar |
| `.agents/rules/frontend-design-system.md` | Didasko Aesthetic tokens, component rules, mobile-first constraints |
| `.agents/rules/documentation-policy.md` | What a "module complete" doc must contain, when to write one |
| `.agents/rules/safety-and-guardrails.md` | What the agent must never do unattended (deploys, deletes, secrets) |

## 5. Workflows available

- `/module-completion-doc` — generates the full write-up for a just-finished module
  (see `.agents/workflows/module-completion-doc.md`)

## 6. Communication style for this workspace

Explain reasoning as you go — don't just produce a diff silently. This project is being
used to learn cloud architecture, not just to ship it, so when you make an architectural
decision (e.g., "using a conditional write instead of a lock"), say *why* in a sentence
or two before or after the code. Keep it concrete, skip the marketing tone.
