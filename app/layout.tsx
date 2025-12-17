import MuiProvider from "./components/MuiProvider";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dice-game-navy-gamma.vercel.app/"),

  title: {
    default: "Dice Game | My Super Game",
    template: "%s | My Dice Game",
  },
  description:
    "The best More/Less-Guess game in EU. Guess the numbers and win!",
  keywords: ["game", "numbers", "more less", "online game", "React"],

  openGraph: {
    title: "Dice Game",
    description: "Try to guess the number! Play for free online.",
    url: "https://dice-game-navy-gamma.vercel.app/",
    siteName: "SuperGame EU",
    images: [
      {
        url: "/favicon.ico",
        width: 1200,
        height: 630,
        alt: "Preview game image",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "My Dice Game",
    description: "Try to guess the number and win!",
    images: ["/favicon.ico"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#1976d2",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk">
      <body className={inter.className}>
        <MuiProvider>{children}</MuiProvider>
      </body>
    </html>
  );
}
