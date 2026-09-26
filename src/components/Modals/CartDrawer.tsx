"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Tag,
  Check,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { formatPrice } from "@/lib/utils";

interface CartDrawerProps {
  onOpenCheckout: () => void;
}

export default function CartDrawer({ onOpenCheckout }: CartDrawerProps) {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    cartCount,
    cartSubtotal,
    currency,
  } = useStore();

  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState("");

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = promoCode.trim().toUpperCase();
    if (cleanCode === "NOCTURNEVIP" || cleanCode === "BLUORNGVIP") {
      setDiscountPercent(15);
      setPromoApplied(true);
      setPromoError("");
    } else {
      setPromoError("INVALID PROMO CODE. TRY 'NOCTURNEVIP' FOR 15% OFF");
      setPromoApplied(false);
    }
  };

  // Calculations
  const discountAmount = (cartSubtotal * discountPercent) / 100;
  const taxableAmount = cartSubtotal - discountAmount;
  const taxAmount = taxableAmount * 0.12; // 12% GST standard on luxury apparel
  const shippingThreshold = 8000;
  const freeShipping = cartSubtotal >= shippingThreshold || cartSubtotal === 0;
  const shippingFee = freeShipping ? 0 : 250;
  const finalTotal = taxableAmount + taxAmount + shippingFee;

  const hasBlindBox = cart.some((item) => item.product.isBlindBox);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
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
              {/* Drawer Header */}
              <div className="p-5 border-b border-white/10 flex items-center justify-between bg-neutral-950">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-brand-orange" />
                  <h3 className="font-display font-black text-lg tracking-wider uppercase text-white">
                    SHOPPING BAG
                  </h3>
                  <span className="font-mono text-xs px-2 py-0.5 bg-white/10 rounded text-brand-orange">
                    [{cartCount}]
                  </span>
                </div>

                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 text-white/60 hover:text-white rounded-full hover:bg-white/5 transition-colors"
                  aria-label="Close cart"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free Shipping Progress Indicator */}
              <div className="px-5 py-2.5 bg-neutral-900 border-b border-white/5 font-mono text-[11px]">
                {freeShipping ? (
                  <div className="flex items-center gap-2 text-emerald-400 font-bold">
                    <Check className="w-3.5 h-3.5" />
                    <span>COMPLIMENTARY EXPRESS SHIPPING UNLOCKED</span>
                  </div>
                ) : (
                  <div>
                    <span className="text-white/70">
                      ADD {formatPrice(shippingThreshold - cartSubtotal, currency)} MORE FOR FREE EXPRESS SHIPPING
                    </span>
                    <div className="w-full bg-white/10 h-1 rounded-full mt-2 overflow-hidden">
                      <div
                        className="bg-brand-orange h-full rounded-full transition-all duration-300"
                        style={{
                          width: `${Math.min((cartSubtotal / shippingThreshold) * 100, 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Strict Blind Box Warning Banner (if cart contains mystery drop) */}
              {hasBlindBox && (
                <div className="p-3 bg-brand-orange/15 border-b border-brand-orange/30 flex items-start gap-2.5 text-xs">
                  <ShieldAlert className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                  <div>
                    <span className="font-mono font-bold text-brand-orange uppercase tracking-wider block">
                      CHECKOUT POLICY NOTICE
                    </span>
                    <p className="text-white/80 text-[11px] mt-0.5">
                      All Blind Box Sales are Final. No Returns or Exchanges.
                    </p>
                  </div>
                </div>
              )}

              {/* Cart Items List or Empty State */}
              <div className="flex-1 overflow-y-auto p-5 divide-y divide-white/10">
                {cart.length === 0 ? (
                  <div className="py-20 flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 mb-4">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                    <h4 className="font-display font-bold text-base uppercase text-white tracking-wider">
                      YOUR BAG IS EMPTY!
                    </h4>
                    <p className="text-xs font-mono text-white/50 mt-1">
                      Let's get started — explore the latest streetwear drops.
                    </p>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="mt-6 px-6 py-2.5 bg-brand-orange text-white text-xs font-mono font-bold tracking-widest uppercase rounded hover:bg-brand-electric transition-colors"
                    >
                      EXPLORE NEW DROPS
                    </button>
                  </div>
                ) : (
                  cart.map((item, idx) => (
                    <div key={`${item.product.id}-${item.size}-${idx}`} className="py-4 flex gap-4">
                      {/* Product Thumbnail */}
                      <div className="w-20 h-24 bg-neutral-900 rounded overflow-hidden shrink-0 border border-white/10">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-white line-clamp-1">
                              {item.product.name}
                            </h4>
                            <button
                              onClick={() => removeFromCart(item.product.id, item.size)}
                              className="text-white/40 hover:text-red-400 transition-colors p-1"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="flex items-center gap-3 text-[10px] font-mono text-white/50 uppercase mt-1">
                            <span>SIZE: {item.size}</span>
                            <span>•</span>
                            <div className="flex items-center gap-1">
                              <span
                                className="w-2 h-2 rounded-full border border-white/20"
                                style={{ backgroundColor: item.color }}
                              />
                              <span>COLOR</span>
                            </div>
                          </div>
                        </div>

                        {/* Quantity and Price */}
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center border border-white/15 rounded bg-neutral-900">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.size, -1)}
                              className="p-1 hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 font-mono text-xs text-white">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.size, 1)}
                              className="p-1 hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <span className="font-mono text-xs font-bold text-white">
                            {formatPrice(
                              (item.product.salePrice ?? item.product.price) * item.quantity,
                              currency
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer Calculations & Checkout Button */}
              {cart.length > 0 && (
                <div className="p-5 border-t border-white/10 bg-neutral-950/80 space-y-4">
                  {/* Coupon Code Input */}
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 text-white/40 absolute left-3 top-3" />
                      <input
                        type="text"
                        placeholder="COUPON (TRY NOCTURNEVIP)"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="w-full bg-neutral-900 border border-white/15 pl-8 pr-3 py-2 text-xs font-mono uppercase tracking-wider text-white rounded focus:outline-none focus:border-brand-orange"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono text-xs uppercase tracking-wider rounded transition-colors"
                    >
                      APPLY
                    </button>
                  </form>

                  {promoApplied && (
                    <span className="text-[10px] font-mono text-emerald-400 block -mt-2">
                      VIP 15% DISCOUNT APPLIED!
                    </span>
                  )}
                  {promoError && (
                    <span className="text-[10px] font-mono text-red-400 block -mt-2">
                      {promoError}
                    </span>
                  )}

                  {/* Summary Breakdown */}
                  <div className="space-y-1.5 font-mono text-xs text-white/70 border-t border-white/5 pt-3">
                    <div className="flex justify-between">
                      <span>BAG SUBTOTAL</span>
                      <span className="text-white">{formatPrice(cartSubtotal, currency)}</span>
                    </div>

                    {discountAmount > 0 && (
                      <div className="flex justify-between text-brand-orange">
                        <span>VIP DISCOUNT (15%)</span>
                        <span>-{formatPrice(discountAmount, currency)}</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span>ESTIMATED TAX (12% GST)</span>
                      <span className="text-white">{formatPrice(taxAmount, currency)}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>EXPRESS SHIPPING</span>
                      <span className={freeShipping ? "text-emerald-400" : "text-white"}>
                        {freeShipping ? "FREE" : formatPrice(shippingFee, currency)}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm font-bold text-white border-t border-white/10 pt-2">
                      <span>ESTIMATED TOTAL</span>
                      <span className="text-brand-orange">{formatPrice(finalTotal, currency)}</span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      onOpenCheckout();
                    }}
                    className="w-full py-4 bg-brand-orange hover:bg-brand-electric text-white font-mono text-xs font-bold uppercase tracking-widest rounded flex items-center justify-center gap-2 shadow-xl shadow-brand-orange/30 transition-all duration-200"
                  >
                    <span>PROCEED TO CHECKOUT</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
