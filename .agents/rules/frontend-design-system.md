# Frontend Design System & Didasko Aesthetic — EventTrail (CampusPulse)

## 1. Didasko Aesthetic Design Tokens
The frontend must be styled using **Vanilla CSS (`index.css`)** with curated CSS custom properties (tokens) following the **Didasko Aesthetic**:
- **Color Palette (HSL Curated)**:
  - `--bg-primary`: `#0B0F19` (Obsidian / Deep Slate dark background)
  - `--bg-surface`: `rgba(22, 28, 45, 0.7)` (Translucent navy surface for glassmorphism)
  - `--bg-card`: `rgba(30, 41, 59, 0.6)` (Elevated card background)
  - `--text-primary`: `#F8FAFC` (Crisp slate-50 white)
  - `--text-secondary`: `#94A3B8` (Muted slate-400 gray)
  - `--color-primary`: `#6366F1` (Vibrant Indigo-500 primary brand color)
  - `--color-primary-hover`: `#4F46E5` (Indigo-600 hover state)
  - `--color-accent`: `#06B6D4` (Cyan-500 highlight badge & interactive accent)
  - `--color-success`: `#10B981` (Emerald green for confirmed RSVP / seats available)
  - `--color-warning`: `#F59E0B` (Amber yellow for waitlisted / closing soon)
  - `--color-danger`: `#EF4444` (Rose red for cancelled / event full / errors)
- **Typography (Google Fonts)**:
  - `--font-heading`: `'Epilogue', -apple-system, BlinkMacSystemFont, sans-serif` (Bold, impactful headings)
  - `--font-body`: `'Inter', -apple-system, BlinkMacSystemFont, sans-serif` (Clean, legible UI text)
- **Glassmorphism & Shadows**:
  - `--card-shadow`: `0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.3)`
  - `--glass-border`: `1px solid rgba(255, 255, 255, 0.08)`
  - `--glass-blur`: `backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);`
- **Spacing & Radii**:
  - Spacing scale: `4px / 8px / 12px / 16px / 24px / 32px / 48px / 64px`
  - `--radius-sm`: `6px`, `--radius-md`: `10px`, `--radius-lg`: `16px`, `--radius-full`: `9999px`

## 2. Component Structure Rules
- **One-Click Action Verbs**: Core platform verbs (**RSVP**, **Cancel**, **Navigate**) must never be buried behind sub-menus or extra clicks. RSVP buttons must appear directly on Event Cards in discovery feeds.
- **Always Show Status**: Seat counts (`12 / 50 seats`), waitlist positions (`#3 in line`), and event status badges must be visible at a glance on summary cards.
- **Micro-Animations**: All interactive buttons, cards, and links must feature smooth hover transformations (e.g., `transform: translateY(-2px); transition: all 0.2s ease;`), active press scale (`scale(0.98)`), and focus outline rings for accessibility.
- **Optimistic UI**: RSVP and cancellation actions should update the UI state immediately on click, rolling back with a toast notification only if the backend request fails.

## 3. Mobile-First & Responsive Layouts
- Every screen must be designed for narrow mobile viewports (<480px) first, then expanded for tablet (480–1024px) and desktop (>1024px).
- **Navigation Shell**:
  - Mobile: Bottom tab bar (`Home`, `Map`, `My Events`, `Notifications`, `Profile`) with tap targets ≥44px.
  - Desktop: Top navigation bar for students/faculty; persistent sidebar navigation for Admin and Club Organizer control panels.
- **Loading & Empty States**: Never show blank screens. Use skeleton loaders to prevent layout shift during data fetching, and custom empty states with clear calls-to-action when lists are empty.
