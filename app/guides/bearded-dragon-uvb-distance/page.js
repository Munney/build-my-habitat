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

export default function BeardedDragonUVBDistancePage() {
  const faqs = [
    {
      question: "How far should a T5 UVB bulb be from a bearded dragon?",
      answer:
        "Distance depends on bulb strength, reflector quality, and whether mesh is between the bulb and dragon. Many T5 setups land around roughly 10-18 inches from basking zone, but always follow the exact manufacturer chart for your bulb and fixture.",
    },
    {
      question: "Why does UVB distance matter so much?",
      answer:
        "UVB intensity drops quickly with distance. Too far means poor vitamin D3 synthesis and higher metabolic bone disease (MBD) risk. Too close can overexpose. Correct distance is required for safe, useful UVB.",
    },
    {
      question: "Are coil UVB bulbs okay for bearded dragons?",
      answer:
        "Coil UVB bulbs are generally a weak option for bearded dragons because coverage is narrow and intensity is inconsistent across basking zones. T5 linear UVB is the standard for reliable enclosure-wide coverage.",
    },
    {
      question: "Does mesh screen affect UVB output?",
      answer:
        "Yes. Screen can block a meaningful portion of UVB, especially denser mesh. If a screen is between bulb and basking zone, distance must account for that loss, or the fixture should be mounted inside safely.",
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
              Bearded Dragon UVB Distance Guide
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-6">
              UVB placement rules that prevent underexposure and MBD risk, plus how fixture type and screen tops change effective distance.
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
              <li>T5 UVB distance is usually in a mid-range window, commonly around <strong>10-18 inches</strong> depending on bulb strength and mounting</li>
              <li>Always verify distance against your manufacturer chart</li>
              <li>Screen between bulb and dragon reduces UVB output</li>
              <li>Pair UVB with basking light side-by-side over the basking zone</li>
            </ul>
          </div>

          <GuideSection Icon={ShieldAlert} iconColor="#f87171" title="Why UVB Distance Matters">
            <p className="text-slate-300 mb-0">
              Incorrect UVB distance is one of the fastest ways to create chronic deficiency. Too weak or too far contributes to poor calcium metabolism and raises risk of <strong>metabolic bone disease (MBD)</strong>. UVB setup is not just bulb choice; placement determines whether the bulb is doing useful work.
            </p>
          </GuideSection>

          <GuideSection Icon={Sun} iconColor="#facc15" title="T5 vs Coil UVB">
            <p className="text-slate-300 mb-0">
              <strong>T5 linear UVB</strong> is the standard because it provides broader, more consistent coverage at practical distances. <strong>Coil UVB</strong> sources are typically too narrow and variable for full bearded dragon basking zones, which makes correct long-term exposure harder to maintain.
            </p>
          </GuideSection>

          <GuideSection Icon={CheckCircle2} iconColor="#22d3ee" title="Screen Top vs No Screen">
            <p className="text-slate-300 mb-0">
              Screen mesh blocks part of UVB output. A fixture above mesh often needs adjusted distance versus inside-mount placement. If UVB is blocked by dense mesh or decorative covers, your dragon can be underexposed even when the bulb itself is correct.
            </p>
          </GuideSection>

          <GuideSection Icon={Sun} iconColor="#34d399" title="Placement with the Basking Light">
            <p className="text-slate-300 mb-0">
              Place UVB and basking heat <strong>side-by-side over the same basking zone</strong> so your dragon receives heat and UVB together while thermoregulating. Splitting these zones forces poor behavior tradeoffs and weakens your lighting strategy.
            </p>
          </GuideSection>

          <GuideSection Icon={Zap} iconColor="#a78bfa" title="Why This Matters (Evidence-Based)">
            <p className="text-slate-300 mb-4">
              Bearded dragon vitamin D work repeatedly shows UVB exposure drives much stronger vitamin D metabolite levels than relying on powder alone. That is why distance and placement are not “fine tuning”—they decide whether UVB is actually doing its job.
            </p>
            <p className="text-slate-300 mb-0">
              Clinical records also show metabolic bone disease still appears in captive dragons when core husbandry breaks down. Correct UVB distance is one of the easiest high-impact fixes because it controls a major failure point before symptoms appear.
            </p>
          </GuideSection>

          <GuideSection Icon={ShieldAlert} iconColor="#fb923c" title="Common Mistakes">
            <ul className="space-y-2 text-slate-300 text-sm sm:text-base list-disc list-inside marker:text-orange-400/90 mb-4">
              <li>Mounting UVB too far from basking height</li>
              <li>Using the wrong bulb type or strength for enclosure size</li>
              <li>Blocking UVB with dense screen, covers, or poor fixture placement</li>
              <li>Running UVB without checking replacement intervals</li>
            </ul>
            <p className="text-slate-300 mb-0">
              For full context, use our{" "}
              <Link href="/guides/bearded-dragon-lighting-uvb" className="text-emerald-400 hover:text-emerald-300">Bearded Dragon Lighting & UVB Guide</Link>
              {" "}and{" "}
              <Link href="/guides/bearded-dragon-mistakes" className="text-emerald-400 hover:text-emerald-300">Common Bearded Dragon Mistakes</Link>
              .
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
              <Link href="/guides/bearded-dragon-mistakes" className="text-emerald-400 hover:text-emerald-300">Common Bearded Dragon Mistakes</Link>
            </p>
          </div>

          <div className="mt-16 text-center p-8 rounded-3xl bg-emerald-500/10 border border-emerald-500/30">
            <h2 className="text-2xl font-black text-white mb-4">Get UVB distance right by default</h2>
            <p className="text-slate-300 max-w-xl mx-auto mb-6">
              BuildMyHabitat matches UVB strength, placement logic, and basking layout to safe bearded dragon standards so critical distance mistakes are filtered out before checkout.
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
