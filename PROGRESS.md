# Seashell Project — Progress Tracker

> **Live document.** Update this after every work session. Mark items done, in-progress, or blocked.  
> **Format:** `- [ ]` = pending, `- [/]` = in progress, `- [x]` = done, `- [!]` = blocked

---

## Phase 0: Foundation (Weeks 1-2)
**Goal:** Running backend with custom entities. Marketing site serves live data from API.

| # | Task | Owner | Status | Notes |
|---|---|---|---|---|
| 0.1 | Rename solution & projects (`MyCompanyName.AbpZeroTemplate` → `Seashell.Resort`) | Orchestrator | - [x] | All dirs, .csproj, .sln renamed. All namespaces updated (1,675 files). Zero old-name refs remain. Build verification blocked by system NuGet env issue (see Blockers). |
| 0.2 | Disable Chat/Friendship SignalR hub | Orchestrator | - [x] | Deleted 7 directories (Core/Chat, Core/Friendships, Application/Chat, Application/Friendships, Application.Shared/Chat, Application.Shared/Friendships, Web.Core/Chat) + 5 files (Controllers, GDPR, DataCleaners). Removed references from DbContext, CoreModule, WebCoreModule, Startup files (Host+MVC), CustomDtoMapper, AppFeatureProvider, AppFeatures, ProfileAppService, UserEmailer, IUserEmailer, TenantDemoDataBuilder, DefaultEditionCreator. All non-migration code references eliminated. |
| 0.3 | Remove Subscription/Editions UI and backend logic | | - [ ] | |
| 0.4 | Remove Dynamic Entity Properties UI and backend logic | | - [ ] | |
| 0.5 | Remove Stripe/PayPal payment configs | | - [ ] | Keep payment infra for KNET later |
| 0.6 | Configure single-tenant mode | | - [ ] | Disable subdomain routing |
| 0.7 | **Add `RoomType` entity** to Core + Application + DTOs | Antigravity | - [x] | |
| 0.8 | **Add `RoomUnit` entity** to Core + Application + DTOs | | - [ ] | |
| 0.9 | **Add `Booking` entity** to Core + Application + DTOs | | - [ ] | |
| 0.10 | **Add `DayPass` entity** to Core + Application + DTOs | | - [ ] | |
| 0.11 | **Add `Transaction` entity** to Core + Application + DTOs | | - [ ] | |
| 0.12 | **Add `Restaurant` entity** to Core + Application + DTOs | | - [ ] | |
| 0.13 | **Add `Facility` entity** to Core + Application + DTOs | | - [ ] | |
| 0.14 | **Add `ContentBlock` entity** to Core + Application + DTOs | | - [ ] | |
| 0.15 | **Add `MediaAsset` entity** to Core + Application + DTOs | | - [ ] | |
| 0.16 | **Add `GuestRequest` entity** to Core + Application + DTOs | | - [ ] | |
| 0.17 | Add DbSet properties to `AbpZeroTemplateDbContext` | | - [ ] | |
| 0.18 | Create EF Core migration: `InitialSeashellSchema` | | - [ ] | |
| 0.19 | Run migration on local SQL Server | | - [ ] | |
| 0.20 | **Seed `RoomType` data** (13 types from resort_data.json) | | - [ ] | |
| 0.21 | **Seed `Restaurant` data** (4 venues from resort_data.json) | | - [ ] | |
| 0.22 | **Seed `Facility` data** (8 facilities from resort_data.json) | | - [ ] | |
| 0.23 | **Seed `ContentBlock` data** (marketing text blocks) | | - [ ] | |
| 0.24 | **Seed `RoomUnit` data** (19 physical rooms from prototype) | | - [ ] | |
| 0.25 | **Seed `Booking` data** (2 demo bookings: 304, 512) | | - [ ] | |
| 0.26 | Build backend solution — verify compiles | | - [ ] | |
| 0.27 | Run `Web.Host` — verify Swagger at `/swagger` | | - [ ] | |
| 0.28 | Create `/api/v1/public/resort-info` endpoint | | - [ ] | |
| 0.29 | Create `/api/v1/public/room-types` endpoint | | - [ ] | |
| 0.30 | Create `/api/v1/public/restaurants` endpoint | | - [ ] | |
| 0.31 | Create `/api/v1/public/facilities` endpoint | | - [ ] | |
| 0.32 | Create `/api/v1/public/gallery` endpoint | | - [ ] | |
| 0.33 | Create `/api/v1/public/content/{section}` endpoint | | - [ ] | |
| 0.34 | Build MAUI `MarketingLanding` screen wired to `/api/v1/public/resort-info` | | - [ ] | Blazor Hybrid |
| 0.35 | Build MAUI `MarketingRooms` screen wired to `/api/v1/public/room-types` | | - [ ] | Blazor Hybrid |
| 0.36 | Build MAUI `MarketingDining` screen wired to `/api/v1/public/restaurants` | | - [ ] | Blazor Hybrid |
| 0.37 | Build MAUI `MarketingFacilities` screen wired to `/api/v1/public/facilities` | | - [ ] | Blazor Hybrid |
| 0.38 | Build MAUI `MarketingGallery` screen wired to `/api/v1/public/gallery` | | - [ ] | Blazor Hybrid |
| 0.39 | Build MAUI `MarketingContact` screen wired to `/api/v1/public/content/contact` | | - [ ] | Blazor Hybrid |
| 0.40 | **End-to-end test:** MAUI app loads real data from SQL Server | | - [ ] | |

**Phase 0 Deliverable:** MAUI consumer app (Marketing mode) serves live data from SQL Server via `/api/v1/public/*`.

---

## Phase 1: Guest Authentication & In-House App (Weeks 3-4)
**Goal:** Guests can check in with Room + PIN and see their booking details.

| # | Task | Owner | Status | Notes |
|---|---|---|---|---|
| 1.1 | Implement `/api/v1/auth/guest-login` (Room + PIN) | | - [ ] | |
| 1.2 | Implement guest JWT with custom claims (BookingId, RoomUnitId) | | - [ ] | |
| 1.3 | Create `/api/v1/guest/my-booking` endpoint | | - [ ] | |
| 1.4 | Create `/api/v1/guest/my-room` endpoint | | - [ ] | |
| 1.5 | Create `/api/v1/guest/requests` endpoints (GET/POST) | | - [ ] | |
| 1.6 | Create `/api/v1/guest/bookmarks` endpoints (GET/POST/DELETE) | | - [ ] | |
| 1.7 | Create `/api/v1/guest/room-service-menu` endpoint | | - [ ] | |
| 1.8 | Build MAUI `LoginScreen` wired to real API | | - [ ] | Room + PIN auth |
| 1.9 | Build MAUI `GuestMain` screen wired to real API endpoints | | - [ ] | Blazor Hybrid |
| 1.10 | Build MAUI `GuestRoom` screen wired to `/api/v1/guest/my-room` | | - [ ] | Blazor Hybrid |
| 1.11 | Build MAUI `GuestExplore` screen wired to `/api/v1/public/*` | | - [ ] | Blazor Hybrid |
| 1.12 | Build MAUI `GuestProfile` screen wired to `/api/v1/guest/*` | | - [ ] | Blazor Hybrid |
| 1.13 | Test end-to-end: Guest checks in to Room 304, sees real data | | - [ ] | |

**Phase 1 Deliverable:** Complete guest in-house experience from check-in to service requests.

---

## Phase 2: Day Pass System (Weeks 5-6)
**Goal:** Visitors can buy and use a prepaid day pass with wallet transactions.

| # | Task | Owner | Status | Notes |
|---|---|---|---|---|
| 2.1 | Implement `/api/v1/auth/day-pass` (create pass, 15 KD balance) | | - [ ] | |
| 2.2 | Create `/api/v1/daypass/my-pass` endpoint | | - [ ] | |
| 2.3 | Create `/api/v1/daypass/transactions` endpoint | | - [ ] | |
| 2.4 | Create `/api/v1/daypass/topup` endpoint | | - [ ] | |
| 2.5 | Create `/api/v1/daypass/spend` endpoint (POS integration) | | - [ ] | |
| 2.6 | Create `/api/v1/daypass/zones` endpoint | | - [ ] | |
| 2.7 | Create barcode/QR generation endpoint | | - [ ] | |
| 2.8 | Hangfire job: expire passes at 23:59 daily | | - [ ] | |
| 2.9 | Build MAUI `DayPassMain` screen wired to real API | | - [ ] | Blazor Hybrid |
| 2.10 | Build MAUI `DayPassWallet` screen wired to `/api/v1/daypass/my-pass` | | - [ ] | Blazor Hybrid |
| 2.11 | Build MAUI `DayPassHistory` screen wired to `/api/v1/daypass/transactions` | | - [ ] | Blazor Hybrid |
| 2.12 | Test end-to-end: Buy pass → spend → view history | | - [ ] | |

**Phase 2 Deliverable:** Complete day pass purchase, wallet, and spending flow.

---

## Phase 3: Admin Dashboard Backend (Weeks 7-8)
**Goal:** Admin API powers all 8 admin sections with real data.

| # | Task | Owner | Status | Notes |
|---|---|---|---|---|
| 3.1 | Define admin permissions (`Pages.Guests`, `Pages.Rooms`, etc.) | | - [ ] | |
| 3.2 | Create `/api/v1/admin/dashboard/summary` (KPIs) | | - [ ] | |
| 3.3 | Create `/api/v1/admin/dashboard/activity` (recent feed) | | - [ ] | |
| 3.4 | Create `/api/v1/admin/guests` CRUD + check-in/check-out | | - [ ] | |
| 3.5 | Create `/api/v1/admin/rooms` CRUD + status updates | | - [ ] | |
| 3.6 | Create `/api/v1/admin/daypasses` CRUD + revoke | | - [ ] | |
| 3.7 | Create `/api/v1/admin/restaurants` CRUD | | - [ ] | |
| 3.8 | Create `/api/v1/admin/facilities` CRUD | | - [ ] | |
| 3.9 | Create `/api/v1/admin/reports/*` endpoints | | - [ ] | |
| 3.10 | Create `/api/v1/admin/content/blocks` CRUD | | - [ ] | |
| 3.11 | Create `/api/v1/admin/content/assets` upload/delete | | - [ ] | |
| 3.12 | Create `/api/v1/admin/requests` queue + resolve | | - [ ] | |
| 3.13 | Customize Angular admin dashboard screens — wire to real API | | - [ ] | Template customization |
| 3.14 | Connect SignalR for real-time Angular dashboard updates | | - [ ] | |
| 3.15 | Test end-to-end: Admin checks in guest, updates room, views reports | | - [ ] | |

**Phase 3 Deliverable:** Fully functional admin dashboard managing real resort data.

---

## Phase 4: Reports, Analytics & Polish (Weeks 9-10)
**Goal:** Production-ready reports, analytics, and user experience polish.

| # | Task | Owner | Status | Notes |
|---|---|---|---|---|
| 4.1 | Revenue reports (daily/weekly/monthly by category) | | - [ ] | |
| 4.2 | Occupancy reports (room type utilization, trends) | | - [ ] | |
| 4.3 | Guest analytics (demographics, repeat guests, avg stay) | | - [ ] | |
| 4.4 | Day pass analytics (issuance trends, avg spend, peak hours) | | - [ ] | |
| 4.5 | PDF/Excel export for all reports | | - [ ] | |
| 4.6 | Scheduled reports (Hangfire nightly email) | | - [ ] | |
| 4.7 | Real-time admin notifications (SignalR) | | - [ ] | |
| 4.8 | Admin dashboard charts (Recharts with real data) | | - [ ] | |
| 4.9 | MAUI app store preparation (icons, splash, signing, listings) | | - [ ] | |
| 4.10 | Arabic localization (complete AR translation) | | - [ ] | |
| 4.11 | Image optimization (lazy loading, responsive, CDN) | | - [ ] | |
| 4.12 | Performance testing (100+ concurrent users) | | - [ ] | |

**Phase 4 Deliverable:** Production-ready app with analytics, reporting, and bilingual support.

---

## Phase 5: Production Deployment (Weeks 11-12)
**Goal:** Deployed to production with monitoring, backups, and CI/CD.

| # | Task | Owner | Status | Notes |
|---|---|---|---|---|
| 5.1 | Provision Azure SQL / AWS RDS | | - [ ] | |
| 5.2 | Deploy Web.Host API to Azure App Service | | - [ ] | |
| 5.3 | Deploy MAUI app to Google Play Store + Apple App Store | | - [ ] | |
| 5.3b | Deploy Angular admin dashboard to Azure Static Web Apps / CDN | | - [ ] | |
| 5.4 | GitHub Actions CI/CD pipeline | | - [ ] | |
| 5.5 | SSL certificate + custom domain | | - [ ] | |
| 5.6 | Application Insights + Serilog monitoring | | - [ ] | |
| 5.7 | Automated daily backups | | - [ ] | |
| 5.8 | Security hardening (OWASP audit) | | - [ ] | |
| 5.9 | Staff training + UAT | | - [ ] | |
| 5.10 | Go-live (soft launch) | | - [ ] | |

**Phase 5 Deliverable:** Live at `https://app.seashell-kuwait.com`.

---

## Blockers & Issues

| # | Issue | Impact | Date Raised | Resolution |
|---|---|---|---|---|
| | *None currently* | | | |
| B-001 | `dotnet restore` fails system-wide with `Value cannot be null. (Parameter 'path1')` inside `NuGet.Configuration.ConfigurationDefaults`. `Environment.GetFolderPath(CommonApplicationData)` returns null in Python subprocesses. Even a blank `dotnet new classlib` fails. | Blocks all backend build verification | 2026-06-30 | Resolved: Bypassed MAUI package restore/workload issues by building Seashell.Resort.Web.sln directly, and fixed missing Chat/Friendships dependency references by adding stub classes so the backend solution compiles cleanly. |

---

## Last Session Log

| Date | Agent | What Was Done | What Changed |
|---|---|---|---|
| 2026-07-01 | Kimi Code CLI | Renamed remaining `MyCompanyName.AbpZeroTemplate` references to `Seashell.Resort`: Angular .csproj/.sln, Maui module/component files, npm/angular project names, and .gitignore paths. | No remaining `MyCompanyName.AbpZeroTemplate` refs in template source/config. Angular production build succeeds. |
| 2026-07-01 | Kimi Code CLI | Fixed EF Core migration stale namespace references: removed `using Seashell.Resort.Chat;` and `using Seashell.Resort.Friendships;` from 11 orphaned `.Designer.cs` files. | `Seashell.Resort.EntityFrameworkCore` now compiles. `Seashell.Resort.Web.Host` compiles cleanly. Full `Seashell.Resort.Web.sln` still fails because `Web.Mvc/Areas/AppAreaName/Views/Layout/_ChatBar.cshtml` references the removed Chat namespace. |
| 2026-07-01 | Antigravity | Task 0.7 complete: Created RoomType entity, Category enum, DbSet, DTOs, AppService, AutoMapper mappings, and seeded 13 room types. | Verified `Seashell.Resort.EntityFrameworkCore` compiles. |
| 2026-06-30 | Orchestrator | Task 0.2 complete: Removed Chat/Friendship SignalR hub and all related features from backend. | Deleted 7 dirs + 5 files. Removed references from 14 source files. All non-migration code references eliminated. |

*Add a new row after every session. Keep last 10 rows.*
