"use client";

import React from "react";
import Link from "next/link";
import {
  Zap,
  Home,
  ShieldAlert,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  HelpCircle,
} from "lucide-react";
import Footer from "../../components/Footer";
import { FAQSchema } from "../../components/StructuredData";

export default function CrestedGeckoDietGuidePage() {
  const faqs = [
    {
      question: "What do crested geckos eat?",
      answer:
        "CGD (Crested Gecko Diet) from Repashy or Pangea is the primary diet — a complete powdered food mixed with water. Supplement with live insects (dubia roaches, crickets) twice weekly for enrichment and additional protein.",
    },
    {
      question: "How often should I replace crested gecko food?",
      answer:
        "Replace CGD every 24-48 hours. It ferments quickly at room temperature and becomes unpalatable and potentially harmful. Remove uneaten food and offer fresh CGD daily or every other day.",
    },
    {
      question: "How often should I feed insects to my crested gecko?",
      answer:
        "Offer live insects twice per week as a supplement to CGD. Dust insects with calcium (WITHOUT D3 if using UVB, WITH D3 if no UVB). Insects provide enrichment and additional protein but are not a complete diet alone.",
    },
    {
      question: "What supplements do crested geckos need?",
      answer:
        "If using UVB: calcium WITHOUT D3 for insect dusting, plus Repashy Calcium Plus LoD as an all-in-one option. If no UVB: calcium WITH D3. Never combine high-D3 supplements with UVB.",
    },
    {
      question: "Can crested geckos eat only insects?",
      answer:
        "No. Insects alone do not provide complete nutrition for crested geckos. CGD must be the primary diet. Insects are a supplement for enrichment and additional protein, not a replacement for CGD.",
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
              Crested Gecko Diet Guide
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-6">
              CGD as primary food, feeding schedule, insect supplementation, and D3 rules for a complete crested gecko diet.
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
              <li><strong>CGD is the primary diet</strong> — Repashy or Pangea brands</li>
              <li>Replace CGD every <strong>24-48 hours</strong> — it ferments quickly</li>
              <li>Supplement with insects <strong>2x per week</strong></li>
              <li>Calcium <strong>WITHOUT D3</strong> if using UVB</li>
            </ul>
          </div>

          <GuideSection Icon={Zap} iconColor="#fb7185" title="CGD: The Primary Diet">
            <p className="text-slate-300 mb-4">
              Crested Gecko Diet (CGD) is a complete powdered food designed specifically for crested geckos. Brands like Repashy and Pangea formulate CGD with all essential vitamins, minerals, and nutrients. Mix with water to create a smoothie-like consistency and offer in a shallow dish on a ledge or the enclosure floor.
            </p>
            <ul className="space-y-3 mb-0">
              <GuidePoint accent="purple">Repashy and Pangea are the two most trusted CGD brands</GuidePoint>
              <GuidePoint accent="purple">Mix to a ketchup-thick consistency — not too runny, not too stiff</GuidePoint>
              <GuidePoint accent="purple">Offer CGD every night — crested geckos are primarily nocturnal feeders</GuidePoint>
              <GuidePoint accent="purple">Rotate flavors to prevent boredom and ensure dietary variety</GuidePoint>
              <GuidePoint accent="purple">CGD alone provides complete nutrition — insects are optional enrichment</GuidePoint>
            </ul>
          </GuideSection>

          <GuideSection Icon={CheckCircle2} iconColor="#22d3ee" title="Feeding Schedule and CGD Replacement">
            <ul className="space-y-3 mb-0">
              <GuidePoint accent="purple">Replace CGD every 24-48 hours — fermented food is unpalatable and harmful</GuidePoint>
              <GuidePoint accent="purple">Remove uneaten CGD before offering fresh — do not layer over old food</GuidePoint>
              <GuidePoint accent="purple">Offer insects twice weekly — dubia roaches and crickets are ideal</GuidePoint>
              <GuidePoint accent="purple">Feed insects in the evening when the gecko is most active</GuidePoint>
              <GuidePoint accent="purple">Juveniles may eat more frequently — adults often eat CGD every other night</GuidePoint>
            </ul>
          </GuideSection>

          <GuideSection Icon={Home} iconColor="#a855f7" title="Insect Supplementation">
            <p className="text-slate-300 mb-4">
              Live insects provide enrichment, hunting stimulation, and additional protein. They are a supplement to CGD, not a replacement. Offer insects twice weekly, gut-loaded and dusted with appropriate calcium.
            </p>
            <ul className="space-y-3 mb-0">
              <GuidePoint accent="purple">Dubia roaches and crickets are the best staple insects</GuidePoint>
              <GuidePoint accent="purple">Size insects appropriately — no wider than the space between the gecko&apos;s eyes</GuidePoint>
              <GuidePoint accent="purple">Gut-load insects 24 hours before feeding for maximum nutrition transfer</GuidePoint>
              <GuidePoint accent="purple">Dust with calcium before offering — WITHOUT D3 if using UVB</GuidePoint>
            </ul>
          </GuideSection>

          <GuideSection Icon={ShieldAlert} iconColor="#f87171" title="Supplement Rules (UVB vs No UVB)">
            <p className="text-slate-300 mb-4">
              Supplement strategy depends entirely on whether you provide UVB. Getting this wrong causes either deficiency (no D3 without UVB) or toxicity (too much D3 with UVB).
            </p>
            <ul className="space-y-3 mb-0">
              <GuidePoint accent="purple"><strong>With UVB:</strong> Calcium WITHOUT D3 for insect dusting</GuidePoint>
              <GuidePoint accent="purple"><strong>With UVB:</strong> Repashy Calcium Plus LoD as an all-in-one supplement</GuidePoint>
              <GuidePoint accent="purple"><strong>Without UVB:</strong> Calcium WITH D3 on insects — CGD provides some but may not be enough</GuidePoint>
              <GuidePoint alert>Never combine high-D3 supplements with UVB — causes organ damage over time</GuidePoint>
            </ul>
          </GuideSection>

          <GuideSection Icon={CheckCircle2} iconColor="#34d399" title="Common Diet Mistakes">
            <ul className="space-y-3 mb-0">
              <GuidePoint alert>Feeding only insects — insects alone are not a complete diet</GuidePoint>
              <GuidePoint alert>Leaving CGD for more than 48 hours — fermented food causes refusal to eat</GuidePoint>
              <GuidePoint alert>Using baby food or fruit puree as a diet — these lack essential nutrients</GuidePoint>
              <GuidePoint alert>Over-supplementing D3 when UVB is already provided — causes toxicity</GuidePoint>
              <GuidePoint alert>Not gut-loading insects before feeding — reduces nutritional value significantly</GuidePoint>
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
              <Link href="/guides/crested-gecko-uvb-guide" className="text-purple-400 hover:text-purple-300">Crested Gecko UVB Guide</Link>
            </p>
          </div>

          <div className="mt-16 text-center p-8 rounded-3xl bg-purple-500/10 border border-purple-500/30">
            <h2 className="text-2xl font-black text-white mb-4">Diet handled from day one</h2>
            <p className="text-slate-300 max-w-xl mx-auto mb-6">
              BuildMyHabitat pairs CGD, supplements, and feeding tools with your UVB choice so your crested gecko gets complete, safe nutrition.
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
