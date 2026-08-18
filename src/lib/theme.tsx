import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Theme = "dark" | "light";

const STORAGE_KEY = "theme";

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

/**
 * Runs before first paint (inlined in <head>), so the stored theme is applied
 * to <html> in the very first frame — no dark flash for light-mode visitors.
 * Keeps the paint background in sync with the CSS tokens in styles.css.
 */
export const themeBootstrapScript = `(function(){try{
var s=localStorage.getItem("${STORAGE_KEY}");
if(s!=="light"&&s!=="dark"){s=window.matchMedia&&window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";}
var r=document.documentElement;
r.classList.toggle("light",s==="light");
r.style.colorScheme=s==="light"?"light":"dark";
r.style.backgroundColor=s==="light"?"#F8F6F0":"#FF4B35";
r.setAttribute("data-theme",s);
}catch(e){}})();`;

function readAppliedTheme(): Theme {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.classList.contains("light") ? "light" : "dark";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  // SSR renders the default theme; the bootstrap script already painted the
  // correct one, and this state syncs to it right after hydration.
  const [theme, setThemeState] = useState<Theme>("dark");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setThemeState(readAppliedTheme());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const root = document.documentElement;
    root.classList.toggle("light", theme === "light");
    root.style.colorScheme = theme === "light" ? "light" : "dark";
    root.style.backgroundColor = theme === "light" ? "#F8F6F0" : "#FF4B35";
    root.setAttribute("data-theme", theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* storage blocked (private mode) — theme still applies for this session */
    }
  }, [theme, hydrated]);

  // Follow the OS only while the visitor has never made an explicit choice.
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const onChange = (e: MediaQueryListEvent) => {
      let stored: string | null = null;
      try {
        stored = localStorage.getItem(STORAGE_KEY);
      } catch {
        /* ignore */
      }
      if (stored !== "light" && stored !== "dark") setThemeState(e.matches ? "light" : "dark");
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Keep tabs/windows of the same site in sync.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && (e.newValue === "light" || e.newValue === "dark")) {
        setThemeState(e.newValue);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const setTheme = (next: Theme) => setThemeState(next);
  const toggleTheme = () => setThemeState((t) => (t === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
