"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { usePrivy } from "@privy-io/react-auth";
import { Bell, Search, Menu, X, LogOut } from "lucide-react";
import { truncateAddress } from "@/lib/utils";

// Mock data for notifications
const MOCK_NOTIFICATIONS = [
  { id: 1, text: "0xAlex backed you with 500 $PROOF", time: "2h ago", unread: true },
  { id: 2, text: "Bounty 'Uniswap v4 Hook' approved!", time: "1d ago", unread: false },
];

export function Navbar() {
  const { ready, authenticated, user, login, logout } = usePrivy();
  const router = useRouter();
  const pathname = usePathname();
  
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const unreadCount = MOCK_NOTIFICATIONS.filter(n => n.unread).length;
  const walletAddress = user?.wallet?.address;

  // THE BOUNCER: Auto-redirect to landing page if disconnected on a protected route
  useEffect(() => {
    const isProtectedPage = pathname !== "/" && pathname !== "/login";
    
    if (ready && !authenticated && isProtectedPage) {
      router.push("/");
    }
  }, [ready, authenticated, pathname, router]);

  return (
    <nav className="fixed top-0 w-full z-50 bg-navy/80 backdrop-blur-md border-b border-navy-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        
        {/* Left: Logo & Search */}
        <div className="flex items-center gap-6 flex-1">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 rounded-lg bg-blue-gradient flex items-center justify-center font-display font-bold text-white shadow-glow-sm">P</div>
            <span className="font-display font-bold text-xl tracking-tight text-white hidden sm:block">Proofd</span>
          </Link>

          {/* Desktop Search */}
          <div className="hidden md:flex items-center flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-muted" size={16} />
            <input 
              type="text" 
              placeholder="Search builders, bounties, or skills..." 
              className="w-full bg-surface-2 border border-navy-light rounded-xl pl-9 pr-4 py-2 font-body text-sm text-white focus:outline-none focus:border-blue-primary transition-colors"
            />
          </div>
        </div>

        {/* Right: Auth & Actions */}
        <div className="flex items-center gap-3">
          {ready && authenticated ? (
            <div className="flex items-center gap-2 sm:gap-4">
              
              {/* Notification Bell */}
              <div className="relative">
                <button 
                  onClick={() => setIsNotifOpen(!isNotifOpen)}
                  className="p-2 rounded-xl text-slate-muted hover:text-white hover:bg-surface-2 transition-all relative"
                >
                  <Bell size={20} />
                  {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
                  )}
                </button>

                {/* Dropdown */}
                {isNotifOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-surface-2 border border-navy-light rounded-2xl shadow-card overflow-hidden animate-fade-in">
                    <div className="p-4 border-b border-navy-light bg-surface-1 flex items-center justify-between">
                      <h3 className="font-display font-bold text-white">Notifications</h3>
                      <button className="font-body text-xs text-blue-light hover:underline">Mark all read</button>
                    </div>
                    <div className="max-h-[300px] overflow-y-auto">
                      {MOCK_NOTIFICATIONS.map((n) => (
                        <div key={n.id} className={`p-4 border-b border-navy-light/50 hover:bg-surface-3 transition-colors cursor-pointer ${n.unread ? 'bg-blue-primary/5' : ''}`}>
                          <p className="font-body text-sm text-slate-200">{n.text}</p>
                          <p className="font-mono-brand text-[10px] text-slate-muted mt-2">{n.time}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Profile / Wallet Pill */}
              <Link 
                href={`/profile/${walletAddress || 'me'}`}
                className="hidden sm:flex items-center gap-2 pl-2 pr-4 py-1.5 rounded-full bg-surface-2 border border-navy-light hover:border-blue-primary/50 transition-all group"
              >
                <div className="w-6 h-6 rounded-full bg-blue-gradient flex items-center justify-center font-display font-bold text-xs text-white">
                  {walletAddress ? walletAddress.slice(2,3).toUpperCase() : 'U'}
                </div>
                <span className="font-mono-brand font-bold text-sm text-white group-hover:text-blue-light transition-colors">
                  {walletAddress ? truncateAddress(walletAddress) : "Profile"}
                </span>
              </Link>

              {/* Logout Button */}
              <button 
                onClick={logout}
                className="hidden sm:flex p-2 rounded-xl text-slate-muted hover:text-red-400 hover:bg-surface-2 transition-all"
                title="Log out"
              >
                <LogOut size={18} />
              </button>

              {/* Mobile Menu Toggle */}
              <button 
                className="sm:hidden p-2 text-slate-muted hover:text-white"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          ) : (
            <button 
              onClick={login}
              className="px-5 py-2 rounded-xl bg-blue-primary hover:bg-blue-light font-display font-bold text-sm text-white shadow-glow-sm transition-all active:scale-95"
            >
              Connect
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="sm:hidden absolute top-16 left-0 w-full bg-surface-1 border-b border-navy-light p-4 animate-fade-in flex flex-col gap-4">
           {ready && authenticated && (
             <Link 
                href={`/profile/${walletAddress || 'me'}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 p-3 rounded-xl bg-surface-2 border border-navy-light"
              >
                <div className="w-8 h-8 rounded-full bg-blue-gradient flex items-center justify-center font-display font-bold text-sm text-white">
                  {walletAddress ? walletAddress.slice(2,3).toUpperCase() : 'U'}
                </div>
                <div>
                  <div className="font-display font-bold text-white text-sm">My Profile</div>
                  <div className="font-mono-brand text-xs text-slate-muted">{walletAddress ? truncateAddress(walletAddress) : "View details"}</div>
                </div>
              </Link>
           )}
           <div className="relative">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-muted" size={16} />
             <input type="text" placeholder="Search..." className="w-full bg-surface-2 border border-navy-light rounded-xl pl-9 pr-4 py-2.5 font-body text-sm text-white focus:outline-none focus:border-blue-primary" />
           </div>
           
           {ready && authenticated && (
             <button 
                onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                className="flex items-center justify-center gap-2 p-3 rounded-xl bg-surface-2 text-red-400 font-display font-bold text-sm border border-red-500/20"
              >
                <LogOut size={16} /> Log Out
              </button>
           )}
        </div>
      )}
    </nav>
  );
}
