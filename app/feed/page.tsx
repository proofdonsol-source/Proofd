"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePrivy } from "@privy-io/react-auth";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Sidebar } from "@/components/layout/Sidebar";
import { truncateAddress } from "@/lib/utils";
import { Heart, MessageSquare, Award, TrendingUp, Sparkles, Image as ImageIcon, Send, Briefcase, Loader2 } from "lucide-react";
import { getPosts, createPost, getTrendingBuilders, getHotBounties } from "@/lib/actions";

export default function FeedPage() {
  const { user } = usePrivy();
  const currentUserAddress = user?.wallet?.address;
  
  const [posts, setPosts] = useState<any[]>([]);
  const [trendingBuilders, setTrendingBuilders] = useState<any[]>([]);
  const [hotBounties, setHotBounties] = useState<any[]>([]);
  const [newPost, setNewPost] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isPosting, setIsPosting] = useState(false);

  useEffect(() => {
    async function fetchLiveFeedData() {
      setIsLoading(true);
      try {
        const [postsData, buildersData, bountiesData] = await Promise.all([
          getPosts(),
          getTrendingBuilders(),
          getHotBounties()
        ]);
        setPosts(postsData);
        setTrendingBuilders(buildersData);
        setHotBounties(bountiesData);
      } catch (error) {
        console.error("Failed to sync feed:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchLiveFeedData();
  }, []);

  const handlePost = async () => {
    if (!newPost.trim() || !currentUserAddress) return;
    setIsPosting(true);
    try {
      await createPost(newPost, currentUserAddress);
      setNewPost("");
      const refreshedPosts = await getPosts();
      setPosts(refreshedPosts);
    } catch (error) {
      console.error("Failed to post:", error);
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <>
      <Navbar />
      <Sidebar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-24 relative md:pl-[280px]">
        <div className="flex gap-8 justify-center lg:justify-between">
          
          <div className="w-full max-w-2xl flex-shrink-0">
            <div className="mb-8">
              <h1 className="font-display font-extrabold text-3xl md:text-4xl text-white tracking-tight">Global Feed</h1>
              <p className="font-body text-slate-muted mt-1 text-base">See what top builders are shipping right now.</p>
            </div>

            <div className="proofd-card p-6 mb-8 bg-surface-1 border border-navy-light shadow-xl">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-gradient flex items-center justify-center font-display font-bold text-white flex-shrink-0 shadow-glow-sm">
                  {currentUserAddress ? currentUserAddress.slice(2,3).toUpperCase() : "U"}
                </div>
                <div className="flex-1">
                  <textarea 
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    placeholder="What are you building today?"
                    data-gramm="false"
                    spellCheck={false}
                    className="w-full bg-transparent border-none font-body text-lg text-white placeholder:text-slate-muted resize-none focus:outline-none focus:ring-0 min-h-[100px] pt-2"
                  />
                  <div className="flex items-center justify-between pt-4 border-t border-navy-light/50">
                    <div className="flex gap-2">
                      <button className="p-2.5 text-slate-muted hover:text-blue-light transition-colors rounded-xl hover:bg-surface-2 border border-transparent hover:border-navy-light">
                        <ImageIcon size={20} />
                      </button>
                      <button className="p-2.5 text-slate-muted hover:text-emerald-400 transition-colors rounded-xl hover:bg-surface-2 border border-transparent hover:border-navy-light">
                        <Award size={20} />
                      </button>
                    </div>
                    <button 
                      onClick={handlePost}
                      disabled={!newPost.trim() || !currentUserAddress || isPosting}
                      className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-primary font-display font-bold text-white text-sm transition-all shadow-glow-sm active:scale-95 disabled:opacity-50"
                    >
                      {isPosting ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                      Ship It
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6 animate-fade-in">
              {isLoading ? (
                <div className="proofd-card p-12 flex flex-col items-center justify-center text-center bg-surface-1">
                  <Loader2 size={40} className="text-blue-primary animate-spin mb-4" />
                  <p className="font-body text-slate-muted">Syncing the blockchain...</p>
                </div>
              ) : posts.length === 0 ? (
                <div className="proofd-card p-12 flex flex-col items-center justify-center text-center bg-surface-1">
                  <Sparkles size={40} className="text-slate-muted mb-4" />
                  <h3 className="font-display font-bold text-xl text-white mb-2">It's quiet here</h3>
                  <p className="font-body text-slate-muted">Be the first to ship an update to the network.</p>
                </div>
              ) : (
                posts.map((post) => (
                  <div key={post.id} className="proofd-card p-6 bg-surface-1 transition-all hover:border-navy-light/80 border border-navy-light group cursor-pointer">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-surface-3 flex items-center justify-center font-display font-bold text-white text-xl border border-navy-light shadow-inner group-hover:border-blue-primary/50 transition-colors">
                        {post.author?.avatar_initial || "U"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <Link href={`/profile/${post.author_address}`} className="font-display font-bold text-white text-lg truncate hover:text-blue-light transition-colors">
                            {post.author?.ens || truncateAddress(post.author_address || "0x000")}
                          </Link>
                          <span className="font-mono-brand text-xs text-slate-muted whitespace-nowrap">
                            {new Date(post.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="font-mono-brand text-sm text-slate-brand truncate">
                          {post.author?.handle || "@user"}
                        </p>
                      </div>
                    </div>

                    <div className="pl-16">
                      <p className="font-body text-slate-200 text-lg leading-relaxed mb-6 whitespace-pre-wrap">
                        {post.content}
                      </p>
                      <div className="flex items-center gap-6 mt-4 pt-4 border-t border-navy-light/30">
                        <button className="flex items-center gap-2 font-mono-brand text-xs text-slate-muted hover:text-red-400 transition-colors group">
                          <Heart size={16} className="group-hover:fill-red-400/20" /> {post.likes_count || 0}
                        </button>
                        <button className="flex items-center gap-2 font-mono-brand text-xs text-slate-muted hover:text-blue-light transition-colors group">
                          <MessageSquare size={16} className="group-hover:fill-blue-light/20" /> 0
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="hidden lg:block w-80 flex-shrink-0 space-y-6 pt-[76px]">
            <div className="proofd-card bg-surface-1 overflow-hidden border border-navy-light shadow-lg">
              <div className="p-4 border-b border-navy-light flex items-center gap-2 bg-surface-2/30">
                <TrendingUp size={16} className="text-blue-light" />
                <h3 className="font-display font-bold text-white text-sm uppercase tracking-wider">Trending Builders</h3>
              </div>
              <div className="divide-y divide-navy-light/50">
                {trendingBuilders.length === 0 ? (
                   <div className="p-6 text-center font-body text-sm text-slate-muted">No builders active yet.</div>
                ) : (
                  trendingBuilders.map((dev) => (
                    <Link href={`/profile/${dev.address}`} key={dev.address} className="p-4 flex items-center justify-between hover:bg-surface-2 transition-colors cursor-pointer group">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-surface-3 border border-navy-light flex items-center justify-center font-display font-bold text-white text-sm group-hover:border-blue-primary transition-colors">
                          {dev.avatar_initial || "U"}
                        </div>
                        <div>
                          <div className="font-display font-bold text-white text-sm group-hover:text-blue-light transition-colors">{dev.ens || truncateAddress(dev.address)}</div>
                          <div className="font-mono-brand text-[10px] text-slate-brand uppercase tracking-tighter">{dev.handle}</div>
                        </div>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </div>

            <div className="proofd-card bg-surface-1 overflow-hidden border border-navy-light shadow-lg">
              <div className="p-4 border-b border-navy-light flex items-center justify-between bg-surface-2/30">
                <div className="flex items-center gap-2">
                  <Briefcase size={16} className="text-emerald-400" />
                  <h3 className="font-display font-bold text-white text-sm uppercase tracking-wider">Hot Bounties</h3>
                </div>
              </div>
              <div className="divide-y divide-navy-light/50">
                {hotBounties.length === 0 ? (
                  <div className="p-6 text-center font-body text-sm text-slate-muted">No open bounties.</div>
                ) : (
                  hotBounties.map((bounty) => (
                    <Link href="/bounties" key={bounty.id} className="block p-4 hover:bg-surface-2 transition-colors group">
                      <div className="font-mono-brand text-[10px] text-slate-brand uppercase tracking-widest mb-1">{bounty.org_name}</div>
                      <div className="font-display font-bold text-white text-sm mb-2 group-hover:text-blue-light transition-colors">{bounty.title}</div>
                      <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 font-mono-brand text-[10px] text-emerald-400 font-bold">
                        {bounty.reward}
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}