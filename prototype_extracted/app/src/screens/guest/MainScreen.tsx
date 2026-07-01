import Header from '@/components/Header';
import BentoGrid from '@/components/BentoGrid';
import EventsSection from '@/components/EventsSection';

export default function MainScreen() {
  return (
    <div className="min-h-full">
      <Header />
      <BentoGrid onTileClick={() => {}} />
      <EventsSection />
    </div>
  );
}
