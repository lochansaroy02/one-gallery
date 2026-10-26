export type IconName =
  | "image" | "spark" | "lock" | "download" | "sun" | "moon" | "github" | "copy" | "check" | "left" | "right"
  | "x" | "film" | "album" | "select" | "share" | "search" | "open" | "drive" | "menu" | "keys" | "shield"
  | "pin" | "wand" | "plasma" | "windows" | "mac";

export function Icon({ name, className }: { name: IconName; className?: string }) {
  return (
    <svg className={className ? `ic ${className}` : "ic"} aria-hidden="true">
      <use href={`#i-${name}`} />
    </svg>
  );
}

// every icon once, referenced with <use href="#i-…">
export function IconSprite() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <defs>
        <symbol id="i-image" viewBox="0 0 24 24">
          <rect x="3" y="3" width="18" height="18" rx="4" />
          <circle cx="9" cy="9" r="2" />
          <path d="m21 15-4.5-4.5L6 21" />
        </symbol>
        <symbol id="i-spark" viewBox="0 0 24 24">
          <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />
          <path d="M19 15l.7 1.8 1.8.7-1.8.7L19 20l-.7-1.8-1.8-.7 1.8-.7z" />
        </symbol>
        <symbol id="i-lock" viewBox="0 0 24 24">
          <rect x="4" y="11" width="16" height="10" rx="3" />
          <path d="M8 11V8a4 4 0 0 1 8 0v3" />
        </symbol>
        <symbol id="i-download" viewBox="0 0 24 24">
          <path d="M12 4v11m0 0-4.5-4.5M12 15l4.5-4.5" />
          <path d="M5 19h14" />
        </symbol>
        <symbol id="i-sun" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2.5v2M12 19.5v2M4.6 4.6 6 6M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4" />
        </symbol>
        <symbol id="i-moon" viewBox="0 0 24 24">
          <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />
        </symbol>
        <symbol id="i-github" viewBox="0 0 24 24">
          <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
        </symbol>
        <symbol id="i-copy" viewBox="0 0 24 24">
          <rect x="8" y="8" width="13" height="13" rx="3" />
          <path d="M16 8V6a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h2" />
        </symbol>
        <symbol id="i-check" viewBox="0 0 24 24">
          <path d="m5 12.5 4.5 4.5L19 7.5" />
        </symbol>
        <symbol id="i-left" viewBox="0 0 24 24">
          <path d="m15 5-7 7 7 7" />
        </symbol>
        <symbol id="i-right" viewBox="0 0 24 24">
          <path d="m9 5 7 7-7 7" />
        </symbol>
        <symbol id="i-x" viewBox="0 0 24 24">
          <path d="M6 6l12 12M18 6 6 18" />
        </symbol>
        <symbol id="i-film" viewBox="0 0 24 24">
          <rect x="3" y="5" width="14" height="14" rx="3" />
          <path d="m17 10 4-2.5v9L17 14" />
        </symbol>
        <symbol id="i-album" viewBox="0 0 24 24">
          <rect x="3" y="7" width="18" height="14" rx="3" />
          <path d="M6 4h12" />
        </symbol>
        <symbol id="i-select" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9" />
          <path d="m8 12.5 3 3 5-6" />
        </symbol>
        <symbol id="i-share" viewBox="0 0 24 24">
          <circle cx="18" cy="5" r="2.5" />
          <circle cx="6" cy="12" r="2.5" />
          <circle cx="18" cy="19" r="2.5" />
          <path d="m8.2 10.8 7.6-4.5M8.2 13.2l7.6 4.5" />
        </symbol>
        <symbol id="i-search" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </symbol>
        <symbol id="i-open" viewBox="0 0 24 24">
          <path d="M14 4h6v6M20 4l-9 9" />
          <path d="M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4" />
        </symbol>
        <symbol id="i-drive" viewBox="0 0 24 24">
          <rect x="3" y="13" width="18" height="7" rx="2.5" />
          <path d="M5 13 7.5 5h9L19 13" />
          <path d="M7 16.5h.01M10 16.5h.01" />
        </symbol>
        <symbol id="i-menu" viewBox="0 0 24 24">
          <rect x="3" y="4" width="18" height="16" rx="3" />
          <path d="M3 9h18M7 6.5h.01M10 6.5h.01" />
        </symbol>
        <symbol id="i-keys" viewBox="0 0 24 24">
          <rect x="2.5" y="6" width="19" height="12" rx="3" />
          <path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M8 14h8" />
        </symbol>
        <symbol id="i-shield" viewBox="0 0 24 24">
          <path d="M12 3 5 6v5c0 4.5 3 8.3 7 10 4-1.7 7-5.5 7-10V6z" />
          <path d="m9 12 2 2 4-4" />
        </symbol>
        <symbol id="i-pin" viewBox="0 0 24 24">
          <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z" />
          <circle cx="12" cy="10" r="2.3" />
        </symbol>
        <symbol id="i-wand" viewBox="0 0 24 24">
          <path d="m4 20 11-11M14 4v2M19 9h2M17.5 5.5 19 4M17.5 12.5 19 14M10.5 5.5 9 4" />
        </symbol>
        <symbol id="i-plasma" viewBox="0 0 24 24">
          <circle cx="8" cy="8" r="3" />
          <circle cx="17" cy="9" r="1.8" />
          <circle cx="10" cy="17" r="1.8" />
          <circle cx="17" cy="17" r="3" />
        </symbol>
        <symbol id="i-windows" viewBox="0 0 24 24">
          <path d="M3 5.5 10.5 4.5v7H3zM12.5 4.2 21 3v8.5h-8.5zM3 12.5h7.5v7L3 18.5zM12.5 12.5H21V21l-8.5-1.2z" />
        </symbol>
        <symbol id="i-mac" viewBox="0 0 24 24">
          <rect x="4" y="5" width="16" height="11" rx="2" />
          <path d="M2 19h20" />
        </symbol>
      </defs>
    </svg>
  );
}
