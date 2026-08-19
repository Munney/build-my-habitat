"use client";

import React from "react";
import Link from "next/link";
import {
  Zap,
  CheckCircle2,
  ShieldAlert,
  Droplets,
  Home,
  ArrowRight,
  ArrowLeft,
  HelpCircle,
} from "lucide-react";
import Footer from "../../components/Footer";
import { FAQSchema } from "../../components/StructuredData";

export default function BallPythonUVBGuidePage() {
  const faqs = [
    {
      question: "Do ball pythons need UVB light?",
      answer:
        "They can survive without it, but ReptiFiles and current reptile welfare experts strongly recommend low-level UVB for optimal health. Research shows pythons benefit from UVB exposure for D3 synthesis.",
    },
    {
      question: "What UVB bulb is best for ball pythons?",
      answer:
        "The Arcadia T5 HO 6% Forest bulb is the top recommendation. Place it over the warm half of the enclosure, 12-18\" from the snake's position, and replace every 12 months.",
    },
    {
      question: "Can I use a coil UVB bulb for a ball python?",
      answer:
        "Not recommended. Coil bulbs produce inconsistent, narrow beam UVB that doesn't cover enough of the enclosure. T5 HO linear tubes are the standard for reliable UVB delivery.",
    },
    {
      question: "If I use UVB, do I still need to supplement D3?",
      answer:
        "Use calcium WITHOUT D3 for regular supplementation. Combining UVB-synthesized D3 with high-D3 supplements risks toxicity.",
    },
    {
      question: "How long should UVB be on for a ball python?",
      answer:
        "12 hours on, 12 hours off. Ball pythons need a consistent day/night cycle. Running UVB 24 hours disrupts hormonal rhythms.",
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
              Do Ball Pythons Need UVB?
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-6">
              The evidence for UVB in ball python enclosures and how to set it up correctly.
            </p>
            <Link href="/build/ball-python" className="inline-flex items-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-full transition-all">
              Build a Ball Python Habitat <ArrowRight size={20} />
            </Link>
          </div>

          <div className="mb-8 p-6 sm:p-8 rounded-3xl border-2 border-amber-500/35 bg-amber-500/[0.07] shadow-lg">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Zap className="text-amber-400 shrink-0" size={24} />
              Quick Answer
            </h2>
            <ul className="space-y-2.5 text-slate-300 text-sm sm:text-base">
              <li>Ball pythons can survive without UVB</li>
              <li>ReptiFiles strongly recommends low-level UVB for optimal health</li>
              <li>Use <strong>Arcadia T5 HO 6%</strong> over the warm side of the enclosure</li>
              <li>Replace every 12 months regardless of visible output</li>
            </ul>
          </div>

          <GuideSection Icon={Zap} iconColor="#fb923c" title="The Case for UVB in Ball Pythons">
            <p className="text-slate-300 mb-0">
              Ball pythons are crepuscular and occasionally diurnal in the wild. They do experience natural UVB exposure, particularly during basking periods at dawn and dusk. Research on related python species shows measurable increases in vitamin D3 metabolite levels with UVB exposure, supporting improved bone density and immune function.
            </p>
          </GuideSection>

          <GuideSection Icon={CheckCircle2} iconColor="#34d399" title="Recommended UVB Setup">
            <ul className="space-y-3 mb-0">
              <GuidePoint accent="amber">Arcadia T5 HO 6% Forest bulb — ReptiFiles top recommendation</GuidePoint>
              <GuidePoint accent="amber">Cover approximately half the enclosure length (warm side)</GuidePoint>
              <GuidePoint accent="amber">Mount inside enclosure or over open mesh (not under glass top)</GuidePoint>
              <GuidePoint accent="amber">Distance: 12-18&quot; from the snake&apos;s basking position</GuidePoint>
              <GuidePoint accent="amber">Run on 12-hour cycle with a timer</GuidePoint>
            </ul>
          </GuideSection>

          <GuideSection Icon={ShieldAlert} iconColor="#f87171" title="Supplementation Without UVB">
            <p className="text-slate-300 mb-4">If not providing UVB, supplement correctly:</p>
            <ul className="space-y-3 mb-0">
              <GuidePoint accent="amber">Calcium with D3: offer prey dusted lightly once per week</GuidePoint>
              <GuidePoint accent="amber">Do not over-supplement D3 — fat-soluble vitamins accumulate</GuidePoint>
              <GuidePoint accent="amber">Whole prey items (mice/rats) contain some natural D3</GuidePoint>
              <GuidePoint accent="amber">Without UVB, D3 supplementation must be consistent and measured</GuidePoint>
            </ul>
          </GuideSection>

          <GuideSection Icon={Droplets} iconColor="#22d3ee" title="UVB and the Supplement Interaction">
            <p className="text-slate-300 mb-0">
              If providing UVB, switch to calcium WITHOUT D3 for regular supplementation. Using high-D3 supplements alongside UVB-synthesized D3 risks hypervitaminosis D — calcium deposits in soft tissues and kidney damage.
            </p>
          </GuideSection>

          <GuideSection Icon={Home} iconColor="#a855f7" title="Common UVB Mistakes">
            <ul className="space-y-3 mb-0">
              <GuidePoint alert>Mounting UVB over glass or plastic — blocks UVB transmission</GuidePoint>
              <GuidePoint alert>Not replacing bulb after 12 months — UVB output declines invisibly</GuidePoint>
              <GuidePoint alert>Using a coil/compact UVB — insufficient and inconsistent output</GuidePoint>
              <GuidePoint alert>Placing UVB too far from the snake — reduces effective UVI</GuidePoint>
              <GuidePoint alert>Running UVB 24 hours — snakes need a dark cycle for hormonal health</GuidePoint>
            </ul>
          </GuideSection>

          <div className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <FAQItem key={i} question={faq.question} answer={faq.answer} accent="amber" />
              ))}
            </div>
          </div>

          <div className="my-12 p-6 rounded-2xl bg-slate-800/80 border border-slate-700">
            <h2 className="text-lg font-bold text-white mb-3">Related Guides</h2>
            <p className="text-slate-400 text-sm mb-0">
              <Link href="/guides/ball-python-setup" className="text-amber-400 hover:text-amber-300">Ball Python Setup Guide</Link>
              {" · "}
              <Link href="/guides/ball-python-heating-guide" className="text-amber-400 hover:text-amber-300">Ball Python Heating Guide</Link>
            </p>
          </div>

          <div className="mt-16 text-center p-8 rounded-3xl bg-amber-500/10 border border-amber-500/30">
            <h2 className="text-2xl font-black text-white mb-4">UVB matched to your heating setup</h2>
            <p className="text-slate-300 max-w-xl mx-auto mb-6">
              BuildMyHabitat pairs UVB bulbs, heat sources, and enclosure layout so your ball python gets safe, research-backed lighting from day one.
            </p>
            <Link href="/build/ball-python" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-full transition-all">
              Build a Ball Python Habitat <ArrowRight size={20} />
            </Link>
          </div>
        </div>
        <div className="max-w-3xl mx-auto mt-16 p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-white font-bold text-lg mb-1">Ready to build your setup?</h3>
            <p className="text-slate-400 text-sm">
              The builder selects compatible, research-verified products and generates your complete shopping list.
            </p>
          </div>
          <Link href="/build/ball-python" className="shrink-0 px-6 py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-full transition-all whitespace-nowrap">
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
