"use client";

import React from "react";
import Link from "next/link";
import {
  Layers,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  HelpCircle,
} from "lucide-react";
import Footer from "../../components/Footer";
import { FAQSchema } from "../../components/StructuredData";

export default function BeardedDragonSubstratePage() {
  const faqs = [
    {
      question: "Can bearded dragons live on sand?",
      answer: "Bearded dragons can be kept on sand when it is the right kind and husbandry is correct. Calcium sand is unsafe (impaction and overconsumption risk). Washed playsand or a 50/50 mix of organic topsoil and playsand is commonly used. Proper heating, UVB, hydration, and diet reduce impaction risk; poor husbandry increases it regardless of substrate.",
    },
    {
      question: "What is the best beginner substrate for a bearded dragon?",
      answer: "For beginners, solid substrates are the safest and easiest: paper towel or slate tile. They eliminate impaction risk and are simple to clean. Once you are comfortable with heating, UVB, and feeding, you can consider a 50/50 topsoil and playsand mix if you want a more naturalistic setup.",
    },
    {
      question: "Is reptile carpet safe for bearded dragons?",
      answer: "Reptile carpet is not recommended. Claws and teeth can snag in the fibers, leading to broken toes or mouth injuries. It also traps bacteria and is hard to clean properly. Prefer paper towel, tile, or a safe loose mix instead.",
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
              Bearded Dragon Substrate Guide
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-6">
              Safe options for beginners and naturalistic setups—and why good husbandry matters more than blanket “no sand” rules.
            </p>
            <Link href="/build/bearded-dragon" className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-full transition-all">
              Build a Bearded Dragon Habitat <ArrowRight size={20} />
            </Link>
          </div>

          <GuideSection Icon={Layers} iconColor="#34d399" title="What Impaction Is and Why Husbandry Matters">
            <p className="text-slate-300 mb-4">
              Impaction is a digestive blockage. It can follow swallowing indigestible material (e.g. large amounts of sand) but is often linked to <strong>poor husbandry</strong>: low temps, weak UVB, dehydration, or poor diet. When heating, UVB, and hydration are correct, the risk from safe loose substrates is much lower. For full enclosure and care context, see our <Link href="/guides/bearded-dragon-care" className="text-emerald-400 hover:text-emerald-300">Care Guide</Link> and <Link href="/guides/bearded-dragon-tank-setup" className="text-emerald-400 hover:text-emerald-300">Tank Setup Guide</Link>.
            </p>
          </GuideSection>

          <GuideSection Icon={CheckCircle2} iconColor="#34d399" title="Best Beginner and Naturalistic Substrates">
            <p className="text-slate-300 mb-4">
              For new keepers, <strong>solid substrates</strong> are safest and simplest: <strong>paper towel</strong> (cheap, easy to replace, zero risk; ideal for quarantine or babies) or <strong>slate tile</strong> (natural look, holds heat, easy to wipe down—ensure tiles are flat and secure). Both work in a 4×2×2 or larger.
            </p>
            <p className="text-slate-300 mb-4">
              For a naturalistic setup, a <strong>50/50 mix of organic topsoil and washed playsand</strong> (no additives, no fertilizer) allows digging and can support bioactive when combined with proper drainage and clean-up crew. Topsoil must be organic and free of perlite and pesticides; playsand should be washed. This option is better once heating, UVB, and feeding are dialed in. Depth: a few inches unless building full bioactive.
            </p>
            <p className="text-slate-300 mb-0">
              <strong>Avoid:</strong> Calcium sand (dragons may eat it—impaction and overload). Reptile carpet (snags claws and teeth, harbors bacteria). Walnut shell (sharp, impaction risk). Wood chips, pine, cedar (oils and splinters). More pitfalls: <Link href="/guides/bearded-dragon-mistakes" className="text-emerald-400 hover:text-emerald-300">Common Bearded Dragon Mistakes</Link>.
            </p>
          </GuideSection>

          <div className="my-12 p-6 rounded-2xl bg-slate-800/80 border border-emerald-500/20">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <CheckCircle2 className="text-emerald-400" size={22} />
              Substrate Checklist
            </h2>
            <ul className="space-y-2 text-slate-300 text-sm">
              <li>• Beginners: paper towel or slate tile</li>
              <li>• Naturalistic: 50/50 organic topsoil + washed playsand</li>
              <li>• Avoid: calcium sand, reptile carpet, walnut shell, wood chips</li>
              <li>• Good heating, UVB, and hydration reduce impaction risk on any substrate</li>
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
            <p className="text-slate-400 text-sm mb-0">Substrate choice works with enclosure size, heating, and UVB. See our <Link href="/guides/bearded-dragon-care" className="text-emerald-400 hover:text-emerald-300">Care Guide</Link>, <Link href="/guides/bearded-dragon-tank-setup" className="text-emerald-400 hover:text-emerald-300">Tank Setup</Link>, and <Link href="/guides/bearded-dragon-mistakes" className="text-emerald-400 hover:text-emerald-300">Common Mistakes</Link>.
            </p>
          </div>

          <div className="mt-16 text-center p-8 rounded-3xl bg-emerald-500/10 border border-emerald-500/30">
            <h2 className="text-2xl font-black text-white mb-4">Safe substrate options that match your enclosure</h2>
            <p className="text-slate-300 max-w-xl mx-auto mb-6">
              BuildMyHabitat’s builder only offers safe substrate choices (including 50/50 topsoil and playsand) and excludes calcium sand, reptile carpet, and other unsafe options—so your habitat is set up correctly from the list.
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
