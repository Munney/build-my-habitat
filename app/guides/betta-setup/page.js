"use client";

import React from "react";
import Link from "next/link";
import { 
  Box, 
  Thermometer, 
  Waves, 
  Flower2, 
  FlaskConical, 
  ArrowRight, 
  ArrowLeft, // 👈 Added ArrowLeft for the back button
  ShieldAlert, 
  CheckCircle2 
} from "lucide-react";

import Footer from "../../components/Footer";

export default function BettaGuidePage() {
  return (
    <>
      <main className="min-h-screen pt-28 pb-20 px-6 relative z-10 bg-[#020617]">
        
        {/* --- BACK TO HUB BUTTON --- */}
        <div className="max-w-4xl mx-auto mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-medium text-sm group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Hub
          </Link>
        </div>

        {/* --- HERO SECTION --- */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-6">
            Beginner's Guide
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 drop-shadow-lg leading-tight">
            The Ultimate <span className="text-blue-400">Betta Fish Setup</span>
          </h1>
          <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Stop buying bowls. Betta fish are intelligent, tropical animals that require specific water conditions to survive. Here is how to do it right.
          </p>
          
          <div className="mt-10">
            <Link
              href="/build/betta"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full transition-all hover:scale-105 shadow-lg shadow-blue-900/20 text-sm md:text-base whitespace-nowrap"
            >
              Skip Reading & Build It Now <ArrowRight size={20} className="shrink-0" />
            </Link>
          </div>
        </div>

        {/* --- GUIDE SECTIONS --- */}
        <div className="max-w-4xl mx-auto space-y-8">

          {/* 1. The Tank */}
          <GuideSection 
            Icon={Box} 
            iconColor="#60a5fa" // Bright Blue
            title="1. Tank Size & Shape"
          >
            <p className="text-slate-300 mb-4">
              The "puddle myth" is false. While Bettas can survive in small cups briefly, they slowly die from ammonia poisoning in anything less than 5 gallons.
            </p>
            <ul className="space-y-3">
              <GuidePoint><strong>Minimum Size:</strong> 5 Gallons is the absolute minimum. 10 Gallons is easier to maintain.</GuidePoint>
              <GuidePoint><strong>Shape:</strong> Long and shallow is better than tall. Bettas need to reach the surface to breathe.</GuidePoint>
              <GuidePoint><strong>Lid Required:</strong> Bettas are excellent jumpers. A tight-fitting lid is mandatory.</GuidePoint>
            </ul>
          </GuideSection>

          {/* 2. Filtration & Flow */}
          <GuideSection 
            Icon={Waves} 
            iconColor="#2dd4bf" // Teal/Cyan
            title="2. Filtration & Flow"
          >
            <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-xl mb-4 flex items-start gap-3">
              <ShieldAlert size={24} className="text-red-400 shrink-0" />
              <p className="text-red-200 text-sm font-medium leading-relaxed">
                <strong>CRITICAL:</strong> You must "Cycle" your tank (grow beneficial bacteria) before adding the fish, or ammonia levels will kill them.
              </p>
            </div>
            <p className="text-slate-300 mb-4">
              Bettas have long, heavy fins that make swimming against currents difficult. They need clean water with very gentle flow.
            </p>
            <ul className="space-y-3">
              <GuidePoint><strong>Best Filter:</strong> A Sponge Filter is the gold standard. It provides aeration and biological filtration with zero dangerous suction.</GuidePoint>
              <GuidePoint><strong>Avoid:</strong> High-flow Hang-on-Back filters can blow your Betta around the tank, causing stress and fin rot.</GuidePoint>
            </ul>
          </GuideSection>

          {/* 3. Heating */}
          <GuideSection 
            Icon={Thermometer} 
            iconColor="#fb923c" // Orange
            title="3. Tropical Heating"
          >
            <p className="text-slate-300 mb-4">
              Bettas are tropical fish. Room temperature water is almost always too cold, causing lethargy and immune system failure.
            </p>
            <ul className="space-y-3">
              <GuidePoint><strong>Temperature:</strong> Maintain a steady 78°F - 80°F (25.5°C - 26.5°C) at all times.</GuidePoint>
              <GuidePoint><strong>Wattage:</strong> Use the "5 Watts per Gallon" rule (e.g., a 50W heater for a 10-gallon tank).</GuidePoint>
              <GuidePoint><strong>Adjustable:</strong> Avoid pre-set heaters. Buy one with a dial so you can control the temperature precisely.</GuidePoint>
            </ul>
          </GuideSection>

          {/* 4. Plants & Decor */}
          <GuideSection 
            Icon={Flower2} 
            iconColor="#a3e635" // Lime Green
            title="4. Plants & Hides"
          >
            <p className="text-slate-300 mb-4">
              Bettas are intelligent and curious. They need enrichment and places to hide to feel secure.
            </p>
            <ul className="space-y-3">
              <GuidePoint><strong>Silk or Live:</strong> Never use plastic plants. If it can snag pantyhose, it will rip your Betta's fins.</GuidePoint>
              <GuidePoint><strong>Resting Spots:</strong> Bettas sleep near the surface. Add a "Betta Hammock" (leaf) or a Floating Log.</GuidePoint>
              <GuidePoint><strong>Substrate:</strong> Smooth gravel or sand is preferred. Avoid sharp rocks.</GuidePoint>
            </ul>
          </GuideSection>

          {/* 5. Water Chemistry */}
          <GuideSection 
            Icon={FlaskConical} 
            iconColor="#e879f9" // Purple
            title="5. Water Chemistry"
          >
            <p className="text-slate-300 mb-4">
              You cannot just use tap water. It contains chlorine which burns fish gills.
            </p>
            <ul className="space-y-3">
              <GuidePoint><strong>Dechlorinator:</strong> You MUST use a water conditioner (like Seachem Prime) with every water change.</GuidePoint>
              <GuidePoint><strong>Testing:</strong> Own an API Master Test Kit. Test strips are notoriously inaccurate.</GuidePoint>
              <GuidePoint><strong>Maintenance:</strong> Perform a 20-30% partial water change once a week. Never change 100% of the water at once.</GuidePoint>
            </ul>
          </GuideSection>

        </div>

        {/* --- CTA --- */}
        <div className="max-w-4xl mx-auto text-center mt-20">
          <h2 className="text-3xl font-black text-white mb-6">
            Ready to design your tank?
          </h2>
          <p className="text-slate-300 leading-relaxed max-w-2xl mx-auto mb-10">
            Our smart builder will guide you through selecting the right tank, heater, and filter.
          </p>
          
          <Link
            href="/build/betta"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 md:px-10 md:py-5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full transition-all hover:scale-105 shadow-xl shadow-blue-900/30 text-sm md:text-lg whitespace-nowrap"
          >
            Launch Betta Builder <ArrowRight size={20} className="shrink-0 md:w-6 md:h-6" />
          </Link>
        </div>

      </main>
      <Footer />
    </>
  );
}

// --- COMPONENTS ---
function GuideSection({ Icon, iconColor, title, children }) {
  return (
    <section className="bg-slate-900/50 backdrop-blur-md p-8 rounded-3xl border border-white/10 shadow-lg">
      <div className="flex items-center gap-4 mb-6 border-b border-white/5 pb-4">
        <div className="p-3 bg-slate-800/80 rounded-2xl border border-white/5 shadow-inner">
          <Icon size={32} style={{ color: iconColor }} />
        </div>
        <h2 className="text-2xl font-bold text-white">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function GuidePoint({ children, alert }) {
  return (
    <li className="flex items-start gap-3 text-slate-300 leading-relaxed">
      <div className="shrink-0 mt-1">
        {alert ? (
           <ShieldAlert size={18} className="text-red-400" />
        ) : (
           <CheckCircle2 size={18} className="text-blue-400" />
        )}
      </div>
      <div>{children}</div>
    </li>
  );
}