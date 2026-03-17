"use client";

import React from "react";
import Link from "next/link";
import {
  Box,
  Flame,
  Sun,
  Home,
  ArrowRight,
  ArrowLeft,
  ShieldAlert,
  CheckCircle2,
  HelpCircle,
} from "lucide-react";
import Footer from "../../components/Footer";
import { FAQSchema } from "../../components/StructuredData";

export default function BeardedDragonTankSetupPage() {
  const faqs = [
    {
      question: "What is the minimum tank size for a bearded dragon?",
      answer: "The minimum for one adult bearded dragon is a 4×2×2 ft (48×24×24 in) enclosure, roughly 120 gallons equivalent. Smaller tanks do not allow proper temperature gradients, UVB coverage, or behavioral needs.",
    },
    {
      question: "Why is 40 gallon or 75 gallon not enough for a bearded dragon?",
      answer: "Older care sheets recommended 40–75 gallons, but current welfare and husbandry standards require more space. A 4×2×2 provides a real hot-to-cool gradient, room for a proper UVB strip, basking and climbing areas, and reduces stress. Smaller enclosures make it impossible to meet these needs.",
    },
    {
      question: "How do I set up hot and cool sides in a bearded dragon tank?",
      answer: "Place the heat lamp and UVB over one end (hot side); leave the opposite end without heating (cool side). The basking spot should reach 100–108°F on the surface; the cool side should stay in the mid-70s to low 80s °F. Use a thermostat and measure basking surface temp with a temp gun.",
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
              Bearded Dragon Tank Setup Guide
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-6">
              Why 4×2×2 is the minimum, how to create hot and cool sides, and a step-by-step layout so your enclosure meets current standards.
            </p>
            <Link href="/build/bearded-dragon" className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-full transition-all">
              Build a Bearded Dragon Habitat <ArrowRight size={20} />
            </Link>
          </div>

          <GuideSection Icon={Box} iconColor="#34d399" title="Minimum Enclosure Size">
            <p className="text-slate-300 mb-4">
              The accepted minimum for one adult is <strong>4×2×2 ft</strong> (48×24×24 in), or roughly 120 gallons. That length is necessary for a true temperature gradient, a T5 UVB strip over about half the enclosure, and space for basking, hides, and climbing. Floor space and length matter more than gallon number; 5×2×2 or 6×2×2 is acceptable and often better for enrichment.
            </p>
            <p className="text-slate-300 mb-4">
              Older care sheets and pet-store labels still cite 40- or 75-gallon tanks. A 40-gallon breeder (36×18×18 in) cannot safely deliver a 100–108°F basking zone, a distinct cool side in the 70s, and adequate room for hides and movement. A 75-gallon is longer but narrower; 4×2×2 remains the minimum that reliably supports correct heating, UVB, and layout.
            </p>
          </GuideSection>

          <GuideSection Icon={Home} iconColor="#22d3ee" title="Baby Bearded Dragon Enclosures">
            <p className="text-slate-300 mb-4">
              The idea that babies are stressed by large tanks is a myth. Stress usually comes from poor design—too open, too few hides, incorrect temps—not from enclosure size. You can start a baby in a 4×2×2 with multiple hides, visual barriers, and correct heating and UVB distances for the bulb and the animal’s size.
            </p>
          </GuideSection>

          <GuideSection Icon={Flame} iconColor="#fb923c" title="Hot Side vs Cool Side">
            <p className="text-slate-300 mb-4">
              One end is heated (heat lamp and UVB over the basking zone, surface temp 100–108°F with a temp gun); the opposite end stays cool (mid-70s to low 80s °F). Bearded dragons thermoregulate by moving between the two. A thermostat on the heat source is mandatory—unregulated heat can cause burns or death.
            </p>
          </GuideSection>

          <GuideSection Icon={CheckCircle2} iconColor="#34d399" title="Recommended Bearded Dragon Tank Layout">
            <p className="text-slate-300 mb-4">
              A repeatable layout for a 4×2×2 (or larger) enclosure:
            </p>
            <ol className="list-decimal list-inside space-y-3 text-slate-300 text-sm sm:text-base">
              <li><strong>Heat and UVB at one end.</strong> Mount the basking lamp and T5 UVB over the same end so the basking spot receives both.</li>
              <li><strong>Substrate.</strong> Paper towel, tile, or a safe loose mix (e.g. 50/50 topsoil and playsand). For loose, 2–4 in depth unless you are going bioactive. See our <Link href="/guides/bearded-dragon-substrate" className="text-emerald-400 hover:text-emerald-300">Substrate Guide</Link> for options.</li>
              <li><strong>Basking platform.</strong> Flat, stable surface under the heat lamp—height and wattage adjusted so the top reaches 100–108°F (verify with a temp gun).</li>
              <li><strong>Hides.</strong> One on the hot side (near, not directly under the bulb), at least one on the cool side.</li>
              <li><strong>Climbing and clutter.</strong> Branches or cork; fake or safe live plants for cover.</li>
              <li><strong>Water bowl.</strong> Shallow, tip-proof, on the cool side. Clean and refill regularly.</li>
              <li><strong>Verify.</strong> Temp gun on basking surface; digital thermometer on cool side. Recheck after the thermostat has run for a few hours.</li>
            </ol>
          </GuideSection>

          <GuideSection Icon={Sun} iconColor="#eab308" title="Basking Platform, Hides, Branches, and Water">
            <p className="text-slate-300 mb-4">
              Basking platform: flat and stable, height set so the surface reaches 100–108°F (wood, slate, or commercial ramps). Hides: at least two (warm and cool), large enough for the dragon to fit fully inside. Branches: sturdy, sanitized, placed so the animal can access correct UVB distance. Water: shallow, tip-proof bowl on the cool side, cleaned and refilled regularly.
            </p>
          </GuideSection>

          <GuideSection Icon={ShieldAlert} iconColor="#f87171" title="Tank Setup Mistakes to Avoid">
            <ul className="space-y-2 text-slate-300">
              <GuidePoint alert>Using a tank that is too small (40 or 75 gal) because old care sheets said so.</GuidePoint>
              <GuidePoint alert>No thermostat on the heat source.</GuidePoint>
              <GuidePoint alert>Measuring only air temperature instead of basking surface temperature with a temp gun.</GuidePoint>
              <GuidePoint alert>Placing UVB and heat too far apart so the basking spot does not get UVB.</GuidePoint>
              <GuidePoint alert>Too few hides or no visual barriers, especially for babies.</GuidePoint>
            </ul>
          </GuideSection>

          <div className="my-12 p-6 rounded-2xl bg-slate-800/80 border border-emerald-500/20">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <CheckCircle2 className="text-emerald-400" size={22} />
              Quick Tank Setup Checklist
            </h2>
            <ul className="space-y-2 text-slate-300 text-sm">
              <li>• 4×2×2 ft (120 gal) or larger enclosure</li>
              <li>• Heat lamp + thermostat on one end</li>
              <li>• T5 UVB 10–12% over ~50% of length, same end as heat</li>
              <li>• Basking surface 100–108°F (temp gun)</li>
              <li>• Cool side 75–80°F</li>
              <li>• Basking platform, 2+ hides, branches, shallow water bowl</li>
              <li>• Safe substrate (no calcium sand, no reptile carpet)</li>
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
            <p className="text-slate-400 text-sm mb-4">Enclosure size and layout work together with heating, UVB, and substrate. For full context, see our <Link href="/guides/bearded-dragon-care" className="text-emerald-400 hover:text-emerald-300">Care Guide</Link>, <Link href="/guides/bearded-dragon-lighting-uvb" className="text-emerald-400 hover:text-emerald-300">Lighting & UVB</Link>, and <Link href="/guides/bearded-dragon-substrate" className="text-emerald-400 hover:text-emerald-300">Substrate Guide</Link>.
            </p>
          </div>

          <div className="mt-16 text-center p-8 rounded-3xl bg-emerald-500/10 border border-emerald-500/30">
            <h2 className="text-2xl font-black text-white mb-4">Apply this layout with equipment that already matches</h2>
            <p className="text-slate-300 max-w-xl mx-auto mb-6">
              BuildMyHabitat’s Bearded Dragon builder only offers 4×2×2 or larger enclosures and pairs them with compatible heating, T5 UVB, and decor—so your tank setup meets these standards by default.
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

function GuidePoint({ children, alert }) {
  return (
    <li className="flex items-start gap-3 text-slate-300 leading-relaxed">
      <div className="shrink-0 mt-1">
        {alert ? <ShieldAlert size={18} className="text-red-400" /> : <CheckCircle2 size={18} className="text-emerald-400" />}
      </div>
      <div>{children}</div>
    </li>
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
