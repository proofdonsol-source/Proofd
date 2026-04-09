import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function truncateAddress(address: string) {
  if (!address) return "0x00...000";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function formatStake(amount: number) {
  if (amount >= 1000) {
    return (amount / 1000).toFixed(1) + 'k';
  }
  return amount.toString();
}

export const MOCK_DEVELOPERS = [
  {
    address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
    ens: "0xDayo.eth",
    handle: "@dayo_builds",
    avatarInitial: "D",
    totalStaked: 24500,
    backers: 84,
    verified: true,
    openToWork: false,
    joined: "Jan 2025",
    bio: "Senior Solidity Engineer. Ex-Optimism. Building zero-knowledge infrastructure.",
    skills: ["Solidity", "Yul", "Rust", "Foundry"],
    stats: { bounties: 14 },
    socials: { github: "dayobuilds", twitter: "dayo_eth" },
    projects: [
      { 
        id: "p1", 
        name: "zk-SNARK Prover Engine", 
        description: "A blazingly fast prover written in Rust. Used by 3 major rollups.", 
        language: "Rust", 
        stars: 342, 
        isGithubPrivate: false, 
        isVisibleOnProofd: true 
      },
      { 
        id: "p2", 
        name: "Alpha Arbitrage MEV Bot", 
        description: "Proprietary MEV bot for Uniswap V3. Consistently profitable for 8 months.", 
        language: "Solidity", 
        stars: 0, 
        isGithubPrivate: true, // It's closed source
        isVisibleOnProofd: true // But they want DAOs to know they built it
      },
      { 
        id: "p3", 
        name: "Messy Hackathon Project", 
        description: "Spaghetti code from ETHDenver 2024.", 
        language: "TypeScript", 
        stars: 2, 
        isGithubPrivate: false, 
        isVisibleOnProofd: false // Hidden from their Proofd profile
      }
    ]
  },
  // ... fallback dev structure
];

export const MOCK_BOUNTIES = [
  {
    id: "b1",
    company: "Uniswap Foundation",
    title: "Implement v4 Hook for Dynamic Fees",
    reward: "5,000",
    rewardToken: "USDC",
    deadline: "3 days left",
    skills: ["Solidity", "Uniswap v4"]
  }
];
