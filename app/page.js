"use client";

import Link from "next/link";
import Image from "next/image"; 
import { useState } from "react";
import { ArrowRight, BookOpen, ArrowUpRight } from "lucide-react";
import { analytics } from "./utils/analytics";

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden text-white selection:bg-sky-500/30">
      
      {/* NOTE: The Background Image was removed from here 
          because it is now in app/layout.js 
      */}

      {/* --- CONTENT LAYER --- */}
      <div className="relative z-10 w-full max-w-6xl px-6 py-12 md:py-20 flex flex-col items-center">
        
        {/* Header */}
        <div className="text-center max-w-2xl mb-16 space-y-4 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-white/10 blur-[60px] rounded-full pointer-events-none" />
          
          <h1 className="relative text-5xl md:text-7xl font-black tracking-tight text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.6)]">
            Build My Habitat
          </h1>
          <p className="relative text-lg md:text-xl text-slate-300 font-medium leading-relaxed drop-shadow-lg">
            Pick a species and we&apos;ll help you design a safe, complete setup with compatibility checks and curated recommendations.
          </p>
        </div>

        {/* --- BUILDER CARDS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mb-24">
          
          {/* LEOPARD GECKO BUILDER */}
          <SpeciesCard 
            href="/build/leopard-gecko"
            title="Leopard Gecko"
            description="Create a naturalistic terrarium with precise heating, safe substrates, and enriching hides."
            imageSrc="/gecko.jpg"
            buttonColor="bg-emerald-600 hover:bg-emerald-500"
            borderColor="group-hover:border-emerald-500/50"
            glowColor="group-hover:shadow-[0_0_40px_-10px_rgba(16,185,129,0.3)]"
            titleColor="text-emerald-400"
          />

          {/* BETTA FISH BUILDER */}
          <SpeciesCard 
            href="/build/betta"
            title="Betta Fish"
            description="Design a planted aquarium with gentle filtration, proper heating, and safe decor."
            imageSrc="/betta.jpg"
            buttonColor="bg-blue-600 hover:bg-blue-500"
            borderColor="group-hover:border-blue-500/50"
            glowColor="group-hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.3)]"
            titleColor="text-blue-400"
          />

        </div>

        {/* --- HUSBANDRY GUIDES --- */}
        <div className="w-full">
            <div className="flex items-center gap-3 mb-8 px-2 border-b border-white/10 pb-4">
                <BookOpen className="text-indigo-400" size={24} />
                <h2 className="text-2xl font-bold text-white">Husbandry Guides</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Gecko Guide */}
                <GuideCard 
                    href="/guides/leopard-gecko-setup"
                    title="Leopard Gecko Setup"
                    description="A complete breakdown of heating (Halogen vs DHP), substrate safety, and enclosure sizes."
                    imageSrc="/gecko-guide.jpg"
                    fallbackSrc="/gecko.jpg"
                    accentColor="text-emerald-400"
                    hoverBorder="hover:border-emerald-500/30"
                />

                {/* Betta Guide */}
                <GuideCard 
                    // 👇 FIXED: Changed from "/guides/betta-fish-care" to the correct path
                    href="/guides/betta-setup"
                    title="Betta Fish Care 101"
                    description="Why bowls are dangerous, understanding the nitrogen cycle, and the best live plants."
                    imageSrc="/betta-guide.jpg"
                    fallbackSrc="/betta.jpg"
                    accentColor="text-blue-400"
                    hoverBorder="hover:border-blue-500/30"
                />
            </div>
        </div>

        {/* Disclaimer Footer */}
        <p className="mt-20 text-xs text-slate-500 text-center max-w-lg opacity-60 mix-blend-plus-lighter">
          * This builder provides general care guidelines. Always research specific needs from multiple reputable sources before purchasing an animal.
        </p>
      </div>
    </main>
  );
}

// --- COMPONENT: SPECIES BUILDER CARD (Big) ---
function SpeciesCard({ 
  href, 
  title, 
  description, 
  imageSrc, 
  buttonColor, 
  borderColor, 
  glowColor,
  titleColor
}) {
  const species = title.toLowerCase().includes("betta") ? "betta" : "leopard-gecko";
  
  return (
    <Link 
      href={href}
      onClick={() => analytics.trackBuilderStart(species)}
      className={`group relative flex flex-col overflow-hidden rounded-3xl border border-slate-700/50 bg-slate-900/40 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 ${borderColor} ${glowColor}`}
    >
      {/* Image Half */}
      <div className="relative h-64 w-full overflow-hidden bg-slate-800">
        <Image 
          src={imageSrc} 
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10" />
      </div>

      {/* Content Half */}
      <div className="flex flex-col flex-grow p-8 pt-4">
        <h2 className={`text-3xl font-bold mb-3 ${titleColor} drop-shadow-sm`}>
          {title}
        </h2>
        <p className="text-slate-300 mb-8 leading-relaxed flex-grow">
          {description}
        </p>
        
        <div className={`w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all shadow-lg ${buttonColor}`}>
          Start {title} setup <ArrowRight size={20} />
        </div>
      </div>
    </Link>
  );
}

// --- COMPONENT: GUIDE CARD (Compact) ---
function GuideCard({ href, title, description, imageSrc, accentColor, hoverBorder, fallbackSrc }) {
    const [imgError, setImgError] = useState(false);
    const currentSrc = imgError && fallbackSrc ? fallbackSrc : imageSrc;
    const guideType = title.toLowerCase().includes("betta") ? "betta-setup" : "leopard-gecko-setup";
    
    return (
        <Link 
            href={href}
            onClick={() => analytics.trackGuideView(guideType)}
            className={`group flex items-center gap-6 p-5 rounded-2xl border border-white/5 bg-slate-900/60 backdrop-blur-md transition-all duration-300 hover:bg-white/10 ${hoverBorder}`}
        >
            {/* Thumbnail Container */}
            <div className="relative h-24 w-24 min-w-[6rem] shrink-0 overflow-hidden rounded-xl border border-white/10 bg-slate-800 shadow-lg">
                <Image 
                    src={currentSrc} 
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                    onError={() => setImgError(true)}
                />
            </div>

            {/* Content Side */}
            <div>
                <h3 className={`text-lg font-bold text-white mb-2 group-hover:text-white transition-colors flex items-center gap-2`}>
                    {title} <ArrowUpRight size={16} className={`opacity-0 group-hover:opacity-100 transition-opacity ${accentColor}`} />
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed line-clamp-2">
                    {description}
                </p>
            </div>
        </Link>
    );
}