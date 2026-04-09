import Link from "next/link";
import { cn, difficultyColor, statusColor, statusLabel } from "@/lib/utils";
import type { Bounty } from "@/lib/types";

interface BountyCardProps {
  bounty: Bounty;
  className?: string;
}

export function BountyCard({ bounty, className }: BountyCardProps) {
  return (
    <div className={cn("proofd-card p-6 group", className)}>
      {bounty.featured && (
        <div className="flex items-center gap-2 mb-4">
          <span className="px-2.5 py-1 rounded-md bg-blue-primary/15 border border-blue-primary/25 font-mono-brand text-[10px] text-blue-light tracking-widest uppercase">
            ★ Featured
          </span>
        </div>
      )}

      {/* Top row */}
      <div className="flex items-start justify-between gap-4 mb-3">
        <h3 className="font-display font-bold text-base text-white leading-snug group-hover:text-blue-light transition-colors">
          {bounty.title}
        </h3>
        <div className="text-right flex-shrink-0">
          <div className="font-mono-brand font-semibold text-base text-white">
            {bounty.reward}
          </div>
          <div className="font-mono-brand text-[10px] text-blue-light uppercase">
            {bounty.rewardToken}
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="font-body text-sm text-slate-muted mb-4 line-clamp-2 leading-relaxed">
        {bounty.description}
      </p>

      {/* Badges row */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span
          className={cn(
            "px-2.5 py-1 rounded-md border font-mono-brand text-[10px] tracking-wider uppercase",
            statusColor(bounty.status)
          )}
        >
          {statusLabel(bounty.status)}
        </span>
        <span
          className={cn(
            "px-2.5 py-1 rounded-md border font-mono-brand text-[10px] tracking-wider uppercase",
            difficultyColor(bounty.difficulty)
          )}
        >
          {bounty.difficulty}
        </span>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {bounty.skills.map((skill) => (
          <span
            key={skill}
            className="px-2 py-0.5 rounded bg-navy-light/50 border border-navy-light font-body text-xs text-slate-muted"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-navy-mid/60">
        <div className="flex items-center gap-4">
          <span className="font-mono-brand text-[10px] text-slate-brand uppercase">
            ⏱ {bounty.deadline}
          </span>
          <span className="font-mono-brand text-[10px] text-slate-brand uppercase">
            👤 {bounty.applicants} applicants
          </span>
        </div>
        <Link
          href={`/bounties/${bounty.id}`}
          className="px-4 py-1.5 rounded-lg bg-blue-primary/15 border border-blue-primary/25 font-display font-semibold text-sm text-blue-light hover:bg-blue-primary/25 transition-colors"
        >
          Apply →
        </Link>
      </div>
    </div>
  );
}
