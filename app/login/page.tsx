"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePrivy } from "@privy-io/react-auth"; 
import { Github, Mail, ArrowLeft, Wallet } from "lucide-react";
import { useEffect } from "react";

export default function LoginPage() {
  const router = useRouter();
  
  // Pull in Privy's super-hooks
  const { login, ready, authenticated, user } = usePrivy();

  // The Magic Redirect: If Privy says they are logged in, push them straight to their profile!
  useEffect(() => {
    if (ready && authenticated && user) {
      const userAddress = user.wallet?.address || "me";
      router.push(`/profile/${userAddress}`);
    }
  }, [ready, authenticated, user, router]);

  return (
    <main className="min-h-screen bg-navy flex flex-col md:flex-row">
      
      {/* Left Side: Branding & Value Prop */}
      <div className="hidden md:flex flex-col justify-between w-1/2 bg-surface-1 p-12 border-r border-navy-light relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-blue-primary/5 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-primary/20 via-transparent to-transparent pointer-events-none" />
        
        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-3 w-max hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 rounded-xl bg-blue-gradient flex items-center justify-center font-display font-bold text-white shadow-glow-sm text-xl">P</div>
            <span className="font-display font-bold text-3xl tracking-tight text-white">Proofd</span>
          </Link>
        </div>

        <div className="relative z-10 mb-20">
          <h1 className="font-display font-extrabold text-5xl text-white leading-tight mb-6">
            Your work <br />
            speaks for itself.
          </h1>
          <p className="font-body text-slate-muted text-lg max-w-md">
            Join the only developer network where reputation is verified on-chain, and endorsements are backed by real economic stake.
          </p>
        </div>
      </div>

      {/* Right Side: Privy Login Controls */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 relative">
        <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-slate-muted hover:text-white transition-colors font-body text-sm md:hidden">
          <ArrowLeft size={16} /> Back
        </Link>
        
        <div className="w-full max-w-md space-y-8">
          <div className="text-center md:text-left">
            <h2 className="font-display font-bold text-3xl text-white mb-2">Welcome back</h2>
            <p className="font-body text-slate-muted">Sign in or create an account to continue.</p>
          </div>

          <div className="space-y-4">
            
            {/* All of our beautiful buttons now trigger Privy's secure modal! */}
            <button 
              onClick={login}
              className="w-full flex items-center justify-center gap-3 px-4 py-3.5 bg-surface-2 hover:bg-surface-3 border border-navy-light rounded-xl font-body text-base text-white font-medium transition-all active:scale-95"
            >
              <Github size={20} />
              Continue with GitHub
            </button>

            <button 
              onClick={login}
              className="w-full flex items-center justify-center gap-3 px-4 py-3.5 bg-surface-2 hover:bg-surface-3 border border-navy-light rounded-xl font-body text-base text-white font-medium transition-all active:scale-95"
            >
              <Mail size={20} />
              Continue with Email
            </button>

            <div className="flex items-center gap-4 py-2">
              <div className="flex-1 h-px bg-navy-light"></div>
              <span className="font-mono-brand text-xs text-slate-muted uppercase tracking-widest">or web3</span>
              <div className="flex-1 h-px bg-navy-light"></div>
            </div>

            <button 
              onClick={login}
              className="w-full flex items-center justify-center gap-3 px-4 py-3.5 bg-blue-primary hover:bg-blue-light rounded-xl font-body text-base text-white font-bold shadow-glow-sm transition-all active:scale-95"
            >
              <Wallet size={20} />
              Connect Web3 Wallet
            </button>

          </div>

          <p className="font-mono-brand text-xs text-slate-brand text-center mt-8 leading-relaxed">
            By continuing, you agree to the Proofd <br />
            <a href="#" className="text-blue-light hover:underline">Terms of Service</a> and <a href="#" className="text-blue-light hover:underline">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </main>
  );
}
