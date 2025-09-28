import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "./ClientLayout";

export const metadata: Metadata = {
  title: {
    default: "Sunstone Mind",
    template: "%s | Sunstone Mind",
  },
  description: "Your wellness sanctuary 🌿 A peaceful space to heal, grow, and thrive.",
  keywords: ["wellness", "mindfulness", "meditation", "therapy", "mental health", "peace"],
  authors: [{ name: "Sunstone Mind Team", url: "https://sunstonemind.com" }],
  creator: "Sunstone Mind",
  publisher: "Sunstone Mind",
  icons: {
    icon: "/happy.svg",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sunstonemind.com",
    siteName: "Sunstone Mind",
    title: "Sunstone Mind - Your Wellness Sanctuary",
    description: "A peaceful space to heal, grow, and thrive 🌿",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sunstone Mind",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sunstonemind",
    creator: "@sunstonemind",
    title: "Sunstone Mind - Your Wellness Sanctuary",
    description: "A peaceful space to heal, grow, and thrive 🌿",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "https://sunstonemind.com",
  },
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
