"use client";

import React from "react";
import Link from "next/link";
import {
  Droplets,
  Home,
  Flame,
  ShieldAlert,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  HelpCircle,
  Zap,
} from "lucide-react";
import Footer from "../../components/Footer";
import { FAQSchema } from "../../components/StructuredData";

export default function BallPythonHumidityGuidePage() {
  const faqs = [
    {
      question: "What humidity does a ball python need?",
      answer:
        "60-80% ambient humidity and 80-100% inside the humid hide. Low humidity is the #1 cause of dysecdysis (stuck shed).",
    },
    {
      question: "How do I raise humidity in a ball python enclosure?",
      answer:
        "Use a moisture-retentive substrate (4\" minimum depth), add a humid hide lined with damp sphagnum moss, and switch from glass to a PVC enclosure. These three changes handle most humidity issues.",
    },
    {
      question: "What is dysecdysis?",
      answer:
        "Dysecdysis is incomplete or stuck shed. It occurs when humidity is too low during the shed cycle. Retained shed constricts around toes, tail tip, and eye caps, cutting off circulation and causing permanent damage if not removed.",
    },
    {
      question: "How often should I mist a ball python enclosure?",
      answer:
        "With proper substrate and a humid hide, most setups need minimal misting. Monitor with a hygrometer and only mist if humidity drops below 60%. Over-misting can cause respiratory infections.",
    },
    {
      question: "Why does my ball python have a stuck shed?",
      answer:
        "Almost always caused by insufficient humidity during the shed cycle. Soak the snake in shallow lukewarm water for 15-20 minutes to loosen retained shed, then gently remove with a damp cloth.",
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
              Ball Python Humidity Guide
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-6">
              How to maintain 60-80% ambient humidity, set up a humid hide, and prevent dysecdysis (stuck shed).
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
              <li>Ambient humidity target: <strong>60-80%</strong></li>
              <li>Humid hide target: <strong>80-100%</strong> at all times</li>
              <li>Use 4&quot; minimum substrate depth to retain moisture naturally</li>
              <li>Mist as needed — digital hygrometer required</li>
            </ul>
          </div>

          <GuideSection Icon={Droplets} iconColor="#22d3ee" title="Why Humidity Matters for Ball Pythons">
            <p className="text-slate-300 mb-0">
              Ball pythons are native to the humid forests and grasslands of West and Central Africa where humidity is consistently 60-80% and their underground burrows reach near 100%. Low humidity is the primary cause of dysecdysis (stuck shed) which can cut off circulation to toes, tail tip, and eye caps if not addressed.
            </p>
          </GuideSection>

          <GuideSection Icon={Home} iconColor="#a855f7" title="Setting Up the Humid Hide">
            <p className="text-slate-300 mb-4">
              The humid hide is the most important humidity tool in a ball python enclosure. Place it on the cool-to-middle side, line with damp sphagnum moss, and ensure the snake can fully coil inside. Replace moss monthly to prevent mold. Target 80-100% inside.
            </p>
            <ul className="space-y-3 mb-0">
              <GuidePoint accent="amber">Damp not soaking wet — squeeze excess water from moss before use</GuidePoint>
              <GuidePoint accent="amber">Snake should fit completely inside with walls touching body</GuidePoint>
              <GuidePoint accent="amber">Place center to cool side — not directly under heat source</GuidePoint>
              <GuidePoint accent="amber">Replace sphagnum moss monthly or when it smells musty</GuidePoint>
            </ul>
          </GuideSection>

          <GuideSection Icon={Flame} iconColor="#fb923c" title="Substrate as a Humidity Tool">
            <p className="text-slate-300 mb-4">
              A 4&quot; minimum depth of moisture-retentive substrate is the most effective passive humidity tool. The DIY topsoil/ReptiSoil/playsand mix holds moisture from below and releases it slowly, naturally maintaining 60-80% without constant misting.
            </p>
            <ul className="space-y-3 mb-0">
              <GuidePoint accent="amber">40% organic topsoil + 40% Zoo Med ReptiSoil + 20% play sand</GuidePoint>
              <GuidePoint accent="amber">Pack firmly and moisten before introducing snake</GuidePoint>
              <GuidePoint accent="amber">4&quot; minimum depth — 6&quot; is better for adult snakes</GuidePoint>
              <GuidePoint accent="amber">Add moisture from below by pouring water at enclosure edge — not top</GuidePoint>
            </ul>
          </GuideSection>

          <GuideSection Icon={ShieldAlert} iconColor="#f87171" title="Common Humidity Mistakes">
            <ul className="space-y-3 mb-0">
              <GuidePoint alert>Glass enclosures lose humidity rapidly — PVC retains much better</GuidePoint>
              <GuidePoint alert>Measuring humidity at air level only — probe should be mid-enclosure</GuidePoint>
              <GuidePoint alert>Constant high humidity without ventilation causes respiratory infection</GuidePoint>
              <GuidePoint alert>Skipping the humid hide and relying only on ambient humidity</GuidePoint>
            </ul>
          </GuideSection>

          <GuideSection Icon={CheckCircle2} iconColor="#34d399" title="Signs of Correct vs Incorrect Humidity">
            <p className="text-slate-300 mb-0">
              <strong>Correct:</strong> Clean single-piece sheds, active exploration, normal feeding. <strong>Incorrect:</strong> Retained eye caps, stuck shed on tail or toes, dull appearance between sheds, loss of appetite before shed.
            </p>
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
              <Link href="/guides/ball-python-substrate-guide" className="text-amber-400 hover:text-amber-300">Ball Python Substrate Guide</Link>
              {" · "}
              <Link href="/guides/ball-python-shedding-guide" className="text-amber-400 hover:text-amber-300">Ball Python Shedding Guide</Link>
            </p>
          </div>

          <div className="mt-16 text-center p-8 rounded-3xl bg-amber-500/10 border border-amber-500/30">
            <h2 className="text-2xl font-black text-white mb-4">Humidity handled from day one</h2>
            <p className="text-slate-300 max-w-xl mx-auto mb-6">
              BuildMyHabitat pairs substrate, humid hides, and enclosure type so your ball python maintains safe humidity without guesswork.
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
