import "./globals.css";
import { Inter, Source_Serif_4 } from "next/font/google";
import Navbar from "./components/Navbar"; // 👈 Import the new file
import Analytics from "./components/Analytics";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500"], // Body: 400, UI labels: 500
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  weight: ["500", "600"], // Headings: 500-600
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.buildmyhabitat.com'),
  title: {
    template: '%s | HabitatBuilder',
    default: 'Leopard Gecko & Betta Fish Setup Builder | HabitatBuilder',
  },
  description: 'Build safe, vet-approved habitats for Leopard Geckos and Betta Fish. Free compatibility checker, complete setup guides, and verified product lists. Start your 40-gallon gecko or 5+ gallon betta setup today.',
  keywords: 'leopard gecko setup, betta fish tank setup, leopard gecko habitat, betta fish care, leopard gecko tank setup, betta fish setup, reptile habitat builder, aquarium setup, leopard gecko enclosure, betta fish tank size, leopard gecko heating, betta fish heater, leopard gecko substrate, betta fish filter, safe pet enclosures, research-backed pet care',
  authors: [{ name: 'HabitatBuilder' }],
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'HabitatBuilder - Smart Reptile & Aquarium Setup Configurator',
    description: 'Build safe, complete, and species-appropriate habitats with research-backed recommendations.',
    url: 'https://www.buildmyhabitat.com',
    siteName: 'HabitatBuilder',
    type: 'website',
    images: [
      {
        url: 'https://www.buildmyhabitat.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'HabitatBuilder - Build Safe Pet Habitats',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HabitatBuilder - Smart Pet Habitat Configurator',
    description: 'Build safe, research-backed habitats for your pets.',
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
  other: {
    'google-tag-manager': 'GTM-P92HFFRX',
  },
};

export default function RootLayout({ children }) {
  // Structured Data for Organization
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "HabitatBuilder",
    "url": "https://www.buildmyhabitat.com",
    "logo": "https://www.buildmyhabitat.com/og-image.jpg",
    "description": "Build safe, research-backed habitats for your pets with our smart configurator",
    "sameAs": []
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "HabitatBuilder",
    "url": "https://www.buildmyhabitat.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://www.buildmyhabitat.com/browse?search={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html lang="en">
      <head>
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
        
        {/* Favicon - 32x32 first for better visibility in browser tabs */}
        <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
        <link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Web App Manifest */}
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Google Tag Manager - Must be as high in head as possible */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-P92HFFRX');`,
          }}
        />
        {/* End Google Tag Manager */}
        
        {/* Google tag (gtag.js) */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-F4HEEKPH2K"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-F4HEEKPH2K');
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} ${sourceSerif.variable} ${inter.className} text-slate-200 min-h-screen flex flex-col`}>
        {/* Google Tag Manager (noscript) - Must be immediately after opening body tag */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-P92HFFRX"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        
        {/* --- GLOBAL BACKGROUND --- */}
        {/* Dark grainy background with subtle, diffused light sources */}
        <div className="fixed inset-0 -z-50" style={{
          background: `
            radial-gradient(
              ellipse 2800px 2000px at 5% 15%,
              rgba(94, 234, 212, 0.06) 0%,
              rgba(94, 234, 212, 0.04) 20%,
              rgba(94, 234, 212, 0.02) 40%,
              transparent 60%
            ),
            radial-gradient(
              ellipse 3000px 2200px at 10% 20%,
              rgba(16, 185, 129, 0.04) 0%,
              rgba(16, 185, 129, 0.02) 30%,
              transparent 50%
            ),
            radial-gradient(
              ellipse 2600px 1900px at 95% 90%,
              rgba(59, 130, 246, 0.08) 0%,
              rgba(59, 130, 246, 0.05) 20%,
              rgba(59, 130, 246, 0.03) 40%,
              transparent 60%
            ),
            radial-gradient(
              ellipse 2800px 2100px at 88% 85%,
              rgba(37, 99, 235, 0.05) 0%,
              rgba(37, 99, 235, 0.03) 25%,
              transparent 50%
            ),
            linear-gradient(
              135deg,
              rgba(16, 185, 129, 0.02) 0%,
              transparent 30%,
              transparent 70%,
              rgba(59, 130, 246, 0.02) 100%
            ),
            linear-gradient(
              45deg,
              rgba(94, 234, 212, 0.015) 0%,
              transparent 50%
            ),
            #020617
          `,
          position: 'fixed',
          width: '100%',
          height: '100%'
        }} />
        {/* Grain texture overlay - fine, consistent grain */}
        <div 
          className="fixed inset-0 -z-40 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundSize: '300px 300px',
            imageRendering: 'auto'
          }}
        />

        {/* --- NAVBAR COMPONENT --- */}
        {/* This contains the large logo AND the moving box logic */}
        <Navbar />

        {/* --- MAIN CONTENT WRAPPER --- */}
        {/* Matches your padding (pt-28) for the larger header */}
        <div className="pt-28 relative z-10 flex-grow">
            {children}
        </div>

        {/* Analytics Component */}
        <Analytics />
      </body>
    </html>
  );
}