// import type { Metadata } from "next";
"use client";
import "./globals.css";
import ClientLayout from "./ClientLayout";
import { Toaster } from "react-hot-toast";

// export const metadata: Metadata = {
//   title: {
//     default: "Sunstone Mind",
//     template: "%s | Sunstone Mind",
//   },
//   description: "Your wellness sanctuary 🌿 A peaceful space to heal, grow, and thrive.",
//   keywords: ["wellness", "mindfulness", "meditation", "therapy", "mental health", "peace"],
//   // authors: [{ name: "Sunstone Mind Team", url: "http://localhost:3000" }],
//   creator: "Sunstone Mind",
//   publisher: "Sunstone Mind",
//   icons: {
//     // icon: "/happy.svg",
//     // shortcut: "/favicon.icon",
//     // apple: "/apple-touch-icon.png",
//   },  
//   // openGraph: {
//   //   type: "website",
//   //   locale: "en_US",
//   //   url: "http://localhost:3000",
//   //   siteName: "Sunstone Mind",
//   //   title: "Sunstone Mind - Your Wellness Sanctuary",
//   //   description: "A peaceful space to heal, grow, and thrive 🌿",
//   //   images: [
//   //     {
//   //       url: "/og-image.png",
//   //       width: 1200,
//   //       height: 630,
//   //       alt: "Sunstone Mind",
//   //     },
//   //   ],
//   // },
//   // twitter: {
//   //   card: "summary_large_image",
//   //   site: "@sunstonemind",
//   //   creator: "@sunstonemind",
//   //   title: "Sunstone Mind - Your Wellness Sanctuary",
//   //   description: "A peaceful space to heal, grow, and thrive 🌿",
//   //   images: ["/og-image.png"],
//   // },
//   // robots: {
//   //   index: true,
//   //   follow: true,
//   //   googleBot: {
//   //     index: true,
//   //     follow: true,
//   //     "max-snippet": -1,
//   //     "max-image-preview": "large",
//   //     "max-video-preview": -1,
//   //   },
//   // },
//   // alternates: {
//   //   canonical: "http://localhost:3000",
//   // },
//   // themeColor: "#ffffff",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
        {/* <Toaster
          position="top-right"
          toastOptions={{
            success: {
              style: { background: "#4caf50", color: "#fff" },
              iconTheme: { primary: "#fff", secondary: "#4caf50" },
            },
            error: {
              style: { background: "#f44336", color: "#fff" },
              iconTheme: { primary: "#fff", secondary: "#f44336" },
            },
            loading: {
              style: { background: "#2196f3", color: "#fff" },
              iconTheme: { primary: "#fff", secondary: "#2196f3" },
            },
          }}
        /> */}
      </body>
    </html>
  );
}
