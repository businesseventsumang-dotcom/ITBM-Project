"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  User,
  ShieldCheck,
  Sparkles,
  Key,
  Package,
  Award,
  ArrowRight,
  LogOut,
  Mail,
  Lock,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";

export default function AuthModal() {
  const { isAuthOpen, setIsAuthOpen, user, loginUser, logoutUser } = useStore();
  const [tab, setTab] = useState<"LOGIN" | "SIGNUP">("LOGIN");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    loginUser(email, name || email.split("@")[0].toUpperCase());
  };

  if (!isAuthOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsAuthOpen(false)}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-lg bg-[#0c0c0c] border border-white/15 rounded-xl shadow-2xl p-6 sm:p-8 z-10 text-white select-none"
        >
          {/* Close button */}
          <button
            onClick={() => setIsAuthOpen(false)}
            className="absolute top-4 right-4 p-2 text-white/50 hover:text-white rounded-full transition-colors"
            aria-label="Close auth modal"
          >
            <X className="w-5 h-5" />
          </button>

          {user ? (
            /* Logged In Dashboard View */
            <div className="space-y-6">
              <div className="flex items-center gap-4 border-b border-white/10 pb-6">
                <div className="w-14 h-14 rounded-full bg-brand-orange/20 border-2 border-brand-orange flex items-center justify-center text-brand-orange font-mono text-xl font-bold">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-display font-black text-xl uppercase tracking-wider text-white">
                      {user.name}
                    </h3>
                    <span className="px-2 py-0.5 bg-brand-orange/20 text-brand-orange border border-brand-orange/40 rounded text-[9px] font-mono font-bold">
                      VERIFIED
                    </span>
                  </div>
                  <p className="text-xs font-mono text-white/50">{user.email}</p>
                  <p className="text-[10px] font-mono text-brand-orange mt-1">
                    TIER 01 / EARLY VAULT ACCESS ACTIVE
                  </p>
                </div>
              </div>

              {/* VIP Benefits Grid */}
              <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                <div className="p-3 bg-white/5 border border-white/10 rounded">
                  <Sparkles className="w-4 h-4 text-brand-orange mb-1.5" />
                  <span className="text-white font-bold block">15 MIN EARLY DROP</span>
                  <span className="text-[10px] text-white/50">Priority access to Blind Box drops</span>
                </div>
                <div className="p-3 bg-white/5 border border-white/10 rounded">
                  <Award className="w-4 h-4 text-brand-orange mb-1.5" />
                  <span className="text-white font-bold block">ARCHIVE VAULT</span>
                  <span className="text-[10px] text-white/50">Access to past sold-out capsules</span>
                </div>
              </div>

              {/* Recent Orders Snippet */}
              <div className="p-4 bg-neutral-900 border border-white/10 rounded">
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="text-white font-bold flex items-center gap-1.5">
                    <Package className="w-3.5 h-3.5 text-brand-orange" />
                    <span>LATEST ARCHIVE ORDER</span>
                  </span>
                  <span className="text-emerald-400 font-bold">IN TRANSIT</span>
                </div>
                <div className="text-[11px] font-mono text-white/60 space-y-0.5">
                  <p>ORDER #BLU-8821094 // DELHI FLAGSHIP DISPATCH</p>
                  <p className="text-[10px] text-white/40">Expected Delivery: Tomorrow, 2:00 PM</p>
                </div>
              </div>

              {/* Logout & Action Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => setIsAuthOpen(false)}
                  className="flex-1 py-3 bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase tracking-widest rounded transition-colors"
                >
                  RETURN TO STORE
                </button>
                <button
                  onClick={logoutUser}
                  className="px-4 py-3 bg-red-950/40 hover:bg-red-900/50 border border-red-800/40 text-red-400 font-mono text-xs uppercase tracking-widest rounded flex items-center gap-1.5 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>LOGOUT</span>
                </button>
              </div>
            </div>
          ) : (
            /* Sign In / Sign Up Tabs */
            <div>
              {/* Header */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-orange/15 border border-brand-orange/40 text-brand-orange mb-3">
                  <Key className="w-6 h-6" />
                </div>
                <h3 className="font-display font-black text-2xl uppercase tracking-wider text-white">
                  NOCTURNE MEMBERS CLUB
                </h3>
                <p className="text-xs font-mono text-white/50 mt-1">
                  UNLOCK SECRET VAULT DROPS & COLLECTOR PRIVILEGES
                </p>
              </div>

              {/* Tab Switcher */}
              <div className="flex border border-white/15 rounded p-1 mb-6 bg-neutral-900">
                <button
                  onClick={() => setTab("LOGIN")}
                  className={`flex-1 py-2 font-mono text-xs font-bold tracking-widest uppercase rounded transition-colors ${
                    tab === "LOGIN" ? "bg-white text-black" : "text-white/60 hover:text-white"
                  }`}
                >
                  SIGN IN
                </button>
                <button
                  onClick={() => setTab("SIGNUP")}
                  className={`flex-1 py-2 font-mono text-xs font-bold tracking-widest uppercase rounded transition-colors ${
                    tab === "SIGNUP" ? "bg-white text-black" : "text-white/60 hover:text-white"
                  }`}
                >
                  CREATE ACCOUNT
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {tab === "SIGNUP" && (
                  <div>
                    <label className="block text-[10px] font-mono tracking-widest uppercase text-white/50 mb-1">
                      FULL NAME
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-white/40 absolute left-3 top-3.5" />
                      <input
                        type="text"
                        required
                        placeholder="ALEXANDER VOGEL"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-neutral-900 border border-white/15 pl-10 pr-4 py-3 rounded text-xs font-mono uppercase tracking-wider text-white focus:outline-none focus:border-brand-orange"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-[10px] font-mono tracking-widest uppercase text-white/50 mb-1">
                    EMAIL ADDRESS
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-white/40 absolute left-3 top-3.5" />
                    <input
                      type="email"
                      required
                      placeholder="COLLECTOR@NOCTURNE.COM"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-neutral-900 border border-white/15 pl-10 pr-4 py-3 rounded text-xs font-mono uppercase tracking-wider text-white focus:outline-none focus:border-brand-orange"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono tracking-widest uppercase text-white/50 mb-1">
                    SECURE PASSCODE
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-white/40 absolute left-3 top-3.5" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-neutral-900 border border-white/15 pl-10 pr-4 py-3 rounded text-xs font-mono uppercase tracking-wider text-white focus:outline-none focus:border-brand-orange"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-brand-orange hover:bg-brand-electric text-white font-mono text-xs font-bold uppercase tracking-widest rounded flex items-center justify-center gap-2 shadow-xl shadow-brand-orange/30 transition-colors mt-2"
                >
                  <span>{tab === "LOGIN" ? "AUTHENTICATE & ENTER" : "BECOME VIP MEMBER"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* VIP Notice */}
              <div className="mt-6 pt-4 border-t border-white/10 text-center font-mono text-[10px] text-white/40">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-orange inline mr-1 -mt-0.5" />
                <span>256-BIT ENCRYPTED LUXURY STREETWEAR VAULT ACCESS</span>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
