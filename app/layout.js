import "./globals.css";
import { Inter } from "next/font/google";
import Image from "next/image";
import Navbar from "./components/Navbar"; // 👈 Import the new file
import Analytics from "./components/Analytics";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    template: '%s | HabitatBuilder',
    default: 'HabitatBuilder - Smart Reptile & Aquarium Setup Configurator',
  },
  description: 'Stop guessing at the pet store. Build safe, complete, and species-appropriate habitats for Leopard Geckos, Betta Fish, and more with our smart configurator.',
  keywords: 'reptile habitat builder, aquarium setup, betta fish care, leopard gecko setup, pet habitat configurator, safe pet enclosures, research-backed pet care',
  authors: [{ name: 'HabitatBuilder' }],
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
      <body className={`${inter.className} bg-[#020617] text-slate-200 min-h-screen flex flex-col`}>
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
        <div className="fixed inset-0 -z-50">
          <Image 
            src="/background.jpg"
            alt="Jungle Background"
            fill
            className="object-cover opacity-85"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/85 via-[#020617]/75 to-[#020617]/90 backdrop-blur-[0.5px]" />
        </div>

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