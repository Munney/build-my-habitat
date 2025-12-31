"use client";

import React from "react";
import Link from "next/link";
import { 
  Box, 
  Flame, 
  Droplets, 
  Home, 
  Pill, 
  ArrowRight, 
  ArrowLeft, // 👈 Added ArrowLeft for the back button
  ShieldAlert, 
  CheckCircle2 
} from "lucide-react";

import Footer from "../../components/Footer";

export default function LeopardGeckoGuidePage() {
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-6">
            Beginner's Guide
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 drop-shadow-lg leading-tight">
            The Ultimate <span className="text-emerald-400">Leopard Gecko Setup</span>
          </h1>
          <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Forget the starter kits. Here is the vet-approved, evidence-based guide to building a safe and thriving habitat for your new gecko.
          </p>
          
          <div className="mt-10">
            <Link
              href="/build/leopard-gecko"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-full transition-all hover:scale-105 shadow-lg shadow-emerald-900/20 text-sm md:text-base whitespace-nowrap"
            >
              Skip Reading & Build It Now <ArrowRight size={20} className="shrink-0" />
            </Link>
          </div>
        </div>

        {/* --- GUIDE SECTIONS --- */}
        <div className="max-w-4xl mx-auto space-y-8">

          {/* 1. The Enclosure */}
          <GuideSection 
            Icon={Box} 
            iconColor="#34d399" // Bright Emerald Green
            title="1. The Enclosure Size"
          >
            <p className="text-slate-300 mb-4">
              Size matters. A small tank is not just cramped; it makes it impossible to create the necessary temperature gradient for your gecko's health.
            </p>
            <ul className="space-y-3">
              <GuidePoint><strong>Minimum Size:</strong> A 20-gallon long tank (30" x 12" x 12") is the absolute minimum for one adult.</GuidePoint>
              <GuidePoint><strong>Gold Standard:</strong> A 40-gallon breeder or a 4x2x2 PVC enclosure is highly recommended for a thriving animal.</GuidePoint>
              <GuidePoint><strong>Floor Space &gt; Height:</strong> Leopard geckos are terrestrial. They need room to walk, not climb.</GuidePoint>
            </ul>
          </GuideSection>

          {/* 2. Heating & Lighting */}
          <GuideSection 
            Icon={Flame} 
            iconColor="#fb923c" // Bright Neon Orange
            title="2. Heating & Lighting"
          >
            <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-xl mb-4 flex items-start gap-3">
              <ShieldAlert size={24} className="text-red-400 shrink-0" />
              <p className="text-red-200 text-sm font-medium leading-relaxed">
                <strong>WARNING:</strong> Never use "Heat Rocks." They cause severe, life-threatening burns. Heat mats are outdated and less effective.
              </p>
            </div>
            <p className="text-slate-300 mb-4">
              Leopard geckos are "crepuscular" (active at dawn/dusk) but still benefit from overhead heating that mimics the sun.
            </p>
            <ul className="space-y-3">
              <GuidePoint><strong>Primary Heat:</strong> Use a Halogen Flood Lamp or Deep Heat Projector (DHP) for deep muscle penetration.</GuidePoint>
              <GuidePoint><strong>Mandatory Control:</strong> Every heat source <em>must</em> be connected to a thermostat to prevent overheating.</GuidePoint>
              <GuidePoint><strong>Temps:</strong> Aim for a warm side of 88-92°F and a cool side of 70-75°F.</GuidePoint>
            </ul>
          </GuideSection>

          {/* 3. Substrate */}
          <GuideSection 
            Icon={Droplets} 
            iconColor="#22d3ee" // Bright Cyan Blue
            title="3. Safe Substrate"
          >
            <p className="text-slate-300 mb-4">
              The wrong substrate can cause impaction (a deadly blockage). Choose wisely based on your experience level.
            </p>
            <ul className="space-y-3">
              <GuidePoint><strong>Safe Solid Options:</strong> Paper towels, slate tile, or a textured reptile carpet are easy to clean and 100% safe.</GuidePoint>
              <GuidePoint><strong>Safe Loose Option:</strong> A 70/30 mix of organic topsoil and playsand is excellent for natural digging behavior.</GuidePoint>
              <GuidePoint alert><strong>AVOID:</strong> Calcium sand, walnut shells, and wood chips. These are major impaction risks.</GuidePoint>
            </ul>
          </GuideSection>

          {/* 4. Hides & Enrichment */}
          <GuideSection 
            Icon={Home} 
            iconColor="#e879f9" // Bright Neon Purple
            title="4. Hides & Enrichment"
          >
            <p className="text-slate-300 mb-4">
              Security is paramount. A stressed gecko will not eat or thrive. You need a minimum of three hides.
            </p>
            <ul className="space-y-3">
              <GuidePoint><strong>Warm Hide:</strong> Placed on the warm side, directly under the heat source.</GuidePoint>
              <GuidePoint><strong>Cool Hide:</strong> Placed on the opposite cool side of the enclosure.</GuidePoint>
              <GuidePoint><strong>Moist Hide:</strong> A humid hide with damp moss is essential for proper shedding.</GuidePoint>
              <GuidePoint><strong>Clutter:</strong> Add fake plants, branches, and rocks to provide cover. A bare tank is a scary tank.</GuidePoint>
            </ul>
          </GuideSection>

          {/* 5. Supplements */}
          <GuideSection 
            Icon={Pill} 
            iconColor="#fb7185" // Bright Neon Pink
            title="5. Essential Supplements"
          >
            <p className="text-slate-300 mb-4">
              In captivity, feeder insects are not enough. You must supplement their diet to prevent Metabolic Bone Disease (MBD).
            </p>
            <ul className="space-y-3">
              <GuidePoint><strong>Calcium w/ D3:</strong> Dust insects at every feeding for growing geckos, and every other feeding for adults.</GuidePoint>
              <GuidePoint><strong>Multivitamin:</strong> Dust insects once a week to provide essential vitamins.</GuidePoint>
              <GuidePoint><strong>Plain Calcium Bowl:</strong> Leave a small cap of plain calcium (no D3) in the tank at all times.</GuidePoint>
            </ul>
          </GuideSection>

        </div>

        {/* --- CTA --- */}
        <div className="max-w-4xl mx-auto text-center mt-20">
          <h2 className="text-3xl font-black text-white mb-6">
            Ready to build the perfect habitat?
          </h2>
          <p className="text-slate-300 leading-relaxed max-w-2xl mx-auto mb-10">
            Our smart builder will guide you through selecting all these compatible parts.
          </p>
          
          <Link
            href="/build/leopard-gecko"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 md:px-10 md:py-5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-full transition-all hover:scale-105 shadow-xl shadow-emerald-900/30 text-sm md:text-lg whitespace-nowrap"
          >
            Launch Gecko Builder <ArrowRight size={20} className="shrink-0 md:w-6 md:h-6" />
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
           <CheckCircle2 size={18} className="text-emerald-400" />
        )}
      </div>
      <div>{children}</div>
    </li>
  );
}