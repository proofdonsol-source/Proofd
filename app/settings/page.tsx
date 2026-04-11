"use client";

import { useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Sidebar } from "@/components/layout/Sidebar";
import { cn, truncateAddress } from "@/lib/utils";
import { User, Wallet, Bell, Github, Twitter, Mail, Shield, Check, LogOut } from "lucide-react";

export default function SettingsPage() {
  const { user, logout } = usePrivy();
  const [activeTab, setActiveTab] = useState("general");
  const [isSaved, setIsSaved] = useState(false);

  // Mock toggle states
  const [toggles, setToggles] = useState({
    emailNotifs: true,
    bountyAlerts: true,
    vouchAlerts: true,
    publicProfile: true,
    showENS: true,
  });

  const handleToggle = (key: keyof typeof toggles) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <>
      <Navbar />
      <Sidebar />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-24 relative md:pl-[280px]">
        
        {/* --- HEADER --- */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="font-display font-extrabold text-3xl md:text-4xl text-white mb-2">Settings</h1>
            <p className="font-body text-slate-muted text-base">
              Manage your identity, connected wallets, and preferences.
            </p>
          </div>
          <button 
            onClick={handleSave}
            className={cn(
              "flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-display font-bold text-sm transition-all shadow-glow-sm",
              isSaved 
                ? "bg-emerald-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.4)]" 
                : "bg-blue-primary text-white hover:bg-blue-light"
            )}
          >
            {isSaved ? <><Check size={16} /> Saved</> : "Save Changes"}
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          
          {/* --- SETTINGS SIDEBAR (TABS) --- */}
          <div className="w-full md:w-64 flex-shrink-0 flex md:flex-col gap-2 overflow-x-auto hidden-scrollbar pb-2 md:pb-0">
            <button 
              onClick={() => setActiveTab("general")}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl font-display font-bold text-sm transition-colors whitespace-nowrap",
                activeTab === "general" ? "bg-surface-2 text-white border border-navy-light" : "text-slate-muted hover:text-white hover:bg-surface-3"
              )}
            >
              <User size={18} className={activeTab === "general" ? "text-blue-light" : ""} /> General Profile
            </button>
            <button 
              onClick={() => setActiveTab("wallets")}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl font-display font-bold text-sm transition-colors whitespace-nowrap",
                activeTab === "wallets" ? "bg-surface-2 text-white border border-navy-light" : "text-slate-muted hover:text-white hover:bg-surface-3"
              )}
            >
              <Wallet size={18} className={activeTab === "wallets" ? "text-blue-light" : ""} /> Wallets & Web3
            </button>
            <button 
              onClick={() => setActiveTab("notifications")}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl font-display font-bold text-sm transition-colors whitespace-nowrap",
                activeTab === "notifications" ? "bg-surface-2 text-white border border-navy-light" : "text-slate-muted hover:text-white hover:bg-surface-3"
              )}
            >
              <Bell size={18} className={activeTab === "notifications" ? "text-blue-light" : ""} /> Notifications
            </button>
          </div>

          {/* --- SETTINGS CONTENT --- */}
          <div className="flex-1 space-y-6 animate-fade-in">

            {/* TAB: GENERAL */}
            {activeTab === "general" && (
              <>
                <div className="proofd-card bg-surface-1 overflow-hidden">
                  <div className="p-5 border-b border-navy-light">
                    <h3 className="font-display font-bold text-lg text-white">Connected Accounts</h3>
                  </div>
                  <div className="p-6 space-y-4">
                    
                    {/* GitHub Connection */}
                    <div className="flex items-center justify-between p-4 rounded-xl border border-navy-light bg-surface-3">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-surface-2 border border-navy-light flex items-center justify-center">
                          <Github size={20} className="text-white" />
                        </div>
                        <div>
                          <div className="font-display font-bold text-white text-sm">GitHub</div>
                          <div className="font-mono-brand text-xs text-slate-muted">Connected as @USER</div>
                        </div>
                      </div>
                      <button className="px-4 py-2 rounded-lg font-mono-brand text-xs text-slate-muted border border-navy-light hover:text-white hover:bg-surface-2 transition-colors">
                        Disconnect
                      </button>
                    </div>

                    {/* Email Connection */}
                    <div className="flex items-center justify-between p-4 rounded-xl border border-navy-light bg-surface-3">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-surface-2 border border-navy-light flex items-center justify-center">
                          <Mail size={20} className="text-white" />
                        </div>
                        <div>
                          <div className="font-display font-bold text-white text-sm">Email Address</div>
                          <div className="font-mono-brand text-xs text-slate-muted">user@gmail.com</div>
                        </div>
                      </div>
                      <span className="flex items-center gap-1 font-mono-brand text-[10px] text-emerald-400 uppercase tracking-widest px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/20">
                        <Check size={12} /> Verified
                      </span>
                    </div>

                    {/* X (Twitter) Connection */}
                    <div className="flex items-center justify-between p-4 rounded-xl border border-navy-light bg-surface-3">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-surface-2 border border-navy-light flex items-center justify-center">
                          <Twitter size={20} className="text-white" />
                        </div>
                        <div>
                          <div className="font-display font-bold text-white text-sm">X (Twitter)</div>
                          <div className="font-mono-brand text-xs text-slate-muted">Not connected</div>
                        </div>
                      </div>
                      <button className="px-4 py-2 rounded-lg font-mono-brand font-bold text-xs bg-blue-primary/10 text-blue-light border border-blue-primary/30 hover:bg-blue-primary hover:text-white transition-colors">
                        Connect X
                      </button>
                    </div>
                  </div>
                </div>

                <div className="proofd-card bg-surface-1 overflow-hidden">
                  <div className="p-5 border-b border-navy-light">
                    <h3 className="font-display font-bold text-lg text-white">Privacy Preferences</h3>
                  </div>
                  <div className="p-6 space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-display font-bold text-white text-sm mb-1">Public Profile</div>
                        <div className="font-body text-xs text-slate-muted max-w-sm">Allow DAOs and recruiters to find your profile on the Explore page.</div>
                      </div>
                      <button 
                        onClick={() => handleToggle('publicProfile')}
                        className={cn("w-12 h-6 rounded-full transition-colors relative", toggles.publicProfile ? "bg-blue-primary" : "bg-surface-3 border border-navy-light")}
                      >
                        <div className={cn("absolute top-1 w-4 h-4 rounded-full bg-white transition-all", toggles.publicProfile ? "right-1" : "left-1")} />
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* TAB: WALLETS */}
            {activeTab === "wallets" && (
              <>
                <div className="proofd-card bg-surface-1 overflow-hidden">
                  <div className="p-5 border-b border-navy-light flex items-center justify-between">
                    <h3 className="font-display font-bold text-lg text-white">Linked Wallets</h3>
                    <button className="font-mono-brand text-xs text-blue-light hover:underline">Link New Wallet</button>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between p-4 rounded-xl border border-blue-primary/30 bg-blue-primary/5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-gradient flex items-center justify-center border-2 border-surface-1">
                          <Wallet size={18} className="text-white" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <div className="font-mono-brand font-bold text-white text-sm">
                              {user?.wallet?.address ? truncateAddress(user.wallet.address) : "0x950a...d175"}
                            </div>
                            <span className="px-2 py-0.5 rounded text-[9px] uppercase tracking-widest font-mono-brand bg-blue-primary text-white">Primary</span>
                          </div>
                          <div className="font-mono-brand text-xs text-slate-muted mt-1">Connected via Privy</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="proofd-card bg-surface-1 overflow-hidden">
                  <div className="p-5 border-b border-navy-light">
                    <h3 className="font-display font-bold text-lg text-white">Identity Integrations</h3>
                  </div>
                  <div className="p-6 space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-display font-bold text-white text-sm mb-1">Prefer ENS over Address</div>
                        <div className="font-body text-xs text-slate-muted max-w-sm">If your wallet holds an ENS name, display it globally instead of your raw hex address.</div>
                      </div>
                      <button 
                        onClick={() => handleToggle('showENS')}
                        className={cn("w-12 h-6 rounded-full transition-colors relative", toggles.showENS ? "bg-blue-primary" : "bg-surface-3 border border-navy-light")}
                      >
                        <div className={cn("absolute top-1 w-4 h-4 rounded-full bg-white transition-all", toggles.showENS ? "right-1" : "left-1")} />
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* TAB: NOTIFICATIONS */}
            {activeTab === "notifications" && (
              <div className="proofd-card bg-surface-1 overflow-hidden">
                <div className="p-5 border-b border-navy-light">
                  <h3 className="font-display font-bold text-lg text-white">Email Notifications</h3>
                </div>
                <div className="p-6 space-y-6 divide-y divide-navy-light/50">
                  
                  <div className="flex items-center justify-between pb-6">
                    <div>
                      <div className="font-display font-bold text-white text-sm mb-1">New Bounty Alerts</div>
                      <div className="font-body text-xs text-slate-muted max-w-sm">Get notified when a DAO posts a bounty that matches your connected GitHub skills.</div>
                    </div>
                    <button 
                      onClick={() => handleToggle('bountyAlerts')}
                      className={cn("w-12 h-6 rounded-full transition-colors relative flex-shrink-0", toggles.bountyAlerts ? "bg-blue-primary" : "bg-surface-3 border border-navy-light")}
                    >
                      <div className={cn("absolute top-1 w-4 h-4 rounded-full bg-white transition-all", toggles.bountyAlerts ? "right-1" : "left-1")} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-6 pb-6">
                    <div>
                      <div className="font-display font-bold text-white text-sm mb-1">Staking & Vouch Alerts</div>
                      <div className="font-body text-xs text-slate-muted max-w-sm">Get notified when someone stakes $PROOF on your profile or vouches for your work.</div>
                    </div>
                    <button 
                      onClick={() => handleToggle('vouchAlerts')}
                      className={cn("w-12 h-6 rounded-full transition-colors relative flex-shrink-0", toggles.vouchAlerts ? "bg-blue-primary" : "bg-surface-3 border border-navy-light")}
                    >
                      <div className={cn("absolute top-1 w-4 h-4 rounded-full bg-white transition-all", toggles.vouchAlerts ? "right-1" : "left-1")} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-6">
                    <div>
                      <div className="font-display font-bold text-white text-sm mb-1">Proofd Newsletter</div>
                      <div className="font-body text-xs text-slate-muted max-w-sm">Weekly updates on protocol governance, top builders, and ecosystem news.</div>
                    </div>
                    <button 
                      onClick={() => handleToggle('emailNotifs')}
                      className={cn("w-12 h-6 rounded-full transition-colors relative flex-shrink-0", toggles.emailNotifs ? "bg-blue-primary" : "bg-surface-3 border border-navy-light")}
                    >
                      <div className={cn("absolute top-1 w-4 h-4 rounded-full bg-white transition-all", toggles.emailNotifs ? "right-1" : "left-1")} />
                    </button>
                  </div>

                </div>
              </div>
            )}

            {/* DANGER ZONE (Always visible at the bottom of settings) */}
            <div className="mt-12 pt-8 border-t border-red-500/20">
              <h3 className="font-mono-brand text-xs text-red-500 uppercase tracking-widest mb-4">Danger Zone</h3>
              <div className="proofd-card bg-red-500/5 border-red-500/20 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="font-display font-bold text-white text-sm mb-1">Sign Out</div>
                  <div className="font-body text-xs text-slate-muted max-w-sm">Securely disconnect your wallet and end your current session.</div>
                </div>
                <button 
                  onClick={logout}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-display font-bold text-sm bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white border border-red-500/20 hover:border-red-500 transition-all whitespace-nowrap"
                >
                  <LogOut size={16} /> Sign Out
                </button>
              </div>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
