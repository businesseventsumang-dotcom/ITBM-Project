"use client";

import React from "react";
import { Sparkles, Flame, ShieldAlert, ArrowRight } from "lucide-react";
import { useStore } from "@/context/StoreContext";

export default function AnnouncementTicker() {
  const { setIsCartOpen } = useStore();

  const announcements = [
    { text: "BLIND BOX LIVE NOW — LIMITED QUANTITIES IN THE ARCHIVE VAULT", icon: Flame, highlight: true },
    { text: "WINTER COLLECTION 2025: DROP 02 AVAILABLE WORLDWIDE", icon: Sparkles, highlight: false },
    { text: "WALK-IN STORES ACTIVE: DELHI • MUMBAI • HYDERABAD • AHMEDABAD • GURUGRAM • NOIDA", icon: null, highlight: false },
    { text: "COMPLIMENTARY EXPRESS COURIER ON ALL PRE-PAID ORDERS", icon: ShieldAlert, highlight: false },
  ];

  return (
    <div className="relative bg-[#0d0d0d] border-b border-white/10 text-xs overflow-hidden h-9 flex items-center select-none z-50">
      {/* Static Left Badge */}
      <div className="hidden md:flex items-center gap-1.5 px-4 h-full bg-[#181818] border-r border-white/10 font-mono tracking-widest text-[10px] text-brand-orange uppercase z-10 whitespace-nowrap">
        <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-ping" />
        <span>DROP LIVE</span>
      </div>

      {/* Infinite Smooth Marquee Ticker */}
      <div className="flex w-full overflow-hidden">
        <div className="flex animate-ticker whitespace-nowrap shrink-0 items-center gap-8 text-[11px] font-mono tracking-widest">
          {announcements.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={`ann-1-${idx}`}
                className="inline-flex items-center gap-2 cursor-pointer transition-colors duration-200 hover:text-brand-orange"
                onClick={() => item.highlight && setIsCartOpen(true)}
              >
                {Icon && <Icon className={`w-3.5 h-3.5 ${item.highlight ? "text-brand-orange fill-brand-orange" : "text-white/60"}`} />}
                <span className={item.highlight ? "font-bold text-white tracking-widest underline decoration-brand-orange decoration-2 underline-offset-4" : "text-white/70"}>
                  {item.text}
                </span>
                <span className="text-white/20 mx-2">/</span>
              </div>
            );
          })}
        </div>

        {/* Duplicate track for seamless infinite loop */}
        <div className="flex animate-ticker whitespace-nowrap shrink-0 items-center gap-8 text-[11px] font-mono tracking-widest" aria-hidden="true">
          {announcements.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={`ann-2-${idx}`}
                className="inline-flex items-center gap-2 cursor-pointer transition-colors duration-200 hover:text-brand-orange"
                onClick={() => item.highlight && setIsCartOpen(true)}
              >
                {Icon && <Icon className={`w-3.5 h-3.5 ${item.highlight ? "text-brand-orange fill-brand-orange" : "text-white/60"}`} />}
                <span className={item.highlight ? "font-bold text-white tracking-widest underline decoration-brand-orange decoration-2 underline-offset-4" : "text-white/70"}>
                  {item.text}
                </span>
                <span className="text-white/20 mx-2">/</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Currency & Quick CTA */}
      <div className="hidden lg:flex items-center gap-3 px-4 h-full bg-[#141414] border-l border-white/10 font-mono text-[10px] text-white/70 z-10 whitespace-nowrap">
        <span className="hover:text-white cursor-pointer transition-colors">IN / INR ₹</span>
      </div>
    </div>
  );
}
