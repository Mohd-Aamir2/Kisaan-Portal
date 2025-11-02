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
      if (targetLang === "en") return;

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

      for (const node of allTextNodes) {
        const original = node.nodeValue || "";
        try {
          const res = await fetch("http://localhost:4000/api/translate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: original, targetLang }),
          });
          const data = await res.json();
          node.nodeValue = data.translated;
        } catch (err) {
          console.error("Translation failed", err);
        }
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