"use client";

import React from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Droplets,
  Box,
  ShieldAlert,
  Home,
  ArrowRight,
  ArrowLeft,
  HelpCircle,
  Zap,
} from "lucide-react";
import Footer from "../../components/Footer";
import { FAQSchema } from "../../components/StructuredData";

export default function BallPythonSubstrateGuidePage() {
  const faqs = [
    {
      question: "What is the best substrate for ball pythons?",
      answer:
        "The 40/40/20 mix of organic topsoil, Zoo Med ReptiSoil, and play sand is the top recommendation. It retains humidity naturally, allows burrowing, and is safe for ball pythons.",
    },
    {
      question: "How deep should ball python substrate be?",
      answer:
        "Minimum 4 inches. 6 inches is preferred for adult snakes to allow full burrowing behavior. Deeper substrate also retains humidity more effectively.",
    },
    {
      question: "Can ball pythons use coconut fiber substrate?",
      answer:
        "Yes — coconut fiber (Eco Earth) is a safe, humidity-retaining option. It works well on its own or as part of a mix. It's finer-textured than the topsoil mix and doesn't allow as much burrowing.",
    },
    {
      question: "Is cypress mulch safe for ball pythons?",
      answer:
        "Yes — cypress mulch is safe, retains humidity well, and looks natural. Use large pieces to reduce ingestion risk. Zoo Med Forest Floor is a commonly used brand.",
    },
    {
      question: "What substrates are toxic to ball pythons?",
      answer:
        "Cedar and pine are toxic — they contain aromatic oils that damage the respiratory system. Never use any cedar or pine products with ball pythons.",
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
              Ball Python Substrate Guide
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-6">
              The best substrates for humidity retention, burrowing, and safety — and what to avoid.
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
              <li>Best: <strong>40% topsoil + 40% ReptiSoil + 20% playsand</strong></li>
              <li>Minimum depth: <strong>4 inches</strong></li>
              <li>Alternatives: cypress mulch, coconut fiber</li>
              <li>Never use: cedar, pine, calcium sand, reptile carpet</li>
            </ul>
          </div>

          <GuideSection Icon={CheckCircle2} iconColor="#34d399" title="The DIY Substrate Mix">
            <p className="text-slate-300 mb-4">
              The ReptiFiles-recommended substrate for ball pythons is a 40/40/20 mix of organic topsoil, Zoo Med ReptiSoil, and play sand. This mix retains humidity naturally, allows burrowing, and is safe if accidentally ingested in small amounts.
            </p>
            <ul className="space-y-3 mb-0">
              <GuidePoint accent="amber">40% plain organic topsoil (no fertilizers or additives)</GuidePoint>
              <GuidePoint accent="amber">40% Zoo Med ReptiSoil</GuidePoint>
              <GuidePoint accent="amber">20% washed play sand (Quikrete or similar)</GuidePoint>
              <GuidePoint accent="amber">Mix thoroughly, dampen until clumps when squeezed, pack firmly</GuidePoint>
              <GuidePoint accent="amber">Minimum 4&quot; depth — 6&quot; preferred for adult snakes</GuidePoint>
            </ul>
          </GuideSection>

          <GuideSection Icon={Droplets} iconColor="#22d3ee" title="Substrate as a Humidity Tool">
            <p className="text-slate-300 mb-0">
              Substrate is your most powerful passive humidity tool. A 4&quot; layer of moisture-retentive substrate maintains 60-80% ambient humidity naturally without constant misting. Add water at the enclosure edges (not on top) to recharge moisture from below.
            </p>
          </GuideSection>

          <GuideSection Icon={Box} iconColor="#fb923c" title="Alternatives to the DIY Mix">
            <ul className="space-y-3 mb-0">
              <GuidePoint accent="amber">Cypress mulch: excellent humidity retention, attractive, safe</GuidePoint>
              <GuidePoint accent="amber">Coconut fiber (Eco Earth): good moisture retention, fine texture</GuidePoint>
              <GuidePoint accent="amber">Paper towels: quarantine and hatchlings only — does not retain humidity</GuidePoint>
              <GuidePoint accent="amber">Bio Dude Terra Firma: premium bioactive option, supports isopods</GuidePoint>
            </ul>
          </GuideSection>

          <GuideSection Icon={ShieldAlert} iconColor="#f87171" title="Dangerous Substrates">
            <ul className="space-y-3 mb-0">
              <GuidePoint alert>Cedar and pine: contain aromatic oils that are toxic to snakes</GuidePoint>
              <GuidePoint alert>Calcium sand: impaction risk and calcium toxicity if ingested</GuidePoint>
              <GuidePoint alert>Reptile carpet: harbors bacteria, difficult to sanitize, snags claws</GuidePoint>
              <GuidePoint alert>Aspen shavings: poor humidity retention, molds quickly when damp</GuidePoint>
              <GuidePoint alert>Wood chips: impaction risk, can harbor bacteria and mold</GuidePoint>
            </ul>
          </GuideSection>

          <GuideSection Icon={Home} iconColor="#a855f7" title="Setup and Maintenance">
            <ul className="space-y-3 mb-0">
              <GuidePoint accent="amber">Mix substrate dry, then add water until it clumps when squeezed</GuidePoint>
              <GuidePoint accent="amber">Pack firmly — loose substrate doesn&apos;t retain moisture or burrow shape</GuidePoint>
              <GuidePoint accent="amber">Spot clean waste weekly</GuidePoint>
              <GuidePoint accent="amber">Full substrate change every 3-6 months or when it smells</GuidePoint>
              <GuidePoint accent="amber">Add moisture at enclosure edges monthly to recharge from below</GuidePoint>
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
            </p>
          </div>

          <div className="mt-16 text-center p-8 rounded-3xl bg-amber-500/10 border border-amber-500/30">
            <h2 className="text-2xl font-black text-white mb-4">Substrate matched to your enclosure</h2>
            <p className="text-slate-300 max-w-xl mx-auto mb-6">
              BuildMyHabitat recommends compatible substrate options for your ball python setup with humidity and burrowing needs built in.
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
