"use client";

import { PrivyProvider } from "@privy-io/react-auth";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider
      <PrivyProvider
  appId="cmnbzddyz000s0cjovrjdu5mk" // <-- YOUR REAL ID GOES HERE IN QUOTES
  config={{
    // ... the rest stays the same
      config={{
        appearance: {
          theme: "dark",
          accentColor: "#3b82f6",
        },
        embeddedWallets: {
          ethereum: {
            createOnLogin: "users-without-wallets", // Auto-creates Ethereum wallets
          },
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
}
