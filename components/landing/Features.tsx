const FEATURES = [
  {
    icon: "⛓",
    mono: "01 — PROOF",
    title: "On-chain reputation",
    description:
      "Every bounty, vouch, and contribution is recorded immutably. Your history is your credential — no résumés, no gatekeepers.",
  },
  {
    icon: "🤝",
    mono: "02 — VOUCH",
    title: "Skin-in-the-game vouches",
    description:
      "Peers stake $PROOF to vouch for you. No empty endorsements. Real economic commitment behind every reputation signal.",
  },
  {
    icon: "🎯",
    mono: "03 — BOUNTIES",
    title: "Ship & get paid",
    description:
      "Find bounties that match your skills. Complete them, earn USDC or ETH, and watch your score climb with every delivery.",
  },
  {
    icon: "📊",
    mono: "04 — SCORE",
    title: "The Proofd Score",
    description:
      "A composite reputation score from 0–1000 based on bounties shipped, vouches received, and stake weighted by credibility.",
  },
];

export function Features() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <div className="mb-16 text-center">
        <div className="section-label justify-center">
          Why Proofd
        </div>
        <h2 className="font-display font-extrabold text-4xl md:text-5xl tracking-tight">
          Built for builders who{" "}
          <span className="gradient-text">ship.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {FEATURES.map((f) => (
          <div key={f.mono} className="proofd-card p-7 group cursor-default">
            <div className="flex items-start gap-5">
              <div className="w-11 h-11 rounded-xl bg-blue-primary/10 border border-blue-primary/20 flex items-center justify-center text-xl flex-shrink-0 group-hover:bg-blue-primary/20 transition-colors">
                {f.icon}
              </div>
              <div>
                <p className="font-mono-brand text-[10px] text-blue-primary tracking-widest uppercase mb-2">
                  {f.mono}
                </p>
                <h3 className="font-display font-bold text-lg text-white mb-2">
                  {f.title}
                </h3>
                <p className="font-body text-sm text-slate-muted leading-relaxed">
                  {f.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
