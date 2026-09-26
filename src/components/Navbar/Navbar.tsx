"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";
import AnnouncementTicker from "./AnnouncementTicker";
import DropdownMenu from "./DropdownMenu";

interface NavbarProps {
  onFilterCategory?: (cat: string, subcat?: string) => void;
  onFilterCollection?: (colSlug: string) => void;
  onScrollToStores?: () => void;
}

export default function Navbar({
  onFilterCategory,
  onFilterCollection,
  onScrollToStores,
}: NavbarProps) {
  const {
    cartCount,
    setIsCartOpen,
    wishlistCount,
    setIsWishlistOpen,
    setIsSearchOpen,
    setIsAuthOpen,
    user,
  } = useStore();

  const [activeDropdown, setActiveDropdown] = useState<
    "CATEGORIES" | "COLLECTIONS" | "STORES" | null
  >(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full select-none transition-all duration-300">
      {/* 1. Animated Announcement Ticker */}
      <AnnouncementTicker />

      {/* 2. Main Luxury Navigation Bar */}
      <nav
        className={`w-full transition-all duration-300 border-b ${
          isScrolled
            ? "bg-[#090909]/95 backdrop-blur-xl border-white/10 py-3 shadow-2xl"
            : "bg-[#080808]/90 backdrop-blur-md border-white/5 py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left Nav Links */}
            <div className="hidden lg:flex items-center gap-7">
              {/* Dropdown trigger: Categories */}
              <button
                onMouseEnter={() => setActiveDropdown("CATEGORIES")}
                onClick={() => setActiveDropdown(activeDropdown === "CATEGORIES" ? null : "CATEGORIES")}
                className="group flex items-center gap-1.5 text-xs font-mono tracking-widest uppercase text-white/80 hover:text-white transition-colors py-1"
              >
                <span className="group-hover:text-brand-orange transition-colors">CATEGORIES</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeDropdown === "CATEGORIES" ? "rotate-180 text-brand-orange" : "text-white/40"
                  }`}
                />
              </button>

              {/* Dropdown trigger: Collections */}
              <button
                onMouseEnter={() => setActiveDropdown("COLLECTIONS")}
                onClick={() => setActiveDropdown(activeDropdown === "COLLECTIONS" ? null : "COLLECTIONS")}
                className="group flex items-center gap-1.5 text-xs font-mono tracking-widest uppercase text-white/80 hover:text-white transition-colors py-1"
              >
                <span className="group-hover:text-brand-orange transition-colors">COLLECTIONS</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeDropdown === "COLLECTIONS" ? "rotate-180 text-brand-orange" : "text-white/40"
                  }`}
                />
              </button>

              {/* Offline Stores scroll link */}
              <button
                onClick={onScrollToStores}
                className="group flex items-center gap-1.5 text-xs font-mono tracking-widest uppercase text-white/80 hover:text-white transition-colors py-1"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="group-hover:text-emerald-400 transition-colors">OFFLINE STORES</span>
                <span className="px-1 py-0.2 text-[9px] bg-emerald-950/70 text-emerald-400 border border-emerald-800/40 rounded">
                  6 LIVE
                </span>
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex lg:hidden items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-white/80 hover:text-white transition-colors"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Center Brand Identity (Nocturne Luxury Wordmark) */}
            <div className="flex flex-col items-center">
              <Link href="/" className="group flex flex-col items-center">
                <span className="font-display font-black text-2xl sm:text-3xl tracking-ultra text-white uppercase group-hover:text-brand-orange transition-colors duration-300">
                  NOCTURNE
                </span>
                <span className="font-mono text-[8px] sm:text-[9px] tracking-widestx text-white/40 uppercase -mt-0.5">
                  HAUTE STREETWEAR LAB
                </span>
              </Link>
            </div>

            {/* Right Action Icons: Search, Wishlist, Members Login, Cart Drawer */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* 1. Search Bar Modal Trigger */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-white/80 hover:text-white hover:bg-white/5 rounded-full transition-all duration-200 relative group"
                aria-label="Search Catalog"
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                <span className="sr-only">Search</span>
              </button>

              {/* 2. Wishlist Counter Button */}
              <button
                onClick={() => setIsWishlistOpen(true)}
                className="p-2 text-white/80 hover:text-white hover:bg-white/5 rounded-full transition-all duration-200 relative group"
                aria-label="Wishlist Drawer"
              >
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-brand-orange text-white text-[9px] font-mono font-bold flex items-center justify-center animate-scale-in">
                    {wishlistCount}
                  </span>
                )}
                <span className="sr-only">Wishlist</span>
              </button>

              {/* 3. Members Login Button */}
              <button
                onClick={() => setIsAuthOpen(true)}
                className="hidden md:flex items-center gap-2 px-3 py-1.5 text-xs font-mono tracking-widest text-white/90 bg-white/5 hover:bg-white/10 border border-white/10 rounded uppercase transition-all duration-200 group"
              >
                <User className="w-3.5 h-3.5 text-brand-orange group-hover:scale-110 transition-transform" />
                <span className="truncate max-w-[100px]">
                  {user ? "VIP MEMBER" : "MEMBERS"}
                </span>
              </button>

              {/* 4. Cart Drawer Counter Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="flex items-center gap-2 px-3 sm:px-3.5 py-1.5 bg-brand-orange text-white hover:bg-brand-electric rounded transition-all duration-200 shadow-lg shadow-brand-orange/20 relative group"
                aria-label="Shopping Cart Drawer"
              >
                <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-mono font-bold tracking-wider">
                  [{cartCount}]
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* 3. Animated Dropdown Menu for Categories & Collections */}
        <DropdownMenu
          isOpen={activeDropdown !== null}
          activeTab={activeDropdown}
          onClose={() => setActiveDropdown(null)}
          onSelectCategory={(cat, subcat) => {
            setActiveDropdown(null);
            onFilterCategory?.(cat, subcat);
          }}
          onSelectCollection={(slug) => {
            setActiveDropdown(null);
            onFilterCollection?.(slug);
          }}
        />
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[88px] z-50 bg-[#0a0a0a]/98 backdrop-blur-2xl p-6 overflow-y-auto border-t border-white/10 lg:hidden">
          <div className="space-y-6">
            {/* Member Card */}
            <div
              onClick={() => {
                setMobileMenuOpen(false);
                setIsAuthOpen(true);
              }}
              className="p-4 bg-white/5 border border-white/10 rounded-lg flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-orange/20 border border-brand-orange flex items-center justify-center text-brand-orange">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                    {user ? user.name : "NOCTURNE MEMBERS CLUB"}
                  </h4>
                  <p className="text-[10px] font-mono text-white/50">
                    {user ? user.tier : "UNLOCK VIP ARCHIVES & EXCLUSIVES"}
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-white/40" />
            </div>

            {/* Quick Links */}
            <div>
              <h5 className="text-[10px] font-mono uppercase tracking-widest text-brand-orange mb-3">
                TOP CATEGORIES
              </h5>
              <div className="grid grid-cols-2 gap-2">
                {["T-shirts", "Polos", "Shirts", "Sweatshirts", "Hoodies", "Jackets"].map(
                  (item) => (
                    <button
                      key={item}
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onFilterCategory?.("Top", item);
                      }}
                      className="p-2.5 text-left text-xs bg-white/5 border border-white/5 rounded text-white/80 hover:text-brand-orange"
                    >
                      {item}
                    </button>
                  )
                )}
              </div>
            </div>

            <div>
              <h5 className="text-[10px] font-mono uppercase tracking-widest text-brand-orange mb-3">
                BOTTOM CATEGORIES
              </h5>
              <div className="grid grid-cols-2 gap-2">
                {["Cargos", "Jeans", "Pants", "Shorts"].map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onFilterCategory?.("Bottom", item);
                    }}
                    className="p-2.5 text-left text-xs bg-white/5 border border-white/5 rounded text-white/80 hover:text-brand-orange"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h5 className="text-[10px] font-mono uppercase tracking-widest text-brand-orange mb-3">
                ACCESSORIES & VAULT
              </h5>
              <div className="grid grid-cols-2 gap-2">
                {["Bags", "Caps", "Cases"].map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onFilterCategory?.("Accessories", item);
                    }}
                    className="p-2.5 text-left text-xs bg-white/5 border border-white/5 rounded text-white/80 hover:text-brand-orange"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onScrollToStores?.();
              }}
              className="w-full py-3 bg-emerald-950/40 border border-emerald-500/40 text-emerald-400 font-mono text-xs uppercase tracking-widest rounded flex items-center justify-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>VIEW 6 OFFLINE STORES</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
