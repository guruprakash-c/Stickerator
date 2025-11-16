import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "@/components/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Stickerator - Create Custom Stickers with Multiple AI Models",
  description: "Generate amazing AI-powered stickers with DALL-E, Midjourney, Stable Diffusion and more. Choose from HD to 4K resolution. Copyright-free stickers for commercial use.",
  keywords: ["AI sticker generator", "DALL-E", "Midjourney", "Stable Diffusion", "AI art", "sticker maker", "custom stickers", "AI images", "4K stickers", "HD stickers", "copyright free"],
  authors: [{ name: "Laerer Labs - GuruPrakash" }],
  icons: {
    icon: "https://stickerator-umber.vercel.app/logo.svg",
  },
  openGraph: {
    title: "Stickerator - Create Custom Stickers",
    description: "Generate amazing AI-powered stickers with multiple models and resolutions. No copyright issues!",
    url: "https://stickerator-umber.vercel.app",
    siteName: "Stickerator",
    type: "website",
    images: [
      {
        url: "https://stickerator-umber.vercel.app/logo.svg",
        width: 1200,
        height: 630,
        alt: "Stickerator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Stickerator - Create Custom Stickers",
    description: "Generate amazing AI-powered stickers with multiple models and resolutions. No copyright issues!",
    images: ["https://stickerator-umber.vercel.app/logo.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
