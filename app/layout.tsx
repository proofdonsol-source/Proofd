export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers"; 

export const metadata: Metadata = {
  title: "Proofd | On-Chain Reputation",
  description: "Join the only developer network where reputation is verified on-chain.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Added suppressHydrationWarning to both html and body to ignore extension injections
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&family=Space+Grotesk:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        
        <style dangerouslySetInnerHTML={{__html: `
          :root {
            --font-inter: 'Inter', sans-serif;
            --font-space: 'Space Grotesk', sans-serif;
            --font-mono: 'JetBrains Mono', monospace;
          }
        `}} />
      </head>
      <body suppressHydrationWarning className="bg-navy text-white min-h-screen font-body antialiased selection:bg-blue-primary/30">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
