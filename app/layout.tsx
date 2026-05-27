import type { Metadata, Viewport } from "next";
import { AppProviders } from "@/components/providers";
import { PwaRegister } from "@/lib/pwa/pwa-register";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Steilar | Wear imagination.",
    template: "%s | Steilar"
  },
  description: "A luxury AI fashion generation platform for turning imagination into custom-made clothing.",
  applicationName: "Steilar",
  appleWebApp: {
    capable: true,
    title: "Steilar",
    statusBarStyle: "black-translucent"
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/icons/icon-192.svg",
    apple: "/icons/apple-touch-icon.svg"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  themeColor: "#000000"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans">
        <AppProviders>{children}</AppProviders>
        <PwaRegister />
      </body>
    </html>
  );
}
