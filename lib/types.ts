// ── Developer / Profile ──────────────────────────────────────────────
export interface Developer {
  address: string;
  ens?: string;
  handle: string;
  avatarInitial: string;
  avatarColor?: string;
  score: number;
  maxScore: number;
  skills: string[];
  stats: {
    bounties: number;
    vouches: number;
    staked: string;
  };
  verified: boolean;
  openToWork: boolean;
  bio?: string;
  joined?: string;
}

// ── Bounty ───────────────────────────────────────────────────────────
export type BountyStatus = "open" | "in-progress" | "completed" | "expired";
export type BountyDifficulty = "beginner" | "intermediate" | "advanced" | "expert";

export interface Bounty {
  id: string;
  title: string;
  description: string;
  reward: string;
  rewardToken: string;
  status: BountyStatus;
  difficulty: BountyDifficulty;
  skills: string[];
  postedBy: string;
  postedByAddress: string;
  deadline: string;
  applicants: number;
  featured?: boolean;
}

// ── Vouch ────────────────────────────────────────────────────────────
export interface Vouch {
  from: string;
  fromAddress: string;
  amount: string;
  message: string;
  timestamp: string;
}

// ── Nav ──────────────────────────────────────────────────────────────
export interface NavLink {
  label: string;
  href: string;
  badge?: string;
}

// ── Stat ─────────────────────────────────────────────────────────────
export interface StatItem {
  label: string;
  value: string;
  change?: string;
  positive?: boolean;
}
