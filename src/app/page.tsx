"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar/Navbar";
import HeroSlider from "@/components/Hero/HeroSlider";
import ProductCarousel from "@/components/ProductCarousel/ProductCarousel";
import BlindBoxSection from "@/components/BlindBox/BlindBoxSection";
import ProductGrid from "@/components/Catalog/ProductGrid";
import OfflineStoresSection from "@/components/OfflineStores/OfflineStoresSection";
import OrderTrackingPortal from "@/components/OrderTracking/OrderTrackingPortal";
import Footer from "@/components/Footer/Footer";

// Global Modals
import CartDrawer from "@/components/Modals/CartDrawer";
import WishlistDrawer from "@/components/Modals/WishlistDrawer";
import SearchModal from "@/components/Modals/SearchModal";
import AuthModal from "@/components/Modals/AuthModal";
import CheckoutModal from "@/components/Modals/CheckoutModal";
import ProductDetailModal from "@/components/ProductDetail/ProductDetailModal";

import { PRODUCTS, ProductItem } from "@/data/products";
import { useStore } from "@/context/StoreContext";

export default function Home() {
  const { quickViewProduct, setQuickViewProduct } = useStore();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Filter routing state from Navbar to ProductGrid
  const [gridCategory, setGridCategory] = useState<string>("ALL");
  const [gridSubcategory, setGridSubcategory] = useState<string>("ALL");

  const handleFilterCategory = (cat: string, subcat?: string) => {
    setGridCategory(cat);
    setGridSubcategory(subcat || "ALL");
    const elem = document.getElementById("catalog-section");
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleFilterCollection = (colSlug: string) => {
    const elem = document.getElementById("catalog-section");
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScrollToStores = () => {
    const elem = document.getElementById("walk-in-stores");
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#070707] text-[#f4f4f4] relative overflow-x-hidden">
      {/* 1. Sticky Navigation Bar & Dropdowns (Phase 1) */}
      <Navbar
        onFilterCategory={handleFilterCategory}
        onFilterCollection={handleFilterCollection}
        onScrollToStores={handleScrollToStores}
      />

      {/* 2. Interactive Hero Section with 3D Canvas (Phase 1) */}
      <HeroSlider onSelectDrop={handleFilterCategory} />

      {/* 3. Latest Drops Carousel with 3D Tilt Cards (Phase 1) */}
      <ProductCarousel
        products={PRODUCTS}
        onOpenQuickView={(p) => setQuickViewProduct(p)}
        onViewAllCatalog={() => {
          const elem = document.getElementById("catalog-section");
          elem?.scrollIntoView({ behavior: "smooth" });
        }}
      />

      {/* 4. Special Blind Box Drop Mechanic (Phase 3) */}
      <BlindBoxSection />

      {/* 5. Dynamic Product Catalog with Staggered Animations & Color Themes (Phase 2) */}
      <div className="pt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
          <div className="flex items-center gap-2 text-brand-orange font-mono text-[11px] tracking-widest uppercase mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
            <span>FULL STUDIO REPERTOIRE</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-white">
            ARCHIVE CATALOG
          </h2>
          <p className="text-white/50 text-xs sm:text-sm font-mono mt-1">
            SHOP BY NOCTURNE COLOR PALETTES // ARCHITECTURAL TAILORING
          </p>
        </div>

        <ProductGrid
          initialProducts={PRODUCTS}
          initialCategory={gridCategory}
          initialSubcategory={gridSubcategory}
          onOpenQuickView={(p) => setQuickViewProduct(p)}
        />
      </div>

      {/* 6. Physical Walk-in Stores Interactive Locator (Phase 1 & Phase 3) */}
      <OfflineStoresSection />

      {/* 7. Self-Service Order Tracking & Returns Concierge (Phase 3) */}
      <OrderTrackingPortal />

      {/* 8. Luxury Brutalist Footer with Walk-in Quick List & Newsletter (Phase 1) */}
      <Footer />

      {/* --- GLOBAL APPLICATION MODALS & DRAWERS --- */}

      {/* Slide-out Cart Drawer with Tax, Calculations & Blind Box Policy (Phase 2) */}
      <CartDrawer onOpenCheckout={() => setIsCheckoutOpen(true)} />

      {/* Wishlist Drawer */}
      <WishlistDrawer />

      {/* Live Real-time Search Modal (Phase 1 & 2) */}
      <SearchModal onOpenQuickView={(p) => setQuickViewProduct(p)} />

      {/* Members Auth Modal & VIP Dashboard (Phase 2) */}
      <AuthModal />

      {/* Interactive Product Detail Modal with Hover Zoom & Size Selector (Phase 2) */}
      <ProductDetailModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />

      {/* Realistic Multi-Step Checkout Modal & Payment Gateway Simulation (Phase 4) */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </div>
  );
}
