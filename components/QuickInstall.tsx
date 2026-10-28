import { CodeBlock } from "./CodeBlock";
import { Icon } from "./Icon";

export const INSTALL_COMMAND =
  "curl -fsSL https://raw.githubusercontent.com/lochansaroy02/onegallery/main/install.sh | bash";

// the one-line installer, with what it does on each system
export function QuickInstall() {
  return (
    <div className="quick-install">
      <CodeBlock oneLine code={INSTALL_COMMAND} label="Copy install command" />
      <ul className="platforms">
        <li>
          <h3><Icon name="linux" />Linux</h3>
          <p>Installs the system packages with pacman on Arch and Manjaro, or a Python environment elsewhere, and adds
            One Gallery to your app launcher.</p>
        </li>
        <li>
          <h3><Icon name="apple" />macOS</h3>
          <p>Copies One Gallery into Applications, ready to open with no security warning. For Apple Silicon Macs
            (M1 and later); Intel Macs need to <a
              href="https://github.com/lochansaroy02/onegallery#building-the-mac-app">build from source</a>.</p>
        </li>
        <li>
          <h3><Icon name="windows" />Windows</h3>
          <p>Runs the installer for your account, no admin rights needed. Run the command in Git Bash; PowerShell and
            cmd can&apos;t run it.</p>
        </li>
      </ul>
      <p className="quick-more">Run it again to update. Your settings, library and favorites are never touched.</p>
    </div>
  );
}
