"use client";

import React from "react";
import Link from "next/link";
import { 
  Waves, 
  AlertTriangle,
  CheckCircle2,
  ArrowRight, 
  ArrowLeft,
  HelpCircle,
  ShieldAlert,
  Settings,
  Droplets
} from "lucide-react";
import Footer from "../../components/Footer";
import { FAQSchema } from "../../components/StructuredData";

export default function BettaFilterPage() {
  const faqs = [
    {
      question: "Do betta fish need a filter?",
      answer: "Yes, betta fish absolutely need a filter. Filters remove waste, provide biological filtration (beneficial bacteria), and help oxygenate the water. Without a filter, ammonia builds up quickly, leading to poisoning and death. A filter is essential for maintaining water quality."
    },
    {
      question: "What filter is best for betta fish?",
      answer: "Sponge filters are the best choice for betta fish. They provide gentle filtration and aeration without creating strong currents that can stress bettas. Sponge filters are safe (no dangerous suction), easy to maintain, and perfect for betta tanks. Avoid high-flow hang-on-back filters that can blow bettas around."
    },
    {
      question: "Why do betta fish need low-flow filters?",
      answer: "Betta fish have long, heavy fins that make swimming against strong currents difficult. High-flow filters create currents that stress bettas, cause fin damage, and prevent them from resting. Low-flow filters (like sponge filters) provide filtration without dangerous currents, allowing bettas to swim and rest comfortably."
    },
    {
      question: "Can I use a hang-on-back filter for betta fish?",
      answer: "Hang-on-back (HOB) filters can work for betta fish if they have adjustable flow settings and you set them to the lowest flow. However, sponge filters are generally better because they're gentler and safer. If using a HOB filter, make sure it has flow control and position it to minimize current."
    },
    {
      question: "How do I set up a filter for a betta fish tank?",
      answer: "1) Choose a sponge filter (best) or low-flow HOB filter, 2) Install according to manufacturer instructions, 3) Set flow to minimum if adjustable, 4) Position to minimize current, 5) Cycle the tank before adding fish (establish beneficial bacteria), 6) Monitor water parameters regularly."
    },
    {
      question: "Do betta fish need a filter if I do water changes?",
      answer: "Yes, betta fish still need a filter even with regular water changes. Filters provide biological filtration (beneficial bacteria) that breaks down ammonia and nitrites. Water changes alone cannot replace this. A filter is essential for maintaining stable water quality between water changes."
    },
    {
      question: "What size filter do I need for a betta fish tank?",
      answer: "Choose a filter rated for your tank size. For a 5-gallon tank, use a filter rated for 5-10 gallons. For a 10-gallon tank, use a filter rated for 10-20 gallons. It's better to slightly under-filter than over-filter (which creates too much current). Sponge filters are sized by tank volume."
    },
    {
      question: "Can betta fish live without a filter?",
      answer: "No, betta fish cannot live without a filter in most setups. Without filtration, ammonia builds up quickly, beneficial bacteria cannot establish, and water quality deteriorates rapidly. This leads to stress, illness, and death. A filter is mandatory equipment for betta fish tanks."
    }
  ];

  return (
    <>
      <FAQSchema faqs={faqs} />
      <main className="min-h-screen pt-28 pb-20 px-6 relative z-10">
        
        <div className="max-w-4xl mx-auto mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-medium text-sm group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </div>

        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-6">
            Complete Guide
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 drop-shadow-lg leading-tight">
            Betta Fish Filter Guide 2025
          </h1>
          <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Learn why betta fish need filters, which filters are best (sponge filters), and how to set up low-flow filtration that won't stress your betta.
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-blue-500/10 border-2 border-blue-500/30 p-6 rounded-2xl flex items-start gap-4">
            <Waves size={32} className="text-blue-400 shrink-0" />
            <div>
              <h2 className="text-2xl font-bold text-blue-400 mb-3">💧 Filters Are Essential for Betta Fish</h2>
              <p className="text-blue-200 leading-relaxed">
                Betta fish <strong>absolutely need filters</strong> to maintain water quality. However, they need <strong>low-flow filters</strong> because their long fins make swimming against strong currents difficult. Sponge filters are the gold standard for betta tanks.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          
          <GuideSection Icon={Waves} iconColor="#60a5fa" title="1. Why Betta Fish Need Filters">
            <p className="text-slate-300 mb-4">
              Filters are essential for maintaining water quality in betta fish tanks. They perform three critical functions that keep your betta healthy.
            </p>
            <ul className="space-y-3">
              <GuidePoint>
                <strong>Biological Filtration:</strong> Filters house beneficial bacteria that break down toxic ammonia and nitrites into less harmful nitrates. This is the most important function.
              </GuidePoint>
              <GuidePoint>
                <strong>Mechanical Filtration:</strong> Filters remove debris, uneaten food, and waste particles from the water, keeping it clean and clear.
              </GuidePoint>
              <GuidePoint>
                <strong>Water Circulation:</strong> Filters create gentle water movement that helps oxygenate the water and prevents stagnant areas.
              </GuidePoint>
              <GuidePoint alert>
                <strong>Without a Filter:</strong> Ammonia builds up quickly, beneficial bacteria cannot establish, and water quality deteriorates rapidly, leading to stress, illness, and death.
              </GuidePoint>
            </ul>
          </GuideSection>

          <GuideSection Icon={CheckCircle2} iconColor="#34d399" title="2. Best Filter: Sponge Filters">
            <p className="text-slate-300 mb-4">
              <strong className="text-white">Sponge filters are the gold standard for betta fish tanks</strong>. They provide excellent filtration with zero dangerous currents.
            </p>
            <ul className="space-y-3">
              <GuidePoint>
                <strong>Gentle Flow:</strong> Sponge filters create very gentle water movement that won't stress bettas or blow them around the tank.
              </GuidePoint>
              <GuidePoint>
                <strong>Safe Suction:</strong> Unlike other filters, sponge filters have no dangerous intake tubes that can trap or injure bettas.
              </GuidePoint>
              <GuidePoint>
                <strong>Excellent Biological Filtration:</strong> The sponge provides a large surface area for beneficial bacteria to grow.
              </GuidePoint>
              <GuidePoint>
                <strong>Easy Maintenance:</strong> Simply squeeze the sponge in old tank water during water changes to clean it.
              </GuidePoint>
              <GuidePoint>
                <strong>Affordable:</strong> Sponge filters are inexpensive and reliable, making them perfect for betta tanks.
              </GuidePoint>
            </ul>
          </GuideSection>

          <GuideSection Icon={AlertTriangle} iconColor="#f87171" title="3. Filters to Avoid: High-Flow Options">
            <p className="text-slate-300 mb-4">
              Some filters create strong currents that can stress and harm betta fish. Here's what to avoid:
            </p>
            <ul className="space-y-3">
              <GuidePoint alert>
                <strong>High-Flow Hang-on-Back Filters:</strong> Many HOB filters create strong currents that blow bettas around the tank, causing stress and fin damage. Only use if they have adjustable flow set to minimum.
              </GuidePoint>
              <GuidePoint alert>
                <strong>Power Filters:</strong> These create very strong currents and are not suitable for betta tanks unless flow can be significantly reduced.
              </GuidePoint>
              <GuidePoint alert>
                <strong>Canister Filters:</strong> Usually create too much flow for betta tanks and are overkill for small tanks.
              </GuidePoint>
              <GuidePoint>
                <strong>If Using HOB Filters:</strong> Choose models with adjustable flow, set to minimum, and position the outflow to minimize current. Sponge filters are still better.
              </GuidePoint>
            </ul>
          </GuideSection>

          <GuideSection Icon={Settings} iconColor="#a78bfa" title="4. Filter Setup and Installation">
            <p className="text-slate-300 mb-4">
              Proper filter setup is crucial for effectiveness and betta safety. Follow these steps:
            </p>
            <ul className="space-y-3">
              <GuidePoint>
                <strong>Choose the Right Size:</strong> Select a filter rated for your tank size. For 5 gallons, use a 5-10 gallon filter. For 10 gallons, use a 10-20 gallon filter.
              </GuidePoint>
              <GuidePoint>
                <strong>Install Before Adding Fish:</strong> Set up the filter when you set up the tank, before adding your betta. This allows beneficial bacteria to start growing.
              </GuidePoint>
              <GuidePoint>
                <strong>Cycle the Tank:</strong> Run the filter for 4-6 weeks before adding fish (or use a fishless cycle) to establish beneficial bacteria. This is critical for water quality.
              </GuidePoint>
              <GuidePoint>
                <strong>Position for Low Flow:</strong> If using a HOB filter, position the outflow to minimize current. Point it at the tank wall or use a baffle to reduce flow.
              </GuidePoint>
              <GuidePoint>
                <strong>Maintain Regularly:</strong> Clean the filter media in old tank water (never tap water) during water changes to preserve beneficial bacteria.
              </GuidePoint>
            </ul>
          </GuideSection>

          <GuideSection Icon={Droplets} iconColor="#fb923c" title="5. Tank Cycling: Critical for Filtration">
            <p className="text-slate-300 mb-4">
              Before adding your betta, you must <strong className="text-white">cycle your tank</strong> to establish beneficial bacteria in the filter. This process takes 4-6 weeks but is essential.
            </p>
            <ul className="space-y-3">
              <GuidePoint>
                <strong>What is Cycling?</strong> Cycling is the process of growing beneficial bacteria that convert toxic ammonia (from fish waste) into less harmful nitrates.
              </GuidePoint>
              <GuidePoint>
                <strong>Why It's Critical:</strong> Without cycling, ammonia builds up quickly when you add fish, causing poisoning and death. The filter needs time to establish beneficial bacteria.
              </GuidePoint>
              <GuidePoint>
                <strong>How to Cycle:</strong> Set up your tank and filter, add a small amount of ammonia source (fish food or pure ammonia), and wait 4-6 weeks for bacteria to grow. Test water regularly with an API Master Test Kit.
              </GuidePoint>
              <GuidePoint>
                <strong>Fishless Cycling:</strong> (Recommended): Cycle without fish to avoid harming them. Add fish only after ammonia and nitrites read zero.
              </GuidePoint>
              <GuidePoint alert>
                <strong>Never Skip Cycling:</strong> Adding fish to an uncycled tank is like putting them in a toxic environment. Always cycle first.
              </GuidePoint>
            </ul>
          </GuideSection>

        </div>

        <div className="max-w-4xl mx-auto mt-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-slate-400 text-lg">Common questions about betta fish filters</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto mt-20 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Related Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/build/betta" className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 hover:border-blue-500/40 transition-all text-center">
              <h3 className="text-sm font-bold text-white mb-1">Interactive Builder</h3>
              <p className="text-xs text-slate-400">Build your setup</p>
            </Link>
            <Link href="/guides/betta-setup" className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 hover:border-blue-500/40 transition-all text-center">
              <h3 className="text-sm font-bold text-white mb-1">Complete Setup Guide</h3>
              <p className="text-xs text-slate-400">Full guide</p>
            </Link>
            <Link href="/guides/betta-fish-heater" className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 hover:border-blue-500/40 transition-all text-center">
              <h3 className="text-sm font-bold text-white mb-1">Heater Guide</h3>
              <p className="text-xs text-slate-400">Temperature setup</p>
            </Link>
          </div>
        </div>

        <div className="max-w-4xl mx-auto text-center mt-12">
          <h2 className="text-3xl font-black text-white mb-6">Ready to Build Your Betta Setup?</h2>
          <p className="text-slate-300 leading-relaxed max-w-2xl mx-auto mb-10">
            Use our interactive builder to create a complete betta fish setup with the right filter and all essential equipment.
          </p>
          <Link href="/build/betta" className="inline-flex items-center justify-center gap-2 px-8 py-4 md:px-10 md:py-5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full transition-all hover:scale-105 shadow-xl shadow-blue-900/30 text-sm md:text-lg whitespace-nowrap">
            Launch Betta Builder <ArrowRight size={20} className="shrink-0 md:w-6 md:h-6" />
          </Link>
        </div>

      </main>
      <Footer />
    </>
  );
}

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
        {alert ? <ShieldAlert size={18} className="text-red-400" /> : <CheckCircle2 size={18} className="text-blue-400" />}
      </div>
      <div>{children}</div>
    </li>
  );
}

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className="card-warm rounded-2xl overflow-hidden">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-900/30 transition-colors" aria-expanded={isOpen}>
        <h3 className="text-lg font-bold text-white pr-4">{question}</h3>
        <HelpCircle size={20} className={`text-blue-400 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && <div className="px-6 pb-4"><p className="text-slate-300 leading-relaxed">{answer}</p></div>}
    </div>
  );
}

