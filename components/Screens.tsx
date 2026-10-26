"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { animate, AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Icon } from "./Icon";
import { shotSrc } from "@/lib/shots";

const shots = [
  { name: "albums", caption: "Albums, one per folder.", alt: "The Albums tab: cover cards for Videos, Private album, Camera, Lisbon, Alps and more." },
  { name: "videos", caption: "The Videos tab lists only videos.", alt: "The Videos tab with video tiles showing their length." },
  { name: "selection", caption: "Select pictures, then share, favourite, move to the private album or delete.", alt: "Selection mode with 3 selected and an action bar: Share, Favorite, Private, Open with, Copy path, Show, Delete." },
  { name: "search", caption: "Search for Lisbon finds the trip folder.", alt: "Search results for Lisbon, grouped by day." },
  { name: "albums-dark", caption: "Albums in dark mode.", alt: "The Albums tab in dark mode." },
  { name: "viewer-dark", caption: "The viewer, on black.", alt: "A photo open in the viewer." },
  { name: "settings", caption: "Settings, one tap away in the navigation bar.", alt: "The Settings tab: theme, colour style, navigation bar style, accent colour and grid columns." },
  { name: "private-grid-light", caption: "The private album, unlocked, in light mode.", alt: "The unlocked private album in light mode." },
];

const EASE = [0.2, 0.8, 0.2, 1] as const;

// the transform that puts `el` exactly over `rect` (transform-origin is the top-left corner)
function over(rect: DOMRect, el: HTMLElement) {
  const to = el.getBoundingClientRect();
  return { x: rect.left - to.left, y: rect.top - to.top, scaleX: rect.width / to.width, scaleY: rect.height / to.height };
}

// the lightbox grows out of the thumbnail and shrinks back into it, like opening a picture in the app
function Lightbox({ index, thumbs, onNav, onClosed }: {
  index: number;
  thumbs: (HTMLButtonElement | null)[];
  onNav: (step: number) => void;
  onClosed: () => void;
}) {
  const box = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLImageElement | null>(null);
  const closing = useRef(false);
  const reduce = useReducedMotion();
  const shot = shots[index];

  useLayoutEffect(() => {
    document.body.style.overflow = "hidden";
    const el = img.current!;
    const chrome = box.current!.querySelectorAll(".lb-chrome");
    box.current!.querySelector<HTMLButtonElement>(".lb-close")!.focus({ preventScroll: true });
    animate(box.current!, { backgroundColor: ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.94)"] },
      { duration: reduce ? 0 : 0.35, ease: EASE });
    animate(chrome, { opacity: [0, 1] }, { duration: reduce ? 0 : 0.3, delay: reduce ? 0 : 0.15 });
    const thumb = thumbs[index]?.querySelector("img");
    if (!reduce && thumb) {
      const from = thumb.getBoundingClientRect();
      el.style.opacity = "0";
      const go = () => {
        const f = over(from, el);
        el.style.opacity = "";
        animate(el, { x: [f.x, 0], y: [f.y, 0], scaleX: [f.scaleX, 1], scaleY: [f.scaleY, 1] },
          { duration: 0.48, ease: EASE });
      };
      el.decode().then(go, go);
    }
    return () => { document.body.style.overflow = ""; };
  }, []);  // plays once, when the lightbox opens

  function close() {
    if (closing.current) return;
    closing.current = true;
    const thumbBtn = thumbs[index];
    thumbBtn?.scrollIntoView({ block: "nearest", inline: "nearest" });
    const el = img.current!;
    const thumb = thumbBtn?.querySelector("img");
    const d = reduce ? 0 : 1;
    const done = [
      animate(box.current!, { backgroundColor: "rgba(0, 0, 0, 0)" }, { duration: 0.38 * d, ease: EASE }),
      animate(box.current!.querySelectorAll(".lb-chrome"), { opacity: 0 }, { duration: 0.2 * d }),
      thumb && !reduce
        ? animate(el, over(thumb.getBoundingClientRect(), el), { duration: 0.38, ease: EASE })
        : animate(el, { opacity: 0 }, { duration: 0.2 * d }),
    ];
    Promise.all(done).then(onClosed);
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") { e.preventDefault(); close(); }
      else if (e.key === "ArrowLeft") onNav(-1);
      else if (e.key === "ArrowRight") onNav(1);
      else if (e.key === "Tab") {  // keep focus inside the dialog
        const f = Array.from(box.current!.querySelectorAll("button"));
        const at = f.indexOf(document.activeElement as HTMLButtonElement);
        e.preventDefault();
        f[(at + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  });

  return (
    <div ref={box} className="lightbox" role="dialog" aria-modal="true" aria-label="Screenshot"
      onClick={(e) => { if (e.target === e.currentTarget) close(); }}>
      <button className="icon-btn lb-chrome lb-close" type="button" aria-label="Close" onClick={close}>
        <Icon name="x" />
      </button>
      <button className="icon-btn lb-chrome lb-prev" type="button" aria-label="Previous screenshot"
        onClick={() => onNav(-1)}>
        <Icon name="left" />
      </button>
      <figure>
        {/* browsing cross-fades; only the first picture flies in from its thumbnail */}
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.img key={shot.name} ref={(el) => { if (el) img.current = el; }} src={shotSrc(shot.name)}
            width={1920} height={1200} alt={shot.alt}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} />
        </AnimatePresence>
        <figcaption className="lb-chrome">{shot.caption}</figcaption>
      </figure>
      <button className="icon-btn lb-chrome lb-next" type="button" aria-label="Next screenshot"
        onClick={() => onNav(1)}>
        <Icon name="right" />
      </button>
    </div>
  );
}

export function Screens() {
  const [open, setOpen] = useState<number | null>(null);
  const strip = useRef<HTMLDivElement>(null);
  const thumbs = useRef<(HTMLButtonElement | null)[]>([]);
  const reduce = useReducedMotion();

  function scrollStrip(dir: number) {
    const step = thumbs.current[0]!.offsetWidth + 18;
    strip.current!.scrollBy({ left: step * dir, behavior: reduce ? "auto" : "smooth" });
  }

  function onClosed() {
    thumbs.current[open!]?.focus({ preventScroll: true });
    setOpen(null);
  }

  return (
    <section className="strip-section" id="screens" data-nav="features" aria-labelledby="screens-title">
      <h2 id="screens-title">More screens</h2>
      <div className="strip" ref={strip}>
        {shots.map((s, i) => (
          <button key={s.name} ref={(el) => { thumbs.current[i] = el; }} className="shot" type="button"
            aria-label={`Open screenshot: ${s.caption}`} onClick={() => setOpen(i)}>
            <img src={shotSrc(s.name, 960)} width={960} height={600} loading="lazy" alt={s.alt} />
          </button>
        ))}
      </div>
      <div className="strip-nav">
        <button className="icon-btn" type="button" aria-label="Scroll screenshots left" onClick={() => scrollStrip(-1)}>
          <Icon name="left" />
        </button>
        <button className="icon-btn" type="button" aria-label="Scroll screenshots right" onClick={() => scrollStrip(1)}>
          <Icon name="right" />
        </button>
      </div>
      {open !== null && (
        <Lightbox index={open} thumbs={thumbs.current} onClosed={onClosed}
          onNav={(step) => setOpen((i) => (i! + step + shots.length) % shots.length)} />
      )}
    </section>
  );
}
