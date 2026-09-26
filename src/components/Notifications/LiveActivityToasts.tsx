"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, X, CheckCircle, Sparkles } from "lucide-react";
import { PRODUCTS } from "@/data/products";

interface ToastActivity {
  id: string;
  city: string;
  action: string;
  productName: string;
  image: string;
  timeAgo: string;
}

const ACTIVITIES: ToastActivity[] = [
  {
    id: "act-1",
    city: "Mumbai, MH",
    action: "just purchased",
    productName: "Crest Carryall Leather / Tactical Bag",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=300&auto=format&fit=crop",
    timeAgo: "Just now",
  },
  {
    id: "act-2",
    city: "Delhi, DL",
    action: "claimed",
    productName: "VIP Blind Box Collector's Edition",
    image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=300&auto=format&fit=crop",
    timeAgo: "1m ago",
  },
  {
    id: "act-3",
    city: "Hyderabad, TS",
    action: "just ordered",
    productName: "Cyber Dune Embroidered Polo",
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=300&auto=format&fit=crop",
    timeAgo: "3m ago",
  },
  {
    id: "act-4",
    city: "Gurugram, HR",
    action: "just secured",
    productName: "Grand Prix Suede Embossed Cap",
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=300&auto=format&fit=crop",
    timeAgo: "4m ago",
  },
  {
    id: "act-5",
    city: "Ahmedabad, GJ",
    action: "just purchased",
    productName: "Tactical Speed Racing Hoodie",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=300&auto=format&fit=crop",
    timeAgo: "6m ago",
  },
];

export default function LiveActivityToasts() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show toast after initial 3 seconds
    const initialDelay = setTimeout(() => {
      setVisible(true);
    }, 3500);

    // Loop through notifications every 10 seconds
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrentIdx((prev) => (prev + 1) % ACTIVITIES.length);
        setVisible(true);
      }, 1200);
    }, 11000);

    return () => {
      clearTimeout(initialDelay);
      clearInterval(interval);
    };
  }, []);

  const current = ACTIVITIES[currentIdx];

  return (
    <div className="fixed bottom-6 left-6 z-40 pointer-events-none select-none">
      <AnimatePresence>
        {visible && current && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto max-w-sm bg-[#0c0c0c]/95 border border-white/15 rounded-xl shadow-2xl p-3.5 backdrop-blur-xl flex items-center gap-3.5 text-white"
          >
            {/* Thumbnail */}
            <div className="w-12 h-14 rounded-md overflow-hidden bg-neutral-900 border border-white/10 shrink-0">
              <img src={current.image} alt="" className="w-full h-full object-cover" />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 pr-1">
              <div className="flex items-center gap-1.5 text-[9px] font-mono tracking-widest text-brand-orange uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 live-pulse" />
                <span>DROP RADAR // {current.city}</span>
              </div>
              <p className="text-xs font-bold uppercase tracking-wider text-white truncate mt-0.5">
                {current.productName}
              </p>
              <div className="flex items-center justify-between text-[10px] font-mono text-white/40 mt-1">
                <span>{current.action}</span>
                <span>{current.timeAgo}</span>
              </div>
            </div>

            {/* Dismiss Button */}
            <button
              onClick={() => setVisible(false)}
              className="p-1 text-white/40 hover:text-white transition-colors"
              aria-label="Dismiss toast"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
