"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  CreditCard,
  ShieldCheck,
  CheckCircle,
  Truck,
  ArrowRight,
  ArrowLeft,
  Lock,
  Sparkles,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";
import confetti from "canvas-confetti";
import { useStore } from "@/context/StoreContext";
import { formatPrice } from "@/lib/utils";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { cart, cartSubtotal, currency } = useStore();

  const [step, setStep] = useState<"SHIPPING" | "PAYMENT" | "PROCESSING" | "SUCCESS" | "FAILED">("SHIPPING");

  // Shipping form fields
  const [formData, setFormData] = useState({
    name: "VIP ARCHIVE MEMBER",
    email: "vip.collector@nocturne.com",
    phone: "+91 98110 45892",
    address: "M-Block Market, Greater Kailash II",
    city: "New Delhi",
    state: "Delhi",
    pincode: "110048",
  });

  const [paymentMethod, setPaymentMethod] = useState<"UPI" | "CARD" | "NETBANKING">("UPI");
  const [simulatedOrderId, setSimulatedOrderId] = useState("");

  const shippingFee = cartSubtotal >= 8000 ? 0 : 250;
  const total = cartSubtotal + shippingFee;

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("PAYMENT");
  };

  const handleSimulatePayment = (success: boolean) => {
    setStep("PROCESSING");
    setTimeout(() => {
      if (success) {
        const orderId = `NOC-${Math.floor(1000000 + Math.random() * 9000000)}`;
        setSimulatedOrderId(orderId);
        setStep("SUCCESS");
        try {
          confetti({
            particleCount: 80,
            spread: 90,
            origin: { y: 0.6 },
            colors: ["#FF4500", "#FFFFFF", "#00FF88"],
          });
        } catch (e) {}
      } else {
        setStep("FAILED");
      }
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => step !== "PROCESSING" && onClose()}
          className="fixed inset-0 bg-black/85 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-2xl bg-[#0c0c0c] border border-white/15 rounded-xl shadow-2xl p-6 sm:p-8 z-10 text-white select-none max-h-[90vh] overflow-y-auto"
        >
          {/* Close button */}
          {step !== "PROCESSING" && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-white/50 hover:text-white rounded-full transition-colors"
              aria-label="Close checkout"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          {/* STEP 1: SHIPPING ADDRESS */}
          {step === "SHIPPING" && (
            <div>
              <div className="flex items-center gap-2 text-brand-orange font-mono text-xs uppercase tracking-widest mb-1">
                <Truck className="w-4 h-4" />
                <span>STEP 01 // DISPATCH ADDRESS</span>
              </div>
              <h3 className="font-display font-black text-2xl uppercase tracking-wider text-white mb-6">
                EXPRESS SHIPPING DETAILS
              </h3>

              <form onSubmit={handleProceedToPayment} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono tracking-widest uppercase text-white/50 mb-1">
                      FULL RECIPIENT NAME
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-neutral-900 border border-white/15 px-3.5 py-2.5 rounded text-xs font-mono uppercase tracking-wider text-white focus:outline-none focus:border-brand-orange"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono tracking-widest uppercase text-white/50 mb-1">
                      CONTACT NUMBER
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-neutral-900 border border-white/15 px-3.5 py-2.5 rounded text-xs font-mono uppercase tracking-wider text-white focus:outline-none focus:border-brand-orange"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono tracking-widest uppercase text-white/50 mb-1">
                    STREET ADDRESS / LANDMARK
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-neutral-900 border border-white/15 px-3.5 py-2.5 rounded text-xs font-mono uppercase tracking-wider text-white focus:outline-none focus:border-brand-orange"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono tracking-widest uppercase text-white/50 mb-1">
                      CITY
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-neutral-900 border border-white/15 px-3.5 py-2.5 rounded text-xs font-mono uppercase tracking-wider text-white focus:outline-none focus:border-brand-orange"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono tracking-widest uppercase text-white/50 mb-1">
                      STATE
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full bg-neutral-900 border border-white/15 px-3.5 py-2.5 rounded text-xs font-mono uppercase tracking-wider text-white focus:outline-none focus:border-brand-orange"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono tracking-widest uppercase text-white/50 mb-1">
                      PIN CODE
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                      className="w-full bg-neutral-900 border border-white/15 px-3.5 py-2.5 rounded text-xs font-mono uppercase tracking-wider text-white focus:outline-none focus:border-brand-orange"
                    />
                  </div>
                </div>

                {/* Summary bar */}
                <div className="p-4 bg-neutral-900 border border-white/10 rounded-lg flex items-center justify-between font-mono text-xs mt-4">
                  <div>
                    <span className="text-white/50 block">ORDER VALUE:</span>
                    <span className="text-white font-bold">{formatPrice(total, currency)}</span>
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-brand-orange hover:bg-brand-electric text-white font-bold uppercase tracking-widest rounded flex items-center gap-2 transition-colors"
                  >
                    <span>SELECT PAYMENT</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* STEP 2: PAYMENT GATEWAY MOCKUP (Razorpay / Stripe) */}
          {step === "PAYMENT" && (
            <div>
              <div className="flex items-center gap-2 text-brand-orange font-mono text-xs uppercase tracking-widest mb-1">
                <CreditCard className="w-4 h-4" />
                <span>STEP 02 // SECURE PAYMENT GATEWAY</span>
              </div>
              <h3 className="font-display font-black text-2xl uppercase tracking-wider text-white mb-6">
                SELECT PAYMENT CHANNEL
              </h3>

              {/* Gateway Banner */}
              <div className="p-3 bg-neutral-900 border border-white/15 rounded-lg flex items-center justify-between mb-6 font-mono text-xs">
                <div className="flex items-center gap-2 text-white/80">
                  <Lock className="w-4 h-4 text-emerald-400" />
                  <span>RAZORPAY & STRIPE 256-BIT ENCRYPTION</span>
                </div>
                <span className="text-brand-orange font-bold">TOTAL: {formatPrice(total, currency)}</span>
              </div>

              {/* Payment Methods */}
              <div className="grid grid-cols-3 gap-3 mb-6 font-mono text-xs">
                {(["UPI", "CARD", "NETBANKING"] as const).map((method) => (
                  <button
                    key={method}
                    onClick={() => setPaymentMethod(method)}
                    className={`py-3 px-4 rounded border text-center uppercase tracking-wider transition-colors ${
                      paymentMethod === method
                        ? "bg-white text-black font-bold border-white"
                        : "bg-white/5 text-white/70 border-white/10 hover:border-white/30"
                    }`}
                  >
                    {method === "UPI" ? "INSTANT UPI" : method === "CARD" ? "DEBIT / CREDIT" : "NETBANKING"}
                  </button>
                ))}
              </div>

              {/* UPI Options */}
              {paymentMethod === "UPI" && (
                <div className="p-4 bg-neutral-900/60 border border-white/10 rounded-lg space-y-3 font-mono text-xs">
                  <span className="text-white/50 block text-[10px] uppercase tracking-widest">
                    POPULAR APPS
                  </span>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 bg-white/5 border border-white/10 rounded text-center text-white/80">
                      GOOGLE PAY
                    </div>
                    <div className="p-3 bg-white/5 border border-white/10 rounded text-center text-white/80">
                      PHONEPE
                    </div>
                    <div className="p-3 bg-white/5 border border-white/10 rounded text-center text-white/80">
                      PAYTM UPI
                    </div>
                  </div>
                </div>
              )}

              {/* Test Action Buttons */}
              <div className="mt-8 space-y-3">
                <button
                  onClick={() => handleSimulatePayment(true)}
                  className="w-full py-4 bg-brand-orange hover:bg-brand-electric text-white font-mono text-xs font-bold uppercase tracking-widest rounded flex items-center justify-center gap-2 shadow-xl shadow-brand-orange/30 transition-colors"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>AUTHORIZE PAYMENT OF {formatPrice(total, currency)}</span>
                </button>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setStep("SHIPPING")}
                    className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white font-mono text-[11px] uppercase tracking-wider rounded transition-colors"
                  >
                    ← BACK TO SHIPPING
                  </button>
                  <button
                    onClick={() => handleSimulatePayment(false)}
                    className="py-2.5 px-3 bg-neutral-900 border border-white/10 text-red-400 font-mono text-[10px] uppercase rounded hover:bg-red-950/40"
                  >
                    SIMULATE FAILURE
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: PROCESSING SPINNER */}
          {step === "PROCESSING" && (
            <div className="py-16 flex flex-col items-center justify-center text-center space-y-4">
              <RefreshCw className="w-12 h-12 text-brand-orange animate-spin" />
              <h4 className="font-display font-bold text-xl uppercase tracking-wider text-white">
                COMMUNICATING WITH VAULT GATEWAY...
              </h4>
              <p className="text-xs font-mono text-white/50">
                Verifying bank authentication token and generating consignment barcode.
              </p>
            </div>
          )}

          {/* STEP 4: SUCCESS CONFIRMATION */}
          {step === "SUCCESS" && (
            <div className="py-8 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div>
                <span className="px-3 py-1 bg-emerald-950/60 border border-emerald-800/40 text-emerald-400 font-mono text-xs font-bold uppercase tracking-widest rounded">
                  PAYMENT SETTLED & CONFIRMED
                </span>
                <h3 className="font-display font-black text-3xl uppercase tracking-wider text-white mt-3">
                  ORDER CONSIGNED!
                </h3>
                <p className="text-xs font-mono text-white/60 mt-1">
                  ORDER IDENTIFIER: <strong className="text-brand-orange">{simulatedOrderId}</strong>
                </p>
              </div>

              <div className="p-4 bg-neutral-900 border border-white/10 rounded-lg text-left font-mono text-xs space-y-2">
                <div className="flex justify-between text-white/60">
                  <span>DISPATCH FROM:</span>
                  <span className="text-white">DELHI MEHRAULI HUB</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>ESTIMATED AIR EXPRESS ARRIVAL:</span>
                  <span className="text-emerald-400">WITHIN 48 HOURS</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full py-4 bg-white text-black hover:bg-brand-orange hover:text-white font-mono text-xs font-bold uppercase tracking-widest rounded transition-colors"
              >
                RETURN TO STORE
              </button>
            </div>
          )}

          {/* STEP 5: FAILED SIMULATION */}
          {step === "FAILED" && (
            <div className="py-8 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-red-500/20 border-2 border-red-500 text-red-400 flex items-center justify-center mx-auto">
                <AlertTriangle className="w-8 h-8" />
              </div>

              <div>
                <h3 className="font-display font-black text-2xl uppercase tracking-wider text-white">
                  TRANSACTION REJECTED
                </h3>
                <p className="text-xs font-mono text-white/60 mt-1 max-w-sm mx-auto">
                  Bank authorization declined by issuer. No funds were debited from your account.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setStep("PAYMENT")}
                  className="flex-1 py-3.5 bg-brand-orange hover:bg-brand-electric text-white font-mono text-xs font-bold uppercase tracking-widest rounded transition-colors"
                >
                  RETRY PAYMENT
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-3.5 bg-white/10 text-white font-mono text-xs uppercase tracking-widest rounded hover:bg-white/20 transition-colors"
                >
                  CANCEL
                </button>
              </div>
            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
