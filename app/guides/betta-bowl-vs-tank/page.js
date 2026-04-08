"use client";

import React from "react";
import Link from "next/link";
import {
  Fish,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  HelpCircle,
  Zap,
} from "lucide-react";
import Footer from "../../components/Footer";
import { FAQSchema } from "../../components/StructuredData";

export default function BettaBowlVsTankPage() {
  const faqs = [
    {
      question: "Can a betta live in a bowl long term?",
      answer:
        "A betta can survive in a bowl for a while, but bowls usually fail basic welfare and stability requirements. Small water volume swings fast in temperature and waste levels, which increases chronic stress risk.",
    },
    {
      question: "What tank size is better than a bowl for bettas?",
      answer:
        "A proper heated and filtered tank is the better baseline. In practice, most keepers should treat 5+ gallons as the minimum practical setup for stable water and normal behavior.",
    },
    {
      question: "Do plants and decor actually matter for betta welfare?",
      answer:
        "Yes. Structure, cover, and resting options support normal exploration and reduce stress-like inactivity. Good enrichment does not replace water quality, but it improves daily behavior.",
    },
    {
      question: "Can two male bettas live together in a very large tank?",
      answer:
        "Large space can reduce some display behavior, but it does not reliably prevent attacks. Male cohabitation remains a high-risk strategy and is not a beginner-safe recommendation.",
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
              Betta Bowl vs Tank Guide
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-6">
              Why bowls fail long-term betta welfare, and what a stable tank setup changes.
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
              <li>Bowls suppress normal behavior and destabilize water faster</li>
              <li>Tank setups provide better heat, filtration, and enrichment</li>
              <li>5+ gallons is a practical minimum for most keepers</li>
              <li>Large tanks still do not make male betta cohabitation reliable</li>
            </ul>
          </div>

          <GuideSection Icon={Fish} iconColor="#60a5fa" title="What Bowls Get Wrong">
            <p className="text-slate-300 mb-0">
              Bowls usually combine low volume, no stable filtration, and inconsistent heating. That means faster waste buildup, wider temperature drift, and fewer places for the fish to move, rest, and regulate stress.
            </p>
          </GuideSection>

          <GuideSection Icon={CheckCircle2} iconColor="#34d399" title="What a Proper Tank Adds">
            <p className="text-slate-300 mb-0">
              A real betta tank gives volume buffer, low-flow filtration, and controlled heat. This is what makes 78-80°F and safer water quality realistic day to day, not just for a weekend.
            </p>
          </GuideSection>

          <GuideSection Icon={Zap} iconColor="#a78bfa" title="Why This Matters (Evidence-Based)">
            <p className="text-slate-300 mb-4">
              Controlled betta behavior work shows tiny bowl housing suppresses swimming and reduces normal activity. Enrichment and larger water volume support more natural movement and better daily welfare expression.
            </p>
            <p className="text-slate-300 mb-0">
              Translation for setup decisions: a bowl is not just smaller, it is behaviorally and chemically less stable.
            </p>
          </GuideSection>

          <GuideSection Icon={AlertTriangle} iconColor="#f87171" title="Common Myths and Mistakes">
            <ul className="space-y-2 text-slate-300 text-sm sm:text-base list-disc list-inside marker:text-orange-400/90 mb-0">
              <li>"Bettas like tiny spaces" because they survive there</li>
              <li>Room temperature as a substitute for a heater</li>
              <li>No cycle plan before adding fish</li>
              <li>Assuming a very large tank makes two males safe together</li>
            </ul>
          </GuideSection>

          <GuideSection Icon={CheckCircle2} iconColor="#22d3ee" title="Best Beginner Upgrade Path">
            <p className="text-slate-300 mb-0">
              Move from bowl logic to system logic: size, heat, filtration, and cycling first. Use our{" "}
              <Link href="/guides/betta-setup" className="text-sky-400 hover:text-sky-300">Betta Fish Setup Guide</Link>
              ,{" "}
              <Link href="/guides/betta-fish-tank-size" className="text-sky-400 hover:text-sky-300">Betta Fish Tank Size Guide</Link>
              , and{" "}
              <Link href="/guides/betta-tank-cycling" className="text-sky-400 hover:text-sky-300">Betta Fish Tank Cycling Guide</Link>
              {" "}to build it correctly.
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
              <Link href="/guides/betta-setup" className="text-sky-400 hover:text-sky-300">Betta Fish Setup Guide</Link>
              {" · "}
              <Link href="/guides/betta-fish-tank-size" className="text-sky-400 hover:text-sky-300">Betta Fish Tank Size Guide</Link>
              {" · "}
              <Link href="/guides/betta-water-quality-stress" className="text-sky-400 hover:text-sky-300">Betta Water Quality Stress Guide</Link>
            </p>
          </div>

          <div className="mt-16 text-center p-8 rounded-3xl bg-blue-500/10 border border-blue-500/30">
            <h2 className="text-2xl font-black text-white mb-4">From bowl advice to system-grade setup</h2>
            <p className="text-slate-300 max-w-xl mx-auto mb-6">
              BuildMyHabitat enforces tank size, heating, and filtration compatibility so your betta setup is stable by design, not luck.
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
