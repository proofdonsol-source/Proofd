"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BountyCard } from "@/components/bounties/BountyCard";
import { useAccount } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { truncateAddress, scoreColor, MOCK_BOUNTIES } from "@/lib/utils";
import { cn } from "@/lib/utils";
import Link from "next/link";

const MOCK_SCORE = 847;
const MOCK_ACTIVITY = [
  { type: "bounty", text: "Completed: ERC-4337 Module implementation", time: "2 days ago", reward: "+2,500 USDC" },
  { type: "vouch", text: "Received vouch from 0xMara.eth", time: "5 days ago", reward: "+50 score" },
  { type: "stake", text: "Staked 1,000 $PROOF", time: "1 week ago", reward: "" },
  { type: "bounty", text: "Applied to: TheGraph Subgraph bounty", time: "1 week ago", reward: "" },
];

const ACTIVITY_ICON: Record<string, string> = {
  bounty: "🎯",
  vouch: "🤝",
  stake: "💎",
};

export default function DashboardPage() {
  const { address, isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();

  if (!isConnected) {
    return (
      <>
        <Navbar />
        <main className="max-w-5xl mx-auto px-6 pt-28 pb-24 flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div className="w-16 h-16 rounded-2xl bg-blue-gradient flex items-center justify-center font-display font-extrabold text-3xl text-white mx-auto mb-6">
            P
          </div>
          <h1 className="font-display font-extrabold text-4xl tracking-tight mb-3">
            Connect your wallet
          </h1>
          <p className="font-body text-slate-muted text-lg max-w-md mb-8">
            Connect your wallet to access your Proofd dashboard and manage your on-chain reputation.
          </p>
          <button
            onClick={openConnectModal}
            className="px-8 py-4 rounded-xl bg-blue-gradient font-display font-bold text-white text-base shadow-glow-blue hover:opacity-90 transition-all active:scale-95"
          >
            Connect Wallet →
          </button>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 pt-28 pb-24">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <div className="section-label">Dashboard</div>
            <h1 className="font-display font-extrabold text-3xl md:text-4xl tracking-tight">
              Welcome back,{" "}
              <span className="gradient-text">{truncateAddress(address || "")}</span>
            </h1>
          </div>
          <Link
            href={`/profile/${address}`}
            className="px-5 py-2.5 rounded-xl border border-blue-primary/30 font-display font-semibold text-sm text-blue-light hover:bg-blue-primary/10 transition-colors"
          >
            View Public Profile →
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Proofd Score", value: MOCK_SCORE.toString(), sub: "/ 1000", highlight: true },
            { label: "Bounties Done", value: "34", sub: "+2 this month" },
            { label: "Vouches", value: "127", sub: "12 staked" },
            { label: "$PROOF Staked", value: "12,000", sub: "≈ $1,400" },
          ].map((stat) => (
            <div key={stat.label} className="proofd-card p-5">
              <div className={cn(
                "font-mono-brand font-semibold text-2xl mb-1",
                stat.highlight ? scoreColor(MOCK_SCORE) : "text-white"
              )}>
                {stat.value}
                {stat.sub?.startsWith("/") && (
                  <span className="text-slate-brand text-base font-normal"> {stat.sub}</span>
                )}
              </div>
              <div className="font-mono-brand text-[10px] text-slate-brand uppercase tracking-widest">
                {stat.label}
              </div>
              {stat.sub && !stat.sub.startsWith("/") && (
                <div className="font-mono-brand text-[10px] text-emerald-400 mt-1">
                  {stat.sub}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-1 proofd-card p-6">
            <h2 className="font-display font-bold text-lg text-white mb-5">
              Recent Activity
            </h2>
            <div className="space-y-4">
              {MOCK_ACTIVITY.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-surface-3 flex items-center justify-center text-sm flex-shrink-0">
                    {ACTIVITY_ICON[item.type]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-xs text-white leading-snug mb-0.5">
                      {item.text}
                    </p>
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono-brand text-[10px] text-slate-brand">
                        {item.time}
                      </span>
                      {item.reward && (
                        <span className="font-mono-brand text-[10px] text-emerald-400">
                          {item.reward}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Suggested Bounties */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display font-bold text-lg text-white">
                Suggested Bounties
              </h2>
              <Link
                href="/bounties"
                className="font-body text-sm text-blue-light hover:text-white transition-colors"
              >
                View all →
              </Link>
            </div>
            <div className="space-y-4">
              {MOCK_BOUNTIES.slice(0, 2).map((bounty) => (
                <BountyCard key={bounty.id} bounty={bounty} />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
