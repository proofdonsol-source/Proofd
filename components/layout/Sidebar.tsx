"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { usePrivy } from "@privy-io/react-auth"; // <-- Swap Wagmi for Privy
import { Home, Compass, User, Settings, Briefcase, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const pathname = usePathname();
  // Pull user data from Privy
  const { user, ready, authenticated } = usePrivy(); 
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Safely grab the wallet address (if they logged in via email, Privy auto-created one!)
  const address = user?.wallet?.address;

  const SIDEBAR_LINKS = [
    { name: "Feed", href: "/feed", icon: Home },
    { name: "Explore", href: "/explore", icon: Compass },
    { name: "Bounties", href: "/bounties", icon: Briefcase },
    // Dynamically route to their actual profile address
    { name: "Profile", href: `/profile/${address || "me"}`, icon: User },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <aside 
      className={cn(
        "fixed left-0 top-16 bottom-0 z-40 bg-surface-1 border-r border-navy-light transition-all duration-300 hidden md:flex flex-col",
        isCollapsed ? "w-[80px]" : "w-[280px]"
      )}
    >
      <div className="flex-1 py-8 px-4 flex flex-col gap-2 overflow-y-auto hidden-scrollbar">
        {SIDEBAR_LINKS.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href || pathname?.startsWith(`${link.href}/`);
          
          return (
            <Link 
              key={link.name} 
              href={link.href}
              className={cn(
                "flex items-center gap-4 px-4 py-3.5 rounded-xl font-display font-bold text-base transition-all group",
                isActive 
                  ? "bg-blue-primary/10 text-blue-light border border-blue-primary/20" 
                  : "text-slate-muted hover:text-white hover:bg-surface-2 border border-transparent"
              )}
            >
              <Icon size={20} className={cn("transition-colors flex-shrink-0", isActive ? "text-blue-light" : "text-slate-muted group-hover:text-white")} />
              {!isCollapsed && <span>{link.name}</span>}
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-navy-light mt-auto">
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex items-center justify-center w-full p-3 rounded-xl text-slate-muted hover:text-white hover:bg-surface-2 transition-all"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
    </aside>
  );
}
