"use client";

import React from "react";
import Link from "next/link";
import {
  Layers,
  ShieldAlert,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  HelpCircle,
} from "lucide-react";
import Footer from "../../components/Footer";
import { FAQSchema } from "../../components/StructuredData";

export default function LeopardGeckoSandSafePage() {
  const faqs = [
    {
      question: "Is playsand safe for leopard geckos?",
      answer:
        "Washed quartz playsand can be part of a safe setup when mixed with organic topsoil or used alone only if husbandry is solid—thermostat-controlled heat, hydration, and no unsafe “calcium” or vitamin-coated sands. It is not magic; poor temps and dehydration cause problems on any floor type.",
    },
    {
      question: "Why is calcium sand bad for leopard geckos?",
      answer:
        "Calcium sand is often ingested on purpose or while striking prey. It can clump and contribute to blockage and is marketed in ways that downplay risk. Use inert substrates instead: tile, paper towel, or topsoil/playsand mixes without calcium coating.",
    },
    {
      question: "Should a beginner keep a leopard gecko on sand?",
      answer:
        "Most beginners progress faster on paper towel or tile while they master heating, three hides, and feeding. If you want sand later, switch after the enclosure is stable and you can monitor health and stools.",
    },
    {
      question: "What actually causes impaction in leopard geckos?",
      answer:
        "Common factors include dehydration, parasites, illness, incorrect temperatures, swallowing indigestible substrate (especially calcium sand), and feeding oversized or poor-quality prey. Fixing husbandry and choosing inert substrate addresses most preventable cases.",
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
              Is Sand Safe for Leopard Geckos?
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-6">
              What actually drives impaction, which sands are inert, and when solid substrate is the better default.
            </p>
            <Link
              href="/build/leopard-gecko"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-full transition-all"
            >
              Build a Leopard Gecko Habitat <ArrowRight size={20} />
            </Link>
          </div>

          <GuideSection Icon={ShieldAlert} iconColor="#f87171" title="Why Sand Has a Bad Reputation">
            <p className="text-slate-300 mb-4">
              For years, pet stores pushed <strong>calcium sand</strong> and generic “desert blends” while tanks ran too cold or lacked proper hides. Animals got sick; sand took the blame. The lesson is not “all particles are evil”—it is that <strong>coated, clumping, or appetizing sands</strong> plus weak husbandry created avoidable cases. Inert quartz sand and soil mixes behave differently from calcium sand and should never be lumped together.
            </p>
          </GuideSection>

          <GuideSection Icon={Layers} iconColor="#34d399" title="What Actually Causes Impaction">
            <p className="text-slate-300 mb-4">
              Impaction usually lines up with <strong>dehydration</strong>, <strong>incorrect temperatures</strong> (slow digestion), <strong>parasites or illness</strong>, or <strong>eating the wrong substrate</strong>. Leopard geckos are not UVB-dependent like bearded dragons, but chronic stress, poor warm hide temps, and bad feeders still gut-check the same way. Substrate is one variable among many—fix heat, water, and diet before declaring sand the sole cause.
            </p>
          </GuideSection>

          <GuideSection Icon={CheckCircle2} iconColor="#22d3ee" title="Safe vs Unsafe Sand Types">
            <p className="text-slate-300 mb-4">
              <strong>Generally acceptable when used responsibly:</strong> washed playsand as part of a 50/50 topsoil mix or alone only with excellent management. <strong>Avoid:</strong> calcium/vitamin sand, colored craft sand, sharp blasting grit, walnut shell, and anything marketed as “digestible” sand. For a full substrate overview, use our{" "}
              <Link href="/guides/leopard-gecko-substrate" className="text-emerald-400 hover:text-emerald-300">
                Leopard Gecko Substrate Guide
              </Link>
              .
            </p>
          </GuideSection>

          <GuideSection Icon={CheckCircle2} iconColor="#a78bfa" title="When Sand Is Appropriate vs Not">
            <p className="text-slate-300 mb-4">
              Loose sand or soil mix fits keepers who already run a <strong>thermostat</strong>, offer <strong>three hides</strong>, and can spot early signs of illness. It is a poor first choice for <strong>quarantine</strong>, <strong>babies under heavy stress</strong>, or any setup still missing reliable warm-floor or overhead heat. If you are troubleshooting weight loss or abnormal stools, switch to solid substrate until a vet rules out parasites and other causes.
            </p>
          </GuideSection>

          <GuideSection Icon={CheckCircle2} iconColor="#34d399" title="Beginner Recommendation">
            <p className="text-slate-300 mb-0">
              Default to <strong>paper towel</strong> or <strong>slate tile</strong> until heating and hides are boringly consistent. Add a safe mix later if you want naturalistic digging. That order reduces variables and matches how most experienced keepers teach the hobby. For common hardware and substrate errors in one place, see our{" "}
              <Link href="/common-mistakes" className="text-emerald-400 hover:text-emerald-300">
                Complete Safety Guide
              </Link>{" "}
              (Leopard Gecko section).
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
              <Link href="/guides/leopard-gecko-substrate" className="text-emerald-400 hover:text-emerald-300">
                Leopard Gecko Substrate Guide
              </Link>
              {" · "}
              <Link href="/common-mistakes" className="text-emerald-400 hover:text-emerald-300">
                Common Mistakes (Safety Guide)
              </Link>
            </p>
          </div>

          <div className="mt-16 text-center p-8 rounded-3xl bg-emerald-500/10 border border-emerald-500/30">
            <h2 className="text-2xl font-black text-white mb-4">Safe substrate, enforced on your list</h2>
            <p className="text-slate-300 max-w-xl mx-auto mb-6">
              The Leopard Gecko builder excludes calcium sand and other high-risk options and aligns substrate with heating and hides—so you are not piecing together conflicting advice from product labels.
            </p>
            <Link
              href="/build/leopard-gecko"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-full transition-all"
            >
              Build a Leopard Gecko Habitat <ArrowRight size={20} />
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
