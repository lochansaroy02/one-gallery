import { Icon, type IconName } from "./Icon";
import { Window } from "./Window";
import { shotSrc, shotSrcSet } from "@/lib/shots";

const privateSizes = "(min-width: 980px) 560px, 94vw";

// always dark, like the app's viewer
export function Private() {
  return (
    <section className="private" id="private" data-nav="private">
      <div className="private-inner">
        <div className="private-text">
          <Icon name="lock" className="private-lock" />
          <h2>A private album that only opens with your password.</h2>
          <p>Pictures and videos you move in are encrypted and disappear from their folders and from the rest of One
            Gallery. Lock it again, and nothing private is left on screen.</p>
        </div>
        <div className="private-shots">
          <Window dark className="reveal">
            <img src={shotSrc("private-unlock")} srcSet={shotSrcSet("private-unlock")} sizes={privateSizes}
              width={1920} height={1200} loading="lazy"
              alt="The Private album dialog asking for the password, over the dimmed Albums tab." />
          </Window>
          <Window dark className="reveal private-front">
            <img src={shotSrc("private-grid")} srcSet={shotSrcSet("private-grid")} sizes={privateSizes}
              width={1920} height={1200} loading="lazy" alt="The unlocked Private album showing its 8 pictures." />
          </Window>
        </div>
      </div>
    </section>
  );
}

const more: { icon: IconName; title: string; text: string }[] = [
  { icon: "film", title: "Videos", text: "Play straight away, muted, in the viewer. Play video opens the built-in player with sound." },
  { icon: "album", title: "Albums", text: "One album per folder or sub-folder, plus Favorites and Videos." },
  { icon: "select", title: "Selection", text: "Right-click or long-press to select, or tick a day header to select the whole day." },
  { icon: "share", title: "Share like Dolphin", text: "KDE Connect, Bluetooth, e-mail, Telegram, Nextcloud and the rest of KDE's Share menu." },
  { icon: "search", title: "Search", text: "By file name, folder or date: “2025”, “October”, “oct 2024”." },
  { icon: "open", title: "Your image viewer", text: "Open pictures from Dolphin, Explorer or Finder. Their folders aren't added to your library." },
  { icon: "wand", title: "Set as wallpaper", text: "Wallpaper, lock screen or both, and print or save as PDF with a live preview." },
  { icon: "drive", title: "Other drives", text: "Folders on unplugged drives are kept and marked unavailable, not removed." },
  { icon: "menu", title: "KDE global menu", text: "A full File, Edit, View, Go menu in Plasma's global menu, and native file dialogs." },
  { icon: "shield", title: "Safe with your files", text: "Removing a folder never deletes files. Delete moves pictures to the trash." },
];

export function More() {
  return (
    <section className="more" id="more" data-nav="features">
      <h2>And the rest of what a gallery should do.</h2>
      <ul className="more-list">
        {more.map((m) => (
          <li key={m.title}>
            <Icon name={m.icon} />
            <div>
              <h3>{m.title}</h3>
              <p>{m.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-brand">
        <img src="/assets/icon.svg" alt="" width={36} height={36} />
        <div><strong>One Gallery</strong><span>Built with Python, Qt Quick (PySide6) and SQLite.</span></div>
      </div>
      <nav className="footer-links" aria-label="Project links">
        <a href="https://github.com/lochansaroy02/onegallery">Source code</a>
        <a href="https://github.com/lochansaroy02/onegallery/releases">Releases</a>
        <a href="https://github.com/lochansaroy02/onegallery/issues">Report a problem</a>
        <a href="https://github.com/lochansaroy02/onegallery/blob/main/LICENSE">MIT licence</a>
      </nav>
      <p className="footer-small">© 2026 lochansaroy02. Screenshots show the real app with generated sample pictures.</p>
    </footer>
  );
}
