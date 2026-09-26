# NOCTURNE // Haute Luxury Streetwear Digital Atelier

A complete, full-stack dynamic luxury streetwear storefront modeled directly after the **Nocturne** digital website aesthetic. Engineered with smooth animations, interactive 3D visual effects, real-time drop mechanics, self-service order tracking, and an administrative operations console.

Built with **Next.js (App Router)**, **Tailwind CSS**, **Framer Motion**, **Three.js (WebGL 3D Canvas)**, and **Prisma with SQLite**.

---

## ⚡ Quick Start (Ready to Run)

### 1. Project Workspace Location
```powershell
C:\Users\hinas\.gemini\antigravity-ide\scratch\bluorng-luxury-streetwear
```
*(Recommended: Open this folder directly in your code editor or terminal).*

### 2. Run the Development Server
Open PowerShell in the project directory and run:
```powershell
# Add Node.js to PATH if required
$env:Path = "C:\Users\hinas\nodejs;$env:Path"

# Run development server
npm run dev
```

Visit the storefront in your web browser:
- 👉 **Storefront**: [http://localhost:3000](http://localhost:3000)
- 👉 **Admin Operations Console**: [http://localhost:3000/admin](http://localhost:3000/admin) *(Passcode: `NOCTURNE2025`)*

---

## 🚀 How to Push to Your GitHub Repository

If you previously encountered `fatal: pathspec 'README.md' did not match any files` or `Author identity unknown`, it is because Git commands were run from `C:\Users\hinas` instead of inside this project folder. 

Follow these exact steps from inside the project folder:

```powershell
# Step 1: Navigate to the project directory
cd "C:\Users\hinas\.gemini\antigravity-ide\scratch\bluorng-luxury-streetwear"

# Step 2: Set your Git name and email (replace with your details)
git config user.name "Your Name"
git config user.email "your-email@example.com"

# Step 3: Stage all project files
git add .

# Step 4: Commit your project
git commit -m "feat: complete Nocturne luxury streetwear storefront (Phases 1-4)"

# Step 5: Ensure main branch is selected
git branch -M main

# Step 6: Connect your GitHub remote repository
# (Use either your ITBM-Project repository URL)
git remote add origin https://github.com/businesseventsumang-dotcom/ITBM-Project.git
# If origin already exists and you need to update it:
# git remote set-url origin https://github.com/businesseventsumang-dotcom/ITBM-Project.git

# Step 7: Push your project to GitHub
git push -u origin main
```

---

## 💎 Features Across All 4 Phases

### Phase 1: High-Fashion Luxury Aesthetics & 3D Visuals
1. **Animated Announcement Header & Navigation Bar**:
   - Sticky top bar with infinite marquee ticker banner (`"BLIND BOX LIVE NOW"`, drop alerts, physical store status).
   - Navigation bar featuring Wishlist counter badge, Cart drawer badge, Search bar modal trigger, and Members Login button.
   - Animated dropdown mega-menu categorized into:
     - **Top**: T-shirts, Polos, Shirts, Sweatshirts, Hoodies, Jackets
     - **Bottom**: Cargos, Jeans, Pants, Shorts
     - **Accessories**: Bags, Caps, Cases
     - **Featured Collections**: Winter Collection 2025, Nocturne Racing Club, Nocturne Basics, Yacht Collection
2. **Interactive Hero Section with 3D Canvas**:
   - Hero slider showcase with smooth parallax scrolling and text reveal animations:
     - *"NEW CAPS"* (Drop 01 // Microsuede & 3D Bullion Embroidery)
     - *"POLO SEASON"* (Drop 02 // 340 GSM Architectural Combed Pique)
     - *"NEW SHIRTS"* (Drop 03 // Mediterranean Resort Cupro-Silk Monograms)
   - Embedded **Three.js 3D Canvas**: Real-time faceted chrome cyber-talisman with orbital gyroscopic rings, ambient particle dust, and dynamic cursor coordinate inertia tracking.
3. **Animated Product Carousel ("Latest Drops")**:
   - Horizontal sliding product showcase with smooth card 3D tilt on hover (`perspective` & `rotateX/rotateY`).
   - Price tags displaying Regular vs. Sale prices.
   - Quick hover preview image swappers (front to back garment inspection).
4. **Animated Footer & Offline Stores Section**:
   - Walk-in Stores quick list (Delhi, Mumbai, Ahmedabad, Hyderabad, Gurugram, Noida) with live indicator pulses.
   - Social & Order Support quick links.

---

### Phase 2: Dynamic Catalog, Color Filtering, Cart & Members Flow
1. **Dynamic Product Catalog with Staggered Animations**:
   - Catalog listing view with Framer Motion layout animations when items filter or load.
   - Filter bar with **"Shop by Color"** buttons derived from signature Nocturne color themes:
     - `BLUES` (`#0051FF`, `#1E3A5F`, `#0B192C`)
     - `BROWNS` (`#8D6242`, `#4A4036`, `#C8B6A6`)
     - `GREENS` (`#2E473B`, `#353831`, `#1B3022`)
     - `NEUTRALS` (`#0E0E0E`, `#EFECE6`, `#8C827A`)
     - `PURPLES` (`#4A2E66`, `#6C5B7B`)
     - `REDS` (`#FF4500`, `#B22222`)
   - Real-time instant filtering without page reloads.
2. **Animated Product Detail View**:
   - Product gallery modal with cursor hover magnifying zoom.
   - Interactive size selection grid (S, M, L, XL, XXL) and stock status badge (*"Sold Out"* / *"Critical Allocation"* / *"In Stock"*).
   - Glowing *"Add to Bag"* button animation with celebration confetti.
3. **Slide-Out Animated Cart Drawer**:
   - Slide-in cart overlay triggered from the header.
   - Empty cart state: *"Your bag is empty! Let's get started"*.
   - Item counter, quantity increment/decrement buttons, tax calculator (12% GST), shipping logic, and dynamic price summary.
   - Coupon code input: Enter `NOCTURNEVIP` for **15% off**.
   - Checkout policy banner: *"All Blind Box Sales are Final. No Returns or Exchanges."*
4. **Member Login Flow**:
   - Animated auth modal (Sign Up / Login) with session management and user VIP dashboard.

---

### Phase 3: Streetwear Drop Mechanics, Blind Box & Store Finder
1. **Limited "Blind Box" Drop Mechanic**:
   - Special Blind Box drop section featuring live countdown timers, mystery item card with 3D unboxing visual, and guaranteed item tier breakdown.
   - Strict checkout policy flags ensuring non-refundable terms.
2. **Animated Real-Time Notification System**:
   - Floating toast notification alerts in the bottom corner (e.g., *"Someone in Mumbai just purchased a Crest Carryall Leather"*, *"Someone in Delhi claimed VIP Blind Box Edition"*).
3. **Walk-in Stores Interactive Locator**:
   - Dedicated physical store finder across major Indian streetwear epicenters:
     - **Delhi GK II & Mehrauli**: Greater Kailash II & The Dhan Mill
     - **Mumbai Khar West & Kala Ghoda**: 14th Road Khar & Forbes St Kala Ghoda
     - **Gurugram DLF Summit Plaza**: DLF Summit Plaza & One Horizon Plaza
     - **Noida DLF Mall of India**: DLF Mall of India & Sector 104 High Street
     - **Hyderabad**: Road No. 36, Jubilee Hills
     - **Ahmedabad**: Bodakdev / Sindhu Bhavan Road
   - Live "Open Now" badges, direct phone dialers (`tel:+91...`), WhatsApp concierge triggers (`wa.me/`), and Google Maps direction links.
4. **Self-Service Order Tracking & Returns Portal**:
   - Order tracking search with step-by-step order progress timeline animations:
     1. Order Confirmed
     2. Quality Inspection
     3. Dispatched from Mehrauli Hub
     4. Out for Delivery
     5. Delivered to Archive
   - "Make a Return / Exchange" portal flow with refund policy enforcement (automatically blocking Blind Box items).

---

### Phase 4: Admin Management Console & Realistic Checkout Simulation
1. **Admin Management Dashboard (`/admin`)**:
   - Passcode protection (`NOCTURNE2025` or `admin`).
   - **Product Manager**: Create/edit products, assign categories (Tops, Bottoms, Accessories), tag colors, upload thumbnail URLs, and toggle "Sold Out" badges in real time.
   - **Order Management**: Inspect customer orders, change tracking status, and approve/reject return requests.
   - **Store Telemetry & Financial Metrics**: Track live revenues, active stores, and remaining vault units.
2. **Realistic Mock Checkout Flow**:
   - Multi-step checkout screen capturing customer details, shipping address, coupon codes, and shipping fees.
   - Interactive payment simulation (UPI, Cards, Netbanking) with loading handshake and success/failure animations.
3. **Global UI Polish & Transitions**:
   - Responsive touch-optimized mobile navigation drawer.
   - Pre-configured SQLite schema with Prisma ORM and API routes (`/api/products`, `/api/orders`, `/api/stores`).

---

## 🔑 Demo Credentials & Test Secrets

| Feature | Key / Value | Description |
| :--- | :--- | :--- |
| **Admin Passcode** | `NOCTURNE2025` | Unlocks `/admin` console |
| **Alternative Admin Passcode** | `admin` | Quick fallback passcode |
| **VIP Discount Coupon** | `NOCTURNEVIP` | Gives 15% discount in Cart Drawer |
| **Demo Order Tracking ID** | `NOC-8821094` | Pre-loaded live consignment for tracking |
| **Free Shipping Threshold** | `₹8,000` | Automated tier calculation |

---

## 📂 Project Architecture

```
bluorng-luxury-streetwear/
├── prisma/
│   ├── schema.prisma            # SQLite Database schema for products, orders, stores
│   └── seed.js                  # Database seeder script
├── src/
│   ├── app/
│   │   ├── admin/page.tsx       # /admin route for operations console
│   │   ├── api/
│   │   │   ├── orders/route.ts   # GET/POST orders API
│   │   │   ├── products/route.ts # GET/POST products API
│   │   │   └── stores/route.ts   # GET physical stores API
│   │   ├── globals.css          # Styling tokens, marquee animations, glassmorphism
│   │   ├── layout.tsx           # Root metadata & font configuration
│   │   └── page.tsx             # Master homepage combining all 4 phases
│   ├── components/
│   │   ├── Admin/               # Admin dashboard, product & order managers
│   │   ├── BlindBox/            # Mystery box drop & live countdown clock
│   │   ├── Catalog/             # Staggered product grid & "Shop by Color" bar
│   │   ├── Footer/              # Luxury brutalist footer & walk-in quick list
│   │   ├── Hero/                # Hero slider & Three.js 3D WebGL talisman
│   │   ├── Modals/              # CartDrawer, Wishlist, Search, Auth, Checkout
│   │   ├── Navbar/              # Sticky ticker, navigation bar, mega dropdown
│   │   ├── Notifications/       # Real-time drop activity toast radar
│   │   ├── OfflineStores/       # Walk-in store locator with WhatsApp & Maps
│   │   ├── OrderTracking/       # Consignment tracking & return portal
│   │   ├── ProductCarousel/     # 3D tilt cards horizontal showcase
│   │   └── ProductDetail/       # Modal with hover magnifying zoom & size grid
│   ├── context/
│   │   └── StoreContext.tsx     # Global cart, wishlist, auth & filter state
│   ├── data/
│   │   ├── collections.ts       # Nocturne Racing Club, Basics, Yacht Collection
│   │   ├── products.ts          # Curated streetwear inventory across categories
│   │   └── stores.ts            # Physical store addresses, timings, coordinates
│   └── lib/
│       ├── prisma.ts            # Prisma client instance
│       └── utils.ts             # Currency formatter & class merger
├── package.json
├── tailwind.config.js
└── tsconfig.json
```
