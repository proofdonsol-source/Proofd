"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { Mail, Search } from "lucide-react";

export default function InboxPage() {
  return (
    <>
      <Navbar />
      <Sidebar />
      <main className="max-w-6xl mx-auto px-6 pt-24 pb-24 md:pl-[280px]">
        <h1 className="font-display font-extrabold text-3xl text-white mb-6">Inbox</h1>
        
        <div className="proofd-card h-[600px] flex overflow-hidden">
          {/* Left pane: Messages List */}
          <div className="w-1/3 border-r border-navy-light flex flex-col bg-surface-1">
            <div className="p-4 border-b border-navy-light">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-muted" size={16} />
                <input type="text" placeholder="Search messages..." className="w-full bg-surface-3 border border-navy-light rounded-lg pl-9 pr-4 py-2 font-body text-sm text-white focus:outline-none focus:border-blue-primary" />
              </div>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
              <Mail className="text-slate-muted mb-3" size={32} />
              <p className="font-display font-bold text-white">No messages yet</p>
              <p className="font-body text-sm text-slate-muted mt-1">When DAOs or developers reach out, they'll appear here.</p>
            </div>
          </div>
          
          {/* Right pane: Chat Area */}
          <div className="flex-1 flex flex-col items-center justify-center bg-surface-2 p-6 text-center">
             <div className="w-16 h-16 rounded-2xl bg-surface-3 flex items-center justify-center mb-4 border border-navy-light">
                <Mail size={32} className="text-slate-muted" />
             </div>
             <p className="font-display font-bold text-lg text-white">Select a conversation</p>
             <p className="font-body text-sm text-slate-muted mt-1 max-w-sm">Choose a message from the list to start chatting. Wallet-to-wallet messaging is fully encrypted.</p>
          </div>
        </div>
      </main>
    </>
  );
}
