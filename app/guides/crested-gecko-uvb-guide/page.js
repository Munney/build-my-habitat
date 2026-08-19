"use client";

import React from "react";
import Link from "next/link";
import {
  Zap,
  Home,
  ShieldAlert,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  HelpCircle,
} from "lucide-react";
import Footer from "../../components/Footer";
import { FAQSchema } from "../../components/StructuredData";

export default function CrestedGeckoUVBGuidePage() {
  const faqs = [
    {
      question: "Do crested geckos need UVB?",
      answer:
        "Crested geckos can survive on a complete CGD diet without UVB, but ReptiFiles and current research strongly recommend low-level UVB (Arcadia ShadeDweller 7%) for optimal health and natural D3 synthesis.",
    },
    {
      question: "What UVB bulb should I use for a crested gecko?",
      answer:
        "ReptiFiles recommends the Arcadia ShadeDweller 7% T5 HO UVB kit. Place it on top of mesh, 10-15 inches above the gecko's highest basking point. Replace the bulb every 12 months even if it still produces visible light.",
    },
    {
      question: "Should I use calcium with or without D3 for crested geckos?",
      answer:
        "If using UVB: calcium WITHOUT D3 for regular dusting, plus Repashy Calcium Plus LoD as an all-in-one supplement. If no UVB: calcium WITH D3. Never combine high-D3 supplements with UVB — this causes D3 toxicity and organ damage.",
    },
    {
      question: "Can UVB go through glass?",
      answer:
        "No. Glass blocks UVB entirely. UVB must be mounted above a mesh top or inside the enclosure with no glass barrier between the bulb and the gecko. Dense mesh also reduces UVB output significantly.",
    },
    {
      question: "Is UVB required if I feed CGD?",
      answer:
        "CGD contains D3 and allows crested geckos to survive without UVB. However, research confirms they synthesize D3 from UVB exposure and benefit from it. UVB provides a more natural and reliable calcium metabolism pathway than supplementation alone.",
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
              Do Crested Geckos Need UVB?
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-6">
              Evidence-based answer on UVB for crested geckos: bulb recommendations, D3 supplementation rules, and safe setup placement.
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
              <li>Crested geckos <strong>survive on CGD</strong> without UVB</li>
              <li><strong>ReptiFiles recommends UVB</strong> for optimal health</li>
              <li>Use <strong>Arcadia ShadeDweller 7%</strong> T5 HO UVB kit</li>
              <li>Calcium <strong>WITHOUT D3</strong> if using UVB — never combine high D3 with UVB</li>
            </ul>
          </div>

          <GuideSection Icon={Zap} iconColor="#facc15" title="The Evidence on UVB for Crested Geckos">
            <p className="text-slate-300 mb-0">
              Crested geckos can survive on a complete CGD (Crested Gecko Diet) without UVB because the powder contains vitamin D3. However, research confirms they synthesize D3 from UVB exposure in the wild and benefit from low-level UVB in captivity. ReptiFiles strongly recommends providing UVB as part of a complete setup — it provides a more natural and reliable calcium metabolism pathway than supplementation alone.
            </p>
          </GuideSection>

          <GuideSection Icon={CheckCircle2} iconColor="#22d3ee" title="Recommended UVB Setup">
            <p className="text-slate-300 mb-4">
              The Arcadia ShadeDweller 7% T5 HO UVB kit is the gold standard for crested geckos. It provides low-level UVB appropriate for a crepuscular arboreal species without the risk of overexposure from higher-output bulbs.
            </p>
            <ul className="space-y-3 mb-0">
              <GuidePoint accent="purple">Arcadia ShadeDweller 7% T5 HO UVB kit — ReptiFiles recommended</GuidePoint>
              <GuidePoint accent="purple">Mount on top of mesh lid — 10-15&quot; above gecko&apos;s highest basking point</GuidePoint>
              <GuidePoint accent="purple">Replace UVB bulb every 12 months — output degrades even if light is visible</GuidePoint>
              <GuidePoint accent="purple">Run on a 12-14 hour timer to mimic natural day/night cycle</GuidePoint>
              <GuidePoint accent="purple">Pair with full spectrum LED (Arcadia JungleDawn) for live plants and natural lighting</GuidePoint>
            </ul>
          </GuideSection>

          <GuideSection Icon={ShieldAlert} iconColor="#f87171" title="D3 Supplementation Rules">
            <p className="text-slate-300 mb-4">
              UVB and D3 supplementation must be coordinated carefully. Combining high-D3 supplements with UVB causes D3 toxicity — a serious condition that damages organs over time.
            </p>
            <ul className="space-y-3 mb-0">
              <GuidePoint accent="purple"><strong>With UVB:</strong> Calcium WITHOUT D3 for regular dusting on insects</GuidePoint>
              <GuidePoint accent="purple"><strong>With UVB:</strong> Repashy Calcium Plus LoD as an all-in-one supplement option</GuidePoint>
              <GuidePoint accent="purple"><strong>Without UVB:</strong> Calcium WITH D3 — CGD alone may not provide enough</GuidePoint>
              <GuidePoint alert>Never combine high-D3 supplements with UVB — causes organ damage</GuidePoint>
            </ul>
          </GuideSection>

          <GuideSection Icon={Home} iconColor="#a855f7" title="UVB Placement and Enclosure Integration">
            <p className="text-slate-300 mb-4">
              UVB placement matters as much as bulb choice. Glass blocks UVB entirely, and dense mesh reduces output. The bulb must be positioned so the gecko can choose its exposure level — always provide shaded retreat areas.
            </p>
            <ul className="space-y-3 mb-0">
              <GuidePoint accent="purple">Mount above mesh top — never through glass (glass blocks 100% of UVB)</GuidePoint>
              <GuidePoint accent="purple">Dense screen mesh reduces UVB output — account for distance accordingly</GuidePoint>
              <GuidePoint accent="purple">Provide full shade retreats so the gecko can self-regulate exposure</GuidePoint>
              <GuidePoint accent="purple">Foliage and cork bark at multiple heights create natural UV gradients</GuidePoint>
            </ul>
          </GuideSection>

          <GuideSection Icon={CheckCircle2} iconColor="#34d399" title="UVB Without UVB: Both Valid Paths">
            <p className="text-slate-300 mb-0">
              <strong>With UVB:</strong> Better long-term calcium metabolism, more natural behavior, stronger overall health. Requires calcium WITHOUT D3 supplementation. <strong>Without UVB:</strong> Perfectly viable with complete CGD diet and calcium WITH D3 on insects. Many keepers use this path successfully. The builder supports both configurations and adjusts supplement recommendations accordingly.
            </p>
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
              <Link href="/guides/crested-gecko-diet-guide" className="text-purple-400 hover:text-purple-300">Crested Gecko Diet Guide</Link>
              {" · "}
              <Link href="/guides/crested-gecko-temperature-guide" className="text-purple-400 hover:text-purple-300">Crested Gecko Temperature Guide</Link>
            </p>
          </div>

          <div className="mt-16 text-center p-8 rounded-3xl bg-purple-500/10 border border-purple-500/30">
            <h2 className="text-2xl font-black text-white mb-4">UVB choices that fit your full habitat</h2>
            <p className="text-slate-300 max-w-xl mx-auto mb-6">
              BuildMyHabitat pairs UVB lighting with the correct supplement strategy so your crested gecko gets safe, evidence-based UVB without D3 toxicity risk.
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
