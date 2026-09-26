"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Heart,
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  AlertTriangle,
  ZoomIn,
} from "lucide-react";
import confetti from "canvas-confetti";
import { ProductItem } from "@/data/products";
import { useStore } from "@/context/StoreContext";
import { formatPrice } from "@/lib/utils";

interface ProductDetailModalProps {
  product: ProductItem | null;
  onClose: () => void;
}

export default function ProductDetailModal({ product, onClose }: ProductDetailModalProps) {
  const { addToCart, toggleWishlist, isInWishlist, currency } = useStore();

  const [selectedImgIndex, setSelectedImgIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomCoords, setZoomCoords] = useState({ x: 50, y: 50 });
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedImgIndex(0);
      setSelectedSize(product.sizes[0] || "M");
      setSelectedColor(product.colors[0] || "#000");
    }
  }, [product]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!product) return null;

  const isFavorited = isInWishlist(product.id);
  const isOutOfStock = product.stock <= 0;

  // Zoom on hover handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomCoords({ x, y });
  };

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    setIsAdding(true);

    // Fire luxury celebration confetti
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 },
        colors: ["#FF4500", "#FFFFFF", "#E5B869"],
      });
    } catch (e) {
      // safe fallback
    }

    setTimeout(() => {
      addToCart(product, selectedSize, selectedColor, 1);
      setIsAdding(false);
      onClose();
    }, 450);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl bg-[#0c0c0c] border border-white/15 rounded-xl shadow-2xl overflow-hidden z-10 max-h-[92vh] flex flex-col md:flex-row text-white"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-30 p-2.5 bg-black/60 hover:bg-black/90 border border-white/15 rounded-full text-white/80 hover:text-white transition-all"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Column: Image Gallery with Interactive Zoom */}
          <div className="md:w-1/2 p-6 flex flex-col gap-4 bg-neutral-950/60 border-b md:border-b-0 md:border-r border-white/10">
            {/* Main Interactive Zoom Stage */}
            <div
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleMouseMove}
              className="relative aspect-[3/4] w-full rounded-lg overflow-hidden bg-neutral-900 border border-white/10 cursor-crosshair group"
            >
              <img
                src={product.images[selectedImgIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-200"
                style={
                  isZoomed
                    ? {
                        transform: "scale(2.2)",
                        transformOrigin: `${zoomCoords.x}% ${zoomCoords.y}%`,
                      }
                    : { transform: "scale(1)" }
                }
              />

              {/* Floating Zoom indicator */}
              {!isZoomed && (
                <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-black/70 backdrop-blur-md rounded border border-white/10 text-[9px] font-mono tracking-widest text-white/60 flex items-center gap-1.5 pointer-events-none">
                  <ZoomIn className="w-3 h-3 text-brand-orange" />
                  <span>HOVER TO MAGNIFY</span>
                </div>
              )}

              {product.isBlindBox && (
                <div className="absolute top-3 left-3 px-3 py-1 bg-brand-orange text-white font-mono text-[10px] tracking-widest uppercase font-bold rounded flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>BLIND BOX VAULT</span>
                </div>
              )}
            </div>

            {/* Gallery Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImgIndex(idx)}
                    className={`relative w-20 aspect-square rounded-md overflow-hidden border-2 transition-all shrink-0 ${
                      selectedImgIndex === idx
                        ? "border-brand-orange scale-105"
                        : "border-white/15 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Specifications, Size Selector & Glowing Add to Bag */}
          <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[75vh] md:max-h-[92vh]">
            <div className="space-y-6">
              
              {/* Drop Tag & Collection */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono tracking-widest uppercase text-brand-orange font-bold">
                  {product.collection} // {product.subcategory}
                </span>
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`flex items-center gap-1.5 text-xs font-mono tracking-wider transition-colors ${
                    isFavorited ? "text-brand-orange" : "text-white/50 hover:text-white"
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isFavorited ? "fill-brand-orange" : ""}`} />
                  <span>{isFavorited ? "SAVED" : "WISHLIST"}</span>
                </button>
              </div>

              {/* Title & Pricing */}
              <div>
                <h2 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-white leading-tight">
                  {product.name}
                </h2>

                <div className="flex items-baseline gap-3 mt-2 font-mono">
                  {product.salePrice ? (
                    <>
                      <span className="text-2xl font-bold text-white">
                        {formatPrice(product.salePrice, currency)}
                      </span>
                      <span className="text-base text-white/40 line-through">
                        {formatPrice(product.price, currency)}
                      </span>
                      <span className="text-xs px-2 py-0.5 bg-brand-orange/20 text-brand-orange border border-brand-orange/40 rounded font-bold">
                        SALE
                      </span>
                    </>
                  ) : (
                    <span className="text-2xl font-bold text-white">
                      {formatPrice(product.price, currency)}
                    </span>
                  )}
                </div>
              </div>

              {/* Stock Status Availability Badge */}
              <div className="flex items-center gap-2">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    isOutOfStock
                      ? "bg-red-500"
                      : product.stock <= 5
                      ? "bg-amber-500 animate-ping"
                      : "bg-emerald-400 live-pulse"
                  }`}
                />
                <span className="font-mono text-xs uppercase tracking-wider font-semibold">
                  {isOutOfStock ? (
                    <span className="text-red-400">ARCHIVED / SOLD OUT</span>
                  ) : product.stock <= 5 ? (
                    <span className="text-amber-400">
                      CRITICAL ALLOCATION: ONLY {product.stock} PIECES REMAINING
                    </span>
                  ) : (
                    <span className="text-emerald-400">IN STOCK & READY TO SHIP</span>
                  )}
                </span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-light">
                {product.description}
              </p>

              {/* Colorways Selector */}
              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-white/50 block mb-2">
                  COLORWAY CODE: {selectedColor}
                </span>
                <div className="flex items-center gap-2.5">
                  {product.colors.map((color, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedColor(color)}
                      style={{ backgroundColor: color }}
                      className={`w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center ${
                        selectedColor === color
                          ? "border-brand-orange scale-110 shadow-lg shadow-brand-orange/40"
                          : "border-white/20 hover:border-white/60"
                      }`}
                      title={color}
                    >
                      {selectedColor === color && (
                        <Check className="w-4 h-4 text-white drop-shadow-md" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Interactive Size Selection Grid */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-white/50">
                    SELECT SIZE
                  </span>
                  <span className="text-[10px] font-mono text-brand-orange underline cursor-pointer">
                    STREETWEAR FIT GUIDE
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-2.5">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      disabled={isOutOfStock}
                      className={`py-3 rounded font-mono text-xs font-bold tracking-widest uppercase border transition-all ${
                        selectedSize === size
                          ? "bg-white text-black border-white shadow-md"
                          : "bg-white/5 border-white/10 text-white/70 hover:border-white/40 hover:text-white"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Blind Box Warning Banner (if applicable) */}
              {product.isBlindBox && (
                <div className="p-3.5 bg-brand-orange/10 border border-brand-orange/40 rounded-lg flex items-start gap-3 text-xs">
                  <AlertTriangle className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold font-mono text-brand-orange uppercase tracking-wider">
                      STRICT POLICY: ALL BLIND BOX SALES ARE FINAL
                    </h5>
                    <p className="text-white/60 text-[11px] mt-0.5">
                      Mystery drop items cannot be returned, exchanged, or refunded under any circumstances.
                    </p>
                  </div>
                </div>
              )}

              {/* Architectural Specs List */}
              <div className="border-t border-white/10 pt-4">
                <span className="text-[10px] font-mono tracking-widest uppercase text-white/40 block mb-2">
                  GARMENT SPECIFICATIONS
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-white/60">
                  {product.details.map((detail, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-brand-orange" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Glowing Action Buttons */}
            <div className="pt-6 border-t border-white/10 mt-6 space-y-3">
              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock || isAdding}
                className={`w-full py-4 rounded font-mono text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 transition-all duration-300 ${
                  isOutOfStock
                    ? "bg-neutral-800 text-white/30 cursor-not-allowed border border-white/5"
                    : "bg-brand-orange hover:bg-brand-electric text-white shadow-xl shadow-brand-orange/30 hover:shadow-brand-orange/50 active:scale-[0.99]"
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>
                  {isAdding
                    ? "ADDING TO ARCHIVE BAG..."
                    : isOutOfStock
                    ? "OUT OF STOCK"
                    : `ADD TO BAG // ${formatPrice(product.salePrice ?? product.price, currency)}`}
                </span>
              </button>

              {/* Guarantees */}
              <div className="grid grid-cols-3 gap-2 pt-2 text-[10px] font-mono text-white/40 text-center uppercase">
                <div className="flex flex-col items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-orange" />
                  <span>100% AUTHENTIC</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-brand-orange" />
                  <span>EXPRESS DISPATCH</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <RotateCcw className="w-3.5 h-3.5 text-brand-orange" />
                  <span>7-DAY EXCHANGES</span>
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
