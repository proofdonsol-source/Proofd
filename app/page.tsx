"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePrivy } from "@privy-io/react-auth";
import Link from "next/link";

const TICKER_ITEMS = [
  '0xAbdur.eth completed Bounty #441 → +500 $PROOF',
  'kemi.eth staked 2,400 $PROOF on jidebuilds',
  'AngelDAO posted Senior Solidity Engineer · $180k + PROOF',
  '0xDayo.eth reached Score 900',
  'Hackathon Winner credential minted · ETHGlobal 2025',
  'w3rocketman completed Bounty #442 → +8,000 $PROOF',
  'SecureDAO posted Smart Contract Audit · 5,000 $PROOF',
];
const DOUBLED_TICKER = [...TICKER_ITEMS, ...TICKER_ITEMS];

export default function LandingPage() {
  const router = useRouter();
  const { login, ready, authenticated } = usePrivy();
  
  const [email, setEmail] = useState("");
  const [isWaitlisted, setIsWaitlisted] = useState(false);

  // Scroll Reveal Observer
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { 
        if(e.isIntersecting){
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        } 
      });
    }, { threshold: 0.1, rootMargin: '-30px' });
    
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    
    return () => obs.disconnect();
  }, []);

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setIsWaitlisted(true);
    }
  };

  const handleNavCta = () => {
    if (ready && authenticated) {
      // If they are already logged in, let them jump straight into the app
      router.push('/feed');
    } else {
      // If they are logged out, smoothly scroll down to the waitlist form
      const waitlistSection = document.getElementById('waitlist');
      if (waitlistSection) {
        waitlistSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500&family=JetBrains+Mono:wght@400;500;600&display=swap');
        
        :root {
          --navy: #050a18; --navy-2: #070d1f; --navy-3: #0a1128; --navy-card: #0b1326;
          --blue: #3b82f6; --blue-deep: #1d4ed8; --blue-light: #60a5fa;
          --cyan: #22d3ee; --green: #22c55e; --amber: #f59e0b;
          --white: #f0f4ff; --muted: #8494b7; --slate: #4a5c80;
          --border: rgba(255,255,255,0.06);
          --font-pj: 'Plus Jakarta Sans', sans-serif;
          --mono: 'JetBrains Mono', monospace;
          --radius: 16px; --radius-sm: 10px; --radius-xs: 8px;
        }

        .landing-wrapper {
          font-family: var(--font-pj);
          color: var(--muted);
          background: var(--navy);
          overflow-x: hidden;
          -webkit-font-smoothing: antialiased;
          line-height: 1.6;
        }
        
        .landing-wrapper a { text-decoration: none; color: inherit; }
        .landing-wrapper ul { list-style: none; padding: 0; margin: 0; }
        .landing-wrapper button { border: none; cursor: pointer; font-family: inherit; }
        .landing-wrapper input { font-family: inherit; }
        
        .c-container { max-width: 1100px; margin: 0 auto; padding: 0 24px; }
        .pill {
          display: inline-flex; align-items: center; gap: 7px;
          font-family: var(--mono); font-size: 11px; letter-spacing: .08em;
          color: var(--cyan); padding: 6px 16px;
          background: rgba(34,211,238,.06); border: 1px solid rgba(34,211,238,.14); border-radius: 100px;
        }
        .pill-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--cyan); animation: pulse 2s ease-in-out infinite; }
        .grad {
          background: linear-gradient(135deg, var(--cyan) 0%, var(--blue) 50%, var(--blue-deep) 100%);
          background-size: 200% 200%; animation: shimmer 5s ease infinite;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }

        @keyframes shimmer { 0%, 100% { background-position: 0% 50% } 50% { background-position: 100% 50% } }
        @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1) } 50% { opacity: .4; transform: scale(.7) } }
        @keyframes float1 { 0%, 100% { transform: translateY(0) rotate(0deg) } 50% { transform: translateY(-14px) rotate(1deg) } }
        @keyframes float2 { 0%, 100% { transform: translateY(0) rotate(0deg) } 50% { transform: translateY(-10px) rotate(-1deg) } }
        @keyframes marquee { 0% { transform: translateX(0) } 100% { transform: translateX(-50%) } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(32px) } to { opacity: 1; transform: translateY(0) } }
        @keyframes glow { 0%, 100% { opacity: .5 } 50% { opacity: .9 } }
        @keyframes orbit-ring { from { transform: translate(-50%,-50%) rotate(0) } to { transform: translate(-50%,-50%) rotate(360deg) } }

        .reveal { opacity: 0; transform: translateY(32px); transition: opacity .75s cubic-bezier(.16,1,.3,1), transform .75s cubic-bezier(.16,1,.3,1); }
        .reveal.visible { opacity: 1; transform: none; }
        .reveal-d1 { transition-delay: .08s; } .reveal-d2 { transition-delay: .16s; } .reveal-d3 { transition-delay: .24s; }
        .reveal-d4 { transition-delay: .32s; } .reveal-d5 { transition-delay: .4s; } .reveal-d6 { transition-delay: .48s; }

        .c-nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
          background: rgba(5,10,24,.72); border-bottom: 1px solid rgba(255,255,255,.04);
        }
        .nav-inner { display: flex; align-items: center; justify-content: space-between; max-width: 1100px; margin: 0 auto; padding: 0 24px; height: 60px; }
        .logo { display: flex; align-items: center; gap: 9px; font-weight: 700; font-size: 18px; color: var(--white); letter-spacing: -.02em; }
        .logo-mark {
          width: 26px; height: 26px; border-radius: 8px; background: linear-gradient(135deg, var(--cyan), var(--blue));
          display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 800; color: #fff;
        }
        .nav-right { display: flex; align-items: center; gap: 24px; }
        .nav-link { font-size: 13px; color: var(--muted); font-weight: 500; transition: color .2s; }
        .nav-link:hover { color: var(--white); }
        .nav-btn {
          font-size: 13px; font-weight: 600; color: #fff; padding: 8px 18px; border-radius: var(--radius-xs);
          background: linear-gradient(135deg, var(--blue), var(--blue-deep));
          box-shadow: 0 2px 10px rgba(59,130,246,.25); transition: all .25s;
        }
        .nav-btn:hover { box-shadow: 0 4px 20px rgba(59,130,246,.45); transform: translateY(-1px); }

        .hero {
          position: relative; min-height: 100vh; display: flex; align-items: center; justify-content: center;
          padding: 130px 24px 100px; overflow: hidden;
          background: radial-gradient(ellipse 100% 70% at 50% -5%, #0d2550 0%, var(--navy) 55%);
        }
        .hero-grid-bg {
          position: absolute; inset: 0;
          background-image: linear-gradient(rgba(59,130,246,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,.04) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: radial-gradient(ellipse 60% 55% at 50% 40%, black 20%, transparent 70%);
          -webkit-mask-image: radial-gradient(ellipse 60% 55% at 50% 40%, black 20%, transparent 70%);
          pointer-events: none;
        }
        .hero-glow-a {
          position: absolute; width: 600px; height: 600px; top: 10%; left: 50%; transform: translateX(-50%);
          background: radial-gradient(circle, rgba(59,130,246,.12) 0%, rgba(34,211,238,.04) 40%, transparent 65%);
          pointer-events: none; animation: glow 5s ease-in-out infinite;
        }
        .hero-glow-b {
          position: absolute; width: 400px; height: 400px; top: 60%; left: 20%;
          background: radial-gradient(circle, rgba(34,211,238,.06) 0%, transparent 60%); pointer-events: none;
        }
        .hero-center { position: relative; z-index: 5; text-align: center; max-width: 680px; display: flex; flex-direction: column; align-items: center; }
        .hero h1 { font-weight: 800; font-size: clamp(42px, 6.5vw, 76px); line-height: 1.04; letter-spacing: -.04em; color: var(--white); margin-bottom: 24px; margin-top: 0; }
        .hero-sub { font-size: 17px; color: var(--muted); line-height: 1.7; max-width: 460px; margin-bottom: 40px; margin-top: 0; }
        .hero-ctas { display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; margin-bottom: 36px; }

        .btn-main {
          display: inline-flex; align-items: center; gap: 8px; background: linear-gradient(135deg, var(--blue), var(--blue-deep)); color: #fff;
          font-size: 15px; font-weight: 600; padding: 14px 28px; border-radius: 12px; transition: all .25s;
          box-shadow: 0 4px 20px rgba(59,130,246,.3), inset 0 1px 0 rgba(255,255,255,.08);
        }
        .btn-main:hover { transform: translateY(-2px); box-shadow: 0 8px 36px rgba(59,130,246,.45); }
        .btn-outline {
          display: inline-flex; align-items: center; gap: 8px; background: rgba(255,255,255,.03); color: var(--muted);
          font-size: 15px; font-weight: 500; padding: 14px 28px; border-radius: 12px; border: 1px solid rgba(255,255,255,.08); transition: all .25s;
        }
        .btn-outline:hover { border-color: rgba(59,130,246,.25); color: var(--white); background: rgba(59,130,246,.04); }

        .hero-social-proof { display: flex; align-items: center; gap: 10px; font-size: 13px; color: var(--slate); }
        .avatar-stack { display: flex; }
        .avatar-stack span {
          width: 28px; height: 28px; border-radius: 50%; border: 2px solid var(--navy); display: flex; align-items: center; justify-content: center;
          font-size: 10px; font-weight: 700; color: #fff; margin-left: -8px;
        }
        .avatar-stack span:first-child { margin-left: 0; }
        .avatar-stack .a1 { background: linear-gradient(135deg, #3b82f6, #1d4ed8); }
        .avatar-stack .a2 { background: linear-gradient(135deg, var(--cyan), #0891b2); }
        .avatar-stack .a3 { background: linear-gradient(135deg, #8b5cf6, #6d28d9); }
        .avatar-stack .a4 { background: linear-gradient(135deg, var(--green), #15803d); }
        .avatar-stack .a5 { background: rgba(30,40,65,.9); color: var(--muted); font-size: 9px; }

        .hero-cards { position: absolute; inset: 0; pointer-events: none; z-index: 2; }
        .hcard {
          position: absolute; background: rgba(8,14,30,.82); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,.07); border-radius: 14px; padding: 14px 16px; max-width: 230px; font-size: 12px;
          animation: fadeUp .6s cubic-bezier(.16,1,.3,1) forwards, float1 7s ease-in-out infinite;
        }
        .hcard-tl { top: 18%; left: 5%; opacity: 0; animation-fill-mode: backwards; animation-delay: .9s, .9s; }
        .hcard-tr { top: 20%; right: 5%; animation-name: fadeUp, float2; opacity: 0; animation-fill-mode: backwards; animation-delay: 1.1s, 1.1s; animation-duration: .6s, 6s; }
        .hcard-bl { bottom: 20%; left: 4%; animation-name: fadeUp, float2; opacity: 0; animation-fill-mode: backwards; animation-delay: 1.3s, 1.3s; animation-duration: .6s, 8s; }
        .hcard-br { bottom: 22%; right: 4%; opacity: 0; animation-fill-mode: backwards; animation-delay: 1.5s, 1.5s; }
        
        .hcard-label { font-family: var(--mono); font-size: 9px; color: var(--slate); text-transform: uppercase; letter-spacing: .1em; margin-bottom: 7px; }
        .hcard-score { font-weight: 800; font-size: 28px; line-height: 1; margin-bottom: 6px; color: var(--white); }
        .hcard-score small { font-size: 13px; font-weight: 400; color: var(--slate); }
        .hcard-tags { display: flex; gap: 4px; flex-wrap: wrap; }
        .hcard-tags span { font-family: var(--mono); font-size: 9px; color: var(--cyan); background: rgba(34,211,238,.07); border: 1px solid rgba(34,211,238,.12); border-radius: 4px; padding: 2px 6px; }
        .hcard-trend { display: flex; align-items: center; gap: 4px; font-family: var(--mono); font-size: 11px; color: var(--green); margin-top: 7px; }
        .hcard-row { display: flex; align-items: center; gap: 7px; margin-bottom: 5px; }
        .hcard-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--green); animation: pulse 2s ease-in-out infinite; flex-shrink: 0; }
        .hcard-name { font-weight: 600; color: var(--white); font-size: 12px; }
        .hcard-body { color: var(--muted); font-size: 11px; line-height: 1.5; }
        .hcard-body strong { color: var(--white); font-weight: 600; }
        .hcard-amount { font-family: var(--mono); font-size: 16px; font-weight: 600; color: var(--green); margin: 3px 0; }
        .hcard-time { font-family: var(--mono); font-size: 9px; color: var(--slate); margin-top: 4px; }
        .hcard-progress { margin-top: 7px; height: 3px; background: rgba(255,255,255,.06); border-radius: 2px; overflow: hidden; }
        .hcard-fill { width: 66%; height: 100%; background: linear-gradient(90deg, var(--blue), var(--cyan)); border-radius: 2px; }

        @media(max-width:1200px){.hero-cards{display:none;}}

        .ticker-section {
          background: var(--navy-2); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); padding: 14px 0; overflow: hidden;
          mask-image: linear-gradient(90deg, transparent, black 6%, black 94%, transparent);
          -webkit-mask-image: linear-gradient(90deg, transparent, black 6%, black 94%, transparent);
        }
        .ticker-track { display: flex; white-space: nowrap; animation: marquee 40s linear infinite; width: max-content; }
        .ticker-track span { display: inline-flex; align-items: center; gap: 8px; font-family: var(--mono); font-size: 12px; padding: 0 28px; }
        .ticker-track span:nth-child(odd) { color: var(--cyan); opacity: .7; }
        .ticker-track span:nth-child(even) { color: var(--blue-light); opacity: .6; }

        .what-section { padding: 120px 24px; }
        .what-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
        .what-text h2 { font-weight: 800; font-size: clamp(28px, 3.5vw, 42px); line-height: 1.12; letter-spacing: -.03em; color: var(--white); margin-bottom: 20px; margin-top:0; }
        .what-text p { font-size: 16px; color: var(--muted); line-height: 1.75; margin-bottom: 24px; margin-top:0; }
        .what-points { display: flex; flex-direction: column; gap: 14px; }
        .what-point { display: flex; align-items: flex-start; gap: 12px; font-size: 14px; color: var(--muted); line-height: 1.6; }
        .what-point-icon {
          width: 24px; height: 24px; border-radius: 6px; flex-shrink: 0; margin-top: 2px;
          background: rgba(34,211,238,.08); border: 1px solid rgba(34,211,238,.15);
          display: flex; align-items: center; justify-content: center;
        }
        .what-point-icon svg { width: 12px; height: 12px; stroke: var(--cyan); fill: none; strokeWidth: 2.5; strokeLinecap: round; strokeLinejoin: round; }

        .mock-feed {
          background: var(--navy-card); border: 1px solid rgba(255,255,255,.06); border-radius: 20px;
          padding: 24px; position: relative; overflow: hidden;
        }
        .mock-feed::before { content: ''; position: absolute; top: 0; left: 20px; right: 20px; height: 1px; background: linear-gradient(90deg, transparent, rgba(59,130,246,.25), transparent); }
        .feed-header { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; }
        .feed-avatar {
          width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, var(--cyan), var(--blue));
          display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 16px; color: #fff; box-shadow: 0 0 16px rgba(34,211,238,.2);
        }
        .feed-user { flex: 1; }
        .feed-name { font-weight: 600; font-size: 14px; color: var(--white); display: flex; align-items: center; gap: 6px; }
        .feed-verified { width: 14px; height: 14px; border-radius: 50%; background: var(--blue); display: flex; align-items: center; justify-content: center; }
        .feed-verified svg { width: 8px; height: 8px; stroke: #fff; fill: none; strokeWidth: 3; strokeLinecap: round; strokeLinejoin: round;}
        .feed-meta { font-size: 12px; color: var(--slate); }
        .feed-score-badge { font-family: var(--mono); font-size: 11px; font-weight: 600; padding: 4px 10px; border-radius: 6px; background: rgba(59,130,246,.1); border: 1px solid rgba(59,130,246,.2); color: var(--blue-light); }
        .feed-content { font-size: 14px; color: var(--muted); line-height: 1.65; margin-bottom: 16px; }
        .feed-content strong { color: var(--white); font-weight: 600; }
        .feed-proof-box { background: rgba(34,211,238,.04); border: 1px solid rgba(34,211,238,.1); border-radius: 12px; padding: 14px 16px; margin-bottom: 16px; }
        .feed-proof-row { display: flex; align-items: center; gap: 8px; font-size: 12px; margin-bottom: 6px; }
        .feed-proof-row:last-child { margin-bottom: 0; }
        .feed-proof-row svg { width: 14px; height: 14px; stroke: var(--cyan); fill: none; strokeWidth: 2; flex-shrink: 0; strokeLinecap: round; strokeLinejoin: round;}
        .feed-proof-row span { color: var(--muted); }
        .feed-proof-row strong { color: var(--white); font-weight: 600; }
        .feed-actions { display: flex; gap: 20px; }
        .feed-action { display: flex; align-items: center; gap: 5px; font-size: 12px; color: var(--slate); transition: color .2s; cursor: pointer; }
        .feed-action svg { width: 15px; height: 15px; stroke: currentColor; fill: none; strokeWidth: 1.8; strokeLinecap: round; strokeLinejoin: round;}
        .feed-action:hover { color: var(--cyan); }
        .feed-action.vouch-btn { color: var(--blue-light); } .feed-action.vouch-btn:hover { color: var(--cyan); }

        .mock-notifs { position: absolute; top: 16px; right: -12px; display: flex; flex-direction: column; gap: 8px; z-index: 3; }
        .notif {
          background: rgba(8,14,30,.9); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255,255,255,.08); border-radius: 10px; padding: 10px 14px; font-size: 11px; color: var(--muted);
          display: flex; align-items: center; gap: 8px; white-space: nowrap; box-shadow: 0 8px 24px rgba(0,0,0,.4);
          animation: fadeUp .5s cubic-bezier(.16,1,.3,1) both;
        }
        .notif:nth-child(2) { animation-delay: .2s; } .notif:nth-child(3) { animation-delay: .4s; }
        .notif-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
        .notif-green { background: var(--green); } .notif-blue { background: var(--blue); } .notif-amber { background: var(--amber); }
        .notif strong { color: var(--white); font-weight: 600; }

        .how-section { background: var(--navy-2); padding: 120px 24px; position: relative; }
        .how-section::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, rgba(34,211,238,.15), rgba(59,130,246,.2), rgba(34,211,238,.15), transparent); }
        .how-header { text-align: center; margin-bottom: 72px; }
        .how-header h2 { font-weight: 800; font-size: clamp(28px, 3.5vw, 42px); line-height: 1.12; letter-spacing: -.03em; color: var(--white); margin-bottom: 14px; margin-top:0; }
        .how-header p { font-size: 15px; color: var(--muted); max-width: 440px; margin: 0 auto; }
        .steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; max-width: 1100px; margin: 0 auto; position: relative; }
        .steps::before {
          content: ''; position: absolute; top: 40px; left: calc(16.66% + 16px); right: calc(16.66% + 16px); height: 1px;
          background: linear-gradient(90deg, rgba(34,211,238,.35), rgba(59,130,246,.35), rgba(34,211,238,.35));
        }
        .step {
          background: rgba(10,18,34,.65); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,.05); border-radius: var(--radius); padding: 28px 24px; position: relative; overflow: hidden; transition: border-color .3s, transform .3s;
        }
        .step::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, var(--cyan), var(--blue)); opacity: .5; }
        .step:hover { border-color: rgba(59,130,246,.15); transform: translateY(-3px); }
        .step-num-bg {
          position: absolute; top: -14px; right: 8px; font-weight: 800; font-size: 120px;
          background: linear-gradient(135deg, var(--cyan), var(--blue)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          opacity: .04; line-height: 1; pointer-events: none; user-select: none;
        }
        .step-icon {
          width: 46px; height: 46px; background: linear-gradient(135deg, rgba(34,211,238,.07), rgba(59,130,246,.12));
          border: 1px solid rgba(34,211,238,.18); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 18px;
        }
        .step-icon svg { width: 20px; height: 20px; stroke: var(--cyan); fill: none; strokeWidth: 1.8; strokeLinecap: round; strokeLinejoin: round; }
        .step-label { font-family: var(--mono); font-size: 10px; color: var(--cyan); letter-spacing: .1em; margin-bottom: 8px; opacity: .7; }
        .step h3 { font-weight: 700; font-size: 18px; color: var(--white); margin-bottom: 10px; letter-spacing: -.01em; margin-top:0; }
        .step p { font-size: 13px; color: var(--muted); line-height: 1.7; margin:0; }

        .features-section { padding: 120px 24px; }
        .features-header { text-align: center; margin-bottom: 64px; }
        .features-header h2 { font-weight: 800; font-size: clamp(28px, 3.5vw, 42px); line-height: 1.12; letter-spacing: -.03em; color: var(--white); margin-bottom: 14px; margin-top:0; }
        .features-header p { font-size: 15px; color: var(--muted); max-width: 460px; margin: 0 auto; }
        .features-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; max-width: 1100px; margin: 0 auto; }
        .feat {
          background: rgba(12,20,36,.6); border: 1px solid rgba(255,255,255,.05); border-radius: var(--radius);
          padding: 28px 24px; transition: border-color .3s, transform .3s; position: relative; overflow: hidden;
        }
        .feat::after { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, rgba(59,130,246,.2), transparent); opacity: 0; transition: opacity .3s; }
        .feat:hover { border-color: rgba(59,130,246,.15); transform: translateY(-3px); }
        .feat:hover::after { opacity: 1; }
        .feat-icon {
          width: 40px; height: 40px; background: linear-gradient(135deg, rgba(34,211,238,.07), rgba(59,130,246,.12));
          border: 1px solid rgba(59,130,246,.15); border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px;
        }
        .feat-icon svg { width: 18px; height: 18px; stroke: var(--cyan); fill: none; strokeWidth: 1.8; strokeLinecap: round; strokeLinejoin: round; }
        .feat h3 { font-weight: 700; font-size: 16px; color: var(--white); margin-bottom: 8px; letter-spacing: -.01em; margin-top:0; }
        .feat p { font-size: 13px; color: var(--muted); line-height: 1.7; margin:0;}

        .token-section { background: var(--navy-3); padding: 120px 24px; position: relative; overflow: hidden; }
        .token-section::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, rgba(59,130,246,.2), rgba(34,211,238,.25), rgba(59,130,246,.2), transparent); }
        .token-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 72px; align-items: center; max-width: 1100px; margin: 0 auto; }
        .token-text h2 { font-weight: 800; font-size: clamp(28px, 3.5vw, 42px); line-height: 1.12; letter-spacing: -.03em; color: var(--white); margin-bottom: 16px; margin-top:0;}
        .token-text > p { font-size: 15px; color: var(--muted); line-height: 1.75; margin-bottom: 28px; margin-top:0;}
        .token-points { display: flex; flex-direction: column; gap: 16px; }
        .token-point { display: flex; gap: 14px; align-items: flex-start; }
        .token-point-icon {
          width: 36px; height: 36px; flex-shrink: 0; background: linear-gradient(135deg, rgba(34,211,238,.06), rgba(59,130,246,.1));
          border: 1px solid rgba(34,211,238,.12); border-radius: 10px; display: flex; align-items: center; justify-content: center;
        }
        .token-point-icon svg { width: 16px; height: 16px; stroke: var(--cyan); fill: none; strokeWidth: 1.8; strokeLinecap: round; strokeLinejoin: round; }
        .token-point h4 { font-weight: 600; font-size: 14px; color: var(--white); margin-bottom: 3px; margin-top:0;}
        .token-point p { font-size: 13px; color: var(--muted); line-height: 1.6; margin:0; }

        .token-visual { display: flex; flex-direction: column; align-items: center; position: relative; }
        .token-orb-wrap { position: relative; width: 220px; height: 220px; margin-bottom: 24px; }
        .token-orb-glow {
          position: absolute; inset: -40px; border-radius: 50%;
          background: radial-gradient(circle, rgba(34,211,238,.1) 0%, rgba(59,130,246,.12) 30%, transparent 65%);
          animation: glow 3s ease-in-out infinite; pointer-events: none;
        }
        .token-orb {
          width: 180px; height: 180px; border-radius: 50%; background: radial-gradient(circle at 35% 30%, rgba(34,211,238,.6), #3b82f6 35%, #1d4ed8 65%, #0d3580);
          display: flex; align-items: center; justify-content: center; position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);
          box-shadow: 0 0 0 1px rgba(34,211,238,.12), 0 0 60px rgba(59,130,246,.3), 0 0 30px rgba(34,211,238,.12);
        }
        .token-orb-label { font-weight: 800; font-size: 22px; color: #fff; text-shadow: 0 0 16px rgba(34,211,238,.35); position: relative; z-index: 1; }
        .token-orb-ring {
          position: absolute; width: 210px; height: 210px; top: 50%; left: 50%; border: 1.5px dashed rgba(59,130,246,.2); border-radius: 50%;
          animation: orbit-ring 20s linear infinite;
        }
        .token-orb-dot {
          position: absolute; width: 8px; height: 8px; border-radius: 50%; background: var(--cyan); box-shadow: 0 0 10px var(--cyan);
          top: 0; left: 50%; transform: translate(-50%,-50%);
        }
        .token-live { font-family: var(--mono); font-size: 11px; color: var(--slate); margin-bottom: 4px; }
        .token-platform { font-weight: 700; font-size: 16px; color: var(--white); margin-bottom: 16px; }
        .token-stats-row { display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; }
        .token-stat { background: rgba(10,18,34,.6); border: 1px solid rgba(255,255,255,.05); border-radius: var(--radius-sm); padding: 12px 18px; text-align: center; }
        .token-stat-val {
          display: block; font-family: var(--mono); font-size: 14px; font-weight: 600; margin-bottom: 2px;
          background: linear-gradient(135deg, var(--cyan), var(--blue)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .token-stat-lbl { font-size: 11px; color: var(--muted); }

        .waitlist-section {
          position: relative; padding: 140px 24px; overflow: hidden;
          background: radial-gradient(ellipse 80% 60% at 50% 50%, rgba(15,30,70,.85), var(--navy) 65%);
        }
        .waitlist-glow {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 45% 45% at 30% 50%, rgba(34,211,238,.04), transparent), radial-gradient(ellipse 55% 50% at 70% 50%, rgba(59,130,246,.07), transparent);
          pointer-events: none;
        }
        .waitlist-dots {
          position: absolute; inset: 0; background-image: radial-gradient(rgba(255,255,255,.02) 1px, transparent 1px); background-size: 28px 28px; pointer-events: none;
          mask-image: radial-gradient(ellipse 75% 75% at 50% 50%, black, transparent); -webkit-mask-image: radial-gradient(ellipse 75% 75% at 50% 50%, black, transparent);
        }
        .waitlist-inner { position: relative; z-index: 2; max-width: 520px; margin: 0 auto; text-align: center; }
        .waitlist-inner h2 { font-weight: 800; font-size: clamp(32px, 5vw, 52px); line-height: 1.08; letter-spacing: -.035em; color: var(--white); margin-bottom: 16px; margin-top:0;}
        .waitlist-inner p { font-size: 15px; color: var(--muted); line-height: 1.75; margin-bottom: 40px; margin-top:0;}
        .waitlist-form { display: flex; flex-direction: column; gap: 12px; }
        .email-row { display: flex; gap: 10px; }
        .email-input {
          flex: 1; background: rgba(10,18,34,.7); backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,.07); border-radius: 12px; padding: 15px 20px;
          color: var(--white); font-size: 15px; outline: none; transition: border-color .25s, box-shadow .25s;
        }
        .email-input::placeholder { color: var(--slate); }
        .email-input:focus { border-color: rgba(34,211,238,.22); box-shadow: 0 0 0 3px rgba(34,211,238,.04); }
        .submit-btn {
          display: inline-flex; align-items: center; justify-content: center; gap: 8px;
          background: linear-gradient(135deg, #22d3ee, #3b82f6, #1d4ed8); background-size: 200% 200%; animation: shimmer 4s ease infinite;
          color: #fff; font-size: 15px; font-weight: 700; padding: 15px 24px; border-radius: 12px;
          transition: all .25s; white-space: nowrap; box-shadow: 0 4px 24px rgba(59,130,246,.35);
        }
        .submit-btn:hover { box-shadow: 0 8px 36px rgba(59,130,246,.5); transform: translateY(-2px); }
        .waitlist-or { font-size: 12px; color: var(--slate); display: flex; align-items: center; gap: 12px; }
        .waitlist-or::before, .waitlist-or::after { content: ''; flex: 1; height: 1px; background: var(--border); }
        .social-signup { display: flex; gap: 10px; }
        .social-btn {
          flex: 1; display: flex; align-items: center; justify-content: center; gap: 8px;
          background: rgba(10,18,34,.5); border: 1px solid rgba(255,255,255,.06); border-radius: 12px; padding: 13px; color: var(--muted); font-size: 13px; font-weight: 500; transition: all .25s;
        }
        .social-btn:hover { border-color: rgba(34,211,238,.15); color: var(--white); background: rgba(34,211,238,.03); }
        .social-btn svg { width: 18px; height: 18px; stroke: var(--cyan); fill: none; strokeWidth: 1.8; flex-shrink: 0; strokeLinecap: round; strokeLinejoin: round;}
        .waitlist-trust { display: flex; justify-content: center; gap: 20px; margin-top: 6px; flex-wrap: wrap; }
        .waitlist-trust span { display: flex; align-items: center; gap: 5px; font-size: 12px; color: var(--slate); }
        .waitlist-trust svg { width: 12px; height: 12px; stroke: var(--cyan); fill: none; strokeWidth: 2; strokeLinecap: round; strokeLinejoin: round;}
        .success-msg {
          display: flex; align-items: center; justify-content: center; gap: 10px;
          padding: 18px; background: rgba(34,197,94,.08); border: 1px solid rgba(34,197,94,.2); border-radius: 12px;
          color: var(--green); font-size: 15px; font-weight: 500;
        }

        .c-footer { background: var(--navy-2); border-top: 1px solid var(--border); padding: 48px 24px 28px; position: relative; }
        .c-footer::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, rgba(34,211,238,.12), rgba(59,130,246,.18), rgba(34,211,238,.12), transparent); }
        .footer-inner { display: flex; align-items: center; justify-content: space-between; max-width: 1100px; margin: 0 auto; flex-wrap: wrap; gap: 16px; }
        .footer-left { display: flex; align-items: center; gap: 20px; flex-wrap: wrap; }
        .footer-copy { font-size: 13px; color: var(--slate); }
        .footer-links { display: flex; gap: 16px; }
        .footer-links a { font-size: 13px; color: var(--slate); transition: color .2s; }
        .footer-links a:hover { color: var(--white); }
        .footer-socials { display: flex; gap: 12px; }
        .footer-socials a { color: var(--slate); transition: color .2s; display: flex; }
        .footer-socials a:hover { color: var(--white); }
        .footer-socials svg { width: 16px; height: 16px; stroke: currentColor; fill: none; strokeWidth: 1.8; strokeLinecap: round; strokeLinejoin: round;}

        @media(max-width:1024px){
          .what-grid { grid-template-columns: 1fr; gap: 48px; }
          .token-layout { grid-template-columns: 1fr; gap: 48px; }
          .token-visual { order: -1; }
          .mock-notifs { display: none; }
        }
        @media(max-width:768px){
          .features-grid { grid-template-columns: 1fr; }
          .steps { grid-template-columns: 1fr; }
          .steps::before { display: none; }
          .social-signup { flex-direction: column; }
          .nav-link { display: none; }
        }
        @media(max-width:480px){
          .email-row { flex-direction: column; }
          .hero h1 { font-size: clamp(36px, 11vw, 52px); }
          .footer-inner { flex-direction: column; text-align: center; }
          .footer-left { justify-content: center; }
        }
      `}} />

      <div className="landing-wrapper">
        
        {/* NAV */}
        <nav className="c-nav">
          <div className="nav-inner">
            <Link href="/" className="logo"><div className="logo-mark">P</div>proofd</Link>
            <div className="nav-right">
              <a href="#what" className="nav-link">What is Proofd</a>
              <a href="#how" className="nav-link">How It Works</a>
              <a href="#token" className="nav-link">$PROOF</a>
              <button onClick={handleNavCta} className="nav-btn">
                {ready && authenticated ? "Go to App" : "Join Waitlist"}
              </button>
            </div>
          </div>
        </nav>

        {/* HERO */}
        <section className="hero">
          <div className="hero-grid-bg"></div>
          <div className="hero-glow-a"></div>
          <div className="hero-glow-b"></div>

          <div className="hero-cards">
            <div className="hcard hcard-tl">
              <div className="hcard-label">PROOF SCORE</div>
              <div className="hcard-score">847 <small>/1000</small></div>
              <div className="hcard-tags"><span>Solidity</span><span>React</span><span>Rust</span></div>
              <div className="hcard-trend">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 9L5 5L8 7L11 3" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                +12 this week
              </div>
            </div>
            <div className="hcard hcard-tr">
              <div className="hcard-label">STAKE RECEIVED</div>
              <div className="hcard-row"><span className="hcard-dot"></span><span className="hcard-name">kemi.eth</span></div>
              <div className="hcard-body">Staked <strong>2,400 $PROOF</strong> on your Solidity</div>
              <div className="hcard-time">2 min ago</div>
            </div>
            <div className="hcard hcard-bl">
              <div className="hcard-label">BOUNTY COMPLETED</div>
              <div className="hcard-amount">+500 $PROOF</div>
              <div className="hcard-body">DAOStack · Bounty #441</div>
              <div className="hcard-time">Credential minted</div>
            </div>
            <div className="hcard hcard-br">
              <div className="hcard-label">ESCROW ACTIVE</div>
              <div className="hcard-body"><strong>AngelDAO</strong> · Interview 2/3</div>
              <div className="hcard-progress"><div className="hcard-fill"></div></div>
              <div className="hcard-time">$2,400 locked</div>
            </div>
          </div>

          <div className="hero-center">
            <div className="pill" style={{ marginBottom: '32px', animation: 'fadeUp .6s .15s both' }}>
              <span className="pill-dot"></span> Building in public · $PROOF on Bags.fun
            </div>
            <h1 style={{ animation: 'fadeUp .7s .3s both' }}>Your work<br/><span className="grad">speaks</span><br/>for itself.</h1>
            <p className="hero-sub" style={{ animation: 'fadeUp .6s .45s both' }}>The developer network where your reputation is on-chain, endorsements have real economic weight, and your commits are your CV.</p>
            <div className="hero-ctas" style={{ animation: 'fadeUp .6s .6s both' }}>
              <button onClick={handleNavCta} className="btn-main">
                {ready && authenticated ? "Return to Dashboard" : "Join the Waitlist"}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
              </button>
              <a href="#what" className="btn-outline">
                Learn More
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
              </a>
            </div>
            <div className="hero-social-proof" style={{ animation: 'fadeUp .6s .75s both' }}>
              <div className="avatar-stack">
                <span className="a1">A</span><span className="a2">K</span><span className="a3">D</span><span className="a4">J</span><span className="a5">+9k</span>
              </div>
              <span>10,000+ devs on the waitlist</span>
            </div>
          </div>
        </section>

        {/* TICKER */}
        <section className="ticker-section">
          <div className="ticker-track">
            {DOUBLED_TICKER.map((item, i) => (
              <span key={i}>→ {item}</span>
            ))}
          </div>
        </section>

        {/* WHAT IS PROOFD */}
        <section id="what" className="what-section">
          <div className="c-container">
            <div className="what-grid">
              <div className="what-text reveal">
                <div className="pill" style={{ marginBottom: '20px' }}>// what we're building</div>
                <h2>A social network where<br/>your <span className="grad">proof</span> is the product.</h2>
                <p>Proofd is a developer-first social platform backed by blockchain. Your GitHub activity, completed bounties, and peer endorsements all feed into a single on-chain reputation score that follows you everywhere.</p>
                <div className="what-points">
                  <div className="what-point">
                    <div className="what-point-icon"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div>
                    <span><strong style={{ color: 'var(--white)' }}>Proof Score (0-1000)</strong> built from real activity, not self-reported skills</span>
                  </div>
                  <div className="what-point">
                    <div className="what-point-icon"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div>
                    <span><strong style={{ color: 'var(--white)' }}>Stake-backed endorsements</strong> where vouchers put $PROOF tokens on the line</span>
                  </div>
                  <div className="what-point">
                    <div className="what-point-icon"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div>
                    <span><strong style={{ color: 'var(--white)' }}>A social feed</strong> where shipping code, earning bounties, and getting vouched is the content</span>
                  </div>
                  <div className="what-point">
                    <div className="what-point-icon"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div>
                    <span><strong style={{ color: 'var(--white)' }}>Anti-ghost hiring</strong> with recruiter escrow that protects developers</span>
                  </div>
                </div>
              </div>

              {/* Mock Social Feed */}
              <div className="reveal" style={{ position: 'relative' }}>
                <div className="mock-notifs">
                  <div className="notif"><span className="notif-dot notif-green"></span><strong>kemi.eth</strong> vouched for you</div>
                  <div className="notif"><span className="notif-dot notif-blue"></span>Score updated: <strong>847</strong></div>
                  <div className="notif"><span className="notif-dot notif-amber"></span>New bounty: <strong>5,000 $PROOF</strong></div>
                </div>
                <div className="mock-feed">
                  <div className="feed-header">
                    <div className="feed-avatar">A</div>
                    <div className="feed-user">
                      <div className="feed-name">
                        0xAbdur.eth
                        <span className="feed-verified"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></span>
                      </div>
                      <div className="feed-meta">@abdurdev · 2h ago</div>
                    </div>
                    <span className="feed-score-badge">847</span>
                  </div>
                  <div className="feed-content">
                    Just completed Bounty #441 for <strong>DAOStack</strong>. Deployed the governance module to mainnet. Credential auto-minted to my profile.
                  </div>
                  <div className="feed-proof-box">
                    <div className="feed-proof-row">
                      <svg viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                      <span>Bounty #441 completed · <strong>+500 $PROOF</strong></span>
                    </div>
                    <div className="feed-proof-row">
                      <svg viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                      <span>Contract <strong>0x4f2a...8b1c</strong> verified on-chain</span>
                    </div>
                    <div className="feed-proof-row">
                      <svg viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                      <span>Credential: <strong>Soulbound NFT minted</strong></span>
                    </div>
                  </div>
                  <div className="feed-actions">
                    <span className="feed-action vouch-btn">
                      <svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                      Vouch
                    </span>
                    <span className="feed-action">
                      <svg viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                      12
                    </span>
                    <span className="feed-action">
                      <svg viewBox="0 0 24 24"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
                      Share
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how" className="how-section">
          <div className="c-container">
            <div className="how-header reveal">
              <div className="pill" style={{ marginBottom: '20px' }}>// how it works</div>
              <h2>Ship code. Build proof. Get found.</h2>
              <p>Three steps between you and a reputation that actually means something.</p>
            </div>
            <div className="steps">
              <div className="step reveal reveal-d1">
                <div className="step-num-bg">01</div>
                <div className="step-icon"><svg viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></div>
                <div className="step-label">STEP 01</div>
                <h3>Connect Your Stack</h3>
                <p>Link your GitHub and connect your wallet. Proofd reads your public commit history and on-chain activity automatically.</p>
              </div>
              <div className="step reveal reveal-d2">
                <div className="step-num-bg">02</div>
                <div className="step-icon"><svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg></div>
                <div className="step-label">STEP 02</div>
                <h3>Your Proof Accumulates</h3>
                <p>Complete bounties, get vouched, earn $PROOF. Every action mints a verifiable credential. Your score climbs on merit.</p>
              </div>
              <div className="step reveal reveal-d3">
                <div className="step-num-bg">03</div>
                <div className="step-icon"><svg viewBox="0 0 24 24"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg></div>
                <div className="step-label">STEP 03</div>
                <h3>Get Found by Score</h3>
                <p>DAOs, startups, and companies discover you through your score. No cover letters. No resume padding. Just proof.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES PREVIEW */}
        <section className="features-section">
          <div className="c-container">
            <div className="features-header reveal">
              <div className="pill" style={{ marginBottom: '20px' }}>// what's coming</div>
              <h2>Built for devs who actually ship.</h2>
              <p>Every feature exists to make real work visible and valuable.</p>
            </div>
            <div className="features-grid">
              <div className="feat reveal reveal-d1">
                <div className="feat-icon"><svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div>
                <h3>Proof Score</h3>
                <p>0-1000 reputation index. Commits, contracts, bounties, vouches. All verifiable. Nothing faked.</p>
              </div>
              <div className="feat reveal reveal-d2">
                <div className="feat-icon"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M16 8l-4 4-4-4"/><path d="M12 12v6"/></svg></div>
                <h3>Stake-to-Endorse</h3>
                <p>Vouchers lock $PROOF on your skills. They earn when you perform. Skin in the game.</p>
              </div>
              <div className="feat reveal reveal-d3">
                <div className="feat-icon"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 8v8"/><path d="M8 12h8"/></svg></div>
                <h3>Bounty Board</h3>
                <p>DAOs and companies post work. You complete it. Credential auto-mints. Resume builds itself.</p>
              </div>
              <div className="feat reveal reveal-d4">
                <div className="feat-icon"><svg viewBox="0 0 24 24"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg></div>
                <h3>GitHub Sync</h3>
                <p>Connect once. Your commits, repos, and contribution patterns become verified on-chain proof.</p>
              </div>
              <div className="feat reveal reveal-d5">
                <div className="feat-icon"><svg viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></div>
                <h3>Anti-Ghost Hiring</h3>
                <p>Recruiters escrow $PROOF before interviewing. Ghost a dev? Escrow releases to them.</p>
              </div>
              <div className="feat reveal reveal-d6">
                <div className="feat-icon"><svg viewBox="0 0 24 24"><path d="M12 3L1 9l11 6 9-4.91V17M5 13.18v4L12 21l7-3.82v-4"/></svg></div>
                <h3>DAO Governance</h3>
                <p>Vote weight = tokens held x reputation score. Not just your bag. Merit matters too.</p>
              </div>
            </div>
          </div>
        </section>

        {/* $PROOF TOKEN */}
        <section id="token" className="token-section">
          <div className="c-container">
            <div className="token-layout">
              <div className="token-text reveal">
                <div className="pill" style={{ marginBottom: '20px' }}>// the token</div>
                <h2>$PROOF powers<br/>the whole thing.</h2>
                <p>Not a governance token bolted on as an afterthought. $PROOF is the engine behind every endorsement, bounty, and hire on the platform.</p>
                <div className="token-points">
                  <div className="token-point">
                    <div className="token-point-icon"><svg viewBox="0 0 24 24"><path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4"/><path d="M4 6v12c0 1.1.9 2 2 2h14v-4"/></svg></div>
                    <div><h4>Stake to Vouch</h4><p>Lock tokens on devs you believe in. Earn yield when they deliver.</p></div>
                  </div>
                  <div className="token-point">
                    <div className="token-point-icon"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 8v8"/><path d="M8 12h8"/></svg></div>
                    <div><h4>Power Bounties</h4><p>Companies escrow $PROOF to post work. Completion pays out. Unresolved bounties burn.</p></div>
                  </div>
                  <div className="token-point">
                    <div className="token-point-icon"><svg viewBox="0 0 24 24"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1.5-2.5S8 8.38 8 7a2.5 2.5 0 0 1 4 0"/><path d="M12 2v2m0 16v2"/></svg></div>
                    <div><h4>Deflationary by Design</h4><p>Minting, disputes, and expired bounties all permanently reduce supply.</p></div>
                  </div>
                </div>
              </div>

              <div className="token-visual reveal">
                <div className="token-orb-wrap">
                  <div className="token-orb-glow"></div>
                  <div className="token-orb">
                    <div className="token-orb-label">$PROOF</div>
                  </div>
                  <div className="token-orb-ring"><div className="token-orb-dot"></div></div>
                </div>
                <div className="token-live">Launching soon on</div>
                <div className="token-platform">Bags.fun</div>
                <div className="token-stats-row">
                  <div className="token-stat"><span className="token-stat-val">1B</span><span className="token-stat-lbl">Supply</span></div>
                  <div className="token-stat"><span className="token-stat-val">SPL</span><span className="token-stat-lbl">Standard</span></div>
                  <div className="token-stat"><span className="token-stat-val">Solana</span><span className="token-stat-lbl">Network</span></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WAITLIST */}
        <section id="waitlist" className="waitlist-section" style={{scrollMarginTop: '60px'}}>
          <div className="waitlist-glow"></div>
          <div className="waitlist-dots"></div>
          <div className="waitlist-inner">
            <div className="reveal">
              <div className="pill" style={{ marginBottom: '20px' }}>// get early access</div>
              <h2>Your work deserves<br/><span className="grad">to be seen.</span></h2>
              <p>We're building Proofd for devs who are tired of blank resumes and empty LinkedIn endorsements. Drop your email and we'll let you know when it's time.</p>
            </div>
            
            <form onSubmit={handleWaitlistSubmit} className="waitlist-form reveal" id="waitlistForm">
              {isWaitlisted ? (
                <div className="success-msg">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  You're on the list. We'll be in touch.
                </div>
              ) : (
                <>
                  <div className="email-row">
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="email-input" 
                      placeholder="you@example.com" 
                    />
                    <button type="submit" className="submit-btn">
                      Join Waitlist
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
                    </button>
                  </div>
                  <div className="waitlist-or">or sign up with</div>
                  <div className="social-signup">
                    <button type="button" onClick={login} className="social-btn">
                      <svg viewBox="0 0 24 24"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                      GitHub
                    </button>
                    <button type="button" onClick={login} className="social-btn">
                      <svg viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>
                      X / Twitter
                    </button>
                  </div>
                </>
              )}
              <div className="waitlist-trust">
                <span><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>No spam, ever</span>
                <span><svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>Non-custodial</span>
                <span><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>Early access perks</span>
              </div>
            </form>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="c-footer">
          <div className="footer-inner">
            <div className="footer-left">
              <Link href="/" className="logo"><div className="logo-mark">P</div>proofd</Link>
              <span className="footer-copy">&copy; 2026 Proofd</span>
              <div className="footer-links">
                <a href="#">Terms</a>
                <a href="#">Privacy</a>
              </div>
            </div>
            <div className="footer-socials">
              <a href="#" aria-label="Twitter"><svg viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg></a>
              <a href="#" aria-label="GitHub"><svg viewBox="0 0 24 24"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg></a>
              <a href="#" aria-label="Telegram"><svg viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg></a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
