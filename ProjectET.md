# EventTrail
### Campus Community & Event Management Platform

**Live UI Blueprint:** https://event-trail-ui.vercel.app/ (frontend-only demo, no backend — this document specifies the full product to be built around it)

---

## 1. Overview

EventTrail is a cloud-based campus community platform built to simplify event management and improve student engagement through centralized event discovery, RSVP management, and campus navigation.

Today, campus event information is scattered across WhatsApp groups, emails, notice boards, and word of mouth. Students miss events they'd have wanted to attend, club organizers waste time manually tracking attendance and coordinating logistics, and administrators have no unified view of campus activity. EventTrail solves this by giving students, faculty, and club organizers a single platform to discover, register for, and navigate to campus events — backed by a serverless AWS architecture chosen for scalability, reliability, and low operational cost.

EventTrail's key differentiator is combining event management with an **interactive campus map**, letting students find event venues through outdoor walking routes and indoor floor-plan navigation — something no generic event tool (Eventbrite, Google Forms, WhatsApp broadcasts) offers for a campus context.

---

## 2. Problem Statement

- Event information is fragmented across multiple informal channels (WhatsApp, email, posters, word of mouth).
- No single source of truth for "what's happening on campus."
- RSVP and attendance tracking is manual (spreadsheets, paper sign-in sheets).
- No system to manage waitlists when seats free up — spots go unused or are re-filled unfairly.
- New students and visitors struggle to locate event venues, especially indoors (which floor, which room).
- Club organizers and admins have no dashboard to track registrations, capacity, or engagement trends.
- Notifications about event changes (time, venue, cancellation) are inconsistent and easy to miss.

---

## 3. Objectives

1. Provide a centralized platform for campus event management.
2. Integrate interactive campus navigation for locating event venues (outdoor + indoor).
3. Simplify event registration through one-click RSVP.
4. Automatically manage waiting lists when seats become available.
5. Provide real-time event notifications using Email and SMS.
6. Reduce manual work for administrators and club organizers.
7. Improve student participation in campus activities.
8. Build a scalable, cost-effective serverless cloud application.

---

## 4. User Roles

| Role | Description |
|---|---|
| **Student** | Discovers events, RSVPs, joins waitlists, navigates to venues, receives notifications, views personal event history. |
| **Faculty** | Same as student, plus may be granted event-creation rights for department events. |
| **Club Organizer** | Creates and manages events for their club, views registrations/attendance, manages waitlists, sends announcements. |
| **Administrator** | Full platform oversight — approves events, manages venues/maps, manages users and clubs, views platform-wide analytics. |

---

## 5. Core Functionalities

### 5.1 Authentication & User Management
- Sign up / login via AWS Cognito (email + password, optionally institutional SSO).
- Role-based access control (Student, Faculty, Club Organizer, Admin).
- Profile management (name, department, year, interests/tags for personalized recommendations).
- Email verification and password reset flows.

### 5.2 Event Discovery
- Browse all upcoming events in a list/grid view.
- Filter by category (technical, cultural, sports, workshop, seminar, club-specific), date, venue, or club.
- Search by event name/keyword.
- Featured/trending events section.
- Personalized recommendations based on past RSVPs and interest tags.
- Event detail page: description, date/time, venue, organizer, capacity, seats remaining, tags, rules/eligibility.

### 5.3 One-Click RSVP
- Single-click registration for logged-in users (no repeated form-filling).
- Instant confirmation shown in-app and sent via email/SMS.
- "My Events" dashboard showing upcoming registered events, past events, and waitlisted events.
- Ability to cancel/un-RSVP, which immediately frees the seat for the waitlist.
- Optional short custom questions per event (e.g., team name, dietary preference) configurable by organizer.

### 5.4 Smart Waitlist Management
- Automatic waitlist activation once an event reaches capacity.
- FIFO (or configurable priority) queue for waitlisted users.
- Automatic promotion from waitlist to confirmed when a seat opens (cancellation or capacity increase).
- Auto-notification to promoted users with a time-boxed confirmation window (e.g., confirm within 2 hours or forfeit the seat, cascading to the next person).
- Organizer visibility into waitlist size and conversion rate.

### 5.5 Campus Navigation
- **Outdoor navigation:** interactive campus map (Leaflet.js + OpenRouteService API) showing walking routes from the user's current location (or a chosen starting building) to the event venue.
- **Indoor navigation:** custom floor-plan viewer for buildings, showing the specific floor and room/hall for an event, with step-by-step directions from the building entrance.
- Venue pins on the map linked directly from event detail pages ("Navigate to venue").
- Building/venue directory with static info (accessibility notes, capacity, nearest entrance).

### 5.6 Notifications
- AWS SNS-powered Email and SMS notifications for:
  - RSVP confirmation
  - Waitlist promotion
  - Event reminders (e.g., 24 hours / 1 hour before)
  - Event changes (time, venue) or cancellations
  - New event announcements matching a student's interests (opt-in)
- In-app notification center as a supplementary channel.
- User-configurable notification preferences (email only / SMS only / both / none per category).

### 5.7 Administrative Dashboard
- Event approval workflow (organizer submits → admin approves/rejects, or auto-approve for trusted clubs).
- Venue and floor-plan management (add/edit buildings, floors, rooms, map overlays).
- User and club management (roles, permissions, deactivation).
- Platform-wide analytics: total events, RSVPs, attendance rates, most active clubs, engagement trends over time.
- Reporting/export (CSV) for institutional record-keeping.

### 5.8 Club Organizer Dashboard
- Create/edit/cancel events with rich details (description, images, capacity, custom RSVP questions).
- View live registration count, attendee list, waitlist.
- Export attendee list (CSV) for check-in.
- Send targeted announcements to registered attendees.
- Basic per-event analytics (views, RSVP conversion rate).

---

## 6. Non-Functional Requirements

- **Scalability:** serverless architecture (Lambda + API Gateway + DynamoDB) to handle event-day traffic spikes without manual provisioning.
- **Reliability:** managed AWS services with built-in high availability; RDS Multi-AZ optional for relational data.
- **Cost-efficiency:** pay-per-use serverless model keeps idle-time cost near zero, appropriate for a campus-scale, budget-constrained deployment.
- **Security:** Cognito-managed auth, IAM least-privilege roles for Lambda functions, HTTPS everywhere, input validation on all API endpoints.
- **Performance:** CloudFront CDN for static assets and map tiles; target sub-2s page loads.
- **Usability:** mobile-first responsive UI (majority of students will access via phone).
- **Maintainability:** clear separation of frontend (React SPA) and backend (Lambda microservices behind API Gateway).

---

## 7. Technology Stack

| Layer | Technology |
|---|---|
| Frontend | React.js, HTML5, CSS3, JavaScript |
| Backend | Node.js, AWS Lambda, API Gateway |
| Relational Database | Amazon RDS (MySQL) — users, events, RSVPs, venues (structured, relational data) |
| NoSQL Database | Amazon DynamoDB — high-write data such as notifications, waitlist queues, real-time seat counters |
| Cloud Platform | Amazon Web Services (AWS) |
| Authentication | AWS Cognito |
| Notifications | AWS SNS (Email & SMS) |
| Navigation | Leaflet.js, OpenRouteService API, custom indoor navigation module |
| Storage | Amazon S3 (event images, floor-plan assets) |
| CDN | Amazon CloudFront |

---

## 8. Proposed Data Model (High Level)

**Relational (RDS – MySQL)**
- `users` (id, name, email, role, department, cognito_sub, created_at)
- `clubs` (id, name, description, admin_user_id)
- `events` (id, club_id, title, description, category, venue_id, start_time, end_time, capacity, status, created_by)
- `venues` (id, building, floor, room, latitude, longitude, indoor_map_ref)
- `rsvps` (id, event_id, user_id, status [confirmed/waitlisted/cancelled], created_at)

**NoSQL (DynamoDB)**
- `waitlist_queue` — partition key `event_id`, sort key `position`, TTL for confirmation windows
- `notifications_log` — partition key `user_id`, sort key `timestamp`
- `seat_counters` — real-time atomic counters per event to avoid race conditions on RSVP

---

## 9. High-Level Architecture Flow

1. **Client (React SPA)** hosted via S3 + CloudFront calls backend through **API Gateway**.
2. **API Gateway** routes requests to individual **Lambda functions** (auth-check, event-service, rsvp-service, waitlist-service, notification-service, navigation-service).
3. **Cognito** issues and validates JWTs for every authenticated request.
4. **RDS (MySQL)** stores structured, relational data (users, events, RSVPs, venues).
5. **DynamoDB** handles high-throughput, low-latency operations (waitlist positioning, live seat counters, notification logs).
6. On RSVP/cancel/capacity events, a Lambda trigger publishes to **SNS**, which fans out Email/SMS to affected users.
7. **S3** stores event images and floor-plan assets, served globally through **CloudFront**.
8. Navigation requests hit **OpenRouteService API** (outdoor routing) or the custom indoor-navigation Lambda (floor-plan pathing), rendered client-side with **Leaflet.js**.

---

## 10. Scope Boundaries (Phase 1)

**In scope:**
- Web application (responsive, mobile-first) — no native mobile app in Phase 1.
- Single-institution deployment (one campus, one set of buildings/floor-plans).
- Email + SMS notifications only (no push notifications in Phase 1).

**Out of scope (future phases):**
- Native iOS/Android apps.
- Multi-campus / multi-tenant support.
- Payment integration for paid events.
- Social features (comments, event reviews, friend check-ins).
- AI-based personalized recommendation engine (basic tag-matching only in Phase 1).

---

## 11. Success Metrics

- % of campus events published through EventTrail vs. legacy channels.
- Average RSVP-to-attendance conversion rate.
- Reduction in organizer manual admin time (survey-based).
- Notification delivery success rate.
- Median time-to-venue using in-app navigation vs. self-reported baseline.
- Monthly active users (students) as a % of total student population.
