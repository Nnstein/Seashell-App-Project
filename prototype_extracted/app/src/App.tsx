import { useState, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from '@/hooks/useTheme';
import { AuthProvider, useAuth } from '@/hooks/useAuth';
import PublicLayout from '@/screens/public/PublicLayout';
import LoginScreen from '@/screens/auth/LoginScreen';
import BottomNav from '@/components/BottomNav';
import DayPassNav from '@/components/DayPassNav';
import Header from '@/components/Header';
import BentoGrid from '@/components/BentoGrid';
import EventsSection from '@/components/EventsSection';
import { StickyChatBubble, ChatModal } from '@/components/chat';
import {
  PageSkeleton, HeroSkeleton, TileGridSkeleton,
  DetailPageSkeleton, DiningTileSkeleton
} from '@/components/loading';
import type { TabId } from '@/types';
import './App.css';

// Lazy load screens
const PublicLanding = lazy(() => import('@/screens/public/PublicLanding'));
const PublicRooms = lazy(() => import('@/screens/public/PublicRooms'));
const PublicDining = lazy(() => import('@/screens/public/PublicDining'));
const PublicFacilities = lazy(() => import('@/screens/public/PublicFacilities'));
const PublicGallery = lazy(() => import('@/screens/public/PublicGallery'));
const PublicContact = lazy(() => import('@/screens/public/PublicContact'));
const RoomDetailPage = lazy(() => import('@/screens/public/RoomDetailPage'));
const DiningDetailPage = lazy(() => import('@/screens/public/DiningDetailPage'));
const ExploreScreen = lazy(() => import('@/screens/guest/ExploreScreen'));
const RoomScreen = lazy(() => import('@/screens/guest/RoomScreen'));
const ProfileScreen = lazy(() => import('@/screens/guest/ProfileScreen'));
const DayPassWallet = lazy(() => import('@/screens/daypass/DayPassWallet'));
const DayPassHistory = lazy(() => import('@/screens/daypass/DayPassHistory'));
const DayPassAccount = lazy(() => import('@/screens/daypass/DayPassAccount'));
// Admin screens
const AdminLogin = lazy(() => import('@/screens/admin/AdminLogin'));
const AdminLayout = lazy(() => import('@/screens/admin/AdminLayout'));
const Dashboard = lazy(() => import('@/screens/admin/Dashboard'));
const GuestManagement = lazy(() => import('@/screens/admin/GuestManagement'));
const DayPassManagement = lazy(() => import('@/screens/admin/DayPassManagement'));
const RoomManagement = lazy(() => import('@/screens/admin/RoomManagement'));
const DiningManagement = lazy(() => import('@/screens/admin/DiningManagement'));
const FacilityManagement = lazy(() => import('@/screens/admin/FacilityManagement'));
const Reports = lazy(() => import('@/screens/admin/Reports'));
const ContentManagement = lazy(() => import('@/screens/admin/ContentManagement'));

type PublicTab = 'home' | 'rooms' | 'dining' | 'facilities' | 'gallery' | 'contact';
type DayPassTab = 'wallet' | 'map' | 'history' | 'account';
type AdminPage = 'dashboard' | 'guests' | 'daypass' | 'rooms' | 'dining' | 'facilities' | 'reports' | 'content';

function SmartLoadingFallback({ type = 'page' }: { type?: 'page' | 'hero' | 'tiles' | 'detail' | 'dining' }) {
  const fallbackMap: Record<string, React.ReactNode> = {
    page: <PageSkeleton />, hero: <HeroSkeleton />, tiles: <TileGridSkeleton columns={2} count={6} />,
    detail: <DetailPageSkeleton />, dining: <DiningTileSkeleton />,
  };
  return <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>{fallbackMap[type] || fallbackMap.page}</motion.div>;
}

/* ========================================== MARKETING ========================================== */
function MarketingApp({ onCheckIn }: { onCheckIn: () => void }) {
  const [activeTab, setActiveTab] = useState<PublicTab>('home');
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<string | null>(null);
  const { activateDayPass } = useAuth();

  if (selectedRoomId) {
    return <Suspense fallback={<SmartLoadingFallback type="detail" />}><RoomDetailPage roomId={selectedRoomId} onBack={() => setSelectedRoomId(null)} /></Suspense>;
  }
  if (selectedRestaurantId) {
    return <Suspense fallback={<SmartLoadingFallback type="detail" />}><DiningDetailPage restaurantId={selectedRestaurantId} onBack={() => setSelectedRestaurantId(null)} /></Suspense>;
  }

  const screens: Record<PublicTab, React.ReactNode> = {
    home: <PublicLanding onCheckIn={onCheckIn} onGetDayPass={activateDayPass} onViewRooms={() => setActiveTab('rooms')} />,
    rooms: <PublicRooms onSelectRoom={setSelectedRoomId} />,
    dining: <PublicDining onSelectRestaurant={setSelectedRestaurantId} />,
    facilities: <PublicFacilities />,
    gallery: <PublicGallery />,
    contact: <PublicContact />,
  };

  return (
    <PublicLayout activeTab={activeTab} onTabChange={setActiveTab} onCheckIn={onCheckIn}>
      <Suspense fallback={<SmartLoadingFallback type={activeTab === 'rooms' ? 'tiles' : activeTab === 'dining' ? 'dining' : 'page'} />}>
        {screens[activeTab]}
      </Suspense>
    </PublicLayout>
  );
}

/* ========================================== GUEST (In-House) ========================================== */
function GuestApp() {
  const [activeTab, setActiveTab] = useState<TabId>('main');

  const guestScreens: Record<TabId, React.ReactNode> = {
    main: (<><Header /><BentoGrid onTileClick={() => {}} /><EventsSection /></>),
    explore: <ExploreScreen />,
    room: <RoomScreen />,
    profile: <ProfileScreen />,
  };

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: 'var(--app-bg)' }}>
      <main className="max-w-md mx-auto">
        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
            <Suspense fallback={<PageSkeleton />}>
              {guestScreens[activeTab]}
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </main>
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}

/* ========================================== DAY PASS ========================================== */
function DayPassApp() {
  const [activeTab, setActiveTab] = useState<DayPassTab>('wallet');
  const { exitDayPass } = useAuth();

  const screens: Record<DayPassTab, React.ReactNode> = {
    wallet: <DayPassWallet />,
    map: <ExploreScreen />,
    history: <DayPassHistory />,
    account: <DayPassAccount />,
  };

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: 'var(--app-bg)' }}>
      {/* Day Pass Header */}
      <div className="px-5 pt-6 pb-2 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2.5">
          <img src="/logo.png" alt="SeaShell" className="w-9 h-9 object-contain" />
          <div>
            <span className="text-base font-bold tracking-tight block leading-none" style={{ color: 'var(--brand-cyan)' }}>SEASHELL</span>
            <span className="text-[9px] font-semibold tracking-[0.15em] uppercase" style={{ color: 'var(--text-muted)' }}>Day Pass</span>
          </div>
        </div>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={exitDayPass}
          className="text-xs font-semibold px-3 py-1.5 rounded-full"
          style={{ backgroundColor: 'var(--brand-pink)', color: 'var(--brand-salmon)' }}
        >
          Exit
        </motion.button>
      </div>

      <main className="max-w-md mx-auto pb-28">
        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
            <Suspense fallback={<PageSkeleton />}>
              {screens[activeTab]}
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </main>
      <DayPassNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}

/* ========================================== ADMIN DASHBOARD ========================================== */
function AdminApp() {
  const [currentPage, setCurrentPage] = useState<AdminPage>('dashboard');
  const adminScreens: Record<AdminPage, React.ReactNode> = {
    dashboard: <Dashboard />,
    guests: <GuestManagement />,
    daypass: <DayPassManagement />,
    rooms: <RoomManagement />,
    dining: <DiningManagement />,
    facilities: <FacilityManagement />,
    reports: <Reports />,
    content: <ContentManagement />,
  };

  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-white/40 text-sm">Loading admin...</div>}>
      <AdminLayout currentPage={currentPage} onPageChange={setCurrentPage}>
        <AnimatePresence mode="wait">
          <motion.div key={currentPage} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
            {adminScreens[currentPage]}
          </motion.div>
        </AnimatePresence>
      </AdminLayout>
    </Suspense>
  );
}

/* ========================================== ROOT ROUTER ========================================== */
function AppRouter() {
  const { mode } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  const isLoginScreenVisible = showLogin && mode !== 'GUEST';

  // Admin mode takes over completely
  if (mode === 'ADMIN') {
    return <AdminApp />;
  }

  // Admin login screen
  if (showAdminLogin) {
    return <Suspense fallback={<PageSkeleton />}><AdminLogin onBack={() => setShowAdminLogin(false)} /></Suspense>;
  }

  const renderCurrentView = () => {
    if (isLoginScreenVisible) {
      return <LoginScreen onBack={() => setShowLogin(false)} onAdminLogin={() => { setShowLogin(false); setShowAdminLogin(true); }} />;
    }
    if (mode === 'DAY_PASS') return <DayPassApp />;
    if (mode === 'GUEST') return <GuestApp />;
    return <MarketingApp onCheckIn={() => setShowLogin(true)} />;
  };

  return (
    <>
      {renderCurrentView()}
      {/* Sticky Chat — visible across all views except login screens */}
      {!chatOpen && !isLoginScreenVisible && !showAdminLogin && (
        <StickyChatBubble onOpen={() => setChatOpen(true)} unreadCount={1} />
      )}
      <ChatModal isOpen={chatOpen} onClose={() => setChatOpen(false)} />
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;