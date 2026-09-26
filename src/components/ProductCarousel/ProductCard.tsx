"use client";

import React, { useState, useRef } from "react";
import { Heart, ShoppingBag, Eye, Sparkles } from "lucide-react";
import { ProductItem } from "@/data/products";
import { useStore } from "@/context/StoreContext";
import { formatPrice } from "@/lib/utils";

interface ProductCardProps {
  product: ProductItem;
  onOpenQuickView?: (product: ProductItem) => void;
}

export default function ProductCard({ product, onOpenQuickView }: ProductCardProps) {
  const { addToCart, toggleWishlist, isInWishlist, currency } = useStore();
  const [isHovered, setIsHovered] = useState(false);
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  // 3D Card Tilt on Hover
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Mild, luxury perspective tilt
    setRotateX(-y * 0.035);
    setRotateY(x * 0.035);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setActiveImgIndex(0);
    setRotateX(0);
    setRotateY(0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (product.images.length > 1) {
      setActiveImgIndex(1); // Swaps to back / alternate angle on hover
    }
  };

  const isFavorited = isInWishlist(product.id);
  const isOutOfStock = product.stock <= 0;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: isHovered ? "transform 0.1s ease-out" : "transform 0.5s ease-out",
      }}
      className="group relative flex flex-col bg-[#0c0c0c] border border-white/10 rounded-sm overflow-hidden select-none hover:border-white/30 transition-colors duration-300"
    >
      {/* Visual Image Container with Quick Swapper */}
      <div
        onClick={() => onOpenQuickView?.(product)}
        className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-900 cursor-pointer"
      >
        <img
          src={product.images[activeImgIndex] || product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Top Badges (Regular vs Sale / Blind Box / Limited) */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.badge && (
            <span className="px-2 py-0.5 bg-black/80 backdrop-blur-md border border-white/20 text-white font-mono text-[9px] tracking-widest uppercase rounded">
              {product.badge}
            </span>
          )}
          {product.salePrice && (
            <span className="px-2 py-0.5 bg-brand-orange text-white font-mono text-[9px] tracking-widest uppercase font-bold rounded">
              SALE // SAVE {formatPrice(product.price - product.salePrice, currency)}
            </span>
          )}
          {product.isBlindBox && (
            <span className="px-2 py-0.5 bg-gradient-to-r from-brand-orange to-amber-600 text-white font-mono text-[9px] tracking-widest uppercase font-bold rounded flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" />
              <span>FINAL SALE VAULT</span>
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md border transition-all duration-200 z-10 ${
            isFavorited
              ? "bg-brand-orange text-white border-brand-orange"
              : "bg-black/60 text-white/70 border-white/10 hover:text-white hover:bg-black/80"
          }`}
          aria-label="Toggle Wishlist"
        >
          <Heart className={`w-3.5 h-3.5 ${isFavorited ? "fill-white" : ""}`} />
        </button>

        {/* Hover Action Bar: Quick Add to Bag & Quick View */}
        <div
          className={`absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/95 via-black/80 to-transparent transition-all duration-300 flex items-center gap-2 ${
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
          }`}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (!isOutOfStock) {
                addToCart(product, product.sizes[0], product.colors[0], 1);
              }
            }}
            disabled={isOutOfStock}
            className={`flex-1 py-2.5 px-3 rounded font-mono text-[10px] font-bold tracking-widest uppercase flex items-center justify-center gap-1.5 transition-all duration-200 ${
              isOutOfStock
                ? "bg-neutral-800 text-white/40 cursor-not-allowed"
                : "bg-brand-orange hover:bg-brand-electric text-white shadow-lg shadow-brand-orange/30"
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{isOutOfStock ? "SOLD OUT" : "QUICK ADD"}</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenQuickView?.(product);
            }}
            className="p-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded transition-colors"
            title="Inspect Details"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Subcategory & Color Indicators */}
          <div className="flex items-center justify-between text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1.5">
            <span>{product.subcategory}</span>
            <div className="flex items-center gap-1">
              {product.colors.slice(0, 3).map((col, idx) => (
                <span
                  key={idx}
                  className="w-2 h-2 rounded-full border border-white/20"
                  style={{ backgroundColor: col }}
                  title={col}
                />
              ))}
              {product.colors.length > 3 && (
                <span className="text-[9px]">+{product.colors.length - 3}</span>
              )}
            </div>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => onOpenQuickView?.(product)}
            className="text-xs sm:text-sm font-bold tracking-wider text-white uppercase group-hover:text-brand-orange transition-colors line-clamp-1 cursor-pointer"
          >
            {product.name}
          </h3>
        </div>

        {/* Pricing: Regular vs Sale Prices */}
        <div className="flex items-baseline justify-between pt-2 border-t border-white/5 font-mono">
          <div className="flex items-baseline gap-2">
            {product.salePrice ? (
              <>
                <span className="text-sm font-bold text-white">
                  {formatPrice(product.salePrice, currency)}
                </span>
                <span className="text-xs text-white/40 line-through">
                  {formatPrice(product.price, currency)}
                </span>
              </>
            ) : (
              <span className="text-sm font-bold text-white">
                {formatPrice(product.price, currency)}
              </span>
            )}
          </div>

          <span
            className={`text-[9px] uppercase tracking-wider font-semibold ${
              isOutOfStock
                ? "text-red-400"
                : product.stock <= 5
                ? "text-amber-400"
                : "text-emerald-400"
            }`}
          >
            {isOutOfStock
              ? "OUT OF STOCK"
              : product.stock <= 5
              ? `ONLY ${product.stock} LEFT`
              : "IN STOCK"}
          </span>
        </div>
      </div>
    </div>
  );
}
