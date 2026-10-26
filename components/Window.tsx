import type { ReactNode } from "react";

// a macOS window around each screenshot: traffic lights on the left, the title in the middle
export function Window({ dark, className, children }: { dark?: boolean; className?: string; children: ReactNode }) {
  return (
    <figure className={["window", dark && "window-dark", className].filter(Boolean).join(" ")}>
      <div className="window-bar" aria-hidden="true">
        <span className="lights">
          <i className="light light-close">
            <svg viewBox="0 0 12 12"><path d="M4 4l4 4M8 4 4 8" /></svg>
          </i>
          <i className="light light-min">
            <svg viewBox="0 0 12 12"><path d="M3.5 6h5" /></svg>
          </i>
          <i className="light light-max">
            <svg viewBox="0 0 12 12"><path d="M4.5 3.5h4v4zM7.5 8.5h-4v-4z" /></svg>
          </i>
        </span>
        <span>One Gallery</span>
      </div>
      {children}
    </figure>
  );
}
