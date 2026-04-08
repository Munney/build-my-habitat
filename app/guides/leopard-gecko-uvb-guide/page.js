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

export default function LeopardGeckoUVBGuidePage() {
  const faqs = [
    {
      question: "Do leopard geckos need UVB if they are nocturnal?",
      answer:
        "They can survive without UVB in some setups, but low-level UVB has been shown to raise vitamin D status in leopard geckos. That gives you a more reliable calcium-metabolism foundation than relying on supplements alone.",
    },
    {
      question: "What UVB level should I use for a leopard gecko?",
      answer:
        "Use low to moderate UVB in a gradient setup so your gecko can self-regulate exposure. Keep bright UVB focused on part of the warm side and always provide lower-UV retreats and full shade.",
    },
    {
      question: "Can UVB go through glass or dense screen tops?",
      answer:
        "Not effectively. Glass blocks UVB and dense mesh reduces output. Placement and distance matter as much as bulb type, so verify setup with the manufacturer chart and practical enclosure layout.",
    },
    {
      question: "Is UVB a replacement for calcium and proper heating?",
      answer:
        "No. UVB, calcium strategy, and correct heat all work together. If one part fails, long-term bone and metabolic risk rises even when the other two look decent.",
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
              Leopard Gecko UVB Guide
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-6">
              The practical UVB setup for leopard geckos: what helps, what is outdated, and how to build safe light gradients.
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
              <li>Low-level UVB can support leopard gecko vitamin D status</li>
              <li>Use a UV gradient with full shade retreat zones</li>
              <li>Glass and dense mesh reduce useful UVB</li>
              <li>UVB works best when paired with correct heat and calcium strategy</li>
            </ul>
          </div>

          <GuideSection Icon={Sun} iconColor="#facc15" title="Do Leopard Geckos Benefit from UVB?">
            <p className="text-slate-300 mb-0">
              Yes. Even though leopard geckos are crepuscular/nocturnal, low-level UVB exposure has been shown to raise vitamin D levels compared with no UVB exposure. That does not mean blasting desert-level UV everywhere; it means offering usable low-level UV as part of a controlled setup.
            </p>
          </GuideSection>

          <GuideSection Icon={CheckCircle2} iconColor="#22d3ee" title="Safe UVB Setup Strategy">
            <p className="text-slate-300 mb-4">
              Keep UVB concentrated over part of the warm zone and let intensity fall across the enclosure. Your gecko should always have a dark, low-UV retreat and multiple hides to choose from.
            </p>
            <p className="text-slate-300 mb-0">
              This mirrors good thermal design: choice, not forced exposure. UVB works best when geckos can self-regulate.
            </p>
          </GuideSection>

          <GuideSection Icon={ShieldAlert} iconColor="#f87171" title="Common UVB Mistakes">
            <ul className="space-y-2 text-slate-300 text-sm sm:text-base list-disc list-inside marker:text-orange-400/90 mb-0">
              <li>No UVB at all because “they are nocturnal”</li>
              <li>Mounting UVB through glass or dense mesh and assuming output is unchanged</li>
              <li>Running one bright zone without proper shade and hide options</li>
              <li>Treating UVB as a substitute for heating or calcium strategy</li>
            </ul>
          </GuideSection>

          <GuideSection Icon={Zap} iconColor="#a78bfa" title="Why This Matters (Evidence-Based)">
            <p className="text-slate-300 mb-4">
              UVB evidence in leopard geckos challenges the old all-or-nothing advice. Low-level exposure can improve vitamin D status, which supports a stronger long-term calcium pathway.
            </p>
            <p className="text-slate-300 mb-0">
              In beginner terms: a good UVB setup reduces hidden risk. It does not replace other basics, but it closes a common husbandry gap.
            </p>
          </GuideSection>

          <GuideSection Icon={CheckCircle2} iconColor="#34d399" title="How to Integrate UVB with the Rest of Your Setup">
            <p className="text-slate-300 mb-0">
              Pair UVB with stable heating, safe substrate, and proper supplementation. Use our{" "}
              <Link href="/guides/leopard-gecko-heating-guide" className="text-emerald-400 hover:text-emerald-300">Leopard Gecko Heating Guide</Link>
              ,{" "}
              <Link href="/guides/leopard-gecko-substrate" className="text-emerald-400 hover:text-emerald-300">Leopard Gecko Substrate Guide</Link>
              , and{" "}
              <Link href="/guides/leopard-gecko-setup" className="text-emerald-400 hover:text-emerald-300">Leopard Gecko Setup Guide</Link>
              {" "}to align the full system.
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
              <Link href="/guides/leopard-gecko-heating-guide" className="text-emerald-400 hover:text-emerald-300">Leopard Gecko Heating Guide</Link>
              {" · "}
              <Link href="/guides/leopard-gecko-setup" className="text-emerald-400 hover:text-emerald-300">Leopard Gecko Setup Guide</Link>
              {" · "}
              <Link href="/guides/leopard-gecko-enrichment-guide" className="text-emerald-400 hover:text-emerald-300">Leopard Gecko Enrichment Guide</Link>
            </p>
          </div>

          <div className="mt-16 text-center p-8 rounded-3xl bg-emerald-500/10 border border-emerald-500/30">
            <h2 className="text-2xl font-black text-white mb-4">UVB choices that fit your full habitat</h2>
            <p className="text-slate-300 max-w-xl mx-auto mb-6">
              BuildMyHabitat pairs lighting, heating, and enclosure rules so your leopard gecko setup includes practical UVB logic without unsafe overexposure.
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
