"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Sparkles, Layers, Box, Tag } from "lucide-react";
import Image from "next/image";
import { COLLECTIONS } from "@/data/collections";

interface DropdownMenuProps {
  isOpen: boolean;
  activeTab: "CATEGORIES" | "COLLECTIONS" | "STORES" | null;
  onClose: () => void;
  onSelectCategory: (cat: string, subcat?: string) => void;
  onSelectCollection: (colSlug: string) => void;
}

export default function DropdownMenu({
  isOpen,
  activeTab,
  onClose,
  onSelectCategory,
  onSelectCollection,
}: DropdownMenuProps) {
  const [hoveredPreview, setHoveredPreview] = useState<{
    title: string;
    tag: string;
    image: string;
  }>({
    title: "NOCTURNE HEAVY APPAREL",
    tag: "STREETWEAR FOUNDRY",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=800&auto=format&fit=crop",
  });

  const categories = {
    top: {
      name: "TOP",
      items: ["T-shirts", "Polos", "Shirts", "Sweatshirts", "Hoodies", "Jackets"],
      previewImg: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=800&auto=format&fit=crop",
    },
    bottom: {
      name: "BOTTOM",
      items: ["Cargos", "Jeans", "Pants", "Shorts"],
      previewImg: "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?q=80&w=800&auto=format&fit=crop",
    },
    accessories: {
      name: "ACCESSORIES",
      items: ["Bags", "Caps", "Cases"],
      previewImg: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=800&auto=format&fit=crop",
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-full left-0 w-full glass-dropdown border-t border-white/10 z-40 text-white shadow-2xl backdrop-blur-2xl"
          onMouseLeave={onClose}
        >
          <div className="max-w-7xl mx-auto px-6 py-8">
            {activeTab === "CATEGORIES" && (
              <div className="grid grid-cols-12 gap-8 items-start">
                {/* 1. TOP Category Column */}
                <div className="col-span-3 border-r border-white/10 pr-6">
                  <div className="flex items-center gap-2 mb-4 text-brand-orange font-mono text-[11px] tracking-widest uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
                    <span>01 / TOP</span>
                  </div>
                  <ul className="space-y-2.5">
                    {categories.top.items.map((subcat) => (
                      <li key={subcat}>
                        <button
                          onClick={() => {
                            onSelectCategory("Top", subcat);
                            onClose();
                          }}
                          onMouseEnter={() =>
                            setHoveredPreview({
                              title: `${subcat.toUpperCase()} ARCHIVE`,
                              tag: "HEAVY APPAREL / TOP",
                              image: categories.top.previewImg,
                            })
                          }
                          className="group flex items-center justify-between w-full text-left text-sm tracking-wider text-white/80 hover:text-white transition-all duration-150 py-1"
                        >
                          <span className="group-hover:translate-x-1.5 group-hover:text-brand-orange transition-transform duration-200">
                            {subcat}
                          </span>
                          <span className="text-[10px] font-mono text-white/30 group-hover:text-brand-orange transition-colors">
                            VIEW →
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 2. BOTTOM Category Column */}
                <div className="col-span-3 border-r border-white/10 pr-6">
                  <div className="flex items-center gap-2 mb-4 text-brand-orange font-mono text-[11px] tracking-widest uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
                    <span>02 / BOTTOM</span>
                  </div>
                  <ul className="space-y-2.5">
                    {categories.bottom.items.map((subcat) => (
                      <li key={subcat}>
                        <button
                          onClick={() => {
                            onSelectCategory("Bottom", subcat);
                            onClose();
                          }}
                          onMouseEnter={() =>
                            setHoveredPreview({
                              title: `${subcat.toUpperCase()} EDITIONS`,
                              tag: "TAILORED CUTS / BOTTOM",
                              image: categories.bottom.previewImg,
                            })
                          }
                          className="group flex items-center justify-between w-full text-left text-sm tracking-wider text-white/80 hover:text-white transition-all duration-150 py-1"
                        >
                          <span className="group-hover:translate-x-1.5 group-hover:text-brand-orange transition-transform duration-200">
                            {subcat}
                          </span>
                          <span className="text-[10px] font-mono text-white/30 group-hover:text-brand-orange transition-colors">
                            VIEW →
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 3. ACCESSORIES Category Column */}
                <div className="col-span-3 border-r border-white/10 pr-6">
                  <div className="flex items-center gap-2 mb-4 text-brand-orange font-mono text-[11px] tracking-widest uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
                    <span>03 / ACCESSORIES</span>
                  </div>
                  <ul className="space-y-2.5">
                    {categories.accessories.items.map((subcat) => (
                      <li key={subcat}>
                        <button
                          onClick={() => {
                            onSelectCategory("Accessories", subcat);
                            onClose();
                          }}
                          onMouseEnter={() =>
                            setHoveredPreview({
                              title: `${subcat.toUpperCase()} VAULT`,
                              tag: "HARDWARE & LEATHER / ACCESSORIES",
                              image: categories.accessories.previewImg,
                            })
                          }
                          className="group flex items-center justify-between w-full text-left text-sm tracking-wider text-white/80 hover:text-white transition-all duration-150 py-1"
                        >
                          <span className="group-hover:translate-x-1.5 group-hover:text-brand-orange transition-transform duration-200">
                            {subcat}
                          </span>
                          <span className="text-[10px] font-mono text-white/30 group-hover:text-brand-orange transition-colors">
                            VIEW →
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>

                  {/* Blind Box Banner callout */}
                  <div
                    onClick={() => {
                      onSelectCategory("Accessories", "Cases");
                      onClose();
                    }}
                    className="mt-6 p-3 bg-gradient-to-r from-brand-orange/20 to-transparent border border-brand-orange/40 rounded cursor-pointer group hover:border-brand-orange transition-colors"
                  >
                    <div className="flex items-center gap-1.5 text-brand-orange text-xs font-mono font-bold tracking-widest">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>BLIND BOX LIVE</span>
                    </div>
                    <p className="text-[11px] text-white/70 mt-1 leading-snug">
                      Vault container with guaranteed archive drop.
                    </p>
                  </div>
                </div>

                {/* 4. Live Visual Preview Card */}
                <div className="col-span-3 pl-2">
                  <div className="relative aspect-[4/5] w-full rounded-md overflow-hidden bg-neutral-900 border border-white/10 group">
                    <img
                      src={hoveredPreview.image}
                      alt={hoveredPreview.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-4 flex flex-col justify-end">
                      <span className="text-[10px] font-mono tracking-widest text-brand-orange uppercase">
                        {hoveredPreview.tag}
                      </span>
                      <h4 className="text-sm font-bold tracking-wider text-white uppercase mt-0.5">
                        {hoveredPreview.title}
                      </h4>
                      <span className="text-[10px] font-mono text-white/60 mt-1 inline-flex items-center gap-1">
                        EXPLORE LINEUP <ArrowUpRight className="w-3 h-3 text-brand-orange" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* FEATURED COLLECTIONS TAB */}
            {activeTab === "COLLECTIONS" && (
              <div>
                <div className="flex items-center justify-between mb-6 pb-2 border-b border-white/10">
                  <div className="flex items-center gap-2 text-brand-orange font-mono text-[11px] tracking-widest uppercase">
                    <Layers className="w-3.5 h-3.5" />
                    <span>CURATED SEASONAL DROPS & ARCHIVES</span>
                  </div>
                  <span className="text-[11px] font-mono text-white/40">4 ACTIVE CHAPTERS</span>
                </div>

                <div className="grid grid-cols-4 gap-6">
                  {COLLECTIONS.map((col) => (
                    <div
                      key={col.id}
                      onClick={() => {
                        onSelectCollection(col.slug);
                        onClose();
                      }}
                      className="group cursor-pointer rounded-sm overflow-hidden bg-neutral-900 border border-white/10 hover:border-brand-orange/60 transition-all duration-300"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <img
                          src={col.bannerImage}
                          alt={col.name}
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                        />
                        <div className="absolute top-2.5 right-2.5 px-2 py-0.5 bg-black/80 backdrop-blur-md rounded border border-white/15 font-mono text-[9px] tracking-widest text-white">
                          {col.season}
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-bold uppercase tracking-wider text-white group-hover:text-brand-orange transition-colors">
                            {col.name}
                          </h3>
                          <ArrowUpRight className="w-3.5 h-3.5 text-white/40 group-hover:text-brand-orange group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                        </div>
                        <p className="text-[10px] font-mono text-white/50 tracking-wider mt-1 line-clamp-1">
                          {col.tagline}
                        </p>
                        <div className="mt-3 flex items-center justify-between text-[10px] font-mono text-white/30 border-t border-white/5 pt-2">
                          <span>{col.itemCount} DESIGNS</span>
                          <span className="text-white/70 group-hover:text-brand-orange">SHOP DROP →</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
