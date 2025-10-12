"use client";

import { useState, useEffect } from "react";

export default function SafeWrapper({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <p>Loading...</p>; // SSR pe sirf ye render hoga
  }

  return <>{children}</>;
}
