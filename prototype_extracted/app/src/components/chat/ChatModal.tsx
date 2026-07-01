import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Phone, Send, User, Bot
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface ChatMessage {
  id: string;
  sender: 'guest' | 'bot' | 'agent';
  text: string;
  timestamp: Date;
  isTyping?: boolean;
}

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const simulatedConversation: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'bot',
    text: "Welcome to SeaShell Hotel & Resort! I'm your virtual concierge. How can I assist you today?",
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
  },
  {
    id: 'msg-2',
    sender: 'guest',
    text: 'Hi! What time is breakfast served?',
    timestamp: new Date(Date.now() - 1000 * 60 * 42),
  },
  {
    id: 'msg-3',
    sender: 'agent',
    text: 'Good morning! Breakfast is served at SeaShell Restaurant from 6:30 AM to 10:30 AM daily. We offer a combined Western and Arabian breakfast buffet. Would you like me to reserve a table for you?',
    timestamp: new Date(Date.now() - 1000 * 60 * 40),
  },
  {
    id: 'msg-4',
    sender: 'guest',
    text: 'That would be great, thank you! Also, is the spa open today?',
    timestamp: new Date(Date.now() - 1000 * 60 * 35),
  },
  {
    id: 'msg-5',
    sender: 'agent',
    text: "You're all set for breakfast at 8:00 AM tomorrow! The spa is open from 10:00 AM to 9:00 PM today. I can book a treatment for you — would you prefer a massage or a facial?",
    timestamp: new Date(Date.now() - 1000 * 60 * 32),
  },
  {
    id: 'msg-6',
    sender: 'bot',
    text: 'Our wellness team is standing by for your spa booking. Just let us know your preferred time!',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
  },
];

const quickReplies = [
  'Spa booking',
  'Room service',
  'Pool hours',
  'Checkout time',
];

function formatTime(date: Date) {
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
}

export default function ChatModal({ isOpen, onClose }: ChatModalProps) {
  const { mode } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>(simulatedConversation);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showCallOptions, setShowCallOptions] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const canCallReception = mode === 'GUEST' || mode === 'DAY_PASS';

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const guestMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'guest',
      text: inputText.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, guestMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulated bot response
    setTimeout(() => {
      setIsTyping(false);
      const botResponses = [
        "I'll connect you with the front desk right away. One moment please!",
        "Thank you for your message. Our team will get back to you shortly.",
        "Great question! Let me check that for you.",
        "Absolutely! I'd be happy to help with that.",
      ];
      const botMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'agent',
        text: botResponses[Math.floor(Math.random() * botResponses.length)],
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMsg]);
    }, 2000);
  };

  const handleQuickReply = (text: string) => {
    const guestMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'guest',
      text,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, guestMsg]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const responses: Record<string, string> = {
        'Spa booking': 'Our spa is open from 10:00 AM to 9:00 PM. We have massages, facials, and body treatments available. Would you like me to check availability for today?',
        'Room service': 'Room service is available 24/7. You can order from our in-room dining menu by dialing 0 from your room phone, or I can connect you with kitchen directly.',
        'Pool hours': 'All swimming pools are open from 7:00 AM to 10:00 PM. The main pool has the Gazebo bar nearby, and the ladies\' private pool is open during the same hours.',
        'Checkout time': 'Standard checkout is at 12:00 PM (noon). Late checkout until 3:00 PM can be arranged subject to availability. Would you like me to request a late checkout for you?',
      };
      const botMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'agent',
        text: responses[text] || "I'll look into that for you right away!",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMsg]);
    }, 1800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center"
          onClick={onClose}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* Chat Panel */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            onClick={e => e.stopPropagation()}
            className="relative w-full max-w-md h-[85vh] sm:h-[700px] rounded-t-3xl sm:rounded-3xl overflow-hidden flex flex-col"
            style={{ backgroundColor: 'var(--app-bg)' }}
          >
            {/* ====== HEADER ====== */}
            <div
              className="flex-shrink-0 px-5 pt-5 pb-4 flex items-center justify-between"
              style={{ backgroundColor: 'var(--surface)' }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: 'var(--tile-kitchen-bg)' }}
                >
                  <img src="/logo.png" alt="SeaShell" className="w-7 h-7 object-contain" />
                </div>
                <div>
                  <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                    Front Desk
                  </p>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
                      Online — Typically replies in 2 min
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Call Reception — only for GUEST / DAY_PASS */}
                {canCallReception && (
                  <div className="relative">
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setShowCallOptions(!showCallOptions)}
                      className="w-9 h-9 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: 'var(--tile-kitchen-bg)' }}
                    >
                      <Phone size={16} style={{ color: 'var(--tile-kitchen)' }} />
                    </motion.button>

                    {/* Call dropdown */}
                    <AnimatePresence>
                      {showCallOptions && (
                        <motion.div
                          initial={{ opacity: 0, y: -8, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -8, scale: 0.95 }}
                          className="absolute right-0 top-11 w-56 rounded-2xl overflow-hidden shadow-xl"
                          style={{ backgroundColor: 'var(--surface)' }}
                        >
                          <a
                            href="tel:+9651844444"
                            className="flex items-center gap-3 px-4 py-3.5 transition-colors"
                            style={{ borderBottom: '1px solid var(--nav-border)' }}
                            onClick={() => setShowCallOptions(false)}
                          >
                            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--tile-kitchen-bg)' }}>
                              <Phone size={16} style={{ color: 'var(--tile-kitchen)' }} />
                            </div>
                            <div>
                              <p className="text-sm font-semibold">Reception</p>
                              <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>+965 1844444</p>
                            </div>
                          </a>
                          <a
                            href="tel:+96523250004"
                            className="flex items-center gap-3 px-4 py-3.5 transition-colors"
                            onClick={() => setShowCallOptions(false)}
                          >
                            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--tile-services-bg)' }}>
                              <Phone size={16} style={{ color: '#D97706' }} />
                            </div>
                            <div>
                              <p className="text-sm font-semibold">Reservations</p>
                              <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>+965 2325 0004</p>
                            </div>
                          </a>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'var(--app-bg)' }}
                >
                  <X size={18} style={{ color: 'var(--text-muted)' }} />
                </motion.button>
              </div>
            </div>

            {/* ====== MESSAGES ====== */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-4 py-4 space-y-4"
            >
              {/* Date divider */}
              <div className="flex items-center justify-center">
                <div className="px-3 py-1 rounded-full text-[10px] font-medium" style={{ backgroundColor: 'var(--surface)', color: 'var(--text-muted)' }}>
                  Today
                </div>
              </div>

              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2.5 ${msg.sender === 'guest' ? 'flex-row-reverse' : ''}`}
                >
                  {/* Avatar */}
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{
                      backgroundColor: msg.sender === 'guest' ? 'var(--brand-cyan)' : msg.sender === 'agent' ? 'var(--tile-kitchen-bg)' : 'var(--surface)',
                    }}
                  >
                    {msg.sender === 'guest' ? (
                      <User size={14} className="text-white" />
                    ) : msg.sender === 'agent' ? (
                      <img src="/logo.png" alt="" className="w-5 h-5 object-contain" />
                    ) : (
                      <Bot size={14} style={{ color: 'var(--text-muted)' }} />
                    )}
                  </div>

                  {/* Bubble */}
                  <div className={`max-w-[75%] ${msg.sender === 'guest' ? 'items-end' : 'items-start'} flex flex-col`}>
                    <div
                      className="px-4 py-2.5 rounded-2xl text-sm leading-relaxed"
                      style={{
                        backgroundColor: msg.sender === 'guest' ? 'var(--brand-cyan)' : 'var(--surface)',
                        color: msg.sender === 'guest' ? 'white' : 'var(--text-primary)',
                        borderBottomRightRadius: msg.sender === 'guest' ? '4px' : undefined,
                        borderBottomLeftRadius: msg.sender !== 'guest' ? '4px' : undefined,
                      }}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[10px] mt-1 px-1" style={{ color: 'var(--text-muted)' }}>
                      {formatTime(msg.timestamp)}
                    </span>
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-2.5"
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: 'var(--tile-kitchen-bg)' }}
                  >
                    <img src="/logo.png" alt="" className="w-5 h-5 object-contain" />
                  </div>
                  <div
                    className="px-4 py-3 rounded-2xl flex items-center gap-1"
                    style={{ backgroundColor: 'var(--surface)', borderBottomLeftRadius: '4px' }}
                  >
                    <motion.span
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1.2, repeat: Infinity, delay: 0 }}
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: 'var(--text-muted)' }}
                    />
                    <motion.span
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }}
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: 'var(--text-muted)' }}
                    />
                    <motion.span
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }}
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: 'var(--text-muted)' }}
                    />
                  </div>
                </motion.div>
              )}
            </div>

            {/* ====== QUICK REPLIES ====== */}
            <div className="flex-shrink-0 px-4 pb-2 pt-1 overflow-x-auto no-scrollbar">
              <div className="flex gap-2">
                {quickReplies.map(reply => (
                  <button
                    key={reply}
                    onClick={() => handleQuickReply(reply)}
                    className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors"
                    style={{ backgroundColor: 'var(--surface)', color: 'var(--brand-cyan)', border: '1px solid var(--nav-border)' }}
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>

            {/* ====== INPUT ====== */}
            <div
              className="flex-shrink-0 px-4 py-3 flex items-center gap-2"
              style={{ backgroundColor: 'var(--surface)', borderTop: '1px solid var(--nav-border)' }}
            >
              <input
                type="text"
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Type a message..."
                className="flex-1 px-4 py-3 rounded-2xl text-sm outline-none transition-colors"
                style={{ backgroundColor: 'var(--app-bg)', color: 'var(--text-primary)' }}
              />
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleSend}
                disabled={!inputText.trim()}
                className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 disabled:opacity-40"
                style={{ backgroundColor: inputText.trim() ? 'var(--brand-cyan)' : 'var(--app-bg)' }}
              >
                <Send size={18} className={inputText.trim() ? 'text-white' : ''} style={{ color: inputText.trim() ? 'white' : 'var(--text-muted)' }} />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
