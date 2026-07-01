// Resort data types
export interface ResortMeta {
  resort_name: string;
  resort_name_ar: string;
  tagline: string;
  star_rating: number;
  languages: string[];
}

export interface RoomType {
  id: string;
  category: 'chalet' | 'room';
  name: string;
  name_ar: string;
  description: string;
  specifications: Record<string, any>;
  amenities: Record<string, string[]>;
  image: string;
}

export interface Restaurant {
  id: string;
  name: string;
  name_ar: string;
  type: string;
  description: string;
  cuisines: string[];
  location_tag: string;
  features: string[];
  meal_type: string;
  logo: string;
  image: string;
  hours: { note: string; breakfast?: string };
}

export interface Pool {
  id: string;
  name: string;
  name_ar: string;
  type: string;
  description: string;
  features: string[];
  access: string;
  image: string;
}

export interface Activity {
  id: string;
  name: string;
  name_ar: string;
  category: string;
  description: string;
  features: string[];
  fee_applies: boolean;
  image: string;
}

export interface KidsFacility {
  id: string;
  name: string;
  name_ar: string;
  type: string;
  description: string;
  features: string[];
  age_range?: string;
  image: string;
}

export interface Attraction {
  id: string;
  name: string;
  name_ar: string;
  description: string;
  distance_km: number | null;
  distance_note?: string;
  category: string;
}

export interface ResortService {
  id: string;
  name: string;
  name_ar: string;
  description: string;
  icon: string;
  fee_applies?: boolean | string;
}

export interface RoomServiceItem {
  name: string;
  description: string;
  price_kd: number;
}

export interface RoomServiceCategory {
  name: string;
  items: RoomServiceItem[];
}

export interface ContactInfo {
  phone: string;
  phone_reservations_1: string;
  phone_reservations_2: string;
  fax_1: string;
  fax_2: string;
  email: string;
  address: string;
  po_box: string;
  social: Record<string, string>;
}

export interface ResortData {
  meta: ResortMeta;
  explore: {
    overview: { heading: string; body: string; body_extended: string };
    contact: ContactInfo;
    wifi: { network_name: string; notes: string };
  };
  stay: {
    room_types: RoomType[];
    services: ResortService[];
    room_service_menu: { categories: RoomServiceCategory[] };
  };
  dine: { restaurants: Restaurant[] };
  plan: {
    pools: Pool[];
    activities: Activity[];
    kids_facilities: KidsFacility[];
    business_facilities: any[];
    nearby_attractions: Attraction[];
  };
}

// App state types
export type ThemeMode = 'light' | 'dark';
export type TabId = 'main' | 'explore' | 'room' | 'profile';
export type EventFilter = 'all' | 'Party' | 'Music' | 'Tour';

export interface AppState {
  theme: ThemeMode;
  activeTab: TabId;
  eventFilter: EventFilter;
  bookmarks: string[];
}
