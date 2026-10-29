"use client";

import { CodeBlock } from "./CodeBlock";
import { Icon, type IconName } from "./Icon";
import { Segmented } from "./Segmented";
import { useInstallOs, type Os } from "@/lib/installOs";

export const UNIX_COMMAND = "curl -fsSL https://raw.githubusercontent.com/lochansaroy02/onegallery/main/install.sh | bash";
export const WINDOWS_COMMAND = "irm https://raw.githubusercontent.com/lochansaroy02/onegallery/main/install.ps1 | iex";

const systems: { os: Os; name: string; icon: IconName; command: string }[] = [
  { os: "linux", name: "Linux", icon: "linux", command: UNIX_COMMAND },
  { os: "mac", name: "macOS", icon: "apple", command: UNIX_COMMAND },
  { os: "windows", name: "Windows", icon: "windows", command: WINDOWS_COMMAND },
];

function About({ os }: { os: Os }) {
  if (os === "linux") return (
    <p>Clones One Gallery into <code>~/.local/share/onegallery-src</code> and installs it, with pacman on Arch and
      Manjaro or a Python environment elsewhere, then adds it to your app launcher. Run it again to update.</p>
  );
  if (os === "mac") return (
    <p>Copies the latest release into Applications and clears the quarantine flag, so macOS won&apos;t stop it on
      first launch. For Apple Silicon Macs (M1 and later); Intel Macs need to <a
        href="https://github.com/lochansaroy02/onegallery#building-the-mac-app">build from source</a>. Run it again to
      update.</p>
  );
  return (
    <p>In PowerShell or Windows Terminal, no admin rights needed. Downloads the latest installer and runs it quietly
      for your account, closing One Gallery first if it&apos;s open. Run it again to update.</p>
  );
}

// the one-line installer with a tab per system. Which panel shows is decided in CSS from
// <html data-install-os>, so it's right before React loads; without JavaScript every panel shows.
export function InstallBox({ idPrefix }: { idPrefix: string }) {
  const [os, setOs] = useInstallOs();
  return (
    <div className="install-box">
      <div className="os-tabs">
        <Segmented label="Your system" value={os} onChange={setOs} options={systems.map((s) => ({
          key: s.os, id: `${idPrefix}-tab-${s.os}`, controls: `${idPrefix}-panel-${s.os}`,
          label: <><Icon name={s.icon} />{s.name}</>,
        }))} />
      </div>
      {systems.map((s) => (
        <div key={s.os} className="os-panel" data-os={s.os} role="tabpanel" id={`${idPrefix}-panel-${s.os}`}
          aria-labelledby={`${idPrefix}-tab-${s.os}`}>
          <h3 className="os-name"><Icon name={s.icon} />{s.name}</h3>
          <CodeBlock oneLine code={s.command} label={`Copy the ${s.name} install command`} />
          <About os={s.os} />
        </div>
      ))}
    </div>
  );
}
