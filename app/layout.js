import "./globals.css";
import { Inter } from "next/font/google";
import Image from "next/image";
import Navbar from "./components/Navbar"; // 👈 Import the new file
import Analytics from "./components/Analytics";
import GTM from "./components/GTM";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    template: '%s | HabitatBuilder',
    default: 'HabitatBuilder - Smart Reptile & Aquarium Setup Configurator',
  },
  description: 'Stop guessing at the pet store. Build safe, complete, and species-appropriate habitats for Leopard Geckos, Betta Fish, and more with our smart configurator.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#020617] text-slate-200 min-h-screen flex flex-col`}>
        {/* Google Tag Manager */}
        <GTM />
        
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