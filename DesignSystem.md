# EventTrail — UI Design System & Frontend Functional Spec

**Reference blueprint:** https://event-trail-ui.vercel.app/ (visual/UX reference — reconcile section 2 tokens against it before dev starts)
**Stack:** React.js, HTML5, CSS3, JavaScript, Leaflet.js

This document is the single source of truth for every screen, its states, and the frontend behavior expected of it, so UI work can be built and reviewed screen-by-screen alongside the backend modules.

---

## 1. Design Principles

- **Mobile-first.** Most students will use this on a phone between classes — every screen designed for a narrow viewport first, then expanded.
- **One click to act.** RSVP, cancel, and navigate are the platform's core verbs — never bury them behind extra taps or forms.
- **Always show status.** Seat count, waitlist position, RSVP state, and event status (upcoming/ongoing/cancelled) should be visible at a glance, not hidden in a detail page.
- **Map is a first-class citizen**, not an afterthought — navigation entry points appear directly on event cards, not only inside a separate "Map" tab.
- **Role-aware, not role-separate.** Students, organizers, and admins share the same visual language and component library; only the available actions and dashboards differ.

*(Section 2 below proposes placeholder tokens — replace with the exact values pulled from the live demo before implementation.)*

---

## 2. Design Tokens (placeholder — verify against live demo)

| Token | Value (to confirm) | Usage |
|---|---|---|
| Primary color | TBD from demo | Primary buttons, active nav, links |
| Secondary/accent | TBD from demo | Badges, highlights (e.g., "Waitlisted", "Trending") |
| Success | Green | Confirmed RSVP, seat available |
| Warning | Amber | Waitlisted, closing soon |
| Danger | Red | Cancelled, full, error states |
| Font — headings | TBD from demo | Page titles, event names |
| Font — body | TBD from demo | Descriptions, labels |
| Border radius | TBD from demo | Cards, buttons, inputs |
| Spacing scale | 4 / 8 / 16 / 24 / 32 px | Layout rhythm |
| Breakpoints | Mobile <480px, Tablet 480–1024px, Desktop >1024px | Responsive layout |

**Component library (shared across all screens):** Button (primary/secondary/danger/ghost), Input, Select, Date/Time picker, Event Card, Badge/Status Pill, Modal, Toast/Snackbar, Avatar, Navbar, Bottom Tab Bar (mobile), Sidebar (desktop/admin), Empty State, Skeleton Loader, Progress/Capacity Bar.

---

## 3. Screen-by-Screen Specification

### 3.1 Login / Sign Up
**Purpose:** authenticate via Cognito; route users into the correct role-based experience.

- Toggle between Login and Sign Up on one screen (tab or link switch, not separate routes if avoidable).
- Fields — Login: email, password, "Forgot password?" link.
- Fields — Sign Up: name, institutional email, password, confirm password, role selector if applicable (Student/Faculty/Organizer requests are usually self-service; Admin is provisioned manually).
- Email verification step (OTP or link) after sign-up, matching Cognito's flow.
- Inline validation (email format, password strength) — no submit-then-fail round trips.
- Loading state on submit button (spinner replaces label, button disabled).
- Error states: invalid credentials, unverified email, network failure — each with a distinct, actionable message.
- On success: redirect to **Student Home** (or role-appropriate dashboard) and persist session (JWT stored securely, silent refresh).

### 3.2 Student / Faculty Home
**Purpose:** primary discovery surface — "what's happening on campus."

- Top: search bar + filter chips (category, date, venue, "my club" if applicable).
- Featured/Trending carousel (optional, if enough events exist).
- Event feed as cards, each showing: banner image, title, club/organizer, date/time, venue name, seats-remaining indicator (progress bar or "12 / 50 seats"), RSVP status if already registered, category badge.
- Card-level quick actions: **RSVP** button directly on the card (one-click, no navigating away), and a **map pin icon** to jump straight to navigation for that venue.
- Empty state: "No events match your filters" with a clear-filters action.
- Infinite scroll or pagination for the feed.
- Bottom tab bar (mobile) / top nav (desktop): Home, Map, My Events, Notifications, Profile.

### 3.3 Event Detail Page
**Purpose:** full information + the RSVP/waitlist/cancel action + navigate entry point.

- Hero banner image, title, club/organizer name (linkable to club profile if present).
- Date, time, venue (tappable → opens Navigation page pre-loaded to this venue).
- Description (rich text), tags, eligibility/rules if any.
- Capacity indicator: seats confirmed / total, and if full, **waitlist position** for the current user once joined.
- Primary action button, state-dependent:
  - Not registered + seats available → **"RSVP"** (one click, confirms immediately, button becomes "Cancel RSVP").
  - Not registered + full → **"Join Waitlist"** (button becomes "Leave Waitlist", shows position, e.g. "You're #4 in line").
  - Registered → **"Cancel RSVP"** (secondary/danger styling, confirmation modal before cancelling).
  - Event passed/cancelled → button disabled, replaced with a status banner.
- Optional custom RSVP questions (organizer-defined) shown as a short form inside a modal triggered by the RSVP button, before final confirmation.
- "Navigate to venue" button — launches Navigation Page with route pre-loaded.
- Share button (copy link).
- For organizers/admins viewing their own event: an "Edit" and "View Attendees" entry point instead of/alongside RSVP.

### 3.4 My Events
**Purpose:** personal record of registrations.

- Tabs: **Upcoming**, **Waitlisted**, **Past**.
- Each row/card: event title, date, venue, status pill (Confirmed / Waitlisted #n / Attended / Missed / Cancelled).
- Tap-through to Event Detail.
- Upcoming tab surfaces a "Navigate" shortcut per event for same-day events.

### 3.5 Campus Navigation Page
**Purpose:** outdoor + indoor wayfinding to a venue.

- Map view (Leaflet.js) centered on campus, with venue pins.
- If launched from an event, route auto-loads: current location (or selected start point) → destination building, drawn via OpenRouteService.
- Toggle: **Outdoor Route** / **Indoor Route** (indoor only shown if the venue has floor-plan data).
- Outdoor mode: walking route line, ETA/distance, turn-by-turn text list below the map.
- Indoor mode: floor-plan viewer with floor selector (if multi-floor), highlighted path from entrance to room, room label.
- Venue info panel: building name, accessibility notes, nearest entrance — collapsible so it doesn't block the map on mobile.
- Search/select a different venue directly from this page (not only via an event).
- Loading and "route unavailable" states (e.g., OpenRouteService failure — fall back to straight-line pin + manual directions text).

### 3.6 Notifications Center
**Purpose:** in-app record of everything sent via Email/SMS, plus preferences.

- Reverse-chronological list: icon by type (RSVP confirmed, waitlist promoted, reminder, event changed/cancelled), message, timestamp, read/unread state.
- Tap-through to the relevant event.
- Mark all as read.
- **Preferences** entry point (separate screen or modal): per-category toggle for Email / SMS / Both / None (RSVP confirmations, waitlist updates, reminders, new event alerts).

### 3.7 Profile
**Purpose:** identity + personalization.

- Name, department/year, email (read-only or editable per Cognito settings), avatar.
- Interest tags (drives personalized recommendations on Home).
- Link to Notification Preferences.
- Logout.
- If Organizer role: a "My Club(s)" section linking into the Organizer Dashboard.

### 3.8 Organizer Dashboard
**Purpose:** club-side event management, separate visual context from student browsing (e.g., sidebar layout on desktop).

- **My Events** list (draft / pending approval / live / past) with quick stats per event: registered count, waitlist count, views.
- **Create/Edit Event** form: title, description, category, venue picker (map-assisted), date/time, capacity, banner image upload, custom RSVP questions builder, submit-for-approval action.
- **Event detail (organizer view):** attendee list (searchable/sortable), waitlist list, **Export CSV** button, **Send Announcement** action (message composer → triggers notification to all registered attendees).
- Basic per-event analytics: views vs. RSVPs (conversion rate), simple bar/line chart.

### 3.9 Admin Dashboard
**Purpose:** platform oversight — distinct layout (persistent sidebar) reflecting its "control panel" nature.

- **Pending Approvals** queue: event cards with Approve/Reject actions and a rejection-reason field.
- **Analytics Overview:** total events, total RSVPs, platform-wide attendance rate, most active clubs, participation trend chart over time.
- **User Management:** searchable table, role editor, deactivate/reactivate action.
- **Club Management:** create/edit clubs, assign organizer(s).
- **Venue & Floor-Plan Management:** CRUD for buildings/floors/rooms, floor-plan image upload, pin placement on the outdoor map (drag-to-place lat/long).
- **Reports:** date-range picker → CSV export of events/RSVPs/attendance for institutional records.

---

## 4. Shared States & Behaviors (apply across all screens)

- **Loading:** skeleton loaders for cards/lists (not blank spinners) to avoid layout shift.
- **Empty states:** every list/feed has a purpose-written empty message + relevant action (not a generic "no data").
- **Error states:** toast for transient errors (e.g., failed RSVP due to race condition — "That seat was just taken, you've been added to the waitlist"); full-page error only for unrecoverable failures (auth expired, network down).
- **Optimistic UI:** RSVP/cancel buttons update immediately on tap, then reconcile with the server response (roll back with a toast if the backend rejects it — e.g., seat taken).
- **Real-time-ish freshness:** seat counts and waitlist positions should re-fetch on screen focus/return, not rely solely on a single load (Phase 1: polling or refetch-on-focus; WebSocket/live updates are a future enhancement, not required now).
- **Accessibility:** color is never the only status signal (pair badges with icons/text), sufficient tap-target size (≥44px) for mobile actions, alt text on all event/venue images.

---

## 5. Navigation Structure

**Student/Faculty (mobile bottom tabs / desktop top nav):**
`Home → Map → My Events → Notifications → Profile`

**Organizer (adds to student nav, or a mode switch from Profile):**
`Dashboard → My Events (manage) → Create Event → Analytics`

**Admin (dedicated sidebar layout, separate from student shell):**
`Approvals → Analytics → Users → Clubs → Venues → Reports`

---

## 6. Mapping to Backend Modules

| Screen | Primary backend module(s) it depends on |
|---|---|
| Login/Sign Up | Module 1 — Auth |
| Student Home, Event Detail | Module 2 — Event Management |
| RSVP actions, My Events, waitlist position | Module 3 — RSVP & Waitlist |
| Notifications Center, Preferences | Module 4 — Notifications |
| Navigation Page | Module 5 — Campus Navigation |
| Organizer Dashboard | Module 2 + Module 3 (own data), Module 4 (announcements) |
| Admin Dashboard | Module 6 — Admin/Analytics (+ reads across all) |

This lets frontend screens be built and demo-able in step with the sprint each backend module lands in, rather than waiting for the full backend to be done.
