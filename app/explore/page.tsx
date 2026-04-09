"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Sidebar } from "@/components/layout/Sidebar";
import { truncateAddress } from "@/lib/utils";
import { Search, Loader2, Sparkles, User, ShieldCheck } from "lucide-react";
import { getProfiles } from "@/lib/actions";

export default function ExplorePage() {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchLiveProfiles() {
      setIsLoading(true);
      const data = await getProfiles();
      setProfiles(data);
      setIsLoading(false);
    }
    fetchLiveProfiles();
  }, []);

  const filteredProfiles = profiles.filter(profile => {
    const handleStr = profile.handle || "";
    const ensStr = profile.ens || "";
    const addressStr = profile.address || "";
    
    return handleStr.toLowerCase().includes(searchQuery.toLowerCase()) || 
           ensStr.toLowerCase().includes(searchQuery.toLowerCase()) ||
           addressStr.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <>
      <Navbar />
      <Sidebar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-24 relative md:pl-[280px]">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <h1 className="font-display font-extrabold text-3xl md:text-4xl text-white mb-2">Explore Builders</h1>
            <p className="font-body text-slate-muted text-base max-w-xl">
              Discover top talent on the network. Search by handle, ENS, or wallet address to view verified on-chain credentials.
            </p>
          </div>
        </div>

        {/* --- SEARCH BAR --- */}
        <div className="proofd-card p-4 bg-surface-1 mb-8">
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-muted" size={18} />
            <input 
              type="text" 
              placeholder="Search builders..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface-3 border border-navy-light rounded-xl pl-11 pr-4 py-3 font-body text-sm text-white focus:outline-none focus:border-blue-primary transition-colors placeholder:text-slate-muted"
            />
          </div>
        </div>

        {/* --- BUILDERS GRID --- */}
        <div className="animate-fade-in">
          {isLoading ? (
            <div className="proofd-card p-12 flex flex-col items-center justify-center text-center w-full">
               <Loader2 size={40} className="text-blue-primary animate-spin mb-4" />
               <p className="font-body text-slate-muted">Indexing builder profiles from the network...</p>
            </div>
          ) : filteredProfiles.length === 0 ? (
             <div className="proofd-card p-12 flex flex-col items-center justify-center text-center w-full">
               <User size={40} className="text-slate-muted mb-4" />
               <h3 className="font-display font-bold text-xl text-white mb-2">No builders found</h3>
               <p className="font-body text-slate-muted">No one matches that search, or the network is empty.</p>
             </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProfiles.map((profile) => (
                <Link href={`/profile/${profile.address}`} key={profile.address}>
                  <div className="proofd-card bg-surface-1 hover:bg-surface-2 transition-all hover:border-blue-primary/50 border border-navy-light overflow-hidden group cursor-pointer p-6 h-full flex flex-col">
                    
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-16 h-16 rounded-2xl bg-surface-3 border border-navy-light flex items-center justify-center font-display font-bold text-white text-2xl group-hover:border-blue-primary transition-colors shadow-inner flex-shrink-0">
                        {profile.avatar_initial || profile.address.slice(2,3).toUpperCase()}
                      </div>
                      
                      <div className="flex-1 min-w-0 pt-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-display font-bold text-lg text-white truncate group-hover:text-blue-light transition-colors">
                            {profile.ens || truncateAddress(profile.address)}
                          </h3>
                          <ShieldCheck size={16} className="text-blue-primary flex-shrink-0" />
                        </div>
                        <p className="font-mono-brand text-sm text-slate-brand truncate">
                          {profile.handle}
                        </p>
                      </div>
                    </div>

                    <div className="mt-auto pt-6 border-t border-navy-light/50 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Sparkles size={14} className="text-emerald-400" />
                        <span className="font-mono-brand font-bold text-sm text-white">
                          New Builder
                        </span>
                      </div>
                      <span className="font-body text-xs text-slate-muted hover:text-white transition-colors">
                        View Profile →
                      </span>
                    </div>

                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

      </main>
      <Footer />
    </>
  );
}
