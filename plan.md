# Seashell Hotel & Resort — Development Plan

> **Version:** 1.0  
> **Date:** June 2026  
> **Status:** Planning Phase — Ready for Implementation  
> **Constraint:** Frontend prototype is actively evolving. Backend must be designed as **API-first** with stable contracts.

---

## 1. Executive Summary

This document is the single source of truth for building the **Seashell Hotel & Resort** application on top of the **ASP.NET Zero Core** commercial template. The plan is designed around a critical constraint: **the React frontend prototype is a design reference**, not the production frontend. The production stack uses **.NET MAUI (Blazor Hybrid)** for the consumer app (Marketing, Guest, Day Pass) and the template's **Angular 19** frontend for the Admin Dashboard. The backend is built **API-first** — defining stable REST contracts and DTOs that both frontends consume.

### 1.1 Guiding Principles

| Principle | Rationale |
|---|---|
| **API-First** | Backend defines the contract. Frontend consumes it. UI changes do not break the API. |
| **Template as Foundation** | ASP.NET Zero provides auth, multi-tenancy, permissions, audit logs, and infrastructure. We customize, not rebuild. |
| **Prototype as Living Spec** | The React prototype serves as a visual requirements document. Screens are replicated in MAUI and Angular. |
| **Domain-Driven** | Seashell-specific entities (Guest, Booking, Room, DayPass) are first-class citizens in the Core layer. |
| **Single-Tenant First** | Multi-tenancy is kept in the template but configured for single-tenant operation initially. |

---

## 2. Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                         SEASHELL APP ARCHITECTURE                              │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  ┌──────────────────────┐  ┌───────────────────┐  ┌──────────────────────────┐ │
│  │  .NET MAUI APP       │  │  ANGULAR 19 ADMIN │  │  ASP.NET ZERO CORE       │ │
│  │  (Blazor Hybrid)     │  │  (Web Dashboard)  │  │  BACKEND                 │ │
│  │                      │  │                   │  │  (.NET 9 / EF Core / SQL) │ │
│  │  • Marketing (public)│  │  • Dashboard KPIs │  │                          │ │
│  │  • Guest (in-house)  │  │  • Guest Mgmt     │  │  ┌─────────┐ ┌────────┐ │ │
│  │  • Day Pass (visitor) │  │  • Room Mgmt      │  │  │  Core   │ │  App   │ │ │
│  │                      │  │  • Day Pass Mgmt  │  │  │(Entities│ │(Service│ │ │
│  │  Single app with     │  │  • Reports        │  │  └─────────┘ └────────┘ │ │
│  │  mode-switching      │  │  • Content CMS    │  │  ┌─────────┐ ┌────────┐ │ │
│  │                      │  │                   │  │  │ EF Core │ │Web.Host│ │ │
│  │  Distribution:       │  │  Customized from  │  │  │(DbCtx)  │ │(REST)  │ │ │
│  │  App Store / Play    │  │  ASP.NET Zero     │  │  └─────────┘ └────────┘ │ │
│  │  Store               │  │  Angular template │  │  ┌─────────┐ ┌────────┐ │ │
│  │                      │  │  (Metronic theme) │  │  │ GraphQL │ │SignalR │ │ │
│  │  Tech: C# + Blazor   │  │                   │  │  │(future) │ │(live)  │ │ │
│  │  + Razor Components  │  │  Tech: Angular 19 │  │  └─────────┘ └────────┘ │ │
│  │                      │  │  + Metronic + SCSS│  │                          │ │
│  └──────────┬───────────┘  └────────┬──────────┘  └────────────┬─────────────┘ │
│             │                       │                          │               │
│             │         REST API + JWT (Swagger/OpenAPI)          │               │
│             └───────────────────────┴──────────────────────────┘               │
│                                     │                                          │
│                                ┌────┴────┐                                     │
│                                │ SQL Server                                    │
│                                │ (Single DB)                                   │
│                                └─────────┘                                     │
│                                                                                 │
│  ┌─────────────────────────────────────────────────────────────────────────┐    │
│  │  REACT PWA PROTOTYPE (Design Reference Only — not deployed)            │    │
│  │  Tech: React 19 + Vite + Tailwind + shadcn/ui                          │    │
│  │  Purpose: Visual specification for MAUI and Angular screen designs      │    │
│  └─────────────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Technology Stack

### 3.1 Backend (ASP.NET Zero Core — Customized)

| Layer | Technology | Purpose |
|---|---|---|
| Framework | ASP.NET Core 9 | Web API host |
| ORM | Entity Framework Core 9 | Data access, migrations |
| Database | SQL Server 2022 | Primary datastore |
| Auth | ASP.NET Identity + JWT + OpenIddict | Guest & staff auth, self-hosted OAuth server |
| API Docs | Swagger / OpenAPI | Auto-generated API documentation |
| APIs | REST + GraphQL | REST for primary frontend; GraphQL for future consumers |
| Mobile | .NET MAUI + Blazor Hybrid | Native mobile app (Android, iOS) |
| Background Jobs | Hangfire + SQL Server | Scheduled tasks, reports generation |
| Real-time | SignalR | Live notifications, admin dashboard updates |
| Social Auth | Facebook, Google, Twitter, Microsoft | Customer data collection via social login |
| Caching | Redis (optional) | Session, rate limiting, hot data |
| File Storage | Azure Blob / Local | Images, documents, CMS assets |
| Logging | Serilog + Seq / ELK | Structured logging |

### 3.2 Consumer App (.NET MAUI + Blazor Hybrid)

A **single downloadable app** with mode-switching for Marketing, Guest, and Day Pass portals.

| Layer | Technology | Purpose |
|---|---|---|
| Framework | .NET MAUI 9 + Blazor Hybrid | Native mobile app (Android, iOS) |
| UI | Razor Components (Blazor) | Rich interactive UI |
| Styling | CSS (scoped per component) | Component-level styling |
| State | Cascading Parameters + DI Services | Global state (auth, bookings, day pass) |
| Data | HttpClient + shared C# DTOs | Server state, API communication |
| Forms | EditForm + DataAnnotations / FluentValidation | Validation, form handling |
| Icons | MudBlazor Icons or custom SVGs | Consistent iconography |
| Auth | Custom JWT with SecureStorage | Guest Room+PIN, Day Pass activation |
| i18n | .NET Localization | EN / AR bilingual support |
| Distribution | App Store + Google Play | Native mobile distribution |

### 3.3 Admin Dashboard (Angular 19)

Customized from the **ASP.NET Zero Angular template** (Metronic theme).

| Layer | Technology | Purpose |
|---|---|---|
| Framework | Angular 19 | Admin SPA |
| UI Library | Metronic + PrimeNG + ngx-bootstrap | Template component library |
| Styling | SCSS (customized Metronic theme) | Admin dashboard theming |
| State | NgRx / Angular Services | Admin state management |
| Data | NSwag-generated TypeScript clients | Auto-generated API layer |
| Charts | Chart.js / ngx-charts | Dashboard analytics |
| Auth | OpenIddict / JWT (template built-in) | Staff email+password auth |
| i18n | ngx-translate | EN / AR bilingual support |

### 3.4 Prototype (React PWA — Design Reference Only)

The React 19 prototype in `prototype_extracted/` serves as the **visual specification**. It is not deployed to production. Use it as the design reference when building MAUI and Angular screens.

---

## 4. Template Customization Strategy

The ASP.NET Zero Core template is a **commercial starter kit** with ~15,000 files. We will **customize it, not rebuild it**. Here's what to keep, cut, and modify:

### 4.1 ✅ Keep (Core Infrastructure)

| Feature | Why Keep It |
|---|---|
| **Users / Roles / Permissions** | Foundation for guest accounts, admin roles, and RBAC |
| **Multi-Tenancy** | Even if single-tenant now, keeps the door open for franchise/resort chain expansion |
| **JWT Authentication** | Standard token-based auth for both mobile app and admin dashboard |
| **OpenIddict OAuth Server** | Self-hosted OAuth 2.0 / OIDC for internal security control and API access management |
| **Social Logins** | Collect customer data and enable frictionless registration (Facebook, Google, Twitter, Microsoft) |
| **Audit Logs** | Required for hospitality compliance (who checked in whom, who modified what) |
| **Entity History** | Track changes to bookings, room statuses, day pass transactions |
| **Localization** | Arabic + English is a requirement for the Kuwait market |
| **SignalR** | Real-time notifications for admin dashboard (new check-in, low balance alert) |
| **Hangfire** | Background jobs: nightly reports, expired day pass cleanup, reminder emails |
| **Swagger / OpenAPI** | Auto-generated API docs for frontend team consumption |
| **Email (SMTP/MailKit)** | Booking confirmations, check-in reminders, password resets |
| **NSwag** | Auto-generate TypeScript API clients from backend |
| **GraphQL** | Keep for future API consumers and third-party integrations |
| **MAUI Mobile App** | Native mobile app (.NET MAUI + Blazor Hybrid) for Android / iOS distribution |
| **Dashboard Customization** | Drag-and-drop widget system for personalized admin dashboard layouts |
| **Web.Public** | Keep for now — may serve as a landing page or SEO-optimized public site |
| **Web.Mvc** | Keep for now — may host legacy admin views or specific MVC-rendered pages |

### 4.2 🔴 Cut (Remove / Disable)

| Feature | Why Cut It |
|---|---|
| **Chat / Friendship** | Not a feature of the prototype. Remove SignalR chat hub. |
| **Stripe / PayPal** | The prototype uses a simple KD wallet. Remove Western payment gateways; integrate KNET (Kuwait) later if needed. |
| **Subscription / Editions** | Not a SaaS product sold to multiple hotels (yet). |
| **Dynamic Entity Properties** | Over-engineering for v1. Static schema is sufficient. |

### 4.3 🟡 Modify (Adapt to Seashell)

| Feature | Modification |
|---|---|
| **User Entity** | Add `PhoneNumber`, `Nationality`, `CivilId`, `GuestProfile` fields |
| **Login Flow** | Replace email/password with **Room Number + PIN** for guests; keep email/password for staff |
| **Tenant System** | Configure for single-tenant mode initially |
| **Notification System** | Add push notification support (Firebase Cloud Messaging) |
| **File Upload** | Replace with Azure Blob Storage or local storage for CMS images |
| **Settings** | Add resort-specific settings: Wi-Fi credentials, operating hours, contact info |
| **Web.Public** | Under review — evaluate whether to keep as SEO landing page or use MAUI app's marketing mode |
| **Web.Mvc** | Under review — Angular admin dashboard is primary admin UI; Web.Mvc kept but not actively developed |

---

## 5. Domain Model (Database Schema)

The following entities are **Seashell-specific** and must be added to the Core layer. They coexist with the template's built-in `User`, `Role`, `Tenant`, `AuditLog` entities.

### 5.1 Entity Relationship Diagram

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   RoomType      │     │   RoomUnit      │     │    Booking      │
├─────────────────┤     ├─────────────────┤     ├─────────────────┤
│ Id (PK)         │◄────│ Id (PK)         │◄────│ Id (PK)         │
│ Name            │     │ RoomNumber      │     │ GuestName       │
│ NameAr          │     │ RoomTypeId (FK) │     │ RoomUnitId (FK) │
│ Category        │     │ Status          │     │ CheckInDate     │
│ Description     │     │ CurrentGuestId  │     │ CheckOutDate    │
│ MaxOccupancy    │     │ PricePerNight   │     │ Adults          │
│ Amenities (JSON)│     │ Floor           │     │ Children        │
│ ImageUrl        │     │ Beds            │     │ Status          │
│ IsActive        │     │ IsActive        │     │ TotalAmount     │
└─────────────────┘     └─────────────────┘     │ PaymentStatus   │
                                                │ CreatedAt       │
                                                └─────────────────┘
                                                          │
┌─────────────────┐     ┌─────────────────┐              │
│   DayPass       │     │  Transaction    │◄─────────────┘
├─────────────────┤     ├─────────────────┤
│ Id (PK)         │◄────│ Id (PK)         │
│ PassId          │     │ DayPassId (FK)  │
│ GuestName       │     │ BookingId (FK)  │
│ CivilId         │     │ Type (credit/   │
│ Phone           │     │   debit)        │
│ Balance         │     │ Amount          │
│ InitialAmount   │     │ Description     │
│ Status          │     │ Zone            │
│ IssuedAt        │     │ Timestamp       │
│ ExpiresAt       │     └─────────────────┘
│ IssuedByUserId  │
└─────────────────┘

┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Restaurant    │     │   Facility      │     │  ContentBlock   │
├─────────────────┤     ├─────────────────┤     ├─────────────────┤
│ Id (PK)         │     │ Id (PK)         │     │ Id (PK)         │
│ Name            │     │ Name            │     │ Key             │
│ NameAr          │     │ NameAr          │     │ Label           │
│ Type            │     │ Type            │     │ Value           │
│ Description     │     │ Description     │     │ Section         │
│ Cuisines (JSON) │     │ Features (JSON) │     │ Language        │
│ LocationTag     │     │ Access          │     │ LastEdited      │
│ Hours (JSON)    │     │ ImageUrl        │     │ IsActive        │
│ IsActive        │     │ IsActive        │     └─────────────────┘
└─────────────────┘     └─────────────────┘

┌─────────────────┐     ┌─────────────────┐
│  GuestRequest   │     │  MediaAsset     │
├─────────────────┤     ├─────────────────┤
│ Id (PK)         │     │ Id (PK)         │
│ BookingId (FK)  │     │ Name            │
│ Type            │     │ Type            │
│ Description     │     │ Size            │
│ Status          │     │ Url             │
│ CreatedAt       │     │ Section         │
│ ResolvedAt      │     │ UploadedAt      │
│ ResolvedById    │     │ IsActive        │
└─────────────────┘     └─────────────────┘
```

### 5.2 Entity Definitions

#### `RoomType` (Accommodation Catalog)
```csharp
public class RoomType : Entity, IMustHaveTenant
{
    public string Name { get; set; }
    public string NameAr { get; set; }
    public RoomCategory Category { get; set; } // Chalet, Room, Suite
    public string Description { get; set; }
    public string DescriptionAr { get; set; }
    public int MaxAdults { get; set; }
    public int MaxChildren { get; set; }
    public int SizeSqm { get; set; }
    public string AmenitiesJson { get; set; } // JSON array of amenity categories
    public string ImageUrl { get; set; }
    public bool IsActive { get; set; } = true;
}
```

#### `RoomUnit` (Physical Room Inventory)
```csharp
public class RoomUnit : Entity, IMustHaveTenant
{
    public string RoomNumber { get; set; }
    public int RoomTypeId { get; set; }
    public RoomType RoomType { get; set; }
    public RoomStatus Status { get; set; } // Available, Occupied, Cleaning, Maintenance
    public int? CurrentBookingId { get; set; }
    public Booking CurrentBooking { get; set; }
    public decimal PricePerNight { get; set; }
    public int Floor { get; set; }
    public string BedConfiguration { get; set; }
    public bool IsActive { get; set; } = true;
}
```

#### `Booking` (Guest Reservation)
```csharp
public class Booking : Entity, IMustHaveTenant, ICreationAudited, IModificationAudited
{
    public string GuestName { get; set; }
    public string Phone { get; set; }
    public string Nationality { get; set; }
    public string CivilId { get; set; } // Kuwaiti Civil ID
    public int RoomUnitId { get; set; }
    public RoomUnit RoomUnit { get; set; }
    public DateTime CheckInDate { get; set; }
    public DateTime CheckOutDate { get; set; }
    public int Adults { get; set; }
    public int Children { get; set; }
    public BookingStatus Status { get; set; } // Confirmed, CheckedIn, CheckedOut, Cancelled
    public decimal TotalAmount { get; set; }
    public PaymentStatus PaymentStatus { get; set; }
    public string SpecialRequests { get; set; }
    public long? CreatorUserId { get; set; }
    public long? LastModifierUserId { get; set; }
    public DateTime CreationTime { get; set; }
    public DateTime? LastModificationTime { get; set; }
}
```

#### `DayPass` (Visitor Day Pass)
```csharp
public class DayPass : Entity, IMustHaveTenant, ICreationAudited
{
    public string PassId { get; set; } // e.g., "SSP-X7K2-M9P4"
    public string GuestName { get; set; }
    public string CivilId { get; set; }
    public string Phone { get; set; }
    public decimal Balance { get; set; }
    public decimal InitialAmount { get; set; }
    public DayPassStatus Status { get; set; } // Active, Expired, Revoked
    public DateTime IssuedAt { get; set; }
    public DateTime ExpiresAt { get; set; }
    public long? IssuedByUserId { get; set; } // Staff who issued it
    public long? CreatorUserId { get; set; }
    public DateTime CreationTime { get; set; }
    
    public ICollection<Transaction> Transactions { get; set; }
}
```

#### `Transaction` (Day Pass Wallet Transactions)
```csharp
public class Transaction : Entity, IMustHaveTenant, ICreationAudited
{
    public int? DayPassId { get; set; }
    public DayPass DayPass { get; set; }
    public int? BookingId { get; set; } // For in-house guest charges
    public TransactionType Type { get; set; } // Credit, Debit
    public decimal Amount { get; set; }
    public string Description { get; set; }
    public string Zone { get; set; } // Food & Beverage, Spa, Resort Amenities
    public long? CreatorUserId { get; set; }
    public DateTime CreationTime { get; set; }
}
```

#### `Restaurant` (Dining Venues)
```csharp
public class Restaurant : Entity, IMustHaveTenant
{
    public string Name { get; set; }
    public string NameAr { get; set; }
    public RestaurantType Type { get; set; } // Restaurant, Cafe, PoolBar
    public string Description { get; set; }
    public string CuisinesJson { get; set; } // ["Oriental", "Western"]
    public string LocationTag { get; set; }
    public string FeaturesJson { get; set; }
    public string MealType { get; set; }
    public string HoursJson { get; set; } // { "breakfast": "7AM-10AM", "lunch": "12PM-3PM" }
    public string LogoUrl { get; set; }
    public string ImageUrl { get; set; }
    public bool IsActive { get; set; } = true;
}
```

#### `Facility` (Pools, Beach, Kids Club, etc.)
```csharp
public class Facility : Entity, IMustHaveTenant
{
    public string Name { get; set; }
    public string NameAr { get; set; }
    public FacilityType Type { get; set; } // SwimmingPool, Beach, KidsArea, Fitness, Business
    public string Description { get; set; }
    public string FeaturesJson { get; set; }
    public string Access { get; set; } // AllGuests, LadiesOnly, Private, FeeApplies
    public string ImageUrl { get; set; }
    public bool IsActive { get; set; } = true;
}
```

#### `ContentBlock` (CMS for Marketing Text)
```csharp
public class ContentBlock : Entity, IMustHaveTenant
{
    public string Key { get; set; } // "hero_title", "welcome_text"
    public string Label { get; set; } // Display name in CMS
    public string Value { get; set; }
    public string ValueAr { get; set; }
    public string Section { get; set; } // "Homepage", "Contact", "About"
    public string Language { get; set; } // "en", "ar"
    public DateTime LastEdited { get; set; }
    public long? LastEditorUserId { get; set; }
    public bool IsActive { get; set; } = true;
}
```

#### `MediaAsset` (CMS Images & Videos)
```csharp
public class MediaAsset : Entity, IMustHaveTenant
{
    public string Name { get; set; }
    public MediaType Type { get; set; } // Image, Video
    public long SizeBytes { get; set; }
    public string Url { get; set; }
    public string Section { get; set; } // "Hero Banner", "Room Gallery", "Dining"
    public DateTime UploadedAt { get; set; }
    public long? UploadedByUserId { get; set; }
    public bool IsActive { get; set; } = true;
}
```

#### `GuestRequest` (Housekeeping, Room Service, etc.)
```csharp
public class GuestRequest : Entity, IMustHaveTenant, ICreationAudited
{
    public int? BookingId { get; set; }
    public Booking Booking { get; set; }
    public RequestType Type { get; set; } // Housekeeping, RoomService, Maintenance, Concierge
    public string Description { get; set; }
    public RequestStatus Status { get; set; } // Pending, InProgress, Completed, Cancelled
    public string Notes { get; set; }
    public DateTime? ResolvedAt { get; set; }
    public long? ResolvedByUserId { get; set; }
    public long? CreatorUserId { get; set; }
    public DateTime CreationTime { get; set; }
}
```

### 5.3 EF Core DbContext Additions

Add the following `DbSet` properties to the `AbpZeroTemplateDbContext`:

```csharp
public DbSet<RoomType> RoomTypes { get; set; }
public DbSet<RoomUnit> RoomUnits { get; set; }
public DbSet<Booking> Bookings { get; set; }
public DbSet<DayPass> DayPasses { get; set; }
public DbSet<Transaction> Transactions { get; set; }
public DbSet<Restaurant> Restaurants { get; set; }
public DbSet<Facility> Facilities { get; set; }
public DbSet<ContentBlock> ContentBlocks { get; set; }
public DbSet<MediaAsset> MediaAssets { get; set; }
public DbSet<GuestRequest> GuestRequests { get; set; }
```

---

## 6. API Contract Design (Backend → Frontend)

The following endpoints are **the contract**. The frontend can change its UI freely as long as it consumes these endpoints.

### 6.1 Authentication

| Endpoint | Method | Description |
|---|---|---|
| `/api/auth/guest-login` | POST | Room Number + PIN → returns JWT |
| `/api/auth/admin-login` | POST | Email + Password → returns JWT |
| `/api/auth/day-pass` | POST | Civil ID + Phone → creates DayPass, returns JWT |
| `/api/auth/refresh` | POST | Refresh token rotation |
| `/api/auth/logout` | POST | Invalidate token |

### 6.2 Public / Marketing (No Auth Required)

| Endpoint | Method | Response |
|---|---|---|
| `/api/public/resort-info` | GET | Resort name, tagline, awards, contact, Wi-Fi |
| `/api/public/room-types` | GET | List of all room types with amenities |
| `/api/public/restaurants` | GET | List of all dining venues |
| `/api/public/facilities` | GET | List of all facilities & activities |
| `/api/public/gallery` | GET | Media assets for public gallery |
| `/api/public/content/{section}` | GET | CMS content blocks by section |

### 6.3 Guest (In-House — JWT Required)

| Endpoint | Method | Description |
|---|---|---|
| `/api/guest/my-booking` | GET | Current guest's booking details |
| `/api/guest/my-room` | GET | Room details, amenities, services |
| `/api/guest/room-service-menu` | GET | Menu categories & items |
| `/api/guest/requests` | GET / POST | View & create service requests |
| `/api/guest/bookmarks` | GET / POST / DELETE | Saved favorites |

### 6.4 Day Pass (JWT Required)

| Endpoint | Method | Description |
|---|---|---|
| `/api/daypass/my-pass` | GET | Current pass details, balance |
| `/api/daypass/transactions` | GET | Transaction history |
| `/api/daypass/topup` | POST | Add credit to pass |
| `/api/daypass/spend` | POST | Debit from pass (POS integration) |
| `/api/daypass/zones` | GET | Valid spending zones |

### 6.5 Admin Dashboard (Staff JWT + Permission Required)

| Endpoint | Method | Permission | Description |
|---|---|---|---|
| `/api/admin/dashboard/summary` | GET | `Pages.Administration.Dashboard` | KPIs, occupancy, revenue |
| `/api/admin/dashboard/activity` | GET | `Pages.Administration.Dashboard` | Recent activity feed |
| `/api/admin/guests` | GET / POST | `Pages.Guests` | CRUD for guests |
| `/api/admin/guests/{id}/checkin` | POST | `Pages.Guests.CheckIn` | Check in a guest |
| `/api/admin/guests/{id}/checkout` | POST | `Pages.Guests.CheckOut` | Check out a guest |
| `/api/admin/rooms` | GET / POST / PUT | `Pages.Rooms` | Room inventory management |
| `/api/admin/rooms/{id}/status` | PUT | `Pages.Rooms` | Update room status |
| `/api/admin/daypasses` | GET / POST | `Pages.DayPass` | Day pass management |
| `/api/admin/daypasses/{id}/revoke` | POST | `Pages.DayPass` | Revoke a pass |
| `/api/admin/restaurants` | GET / POST / PUT | `Pages.Dining` | Restaurant CRUD |
| `/api/admin/facilities` | GET / POST / PUT | `Pages.Facilities` | Facility CRUD |
| `/api/admin/reports/revenue` | GET | `Pages.Reports` | Revenue analytics |
| `/api/admin/reports/occupancy` | GET | `Pages.Reports` | Occupancy trends |
| `/api/admin/content/blocks` | GET / PUT | `Pages.Content` | CMS text editing |
| `/api/admin/content/assets` | GET / POST / DELETE | `Pages.Content` | CMS media upload |
| `/api/admin/requests` | GET / PUT | `Pages.Requests` | Guest request queue |

### 6.6 DTO Design Principles

- **Every entity gets**: `CreateDto`, `UpdateDto`, `Dto`, `ListDto`
- **List endpoints**: Support paging, sorting, filtering via ABP's `PagedAndSortedResultRequestDto`
- **Date fields**: Use ISO 8601 strings (`2026-06-30T14:00:00Z`)
- **Money fields**: Use `decimal` with 3 decimal places (Kuwaiti Dinar)
- **Enums**: Exposed as strings in JSON, not integers
- **Images**: Return full URLs, not relative paths

---

## 7. Phased Development Plan

### Phase 0: Foundation (Week 1-2)
**Goal:** A running backend with custom Seashell entities and a connected frontend that can read static data.

| Task | Owner | Details |
|---|---|---|
| Rename solution & projects | Backend | `MyCompanyName.AbpZeroTemplate` → `Seashell.Resort` |
| Remove cut projects | Backend | Disable `Chat / Friendship` SignalR hub, remove `Subscription / Editions` UI, remove `Dynamic Entity Properties` UI, remove Stripe/PayPal payment configs |
| Configure single-tenant mode | Backend | Disable multi-tenant subdomain routing |
| Add custom entities | Backend | Create `Core` entities: RoomType, RoomUnit, Booking, DayPass, Transaction, Restaurant, Facility, ContentBlock, MediaAsset, GuestRequest |
| Create EF migrations | Backend | `Add-Migration InitialSeashellSchema` |
| Seed static data | Backend | Insert 13 room types, 4 restaurants, 8 facilities, 11 attractions from `resort_data.json` |
| Configure appsettings | Backend | Connection string, JWT settings, CORS for frontend |
| Verify API runs | Backend | `dotnet run` on `Web.Host`, confirm Swagger at `/swagger` |
| Connect MAUI to API | MAUI | Scaffold MAUI Blazor Hybrid app; build Marketing screens wired to `/api/public/*` |
| Verify end-to-end | Both | MAUI app loads real data from backend |

**Deliverable:** Marketing screens in MAUI app (`/public/*` endpoints) serve live data from SQL Server.

---

### Phase 1: Guest Authentication & In-House App (Week 3-4)
**Goal:** Guests can check in with Room + PIN and see their booking details.

| Task | Owner | Details |
|---|---|---|
| Implement guest login | Backend | `/api/auth/guest-login` — validate against `Booking` table (RoomNumber + PIN) |
| Implement guest JWT | Backend | Custom claims: `BookingId`, `RoomUnitId`, `GuestName` |
| Guest API endpoints | Backend | `/api/guest/my-booking`, `/api/guest/my-room`, `/api/guest/requests` |
| Guest request system | Backend | Housekeeping, room service, maintenance request endpoints |
| Guest bookmarks | Backend | Persist bookmarks to `User` extra properties or new table |
| Build MAUI guest screens | MAUI | Build guest app screens in Blazor; wire to real API endpoints |
| MAUI guest check-in flow | MAUI | Login screen → API call → JWT SecureStorage → Guest dashboard |
| Room service UI | MAUI | Connect to `/api/guest/room-service-menu` |
| Test end-to-end | Both | Demo: Guest checks in to Room 304, sees room details, places request |

**Deliverable:** Complete guest in-house experience from check-in to service requests.

---

### Phase 2: Day Pass System (Week 5-6)
**Goal:** Visitors can buy and use a prepaid day pass with wallet transactions.

| Task | Owner | Details |
|---|---|---|
| Day pass issuance | Backend | `/api/auth/day-pass` — create pass, generate `PassId`, set 15 KD balance |
| Day pass wallet | Backend | `/api/daypass/*` endpoints for balance, transactions, top-up, spend |
| Transaction history | Backend | Full CRUD for transactions with audit trail |
| Barcode generation | Backend | Generate scannable pass ID (QR code API endpoint) |
| POS spend integration | Backend | POST `/api/daypass/spend` — validate balance, deduct, record transaction |
| Day pass expiration | Backend | Hangfire job: expire passes at 23:59 daily, send notifications |
| Build MAUI day pass screens | MAUI | Build day pass app screens in Blazor; wire to real API |
| Wallet UI | MAUI | Real-time balance, transaction history, top-up flow |
| Valid zones | MAUI | Connect to `/api/daypass/zones` |
| Test end-to-end | Both | Demo: Buy day pass → spend at pool bar → view history |

**Deliverable:** Complete day pass purchase, wallet, and spending flow.

---

### Phase 3: Admin Dashboard Backend (Week 7-8)
**Goal:** Admin API powers all 8 admin dashboard sections with real data.

| Task | Owner | Details |
|---|---|---|
| Admin permissions | Backend | Define `Pages.Guests`, `Pages.Rooms`, `Pages.DayPass`, `Pages.Dining`, `Pages.Facilities`, `Pages.Reports`, `Pages.Content` |
| Dashboard summary | Backend | KPI aggregation: occupancy %, active guests, day pass revenue, today's revenue |
| Dashboard activity | Backend | Recent activity feed from audit logs + transactions |
| Guest management CRUD | Backend | Full CRUD for bookings, check-in/check-out workflows |
| Room management CRUD | Backend | Room inventory, status updates, maintenance flags |
| Day pass management | Backend | List, revoke, view transactions for all passes |
| Dining management | Backend | Restaurant CRUD, menu management, hours |
| Facility management | Backend | Facility CRUD, status, access rules |
| Reports | Backend | Revenue by category, occupancy trends, guest demographics, day pass analytics |
| Content CMS | Backend | ContentBlock CRUD, MediaAsset upload/delete |
| Guest request queue | Backend | Staff can view and resolve guest requests |
| Customize Angular admin screens | Angular | Customize template admin pages to match prototype design; wire to API |
| Admin dashboard polish | Angular | Real-time updates via SignalR, loading states, error handling |

**Deliverable:** Fully functional admin dashboard managing real resort data.

---

### Phase 4: Reports, Analytics & Polish (Week 9-10)
**Goal:** Production-ready reports, analytics, and user experience polish.

| Task | Owner | Details |
|---|---|---|
| Revenue reports | Backend | Daily, weekly, monthly revenue breakdown by source (rooms, dining, day pass, spa) |
| Occupancy reports | Backend | Room type utilization, seasonal trends, forecast |
| Guest analytics | Backend | Nationality demographics, repeat guests, average stay duration |
| Day pass analytics | Backend | Pass issuance trends, average spend, peak hours |
| Export functionality | Backend | PDF/Excel export for all reports |
| Scheduled reports | Backend | Hangfire: nightly summary email to manager |
| Real-time dashboard | Backend | SignalR hub for live dashboard updates (new check-in, transaction) |
| Admin notifications | Backend | Low balance alerts, maintenance alerts, overdue check-outs |
| Angular admin analytics | Angular | Charts using Chart.js / ngx-charts with real API data |
| MAUI app store preparation | MAUI | App icons, splash screens, store listings, signing certificates |
| Arabic localization | Both | Complete AR translation for MAUI (Blazor) and Angular screens |
| Image optimization | Both | Lazy loading, responsive images, CDN integration |
| Performance testing | Both | Load test with 100+ concurrent users |

**Deliverable:** Production-ready application with full analytics, reporting, and bilingual support.

---

### Phase 5: Production Deployment (Week 11-12)
**Goal:** Deployed to production with monitoring, backups, and CI/CD.

| Task | Owner | Details |
|---|---|---|
| Production SQL Server | DevOps | Provision Azure SQL / AWS RDS |
| MAUI app deployment | DevOps | Build MAUI app, submit to Google Play Store + Apple App Store |
| Angular admin deployment | DevOps | Build Angular app, deploy to Azure Static Web Apps / CDN |
| CI/CD pipeline | DevOps | GitHub Actions: build, test, deploy on push to `main` |
| SSL & HTTPS | DevOps | Custom domain, SSL certificate |
| Monitoring | DevOps | Application Insights, Serilog + Seq, uptime monitoring |
| Database backups | DevOps | Automated daily backups, point-in-time recovery |
| Security hardening | DevOps | OWASP Top 10 audit, penetration testing |
| User acceptance testing | QA | Full UAT with resort staff |
| Go-live | All | Soft launch with limited rooms, monitor for 1 week |

**Deliverable:** Live production environment at `https://app.seashell-kuwait.com`.

---

## 8. Prototype → Production Strategy

The React PWA prototype is a **design reference**, not the production frontend. Here’s how we bridge from prototype to production:

### 8.1 How the Backend Stays Stable

| Technique | Implementation |
|---|---|
| **Versioned API** | All endpoints prefixed with `/api/v1/`. Breaking changes go to `/api/v2/`. |
| **DTO Immutability** | Once a DTO field is added, it is never removed — only deprecated. New fields are optional. |
| **OpenAPI Spec** | Swagger generates a `swagger.json` used by Angular (NSwag) and MAUI (shared DTOs). |
| **NSwag Auto-Gen** | Run `nswag/refresh.bat` after every DTO change to regenerate the Angular TypeScript client. |
| **Shared C# DTOs** | MAUI directly references the backend’s DTO classes — no code generation needed. |

### 8.2 How the MAUI Consumer App Evolves

| Technique | Implementation |
|---|---|
| **Feature Flags** | Use `appsettings.json` feature flags to toggle features without redeploying. |
| **Mode-Switching** | Single app with MARKETING \| GUEST \| DAY_PASS modes, matching the prototype’s `useAuth.tsx` pattern. |
| **Shared DTOs** | MAUI project references `Seashell.Resort.Application.Shared` for DTO types. |
| **Blazor Component Isolation** | Each screen is a self-contained Razor component. Adding a new screen doesn’t affect existing ones. |
| **SecureStorage** | JWT tokens stored in platform SecureStorage (iOS Keychain / Android KeyStore). |

### 8.3 How the Angular Admin Dashboard Evolves

| Technique | Implementation |
|---|---|
| **Template Customization** | Customize the ASP.NET Zero Angular template’s existing pages (Metronic theme). |
| **NSwag TypeScript Client** | Auto-generated TypeScript API clients from Swagger — no manual type definitions. |
| **Angular Component Isolation** | Each admin section is a separate Angular module. Adding “Spa Management” doesn’t affect “Guest Management”. |
| **Template Auth Integration** | Uses the template’s built-in OpenIddict auth flow — no custom auth needed. |

### 8.4 When Design Changes Affect the Frontends

| Change Type | Backend Impact | MAUI Impact | Angular Impact |
|---|---|---|---|
| New admin screen (e.g., "Spa Mgmt") | Add API endpoints, permissions | None | Add Angular module |
| New guest feature (e.g., "Spa Booking") | Add entity, API endpoints | Add Blazor page | None |
| New data field on existing screen | Add optional DTO field | Update Blazor binding | Regenerate NSwag client |
| UI redesign of existing screen | None | Update Razor component | Update Angular template |
| New report/chart | Add report endpoint | None | Add chart component |
| New user role (e.g., "Spa Manager") | Add permission group | None | Add role to Angular admin |

---

## 9. Permission System Design

ASP.NET Zero's permission system will be extended with Seashell-specific permissions:

```csharp
public static class SeashellPermissions
{
    // Admin Dashboard
    public const string Dashboard = "Pages.Dashboard";
    
    // Guest Management
    public const string Guests = "Pages.Guests";
    public const string Guests_CheckIn = "Pages.Guests.CheckIn";
    public const string Guests_CheckOut = "Pages.Guests.CheckOut";
    public const string Guests_Edit = "Pages.Guests.Edit";
    public const string Guests_Delete = "Pages.Guests.Delete";
    
    // Room Management
    public const string Rooms = "Pages.Rooms";
    public const string Rooms_Edit = "Pages.Rooms.Edit";
    public const string Rooms_Status = "Pages.Rooms.Status";
    
    // Day Pass
    public const string DayPass = "Pages.DayPass";
    public const string DayPass_Issue = "Pages.DayPass.Issue";
    public const string DayPass_Revoke = "Pages.DayPass.Revoke";
    public const string DayPass_ViewTransactions = "Pages.DayPass.ViewTransactions";
    
    // Dining
    public const string Dining = "Pages.Dining";
    public const string Dining_Edit = "Pages.Dining.Edit";
    
    // Facilities
    public const string Facilities = "Pages.Facilities";
    public const string Facilities_Edit = "Pages.Facilities.Edit";
    
    // Reports
    public const string Reports = "Pages.Reports";
    public const string Reports_Revenue = "Pages.Reports.Revenue";
    public const string Reports_Occupancy = "Pages.Reports.Occupancy";
    
    // Content CMS
    public const string Content = "Pages.Content";
    public const string Content_Edit = "Pages.Content.Edit";
    public const string Content_Upload = "Pages.Content.Upload";
    
    // Guest Requests
    public const string Requests = "Pages.Requests";
    public const string Requests_Resolve = "Pages.Requests.Resolve";
}
```

### Role Mapping

| Role | Permissions | Template Role Equivalent |
|---|---|---|
| **General Manager** | All permissions | `Admin` |
| **Front Desk (Receptionist)** | Guests, Rooms, DayPass, Requests | `Admin` (restricted) |
| **Supervisor** | Guests, Rooms, DayPass, Requests, Reports | `Admin` (restricted) |
| **Content Manager** | Content, Facilities, Dining | Custom role |
| **Accountant** | Reports, DayPass (view only) | Custom role |

---

## 10. SignalR Real-Time Events

The admin dashboard will receive live updates via SignalR:

| Event | Trigger | Frontend Action |
|---|---|---|
| `GuestCheckedIn` | Booking status changes to `CheckedIn` | Increment guest count, add to activity feed |
| `GuestCheckedOut` | Booking status changes to `CheckedOut` | Decrement guest count, mark room available |
| `DayPassIssued` | New DayPass created | Increment active passes, add to activity feed |
| `DayPassTransaction` | New transaction on DayPass | Update balance, add to activity feed |
| `GuestRequestCreated` | Guest submits request | Increment pending requests badge |
| `GuestRequestResolved` | Staff resolves request | Decrement pending requests, add to activity feed |
| `RoomStatusChanged` | Room status updated (cleaning → available) | Update room grid, update facility status |
| `LowBalanceAlert` | DayPass balance < 3 KD | Show notification badge on DayPass section |

---

## 11. Data Migration Strategy

### 11.1 Seed Data (Phase 0)

On first migration, seed the database with:

| Entity | Count | Source |
|---|---|---|
| Room Types | 13 | `resort_data.json` → `stay.room_types` |
| Room Units | 19 | Prototype `RoomManagement.tsx` mock data |
| Restaurants | 4 | `resort_data.json` → `dine.restaurants` |
| Facilities | 8+ | `resort_data.json` → `plan.pools`, `plan.activities`, `plan.kids_facilities` |
| Attractions | 11 | `resort_data.json` → `plan.nearby_attractions` |
| Content Blocks | 8+ | `ContentManagement.tsx` mock data |
| Demo Bookings | 2 | `useAuth.tsx` demo credentials (304, 512) |
| Demo Day Passes | 7 | `DayPassManagement.tsx` mock data |

### 11.2 Production Data Migration

When going live, the resort will need to:
1. Import all actual room inventory from their PMS (Property Management System)
2. Import current bookings and guest records
3. Set up staff accounts and roles
4. Upload real images to replace Unsplash placeholders

Provide a **data import wizard** in the admin dashboard for CSV/Excel upload.

---

## 12. Risk Register

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| **Prototype changes break backend contract** | High | Medium | Versioned API, never remove fields, optional new fields only |
| **Template upgrade breaks custom code** | Medium | High | Track template version, isolate custom code in separate folders |
| **Room inventory data is inaccurate** | Medium | High | Build import wizard, validate on upload, manual review step |
| **Day pass POS integration fails** | Medium | High | Design pass as standalone; POS integration is Phase 2 extension |
| **Arabic RTL breaks layout** | Medium | Medium | Use Tailwind RTL plugin, test every screen in AR mode |
| **Performance with 100+ rooms** | Low | Medium | Pagination, server-side filtering, Redis caching |
| **Staff training on new system** | High | Medium | Build admin dashboard with intuitive UX, provide training docs |
| **Payment gateway (KNET) integration** | Medium | High | Delay to Phase 2+; use wallet balance for v1 |

---

## 13. Development Environment Setup

### 13.1 Backend Prerequisites

- Visual Studio 2022 (17.12+) or VS Code + C# Dev Kit
- .NET 9 SDK
- SQL Server 2022 Developer Edition (or LocalDB)
- Node.js 20+ (for NSwag client generation)
- Git

### 13.2 MAUI Consumer App Prerequisites

- Visual Studio 2022 (17.12+) with .NET MAUI workload installed
- .NET 9 SDK
- Android SDK (API 34+) — installed via Visual Studio
- Xcode 16+ (macOS only — for iOS builds)
- Git

### 13.3 Angular Admin Dashboard Prerequisites

- Node.js 20+
- npm or yarn
- Angular CLI 19 (`npm install -g @angular/cli`)
- VS Code with extensions: Angular Language Service, ESLint, Prettier
- Git

### 13.4 Recommended Folder Structure

```
Seashell-App-Project/
├── backend/
│   ├── Seashell.Resort.sln              # Renamed from Web.sln
│   ├── src/
│   │   ├── Seashell.Resort.Core/        # Domain entities
│   │   ├── Seashell.Resort.Application/ # App services, DTOs
│   │   ├── Seashell.Resort.EntityFrameworkCore/ # DbContext, migrations
│   │   ├── Seashell.Resort.Web.Core/    # Auth, filters, middleware
│   │   ├── Seashell.Resort.Web.Host/    # API host (port 44301)
│   │   ├── Seashell.Resort.Mobile.MAUI/ # MAUI consumer app (Blazor Hybrid)
│   │   └── Seashell.Resort.Migrator/    # DB migration tool
│   ├── test/
│   └── tools/
├── angular/                              # Angular 19 admin dashboard (customized template)
│   ├── src/
│   │   ├── app/
│   │   │   ├── admin/                   # Custom Seashell admin modules
│   │   │   │   ├── dashboard/           # KPI dashboard
│   │   │   │   ├── guest-management/    # Guest CRUD + check-in/out
│   │   │   │   ├── room-management/     # Room inventory + status
│   │   │   │   ├── daypass-management/  # Day pass admin
│   │   │   │   ├── dining-management/   # Restaurant CRUD
│   │   │   │   ├── facility-management/ # Facility CRUD
│   │   │   │   ├── reports/             # Analytics + exports
│   │   │   │   └── content-management/  # CMS blocks + media
│   │   │   └── shared/                  # Template shared modules (auth, layout, etc.)
│   │   └── assets/
│   ├── package.json
│   └── angular.json
├── prototype/                            # React PWA prototype (design reference only)
│   ├── src/screens/                      # Visual spec for all app screens
│   └── src/components/                   # Component design reference
├── docs/                                 # This plan, API docs, architecture decisions
├── scripts/                              # Build, deploy, database scripts
└── README.md
```

---

## 14. Success Criteria

| Phase | Definition of Done |
|---|---|
| **Phase 0** | `swagger-ui` shows all `/api/public/*` endpoints returning seeded data. MAUI app loads marketing data from API. |
| **Phase 1** | Guest can log in with Room 304 / 1234 in MAUI app, see real booking data, submit a service request. |
| **Phase 2** | Day pass can be purchased, topped up, spent at a zone, balance reflected in real-time in MAUI app. |
| **Phase 3** | Angular admin dashboard: check in a guest, update room status, view all day passes, edit CMS content. |
| **Phase 4** | Reports show real revenue data in Angular. MAUI app is ready for store submission. Both apps work in Arabic. |
| **Phase 5** | MAUI app live on App Store + Play Store. Angular admin at custom domain. Staff are trained. |

---

## 15. Next Steps

1. **Review this plan** — confirm scope, timeline, and priorities
2. **Set up development environment** — clone template, rename, verify build
3. **Begin Phase 0** — customize template, add entities, create migrations, seed data
4. **Freeze API contract for Phase 0** — document `/api/public/*` endpoints in Swagger
5. **Run frontend against backend** — replace static data with real API calls
6. **Weekly sync** — review prototype changes, assess backend impact, adjust plan

---

*This plan is a living document. As the prototype evolves, this plan will be updated to reflect new screens, features, and technical decisions.*
