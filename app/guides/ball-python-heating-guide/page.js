"use client";

import React from "react";
import Link from "next/link";
import {
  Flame,
  Thermometer,
  ShieldAlert,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  HelpCircle,
  Zap,
} from "lucide-react";
import Footer from "../../components/Footer";
import { FAQSchema } from "../../components/StructuredData";

export default function BallPythonHeatingGuidePage() {
  const faqs = [
    {
      question: "What temperature should a ball python warm hide be?",
      answer:
        "90-95°F measured inside the warm hide at the floor surface where the snake rests. This is your most critical temperature reading.",
    },
    {
      question: "Do ball pythons need a thermostat?",
      answer:
        "Yes — absolutely required on every heat source. Place the probe inside the warm hide at snake level. Without a thermostat, temperatures can reach lethal levels.",
    },
    {
      question: "Can I use a heat mat as the only heat source for a ball python?",
      answer:
        "No — heat mats cannot warm the ambient air in an adult ball python enclosure. They work as supplemental heating only. Use an overhead halogen or DHP as your primary heat source.",
    },
    {
      question: "What is the best heat source for ball pythons?",
      answer:
        "Halogen PAR38 flood bulbs and the Arcadia Deep Heat Projector are the top recommendations. Both produce infrared heat that mimics natural solar warming and supports deep muscle thermoregulation.",
    },
    {
      question: "What temperature should the cool side of a ball python enclosure be?",
      answer:
        "75-80°F. This gives the snake a meaningful cool retreat for thermoregulation. A uniform temperature throughout the enclosure prevents proper thermoregulation and causes stress.",
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
              Ball Python Heating Guide
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-6">
              Warm hide temperatures, heat source selection, thermostat setup, and thermal gradient requirements.
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
              <li>Warm hide target: <strong>90-95°F</strong> (probe inside hide at snake level)</li>
              <li>Warm side ambient: <strong>88-92°F</strong></li>
              <li>Cool side: <strong>75-80°F</strong></li>
              <li>Night minimum: <strong>72°F</strong> — never let it drop below this</li>
            </ul>
          </div>

          <GuideSection Icon={Flame} iconColor="#fb923c" title="Heat Sources: What Works for Ball Pythons">
            <p className="text-slate-300 mb-4">
              Halogen PAR38 flood bulbs and the Arcadia Deep Heat Projector (DHP) are the two best heat sources. Both produce infrared heat that penetrates beneath the surface, supporting deep muscle warming that ball pythons experience from the sun in the wild.
            </p>
            <ul className="space-y-3 mb-0">
              <GuidePoint accent="amber">Halogen PAR38 90-100W: best for enclosures where ambient needs boosting</GuidePoint>
              <GuidePoint accent="amber">Arcadia DHP 50-80W: produces IR-A and IR-B for deep tissue warming</GuidePoint>
              <GuidePoint accent="amber">Radiant heat panels: excellent for large PVC enclosures</GuidePoint>
              <GuidePoint accent="amber">Heat mats: supplemental only — cannot heat ambient air sufficiently</GuidePoint>
              <GuidePoint alert>Never use: hot rocks, red/blue night bulbs, ceramic heat emitters as primary</GuidePoint>
            </ul>
          </GuideSection>

          <GuideSection Icon={Thermometer} iconColor="#34d399" title="Thermostat Setup & Probe Placement">
            <p className="text-slate-300 mb-4">
              Critical: the thermostat probe MUST be placed inside the warm hide at snake level — not on the heat mat surface or in open air. Probe placement is as important as having a thermostat at all.
            </p>
            <ul className="space-y-3 mb-0">
              <GuidePoint accent="amber">Probe inside warm hide at the level the snake rests</GuidePoint>
              <GuidePoint accent="amber">Set thermostat to maintain 90-95°F at probe location</GuidePoint>
              <GuidePoint accent="amber">Verify with infrared temp gun pointed at hide floor</GuidePoint>
              <GuidePoint accent="amber">Check temps after any room temperature change or season shift</GuidePoint>
            </ul>
          </GuideSection>

          <GuideSection Icon={ShieldAlert} iconColor="#f87171" title="Why Heat Mats Fail as Primary Heat">
            <p className="text-slate-300 mb-0">
              Heat mats only raise the floor surface temperature. They cannot warm the ambient air in a 4x2x2 enclosure to 88-92°F. Ball pythons need warm ambient air for proper thermoregulation, immune function, and digestion — not just a warm floor patch.
            </p>
          </GuideSection>

          <GuideSection Icon={CheckCircle2} iconColor="#22d3ee" title="Thermal Gradient Setup">
            <ul className="space-y-3 mb-0">
              <GuidePoint accent="amber">Warm hide on hot side: 90-95°F floor surface</GuidePoint>
              <GuidePoint accent="amber">Warm side ambient: 88-92°F measured 6&quot; above substrate</GuidePoint>
              <GuidePoint accent="amber">Cool side ambient: 75-80°F</GuidePoint>
              <GuidePoint accent="amber">Night drop: allow natural room temperature drop but never below 72°F</GuidePoint>
              <GuidePoint accent="amber">Measure all three zones with temp gun + digital thermometer</GuidePoint>
            </ul>
          </GuideSection>

          <GuideSection Icon={Zap} iconColor="#a855f7" title="Common Heating Mistakes">
            <ul className="space-y-3 mb-0">
              <GuidePoint alert>No thermostat on any heat source</GuidePoint>
              <GuidePoint alert>Thermostat probe on heat mat surface instead of inside warm hide</GuidePoint>
              <GuidePoint alert>Using heat mat alone as primary heat in adult enclosure</GuidePoint>
              <GuidePoint alert>Measuring only air temperature and ignoring warm hide surface</GuidePoint>
              <GuidePoint alert>Not rechecking temperatures after room temperature changes</GuidePoint>
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
              <Link href="/guides/ball-python-humidity-guide" className="text-amber-400 hover:text-amber-300">Ball Python Humidity Guide</Link>
              {" · "}
              <Link href="/guides/ball-python-enclosure-size" className="text-amber-400 hover:text-amber-300">Ball Python Enclosure Size Guide</Link>
            </p>
          </div>

          <div className="mt-16 text-center p-8 rounded-3xl bg-amber-500/10 border border-amber-500/30">
            <h2 className="text-2xl font-black text-white mb-4">Safe heating, pre-matched to your setup</h2>
            <p className="text-slate-300 max-w-xl mx-auto mb-6">
              BuildMyHabitat pairs heat sources, thermostat control, and enclosure layout so your ball python has a stable warm hide and safe full-tank gradient from the start.
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
