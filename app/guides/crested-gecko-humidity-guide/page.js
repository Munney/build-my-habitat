"use client";

import React from "react";
import Link from "next/link";
import {
  Droplets,
  Home,
  ShieldAlert,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  HelpCircle,
  Zap,
} from "lucide-react";
import Footer from "../../components/Footer";
import { FAQSchema } from "../../components/StructuredData";

export default function CrestedGeckoHumidityGuidePage() {
  const faqs = [
    {
      question: "What humidity do crested geckos need?",
      answer:
        "Crested geckos need a wet/dry cycle: mist to spike humidity to 80%+, then allow it to dry down to 40-50% before the next misting. Constant high humidity causes respiratory infections.",
    },
    {
      question: "How often should I mist a crested gecko enclosure?",
      answer:
        "Mist twice daily — once in the morning and once in the evening. Each misting should spike humidity to 80%+ before gradually drying to 40-50%. This cycle mimics their natural New Caledonian rainforest environment.",
    },
    {
      question: "Can crested gecko humidity be too high?",
      answer:
        "Yes. Constant humidity above 80% without a dry-down period promotes bacterial and fungal growth, leading to respiratory infections. The wet/dry cycle is essential — never keep the enclosure constantly saturated.",
    },
    {
      question: "Where should I place a hygrometer in a crested gecko tank?",
      answer:
        "Place the probe in the middle of the enclosure at gecko level, not at the top or bottom. This gives the most accurate reading of what your gecko actually experiences. Digital hygrometers with a probe are strongly recommended.",
    },
    {
      question: "Do live plants help with crested gecko humidity?",
      answer:
        "Yes. Live plants like Pothos and Philodendron naturally release moisture through transpiration, helping maintain humidity between mistings. They also provide climbing structure and improve enclosure aesthetics.",
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
              Crested Gecko Humidity Guide
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-6">
              How to maintain a proper wet/dry cycle with misting, prevent respiratory infections, and keep humidity in the safe range.
            </p>
            <Link href="/build/crested-gecko" className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-full transition-all">
              Build a Crested Gecko Habitat <ArrowRight size={20} />
            </Link>
          </div>

          <div className="mb-8 p-6 sm:p-8 rounded-3xl border-2 border-purple-500/35 bg-purple-500/[0.07] shadow-lg">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Zap className="text-purple-400 shrink-0" size={24} />
              Quick Answer
            </h2>
            <ul className="space-y-2.5 text-slate-300 text-sm sm:text-base">
              <li>Mist <strong>twice daily</strong> (morning and evening)</li>
              <li>Spike humidity to <strong>80%+</strong> with each misting</li>
              <li>Allow to dry down to <strong>40-50%</strong> between mistings</li>
              <li>The wet/dry cycle is <strong>essential</strong> — constant high humidity causes respiratory infection</li>
            </ul>
          </div>

          <GuideSection Icon={Droplets} iconColor="#22d3ee" title="The Wet/Dry Cycle">
            <p className="text-slate-300 mb-0">
              Crested geckos are native to the humid rainforests of New Caledonia where humidity fluctuates throughout the day. Replicating this wet/dry cycle in captivity is critical. Mist to spike humidity, then let the enclosure breathe and dry before the next misting. This prevents stagnant, bacteria-laden air that causes respiratory infections while still providing the moisture needed for healthy shedding and hydration.
            </p>
          </GuideSection>

          <GuideSection Icon={Droplets} iconColor="#a855f7" title="Misting Schedule">
            <ul className="space-y-3 mb-0">
              <GuidePoint accent="purple">Mist twice daily — morning and evening are the standard schedule</GuidePoint>
              <GuidePoint accent="purple">Each misting should spike humidity to 80%+ across the enclosure</GuidePoint>
              <GuidePoint accent="purple">Allow humidity to naturally drop to 40-50% before the next misting</GuidePoint>
              <GuidePoint accent="purple">Use a fine mist spray bottle or automatic mister — avoid soaking the enclosure</GuidePoint>
              <GuidePoint accent="purple">Increase misting frequency during shedding cycles when humidity support is needed</GuidePoint>
            </ul>
          </GuideSection>

          <GuideSection Icon={ShieldAlert} iconColor="#f87171" title="Why Constant High Humidity Is Dangerous">
            <p className="text-slate-300 mb-4">
              Many beginners assume crested geckos need constant tropical humidity. This is one of the most common and dangerous mistakes. Without a dry-down period, moisture accumulates in substrate, on walls, and in hides — creating a breeding ground for bacteria and fungi that leads directly to respiratory infections.
            </p>
            <ul className="space-y-3 mb-0">
              <GuidePoint alert>Constant 80%+ humidity without drying promotes bacterial lung infections</GuidePoint>
              <GuidePoint alert>Sealed enclosures with no ventilation trap moisture and worsen the problem</GuidePoint>
              <GuidePoint alert>Over-misting substrate creates mold and fungus growth on decor and walls</GuidePoint>
              <GuidePoint alert>Respiratory infections from poor humidity management are a leading cause of crested gecko illness</GuidePoint>
            </ul>
          </GuideSection>

          <GuideSection Icon={Home} iconColor="#34d399" title="Live Plants for Humidity Support">
            <p className="text-slate-300 mb-0">
              Live plants naturally assist with humidity management through transpiration. Pothos, Philodendron, and Bromeliads are excellent choices for crested gecko enclosures — they tolerate the wet/dry cycle, provide climbing structure, and release moisture between mistings. Pair live plants with a bioactive or well-draining substrate to prevent root rot while maintaining the humidity cycle your gecko needs.
            </p>
          </GuideSection>

          <GuideSection Icon={CheckCircle2} iconColor="#e879f9" title="Measuring Humidity Correctly">
            <ul className="space-y-3 mb-0">
              <GuidePoint accent="purple">Use a digital hygrometer with a probe — dial gauges are notoriously inaccurate</GuidePoint>
              <GuidePoint accent="purple">Place the probe in the middle of the enclosure at gecko level, not at the top</GuidePoint>
              <GuidePoint accent="purple">Monitor the dry-down period — humidity should reach 40-50% before next misting</GuidePoint>
              <GuidePoint accent="purple">Check humidity at multiple times of day to confirm the full cycle is working</GuidePoint>
              <GuidePoint accent="purple">Replace or recalibrate hygrometers annually — sensors drift over time</GuidePoint>
            </ul>
          </GuideSection>

          <div className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <FAQItem key={i} question={faq.question} answer={faq.answer} accent="purple" />
              ))}
            </div>
          </div>

          <div className="my-12 p-6 rounded-2xl bg-slate-800/80 border border-slate-700">
            <h2 className="text-lg font-bold text-white mb-3">Related Guides</h2>
            <p className="text-slate-400 text-sm mb-0">
              <Link href="/guides/crested-gecko-setup" className="text-purple-400 hover:text-purple-300">Crested Gecko Setup Guide</Link>
              {" · "}
              <Link href="/guides/crested-gecko-enclosure-guide" className="text-purple-400 hover:text-purple-300">Crested Gecko Enclosure Guide</Link>
            </p>
          </div>

          <div className="mt-16 text-center p-8 rounded-3xl bg-purple-500/10 border border-purple-500/30">
            <h2 className="text-2xl font-black text-white mb-4">Humidity handled from day one</h2>
            <p className="text-slate-300 max-w-xl mx-auto mb-6">
              BuildMyHabitat pairs misting tools, live plant options, and enclosure type so your crested gecko maintains a safe wet/dry cycle without guesswork.
            </p>
            <Link href="/build/crested-gecko" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-full transition-all">
              Build a Crested Gecko Habitat <ArrowRight size={20} />
            </Link>
          </div>
        </div>
        <div className="max-w-3xl mx-auto mt-16 p-6 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-white font-bold text-lg mb-1">Ready to build your setup?</h3>
            <p className="text-slate-400 text-sm">
              The builder selects compatible, research-verified products and generates your complete shopping list.
            </p>
          </div>
          <Link href="/build/crested-gecko" className="shrink-0 px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-full transition-all whitespace-nowrap">
            Start the Builder →
          </Link>
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

function GuidePoint({ children, alert, accent = "amber" }) {
  const accentClass = accent === "amber" ? "text-amber-400" : "text-purple-400";
  return (
    <li className="flex items-start gap-3 text-slate-300 leading-relaxed">
      <div className="shrink-0 mt-1">
        {alert ? <ShieldAlert size={18} className="text-red-400" /> : <CheckCircle2 size={18} className={accentClass} />}
      </div>
      <div>{children}</div>
    </li>
  );
}

function FAQItem({ question, answer, accent = "amber" }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const accentClass = accent === "amber" ? "text-amber-400" : "text-purple-400";
  return (
    <div className="bg-slate-900/50 rounded-2xl border border-white/10 overflow-hidden">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-900/30" aria-expanded={isOpen}>
        <h3 className="text-lg font-bold text-white pr-4">{question}</h3>
        <HelpCircle size={20} className={`${accentClass} shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && <div className="px-6 pb-4"><p className="text-slate-300 leading-relaxed">{answer}</p></div>}
    </div>
  );
}
