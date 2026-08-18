import { useState } from "react";
import { Menu, X, Github, Linkedin, Sun, Moon, Globe } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useTheme } from "@/lib/theme";
import { useI18n } from "@/lib/i18n";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLang, tr } = useI18n();

  const navLinks = [
    { key: "nav.works", to: "/projects" },
    { key: "nav.about", to: "/about" },
    { key: "nav.experience", to: "/experience" },
    { key: "nav.contact", to: "/contact" },
  ] as const;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 pb-2 bg-background border-b border-border transition-colors duration-300">
      <nav className="mx-auto flex max-w-6xl items-center justify-between">
        {/* Left: Logo Badge Pill */}
        <Link
          to="/"
          className="group flex items-center gap-2.5 rounded-xl bg-card text-card-foreground px-4 py-2 shadow-md border border-border transition-transform hover:scale-105 select-none"
          aria-label={tr("common.home")}
        >
          {/* Prefix dots */}
          <div className="flex items-end gap-[2px] opacity-90">
            <span className="size-1 rounded-full bg-[#FF4B35] mb-[1px]" />
            <div className="flex flex-col gap-[2px]">
              <span className="size-1 rounded-full bg-[#FF4B35]" />
              <span className="size-1 rounded-full bg-[#FF4B35]" />
            </div>
          </div>

          {/* MS Red Square */}
          <div className="grid place-items-center rounded-[5px] bg-[#FF4B35] px-2 py-0.5 shadow-sm">
            <span className="keep-latin font-['Oswald',sans-serif] text-sm font-bold leading-none text-white tracking-tighter">
              MS
            </span>
          </div>

          {/* MOSTAFA SAMIR Text */}
          <div className="keep-latin flex flex-col text-start font-sans text-[9px] font-black tracking-[0.2em] text-foreground leading-tight uppercase">
            <span>MOSTAFA</span>
            <span>SAMIR</span>
          </div>
        </Link>

        {/* Center: Nav Links */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.key}
              to={l.to}
              className="font-sans text-xs font-extrabold tracking-[0.25em] text-foreground transition-opacity hover:opacity-75 uppercase"
            >
              {tr(l.key)}
            </Link>
          ))}
        </div>

        {/* Right: Controls & Social Icons */}
        <div className="flex items-center gap-2.5">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label={tr("common.theme")}
            className="grid size-9 place-items-center rounded-xl bg-foreground/10 border border-border text-foreground transition-all hover:bg-foreground/20 hover:scale-105"
            title={tr("common.theme")}
          >
            {theme === "dark" ? <Sun className="size-4 text-[#FFD000]" /> : <Moon className="size-4 text-[#FF4B35]" />}
          </button>

          {/* Language Switcher */}
          <button
            onClick={toggleLang}
            aria-label={tr("common.language")}
            className="flex h-9 items-center gap-1.5 rounded-xl bg-foreground/10 border border-border px-3 text-xs font-extrabold text-foreground transition-all hover:bg-foreground/20 hover:scale-105"
            title={tr("common.language")}
          >
            <Globe className="size-3.5 text-[#FF4B35]" />
            <span className="keep-latin uppercase">{lang === "en" ? "AR" : "EN"}</span>
          </button>

          {/* Social Icons: GitHub & LinkedIn */}
          <div className="hidden items-center gap-2 sm:flex">
            <a
              href="https://github.com/Mostafa-SAID7"
              target="_blank"
              rel="noopener noreferrer"
              className="grid size-9 place-items-center rounded-xl bg-foreground/10 border border-border text-foreground transition-all hover:bg-foreground/20 hover:scale-105"
              aria-label="GitHub Profile"
            >
              <Github className="size-4" />
            </a>
            <a
              href="https://linkedin.com/in/mostafasamirsaid"
              target="_blank"
              rel="noopener noreferrer"
              className="grid size-9 place-items-center rounded-xl bg-foreground/10 border border-border text-foreground transition-all hover:bg-foreground/20 hover:scale-105"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="size-4" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={tr("common.menu")}
            className="grid size-10 place-items-center rounded-xl bg-foreground/10 border border-border text-foreground md:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {open && (
        <div className="mx-auto mt-3 flex max-w-6xl flex-col gap-2 rounded-[2rem] bg-card text-card-foreground p-5 md:hidden border border-border shadow-xl">
          {navLinks.map((l) => (
            <Link
              key={l.key}
              to={l.to}
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-2.5 text-start font-sans text-xs font-black tracking-[0.2em] uppercase text-foreground hover:bg-foreground/10"
            >
              {tr(l.key)}
            </Link>
          ))}
          <div className="flex items-center gap-3 pt-3 border-t border-border mt-1 px-4">
            <a
              href="https://github.com/Mostafa-SAID7"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-sans text-xs font-bold text-foreground hover:opacity-75"
            >
              <Github className="size-4" /> GitHub
            </a>
            <span className="opacity-30">|</span>
            <a
              href="https://linkedin.com/in/mostafasamirsaid"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-sans text-xs font-bold text-foreground hover:opacity-75"
            >
              <Linkedin className="size-4" /> LinkedIn
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
