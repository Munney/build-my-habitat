"use client";

import React from "react";
import Link from "next/link";
import {
  Home,
  CheckCircle2,
  ShieldAlert,
  ArrowRight,
  ArrowLeft,
  HelpCircle,
  Zap,
} from "lucide-react";
import Footer from "../../components/Footer";
import { FAQSchema } from "../../components/StructuredData";

export default function LeopardGeckoEnrichmentGuidePage() {
  const faqs = [
    {
      question: "What enrichment does a leopard gecko actually need?",
      answer:
        "Start with structure that changes behavior: multiple hides, varied textures, climbing points, and usable floor depth. Enrichment should increase exploration and choice, not just visual decoration.",
    },
    {
      question: "Do leopard geckos need a naturalistic enclosure for good welfare?",
      answer:
        "Naturalistic setups are often preferred, but welfare gains come from function first: hiding options, movement choices, and stable heat/moisture zones. You can improve welfare in simpler setups if those features are present.",
    },
    {
      question: "Can enrichment reduce stress-related behavior?",
      answer:
        "It can. Better structure and choice often increase normal exploration and reduce inactivity or defensive behavior, especially when paired with correct temperatures and secure hides.",
    },
    {
      question: "Is enrichment still important for beginner setups?",
      answer:
        "Yes. Beginners should keep enrichment safe and simple: stable hides, climbing options, and clear temperature zones. Complexity should never replace monitoring or core husbandry basics.",
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
              Leopard Gecko Enrichment Guide
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-6">
              Practical enrichment that improves gecko welfare through real choice, not clutter.
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
              <li>Enrichment means better behavior options, not just more objects</li>
              <li>Start with multiple hides, climbable structure, and varied textures</li>
              <li>Naturalistic setups help, but function matters more than aesthetics</li>
              <li>Always pair enrichment with correct heating and secure layout</li>
            </ul>
          </div>

          <GuideSection Icon={Home} iconColor="#34d399" title="What Counts as Real Enrichment">
            <p className="text-slate-300 mb-0">
              Real enrichment gives your gecko meaningful choices: where to hide, where to climb, where to warm up, and where to cool down. If an item does not change usable behavior, it is decoration, not enrichment.
            </p>
          </GuideSection>

          <GuideSection Icon={CheckCircle2} iconColor="#22d3ee" title="High-Value Enrichment Priorities">
            <ul className="space-y-2 text-slate-300 text-sm sm:text-base list-disc list-inside marker:text-emerald-400/90 mb-0">
              <li>At least three functional hides in distinct thermal zones</li>
              <li>Climbing features with secure footing and stable placement</li>
              <li>Substrate and texture variety that supports natural movement</li>
              <li>Visual barriers so the gecko can choose exposure vs cover</li>
            </ul>
          </GuideSection>

          <GuideSection Icon={Zap} iconColor="#a78bfa" title="Why This Matters (Evidence-Based)">
            <p className="text-slate-300 mb-4">
              Enrichment studies in leopard geckos show they actively interact with features that support hiding and climbing. That is a welfare signal: when choices exist, geckos use them.
            </p>
            <p className="text-slate-300 mb-0">
              The practical takeaway is simple: enrichment should be judged by behavior change. More exploration and normal resting patterns usually mean your setup is working.
            </p>
          </GuideSection>

          <GuideSection Icon={ShieldAlert} iconColor="#f87171" title="Common Enrichment Mistakes">
            <ul className="space-y-2 text-slate-300 text-sm sm:text-base list-disc list-inside marker:text-orange-400/90 mb-0">
              <li>Adding clutter without improving hide quality or thermal options</li>
              <li>Unstable climbing decor that can shift or collapse</li>
              <li>Ignoring heating/UVB fundamentals while focusing only on decor</li>
              <li>Using unsafe substrate or sharp materials in “naturalistic” builds</li>
            </ul>
          </GuideSection>

          <GuideSection Icon={CheckCircle2} iconColor="#34d399" title="Beginner-Friendly Enrichment Plan">
            <p className="text-slate-300 mb-0">
              Start with proven basics, then layer complexity. Use our{" "}
              <Link href="/guides/leopard-gecko-setup" className="text-emerald-400 hover:text-emerald-300">Leopard Gecko Setup Guide</Link>
              ,{" "}
              <Link href="/guides/leopard-gecko-heating-guide" className="text-emerald-400 hover:text-emerald-300">Leopard Gecko Heating Guide</Link>
              , and{" "}
              <Link href="/guides/leopard-gecko-substrate" className="text-emerald-400 hover:text-emerald-300">Leopard Gecko Substrate Guide</Link>
              {" "}to build structure, temperature, and substrate in the right order.
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
              <Link href="/guides/leopard-gecko-heating-guide" className="text-emerald-400 hover:text-emerald-300">Leopard Gecko Heating Guide</Link>
              {" · "}
              <Link href="/guides/leopard-gecko-sand-safe" className="text-emerald-400 hover:text-emerald-300">Leopard Gecko Sand Safety Guide</Link>
            </p>
          </div>

          <div className="mt-16 text-center p-8 rounded-3xl bg-emerald-500/10 border border-emerald-500/30">
            <h2 className="text-2xl font-black text-white mb-4">Enrichment matched to safe core setup</h2>
            <p className="text-slate-300 max-w-xl mx-auto mb-6">
              BuildMyHabitat pairs enrichment choices with heating, substrate, and enclosure rules so your gecko gets real behavioral options without hidden safety tradeoffs.
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
