"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  RotateCcw,
  Search,
  ShieldAlert,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export default function OrderTrackingPortal() {
  const [activeTab, setActiveTab] = useState<"TRACK" | "RETURN">("TRACK");
  const [orderQuery, setOrderQuery] = useState("NOC-8821094");
  const [searched, setSearched] = useState(true);

  // Return Portal state
  const [returnOrderId, setReturnOrderId] = useState("");
  const [returnReason, setReturnReason] = useState("");
  const [isReturnBlindBoxCheck, setIsReturnBlindBoxCheck] = useState(false);
  const [returnStatusMessage, setReturnStatusMessage] = useState("");

  const steps = [
    {
      title: "ORDER CONFIRMED",
      desc: "Vault container packed & cryptographic seal applied",
      time: "24 Sep, 10:14 PM",
      completed: true,
      active: false,
    },
    {
      title: "QUALITY INSPECTION",
      desc: "Architectural seam verification & GSM audit passed",
      time: "25 Sep, 09:30 AM",
      completed: true,
      active: false,
    },
    {
      title: "DISPATCHED FROM MEHRAULI HUB",
      desc: "Air Express courier in transit // AWB: NOC-EX-99214",
      time: "25 Sep, 02:45 PM",
      completed: true,
      active: true,
    },
    {
      title: "OUT FOR DELIVERY",
      desc: "White-glove concierge out on final route",
      time: "Expected 26 Sep, 11:00 AM",
      completed: false,
      active: false,
    },
    {
      title: "DELIVERED TO ARCHIVE",
      desc: "Secured handover to customer",
      time: "Pending",
      completed: false,
      active: false,
    },
  ];

  const handleReturnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (returnOrderId.toUpperCase().includes("BOX") || isReturnBlindBoxCheck) {
      setReturnStatusMessage(
        "RETURN REJECTED: In accordance with our terms, all Blind Box items are Final Sale and non-refundable."
      );
    } else {
      setReturnStatusMessage(
        `RETURN AUTHORIZED // Reverse pickup scheduled for Order #${returnOrderId || "NOC-8821094"}. You will receive courier SMS tracking.`
      );
    }
  };

  return (
    <section id="order-tracking" className="w-full py-20 bg-[#0a0a0a] border-b border-white/10 select-none">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-brand-orange font-mono text-xs tracking-widest uppercase mb-2">
            <Package className="w-4 h-4" />
            <span>SELF-SERVICE CONCIERGE</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-white">
            ORDER RADAR & EXCHANGES
          </h2>
          <p className="text-xs font-mono text-white/50 mt-1">
            REAL-TIME TELEMETRY FOR YOUR STREETWEAR SHIPMENTS
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex border border-white/15 rounded-lg p-1.5 mb-8 bg-neutral-950 font-mono text-xs max-w-md mx-auto">
          <button
            onClick={() => setActiveTab("TRACK")}
            className={`flex-1 py-2.5 rounded uppercase tracking-wider font-bold transition-colors ${
              activeTab === "TRACK"
                ? "bg-brand-orange text-white"
                : "text-white/60 hover:text-white"
            }`}
          >
            TRACK SHIPMENT
          </button>
          <button
            onClick={() => setActiveTab("RETURN")}
            className={`flex-1 py-2.5 rounded uppercase tracking-wider font-bold transition-colors ${
              activeTab === "RETURN"
                ? "bg-brand-orange text-white"
                : "text-white/60 hover:text-white"
            }`}
          >
            RETURN / EXCHANGE
          </button>
        </div>

        {/* TRACK ORDER TAB */}
        {activeTab === "TRACK" && (
          <div className="space-y-8">
            {/* Search Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSearched(true);
              }}
              className="flex gap-3"
            >
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-white/40 absolute left-4 top-3.5" />
                <input
                  type="text"
                  value={orderQuery}
                  onChange={(e) => setOrderQuery(e.target.value)}
                  placeholder="ENTER ORDER ID (E.G. BLU-8821094)"
                  className="w-full bg-neutral-900 border border-white/15 pl-11 pr-4 py-3 rounded-lg text-xs font-mono uppercase tracking-wider text-white focus:outline-none focus:border-brand-orange"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-brand-orange hover:bg-brand-electric text-white font-mono text-xs font-bold uppercase tracking-widest rounded-lg transition-colors"
              >
                LOCATE
              </button>
            </form>

            {searched && (
              <div className="bg-[#0f0f0f] border border-white/15 rounded-xl p-6 sm:p-8 space-y-8 shadow-2xl">
                {/* Order Summary Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
                  <div>
                    <span className="text-[10px] font-mono text-brand-orange uppercase tracking-widest block">
                      TRACKING IDENTIFIER
                    </span>
                    <h3 className="font-mono text-lg font-bold text-white uppercase mt-0.5">
                      {orderQuery || "BLU-8821094"}
                    </h3>
                    <p className="text-xs font-mono text-white/50">
                      Destination: Greater Kailash II, New Delhi 110048
                    </p>
                  </div>

                  <div className="text-right sm:text-right">
                    <span className="px-3 py-1 bg-emerald-950/70 text-emerald-400 border border-emerald-800/40 rounded font-mono text-xs font-bold tracking-widest uppercase">
                      IN TRANSIT (ON TIME)
                    </span>
                    <span className="block text-[10px] font-mono text-white/40 mt-1">
                      DELIVERY COURIER: BLU-AIR EXPRESS
                    </span>
                  </div>
                </div>

                {/* Animated Step-by-Step Progress Timeline */}
                <div className="space-y-6">
                  {steps.map((step, idx) => (
                    <div key={idx} className="flex gap-4 relative">
                      {/* Connecting Line */}
                      {idx !== steps.length - 1 && (
                        <div
                          className={`absolute left-[13px] top-7 bottom-0 w-0.5 ${
                            step.completed ? "bg-brand-orange" : "bg-white/10"
                          }`}
                        />
                      )}

                      {/* Icon Node */}
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 z-10 border transition-all ${
                          step.completed
                            ? "bg-brand-orange border-brand-orange text-white"
                            : "bg-neutral-900 border-white/20 text-white/40"
                        }`}
                      >
                        {step.completed ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <Clock className="w-3.5 h-3.5" />
                        )}
                      </div>

                      {/* Text Details */}
                      <div className="flex-1 pb-4">
                        <div className="flex items-center justify-between">
                          <h4
                            className={`text-xs font-bold uppercase tracking-wider ${
                              step.completed ? "text-white" : "text-white/40"
                            }`}
                          >
                            {step.title}
                          </h4>
                          <span className="text-[10px] font-mono text-white/40">
                            {step.time}
                          </span>
                        </div>
                        <p className="text-xs font-mono text-white/60 mt-0.5">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* RETURN / EXCHANGE TAB */}
        {activeTab === "RETURN" && (
          <div className="bg-[#0f0f0f] border border-white/15 rounded-xl p-6 sm:p-8 space-y-6 shadow-2xl">
            {/* Policy Notice */}
            <div className="p-4 bg-brand-orange/10 border border-brand-orange/40 rounded-lg flex items-start gap-3 text-xs">
              <ShieldAlert className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
              <div>
                <h4 className="font-mono font-bold text-brand-orange uppercase tracking-wider">
                  LUXURY STREETWEAR EXCHANGE & RETURN POLICY
                </h4>
                <p className="text-white/70 text-[11px] mt-1 leading-relaxed">
                  Complimentary 7-day reverse pickup for unworn garments with original hangtags intact.
                  <br />
                  <strong className="text-white">STRICT EXCEPTION:</strong> All Blind Box vault sales are 100% final and non-refundable.
                </p>
              </div>
            </div>

            <form onSubmit={handleReturnSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-mono tracking-widest uppercase text-white/50 mb-1">
                  ORDER IDENTIFIER
                </label>
                <input
                  type="text"
                  required
                  value={returnOrderId}
                  onChange={(e) => setReturnOrderId(e.target.value)}
                  placeholder="BLU-8821094"
                  className="w-full bg-neutral-900 border border-white/15 px-4 py-3 rounded-lg text-xs font-mono uppercase tracking-wider text-white focus:outline-none focus:border-brand-orange"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono tracking-widest uppercase text-white/50 mb-1">
                  EXCHANGE REASON
                </label>
                <select
                  required
                  value={returnReason}
                  onChange={(e) => setReturnReason(e.target.value)}
                  className="w-full bg-neutral-900 border border-white/15 px-4 py-3 rounded-lg text-xs font-mono uppercase tracking-wider text-white focus:outline-none focus:border-brand-orange"
                >
                  <option value="">SELECT REASON</option>
                  <option value="SIZE_TOO_LARGE">SIZE RUNS TOO OVERSIZED</option>
                  <option value="SIZE_TOO_SMALL">SIZE RUNS TOO SNUG</option>
                  <option value="EXCHANGE_COLOR">EXCHANGE FOR DIFFERENT COLORWAY</option>
                  <option value="STORE_CREDIT">RETURN FOR STORE CREDIT</option>
                </select>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="blind-box-check"
                  checked={isReturnBlindBoxCheck}
                  onChange={(e) => setIsReturnBlindBoxCheck(e.target.checked)}
                  className="w-4 h-4 accent-brand-orange rounded"
                />
                <label htmlFor="blind-box-check" className="text-xs font-mono text-white/70">
                  This order contains a Blind Box mystery item
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-brand-orange hover:bg-brand-electric text-white font-mono text-xs font-bold uppercase tracking-widest rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xl shadow-brand-orange/30"
              >
                <span>INITIATE RETURN / EXCHANGE CONCIERGE</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {returnStatusMessage && (
              <div
                className={`p-4 rounded-lg font-mono text-xs border ${
                  returnStatusMessage.includes("REJECTED")
                    ? "bg-red-950/40 border-red-800/40 text-red-400"
                    : "bg-emerald-950/40 border-emerald-800/40 text-emerald-400"
                }`}
              >
                {returnStatusMessage}
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
}
