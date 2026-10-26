"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { motion } from "motion/react";
import { CodeBlock } from "./CodeBlock";
import { Icon } from "./Icon";
import { Segmented } from "./Segmented";

type Tab = "linux" | "windows" | "mac";

const InstallTab = createContext<{ tab: Tab; setTab: (tab: Tab) => void } | null>(null);

export function InstallTabProvider({ children }: { children: ReactNode }) {
  const [tab, setTab] = useState<Tab>("linux");
  return <InstallTab.Provider value={{ tab, setTab }}>{children}</InstallTab.Provider>;
}

function useInstallTab() {
  const ctx = useContext(InstallTab);
  if (!ctx) throw new Error("useInstallTab needs an InstallTabProvider");
  return ctx;
}

// "Install on Linux" / "Download for Mac" in the hero open their tab
export function InstallLink({ tab, className, children }: { tab: Tab; className?: string; children: ReactNode }) {
  const { setTab } = useInstallTab();
  return <a className={className} href="#install" onClick={() => setTab(tab)}>{children}</a>;
}

// all panels stay in the page; the chosen one rises in
function Panel({ id, tab, children }: { id: Tab; tab: Tab; children: ReactNode }) {
  const on = id === tab;
  return (
    <motion.div className="panel" role="tabpanel" id={`panel-${id}`} aria-labelledby={`tab-${id}`} hidden={!on}
      initial={false} animate={on ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
      transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}>
      {children}
    </motion.div>
  );
}

export function Install() {
  const { tab, setTab } = useInstallTab();

  return (
    <section className="install" id="install" data-nav="install">
      <h2>Install One Gallery</h2>
      <Segmented wide label="Your system" value={tab} onChange={setTab} options={[
        { key: "linux", id: "tab-linux", controls: "panel-linux", label: <><Icon name="plasma" />Arch / Manjaro</> },
        { key: "windows", id: "tab-windows", controls: "panel-windows", label: <><Icon name="windows" />Windows</> },
        { key: "mac", id: "tab-mac", controls: "panel-mac", label: <><Icon name="mac" />macOS</> },
      ]} />

      <Panel id="linux" tab={tab}>
        <ol className="steps">
          <li>
            <h3>Get the code</h3>
            <CodeBlock label="Copy commands"
              code={"git clone https://github.com/lochansaroy02/onegallery.git\ncd onegallery"} />
          </li>
          <li>
            <h3>Install it as an app</h3>
            <p>Installs the system packages with pacman, sets up the app and adds it to the launcher. No root needed
              for the app itself.</p>
            <CodeBlock code="./update.sh --install" />
          </li>
          <li>
            <h3>Open it</h3>
            <p>Search for One Gallery in the application launcher, or run <code>onegallery</code>. Click Add folder
              and pick your Pictures folder.</p>
          </li>
        </ol>
        <div className="aside">
          <p><strong>Updating:</strong> run <code>./update.sh</code> in the same folder. Your library, favorites and
            settings are never touched.</p>
          <p><strong>Optional extras</strong> for HEIC photos, People, live updates and the KDE share menu:</p>
          <CodeBlock code="sudo pacman -S python-pillow-heif python-opencv python-watchdog purpose" />
        </div>
      </Panel>

      <Panel id="windows" tab={tab}>
        <div className="win-download">
          <a className="btn" href="https://github.com/lochansaroy02/onegallery/releases/latest">
            <Icon name="download" />Download the installer
          </a>
          <p>For Windows 10 (version 1809 or newer) and Windows 11, 64-bit. No admin rights needed.</p>
        </div>
        <ul className="ticks">
          <li>Adds One Gallery to the Start menu, and to Open with for pictures and videos.</li>
          <li>Pick it in Settings › Apps › Default apps to open pictures from Explorer.</li>
          <li>The installer isn&apos;t code-signed yet, so SmartScreen may warn the first time. Choose More info, then
            Run anyway.</li>
          <li>Uninstall from Settings › Apps.</li>
        </ul>
      </Panel>

      <Panel id="mac" tab={tab}>
        <ol className="steps">
          <li>
            <h3>Download the disk image</h3>
            <a className="btn"
              href="https://github.com/lochansaroy02/onegallery/releases/download/v0.3.0/OneGallery-0.3.0-macos-arm64.dmg">
              <Icon name="download" />Download for Mac
            </a>
            <p className="hint">OneGallery-0.3.0-macos-arm64.dmg, 213 MB. For Apple Silicon Macs (M1 and later) on
              macOS 13 Ventura or newer. All files are on the <a
                href="https://github.com/lochansaroy02/onegallery/releases">Releases page</a>.</p>
            <p className="hint">On an Intel Mac? <a
              href="https://github.com/lochansaroy02/onegallery#building-the-mac-app">Build it from source</a>.</p>
          </li>
          <li>
            <h3>Drag it to Applications</h3>
            <p>Open the .dmg and drag One Gallery onto the Applications folder.</p>
          </li>
          <li>
            <h3>Open it</h3>
            <p>Eject the disk image, then open One Gallery from Applications or Launchpad.</p>
          </li>
          <li>
            <h3>Allow it the first time</h3>
            <p>The app isn&apos;t signed with an Apple Developer ID yet, so macOS says it can&apos;t check it for
              malware. Click Done (not Move to Trash), then:</p>
            <p><strong>macOS 15 Sequoia and newer:</strong> System Settings › Privacy &amp; Security, scroll to
              &quot;One Gallery&quot; was blocked, click Open Anyway and confirm with your password.</p>
            <p><strong>macOS 13 and 14:</strong> in Finder, right-click (Control-click) One Gallery in Applications,
              choose Open, then Open.</p>
            <p><strong>Or in Terminal:</strong></p>
            <CodeBlock code={'xattr -dr com.apple.quarantine "/Applications/One Gallery.app"'} />
          </li>
          <li>
            <h3>Optional: video thumbnails</h3>
            <p>Install ffmpeg with Homebrew and One Gallery finds it by itself. Videos play without it.</p>
            <CodeBlock code="brew install ffmpeg" />
          </li>
        </ol>
        <div className="aside">
          <p><strong>Good to know</strong></p>
          <ul className="ticks">
            <li>To open pictures from Finder in One Gallery: Settings › Default image viewer › Set as default.</li>
            <li>Uninstall by dragging the app to the Trash. Settings and the index stay in{" "}
              <code>~/Library/Application Support/One Gallery</code> and <code>~/Library/Caches/One Gallery</code>;
              delete those folders to remove everything.</li>
          </ul>
        </div>
      </Panel>
    </section>
  );
}
