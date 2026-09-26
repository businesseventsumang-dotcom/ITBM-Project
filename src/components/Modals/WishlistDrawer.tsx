"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { formatPrice } from "@/lib/utils";

export default function WishlistDrawer() {
  const {
    wishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    toggleWishlist,
    addToCart,
    currency,
  } = useStore();

  return (
    <AnimatePresence>
      {isWishlistOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsWishlistOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="w-screen max-w-md bg-[#0a0a0a] border-l border-white/10 shadow-2xl flex flex-col text-white select-none"
            >
              {/* Header */}
              <div className="p-5 border-b border-white/10 flex items-center justify-between bg-neutral-950">
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-brand-orange fill-brand-orange" />
                  <h3 className="font-display font-black text-lg tracking-wider uppercase text-white">
                    CURATED WISHLIST
                  </h3>
                  <span className="font-mono text-xs px-2 py-0.5 bg-white/10 rounded text-brand-orange">
                    [{wishlist.length}]
                  </span>
                </div>

                <button
                  onClick={() => setIsWishlistOpen(false)}
                  className="p-2 text-white/60 hover:text-white rounded-full hover:bg-white/5 transition-colors"
                  aria-label="Close wishlist"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-5 divide-y divide-white/10">
                {wishlist.length === 0 ? (
                  <div className="py-20 flex flex-col items-center justify-center text-center">
                    <Heart className="w-12 h-12 text-white/20 mb-3" />
                    <h4 className="font-display font-bold text-base uppercase text-white tracking-wider">
                      NO PIECES IN WISHLIST
                    </h4>
                    <p className="text-xs font-mono text-white/50 mt-1">
                      Save your favorite streetwear silhouettes for quick drops.
                    </p>
                  </div>
                ) : (
                  wishlist.map((product) => (
                    <div key={product.id} className="py-4 flex gap-4">
                      {/* Product Thumbnail */}
                      <div className="w-20 h-24 bg-neutral-900 rounded overflow-hidden shrink-0 border border-white/10">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-white line-clamp-1">
                              {product.name}
                            </h4>
                            <button
                              onClick={() => toggleWishlist(product)}
                              className="text-white/40 hover:text-red-400 transition-colors p-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <span className="text-[10px] font-mono text-white/40 uppercase block mt-1">
                            {product.subcategory} // {product.collection}
                          </span>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <span className="font-mono text-xs font-bold text-white">
                            {formatPrice(product.salePrice ?? product.price, currency)}
                          </span>

                          <button
                            onClick={() => {
                              addToCart(product, product.sizes[0], product.colors[0], 1);
                              toggleWishlist(product);
                            }}
                            className="px-3 py-1.5 bg-brand-orange hover:bg-brand-electric text-white font-mono text-[10px] font-bold uppercase tracking-wider rounded flex items-center gap-1 transition-colors"
                          >
                            <ShoppingBag className="w-3 h-3" />
                            <span>MOVE TO BAG</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
