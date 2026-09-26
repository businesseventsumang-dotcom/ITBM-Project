export interface OfflineStore {
  id: string;
  city: string;
  name: string;
  area: string;
  address: string;
  timing: string;
  phone: string;
  isOpenNow: boolean;
  statusText: string;
  flagship: boolean;
  mapsUrl: string;
  image: string;
}

export const OFFLINE_STORES: OfflineStore[] = [
  {
    id: "store-delhi",
    city: "Delhi",
    name: "NOCTURNE DELHI GK II & MEHRAULI",
    area: "Greater Kailash II & The Dhan Mill",
    address: "M-Block Market, GK II & Warehouse 14, The Dhan Mill, Chhatarpur, New Delhi 110074",
    timing: "11:00 AM – 09:30 PM (Daily)",
    phone: "+91 98110 45892",
    isOpenNow: true,
    statusText: "WALK-IN ACTIVE",
    flagship: true,
    mapsUrl: "https://maps.google.com/?q=Greater+Kailash+II+New+Delhi",
    image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "store-mumbai",
    city: "Mumbai",
    name: "NOCTURNE MUMBAI KHAR WEST & KALA GHODA",
    area: "Khar West & Kala Ghoda Arts Precinct",
    address: "14th Road, Khar West & Ground Floor, Heritage Arcade, Forbes Street, Kala Ghoda, Mumbai 400001",
    timing: "11:30 AM – 09:30 PM (Daily)",
    phone: "+91 98201 77314",
    isOpenNow: true,
    statusText: "WALK-IN ACTIVE",
    flagship: true,
    mapsUrl: "https://maps.google.com/?q=Khar+West+Mumbai",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "store-ahmedabad",
    city: "Ahmedabad",
    name: "NOCTURNE AHMEDABAD BODAKDEV",
    area: "Bodakdev / Sindhu Bhavan Rd",
    address: "Shop 4, Symphony Pavillion, Off Sindhu Bhavan Road, Bodakdev, Ahmedabad 380054",
    timing: "11:00 AM – 09:00 PM (Daily)",
    phone: "+91 97234 19028",
    isOpenNow: true,
    statusText: "OPEN NOW",
    flagship: false,
    mapsUrl: "https://maps.google.com/?q=Sindhu+Bhavan+Road+Ahmedabad",
    image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "store-hyderabad",
    city: "Hyderabad",
    name: "NOCTURNE HYDERABAD JUBILEE HILLS",
    area: "Road No. 36, Jubilee Hills",
    address: "Plot 789, Prime Square, Road No. 36, Jubilee Hills, Hyderabad 500033",
    timing: "11:00 AM – 09:00 PM (Daily)",
    phone: "+91 99890 32185",
    isOpenNow: true,
    statusText: "OPEN NOW",
    flagship: false,
    mapsUrl: "https://maps.google.com/?q=Jubilee+Hills+Hyderabad",
    image: "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "store-gurugram",
    city: "Gurugram",
    name: "NOCTURNE GURUGRAM DLF SUMMIT PLAZA",
    area: "DLF Summit Plaza & Horizon",
    address: "DLF Summit Plaza, Golf Course Road & One Horizon Plaza, DLF Phase 5, Gurugram 122002",
    timing: "11:00 AM – 09:30 PM (Daily)",
    phone: "+91 98108 64290",
    isOpenNow: true,
    statusText: "OPEN NOW",
    flagship: false,
    mapsUrl: "https://maps.google.com/?q=DLF+Summit+Plaza+Gurugram",
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "store-noida",
    city: "Noida",
    name: "NOCTURNE NOIDA DLF MALL OF INDIA",
    area: "DLF Mall of India & Sector 104",
    address: "DLF Mall of India, Sector 18 & Express Trade Avenue, Sector 104 High Street, Noida 201304",
    timing: "11:00 AM – 09:00 PM (Daily)",
    phone: "+91 98711 05432",
    isOpenNow: true,
    statusText: "OPEN NOW",
    flagship: false,
    mapsUrl: "https://maps.google.com/?q=DLF+Mall+of+India+Noida",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop"
  }
];
