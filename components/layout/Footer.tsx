import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-navy-mid/60 mt-24">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="logo-mark text-sm">P</div>
              <span className="font-display font-bold text-lg">
                <span className="text-blue-primary">P</span>roofd
              </span>
            </div>
            <p className="font-mono-brand text-xs text-slate-brand tracking-widest uppercase">
              // Build different. Ship the proof.
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            {["Docs", "GitHub", "Discord", "Twitter"].map((label) => (
              <Link
                key={label}
                href="#"
                className="font-body text-sm text-slate-muted hover:text-white transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-navy-mid/40 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono-brand text-xs text-slate-brand">
            © 2024 Proofd. All rights reserved.
          </p>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-primary/10 border border-blue-primary/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono-brand text-[10px] text-blue-light tracking-widest">
              LIVE ON BAGS.FUN · $PROOF
            </span>
          </span>
        </div>
      </div>
    </footer>
  );
}
