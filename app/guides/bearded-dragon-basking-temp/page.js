"use client";

import React from "react";
import Link from "next/link";
import {
  Thermometer,
  Flame,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  HelpCircle,
  Zap,
} from "lucide-react";
import Footer from "../../components/Footer";
import { FAQSchema } from "../../components/StructuredData";

export default function BeardedDragonBaskingTempPage() {
  const faqs = [
    {
      question: "What is the correct basking temperature for a bearded dragon?",
      answer:
        "For most healthy juveniles and adults, target a basking surface of about 105-110°F, measured where your dragon actually sits. Surface temperature matters more than general air temperature at the top of the tank.",
    },
    {
      question: "Why is my digital thermometer reading lower than my temp gun?",
      answer:
        "Most probe and wall thermometers read air temperature, not basking surface temperature. A temp gun reads the actual surface your dragon uses to thermoregulate, which is the number that protects digestion and safety.",
    },
    {
      question: "Do I need a thermostat with a basking bulb?",
      answer:
        "Yes. Every heat source should be controlled by a thermostat to prevent dangerous overheating and daily spikes. Use thermostat control plus routine temp-gun checks on the basking spot.",
    },
    {
      question: "What should cool-side temperature be for a bearded dragon?",
      answer:
        "Most setups work best with a cool side around the mid-70s to low-80s °F while the basking surface stays in the 105-110°F range. This gradient lets your dragon move between zones and regulate body temperature safely.",
    },
  ];

  return (
    <>
      <FAQSchema faqs={faqs} />
      <main className="min-h-screen pt-28 pb-20 px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white font-medium mb-8 group">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Hub
          </Link>

          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4 leading-tight">
              Bearded Dragon Basking Temperature Guide
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-6">
              Safe basking range, how to measure it correctly, and how to build a reliable heat gradient without guesswork.
            </p>
            <Link href="/build/bearded-dragon" className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-full transition-all">
              Build a Bearded Dragon Habitat <ArrowRight size={20} />
            </Link>
          </div>

          <div className="mb-8 p-6 sm:p-8 rounded-3xl border-2 border-emerald-500/35 bg-emerald-500/[0.07] shadow-lg">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Zap className="text-emerald-400 shrink-0" size={24} />
              Quick Answer
            </h2>
            <ul className="space-y-2.5 text-slate-300 text-sm sm:text-base">
              <li className="flex gap-2"><span className="text-emerald-400 font-bold shrink-0">Basking surface:</span><span>105-110°F</span></li>
              <li className="flex gap-2"><span className="text-emerald-400 font-bold shrink-0">Measure with:</span><span>infrared temp gun on basking surface</span></li>
              <li className="flex gap-2"><span className="text-emerald-400 font-bold shrink-0">Cool side:</span><span>mid-70s to low-80s °F</span></li>
              <li className="flex gap-2"><span className="text-emerald-400 font-bold shrink-0">Heat control:</span><span>thermostat required</span></li>
            </ul>
          </div>

          <GuideSection Icon={Thermometer} iconColor="#34d399" title="Surface Temperature vs Air Temperature">
            <p className="text-slate-300 mb-0">
              This distinction is critical: bearded dragons heat their bodies from the surface they sit on, not from a random air reading on the wall. Your safety target is the basking <strong>surface</strong> temperature (about 105-110°F), while air temperatures help confirm gradient quality.
            </p>
          </GuideSection>

          <GuideSection Icon={Flame} iconColor="#fb923c" title="How to Measure Correctly">
            <p className="text-slate-300 mb-0">
              Use an <strong>infrared temp gun</strong> and aim at the exact basking platform where your dragon rests. Take multiple readings across the basking zone and recheck after bulb changes, room-temperature changes, or enclosure adjustments.
            </p>
          </GuideSection>

          <GuideSection Icon={CheckCircle2} iconColor="#22d3ee" title="Ideal Temperature Gradient">
            <p className="text-slate-300 mb-0">
              A safe enclosure offers a clear warm-to-cool gradient: basking surface around 105-110°F and a cooler retreat zone around the mid-70s to low-80s °F. This lets your dragon thermoregulate naturally instead of being trapped in one unsafe temperature.
            </p>
          </GuideSection>

          <GuideSection Icon={AlertTriangle} iconColor="#f87171" title="Common Mistakes">
            <ul className="space-y-2 text-slate-300 text-sm sm:text-base list-disc list-inside marker:text-orange-400/90 mb-4">
              <li>Using stick-on or wall thermometers as your primary basking measurement</li>
              <li>No thermostat on heat sources</li>
              <li>Reading only one point in the enclosure and ignoring the full gradient</li>
              <li>Setting bulb wattage once and never rechecking after seasonal room changes</li>
            </ul>
            <p className="text-slate-300 mb-0">
              Pair this with our{" "}
              <Link href="/guides/bearded-dragon-lighting-uvb" className="text-emerald-400 hover:text-emerald-300">Bearded Dragon Lighting & UVB Guide</Link>
              {" "}and{" "}
              <Link href="/guides/bearded-dragon-tank-setup" className="text-emerald-400 hover:text-emerald-300">Bearded Dragon Tank Setup Guide</Link>
              {" "}for full setup context.
            </p>
          </GuideSection>

          <div className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <FAQItem key={i} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>

          <div className="my-12 p-6 rounded-2xl bg-slate-800/80 border border-slate-700">
            <h2 className="text-lg font-bold text-white mb-3">Related Guides</h2>
            <p className="text-slate-400 text-sm mb-0">
              <Link href="/guides/bearded-dragon-lighting-uvb" className="text-emerald-400 hover:text-emerald-300">Bearded Dragon Lighting & UVB Guide</Link>
              {" · "}
              <Link href="/guides/bearded-dragon-tank-setup" className="text-emerald-400 hover:text-emerald-300">Bearded Dragon Tank Setup Guide</Link>
            </p>
          </div>

          <div className="mt-16 text-center p-8 rounded-3xl bg-emerald-500/10 border border-emerald-500/30">
            <h2 className="text-2xl font-black text-white mb-4">Dial in safe basking from day one</h2>
            <p className="text-slate-300 max-w-xl mx-auto mb-6">
              BuildMyHabitat aligns basking heat, thermostat control, and enclosure layout so your bearded dragon can thermoregulate safely without dangerous temperature guesswork.
            </p>
            <Link href="/build/bearded-dragon" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-full transition-all">
              Build a Bearded Dragon Habitat <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </main>
      <Footer variant="minimal" />
    </>
  );
}

function GuideSection({ Icon, iconColor, title, children }) {
  return (
    <section className="bg-slate-800 p-6 sm:p-8 rounded-3xl border border-slate-700 shadow-lg mb-8">
      <div className="flex items-center gap-4 mb-6 border-b border-slate-700 pb-4">
        <div className="p-3 bg-slate-900/50 rounded-2xl border border-slate-700">
          <Icon size={32} style={{ color: iconColor }} />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className="bg-slate-900/50 rounded-2xl border border-white/10 overflow-hidden">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-900/30" aria-expanded={isOpen}>
        <h3 className="text-lg font-bold text-white pr-4">{question}</h3>
        <HelpCircle size={20} className={`text-emerald-400 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && <div className="px-6 pb-4"><p className="text-slate-300 leading-relaxed">{answer}</p></div>}
    </div>
  );
}
