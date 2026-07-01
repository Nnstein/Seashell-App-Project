# Multi-Agent Collaboration Guide

> **How to work on this project without stepping on each other's toes.**  
> **Read this before starting any work. Check `PROGRESS.md` first to see who's doing what.**

---

## 1. The Golden Rule

**Never work on the same file at the same time.** If another agent is editing a file, wait for them to finish or coordinate.

## 2. Communication Protocol

### Tracking File Conflict Prevention Policy
> [!IMPORTANT]
> To prevent git merge conflicts, **never commit edits to `PROGRESS.md` or `AGENTS.md` inside your long-lived feature branches.** 
> Always make these tracking updates directly on `main` (or via a quick, dedicated `tracking/` PR) immediately when status changes, then pull those changes into your feature branch.

### Before You Start Working

1. **Read `PROJECT_BRIEF.md`** — 2-minute orientation
2. **Check `PROGRESS.md`** — verify what is currently in progress or blocked
3. **Check this file (`AGENTS.md`)** — see who has claimed what
4. **Claim your task**:
   - Pull `main` locally
   - Add your name to the "Current Agent Assignments" section below
   - If your task requires creating DB migrations, also claim the **Migration Token** (see below)
   - Commit and push this change directly to `main` (or immediate PR)
5. **Update `PROGRESS.md`**:
   - Pull `main` locally
   - Mark your task as `- [/]` (in progress)
   - Commit and push directly to `main` (or immediate PR)
6. **Create/Update your feature branch** from the latest `main`

### While You Work

- Work on **one task at a time** — do not claim multiple tasks simultaneously.
- **If you discover a blocker**:
   1. Pull `main` locally.
   2. Change your task status in `PROGRESS.md` to `- [!]` (blocked).
   3. Add a detailed entry in the **Blockers & Issues** table at the bottom of `PROGRESS.md` (format: `B-NNN`, impact, date, blocking agent/task, and description).
   4. Commit and push directly to `main` (or immediate PR).
   5. You may temporarily assign yourself to a different, non-conflicting task (following the "Before You Start" protocol) while the blocker is unresolved.
- If you need to modify a file another agent is working on, **ask first** (coordinate via chat/PR review).

### When You Finish

1. **Test your code locally** following the Review Checklist.
2. **Push your feature branch** and create a Pull Request to `main`.
3. **Once the PR is merged**:
   - Pull `main` locally.
   - Update `PROGRESS.md`: mark task as `- [x]` (done) and add a row to **Last Session Log**.
   - Update `AGENTS.md`: remove your name from "Current Agent Assignments" (and release the Migration Token if held).
   - Update `PROJECT_BRIEF.md` if you completed a milestone or made an architectural change.
   - Commit and push these tracking updates directly to `main`.

---

## 2.1 The Migration Token Protocol

To avoid database migration ordering conflicts in EF Core:
1. **Check the Token**: Look at Section 3 (Current Agent Assignments). Verify if another agent is holding the `Migration Token`.
2. **Claim the Token**: When claiming your task, if it requires database schema changes, append `(Holding Migration Token)` next to your task in Section 3.
3. **Generate & Test**:
   - Pull `main` and apply any new migrations to your local DB (`Update-Database`).
   - Run `Add-Migration <Name>` to generate your migration.
   - Test locally to make sure it builds and applies cleanly.
4. **Fast-Merge**: Submit your PR as soon as migrations are verified so other agents aren't blocked.
5. **Release**: The token is released once your PR is merged to `main` and you remove your name from Section 3.

---

## 3. Current Agent Assignments

> **Last updated:** June 2026

| Agent | Task | Status | File(s) |
|---|---|---|---|
| *None* | Task 0.2 complete — awaiting next pickup | - | - |

*When you start work, add a row here. When you finish, remove it.*

---

## 4. Work Area Boundaries

To prevent conflicts, the project is divided into **separate work areas**. Each area has its own files and should be worked on by one agent at a time.

### Area A: Backend Core (C# Entities)
**Files:** `aspnet-core/src/Seashell.Resort.Core/`
**What:** Domain entities, enums, value objects
**When:** Phase 0 tasks 0.7–0.16
**Conflict Risk:** Medium — entities reference each other

**Rules:**
- Create one entity at a time, commit after each
- If adding a foreign key to another entity, check if that entity exists yet
- Use `Task` naming convention: `ADR-001`, `ADR-002`, etc. for traceability

### Area B: Backend Application (Services & DTOs)
**Files:** `aspnet-core/src/Seashell.Resort.Application/`
**What:** AppService interfaces, DTOs, permission definitions
**When:** Phase 0 tasks 0.17–0.33
**Conflict Risk:** High — DTOs are shared across all endpoints

**Rules:**
- Create DTOs in the same PR/branch as the corresponding entity
- Never remove a DTO field once added — only deprecate
- Add new fields as optional (nullable) to avoid breaking existing frontend code
- Follow the naming convention: `CreateXDto`, `UpdateXDto`, `XDto`, `XListDto`

### Area C: Backend API (Controllers & SignalR)
**Files:** `aspnet-core/src/Seashell.Resort.Web.Host/Controllers/`
**What:** REST controllers, SignalR hubs, middleware
**When:** Phase 0 tasks 0.28–0.40
**Conflict Risk:** Low — each controller is independent

**Rules:**
- One controller per domain area (PublicController, GuestController, AdminController, DayPassController)
- Use `[ApiController]` + `[Route("api/v1/[controller]")]` consistently
- Always return `ActionResult<T>` or `Task<PagedResultDto<T>>`

### Area D: Backend EF Core (Migrations & Seeding)
**Files:** `aspnet-core/src/Seashell.Resort.EntityFrameworkCore/`
**What:** DbContext, migrations, seed data
**When:** Phase 0 tasks 0.17–0.25
**Conflict Risk:** High — migrations are order-dependent

**Rules:**
- **Only one agent creates migrations at a time.** Coordinate who has the "migration token."
- After a migration is created, all agents must update their local database before creating the next migration
- Use `Add-Migration` naming convention: `InitialSeashellSchema`, `AddRoomUnitSeedData`, etc.
- Never modify an existing migration file after it has been committed

### Area E: MAUI Marketing Screens
**Files:** `aspnet-core/src/Seashell.Resort.Mobile.MAUI/Pages/Marketing/`
**What:** MarketingLanding, MarketingRooms, MarketingDining, MarketingFacilities, MarketingGallery, MarketingContact
**When:** Phase 0 tasks 0.34–0.39
**Conflict Risk:** Low — each screen is an independent Razor component

**Rules:**
- Build Blazor components using the React prototype screens as design reference
- Wire each screen to the corresponding `/api/v1/public/*` endpoint via HttpClient
- Use DI-injected API services, not raw HttpClient calls in components

### Area F: MAUI Auth & Navigation
**Files:** `aspnet-core/src/Seashell.Resort.Mobile.MAUI/Services/AuthService.cs`, `AppShell.xaml`, `MauiProgram.cs`
**What:** Auth service (mode-switching: MARKETING | GUEST | DAY_PASS), navigation, JWT SecureStorage
**When:** Phase 1 tasks 1.8–1.12
**Conflict Risk:** High — AuthService is imported by every page

**Rules:**
- **Only one agent modifies `AuthService.cs` at a time.**
- Mode-switching pattern mirrors the React prototype’s `useAuth.tsx` logic
- JWT tokens stored in platform SecureStorage (iOS Keychain / Android KeyStore)
- Keep demo credentials as fallback until real API is wired

### Area G: Angular Admin Dashboard
**Files:** `angular/src/app/admin/`
**What:** Dashboard, GuestManagement, RoomManagement, DayPassManagement, DiningManagement, FacilityManagement, Reports, ContentManagement
**When:** Phase 3 tasks 3.13–3.15
**Conflict Risk:** Low — each admin module is independent

**Rules:**
- Customize the ASP.NET Zero Angular template’s existing pages to match prototype design
- Each admin section is a separate Angular module — adding one doesn’t break others
- Use the prototype’s admin screenshots as the visual reference for customization
- Use NSwag-generated TypeScript clients for API communication

### Area H: MAUI Shared Components
**Files:** `aspnet-core/src/Seashell.Resort.Mobile.MAUI/Components/`
**What:** Reusable Blazor/Razor components (BottomNav, Header, LoadingSpinner, etc.)
**When:** All phases
**Conflict Risk:** Medium — shared components are used across multiple screens

**Rules:**
- **Notify other agents before modifying shared components** (BottomNav, Header, etc.)
- Keep changes backward-compatible (add parameters, don’t remove them)
- If a component needs a breaking change, create a v2 version first

### Area I: API Client Layer
**Files:** MAUI: `aspnet-core/src/Seashell.Resort.Mobile.MAUI/Services/Api/`, Angular: `angular/src/shared/service-proxies/`
**What:** MAUI: C# HttpClient services consuming REST API; Angular: NSwag-generated TypeScript API clients
**When:** Phase 0–3
**Conflict Risk:** Medium — API services are imported by multiple screens

**Rules:**
- **MAUI:** One C# service per domain: `PublicApiService.cs`, `GuestApiService.cs`, `AdminApiService.cs`, `DayPassApiService.cs`, `AuthApiService.cs`
- **Angular:** Use `nswag/refresh.bat` to regenerate TypeScript types from Swagger
- **Never hand-write API types in Angular** — always generate from Swagger
- MAUI shares C# DTOs with backend directly (project reference)

---

## 5. Git Branching Strategy

Since multiple agents will be working, use this branch model:

```
main                 ← Production-ready, only merged via PR
├── phase-0/backend  ← Backend agent: entities, migrations, seed data
├── phase-0/maui     ← MAUI agent: scaffold consumer app, marketing screens
├── phase-1/auth     ← Auth agent: guest login, JWT, MAUI auth flow
├── phase-1/guest    ← Guest agent: MAUI in-house guest screens
├── phase-2/daypass  ← Day Pass agent: MAUI wallet, transactions, top-up
├── phase-3/angular-admin ← Admin agent: Angular dashboard customization
├── phase-3/admin-backend ← Admin agent: dashboard backend endpoints
└── hotfix/*         ← Emergency fixes to main
```

### Rules

- **One branch per agent per task.** Don't commit to `main` directly.
- Branch naming: `phase-{N}/{area}` or `feature/{description}`
- Before creating a new branch, pull the latest `main`
- After finishing, merge to `main` and delete the branch
- If two branches touch the same file, merge them locally first, resolve conflicts, then merge to `main`

---

## 6. File Locking Convention

Some files are "high contention" — if one agent is working on them, no one else should touch them.

### 🔒 High Contention Files (Require Coordination)

| File | Why | How to Coordinate |
|---|---|---|
| `AuthService.cs` (MAUI) | Imported by every MAUI page | Post in chat: "I'm editing AuthService.cs for the next 30 min" |
| `AppShell.xaml` (MAUI) | Root navigation — all modes | Only edit when adding a new top-level screen |
| `DbContext.cs` | All entities reference it | Use the "migration token" — only one agent at a time |
| `appsettings.json` | Shared config | Only edit when adding new config sections |
| `MauiProgram.cs` | MAUI DI registration | Only edit when adding new services |
| `angular.json` | Angular build config | Only edit when adding new modules |
| `*.sln` | Solution file | Don’t edit manually — let Visual Studio handle it |

### 🟡 Medium Contention Files (Notify Others)

| File | Why | How to Coordinate |
|---|---|---|
| `MainLayout.razor` (MAUI) | Shared MAUI layout | Post in chat before modifying |
| `app.module.ts` (Angular) | Root Angular module | Post in chat before modifying |
| `service-proxies.module.ts` | NSwag generated API clients | Regenerate, don’t manually edit |
| `PermissionNames.cs` | Permission definitions | Only one agent adds permissions at a time |

### 🟢 Low Contention Files (Work Freely)

| File | Why |
|---|---|
| `Pages/Marketing/*.razor` (MAUI) | Each marketing screen is independent |
| `Pages/Guest/*.razor` (MAUI) | Each guest screen is independent |
| `Pages/DayPass/*.razor` (MAUI) | Each day pass screen is independent |
| `admin/*/*.component.ts` (Angular) | Each admin module is independent |
| `Components/*.razor` (MAUI) | Shared components are self-contained |
| `Controllers/*Controller.cs` | Each controller is independent |
| `AppServices/*AppService.cs` | Each service is independent |

---

## 7. Conflict Resolution

### If You Edit a File and Another Agent Edited It Too

1. **Don't panic.** Git will show you the conflict markers.
2. **Read the other agent's changes** — understand what they were trying to do.
3. **Keep both changes if possible.** Most conflicts are additive (both added new code).
4. **If changes are mutually exclusive**, discuss in chat — don't guess.
5. **After resolving, run the app** to verify it still works.
6. **Commit with a clear message:** `Merge branch 'phase-0/frontend' — resolved App.tsx routing conflict`

### If You Break the Build

1. **Revert immediately** — don't leave the build broken
2. **Notify other agents** — they may be waiting for the build
3. **Fix on your branch** — don't push broken code to `main`
4. **Test locally before merging** — `dotnet build` for backend, `npm run build` for frontend

---

## 8. Code Review Checklist

Before claiming a task is done, verify:

### Backend Checklist
- [ ] Code compiles (`dotnet build` with no errors)
- [ ] Migrations apply cleanly (`dotnet ef database update`)
- [ ] API endpoint returns expected data (test with Swagger or Postman)
- [ ] DTOs follow naming convention (`CreateXDto`, `UpdateXDto`, `XDto`)
- [ ] Permissions are defined if the endpoint requires auth
- [ ] Audit fields (`CreationTime`, `CreatorUserId`) are populated

### Frontend Checklist
- [ ] Code compiles (`npm run build` with no errors)
- [ ] ESLint passes (`npm run lint` with no errors)
- [ ] Page loads without errors in browser console
- [ ] API calls use TanStack Query (not raw `fetch`)
- [ ] Loading states are handled (skeletons, not blank screens)
- [ ] Error states are handled (toast notification, not crash)
- [ ] Dark theme is consistent with admin pages (`#0f1117`, `#161b22`, `#21262d`)
- [ ] Responsive design works on mobile viewport (375px width)

---

## 9. How to Ask for Help

If you're stuck:

1. **Check `DECISIONS.md`** — the answer may already be documented
2. **Check `PROGRESS.md`** — someone may have already solved the same problem
3. **Check the prototype code** — the mock implementation shows the expected behavior
4. **Check the template** — `boilerplate_capabilities.md.resolved` has the full feature map
5. **Ask in chat** — describe the problem, what you tried, and what you expect

**Good help request:**
> "I'm working on the `Booking` entity in `Area A`. I need to add a foreign key to `RoomUnit`, but `RoomUnit` doesn't exist yet (Agent B hasn't created it). Should I create both entities myself, or wait for Agent B?"

**Bad help request:**
> "It's not working." (No context, no error message, no file reference)

---

## 10. Emergency Contacts

| Role | Responsibility |
|---|---|
| **Orchestrator** | Coordinates agents, resolves conflicts, makes architectural decisions |
| **Backend Lead** | Owns all C# code — entities, services, controllers, migrations |
| **Frontend Lead** | Owns MAUI consumer app (Blazor/Razor) + Angular admin dashboard (TypeScript) |
| **DevOps Lead** | Owns deployment, CI/CD, infrastructure, monitoring |

*Roles can be shared by agents. Update this section as the team grows.*

---

*This is a living document. Update it as the team learns what works and what doesn't.*
