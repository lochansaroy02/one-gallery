"use client";

import { useId, useState, type ReactNode } from "react";
import { motion } from "motion/react";

function Question({ q, children }: { q: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div className="faq-item">
      <h3>
        <button type="button" className="faq-q" aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)}>
          {q}
        </button>
      </h3>
      <motion.div id={id} className="faq-a" role="region" aria-hidden={!open} inert={!open} initial={false}
        animate={open ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}>
        <p>{children}</p>
      </motion.div>
    </div>
  );
}

export function Faq() {
  return (
    <section className="faq" id="faq" data-nav="install">
      <h2>Questions</h2>
      <Question q="Does it move or change my files?">
        No. One Gallery only reads the folders you choose and keeps its own index. Removing a folder removes it from
        the index, never from disk. The one exception is the private album: pictures you move into it are encrypted
        and leave their folder, on purpose.
      </Question>
      <Question q="Where does it keep its data?">
        On Linux: settings in <code>~/.config/onegallery</code>, the index, favorites and private album in{" "}
        <code>~/.local/share/onegallery</code>, and thumbnails in <code>~/.cache/onegallery</code>. On Windows:{" "}
        <code>%APPDATA%\OneGallery</code> and <code>%LOCALAPPDATA%\OneGallery</code>. On macOS:{" "}
        <code>~/Library/Application Support/One Gallery</code> and <code>~/Library/Caches/One Gallery</code>.
      </Question>
      <Question q="Is anything uploaded?">
        No. The index, thumbnails, face grouping and private album all stay on your computer. There&apos;s no account.
        The only downloads are optional: face models for People, and a list of town names for Places.
      </Question>
      <Question q="I used LGallery. What happens to my library?">
        One Gallery is the new name. The first time it starts, it moves your settings, library, favorites and private
        album over by itself.
      </Question>
      <Question q="Is it free?">
        Yes. It&apos;s open source under the MIT licence.
      </Question>
    </section>
  );
}
