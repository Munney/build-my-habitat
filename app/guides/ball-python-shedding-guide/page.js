"use client";

import React from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Droplets,
  ShieldAlert,
  Home,
  ArrowRight,
  ArrowLeft,
  HelpCircle,
  Zap,
} from "lucide-react";
import Footer from "../../components/Footer";
import { FAQSchema } from "../../components/StructuredData";

export default function BallPythonSheddingGuidePage() {
  const faqs = [
    {
      question: "How often do ball pythons shed?",
      answer:
        "Hatchlings shed every 3-4 weeks. Juveniles every 4-6 weeks. Adults every 6-12 weeks. Shed frequency slows as the snake ages.",
    },
    {
      question: "What does it mean when a ball python's eyes turn blue?",
      answer:
        "The snake is entering the blue phase of the shed cycle. Fluid builds up between the old and new skin, including over the eye caps. Leave the snake alone — this is completely normal.",
    },
    {
      question: "What do I do if my ball python has stuck shed?",
      answer:
        "Soak the snake in shallow lukewarm water for 15-20 minutes to loosen the shed, then gently remove with a damp cloth. Never force retained shed. Address the root cause by increasing humidity and refreshing the humid hide.",
    },
    {
      question: "Why is my ball python not shedding in one piece?",
      answer:
        "Fragmented sheds are almost always caused by insufficient humidity. Boost ambient humidity to 60-80% and ensure the humid hide has fresh damp sphagnum moss at all times.",
    },
    {
      question: "Should I help my ball python shed?",
      answer:
        "Not during a normal shed. Only intervene if shed is retained after 2+ weeks, or if you can see stuck shed on toes, tail, or eye caps. Soak first — never pull dry shed.",
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
              Ball Python Shedding Guide
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-6">
              Signs of upcoming shed, how to support healthy ecdysis, and what to do about stuck shed.
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
              <li>Pre-shed (blue phase): eyes cloud over, color dulls</li>
              <li>Do not handle during blue phase</li>
              <li>Boost humidity to <strong>70-80%+</strong> during shed cycle</li>
              <li>Healthy shed = single complete piece</li>
            </ul>
          </div>

          <GuideSection Icon={CheckCircle2} iconColor="#34d399" title="Signs Your Ball Python Is About to Shed">
            <ul className="space-y-3 mb-0">
              <GuidePoint accent="amber">Eyes turn blue/milky (eye caps filling with fluid)</GuidePoint>
              <GuidePoint accent="amber">Skin color becomes dull and pink/grayish</GuidePoint>
              <GuidePoint accent="amber">Reduced activity and appetite — completely normal</GuidePoint>
              <GuidePoint accent="amber">May become defensive or irritable — do not handle</GuidePoint>
              <GuidePoint accent="amber">Blue phase lasts 3-5 days, then eyes clear before actual shed</GuidePoint>
            </ul>
          </GuideSection>

          <GuideSection Icon={Droplets} iconColor="#22d3ee" title="Supporting a Healthy Shed">
            <ul className="space-y-3 mb-0">
              <GuidePoint accent="amber">Boost ambient humidity to 70-80%+ during shed cycle</GuidePoint>
              <GuidePoint accent="amber">Ensure humid hide is freshly moistened with damp sphagnum moss</GuidePoint>
              <GuidePoint accent="amber">Offer a large shallow soaking dish — snakes often soak before shedding</GuidePoint>
              <GuidePoint accent="amber">Do not handle or disturb during blue phase</GuidePoint>
              <GuidePoint accent="amber">Provide rough surfaces (cork bark, rocks) to help snake get purchase</GuidePoint>
            </ul>
          </GuideSection>

          <GuideSection Icon={ShieldAlert} iconColor="#f87171" title="Stuck Shed (Dysecdysis)">
            <p className="text-slate-300 mb-4">
              Stuck shed is almost always caused by low humidity. Retained shed constricts around toes, tail tip, and eye caps, cutting off circulation and causing permanent damage.
            </p>
            <ul className="space-y-3 mb-0">
              <GuidePoint alert>Check toes, tail tip, and eye caps after every shed</GuidePoint>
              <GuidePoint alert>Retained eye caps: do NOT pick at them — seek vet assistance</GuidePoint>
              <GuidePoint alert>Retained body shed: soak in shallow lukewarm water 15-20 minutes</GuidePoint>
              <GuidePoint alert>Gently remove loosened shed with damp cloth — never force</GuidePoint>
              <GuidePoint alert>Address root cause: increase humidity and check humid hide</GuidePoint>
            </ul>
          </GuideSection>

          <GuideSection Icon={Home} iconColor="#a855f7" title="After the Shed">
            <ul className="space-y-3 mb-0">
              <GuidePoint accent="amber">Inspect the shed — it should be one complete piece</GuidePoint>
              <GuidePoint accent="amber">Check that eye caps are present in the shed (two small circles)</GuidePoint>
              <GuidePoint accent="amber">If eye caps are missing, retained caps may still be on the snake</GuidePoint>
              <GuidePoint accent="amber">Wait 48-72 hours before handling after a successful shed</GuidePoint>
              <GuidePoint accent="amber">Resume normal feeding schedule</GuidePoint>
            </ul>
          </GuideSection>

          <GuideSection Icon={Zap} iconColor="#fb923c" title="Shed Frequency by Age">
            <ul className="space-y-3 mb-0">
              <GuidePoint accent="amber">Hatchlings: every 3-4 weeks (growing rapidly)</GuidePoint>
              <GuidePoint accent="amber">Juveniles: every 4-6 weeks</GuidePoint>
              <GuidePoint accent="amber">Adults: every 6-12 weeks</GuidePoint>
              <GuidePoint accent="amber">Frequency slows significantly as growth slows</GuidePoint>
              <GuidePoint accent="amber">More frequent sheds in young snakes are completely normal</GuidePoint>
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
              <Link href="/guides/ball-python-substrate-guide" className="text-amber-400 hover:text-amber-300">Ball Python Substrate Guide</Link>
            </p>
          </div>

          <div className="mt-16 text-center p-8 rounded-3xl bg-amber-500/10 border border-amber-500/30">
            <h2 className="text-2xl font-black text-white mb-4">Clean sheds start with proper humidity</h2>
            <p className="text-slate-300 max-w-xl mx-auto mb-6">
              BuildMyHabitat pairs substrate, humid hides, and enclosure type so your ball python sheds in one complete piece every time.
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
