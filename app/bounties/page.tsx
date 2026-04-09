"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Sidebar } from "@/components/layout/Sidebar";
import { cn } from "@/lib/utils";
import { Briefcase, Search, ShieldCheck, ChevronRight, Coins, Plus, Loader2, X } from "lucide-react";
import { getBounties, createBounty } from "@/lib/actions";

export default function BountiesPage() {
  const [bounties, setBounties] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("open");
  const [searchQuery, setSearchQuery] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ org_name: "", title: "", description: "", reward: "", tags: "" });

  async function fetchLiveBounties() {
    setIsLoading(true);
    const data = await getBounties();
    setBounties(data);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchLiveBounties();
  }, []);

  const handleCreateBounty = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const tagsArray = formData.tags.split(",").map(tag => tag.trim()).filter(tag => tag !== "");
      await createBounty({
        org_name: formData.org_name,
        title: formData.title,
        description: formData.description,
        reward: formData.reward,
        tags: tagsArray
      });
      setFormData({ org_name: "", title: "", description: "", reward: "", tags: "" });
      setIsModalOpen(false);
      await fetchLiveBounties();
    } catch (error) {
      console.error("Failed to post bounty:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredBounties = bounties.filter(bounty => {
    const matchesTab = activeTab === "all" ? true : bounty.status === activeTab;
    const orgStr = bounty.org_name || "";
    const titleStr = bounty.title || "";
    return matchesTab && (titleStr.toLowerCase().includes(searchQuery.toLowerCase()) || orgStr.toLowerCase().includes(searchQuery.toLowerCase()));
  });

  return (
    <>
      <Navbar />
      <Sidebar />
      <main className="max-w-6xl mx-auto px-6 pt-24 pb-24 relative md:pl-[280px]">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <h1 className="font-display font-extrabold text-3xl md:text-4xl text-white mb-2">Bounty Board</h1>
            <p className="font-body text-slate-muted text-base max-w-xl">
              Find high-signal work, ship code, and build your on-chain reputation.
            </p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-primary font-display font-bold text-white text-sm hover:bg-blue-light transition-colors shadow-glow-sm flex-shrink-0"
          >
            <Plus size={18} /> Post a Bounty
          </button>
        </div>

        <div className="proofd-card p-4 bg-surface-1 mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-muted" size={18} />
            <input 
              type="text" placeholder="Search by title or organization..." 
              value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              data-gramm="false"
              spellCheck={false}
              autoComplete="off"
              className="w-full bg-surface-3 border border-navy-light rounded-xl pl-11 pr-4 py-3 font-body text-sm text-white focus:outline-none focus:border-blue-primary transition-colors placeholder:text-slate-muted"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto hidden-scrollbar flex-shrink-0">
            {["open", "in-progress", "completed", "all"].map((tab) => (
              <button 
                key={tab} onClick={() => setActiveTab(tab)}
                className={cn("px-5 py-3 rounded-xl font-display font-bold text-sm capitalize transition-colors whitespace-nowrap border", activeTab === tab ? "bg-blue-primary/10 border-blue-primary/30 text-blue-light" : "bg-surface-2 border-navy-light text-slate-muted hover:text-white hover:bg-surface-3")}
              >
                {tab.replace("-", " ")}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4 animate-fade-in">
          {isLoading ? (
            <div className="proofd-card p-12 flex flex-col items-center justify-center text-center">
               <Loader2 size={40} className="text-blue-primary animate-spin mb-4" />
               <p className="font-body text-slate-muted">Syncing smart contracts...</p>
            </div>
          ) : filteredBounties.length === 0 ? (
             <div className="proofd-card p-12 flex flex-col items-center justify-center text-center">
               <Briefcase size={40} className="text-slate-muted mb-4" />
               <h3 className="font-display font-bold text-xl text-white mb-2">No active bounties</h3>
               <p className="font-body text-slate-muted">Click the 'Post a Bounty' button above to create one!</p>
             </div>
          ) : (
            filteredBounties.map((bounty) => (
              <div key={bounty.id} className="proofd-card bg-surface-1 hover:bg-surface-2 transition-all hover:border-navy-light/80 border border-navy-light overflow-hidden group flex flex-col sm:flex-row">
                <div className="p-6 flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-mono-brand text-xs text-slate-brand uppercase tracking-widest">{bounty.org_name}</span>
                    {bounty.escrow_locked && bounty.status === "open" && (
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 font-mono-brand text-[10px] text-emerald-400 uppercase tracking-widest">
                        <ShieldCheck size={12} /> Escrow Funded
                      </span>
                    )}
                  </div>
                  <h3 className="font-display font-bold text-xl text-white mb-2 group-hover:text-blue-light transition-colors">{bounty.title}</h3>
                  <p className="font-body text-sm text-slate-300 line-clamp-2 mb-4 max-w-3xl">{bounty.description}</p>
                  <div className="flex flex-wrap items-center gap-2">
                    {(bounty.tags || []).map((tag: string, idx: number) => (
                      <span key={idx} className="px-3 py-1 rounded-md bg-surface-3 border border-navy-light font-mono-brand text-xs text-slate-300">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="sm:w-64 bg-surface-3/30 border-t sm:border-t-0 sm:border-l border-navy-light p-6 flex flex-col justify-between">
                  <div className="font-mono-brand font-bold text-lg text-emerald-400 mb-1 flex items-center sm:justify-end gap-1.5">
                    <Coins size={16} /> {bounty.reward}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {/* THE MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-navy-900/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg proofd-card bg-surface-1 border border-navy-light p-6 md:p-8 relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-slate-muted hover:text-white transition-colors">
              <X size={20} />
            </button>
            <h2 className="font-display font-bold text-2xl text-white mb-6">Create a Bounty</h2>
            <form onSubmit={handleCreateBounty} className="space-y-4">
              <div>
                <label className="block font-mono-brand text-xs text-slate-muted mb-1.5 uppercase">Organization Name</label>
                <input required type="text" placeholder="e.g. Uniswap Foundation" value={formData.org_name} onChange={(e) => setFormData({...formData, org_name: e.target.value})} data-gramm="false" spellCheck={false} autoComplete="off" className="w-full bg-surface-3 border border-navy-light rounded-xl px-4 py-3 font-body text-sm text-white focus:outline-none focus:border-blue-primary transition-colors" />
              </div>
              <div>
                <label className="block font-mono-brand text-xs text-slate-muted mb-1.5 uppercase">Bounty Title</label>
                <input required type="text" placeholder="e.g. Build a dynamic fee hook" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} data-gramm="false" spellCheck={false} autoComplete="off" className="w-full bg-surface-3 border border-navy-light rounded-xl px-4 py-3 font-body text-sm text-white focus:outline-none focus:border-blue-primary transition-colors" />
              </div>
              <div>
                <label className="block font-mono-brand text-xs text-slate-muted mb-1.5 uppercase">Reward</label>
                <input required type="text" placeholder="e.g. 5,000 USDC" value={formData.reward} onChange={(e) => setFormData({...formData, reward: e.target.value})} data-gramm="false" spellCheck={false} autoComplete="off" className="w-full bg-surface-3 border border-navy-light rounded-xl px-4 py-3 font-body text-sm text-white focus:outline-none focus:border-blue-primary transition-colors" />
              </div>
              <div>
                <label className="block font-mono-brand text-xs text-slate-muted mb-1.5 uppercase">Tags (comma separated)</label>
                <input type="text" placeholder="e.g. Solidity, React" value={formData.tags} onChange={(e) => setFormData({...formData, tags: e.target.value})} data-gramm="false" spellCheck={false} autoComplete="off" className="w-full bg-surface-3 border border-navy-light rounded-xl px-4 py-3 font-body text-sm text-white focus:outline-none focus:border-blue-primary transition-colors" />
              </div>
              <div>
                <label className="block font-mono-brand text-xs text-slate-muted mb-1.5 uppercase">Description</label>
                <textarea required placeholder="Requirements..." value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} data-gramm="false" spellCheck={false} autoComplete="off" className="w-full bg-surface-3 border border-navy-light rounded-xl px-4 py-3 font-body text-sm text-white focus:outline-none focus:border-blue-primary transition-colors resize-none min-h-[100px]" />
              </div>
              <div className="pt-4">
                <button type="submit" disabled={isSubmitting} className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-blue-primary font-display font-bold text-white text-sm hover:bg-blue-light transition-colors shadow-glow-sm disabled:opacity-50 disabled:cursor-not-allowed">
                  {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : "Post Bounty"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
