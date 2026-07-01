import resortJson from './resort_data.json';
import type { ResortData } from '@/types';

export const resortData: ResortData = resortJson as ResortData;

// Kitchen / Dining data
export const kitchenData = {
  title: 'Kitchen',
  subtitle: 'In-Room Dining',
  description: '24/7 room service with fresh meals delivered to your door.',
  categories: resortData.stay.room_service_menu?.categories || [],
  restaurants: resortData.dine.restaurants,
};

// Services data
export const servicesData = {
  title: 'Services',
  subtitle: 'Guest Services',
  description: 'Housekeeping, laundry, and concierge at your fingertips.',
  services: resortData.stay.services,
};

// Rooms data
export const roomsData = {
  title: 'Rooms',
  subtitle: 'Accommodations',
  description: `${resortData.stay.room_types.length} room types from cozy studios to beachfront chalets.`,
  roomTypes: resortData.stay.room_types,
};

// Events data (derived from pools, activities, kids facilities)
export const eventsData = [
  {
    id: 'evt-pool-party',
    title: 'Poolside Sunset Party',
    location: 'Main Swimming Pool',
    tags: ['Party', 'Music'],
    image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=600&q=80',
    time: '5:00 PM - 8:00 PM',
  },
  {
    id: 'evt-live-music',
    title: 'Live Jazz at Avenue',
    location: 'Avenue Restaurant',
    tags: ['Music'],
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80',
    time: '7:00 PM - 10:00 PM',
  },
  {
    id: 'evt-beach-tour',
    title: 'Julai\'a Coast Tour',
    location: 'Beach Front',
    tags: ['Tour'],
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80',
    time: '9:00 AM - 12:00 PM',
  },
  {
    id: 'evt-kids-club',
    title: 'Kids Adventure Day',
    location: 'Kids\' Club',
    tags: ['Party'],
    image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&q=80',
    time: '10:00 AM - 2:00 PM',
  },
  {
    id: 'evt-wine-tasting',
    title: 'Sunset Wine Tasting',
    location: 'Cafe Presto',
    tags: ['Music', 'Party'],
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&q=80',
    time: '6:00 PM - 9:00 PM',
  },
  {
    id: 'evt-garden-tour',
    title: 'Resort Garden Walk',
    location: 'Main Garden',
    tags: ['Tour'],
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600&q=80',
    time: '8:00 AM - 9:00 AM',
  },
];

export const filterTags = ['all', 'Party', 'Music', 'Tour'] as const;
export type FilterTag = typeof filterTags[number];
