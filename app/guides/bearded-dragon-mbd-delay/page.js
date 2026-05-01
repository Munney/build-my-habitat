"use client";

import React from "react";
import Link from "next/link";
import {
  ShieldAlert,
  Thermometer,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  HelpCircle,
  Zap,
} from "lucide-react";
import Footer from "../../components/Footer";
import { FAQSchema } from "../../components/StructuredData";

export default function BeardedDragonMBDDelayPage() {
  const faqs = [
    {
      question: "Why can MBD appear late in bearded dragons?",
      answer:
        "Early deficiency can be buffered for a while before obvious deformity appears. That delay makes poor setups look safe until signs become harder to reverse.",
    },
    {
      question: "What are early warning signs before severe deformity?",
      answer:
        "Lower activity, weaker grip/climbing, subtle tremors, reduced appetite, and poor growth consistency are common early red flags. Do not wait for obvious limb deformity before acting.",
    },
    {
      question: "Can dragons look normal while UVB setup is still wrong?",
      answer:
        "Yes. Clinical problems often lag behind husbandry mistakes. That is why proactive checks on UVB distance, heat, and diet are more reliable than waiting for visible collapse.",
    },
    {
      question: "What is the best prevention strategy?",
      answer:
        "Treat prevention as a system: correct UVB, correct basking temperatures, calcium strategy, and routine monitoring. Fixing one piece while ignoring others leaves ongoing risk.",
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
              Bearded Dragon MBD Delay Guide
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-6">
              Why metabolic bone disease can appear late, and how to catch risk before severe damage.
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
              <li>MBD risk can build before obvious visual signs appear</li>
              <li>Dragons may look “fine” while UVB/heat errors continue</li>
              <li>Early action is easier than late-stage correction</li>
              <li>UVB + heat + calcium must be managed as one system</li>
            </ul>
          </div>

          <GuideSection Icon={ShieldAlert} iconColor="#f87171" title="Why MBD Can Be Delayed">
            <p className="text-slate-300 mb-0">
              Metabolic issues do not always present immediately. Some dragons maintain acceptable appearance for a period while underlying calcium and bone balance degrades, which creates a dangerous false sense of safety.
            </p>
          </GuideSection>

          <GuideSection Icon={Thermometer} iconColor="#fb923c" title="The Hidden Stack of Risk Factors">
            <p className="text-slate-300 mb-0">
              Delayed MBD risk usually comes from multiple small misses: weak UVB at basking height, poor distance control, inconsistent basking temperatures, and incomplete calcium strategy. One fix alone is rarely enough.
            </p>
          </GuideSection>

          <GuideSection Icon={Zap} iconColor="#a78bfa" title="Why This Matters (Evidence-Based)">
            <p className="text-slate-300 mb-4">
              Bearded dragon vitamin D and clinical data both support the same practical message: husbandry failures can build silently before visible collapse. Waiting for dramatic signs means you are already behind.
            </p>
            <p className="text-slate-300 mb-0">
              Prevention beats rescue. Routine setup checks catch risk while outcomes are still easier to correct.
            </p>
          </GuideSection>

          <GuideSection Icon={CheckCircle2} iconColor="#22d3ee" title="Early Warning Signs to Watch">
            <ul className="space-y-2 text-slate-300 text-sm sm:text-base list-disc list-inside marker:text-emerald-400/90 mb-0">
              <li>Lower activity and reduced climbing confidence</li>
              <li>Subtle tremors or shaky movement under stress</li>
              <li>Inconsistent appetite and slower growth trajectory</li>
              <li>Softening jawline or posture changes in later progression</li>
            </ul>
          </GuideSection>

          <GuideSection Icon={CheckCircle2} iconColor="#34d399" title="Prevention Plan That Actually Works">
            <p className="text-slate-300 mb-0">
              Use system-level checks, not guesswork. Start with our{" "}
              <Link href="/guides/bearded-dragon-uvb-vs-d3" className="text-emerald-400 hover:text-emerald-300">Bearded Dragon UVB vs D3 Guide</Link>
              ,{" "}
              <Link href="/guides/bearded-dragon-uvb-distance" className="text-emerald-400 hover:text-emerald-300">Bearded Dragon UVB Distance Guide</Link>
              , and{" "}
              <Link href="/guides/bearded-dragon-basking-temp" className="text-emerald-400 hover:text-emerald-300">Bearded Dragon Basking Temperature Guide</Link>
              {" "}to lock in the core controls.
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
              <Link href="/guides/bearded-dragon-uvb-vs-d3" className="text-emerald-400 hover:text-emerald-300">Bearded Dragon UVB vs D3 Guide</Link>
              {" · "}
              <Link href="/guides/bearded-dragon-uvb-distance" className="text-emerald-400 hover:text-emerald-300">Bearded Dragon UVB Distance Guide</Link>
              {" · "}
              <Link href="/guides/bearded-dragon-mistakes" className="text-emerald-400 hover:text-emerald-300">Bearded Dragon Mistakes Guide</Link>
            </p>
          </div>

          <div className="mt-16 text-center p-8 rounded-3xl bg-emerald-500/10 border border-emerald-500/30">
            <h2 className="text-2xl font-black text-white mb-4">Prevent delayed failures with matched setup rules</h2>
            <p className="text-slate-300 max-w-xl mx-auto mb-6">
              BuildMyHabitat aligns UVB, heat, and habitat fundamentals to reduce hidden long-term MBD risk before symptoms become expensive and difficult to reverse.
            </p>
            <Link href="/build/bearded-dragon" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-full transition-all">
              Build a Bearded Dragon Habitat <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      <div className="max-w-3xl mx-auto mt-16 p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-white font-bold text-lg mb-1">
            Ready to build your setup?
          </h3>
          <p className="text-slate-400 text-sm">
            The builder selects compatible, research-verified products
            and generates your complete shopping list.
          </p>
        </div>
        <Link
          href="/build/bearded-dragon"
          className="shrink-0 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-full transition-all whitespace-nowrap"
        >
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
