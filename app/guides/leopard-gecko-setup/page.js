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
  CheckCircle2,
  HelpCircle
} from "lucide-react";

import Footer from "../../components/Footer";
import { FAQSchema } from "../../components/StructuredData";

export default function LeopardGeckoGuidePage() {
  const faqs = [
    {
      question: "What size tank does a leopard gecko need?",
      answer: "A leopard gecko needs a minimum of 20 gallons (20-gallon long tank), but a 40-gallon breeder tank is recommended for optimal health and well-being. The 40-gallon breeder provides enough space for proper temperature gradients and enrichment."
    },
    {
      question: "Do leopard geckos need UVB lighting?",
      answer: "While leopard geckos can survive without UVB, providing low-level UVB (2-5% UVB bulb) is beneficial for their health. It helps with calcium metabolism and mimics natural sunlight. However, proper supplementation is still essential."
    },
    {
      question: "What substrate is safe for leopard geckos?",
      answer: "Safe substrates include paper towels, slate tile, reptile carpet, or a 70/30 mix of organic topsoil and playsand. Avoid calcium sand, walnut shells, and wood chips as they pose impaction risks."
    },
    {
      question: "What heating is best for leopard geckos?",
      answer: "Halogen flood lamps or Deep Heat Projectors (DHP) are the best heating options for leopard geckos. They provide deep muscle penetration and mimic natural sunlight. Always use a thermostat to control temperature. Avoid heat rocks and heat mats."
    },
    {
      question: "What temperature should a leopard gecko tank be?",
      answer: "Leopard geckos need a temperature gradient: warm side 88-92°F (31-33°C) and cool side 70-75°F (21-24°C). This allows them to thermoregulate by moving between warm and cool areas."
    },
    {
      question: "How do I set up a leopard gecko tank for beginners?",
      answer: "Start with a 40-gallon breeder tank, halogen or DHP heating with a thermostat, safe substrate (paper towels for beginners), three hides (warm, cool, and moist), a water dish, calcium dish, and proper lighting. Use our interactive builder to get a complete shopping list."
    },
    {
      question: "Can leopard geckos live in a 10-gallon tank?",
      answer: "No, a 10-gallon tank is too small for a leopard gecko. The minimum is 20 gallons, but 40 gallons is recommended. Small tanks make it impossible to create proper temperature gradients and provide adequate enrichment."
    },
    {
      question: "What do I need for a complete leopard gecko setup?",
      answer: "A complete leopard gecko setup includes: 40-gallon breeder tank, halogen or DHP heating with thermostat, UVB lighting (optional but recommended), safe substrate, three hides (warm, cool, moist), water dish, calcium dish, supplements (calcium with D3, multivitamin), thermometer, and enrichment items (plants, branches, rocks)."
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
            Complete Leopard Gecko Setup Guide 2024
          </h1>
          <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Learn how to set up a leopard gecko tank the right way. This complete guide covers tank size, heating, substrate, lighting, and all essential equipment for a thriving leopard gecko habitat.
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
            title="1. Leopard Gecko Tank Size & Enclosure"
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
            title="2. Leopard Gecko Heating & Lighting Setup"
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
            title="3. Leopard Gecko Substrate: Safe Options"
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

        {/* --- FAQ SECTION --- */}
        <div className="max-w-4xl mx-auto mt-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-400 text-lg">
              Common questions about leopard gecko setup and care
            </p>
          </div>
          
          <div className="space-y-4">
            <FAQItem 
              question="What size tank does a leopard gecko need?"
              answer="A leopard gecko needs a minimum of 20 gallons (20-gallon long tank), but a 40-gallon breeder tank is recommended for optimal health and well-being. The 40-gallon breeder provides enough space for proper temperature gradients and enrichment."
            />
            <FAQItem 
              question="Do leopard geckos need UVB lighting?"
              answer="While leopard geckos can survive without UVB, providing low-level UVB (2-5% UVB bulb) is beneficial for their health. It helps with calcium metabolism and mimics natural sunlight. However, proper supplementation is still essential."
            />
            <FAQItem 
              question="What substrate is safe for leopard geckos?"
              answer="Safe substrates include paper towels, slate tile, reptile carpet, or a 70/30 mix of organic topsoil and playsand. Avoid calcium sand, walnut shells, and wood chips as they pose impaction risks."
            />
            <FAQItem 
              question="What heating is best for leopard geckos?"
              answer="Halogen flood lamps or Deep Heat Projectors (DHP) are the best heating options for leopard geckos. They provide deep muscle penetration and mimic natural sunlight. Always use a thermostat to control temperature. Avoid heat rocks and heat mats."
            />
            <FAQItem 
              question="What temperature should a leopard gecko tank be?"
              answer="Leopard geckos need a temperature gradient: warm side 88-92°F (31-33°C) and cool side 70-75°F (21-24°C). This allows them to thermoregulate by moving between warm and cool areas."
            />
            <FAQItem 
              question="How do I set up a leopard gecko tank for beginners?"
              answer="Start with a 40-gallon breeder tank, halogen or DHP heating with a thermostat, safe substrate (paper towels for beginners), three hides (warm, cool, and moist), a water dish, calcium dish, and proper lighting. Use our interactive builder to get a complete shopping list."
            />
            <FAQItem 
              question="Can leopard geckos live in a 10-gallon tank?"
              answer="No, a 10-gallon tank is too small for a leopard gecko. The minimum is 20 gallons, but 40 gallons is recommended. Small tanks make it impossible to create proper temperature gradients and provide adequate enrichment."
            />
            <FAQItem 
              question="What do I need for a complete leopard gecko setup?"
              answer="A complete leopard gecko setup includes: 40-gallon breeder tank, halogen or DHP heating with thermostat, UVB lighting (optional but recommended), safe substrate, three hides (warm, cool, moist), water dish, calcium dish, supplements (calcium with D3, multivitamin), thermometer, and enrichment items (plants, branches, rocks)."
            />
          </div>
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

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = React.useState(false);
  
  return (
    <div className="bg-slate-900/50 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
        aria-expanded={isOpen}
      >
        <h3 className="text-lg font-bold text-white pr-4">{question}</h3>
        <HelpCircle 
          size={20} 
          className={`text-emerald-400 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
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