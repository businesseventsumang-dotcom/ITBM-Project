"use client";

import React, { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Sparkles, Flame, ArrowRight } from "lucide-react";
import { ProductItem } from "@/data/products";
import ProductCard from "./ProductCard";

interface ProductCarouselProps {
  products: ProductItem[];
  onOpenQuickView: (product: ProductItem) => void;
  onViewAllCatalog: () => void;
}

export default function ProductCarousel({
  products,
  onOpenQuickView,
  onViewAllCatalog,
}: ProductCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState<"ALL" | "Top" | "Bottom" | "Accessories">("ALL");

  const filteredProducts = products.filter((p) => {
    if (activeFilter === "ALL") return true;
    return p.category === activeFilter;
  });

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 380;
    scrollContainerRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative w-full py-16 bg-[#070707] border-b border-white/10 select-none overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Title & Filter Pills */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 text-brand-orange font-mono text-[11px] tracking-widest uppercase mb-2">
              <Flame className="w-3.5 h-3.5 fill-brand-orange" />
              <span>FRESH RELEASE LINEUP</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight uppercase">
              LATEST DROPS
            </h2>
            <p className="text-white/50 text-xs sm:text-sm font-mono mt-1">
              HIGH-DENSITY EMBROIDERY // BESPOKE FABRICATIONS // SCULPTURAL CUTS
            </p>
          </div>

          {/* Filter Pills & Scroll Controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Filter buttons */}
            <div className="flex items-center p-1 bg-white/5 border border-white/10 rounded-sm font-mono text-[11px]">
              {(["ALL", "Top", "Bottom", "Accessories"] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-3 py-1.5 rounded-sm uppercase tracking-wider transition-all duration-200 ${
                    activeFilter === filter
                      ? "bg-brand-orange text-white font-bold"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {filter === "ALL" ? "ALL DROPS" : filter}
                </button>
              ))}
            </div>

            {/* Scroll Navigation Arrows */}
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() => scroll("left")}
                className="p-2.5 bg-neutral-900 border border-white/15 rounded-sm hover:border-white/40 text-white/80 hover:text-white transition-colors"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scroll("right")}
                className="p-2.5 bg-neutral-900 border border-white/15 rounded-sm hover:border-white/40 text-white/80 hover:text-white transition-colors"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Sliding Carousel */}
        <div
          ref={scrollContainerRef}
          className="flex gap-5 overflow-x-auto pb-4 pt-2 no-scrollbar scroll-smooth snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="w-[280px] sm:w-[320px] shrink-0 snap-start"
            >
              <ProductCard product={product} onOpenQuickView={onOpenQuickView} />
            </div>
          ))}
        </div>

        {/* Bottom CTA to view full catalog */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={onViewAllCatalog}
            className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 hover:border-brand-orange text-xs font-mono tracking-widest text-white uppercase rounded hover:bg-brand-orange/10 transition-all duration-300 group"
          >
            <span>VIEW COMPLETE CATALOG [{products.length} PIECES]</span>
            <ArrowRight className="w-4 h-4 text-brand-orange group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
