import { ThemeProvider } from "@/components/theme-provider";
import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import grid from "./grid.svg";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const SITE_URL = "https://mba.tinhcorner.com";

const SITE_DESCRIPTION =
  "This website serves as my digital notebook for documenting my MBA journey!";
const SITE_TITLE = "Thinh's MBA Note";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
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
  twitter: {
    title: "Thinh's MBA Note",
    card: "summary_large_image",
    site: "@Thinhngo89",
    creator: "@Thinhngo89",
  },
  alternates: {
    canonical: SITE_URL,
  },
  keywords: ["MBA", "ThinhCorner MBA", "Thinh's MBA Note", "Thinh Ngo"],
  creator: "th1nhng0",
  openGraph: {
    url: SITE_URL,
    type: "website",
    title: SITE_TITLE,
    siteName: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "en-US",
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
        className={`${geistSans.variable} ${geistMono.variable} relative antialiased`}
      >
        <div
          className="absolute inset-0 -z-20 size-full max-h-svh"
          style={{
            backgroundImage: `url(${grid.src})`,
          }}
        />
        <div className="absolute inset-0 -z-10 max-h-svh size-full bg-gradient-to-b from-transparent  to-background" />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <main className="py-10 max-w-3xl mx-auto ">{children}</main>
        </ThemeProvider>
      </body>
      {process.env.GOOGLE_ANALYTICS_ID && (
        <GoogleAnalytics gaId={process.env.GOOGLE_ANALYTICS_ID} />
      )}
    </html>
  );
}
