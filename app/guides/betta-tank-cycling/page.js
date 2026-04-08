"use client";

import React from "react";
import Link from "next/link";
import {
  Waves,
  FlaskConical,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  HelpCircle,
  Zap,
} from "lucide-react";
import Footer from "../../components/Footer";
import { FAQSchema } from "../../components/StructuredData";

export default function BettaTankCyclingPage() {
  const faqs = [
    {
      question: "How long does betta tank cycling take?",
      answer:
        "Most betta tanks cycle in about 2-4 weeks, but timeline depends on bacteria growth, temperature, and ammonia source consistency. Do not add fish until ammonia and nitrite both test at 0 while nitrate is present.",
    },
    {
      question: "What is the nitrogen cycle in a betta tank?",
      answer:
        "Cycling means beneficial bacteria convert toxic ammonia into nitrite, then into nitrate. Ammonia and nitrite must stay at 0 for fish safety; nitrate is removed with regular water changes.",
    },
    {
      question: "Is fishless cycling better than fish-in cycling?",
      answer:
        "Fishless cycling is safer and more controlled because no fish are exposed to ammonia or nitrite. Fish-in cycling can work in emergencies but needs stricter testing and water changes to prevent harm.",
    },
    {
      question: "Which tests do I need while cycling?",
      answer:
        "Use liquid tests for ammonia, nitrite, and nitrate. During active cycling, test frequently so you can confirm progression and avoid adding fish before biological filtration is stable.",
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
              Betta Fish Tank Cycling Guide
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-6">
              How to cycle your tank correctly so your betta avoids ammonia stress from day one.
            </p>
            <Link href="/build/betta" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full transition-all">
              Build a Betta Fish Setup <ArrowRight size={20} />
            </Link>
          </div>

          <div className="mb-8 p-6 sm:p-8 rounded-3xl border-2 border-sky-500/35 bg-sky-500/[0.07] shadow-lg">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Zap className="text-sky-400 shrink-0" size={24} />
              Quick Answer
            </h2>
            <ul className="space-y-2.5 text-slate-300 text-sm sm:text-base">
              <li>Most tanks need <strong>2-4 weeks</strong> to cycle</li>
              <li>Nitrogen cycle: <strong>ammonia -&gt; nitrite -&gt; nitrate</strong></li>
              <li>Only add fish when ammonia and nitrite stay at 0</li>
              <li>Use liquid tests for ammonia, nitrite, and nitrate</li>
            </ul>
          </div>

          <GuideSection Icon={Waves} iconColor="#38bdf8" title="What Cycling Actually Is">
            <p className="text-slate-300 mb-0">
              Tank cycling is the process of building beneficial bacteria that convert toxic waste: <strong>ammonia -&gt; nitrite -&gt; nitrate</strong>. Without this biofilter, new tanks can spike toxins fast and stress or kill fish.
            </p>
          </GuideSection>

          <GuideSection Icon={FlaskConical} iconColor="#60a5fa" title="Fishless Cycling vs Fish-In Cycling">
            <p className="text-slate-300 mb-4">
              <strong>Fishless cycling</strong> is the best default: dose ammonia source, feed bacteria, and complete the cycle before adding livestock. It gives you control and avoids exposing fish to toxins.
            </p>
            <p className="text-slate-300 mb-0">
              <strong>Fish-in cycling</strong> is a backup method only when fish are already present. It requires very frequent testing and water changes to keep ammonia and nitrite down while bacteria establish.
            </p>
          </GuideSection>

          <GuideSection Icon={CheckCircle2} iconColor="#34d399" title="How to Test Water During Cycling">
            <p className="text-slate-300 mb-0">
              Use a liquid test kit and track <strong>ammonia, nitrite, nitrate</strong>. Early stage: ammonia rises. Mid stage: nitrite rises. Late stage: nitrate appears while ammonia and nitrite drop to zero. That final pattern is your go-live signal.
            </p>
          </GuideSection>

          <GuideSection Icon={Zap} iconColor="#a78bfa" title="Why This Matters (Evidence-Based)">
            <p className="text-slate-300 mb-4">
              Fish stress data consistently show water-quality drops trigger measurable stress responses fast, including higher stress hormones when ammonia and nitrite climb. So cycling is not just a “numbers game”—it directly changes how safe the tank feels to the fish.
            </p>
            <p className="text-slate-300 mb-0">
              Nitrite is especially deceptive because it can look like a temporary stage while still harming fish. The safer rule is simple: do not stock until ammonia and nitrite hold at zero, not just once, but consistently.
            </p>
          </GuideSection>

          <GuideSection Icon={AlertTriangle} iconColor="#f87171" title="Common Cycling Mistakes">
            <ul className="space-y-2 text-slate-300 text-sm sm:text-base list-disc list-inside marker:text-orange-400/90 mb-4">
              <li>Adding fish before ammonia and nitrite are both 0</li>
              <li>Assuming clear water means cycled water</li>
              <li>Skipping nitrate checks and missing cycle completion</li>
              <li>Overcleaning filter media and resetting bacteria</li>
            </ul>
            <p className="text-slate-300 mb-0">
              See our{" "}
              <Link href="/guides/betta-setup" className="text-sky-400 hover:text-sky-300">Complete Betta Fish Setup Guide</Link>
              {" "}and{" "}
              <Link href="/guides/betta-temperature-guide" className="text-sky-400 hover:text-sky-300">Betta Temperature Guide</Link>
              {" "}to align cycling with full habitat stability.
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
              <Link href="/guides/betta-setup" className="text-sky-400 hover:text-sky-300">Complete Betta Fish Setup Guide</Link>
              {" · "}
              <Link href="/guides/betta-temperature-guide" className="text-sky-400 hover:text-sky-300">Betta Temperature Guide</Link>
            </p>
          </div>

          <div className="mt-16 text-center p-8 rounded-3xl bg-blue-500/10 border border-blue-500/30">
            <h2 className="text-2xl font-black text-white mb-4">Cycle-first setups, built to protect fish</h2>
            <p className="text-slate-300 max-w-xl mx-auto mb-6">
              BuildMyHabitat aligns tank size, filtration, and setup sequence so you can complete the nitrogen cycle correctly before stocking and avoid beginner-cycle crashes.
            </p>
            <Link href="/build/betta" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full transition-all">
              Build a Betta Fish Setup <ArrowRight size={20} />
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
        <HelpCircle size={20} className={`text-blue-400 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && <div className="px-6 pb-4"><p className="text-slate-300 leading-relaxed">{answer}</p></div>}
    </div>
  );
}
