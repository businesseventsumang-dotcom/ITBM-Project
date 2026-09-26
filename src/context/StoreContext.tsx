"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { ProductItem, PRODUCTS } from "@/data/products";

export interface CartItem {
  product: ProductItem;
  size: string;
  color: string;
  quantity: number;
}

export type Currency = "INR" | "USD" | "EUR";

interface StoreContextType {
  cart: CartItem[];
  addToCart: (product: ProductItem, size?: string, color?: string, quantity?: number) => void;
  removeFromCart: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, delta: number) => void;
  cartCount: number;
  cartSubtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  wishlist: ProductItem[];
  toggleWishlist: (product: ProductItem) => void;
  isInWishlist: (productId: string) => boolean;
  wishlistCount: number;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;

  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  isAuthOpen: boolean;
  setIsAuthOpen: (open: boolean) => void;
  user: { name: string; email: string; tier: string } | null;
  loginUser: (email: string, name: string) => void;
  logoutUser: () => void;

  quickViewProduct: ProductItem | null;
  setQuickViewProduct: (product: ProductItem | null) => void;

  currency: Currency;
  setCurrency: (c: Currency) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [wishlist, setWishlist] = useState<ProductItem[]>([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string; tier: string } | null>({
    name: "VIP ARCHIVE MEMBER",
    email: "vip.collector@nocturne.com",
    tier: "TIER 01 / EARLY ACCESS",
  });

  const [quickViewProduct, setQuickViewProduct] = useState<ProductItem | null>(null);
  const [currency, setCurrency] = useState<Currency>("INR");

  // Load initial demo cart items for immediate rich feel
  useEffect(() => {
    const p1 = PRODUCTS[0]; // Polo
    const p2 = PRODUCTS[6]; // Grand Prix Cap
    if (p1 && p2) {
      setCart([
        {
          product: p1,
          size: "L",
          color: p1.colors[0],
          quantity: 1,
        },
        {
          product: p2,
          size: "ONE SIZE",
          color: p2.colors[0],
          quantity: 1,
        },
      ]);
      setWishlist([PRODUCTS[1], PRODUCTS[7]]);
    }
  }, []);

  const addToCart = (
    product: ProductItem,
    size: string = product.sizes[0] || "M",
    color: string = product.colors[0] || "#000",
    quantity: number = 1
  ) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.product.id === product.id && item.size === size
      );
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      }
      return [...prev, { product, size, color, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, size: string) => {
    setCart((prev) => prev.filter((item) => !(item.product.id === productId && item.size === size)));
  };

  const updateQuantity = (productId: string, size: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId && item.size === size) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce(
    (sum, item) => sum + (item.product.salePrice ?? item.product.price) * item.quantity,
    0
  );

  const toggleWishlist = (product: ProductItem) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((p) => p.id === productId);
  };

  const wishlistCount = wishlist.length;

  const loginUser = (email: string, name: string) => {
    setUser({
      email,
      name: name || "STREETWEAR ARCHIVIST",
      tier: "TIER 01 / EARLY ACCESS",
    });
    setIsAuthOpen(false);
  };

  const logoutUser = () => {
    setUser(null);
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartCount,
        cartSubtotal,
        isCartOpen,
        setIsCartOpen,
        wishlist,
        toggleWishlist,
        isInWishlist,
        wishlistCount,
        isWishlistOpen,
        setIsWishlistOpen,
        isSearchOpen,
        setIsSearchOpen,
        searchQuery,
        setSearchQuery,
        isAuthOpen,
        setIsAuthOpen,
        user,
        loginUser,
        logoutUser,
        quickViewProduct,
        setQuickViewProduct,
        currency,
        setCurrency,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}
