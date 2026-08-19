"use client";

import React from "react";
import Link from "next/link";
import {
  Box,
  Flame,
  Droplets,
  Home,
  Pill,
  ArrowRight,
  ArrowLeft,
  ShieldAlert,
  CheckCircle2,
  HelpCircle,
} from "lucide-react";

import Footer from "../../components/Footer";
import { FAQSchema } from "../../components/StructuredData";

export default function CrestedGeckoGuidePage() {
  const faqs = [
    {
      question: "What size enclosure does a crested gecko need?",
      answer:
        "Adults need a minimum of 18\"x18\"x24\" in TALL orientation. Crested geckos are arboreal and must have vertical climbing space. Horizontal enclosures cause chronic stress. Recommended size is 18\"x18\"x36\" or larger.",
    },
    {
      question: "What temperature do crested geckos need?",
      answer:
        "72-78°F ambient daytime with a natural drop to 65-72°F at night. Temperatures above 85°F cause heat stress and above 90°F can be fatal within hours. This is the #1 cause of death in crested geckos.",
    },
    {
      question: "Do crested geckos need UVB?",
      answer:
        "Crested geckos can survive on CGD diet alone, but ReptiFiles strongly recommends low-level UVB (Arcadia ShadeDweller 7%) for optimal health. Research confirms they synthesize D3 from UVB exposure and benefit from it.",
    },
    {
      question: "How do I maintain humidity for crested geckos?",
      answer:
        "Mist twice daily to spike humidity to 80%+, then allow it to dry to 40-50% before the next misting. This wet/dry cycle is essential. Constant high humidity causes respiratory infections.",
    },
    {
      question: "What do crested geckos eat?",
      answer:
        "CGD (Crested Gecko Diet) from Repashy or Pangea is the primary diet — a complete powdered food mixed with water. Supplement with live insects twice weekly. Replace CGD every 24-48 hours as it ferments quickly.",
    },
    {
      question: "Do crested geckos need a heat lamp?",
      answer:
        "Usually not — room temperature of 68-76°F is often sufficient. If supplemental heat is needed, use a low-wattage bulb (25-35W) with a thermostat. Never exceed 82°F at the warm spot.",
    },
    {
      question: "Can crested geckos live in a horizontal enclosure?",
      answer:
        "No — horizontal enclosures cause chronic stress and prevent natural behavior. Crested geckos are arboreal and must have vertical space to climb. Always use a TALL enclosure.",
    },
    {
      question: "What supplements do crested geckos need?",
      answer:
        "If using UVB: calcium WITHOUT D3 for regular dusting, plus Repashy Calcium Plus LoD as an all-in-one supplement. If no UVB: calcium WITH D3. Never combine high D3 supplementation with UVB as it causes toxicity.",
    },
    {
      question: "Can I skip this guide and use the builder?",
      answer:
        "Yes. The builder applies all these principles, blocks dangerous configurations like horizontal enclosures and overheating risks, and generates a complete compatible shopping list.",
    },
  ];

  return (
    <>
      <FAQSchema faqs={faqs} />
      <main className="min-h-screen pt-28 pb-20 px-6 relative z-10">
        <div className="max-w-4xl mx-auto mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-medium text-base group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back to Hub
          </Link>
        </div>

        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4 drop-shadow-lg leading-tight">
            Complete Crested Gecko Setup Guide{" "}
            <span className="text-purple-400 text-3xl md:text-4xl font-semibold">(Beginner Friendly)</span>
          </h1>
          <h2 className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto mb-6">
            Enclosure size, temperature, humidity cycling, UVB, and essential equipment explained step by step.
          </h2>

          <p className="text-base text-slate-400 leading-relaxed max-w-2xl mx-auto mb-8">
            If you want a full explanation, read on. If you want a safe setup fast, the builder handles this step by step.
          </p>

          <div className="mt-6">
            <Link
              href="/build/crested-gecko"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-full transition-all hover:scale-105 shadow-lg shadow-purple-900/20 text-sm md:text-base whitespace-nowrap"
            >
              Skip Reading & Build It Now <ArrowRight size={20} className="shrink-0" />
            </Link>
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <GuideSection Icon={Box} iconColor="#a855f7" title="1. Crested Gecko Enclosure Size & Orientation">
            <ul className="space-y-3">
              <GuidePoint accent="purple">
                <strong>Minimum for adults:</strong> 18&quot;x18&quot;x24&quot; TALL orientation — never horizontal
              </GuidePoint>
              <GuidePoint accent="purple">
                <strong>Recommended:</strong> 18&quot;x18&quot;x36&quot; or 24&quot;x18&quot;x36&quot; for more vertical space
              </GuidePoint>
              <GuidePoint accent="purple">
                Crested geckos are arboreal — they live in trees and MUST climb
              </GuidePoint>
              <GuidePoint accent="purple">
                Horizontal enclosures cause chronic stress and suppress natural behavior
              </GuidePoint>
              <GuidePoint accent="purple">
                Fill vertical space with vines, cork bark, and foliage at multiple heights
              </GuidePoint>
            </ul>

            <div className="mt-6 pt-6 border-t border-slate-700">
              <p className="text-sm text-slate-400 mb-3">Not sure which enclosure fits your space?</p>
              <Link
                href="/build/crested-gecko"
                className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 hover:border-purple-500/50 text-purple-300 text-sm font-semibold rounded-lg transition-all"
              >
                Build a Crested Gecko Habitat <ArrowRight size={16} />
              </Link>
            </div>
          </GuideSection>

          <GuideSection Icon={Flame} iconColor="#fb923c" title="2. Crested Gecko Temperature Requirements">
            <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-xl mb-4 flex items-start gap-3">
              <span className="text-2xl shrink-0">⚠️</span>
              <div>
                <p className="text-red-200 text-sm font-semibold mb-1">⚠️ Safety Warning</p>
                <p className="text-red-200 text-sm leading-relaxed">
                  Temperatures above 85°F cause acute heat stress. Above 90°F can be fatal within hours. This is the #1 killer of crested geckos. Never place the enclosure in direct sunlight.
                </p>
              </div>
            </div>
            <ul className="space-y-3">
              <GuidePoint accent="purple">
                <strong>Ambient:</strong> 72-78°F daytime | <strong>Night:</strong> 65-72°F (natural drop is beneficial)
              </GuidePoint>
              <GuidePoint accent="purple">
                <strong>Maximum basking spot:</strong> 80-82°F — use low wattage bulb (25-35W) with thermostat
              </GuidePoint>
              <GuidePoint accent="purple">
                Room temperature (68-76°F) is often sufficient without any heat source
              </GuidePoint>
              <GuidePoint accent="purple">Monitor closely in summer — air conditioning may be needed</GuidePoint>
            </ul>

            <div className="mt-6 pt-6 border-t border-slate-700">
              <p className="text-sm text-slate-400 mb-3">Overheating is the #1 cause of death in crested geckos.</p>
              <Link
                href="/build/crested-gecko"
                className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 hover:border-purple-500/50 text-purple-300 text-sm font-semibold rounded-lg transition-all"
              >
                Let the builder choose compatible heating safely <ArrowRight size={16} />
              </Link>
            </div>
          </GuideSection>

          <GuideSection Icon={Droplets} iconColor="#22d3ee" title="3. Humidity Cycling for Crested Geckos">
            <ul className="space-y-3">
              <GuidePoint accent="purple">Mist twice daily (morning and evening) to spike humidity to 80%+</GuidePoint>
              <GuidePoint accent="purple">Allow enclosure to dry down to 40-50% between mistings</GuidePoint>
              <GuidePoint accent="purple">
                This wet/dry cycle is essential — constant high humidity causes respiratory infection
              </GuidePoint>
              <GuidePoint accent="purple">
                Use a digital hygrometer to monitor — place probe in middle of enclosure
              </GuidePoint>
              <GuidePoint accent="purple">
                Live plants (Pothos, Philodendron) naturally assist with humidity
              </GuidePoint>
            </ul>
          </GuideSection>

          <GuideSection Icon={Home} iconColor="#e879f9" title="4. UVB & Lighting">
            <ul className="space-y-3">
              <GuidePoint accent="purple">ReptiFiles recommends Arcadia ShadeDweller 7% T5 HO UVB kit</GuidePoint>
              <GuidePoint accent="purple">
                Place on top of mesh — 10-15&quot; above gecko&apos;s highest basking point
              </GuidePoint>
              <GuidePoint accent="purple">
                Replace UVB bulb every 12 months even if still producing visible light
              </GuidePoint>
              <GuidePoint accent="purple">
                Full spectrum LED (Arcadia JungleDawn) supports live plants and natural day cycle
              </GuidePoint>
              <GuidePoint accent="purple">
                Run lights on 12-14 hour cycle with a timer — mimics natural day/night rhythm
              </GuidePoint>
            </ul>
          </GuideSection>

          <GuideSection Icon={Pill} iconColor="#fb7185" title="5. Crested Gecko Diet & Supplements">
            <ul className="space-y-3">
              <GuidePoint accent="purple">
                <strong>Primary diet:</strong> CGD (Crested Gecko Diet) — Repashy or Pangea brands
              </GuidePoint>
              <GuidePoint accent="purple">Replace CGD every 24-48 hours — it ferments quickly</GuidePoint>
              <GuidePoint accent="purple">
                Supplement with live insects (dubia, crickets) 2x per week for enrichment
              </GuidePoint>
              <GuidePoint accent="purple">
                Calcium WITHOUT D3 if using UVB | Calcium WITH D3 if no UVB
              </GuidePoint>
              <GuidePoint alert>
                Never use high-D3 supplements with UVB — D3 toxicity causes organ damage
              </GuidePoint>
            </ul>
          </GuideSection>
        </div>

        <div className="max-w-4xl mx-auto mt-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-slate-400 text-lg">Common questions about crested gecko setup and care</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <FAQItem key={faq.question} question={faq.question} answer={faq.answer} accent="purple" />
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto mt-20 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Related Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/build/crested-gecko"
              className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 hover:border-purple-500/40 transition-all text-center"
            >
              <h3 className="text-sm font-bold text-white mb-1">Interactive Builder</h3>
              <p className="text-xs text-slate-400">Build your setup</p>
            </Link>
            <Link
              href="/care-sheets"
              className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 hover:border-purple-500/40 transition-all text-center"
            >
              <h3 className="text-sm font-bold text-white mb-1">Care Sheets</h3>
              <p className="text-xs text-slate-400">Quick reference</p>
            </Link>
            <Link
              href="/common-mistakes"
              className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 hover:border-purple-500/40 transition-all text-center"
            >
              <h3 className="text-sm font-bold text-white mb-1">Common Mistakes</h3>
              <p className="text-xs text-slate-400">Avoid dangers</p>
            </Link>
            <Link
              href="/research"
              className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 hover:border-purple-500/40 transition-all text-center"
            >
              <h3 className="text-sm font-bold text-white mb-1">Research & Evidence</h3>
              <p className="text-xs text-slate-400">Peer-reviewed studies</p>
            </Link>
          </div>
        </div>

        <div className="max-w-4xl mx-auto text-center mt-12">
          <h2 className="text-3xl font-black text-white mb-6">Ready to build it without guesswork?</h2>
          <p className="text-slate-300 leading-relaxed max-w-2xl mx-auto mb-10">
            Our builder applies these principles automatically and checks compatibility as you go.
          </p>

          <Link
            href="/build/crested-gecko"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 md:px-10 md:py-5 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-full transition-all hover:scale-105 shadow-xl shadow-purple-900/30 text-sm md:text-lg whitespace-nowrap"
          >
            Launch Crested Gecko Builder <ArrowRight size={20} className="shrink-0 md:w-6 md:h-6" />
          </Link>
        </div>

        <div className="max-w-3xl mx-auto mt-16 p-6 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-white font-bold text-lg mb-1">Ready to build your setup?</h3>
            <p className="text-slate-400 text-sm">
              The builder selects compatible, research-verified products and generates your complete shopping list.
            </p>
          </div>
          <Link
            href="/build/crested-gecko"
            className="shrink-0 px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-full transition-all whitespace-nowrap"
          >
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
    <section className="bg-slate-800 p-8 rounded-3xl border border-slate-700 shadow-lg">
      <div className="flex items-center gap-4 mb-6 border-b border-slate-700 pb-4">
        <div className="p-3 bg-slate-900/50 rounded-2xl border border-slate-700 shadow-inner">
          <Icon size={32} style={{ color: iconColor }} />
        </div>
        <h2 className="text-2xl font-bold text-white">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function GuidePoint({ children, alert, accent = "emerald" }) {
  const accentClass = accent === "purple" ? "text-purple-400" : "text-emerald-400";

  return (
    <li className="flex items-start gap-3 text-slate-300 leading-relaxed">
      <div className="shrink-0 mt-1">
        {alert ? (
          <ShieldAlert size={18} className="text-red-400" />
        ) : (
          <CheckCircle2 size={18} className={accentClass} />
        )}
      </div>
      <div>{children}</div>
    </li>
  );
}

function FAQItem({ question, answer, accent = "emerald" }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const accentClass = accent === "purple" ? "text-purple-400" : "text-emerald-400";

  return (
    <div className="bg-slate-900/50 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-900/30 transition-colors"
        aria-expanded={isOpen}
      >
        <h3 className="text-lg font-bold text-white pr-4">{question}</h3>
        <HelpCircle size={20} className={`${accentClass} shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && (
        <div className="px-6 pb-4">
          <p className="text-slate-300 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}
