import { useState, useEffect, useCallback } from "react";

interface ThemeSyncOptions {
  storageKey?: string;
  dataAttribute?: string;
  element?: HTMLElement;
  onToggle?: (theme: Theme) => void;
}
const THEMES = ["light", "dark"] as const;
const NEXT_THEME = { light: "dark", dark: "light" } as const;
type Theme = (typeof THEMES)[number];
const isTheme = (value: unknown): value is Theme =>
  typeof value === "string" && THEMES.includes(value as Theme);

export const useThemeSync = ({
  dataAttribute = "data-theme",
  element = document.documentElement,
  storageKey = "theme",
  onToggle,
}: ThemeSyncOptions = {}) => {
  const getSystemTheme = (): Theme =>
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";

  const getInitialTheme = (): Theme => {
    if (typeof window === "undefined") return "light";
    const stored = localStorage.getItem(storageKey);
    return isTheme(stored) ? stored : getSystemTheme();
  };

  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    element.setAttribute(dataAttribute, theme);
    localStorage.setItem(storageKey, theme);
  }, [theme, dataAttribute, element, storageKey]);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      if (!localStorage.getItem(storageKey)) setTheme(getSystemTheme());
    };
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next = NEXT_THEME[prev];
      if (onToggle) onToggle(next);
      return next;
    });
  }, [onToggle]);

  return { theme, setTheme, toggle };
};
