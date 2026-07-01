# Architecture Decision Record (ADR)

> **Why we chose what we chose.** Read this before challenging a decision. If you want to change something, add a new ADR entry with the rationale.

---

## ADR-001: Keep ASP.NET Zero Core as Foundation

**Status:** Accepted  
**Date:** June 2026  
**Context:** Need a production-ready backend with auth, multi-tenancy, audit logs, permissions, and infrastructure. Building from scratch would take 6+ months.

**Decision:** Use the commercial ASP.NET Zero Core template (.NET 9 / Angular 19) as the backend foundation.

**Rationale:**
- 15,000+ files of battle-tested code
- Auth, multi-tenancy, audit logs, permissions, localization, SignalR, Hangfire, Swagger out of the box
- Saves ~6 months of infrastructure development
- Commercial support available

**Consequences:**
- Must rename projects from `MyCompanyName.AbpZeroTemplate` to `Seashell.Resort`
- Must understand ABP framework patterns (Module, AppService, Repository, Dto)
- Must carefully decide what to keep vs. cut to avoid template bloat

---

## ADR-002: React 19 PWA Instead of Template's Angular 19

**Status:** ~~Accepted~~ **Superseded by ADR-014**  
**Date:** June 2026  
**Superseded By:** [ADR-014: MAUI Consumer App + Angular Admin Dashboard](#adr-014-maui-consumer-app--angular-admin-dashboard)  
**Context:** The prototype is already built in React 19 + Vite + Tailwind. The template's Angular 19 frontend is a different design system (Metronic, PrimeNG, ngx-bootstrap).

**Original Decision:** Build the production frontend as a React 19 PWA using Vite, Tailwind CSS, and shadcn/ui. Do NOT use the template's Angular frontend.

**Why Superseded:** The React PWA was a prototype, not the production frontend. The production consumer app will be built in .NET MAUI (Blazor Hybrid) for native mobile distribution via app stores. The admin dashboard will use the template's Angular 19 frontend, customized to match Seashell's requirements. The React prototype remains as a design reference.

---

## ADR-003: API-First with Decoupled Frontend Evolution

**Status:** Accepted  
**Date:** June 2026  
**Context:** The frontend prototype is actively evolving, especially the admin dashboard. Backend must not break every time the UI changes.

**Decision:** Build the backend as a stable API-first contract. The frontend evolves independently. Use versioned endpoints (`/api/v1/*`), never remove DTO fields, and make new fields optional.

**Rationale:**
- Prevents rework when prototype screens change
- Allows frontend and backend to be developed in parallel
- Multiple frontend consumers (MAUI consumer app, Angular admin dashboard, GraphQL consumers) can coexist

**Consequences:**
- Must carefully design DTOs upfront to avoid breaking changes
- Must version the API from day one
- Must generate TypeScript types from Swagger rather than manually writing them

---

## ADR-004: .NET MAUI as Primary Consumer Frontend

**Status:** Accepted (Updated July 2026)  
**Date:** June 2026 (Updated July 2026)  
**Context:** The resort app must be downloadable and installable on mobile devices (App Store, Google Play). A PWA is insufficient for the desired native mobile experience.

**Decision:** Use .NET MAUI + Blazor Hybrid as the **primary production frontend** for all consumer-facing portals (Marketing, Guest, Day Pass). The MAUI app is a single app with mode-switching, matching the prototype's auth pattern.

**Rationale:**
- Native app store distribution (App Store, Google Play) is a hard requirement
- MAUI shares the same .NET backend DTOs and API contracts — maximum code sharing
- Blazor Hybrid allows rich UI with C# + Razor, eliminating the need for a separate JavaScript frontend
- Single MAUI app with mode-switching (MARKETING | GUEST | DAY_PASS) keeps the install footprint small
- Push notifications, offline access, and device features (camera for QR scanning) work natively

**Consequences:**
- MAUI development is now on the critical path (not deferred to Phase 3+)
- Must design Blazor components to match the React prototype's visual design
- Must handle platform-specific differences (iOS vs. Android) in MAUI
- The React PWA prototype becomes a design reference, not production code

---

## ADR-005: Keep GraphQL for Future Consumers

**Status:** Accepted  
**Date:** June 2026  
**Context:** The primary frontend uses REST. GraphQL was initially planned to be cut.

**Decision:** Keep the GraphQL project but do not actively develop it for v1. It will serve future API consumers (third-party integrations, partner apps, data analytics).

**Rationale:**
- Zero cost to keep — the template already includes it
- Future-proofing for integrations (travel agencies, booking platforms, government reporting)
- GraphQL can be exposed selectively over the same entities as REST

**Consequences:**
- GraphQL resolvers must be maintained alongside REST controllers
- Schema must be kept in sync with entity changes
- No frontend consumer for v1 — this is future infrastructure

---

## ADR-006: Keep OpenIddict for Self-Hosted Security

**Status:** Accepted  
**Date:** June 2026  
**Context:** The template includes OpenIddict as an optional OAuth 2.0 / OIDC server. Initially planned to be cut.

**Decision:** Keep OpenIddict. Use it as the internal security control layer for API access management, token issuance, and third-party integration auth.

**Rationale:**
- Self-hosted OAuth means no dependency on external auth providers
- Can issue scoped tokens for different app modes (guest, admin, day pass, MAUI)
- Required for GraphQL consumer authentication (ADR-005)
- Required for social login integration (ADR-007)

**Consequences:**
- Must configure OpenIddict clients for each app mode
- Must manage token lifetimes and refresh rotation
- Adds complexity to auth layer but provides flexibility

---

## ADR-007: Keep Social Logins for Customer Data

**Status:** Accepted  
**Date:** June 2026  
**Context:** Social logins (Facebook, Google, Twitter, Microsoft) were initially planned to be cut. The user wants customer data collection.

**Decision:** Keep social login integration. Enable it for the marketing/public site to collect customer data and enable frictionless registration.

**Rationale:**
- Collects customer demographics for marketing and analytics
- Enables one-tap registration for day pass purchase
- Reduces friction for prospective guests booking online
- Data can be used for targeted promotions and loyalty programs

**Consequences:**
- Must configure OAuth apps with each provider (Facebook App, Google Client, etc.)
- Must handle data privacy compliance (GDPR-like for Kuwait)
- Must sync social login data with `User` entity and `Booking` records

---

## ADR-008: Angular 19 as Admin Dashboard (Resolved)

**Status:** Accepted (Resolved July 2026)  
**Date:** June 2026 (Resolved July 2026)  
**Context:** Both Web.Public (public MVC site) and Web.Mvc (admin MVC panel) were initially planned to be cut. The template's Angular 19 frontend was initially not planned to be used. With the shift to MAUI for consumer apps, the admin dashboard needs a web-based platform.

**Decision:** Use the template's **Angular 19 frontend** as the production admin dashboard, customized to match Seashell's requirements. Web.Public and Web.Mvc remain in the solution but are not actively developed.

**Rationale:**
- The Angular template already has a full admin panel infrastructure (Metronic, PrimeNG, auth, role management)
- Customizing the existing Angular admin is faster than building from scratch
- Admin is a web-only tool used by staff on desktop/tablet — no need for a native app
- The React prototype's admin screens serve as the design reference for customization
- Angular template integrates directly with ASP.NET Zero's permission and role system

**Consequences:**
- Must learn and customize the Angular template's Metronic theme
- Admin UI follows Angular conventions (components, services, NgRx) not React patterns
- NSwag auto-generates TypeScript API clients for Angular from Swagger
- Web.Public may still be used for SEO landing pages (future decision)
- Web.Mvc is kept but not actively developed

---

## ADR-009: Keep Dashboard Drag-and-Drop Widgets

**Status:** Accepted  
**Date:** June 2026  
**Context:** The template includes a customizable dashboard with drag-and-drop widgets. Initially planned to be cut because the admin dashboard is fixed in the prototype.

**Decision:** Keep the drag-and-drop widget system. The admin dashboard will be customizable by role (e.g., Manager sees KPIs, Receptionist sees check-in queue).

**Rationale:**
- Different staff roles need different dashboard views
- Manager may want to add/remove KPI cards
- Future-proofing for new dashboard sections (e.g., "Spa Management" widget)
- Template already includes the system — minimal effort to adapt

**Consequences:**
- Widget definitions must be stored per-user (template already does this)
- Must define widget types for Seashell-specific KPIs
- Angular admin must support widget rendering (PrimeNG / ngx-charts dashboard components)

---

## ADR-010: Cut Stripe/PayPal, Use KD Wallet + KNET Later

**Status:** Accepted  
**Date:** June 2026  
**Context:** The template includes Stripe and PayPal. The prototype uses a simple Kuwaiti Dinar (KD) wallet system. Kuwait's primary online payment gateway is KNET, not Western providers.

**Decision:** Remove Stripe and PayPal configurations. Use the internal KD wallet system for v1. Integrate KNET (or equivalent local gateway) in a future phase if needed.

**Rationale:**
- Stripe/PayPal are not widely used in Kuwait
- KNET is the local standard but requires separate integration effort
- The prototype's wallet system (15 KD day pass, top-up, spend) is sufficient for v1
- Removing now simplifies the payment infrastructure

**Consequences:**
- No online payment processing for v1 (all payments are cash or in-person)
- Must add KNET integration later if online payment is required
- Wallet system must be robust (balance tracking, transaction history, audit trail)

---

## ADR-011: Single-Tenant First, Multi-Tenant Ready

**Status:** Accepted  
**Date:** June 2026  
**Context:** The template is built for multi-tenant SaaS. Seashell is a single resort (for now).

**Decision:** Configure the template for single-tenant mode initially but keep multi-tenancy infrastructure in place. This allows franchise expansion later without rebuilding auth and data isolation.

**Rationale:**
- Single-tenant simplifies v1 development (no tenant resolution, no subdomain routing)
- Multi-tenancy keeps the door open for future resort chains (e.g., Seashell Jeddah, Seashell Dubai)
- ABP's `IMustHaveTenant` is already on all entities — just set `TenantId = 1` everywhere

**Consequences:**
- All entities must still include `TenantId` (but it's always 1)
- No subdomain-based tenant routing (simpler DNS and SSL)
- Migration to multi-tenant is a configuration change, not a rewrite

---

## ADR-012: Room Number + PIN for Guest Auth

**Status:** Accepted  
**Date:** June 2026  
**Context:** Guests need to log into the app. Standard email/password is not practical for hotel guests.

**Decision:** Guests authenticate with **Room Number + PIN**. PIN is generated at check-in and stored on the `Booking` record. Staff authenticate with email + password (standard template flow).

**Rationale:**
- Guests don't need to remember/create passwords
- Room number is already known at check-in
- PIN can be printed on the key card or sent via SMS
- Simpler than email/password for temporary users (guests stay 3-7 days)

**Consequences:**
- Must add `Pin` field to `Booking` entity
- Must add `RoomNumber` as a unique lookup key on `RoomUnit`
- PIN must be regenerated at each check-in (security)
- Admin login stays on email/password (staff are long-term users)

---

## ADR-013: Static Data Seed from resort_data.json

**Status:** Accepted  
**Date:** June 2026  
**Context:** The prototype contains a complete `resort_data.json` with all resort information (rooms, restaurants, facilities, attractions).

**Decision:** Seed the production database from `resort_data.json` during Phase 0. This gives the backend realistic data from day one and allows immediate frontend testing.

**Rationale:**
- Real data is available and structured
- Frontend can be tested against real backend data immediately
- No need to manually enter resort data during development
- Seeding is a one-time migration — future data changes go through admin CMS

**Consequences:**
- Must write a seed script that maps JSON to entities
- Must handle image URLs (Unsplash placeholders → real images later)
- Seed data becomes the "source of truth" until admin CMS is built

---

## ADR-014: MAUI Consumer App + Angular Admin Dashboard

**Status:** Accepted  
**Date:** July 2026  
**Supersedes:** [ADR-002: React 19 PWA Instead of Template's Angular 19](#adr-002-react-19-pwa-instead-of-templates-angular-19)  
**Context:** The React 19 PWA was built as a prototype/design reference. The production app must be downloadable and installable on mobile devices. The admin dashboard is used by staff on desktop/tablet browsers.

**Decision:** Build the production frontend as:
1. **.NET MAUI (Blazor Hybrid)** — A single native mobile app with mode-switching for Marketing, Guest, and Day Pass portals. Distributed via App Store and Google Play.
2. **Angular 19 (template customization)** — The admin dashboard, customized from the ASP.NET Zero Angular template (Metronic theme).
3. **React PWA (design reference)** — The existing prototype remains in `prototype_extracted/` as a visual specification. Not deployed to production.

**Rationale:**
- Native mobile distribution is a hard requirement — PWA alone is insufficient
- MAUI shares .NET code with the backend — maximum DTO and logic sharing
- Single MAUI app with mode-switching matches the prototype's existing auth pattern
- Angular template already has admin infrastructure (permissions, roles, audit, Metronic) — faster to customize than build from scratch
- The React prototype serves as a complete visual spec for both MAUI and Angular screens
- API-first architecture means both MAUI and Angular consume the same REST endpoints

**Consequences:**
- MAUI is on the critical path (Phases 0–2 consumer features)
- Angular customization is on the critical path (Phase 3 admin features)
- Must replicate the React prototype's visual design in both MAUI/Blazor and Angular/Metronic
- Two frontend codebases to maintain (C#/Blazor for MAUI, TypeScript/Angular for admin)
- The React prototype is frozen — new design changes go directly to MAUI or Angular
- NSwag generates TypeScript clients for Angular; MAUI uses shared C# DTOs directly

---

## How to Add a New ADR

1. Pick the next number (e.g., ADR-014)
2. Use this template:

```markdown
## ADR-NNN: Title

**Status:** Proposed / Accepted / Rejected / Superseded  
**Date:** YYYY-MM-DD  
**Context:** What problem are we solving?

**Decision:** What did we decide?

**Rationale:** Why?

**Consequences:** What trade-offs?
```

3. If an ADR is superseded, mark the old one as **Superseded** and add a **Superseded By:** link to the new ADR.
