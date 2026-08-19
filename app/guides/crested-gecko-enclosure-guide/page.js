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

export default function CrestedGeckoEnclosureGuidePage() {
  const faqs = [
    {
      question: "What size enclosure does a crested gecko need?",
      answer:
        "Adults need a minimum of 18\"x18\"x24\" in TALL orientation. Recommended size is 18\"x18\"x36\" or 24\"x18\"x36\" for more vertical climbing space. Horizontal enclosures are never acceptable.",
    },
    {
      question: "Why do crested geckos need a tall enclosure?",
      answer:
        "Crested geckos are arboreal — they live in trees and spend most of their time climbing. A tall enclosure allows natural vertical movement, perching at different heights, and jumping behavior. Horizontal tanks prevent these behaviors and cause chronic stress.",
    },
    {
      question: "Can crested geckos live in a horizontal tank?",
      answer:
        "No. Horizontal enclosures cause chronic stress, suppress natural climbing behavior, and prevent the gecko from thermoregulating vertically. Always use a TALL enclosure with significantly more height than width or depth.",
    },
    {
      question: "Can I house two crested geckos together?",
      answer:
        "Never cohabitate males — they will fight, often resulting in serious injury or death. One male and one female can sometimes cohabitate in a large enclosure, but this risks breeding and stress. Housing geckos separately is always the safest option.",
    },
    {
      question: "Glass or screen enclosure for crested geckos?",
      answer:
        "Glass front-opening terrariums (Exo Terra, Zoo Med) are the standard. They retain humidity for the wet/dry cycle while providing visibility. Full screen enclosures lose humidity too quickly and are difficult to heat properly.",
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
              Crested Gecko Enclosure Guide
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-6">
              Why tall orientation is mandatory, minimum size requirements, and how to fill vertical space for a healthy arboreal setup.
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
              <li>Minimum: <strong>18&quot;x18&quot;x24&quot; TALL</strong> for adults</li>
              <li>Recommended: <strong>18&quot;x18&quot;x36&quot;</strong> or larger</li>
              <li>Horizontal orientation is <strong>never acceptable</strong></li>
              <li>Fill vertical space with vines, cork bark, and foliage at multiple heights</li>
            </ul>
          </div>

          <GuideSection Icon={Box} iconColor="#a855f7" title="Why Tall Orientation Is Mandatory">
            <p className="text-slate-300 mb-4">
              Crested geckos are arboreal reptiles native to the tree canopies of New Caledonia. They climb, jump, and perch at height — this is not optional behavior, it is their entire lifestyle. A horizontal tank forces them to live on the ground, which causes chronic stress, suppresses natural behavior, and leads to health problems over time.
            </p>
            <ul className="space-y-3 mb-0">
              <GuidePoint accent="purple">Height must exceed width and depth — TALL orientation only</GuidePoint>
              <GuidePoint accent="purple">Front-opening doors are strongly preferred for easy access and less stress</GuidePoint>
              <GuidePoint accent="purple">Horizontal tanks marketed for other reptiles are not suitable for crested geckos</GuidePoint>
              <GuidePoint accent="purple">The builder blocks horizontal enclosure selections automatically</GuidePoint>
            </ul>
          </GuideSection>

          <GuideSection Icon={Home} iconColor="#34d399" title="Filling Vertical Space">
            <p className="text-slate-300 mb-4">
              An empty tall tank is wasted space. Crested geckos need a three-dimensional environment with climbing routes from bottom to top. Think of the enclosure as a vertical forest, not a floor plan.
            </p>
            <ul className="space-y-3 mb-0">
              <GuidePoint accent="purple">Cork bark flats and tubes mounted vertically at multiple heights</GuidePoint>
              <GuidePoint accent="purple">Vines and branches creating climbing highways from bottom to top</GuidePoint>
              <GuidePoint accent="purple">Live or artificial foliage providing cover at upper, middle, and lower levels</GuidePoint>
              <GuidePoint accent="purple">Magnetic ledges and feeding platforms at mid to upper heights</GuidePoint>
              <GuidePoint accent="purple">Ensure the gecko can reach every level without falling — no dead-end perches</GuidePoint>
            </ul>
          </GuideSection>

          <GuideSection Icon={CheckCircle2} iconColor="#22d3ee" title="Size by Age">
            <ul className="space-y-3 mb-0">
              <GuidePoint accent="purple"><strong>Juveniles (under 15g):</strong> 12&quot;x12&quot;x18&quot; minimum — upgrade as they grow</GuidePoint>
              <GuidePoint accent="purple"><strong>Sub-adults (15-25g):</strong> 18&quot;x18&quot;x24&quot; minimum tall enclosure</GuidePoint>
              <GuidePoint accent="purple"><strong>Adults (25g+):</strong> 18&quot;x18&quot;x24&quot; minimum, 18&quot;x18&quot;x36&quot; recommended</GuidePoint>
              <GuidePoint accent="purple">When in doubt, go larger — crested geckos actively use all vertical space provided</GuidePoint>
              <GuidePoint accent="purple">Upgrade enclosure size as the gecko grows — do not keep adults in juvenile tanks</GuidePoint>
            </ul>
          </GuideSection>

          <GuideSection Icon={ShieldAlert} iconColor="#f87171" title="Never Cohabit Males">
            <p className="text-slate-300 mb-4">
              Male crested geckos are territorial and will fight when housed together. Injuries from cohabitation fights can be severe and are often fatal. Even in large enclosures, males will compete for territory and resources.
            </p>
            <ul className="space-y-3 mb-0">
              <GuidePoint alert>Two males in one enclosure will fight — this is not optional behavior</GuidePoint>
              <GuidePoint alert>One male + one female risks unwanted breeding and female stress</GuidePoint>
              <GuidePoint alert>Two females can sometimes cohabitate but stress and competition still occur</GuidePoint>
              <GuidePoint alert>One gecko per enclosure is always the safest and recommended approach</GuidePoint>
            </ul>
          </GuideSection>

          <GuideSection Icon={Box} iconColor="#e879f9" title="Glass vs Screen Enclosures">
            <p className="text-slate-300 mb-4">
              Glass front-opening terrariums are the gold standard for crested geckos. They retain humidity for the wet/dry cycle, provide excellent visibility, and are available in proper tall dimensions from Exo Terra, Zoo Med, and similar brands.
            </p>
            <ul className="space-y-3 mb-0">
              <GuidePoint accent="purple">Glass terrariums retain humidity between mistings — essential for the wet/dry cycle</GuidePoint>
              <GuidePoint accent="purple">Front-opening doors reduce stress compared to top-opening tanks</GuidePoint>
              <GuidePoint accent="purple">Full screen enclosures lose humidity too quickly and are hard to heat</GuidePoint>
              <GuidePoint accent="purple">Partial screen tops on glass tanks provide ventilation while retaining humidity</GuidePoint>
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
              {" · "}
              <Link href="/guides/crested-gecko-temperature-guide" className="text-purple-400 hover:text-purple-300">Crested Gecko Temperature Guide</Link>
            </p>
          </div>

          <div className="mt-16 text-center p-8 rounded-3xl bg-purple-500/10 border border-purple-500/30">
            <h2 className="text-2xl font-black text-white mb-4">The right enclosure from day one</h2>
            <p className="text-slate-300 max-w-xl mx-auto mb-6">
              BuildMyHabitat selects tall, properly sized enclosures and blocks horizontal configurations so your crested gecko gets the vertical space it needs.
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
