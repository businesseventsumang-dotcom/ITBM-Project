"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles, Layers, Box } from "lucide-react";
import ThreeCanvas from "./ThreeCanvas";
import { useStore } from "@/context/StoreContext";

export interface HeroSlide {
  id: string;
  dropTag: string;
  headline: string;
  subheadline: string;
  categoryName: string;
  filterCategory: "Top" | "Accessories";
  filterSubcategory: "Caps" | "Polos" | "Shirts";
  badge: string;
  priceNote: string;
  season: string;
  bgGradient: string;
  modelImage: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: "slide-caps",
    dropTag: "DROP 01 // ACCESSORIES VAULT",
    headline: "NEW CAPS",
    subheadline: "SUPPLE MICROSUEDE & 3D HEAVY BULLION RACING EMBROIDERY",
    categoryName: "HEADWEAR",
    filterCategory: "Accessories",
    filterSubcategory: "Caps",
    badge: "NEW CAPS LIVE",
    priceNote: "STARTING FROM ₹2,999",
    season: "AUTUMN/WINTER 2025",
    bgGradient: "from-amber-950/20 via-black to-[#080808]",
    modelImage: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "slide-polos",
    dropTag: "DROP 02 // ARCHITECTURAL PIQUE",
    headline: "POLO SEASON",
    subheadline: "340 GSM COMBED COTTON WITH GUNMETAL HARDWARE & SCULPTED COLLAR",
    categoryName: "KNITWEAR",
    filterCategory: "Top",
    filterSubcategory: "Polos",
    badge: "POLO SEASON EXCLUSIVE",
    priceNote: "LIMITED VAULT ALLOCATION",
    season: "RACING CLUB SERIE",
    bgGradient: "from-orange-950/25 via-black to-[#080808]",
    modelImage: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "slide-shirts",
    dropTag: "DROP 03 // MEDITERRANEAN DRAPE",
    headline: "NEW SHIRTS",
    subheadline: "JACQUARD SILK-CUPRO RESORT SILHOUETTES WITH SIGNATURE MONOGRAMS",
    categoryName: "SHIRTING",
    filterCategory: "Top",
    filterSubcategory: "Shirts",
    badge: "NEW SHIRTS ARRIVAL",
    priceNote: "STARTING FROM ₹7,999",
    season: "YACHT CAPSULE",
    bgGradient: "from-blue-950/25 via-black to-[#080808]",
    modelImage: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1200&auto=format&fit=crop",
  },
];

interface HeroSliderProps {
  onSelectDrop?: (category: string, subcategory?: string) => void;
}

export default function HeroSlider({ onSelectDrop }: HeroSliderProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { setIsCartOpen } = useStore();

  const currentSlide = HERO_SLIDES[currentSlideIndex];

  // Auto-play timer
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handleNext = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const handlePrev = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  return (
    <section
      className="relative w-full overflow-hidden bg-[#070707] border-b border-white/10 select-none min-h-[680px] lg:min-h-[780px] flex items-center"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className={`absolute inset-0 bg-gradient-to-r ${currentSlide.bgGradient} transition-colors duration-1000 opacity-60`}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,69,0,0.06),transparent_60%)]" />
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Drop Text Details & Reveal Animations */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6"
              >
                {/* Season & Badge */}
                <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] tracking-widest uppercase">
                  <span className="px-2.5 py-1 bg-brand-orange text-white font-bold rounded">
                    {currentSlide.badge}
                  </span>
                  <span className="text-white/40 border-l border-white/20 pl-3">
                    {currentSlide.dropTag}
                  </span>
                  <span className="text-white/40 border-l border-white/20 pl-3 hidden sm:inline">
                    {currentSlide.season}
                  </span>
                </div>

                {/* Massive Hero Headline */}
                <div className="relative">
                  <h1 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl tracking-tighter text-white uppercase leading-[0.9] text-shimmer">
                    {currentSlide.headline}
                  </h1>
                  <span className="block font-mono text-xs sm:text-sm tracking-widest text-brand-orange uppercase mt-3">
                    {currentSlide.categoryName} // {currentSlide.priceNote}
                  </span>
                </div>

                {/* Subheadline and Editorial Details */}
                <p className="text-sm sm:text-base text-white/70 max-w-xl font-light tracking-wide leading-relaxed">
                  {currentSlide.subheadline}
                </p>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <button
                    onClick={() =>
                      onSelectDrop?.(currentSlide.filterCategory, currentSlide.filterSubcategory)
                    }
                    className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-mono text-xs font-bold uppercase tracking-widest hover:bg-brand-orange hover:text-white transition-all duration-300 rounded shadow-xl hover:shadow-brand-orange/30"
                  >
                    <span>EXPLORE {currentSlide.headline}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                  </button>

                  <button
                    onClick={() => setIsCartOpen(true)}
                    className="inline-flex items-center gap-2 px-6 py-4 border border-white/20 text-white/90 hover:text-white hover:border-white/50 font-mono text-xs uppercase tracking-widest rounded bg-white/5 backdrop-blur-md transition-all duration-300"
                  >
                    <Box className="w-3.5 h-3.5 text-brand-orange" />
                    <span>CLAIM BLIND BOX</span>
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Slider Navigation & Progress Indicators */}
            <div className="flex items-center gap-6 mt-12 pt-6 border-t border-white/10 font-mono text-xs">
              <div className="flex items-center gap-2">
                {HERO_SLIDES.map((slide, idx) => (
                  <button
                    key={slide.id}
                    onClick={() => setCurrentSlideIndex(idx)}
                    className="group relative py-2"
                    aria-label={`Slide ${idx + 1}`}
                  >
                    <div
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        currentSlideIndex === idx
                          ? "w-10 bg-brand-orange"
                          : "w-4 bg-white/20 group-hover:bg-white/40"
                      }`}
                    />
                  </button>
                ))}
              </div>

              <span className="text-white/40 text-[11px] font-mono tracking-widest">
                [0{currentSlideIndex + 1} / 0{HERO_SLIDES.length}]
              </span>

              <div className="flex items-center gap-2 ml-auto">
                <button
                  onClick={handlePrev}
                  className="p-2 border border-white/15 rounded hover:border-white/50 hover:bg-white/5 text-white/70 hover:text-white transition-all"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-2 border border-white/15 rounded hover:border-white/50 hover:bg-white/5 text-white/70 hover:text-white transition-all"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Embedded Interactive 3D Canvas Container */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="w-full relative rounded-xl border border-white/15 bg-gradient-to-b from-white/[0.07] to-black/80 backdrop-blur-xl overflow-hidden shadow-2xl shadow-black/80 p-2 sm:p-4">
              
              {/* Interactive Three.js 3D Emblem with Cursor Responsiveness */}
              <ThreeCanvas />

              {/* Quick Drop Preview Pill */}
              <div className="absolute bottom-6 left-6 right-6 p-3 bg-black/80 backdrop-blur-xl border border-white/10 rounded-lg flex items-center justify-between pointer-events-none">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-brand-orange/20 border border-brand-orange/40 flex items-center justify-center text-brand-orange font-mono text-xs font-bold">
                    3D
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-white/50 uppercase block">
                      ARCHIVE ASSET
                    </span>
                    <span className="text-xs font-bold text-white uppercase tracking-wider block">
                      NOCTURNE TALISMAN V1.4
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-brand-orange tracking-widest uppercase">
                  60 FPS ACTIVE
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
