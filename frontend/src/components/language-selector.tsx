"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";
import { usePathname } from "next/navigation";

const languages: Record<string, string> = {
  en: "English",
  hi: "हिंदी",
  pa: "ਪੰਜਾਬੀ",
  bho: "भोजपुरी",
  bn: "বাংলা",
  ta: "தமிழ்",
  te: "తెలుగు",
  kn: "ಕನ್ನಡ",
  ml: "മലയാളം",
  mr: "मराठी",
  gu: "ગુજરાતી",
  or: "ଓଡ଼ିଆ",
  ur: "اردو",
  kok: "कोंकणी",
  sa: "संस्कृत",
};

// Har text node ka "asli" (English) source hamesha yahan store rehta hai,
// taaki language A -> B switch karte waqt hum already-translated text ko
// dobara translate na kar baithein (purana bug).
const originalTextByNode = new WeakMap<Node, string>();

// Chhota, fast hash — localStorage key ko short aur safe rakhne ke liye
// (Unicode text ke saath btoa seedha use nahi ho sakta).
function hashText(input: string): string {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 31 + input.charCodeAt(i)) | 0;
  }
  return hash.toString(36);
}

function cacheKey(text: string, targetLang: string): string {
  return `translateCache:${targetLang}:${hashText(text)}`;
}

function getCached(text: string, targetLang: string): string | null {
  try {
    return localStorage.getItem(cacheKey(text, targetLang));
  } catch {
    return null;
  }
}

function setCached(text: string, targetLang: string, translated: string) {
  try {
    localStorage.setItem(cacheKey(text, targetLang), translated);
  } catch {
    // localStorage full ya unavailable — cache skip karo, feature still kaam karega
  }
}

export function LanguageSelector() {
  const [language, setLanguage] = useState("en");
  const pathname = usePathname(); // ✅ Next.js version of useLocation

  useEffect(() => {
    const savedLang = localStorage.getItem("preferredLanguage");
    if (savedLang && savedLang !== language) {
      setLanguage(savedLang);
    }
  }, []);

  useEffect(() => {
    if (!language) return;

    async function translatePage(targetLang: string) {
      const allTextNodes: Node[] = [];
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT
      );

      while (walker.nextNode()) {
        const node = walker.currentNode;
        if (node.nodeValue && node.nodeValue.trim()) {
          allTextNodes.push(node);
        }
      }

      // Har node ka original (English) source resolve karo — pehli baar dekha
      // gaya node hi apna original hai, dobara dekha gaya node apna cached
      // original use karega (chahe abhi kisi aur language mein dikh raha ho).
      for (const node of allTextNodes) {
        if (!originalTextByNode.has(node)) {
          originalTextByNode.set(node, node.nodeValue || "");
        }
      }

      if (targetLang === "en") {
        // English par wapas jaate waqt seedha original restore karo — koi API call nahi.
        for (const node of allTextNodes) {
          node.nodeValue = originalTextByNode.get(node) ?? node.nodeValue;
        }
        return;
      }

      // Cache se jo already mil jaye wo turant apply karo, baaki ke liye
      // ek batch mein backend ko bhejo (100 sequential calls ki jagah 1 call).
      const toFetch: { node: Node; text: string }[] = [];
      for (const node of allTextNodes) {
        const original = originalTextByNode.get(node) ?? node.nodeValue ?? "";
        const cached = getCached(original, targetLang);
        if (cached !== null) {
          node.nodeValue = cached;
        } else {
          toFetch.push({ node, text: original });
        }
      }

      if (toFetch.length === 0) return;

      // Ek hi text (e.g. "Submit") multiple nodes mein repeat ho sakta hai —
      // usse ek hi baar backend ko bhejo, response sab matching nodes par apply karo.
      const uniqueTexts = Array.from(new Set(toFetch.map((item) => item.text)));

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/translate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ texts: uniqueTexts, targetLang }),
        });

        if (!res.ok) {
          throw new Error(`Translate API responded with ${res.status}`);
        }

        const data = await res.json();
        const translations: string[] = data.translations || [];

        const translatedByText = new Map<string, string>();
        uniqueTexts.forEach((text, i) => {
          translatedByText.set(text, translations[i] ?? text);
        });

        for (const { node, text } of toFetch) {
          const translated = translatedByText.get(text) ?? text;
          node.nodeValue = translated;
          setCached(text, targetLang, translated);
        }
      } catch (err) {
        // Poora batch fail ho jaye (network down, Google block, etc.) to bhi
        // feature crash nahi hoga — nodes original text mein hi reh jaayenge.
        console.error("Translation failed", err);
      }
    }

    translatePage(language);
  }, [language, pathname]);

  const handleLanguageChange = (code: string) => {
    setLanguage(code);
    localStorage.setItem("preferredLanguage", code);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <Globe className="h-4 w-4 mr-2" />
          <p>{languages[language] || "Language"}</p>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.entries(languages).map(([code, label]) => (
          <DropdownMenuItem
            key={code}
            onClick={() => handleLanguageChange(code)}
          >
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}