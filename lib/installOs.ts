import { useSyncExternalStore } from "react";

// The visitor's system, kept on <html data-install-os>. The inline script in app/layout.tsx sets it
// before the first paint, so CSS shows the right install command even before React loads;
// every OS picker on the page reads and writes it, so they stay in step.
export type Os = "linux" | "mac" | "windows";

const listeners = new Set<() => void>();

function read(): Os {
  const os = document.documentElement.dataset.installOs;
  return os === "mac" || os === "windows" ? os : "linux";
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => { listeners.delete(listener); };
}

export function setInstallOs(os: Os) {
  document.documentElement.dataset.installOs = os;
  listeners.forEach((l) => l());
}

export function useInstallOs(): [Os, (os: Os) => void] {
  return [useSyncExternalStore(subscribe, read, () => "linux"), setInstallOs];
}
