import fetch from "node-fetch";
import MarketPriceCache from "../model/marketPriceCache.js";

// Kitne purane cache tak "acceptable" maanna hai. Isse zyada purana ho
// to bhi dikha denge (kuch na hone se behtar), par frontend ko staleness
// batane ke liye humesha fetchedAt bhejenge.
const MAX_USEFUL_CACHE_DAYS = 7;

export const getMarketPrices = async (req, res) => {
  const { district } = req.params;
  const API_KEY = process.env.API_KEY;

  if (!district || !district.trim()) {
    return res.status(400).json({ message: "district param required" });
  }

  // data.gov.in ka "district" field CKAN "keyword" type hai — filter
  // exact-match + case-sensitive hota hai. Dataset me values Title Case
  // me hoti hain (e.g. "Lucknow"), lekin humare profile me user "lucknow"
  // (lowercase) save kar sakta hai. Isliye normalize karna zaroori hai.
  const normalizedDistrict = district
    .trim()
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const districtKey = normalizedDistrict.toLowerCase();

  // Helper: cache se serve karo, agar mile to
  const serveFromCache = async (reasonForFallback) => {
    const cached = await MarketPriceCache.findOne({ districtKey }).lean();
    if (cached && cached.records?.length) {
      const ageDays = Math.floor(
        (Date.now() - new Date(cached.fetchedAt).getTime()) / 86400000
      );
      console.warn(
        `[marketController] Serving ${ageDays}-day-old cached data for "${normalizedDistrict}". Reason: ${reasonForFallback}`
      );
      return res.json({
        records: cached.records,
        stale: true,
        fetchedAt: cached.fetchedAt,
        ageDays,
        veryStale: ageDays > MAX_USEFUL_CACHE_DAYS,
        reason: reasonForFallback,
      });
    }
    // Cache bhi nahi mila — ab frontend apna hardcoded fallback dikhayega
    console.warn(
      `[marketController] No cache available for "${normalizedDistrict}". Reason: ${reasonForFallback}`
    );
    return res.status(502).json({
      message: reasonForFallback,
    });
  };

  if (!API_KEY) {
    console.error(
      "[marketController] API_KEY env var missing! Set it in Render dashboard -> Environment."
    );
    return serveFromCache("Server misconfiguration: API_KEY not set");
  }

  const url = `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=${API_KEY}&format=json&filters[district]=${encodeURIComponent(
    normalizedDistrict
  )}&limit=200`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeout);

    const contentType = response.headers.get("content-type") || "";

    if (!response.ok) {
      const bodyText = await response.text().catch(() => "");
      console.error(
        `[marketController] data.gov.in returned ${response.status} for district="${normalizedDistrict}". Body:`,
        bodyText.slice(0, 300)
      );
      return serveFromCache(`Upstream API error (status ${response.status})`);
    }

    if (!contentType.includes("application/json")) {
      const bodyText = await response.text().catch(() => "");
      console.error(
        `[marketController] Expected JSON but got "${contentType}". First 300 chars:`,
        bodyText.slice(0, 300)
      );
      return serveFromCache(
        "Upstream API returned non-JSON response (likely invalid/rate-limited API key)"
      );
    }

    const data = await response.json();
    const records = Array.isArray(data?.records) ? data.records : [];

    if (!records.length) {
      // Aaj ke liye is district ka data nahi aaya — purana cache try karo
      return serveFromCache(
        `Aaj "${normalizedDistrict}" ke liye koi live record nahi mila`
      );
    }

    // ✅ Success — cache update karo taaki agli baar fail hone pe ye
    // fresh data hi "stale fallback" ban sake
    await MarketPriceCache.findOneAndUpdate(
      { districtKey },
      {
        districtKey,
        district: normalizedDistrict,
        records,
        fetchedAt: new Date(),
      },
      { upsert: true }
    );

    console.log(
      `[marketController] district="${normalizedDistrict}" -> ${records.length} live records (cache updated)`
    );

    return res.json({ records, stale: false, fetchedAt: new Date() });
  } catch (err) {
    clearTimeout(timeout);
    if (err.name === "AbortError") {
      console.error("[marketController] Request to data.gov.in timed out");
      return serveFromCache("Upstream API timeout");
    }
    console.error("[marketController] Unexpected error:", err.message);
    return serveFromCache("Server error while fetching live prices");
  }
};