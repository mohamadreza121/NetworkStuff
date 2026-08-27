import type { Metadata, Viewport } from "next";
import "./globals.css";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteUrl } from "@/lib/site-config";

export const metadata: Metadata = {
  title: {
    default: "NetPath — The practical path to network engineering",
    template: "%s | NetPath",
  },
  description:
    "Learn network engineering through real configurations, troubleshooting, automation, and hands-on labs.",
  metadataBase: new URL(siteUrl),
  applicationName: "NetPath",
  category: "education",
  keywords: [
    "network engineering",
    "CCNA",
    "CCNP",
    "Linux networking",
    "GNS3 labs",
    "network automation",
    "Ansible",
    "Palo Alto",
    "FortiGate",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "NetPath — The practical path to network engineering",
    description: "From first ping to production networks.",
    type: "website",
    siteName: "NetPath",
    url: "/",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "NetPath — The practical path to network engineering" }],
  },
  twitter: { card: "summary_large_image", title: "NetPath — The practical path to network engineering", description: "From first ping to production networks.", images: ["/og.png"] },
  robots: { index: true, follow: true },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#040506",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebSite", name: "NetPath", url: siteUrl, description: "A practical network engineering learning and reference platform.", potentialAction: { "@type": "SearchAction", target: `${siteUrl}/?q={search_term_string}`, "query-input": "required name=search_term_string" } }) }} />
        <a className="skip-link" href="#main-content">Skip to content</a>
        <SiteHeader />
        <div id="main-content">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
