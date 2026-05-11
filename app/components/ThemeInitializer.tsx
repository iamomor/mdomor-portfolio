"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTheme } from "../store/theme-slice";

export default function ThemeInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    const saved = (localStorage.getItem("theme") as "dark" | "light" | null) ?? null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const t = saved || (prefersDark ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", t);
    dispatch(setTheme(t));
  }, [dispatch]);

  return null;
}
