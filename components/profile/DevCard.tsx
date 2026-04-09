import Link from "next/link";
import { cn, scoreColor, truncateAddress } from "@/lib/utils";
import type { Developer } from "@/lib/types";

interface DevCardProps {
  dev: Developer;
  className?: string;
}

export function DevCard({ dev, className }: DevCardProps) {
  const displayName = dev.ens || truncateAddress(dev.address);
  const scorePercent = (dev.score / dev.maxScore) * 100;

  return (
    <Link href={`/profile/${dev.address}`}>
      <div
        className={cn(
          "proofd-card p-5 cursor-pointer group",
          className
        )}
      >
        {/* Header */}
        <div className="flex items-start gap-3 mb-4">
          {/* Avatar */}
          <div className="w-11 h-11 rounded-xl bg-blue-gradient flex items-center justify-center font-display font-bold text-lg text-white flex-shrink-0">
            {dev.avatarInitial}
          </div>

          {/* Name */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-display font-bold text-white text-base leading-tight truncate">
                {displayName}
              </span>
              {dev.verified && (
                <span className="flex-shrink-0 px-1.5 py-0.5 rounded-md bg-blue-primary/15 border border-blue-primary/25 font-mono-brand text-[9px] text-blue-light tracking-wider uppercase">
                  ● Verified
                </span>
              )}
            </div>
            <span className="font-mono-brand text-xs text-slate-brand">
              {dev.handle}
            </span>
          </div>

          {/* Score */}
          <div className="text-right flex-shrink-0">
            <div className={cn("font-mono-brand font-semibold text-lg leading-tight", scoreColor(dev.score))}>
              {dev.score}
            </div>
            <div className="font-mono-brand text-[9px] text-slate-brand uppercase tracking-widest">
              / 1000
            </div>
          </div>
        </div>

        {/* Score bar */}
        <div className="h-1 bg-navy-light rounded-full mb-4 overflow-hidden">
          <div
            className="h-full rounded-full bg-blue-gradient transition-all duration-500"
            style={{ width: `${scorePercent}%` }}
          />
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {dev.skills.slice(0, 4).map((skill) => (
            <span
              key={skill}
              className="px-2 py-0.5 rounded-md bg-navy-light/60 border border-navy-light font-body text-xs text-slate-muted"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 pt-3 border-t border-navy-mid/60">
          <div className="text-center">
            <div className="font-mono-brand font-semibold text-sm text-white">
              {dev.stats.bounties}
            </div>
            <div className="font-mono-brand text-[9px] text-slate-brand uppercase tracking-widest mt-0.5">
              Bounties
            </div>
          </div>
          <div className="text-center border-x border-navy-mid/60">
            <div className="font-mono-brand font-semibold text-sm text-white">
              {dev.stats.vouches}
            </div>
            <div className="font-mono-brand text-[9px] text-slate-brand uppercase tracking-widest mt-0.5">
              Vouches
            </div>
          </div>
          <div className="text-center">
            <div className="font-mono-brand font-semibold text-sm text-white">
              {dev.stats.staked}
            </div>
            <div className="font-mono-brand text-[9px] text-slate-brand uppercase tracking-widest mt-0.5">
              Staked
            </div>
          </div>
        </div>

        {/* Open to work badge */}
        {dev.openToWork && (
          <div className="mt-3 flex items-center gap-1.5 justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono-brand text-[10px] text-emerald-400 uppercase tracking-widest">
              Open to work
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}
