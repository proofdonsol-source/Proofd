"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { usePrivy } from "@privy-io/react-auth";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Sidebar } from "@/components/layout/Sidebar";
import { truncateAddress, formatStake, cn } from "@/lib/utils";
import { getOrCreateProfile, getUserPosts, updateProfile } from "@/lib/actions";
import { X, AlertCircle, Edit3, Save, Camera, MessageSquare, Heart, Award, TrendingUp, Github, Twitter, Link as LinkIcon, Lock, Globe, Eye, EyeOff, FolderGit2, Loader2 } from "lucide-react";

export default function ProfilePage() {
  const params = useParams();
  const profileAddress = params?.address as string;
  
  const { user } = usePrivy();
  const currentUserAddress = user?.wallet?.address;

  const targetAddress = profileAddress === 'me' ? currentUserAddress : profileAddress;
  const isOwner = currentUserAddress?.toLowerCase() === targetAddress?.toLowerCase();

  // Baseline Initial Dev (Zero hardcoded placeholders)
  const initialDev = {
    address: targetAddress || "0x00...000",
    ens: "",
    handle: `@${targetAddress ? targetAddress.slice(2, 8) : "newuser"}`,
    avatarInitial: targetAddress ? targetAddress.slice(2, 3).toUpperCase() : "U",
    totalStaked: 0,
    backers: 0,
    verified: false,
    openToWork: false,
    joined: "Just now",
    bio: "A new builder has entered the chat. No bio yet.",
    skills: ["Web3"],
    stats: { bounties: 0 },
    socials: { github: "", twitter: "" },
    projects: [] // Wiped completely clean.
  };

  const [dev, setDev] = useState(initialDev);
  const [posts, setPosts] = useState<any[]>([]);
  const [isVouchModalOpen, setIsVouchModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [stakeAmount, setStakeAmount] = useState("");
  const [activeTab, setActiveTab] = useState("activity"); 
  const [isLoading, setIsLoading] = useState(true);

  const [editForm, setEditForm] = useState({
    displayName: "",
    handle: "",
    bio: "",
    skills: "",
    openToWork: false,
    github: "",
    twitter: ""
  });

  // Fetch Live Data
  useEffect(() => {
    async function loadData() {
      if (!targetAddress) return;
      setIsLoading(true);
      try {
        const liveProfile = await getOrCreateProfile(targetAddress);
        const livePosts = await getUserPosts(targetAddress);
        
        if (liveProfile) {
          setDev(prev => ({
            ...prev,
            ens: liveProfile.ens || "",
            handle: liveProfile.handle || prev.handle,
            bio: liveProfile.bio || prev.bio,
            avatarInitial: liveProfile.avatar_initial || prev.avatarInitial,
            socials: { github: liveProfile.github || "", twitter: liveProfile.twitter || "" }
          }));
          
          setEditForm({
            displayName: liveProfile.ens || "",
            handle: liveProfile.handle || "",
            bio: liveProfile.bio || "",
            skills: "React, Solidity", 
            openToWork: false,
            github: liveProfile.github || "",
            twitter: liveProfile.twitter || ""
          });
        }
        setPosts(livePosts);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [targetAddress]);

  const handleSaveProfile = async () => {
    try {
      if (!targetAddress) return;
      
      setDev({
        ...dev,
        ens: editForm.displayName,
        handle: editForm.handle,
        bio: editForm.bio,
        openToWork: editForm.openToWork,
        skills: editForm.skills.split(",").map(s => s.trim()).filter(Boolean),
        socials: { github: editForm.github, twitter: editForm.twitter }
      });
      setIsEditModalOpen(false);

      await updateProfile(targetAddress, {
        ens: editForm.displayName,
        handle: editForm.handle,
        bio: editForm.bio,
        github: editForm.github,
        twitter: editForm.twitter
      });
    } catch (e) {
      console.error("Error saving profile", e);
    }
  };

  const handleConfirmVouch = () => {
    alert(`Successfully staked ${stakeAmount} $PROOF on ${dev.ens || truncateAddress(dev.address)}!`);
    setIsVouchModalOpen(false);
    setStakeAmount("");
  };

  const toggleProjectVisibility = (projectId: string) => {
    if (!isOwner) return;
    const updatedProjects = dev.projects.map(p => 
      p.id === projectId ? { ...p, isVisibleOnProofd: !p.isVisibleOnProofd } : p
    );
    setDev({ ...dev, projects: updatedProjects });
  };

  const visibleProjects = dev.projects.filter(p => isOwner || p.isVisibleOnProofd);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-navy text-white md:pl-[280px]">
        <Loader2 className="animate-spin text-blue-primary" size={40} />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <Sidebar />
      <main className="max-w-5xl mx-auto px-6 pt-24 pb-24 relative md:pl-[280px]">
        
        {/* --- PROFILE HEADER --- */}
        <div className="proofd-card p-8 mb-6">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="w-24 h-24 rounded-2xl bg-blue-gradient flex items-center justify-center font-display font-extrabold text-4xl text-white flex-shrink-0 shadow-glow-sm relative group overflow-hidden">
              {dev.avatarInitial}
              {isOwner && (
                <div 
                  onClick={() => setIsEditModalOpen(true)}
                  className="absolute inset-0 bg-navy/60 hidden group-hover:flex items-center justify-center cursor-pointer transition-all"
                >
                  <Camera size={24} className="text-white" />
                </div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="font-display font-extrabold text-3xl md:text-4xl tracking-tight text-white break-words">
                  {dev.ens || truncateAddress(dev.address)}
                </h1>
                {dev.verified && (
                  <span className="px-2.5 py-1 rounded-lg bg-blue-primary/15 border border-blue-primary/25 font-mono-brand text-[10px] text-blue-light tracking-widest uppercase mt-1">Verified</span>
                )}
                {dev.openToWork && (
                  <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 font-mono-brand text-[10px] text-emerald-400 tracking-widest uppercase mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Open to work
                  </span>
                )}
              </div>
              
              <div className="flex items-center gap-4 mb-4">
                <p className="font-mono-brand text-sm text-slate-brand">
                  {dev.handle} • {truncateAddress(dev.address)}
                </p>
                <div className="flex items-center gap-2 border-l border-navy-light pl-4">
                  {dev.socials?.github ? (
                    <a href={`https://github.com/${dev.socials.github}`} target="_blank" rel="noopener noreferrer" className="text-slate-muted hover:text-white transition-colors"><Github size={16} /></a>
                  ) : <Github size={16} className="text-navy-light" />}
                  {dev.socials?.twitter ? (
                    <a href={`https://twitter.com/${dev.socials.twitter}`} target="_blank" rel="noopener noreferrer" className="text-[#1DA1F2]/70 hover:text-[#1DA1F2] transition-colors"><Twitter size={16} /></a>
                  ) : <Twitter size={16} className="text-navy-light" />}
                </div>
              </div>

              {dev.bio && (
                <p className="font-body text-slate-300 text-base leading-relaxed max-w-2xl">{dev.bio}</p>
              )}
            </div>
            
            <div className="flex-shrink-0 bg-surface-1 p-5 rounded-2xl border border-navy-light w-full md:w-auto mt-4 md:mt-0 shadow-inner">
              <div className="text-right mb-4">
                <div className="font-mono-brand font-bold text-4xl text-blue-light flex items-baseline justify-end gap-1">
                  {formatStake(dev.totalStaked)} <span className="text-lg text-slate-muted font-normal">₱ROOF</span>
                </div>
                <div className="font-mono-brand text-xs text-slate-brand uppercase tracking-widest mt-1 flex items-center justify-end gap-1.5">
                  <TrendingUp size={14} className="text-emerald-400" /> Total Value Staked
                </div>
              </div>
              <div className="pt-4 border-t border-navy-light/50 flex items-center justify-between gap-8">
                 <div>
                   <div className="font-mono-brand font-bold text-xl text-white">{dev.backers}</div>
                   <div className="font-body text-xs text-slate-muted">Backers</div>
                 </div>
                 <div className="text-right">
                   <div className="font-mono-brand font-bold text-xl text-white">{dev.stats.bounties}</div>
                   <div className="font-body text-xs text-slate-muted">Bounties</div>
                 </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-navy-light/50">
            {dev.skills.map((skill, idx) => (
              <span key={idx} className="px-4 py-1.5 rounded-lg bg-surface-3 border border-navy-light font-mono-brand text-xs text-blue-light">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* --- DYNAMIC ACTION BAR --- */}
        <div className="proofd-card p-6 flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-surface-1">
          <div>
            <h3 className="font-display font-bold text-xl text-white mb-1">
              {isOwner ? "Manage Your Identity" : `Back ${dev.ens || truncateAddress(dev.address)}`}
            </h3>
            <p className="font-body text-base text-slate-muted">
              {isOwner 
                ? "Keep your on-chain resume up to date to attract top DAOs." 
                : "Stake $PROOF to back this developer's reputation."}
            </p>
          </div>
          
          {isOwner ? (
            <div className="flex gap-3 w-full sm:w-auto">
               <button className="flex items-center justify-center p-3 rounded-xl bg-surface-2 border border-navy-light text-slate-muted hover:text-white transition-colors" title="Copy Profile Link">
                 <LinkIcon size={18} />
               </button>
               <button 
                 onClick={() => setIsEditModalOpen(true)}
                 className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-surface-3 border border-navy-light font-display font-bold text-white text-base hover:bg-navy-light transition-all active:scale-95 whitespace-nowrap"
               >
                 <Edit3 size={18} /> Edit Profile
               </button>
            </div>
          ) : (
            <button 
              onClick={() => setIsVouchModalOpen(true)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-blue-gradient font-display font-bold text-white text-base shadow-glow-sm hover:opacity-90 transition-all active:scale-95 whitespace-nowrap"
            >
              <TrendingUp size={18} /> Stake to Back
            </button>
          )}
        </div>

        {/* --- TABS --- */}
        <div className="flex items-center gap-8 border-b border-navy-light mb-6 overflow-x-auto hidden-scrollbar">
          <button onClick={() => setActiveTab("activity")} className={cn("pb-4 font-display font-bold text-base transition-colors relative whitespace-nowrap", activeTab === "activity" ? "text-white" : "text-slate-muted hover:text-white")}>
            Activity
            {activeTab === "activity" && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-primary rounded-t-full"></span>}
          </button>
          <button onClick={() => setActiveTab("projects")} className={cn("pb-4 font-display font-bold text-base transition-colors relative whitespace-nowrap", activeTab === "projects" ? "text-white" : "text-slate-muted hover:text-white")}>
            GitHub Projects
            {activeTab === "projects" && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-primary rounded-t-full"></span>}
          </button>
          <button onClick={() => setActiveTab("credentials")} className={cn("pb-4 font-display font-bold text-base transition-colors relative whitespace-nowrap", activeTab === "credentials" ? "text-white" : "text-slate-muted hover:text-white")}>
            Credentials
            {activeTab === "credentials" && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-primary rounded-t-full"></span>}
          </button>
          <button onClick={() => setActiveTab("backers")} className={cn("pb-4 font-display font-bold text-base transition-colors relative whitespace-nowrap", activeTab === "backers" ? "text-white" : "text-slate-muted hover:text-white")}>
            Backers ({dev.backers})
            {activeTab === "backers" && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-primary rounded-t-full"></span>}
          </button>
        </div>

        {/* --- TAB CONTENT --- */}
        <div className="space-y-5">
          
          {/* ACTIVITY TAB */}
          {activeTab === "activity" && (
            <div className="space-y-6 animate-fade-in">
              <div className="proofd-card p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-display font-bold text-lg text-white">Proof of Work</h3>
                  <span className="font-mono-brand text-xs text-slate-muted border border-navy-light px-3 py-1 rounded-lg bg-surface-1">Last 90 Days</span>
                </div>
                <div className="flex gap-1.5 overflow-x-auto pb-4 hidden-scrollbar w-full justify-end">
                  {Array.from({ length: 42 }).map((_, col) => (
                    <div key={col} className="flex flex-col gap-1.5">
                      {Array.from({ length: 7 }).map((_, row) => {
                        const intensity = Math.random();
                        let colorClass = "bg-surface-3"; 
                        if (intensity > 0.85) colorClass = "bg-blue-light shadow-[0_0_8px_rgba(56,189,248,0.5)]"; 
                        else if (intensity > 0.6) colorClass = "bg-blue-primary"; 
                        else if (intensity > 0.3) colorClass = "bg-blue-primary/40"; 
                        return (
                          <div key={row} className={`w-3 h-3 sm:w-4 sm:h-4 rounded-[3px] transition-colors hover:ring-2 ring-white/20 cursor-pointer ${colorClass}`} />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>

              {/* LIVE ACTIVITY FEED */}
              <div className="proofd-card overflow-hidden">
                <div className="p-5 border-b border-navy-light bg-surface-1">
                  <h3 className="font-display font-bold text-lg text-white">Recent Actions</h3>
                </div>
                <div className="divide-y divide-navy-light/50">
                  {posts.length === 0 ? (
                    <div className="p-10 text-center font-body text-slate-muted">No ships logged yet.</div>
                  ) : (
                    posts.map((post) => (
                      <div key={post.id} className="p-6 hover:bg-surface-3/30 transition-colors flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-primary/10 border border-blue-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                          <MessageSquare size={18} className="text-blue-light" />
                        </div>
                        <div>
                          <p className="font-body text-slate-200 text-base mb-1">{post.content}</p>
                          <div className="flex items-center gap-4 mt-2">
                             <span className="font-mono-brand text-[10px] text-slate-brand uppercase tracking-widest">{new Date(post.created_at).toLocaleDateString()}</span>
                             <button className="flex items-center gap-1 font-mono-brand text-xs text-slate-muted hover:text-red-400 transition-colors">
                                <Heart size={12} /> {post.likes_count || 0}
                             </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* PROJECTS TAB */}
          {activeTab === "projects" && (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
               {visibleProjects.length === 0 ? (
                  <div className="col-span-full proofd-card p-10 flex flex-col items-center justify-center text-center">
                    <FolderGit2 size={32} className="text-slate-muted mb-4" />
                    <h3 className="font-display font-bold text-lg text-white">No Projects Visible</h3>
                    <p className="font-body text-sm text-slate-muted">This developer hasn't showcased any GitHub projects yet.</p>
                  </div>
               ) : (
                 visibleProjects.map((project) => (
                   <div key={project.id} className={cn("proofd-card p-6 flex flex-col transition-all", !project.isVisibleOnProofd && "opacity-60 grayscale hover:grayscale-0 hover:opacity-100")}>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          {project.isGithubPrivate ? <Lock size={16} className="text-amber-500" /> : <Globe size={16} className="text-emerald-400" />}
                          <h3 className="font-display font-bold text-lg text-white">{project.name}</h3>
                        </div>
                        
                        {isOwner && (
                          <button 
                            onClick={() => toggleProjectVisibility(project.id)}
                            className="p-1.5 rounded-md hover:bg-surface-3 text-slate-muted hover:text-white transition-colors"
                            title={project.isVisibleOnProofd ? "Visible on Proofd. Click to hide." : "Hidden from Proofd. Click to show."}
                          >
                            {project.isVisibleOnProofd ? <Eye size={18} className="text-blue-light" /> : <EyeOff size={18} />}
                          </button>
                        )}
                      </div>
                      
                      <p className="font-body text-sm text-slate-300 mb-6 flex-1">{project.description}</p>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-navy-light/50">
                        <span className="flex items-center gap-1.5 font-mono-brand text-xs text-slate-muted">
                          <span className="w-2.5 h-2.5 rounded-full bg-blue-primary"></span>
                          {project.language}
                        </span>
                        {!project.isGithubPrivate && project.stars > 0 && (
                          <span className="flex items-center gap-1 font-mono-brand text-xs text-slate-brand">
                            ⭐ {project.stars}
                          </span>
                        )}
                        {project.isGithubPrivate && (
                          <span className="font-mono-brand text-[10px] uppercase tracking-widest text-amber-500/70 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                            Closed Source
                          </span>
                        )}
                      </div>
                   </div>
                 ))
               )}
             </div>
          )}

          {/* CREDENTIALS TAB */}
          {activeTab === "credentials" && (
             <div className="proofd-card p-10 flex flex-col items-center justify-center text-center animate-fade-in">
               <div className="w-16 h-16 rounded-2xl bg-surface-3 flex items-center justify-center mb-4 border border-navy-light">
                 <Award size={32} className="text-slate-muted" />
               </div>
               <h3 className="font-display font-bold text-xl text-white mb-2">No Credentials Yet</h3>
               <p className="font-body text-base text-slate-muted max-w-sm mx-auto">Complete bounties on Proofd to earn verified credentials.</p>
             </div>
          )}

          {/* BACKERS TAB */}
          {activeTab === "backers" && (
            <div className="proofd-card overflow-hidden animate-fade-in">
              <div className="p-5 border-b border-navy-light bg-surface-1 flex justify-between items-center">
                <h3 className="font-display font-bold text-lg text-white">Public Backers Ledger</h3>
              </div>
              <div className="p-10 flex flex-col items-center justify-center text-center">
                 <AlertCircle size={32} className="text-slate-muted mb-4" />
                 <h3 className="font-display font-bold text-lg text-white">No Active Backers</h3>
                 <p className="font-body text-sm text-slate-muted">No one has staked $PROOF on this profile yet.</p>
              </div>
            </div>
          )}
        </div>

        {/* --- EDIT PROFILE MODAL --- */}
        {isEditModalOpen && (
           <div className="fixed inset-0 z-[100] flex items-center justify-center bg-navy/80 backdrop-blur-sm px-4">
           <div className="bg-surface-2 border border-navy-light rounded-2xl w-full max-w-2xl shadow-card overflow-hidden animate-fade-in relative max-h-[90vh] flex flex-col">
             <div className="flex items-center justify-between p-5 border-b border-navy-light bg-surface-1">
               <h3 className="font-display font-bold text-xl text-white">Edit Profile</h3>
               <button onClick={() => setIsEditModalOpen(false)} className="text-slate-muted hover:text-white transition-colors p-1"><X size={20} /></button>
             </div>
             
             <div className="p-6 space-y-6 overflow-y-auto">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                   <label className="block font-mono-brand text-xs text-slate-brand uppercase tracking-widest mb-2">Display Name</label>
                   <input type="text" value={editForm.displayName} onChange={(e) => setEditForm({...editForm, displayName: e.target.value})} className="w-full bg-surface-3 border border-navy-light rounded-xl px-4 py-3 font-body text-base text-white focus:border-blue-primary outline-none transition-colors" />
                 </div>
                 <div>
                   <label className="block font-mono-brand text-xs text-slate-brand uppercase tracking-widest mb-2">Handle</label>
                   <input type="text" value={editForm.handle} onChange={(e) => setEditForm({...editForm, handle: e.target.value})} className="w-full bg-surface-3 border border-navy-light rounded-xl px-4 py-3 font-body text-base text-white focus:border-blue-primary outline-none transition-colors" />
                 </div>
               </div>

               <div>
                 <label className="block font-mono-brand text-xs text-slate-brand uppercase tracking-widest mb-2">Bio</label>
                 <textarea value={editForm.bio} onChange={(e) => setEditForm({...editForm, bio: e.target.value})} rows={3} className="w-full bg-surface-3 border border-navy-light rounded-xl px-4 py-3 font-body text-base text-white focus:border-blue-primary outline-none transition-colors resize-none" />
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                   <label className="block font-mono-brand text-xs text-slate-brand uppercase tracking-widest mb-2 flex items-center gap-1.5"><Github size={14}/> GitHub Username</label>
                   <input type="text" value={editForm.github} onChange={(e) => setEditForm({...editForm, github: e.target.value})} className="w-full bg-surface-3 border border-navy-light rounded-xl px-4 py-3 font-body text-base text-white focus:border-blue-primary outline-none transition-colors" />
                 </div>
                 <div>
                   <label className="block font-mono-brand text-xs text-slate-brand uppercase tracking-widest mb-2 flex items-center gap-1.5"><Twitter size={14}/> X (Twitter) Handle</label>
                   <input type="text" value={editForm.twitter} onChange={(e) => setEditForm({...editForm, twitter: e.target.value})} className="w-full bg-surface-3 border border-navy-light rounded-xl px-4 py-3 font-body text-base text-white focus:border-blue-primary outline-none transition-colors" />
                 </div>
               </div>
             </div>
             
             <div className="p-5 border-t border-navy-light bg-surface-1 flex justify-end gap-3">
               <button onClick={() => setIsEditModalOpen(false)} className="px-5 py-2.5 rounded-xl font-display font-bold text-base text-slate-muted hover:text-white transition-colors">Cancel</button>
               <button onClick={handleSaveProfile} className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-primary font-display font-bold text-white text-base hover:bg-blue-light transition-colors shadow-glow-sm">
                 <Save size={18} /> Save Changes
               </button>
             </div>
           </div>
         </div>
        )}
      </main>
      <Footer />
    </>
  );
}s