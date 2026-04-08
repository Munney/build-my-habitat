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
  Zap,
} from "lucide-react";
import Footer from "../../components/Footer";
import { FAQSchema } from "../../components/StructuredData";

export default function BettaWaterQualityStressPage() {
  const faqs = [
    {
      question: "How does poor water quality stress bettas?",
      answer:
        "Poor water quality elevates physiological stress and can quickly change breathing, appetite, and activity. Even when fish look okay at first, repeated spikes wear down resilience over time.",
    },
    {
      question: "Which parameters matter most for stress prevention?",
      answer:
        "Ammonia, nitrite, nitrate, temperature stability, and dissolved oxygen are the core stress-control parameters. Stable readings beat occasional perfect readings followed by swings.",
    },
    {
      question: "Can a clear tank still have stressful water?",
      answer:
        "Yes. Clear water says almost nothing about ammonia, nitrite, or oxygen balance. Use liquid tests and routine checks instead of visual assumptions.",
    },
    {
      question: "What is the fastest way to reduce chronic stress risk?",
      answer:
        "Use proper tank size, right-sized filtration, full cycling, and stable heating. This reduces repeated spikes and gives the fish a predictable environment.",
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
              Betta Water Quality Stress Guide
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-6">
              How water instability drives stress in bettas, and the setup rules that prevent it.
            </p>
            <Link href="/build/betta" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full transition-all">
              Build a Betta Fish Setup <ArrowRight size={20} />
            </Link>
          </div>

          <div className="mb-8 p-6 sm:p-8 rounded-3xl border-2 border-sky-500/35 bg-sky-500/[0.07] shadow-lg">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Zap className="text-sky-400 shrink-0" size={24} />
              Quick Answer
            </h2>
            <ul className="space-y-2.5 text-slate-300 text-sm sm:text-base">
              <li>Stress often rises before obvious disease signs appear</li>
              <li>Ammonia and nitrite spikes are major stress triggers</li>
              <li>Temperature and oxygen instability compound water-quality stress</li>
              <li>Cycling + filtration + stable heating is your best prevention stack</li>
            </ul>
          </div>

          <GuideSection Icon={Waves} iconColor="#38bdf8" title="What Water-Quality Stress Looks Like">
            <p className="text-slate-300 mb-0">
              Chronic low-grade stress can show up as reduced appetite, low activity, erratic behavior, or repeated minor setbacks. Many keepers miss this stage because the tank still looks clear and the fish is still alive.
            </p>
          </GuideSection>

          <GuideSection Icon={AlertTriangle} iconColor="#f87171" title="Ammonia and Nitrite: Why Spikes Hurt Fast">
            <p className="text-slate-300 mb-4">
              Ammonia and nitrite are not just “cycle numbers.” They affect gill function and blood oxygen handling, and stress can rise quickly when levels move out of safe range.
            </p>
            <p className="text-slate-300 mb-0">
              This is why fish-in shortcuts fail so often: short spikes still count physiologically, even when fish survive the episode.
            </p>
          </GuideSection>

          <GuideSection Icon={Zap} iconColor="#a78bfa" title="Why This Matters (Evidence-Based)">
            <p className="text-slate-300 mb-4">
              Betta stress studies under poor transport-water conditions show measurable endocrine and gene-level stress responses when water quality drops. The same biological logic applies to unstable home tanks with repeated spikes.
            </p>
            <p className="text-slate-300 mb-0">
              The practical takeaway: avoid repeated “almost safe” cycles. Build for stable, predictable water from the start.
            </p>
          </GuideSection>

          <GuideSection Icon={CheckCircle2} iconColor="#34d399" title="Core Monitoring Rules">
            <ul className="space-y-2 text-slate-300 text-sm sm:text-base list-disc list-inside marker:text-sky-400/90 mb-0">
              <li>Track ammonia, nitrite, and nitrate with a liquid test kit</li>
              <li>Use a separate thermometer for stable 78-80°F water</li>
              <li>Watch trends across days, not one random test result</li>
              <li>Keep filter media biologically active; avoid unnecessary resets</li>
            </ul>
          </GuideSection>

          <GuideSection Icon={CheckCircle2} iconColor="#22d3ee" title="Build a Low-Stress Betta System">
            <p className="text-slate-300 mb-0">
              Combine system pieces in order: tank volume, heater sizing, filtration, then full cycle completion. Use our{" "}
              <Link href="/guides/betta-tank-cycling" className="text-sky-400 hover:text-sky-300">Betta Fish Tank Cycling Guide</Link>
              ,{" "}
              <Link href="/guides/betta-heater-size" className="text-sky-400 hover:text-sky-300">Betta Fish Heater Size Guide</Link>
              , and{" "}
              <Link href="/guides/betta-setup" className="text-sky-400 hover:text-sky-300">Betta Fish Setup Guide</Link>
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
              <Link href="/guides/betta-tank-cycling" className="text-sky-400 hover:text-sky-300">Betta Fish Tank Cycling Guide</Link>
              {" · "}
              <Link href="/guides/betta-temperature-guide" className="text-sky-400 hover:text-sky-300">Betta Fish Temperature Guide</Link>
              {" · "}
              <Link href="/guides/betta-bowl-vs-tank" className="text-sky-400 hover:text-sky-300">Betta Bowl vs Tank Guide</Link>
            </p>
          </div>

          <div className="mt-16 text-center p-8 rounded-3xl bg-blue-500/10 border border-blue-500/30">
            <h2 className="text-2xl font-black text-white mb-4">Stable water logic, built into your setup</h2>
            <p className="text-slate-300 max-w-xl mx-auto mb-6">
              BuildMyHabitat aligns tank size, cycling, heating, and filtration so your betta has fewer stress spikes and a safer long-term baseline.
            </p>
            <Link href="/build/betta" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full transition-all">
              Build a Betta Fish Setup <ArrowRight size={20} />
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
        <HelpCircle size={20} className={`text-blue-400 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && <div className="px-6 pb-4"><p className="text-slate-300 leading-relaxed">{answer}</p></div>}
    </div>
  );
}
