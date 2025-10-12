"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";

// 👇 Language codes mapping
const languages = {
 en: "English",
  hi: "हिंदी (Hindi)",
  pa: "ਪੰਜਾਬੀ (Punjabi)",   // Punjabi
  ur: "اردو (Urdu)",        // Urdu
  bho: "भोजपुरी (Bhojpuri)", // Bhojpuri (not ISO standard, but custom code works)
  bn: "বাংলা (Bengali)",    // Bengali
  ta: "தமிழ் (Tamil)",
  mr: "मराठी (Marathi)",
  te: "తెలుగు (Telugu)",
};

async function translatePage(targetLang: string) {
  const allTextNodes: Node[] = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);

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

export function LanguageSelector() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <Globe className="h-4 w-20" />
          <p>Language</p>
          <span className="sr-only">Select Language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.entries(languages).map(([code, label]) => (
          <DropdownMenuItem
            key={code}
            onClick={() => translatePage(code)} // 👈 API call here
          >
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
