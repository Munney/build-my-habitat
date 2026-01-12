"use client";

import React from "react";
import Link from "next/link";
import { 
  Box, 
  AlertTriangle,
  CheckCircle2,
  ArrowRight, 
  ArrowLeft,
  HelpCircle,
  ShieldAlert,
  Droplets,
  Thermometer,
  Waves
} from "lucide-react";
import Footer from "../../components/Footer";
import { FAQSchema } from "../../components/StructuredData";

export default function BettaTankSizePage() {
  const faqs = [
    {
      question: "What is the minimum tank size for a betta fish?",
      answer: "The absolute minimum tank size for a betta fish is 5 gallons. However, 10 gallons is highly recommended as it's easier to maintain stable water parameters and provides more swimming space. Larger tanks (15-20 gallons) are even better and provide more room for enrichment."
    },
    {
      question: "Can betta fish live in a bowl?",
      answer: "No, betta fish cannot live in bowls. Bowls are typically less than 1 gallon, cannot support a filter or heater, and cannot maintain stable water parameters. This leads to ammonia poisoning, temperature fluctuations, and a slow, painful death. A minimum 5-gallon tank with heater and filter is essential for betta health."
    },
    {
      question: "Why do betta fish need at least 5 gallons?",
      answer: "Betta fish need at least 5 gallons because: 1) Smaller volumes cannot maintain stable water parameters (ammonia builds up quickly), 2) There's not enough space for proper filtration and heating, 3) Betta fish are active swimmers and need room to move, 4) Larger volumes are more stable and easier to maintain, reducing stress and illness."
    },
    {
      question: "Is a 3-gallon tank okay for a betta fish?",
      answer: "No, a 3-gallon tank is too small for a betta fish. While it's better than a bowl, it's still too small to maintain stable water parameters. Ammonia builds up quickly in small volumes, and there's not enough space for proper filtration. The minimum is 5 gallons, with 10 gallons being much better."
    },
    {
      question: "What size tank is best for a betta fish?",
      answer: "A 10-gallon tank is ideal for a betta fish. It's large enough to maintain stable water parameters, provides plenty of swimming space, allows for proper filtration and heating, and is easier to maintain than smaller tanks. Larger tanks (15-20 gallons) are even better and allow for more enrichment."
    },
    {
      question: "Can I keep a betta fish in a 1-gallon tank?",
      answer: "Absolutely not. A 1-gallon tank (or bowl) is far too small for a betta fish. It cannot support a filter or heater, cannot maintain stable water parameters, and will lead to ammonia poisoning and death. This is animal cruelty. The minimum is 5 gallons with proper filtration and heating."
    },
    {
      question: "How does tank size affect betta fish health?",
      answer: "Tank size directly affects betta fish health: 1) Larger tanks maintain stable water parameters better, 2) More space reduces stress and aggression, 3) Proper filtration requires adequate volume, 4) Temperature stability is easier in larger tanks, 5) More room allows for enrichment and natural behaviors. Small tanks lead to stress, illness, and premature death."
    },
    {
      question: "What happens if a betta fish tank is too small?",
      answer: "If a betta fish tank is too small, you'll see: 1) Rapid ammonia buildup (toxic to fish), 2) Temperature fluctuations (stress and illness), 3) Inability to support proper filtration, 4) Increased stress and lethargy, 5) Fin rot and other diseases, 6) Reduced lifespan (bettas can live 3-5 years in proper setups, but often die within months in small tanks)."
    }
  ];

  return (
    <>
      <FAQSchema faqs={faqs} />
      <main className="min-h-screen pt-28 pb-20 px-6 relative z-10">
        
        {/* Back Button */}
        <div className="max-w-4xl mx-auto mb-8">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-medium text-sm group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </div>

        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-6">
            Complete Guide
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 drop-shadow-lg leading-tight">
            Betta Fish Tank Size Guide 2025
          </h1>
          <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Learn why betta fish need at least 5 gallons, why bowls are dangerous, and what size tank is best for your betta's health and happiness.
          </p>
        </div>

        {/* Critical Warning */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-red-500/10 border-2 border-red-500/30 p-6 rounded-2xl flex items-start gap-4">
            <ShieldAlert size={32} className="text-red-400 shrink-0" />
            <div>
              <h2 className="text-2xl font-bold text-red-400 mb-3">⚠️ Bowls Are Not Suitable for Betta Fish</h2>
              <p className="text-red-200 leading-relaxed mb-3">
                Despite common myths, betta fish <strong>cannot</strong> live in bowls. Bowls are too small, cannot support filtration or heating, and lead to ammonia poisoning and death. The minimum tank size is <strong>5 gallons</strong> with proper filtration and heating.
              </p>
              <p className="text-red-200 leading-relaxed">
                Research shows that bettas in larger, furnished tanks are more active, exhibit fewer abnormal behaviors, and live longer than those in small containers.
              </p>
            </div>
          </div>
        </div>

        {/* Guide Sections */}
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Minimum Tank Size */}
          <GuideSection 
            Icon={Box} 
            iconColor="#60a5fa"
            title="1. Minimum Tank Size: 5 Gallons"
          >
            <p className="text-slate-300 mb-4">
              The absolute minimum tank size for a betta fish is <strong className="text-white">5 gallons</strong>. This is not a recommendation—it's the bare minimum needed to maintain stable water parameters and support proper filtration and heating.
            </p>
            <ul className="space-y-3">
              <GuidePoint>
                <strong>Why 5 Gallons?</strong> Smaller tanks cannot maintain stable water chemistry. Ammonia builds up quickly in small volumes, and there's not enough water to dilute waste products.
              </GuidePoint>
              <GuidePoint>
                <strong>Filtration Requirements:</strong> A proper filter needs adequate water volume to function effectively. Most filters require at least 5 gallons to work properly.
              </GuidePoint>
              <GuidePoint>
                <strong>Heating Requirements:</strong> A heater needs enough water volume to maintain stable temperature. In tanks smaller than 5 gallons, temperature fluctuates dramatically.
              </GuidePoint>
              <GuidePoint alert>
                <strong>Smaller Than 5 Gallons:</strong> Tanks smaller than 5 gallons cannot support proper filtration and heating, leading to stress, illness, and premature death.
              </GuidePoint>
            </ul>
          </GuideSection>

          {/* Recommended Tank Size */}
          <GuideSection 
            Icon={CheckCircle2} 
            iconColor="#34d399"
            title="2. Recommended Tank Size: 10 Gallons"
          >
            <p className="text-slate-300 mb-4">
              While 5 gallons is the minimum, <strong className="text-white">10 gallons is highly recommended</strong> for betta fish. Larger tanks are easier to maintain, more stable, and provide better quality of life.
            </p>
            <ul className="space-y-3">
              <GuidePoint>
                <strong>Water Stability:</strong> Larger volumes maintain stable water parameters more easily. Ammonia spikes are less likely, and water quality stays consistent.
              </GuidePoint>
              <GuidePoint>
                <strong>Easier Maintenance:</strong> Larger tanks require less frequent water changes and are more forgiving of minor mistakes.
              </GuidePoint>
              <GuidePoint>
                <strong>More Swimming Space:</strong> Betta fish are active swimmers. A 10-gallon tank provides room for natural behaviors and exercise.
              </GuidePoint>
              <GuidePoint>
                <strong>Enrichment Options:</strong> Larger tanks allow for more plants, decor, and enrichment items, improving your betta's quality of life.
              </GuidePoint>
            </ul>
          </GuideSection>

          {/* Why Bowls Are Dangerous */}
          <GuideSection 
            Icon={AlertTriangle} 
            iconColor="#f87171"
            title="3. Why Bowls Are Dangerous"
          >
            <p className="text-slate-300 mb-4">
              Despite the common myth that betta fish can live in bowls, this is <strong className="text-red-400">completely false and dangerous</strong>. Research shows that bettas in small containers suffer from stress, illness, and premature death.
            </p>
            <ul className="space-y-3">
              <GuidePoint alert>
                <strong>Ammonia Poisoning:</strong> Bowls cannot support filtration, so ammonia from fish waste builds up quickly. Ammonia is toxic and causes burns, stress, and death.
              </GuidePoint>
              <GuidePoint alert>
                <strong>Temperature Fluctuations:</strong> Bowls cannot support heaters, so water temperature fluctuates with room temperature. Bettas are tropical fish and need stable 78-80°F temperatures.
              </GuidePoint>
              <GuidePoint alert>
                <strong>No Filtration:</strong> Without filtration, water quality deteriorates rapidly. Beneficial bacteria cannot establish, and waste accumulates.
              </GuidePoint>
              <GuidePoint alert>
                <strong>Stress and Illness:</strong> Small containers cause extreme stress, leading to fin rot, lethargy, and a suppressed immune system.
              </GuidePoint>
              <GuidePoint>
                <strong>Research Evidence:</strong> Studies show that bettas in larger, furnished tanks are more active, exhibit fewer abnormal behaviors, and live significantly longer than those in small containers.
              </GuidePoint>
            </ul>
          </GuideSection>

          {/* Tank Shape Considerations */}
          <GuideSection 
            Icon={Droplets} 
            iconColor="#22d3ee"
            title="4. Tank Shape: Long vs Tall"
          >
            <p className="text-slate-300 mb-4">
              Tank shape matters for betta fish. <strong className="text-white">Long, shallow tanks are better than tall tanks</strong> because bettas need to reach the surface to breathe air.
            </p>
            <ul className="space-y-3">
              <GuidePoint>
                <strong>Long Tanks (Recommended):</strong> Tanks that are longer and shallower provide more surface area for oxygen exchange and easier access to the surface for breathing.
              </GuidePoint>
              <GuidePoint>
                <strong>Tall Tanks (Not Ideal):</strong> Very tall tanks make it difficult for bettas to reach the surface, especially if they have long fins. This can cause stress and exhaustion.
              </GuidePoint>
              <GuidePoint>
                <strong>Surface Area:</strong> More surface area means better oxygen exchange and easier breathing for your betta.
              </GuidePoint>
              <GuidePoint>
                <strong>Lid Required:</strong> Regardless of shape, bettas are excellent jumpers. A tight-fitting lid is mandatory to prevent escape.
              </GuidePoint>
            </ul>
          </GuideSection>

          {/* Tank Setup Requirements */}
          <GuideSection 
            Icon={Waves} 
            iconColor="#a78bfa"
            title="5. Complete Tank Setup Requirements"
          >
            <p className="text-slate-300 mb-4">
              A proper betta fish tank setup includes more than just the tank. Here's what you need for a complete, healthy setup:
            </p>
            <ul className="space-y-3">
              <GuidePoint>
                <strong>Tank:</strong> Minimum 5 gallons (10 gallons recommended), with a tight-fitting lid
              </GuidePoint>
              <GuidePoint>
                <strong>Heater:</strong> Adjustable heater set to 78-80°F (5 watts per gallon rule)
              </GuidePoint>
              <GuidePoint>
                <strong>Filter:</strong> Sponge filter or low-flow filter (bettas don't like strong currents)
              </GuidePoint>
              <GuidePoint>
                <strong>Substrate:</strong> Smooth gravel or sand (avoid sharp edges)
              </GuidePoint>
              <GuidePoint>
                <strong>Plants:</strong> Silk or live plants (never plastic - they can rip fins)
              </GuidePoint>
              <GuidePoint>
                <strong>Hides:</strong> Betta hammock, floating log, or other resting spots near the surface
              </GuidePoint>
              <GuidePoint>
                <strong>Water Conditioner:</strong> Seachem Prime or similar to remove chlorine
              </GuidePoint>
              <GuidePoint>
                <strong>Test Kit:</strong> API Master Test Kit to monitor water parameters
              </GuidePoint>
            </ul>
          </GuideSection>

        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto mt-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-400 text-lg">
              Common questions about betta fish tank size
            </p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem 
                key={index}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </div>
        </div>

        {/* Related Resources */}
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
              href="/guides/betta-setup"
              className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 hover:border-blue-500/40 transition-all text-center"
            >
              <h3 className="text-sm font-bold text-white mb-1">Complete Setup Guide</h3>
              <p className="text-xs text-slate-400">Full guide</p>
            </Link>
            <Link
              href="/care-sheets"
              className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 hover:border-blue-500/40 transition-all text-center"
            >
              <h3 className="text-sm font-bold text-white mb-1">Care Sheets</h3>
              <p className="text-xs text-slate-400">Quick reference</p>
            </Link>
          </div>
        </div>

        {/* CTA */}
        <div className="max-w-4xl mx-auto text-center mt-12">
          <h2 className="text-3xl font-black text-white mb-6">
            Ready to Build Your Betta Tank?
          </h2>
          <p className="text-slate-300 leading-relaxed max-w-2xl mx-auto mb-10">
            Use our interactive builder to create a complete, safe betta fish setup with all the right equipment.
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

// Components
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

