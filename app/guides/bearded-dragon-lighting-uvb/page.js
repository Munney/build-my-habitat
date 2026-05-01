"use client";

import React from "react";
import Link from "next/link";
import {
  Sun,
  Flame,
  ShieldAlert,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  HelpCircle,
} from "lucide-react";
import Footer from "../../components/Footer";
import { FAQSchema } from "../../components/StructuredData";

export default function BeardedDragonLightingUVBPage() {
  const faqs = [
    {
      question: "What UVB bulb is best for a bearded dragon?",
      answer: "A T5 high-output linear tube in 10.0 or 12% (sometimes sold as 14%) is the standard. It should span roughly half the length of the enclosure and be mounted inside the lid or above a wide-open mesh so the animal can get within the correct distance (see manufacturer chart). Replace the bulb per manufacturer instructions, usually every 6–12 months.",
    },
    {
      question: "Why are coil UVB bulbs not recommended for bearded dragons?",
      answer: "Coil and compact UVB bulbs produce a narrow, uneven beam and often do not deliver adequate UVB across the basking zone. They also lose output quickly. T5 linear tubes cover a larger area and maintain output better, reducing the risk of metabolic bone disease (MBD).",
    },
    {
      question: "Do I need a thermostat for my bearded dragon heat lamp?",
      answer: "Yes. Every heat source must be controlled by a thermostat. Unregulated heat lamps can push temperatures high enough to cause burns, dehydration, or death. A thermostat with a probe keeps the basking zone in a safe range (e.g. 100–108°F at the surface).",
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
              Bearded Dragon Lighting & UVB Guide
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-6">
              Why UVB is non-negotiable, how to choose and place T5 UVB and basking bulbs, and how to avoid the most common lighting mistakes.
            </p>
            <Link href="/build/bearded-dragon" className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-full transition-all">
              Build a Bearded Dragon Habitat <ArrowRight size={20} />
            </Link>
          </div>

          <GuideSection Icon={Sun} iconColor="#eab308" title="Why UVB Matters for Bearded Dragons">
            <p className="text-slate-300 mb-4">
              Bearded dragons need UVB to synthesize vitamin D3 and absorb calcium. Without adequate UVB (or correct supplementation when UVB is absent), they develop <strong>metabolic bone disease (MBD)</strong>—weak bones, deformities, fractures, and often death. UVB is a core part of husbandry, not optional. For the full picture, see our <Link href="/guides/bearded-dragon-care" className="text-emerald-400 hover:text-emerald-300">Care Guide</Link> and <Link href="/guides/bearded-dragon-tank-setup" className="text-emerald-400 hover:text-emerald-300">Tank Setup Guide</Link>.
            </p>
          </GuideSection>

          <GuideSection Icon={ShieldAlert} iconColor="#f87171" title="Common Lighting Mistakes">
            <p className="text-slate-300 mb-4">
              Pet-store and starter-kit setups often get lighting wrong. Coil or compact UVB gives a small, uneven patch; the basking area often receives too little, and output drops over time (MBD risk). Skipping UVB and relying only on calcium with D3 is fragile—over- or under-dosing and missed feedings are common. Glass and fine mesh block most UVB; the bulb must be inside the enclosure or over wide-open mesh so the dragon can sit within the recommended distance. Red or blue “night” bulbs disrupt day/night cycles; use a ceramic heat emitter for nighttime heat if needed. Unregulated heat lamps can exceed 120°F+ at the basking spot—thermostats are mandatory. Measure <em>surface</em> temperature at the basking spot (100–108°F) with a temp gun, not just air temp. More pitfalls: <Link href="/guides/bearded-dragon-mistakes" className="text-emerald-400 hover:text-emerald-300">Common Bearded Dragon Mistakes</Link>.
            </p>
          </GuideSection>

          <GuideSection Icon={Sun} iconColor="#34d399" title="T5 High-Output UVB: The Standard">
            <p className="text-slate-300 mb-4">
              A <strong>T5 high-output linear tube</strong> in <strong>10.0 or 12%</strong> (some brands use 14%) is the recommended UVB source. Run it along roughly half the enclosure length so there is a clear basking zone and a cooler area without UVB. Mount the fixture inside the enclosure or just above wide mesh—fine screen blocks a large share of UVB. Follow the manufacturer’s distance chart (often 12–18 in for T5 10.0/12%). Replace the tube on schedule (usually every 6–12 months); output declines even when the bulb still lights.
            </p>
          </GuideSection>

          <GuideSection Icon={Flame} iconColor="#fb923c" title="Basking Bulb and Thermostat">
            <p className="text-slate-300 mb-4">
              The basking lamp must deliver 100–108°F on the surface where the dragon sits. A <strong>halogen flood</strong> or <strong>incandescent</strong> provides both heat and visible light; wattage depends on enclosure size and basking height (often 75–150 W for a 4×2×2). A <strong>ceramic heat emitter (CHE)</strong> gives heat only—use for night heat or to separate heat from light. Do not use red or blue bulbs for daytime heat. LED strips add brightness but do not replace UVB or basking heat.
            </p>
            <p className="text-slate-300 mb-0">
              Bearded dragons thermoregulate by resting on a hot surface, so the critical number is <strong>surface temperature</strong> at the basking spot, not air temp. Use an <strong>infrared temp gun</strong> aimed where the dragon sits; cool-side air can be read with a digital thermometer (mid-70s to low 80s °F). Plug the heat lamp into a <strong>thermostat</strong> and set it so the surface stays in range; recheck with the temp gun regularly.
            </p>
          </GuideSection>

          <GuideSection Icon={Sun} iconColor="#a78bfa" title="Screen Tops and Bulb Placement">
            <p className="text-slate-300 mb-0">
              Dense screen tops filter out much of the UVB. Mount the T5 inside the enclosure (safely secured) or use very open mesh and place the fixture so effective UVB at basking height meets the manufacturer’s recommendation. Adjust basking bulb height and wattage so the surface under the lamp reaches 100–108°F.
            </p>
          </GuideSection>

          <div className="my-12 p-6 rounded-2xl bg-slate-800/80 border border-emerald-500/20">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <CheckCircle2 className="text-emerald-400" size={22} />
              Quick Lighting Checklist
            </h2>
            <ul className="space-y-2 text-slate-300 text-sm">
              <li>• T5 high-output 10.0 or 12% UVB tube over ~50% of enclosure length</li>
              <li>• UVB inside the enclosure or over open mesh; correct distance per manufacturer</li>
              <li>• Basking bulb (halogen or incandescent) for 100–108°F surface temp</li>
              <li>• No red or colored heat bulbs</li>
              <li>• Heat lamp on a thermostat</li>
              <li>• Basking surface temp measured with a temp gun; cool side 75–80°F</li>
              <li>• UVB bulb replaced every 6–12 months per manufacturer</li>
            </ul>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <FAQItem key={i} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>

          <div className="my-12 p-6 rounded-2xl bg-slate-800/80 border border-slate-700">
            <h2 className="text-lg font-bold text-white mb-3">Deep-Dive Guides</h2>
            <p className="text-slate-400 text-sm mb-0">Lighting ties into enclosure size and layout. See our <Link href="/guides/bearded-dragon-care" className="text-emerald-400 hover:text-emerald-300">Care Guide</Link>, <Link href="/guides/bearded-dragon-tank-setup" className="text-emerald-400 hover:text-emerald-300">Tank Setup</Link>, and <Link href="/guides/bearded-dragon-mistakes" className="text-emerald-400 hover:text-emerald-300">Common Mistakes</Link> for full context.
            </p>
          </div>

          <div className="mt-16 text-center p-8 rounded-3xl bg-emerald-500/10 border border-emerald-500/30">
            <h2 className="text-2xl font-black text-white mb-4">UVB and heating that already match your enclosure</h2>
            <p className="text-slate-300 max-w-xl mx-auto mb-6">
              BuildMyHabitat’s Bearded Dragon builder includes T5 UVB, basking heat, and thermostat options that fit 4×2×2 and larger—so your lighting setup is compatible and safe by default.
            </p>
            <Link href="/build/bearded-dragon" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-full transition-all">
              Build a Bearded Dragon Habitat <ArrowRight size={20} />
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
          href="/build/bearded-dragon"
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
      <button onClick={() => setIsOpen(!isOpen)} className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-900/30" aria-expanded={isOpen}>
        <h3 className="text-lg font-bold text-white pr-4">{question}</h3>
        <HelpCircle size={20} className={`text-emerald-400 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && <div className="px-6 pb-4"><p className="text-slate-300 leading-relaxed">{answer}</p></div>}
    </div>
  );
}
