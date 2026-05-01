"use client";

import React from "react";
import Link from "next/link";
import {
  Box,
  Flame,
  Sun,
  Layers,
  Home,
  UtensilsCrossed,
  Droplets,
  Pill,
  Heart,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  ShieldAlert,
  CheckCircle2,
  HelpCircle,
} from "lucide-react";
import Footer from "../../components/Footer";
import { FAQSchema } from "../../components/StructuredData";

export default function BeardedDragonCareGuidePage() {
  const faqs = [
    {
      question: "What size tank does a bearded dragon need?",
      answer: "Bearded dragons need a minimum of 120 gallons or a 4×2×2 ft (48×24×24 in) enclosure. Older advice suggesting 40 or 75 gallons is outdated and does not allow proper temperature gradients, UVB coverage, or enrichment.",
    },
    {
      question: "Do bearded dragons need UVB?",
      answer: "Yes. UVB is non-negotiable for bearded dragons. They need it to synthesize vitamin D3 and absorb calcium. Without adequate UVB, they develop metabolic bone disease (MBD). Use a T5 high-output 10.0 or 12% UVB tube covering roughly half the enclosure length.",
    },
    {
      question: "What do bearded dragons eat?",
      answer: "Bearded dragons are omnivores. They eat insects (e.g. dubia roaches, crickets, black soldier fly larvae) and vegetables/greens (collard greens, mustard greens, dandelion greens, squash). Babies eat more insects; adults eat more greens. Always dust insects with calcium and use a multivitamin weekly.",
    },
    {
      question: "How long do bearded dragons live?",
      answer: "With proper care, bearded dragons typically live 10–15 years. Lifespan depends heavily on enclosure size, UVB, heating, diet, and avoiding common mistakes like calcium sand or weak lighting.",
    },
    {
      question: "Can I skip this guide and just use the builder?",
      answer: "Yes. The Bearded Dragon builder applies these care standards and blocks unsafe choices. You get a compatible shopping list without guessing. Use it to build your habitat step-by-step.",
    },
  ];

  return (
    <>
      <FAQSchema faqs={faqs} />
      <main className="min-h-screen pt-28 pb-20 px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-medium text-base group mb-8"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back to Hub
          </Link>

          {/* Hero */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4 drop-shadow-lg leading-tight">
              Complete Bearded Dragon Care Guide
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto mb-6">
              Research-backed standards for enclosure size, UVB, heating, substrate, and feeding—so you can build a habitat that meets current welfare guidelines.
            </p>
            <Link
              href="/build/bearded-dragon"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-full transition-all hover:scale-105 shadow-lg shadow-emerald-900/20 text-sm md:text-base"
            >
              Build a Bearded Dragon Habitat <ArrowRight size={20} className="shrink-0" />
            </Link>
          </div>

          {/* Checklist summary box */}
          <div className="mb-12 p-6 rounded-2xl bg-slate-800/80 border border-emerald-500/20">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <CheckCircle2 className="text-emerald-400" size={22} />
              Safe Bearded Dragon Setup Checklist
            </h2>
            <ul className="grid sm:grid-cols-2 gap-2 text-slate-300 text-sm">
              <li className="flex items-center gap-2">• 4×2×2 ft (120 gal) minimum enclosure</li>
              <li className="flex items-center gap-2">• T5 UVB 10–12% over ~50% of length</li>
              <li className="flex items-center gap-2">• Basking heat (halogen/CHE) + thermostat</li>
              <li className="flex items-center gap-2">• Basking surface 100–108°F, cool side 75–80°F</li>
              <li className="flex items-center gap-2">• Safe substrate (no calcium sand, no reptile carpet)</li>
              <li className="flex items-center gap-2">• At least 2 hides + basking platform + climbing</li>
              <li className="flex items-center gap-2">• Insects + greens, calcium + multivitamin</li>
            </ul>
          </div>

          {/* What is a bearded dragon */}
          <GuideSection Icon={Heart} iconColor="#34d399" title="What Is a Bearded Dragon?">
            <p className="text-slate-300 mb-4">
              Bearded dragons (<em>Pogona vitticeps</em>) are diurnal, medium-sized lizards native to Australia’s arid regions. They reach 18–24 inches as adults, are generally docile when housed correctly, and can live 10–15 years with proper care. Stress and shortened lifespan usually stem from inadequate enclosure size, weak UVB, or poor diet—all addressable with the standards in this guide.
            </p>
          </GuideSection>

          {/* Enclosure */}
          <GuideSection Icon={Box} iconColor="#22d3ee" title="Enclosure Size and Habitat">
            <p className="text-slate-300 mb-4">
              The minimum for one adult is a <strong>4×2×2 ft</strong> (48×24×24 in) enclosure—roughly 120 gallons. This length is required for a true temperature gradient, adequate UVB coverage, and space for basking, hides, and climbing. Older 40- or 75-gallon advice does not meet current standards; larger than 4×2×2 is acceptable and often preferred.
            </p>
            <p className="text-slate-300 mb-4">
              For step-by-step layout and hot/cool side setup, see our <Link href="/guides/bearded-dragon-tank-setup" className="text-emerald-400 hover:text-emerald-300 font-medium">Bearded Dragon Tank Setup Guide</Link>. To generate a shopping list that enforces 4×2×2 and compatible equipment, use the builder below.
            </p>
            <div className="mt-6 pt-6 border-t border-slate-700">
              <Link href="/build/bearded-dragon" className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 text-emerald-300 text-sm font-semibold rounded-lg transition-all">
                Build a Bearded Dragon Habitat <ArrowRight size={16} />
              </Link>
            </div>
          </GuideSection>

          {/* Heating */}
          <GuideSection Icon={Flame} iconColor="#fb923c" title="Heating and Basking">
            <p className="text-slate-300 mb-4">
              A hot basking zone (100–108°F surface temp, measured with a temp gun) and a cool side (mid-70s to low 80s °F) allow thermoregulation. Halogen floods or a ceramic heat emitter (CHE) are standard; every heat source must be on a <strong>thermostat</strong> to prevent burns and overheating.
            </p>
          </GuideSection>

          {/* Lighting / UVB */}
          <GuideSection Icon={Sun} iconColor="#eab308" title="Lighting and UVB">
            <p className="text-slate-300 mb-4">
              UVB is non-negotiable: it drives vitamin D3 synthesis and calcium absorption. Without adequate UVB, bearded dragons develop metabolic bone disease (MBD). The standard is a <strong>T5 high-output 10.0 or 12%</strong> tube over roughly half the enclosure; coil bulbs are typically too weak or uneven. For placement, thermostats, and common lighting errors, see our <Link href="/guides/bearded-dragon-lighting-uvb" className="text-emerald-400 hover:text-emerald-300 font-medium">Bearded Dragon Lighting & UVB Guide</Link>.
            </p>
          </GuideSection>

          {/* Substrate */}
          <GuideSection Icon={Layers} iconColor="#a78bfa" title="Substrate">
            <p className="text-slate-300 mb-4">
              Beginners do well with solid options (paper towel, slate tile). A <strong>50/50 topsoil and playsand</strong> mix suits naturalistic setups when husbandry is correct. Never use calcium sand, reptile carpet, or walnut shell—see our <Link href="/guides/bearded-dragon-substrate" className="text-emerald-400 hover:text-emerald-300 font-medium">Bearded Dragon Substrate Guide</Link> for safe choices and what to avoid.
            </p>
          </GuideSection>

          {/* Decor / enrichment */}
          <GuideSection Icon={Home} iconColor="#e879f9" title="Decor and Enrichment">
            <p className="text-slate-300 mb-4">
              Provide at least two hides (warm and cool), a sturdy basking platform at the correct height for 100–108°F and UVB exposure, and climbing branches or cork. Plants (fake or safe live) add cover and reduce stress.
            </p>
          </GuideSection>

          {/* Feeding basics */}
          <GuideSection Icon={UtensilsCrossed} iconColor="#34d399" title="Feeding Basics">
            <p className="text-slate-300 mb-4">
              Bearded dragons are omnivores: staple insects (dubia, crickets, BSFL) and leafy greens (collard, mustard, dandelion, turnip, escarole, endive), sized no larger than the space between the eyes. Young dragons eat more insects; adults should get most calories from greens, with insects several times per week. Fruit is high in sugar—offer rarely if at all. For age-based schedules and supplementation, see our <Link href="/guides/bearded-dragon-feeding" className="text-emerald-400 hover:text-emerald-300 font-medium">Bearded Dragon Feeding Guide</Link>.
            </p>
          </GuideSection>

          {/* Hydration & Supplements */}
          <GuideSection Icon={Droplets} iconColor="#22d3ee" title="Hydration and Supplements">
            <p className="text-slate-300 mb-4">
              Much of their water comes from food: fresh greens and well-hydrated insects. A shallow water bowl is still recommended; keep it shallow to prevent drowning. Dust insects with calcium (with D3 if UVB is weak or absent; without D3 with strong T5 UVB) at most feedings, and add a reptile multivitamin once or twice weekly. Over-supplementing is harmful—stick to a clear schedule.
            </p>
          </GuideSection>

          {/* Common behaviors */}
          <GuideSection Icon={Heart} iconColor="#f472b6" title="Common Behaviors">
            <p className="text-slate-300 mb-4">
              Arm waving often signals submission or recognition; head bobbing is typically dominance or territorial. Glass surfing can indicate stress, an undersized enclosure, or reflection. Black beard and body flattening may signal stress or illness. Knowing normal behavior makes it easier to spot when something is wrong.
            </p>
          </GuideSection>

          {/* Beginner mistakes */}
          <GuideSection Icon={AlertTriangle} iconColor="#f87171" title="Beginner Mistakes to Avoid">
            <p className="text-slate-300 mb-4">
              Frequent errors: enclosure too small (e.g. 40 gal), weak or no UVB, unregulated heat, measuring air temp instead of basking surface, calcium sand, reptile carpet, adults fed only insects, and skipped supplements. “Starter kits” often include undersized tanks and inadequate UVB—verify every item against the standards above. For a full list with fixes, see our <Link href="/guides/bearded-dragon-mistakes" className="text-emerald-400 hover:text-emerald-300 font-medium">Common Bearded Dragon Mistakes</Link> guide.
            </p>
          </GuideSection>

          {/* Internal links */}
          <div className="mt-12 p-6 rounded-2xl bg-slate-800/60 border border-slate-700">
            <h2 className="text-xl font-bold text-white mb-4">Deep-Dive Guides</h2>
            <p className="text-slate-400 text-sm mb-4">Each topic below has a dedicated guide with step-by-step detail and checklists.</p>
            <ul className="space-y-2 text-slate-300">
              <li><Link href="/guides/bearded-dragon-tank-setup" className="text-emerald-400 hover:text-emerald-300 font-medium">Tank Setup</Link> — 4×2×2 layout, hot/cool sides, and recommended arrangement</li>
              <li><Link href="/guides/bearded-dragon-feeding" className="text-emerald-400 hover:text-emerald-300 font-medium">Feeding</Link> — Baby, juvenile, and adult schedules plus supplementation</li>
              <li><Link href="/guides/bearded-dragon-lighting-uvb" className="text-emerald-400 hover:text-emerald-300 font-medium">Lighting & UVB</Link> — T5 selection, placement, and thermostat use</li>
              <li><Link href="/guides/bearded-dragon-substrate" className="text-emerald-400 hover:text-emerald-300 font-medium">Substrate</Link> — Safe options, naturalistic mixes, and what to avoid</li>
              <li><Link href="/guides/bearded-dragon-mistakes" className="text-emerald-400 hover:text-emerald-300 font-medium">Common Mistakes</Link> — What goes wrong and how to fix it</li>
            </ul>
          </div>

          {/* FAQ */}
          <div className="mt-16">
            <h2 className="text-3xl font-black text-white mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <FAQItem key={i} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>

          {/* Final CTA */}
          <div className="mt-16 text-center p-8 rounded-3xl bg-emerald-500/10 border border-emerald-500/30">
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-4">Ready to build? The builder applies these standards for you.</h2>
            <p className="text-slate-300 max-w-xl mx-auto mb-6">
              BuildMyHabitat’s Bearded Dragon builder enforces 4×2×2 minimums, T5 UVB, thermostats, and safe substrate—and blocks incompatible or unsafe options. You get a verified shopping list without guessing.
            </p>
            <Link
              href="/build/bearded-dragon"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-full transition-all hover:scale-105 shadow-lg shadow-emerald-900/30"
            >
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
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-900/30 transition-colors"
        aria-expanded={isOpen}
      >
        <h3 className="text-lg font-bold text-white pr-4">{question}</h3>
        <HelpCircle size={20} className={`text-emerald-400 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && (
        <div className="px-6 pb-4">
          <p className="text-slate-300 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}
