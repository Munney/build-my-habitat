"use client";

import React from "react";
import Link from "next/link";
import {
  Box,
  Sun,
  Flame,
  Layers,
  UtensilsCrossed,
  Home,
  Package,
  ArrowRight,
  ArrowLeft,
  HelpCircle,
} from "lucide-react";
import Footer from "../../components/Footer";
import { FAQSchema } from "../../components/StructuredData";

export default function BeardedDragonMistakesPage() {
  const faqs = [
    {
      question: "What is the biggest mistake bearded dragon owners make?",
      answer: "Some of the most impactful mistakes are: using an enclosure that is too small (e.g. 40 gallon), using weak or no UVB (leading to MBD), not using a thermostat on the heat source (burns, overheating), and using calcium sand or reptile carpet. Fixing enclosure size, UVB, heating control, and substrate goes a long way.",
    },
    {
      question: "Can a bearded dragon live in a 40-gallon tank?",
      answer: "No. The minimum for one adult bearded dragon is a 4×2×2 ft (120 gallon equivalent) enclosure. A 40-gallon tank does not allow a proper temperature gradient, adequate UVB coverage, or enough space for hides and enrichment. Older care sheets that recommended 40 gallons are outdated.",
    },
    {
      question: "How can I avoid bearded dragon care mistakes?",
      answer: "Use a habitat builder or checklist that enforces current standards: 4×2×2 minimum, T5 UVB 10.0/12%, thermostat on heat, basking surface temp 100–108°F, safe substrate, and proper feeding and supplements. Avoid starter kits without verifying that enclosure size, UVB type, and heating equipment meet these requirements.",
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
              Common Bearded Dragon Mistakes
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-6">
              The most common enclosure, lighting, heating, substrate, and feeding mistakes—and how to fix them with current standards.
            </p>
            <Link href="/build/bearded-dragon" className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-full transition-all">
              Build a Bearded Dragon Habitat <ArrowRight size={20} />
            </Link>
          </div>

          <GuideSection Icon={Box} iconColor="#f87171" title="Enclosure Too Small">
            <p className="text-slate-300 mb-4">
              Using a 40- or 75-gallon tank because an old care sheet or pet store said so leaves no room for a real hot-to-cool gradient, a proper UVB strip, or adequate hides and climbing—leading to stress and poor thermoregulation.
            </p>
            <p className="text-slate-300 mb-0">
              <strong>Fix:</strong> Minimum <strong>4×2×2 ft</strong> (48×24×24 in) for one adult. Full layout: <Link href="/guides/bearded-dragon-tank-setup" className="text-emerald-400 hover:text-emerald-300">Tank Setup Guide</Link>.
            </p>
          </GuideSection>

          <GuideSection Icon={Sun} iconColor="#f87171" title="Weak UVB or Coil UVB Only">
            <p className="text-slate-300 mb-4">
              Coil or compact UVB, or skipping UVB and relying only on calcium with D3, often leads to inadequate D3 and calcium absorption—and metabolic bone disease (MBD).
            </p>
            <p className="text-slate-300 mb-0">
              <strong>Fix:</strong> <strong>T5 high-output 10.0 or 12%</strong> linear tube over roughly half the enclosure, mounted inside or over open mesh; replace per manufacturer schedule. <Link href="/guides/bearded-dragon-lighting-uvb" className="text-emerald-400 hover:text-emerald-300">Lighting & UVB Guide</Link>.
            </p>
          </GuideSection>

          <GuideSection Icon={Flame} iconColor="#f87171" title="Wrong Temp Measurement or No Thermostat">
            <p className="text-slate-300 mb-4">
              Measuring only air temp, or running the heat lamp unregulated, misses what matters: the <strong>surface temperature</strong> of the basking spot (100–108°F). Unregulated lamps can exceed 120°F+ and cause burns or death.
            </p>
            <p className="text-slate-300 mb-0">
              <strong>Fix:</strong> Use an <strong>infrared temp gun</strong> on the spot where the dragon sits. Plug the heat lamp into a <strong>thermostat</strong> and recheck with the temp gun regularly. See <Link href="/guides/bearded-dragon-care" className="text-emerald-400 hover:text-emerald-300">Care Guide</Link> and <Link href="/guides/bearded-dragon-lighting-uvb" className="text-emerald-400 hover:text-emerald-300">Lighting & UVB</Link>.
            </p>
          </GuideSection>

          <GuideSection Icon={Layers} iconColor="#f87171" title="Calcium Sand or Reptile Carpet">
            <p className="text-slate-300 mb-4">
              Calcium sand encourages eating the substrate (impaction and overload); reptile carpet snags claws and teeth and harbors bacteria.
            </p>
            <p className="text-slate-300 mb-0">
              <strong>Fix:</strong> Paper towel or slate tile for a simple setup, or 50/50 organic topsoil and washed playsand for naturalistic. <Link href="/guides/bearded-dragon-substrate" className="text-emerald-400 hover:text-emerald-300">Substrate Guide</Link>.
            </p>
          </GuideSection>

          <GuideSection Icon={UtensilsCrossed} iconColor="#f87171" title="Poor Feeding Schedules and Too Many Fatty Insects">
            <p className="text-slate-300 mb-4">
              Feeding adults unlimited insects daily, or offering waxworms, butterworms, or fruit regularly and skipping greens, leads to obesity and fatty liver risk.
            </p>
            <p className="text-slate-300 mb-0">
              <strong>Fix:</strong> Babies: insects 2–3× daily + daily greens. Adults: daily greens, insects 2–4× per week; staple insects (dubia, crickets, BSFL), limit fatty treats. <Link href="/guides/bearded-dragon-feeding" className="text-emerald-400 hover:text-emerald-300">Feeding Guide</Link>.
            </p>
          </GuideSection>

          <GuideSection Icon={Home} iconColor="#f87171" title="No Climbing or Enrichment">
            <p className="text-slate-300 mb-4">
              A bare tank with one hide and a water bowl, no basking platform or branches, gives no thermoregulation options, security, or mental stimulation—stress and boredom follow.
            </p>
            <p className="text-slate-300 mb-0">
              <strong>Fix:</strong> At least two hides (warm and cool), a sturdy basking platform, and branches or cork; add fake or safe live plants for cover. <Link href="/guides/bearded-dragon-care" className="text-emerald-400 hover:text-emerald-300">Care Guide</Link> and <Link href="/guides/bearded-dragon-tank-setup" className="text-emerald-400 hover:text-emerald-300">Tank Setup</Link>.
            </p>
          </GuideSection>

          <GuideSection Icon={Box} iconColor="#f87171" title="Assuming a Big Tank Stresses Babies">
            <p className="text-slate-300 mb-4">
              Stress in babies is usually caused by lack of hides, open space, or wrong temps—not by enclosure size. A well-designed 4×2×2 with multiple hides and clutter is safe.
            </p>
            <p className="text-slate-300 mb-0">
              <strong>Fix:</strong> Start a baby in a 4×2×2 with plenty of hides and visual barriers; ensure basking and UVB distances are correct. <Link href="/guides/bearded-dragon-tank-setup" className="text-emerald-400 hover:text-emerald-300">Tank Setup</Link>.
            </p>
          </GuideSection>

          <GuideSection Icon={Package} iconColor="#f87171" title="Relying on Starter Kits Without Checking">
            <p className="text-slate-300 mb-4">
              Many “bearded dragon starter kits” include tanks that are too small, coil UVB, or no thermostat—so using the contents as-is repeats the mistakes above.
            </p>
            <p className="text-slate-300 mb-0">
              <strong>Fix:</strong> Verify every item against current standards (4×2×2 or larger, T5 10.0/12%, thermostat, safe substrate, decor). Replace what the kit lacks—or build your list with a builder that enforces these requirements.
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
            <h2 className="text-lg font-bold text-white mb-3">Deep-Dive Guides</h2>
            <p className="text-slate-400 text-sm mb-0">Each mistake above has a full guide: <Link href="/guides/bearded-dragon-care" className="text-emerald-400 hover:text-emerald-300">Care</Link>, <Link href="/guides/bearded-dragon-tank-setup" className="text-emerald-400 hover:text-emerald-300">Tank Setup</Link>, <Link href="/guides/bearded-dragon-lighting-uvb" className="text-emerald-400 hover:text-emerald-300">Lighting & UVB</Link>, <Link href="/guides/bearded-dragon-substrate" className="text-emerald-400 hover:text-emerald-300">Substrate</Link>, <Link href="/guides/bearded-dragon-feeding" className="text-emerald-400 hover:text-emerald-300">Feeding</Link>.
            </p>
          </div>

          <div className="mt-16 text-center p-8 rounded-3xl bg-emerald-500/10 border border-emerald-500/30">
            <h2 className="text-2xl font-black text-white mb-4">A builder that avoids these mistakes by design</h2>
            <p className="text-slate-300 max-w-xl mx-auto mb-6">
              BuildMyHabitat’s Bearded Dragon builder only offers 4×2×2 or larger enclosures, T5 UVB, thermostats, and safe substrate—so your list matches current standards without guesswork.
            </p>
            <Link href="/build/bearded-dragon" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-full transition-all">
              Build a Bearded Dragon Habitat <ArrowRight size={20} />
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
      <button onClick={() => setIsOpen(!isOpen)} className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-900/30" aria-expanded={isOpen}>
        <h3 className="text-lg font-bold text-white pr-4">{question}</h3>
        <HelpCircle size={20} className={`text-emerald-400 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && <div className="px-6 pb-4"><p className="text-slate-300 leading-relaxed">{answer}</p></div>}
    </div>
  );
}
