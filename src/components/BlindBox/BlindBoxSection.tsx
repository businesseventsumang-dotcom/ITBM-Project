"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Flame, ShieldAlert, Package, Lock, Clock, ArrowRight, Check } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { useStore } from "@/context/StoreContext";
import { formatPrice } from "@/lib/utils";

export default function BlindBoxSection() {
  const { addToCart, currency } = useStore();
  const blindBoxProduct = PRODUCTS.find((p) => p.isBlindBox) || PRODUCTS[7];

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 42,
    seconds: 19,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <section id="blind-box-drop" className="relative w-full py-20 bg-[#080808] border-b border-white/10 select-none overflow-hidden">
      {/* Background Neon Flame Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-orange/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading & Countdown */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-brand-orange font-mono text-[11px] tracking-widest uppercase mb-2">
              <span className="w-2 h-2 rounded-full bg-brand-orange animate-ping" />
              <span>LIMITED DROP VAULT // PHASE 03</span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-6xl text-white tracking-tight uppercase">
              BLIND BOX LIVE
            </h2>
            <p className="text-white/50 text-xs sm:text-sm font-mono mt-1">
              CURATED ARCHIVAL APPAREL // GUARANTEED HIGH-TIER STREETWEAR
            </p>
          </div>

          {/* Live Countdown Clock */}
          <div className="p-4 bg-black/60 backdrop-blur-xl border border-white/15 rounded-lg flex items-center gap-4">
            <div className="flex items-center gap-2 text-brand-orange font-mono text-xs uppercase tracking-widest">
              <Clock className="w-4 h-4 animate-spin text-brand-orange" style={{ animationDuration: "8s" }} />
              <span>VAULT CLOSES IN:</span>
            </div>
            <div className="flex items-center gap-2 font-mono font-bold text-white text-lg sm:text-xl">
              <div className="px-2.5 py-1 bg-white/10 rounded">
                {String(timeLeft.hours).padStart(2, "0")}h
              </div>
              <span className="text-brand-orange">:</span>
              <div className="px-2.5 py-1 bg-white/10 rounded">
                {String(timeLeft.minutes).padStart(2, "0")}m
              </div>
              <span className="text-brand-orange">:</span>
              <div className="px-2.5 py-1 bg-brand-orange/20 text-brand-orange border border-brand-orange/40 rounded">
                {String(timeLeft.seconds).padStart(2, "0")}s
              </div>
            </div>
          </div>
        </div>

        {/* Blind Box Feature Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mt-12">
          
          {/* Mystery Container Showcase Card */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/4.2] rounded-2xl overflow-hidden bg-gradient-to-b from-neutral-900 via-black to-[#050505] border border-white/20 p-6 flex flex-col justify-between shadow-2xl group">
              
              {/* Top Badges */}
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-brand-orange text-white font-mono text-[10px] tracking-widest uppercase font-bold rounded flex items-center gap-1.5 shadow-lg shadow-brand-orange/30">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>TIER 01 VAULT EDITION</span>
                </span>
                <span className="text-xs font-mono text-white/50">
                  9 / 100 REMAINING
                </span>
              </div>

              {/* Mystery Interactive Box Visual */}
              <div className="relative py-8 flex flex-col items-center justify-center text-center">
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center">
                  <img
                    src="https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=1000&auto=format&fit=crop"
                    alt="Blind Box Container"
                    className="w-full h-full object-cover rounded-xl border border-white/20 shadow-2xl transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] rounded-xl flex items-center justify-center">
                    <div className="p-4 bg-black/80 border border-brand-orange/60 rounded-full text-brand-orange shadow-lg shadow-brand-orange/30 animate-pulse">
                      <Lock className="w-8 h-8" />
                    </div>
                  </div>
                </div>

                <h3 className="font-display font-black text-2xl uppercase tracking-wider text-white mt-4">
                  MATTE BLACK ARCHIVE VAULT
                </h3>
                <p className="text-xs font-mono text-white/50 max-w-sm mt-1">
                  SEALED WITH HOLOGRAPHIC CRYPTOGRAPHIC NUMBERED LABEL
                </p>
              </div>

              {/* Strict Disclaimer Callout */}
              <div className="p-3.5 bg-neutral-950/80 border border-white/10 rounded-lg flex items-center justify-between font-mono text-xs">
                <div className="flex items-center gap-2 text-white/70">
                  <ShieldAlert className="w-4 h-4 text-brand-orange shrink-0" />
                  <span className="text-[11px]">ALL BLIND BOX SALES ARE FINAL</span>
                </div>
                <span className="text-[10px] text-white/40 uppercase">NO RETURNS / NO EXCHANGES</span>
              </div>
            </div>
          </div>

          {/* Breakdown & Content Probability */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs font-mono tracking-widest text-brand-orange uppercase block mb-1">
                VALUE APPRAISAL
              </span>
              <div className="flex items-baseline gap-3">
                <span className="font-display font-black text-4xl text-white">
                  {formatPrice(blindBoxProduct.salePrice ?? blindBoxProduct.price, currency)}
                </span>
                <span className="text-base font-mono text-white/40 line-through">
                  ₹18,000 VALUE
                </span>
                <span className="px-2.5 py-1 bg-emerald-950/60 text-emerald-400 border border-emerald-800/40 rounded font-mono text-[10px] font-bold">
                  SAVE OVER 55%
                </span>
              </div>
            </div>

            <p className="text-sm text-white/70 font-light leading-relaxed">
              Every curated Blind Box contains three verified studio pieces hand-selected from limited past drops and unreleased archive prototypes. Guaranteed fit and high-density luxury heavyweight construction.
            </p>

            {/* Guaranteed Vault Contents */}
            <div className="space-y-3 font-mono text-xs">
              <h4 className="text-[11px] uppercase tracking-widest text-white/40">
                GUARANTEED VAULT CONTENTS:
              </h4>

              <div className="p-3.5 bg-white/5 border border-white/10 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-brand-orange" />
                  <div>
                    <span className="text-white font-bold block">1X ARCHIVE HEAVY HOODIE / KNIT</span>
                    <span className="text-[10px] text-white/50">480 GSM French Terry or Double-knit Pique</span>
                  </div>
                </div>
                <span className="text-[10px] text-brand-orange font-bold">100% CHANCE</span>
              </div>

              <div className="p-3.5 bg-white/5 border border-white/10 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-brand-orange" />
                  <div>
                    <span className="text-white font-bold block">1X GRAND PRIX RACING CAP</span>
                    <span className="text-[10px] text-white/50">Microsuede or Heavy Twill Crown</span>
                  </div>
                </div>
                <span className="text-[10px] text-brand-orange font-bold">100% CHANCE</span>
              </div>

              <div className="p-3.5 bg-white/5 border border-white/10 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-brand-orange" />
                  <div>
                    <span className="text-white font-bold block">1X STUDIO COLLECTIBLE CASE OR LEATHER KEY FOB</span>
                    <span className="text-[10px] text-white/50">Numbered metal hardware accessory</span>
                  </div>
                </div>
                <span className="text-[10px] text-brand-orange font-bold">100% CHANCE</span>
              </div>
            </div>

            {/* Claim CTA */}
            <div className="pt-2">
              <button
                onClick={() => addToCart(blindBoxProduct, "STANDARD", "#0A0A0A", 1)}
                className="w-full py-4 bg-brand-orange hover:bg-brand-electric text-white font-mono text-xs font-bold uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 shadow-2xl shadow-brand-orange/30 transition-all duration-300"
              >
                <span>CLAIM BLIND BOX // {formatPrice(blindBoxProduct.salePrice ?? blindBoxProduct.price, currency)}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
