"use client";

import { useId, useRef, type KeyboardEvent, type ReactNode } from "react";
import { motion } from "motion/react";

export type SegmentedOption<K extends string> = {
  key: K;
  label: ReactNode;
  id?: string;        // tab id, when the tab controls a panel
  controls?: string;  // id of that panel
};

// One UI segmented control (like Settings > Theme); the thumb slides with a shared layout animation
export function Segmented<K extends string>({ label, options, value, onChange, wide }: {
  label: string;
  options: SegmentedOption<K>[];
  value: K;
  onChange: (key: K) => void;
  wide?: boolean;
}) {
  const thumbId = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(e: KeyboardEvent) {
    const i = options.findIndex((o) => o.key === value);
    let next = -1;
    if (e.key === "ArrowRight") next = (i + 1) % options.length;
    else if (e.key === "ArrowLeft") next = (i - 1 + options.length) % options.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = options.length - 1;
    if (next < 0) return;
    e.preventDefault();
    onChange(options[next].key);
    refs.current[next]?.focus();
  }

  return (
    <div className={wide ? "segmented segmented-wide" : "segmented"} role="tablist" aria-label={label}
      onKeyDown={onKeyDown}>
      {options.map((o, i) => {
        const on = o.key === value;
        return (
          <button key={o.key} ref={(el) => { refs.current[i] = el; }} type="button" role="tab" id={o.id}
            aria-controls={o.controls} aria-selected={on} tabIndex={on ? 0 : -1} onClick={() => onChange(o.key)}>
            {on && (
              <motion.span className="seg-thumb" layoutId={thumbId} aria-hidden="true"
                transition={{ type: "spring", stiffness: 420, damping: 36 }} />
            )}
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
