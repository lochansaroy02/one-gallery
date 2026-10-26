import { Icon } from "./Icon";
import { InstallLink } from "./Install";
import { Window } from "./Window";
import { shotSrc, shotSrcSet } from "@/lib/shots";

const heroSizes = "(min-width: 1180px) 1120px, 94vw";

// the app's own collapsing title; ScrollEffects plays the intro and tilts the window
export function Hero() {
  return (
    <section className="hero" id="top" data-nav="top">
      <div className="hero-title">
        <h1 className="big-title intro">One Gallery</h1>
        <p className="hero-count intro">Your phone&apos;s gallery, on your desktop.</p>
      </div>
      <p className="hero-lede intro">The folders you choose, newest first and grouped by day. Made for Linux, and it
        runs on Windows and macOS too.</p>
      <div className="hero-ctas intro">
        <InstallLink tab="linux" className="btn">
          <Icon name="plasma" />Install on Linux
        </InstallLink>
        <a className="btn btn-quiet" href="https://github.com/lochansaroy02/onegallery/releases/latest">
          <Icon name="windows" />Download for Windows
        </a>
        <InstallLink tab="mac" className="btn btn-quiet">
          <Icon name="mac" />Download for Mac
        </InstallLink>
      </div>
      <p className="hero-meta intro">Free and open source under the MIT licence. Version 0.3.0.</p>

      <div className="hero-stage">
        <Window className="hero-window intro">
          <div className="themed">
            <img className="for-light" src={shotSrc("look-oneui")} srcSet={shotSrcSet("look-oneui")} sizes={heroSizes}
              width={1920} height={1200} fetchPriority="high"
              alt="The Pictures tab: photos grouped under Today, Yesterday and Fri, Oct 23, with the floating navigation bar at the bottom." />
            <img className="for-dark" src={shotSrc("look-dark-clear")} srcSet={shotSrcSet("look-dark-clear")}
              sizes={heroSizes} width={1920} height={1200} loading="lazy"
              alt="The Pictures tab in dark mode, on pure black, with a clear glass navigation bar." />
          </div>
        </Window>
      </div>
    </section>
  );
}
