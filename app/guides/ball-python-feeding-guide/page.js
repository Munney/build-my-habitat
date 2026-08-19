"use client";

import React from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Flame,
  Home,
  ShieldAlert,
  ArrowRight,
  ArrowLeft,
  HelpCircle,
  Zap,
} from "lucide-react";
import Footer from "../../components/Footer";
import { FAQSchema } from "../../components/StructuredData";

export default function BallPythonFeedingGuidePage() {
  const faqs = [
    {
      question: "How often do ball pythons eat?",
      answer:
        "Juveniles eat every 5-7 days. Adults eat every 10-14 days. During breeding season or shed, refusal for several weeks is normal.",
    },
    {
      question: "What size prey for a ball python?",
      answer:
        "Prey should be approximately the same width as the widest part of the snake's body. A slight lump after eating is normal.",
    },
    {
      question: "Why is my ball python not eating?",
      answer:
        "Most common causes: shedding cycle, breeding season (males Oct-Feb), incorrect temperatures (warm hide must be 90-95°F), or stress from inadequate hides. Most refusals resolve on their own.",
    },
    {
      question: "Can I feed my ball python live prey?",
      answer:
        "No — live prey is dangerous. Rodents will bite and scratch in self-defense, causing wounds that can become infected. Frozen/thawed prey is equally nutritious and much safer.",
    },
    {
      question: "How long can ball pythons go without eating?",
      answer:
        "Healthy adult ball pythons can fast for 6-12 months without serious health consequences. Juveniles should not fast longer than 4-6 weeks without veterinary consultation.",
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
              Ball Python Feeding Guide
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-6">
              Prey sizing, feeding schedule, frozen vs live, and how to handle feeding strikes.
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
              <li>Prey width: same as widest part of snake&apos;s body</li>
              <li>Juveniles: every <strong>5-7 days</strong></li>
              <li>Adults: every <strong>10-14 days</strong></li>
              <li>Always feed frozen/thawed — never live</li>
            </ul>
          </div>

          <GuideSection Icon={CheckCircle2} iconColor="#34d399" title="Frozen/Thawed vs Live">
            <p className="text-slate-300 mb-4">
              Always feed frozen/thawed prey. Live prey will fight back — rodent bites are a documented cause of serious injury and death in ball pythons. Frozen/thawed is equally nutritious, safer, more humane, and easier to store.
            </p>
            <ul className="space-y-3 mb-0">
              <GuidePoint accent="amber">Thaw completely to room temperature before offering</GuidePoint>
              <GuidePoint accent="amber">Warm prey slightly (not hot) with warm water to increase scent</GuidePoint>
              <GuidePoint accent="amber">Use feeding tongs — never hand-feed to avoid training bite response</GuidePoint>
              <GuidePoint accent="amber">If snake refuses, try feeding in a separate paper bag or container</GuidePoint>
            </ul>
          </GuideSection>

          <GuideSection Icon={Flame} iconColor="#fb923c" title="Prey Sizing">
            <ul className="space-y-3 mb-0">
              <GuidePoint accent="amber">Prey should be approximately the same width as the widest part of the snake</GuidePoint>
              <GuidePoint accent="amber">Slight bulge after eating is normal and expected</GuidePoint>
              <GuidePoint accent="amber">Too large: regurgitation, stress, injury risk</GuidePoint>
              <GuidePoint accent="amber">Too small: nutritional deficiency over time</GuidePoint>
              <GuidePoint accent="amber">Mice vs rats: rats are more nutritious — transition early if possible</GuidePoint>
            </ul>
          </GuideSection>

          <GuideSection Icon={Home} iconColor="#a855f7" title="Feeding Schedule by Age">
            <ul className="space-y-3 mb-0">
              <GuidePoint accent="amber">Hatchlings (under 100g): every 5-7 days, pinky/fuzzy mice</GuidePoint>
              <GuidePoint accent="amber">Juveniles (100-500g): every 7 days, small rats or adult mice</GuidePoint>
              <GuidePoint accent="amber">Sub-adults (500g-1000g): every 10 days, small-medium rats</GuidePoint>
              <GuidePoint accent="amber">Adults (1000g+): every 10-14 days, medium-large rats</GuidePoint>
              <GuidePoint accent="amber">Gravid/breeding females may refuse for weeks — this is normal</GuidePoint>
            </ul>
          </GuideSection>

          <GuideSection Icon={ShieldAlert} iconColor="#f87171" title="Feeding Refusal">
            <p className="text-slate-300 mb-4">
              Ball pythons are notorious for refusing food — sometimes for weeks or months. This is usually normal and not an emergency. Common causes:
            </p>
            <ul className="space-y-3 mb-0">
              <GuidePoint accent="amber">Shedding cycle — snakes almost always refuse during blue phase</GuidePoint>
              <GuidePoint accent="amber">Breeding season (Oct-Feb) — males especially go off food</GuidePoint>
              <GuidePoint accent="amber">Temperature issues — check warm hide temp (must be 90-95°F)</GuidePoint>
              <GuidePoint accent="amber">Enclosure too large or insufficient hides — snake feels insecure</GuidePoint>
              <GuidePoint accent="amber">Recent move or handling — leave alone for 2 weeks</GuidePoint>
            </ul>
          </GuideSection>

          <GuideSection Icon={Zap} iconColor="#22d3ee" title="Handling After Feeding">
            <ul className="space-y-3 mb-0">
              <GuidePoint accent="amber">Wait 48-72 hours after feeding before handling</GuidePoint>
              <GuidePoint accent="amber">Handling too soon causes regurgitation — stressful and harmful</GuidePoint>
              <GuidePoint accent="amber">Regurgitation depletes nutrients and damages digestive tract</GuidePoint>
              <GuidePoint accent="amber">If regurgitation occurs: wait 2 weeks before attempting to feed again</GuidePoint>
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
            <h2 className="text-2xl font-black text-white mb-4">Feeding success starts with the right setup</h2>
            <p className="text-slate-300 max-w-xl mx-auto mb-6">
              BuildMyHabitat pairs enclosure size, heating, and hides so your ball python feels secure enough to eat consistently.
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
