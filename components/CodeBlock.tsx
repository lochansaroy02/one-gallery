"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Icon } from "./Icon";

function copyText(text: string): Promise<void> {
  if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
  return new Promise((resolve, reject) => {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try { ok = document.execCommand("copy"); } catch {}
    document.body.removeChild(ta);
    if (ok) resolve(); else reject();
  });
}

// a dark command box with a Copy button
export function CodeBlock({ code, label = "Copy command" }: { code: string; label?: string }) {
  const [state, setState] = useState<"idle" | "done" | "failed">("idle");
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  function copy() {
    copyText(code).then(() => {
      setState("done");
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setState("idle"), 1800);
    }, () => setState("failed"));
  }

  const done = state === "done";
  return (
    <div className="code">
      <pre><code>{code}</code></pre>
      <button className={done ? "copy done" : "copy"} type="button" aria-label={label} onClick={copy}>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span key={done ? "check" : "copy"} className="copy-icon"
            initial={{ scale: 0.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.4, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}>
            <Icon name={done ? "check" : "copy"} />
          </motion.span>
        </AnimatePresence>
        <span>{done ? "Copied" : state === "failed" ? "Select and copy" : "Copy"}</span>
      </button>
    </div>
  );
}
