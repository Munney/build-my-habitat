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
      question: "What heater wattage for a 5 gallon betta tank?",
      answer:
        "For a heater for 5 gallon betta tank setups, use roughly 25–50W adjustable submersible heater in a typical room. Small tanks lose heat fast; undersized units run constantly and swing betta tank temperature. Confirm with a separate thermometer—not the heater display alone.",
    },
    {
      question: "Is a preset 78°F heater good enough for a betta?",
      answer:
        "Adjustable heaters are more reliable for betta heater wattage control. Preset models often drift. Pair an adjustable heater with a thermometer and tune to a stable 78–80°F.",
    },
    {
      question: "Can I use a 10W heater in a 10-gallon betta tank?",
      answer:
        "Usually no. Ten watts is typically too weak for that tank size; betta heater size should land closer to 50–75W for 10 gallons so the unit cycles instead of maxing out.",
    },
    {
      question: "Where should I place the heater in a betta tank?",
      answer:
        "Fully submerge per instructions, often vertical or angled with flow across it (e.g. near filter output). Always measure temperature on the opposite side of the tank from the heater to confirm full-tank stability. Leave swimming space away from the hottest pocket.",
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
              The correct betta heater size depends on tank volume—using the right wattage keeps water at a stable 78–80°F instead of cold swings or overheating.
            </p>
            <Link
              href="/build/betta"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full transition-all"
            >
              Build a Betta Fish Setup <ArrowRight size={20} />
            </Link>
          </div>

          <div className="mb-8 p-6 sm:p-8 rounded-3xl border-2 border-sky-500/35 bg-sky-500/[0.07] shadow-lg">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Zap className="text-sky-400 shrink-0" size={24} />
              Quick Answer
            </h2>
            <ul className="space-y-2.5 text-slate-300 text-sm sm:text-base">
              <li className="flex flex-wrap gap-x-2 gap-y-1">
                <span className="text-sky-400 font-bold shrink-0">5 gallon tank →</span>
                <span>25–50W heater</span>
              </li>
              <li className="flex flex-wrap gap-x-2 gap-y-1">
                <span className="text-sky-400 font-bold shrink-0">10 gallon tank →</span>
                <span>50–75W heater</span>
              </li>
              <li className="flex flex-wrap gap-x-2 gap-y-1">
                <span className="text-sky-400 font-bold shrink-0">Ideal temperature →</span>
                <span>78–80°F</span>
              </li>
              <li className="flex flex-wrap gap-x-2 gap-y-1">
                <span className="text-sky-400 font-bold shrink-0">Always use →</span>
                <span>adjustable heater + thermometer</span>
              </li>
            </ul>
          </div>

          <GuideSection Icon={Thermometer} iconColor="#38bdf8" title="Why Betta Heater Size Matters">
            <p className="text-slate-300 mb-4">
              <strong>Betta heater size</strong> (the right heater wattage for your tank volume) is what lets a submersible unit cycle instead of running flat out. Undersized heaters wear out faster, struggle against drafts, and still fail to hold tropical water. Oversizing slightly within the recommended range is usually safer than guessing low—then confirm with a thermometer.
            </p>
            <p className="text-slate-300 mb-0">
              Most room-temperature tanks are too cold for bettas without a heater—especially overnight. Tank size and heater wattage have to work together; skipping either is how “room temp” tanks stay in the danger zone.
            </p>
          </GuideSection>

          <GuideSection Icon={Zap} iconColor="#60a5fa" title="Betta Heater Wattage by Tank Size">
            <p className="text-slate-300 mb-3">
              Use this quick heater sizing chart:
            </p>
            <p className="text-slate-300 mb-4">
              These ranges are a starting point for <strong>adjustable submersible</strong> heaters in typical indoor rooms. Match heater wattage to <strong>tank size</strong>, then adjust if your home runs very cold or the tank has an open top. Verify with a thermometer at both ends of the tank.
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
              Practical rule: about <strong>3–5 watts per gallon</strong> for small aquariums—always confirm with your actual betta tank temperature.
            </p>
          </GuideSection>

          <GuideSection Icon={AlertTriangle} iconColor="#f87171" title="Common Betta Heater Mistakes">
            <p className="text-slate-300 mb-3">
              Avoid these common betta heater mistakes:
            </p>
            <ul className="space-y-2 text-slate-300 text-sm sm:text-base list-disc list-inside marker:text-orange-400/90 mb-0">
              <li>
                <strong>Heater wattage</strong> far too low for tank size—cold water and stressed fish
              </li>
              <li>
                <strong>Preset-only heaters</strong> with no reliable way to tune or verify
              </li>
              <li>
                <strong>Trusting the dial</strong> without a separate thermometer
              </li>
              <li>
                <strong>Placement</strong> where only one corner reads warm while the rest of the tank stays cool
              </li>
            </ul>
          </GuideSection>

          <GuideSection Icon={Thermometer} iconColor="#22d3ee" title="Ideal Temperature After You Size the Heater">
            <p className="text-slate-300 mb-4">
              Target <strong>78–80°F (25.5–27°C)</strong> in the water column away from the heater’s plume. Once betta heater size and heater wattage are matched to tank size, fine-tune the dial and wait for stability. For the full range and stability rules, see our{" "}
              <Link href="/guides/betta-temperature-guide" className="text-sky-400 hover:text-sky-300">
                Betta Fish Temperature Guide
              </Link>
              .
            </p>
          </GuideSection>

          <GuideSection Icon={CheckCircle2} iconColor="#34d399" title="Placement Tips">
            <p className="text-slate-300 mb-4">
              Install <strong>fully underwater</strong> per the manufacturer. Angle toward gentle flow from your filter outlet so heat spreads. Keep a clear betta rest zone at the surface. Always measure temperature on the opposite side of the tank from the heater to confirm full-tank stability. Recheck after HVAC or seasonal changes.
            </p>
            <p className="text-slate-300 mb-0">
              For a full betta tank heater guide on types and setup, read our{" "}
              <Link href="/guides/betta-fish-heater" className="text-sky-400 hover:text-sky-300">
                Betta Fish Heater Guide
              </Link>
              {" "}and{" "}
              <Link href="/guides/betta-setup" className="text-sky-400 hover:text-sky-300">
                Complete Betta Fish Setup Guide
              </Link>
              . Tank volume context:{" "}
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
              BuildMyHabitat selects the correct heater wattage based on your tank size and pairs it with filtration and setup rules—so you don’t risk unstable temperatures or mismatched equipment.
            </p>
            <Link
              href="/build/betta"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full transition-all"
            >
              Build a Betta Fish Setup <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      <div className="max-w-3xl mx-auto mt-16 p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-white font-bold text-lg mb-1">
            Ready to build your setup?
          </h3>
          <p className="text-slate-400 text-sm">
            The builder selects compatible, research-verified products
            and generates your complete shopping list.
          </p>
        </div>
        <Link
          href="/build/betta"
          className="shrink-0 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-full transition-all whitespace-nowrap"
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
