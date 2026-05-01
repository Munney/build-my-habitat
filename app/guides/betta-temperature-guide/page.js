"use client";

import React from "react";
import Link from "next/link";
import {
  Thermometer,
  Waves,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  HelpCircle,
} from "lucide-react";
import Footer from "../../components/Footer";
import { FAQSchema } from "../../components/StructuredData";

export default function BettaTemperatureGuidePage() {
  const faqs = [
    {
      question: "What temperature should betta fish water be?",
      answer:
        "Ideal betta fish temperature is 78–80°F (25.5–27°C) year-round. That is the standard tropical range for Betta splendens. Betta tank temperature below 75°F increases stress and disease risk; sustained readings above 82°F can also cause problems. Use a heater and thermometer to verify—not room temperature alone.",
    },
    {
      question: "What happens if betta water is too cold?",
      answer:
        "When betta water is too cold, you often see lethargy, clamped fins, loss of appetite, and higher risk of illness. Cold water slows metabolism and weakens the immune system. If you suspect betta water too cold, measure with a thermometer, add or upgrade a properly sized heater, and see our Betta Heater Size Guide for wattage by tank volume.",
    },
    {
      question: "Why does my betta tank feel cold when the room is warm?",
      answer:
        "Betta tank temperature almost always runs cooler than air—often by several degrees. Water loses heat to glass, evaporation, and overnight room drops. A thermometer inside the tank is the only reliable check. Room thermostats do not measure aquarium water.",
    },
    {
      question: "Do bettas need a heater in summer?",
      answer:
        "Usually yes. Nights and air conditioning still pull betta tank temperature down even when daytime air feels hot. A properly sized heater with a stable setting keeps ideal betta fish temperature through seasonal swings.",
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
              Betta Fish Temperature Guide
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-6">
              The ideal betta fish temperature range, why stable water matters more than chasing one exact number, and how to tell when your tank is too cold or too warm.
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
              <Thermometer className="text-sky-400 shrink-0" size={24} />
              Quick Answer
            </h2>
            <ul className="space-y-2.5 text-slate-300 text-sm sm:text-base">
              <li className="flex gap-2">
                <span className="text-sky-400 font-bold shrink-0">Ideal betta temperature:</span>
                <span>78–80°F</span>
              </li>
              <li className="flex gap-2">
                <span className="text-sky-400 font-bold shrink-0">Safe short-term range:</span>
                <span>76–82°F</span>
              </li>
              <li className="flex gap-2">
                <span className="text-sky-400 font-bold shrink-0">Most common mistake:</span>
                <span>No heater or undersized heater</span>
              </li>
              <li className="flex gap-2">
                <span className="text-sky-400 font-bold shrink-0">Best setup:</span>
                <span>Adjustable heater + separate thermometer</span>
              </li>
            </ul>
          </div>

          <GuideSection Icon={Thermometer} iconColor="#38bdf8" title="Ideal Betta Fish Temperature Range">
            <p className="text-slate-300 mb-4">
              This betta fish temperature guide targets <strong>78–80°F (25.5–27°C)</strong> in the main water column—the range most keepers use for healthy, active bettas. Measure away from the heater’s hottest pocket so your reading matches where the fish actually swims.
            </p>
            <p className="text-slate-300 mb-0">
              Most “room temperature” tanks run <strong>too cool for bettas</strong>, especially overnight, in winter, or near windows and AC vents. Air feeling warm does not mean betta tank temperature is safe—water almost always lags behind air by several degrees.
            </p>
          </GuideSection>

          <GuideSection Icon={Waves} iconColor="#60a5fa" title="Why Stability Matters More Than the Exact Number">
            <p className="text-slate-300 mb-4">
              Fish handle small, slow swings from a cycling heater better than big daily drifts or a cold stretch after the room cools. A steady 79°F beats bouncing between 74°F and 82°F. Stability comes from a right-sized heater, a lid that limits heat loss, and reducing drafts on the glass.
            </p>
          </GuideSection>

          <GuideSection Icon={AlertTriangle} iconColor="#f87171" title="Signs Betta Tank Temperature Is Wrong">
            <div className="space-y-5 text-slate-300 text-sm sm:text-base">
              <div>
                <p className="font-semibold text-sky-300 mb-2">Too cold</p>
                <ul className="space-y-1.5 list-disc list-inside marker:text-sky-500">
                  <li>Lethargy and clamped fins</li>
                  <li>Reduced appetite</li>
                  <li>Hugging the heater or warmest zone</li>
                  <li>Higher risk of stress-related illness</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-orange-300 mb-2">Too warm</p>
                <ul className="space-y-1.5 list-disc list-inside marker:text-orange-400/90">
                  <li>Rapid breathing or gasping at the surface (rule out ammonia first)</li>
                  <li>Stress color or erratic swimming</li>
                  <li>Heater zone feels hot to the touch while the rest of the tank lags</li>
                </ul>
              </div>
              <p className="text-slate-400 text-sm pt-1 mb-0">
                If behavior changes suddenly, test ammonia and nitrite—temperature is one variable, water chemistry is another.
              </p>
            </div>
          </GuideSection>

          <GuideSection Icon={CheckCircle2} iconColor="#34d399" title="Heater + Thermometer Setup">
            <p className="text-slate-300 mb-4">
              Use an <strong>adjustable submersible heater</strong> matched to your tank volume and a <strong>separate thermometer</strong> (glass strip or digital probe). Set toward <strong>78–80°F</strong>, wait 12–24 hours, then fine-tune in small steps while watching the thermometer. Put the thermometer where it reflects the water your fish actually lives in—not directly next to the heater. For wattage, see our{" "}
              <Link href="/guides/betta-heater-size" className="text-sky-400 hover:text-sky-300">
                Betta Heater Size Guide
              </Link>
              {" "}and full heater context in our{" "}
              <Link href="/guides/betta-fish-heater" className="text-sky-400 hover:text-sky-300">
                Betta Fish Heater Guide
              </Link>
              .
            </p>
          </GuideSection>

          <GuideSection Icon={AlertTriangle} iconColor="#fb923c" title="Common Betta Temperature Mistakes">
            <p className="text-slate-300 mb-3">
              Avoid these common betta temperature mistakes:
            </p>
            <ul className="space-y-2 text-slate-300 text-sm sm:text-base list-disc list-inside marker:text-orange-400/90 mb-4">
              <li>
                <strong>No heater</strong> because the room feels comfortable
              </li>
              <li>
                <strong>Trusting room temperature</strong> instead of measuring betta tank temperature in the water
              </li>
              <li>
                <strong>Undersized heater</strong> that never holds 78–80°F
              </li>
              <li>
                <strong>One thermometer</strong> only on the glass far from where the fish spends time
              </li>
            </ul>
            <p className="text-slate-300 mb-0">
              Full equipment order and checks are in our{" "}
              <Link href="/guides/betta-setup" className="text-sky-400 hover:text-sky-300">
                Complete Betta Fish Setup Guide
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
              <Link href="/guides/betta-heater-size" className="text-sky-400 hover:text-sky-300">
                Betta Heater Size Guide
              </Link>
              {" · "}
              <Link href="/guides/betta-setup" className="text-sky-400 hover:text-sky-300">
                Complete Betta Fish Setup Guide
              </Link>
              {" · "}
              <Link href="/guides/betta-fish-heater" className="text-sky-400 hover:text-sky-300">
                Betta Fish Heater Guide
              </Link>
            </p>
          </div>

          <div className="mt-16 text-center p-8 rounded-3xl bg-blue-500/10 border border-blue-500/30">
            <h2 className="text-2xl font-black text-white mb-4">Stable tropical temps by design</h2>
            <p className="text-slate-300 max-w-xl mx-auto mb-6">
              BuildMyHabitat recommends a heater sized to your tank and checks it against tank size, filtration, and beginner-safe setup rules—so stable temperature is built into the plan from the start.
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
