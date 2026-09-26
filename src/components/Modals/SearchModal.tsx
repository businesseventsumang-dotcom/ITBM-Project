"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, TrendingUp, ArrowRight } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { PRODUCTS, ProductItem } from "@/data/products";
import { formatPrice } from "@/lib/utils";

interface SearchModalProps {
  onOpenQuickView: (product: ProductItem) => void;
}

export default function SearchModal({ onOpenQuickView }: SearchModalProps) {
  const { isSearchOpen, setIsSearchOpen, currency } = useStore();
  const [query, setQuery] = useState("");

  const trendingSearches = [
    "POLO",
    "CARGOS",
    "BLIND BOX",
    "RACING HOODIE",
    "SUEDE CAP",
    "YACHT SHIRT",
  ];

  const results = query.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.subcategory.toLowerCase().includes(query.toLowerCase()) ||
          p.collection.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsSearchOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setIsSearchOpen]);

  if (!isSearchOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsSearchOpen(false)}
          className="fixed inset-0 bg-black/85 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          className="relative w-full max-w-3xl bg-[#0c0c0c] border border-white/15 rounded-xl shadow-2xl p-6 sm:p-8 z-10 text-white select-none max-h-[80vh] flex flex-col"
        >
          {/* Header & Search Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-3 flex-1">
              <Search className="w-5 h-5 text-brand-orange shrink-0" />
              <input
                type="text"
                autoFocus
                placeholder="SEARCH APPAREL, DROPS, SILHOUETTES..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent text-base sm:text-lg font-mono uppercase tracking-wider text-white placeholder-white/40 focus:outline-none"
              />
            </div>
            <button
              onClick={() => setIsSearchOpen(false)}
              className="p-2 text-white/50 hover:text-white rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Trending Searches Suggestions */}
          {!query.trim() && (
            <div className="pt-6">
              <div className="flex items-center gap-2 text-xs font-mono text-white/40 uppercase tracking-widest mb-3">
                <TrendingUp className="w-3.5 h-3.5 text-brand-orange" />
                <span>TRENDING SEARCHES</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {trendingSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3.5 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full font-mono text-xs uppercase tracking-wider text-white/80 hover:text-white transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results List */}
          {query.trim() && (
            <div className="flex-1 overflow-y-auto pt-6 divide-y divide-white/10">
              <span className="text-[11px] font-mono text-white/40 uppercase tracking-widest block mb-3">
                {results.length} MATCHING PIECES
              </span>

              {results.length === 0 ? (
                <div className="py-12 text-center text-xs font-mono text-white/40">
                  NO APPAREL FOUND MATCHING "{query.toUpperCase()}"
                </div>
              ) : (
                results.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => {
                      setIsSearchOpen(false);
                      onOpenQuickView(product);
                    }}
                    className="py-3 flex items-center justify-between hover:bg-white/5 p-2 rounded cursor-pointer transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-14 rounded overflow-hidden bg-neutral-900 border border-white/10 shrink-0">
                        <img src={product.images[0]} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-white group-hover:text-brand-orange transition-colors">
                          {product.name}
                        </h4>
                        <span className="text-[10px] font-mono text-white/40 uppercase">
                          {product.subcategory} // {product.collection}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold text-white">
                        {formatPrice(product.salePrice ?? product.price, currency)}
                      </span>
                      <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-brand-orange group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
