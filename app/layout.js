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
  other: {
    'google-tag-manager': 'GTM-P92HFFRX',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
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