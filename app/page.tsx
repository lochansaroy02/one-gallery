import { Collections, Looks, Timeline, Viewer } from "@/components/Features";
import { Faq } from "@/components/Faq";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Install } from "@/components/Install";
import { Pill } from "@/components/Pill";
import { Screens } from "@/components/Screens";
import { ScrollEffects } from "@/components/ScrollEffects";
import { Footer, More, Private } from "@/components/Sections";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "One Gallery",
  applicationCategory: "MultimediaApplication",
  operatingSystem: "Linux, Windows 10, Windows 11, macOS 13 or newer",
  softwareVersion: "0.3.0",
  license: "https://opensource.org/licenses/MIT",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  downloadUrl: "https://github.com/lochansaroy02/onegallery/releases/latest",
  codeRepository: "https://github.com/lochansaroy02/onegallery",
  screenshot: "assets/shots/pictures-light-1920.webp",
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <a className="skip" href="#main">Skip to content</a>
      <Header />
      <main id="main">
        <Hero />
        <Timeline />
        <Looks />
        <Viewer />
        <Collections />
        <More />
        <Screens />
        {/* after every feature section, so the pill only moves forward: Overview, Features, Private, Install */}
        <Private />
        <Install />
        <Faq />
      </main>
      <Footer />
      <Pill />
      <ScrollEffects />
    </>
  );
}
