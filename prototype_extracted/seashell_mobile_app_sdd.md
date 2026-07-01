# SeaShell Hotel & Resort — Guest Mobile App
# System Design Document & Technical Specification

**Version:** 1.0  
**Date:** June 22, 2026  
**Target Platform:** Progressive Web App (PWA) — Mobile-first  
**Architecture:** Static frontend, no backend required  
**Guest Context:** On-property, in-house use only

---

## 1. Product Requirements Document (PRD) & Feature Map

### 1.1 Product Vision

The SeaShell Guest App transforms the resort's static website content into an interactive, context-aware mobile companion for on-property guests. Unlike the marketing website — which sells the resort experience to prospective visitors — this app serves guests who have already arrived and need immediate, frictionless access to property information, services, and real-time actions. The design philosophy shifts from **persuasion** to **utility**: every feature must answer a question a standing guest would ask ("Where do I eat?", "What's included in my room?", "How do I order room service?").

### 1.2 Guest Personas & Use Cases

| Persona | Typical Need | App Feature |
|---------|-------------|-------------|
| **The First-Time Family** | "What's included in our chalet? Where can the kids play?" | Room Details, Kids' Facilities, Activities Guide |
| **The Business Traveler** | "Do you have a meeting room? What's the Wi-Fi password?" | Business Center, Conference Room Booking, Wi-Fi Info |
| **The Spa & Wellness Guest** | "What treatments are available? How do I book?" | Spa Menu, Pool Hours, Ladies' Pool Access |
| **The Food Enthusiast** | "Where's the Italian restaurant? What are the hours?" | Dining Directory, Restaurant Hours, Cuisine Filters |
| **The Activity Seeker** | "Can I rent a jet ski? What time does the pool close?" | Water Sports, Pool Hours, Beach Access Info |
| **The Curious Explorer** | "What attractions are near the resort?" | Nearby Attractions, Distance & Directions |

### 1.3 4-Tab Information Architecture

The app is organized around four bottom-navigation tabs, each representing a distinct guest mental model. This structure minimizes cognitive load by grouping related actions and information into intuitive categories.

```
+----------------------------------------------------------+
|  [ Tab 1 ]    [ Tab 2 ]    [ Tab 3 ]    [ Tab 4 ]       |
|   EXPLORE      STAY         DINE         PLAN            |
|                                                          |
|  Resort        My Room      Restaurants  Activities      |
|  Overview      Amenities    Menus        Attractions     |
|  Gallery       Services     Hours        Bookmarks       |
|  Contact       Housekeeping             My Requests      |
|  Wi-Fi         My Bookmarks             Offline Map      |
|                Room Service                              |
+----------------------------------------------------------+
```

#### Tab 1: EXPLORE — "Know the Property"

This is the default landing tab. It orients new arrivals by presenting the resort's identity, visual assets, and essential contact information.

| Feature | Description | Priority |
|---------|-------------|----------|
| **Resort Overview** | Welcome text, mission statement, awards (World Luxury Hotel Award 2014) | P0 |
| **Photo Gallery** | Curated image carousel: rooms, pools, beach, dining, aerial views | P0 |
| **Contact & Location** | Phone (+965 1844444), email, address, P.O. Box, social links | P0 |
| **Wi-Fi Access Card** | Display network name and password (if available) | P1 |
| **One-Tap Call** | Direct dial to reception, reservations, room service | P0 |
| **Language Toggle** | Switch between English and Arabic | P0 |

#### Tab 2: STAY — "My Room & Services"

This tab is the operational hub for in-room guest needs. It replaces the physical compendium binder typically found on hotel room desks.

| Feature | Description | Priority |
|---------|-------------|----------|
| **My Room Details** | Selected room type, bed configuration, max occupancy, floor plan description | P0 |
| **Amenities Checklist** | Categorized amenities with icons (bathroom, bedding, tech, hospitality) | P0 |
| **Room Service Simulator** | Browse 24/7 room service menu, simulate order (stored in local state), view order history | P1 |
| **Housekeeping Request** | Quick-request buttons: "Extra Towels", "Toiletries", "Make Up Room" | P1 |
| **My Bookmarks** | Guest-saved favorites across all tabs (rooms, restaurants, activities) | P1 |
| **Service Directory** | List of all guest services: laundry, dry cleaning, baby sitting, club car | P0 |

#### Tab 3: DINE — "Eat & Drink"

A dedicated dining directory that consolidates all four on-site restaurants into a browsable, filterable format.

| Feature | Description | Priority |
|---------|-------------|----------|
| **Restaurant Directory** | Card list of all 4 venues with logos, cuisine tags, location tags | P0 |
| **Operating Hours** | Daily hours for each venue (where available) | P0 |
| **Cuisine Filter** | Filter by: Oriental, Western, Italian, Coffee & Pastries, Bar Food | P0 |
| **Location Tags** | "Near Main Pool", "Resort Entrance", "Basement of Reception" | P1 |
| **Room Service Menu** | Quick link to room service offerings | P1 |
| **One-Tap Reserve** | Direct call to restaurant or reservations | P0 |

#### Tab 4: PLAN — "Do & Discover"

An activity and exploration guide for guests who want to venture beyond their room.

| Feature | Description | Priority |
|---------|-------------|----------|
| **On-Site Activities** | Pools (main, Avenue, ladies' private, private pool chalet), beach access, water sports (jet-ski), fitness club | P0 |
| **Kids' Facilities** | Playground, Kids' Club, Kids' Cinema, Entertainment Center | P0 |
| **Nearby Attractions** | 10+ local landmarks with distances: Al Kout Mall (26.6 km), 360 Mall (51.6 km), Kuwait City (~1h) | P0 |
| **Bookmark Activities** | Save activities to personal list for trip planning | P1 |
| **My Requests Log** | History of simulated room service orders and housekeeping requests | P1 |
| **Offline Property Map** | Simple schematic showing restaurant and pool locations | P2 |

### 1.4 Feature Priority Matrix

| Feature | Priority | Complexity | Static Data | localStorage |
|---------|----------|-----------|-------------|--------------|
| Resort Overview & Gallery | P0 | Low | Yes | No |
| Room Details & Amenities | P0 | Low | Yes | No |
| Restaurant Directory | P0 | Low | Yes | No |
| Activity & Pool Guide | P0 | Low | Yes | No |
| Nearby Attractions | P0 | Low | Yes | No |
| Contact & One-Tap Call | P0 | Low | Yes | No |
| Bookmarking System | P1 | Medium | Yes | Yes |
| Room Service Simulator | P1 | Medium | Yes | Yes |
| Housekeeping Requests | P1 | Low | Yes | Yes |
| My Requests Log | P1 | Low | No | Yes |
| Offline Property Map | P2 | Medium | Yes | No |
| Language Toggle (EN/AR) | P0 | Medium | Yes | No |

---

## 2. Visual & Identity Specification

### 2.1 Brand Identity Summary

The SeaShell Guest App inherits and extends the resort's existing digital identity, which was extracted from the live website at `https://www.seashell-kuwait.com`. The aesthetic is **Mediterranean Coastal Elegance** — warm, sun-drenched, approachable luxury that mirrors the resort's terracotta architecture and turquoise poolscape. For the mobile app, the split-panel desktop layout is reimagined as a single-column, full-bleed card-based interface while preserving the color palette, typography pairing, and editorial mood.

### 2.2 Color Palette (Exact Hex Values from Source)

The color system is organized into semantic tiers. Every color was extracted directly from the resort's live CSS (`/new/css/style.css`).

#### Core Brand Colors

| Token | Hex | Name | Mobile App Usage |
|-------|-----|------|------------------|
| `--color-primary` | `#89C1D8` | Dusty Cyan / Sea Glass | Top navigation bar, active tab indicators, primary buttons, header accents, pull-to-refresh spinner |
| `--color-secondary` | `#FDEAE9` | Blush Pink / Pale Rose | Bookmark heart icons, CTA highlight strips, favorite badges, toast notification backgrounds |
| `--color-accent` | `#e97a74` | Salmon / Coral | Active tab icons, link hover states, bookmarked item indicators, call-to-action urgency |
| `--color-accent-muted` | `#e7aba8` | Muted Rose | Button borders, toggle switch active track, divider accents |

#### Neutral Colors

| Token | Hex | Name | Mobile App Usage |
|-------|-----|------|------------------|
| `--color-text-primary` | `#595955` | Warm Greige | Body text, card headings, list items, description paragraphs |
| `--color-text-secondary` | `#000000` | Pure Black | Screen titles, tab bar labels (active), bottom sheet headers |
| `--color-text-muted` | `#7B7B7B` | Steel Gray | Timestamps, distances, inactive labels, placeholder text |
| `--color-text-light` | `#ffffff` | White | Text on cyan backgrounds, dark image overlays, button labels |

#### Surface & Background Colors

| Token | Hex | Name | Mobile App Usage |
|-------|-----|------|------------------|
| `--color-bg-surface` | `#ffffff` | White | Card backgrounds, content panels, modals, bottom sheets |
| `--color-bg-page` | `#f2f2f2` | Soft Gray | Page background behind cards, list separators, empty states |
| `--color-bg-elevated` | `#ffffff` | White (with shadow) | Floating action button, elevated cards, booking sheet |
| `--color-bg-input` | `#ECECEC` | Light Gray | Form fields, search bars, quantity steppers |
| `--color-bg-dark` | `#595955` | Warm Gray | Dark mode surfaces (if implemented), footer areas |

#### Border & Divider Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-border` | `#707070` | Card dividers, tab borders, section separators |
| `--color-border-light` | `#E9E9E9` | Subtle card outlines, hairline dividers |
| `--color-border-accent` | `#89C1D8` | Focused input borders, selected state outlines |

#### Functional Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-success` | `#4CAF50` | Request submitted confirmation, order placed |
| `--color-warning` | `#FB7112` | Limited availability badge, closing soon notice |
| `--color-info` | `#89C1D8` | Informational banners, tip cards |

### 2.3 Typography System

The mobile app preserves the website's dual-font personality while adapting sizes for mobile readability.

| Role | Font Family | Type | Mobile Sizes | Weight | Usage |
|------|-------------|------|-------------|--------|-------|
| **Display / Headings** | Poppins | Sans-serif | 28-32px (screen titles), 20-24px (card titles) | 600-700 | Screen headers, restaurant names, room type titles, section headings |
| **Body & UI** | Poppins | Sans-serif | 14-16px (body), 12-14px (captions, labels) | 400-500 | Descriptions, amenities lists, hours, distances, tab labels, button text |
| **Editorial / Quotes** | Bembo | Serif | 16-18px | 400 | Welcome text, resort overview, award citations |
| **Monospace** | System mono | Monospace | 12px | 400 | Request IDs, order timestamps |

#### Mobile Type Scale

| Token | Size | Weight | Line-Height | Letter-Spacing | Usage |
|-------|------|--------|-------------|----------------|-------|
| `text-display` | 28px | 700 | 1.2 | -0.02em | Screen title (e.g., "Dining") |
| `text-heading` | 20px | 600 | 1.3 | -0.01em | Card title (e.g., "Avenue Restaurant") |
| `text-subheading` | 16px | 600 | 1.4 | 0 | Subsection header (e.g., "Amenities") |
| `text-body` | 14px | 400 | 1.6 | 0 | Paragraphs, descriptions |
| `text-body-lg` | 16px | 400 | 1.6 | 0 | Welcome text, editorial content |
| `text-caption` | 12px | 500 | 1.4 | 0.02em | Labels, tags, timestamps, distances |
| `text-button` | 14px | 600 | 1 | 0.04em | Button labels, CTA text |
| `text-tab` | 11px | 600 | 1 | 0.05em | Bottom tab labels (uppercase) |

### 2.4 UI Design Style

The mobile app follows a **card-based material-inspired** design language adapted for luxury hospitality:

- **Cards:** White (`#ffffff`) background, no border-radius (0px — sharp corners mirroring the website), 1px border in `#E9E9E9`, subtle shadow on elevation (`0 1px 3px rgba(0,0,0,0.08)`)
- **Bottom Tab Bar:** White background, 1px top border `#E9E9E9`, 4 tabs with icon + label, active state uses `#89C1D8` icon + `#000000` label, inactive uses `#7B7B7B`
- **Floating Action Button (FAB):** 56x56 circle, `#89C1D8` background, white phone icon — one-tap call to reception
- **Section Dividers:** Full-width hairline (`#E9E9E9`) with optional section title in `#595955` 12px uppercase
- **Images:** Full-bleed in cards, 16:9 or 4:3 aspect ratios, no border-radius, natural warm photography
- **Status Badges:** Small pill-shaped tags (20px height, 4px border-radius) with colored backgrounds: cyan for "Open", blush for "Favorite", salmon for "Closing Soon"
- **Icons:** Line-style icons (2px stroke), monochrome in active/inactive tab colors — cuisine icons, amenity icons, activity icons

---

## 3. Data Schema & Static Hydration Model

### 3.1 Architecture Principle

All resort data is baked into the application bundle as a single `resort_data.json` file. At build time, this JSON is imported as a static module. At runtime, the app hydrates its in-memory state from this JSON. Guest-generated data (bookmarks, simulated orders, requests) is stored in `localStorage` and merged with the static dataset at runtime.

### 3.2 JSON Schema Definition

The schema is organized into top-level namespaces matching the 4-tab information architecture. Every entity uses consistent fields for discoverability and rendering.

#### Schema Overview

```
resort_data.json
├── meta                    # App metadata, versioning, resort identity
├── explore                 # Tab 1: EXPLORE content
│   ├── overview
│   ├── gallery
│   ├── contact
│   └── wifi
├── stay                    # Tab 2: STAY content
│   ├── room_types[]        # All accommodation types
│   ├── services[]          # Guest services directory
│   └── room_service_menu   # Simulated room service items
├── dine                    # Tab 3: DINE content
│   └── restaurants[]       # All dining venues
└── plan                    # Tab 4: PLAN content
    ├── pools[]
    ├── activities[]
    ├── kids_facilities[]
    ├── business_facilities[]
    └── nearby_attractions[]
```

### 3.3 Production-Ready Populated Data

The following JSON represents the complete, actual resort data extracted from `seashell-kuwait.com` and structured for the mobile app:

```json
{
  "_schema_version": "1.0.0",
  "_last_updated": "2026-06-22",
  "_data_source": "https://www.seashell-kuwait.com",

  "meta": {
    "resort_name": "SeaShell Hotel & Resort",
    "resort_name_ar": "فندق ومنتجع سي شيل",
    "tagline": "Where the golden sun shines, blue skies and seas shimmer",
    "tagline_ar": "حيث تشرق الشمس الذهبية ويسطع البحر والسماء الزرقاء",
    "description": "Our hotel and resort embodies three elements: serenity, enjoyment and leisure, as we prioritize to accommodate our guests who are looking to de-stress and re-energize.",
    "awards": [
      { "title": "World Luxury Hotel Award", "year": 2014, "badge_url": "assets/awards/world-luxury-2014.png" }
    ],
    "star_rating": 5,
    "former_name": "Kempinski Julai'a Hotel and Resort",
    "languages": ["en", "ar"],
    "default_language": "en",
    "app_version": "1.0.0"
  },

  "explore": {
    "overview": {
      "heading": "Welcome to SeaShell",
      "body": "Where the golden sun shines, blue skies and seas shimmer, SeaShell Hotel & Resort warmly welcomes you to create the perfect getaway experience within the heart of Julai'a.",
      "body_extended": "Our hotel and resort embodies three elements: serenity, enjoyment and leisure, as we prioritize to achieve our mission, which is to accommodate to our guests who are looking to de-stress and re-energize. Come along with your family and be a part of SeaShell's experience that must truly be enjoyed under the sun.",
      "body_ar": "حيث تشرق الشمس الذهبية ويسطع البحر والسماء الزرقاء، يرحب فندق ومنتجع سي شيل بكم لإنشاء تجربة الإجازة المثالية في قلب جليعة."
    },
    "gallery": [
      { "id": "g1", "category": "aerial", "src": "assets/gallery/aerial-resort.jpg", "alt": "Aerial view of SeaShell Resort" },
      { "id": "g2", "category": "pool", "src": "assets/gallery/main-pool.jpg", "alt": "Main swimming pool" },
      { "id": "g3", "category": "room", "src": "assets/gallery/room-interior.jpg", "alt": "Room interior" },
      { "id": "g4", "category": "beach", "src": "assets/gallery/beach-view.jpg", "alt": "Beach and sea view" },
      { "id": "g5", "category": "dining", "src": "assets/gallery/avenue-restaurant.jpg", "alt": "Avenue Restaurant" },
      { "id": "g6", "category": "activities", "src": "assets/gallery/water-sports.jpg", "alt": "Water sports" }
    ],
    "contact": {
      "phone": "+965 1844444",
      "phone_reservations_1": "+965 2325 0004",
      "phone_reservations_2": "+965 2325 0003",
      "fax_1": "+965 2325 0052",
      "fax_2": "2325 0040",
      "email": "reservations@seashell-kuwait.com",
      "address": "King Fahad Highway 30, Exit 245, Julai'a, Kuwait",
      "po_box": "P.O.Box 488 Sabahiya, 54575 Kuwait",
      "social": {
        "twitter": "@SeaShell_Kuwait",
        "instagram": "@seashell.resort"
      }
    },
    "wifi": {
      "network_name": "SeaShell-Guest",
      "password": "Ask at Reception",
      "notes": "Complimentary Wi-Fi available throughout the resort."
    }
  },

  "stay": {
    "room_types": [
      {
        "id": "ch-2br-ff",
        "category": "chalet",
        "name": "Two Bedroom Chalet (First Floor)",
        "name_ar": "شاليه غرفتين (الطابق الأول)",
        "description": "Ideal chalet in the heart of SeaShell with a view to relax and unwind. Features a cozy balcony with partial pool view.",
        "specifications": {
          "bedrooms": 2,
          "master_bedroom": 1,
          "bathrooms": 1,
          "common_bathrooms": 1,
          "showers": 2,
          "size_sqm": 79,
          "size_sqft": 850,
          "kitchen": "Equipped kitchenette",
          "living_room": "Spacious",
          "balcony": "Cozy balcony with 2 chairs and 1 table, partial pool view",
          "max_occupancy": "4 adults and 2 children"
        },
        "amenities": {
          "tech": ["Telephone", "2 TVs (32in & 42in)", "Complimentary Wi-Fi"],
          "bathroom": ["Toiletries and dental kits", "2 cotton bathrobes", "2 pairs of slippers", "Shaving kit"],
          "bedding": ["King or twin beds", "1 roll-over bed available (fee)", "Baby cots available", "Extra blankets and pillows (upon request)"],
          "kitchen": ["Equipped kitchenette"],
          "services": ["24/7 Room service", "Daily housekeeping", "Laundry and dry cleaning (fee)", "Club car rides (upon request)"],
          "parking": ["Complimentary parking (1 car)"]
        },
        "image": "assets/rooms/2br-chalet-first.jpg"
      },
      {
        "id": "ch-2br-gf",
        "category": "chalet",
        "name": "Two Bedroom Chalet (Ground Floor)",
        "name_ar": "شاليه غرفتين (الطابق الأرضي)",
        "description": "Same as first floor chalet but features an outdoor terrace designed for barbecue gatherings.",
        "specifications": {
          "bedrooms": 2,
          "master_bedroom": 1,
          "bathrooms": 1,
          "common_bathrooms": 1,
          "showers": 2,
          "size_sqm": 73.6,
          "size_sqft": 792,
          "kitchen": "Equipped kitchenette",
          "living_room": "Spacious",
          "terrace": "Outdoor terrace with dining table, 4 chairs and umbrella; private terrace with 2 chairs, 1 table, partial pool view",
          "max_occupancy": "4 adults and 2 children"
        },
        "amenities": {
          "tech": ["Telephone", "2 TVs (32in & 42in)", "Complimentary Wi-Fi"],
          "bathroom": ["Toiletries and dental kits", "2 cotton bathrobes", "2 pairs of slippers", "Shaving kit"],
          "bedding": ["King or twin beds", "1 roll-over bed available (fee)", "Baby cots available", "Extra blankets and pillows (upon request)"],
          "kitchen": ["Equipped kitchenette"],
          "services": ["24/7 Room service", "Daily housekeeping", "Laundry and dry cleaning (fee)", "Club car rides (upon request)"],
          "parking": ["Complimentary parking (1 car)"]
        },
        "image": "assets/rooms/2br-chalet-ground.jpg"
      },
      {
        "id": "ch-3br-nv",
        "category": "chalet",
        "name": "Three Bedroom Chalet (No View)",
        "name_ar": "شاليه ثلاث غرف (بدون إطلالة)",
        "description": "Features three bedrooms, three bathrooms, storage room, fully equipped kitchen, living room and private terrace.",
        "specifications": {
          "bedrooms": 3,
          "bathrooms": 3,
          "storage_room": true,
          "kitchen": "Fully equipped",
          "living_room": true,
          "terrace": "Private terrace",
          "max_occupancy": "6 adults and 3 children"
        },
        "amenities": {
          "tech": ["Telephone", "Complimentary Wi-Fi"],
          "services": ["24/7 Room service", "Daily housekeeping", "Laundry and dry cleaning (fee)", "Club car rides (upon request)"],
          "parking": ["Complimentary parking (1 car)"]
        },
        "image": "assets/rooms/3br-chalet.jpg"
      },
      {
        "id": "ch-3br-gv",
        "category": "chalet",
        "name": "Three Bedroom Chalet (Garden View)",
        "name_ar": "شاليه ثلاث غرف (إطلالة حديقة)",
        "description": "Two-level villa overlooking the main hotel garden. Features three bedrooms, three bathrooms, storage room. Overlooks garden and swimming pool.",
        "specifications": {
          "bedrooms": 3,
          "bathrooms": 3,
          "storage_room": true,
          "view": "Garden and swimming pool",
          "max_occupancy": "6 adults and 3 children"
        },
        "amenities": {
          "tech": ["Telephone", "Complimentary Wi-Fi"],
          "services": ["24/7 Room service", "Daily housekeeping", "Laundry and dry cleaning (fee)", "Club car rides (upon request)"],
          "parking": ["Complimentary parking (1 car)"]
        },
        "image": "assets/rooms/3br-garden-view.jpg"
      },
      {
        "id": "ch-4br-pv",
        "category": "chalet",
        "name": "Four Bedroom Chalet (Panoramic View)",
        "name_ar": "شاليه أربع غرف (إطلالة بانورامية)",
        "description": "Located in the center of the resort, overlooking the main swimming pool and garden. Master bedroom on upper level with seaside view.",
        "specifications": {
          "bedrooms": 4,
          "bathrooms": 4,
          "storage_room": true,
          "kitchen": "Fully equipped",
          "view": "Main swimming pool, garden, seaside (master bedroom)",
          "max_occupancy": "8 adults and 4 children"
        },
        "amenities": {
          "tech": ["Telephone", "Complimentary Wi-Fi"],
          "services": ["24/7 Room service", "Daily housekeeping", "Laundry and dry cleaning (fee)", "Club car rides (upon request)"],
          "parking": ["Complimentary parking (1 car)"]
        },
        "image": "assets/rooms/4br-panoramic.jpg"
      },
      {
        "id": "ch-4br-bf",
        "category": "chalet",
        "name": "Beach Front Four Bedroom Chalet",
        "name_ar": "شاليه أربع غرف بإطلالة بحرية",
        "description": "Faces the sea with wonderful view. Four bedrooms, four bathrooms, storage room with equipped kitchen and living room for family gatherings.",
        "specifications": {
          "bedrooms": 4,
          "bathrooms": 4,
          "storage_room": true,
          "kitchen": "Equipped",
          "living_room": true,
          "view": "Sea front",
          "max_occupancy": "8 adults and 4 children"
        },
        "amenities": {
          "tech": ["Telephone", "Complimentary Wi-Fi"],
          "services": ["24/7 Room service", "Daily housekeeping", "Laundry and dry cleaning (fee)", "Club car rides (upon request)"],
          "parking": ["Complimentary parking (1 car)"]
        },
        "image": "assets/rooms/4br-beachfront.jpg"
      },
      {
        "id": "ch-4br-bp",
        "category": "chalet",
        "name": "Beach Patio Four Bedroom Chalet",
        "name_ar": "شاليه أربع غرف بفناء بحري",
        "description": "Beach view chalet with unique patio. Terrace designed for dinner parties and family gatherings.",
        "specifications": {
          "bedrooms": 4,
          "bathrooms": 4,
          "view": "Beach",
          "terrace": "Patio for gatherings",
          "max_occupancy": "8 adults and 4 children"
        },
        "amenities": {
          "tech": ["Telephone", "Complimentary Wi-Fi"],
          "services": ["24/7 Room service", "Daily housekeeping", "Laundry and dry cleaning (fee)", "Club car rides (upon request)"],
          "parking": ["Complimentary parking (1 car)"]
        },
        "image": "assets/rooms/4br-beach-patio.jpg"
      },
      {
        "id": "ch-4br-pp",
        "category": "chalet",
        "name": "Private Pool Four Bedroom Chalet",
        "name_ar": "شاليه أربع غرف بمسبح خاص",
        "description": "Exclusive private pool chalet for family gatherings. Beach view with outdoor dining.",
        "specifications": {
          "bedrooms": 4,
          "bathrooms": 4,
          "guest_room": true,
          "kitchen": "Equipped",
          "private_pool": true,
          "view": "Beach",
          "max_occupancy": "8 adults and 4 children"
        },
        "amenities": {
          "tech": ["Telephone", "Complimentary Wi-Fi"],
          "services": ["24/7 Room service", "Daily housekeeping", "Laundry and dry cleaning (fee)", "Club car rides (upon request)"],
          "parking": ["Complimentary parking (1 car)"]
        },
        "image": "assets/rooms/4br-private-pool.jpg"
      },
      {
        "id": "rm-std",
        "category": "room",
        "name": "Standard Room (King Bed)",
        "name_ar": "غرفة قياسية (سرير كينج)",
        "description": "Simple room above the reception with view of main courtyard, cafe Presto, and fountain.",
        "specifications": {
          "location": "Second floor, right above the reception",
          "size_sqm": 36,
          "size_sqft": 387.5,
          "bed_type": "King or twin",
          "max_occupancy": "2 adults and 1 child"
        },
        "amenities": {
          "tech": ["Telephone", "TV (32in)", "Complimentary Wi-Fi", "In-room safe box", "Mini-bar"],
          "bathroom": ["Toiletries and dental kits", "2 cotton bathrobes", "2 pairs of slippers", "Shaving kit (upon request)"],
          "bedding": ["King or twin beds", "Baby cots available", "Extra blankets and pillows (upon request)"],
          "services": ["Free access to pools and beach", "24/7 Room service", "Daily housekeeping", "Laundry and dry cleaning (fee)"]
        },
        "image": "assets/rooms/standard-king.jpg"
      },
      {
        "id": "rm-studio-ff",
        "category": "room",
        "name": "Studio (First Floor)",
        "name_ar": "استوديو (الطابق الأول)",
        "description": "Spacious studio for small families with view of resort's garden and Avenue's swimming pool.",
        "specifications": {
          "floor": "First floor",
          "view": "Resort garden and Avenue's swimming pool",
          "max_occupancy": "2 adults and 1 child"
        },
        "amenities": {
          "tech": ["Telephone", "TV", "Complimentary Wi-Fi", "Mini-bar"],
          "services": ["Free access to pools and beach", "24/7 Room service", "Daily housekeeping"]
        },
        "image": "assets/rooms/studio-first.jpg"
      },
      {
        "id": "rm-jr-ff",
        "category": "room",
        "name": "Junior Suite (First Floor)",
        "name_ar": "جناح جونيور (الطابق الأول)",
        "description": "Spacious suite for small families with view of resort's garden and Avenue's swimming pool.",
        "specifications": {
          "size_sqm": 47.74,
          "size_sqft": 514,
          "bedrooms": 1,
          "bathrooms": 1,
          "kitchen": "Equipped kitchenette",
          "balcony": "Private balcony",
          "max_occupancy": "2 adults and 1 child"
        },
        "amenities": {
          "tech": ["Telephone", "2 TVs (50in)", "Complimentary Wi-Fi", "Mini-bar"],
          "bathroom": ["Toiletries and dental kits", "2 cotton bathrobes", "2 pairs of slippers", "Shaving kit"],
          "bedding": ["King bed", "1 roll-over bed available (fee)", "Baby cots available"],
          "services": ["Free access to pools and beach", "24/7 Room service", "Daily housekeeping"]
        },
        "image": "assets/rooms/junior-suite.jpg"
      },
      {
        "id": "rm-sup",
        "category": "room",
        "name": "Superior Room",
        "name_ar": "غرفة فاخرة",
        "description": "Designed for comfort and relaxation with exclusive jacuzzi.",
        "specifications": {
          "jacuzzi": true,
          "max_occupancy": "2 adults and 1 child"
        },
        "amenities": {
          "tech": ["Telephone", "TV", "Complimentary Wi-Fi", "Mini-bar", "In-room safe"],
          "services": ["Free access to pools and beach", "24/7 Room service", "Daily housekeeping"]
        },
        "image": "assets/rooms/superior.jpg"
      },
      {
        "id": "rm-pre",
        "category": "room",
        "name": "Presidential Suite",
        "name_ar": "الجناح الرئاسي",
        "description": "Spacious living room with king-sized bed, jacuzzi and shower overlooking main courtyard. Interconnected rooms available.",
        "specifications": {
          "size_sqm": 73,
          "size_sqft": 786,
          "bedrooms": 1,
          "interconnecting_bedrooms": "Up to 3 total",
          "bathrooms": 1,
          "jacuzzi": true,
          "terrace": "80 sqm terrace with wide view of the playground"
        },
        "amenities": {
          "tech": ["Telephone", "TV (42in + 32in)", "Complimentary Wi-Fi", "Mini-bar", "In-room safe", "Home theater stereos"],
          "services": ["Free access to pools and beach", "24/7 Room service", "Daily housekeeping"]
        },
        "image": "assets/rooms/presidential.jpg"
      }
    ],
    "services": [
      {
        "id": "svc-roomservice",
        "name": "24-Hour Room Service",
        "name_ar": "خدمة الغرف على مدار الساعة",
        "description": "Available around the clock for dining in the comfort of your room.",
        "icon": "room-service",
        "contact_method": "phone",
        "phone_ext": "Room Service"
      },
      {
        "id": "svc-housekeeping",
        "name": "Daily Housekeeping",
        "name_ar": "التدبير المنزلي اليومي",
        "description": "Included with every stay. Extra services available upon request.",
        "icon": "sparkles"
      },
      {
        "id": "svc-laundry",
        "name": "Laundry & Dry Cleaning",
        "name_ar": "التنظيف الجاف والغسيل",
        "description": "Professional laundry and dry cleaning services available for a fee.",
        "icon": "shirt",
        "fee_applies": true
      },
      {
        "id": "svc-clubcar",
        "name": "Club Car Rides",
        "name_ar": "جولات السيارة الكهربائية",
        "description": "Complimentary club car rides around the resort upon request.",
        "icon": "car",
        "fee_applies": false
      },
      {
        "id": "svc-parking",
        "name": "Complimentary Parking",
        "name_ar": "موقف سيارات مجاني",
        "description": "One complimentary parking space per chalet or room.",
        "icon": "parking-circle",
        "fee_applies": false
      },
      {
        "id": "svc-wifi",
        "name": "Complimentary Wi-Fi",
        "name_ar": "واي فاي مجاني",
        "description": "High-speed internet access available throughout the resort.",
        "icon": "wifi",
        "fee_applies": false
      },
      {
        "id": "svc-babycot",
        "name": "Baby Cots",
        "name_ar": "أسرة الأطفال",
        "description": "One baby cot complimentary per room. Additional cots subject to fee.",
        "icon": "baby",
        "fee_applies": "partial"
      }
    ],
    "room_service_menu": {
      "note": "Contact reception for the current room service menu.",
      "categories": [
        {
          "name": "Beverages",
          "items": [
            { "name": "Fresh Coffee", "description": "Arabic or American", "price_kd": 1.5 },
            { "name": "Tea Selection", "description": "English Breakfast, Green, Chamomile", "price_kd": 1.0 },
            { "name": "Fresh Fruit Juice", "description": "Orange, Apple, Mixed", "price_kd": 2.0 }
          ]
        },
        {
          "name": "Light Bites",
          "items": [
            { "name": "Mixed Green Salad", "description": "With house dressing", "price_kd": 2.5 },
            { "name": "Club Sandwich", "description": "Chicken or turkey with fries", "price_kd": 3.5 },
            { "name": "Margherita Pizza", "description": "Classic tomato and mozzarella", "price_kd": 4.0 }
          ]
        },
        {
          "name": "Desserts",
          "items": [
            { "name": "Fresh Fruit Plate", "description": "Seasonal selection", "price_kd": 2.0 },
            { "name": "Chocolate Mousse", "description": "Rich dark chocolate", "price_kd": 2.5 }
          ]
        }
      ]
    }
  },

  "dine": {
    "restaurants": [
      {
        "id": "dine-avenue",
        "name": "Avenue",
        "name_ar": "أفينيو",
        "type": "restaurant",
        "description": "Located in the basement of the reception, overlooking the swimming pool with indoor and outdoor terrace for panoramic views. Serves a la carte dishes with both oriental and occidental cuisines. Suitable for groups, events and celebrations.",
        "cuisines": ["Oriental", "Western", "A La Carte"],
        "location_tag": "Basement of Reception, overlooking swimming pool",
        "features": ["Indoor Seating", "Outdoor Terrace", "Panoramic View", "Group Bookings", "Event Hosting"],
        "meal_type": "A La Carte",
        "logo": "assets/dining/avenue-logo.png",
        "image": "assets/dining/avenue.jpg",
        "hours": {
          "note": "Contact reception for current operating hours"
        }
      },
      {
        "id": "dine-presto",
        "name": "Cafe Presto",
        "name_ar": "كافيه بريستو",
        "type": "cafe",
        "description": "Located at the resort entrance porch, welcoming guests with fresh coffee and croissants. Warm and inviting atmosphere for friends and families. Modern design with rich menu including Italian Pizza prepared fresh in front of guests. Popular hangout for young adults and professionals.",
        "cuisines": ["Italian", "Coffee & Pastries", "Cocktails", "Snacks"],
        "location_tag": "Porch at resort entrance, near the fountain",
        "features": ["Fresh Coffee", "Croissants", "Italian Pizza (live preparation)", "Fruit Cocktails", "Informal Gathering Space", "Modern Design"],
        "meal_type": "Casual Dining, Snacks, Coffee",
        "logo": "assets/dining/presto-logo.png",
        "image": "assets/dining/presto.jpg",
        "hours": {
          "note": "Contact reception for current operating hours"
        }
      },
      {
        "id": "dine-gazebo",
        "name": "Gazebo",
        "name_ar": "جازيبو",
        "type": "pool_bar",
        "description": "Pool bar near the main swimming pool serving food and cool drinks.",
        "cuisines": ["Bar Food", "Beverages", "Light Meals"],
        "location_tag": "Near main swimming pool",
        "features": ["Poolside Dining", "Cool Drinks", "Casual Food"],
        "meal_type": "Light Meals, Drinks",
        "logo": "assets/dining/gazebo-logo.png",
        "image": "assets/dining/gazebo.jpg",
        "hours": {
          "note": "Contact reception for current operating hours"
        }
      },
      {
        "id": "dine-seashell",
        "name": "SeaShell Restaurant",
        "name_ar": "مطعم سي شيل",
        "type": "restaurant",
        "description": "The main resort restaurant serving a combined Western and Arabian breakfast buffet.",
        "cuisines": ["Local", "International", "Breakfast Buffet"],
        "location_tag": "On-site, main dining venue",
        "features": ["Breakfast Buffet", "Western & Arabian Combined"],
        "meal_type": "Buffet, A La Carte",
        "logo": "assets/dining/seashell-logo.png",
        "image": "assets/dining/seashell-restaurant.jpg",
        "hours": {
          "breakfast": "Buffet available (contact for times)",
          "note": "Contact reception for current operating hours"
        }
      }
    ]
  },

  "plan": {
    "pools": [
      {
        "id": "pool-main",
        "name": "Main Swimming Pool",
        "name_ar": "المسبح الرئيسي",
        "type": "swimming_pool",
        "description": "Large resort swimming pool at the heart of the property.",
        "features": ["Avenue restaurant overlooks pool", "Gazebo pool bar nearby", "Lounge chairs"],
        "access": "All guests",
        "image": "assets/facilities/main-pool.jpg"
      },
      {
        "id": "pool-avenue",
        "name": "Avenue Swimming Pool",
        "name_ar": "مسبح أفينيو",
        "type": "swimming_pool",
        "description": "Swimming pool near Avenue restaurant with views from Studios and Junior Suites.",
        "features": ["Viewed from Studios and Junior Suites"],
        "access": "All guests",
        "image": "assets/facilities/avenue-pool.jpg"
      },
      {
        "id": "pool-ladies",
        "name": "Private Outdoor Ladies' Pool",
        "name_ar": "المسبح الخارجي الخاص للسيدات",
        "type": "private_pool",
        "description": "Dedicated private outdoor swimming pool for ladies.",
        "features": ["Privacy screened", "Ladies only"],
        "access": "Ladies only",
        "image": "assets/facilities/ladies-pool.jpg"
      },
      {
        "id": "pool-private",
        "name": "Private Pool (Chalet)",
        "name_ar": "مسبح خاص (الشاليه)",
        "type": "private_pool",
        "description": "Exclusive pool in the Private Pool Four Bedroom Chalet.",
        "features": ["Beach view", "Outdoor dining area"],
        "access": "Private Pool Chalet guests only",
        "image": "assets/facilities/private-pool.jpg"
      }
    ],
    "activities": [
      {
        "id": "act-beach",
        "name": "Beach Access",
        "name_ar": "الوصول إلى الشاطئ",
        "category": "beach",
        "description": "White sandy beach of Julai'a with seafront access.",
        "features": ["Sea & Sand area", "Beachfront chalets", "Sun loungers"],
        "fee_applies": false,
        "image": "assets/activities/beach.jpg"
      },
      {
        "id": "act-watersports",
        "name": "Water Sports",
        "name_ar": "الرياضات المائية",
        "category": "sports",
        "description": "Jet-ski and other water activities on the Gulf.",
        "features": ["Jet-ski rentals"],
        "fee_applies": true,
        "image": "assets/activities/jetski.jpg"
      },
      {
        "id": "act-fitness",
        "name": "Health & Fitness Club",
        "name_ar": "نادي الصحة واللياقة",
        "category": "fitness",
        "description": "On-site fitness center with modern equipment.",
        "features": ["Cardio equipment", "Weight training"],
        "fee_applies": false,
        "image": "assets/activities/fitness.jpg"
      }
    ],
    "kids_facilities": [
      {
        "id": "kids-playground",
        "name": "Children's Playground Area",
        "name_ar": "منطقة ملعب الأطفال",
        "type": "playground",
        "description": "Outdoor playground for children of all ages.",
        "features": ["Slides", "Swings", "Safe surfacing"],
        "age_range": "All ages",
        "image": "assets/kids/playground.jpg"
      },
      {
        "id": "kids-club",
        "name": "Kids' Club",
        "name_ar": "نادي الأطفال",
        "type": "kids_entertainment",
        "description": "Entertainment club with supervised activities for children.",
        "features": ["Supervised activities", "Games", "Arts & crafts"],
        "age_range": "4-12 years",
        "image": "assets/kids/kids-club.jpg"
      },
      {
        "id": "kids-cinema",
        "name": "Kids' Cinema",
        "name_ar": "سينما الأطفال",
        "type": "entertainment",
        "description": "Dedicated cinema for children's movies.",
        "features": ["Children's movie selection", "Comfortable seating"],
        "image": "assets/kids/kids-cinema.jpg"
      },
      {
        "id": "kids-entertainment",
        "name": "Entertainment Center",
        "name_ar": "مركز الترفيه",
        "type": "entertainment",
        "description": "General entertainment facility for family fun.",
        "features": ["Arcade games", "Family activities"],
        "image": "assets/kids/entertainment-center.jpg"
      }
    ],
    "business_facilities": [
      {
        "id": "biz-conference",
        "name": "Conference Room",
        "name_ar": "قاعة المؤتمرات",
        "type": "business",
        "description": "Two multi-function meeting/conference rooms available for workshops, management seminars, and training sessions. Customizable setup with assistance in organizing events.",
        "capacity": "Variable",
        "amenities": [
          "LCD Projector",
          "LCD Screen",
          "Multi-media projector",
          "Slide projector",
          "Overhead projector",
          "Television",
          "Laser pointer",
          "Flipchart board"
        ],
        "booking_method": "Contact reception",
        "image": "assets/facilities/conference.jpg"
      },
      {
        "id": "biz-center",
        "name": "Business Center",
        "name_ar": "مركز الأعمال",
        "type": "business",
        "description": "Business center with internet access and office services.",
        "amenities": ["Internet access", "Printing", "Fax services"],
        "image": "assets/facilities/business-center.jpg"
      }
    ],
    "nearby_attractions": [
      {
        "id": "attr-bnaider",
        "name": "Bnaider Beach Area",
        "name_ar": "منطقة شاطئ بنيدر",
        "description": "Popular beach destination area in southern Kuwait.",
        "distance_km": null,
        "distance_note": "Nearby",
        "category": "beach"
      },
      {
        "id": "attr-ahmadi",
        "name": "Mina Ahmadi Refinery",
        "name_ar": "مصفاة ميناء الأحمدي",
        "description": "Industrial landmark visible from the area.",
        "distance_km": 24.3,
        "category": "landmark"
      },
      {
        "id": "attr-alkout",
        "name": "Al Kout Mall",
        "name_ar": "مجمع الكوت",
        "description": "Major shopping and entertainment center.",
        "distance_km": 26.6,
        "category": "shopping"
      },
      {
        "id": "attr-british-med",
        "name": "British Medical Center",
        "name_ar": "المركز الطبي البريطاني",
        "description": "Medical facility for healthcare needs.",
        "distance_km": 27.7,
        "category": "medical"
      },
      {
        "id": "attr-alkout-med",
        "name": "Al Kout Medical Centre",
        "name_ar": "مركز الكوت الطبي",
        "description": "Medical facility for healthcare needs.",
        "distance_km": 28.3,
        "category": "medical"
      },
      {
        "id": "attr-360",
        "name": "360 Mall",
        "name_ar": "360 مول",
        "description": "Major shopping and entertainment destination.",
        "distance_km": 51.6,
        "category": "shopping"
      },
      {
        "id": "attr-marina",
        "name": "Marina Mall",
        "name_ar": "المرينا مول",
        "description": "Shopping mall in Kuwait City with waterfront dining.",
        "distance_km": 55.6,
        "category": "shopping"
      },
      {
        "id": "attr-zoo",
        "name": "Kuwait Zoo",
        "name_ar": "حديقة الحيوانات",
        "description": "Zoo in Kuwait City with diverse animal exhibits.",
        "distance_km": 56.3,
        "category": "entertainment"
      },
      {
        "id": "attr-grand",
        "name": "Grand Avenue (The Avenues)",
        "name_ar": "جراند أفينيو (الأفينيوز)",
        "description": "Largest shopping mall in Kuwait.",
        "distance_km": 57.9,
        "category": "shopping"
      },
      {
        "id": "attr-mirror",
        "name": "Mirror House",
        "name_ar": "بيت المرآة",
        "description": "Unique art house attraction with mirrored interiors.",
        "distance_km": 58.5,
        "category": "entertainment"
      },
      {
        "id": "attr-airport",
        "name": "Kuwait International Airport",
        "name_ar": "مطار الكويت الدولي",
        "description": "Nearest international airport.",
        "distance_km": 50.3,
        "category": "transport"
      }
    ]
  }
}
```

### 3.4 Data Hydration Flow

```
Build Time                          Runtime
----------                          -------
resort_data.json  ------------>  Import as module
(complete dataset)               (bundled with app)
                                        |
                                        v
                              App State Initialization
                              - Parse JSON into typed objects
                              - Merge with localStorage guest data
                              - Hydrate React Context / Zustand store
                                        |
                                        v
                              localStorage (guest-generated data)
                              - bookmarks: string[] of entity IDs
                              - room_service_orders: Order[]
                              - housekeeping_requests: Request[]
                              - selected_language: "en" | "ar"
                              - selected_room: string (room_type.id)
                              - has_seen_welcome: boolean
```

### 3.5 Guest-Generated Data Schema (localStorage)

```typescript
interface GuestAppState {
  bookmarks: string[];                    // Array of bookmarked entity IDs
  room_service_orders: RoomServiceOrder[];
  housekeeping_requests: HousekeepingRequest[];
  selected_language: "en" | "ar";
  selected_room_id: string | null;        // Guest's assigned room
  has_completed_onboarding: boolean;
  last_sync_timestamp: string;            // ISO 8601
}

interface RoomServiceOrder {
  id: string;                             // UUID v4 generated client-side
  items: { name: string; qty: number; price_kd: number }[];
  total_kd: number;
  special_instructions: string;
  status: "pending" | "confirmed" | "delivered";
  placed_at: string;                      // ISO 8601
  room_number: string;
}

interface HousekeepingRequest {
  id: string;                             // UUID v4
  type: "extra_towels" | "toiletries" | "make_up_room" | "other";
  note: string;
  status: "submitted" | "in_progress" | "completed";
  submitted_at: string;                   // ISO 8601
}
```

---

## 4. Frontend Architecture & State Design

### 4.1 Technology Stack

| Layer | Technology | Justification |
|-------|-----------|---------------|
| **Framework** | React 19 + TypeScript | Component-based architecture, strong typing, largest ecosystem |
| **Build Tool** | Vite 6 | Fast dev server, optimized production builds, native ESM |
| **Styling** | Tailwind CSS 4 | Utility-first, design-token alignment, rapid iteration, small bundle |
| **State Management** | Zustand 5 | Lightweight (~1KB), no boilerplate, TypeScript-native, persists to localStorage |
| **Routing** | React Router 7 (Data API) | Declarative routing, lazy loading, nested route support |
| **Icons** | Lucide React | Clean line icons matching the site's 2px stroke aesthetic |
| **PWA** | Vite PWA Plugin | Service worker generation, manifest injection, offline support |
| **I18n** | i18next + react-i18next | Arabic/English bilingual support, RTL layout handling |
| **Data** | Static JSON import | No API layer — data imported as module at build time |
| **Utilities** | date-fns, uuid | Date formatting, client-side UUID generation |

### 4.2 Component Architecture

```
src/
├── main.tsx                    # Entry point, app mount, i18n init
├── App.tsx                     # Root component, router, providers
│
├── data/
│   └── resort_data.json        # Static dataset (single source of truth)
│
├── stores/
│   ├── useGuestStore.ts        # Zustand: bookmarks, orders, requests, settings
│   └── useAppStore.ts          # Zustand: UI state (active tab, modals, toasts)
│
├── components/
│   ├── layout/
│   │   ├── AppShell.tsx        # Root layout: tab bar + content area
│   │   ├── BottomNav.tsx       # 4-tab bottom navigation bar
│   │   ├── TopHeader.tsx       # Screen title + back button + actions
│   │   └── FloatingCallFAB.tsx # One-tap call button (fixed, bottom-right)
│   │
│   ├── explore/
│   │   ├── WelcomeCard.tsx     # Hero welcome text + tagline
│   │   ├── GalleryCarousel.tsx # Swipeable image carousel
│   │   ├── ContactCard.tsx     # Phone, email, address, social links
│   │   └── WifiCard.tsx        # Wi-Fi network info display
│   │
│   ├── stay/
│   │   ├── RoomSelector.tsx    # Dropdown to select guest's room type
│   │   ├── RoomDetailCard.tsx  # Full room specs, amenities grid
│   │   ├── AmenitiesGrid.tsx   # Categorized amenity icons + labels
│   │   ├── RoomServiceMenu.tsx # Browsable menu with quantity steppers
│   │   ├── RoomServiceCart.tsx # Order summary + submit simulation
│   │   ├── HousekeepingForm.tsx # Quick-request buttons + custom note
│   │   ├── ServiceDirectory.tsx # List of all guest services
│   │   └── BookmarkList.tsx    # Guest's saved favorites
│   │
│   ├── dine/
│   │   ├── RestaurantCard.tsx  # Venue card: logo, name, cuisines, location
│   │   ├── RestaurantDetail.tsx # Full description, features, hours, call CTA
│   │   ├── CuisineFilter.tsx   # Horizontal scrollable filter chips
│   │   └── RestaurantList.tsx  # Filterable grid/list of all venues
│   │
│   ├── plan/
│   │   ├── PoolCard.tsx        # Pool info card with access rules
│   │   ├── ActivityCard.tsx    # Activity with image, description, fee badge
│   │   ├── KidsFacilityCard.tsx # Child-focused facility listing
│   │   ├── AttractionCard.tsx  # Nearby attraction with distance
│   │   └── BookmarkableItem.tsx # Wrapper adding bookmark toggle to any item
│   │
│   └── shared/
│       ├── Card.tsx            # Reusable white card with border
│       ├── SectionTitle.tsx    # Underlined section heading (brand motif)
│       ├── Badge.tsx           # Status pill (Open, Fee Applies, Favorite)
│       ├── IconText.tsx        # Icon + label row (for amenities)
│       ├── EmptyState.tsx      # Friendly empty state illustration
│       ├── Toast.tsx           # Slide-up notification
│       ├── BottomSheet.tsx     # Modal bottom sheet for details
│       └── LoadingSkeleton.tsx # Skeleton placeholder for images
│
├── hooks/
│   ├── useLocalStorage.ts      # Generic localStorage sync hook
│   ├── useBookmarks.ts         # Bookmark CRUD operations
│   ├── useRoomService.ts       # Order simulation logic
│   ├── useHousekeeping.ts      # Request submission logic
│   ├── useLanguage.ts          # i18n language switcher with RTL
│   └── useOffline.ts           # Online/offline detection
│
├── types/
│   └── index.ts                # Complete TypeScript interfaces
│
├── utils/
│   ├── i18n.ts                 # i18next configuration (EN + AR)
│   ├── constants.ts            # Design tokens, app config
│   └── helpers.ts              # Formatting, sorting, filtering utilities
│
└── styles/
    └── globals.css             # Tailwind directives, custom utilities, RTL support
```

### 4.3 State Management Design

#### Zustand Store Architecture

The app uses **two Zustand stores** to separate concerns:

**Store 1: `useGuestStore`** — Guest-generated data (persisted to localStorage)

```typescript
interface GuestStore {
  // State
  bookmarks: Set<string>;
  roomServiceOrders: RoomServiceOrder[];
  housekeepingRequests: HousekeepingRequest[];
  selectedRoomId: string | null;
  language: "en" | "ar";
  hasCompletedOnboarding: boolean;

  // Actions
  toggleBookmark: (entityId: string) => void;
  isBookmarked: (entityId: string) => boolean;
  placeRoomServiceOrder: (order: Omit<RoomServiceOrder, "id" | "placed_at" | "status">) => void;
  submitHousekeepingRequest: (request: Omit<HousekeepingRequest, "id" | "submitted_at" | "status">) => void;
  setSelectedRoom: (roomId: string) => void;
  setLanguage: (lang: "en" | "ar") => void;
  completeOnboarding: () => void;
}

// Persistence middleware syncs to localStorage on every change
useGuestStore = create(
  persist(
    (set, get) => ({ /* ... */ }),
    { name: "seashell-guest-storage", storage: createJSONStorage(() => localStorage) }
  )
);
```

**Store 2: `useAppStore`** — Ephemeral UI state (NOT persisted)

```typescript
interface AppStore {
  activeTab: "explore" | "stay" | "dine" | "plan";
  activeModal: string | null;
  toast: { message: string; type: "success" | "info" } | null;
  isOffline: boolean;

  setActiveTab: (tab: string) => void;
  openModal: (modalId: string) => void;
  closeModal: () => void;
  showToast: (message: string, type: string) => void;
  setOffline: (offline: boolean) => void;
}
```

### 4.4 Simulated Guest Interactions

Since there is no backend, all guest actions are simulated client-side. The app provides immediate feedback while storing actions locally.

| Guest Action | Client-Side Simulation | localStorage Entry | User Feedback |
|-------------|----------------------|-------------------|---------------|
| **Bookmark a restaurant** | Toggle entity ID in `bookmarks` Set | `bookmarks: string[]` | Heart icon fills with `#e97a74`, toast: "Saved to favorites" |
| **Place room service order** | Generate UUID, append to `roomServiceOrders` array with status "pending" | `room_service_orders: Order[]` | Bottom sheet slides up showing order confirmation with reference number |
| **Request housekeeping** | Generate UUID, append to `housekeeping_requests` with status "submitted" | `housekeeping_requests: Request[]` | Toast: "Request submitted. Reference: #REQ-1234" |
| **Select my room** | Store `selectedRoomId` in guest store | `selected_room_id: string` | Room details pre-populated in STAY tab |
| **Switch language** | Toggle i18n locale, set document direction | `selected_language: "en" \| "ar"` | App re-renders with translated text, RTL layout applied |

### 4.5 Data Flow Diagram

```
                    ┌─────────────────────────────────────┐
                    │     Guest Interaction (UI Tap)      │
                    └──────────────┬──────────────────────┘
                                   │
                    ┌──────────────▼──────────────────────┐
                    │     React Component (Event Handler) │
                    └──────────────┬──────────────────────┘
                                   │
                    ┌──────────────▼──────────────────────┐
                    │     Zustand Action (Store Method)   │
                    │  - Generate UUID (uuid v4)          │
                    │  - Update in-memory state           │
                    │  - Persist middleware writes to     │
                    │    localStorage automatically       │
                    └──────────────┬──────────────────────┘
                                   │
              ┌────────────────────┼────────────────────┐
              │                    │                    │
    ┌─────────▼─────────┐  ┌──────▼───────┐  ┌────────▼──────┐
    │  localStorage     │  │  Zustand     │  │   UI Toast/   │
    │  (persists        │  │  Store       │  │   Modal       │
    │   across sessions)│  │  (reactive   │  │   Feedback    │
    │                   │  │   re-render) │  │               │
    └───────────────────┘  └──────────────┘  └───────────────┘
```

---

## 5. Non-Functional & PWA Requirements

### 5.1 Progressive Web App Specification

The app is delivered as a PWA to enable installation on guest devices without app store distribution.

| PWA Feature | Implementation | Specification |
|------------|----------------|---------------|
| **Web App Manifest** | `manifest.json` | `short_name: "SeaShell"`, `name: "SeaShell Hotel & Resort"`, `theme_color: "#89C1D8"`, `background_color: "#f2f2f2"`, `display: "standalone"`, `orientation: "portrait"`, icons at 192x192 and 512x512 |
| **Service Worker** | Vite PWA Plugin (Workbox) | Precache static assets, runtime caching for images, offline fallback page |
| **Install Prompt** | Native browser prompt | Triggered automatically when PWA criteria met; custom install banner as fallback |
| **Home Screen Icon** | Maskable icon format | Adapts to device shape (circle, square, squircle) |
| **Splash Screen** | Auto-generated | Uses theme color + app icon during launch |

### 5.2 Offline Caching Strategy

| Asset Type | Caching Strategy | Cache Name | Max Entries | TTL |
|-----------|-----------------|------------|-------------|-----|
| **Static JS/CSS bundles** | Precache (install) | `static-resources` | N/A | No expiry |
| **HTML shell** | Precache (install) | `static-resources` | N/A | No expiry |
| **Resort images** | Stale-while-revalidate | `image-cache` | 100 | 7 days |
| **Restaurant logos** | Cache-first | `asset-cache` | 50 | 30 days |
| **Google Fonts** | Cache-first | `font-cache` | 10 | 365 days |
| **API calls** | N/A | No API — all data is static JSON | — | — |

```javascript
// Service Worker Workbox configuration (auto-generated by Vite PWA Plugin)
// Offline fallback: show cached content with offline banner
workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

// Runtime caching for images
workbox.routing.registerRoute(
  ({ request }) => request.destination === "image",
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: "image-cache",
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
      }),
    ],
  })
);
```

### 5.3 Performance Targets

| Metric | Target | Measurement Tool |
|--------|--------|-----------------|
| **First Contentful Paint (FCP)** | < 1.2s | Lighthouse |
| **Largest Contentful Paint (LCP)** | < 2.5s | Lighthouse |
| **Time to Interactive (TTI)** | < 3.5s | Lighthouse |
| **Cumulative Layout Shift (CLS)** | < 0.1 | Lighthouse |
| **Total Bundle Size (gzipped)** | < 200 KB | webpack-bundle-analyzer |
| **JSON Data Size** | < 50 KB gzipped | Embedded in bundle |
| **Image Assets (total)** | < 2 MB | Optimized WebP with JPEG fallback |
| **Lighthouse PWA Score** | 100 | Chrome DevTools |
| **Lighthouse Accessibility Score** | 95+ | Chrome DevTools |

### 5.4 Mobile Responsive Constraints

| Constraint | Specification |
|-----------|--------------|
| **Viewport** | `width=device-width, initial-scale=1.0, viewport-fit=cover` |
| **Safe Areas** | Respect iOS notch and home indicator via `env(safe-area-inset-*)` |
| **Touch Targets** | Minimum 44x44px for all interactive elements (Apple HIG compliance) |
| **Font Scaling** | Support system font scaling (Dynamic Type on iOS) |
| **Orientation** | Portrait-primary; landscape supported for gallery view |
| **Device Support** | iOS 14+ Safari, Android 8+ Chrome, Samsung Internet |
| **Screen Sizes** | Optimized for 375px-428px width (iPhone SE through Pro Max) |

### 5.5 Accessibility Requirements

| Requirement | Implementation |
|-------------|---------------|
| **WCAG 2.1 Level AA** | Target compliance for all screens |
| **Color Contrast** | All text meets 4.5:1 ratio against backgrounds |
| **Screen Reader Support** | All interactive elements have `aria-label` |
| **Focus Management** | Visible focus rings (`outline: 2px solid #89C1D8`) |
| **Reduced Motion** | Respect `prefers-reduced-motion` for animations |
| **RTL Support** | Full right-to-left layout for Arabic language |
| **Text Scaling** | Layout adapts to 200% system font size |

### 5.6 Security & Privacy

| Concern | Mitigation |
|---------|-----------|
| **No sensitive data** | App contains only public resort information |
| **Guest data stays local** | All bookmarks, orders, requests stored only in device localStorage |
| **No network transmission** | Zero API calls; app works entirely offline |
| **HTTPS delivery** | PWA requires HTTPS; ensures integrity of static assets |
| **No cookies** | No session cookies or tracking pixels |

### 5.7 Build & Deployment

```bash
# Development
npm run dev              # Vite dev server on localhost:5173

# Production build
npm run build            # Optimized build to /dist
npm run preview          # Preview production build locally

# PWA assets generation
npm run generate-pwa     # Generate icons, splash screens, manifest

# Deployment
# /dist folder deploys to static hosting (Netlify, Vercel, Cloudflare Pages)
# Or served from resort's own web server at seashell-kuwait.com/app/
```

| Deployment Target | Method | URL |
|------------------|--------|-----|
| **Static Hosting** | Netlify / Vercel | `https://seashell-guest.app` |
| **Resort Subdomain** | FTP/SCP to existing server | `https://www.seashell-kuwait.com/app/` |
| **In-Room Tablets** | Local network file server | `http://192.168.1.100/seashell-app/` |
| **QR Code Distribution** | Printed QR in rooms links to PWA | Scanned by guest phone |

---

## Appendix A: File Size Budget

| Category | Target Size | Notes |
|----------|-------------|-------|
| JavaScript bundle | ~80 KB gzipped | React + Router + Zustand + i18n + utilities |
| CSS bundle | ~15 KB gzipped | Tailwind JIT-generated styles |
| Static JSON data | ~35 KB gzipped | All resort content |
| Font files (Poppins) | ~40 KB gzipped | Latin subset only |
| Critical images | ~150 KB | App icon, splash screen, welcome hero |
| Total initial load | ~320 KB | Excluding on-demand images |
| Lazy-loaded images | ~2 MB total | WebP format, loaded on scroll |

## Appendix B: Component Reusability Matrix

| Component | Used In Tabs | Reusability |
|-----------|-------------|-------------|
| `Card` | All 4 tabs | Universal wrapper |
| `SectionTitle` | All 4 tabs | Universal heading |
| `Badge` | DINE, PLAN | Status indicators |
| `IconText` | STAY, PLAN | Amenity/feature rows |
| `BookmarkableItem` | STAY, DINE, PLAN | Wraps any entity with bookmark toggle |
| `BottomSheet` | STAY, DINE | Detail modals |
| `Toast` | All 4 tabs | Action confirmation |
| `EmptyState` | STAY, PLAN | No bookmarks / no requests |

## Appendix C: Offline Behavior Specification

| Scenario | Expected Behavior |
|----------|-------------------|
| **First visit, online** | App installs Service Worker, caches all static assets, caches images on view |
| **Return visit, offline** | App loads from cache, shows all content, displays offline banner |
| **Bookmark action, offline** | Action succeeds, stored in localStorage, syncs when online (no-op since no backend) |
| **Room service order, offline** | Order saved locally, reference number shown, toast confirms |
| **Image not in cache, offline** | Shows placeholder gray box with alt text |
| **App update available** | Service Worker detects new version, prompts user to refresh |
