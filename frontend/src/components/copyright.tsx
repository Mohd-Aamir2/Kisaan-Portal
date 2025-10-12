"use client";

import { useState, useEffect } from 'react';

export function Copyright() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  if (!year) {
    return null;
  }

  return (
    <p className="text-sm text-muted-foreground mt-4 sm:mt-0">&copy; {year} Kisaan. All rights reserved.</p>
  );
}
