import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';

export type AppMode = 'MARKETING' | 'DAY_PASS' | 'GUEST' | 'ADMIN';

export interface GuestInfo {
  roomNumber: string;
  guestName: string;
  checkInDate: string;
  checkOutDate: string;
  roomTypeId: string;
}

export interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  zone: string;
  timestamp: string;
}

export interface WalletState {
  balance: number;
  transactions: Transaction[];
  passId: string;
  issuedAt: string;
}

export interface AdminUser {
  id: string;
  name: string;
  role: 'manager' | 'receptionist' | 'supervisor';
  email: string;
}

interface AuthContextType {
  mode: AppMode;
  guest: GuestInfo | null;
  wallet: WalletState | null;
  admin: AdminUser | null;
  login: (roomNumber: string, pin: string) => { success: boolean; error?: string };
  loginAdmin: (email: string, password: string) => { success: boolean; error?: string };
  activateDayPass: () => void;
  exitDayPass: () => void;
  logout: () => void;
  logoutAdmin: () => void;
  addTransaction: (tx: Omit<Transaction, 'id' | 'timestamp'>) => void;
  topUp: (amount: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_CREDENTIALS: Record<string, { password: string; admin: AdminUser }> = {
  'manager@seashell.kw': {
    password: 'admin2026',
    admin: { id: 'adm-1', name: 'Mr. Khalid Al-Fahad', role: 'manager', email: 'manager@seashell.kw' },
  },
  'reception@seashell.kw': {
    password: 'frontdesk2026',
    admin: { id: 'adm-2', name: 'Ms. Noor Ibrahim', role: 'receptionist', email: 'reception@seashell.kw' },
  },
  'supervisor@seashell.kw': {
    password: 'supervisor2026',
    admin: { id: 'adm-3', name: 'Mr. Omar Hassan', role: 'supervisor', email: 'supervisor@seashell.kw' },
  },
};

const DEMO_CREDENTIALS: Record<string, { pin: string; guest: GuestInfo }> = {
  '304': {
    pin: '1234',
    guest: {
      roomNumber: '304',
      guestName: 'Mr. Abdullah Al-Sabah',
      checkInDate: '2026-06-22',
      checkOutDate: '2026-06-28',
      roomTypeId: 'ch-2br-ff',
    },
  },
  '512': {
    pin: '5678',
    guest: {
      roomNumber: '512',
      guestName: 'Ms. Fatima Hassan',
      checkInDate: '2026-06-20',
      checkOutDate: '2026-06-27',
      roomTypeId: 'rm-pre',
    },
  },
};

function generatePassId(): string {
  return 'SSP-' + Math.random().toString(36).substring(2, 6).toUpperCase() + '-' + Math.random().toString(36).substring(2, 6).toUpperCase();
}

function generateBarcodeLines(): number[] {
  const lines: number[] = [];
  for (let i = 0; i < 60; i++) {
    lines.push(Math.random() > 0.3 ? Math.random() * 3 + 1 : Math.random() * 1 + 0.5);
  }
  return lines;
}

export { generateBarcodeLines };

export function AuthProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<AppMode>(() => {
    const saved = localStorage.getItem('seashell-mode') as AppMode | null;
    return saved || 'MARKETING';
  });
  const [guest, setGuest] = useState<GuestInfo | null>(() => {
    const saved = localStorage.getItem('seashell-guest');
    return saved ? JSON.parse(saved) : null;
  });
  const [wallet, setWallet] = useState<WalletState | null>(() => {
    const saved = localStorage.getItem('seashell-wallet');
    return saved ? JSON.parse(saved) : null;
  });
  const [admin, setAdmin] = useState<AdminUser | null>(() => {
    const saved = localStorage.getItem('seashell-admin');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    localStorage.setItem('seashell-mode', mode);
    if (guest) localStorage.setItem('seashell-guest', JSON.stringify(guest));
    else localStorage.removeItem('seashell-guest');
    if (wallet) localStorage.setItem('seashell-wallet', JSON.stringify(wallet));
    else localStorage.removeItem('seashell-wallet');
    if (admin) localStorage.setItem('seashell-admin', JSON.stringify(admin));
    else localStorage.removeItem('seashell-admin');
  }, [mode, guest, wallet, admin]);

  const login = (roomNumber: string, pin: string): { success: boolean; error?: string } => {
    const cleanRoom = roomNumber.trim();
    const cleanPin = pin.trim();
    if (!cleanRoom || !cleanPin) return { success: false, error: 'Please enter room number and PIN' };
    const credential = DEMO_CREDENTIALS[cleanRoom];
    if (!credential) return { success: false, error: 'Room not found. Try 304 or 512' };
    if (credential.pin !== cleanPin) return { success: false, error: 'Invalid PIN' };
    setGuest(credential.guest);
    setMode('GUEST');
    return { success: true };
  };

  const activateDayPass = useCallback(() => {
    const now = new Date().toISOString();
    setWallet({
      balance: 15.000,
      transactions: [
        {
          id: 'tx-' + Math.random().toString(36).substring(2, 10),
          type: 'credit',
          amount: 15.000,
          description: 'Day Pass Activation — Initial Balance',
          zone: 'System',
          timestamp: now,
        },
      ],
      passId: generatePassId(),
      issuedAt: now,
    });
    setMode('DAY_PASS');
  }, []);

  const exitDayPass = useCallback(() => {
    setMode('MARKETING');
  }, []);

  const loginAdmin = (email: string, password: string): { success: boolean; error?: string } => {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !password) return { success: false, error: 'Please enter email and password' };
    const credential = ADMIN_CREDENTIALS[cleanEmail];
    if (!credential) return { success: false, error: 'Invalid admin credentials' };
    if (credential.password !== password) return { success: false, error: 'Invalid password' };
    setAdmin(credential.admin);
    setMode('ADMIN');
    return { success: true };
  };

  const logout = useCallback(() => {
    setMode('MARKETING');
    setGuest(null);
    setWallet(null);
    localStorage.removeItem('seashell-auth');
    localStorage.removeItem('seashell-guest');
    localStorage.removeItem('seashell-wallet');
    localStorage.removeItem('seashell-mode');
  }, []);

  const logoutAdmin = useCallback(() => {
    setMode('MARKETING');
    setAdmin(null);
    localStorage.removeItem('seashell-admin');
    localStorage.removeItem('seashell-mode');
  }, []);

  const addTransaction = useCallback((tx: Omit<Transaction, 'id' | 'timestamp'>) => {
    setWallet(prev => {
      if (!prev) return null;
      const newBalance = tx.type === 'credit' ? prev.balance + tx.amount : prev.balance - tx.amount;
      const newTx: Transaction = {
        ...tx,
        id: 'tx-' + Math.random().toString(36).substring(2, 10),
        timestamp: new Date().toISOString(),
      };
      return {
        ...prev,
        balance: Math.max(0, Number(newBalance.toFixed(3))),
        transactions: [newTx, ...prev.transactions],
      };
    });
  }, []);

  const topUp = useCallback((amount: number) => {
    addTransaction({
      type: 'credit',
      amount,
      description: `Top-up — ${amount.toFixed(3)} KD`,
      zone: 'Payment Gateway',
    });
  }, [addTransaction]);

  return (
    <AuthContext.Provider value={{ mode, guest, wallet, admin, login, loginAdmin, activateDayPass, exitDayPass, logout, logoutAdmin, addTransaction, topUp }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
