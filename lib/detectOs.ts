// Runs inline in <head> (app/layout.tsx), before the first paint, and stores the visitor's system on
// <html data-install-os> for lib/installOs.ts: "linux", "mac" or "windows", Linux when unknown.
// userAgentData.platform where the browser has it, otherwise the user agent
export const detectOsScript = `try {
  var p = (navigator.userAgentData && navigator.userAgentData.platform) || navigator.userAgent || "";
  document.documentElement.dataset.installOs =
    /iphone|ipad/i.test(p) ? "linux" : /win/i.test(p) ? "windows" : /mac/i.test(p) ? "mac" : "linux";
} catch (e) {}`;
