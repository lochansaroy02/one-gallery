"use client";

import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

const EASE = "expo.out";

// everything driven by scroll or by the first load: GSAP + ScrollTrigger
export function ScrollEffects() {
  useGSAP(() => {
    const root = document.documentElement;
    const bar = document.getElementById("bar")!;

    // the app's collapsing header: the big title shrinks into the bar over the first 240px
    const setProgress = (p: number) => {
      root.style.setProperty("--p", p.toFixed(3));
      bar.toggleAttribute("data-collapsed", p > 0.6);
    };
    const header = ScrollTrigger.create({ start: 0, end: 240, onUpdate: (self) => setProgress(self.progress) });
    setProgress(header.progress);

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // first load: one orchestrated moment
      gsap.timeline({ defaults: { ease: EASE, duration: 0.9 } })
        .fromTo(".big-title", { autoAlpha: 0, filter: "blur(8px)", letterSpacing: "-0.02em" },
          { autoAlpha: 1, filter: "blur(0px)", letterSpacing: "-0.045em", duration: 1.2, clearProps: "filter,letterSpacing" })
        .fromTo(".hero-count", { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0 }, 0.08)
        .fromTo([".hero-lede", ".hero-install", ".hero-meta"], { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, stagger: 0.08 }, 0.14)
        .fromTo(".hero-window", { autoAlpha: 0, y: 60, scale: 0.94 }, { autoAlpha: 1, y: 0, scale: 1, duration: 1.3 }, 0.36);

      // the hero window starts tipped back and lies flat as you scroll
      gsap.set(".hero-stage", { transformPerspective: 1600, transformOrigin: "50% 0%" });
      gsap.fromTo(".hero-stage", { rotateX: 12, scale: 0.96 }, {
        rotateX: 0, scale: 1, ease: "none",
        scrollTrigger: { trigger: ".hero-stage", start: "top bottom", end: "top 15%", scrub: 0.6 },
      });

      // screenshots settle in as they reach the viewport
      gsap.set(".reveal", { autoAlpha: 0, y: 40, scale: 0.97 });
      ScrollTrigger.batch(".reveal", {
        start: "top 88%", once: true,
        onEnter: (els) => gsap.to(els, { autoAlpha: 1, y: 0, scale: 1, duration: 1.1, ease: EASE, stagger: 0.16 }),
      });

      // headings and text follow, line by line
      gsap.utils.toArray<HTMLElement>(".feature-text, .private-text").forEach((el) => {
        gsap.from(el.children, {
          autoAlpha: 0, y: 24, duration: 0.9, ease: EASE, stagger: 0.07,
          scrollTrigger: { trigger: el, start: "top 82%", once: true },
        });
      });
      gsap.utils.toArray<HTMLElement>(".more h2, .strip-section h2, .install h2, .faq h2").forEach((el) => {
        gsap.from(el, { autoAlpha: 0, y: 24, duration: 0.9, ease: EASE, scrollTrigger: { trigger: el, start: "top 88%", once: true } });
      });
      gsap.set(".more-list li", { autoAlpha: 0, y: 24 });
      ScrollTrigger.batch(".more-list li", {
        start: "top 90%", once: true,
        onEnter: (els) => gsap.to(els, { autoAlpha: 1, y: 0, duration: 0.8, ease: EASE, stagger: 0.06 }),
      });

      // the unlocked album drifts over the password dialog
      gsap.fromTo(".private-front", { yPercent: 14 }, {
        yPercent: -6, ease: "none",
        scrollTrigger: { trigger: ".private", start: "top bottom", end: "bottom top", scrub: true },
      });
    });

    // the intro has set its starting state, so the page can show (see .intro in globals.css)
    root.classList.add("intro-ready");
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
  });

  return null;
}
