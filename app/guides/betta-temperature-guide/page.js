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
        "Keep bettas at 78–80°F (25.5–27°C) year-round. That is the standard tropical range for Betta splendens in home aquaria. Readings below 75°F increase stress and disease risk; sustained highs above 82°F can also cause problems.",
    },
    {
      question: "Is a stable 77°F okay for a betta?",
      answer:
        "Slightly below ideal can work if truly stable and the fish eats and behaves normally, but 78–80°F remains the target. If you see lethargy, clamped fins, or loss of appetite, raise into range and rule out illness.",
    },
    {
      question: "Why does my betta tank feel cold when the room is warm?",
      answer:
        "Water temperature almost always lags and runs cooler than air—often by several degrees. A thermometer in the tank is the only reliable check. Room thermostats do not measure aquarium water.",
    },
    {
      question: "Do bettas need a heater in summer?",
      answer:
        "Usually yes. Nights and AC drop tank temperature even when daytime air feels hot. A properly sized heater prevents slow drifts that stress the immune system.",
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
              Ideal range, why stability beats chasing a single digit, and how to spot when water is wrong.
            </p>
            <Link
              href="/build/betta"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full transition-all"
            >
              Build a Betta Fish Setup <ArrowRight size={20} />
            </Link>
          </div>

          <GuideSection Icon={Thermometer} iconColor="#38bdf8" title="Ideal Temperature Range">
            <p className="text-slate-300 mb-4">
              Aim for <strong>78–80°F (25.5–27°C)</strong> in the main body of the tank. That range supports digestion, immune function, and normal activity for domestic bettas. Measure away from the heater’s hottest micro-layer so your reading reflects what the fish actually swims through.
            </p>
          </GuideSection>

          <GuideSection Icon={Waves} iconColor="#60a5fa" title="Why Stability Matters More Than the Exact Number">
            <p className="text-slate-300 mb-4">
              Fish tolerate small, slow oscillations from a cycling heater better than they tolerate <strong>drift across many degrees</strong> over a day or a cold spell after an AC cycle. A steady 79°F beats bouncing between 74°F and 82°F. Stability comes from right-sized heating, a lid that limits evaporative cooling, and avoiding direct drafts on the glass.
            </p>
          </GuideSection>

          <GuideSection Icon={AlertTriangle} iconColor="#f87171" title="Signs Temperature Is Wrong">
            <p className="text-slate-300 mb-4">
              <strong>Too cold:</strong> lethargy, clamped fins, reduced appetite, hovering near warmer pockets, increased ich susceptibility. <strong>Too warm:</strong> rapid breathing, gasping at the surface (when not explained by poor water quality), stress color changes. Always cross-check ammonia/nitrite when behavior shifts—temperature is one variable, water chemistry is another.
            </p>
          </GuideSection>

          <GuideSection Icon={CheckCircle2} iconColor="#34d399" title="Heater + Thermometer Setup">
            <p className="text-slate-300 mb-4">
              Use an <strong>adjustable submersible heater</strong> sized to your tank volume and a <strong>separate thermometer</strong> (glass strip or digital probe). Set the heater toward 78–80°F, wait 12–24 hours, and adjust in small steps while watching the thermometer. For wattage guidance, see our{" "}
              <Link href="/guides/betta-heater-size" className="text-sky-400 hover:text-sky-300">
                Betta Heater Size Guide
              </Link>
              .
            </p>
          </GuideSection>

          <GuideSection Icon={AlertTriangle} iconColor="#fb923c" title="Common Mistakes">
            <p className="text-slate-300 mb-0">
              <strong>No heater</strong> because the room “feels fine.” <strong>Trusting seasonal room temp</strong> without measuring water. <strong>Undersized heaters</strong> that never reach setpoint. <strong>One thermometer stuck to the glass opposite the heater</strong> while the opposite end runs cold—use placement that represents whole-tank conditions. Full equipment context lives in our{" "}
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
              The Betta builder recommends heaters sized to your tank and pairs them with filtration and tank-size checks—so temperature stability is part of the same list, not an afterthought.
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
