"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useSpring, useTransform, useVelocity } from "motion/react";
import { Icon, type IconName } from "./Icon";
import { ScrollTrigger, useGSAP } from "@/lib/gsap";

const links: { href: string; target: string; icon: IconName; label: string }[] = [
  { href: "#top", target: "top", icon: "image", label: "Overview" },
  { href: "#timeline", target: "features", icon: "spark", label: "Features" },
  { href: "#private", target: "private", icon: "lock", label: "Private" },
  { href: "#install", target: "install", icon: "download", label: "Install" },
];

const SPRING = { stiffness: 320, damping: 32, mass: 0.9 };

// the app's floating pill navigation; a Liquid Glass droplet follows the section on screen,
// stretching as it travels and settling into place, like the iOS 26 tab bar
export function Pill() {
  const [nav, setNav] = useState("top");
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const locked = useRef(false);  // after a click, hold the tab you picked while the page scrolls there
  const settle = useRef<() => void>(() => {});
  const reduce = useReducedMotion();

  const x = useSpring(0, SPRING);
  const width = useSpring(0, SPRING);
  // stretch along the direction of travel and thin out a little, then relax as it slows down
  const speed = useVelocity(x);
  const scaleX = useSpring(useTransform(speed, [-2400, 0, 2400], [1.22, 1, 1.22]), { stiffness: 500, damping: 40 });
  const scaleY = useSpring(useTransform(speed, [-2400, 0, 2400], [0.86, 1, 0.86]), { stiffness: 500, damping: 40 });

  const placed = useRef(false);
  useEffect(() => {
    function place() {
      const i = links.findIndex((l) => l.target === nav);
      const a = linkRefs.current[i];
      if (!a) return;
      // the first placement and window resizes jump; changes of section glide
      if (!placed.current || reduce) {
        x.jump(a.offsetLeft);
        width.jump(a.offsetWidth);
        placed.current = true;
      } else {
        x.set(a.offsetLeft);
        width.set(a.offsetWidth);
      }
    }
    place();
    const onResize = () => { placed.current = false; place(); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [nav, reduce, x, width]);

  useGSAP(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-nav]"));
    let idle: ReturnType<typeof setTimeout> | undefined;
    const fromScroll = () => {
      const line = window.innerHeight * 0.45;
      let next = "top";
      for (const s of sections) if (s.getBoundingClientRect().top < line) next = s.dataset.nav!;
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) next = "install";
      return next;
    };
    // after a click, don't step through every section on the way; let go when the scroll ends,
    // or as soon as you scroll yourself
    const release = () => {
      clearTimeout(idle);
      if (!locked.current) return;
      locked.current = false;
      setNav(fromScroll());
    };
    settle.current = () => {
      clearTimeout(idle);
      idle = setTimeout(release, 400);  // for browsers without scrollend, and clicks that don't scroll
    };
    const onScroll = () => { if (locked.current) settle.current(); };
    const update = () => { if (!locked.current) setNav(fromScroll()); };
    ScrollTrigger.create({ start: 0, end: "max", onUpdate: update, onRefresh: update });
    update();

    const takeOver = ["wheel", "touchstart", "keydown"] as const;
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("scrollend", release);
    takeOver.forEach((e) => window.addEventListener(e, release, { passive: true }));
    return () => {
      clearTimeout(idle);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("scrollend", release);
      takeOver.forEach((e) => window.removeEventListener(e, release));
    };
  });

  function go(target: string) {
    locked.current = true;
    setNav(target);
    settle.current();
  }

  return (
    <nav className="pill" aria-label="Sections">
      <motion.span className="pill-indicator" aria-hidden="true" style={{ x, width, scaleX, scaleY }} />
      {links.map((l, i) => (
        <a key={l.target} ref={(el) => { linkRefs.current[i] = el; }} href={l.href}
          aria-current={l.target === nav ? "true" : undefined} onClick={() => go(l.target)}>
          <Icon name={l.icon} />
          <span>{l.label}</span>
        </a>
      ))}
    </nav>
  );
}
