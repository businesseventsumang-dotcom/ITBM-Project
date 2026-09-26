"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Instagram,
  Twitter,
  Youtube,
  Globe,
  MapPin,
  Sparkles,
  Lock,
} from "lucide-react";
import { OFFLINE_STORES } from "@/data/stores";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  return (
    <footer className="w-full bg-[#050505] text-white border-t border-white/10 select-none">
      {/* 1. VIP Newsletter & Early Drop Access Banner */}
      <div className="border-b border-white/10 bg-[#090909] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-2">
              <div className="flex items-center gap-2 text-brand-orange font-mono text-[10px] tracking-widest uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>EXCLUSIVE ACCESS CLUB</span>
              </div>
              <h3 className="font-display font-black text-2xl sm:text-4xl uppercase tracking-tight text-white">
                ENTER THE NOCTURNE ARCHIVE VAULT
              </h3>
              <p className="text-xs sm:text-sm font-mono text-white/50 max-w-lg">
                Be the first to receive secret release keys, private showroom invites, and 15-minute early access to Blind Box drops.
              </p>
            </div>

            <div className="lg:col-span-6">
              {subscribed ? (
                <div className="p-4 bg-emerald-950/40 border border-emerald-500/40 rounded-lg text-emerald-400 font-mono text-xs text-center uppercase tracking-widest">
                  ✓ WELCOME TO THE VAULT // EARLY ACCESS CODE SENT TO {email.toUpperCase()}
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    required
                    placeholder="ENTER YOUR EMAIL FOR EARLY DROPS"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-neutral-900 border border-white/15 px-4 py-3.5 rounded text-xs font-mono uppercase tracking-wider text-white placeholder-white/40 focus:outline-none focus:border-brand-orange"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3.5 bg-brand-orange hover:bg-brand-electric text-white font-mono text-xs font-bold uppercase tracking-widest rounded flex items-center gap-2 transition-colors shrink-0"
                  >
                    <span>JOIN</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Footer Navigation & Walk-in Stores Quick List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <span className="font-display font-black text-2xl tracking-ultra uppercase text-white block">
              NOCTURNE
            </span>
            <p className="text-xs font-mono text-white/50 leading-relaxed max-w-sm">
              Contemporary Indian luxury streetwear atelier engineered through heavyweight cottons, architectural silhouettes, and precision hardware.
            </p>
            <div className="pt-2 flex items-center gap-3 text-white/60">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-2 bg-white/5 hover:bg-white/10 rounded-full hover:text-brand-orange transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="p-2 bg-white/5 hover:bg-white/10 rounded-full hover:text-brand-orange transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="p-2 bg-white/5 hover:bg-white/10 rounded-full hover:text-brand-orange transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Walk-in Stores Quick List with Live Indicator Pulses */}
          <div className="lg:col-span-4 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-[10px] tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 live-pulse" />
              <span>WALK-IN STORES // LIVE PULSES</span>
            </div>
            <ul className="space-y-2.5 font-mono text-xs">
              {OFFLINE_STORES.map((store) => (
                <li key={store.id} className="flex items-center justify-between py-1 border-b border-white/5">
                  <span className="text-white/80 hover:text-brand-orange transition-colors">
                    {store.city} Flagship — {store.area.split("/")[0]}
                  </span>
                  <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-emerald-400" />
                    OPEN
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Order Support Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <span className="text-[10px] font-mono tracking-widest text-brand-orange uppercase block">
              ORDER SUPPORT
            </span>
            <ul className="space-y-2 font-mono text-xs text-white/60">
              <li>
                <a href="#order-tracking" className="hover:text-white transition-colors">
                  TRACK ORDER
                </a>
              </li>
              <li>
                <a href="#order-tracking" className="hover:text-white transition-colors">
                  MAKE A RETURN
                </a>
              </li>
              <li>
                <a href="#walk-in-stores" className="hover:text-white transition-colors">
                  STORE LOCATOR
                </a>
              </li>
              <li>
                <span className="text-white/40">SUPPORT: +91 98110 45892</span>
              </li>
              <li>
                <span className="text-white/40">CARE@NOCTURNE.COM</span>
              </li>
            </ul>
          </div>

          {/* Legal & Admin */}
          <div className="lg:col-span-2 space-y-3">
            <span className="text-[10px] font-mono tracking-widest text-brand-orange uppercase block">
              VAULT & ADMIN
            </span>
            <ul className="space-y-2 font-mono text-xs text-white/60">
              <li>
                <a href="#blind-box-drop" className="hover:text-white transition-colors">
                  BLIND BOX POLICY
                </a>
              </li>
              <li>
                <a href="#catalog-section" className="hover:text-white transition-colors">
                  FIT GUIDE & GSM
                </a>
              </li>
              <li>
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-1.5 text-white/80 hover:text-brand-orange transition-colors"
                >
                  <Lock className="w-3 h-3 text-brand-orange" />
                  <span>ADMIN PORTAL</span>
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright & Compliance */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] text-white/40 uppercase">
          <span>© {new Date().getFullYear()} NOCTURNE STREETWEAR LAB. ALL RIGHTS RESERVED.</span>
          <div className="flex items-center gap-4">
            <span>TERMS OF SALE</span>
            <span>PRIVACY DISCLOSURE</span>
            <span>AUTHENTICITY GUARANTEE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
