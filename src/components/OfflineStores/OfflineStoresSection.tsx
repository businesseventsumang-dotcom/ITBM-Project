"use client";

import React, { useState } from "react";
import {
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  Navigation,
  ExternalLink,
  Sparkles,
  Building2,
  CheckCircle2,
} from "lucide-react";
import { OFFLINE_STORES } from "@/data/stores";

export default function OfflineStoresSection() {
  const [activeCity, setActiveCity] = useState<string>("ALL");

  // Expanded with specific locations requested in Phase 3 & 4
  const stores = [
    {
      id: "delhi-gk2",
      city: "Delhi",
      subLoc: "GK II & Mehrauli",
      name: "NOCTURNE MEHRAULI & GK II FLAGSHIP",
      address: "Warehouse 14, The Dhan Mill, Chhatarpur & M-Block Market, Greater Kailash II, New Delhi",
      timing: "11:00 AM – 09:30 PM (Mon-Sun)",
      phone: "+91 98110 45892",
      whatsapp: "919811045892",
      isOpen: true,
      mapsUrl: "https://maps.google.com/?q=The+Dhan+Mill+New+Delhi",
      image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: "mumbai-khar",
      city: "Mumbai",
      subLoc: "Khar West & Kala Ghoda",
      name: "NOCTURNE KHAR WEST & KALA GHODA",
      address: "Ground Floor, Heritage Arcade, Forbes St, Kala Ghoda & 14th Road, Khar West, Mumbai",
      timing: "11:30 AM – 09:30 PM (Mon-Sun)",
      phone: "+91 98201 77314",
      whatsapp: "919820177314",
      isOpen: true,
      mapsUrl: "https://maps.google.com/?q=Kala+Ghoda+Mumbai",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: "gurugram-summit",
      city: "Gurugram",
      subLoc: "DLF Summit Plaza",
      name: "NOCTURNE DLF SUMMIT & HORIZON",
      address: "DLF Summit Plaza, Golf Course Road & One Horizon Plaza, Phase 5, Gurugram",
      timing: "11:00 AM – 09:30 PM (Mon-Sun)",
      phone: "+91 98108 64290",
      whatsapp: "919810864290",
      isOpen: true,
      mapsUrl: "https://maps.google.com/?q=One+Horizon+Center+Gurugram",
      image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: "noida-dlf",
      city: "Noida",
      subLoc: "DLF Mall of India & Sec 104",
      name: "NOCTURNE DLF MALL & SECTOR 104",
      address: "DLF Mall of India, Sector 18 & Express Trade Avenue, Sector 104 High Street, Noida",
      timing: "11:00 AM – 09:00 PM (Mon-Sun)",
      phone: "+91 98711 05432",
      whatsapp: "919871105432",
      isOpen: true,
      mapsUrl: "https://maps.google.com/?q=DLF+Mall+of+India+Noida",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: "hyderabad-jubilee",
      city: "Hyderabad",
      subLoc: "Jubilee Hills",
      name: "NOCTURNE JUBILEE HILLS CONCEPT",
      address: "Plot 789, Prime Square, Road No. 36, Jubilee Hills, Hyderabad 500033",
      timing: "11:00 AM – 09:00 PM (Mon-Sun)",
      phone: "+91 99890 32185",
      whatsapp: "919989032185",
      isOpen: true,
      mapsUrl: "https://maps.google.com/?q=Jubilee+Hills+Hyderabad",
      image: "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: "ahmedabad-bodakdev",
      city: "Ahmedabad",
      subLoc: "Bodakdev / SBR",
      name: "NOCTURNE BODAKDEV ARCHIVE",
      address: "Shop 4, Symphony Pavillion, Off Sindhu Bhavan Road, Bodakdev, Ahmedabad 380054",
      timing: "11:00 AM – 09:00 PM (Mon-Sun)",
      phone: "+91 97234 19028",
      whatsapp: "919723419028",
      isOpen: true,
      mapsUrl: "https://maps.google.com/?q=Sindhu+Bhavan+Road+Ahmedabad",
      image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=1000&auto=format&fit=crop",
    },
  ];

  const filteredStores = stores.filter((s) => {
    if (activeCity === "ALL") return true;
    return s.city === activeCity;
  });

  const cities = ["ALL", "Delhi", "Mumbai", "Gurugram", "Noida", "Hyderabad", "Ahmedabad"];

  return (
    <section id="walk-in-stores" className="w-full py-20 bg-[#070707] border-b border-white/10 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-[11px] tracking-widest uppercase mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 live-pulse" />
              <span>PHYSICAL FLAGSHIPS // 6 CITIES ACTIVE</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight uppercase">
              WALK-IN STORES
            </h2>
            <p className="text-white/50 text-xs sm:text-sm font-mono mt-1">
              TRY SILHOUETTES IN PERSON // ARCHIVE FITTING ROOMS // CONCIERGE ASSISTANCE
            </p>
          </div>

          {/* City Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar font-mono text-xs">
            {cities.map((city) => (
              <button
                key={city}
                onClick={() => setActiveCity(city)}
                className={`px-3 py-1.5 rounded uppercase tracking-wider transition-colors whitespace-nowrap ${
                  activeCity === city
                    ? "bg-brand-orange text-white font-bold"
                    : "bg-white/5 text-white/70 hover:text-white border border-white/10"
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* Stores Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {filteredStores.map((store) => (
            <div
              key={store.id}
              className="group bg-[#0d0d0d] border border-white/10 rounded-xl overflow-hidden hover:border-emerald-500/50 transition-all duration-300 flex flex-col justify-between shadow-xl"
            >
              {/* Store Architecture Photo */}
              <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
                <img
                  src={store.image}
                  alt={store.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Live Pulse Badge */}
                <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/80 backdrop-blur-md border border-emerald-500/40 rounded flex items-center gap-1.5 font-mono text-[9px] font-bold tracking-widest text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 live-pulse" />
                  <span>OPEN NOW // WALK-IN ACTIVE</span>
                </div>

                <div className="absolute top-3 right-3 px-2 py-0.5 bg-black/80 backdrop-blur-md border border-white/15 rounded font-mono text-[9px] text-white/70 uppercase">
                  {store.city}
                </div>
              </div>

              {/* Store Details */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[10px] font-mono text-brand-orange uppercase tracking-widest block">
                    {store.subLoc}
                  </span>
                  <h3 className="font-display font-bold text-base uppercase text-white tracking-wider group-hover:text-emerald-400 transition-colors mt-0.5">
                    {store.name}
                  </h3>

                  <div className="space-y-2 mt-3 text-xs font-mono text-white/60">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 text-white/40 shrink-0 mt-0.5" />
                      <span className="leading-snug">{store.address}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-white/40 shrink-0" />
                      <span>{store.timing}</span>
                    </div>
                  </div>
                </div>

                {/* Direct Action Triggers (Call, WhatsApp, Maps) */}
                <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/10 font-mono text-[10px] uppercase">
                  {/* Phone Dialer */}
                  <a
                    href={`tel:${store.phone}`}
                    className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded flex flex-col items-center justify-center gap-1 text-white hover:text-brand-orange transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-brand-orange" />
                    <span>CALL</span>
                  </a>

                  {/* WhatsApp Chat */}
                  <a
                    href={`https://wa.me/${store.whatsapp}?text=Hello%20Nocturne%20${store.city}%2C%20inquiring%20about%20store%20stock.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/30 rounded flex flex-col items-center justify-center gap-1 text-emerald-400 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WHATSAPP</span>
                  </a>

                  {/* Google Maps Directions */}
                  <a
                    href={store.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded flex flex-col items-center justify-center gap-1 text-white hover:text-emerald-400 transition-colors"
                  >
                    <Navigation className="w-3.5 h-3.5 text-emerald-400" />
                    <span>MAPS</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
