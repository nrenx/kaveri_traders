import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Kaveri Traders | Premium Wood Cutting & Supply",
  description:
    "Kaveri Traders — premium Casurina & Eucalyptus wood cutting, transport, firewood & paper wood supply. Custom sizes, own fleet delivery across India — 15+ years of trusted service.",
  keywords: ["Casurina wood", "Eucalyptus wood", "wood cutting", "firewood supply", "paper wood", "wood transport", "Kaveri Traders", "timber supply India"],
  openGraph: {
    title: "Kaveri Traders | Premium Wood Cutting & Supply",
    description: "Premium Casurina & Eucalyptus wood supply, firewood & paper wood — 15+ years across India.",
    type: "website",
    locale: "en_IN",
    siteName: "Kaveri Traders",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kaveri Traders | Premium Wood Cutting & Supply",
    description: "Premium Casurina & Eucalyptus wood supply, firewood & paper wood — 15+ years across India.",
  },
  robots: { index: true, follow: true },
};

// JSON-LD structured data for LocalBusiness (Google rich results)
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Kaveri Traders",
  description: "Premium Casurina and Eucalyptus wood cutting, transport, firewood & paper wood supply across India.",
  telephone: "+91-7989976214",
  email: "kaveritraders.timber@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressRegion: "Andhra Pradesh",
    addressCountry: "IN",
  },
  openingHours: "Mo-Sa 07:00-19:00",
  priceRange: "$$",
  areaServed: ["Andhra Pradesh", "Telangana", "Karnataka", "Odisha", "Maharashtra"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#1C1917" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="icon" href={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/favicon.ico`} sizes="any" />
        <link rel="icon" type="image/png" sizes="192x192" href={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/icon-192.png`} />
        <link rel="apple-touch-icon" href={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/apple-touch-icon.png`} />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/icon-512.png`} />
        <meta name="twitter:image" content={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/icon-512.png`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
