"use client";

import React from "react";
import Link from "next/link";
import {
  Sun,
  ShieldAlert,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  HelpCircle,
  Zap,
} from "lucide-react";
import Footer from "../../components/Footer";
import { FAQSchema } from "../../components/StructuredData";

export default function BeardedDragonUVBVsD3Page() {
  const faqs = [
    {
      question: "Can D3 powder replace UVB for bearded dragons?",
      answer:
        "D3 supplementation helps, but it should not be treated as a full UVB replacement. UVB exposure produces stronger and more reliable vitamin D metabolite support in most practical setups.",
    },
    {
      question: "Why do dragons still get MBD when owners dust feeders?",
      answer:
        "Because MBD risk is multi-factor: UVB strength, UVB distance, heat quality, and calcium balance all matter. Dusting alone cannot fix weak lighting or poor basking setup.",
    },
    {
      question: "What UVB setup is safer for beginners?",
      answer:
        "A quality T5 linear UVB with correct distance and gradient is the most reliable beginner baseline. Pair it with measured basking heat and a thermostat-controlled system.",
    },
    {
      question: "Should I stop using calcium if I have strong UVB?",
      answer:
        "No. UVB and calcium strategy work together. Strong UVB helps calcium utilization, but dietary balance still has to be correct.",
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
              Bearded Dragon UVB vs D3 Guide
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-6">
              Why UVB is the primary system and supplementation is support, not replacement.
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
              <li>UVB is the core driver of vitamin D metabolism in captive dragons</li>
              <li>D3 powder supports the system but should not replace proper UVB</li>
              <li>Distance and placement decide UVB effectiveness</li>
              <li>MBD risk rises when UVB, heat, and calcium strategy do not match</li>
            </ul>
          </div>

          <GuideSection Icon={Sun} iconColor="#facc15" title="Why UVB Is the Primary System">
            <p className="text-slate-300 mb-0">
              UVB is what makes the lighting system biologically useful for calcium metabolism. If UVB output at basking height is weak, supplementation alone often cannot fully compensate in real-world husbandry.
            </p>
          </GuideSection>

          <GuideSection Icon={CheckCircle2} iconColor="#22d3ee" title="Where D3 Supplementation Fits">
            <p className="text-slate-300 mb-0">
              D3 supplementation is a support layer. It helps when used correctly, but it works best on top of a proper UVB setup, not as a replacement for one.
            </p>
          </GuideSection>

          <GuideSection Icon={ShieldAlert} iconColor="#f87171" title="Common UVB vs D3 Mistakes">
            <ul className="space-y-2 text-slate-300 text-sm sm:text-base list-disc list-inside marker:text-orange-400/90 mb-0">
              <li>Using powder as a substitute for weak or missing UVB</li>
              <li>Ignoring bulb distance and mesh loss</li>
              <li>Assuming any UVB bulb type is equivalent</li>
              <li>Skipping temperature checks that support digestion and mineral balance</li>
            </ul>
          </GuideSection>

          <GuideSection Icon={Zap} iconColor="#a78bfa" title="Why This Matters (Evidence-Based)">
            <p className="text-slate-300 mb-4">
              Bearded dragon data shows UVB exposure drives much stronger vitamin D metabolite responses than supplementation-only paths. That is why setup quality, not just product type, determines long-term results.
            </p>
            <p className="text-slate-300 mb-0">
              Said simply: powder can help, but good UVB does the heavy lifting.
            </p>
          </GuideSection>

          <GuideSection Icon={CheckCircle2} iconColor="#34d399" title="How to Build a Matched System">
            <p className="text-slate-300 mb-0">
              Align UVB, basking heat, and diet together. Use our{" "}
              <Link href="/guides/bearded-dragon-lighting-uvb" className="text-emerald-400 hover:text-emerald-300">Bearded Dragon Lighting & UVB Guide</Link>
              ,{" "}
              <Link href="/guides/bearded-dragon-uvb-distance" className="text-emerald-400 hover:text-emerald-300">Bearded Dragon UVB Distance Guide</Link>
              , and{" "}
              <Link href="/guides/bearded-dragon-basking-temp" className="text-emerald-400 hover:text-emerald-300">Bearded Dragon Basking Temperature Guide</Link>
              {" "}for full implementation.
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
              <Link href="/guides/bearded-dragon-uvb-distance" className="text-emerald-400 hover:text-emerald-300">Bearded Dragon UVB Distance Guide</Link>
              {" · "}
              <Link href="/guides/bearded-dragon-mbd-delay" className="text-emerald-400 hover:text-emerald-300">Bearded Dragon MBD Delay Guide</Link>
            </p>
          </div>

          <div className="mt-16 text-center p-8 rounded-3xl bg-emerald-500/10 border border-emerald-500/30">
            <h2 className="text-2xl font-black text-white mb-4">UVB-first setups, matched from the start</h2>
            <p className="text-slate-300 max-w-xl mx-auto mb-6">
              BuildMyHabitat pairs UVB selection, distance logic, and heat requirements so your dragon gets a complete calcium-support system by default.
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
