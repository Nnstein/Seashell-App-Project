import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

interface StickyChatBubbleProps {
  onOpen: () => void;
  unreadCount?: number;
}

export default function StickyChatBubble({ onOpen, unreadCount = 0 }: StickyChatBubbleProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, []);

  const handleClick = () => {
    setIsOpen(true);
    onOpen();
  };

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          onClick={handleClick}
          className="fixed bottom-24 left-4 z-[60] w-14 h-14 rounded-full flex items-center justify-center shadow-xl"
          style={{
            background: 'linear-gradient(135deg, #89C1D8, #5BA3C0)',
            boxShadow: '0 6px 20px rgba(137, 193, 216, 0.4), 0 2px 8px rgba(0,0,0,0.1)',
          }}
          whileTap={{ scale: 0.9 }}
        >
          <MessageCircle size={24} className="text-white" fill="white" />

          {/* Pulse ring */}
          <motion.div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{ border: '2px solid rgba(137, 193, 216, 0.35)' }}
            animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Unread badge */}
          {unreadCount > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 flex items-center justify-center"
            >
              <span className="text-[10px] font-bold text-white">{unreadCount}</span>
            </motion.div>
          )}
        </motion.button>
      )}
    </AnimatePresence>
  );
}
