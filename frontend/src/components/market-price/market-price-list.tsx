"use client";
import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "@/app/context/appcontext";

interface Crop {
  state: string;
  district: string;
  market: string;
  commodity: string;
  variety: string;
  grade: string;
  arrival_date: string;
  min_price: string;
  max_price: string;
  modal_price: string;
}

const fallbackCrops: Crop[] = [
  { state: "Maharashtra", district: "Pune", market: "Pune", commodity: "Wheat", variety: "Sharbati", grade: "A", arrival_date: "2025-01-01", min_price: "2000", max_price: "2500", modal_price: "2300" },
  { state: "Uttar Pradesh", district: "Kanpur", market: "Kanpur", commodity: "Rice", variety: "Basmati", grade: "A", arrival_date: "2025-01-01", min_price: "3000", max_price: "3500", modal_price: "3200" },
  { state: "Punjab", district: "Ludhiana", market: "Ludhiana", commodity: "Maize", variety: "Local", grade: "B", arrival_date: "2025-01-02", min_price: "1800", max_price: "2200", modal_price: "2000" },
  { state: "Madhya Pradesh", district: "Indore", market: "Indore", commodity: "Soybean", variety: "Yellow", grade: "A", arrival_date: "2025-01-02", min_price: "3500", max_price: "4000", modal_price: "3750" },
  { state: "Gujarat", district: "Ahmedabad", market: "Ahmedabad", commodity: "Cotton", variety: "BT Cotton", grade: "A", arrival_date: "2025-01-03", min_price: "6000", max_price: "6500", modal_price: "6200" },
  { state: "Rajasthan", district: "Jaipur", market: "Jaipur", commodity: "Bajra", variety: "Local", grade: "B", arrival_date: "2025-01-03", min_price: "1600", max_price: "2000", modal_price: "1800" },
  { state: "Bihar", district: "Patna", market: "Patna", commodity: "Potato", variety: "Local", grade: "A", arrival_date: "2025-01-04", min_price: "800", max_price: "1000", modal_price: "900" },
  { state: "Haryana", district: "Karnal", market: "Karnal", commodity: "Mustard", variety: "Yellow", grade: "A", arrival_date: "2025-01-04", min_price: "4500", max_price: "4800", modal_price: "4600" },
  { state: "Tamil Nadu", district: "Chennai", market: "Chennai", commodity: "Tomato", variety: "Hybrid", grade: "A", arrival_date: "2025-01-05", min_price: "1200", max_price: "1500", modal_price: "1300" },
  { state: "Karnataka", district: "Bangalore", market: "Yeshwanthpur", commodity: "Onion", variety: "Red", grade: "B", arrival_date: "2025-01-05", min_price: "900", max_price: "1200", modal_price: "1050" },
  { state: "West Bengal", district: "Kolkata", market: "Kolkata", commodity: "Jute", variety: "Tossa", grade: "A", arrival_date: "2025-01-06", min_price: "5000", max_price: "5500", modal_price: "5250" },
  { state: "Odisha", district: "Cuttack", market: "Cuttack", commodity: "Groundnut", variety: "Bold", grade: "A", arrival_date: "2025-01-06", min_price: "4000", max_price: "4500", modal_price: "4200" },
  { state: "Telangana", district: "Hyderabad", market: "Hyderabad", commodity: "Chilli", variety: "Teja", grade: "A", arrival_date: "2025-01-07", min_price: "8000", max_price: "9000", modal_price: "8500" },
  { state: "Andhra Pradesh", district: "Guntur", market: "Guntur", commodity: "Turmeric", variety: "Salem", grade: "A", arrival_date: "2025-01-07", min_price: "6500", max_price: "7000", modal_price: "6800" },
  { state: "Kerala", district: "Ernakulam", market: "Ernakulam", commodity: "Coconut", variety: "Hybrid", grade: "A", arrival_date: "2025-01-08", min_price: "9000", max_price: "9500", modal_price: "9200" },
  { state: "Assam", district: "Guwahati", market: "Guwahati", commodity: "Tea Leaves", variety: "Assam Tea", grade: "A", arrival_date: "2025-01-08", min_price: "18000", max_price: "20000", modal_price: "19000" }
];

const MarketPrice: React.FC = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("AppContext must be used inside AppContextProvider");

  const { state, district } = context;
  const [crops, setCrops] = useState<Crop[]>([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [loading, setLoading] = useState(false);

  // change backendUrl to your actual backend origin if needed
  const backendUrl = "http://localhost:4000";

  useEffect(() => {
    if (!district) {
      // If no district selected, show fallback
      setCrops(fallbackCrops);
      return;
    }

    let cancelled = false;

    const fetchPrices = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${backendUrl}/api/marketprices/${encodeURIComponent(district)}`, {
          headers: { "Accept": "application/json" }
        });

        if (!res.ok) {
          // non-2xx status
          console.warn("market prices fetch returned non-ok:", res.status);
          if (!cancelled) setCrops(fallbackCrops);
          return;
        }

        const data = await res.json();

        // Accept either { records: [...] } or an array directly.
        const records: Crop[] =
          Array.isArray(data)
            ? data
            : Array.isArray(data.records)
            ? data.records
            : [];

        if (!records.length) {
          // API returned empty list — use fallback
          if (!cancelled) setCrops(fallbackCrops);
        } else {
          if (!cancelled) setCrops(records);
        }
      } catch (err) {
        console.error("Error fetching market prices", err);
        if (!cancelled) setCrops(fallbackCrops);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchPrices();

    // cleanup to avoid setting state after unmount
    return () => {
      cancelled = true;
    };
  }, [district]); // only run when district changes

  // Filter + Sort safely parsing modal_price to number
  const filteredCrops = crops
    .filter((crop) => crop.commodity?.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      const aNum = Number(a.modal_price) || 0;
      const bNum = Number(b.modal_price) || 0;
      return sortOrder === "asc" ? aNum - bNum : bNum - aNum;
    });

  return (
    <div className="p-6">
      {/* Banner */}
      <div className="relative h-60 w-full mb-8">
        <img
          src="https://res.cloudinary.com/purnesh/image/upload/f_auto/v1500106898/azadpur-header00.jpg"
          alt="Market"
          className="w-full h-full object-cover rounded-xl "
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 flex flex-col items-center justify-center rounded-xl px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg">
            Market Prices
          </h1>
          <p className="mt-3 text-lg md:text-xl text-gray-200 max-w-2xl">
            Get the latest mandi prices of crops in your district — stay updated, make smarter selling & buying decisions.
          </p>
          <button className="mt-5 px-5 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-lg transition">
            Explore Prices
          </button>
        </div>
      </div>

      {/* Search + Sort */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <input
          type="text"
          placeholder="Search crops..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border rounded-lg w-full md:w-1/3 focus:ring-2 focus:ring-green-600"
        />
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-600"
        >
          <option value="asc">Sort by Price: Low to High</option>
          <option value="desc">Sort by Price: High to Low</option>
        </select>
      </div>

      {/* Crop Grid */}
      {loading ? (
        <p className="text-center text-gray-600">Loading market prices...</p>
      ) : filteredCrops.length === 0 ? (
        <p className="text-center text-gray-600">No crops found for your search.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCrops.map((crop, index) => {
            const modalPriceNum = Number(crop.modal_price);
            const displayPrice = Number.isFinite(modalPriceNum) && modalPriceNum > 0 ? `₹${modalPriceNum}` : "₹-";
            return (
              <div
                key={`${crop.commodity}-${crop.market}-${index}`}
                className="bg-white shadow-md rounded-xl p-4 flex flex-col items-center hover:shadow-lg transition"
              >
                <h2 className="text-lg font-semibold">{crop.commodity}</h2>
                <p className="text-gray-500 text-sm">{crop.variety} | {crop.grade}</p>
                <p className="text-green-700 font-medium">
                  {displayPrice} / quintal
                </p>
                <p className="text-sm text-gray-500">📍 {crop.market} Market</p>
                <p className="text-xs text-gray-400">
                  Min: ₹{crop.min_price} | Max: ₹{crop.max_price}
                </p>
                <p className="text-xs text-gray-400">Arrival: {crop.arrival_date}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MarketPrice;
