"use client";

import React from "react";
import Link from "next/link";
import {
  Box,
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

export default function BallPythonEnclosureSizePage() {
  const faqs = [
    {
      question: "What size enclosure does a ball python need?",
      answer:
        "Adults need a minimum of 4x2x2 ft (48\"x24\"x24\"). 40-gallon tanks are severely undersized and cause chronic stress and feeding refusal.",
    },
    {
      question: "Can a ball python live in a 40-gallon tank?",
      answer:
        "Not recommended for adults. The 36\" length of a 40-gallon breeder cannot provide a proper thermal gradient. Most keepers see feeding issues and chronic stress in adult ball pythons kept in 40-gallon tanks.",
    },
    {
      question: "Is PVC better than glass for ball pythons?",
      answer:
        "Yes — PVC retains humidity passively while glass loses it rapidly. Ball pythons need 60-80% ambient humidity which is very difficult to maintain in glass without constant misting.",
    },
    {
      question: "What size enclosure for a baby ball python?",
      answer:
        "Hatchlings do well in 10-20 gallon enclosures or appropriately sized PVC tubs. Oversized enclosures can stress hatchlings — upgrade size gradually as the snake grows.",
    },
    {
      question: "How big do ball pythons get?",
      answer:
        "Females typically reach 3-5 feet and 1,500-2,500g. Males are smaller at 2-3.5 feet and 800-1,500g. Females generally need the full 4x2x2 while males may be comfortable in slightly smaller adult enclosures.",
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
              Ball Python Enclosure Size Guide
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-6">
              Why adults need 4x2x2 minimum and why 40-gallon tanks cause chronic stress and feeding refusal.
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
              <li>Adult minimum: <strong>4x2x2 ft (48&quot;x24&quot;x24&quot;)</strong> — approx 120 gallons</li>
              <li>PVC preferred over glass for humidity retention</li>
              <li>40-gallon tanks are severely undersized for adults</li>
              <li>Juveniles can start smaller but must be upgraded</li>
            </ul>
          </div>

          <GuideSection Icon={Box} iconColor="#fb923c" title="The 4x2x2 Minimum Standard">
            <p className="text-slate-300 mb-4">
              The 4x2x2 (48&quot;x24&quot;x24&quot;) is the current ReptiFiles and expert consensus minimum for adult ball pythons. It provides enough floor space for a proper thermal gradient, three hides, enrichment, and natural exploratory behavior.
            </p>
            <ul className="space-y-3 mb-0">
              <GuidePoint accent="amber">Floor space matters more than height — ball pythons are terrestrial</GuidePoint>
              <GuidePoint accent="amber">48&quot; length allows a meaningful warm-to-cool gradient</GuidePoint>
              <GuidePoint accent="amber">24&quot; width gives room for both a warm and cool hide side by side</GuidePoint>
              <GuidePoint accent="amber">PVC enclosures retain humidity far better than glass</GuidePoint>
            </ul>
          </GuideSection>

          <GuideSection Icon={ShieldAlert} iconColor="#f87171" title="Why 40-Gallon Tanks Fail">
            <p className="text-slate-300 mb-4">
              A 40-gallon breeder (36&quot;x18&quot;x18&quot;) is 12 inches shorter than the minimum. This prevents a proper thermal gradient, forces the snake to choose between warmth and security, and is directly linked to feeding refusal and chronic stress in adult ball pythons.
            </p>
            <ul className="space-y-3 mb-0">
              <GuidePoint alert>Cannot create proper warm-to-cool gradient in 36&quot; length</GuidePoint>
              <GuidePoint alert>Snake cannot thermoregulate without choosing between warm or cool</GuidePoint>
              <GuidePoint alert>Chronic stress suppresses immune function and appetite</GuidePoint>
              <GuidePoint alert>Older care sheets recommending 40-gallon are outdated</GuidePoint>
            </ul>
          </GuideSection>

          <GuideSection Icon={Home} iconColor="#34d399" title="Glass vs PVC Enclosures">
            <ul className="space-y-3 mb-0">
              <GuidePoint accent="amber">PVC retains humidity passively — glass loses it rapidly through gaps</GuidePoint>
              <GuidePoint accent="amber">Glass requires constant misting to maintain 60-80% humidity</GuidePoint>
              <GuidePoint accent="amber">PVC is lighter, insulates better, and is easier to maintain</GuidePoint>
              <GuidePoint accent="amber">Front-opening doors on PVC are less stressful for the snake</GuidePoint>
              <GuidePoint accent="amber">Zen Habitats and Vision Cages are popular PVC options</GuidePoint>
            </ul>
          </GuideSection>

          <GuideSection Icon={CheckCircle2} iconColor="#22d3ee" title="Juvenile Sizing">
            <ul className="space-y-3 mb-0">
              <GuidePoint accent="amber">Hatchlings (under 100g): 10-20 gallon or small PVC tub</GuidePoint>
              <GuidePoint accent="amber">Juveniles (100-400g): 20-40 gallon</GuidePoint>
              <GuidePoint accent="amber">Sub-adults (400-800g): 40 gallon temporarily — upgrade soon</GuidePoint>
              <GuidePoint accent="amber">Adults (800g+): 4x2x2 minimum, no exceptions</GuidePoint>
              <GuidePoint accent="amber">Upgrade before the snake feels cramped — not after</GuidePoint>
            </ul>
          </GuideSection>

          <GuideSection Icon={Zap} iconColor="#a855f7" title="Enrichment in a Properly Sized Enclosure">
            <p className="text-slate-300 mb-0">
              A 4x2x2 gives you room to provide real enrichment: multiple hides at different temperature zones, climbing cork logs, a large soaking water bowl, and deep substrate for burrowing. These are impossible in a 40-gallon tank.
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
              <Link href="/guides/ball-python-heating-guide" className="text-amber-400 hover:text-amber-300">Ball Python Heating Guide</Link>
              {" · "}
              <Link href="/guides/ball-python-humidity-guide" className="text-amber-400 hover:text-amber-300">Ball Python Humidity Guide</Link>
            </p>
          </div>

          <div className="mt-16 text-center p-8 rounded-3xl bg-amber-500/10 border border-amber-500/30">
            <h2 className="text-2xl font-black text-white mb-4">Right-sized enclosure from day one</h2>
            <p className="text-slate-300 max-w-xl mx-auto mb-6">
              BuildMyHabitat pairs enclosure size, heating, and humidity so your ball python has room to thermoregulate and thrive without chronic stress.
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
