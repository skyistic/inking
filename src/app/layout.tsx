import type { Metadata } from "next";
import { DM_Sans, Marck_Script } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const marckScript = Marck_Script({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-marck-script",
});

export const metadata: Metadata = {
  title: "inking.ai",
  description: "",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
    noimageindex: true,
    googleBot: {
      index: false,
      follow: false,
      'max-video-preview': 0,
      'max-image-preview': 'none',
      'max-snippet': 0,
      noarchive: true,
      nosnippet: true,
      noimageindex: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Prevent search engine indexing */}
        <meta name="robots" content="noindex, nofollow, noarchive, nosnippet, noimageindex" />
        <meta name="googlebot" content="noindex, nofollow, noarchive, nosnippet, noimageindex" />
        <meta name="bingbot" content="noindex, nofollow, noarchive, nosnippet, noimageindex" />
        
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16" />
        <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Additional SEO tags */}
        {/* <meta name="theme-color" content="#014131" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="mobile-web-app-capable" content="yes" />
         */}
        {/* Structured Data */}
        <script
          // type="application/ld+json"
          // dangerouslySetInnerHTML={{
          //   __html: JSON.stringify({
          //     "@context": "https://schema.org",
          //     "@type": "WebSite",
          //     "name": "MNI Jungkook",
          //     "url": "https://mnijungkook.vercel.app",
          //     "description": "Official Jungkook fan site featuring music, videos, and exclusive content from BTS' Golden Maknae",
          //     "inLanguage": "en-US",
          //     "about": {
          //       "@type": "Person",
          //       "name": "Jungkook",
          //       "alternateName": ["Jeon Jungkook", "정국", "Golden Maknae"],
          //       "description": "Main vocalist and youngest member of BTS",
          //       "memberOf": {
          //         "@type": "MusicGroup",
          //         "name": "BTS",
          //         "alternateName": ["방탄소년단", "Bangtan Boys", "Bangtan Sonyeondan"]
          //       }
          //     },
          //     "potentialAction": {
          //       "@type": "SearchAction",
          //       "target": "https://mnijungkook.vercel.app/?q={search_term_string}",
          //       "query-input": "required name=search_term_string"
          //     }
          //   })
          // }}
        />
      </head>
      <body className={`${dmSans.variable} ${marckScript.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
