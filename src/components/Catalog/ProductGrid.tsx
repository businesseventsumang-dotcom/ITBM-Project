"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, Sparkles, AlertCircle } from "lucide-react";
import { ProductItem } from "@/data/products";
import ProductCard from "@/components/ProductCarousel/ProductCard";
import ColorFilterBar, { ColorTheme } from "./ColorFilterBar";

interface ProductGridProps {
  initialProducts: ProductItem[];
  initialCategory?: string;
  initialSubcategory?: string;
  initialCollection?: string;
  onOpenQuickView: (product: ProductItem) => void;
}

export default function ProductGrid({
  initialProducts,
  initialCategory = "ALL",
  initialSubcategory = "ALL",
  initialCollection,
  onOpenQuickView,
}: ProductGridProps) {
  const [category, setCategory] = useState<string>(initialCategory);
  const [subcategory, setSubcategory] = useState<string>(initialSubcategory);
  const [selectedColor, setSelectedColor] = useState<ColorTheme>("ALL");
  const [sortBy, setSortBy] = useState<string>("FEATURED");

  // Map color themes to color hexes or name patterns
  const colorMatches = (theme: ColorTheme, colors: string[]) => {
    if (theme === "ALL") return true;
    const lowerColors = colors.map((c) => c.toLowerCase());

    switch (theme) {
      case "BLUES":
        return lowerColors.some(
          (c) =>
            c.includes("blue") ||
            c === "#1e3a5f" ||
            c === "#0b192c" ||
            c === "#0051ff" ||
            c === "#1e222a"
        );
      case "BROWNS":
        return lowerColors.some(
          (c) =>
            c.includes("brown") ||
            c === "#8d6242" ||
            c === "#4a4036" ||
            c === "#c8b6a6" ||
            c === "#d5c7b4"
        );
      case "GREENS":
        return lowerColors.some(
          (c) =>
            c.includes("green") ||
            c === "#2e473b" ||
            c === "#353831" ||
            c === "#1b3022"
        );
      case "NEUTRALS":
        return lowerColors.some(
          (c) =>
            c.includes("black") ||
            c.includes("white") ||
            c.includes("grey") ||
            c === "#0a0a0a" ||
            c === "#121212" ||
            c === "#0e0e0e" ||
            c === "#141414" ||
            c === "#1a1a1a" ||
            c === "#ffffff" ||
            c === "#efece6" ||
            c === "#8c827a" ||
            c === "#c0c0c0" ||
            c === "#d4cdc5"
        );
      case "PURPLES":
        return lowerColors.some(
          (c) =>
            c.includes("purple") ||
            c === "#4a2e66" ||
            c === "#6c5b7b"
        );
      case "REDS":
        return lowerColors.some(
          (c) =>
            c.includes("red") ||
            c.includes("orange") ||
            c === "#ff4500" ||
            c === "#ff3b00" ||
            c === "#b22222"
        );
      default:
        return true;
    }
  };

  const filteredProducts = useMemo(() => {
    let list = initialProducts.filter((product) => {
      // Category filter
      if (category !== "ALL" && product.category !== category) {
        return false;
      }
      // Subcategory filter
      if (subcategory !== "ALL" && product.subcategory !== subcategory) {
        return false;
      }
      // Color theme filter
      if (!colorMatches(selectedColor, product.colors)) {
        return false;
      }
      return true;
    });

    // Sorting
    if (sortBy === "PRICE_LOW") {
      list.sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price));
    } else if (sortBy === "PRICE_HIGH") {
      list.sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price));
    } else if (sortBy === "NEWEST") {
      list.sort((a, b) => (b.isNewDrop ? 1 : 0) - (a.isNewDrop ? 1 : 0));
    }

    return list;
  }, [initialProducts, category, subcategory, selectedColor, sortBy]);

  return (
    <div id="catalog-section" className="w-full bg-[#070707] py-8">
      {/* Dynamic Multi-facet Color & Category Filter Bar */}
      <ColorFilterBar
        selectedColor={selectedColor}
        onSelectColor={setSelectedColor}
        selectedCategory={category}
        onSelectCategory={setCategory}
        selectedSubcategory={subcategory}
        onSelectSubcategory={setSubcategory}
        sortBy={sortBy}
        onSelectSortBy={setSortBy}
        totalCount={filteredProducts.length}
      />

      {/* Staggered Animated Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center flex flex-col items-center justify-center border border-white/10 rounded-lg bg-neutral-900/40 p-8">
            <AlertCircle className="w-12 h-12 text-white/30 mb-4" />
            <h3 className="text-lg font-bold text-white uppercase tracking-wider">
              NO DESIGNS MATCH CURRENT FILTERS
            </h3>
            <p className="text-xs font-mono text-white/50 mt-1 max-w-md">
              Try resetting the color theme or switching categories to explore the complete Nocturne archive.
            </p>
            <button
              onClick={() => {
                setCategory("ALL");
                setSubcategory("ALL");
                setSelectedColor("ALL");
              }}
              className="mt-6 px-6 py-2.5 bg-brand-orange text-white text-xs font-mono tracking-widest uppercase rounded hover:bg-brand-electric transition-colors"
            >
              RESET ALL FILTERS
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence>
              {filteredProducts.map((product, idx) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{
                    duration: 0.35,
                    delay: Math.min(idx * 0.04, 0.3),
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <ProductCard product={product} onOpenQuickView={onOpenQuickView} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
