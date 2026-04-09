import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function truncateAddress(address: string | undefined) {
  if (!address) return "0x00...000";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function formatStake(amount: number) {
  return new Intl.NumberFormat('en-US', { notation: "compact", compactDisplay: "short" }).format(amount);
}

// --- UI Formatter Helpers for Dashboard and Bounties ---
export function scoreColor(score: number) {
  if (score > 800) return 'text-emerald-400';
  if (score > 500) return 'text-blue-light';
  return 'text-slate-muted';
}

export function statusColor(status: string) {
  if (status === 'open') return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
  if (status === 'in-progress') return 'text-blue-light bg-blue-light/10 border-blue-light/20';
  return 'text-slate-muted bg-surface-3 border-navy-light';
}

export function statusLabel(status: string) {
  if (!status) return '';
  return status.replace('-', ' ').toUpperCase();
}

export function difficultyColor(diff: string) {
  if (diff === 'Advanced') return 'text-purple-400';
  if (diff === 'Intermediate') return 'text-blue-light';
  return 'text-emerald-400';
}

// --- Empty Mocks to satisfy the compiler ---
export const MOCK_BOUNTIES: any[] = [];
export const MOCK_DEVELOPERS: any[] = [];