# EventTrail — Backend Architecture & Sprint Plan

**Submission deadline:** October 20, 2026
**Plan start date:** July 27, 2026
**Duration:** 12 weeks → 6 modules × 2 weeks each (2-day final buffer before submission)

---

## 1. Architecture Principles

The backend is split into **independent, loosely-coupled modules**, each owning its own Lambda functions, database tables, and API routes. This lets each module be:

- **Built independently** — one module's delay doesn't block another's development.
- **Monitored independently** — CloudWatch log groups, alarms, and dashboards per module.
- **Tested independently** — each module ships with its own Postman/integration test collection before being wired into the frontend.
- **Deployed independently** — each module is its own serverless stack (e.g., separate `serverless.yml` / SAM template or CDK stack), reducing blast radius of a bad deploy.

All modules share:
- A common **API Gateway** (one gateway, path-based routing per module, e.g. `/events/*`, `/rsvp/*`).
- A common **Cognito User Pool** for authentication (Module 1 owns setup; every other module consumes it).
- A shared **RDS MySQL** instance (separate schemas/tables per module, no cross-module direct table writes — only via internal Lambda invocation).
- **DynamoDB** for high-write, low-latency data (waitlist, counters, notification logs).
- **IAM roles scoped per Lambda** (least privilege — a module's Lambda can only touch its own tables/queues).

---

## 2. Module Breakdown

### Module 1 — Foundation, Infrastructure & Auth
**Owns:** account setup, networking, CI/CD, authentication, base schema.

| Component | Detail |
|---|---|
| AWS account/org setup | IAM users/roles, billing alarms, dev/prod environment separation |
| VPC (if needed for RDS) | Private subnets for RDS, security groups |
| RDS MySQL instance | Base schema: `users`, `clubs`, `venues` tables |
| DynamoDB tables | Table creation: `waitlist_queue`, `notifications_log`, `seat_counters` |
| Cognito User Pool | Sign-up/login, email verification, role-based groups (Student, Faculty, Organizer, Admin) |
| API Gateway | Base gateway + Cognito authorizer wired in |
| CI/CD pipeline | GitHub Actions (or CodePipeline) → auto-deploy Lambda per module on merge |
| S3 + CloudFront | Bucket for frontend hosting + bucket for event/venue assets, CDN distribution |
| Monitoring baseline | CloudWatch log groups + a shared dashboard skeleton other modules plug into |

**API endpoints:** `POST /auth/signup`, `POST /auth/login`, `GET /users/me`, `PUT /users/me`

**Exit criteria:** a user can sign up, verify email, log in, get a valid JWT, and hit a protected `/users/me` endpoint through API Gateway.

---

### Module 2 — Event Management
**Owns:** event lifecycle, venues, approval workflow, media.

| Component | Detail |
|---|---|
| `events` table (RDS) | title, description, category, venue_id, club_id, start/end time, capacity, status |
| Event CRUD Lambdas | create, update, cancel, list, get-by-id, filter/search |
| Approval workflow | organizer submits (status=pending) → admin approves/rejects |
| Venue management | CRUD for `venues` table (building, floor, room, lat/long, indoor_map_ref) |
| Image upload | Presigned S3 URLs for event banner images |

**API endpoints:** `POST /events`, `GET /events`, `GET /events/{id}`, `PUT /events/{id}`, `DELETE /events/{id}`, `POST /events/{id}/approve`, `GET /venues`, `POST /venues`

**Depends on:** Module 1 (auth, base tables).

**Exit criteria:** an organizer can create an event, an admin can approve it, and it's publicly listable/filterable.

---

### Module 3 — RSVP & Smart Waitlist
**Owns:** registration, seat counting, waitlist queue and auto-promotion.

| Component | Detail |
|---|---|
| `rsvps` table (RDS) | event_id, user_id, status (confirmed/waitlisted/cancelled), timestamps |
| Seat counter | DynamoDB atomic counter per event to prevent overbooking race conditions |
| RSVP Lambda | one-click register → checks capacity → confirms or waitlists |
| Cancel Lambda | un-RSVP → frees seat → triggers waitlist promotion |
| Waitlist queue | DynamoDB `waitlist_queue` (partition key event_id, sort key position) |
| Promotion Lambda (event-driven) | triggered on cancellation/capacity increase → promotes next in line → sets TTL confirmation window → cascades if unconfirmed |

**API endpoints:** `POST /rsvp/{eventId}`, `DELETE /rsvp/{eventId}`, `GET /rsvp/my-events`, `GET /events/{id}/waitlist` (organizer view)

**Depends on:** Module 1 (auth), Module 2 (events must exist).

**Exit criteria:** RSVP-ing to a full event correctly waitlists a user; cancelling a confirmed RSVP correctly promotes the next waitlisted user and fires a notification event (published to SNS topic, consumed by Module 4).

---

### Module 4 — Notifications
**Owns:** all outbound Email/SMS, in-app notification center, preferences.

| Component | Detail |
|---|---|
| SNS topics | `rsvp-confirmed`, `waitlist-promoted`, `event-reminder`, `event-changed` |
| Notification Lambdas | subscribe to SNS topics → format + send Email/SMS via SNS |
| Scheduled reminders | EventBridge scheduled rule → Lambda scans upcoming events (24h/1h out) → publishes reminder events |
| `notifications_log` (DynamoDB) | record of what was sent, to whom, when — powers in-app notification center |
| Preferences | `notification_preferences` table/columns (email/SMS/both/none per category) |

**API endpoints:** `GET /notifications`, `PUT /notifications/preferences`

**Depends on:** Module 1 (users), Module 3 (RSVP/waitlist events to react to).

**Exit criteria:** an RSVP confirmation and a waitlist promotion each reliably trigger an email + SMS within a few seconds; a reminder fires 24h before a test event.

---

### Module 5 — Campus Navigation
**Owns:** outdoor routing, indoor floor-plan pathing, venue directory data.

| Component | Detail |
|---|---|
| Outdoor routing Lambda | proxies/calls OpenRouteService API (keeps API key server-side, adds caching) |
| Indoor navigation Lambda | serves floor-plan JSON/SVG + computes step-by-step path between entrance and room |
| Floor-plan asset management | S3-stored floor-plan images/SVGs + metadata in RDS (`venues.indoor_map_ref`) |
| Venue directory endpoint | building info, accessibility notes, nearest entrance |

**API endpoints:** `GET /navigation/outdoor?from=&to=`, `GET /navigation/indoor/{venueId}`, `GET /venues/{id}/directory`

**Depends on:** Module 2 (venue data must exist).

**Exit criteria:** given a venue ID, the API returns a usable outdoor route (Leaflet-renderable) and an indoor floor + path to the correct room.

---

### Module 6 — Admin Dashboard, Organizer Dashboard & Analytics
**Owns:** cross-module reporting, management UIs' backing APIs, final integration.

| Component | Detail |
|---|---|
| Admin APIs | user/club management, platform-wide analytics (total events, RSVPs, attendance rate, active clubs) |
| Organizer APIs | attendee list export (CSV), per-event analytics (views, conversion rate), announcement send |
| Analytics aggregation | scheduled Lambda (EventBridge) aggregates daily stats into a reporting table for fast dashboard reads |
| Integration testing | end-to-end tests across all 6 modules |
| Load/monitoring pass | CloudWatch alarms, dashboards finalized across all modules; basic load test on RSVP endpoint (highest-contention path) |
| Deployment hardening | prod environment config review, secrets audit, final IAM least-privilege pass |

**API endpoints:** `GET /admin/analytics`, `GET /admin/users`, `PUT /admin/users/{id}`, `GET /organizer/events/{id}/attendees`, `POST /organizer/events/{id}/announce`

**Depends on:** all prior modules.

**Exit criteria:** admin dashboard and organizer dashboard are fully data-backed; full user journey (discover → RSVP → get notified → navigate → attend) works end-to-end in a staging environment.

---

## 3. Sprint Plan (2 Weeks per Module)

| Sprint | Module | Start | End | Key Deliverable |
|---|---|---|---|---|
| Sprint 1 | Module 1 — Foundation, Infra & Auth | Jul 27, 2026 | Aug 9, 2026 | Auth working end-to-end; CI/CD live; base DB schema deployed |
| Sprint 2 | Module 2 — Event Management | Aug 10, 2026 | Aug 23, 2026 | Full event CRUD + approval workflow + venue management live |
| Sprint 3 | Module 3 — RSVP & Waitlist | Aug 24, 2026 | Sep 6, 2026 | One-click RSVP + auto-waitlist-promotion working, race-condition tested |
| Sprint 4 | Module 4 — Notifications | Sep 7, 2026 | Sep 20, 2026 | Email/SMS firing correctly on RSVP, waitlist, and reminders |
| Sprint 5 | Module 5 — Campus Navigation | Sep 21, 2026 | Oct 4, 2026 | Outdoor + indoor navigation APIs live and Leaflet-renderable |
| Sprint 6 | Module 6 — Admin/Organizer Dashboards & Analytics | Oct 5, 2026 | Oct 18, 2026 | Dashboards fully data-backed; full E2E user journey works in staging |
| Buffer | Final integration, bug-fix, deployment | Oct 19, 2026 | Oct 20, 2026 | Production deploy, demo rehearsal, submission |

### Per-sprint working rhythm (applies to every sprint)
- **Day 1:** sprint planning — break module into tickets, assign, confirm dependencies from prior module are met.
- **Day 2–8:** build — daily standup (async is fine for a small team), Lambdas + tables + endpoints built and unit-tested.
- **Day 9–10:** integration — connect module's endpoints to the existing frontend demo screens, fix contract mismatches.
- **Day 11–12:** testing — Postman/integration test collection run, CloudWatch alarms configured, manual QA against the module's exit criteria above.
- **Day 13:** monitoring pass — confirm logs/metrics are visible on the shared dashboard; fix any noisy/missing alarms.
- **Day 14:** sprint review — demo the module against its exit criteria, close out, hand off any blockers to the next sprint.

---

## 4. Dependency Chain

```
Module 1 (Auth/Infra)
   ↓
Module 2 (Events) ──────► Module 5 (Navigation, needs venues)
   ↓
Module 3 (RSVP/Waitlist)
   ↓
Module 4 (Notifications)
   ↓
Module 6 (Dashboards/Analytics — needs everything)
```

Module 5 can technically start as soon as Module 2's venue schema is finalized (early in Sprint 2), so if the team has bandwidth to parallelize, Module 5 and Module 3/4 can be worked by a second developer concurrently to build in schedule slack — but the sequential plan above assumes a single-threaded build and keeps a clean 2-week-per-module cadence.

---

## 5. Risk & Monitoring Notes

- **Highest-risk module:** Module 3 (RSVP/Waitlist) — race conditions on seat counting under concurrent RSVPs. Mitigate with DynamoDB atomic counters/conditional writes, not RDS row locks.
- **External dependency risk:** Module 5 relies on OpenRouteService API — confirm rate limits/free-tier quota early in Sprint 5, cache routes where possible.
- **Schedule risk:** Sprint 6 has the most cross-module dependencies. If any earlier sprint slips, protect Sprint 6 by cutting scope inside that sprint first (e.g., ship analytics as read-only static reports rather than a live dashboard) rather than compressing the buffer.
- **Monitoring:** every module ships CloudWatch alarms for Lambda error rate and latency before its sprint is marked done — not deferred to Module 6.
