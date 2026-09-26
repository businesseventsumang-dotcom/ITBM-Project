"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldAlert,
  Package,
  Plus,
  Trash2,
  Edit,
  CheckCircle,
  Truck,
  RotateCcw,
  Layers,
  Sparkles,
  ArrowLeft,
  Lock,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import { PRODUCTS, ProductItem } from "@/data/products";
import { OFFLINE_STORES } from "@/data/stores";
import { formatPrice } from "@/lib/utils";

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminPasscode, setAdminPasscode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [activeTab, setActiveTab] = useState<"PRODUCTS" | "ORDERS" | "METRICS">("PRODUCTS");

  // Local state for products in admin
  const [productList, setProductList] = useState<ProductItem[]>(PRODUCTS);
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);

  // New Product Form state
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "Top" as "Top" | "Bottom" | "Accessories",
    subcategory: "T-shirts",
    price: 4999,
    salePrice: 3999,
    stock: 20,
    colors: "#111111, #FFFFFF",
    sizes: "S, M, L, XL",
    badge: "NEW DROP",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop",
    description: "Architectural 300 GSM luxury streetwear garment with high-density stitching.",
  });

  // Mock Orders
  const [orders, setOrders] = useState([
    {
      id: "NOC-8821094",
      customer: "Alexander Vogel",
      city: "New Delhi",
      items: "Cyber Dune Embroidered Polo (L), Grand Prix Cap",
      total: 8498,
      status: "DISPATCHED",
      hasReturnRequest: false,
    },
    {
      id: "NOC-7712093",
      customer: "Rohan Singhania",
      city: "Mumbai",
      items: "VIP Blind Box Collector's Edition",
      total: 7999,
      status: "CONFIRMED",
      hasReturnRequest: false,
    },
    {
      id: "NOC-5541902",
      customer: "Aanya Verma",
      city: "Hyderabad",
      items: "Vortex 12-Pocket Cargo Trousers (32)",
      total: 7999,
      status: "OUT_FOR_DELIVERY",
      hasReturnRequest: true,
      returnReason: "Size runs too oversized for relaxed silhouette",
    },
  ]);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPass = adminPasscode.trim().toUpperCase();
    if (cleanPass === "NOCTURNE2025" || cleanPass === "BLUORNG2025" || cleanPass === "ADMIN") {
      setIsAuthenticated(true);
      setErrorMsg("");
    } else {
      setErrorMsg("INVALID ADMIN SECURITY KEY. (TRY: NOCTURNE2025)");
    }
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const created: ProductItem = {
      id: `prod-${Date.now()}`,
      name: newProduct.name.toUpperCase(),
      slug: newProduct.name.toLowerCase().replace(/\s+/g, "-"),
      category: newProduct.category,
      subcategory: newProduct.subcategory as any,
      price: Number(newProduct.price),
      salePrice: Number(newProduct.salePrice),
      stock: Number(newProduct.stock),
      badge: newProduct.badge,
      collection: "Nocturne Basics",
      colors: newProduct.colors.split(",").map((s) => s.trim()),
      sizes: newProduct.sizes.split(",").map((s) => s.trim()),
      images: [newProduct.image],
      description: newProduct.description,
      details: ["Architectural pattern construction", "Pre-shrunk custom luxury mill fabric"],
    };

    setProductList([created, ...productList]);
    alert(`Product ${created.name} published to store catalog!`);
    // Reset
    setNewProduct({
      name: "",
      category: "Top",
      subcategory: "T-shirts",
      price: 4999,
      salePrice: 3999,
      stock: 20,
      colors: "#111111, #FFFFFF",
      sizes: "S, M, L, XL",
      badge: "NEW DROP",
      image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop",
      description: "",
    });
  };

  const toggleProductStock = (id: string) => {
    setProductList((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const newStock = p.stock > 0 ? 0 : 25;
          return { ...p, stock: newStock };
        }
        return p;
      })
    );
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm("Remove this product from active storefront?")) {
      setProductList((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#070707] flex items-center justify-center p-4 text-white">
        <div className="w-full max-w-md bg-[#0c0c0c] border border-white/15 p-8 rounded-xl shadow-2xl text-center space-y-6">
          <div className="w-14 h-14 rounded-full bg-brand-orange/20 border border-brand-orange flex items-center justify-center text-brand-orange mx-auto">
            <Lock className="w-6 h-6" />
          </div>

          <div>
            <h2 className="font-display font-black text-2xl uppercase tracking-wider text-white">
              ADMIN CONTROL VAULT
            </h2>
            <p className="text-xs font-mono text-white/50 mt-1">
              AUTHORIZED NOCTURNE INVENTORY & ORDER CONSOLE
            </p>
          </div>

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <input
                type="password"
                required
                autoFocus
                placeholder="ENTER PASSCODE (NOCTURNE2025)"
                value={adminPasscode}
                onChange={(e) => setAdminPasscode(e.target.value)}
                className="w-full bg-neutral-900 border border-white/15 px-4 py-3 rounded text-xs font-mono uppercase tracking-widest text-center text-white focus:outline-none focus:border-brand-orange"
              />
            </div>

            {errorMsg && (
              <span className="text-xs font-mono text-red-400 block">{errorMsg}</span>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-brand-orange hover:bg-brand-electric text-white font-mono text-xs font-bold uppercase tracking-widest rounded transition-colors"
            >
              AUTHENTICATE CONSOLE
            </button>
          </form>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-white/50 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>RETURN TO STOREFRONT</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080808] text-white">
      {/* Admin Top Navigation */}
      <header className="border-b border-white/10 bg-[#0d0d0d] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="p-2 bg-white/5 hover:bg-white/10 rounded border border-white/10 text-white/70 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 live-pulse" />
              <h1 className="font-display font-black text-xl uppercase tracking-wider text-white">
                NOCTURNE CONTROL HUB
              </h1>
            </div>
            <span className="text-[10px] font-mono text-white/40">
              PHASE 4 // COMPLETE OPERATIONS ENGINE
            </span>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 font-mono text-xs">
          <button
            onClick={() => setActiveTab("PRODUCTS")}
            className={`px-4 py-2 rounded uppercase tracking-wider ${
              activeTab === "PRODUCTS" ? "bg-brand-orange text-white font-bold" : "text-white/60 hover:text-white"
            }`}
          >
            PRODUCT MANAGER [{productList.length}]
          </button>
          <button
            onClick={() => setActiveTab("ORDERS")}
            className={`px-4 py-2 rounded uppercase tracking-wider ${
              activeTab === "ORDERS" ? "bg-brand-orange text-white font-bold" : "text-white/60 hover:text-white"
            }`}
          >
            ORDERS & RETURNS [{orders.length}]
          </button>
          <button
            onClick={() => setActiveTab("METRICS")}
            className={`px-4 py-2 rounded uppercase tracking-wider ${
              activeTab === "METRICS" ? "bg-brand-orange text-white font-bold" : "text-white/60 hover:text-white"
            }`}
          >
            STORES & METRICS
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        
        {/* TAB 1: PRODUCT MANAGER */}
        {activeTab === "PRODUCTS" && (
          <div className="space-y-10">
            {/* Create Product Form */}
            <div className="bg-[#0e0e0e] border border-white/15 rounded-xl p-6 shadow-xl">
              <div className="flex items-center gap-2 text-brand-orange font-mono text-xs uppercase tracking-widest mb-4">
                <Plus className="w-4 h-4" />
                <span>PUBLISH NEW STREETWEAR SILHOUETTE</span>
              </div>

              <form onSubmit={handleCreateProduct} className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
                <div>
                  <label className="block text-[10px] text-white/50 uppercase mb-1">
                    PRODUCT TITLE
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="E.G. ACID METEOR OVERSIZED TEE"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    className="w-full bg-neutral-900 border border-white/15 px-3 py-2 rounded text-white"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-white/50 uppercase mb-1">
                    CATEGORY
                  </label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value as any })}
                    className="w-full bg-neutral-900 border border-white/15 px-3 py-2 rounded text-white"
                  >
                    <option value="Top">Top</option>
                    <option value="Bottom">Bottom</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] text-white/50 uppercase mb-1">
                    SUBCATEGORY CUT
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="T-shirts, Polos, Cargos, Caps..."
                    value={newProduct.subcategory}
                    onChange={(e) => setNewProduct({ ...newProduct, subcategory: e.target.value })}
                    className="w-full bg-neutral-900 border border-white/15 px-3 py-2 rounded text-white"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-white/50 uppercase mb-1">
                    REGULAR PRICE (₹)
                  </label>
                  <input
                    type="number"
                    required
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                    className="w-full bg-neutral-900 border border-white/15 px-3 py-2 rounded text-white"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-white/50 uppercase mb-1">
                    SALE PRICE (₹)
                  </label>
                  <input
                    type="number"
                    value={newProduct.salePrice}
                    onChange={(e) => setNewProduct({ ...newProduct, salePrice: Number(e.target.value) })}
                    className="w-full bg-neutral-900 border border-white/15 px-3 py-2 rounded text-white"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-white/50 uppercase mb-1">
                    INITIAL STOCK UNITS
                  </label>
                  <input
                    type="number"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: Number(e.target.value) })}
                    className="w-full bg-neutral-900 border border-white/15 px-3 py-2 rounded text-white"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-[10px] text-white/50 uppercase mb-1">
                    IMAGE ASSET URL
                  </label>
                  <input
                    type="text"
                    required
                    value={newProduct.image}
                    onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                    className="w-full bg-neutral-900 border border-white/15 px-3 py-2 rounded text-white"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-white/50 uppercase mb-1">
                    BADGE TEXT
                  </label>
                  <input
                    type="text"
                    value={newProduct.badge}
                    onChange={(e) => setNewProduct({ ...newProduct, badge: e.target.value })}
                    className="w-full bg-neutral-900 border border-white/15 px-3 py-2 rounded text-white"
                  />
                </div>

                <div className="md:col-span-3 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-brand-orange hover:bg-brand-electric text-white font-bold uppercase tracking-widest rounded flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>SAVE & PUBLISH TO LIVE STOREFRONT</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Existing Products Catalog Table */}
            <div className="bg-[#0e0e0e] border border-white/15 rounded-xl overflow-hidden shadow-xl">
              <div className="p-4 border-b border-white/10 flex items-center justify-between font-mono text-xs">
                <span className="text-white font-bold">ALL STOREFRONT PRODUCTS</span>
                <span className="text-white/40">{productList.length} TOTAL INVENTORY RECORDS</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-xs">
                  <thead className="bg-neutral-900 text-white/50 uppercase tracking-widest border-b border-white/10">
                    <tr>
                      <th className="p-3">ITEM</th>
                      <th className="p-3">CATEGORY</th>
                      <th className="p-3">PRICE / SALE</th>
                      <th className="p-3">STOCK STATUS</th>
                      <th className="p-3 text-right">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {productList.map((product) => (
                      <tr key={product.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-3 flex items-center gap-3">
                          <img
                            src={product.images[0]}
                            alt=""
                            className="w-10 h-12 rounded object-cover border border-white/10"
                          />
                          <div>
                            <span className="font-bold text-white block">{product.name}</span>
                            <span className="text-[10px] text-white/40">{product.slug}</span>
                          </div>
                        </td>
                        <td className="p-3 text-white/70">
                          {product.category} // {product.subcategory}
                        </td>
                        <td className="p-3">
                          <span className="text-white font-bold">
                            ₹{product.salePrice ?? product.price}
                          </span>
                          {product.salePrice && (
                            <span className="text-white/40 line-through ml-2">₹{product.price}</span>
                          )}
                        </td>
                        <td className="p-3">
                          <button
                            onClick={() => toggleProductStock(product.id)}
                            className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                              product.stock <= 0
                                ? "bg-red-950/60 text-red-400 border border-red-800/40"
                                : "bg-emerald-950/60 text-emerald-400 border border-emerald-800/40"
                            }`}
                          >
                            {product.stock <= 0 ? "SOLD OUT" : `IN STOCK [${product.stock}]`}
                          </button>
                        </td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="p-1.5 text-white/40 hover:text-red-400 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ORDERS & RETURNS */}
        {activeTab === "ORDERS" && (
          <div className="bg-[#0e0e0e] border border-white/15 rounded-xl overflow-hidden shadow-xl">
            <div className="p-4 border-b border-white/10 flex items-center justify-between font-mono text-xs">
              <span className="text-white font-bold">CUSTOMER ORDER LEDGER</span>
              <span className="text-white/40">REAL-TIME DISPATCH MONITOR</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs">
                <thead className="bg-neutral-900 text-white/50 uppercase tracking-widest border-b border-white/10">
                  <tr>
                    <th className="p-3">ORDER ID</th>
                    <th className="p-3">CUSTOMER</th>
                    <th className="p-3">ITEMS</th>
                    <th className="p-3">TOTAL</th>
                    <th className="p-3">TELEMETRY STATUS</th>
                    <th className="p-3">CHANGE STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-3 font-bold text-brand-orange">{order.id}</td>
                      <td className="p-3">
                        <span className="text-white block">{order.customer}</span>
                        <span className="text-[10px] text-white/40">{order.city}</span>
                      </td>
                      <td className="p-3 text-white/70 max-w-xs truncate">{order.items}</td>
                      <td className="p-3 font-bold text-white">₹{order.total}</td>
                      <td className="p-3">
                        <span className="px-2.5 py-1 bg-white/10 rounded text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                          {order.status}
                        </span>
                        {order.hasReturnRequest && (
                          <span className="block text-[9px] text-amber-400 mt-1">
                            ⚠ RETURN REQUEST FILED
                          </span>
                        )}
                      </td>
                      <td className="p-3">
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                          className="bg-neutral-900 border border-white/15 text-white/80 px-2.5 py-1 rounded text-[10px] uppercase"
                        >
                          <option value="CONFIRMED">CONFIRMED</option>
                          <option value="DISPATCHED">DISPATCHED</option>
                          <option value="OUT_FOR_DELIVERY">OUT FOR DELIVERY</option>
                          <option value="DELIVERED">DELIVERED</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: METRICS & STORES */}
        {activeTab === "METRICS" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-mono">
              <div className="p-6 bg-[#0e0e0e] border border-white/15 rounded-xl">
                <span className="text-xs text-white/40 uppercase block mb-1">TOTAL SALES REVENUE</span>
                <span className="text-3xl font-bold text-brand-orange">₹3,42,890</span>
                <span className="text-[10px] text-emerald-400 block mt-2">↑ +24.8% VS PREVIOUS DROP</span>
              </div>
              <div className="p-6 bg-[#0e0e0e] border border-white/15 rounded-xl">
                <span className="text-xs text-white/40 uppercase block mb-1">ACTIVE PHYSICAL STORES</span>
                <span className="text-3xl font-bold text-emerald-400">6 LIVE</span>
                <span className="text-[10px] text-white/40 block mt-2">DELHI, MUMBAI, GURUGRAM, NOIDA...</span>
              </div>
              <div className="p-6 bg-[#0e0e0e] border border-white/15 rounded-xl">
                <span className="text-xs text-white/40 uppercase block mb-1">BLIND BOXES REMAINING</span>
                <span className="text-3xl font-bold text-white">9 / 100</span>
                <span className="text-[10px] text-amber-400 block mt-2">VAULT WILL CLOSE AUTOMATICALLY</span>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
