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
  CheckCircle2,
  HelpCircle
} from "lucide-react";

import Footer from "../../components/Footer";
import { FAQSchema } from "../../components/StructuredData";

export default function BettaGuidePage() {
  const faqs = [
    {
      question: "What size tank does a betta fish need?",
      answer: "A betta fish needs a minimum of 5 gallons, but 10 gallons is recommended for easier maintenance and better water quality. Larger tanks are more stable and provide more swimming space for your betta."
    },
    {
      question: "Do betta fish need a heater?",
      answer: "Yes, betta fish absolutely need a heater. They are tropical fish and require water temperature between 78-80°F (25.5-26.5°C). Room temperature water is usually too cold and can cause stress, lethargy, and illness."
    },
    {
      question: "What filter is best for betta fish?",
      answer: "Sponge filters are the best choice for betta fish. They provide gentle filtration and aeration without creating strong currents that can stress bettas. Avoid high-flow hang-on-back filters that can blow your betta around the tank."
    },
    {
      question: "Can betta fish live in bowls?",
      answer: "No, betta fish cannot live in bowls. Bowls are too small (usually less than 1 gallon), cannot maintain proper temperature, and cannot support a filter. This leads to ammonia poisoning and a slow, painful death. A minimum 5-gallon tank with heater and filter is essential."
    },
    {
      question: "What temperature should a betta fish tank be?",
      answer: "Betta fish need water temperature between 78-80°F (25.5-26.5°C) at all times. Use an adjustable aquarium heater set to maintain this temperature range. Use the '5 watts per gallon' rule to choose the right heater size."
    },
    {
      question: "How do I set up a betta fish tank for beginners?",
      answer: "Start with a 5-10 gallon tank, adjustable heater (5 watts per gallon), sponge filter, water conditioner, API Master Test Kit, smooth substrate, silk or live plants, and a betta hammock. Most importantly, cycle your tank before adding your betta to establish beneficial bacteria."
    },
    {
      question: "Do betta fish need a filter?",
      answer: "Yes, betta fish need a filter to maintain water quality. The filter removes waste, provides biological filtration, and helps oxygenate the water. A sponge filter is ideal as it provides gentle filtration without strong currents."
    },
    {
      question: "What do I need for a complete betta fish setup?",
      answer: "A complete betta fish setup includes: 5-10 gallon tank with lid, adjustable heater (5 watts per gallon), sponge filter, water conditioner, API Master Test Kit, smooth substrate, silk or live plants, betta hammock or floating log, and proper lighting. Don't forget to cycle the tank before adding your betta!"
    },
    {
      question: "Can I skip this guide and just use the builder?",
      answer: "Yes. The builder applies these same principles and prevents incompatible or unsafe selections. It walks you through each step with safety checks and compatibility verification, so you can build a safe habitat without reading every detail."
    }
  ];

  return (
    <>
      <FAQSchema faqs={faqs} />
      <main className="min-h-screen pt-28 pb-20 px-6 relative z-10">
        
        {/* --- BACK TO HUB BUTTON --- */}
        <div className="max-w-4xl mx-auto mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-medium text-base group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back to Hub
          </Link>
        </div>

        {/* --- HERO SECTION --- */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4 drop-shadow-lg leading-tight">
            Complete Betta Fish Tank Setup Guide <span className="text-blue-400 text-3xl md:text-4xl font-semibold">(Beginner Friendly)</span>
          </h1>
          <h2 className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto mb-6">
            Tank size, filtration, heating, cycling, and essential equipment explained step by step.
          </h2>
          
          <p className="text-base text-slate-400 leading-relaxed max-w-2xl mx-auto mb-8">
            If you want a full explanation, read on. If you want a safe setup fast, the builder handles this step by step.
          </p>
          
          <div className="mt-6">
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
            title="1. Betta Fish Tank Size & Requirements"
          >
            <p className="text-slate-300 mb-4">
              The "puddle myth" is false. While Bettas can survive in small cups briefly, they are at high risk of ammonia poisoning in tanks smaller than 5 gallons.
            </p>
            <ul className="space-y-3">
              <GuidePoint><strong>Minimum Size:</strong> 5 Gallons is the absolute minimum. 10 Gallons is easier to maintain.</GuidePoint>
              <GuidePoint><strong>Shape:</strong> Long and shallow is better than tall. Bettas need to reach the surface to breathe.</GuidePoint>
              <GuidePoint><strong>Lid Required:</strong> Bettas are excellent jumpers. A tight-fitting lid is mandatory.</GuidePoint>
            </ul>
            
            {/* Contextual Builder CTA */}
            <div className="mt-6 pt-6 border-t border-slate-700">
              <p className="text-sm text-slate-400 mb-3">Not sure which tank size fits your space?</p>
              <Link
                href="/build/betta"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 hover:border-blue-500/50 text-blue-300 text-sm font-semibold rounded-lg transition-all"
              >
                Build a Betta Tank Setup <ArrowRight size={16} />
              </Link>
            </div>
          </GuideSection>

          {/* 2. Heating */}
          <GuideSection 
            Icon={Thermometer} 
            iconColor="#fb923c" // Orange
            title="2. Betta Fish Heater: Temperature Requirements"
          >
            <p className="text-slate-300 mb-4">
              Bettas are tropical fish. Room temperature water is almost always too cold, causing lethargy and immune system failure.
            </p>
            <ul className="space-y-3">
              <GuidePoint><strong>🔥 Heat & Temperature:</strong> Maintain a steady 78°F - 80°F (25.5°C - 26.5°C) at all times.</GuidePoint>
              <GuidePoint><strong>Wattage:</strong> Use the "5 Watts per Gallon" rule (e.g., a 50W heater for a 10-gallon tank).</GuidePoint>
              <GuidePoint><strong>Adjustable:</strong> Avoid pre-set heaters. Buy one with a dial so you can control the temperature precisely.</GuidePoint>
            </ul>
            
            {/* Contextual Builder CTA */}
            <div className="mt-6 pt-6 border-t border-slate-700">
              <p className="text-sm text-slate-400 mb-3">Heating mistakes are the #1 cause of health issues.</p>
              <Link
                href="/build/betta"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 hover:border-blue-500/50 text-blue-300 text-sm font-semibold rounded-lg transition-all"
              >
                Let the builder choose compatible heating safely <ArrowRight size={16} />
              </Link>
            </div>
          </GuideSection>

          {/* 3. Filtration & Flow */}
          <GuideSection 
            Icon={Waves} 
            iconColor="#2dd4bf" // Teal/Cyan
            title="3. Betta Fish Filter: Low-Flow Options"
          >
            <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-xl mb-4 flex items-start gap-3">
              <span className="text-2xl shrink-0">⚠️</span>
              <div>
                <p className="text-red-200 text-sm font-semibold mb-1">⚠️ Safety Warning</p>
                <p className="text-red-200 text-sm leading-relaxed mb-2">
                  You must "Cycle" your tank (grow beneficial bacteria) before adding the fish, or ammonia levels will kill them.
                </p>
                <p className="text-red-200 text-sm leading-relaxed">
                  Cycling means establishing beneficial bacteria that process toxic ammonia into safer compounds.
                </p>
              </div>
            </div>
            <p className="text-slate-300 mb-4">
              Bettas have long, heavy fins that make swimming against currents difficult. They need clean water with very gentle flow.
            </p>
            <ul className="space-y-3">
              <GuidePoint><strong>Best Filter:</strong> A Sponge Filter is the gold standard. It provides aeration and biological filtration with zero dangerous suction.</GuidePoint>
              <GuidePoint><strong>Avoid:</strong> High-flow Hang-on-Back filters can blow your Betta around the tank, causing stress and fin rot.</GuidePoint>
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
              <GuidePoint alert><strong>❌ Avoid:</strong> Plastic plants with sharp edges. Smooth gravel or sand is preferred for substrate.</GuidePoint>
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
              <GuidePoint><strong>Dechlorinator:</strong> You MUST use a water conditioner (such as Seachem Prime) with every water change.</GuidePoint>
              <GuidePoint><strong>Testing:</strong> Own an API Master Test Kit. Test strips are notoriously inaccurate.</GuidePoint>
              <GuidePoint><strong>Maintenance:</strong> Perform a 20-30% partial water change once a week. Never change 100% of the water at once.</GuidePoint>
            </ul>
          </GuideSection>

        </div>

        {/* --- FAQ SECTION --- */}
        <div className="max-w-4xl mx-auto mt-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-400 text-lg">
              Common questions about betta fish tank setup and care
            </p>
          </div>
          
          <div className="space-y-4">
            <FAQItem 
              question="What size tank does a betta fish need?"
              answer="A betta fish needs a minimum of 5 gallons, but 10 gallons is recommended for easier maintenance and better water quality. Larger tanks are more stable and provide more swimming space for your betta."
            />
            <FAQItem 
              question="Do betta fish need a heater?"
              answer="Yes, betta fish absolutely need a heater. They are tropical fish and require water temperature between 78-80°F (25.5-26.5°C). Room temperature water is usually too cold and can cause stress, lethargy, and illness."
            />
            <FAQItem 
              question="What filter is best for betta fish?"
              answer="Sponge filters are the best choice for betta fish. They provide gentle filtration and aeration without creating strong currents that can stress bettas. Avoid high-flow hang-on-back filters that can blow your betta around the tank."
            />
            <FAQItem 
              question="Can betta fish live in bowls?"
              answer="No, betta fish cannot live in bowls. Bowls are too small (usually less than 1 gallon), cannot maintain proper temperature, and cannot support a filter. This leads to ammonia poisoning and a slow, painful death. A minimum 5-gallon tank with heater and filter is essential."
            />
            <FAQItem 
              question="What temperature should a betta fish tank be?"
              answer="Betta fish need water temperature between 78-80°F (25.5-26.5°C) at all times. Use an adjustable aquarium heater set to maintain this temperature range. Use the '5 watts per gallon' rule to choose the right heater size."
            />
            <FAQItem 
              question="How do I set up a betta fish tank for beginners?"
              answer="Start with a 5-10 gallon tank, adjustable heater (5 watts per gallon), sponge filter, water conditioner, API Master Test Kit, smooth substrate, silk or live plants, and a betta hammock. Most importantly, cycle your tank before adding your betta to establish beneficial bacteria."
            />
            <FAQItem 
              question="Do betta fish need a filter?"
              answer="Yes, betta fish need a filter to maintain water quality. The filter removes waste, provides biological filtration, and helps oxygenate the water. A sponge filter is ideal as it provides gentle filtration without strong currents."
            />
            <FAQItem 
              question="What do I need for a complete betta fish setup?"
              answer="A complete betta fish setup includes: 5-10 gallon tank with lid, adjustable heater (5 watts per gallon), sponge filter, water conditioner, API Master Test Kit, smooth substrate, silk or live plants, betta hammock or floating log, and proper lighting. Don't forget to cycle the tank before adding your betta!"
            />
            <FAQItem 
              question="Can I skip this guide and just use the builder?"
              answer="Yes. The builder applies these same principles and prevents incompatible or unsafe selections. It walks you through each step with safety checks and compatibility verification, so you can build a safe habitat without reading every detail."
            />
          </div>
        </div>

        {/* --- RELATED RESOURCES --- */}
        <div className="max-w-4xl mx-auto mt-20 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Related Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/build/betta"
              className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 hover:border-blue-500/40 transition-all text-center"
            >
              <h3 className="text-sm font-bold text-white mb-1">Interactive Builder</h3>
              <p className="text-xs text-slate-400">Build your setup</p>
            </Link>
            <Link
              href="/care-sheets"
              className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 hover:border-blue-500/40 transition-all text-center"
            >
              <h3 className="text-sm font-bold text-white mb-1">Care Sheets</h3>
              <p className="text-xs text-slate-400">Quick reference</p>
            </Link>
            <Link
              href="/common-mistakes"
              className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 hover:border-blue-500/40 transition-all text-center"
            >
              <h3 className="text-sm font-bold text-white mb-1">Common Mistakes</h3>
              <p className="text-xs text-slate-400">Avoid dangers</p>
            </Link>
          </div>
        </div>

        {/* --- CTA --- */}
        <div className="max-w-4xl mx-auto text-center mt-12">
          <h2 className="text-3xl font-black text-white mb-6">
            Ready to build it without guesswork?
          </h2>
          <p className="text-slate-300 leading-relaxed max-w-2xl mx-auto mb-10">
            Our builder applies these principles automatically and checks compatibility as you go.
          </p>
          
          <Link
            href="/build/betta"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 md:px-10 md:py-5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full transition-all hover:scale-105 shadow-xl shadow-blue-900/30 text-sm md:text-lg whitespace-nowrap"
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
    <section className="bg-slate-800 p-8 rounded-3xl border border-slate-700 shadow-lg">
      <div className="flex items-center gap-4 mb-6 border-b border-slate-700 pb-4">
        <div className="p-3 bg-slate-900/50 rounded-2xl border border-slate-700 shadow-inner">
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

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = React.useState(false);
  
  return (
    <div className="bg-slate-900/50 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-900/30 transition-colors"
        aria-expanded={isOpen}
      >
        <h3 className="text-lg font-bold text-white pr-4">{question}</h3>
        <HelpCircle 
          size={20} 
          className={`text-blue-400 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>
      {isOpen && (
        <div className="px-6 pb-4">
          <p className="text-slate-300 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}