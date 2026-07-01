// Maps local asset paths to Unsplash URLs for rooms and dining thumbnails
// Each room/dining venue gets a consistent, high-quality Unsplash image

const roomImageMap: Record<string, string> = {
  // Chalets
  'assets/rooms/2br-chalet-first.jpg': 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&q=80',
  'assets/rooms/2br-chalet-ground.jpg': 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80',
  'assets/rooms/3br-chalet.jpg': 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80',
  'assets/rooms/3br-garden-view.jpg': 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80',
  'assets/rooms/4br-panoramic.jpg': 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80',
  'assets/rooms/4br-beachfront.jpg': 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=600&q=80',
  'assets/rooms/4br-beach-patio.jpg': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80',
  'assets/rooms/4br-private-pool.jpg': 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80',
  // Rooms
  'assets/rooms/standard-king.jpg': 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80',
  'assets/rooms/studio-first.jpg': 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=600&q=80',
  'assets/rooms/junior-suite.jpg': 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&q=80',
  'assets/rooms/superior.jpg': 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&q=80',
  'assets/rooms/presidential.jpg': 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80',
};

const diningImageMap: Record<string, string> = {
  'assets/dining/avenue.jpg': 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80',
  'assets/dining/presto.jpg': 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&q=80',
  'assets/dining/gazebo.jpg': 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=600&q=80',
  'assets/dining/seashell-restaurant.jpg': 'https://images.unsplash.com/photo-1560611588-163f295eb145?w=600&q=80',
};

const facilityImageMap: Record<string, string> = {
  'assets/facilities/main-pool.jpg': 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=600&q=80',
  'assets/facilities/avenue-pool.jpg': 'https://images.unsplash.com/photo-1572331165267-854da2b10ccc?w=600&q=80',
  'assets/facilities/ladies-pool.jpg': 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=600&q=80',
  'assets/facilities/private-pool.jpg': 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80',
  'assets/facilities/conference.jpg': 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80',
  'assets/facilities/business-center.jpg': 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&q=80',
};

const activityImageMap: Record<string, string> = {
  'assets/activities/beach.jpg': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80',
  'assets/activities/jetski.jpg': 'https://images.unsplash.com/photo-1583006769353-53437178db88?w=600&q=80',
  'assets/activities/fitness.jpg': 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80',
};

const kidsImageMap: Record<string, string> = {
  'assets/kids/playground.jpg': 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&q=80',
  'assets/kids/kids-club.jpg': 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=600&q=80',
  'assets/kids/kids-cinema.jpg': 'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=600&q=80',
  'assets/kids/entertainment-center.jpg': 'https://images.unsplash.com/photo-1511882150382-421056c89033?w=600&q=80',
};

/** Resolve a local asset path to a working Unsplash URL */
export function getImageUrl(localPath: string): string {
  return (
    roomImageMap[localPath] ??
    diningImageMap[localPath] ??
    facilityImageMap[localPath] ??
    activityImageMap[localPath] ??
    kidsImageMap[localPath] ??
    localPath // fallback — if it's already a full URL, return as-is
  );
}
