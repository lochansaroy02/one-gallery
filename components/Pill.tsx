"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Icon, type IconName } from "./Icon";
import { ScrollTrigger, useGSAP } from "@/lib/gsap";

const links: { href: string; target: string; icon: IconName; label: string }[] = [
  { href: "#top", target: "top", icon: "image", label: "Overview" },
  { href: "#timeline", target: "features", icon: "spark", label: "Features" },
  { href: "#private", target: "private", icon: "lock", label: "Private" },
  { href: "#install", target: "install", icon: "download", label: "Install" },
];

// the app's floating pill navigation; the glass indicator follows the section on screen
export function Pill() {
  const [nav, setNav] = useState("top");

  useGSAP(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-nav]"));
    const update = () => {
      const line = window.innerHeight * 0.45;
      let next = "top";
      for (const s of sections) if (s.getBoundingClientRect().top < line) next = s.dataset.nav!;
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) next = "install";
      setNav(next);
    };
    ScrollTrigger.create({ start: 0, end: "max", onUpdate: update, onRefresh: update });
    update();
  });

  return (
    <nav className="pill" aria-label="Sections">
      {links.map((l) => {
        const on = l.target === nav;
        return (
          <a key={l.target} href={l.href} aria-current={on ? "true" : undefined}>
            {on && (
              <motion.span className="pill-indicator" layoutId="pill-indicator" aria-hidden="true"
                transition={{ type: "spring", stiffness: 380, damping: 26 }} />
            )}
            <Icon name={l.icon} />
            <span>{l.label}</span>
          </a>
        );
      })}
    </nav>
  );
}
