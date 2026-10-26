"use client";

import { useEffect, useState } from "react";
import { Icon } from "./Icon";

type Theme = "light" | "dark";

function currentTheme(): Theme {
  const set = document.documentElement.dataset.theme;
  if (set === "light" || set === "dark") return set;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

// the app's collapsing header; ScrollEffects drives --p and data-collapsed
export function Header() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    setTheme(currentTheme());
    const dark = window.matchMedia("(prefers-color-scheme: dark)");
    const sync = () => setTheme(currentTheme());
    dark.addEventListener("change", sync);
    return () => dark.removeEventListener("change", sync);
  }, []);

  function toggle() {
    const next = currentTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("og-theme", next); } catch {}
    setTheme(next);
  }

  return (
    <header className="bar" id="bar">
      <a className="bar-brand" href="#top" aria-label="One Gallery, back to top">
        <img src="/assets/icon.svg" alt="" width={28} height={28} />
        <span>One Gallery</span>
      </a>
      <div className="bar-actions">
        <button className="icon-btn" type="button" onClick={toggle}
          aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}>
          <Icon name="sun" className="ic-sun" />
          <Icon name="moon" className="ic-moon" />
        </button>
        <a className="icon-btn" href="https://github.com/lochansaroy02/onegallery" aria-label="Source code on GitHub">
          <Icon name="github" />
        </a>
        <a className="btn btn-small" href="#install">Install</a>
      </div>
    </header>
  );
}
