"use client";

import Link from "next/link";
import Image from "next/image"; 
import { ArrowRight, BookOpen, ArrowUpRight, ShieldCheck, CheckCircle2, Sparkles, FileText } from "lucide-react";
import { analytics } from "./utils/analytics";
import { HowToSchema } from "./components/StructuredData";
import Footer from "./components/Footer";

export default function Home() {
  // HowTo structured data for the homepage
  const howToSteps = [
    {
      name: "Select Species",
      text: "Choose your pet (Leopard Gecko or Betta Fish) and your experience level (Beginner or Experienced)."
    },
    {
      name: "Build Setup",
      text: "Configure your habitat by selecting an enclosure, heating, substrate, decor, and other essential items. Our builder guides you through each step with safety checks."
    },
    {
      name: "Get Recommendations",
      text: "Receive a complete, verified shopping list with Amazon links. All items are checked for compatibility and safety."
    }
  ];

  return (
    <>
    <main className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden text-white selection:bg-sky-500/30">
      <HowToSchema 
        steps={howToSteps}
        name="How to Build a Safe Pet Habitat"
        description="Learn how to use BuildMyHabitat to create a safe, research-backed habitat for your pet in three simple steps."
      />
      
      {/* NOTE: The Background Image was removed from here 
          because it is now in app/layout.js 
      */}

      {/* --- CONTENT LAYER --- */}
      <div className="relative z-10 w-full max-w-6xl px-6 py-12 md:py-20 flex flex-col items-center">
        
        {/* Header */}
        <div className="text-center max-w-3xl mb-12 space-y-6 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-white/10 blur-[60px] rounded-full pointer-events-none" />
          
          {/* Trust Badge */}
          <div className="relative flex items-center justify-center gap-2 mb-4">
            <ShieldCheck className="text-emerald-400" size={20} />
            <span className="text-sm font-bold text-emerald-400 uppercase tracking-wider">
              Research-Backed
            </span>
          </div>
          
          <h1 className="relative text-5xl md:text-7xl font-black tracking-tight text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.6)]">
            Build a Safe, Species Correct Habitat in Minutes
          </h1>
          <p className="relative text-lg md:text-xl text-slate-300 font-medium leading-relaxed drop-shadow-lg">
            Design a complete setup for your pet using research based care standards so you can avoid guesswork and unsafe advice.
          </p>
        </div>

        {/* How It Works */}
        <div className="w-full max-w-4xl mb-20 relative">
          {/* Very faint vertical gradient for subtle hierarchy - behind cards only */}
          <div className="absolute inset-0 -z-10 rounded-3xl" style={{
            background: 'linear-gradient(to bottom, transparent, rgba(15, 23, 42, 0.25), rgba(15, 23, 42, 0.3), rgba(15, 23, 42, 0.25), transparent)',
            transform: 'translateY(5%)',
            height: '110%'
          }} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-0">
            <div className="text-center p-6 rounded-2xl card-warm">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                <span className="text-2xl font-black text-emerald-400">1</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Select Species</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Choose your pet and experience level
              </p>
            </div>
            
            <div className="text-center p-6 rounded-2xl card-warm">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                <span className="text-2xl font-black text-blue-400">2</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Build Setup</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Configure your habitat with guided selections
              </p>
            </div>
            
            <div className="text-center p-6 rounded-2xl card-warm">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
                <span className="text-2xl font-black text-purple-400">3</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Get Recommendations</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Receive a complete, verified shopping list
              </p>
            </div>
          </div>
        </div>

        {/* --- BUILDER CARDS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mb-16">
          
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

          {/* BEARDED DRAGON BUILDER */}
          <SpeciesCard 
            href="/build/bearded-dragon"
            title="Bearded Dragon"
            description="Build a complete enclosure with proper UVB lighting, safe heating, and enriching decor."
            imageSrc="/bearded_dragon.jpg"
            buttonColor="bg-emerald-700 hover:bg-emerald-600"
            borderColor="group-hover:border-emerald-500/50"
            glowColor="group-hover:shadow-[0_0_40px_-10px_rgba(16,185,129,0.35)]"
            titleColor="text-emerald-300"
          />

        </div>

        {/* --- RESEARCH SECTION --- */}
        <div className="w-full mb-16">
          <Link 
            href="/research"
            onClick={() => analytics.trackNavClick("research")}
            className="group block p-6 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30">
                  <FileText className="text-emerald-400" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">See the Research</h3>
                  <p className="text-sm text-slate-300">Explore peer-reviewed studies backing our recommendations</p>
                </div>
              </div>
              <ArrowUpRight className="text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" size={24} />
            </div>
          </Link>
        </div>

        {/* --- COMPLETE SETUP GUIDES --- */}
        <div className="w-full mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-white mb-3">Complete Setup Guides</h2>
            <p className="text-slate-400">Step-by-step guides with everything you need to know</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Link
              href="/guides/leopard-gecko-setup"
              onClick={() => analytics.trackNavClick("guide-leopard-gecko")}
              className="group p-6 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-emerald-600/10 border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Complete Leopard Gecko Setup Guide</h3>
                  <p className="text-sm text-slate-300">Tank size, heating, substrate, lighting, and all essentials</p>
                </div>
                <ArrowUpRight className="text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" size={24} />
              </div>
            </Link>
            
            <Link
              href="/guides/betta-setup"
              onClick={() => analytics.trackNavClick("guide-betta")}
              className="group p-6 rounded-2xl bg-gradient-to-r from-blue-500/10 to-blue-600/10 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Complete Betta Fish Setup Guide</h3>
                  <p className="text-sm text-slate-300">Tank size, heater, filter, cycling, and all essentials</p>
                </div>
                <ArrowUpRight className="text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" size={24} />
              </div>
            </Link>
            <Link
              href="/guides/bearded-dragon-care"
              onClick={() => analytics.trackNavClick("guide-bearded-dragon")}
              className="group p-6 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-emerald-600/10 border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Complete Bearded Dragon Care Guide</h3>
                  <p className="text-sm text-slate-300">4×2×2 enclosure, UVB, heating, substrate, and feeding</p>
                </div>
                <ArrowUpRight className="text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" size={24} />
              </div>
            </Link>
          </div>
        </div>

        {/* --- SETUP HELP BY TOPIC --- */}
        <div className="w-full max-w-4xl mx-auto mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Setup Help by Topic</h2>
            <p className="text-slate-400 text-sm">Quick guides organized by when you need them</p>
          </div>

          {/* Before You Build */}
          <div className="mb-8">
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-4">Before You Build</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Link
                href="/guides/betta-fish-tank-size"
                onClick={() => analytics.trackNavClick("guide-betta-tank-size")}
                className="group p-4 rounded-lg card-warm hover:bg-slate-800/60 transition-all"
              >
                <h4 className="text-lg font-semibold text-slate-200 mb-1">Betta Fish Tank Size</h4>
                <p className="text-sm text-slate-400">Why 5+ gallons is essential</p>
              </Link>
              <Link
                href="/guides/leopard-gecko-setup"
                onClick={() => analytics.trackNavClick("guide-gecko-enclosure")}
                className="group p-4 rounded-lg card-warm hover:bg-slate-800/60 transition-all"
              >
                <h4 className="text-lg font-semibold text-slate-200 mb-1">Leopard Gecko Enclosure Size</h4>
                <p className="text-sm text-slate-400">Minimum sizes and space requirements</p>
              </Link>
            </div>
          </div>

          {/* While You Build */}
          <div className="mb-8">
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-4">While You Build</h3>

            <h4 className="text-base font-semibold text-white mb-1">Leopard Gecko Setup Help</h4>
            <p className="text-sm text-slate-400 mb-3">Substrate, heating, and enclosure setup for leopard geckos.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
              <Link href="/guides/leopard-gecko-setup" onClick={() => analytics.trackNavClick("guide-leopard-gecko")} className="group p-4 rounded-lg card-warm hover:bg-slate-800/60 transition-all">
                <h5 className="text-lg font-semibold text-slate-200 mb-1">Leopard Gecko Setup Guide</h5>
                <p className="text-sm text-slate-400">Complete enclosure and care setup</p>
              </Link>
              <Link href="/guides/leopard-gecko-substrate" onClick={() => analytics.trackNavClick("guide-gecko-substrate")} className="group p-4 rounded-lg card-warm hover:bg-slate-800/60 transition-all">
                <h5 className="text-lg font-semibold text-slate-200 mb-1">Leopard Gecko Substrate Guide</h5>
                <p className="text-sm text-slate-400">Safe vs dangerous substrate options</p>
              </Link>
              <Link href="/guides/leopard-gecko-substrate-mix" onClick={() => analytics.trackNavClick("guide-leopard-substrate-mix")} className="group p-4 rounded-lg card-warm hover:bg-slate-800/60 transition-all">
                <h5 className="text-lg font-semibold text-slate-200 mb-1">Leopard Gecko Substrate Mix</h5>
                <p className="text-sm text-slate-400">Topsoil and playsand blend rules</p>
              </Link>
              <Link href="/guides/leopard-gecko-sand-safe" onClick={() => analytics.trackNavClick("guide-leopard-sand-safe")} className="group p-4 rounded-lg card-warm hover:bg-slate-800/60 transition-all">
                <h5 className="text-lg font-semibold text-slate-200 mb-1">Leopard Gecko Sand Safety Guide</h5>
                <p className="text-sm text-slate-400">Impaction myths and safe use</p>
              </Link>
              <Link href="/guides/leopard-gecko-heating-guide" onClick={() => analytics.trackNavClick("guide-leopard-heating-guide")} className="group p-4 rounded-lg card-warm hover:bg-slate-800/60 transition-all">
                <h5 className="text-lg font-semibold text-slate-200 mb-1">Leopard Gecko Heating Guide</h5>
                <p className="text-sm text-slate-400">Warm hide targets and gradient setup</p>
              </Link>
            </div>

            <h4 className="text-base font-semibold text-white mb-1">Betta Fish Setup Help</h4>
            <p className="text-sm text-slate-400 mb-3">Heating, tank size, and water stability for betta fish.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
              <Link href="/guides/betta-setup" onClick={() => analytics.trackNavClick("guide-betta")} className="group p-4 rounded-lg card-warm hover:bg-slate-800/60 transition-all">
                <h5 className="text-lg font-semibold text-slate-200 mb-1">Betta Fish Setup Guide</h5>
                <p className="text-sm text-slate-400">Complete tank setup essentials</p>
              </Link>
              <Link href="/guides/betta-fish-tank-size" onClick={() => analytics.trackNavClick("guide-betta-tank-size")} className="group p-4 rounded-lg card-warm hover:bg-slate-800/60 transition-all">
                <h5 className="text-lg font-semibold text-slate-200 mb-1">Betta Fish Tank Size Guide</h5>
                <p className="text-sm text-slate-400">Why 5+ gallons matters</p>
              </Link>
              <Link href="/guides/betta-heater-size" onClick={() => analytics.trackNavClick("guide-betta-heater-size")} className="group p-4 rounded-lg card-warm hover:bg-slate-800/60 transition-all">
                <h5 className="text-lg font-semibold text-slate-200 mb-1">Betta Fish Heater Size Guide</h5>
                <p className="text-sm text-slate-400">Wattage by tank volume</p>
              </Link>
              <Link href="/guides/betta-temperature-guide" onClick={() => analytics.trackNavClick("guide-betta-temperature-guide")} className="group p-4 rounded-lg card-warm hover:bg-slate-800/60 transition-all">
                <h5 className="text-lg font-semibold text-slate-200 mb-1">Betta Fish Temperature Guide</h5>
                <p className="text-sm text-slate-400">Stable 78-80°F rules</p>
              </Link>
              <Link href="/guides/betta-tank-cycling" onClick={() => analytics.trackNavClick("guide-betta-tank-cycling")} className="group p-4 rounded-lg card-warm hover:bg-slate-800/60 transition-all">
                <h5 className="text-lg font-semibold text-slate-200 mb-1">Betta Fish Tank Cycling Guide</h5>
                <p className="text-sm text-slate-400">Nitrogen cycle and safe stocking timing</p>
              </Link>
            </div>

            <h4 className="text-base font-semibold text-white mb-1">Bearded Dragon Setup Help</h4>
            <p className="text-sm text-slate-400 mb-3">Lighting, heating, and full habitat setup for bearded dragons.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Link href="/guides/bearded-dragon-care" onClick={() => analytics.trackNavClick("guide-bearded-dragon")} className="group p-4 rounded-lg card-warm hover:bg-slate-800/60 transition-all">
                <h5 className="text-lg font-semibold text-slate-200 mb-1">Bearded Dragon Care Guide</h5>
                <p className="text-sm text-slate-400">Core care standards and essentials</p>
              </Link>
              <Link href="/guides/bearded-dragon-tank-setup" onClick={() => analytics.trackNavClick("guide-bearded-dragon-tank")} className="group p-4 rounded-lg card-warm hover:bg-slate-800/60 transition-all">
                <h5 className="text-lg font-semibold text-slate-200 mb-1">Bearded Dragon Tank Setup Guide</h5>
                <p className="text-sm text-slate-400">4x2x2 layout and gradient design</p>
              </Link>
              <Link href="/guides/bearded-dragon-lighting-uvb" onClick={() => analytics.trackNavClick("guide-bearded-dragon-uvb")} className="group p-4 rounded-lg card-warm hover:bg-slate-800/60 transition-all">
                <h5 className="text-lg font-semibold text-slate-200 mb-1">Bearded Dragon Lighting & UVB Guide</h5>
                <p className="text-sm text-slate-400">T5 UVB and basking lighting rules</p>
              </Link>
              <Link href="/guides/bearded-dragon-feeding" onClick={() => analytics.trackNavClick("guide-bearded-feeding")} className="group p-4 rounded-lg card-warm hover:bg-slate-800/60 transition-all">
                <h5 className="text-lg font-semibold text-slate-200 mb-1">Bearded Dragon Feeding Guide</h5>
                <p className="text-sm text-slate-400">Diet, insects, greens, and feeding schedules</p>
              </Link>
              <Link href="/guides/bearded-dragon-basking-temp" onClick={() => analytics.trackNavClick("guide-bearded-dragon-basking-temp")} className="group p-4 rounded-lg card-warm hover:bg-slate-800/60 transition-all">
                <h5 className="text-lg font-semibold text-slate-200 mb-1">Bearded Dragon Basking Temperature Guide</h5>
                <p className="text-sm text-slate-400">105-110°F surface temp and measurement</p>
              </Link>
              <Link href="/guides/bearded-dragon-uvb-distance" onClick={() => analytics.trackNavClick("guide-bearded-dragon-uvb-distance")} className="group p-4 rounded-lg card-warm hover:bg-slate-800/60 transition-all">
                <h5 className="text-lg font-semibold text-slate-200 mb-1">Bearded Dragon UVB Distance Guide</h5>
                <p className="text-sm text-slate-400">Placement ranges and screen-top impact</p>
              </Link>
            </div>

            <div className="text-center pt-5">
              <Link
                href="/setup-help"
                onClick={() => analytics.trackNavClick("setup-help-hub-link")}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900/60 hover:bg-slate-900/80 border border-white/10 text-white font-bold transition-all"
              >
                View All Setup Help <ArrowRight size={18} />
              </Link>
            </div>
          </div>

          {/* Avoid These Mistakes */}
          <div className="mb-8">
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-4">Avoid These Mistakes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Link
                href="/guides/leopard-gecko-not-eating"
                onClick={() => analytics.trackNavClick("guide-gecko-not-eating")}
                className="group p-4 rounded-lg card-warm hover:bg-slate-800/60 transition-all"
              >
                <h4 className="text-lg font-semibold text-slate-200 mb-1">Gecko Not Eating?</h4>
                <p className="text-sm text-slate-400">Causes and solutions</p>
              </Link>
              <Link
                href="/common-mistakes"
                onClick={() => analytics.trackNavClick("common-mistakes")}
                className="group p-4 rounded-lg card-warm hover:bg-slate-800/60 transition-all"
              >
                <h4 className="text-lg font-semibold text-slate-200 mb-1">Common Mistakes</h4>
                <p className="text-sm text-slate-400">Learn what NOT to do</p>
              </Link>
              <Link
                href="/guides/bearded-dragon-mistakes"
                onClick={() => analytics.trackNavClick("guide-bearded-dragon-mistakes")}
                className="group p-4 rounded-lg card-warm hover:bg-slate-800/60 transition-all"
              >
                <h4 className="text-lg font-semibold text-slate-200 mb-1">Bearded Dragon Mistakes</h4>
                <p className="text-sm text-slate-400">Bad setups and how to fix them</p>
              </Link>
            </div>
          </div>

          {/* Bridge CTA */}
          <div className="text-center pt-4 border-t border-slate-700/50">
            <p className="text-sm text-slate-400 mb-4">Still unsure? The builder walks you through this step by step.</p>
            <Link
              href="/build/leopard-gecko"
              onClick={() => analytics.trackNavClick("guide-cta-builder")}
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-full transition-all hover:scale-105 text-sm"
            >
              Start the Habitat Builder <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* --- QUICK LINKS TO EDUCATIONAL CONTENT --- */}
        <div className="w-full max-w-4xl mx-auto mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              href="/care-sheets"
              onClick={() => analytics.trackNavClick("care-sheets")}
              className="group p-6 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Care Sheets</h3>
                  <p className="text-sm text-slate-300">Quick reference guides for temperature, humidity, and daily care</p>
                </div>
                <ArrowUpRight className="text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" size={24} />
              </div>
            </Link>
            
            <Link
              href="/common-mistakes"
              onClick={() => analytics.trackNavClick("common-mistakes")}
              className="group p-6 rounded-2xl bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 hover:border-red-500/40 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Complete Safety Guide</h3>
                  <p className="text-sm text-slate-300">Deep dive into dangerous practices and how to avoid them</p>
                </div>
                <ArrowUpRight className="text-red-400 opacity-0 group-hover:opacity-100 transition-opacity" size={24} />
              </div>
            </Link>
          </div>
        </div>

        {/* --- COMING SOON SECTION --- */}
        <div className="w-full mb-16">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">Coming Soon</h2>
            <p className="text-slate-400">More species builders in development</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-700/50 backdrop-blur-sm text-center opacity-60">
              <div className="text-3xl mb-2">🐍</div>
              <p className="text-sm font-semibold text-slate-300">Ball Python</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-700/50 backdrop-blur-sm text-center opacity-60">
              <div className="text-3xl mb-2">🦎</div>
              <p className="text-sm font-semibold text-slate-300">Crested Gecko</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-700/50 backdrop-blur-sm text-center opacity-60">
              <div className="text-3xl mb-2">🐢</div>
              <p className="text-sm font-semibold text-slate-300">Red-Eared Slider</p>
            </div>
          </div>
        </div>

        {/* --- TESTIMONIALS / SOCIAL PROOF --- */}
        <div className="w-full mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Why Research-Backed Matters</h2>
            <p className="text-slate-400">Built on peer-reviewed studies, not pet store myths</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-slate-900/40 border border-emerald-500/20 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="text-emerald-400" size={20} />
                <span className="text-sm font-bold text-emerald-400">Verified Safe</span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                "Finally, a builder that blocks dangerous products like heat rocks and calcium sand. No more guessing what's safe."
              </p>
              <p className="text-xs text-slate-500 mt-3">— Reptile keeper, 8 years</p>
            </div>
            
            <div className="p-6 rounded-xl bg-slate-900/40 border border-blue-500/20 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="text-blue-400" size={20} />
                <span className="text-sm font-bold text-blue-400">Compatibility Checks</span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                "The builder caught that my tank was too small and my heater was wrong. Saved me from making expensive mistakes."
              </p>
              <p className="text-xs text-slate-500 mt-3">— First-time betta owner</p>
            </div>
            
            <div className="p-6 rounded-xl bg-slate-900/40 border border-purple-500/20 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="text-purple-400" size={20} />
                <span className="text-sm font-bold text-purple-400">Complete Lists</span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                "I didn't realize I needed a thermostat until the builder required it. Now my gecko's temps are perfect."
              </p>
              <p className="text-xs text-slate-500 mt-3">— Leopard gecko owner</p>
            </div>
          </div>
        </div>

        {/* Disclaimer Footer */}
        <p className="mt-20 text-xs text-slate-500 text-center max-w-lg opacity-60 mix-blend-plus-lighter">
          * This builder provides general care guidelines. Always research specific needs from multiple reputable sources before purchasing an animal.
        </p>
      </div>
    </main>
    <Footer />
  </>
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
  const lower = title.toLowerCase();
  const species = lower.includes("betta")
    ? "betta"
    : lower.includes("bearded")
      ? "bearded-dragon"
      : "leopard-gecko";
  
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
          Start {title} Setup <ArrowRight size={20} />
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