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

export default function BallPythonGuidePage() {
  const faqs = [
    {
      question: "What size enclosure does a ball python need?",
      answer:
        "Adult ball pythons need a minimum of 4x2x2 ft (48\"x24\"x24\"), roughly 120 gallons. 40-gallon tanks are severely undersized and cause chronic stress and feeding refusal. PVC enclosures are preferred over glass for better humidity retention.",
    },
    {
      question: "Do ball pythons need UVB lighting?",
      answer:
        "Ball pythons can survive without UVB, but ReptiFiles strongly recommends low-level UVB (Arcadia 6% T5 HO) for optimal health. UVB supports natural vitamin D3 synthesis and has been shown to improve health outcomes in captive pythons.",
    },
    {
      question: "What humidity do ball pythons need?",
      answer:
        "Ball pythons need 60-80% ambient humidity and 80-100% inside the humid hide. Low humidity causes dysecdysis (stuck shed) which can cut off circulation to toes, tail, and eye caps if not removed.",
    },
    {
      question: "What is the best substrate for ball pythons?",
      answer:
        "The best substrate is a 40/40/20 mix of organic topsoil, Zoo Med ReptiSoil, and play sand at a minimum depth of 4 inches. This retains humidity naturally and allows burrowing behavior. Never use cedar, pine, calcium sand, or reptile carpet.",
    },
    {
      question: "What temperature should a ball python enclosure be?",
      answer:
        "Warm hide: 90-95°F. Warm side ambient: 88-92°F. Cool side: 75-80°F. Night minimum: 72°F. Use a thermostat on all heat sources with the probe placed inside the warm hide at snake level.",
    },
    {
      question: "Do ball pythons need a thermostat?",
      answer:
        "Yes — absolutely required on every heat source. The thermostat probe must be placed inside the warm hide at snake level, not on the heat mat surface. Without a thermostat, temperatures can reach lethal levels.",
    },
    {
      question: "How often do ball pythons eat?",
      answer:
        "Juveniles eat every 5-7 days. Adults eat every 10-14 days. Always feed frozen/thawed prey — never live. Prey should be approximately the same width as the widest part of the snake.",
    },
    {
      question: "Can ball pythons live in a 40-gallon tank?",
      answer:
        "No — 40-gallon tanks are severely undersized for adult ball pythons and cause chronic stress, poor thermoregulation, and feeding refusal. The minimum for adults is 4x2x2 ft (120 gallons).",
    },
    {
      question: "Can I skip this guide and use the builder?",
      answer:
        "Yes. The builder applies all these principles automatically, blocks dangerous configurations, and generates a complete compatible shopping list.",
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
            Complete Ball Python Setup Guide{" "}
            <span className="text-amber-400 text-3xl md:text-4xl font-semibold">(Beginner Friendly)</span>
          </h1>
          <h2 className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto mb-6">
            Enclosure size, heating, humidity, substrate, and essential equipment explained step by step.
          </h2>

          <p className="text-base text-slate-400 leading-relaxed max-w-2xl mx-auto mb-8">
            If you want a full explanation, read on. If you want a safe setup fast, the builder handles this step by step.
          </p>

          <div className="mt-6">
            <Link
              href="/build/ball-python"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-full transition-all hover:scale-105 shadow-lg shadow-amber-900/20 text-sm md:text-base whitespace-nowrap"
            >
              Skip Reading & Build It Now <ArrowRight size={20} className="shrink-0" />
            </Link>
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <GuideSection Icon={Box} iconColor="#34d399" title="1. Ball Python Enclosure Size">
            <ul className="space-y-3">
              <GuidePoint accent="amber">
                <strong>Minimum for adults:</strong> 4x2x2 ft (48&quot;x24&quot;x24&quot;) — approximately 120 gallons
              </GuidePoint>
              <GuidePoint accent="amber">
                PVC enclosures are preferred over glass for superior humidity retention
              </GuidePoint>
              <GuidePoint accent="amber">
                40-gallon tanks are severely undersized for adults and cause chronic stress
              </GuidePoint>
              <GuidePoint accent="amber">
                Juveniles can start in smaller enclosures but must be upgraded as they grow
              </GuidePoint>
            </ul>

            <div className="mt-6 pt-6 border-t border-slate-700">
              <p className="text-sm text-slate-400 mb-3">Not sure which enclosure size fits your space?</p>
              <Link
                href="/build/ball-python"
                className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600/20 hover:bg-amber-600/30 border border-amber-500/30 hover:border-amber-500/50 text-amber-300 text-sm font-semibold rounded-lg transition-all"
              >
                Build a Ball Python Habitat <ArrowRight size={16} />
              </Link>
            </div>
          </GuideSection>

          <GuideSection Icon={Flame} iconColor="#fb923c" title="2. Ball Python Heating & Thermostat Setup">
            <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-xl mb-4 flex items-start gap-3">
              <span className="text-2xl shrink-0">⚠️</span>
              <div>
                <p className="text-red-200 text-sm font-semibold mb-1">⚠️ Safety Warning</p>
                <p className="text-red-200 text-sm leading-relaxed">
                  Never use heat mats as a primary heat source. They only heat the floor and cannot warm ambient air to the required 88-92°F. Every heat source MUST be connected to a thermostat.
                </p>
              </div>
            </div>
            <ul className="space-y-3">
              <GuidePoint accent="amber">
                <strong>Primary heat:</strong> Halogen PAR38 flood bulb or Arcadia Deep Heat Projector
              </GuidePoint>
              <GuidePoint accent="amber">
                <strong>Warm hide target:</strong> 90-95°F — place thermostat probe inside warm hide
              </GuidePoint>
              <GuidePoint accent="amber">
                <strong>Warm side ambient:</strong> 88-92°F | <strong>Cool side:</strong> 75-80°F | <strong>Night minimum:</strong> 72°F
              </GuidePoint>
              <GuidePoint accent="amber">
                Thermostat probe placement is critical — inside the warm hide at snake level
              </GuidePoint>
            </ul>

            <div className="mt-6 pt-6 border-t border-slate-700">
              <p className="text-sm text-slate-400 mb-3">Heating mistakes are the #1 cause of health issues.</p>
              <Link
                href="/build/ball-python"
                className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600/20 hover:bg-amber-600/30 border border-amber-500/30 hover:border-amber-500/50 text-amber-300 text-sm font-semibold rounded-lg transition-all"
              >
                Let the builder choose compatible heating safely <ArrowRight size={16} />
              </Link>
            </div>
          </GuideSection>

          <GuideSection Icon={Droplets} iconColor="#22d3ee" title="3. Ball Python Humidity Requirements">
            <ul className="space-y-3">
              <GuidePoint accent="amber">Maintain 60-80% ambient humidity at all times</GuidePoint>
              <GuidePoint accent="amber">Humid hide lined with damp sphagnum moss — 80-100% inside</GuidePoint>
              <GuidePoint accent="amber">Use 4&quot; minimum substrate depth to retain moisture naturally</GuidePoint>
              <GuidePoint accent="amber">
                Low humidity causes dysecdysis (stuck shed) which can injure eyes and tail
              </GuidePoint>
              <GuidePoint accent="amber">
                Monitor with a digital hygrometer placed in the middle of the enclosure
              </GuidePoint>
            </ul>
          </GuideSection>

          <GuideSection Icon={Home} iconColor="#e879f9" title="4. Ball Python Substrate">
            <ul className="space-y-3">
              <GuidePoint accent="amber">
                <strong>Best mix:</strong> 40% organic topsoil + 40% Zoo Med ReptiSoil + 20% play sand
              </GuidePoint>
              <GuidePoint accent="amber">Minimum 4 inch depth for humidity retention and natural burrowing</GuidePoint>
              <GuidePoint accent="amber">Cypress mulch and coconut fiber are good single-substrate alternatives</GuidePoint>
              <GuidePoint accent="amber">Safe as-is: paper towels for quarantine or hatchlings only</GuidePoint>
              <GuidePoint alert>
                <strong>Never use:</strong> cedar, pine, calcium sand, reptile carpet, or wood chips
              </GuidePoint>
            </ul>
          </GuideSection>

          <GuideSection Icon={Pill} iconColor="#fb7185" title="5. Hides & Enrichment">
            <ul className="space-y-3">
              <GuidePoint accent="amber">
                <strong>3 hides required:</strong> warm hide (90-95°F), cool hide, and humid hide
              </GuidePoint>
              <GuidePoint accent="amber">Hides must be snug — snake should feel walls touching its body</GuidePoint>
              <GuidePoint accent="amber">Humid hide lined with damp sphagnum moss, replace monthly</GuidePoint>
              <GuidePoint accent="amber">
                Large soaking water bowl — snake must be able to fully coil inside
              </GuidePoint>
              <GuidePoint accent="amber">
                Ball pythons are semi-arboreal — cork logs and climbing branches are used
              </GuidePoint>
            </ul>
          </GuideSection>
        </div>

        <div className="max-w-4xl mx-auto mt-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-slate-400 text-lg">Common questions about ball python setup and care</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <FAQItem key={faq.question} question={faq.question} answer={faq.answer} accent="amber" />
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto mt-20 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Related Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/build/ball-python"
              className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 hover:border-amber-500/40 transition-all text-center"
            >
              <h3 className="text-sm font-bold text-white mb-1">Interactive Builder</h3>
              <p className="text-xs text-slate-400">Build your setup</p>
            </Link>
            <Link
              href="/care-sheets"
              className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 hover:border-amber-500/40 transition-all text-center"
            >
              <h3 className="text-sm font-bold text-white mb-1">Care Sheets</h3>
              <p className="text-xs text-slate-400">Quick reference</p>
            </Link>
            <Link
              href="/common-mistakes"
              className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 hover:border-amber-500/40 transition-all text-center"
            >
              <h3 className="text-sm font-bold text-white mb-1">Common Mistakes</h3>
              <p className="text-xs text-slate-400">Avoid dangers</p>
            </Link>
            <Link
              href="/research"
              className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 hover:border-amber-500/40 transition-all text-center"
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
            href="/build/ball-python"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 md:px-10 md:py-5 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-full transition-all hover:scale-105 shadow-xl shadow-amber-900/30 text-sm md:text-lg whitespace-nowrap"
          >
            Launch Ball Python Builder <ArrowRight size={20} className="shrink-0 md:w-6 md:h-6" />
          </Link>
        </div>

        <div className="max-w-3xl mx-auto mt-16 p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-white font-bold text-lg mb-1">Ready to build your setup?</h3>
            <p className="text-slate-400 text-sm">
              The builder selects compatible, research-verified products and generates your complete shopping list.
            </p>
          </div>
          <Link
            href="/build/ball-python"
            className="shrink-0 px-6 py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-full transition-all whitespace-nowrap"
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
  const accentClass = accent === "amber" ? "text-amber-400" : "text-emerald-400";

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
  const accentClass = accent === "amber" ? "text-amber-400" : "text-emerald-400";

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
