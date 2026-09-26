"use client";

import React from "react";
import { Filter, X, Check } from "lucide-react";

export type ColorTheme =
  | "ALL"
  | "BLUES"
  | "BROWNS"
  | "GREENS"
  | "NEUTRALS"
  | "PURPLES"
  | "REDS";

interface ColorFilterBarProps {
  selectedColor: ColorTheme;
  onSelectColor: (theme: ColorTheme) => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  selectedSubcategory: string;
  onSelectSubcategory: (subcat: string) => void;
  sortBy: string;
  onSelectSortBy: (sort: string) => void;
  totalCount: number;
}

export const COLOR_THEMES: {
  id: ColorTheme;
  name: string;
  swatches: string[];
}[] = [
  { id: "ALL", name: "ALL COLORS", swatches: ["#FFFFFF", "#777777", "#000000"] },
  { id: "BLUES", name: "BLUES", swatches: ["#0051FF", "#1E3A5F", "#0B192C"] },
  { id: "BROWNS", name: "BROWNS", swatches: ["#8D6242", "#4A4036", "#C8B6A6"] },
  { id: "GREENS", name: "GREENS", swatches: ["#2E473B", "#353831", "#1B3022"] },
  { id: "NEUTRALS", name: "NEUTRALS", swatches: ["#0E0E0E", "#EFECE6", "#8C827A"] },
  { id: "PURPLES", name: "PURPLES", swatches: ["#4A2E66", "#6C5B7B", "#301934"] },
  { id: "REDS", name: "REDS", swatches: ["#FF4500", "#B22222", "#FF3B00"] },
];

export default function ColorFilterBar({
  selectedColor,
  onSelectColor,
  selectedCategory,
  onSelectCategory,
  selectedSubcategory,
  onSelectSubcategory,
  sortBy,
  onSelectSortBy,
  totalCount,
}: ColorFilterBarProps) {
  const categories = ["ALL", "Top", "Bottom", "Accessories"];
  
  const subcategoriesByCategory: Record<string, string[]> = {
    Top: ["T-shirts", "Polos", "Shirts", "Sweatshirts", "Hoodies", "Jackets"],
    Bottom: ["Cargos", "Jeans", "Pants", "Shorts"],
    Accessories: ["Bags", "Caps", "Cases"],
  };

  const activeSubcats = selectedCategory !== "ALL" ? subcategoriesByCategory[selectedCategory] || [] : [];

  return (
    <div className="w-full bg-[#0a0a0a] border-y border-white/10 p-4 sm:p-6 mb-8 select-none">
      <div className="max-w-7xl mx-auto space-y-5">
        
        {/* Row 1: Primary Category Tabs & Sort */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  onSelectCategory(cat);
                  onSelectSubcategory("ALL");
                }}
                className={`px-4 py-2 text-xs font-mono tracking-widest uppercase rounded transition-all duration-200 whitespace-nowrap ${
                  selectedCategory === cat
                    ? "bg-white text-black font-bold shadow-md"
                    : "bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10"
                }`}
              >
                {cat === "ALL" ? "ALL CATEGORIES" : cat}
              </button>
            ))}
          </div>

          {/* Sort By Dropdown & Count */}
          <div className="flex items-center gap-3 ml-auto">
            <span className="text-[11px] font-mono text-white/40 tracking-wider">
              {totalCount} ITEMS
            </span>
            <select
              value={sortBy}
              onChange={(e) => onSelectSortBy(e.target.value)}
              className="bg-neutral-900 border border-white/15 text-white/80 hover:text-white px-3 py-1.5 rounded font-mono text-xs uppercase tracking-wider focus:outline-none focus:border-brand-orange"
            >
              <option value="FEATURED">SORT: FEATURED</option>
              <option value="NEWEST">SORT: NEWEST FIRST</option>
              <option value="PRICE_LOW">PRICE: LOW TO HIGH</option>
              <option value="PRICE_HIGH">PRICE: HIGH TO LOW</option>
            </select>
          </div>
        </div>

        {/* Row 2: Subcategory Chips (when a category is selected) */}
        {activeSubcats.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1 border-t border-white/5">
            <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest mr-2 shrink-0">
              SUB-CUTS:
            </span>
            <button
              onClick={() => onSelectSubcategory("ALL")}
              className={`px-2.5 py-1 text-[11px] font-mono tracking-wider uppercase rounded ${
                selectedSubcategory === "ALL"
                  ? "bg-brand-orange text-white font-bold"
                  : "bg-white/5 text-white/60 hover:text-white"
              }`}
            >
              ALL
            </button>
            {activeSubcats.map((subcat) => (
              <button
                key={subcat}
                onClick={() => onSelectSubcategory(subcat)}
                className={`px-2.5 py-1 text-[11px] font-mono tracking-wider uppercase rounded transition-colors whitespace-nowrap ${
                  selectedSubcategory === subcat
                    ? "bg-brand-orange text-white font-bold"
                    : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10"
                }`}
              >
                {subcat}
              </button>
            ))}
          </div>
        )}

        {/* Row 3: Shop by Color (Nocturne Signature Color Themes) */}
        <div className="pt-3 border-t border-white/10">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-brand-orange uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
              <span>SHOP BY COLOR THEMES</span>
            </div>
            {selectedColor !== "ALL" && (
              <button
                onClick={() => onSelectColor("ALL")}
                className="text-[10px] font-mono text-white/50 hover:text-brand-orange flex items-center gap-1 uppercase"
              >
                <X className="w-3 h-3" />
                <span>CLEAR COLOR</span>
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {COLOR_THEMES.map((theme) => {
              const isSelected = selectedColor === theme.id;
              return (
                <button
                  key={theme.id}
                  onClick={() => onSelectColor(theme.id)}
                  className={`group flex items-center gap-2 px-3 py-1.5 rounded border transition-all duration-200 ${
                    isSelected
                      ? "bg-brand-orange/20 border-brand-orange text-white font-bold"
                      : "bg-neutral-900 border-white/10 text-white/70 hover:border-white/30 hover:text-white"
                  }`}
                >
                  {/* Swatch gradient preview */}
                  <div className="flex -space-x-1">
                    {theme.swatches.map((color, idx) => (
                      <span
                        key={idx}
                        className="w-2.5 h-2.5 rounded-full border border-black"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>

                  <span className="font-mono text-[10px] tracking-widest uppercase">
                    {theme.name}
                  </span>

                  {isSelected && <Check className="w-3 h-3 text-brand-orange" />}
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
