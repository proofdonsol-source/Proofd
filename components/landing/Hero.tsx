"use client";

import Link from "next/link";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { cn } from "@/lib/utils";

const FLOATING_STATS = [
  { label: "Devs Proofd", value: "4,821" },
  { label: "Vouches Staked", value: "$2.1M" },
  { label: "Bounties Paid", value: "$890K" },
];

export function Hero() {
  const { openConnectModal } = useConnectModal();
  const { isConnected } = useAccount();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Background effects */}
      <div className="absolute inset-0 bg-hero-glow" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #3B82F6 1px, transparent 0)`,
          backgroundSize: "48px 48px",
        }}
      />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-blue-primary/5 blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 py-24 w-full">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-primary/10 border border-blue-primary/25 mb-10 animate-fade-in">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-light animate-pulse-glow" />
            <span className="font-mono-brand text-xs text-blue-light tracking-widest uppercase">
              Now live on Bags.fun · $PROOF
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display font-extrabold text-5xl md:text-7xl leading-[1.05] tracking-tight mb-6 animate-fade-up">
            Your reputation,
            <br />
            <span className="gradient-text">verified on-chain.</span>
          </h1>

          {/* Subheadline */}
          <p className="font-body text-lg md:text-xl text-slate-muted max-w-2xl mx-auto mb-10 animate-fade-up animate-delay-100">
            The dev platform where your work speaks for itself. Build your proof,
            stake your rep, get vouched by peers who have skin in the game.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-20 animate-fade-up animate-delay-200">
            {isConnected ? (
              <Link
                href="/dashboard"
                className="px-7 py-3.5 rounded-xl bg-blue-gradient font-display font-semibold text-white text-base shadow-glow-blue hover:shadow-glow-blue hover:opacity-90 transition-all active:scale-95"
              >
                Go to Dashboard →
              </Link>
            ) : (
              <button
                onClick={openConnectModal}
                className="px-7 py-3.5 rounded-xl bg-blue-gradient font-display font-semibold text-white text-base shadow-glow-blue hover:opacity-90 transition-all active:scale-95"
              >
                Get Proofd →
              </button>
            )}
            <Link
              href="/explore"
              className="px-7 py-3.5 rounded-xl border border-navy-light font-display font-semibold text-slate-muted text-base hover:text-white hover:border-slate-brand transition-colors"
            >
              Explore Devs
            </Link>
          </div>

          {/* Stats bar */}
          <div className="grid grid-cols-3 gap-px bg-navy-mid/50 rounded-2xl overflow-hidden border border-navy-mid animate-fade-up animate-delay-300">
            {FLOATING_STATS.map((stat) => (
              <div
                key={stat.label}
                className="bg-surface-2/80 px-6 py-5 flex flex-col items-center gap-1 hover:bg-surface-3/80 transition-colors"
              >
                <span className="font-display font-extrabold text-2xl md:text-3xl gradient-text">
                  {stat.value}
                </span>
                <span className="font-mono-brand text-[11px] text-slate-brand uppercase tracking-widest">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
