"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image"; 
import { ArrowRight, ArrowUpRight, ShieldCheck, FileText } from "lucide-react";
import { analytics } from "./utils/analytics";
import { HowToSchema } from "./components/StructuredData";
import Footer from "./components/Footer";
import SafetyDisclaimer from "./components/SafetyDisclaimer";

export default function Home() {
  // HowTo structured data for the homepage
  const howToSteps = [
    {
      name: "Select Species",
      text: "Choose your pet (Leopard Gecko, Betta Fish, Bearded Dragon, Crested Gecko, or Ball Python) and your experience level (Beginner or Experienced)."
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
        <div className="text-center max-w-3xl mb-8 space-y-6 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-white/10 blur-[60px] rounded-full pointer-events-none" />
          
          {/* Trust Badge */}
          <div className="relative flex items-center justify-center gap-2 mb-4">
            <ShieldCheck className="text-emerald-400" size={20} />
            <span className="text-sm font-bold text-emerald-400 uppercase tracking-wider">
              Research-Backed
            </span>
          </div>
          
          <h1 className="relative text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.6)]">
            Build the Right Habitat. Backed by Science.
          </h1>
          <p className="relative text-lg md:text-xl text-slate-300 font-medium leading-relaxed drop-shadow-lg">
            Avoid dangerous products and bad advice. Our builder gives you a complete, research-verified setup in minutes.
          </p>
        </div>

        {/* How It Works */}
        <div className="w-full max-w-4xl mb-12 relative">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full mb-16">
          
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

          {/* CRESTED GECKO BUILDER */}
          <SpeciesCard 
            href="/build/crested-gecko"
            title="Crested Gecko"
            description="Build a tall tropical enclosure with proper humidity cycling, UVB lighting, and dense foliage for your arboreal gecko."
            imageSrc="/crested-gecko.jpg"
            buttonColor="bg-purple-600 hover:bg-purple-500"
            borderColor="group-hover:border-purple-500/50"
            glowColor="group-hover:shadow-[0_0_40px_-10px_rgba(147,51,234,0.35)]"
            titleColor="text-purple-300"
          />

          {/* BALL PYTHON BUILDER */}
          <SpeciesCard 
            href="/build/ball-python"
            title="Ball Python"
            description="Build a humidity-controlled enclosure with proper overhead heating, deep substrate, and essential hide setup."
            imageSrc="/ball-python.jpg"
            buttonColor="bg-amber-600 hover:bg-amber-500"
            borderColor="group-hover:border-amber-500/50"
            glowColor="group-hover:shadow-[0_0_40px_-10px_rgba(217,119,6,0.35)]"
            titleColor="text-amber-400"
          />

        </div>

        {/* --- SETUP HELP BY TOPIC --- */}
          <div className="w-full max-w-4xl mx-auto mb-16 text-center p-8 rounded-2xl border border-emerald-500/20 bg-gradient-to-r from-emerald-500/10 to-blue-500/10">
          <h2 className="text-2xl font-bold text-white mb-2">Setup Help by Topic</h2>
          <p className="text-slate-400 text-sm mb-6">Quick guides organized for leopard geckos, betta fish, and bearded dragons.</p>
          <Link
            href="/setup-help"
            onClick={() => analytics.trackNavClick("setup-help-hub-link")}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all text-sm"
          >
            Browse All Setup Guides <ArrowRight size={18} />
          </Link>
        </div>

        {/* --- QUICK LINKS TO EDUCATIONAL CONTENT --- */}
        <div className="w-full max-w-4xl mx-auto mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              href="/care-sheets"
              onClick={() => analytics.trackNavClick("care-sheets")}
              className="group p-6 rounded-2xl bg-gradient-to-r from-emerald-500/25 to-blue-500/25 border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300 hover:-translate-y-1"
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
              className="group p-6 rounded-2xl bg-gradient-to-r from-red-500/25 to-orange-500/25 border border-red-500/20 hover:border-red-500/40 transition-all duration-300 hover:-translate-y-1"
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
            <h2 className="text-2xl font-bold text-white mb-2">What's Next</h2>
            <p className="text-slate-400">More species builders in development — join the list to get notified.</p>
          </div>
          <div className="grid grid-cols-1 max-w-xs mx-auto mb-8">
            <div className="py-4 px-6 rounded-xl bg-slate-900/40 border border-slate-700/50 backdrop-blur-sm flex items-center gap-3">
              <div className="text-5xl">🐢</div>
              <p className="text-xs sm:text-sm font-semibold text-slate-300 leading-tight">Red-Eared Slider</p>
            </div>
          </div>
          <WaitlistForm />
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
                  <p className="text-sm text-slate-300">Explore published studies and welfare guidance behind recommendations</p>
                </div>
              </div>
              <ArrowUpRight className="text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" size={24} />
            </div>
          </Link>
        </div>

        {/* Disclaimer Footer */}
        <SafetyDisclaimer className="mt-8 max-w-2xl mx-auto opacity-80" />
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
      : lower.includes("crested")
        ? "crested-gecko"
        : lower.includes("ball python")
          ? "ball-python"
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
      <div className="-mt-px flex flex-col flex-grow p-8 pt-4">
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

function WaitlistForm() {
  const [email, setEmail] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  async function handleSubmit() {
    if (!email) return;
    try {
      await fetch("/api/email-capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "waitlist" }),
      });
    } catch {}
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="text-center py-4 text-emerald-400 font-semibold">
        ✓ You&apos;re on the list — we&apos;ll let you know when new species launch!
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        className="flex-1 px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
      />
      <button
        onClick={handleSubmit}
        className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all"
      >
        Notify Me
      </button>
    </div>
  );
}