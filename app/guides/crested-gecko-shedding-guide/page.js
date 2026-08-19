"use client";

import React from "react";
import Link from "next/link";
import {
  Droplets,
  Home,
  ShieldAlert,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  HelpCircle,
  Zap,
} from "lucide-react";
import Footer from "../../components/Footer";
import { FAQSchema } from "../../components/StructuredData";

export default function CrestedGeckoSheddingGuidePage() {
  const faqs = [
    {
      question: "How often do crested geckos shed?",
      answer:
        "Juveniles shed every 1-2 weeks as they grow rapidly. Adults shed every 4-6 weeks. Shedding frequency decreases with age. Increased shedding frequency in adults can indicate health issues.",
    },
    {
      question: "What are signs that a crested gecko is about to shed?",
      answer:
        "Color dulls and becomes ashy or grayish. The gecko may become less active, hide more, and refuse food 1-2 days before shedding. Eyes may appear cloudy or milky. These are all normal pre-shed behaviors.",
    },
    {
      question: "Do crested geckos eat their shed skin?",
      answer:
        "Yes. Crested geckos typically eat their shed skin after completing a shed. This is normal behavior — the shed contains nutrients and eating it is instinctive. You may never see the shed because they consume it quickly.",
    },
    {
      question: "How do I help my crested gecko shed?",
      answer:
        "Boost humidity to 80%+ during the shed cycle with extra misting. Do not handle the gecko during shedding. Ensure the enclosure has rough surfaces (cork bark, branches) for the gecko to rub against. Most sheds complete without intervention.",
    },
    {
      question: "What should I do about stuck shed on my crested gecko?",
      answer:
        "Increase humidity and mist more frequently. For stuck shed on toes or tail tip, create a humid hide with damp paper towel and place the gecko inside for 30 minutes. Gently remove loosened shed with a damp cotton swab. Never force or pull dry shed — this causes injury.",
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
              Crested Gecko Shedding Guide
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-6">
              Signs of an upcoming shed, humidity support during shedding, and how to safely help with stuck shed.
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
              <li>Color <strong>dulls and becomes ashy</strong> before shedding</li>
              <li>Boost humidity to <strong>80%+</strong> during the shed cycle</li>
              <li><strong>No handling</strong> during shedding — let them complete it naturally</li>
              <li>Crested geckos typically <strong>eat their shed</strong> skin after shedding</li>
            </ul>
          </div>

          <GuideSection Icon={Droplets} iconColor="#22d3ee" title="Signs Your Crested Gecko Is About to Shed">
            <p className="text-slate-300 mb-4">
              Shedding is a normal, healthy process. Recognizing the signs helps you provide the right support without unnecessary intervention.
            </p>
            <ul className="space-y-3 mb-0">
              <GuidePoint accent="purple">Color dulls and takes on an ashy or grayish appearance</GuidePoint>
              <GuidePoint accent="purple">Gecko becomes less active and hides more than usual</GuidePoint>
              <GuidePoint accent="purple">Appetite decreases 1-2 days before shedding — this is normal</GuidePoint>
              <GuidePoint accent="purple">Eyes may appear cloudy or milky during the shed cycle</GuidePoint>
              <GuidePoint accent="purple">Juveniles shed every 1-2 weeks; adults every 4-6 weeks</GuidePoint>
            </ul>
          </GuideSection>

          <GuideSection Icon={Droplets} iconColor="#a855f7" title="Humidity Support During Shedding">
            <p className="text-slate-300 mb-4">
              Proper humidity is the most important factor for a clean, complete shed. During the shed cycle, temporarily increase misting frequency to keep humidity at 80%+ for longer periods.
            </p>
            <ul className="space-y-3 mb-0">
              <GuidePoint accent="purple">Increase misting to 3-4 times daily during the shed cycle</GuidePoint>
              <GuidePoint accent="purple">Target 80%+ humidity for extended periods — not just brief spikes</GuidePoint>
              <GuidePoint accent="purple">Ensure rough surfaces (cork bark, branches) are available for rubbing</GuidePoint>
              <GuidePoint accent="purple">Do not handle the gecko during shedding — stress can interrupt the process</GuidePoint>
              <GuidePoint accent="purple">Return to normal wet/dry cycle once shedding is complete</GuidePoint>
            </ul>
          </GuideSection>

          <GuideSection Icon={CheckCircle2} iconColor="#34d399" title="Normal Shedding Behavior">
            <p className="text-slate-300 mb-0">
              Most crested gecko sheds complete without any intervention. The gecko will rub against rough surfaces, peel off the old skin in pieces, and typically eat the shed afterward. You may never see the shed skin because consumption is quick and thorough. A successful shed leaves the gecko with bright, vibrant coloration. Brief appetite loss before and during shedding is completely normal.
            </p>
          </GuideSection>

          <GuideSection Icon={ShieldAlert} iconColor="#f87171" title="Stuck Shed (Dysecdysis)">
            <p className="text-slate-300 mb-4">
              Stuck shed occurs when humidity is insufficient during the shed cycle. Retained shed on toes and tail tips is the most common problem — if not removed, it constricts circulation and can cause permanent damage or loss of digits.
            </p>
            <ul className="space-y-3 mb-0">
              <GuidePoint alert>Stuck shed on toes and tail tip can cause digit loss if not addressed</GuidePoint>
              <GuidePoint accent="purple">Increase humidity and mist more frequently at the first sign of stuck shed</GuidePoint>
              <GuidePoint accent="purple">Create a humid hide with damp paper towel for 30-minute sessions</GuidePoint>
              <GuidePoint accent="purple">Gently remove loosened shed with a damp cotton swab — never pull dry shed</GuidePoint>
              <GuidePoint alert>If stuck shed persists after humidity support, consult a reptile veterinarian</GuidePoint>
            </ul>
          </GuideSection>

          <GuideSection Icon={Home} iconColor="#e879f9" title="Preventing Shed Problems">
            <ul className="space-y-3 mb-0">
              <GuidePoint accent="purple">Maintain consistent wet/dry humidity cycling year-round</GuidePoint>
              <GuidePoint accent="purple">Provide multiple rough-textured surfaces at different heights</GuidePoint>
              <GuidePoint accent="purple">Monitor humidity with a digital hygrometer — do not guess</GuidePoint>
              <GuidePoint accent="purple">Increase misting proactively when pre-shed signs appear</GuidePoint>
              <GuidePoint accent="purple">Ensure proper hydration — offer CGD and mist regularly even outside shed cycles</GuidePoint>
            </ul>
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
              <Link href="/guides/crested-gecko-humidity-guide" className="text-purple-400 hover:text-purple-300">Crested Gecko Humidity Guide</Link>
            </p>
          </div>

          <div className="mt-16 text-center p-8 rounded-3xl bg-purple-500/10 border border-purple-500/30">
            <h2 className="text-2xl font-black text-white mb-4">Clean sheds from day one</h2>
            <p className="text-slate-300 max-w-xl mx-auto mb-6">
              BuildMyHabitat pairs humidity tools and enclosure setup so your crested gecko sheds cleanly without stuck shed problems.
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
