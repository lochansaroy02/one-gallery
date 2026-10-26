"use client";

import { useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { motion } from "motion/react";
import { Segmented } from "./Segmented";
import { Swap, type SwapShot } from "./Swap";
import { Window } from "./Window";

export function Timeline() {
  const [cols, setCols] = useState<"cols-6" | "cols-9">("cols-6");
  return (
    <section className="feature" id="timeline" data-nav="features">
      <div className="feature-text">
        <h2>Every picture, in the order you took it.</h2>
        <p>One Gallery reads the folders you pick, including ones on other drives, and lays them out like the gallery
          on your phone: newest first, under day headers that stay in view as you scroll.</p>
        <ul className="ticks">
          <li>Today, Yesterday, then dates like “Fri, Oct 23”</li>
          <li>A fast-scroll handle that shows the month as you drag</li>
          <li>Videos sit among your pictures, with their length on the tile</li>
          <li>Thumbnails load in the background, so scrolling stays smooth</li>
        </ul>
        <Segmented label="Number of columns" value={cols} onChange={setCols} options={[
          { key: "cols-6", label: "6 columns" },
          { key: "cols-9", label: "9 columns" },
        ]} />
        <p className="hint">Ctrl + mouse wheel changes the column count, like pinching on your phone.</p>
      </div>
      <Window className="reveal">
        <Swap shown={cols} shots={[
          { key: "cols-6", name: "pictures-light", alt: "The Pictures tab in six columns: a large Pictures title with the number of pictures and videos, then the photos taken Today." },
          { key: "cols-9", name: "columns-9", alt: "The same timeline in nine columns, showing a whole month of pictures at once." },
        ]} />
      </Window>
    </section>
  );
}

const looks = [
  { key: "oneui", accent: "#3E91FF", swatch: "#3E91FF", name: "One UI", note: "Black and white, solid bar", alt: "One UI look: white background, blue highlight on the solid navigation bar." },
  { key: "green-frosted", accent: "#2E9E6B", swatch: "#2E9E6B", name: "Green", note: "Material You, frosted glass", alt: "Material You in green: soft green background, and a frosted glass navigation bar blurring the photos behind it." },
  { key: "pink-clear", accent: "#E0588A", swatch: "#E0588A", name: "Pink", note: "Material You, clear glass", alt: "Material You in pink, with a clear glass navigation bar the photos show through." },
  { key: "amber-dark", accent: "#F0912A", swatch: "#F0912A", name: "Amber", note: "Material You, dark", alt: "Material You in amber, dark mode: warm dark background and an amber highlight on a frosted glass bar." },
  { key: "dark-clear", accent: "#3E91FF", swatch: "#000", name: "Midnight", note: "Pure black, clear glass", alt: "Pure black dark mode with a clear glass navigation bar." },
];

// "Make it yours": swap the screenshot and recolour the page
export function Looks() {
  const [look, setLook] = useState(looks[0].key);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  function pick(i: number, focus: boolean) {
    setLook(looks[i].key);
    document.documentElement.style.setProperty("--accent", looks[i].accent);
    if (focus) refs.current[i]?.focus();
  }

  function onKeyDown(e: KeyboardEvent) {
    const i = looks.findIndex((l) => l.key === look);
    const d = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    pick((i + d + looks.length) % looks.length, true);
  }

  return (
    <section className="feature feature-flip" id="style" data-nav="features">
      <div className="feature-text">
        <h2>Black and white, or Material You.</h2>
        <p>Keep One UI&apos;s pure white and pure black, or let one colour tint the whole app the way Android 12 does.
          The navigation bar can be solid, or Liquid Glass that bends the photos behind it.</p>
        <div className="looks" role="radiogroup" aria-label="Try a look" onKeyDown={onKeyDown}>
          {looks.map((l, i) => {
            const on = l.key === look;
            return (
              <button key={l.key} ref={(el) => { refs.current[i] = el; }} type="button" role="radio"
                aria-checked={on} tabIndex={on ? 0 : -1} onClick={() => pick(i, false)}
                style={{ "--sw": l.swatch } as CSSProperties}>
                {on && (
                  <motion.span className="look-highlight" layoutId="look-highlight" aria-hidden="true"
                    transition={{ type: "spring", stiffness: 420, damping: 38 }} />
                )}
                <span className={l.key === "dark-clear" ? "sw sw-dark" : "sw"} />
                <span>{l.name}<small>{l.note}</small></span>
              </button>
            );
          })}
        </div>
        <p className="hint">By default the accent follows your accent colour, and changes when you change it.</p>
      </div>
      <Window className="reveal">
        <Swap shown={look} shots={looks.map((l): SwapShot => ({ key: l.key, name: `look-${l.key}`, alt: l.alt }))} />
      </Window>
    </section>
  );
}

export function Viewer() {
  const [screen, setScreen] = useState<"viewer" | "details" | "filters" | "adjust">("viewer");
  return (
    <section className="feature" id="viewer" data-nav="features">
      <div className="feature-text">
        <h2>Look closer, then make it better.</h2>
        <p>Pictures open full screen on black. Swipe or use the arrow keys, pinch or scroll to zoom, and open Details
          for the date, size and path.</p>
        <p>The editor crops, rotates and straightens, has 9 filters and 10 adjustments, and lets you hold to compare
          with the original. Save over the picture or as a copy, and revert to the original later.</p>
        <Segmented label="Viewer screens" value={screen} onChange={setScreen} options={[
          { key: "viewer", label: "Viewer" },
          { key: "details", label: "Details" },
          { key: "filters", label: "Filters" },
          { key: "adjust", label: "Adjust" },
        ]} />
      </div>
      <Window dark className="reveal">
        <Swap shown={screen} shots={[
          { key: "viewer", name: "viewer", alt: "A mountain photo open full screen on black, with the date at the top and Favorite, Edit, Share, Delete and Details buttons below." },
          { key: "details", name: "viewer-details", alt: "The Details panel over the photo: date taken, file name, resolution, size and path, with Show in folder and Copy path buttons." },
          { key: "filters", name: "editor-filters", alt: "The editor's Filters tab: a strip of filter previews with Vintage selected and a strength slider." },
          { key: "adjust", name: "editor-adjust", alt: "The editor's Adjust tab with Warmth set to +35, and Brightness, Exposure, Contrast, Highlights, Shadows, Saturation, Tint and Sharpness alongside." },
        ]} />
      </Window>
    </section>
  );
}

export function Collections() {
  const [screen, setScreen] = useState<"collections" | "story" | "places">("collections");
  return (
    <section className="feature feature-flip" id="collections" data-nav="features">
      <div className="feature-text">
        <h2>Stories, places and people.</h2>
        <p><strong>Stories</strong> are slideshows of the pictures you took around today&apos;s date, one, two or more
          years ago. <strong>Places</strong> groups pictures by town and country from their GPS.{" "}
          <strong>People</strong> groups faces.</p>
        <p>All of it runs on your computer. Nothing is uploaded.</p>
        <Segmented label="Collections screens" value={screen} onChange={setScreen} options={[
          { key: "collections", label: "Collections" },
          { key: "story", label: "Story" },
          { key: "places", label: "Places" },
        ]} />
      </div>
      <Window className="reveal">
        <Swap shown={screen} shots={[
          { key: "collections", name: "collections", alt: "The Collections tab with two stories, 1 year ago and 3 years ago, and a People section below." },
          { key: "story", name: "story", alt: "A story playing full screen, titled 1 year ago, with progress bars at the top." },
          { key: "places", name: "places", alt: "The Places page listing towns grouped by country: Innsbruck in Austria, Reykjavik in Iceland, Kyoto in Japan, and more." },
        ]} />
      </Window>
    </section>
  );
}
