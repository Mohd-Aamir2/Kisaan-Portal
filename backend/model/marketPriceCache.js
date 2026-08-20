import mongoose from "mongoose";

// Har district ka sabse latest successful data.gov.in fetch yahan cache
// hota hai. Jab live API fail ho ya us din ke records na ho, isi cache
// se 2-3 din purana (ya jitna bhi latest available ho) data serve
// karte hain — hardcoded dummy data ke bajaye.
const marketPriceCacheSchema = new mongoose.Schema(
  {
    // District ko normalize karke store karo (lowercase) taaki lookup
    // case-insensitive rahe, chahe API ko bhejte waqt Title Case use ho
    districtKey: { type: String, required: true, unique: true, index: true },
    district: { type: String, required: true }, // original/display casing
    records: { type: [mongoose.Schema.Types.Mixed], default: [] },
    fetchedAt: { type: Date, required: true, default: Date.now },
  },
  { timestamps: true }
);

const MarketPriceCache = mongoose.model(
  "MarketPriceCache",
  marketPriceCacheSchema
);

export default MarketPriceCache;