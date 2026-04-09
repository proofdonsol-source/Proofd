"use client";

import { PrivyProvider } from '@privy-io/react-auth';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider
      appId="cmnbzddyz000s0cjovrjdu5mk"
      config={{
        loginMethods: ['github', 'email', 'wallet'],
        appearance: {
          theme: 'dark',
          accentColor: '#3B82F6', // Proofd Blue
          showWalletLoginFirst: false,
        },
        embeddedWallets: {
          createOnLogin: 'users-without-wallets', // Auto-creates wallets for email/github users
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
}
