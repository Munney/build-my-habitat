"use client";

import React from "react";
import Link from "next/link";
import {
  Thermometer,
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

export default function CrestedGeckoTemperatureGuidePage() {
  const faqs = [
    {
      question: "What temperature do crested geckos need?",
      answer:
        "72-78°F ambient during the day with a natural drop to 65-72°F at night. Maximum warm spot should be 80-82°F. Temperatures above 85°F cause heat stress and above 90°F can be fatal within hours.",
    },
    {
      question: "Do crested geckos need a heat lamp?",
      answer:
        "Usually not. Room temperature of 68-76°F is often sufficient. If supplemental heat is needed, use a low-wattage bulb (25-35W) with a thermostat. Never exceed 82°F at the warm spot.",
    },
    {
      question: "Why is overheating the #1 killer of crested geckos?",
      answer:
        "Crested geckos evolved in cool New Caledonian cloud forests and have no tolerance for high heat. Unlike desert species, they cannot regulate body temperature effectively above 85°F. Heat lamps, direct sunlight, or hot rooms can push temperatures past fatal limits within hours.",
    },
    {
      question: "What are signs of heat stress in crested geckos?",
      answer:
        "Signs include: gaping mouth, lethargy, hiding on the cool side constantly, loss of appetite, rapid breathing, and in severe cases, seizures or death. If you see these signs, check temperature immediately and cool the enclosure.",
    },
    {
      question: "Can I keep a crested gecko in a hot room?",
      answer:
        "No. Rooms above 80°F are dangerous. If your home runs hot in summer, use air conditioning or move the enclosure to the coolest room. Never place the tank in direct sunlight — glass enclosures heat up rapidly and can reach fatal temperatures in minutes.",
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
              Crested Gecko Temperature Guide
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-6">
              Safe temperature ranges, why crested geckos are heat-sensitive, and how to prevent the overheating that kills more geckos than any other mistake.
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
              <li>Daytime ambient: <strong>72-78°F</strong></li>
              <li>Maximum warm spot: <strong>80-82°F</strong></li>
              <li>Above <strong>90°F is fatal</strong> — can kill within hours</li>
              <li>Night drop: <strong>65-72°F</strong> (natural and beneficial)</li>
            </ul>
          </div>

          <GuideSection Icon={ShieldAlert} iconColor="#f87171" title="Overheating: The #1 Killer">
            <p className="text-slate-300 mb-4">
              Overheating is the single most common cause of death in crested geckos. Unlike leopard geckos or bearded dragons, crested geckos evolved in cool cloud forests and have virtually no heat tolerance. Temperatures above 85°F cause acute heat stress. Above 90°F can be fatal within hours — not days.
            </p>
            <ul className="space-y-3 mb-0">
              <GuidePoint alert>Never place the enclosure in direct sunlight — glass tanks heat rapidly</GuidePoint>
              <GuidePoint alert>Heat lamps without thermostats are dangerous — always use temperature control</GuidePoint>
              <GuidePoint alert>Hot rooms in summer are a silent killer — monitor with digital thermometers</GuidePoint>
              <GuidePoint alert>Powerful basking bulbs designed for desert species are completely inappropriate</GuidePoint>
            </ul>
          </GuideSection>

          <GuideSection Icon={Thermometer} iconColor="#22d3ee" title="Safe Temperature Ranges">
            <ul className="space-y-3 mb-0">
              <GuidePoint accent="purple"><strong>Daytime ambient:</strong> 72-78°F across the enclosure</GuidePoint>
              <GuidePoint accent="purple"><strong>Maximum warm spot:</strong> 80-82°F at the highest basking point</GuidePoint>
              <GuidePoint accent="purple"><strong>Nighttime drop:</strong> 65-72°F — this natural cycle is beneficial</GuidePoint>
              <GuidePoint accent="purple"><strong>Room temperature:</strong> 68-76°F is often sufficient without any heat source</GuidePoint>
              <GuidePoint accent="purple"><strong>Danger zone:</strong> Above 85°F causes stress; above 90°F is potentially fatal</GuidePoint>
            </ul>
          </GuideSection>

          <GuideSection Icon={Flame} iconColor="#fb923c" title="Supplemental Heat (When Needed)">
            <p className="text-slate-300 mb-4">
              Most crested geckos do not need supplemental heat if room temperature stays within 68-76°F. If your home runs cool, a low-wattage bulb (25-35W) on a thermostat provides gentle warmth without risk.
            </p>
            <ul className="space-y-3 mb-0">
              <GuidePoint accent="purple">Use a low-wattage bulb (25-35W) — never high-wattage desert basking bulbs</GuidePoint>
              <GuidePoint accent="purple">Always connect heat sources to a thermostat — unregulated heat is dangerous</GuidePoint>
              <GuidePoint accent="purple">Place heat on one side to create a warm-to-cool gradient</GuidePoint>
              <GuidePoint accent="purple">Turn off supplemental heat at night to allow the natural temperature drop</GuidePoint>
            </ul>
          </GuideSection>

          <GuideSection Icon={CheckCircle2} iconColor="#34d399" title="Monitoring Temperature">
            <p className="text-slate-300 mb-4">
              Accurate temperature monitoring is non-negotiable. Use digital thermometers with probes placed at gecko level in both the warm and cool zones. An infrared temperature gun helps verify surface temperatures on basking perches.
            </p>
            <ul className="space-y-3 mb-0">
              <GuidePoint accent="purple">Digital probe thermometers at warm and cool zones — check daily</GuidePoint>
              <GuidePoint accent="purple">Infrared temp gun for verifying basking perch surface temperatures</GuidePoint>
              <GuidePoint accent="purple">Monitor closely during summer — air conditioning may be needed</GuidePoint>
              <GuidePoint accent="purple">Check temperatures after any enclosure move or room change</GuidePoint>
            </ul>
          </GuideSection>

          <GuideSection Icon={ShieldAlert} iconColor="#e879f9" title="Signs of Heat Stress">
            <p className="text-slate-300 mb-0">
              <strong>Early signs:</strong> Hiding exclusively on the cool side, reduced activity, loss of appetite. <strong>Severe signs:</strong> Gaping mouth, rapid breathing, lethargy, inability to cling to surfaces, seizures. If you observe any of these, check temperature immediately. Move the gecko to a cooler area and verify enclosure temps with a thermometer — do not guess.
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
              <Link href="/guides/crested-gecko-enclosure-guide" className="text-purple-400 hover:text-purple-300">Crested Gecko Enclosure Guide</Link>
            </p>
          </div>

          <div className="mt-16 text-center p-8 rounded-3xl bg-purple-500/10 border border-purple-500/30">
            <h2 className="text-2xl font-black text-white mb-4">Safe temperatures from day one</h2>
            <p className="text-slate-300 max-w-xl mx-auto mb-6">
              BuildMyHabitat blocks dangerous heating configurations and pairs compatible thermostats so your crested gecko stays within safe temperature ranges.
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
