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
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#060A0F",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <SiteHeader />
        <div id="main-content">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
