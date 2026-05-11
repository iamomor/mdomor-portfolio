"use client";

import { useEffect, useState } from "react";
import type { Portfolio } from "../types/portfolio";

export function usePortfolio() {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);

  useEffect(() => {
    let mounted = true;
    fetch("/assets/data/portfolio.json")
      .then((res) => res.json())
      .then((json: Portfolio) => {
        if (mounted) setPortfolio(json);
      });
    return () => {
      mounted = false;
    };
  }, []);

  return portfolio;
}
