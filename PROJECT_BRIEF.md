# 🐚 Seashell Project — Agent Brief

> **Read this first.** One-page orientation for any agent joining the project.  
> **Last updated:** June 2026  
> **Current phase:** Planning complete — awaiting Phase 0 kickoff

---

## What We Are Building

**Seashell Hotel & Resort** — a resort management SaaS for a 5-star beach resort in Julai'a, Kuwait (formerly Kempinski Julai'a). Built on top of the **ASP.NET Zero Core** commercial template (.NET 9 + Angular 19), with a **.NET MAUI (Blazor Hybrid)** consumer app and a customized **Angular 19** admin dashboard.

### Three User Facing Apps

| App | User | Entry Mode | Stack |
|---|---|---|---|
| **Marketing** | Public visitors | No login | .NET MAUI (Blazor Hybrid) — native mobile app |
| **Guest** | Checked-in guests | Room # + PIN | .NET MAUI (Blazor Hybrid) — native mobile app |
| **Day Pass** | Day visitors | Activate pass | .NET MAUI (Blazor Hybrid) — native mobile app |
| **Admin** | Resort staff | Email + password | Angular 19 (customized template) — web dashboard |

> **Note:** Marketing, Guest, and Day Pass are a **single MAUI app** with mode-switching (matching the prototype's auth pattern). The Admin Dashboard is a separate Angular web application.

---

## Project Structure

```
C:\Users\Nnstein's PC\Desktop\Seashell App Project\
├── plan.md                          ← Master development plan (866 lines, 5 phases)
├── PROJECT_BRIEF.md                 ← THIS FILE — read me first
├── PROGRESS.md                        ← Live progress tracker
├── DECISIONS.md                       ← Why we chose what we chose
├── AGENTS.md                          ← Multi-agent collaboration rules
│
├── ASP.NET_Zero_Core - Master Template/    ← Backend template (15,000+ files)
│   ├── angular/                          ← Angular 19 admin dashboard (PRODUCTION — customized template)
│   ├── aspnet-core/                      ← Backend: Core, Application, EF, Web.Host, MAUI, GraphQL, etc.
│   └── ui-tests-playwright/              ← End-to-end tests
│
├── prototype_extracted/                    ← React PWA prototype (DESIGN REFERENCE ONLY — not production)
│   └── app/                              ← Vite + React 19 + Tailwind + shadcn/ui
│       ├── src/screens/                   ← All screen designs to replicate in MAUI/Angular
│       │   ├── public/                    ← Marketing screens (→ MAUI)
│       │   ├── guest/                     ← Guest screens (→ MAUI)
│       │   ├── daypass/                   ← Day Pass screens (→ MAUI)
│       │   ├── admin/                     ← Admin screens (→ Angular)
│       │   └── auth/                      ← Login screens (→ MAUI for guest/daypass, Angular for admin)
│       ├── src/components/ui/             ← 40+ shadcn/ui components (design reference for MAUI/Angular)
│       ├── src/hooks/useAuth.tsx          ← Auth mode-switching pattern (replicate in MAUI)
│       ├── src/data/resortData.ts         ← Static resort data (to be replaced by API)
│       └── package.json                   ← React 19 + Vite 7 + Tailwind 3.4
│
├── prototype_screenshots/                  ← 21 UI screenshots of the live prototype
├── boilerplate_capabilities.md.resolved  ← Full capability map of ASP.NET Zero template
├── explore_admin_final.js                ← Playwright script for admin exploration
├── package.json                          ← Playwright dependency
└── prototype-screenshot.png              ← Single composite screenshot
```

---

## Tech Stack (Final Decisions)

### Backend — ASP.NET Zero Core (Customized)

| Layer | Technology | Status |
|---|---|---|
| Framework | ASP.NET Core 9 | Keep (template) |
| ORM | EF Core 9 | Keep (template) |
| Database | SQL Server 2022 | Keep (template) |
| Auth | ASP.NET Identity + JWT + **OpenIddict** | **Keep** (self-hosted OAuth) |
| Social Auth | Facebook, Google, Twitter, Microsoft | **Keep** (customer data) |
| APIs | REST + **GraphQL** | **Keep** GraphQL for future consumers |
| Mobile | **.NET MAUI + Blazor Hybrid** | **Keep** (native mobile app) |
| Real-time | SignalR | Keep (template) |
| Background Jobs | Hangfire + SQL Server | Keep (template) |
| Dashboard | **Drag-and-drop widgets** | **Keep** (customizable admin) |
| Web.Public | **MVC public site** | **Keep** (under review) |
| Web.Mvc | **MVC admin panel** | **Keep** (under review) |
| Payments | ~~Stripe / PayPal~~ | **Cut** — use KD wallet; KNET later |
| Chat | ~~Friendship/Chat~~ | **Cut** — not in prototype |
| Subscriptions | ~~Editions/Subscriptions~~ | **Cut** — not SaaS yet |
| Dynamic Props | ~~Dynamic Entity Properties~~ | **Cut** — over-engineering for v1 |

### Frontend — .NET MAUI Consumer App (Marketing + Guest + Day Pass)

A **single downloadable app** with mode-switching for all three consumer portals.

| Layer | Technology |
|---|---|
| Framework | .NET MAUI 9 + Blazor Hybrid |
| UI | Razor Components (Blazor) |
| Styling | CSS (scoped per component) |
| State | Cascading Parameters + DI Services |
| Data | HttpClient + API DTOs (shared with backend) |
| Forms | EditForm + DataAnnotations / FluentValidation |
| Icons | MudBlazor Icons or custom SVGs |
| Auth | MSAL / custom JWT with SecureStorage |
| i18n | .NET Localization (EN/AR) |
| Distribution | Google Play Store + Apple App Store |

### Frontend — Angular 19 Admin Dashboard

Customized from the **ASP.NET Zero Angular template** (Metronic theme).

| Layer | Technology |
|---|---|
| Framework | Angular 19 |
| UI Library | Metronic + PrimeNG + ngx-bootstrap (template) |
| Styling | SCSS (template theme, customized) |
| State | NgRx / Services |
| Data | NSwag-generated TypeScript API clients |
| Charts | Chart.js / ngx-charts |
| Auth | OpenIddict / JWT (template's built-in auth) |
| i18n | ngx-translate (EN/AR) |

### Prototype — React PWA (Design Reference Only)

The React 19 prototype remains in `prototype_extracted/` as a **living design specification**. It is not deployed to production. Use it as the visual reference when building MAUI and Angular screens.

---

## Current Status

### ✅ Done (Planning)

- [x] Prototype built — all screens functional with mock data
- [x] Design system documented — colors, typography, layout tokens
- [x] Data schema defined — resort_data.json with 13 room types, 4 restaurants, 8 facilities, 11 attractions
- [x] Master plan written — 5 phases, 12 weeks, 50+ API endpoints
- [x] Template customization decisions finalized — keep/cut/modify list locked

### 🔄 Next (Phase 0 — Foundation)

- [ ] Rename solution: `MyCompanyName.AbpZeroTemplate` → `Seashell.Resort`
- [ ] Add 10 custom entities to Core layer: RoomType, RoomUnit, Booking, DayPass, Transaction, Restaurant, Facility, ContentBlock, MediaAsset, GuestRequest
- [ ] Create EF Core migration: `InitialSeashellSchema`
- [ ] Seed database from `resort_data.json`
- [ ] Configure single-tenant mode
- [ ] Scaffold MAUI consumer app with Blazor Hybrid (Marketing mode)
- [ ] Build MAUI marketing screens wired to `/api/public/*` endpoints
- [ ] Verify end-to-end: MAUI app loads real data from SQL Server

---

## Key Files Every Agent Must Know

| File | Purpose | When to Read |
|---|---|---|
| `plan.md` | Full development plan (5 phases, 12 weeks) | When you need the big picture |
| `PROJECT_BRIEF.md` | This file — 2-minute orientation | **Every session start** |
| `PROGRESS.md` | What's done, what's in progress, what's blocked | Before picking up work |
| `DECISIONS.md` | Why architectural choices were made | Before challenging a decision |
| `AGENTS.md` | How to collaborate without conflicts | Before working in parallel |
| `prototype_extracted/app/src/App.tsx` | Prototype router — design reference for MAUI mode-switching | When designing MAUI navigation |
| `prototype_extracted/app/src/hooks/useAuth.tsx` | Prototype auth pattern — replicate in MAUI | When designing MAUI auth flow |
| `prototype_extracted/app/src/data/resortData.ts` | Static data (to be replaced by API) | When working on data models |
| `ASP.NET_Zero_Core - Master Template/aspnet-core/src/` | Backend template source | When working on backend |
| `ASP.NET_Zero_Core - Master Template/angular/` | Angular admin dashboard (production) | When working on admin UI |
| `ASP.NET_Zero_Core - Master Template/aspnet-core/src/Seashell.Resort.Mobile.MAUI/` | MAUI consumer app project | When working on consumer app |
| `boilerplate_capabilities.md.resolved` | Full template capability map | When deciding what to keep/cut |

---

## Quick Reference

### Demo Credentials (Frontend Prototype)

| Role | Credential | Notes |
|---|---|---|
| Guest | Room `304` + PIN `1234` | 2BR Chalet First Floor, Abdullah Al-Sabah |
| Guest | Room `512` + PIN `5678` | Presidential Suite, Fatima Hassan |
| Manager | `manager@seashell.kw` / `admin2026` | Full admin access |
| Receptionist | `reception@seashell.kw` / `frontdesk2026` | Front desk access |
| Supervisor | `supervisor@seashell.kw` / `supervisor2026` | Supervisor access |

### Brand Tokens (Design System)

| Token | Hex | Usage |
|---|---|---|
| Primary | `#89C1D8` | Dusty cyan — nav, buttons, accents |
| Secondary | `#FDEAE9` | Blush pink — CTAs, highlights |
| Accent | `#e97a74` | Salmon — hover, bookmarks, urgency |
| Text | `#595955` | Warm greige — body text |
| Background | `#f2f2f2` | Soft gray — page backgrounds |
| Admin Dark | `#0f1117` | Admin dashboard background |
| Admin Card | `#161b22` | Admin card background |
| Admin Border | `#21262d` | Admin card borders |

### API Endpoint Prefixes

```
/api/v1/public/*      → No auth (marketing data)
/api/v1/auth/*        → Authentication (login, refresh, logout)
/api/v1/guest/*       → Guest JWT required (in-house features)
/api/v1/daypass/*     → Day Pass JWT required (wallet, transactions)
/api/v1/admin/*       → Staff JWT + Permission required (management)
```

---

## If You Are Just Starting

1. **Read this file** (you just did) — 2 minutes
2. **Check `PROGRESS.md`** — see what's currently being worked on
3. **Check `AGENTS.md`** — see if another agent is working on your area
4. **Read the relevant section of `plan.md`** — the phase you're about to work on
5. **Start working** — you now have enough context

**Do NOT** re-read the entire plan or re-explore the entire project folder. That's what these documents are for.

---

*This is a living document. Update it after every significant milestone. Keep it under 200 lines so it always fits in context.*
