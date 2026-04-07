"use client";

import React from "react";
import Link from "next/link";
import {
  Thermometer,
  Zap,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  HelpCircle,
} from "lucide-react";
import Footer from "../../components/Footer";
import { FAQSchema } from "../../components/StructuredData";

export default function BettaHeaterSizePage() {
  const faqs = [
    {
      question: "How many watts for a 5-gallon betta tank?",
      answer:
        "Use roughly 25–50W for a typical 5-gallon glass tank in a normal room. Small tanks lose heat quickly; undersized heaters run flat out and swing temperature. Verify with a separate thermometer—not the heater’s display alone.",
    },
    {
      question: "Is a preset 78°F heater good enough for a betta?",
      answer:
        "Adjustable heaters are more reliable. Preset models often drift and are hard to verify. Pair an adjustable submersible heater with a glass or digital thermometer and tune to a stable 78–80°F.",
    },
    {
      question: "Can I use a tiny 10W heater in a 10-gallon betta tank?",
      answer:
        "Usually no. A 10W heater is typically too weak for 10 gallons in average homes. Aim closer to 50–75W for 10 gallons so the heater cycles normally instead of struggling at maximum output.",
    },
    {
      question: "Where should I place the heater in a betta tank?",
      answer:
        "Fully submerge per manufacturer instructions, usually vertically or at an angle with flow across it (near filter output) for even heat. Leave swimming space and betta resting spots away from the hottest micro-pocket; confirm tank-wide temp with your thermometer.",
    },
  ];

  return (
    <>
      <FAQSchema faqs={faqs} />
      <main className="min-h-screen pt-28 pb-20 px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white font-medium mb-8 group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Hub
          </Link>

          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4 leading-tight">
              Betta Heater Size Guide
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-6">
              Match heater wattage to tank volume so your betta gets stable 78–80°F water—not constant overdrive or cold swings.
            </p>
            <Link
              href="/build/betta"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full transition-all"
            >
              Build a Betta Fish Setup <ArrowRight size={20} />
            </Link>
          </div>

          <GuideSection Icon={Thermometer} iconColor="#38bdf8" title="Why Heater Size Matters">
            <p className="text-slate-300 mb-4">
              Bettas need <strong>tropical stability</strong>. An undersized heater stays on too long, wears out faster, and still loses the battle against room drafts. An appropriately sized heater cycles on and off, smoothing temperature instead of chasing it. Tank shape, lid type, and room temp all matter—when in doubt, choose the middle of the recommended watt range for your volume, then verify with a thermometer.
            </p>
          </GuideSection>

          <GuideSection Icon={Zap} iconColor="#60a5fa" title="Heater Sizing Chart (Gallons → Watts)">
            <p className="text-slate-300 mb-4">
              Use this as a starting point for <strong>adjustable submersible</strong> heaters in typical indoor rooms. Adjust up if your home runs cold or the tank has a tight lid; adjust down only if you measure overheating.
            </p>
            <div className="rounded-2xl border border-slate-700 bg-slate-900/50 overflow-hidden text-sm text-slate-300">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-700 bg-slate-800/80">
                    <th className="p-3 font-bold text-white">Tank size</th>
                    <th className="p-3 font-bold text-white">Typical heater wattage</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-700/80">
                    <td className="p-3">3–5 gal</td>
                    <td className="p-3">25–50W</td>
                  </tr>
                  <tr className="border-b border-slate-700/80">
                    <td className="p-3">10 gal</td>
                    <td className="p-3">50–75W</td>
                  </tr>
                  <tr className="border-b border-slate-700/80">
                    <td className="p-3">15–20 gal</td>
                    <td className="p-3">75–100W</td>
                  </tr>
                  <tr>
                    <td className="p-3">Long / shallow tanks</td>
                    <td className="p-3">Prefer mid–high end of range; check both ends with thermometer</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-slate-400 text-sm mt-4 mb-0">
              Rule of thumb used across the hobby: about <strong>3–5 watts per gallon</strong> for small aquariums; verify empirically.
            </p>
          </GuideSection>

          <GuideSection Icon={AlertTriangle} iconColor="#f87171" title="Common Mistakes">
            <p className="text-slate-300 mb-0">
              <strong>Too small a heater</strong> for the volume—cold water and stressed fish. <strong>Preset-only heaters</strong> with no fine control or calibration. <strong>Trusting the heater dial</strong> without a separate thermometer. <strong>Placement in stagnant corners</strong> where the sensor reads warm while the rest of the tank lags. Fix all of these before blaming “sick fish.”
            </p>
          </GuideSection>

          <GuideSection Icon={Thermometer} iconColor="#22d3ee" title="Ideal Temperature Range">
            <p className="text-slate-300 mb-4">
              Target <strong>78–80°F (25.5–27°C)</strong> measured in the lower half of the water column away from the heater’s immediate plume. Brief small swings during a heater cycle are normal; chronic readings below 75°F are not safe for long-term betta health.
            </p>
          </GuideSection>

          <GuideSection Icon={CheckCircle2} iconColor="#34d399" title="Placement Tips">
            <p className="text-slate-300 mb-0">
              Install <strong>fully underwater</strong> per the manufacturer. Angle toward gentle flow from your filter outlet so heat distributes. Keep a clear betta rest zone at the surface. Recheck temperature after room HVAC changes (winter heat, summer AC). For full care context, read our{" "}
              <Link href="/guides/betta-setup" className="text-sky-400 hover:text-sky-300">
                Complete Betta Fish Setup Guide
              </Link>{" "}
              and{" "}
              <Link href="/guides/betta-fish-tank-size" className="text-sky-400 hover:text-sky-300">
                Betta Fish Tank Size Guide
              </Link>
              .
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
              <Link href="/guides/betta-setup" className="text-sky-400 hover:text-sky-300">
                Complete Betta Fish Setup Guide
              </Link>
              {" · "}
              <Link href="/guides/betta-fish-tank-size" className="text-sky-400 hover:text-sky-300">
                Betta Fish Tank Size Guide
              </Link>
              {" · "}
              <Link href="/guides/betta-fish-heater" className="text-sky-400 hover:text-sky-300">
                Betta Fish Heater Guide
              </Link>
            </p>
          </div>

          <div className="mt-16 text-center p-8 rounded-3xl bg-blue-500/10 border border-blue-500/30">
            <h2 className="text-2xl font-black text-white mb-4">Right-size heating on your shopping list</h2>
            <p className="text-slate-300 max-w-xl mx-auto mb-6">
              BuildMyHabitat’s Betta builder pairs tank volume with compatible heaters and supporting gear—so you are not guessing watts against anonymous product pages.
            </p>
            <Link
              href="/build/betta"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full transition-all"
            >
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
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-900/30"
        aria-expanded={isOpen}
      >
        <h3 className="text-lg font-bold text-white pr-4">{question}</h3>
        <HelpCircle size={20} className={`text-blue-400 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && (
        <div className="px-6 pb-4">
          <p className="text-slate-300 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}
