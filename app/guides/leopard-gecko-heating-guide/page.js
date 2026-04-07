"use client";

import React from "react";
import Link from "next/link";
import {
  Thermometer,
  Flame,
  ShieldAlert,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  HelpCircle,
  Zap,
} from "lucide-react";
import Footer from "../../components/Footer";
import { FAQSchema } from "../../components/StructuredData";

export default function LeopardGeckoHeatingGuidePage() {
  const faqs = [
    {
      question: "What is the ideal warm hide temperature for a leopard gecko?",
      answer:
        "Target roughly 90-92°F at the warm hide floor/surface. This supports digestion and normal activity while still allowing retreat to cooler zones.",
    },
    {
      question: "Is under tank heat or overhead heat better for leopard geckos?",
      answer:
        "Both can work when controlled correctly. Under tank heating can support belly heat zones, while overhead halogen or deep heat projectors can create a stronger daytime gradient. The key is thermostat control and accurate temperature measurement.",
    },
    {
      question: "Do leopard geckos need a thermostat?",
      answer:
        "Yes. Every heat source should be thermostat-controlled. Unregulated heating can overheat enclosures, cause burns, and create unstable daily swings.",
    },
    {
      question: "Where should I measure temperatures in a leopard gecko tank?",
      answer:
        "Measure warm hide floor/surface, basking/warm zone, and cool side. Use an infrared temp gun for surfaces and digital probes for ambient checks to confirm a full gradient.",
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
              Leopard Gecko Heating Guide
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-6">
              Safe temperatures, heating methods, and gradient setup rules that prevent common gecko heating mistakes.
            </p>
            <Link href="/build/leopard-gecko" className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-full transition-all">
              Build a Leopard Gecko Habitat <ArrowRight size={20} />
            </Link>
          </div>

          <div className="mb-8 p-6 sm:p-8 rounded-3xl border-2 border-emerald-500/35 bg-emerald-500/[0.07] shadow-lg">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Zap className="text-emerald-400 shrink-0" size={24} />
              Quick Answer
            </h2>
            <ul className="space-y-2.5 text-slate-300 text-sm sm:text-base">
              <li>Warm hide floor/surface target: <strong>~90-92°F</strong></li>
              <li>Use thermostat control on every heat source</li>
              <li>Build a warm-to-cool gradient across the enclosure</li>
              <li>Measure surfaces and ambient temps in multiple zones</li>
            </ul>
          </div>

          <GuideSection Icon={Flame} iconColor="#fb923c" title="Heat Sources: UTH vs Overhead Heating">
            <p className="text-slate-300 mb-4">
              <strong>Under tank heaters (UTH)</strong> can provide a localized warm floor zone when installed and controlled correctly. <strong>Overhead heating</strong> (halogen or deep heat projector) can create stronger daytime ambient support and more natural gradient behavior.
            </p>
            <p className="text-slate-300 mb-0">
              Either method can fail if placement, wattage, or thermostat setup is wrong. Heat source type matters less than controlled delivery and verified temperatures.
            </p>
          </GuideSection>

          <GuideSection Icon={Thermometer} iconColor="#34d399" title="Why Belly Heat Still Matters">
            <p className="text-slate-300 mb-0">
              Leopard geckos often rest on warm surfaces to support digestion. The warm hide floor target (~90-92°F) is a practical benchmark for safe metabolic function. Even with overhead options, surface readings in the warm hide remain a critical check.
            </p>
          </GuideSection>

          <GuideSection Icon={ShieldAlert} iconColor="#f87171" title="Thermostat Importance">
            <p className="text-slate-300 mb-0">
              No thermostat means no reliable safety limit. Unregulated heaters can overheat quickly, especially in smaller enclosures or seasonal room swings. Use a thermostat plus routine temperature checks to keep conditions stable and safe.
            </p>
          </GuideSection>

          <GuideSection Icon={CheckCircle2} iconColor="#22d3ee" title="Temperature Gradient Setup">
            <p className="text-slate-300 mb-0">
              Build a clear gradient: warm hide near target heating zone and a cooler opposite side for retreat. Measure warm hide surface, warm-side ambient, and cool-side ambient so your gecko can choose preferred body temperature throughout the day.
            </p>
          </GuideSection>

          <GuideSection Icon={ShieldAlert} iconColor="#fb923c" title="Common Mistakes">
            <ul className="space-y-2 text-slate-300 text-sm sm:text-base list-disc list-inside marker:text-orange-400/90 mb-4">
              <li>No thermostat on UTH or overhead heat</li>
              <li>Heat source placement that creates one hotspot but no usable gradient</li>
              <li>Using only one thermometer and missing cool-side conditions</li>
              <li>Not rechecking temperatures after room or season changes</li>
            </ul>
            <p className="text-slate-300 mb-0">
              For full enclosure context, use our{" "}
              <Link href="/guides/leopard-gecko-setup" className="text-emerald-400 hover:text-emerald-300">Leopard Gecko Setup Guide</Link>
              {" "}and{" "}
              <Link href="/guides/leopard-gecko-substrate" className="text-emerald-400 hover:text-emerald-300">Leopard Gecko Substrate Guide</Link>
              .
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
              <Link href="/guides/leopard-gecko-setup" className="text-emerald-400 hover:text-emerald-300">Leopard Gecko Setup Guide</Link>
              {" · "}
              <Link href="/guides/leopard-gecko-substrate" className="text-emerald-400 hover:text-emerald-300">Leopard Gecko Substrate Guide</Link>
            </p>
          </div>

          <div className="mt-16 text-center p-8 rounded-3xl bg-emerald-500/10 border border-emerald-500/30">
            <h2 className="text-2xl font-black text-white mb-4">Safe heating, pre-matched to your setup</h2>
            <p className="text-slate-300 max-w-xl mx-auto mb-6">
              BuildMyHabitat pairs heat sources, thermostat control, and enclosure layout so your leopard gecko has a stable warm hide and safe full-tank gradient from the start.
            </p>
            <Link href="/build/leopard-gecko" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-full transition-all">
              Build a Leopard Gecko Habitat <ArrowRight size={20} />
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
