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
  Zap,
} from "lucide-react";
import Footer from "../../components/Footer";
import { FAQSchema } from "../../components/StructuredData";

export default function LeopardGeckoSandSafePage() {
  const faqs = [
    {
      question: "Is sand safe for leopard geckos?",
      answer:
        "Sand can be safe for leopard geckos when it is inert and husbandry is solid: thermostat-controlled floor heat, hydration, correct prey size, and a safe leopard gecko sand substrate choice—never calcium sand or “digestible” blends. Impaction has many causes; poor temps and dehydration matter as much as what is on the floor.",
    },
    {
      question: "What leopard gecko sand substrate is safest?",
      answer:
        "The most common safe loose option is a 50/50 organic topsoil and washed quartz playsand mix (topsoil playsand mix), fully blended and kept dry in the warm zone. Washed playsand alone can work for experienced keepers but is easier to get wrong. Pair with tile or paper towel during quarantine or troubleshooting.",
    },
    {
      question: "Why is calcium sand bad for leopard geckos?",
      answer:
        "Calcium sand is often eaten on purpose or while striking prey, can clump in the gut, and is marketed to downplay risk. For leopard gecko impaction causes tied to substrate, calcium sand and similar products are high on the list—use inert options instead.",
    },
    {
      question: "What are common leopard gecko impaction causes besides substrate?",
      answer:
        "Dehydration, incorrect temperatures, parasites, illness, oversized prey, and swallowing indigestible or coated substrate. Substrate is only one part of the problem—fix heat, water, and diet while you rule out disease.",
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
              Sand can be safe for leopard geckos—but only when used correctly. Here’s what actually causes impaction, which sands are safe, and when solid substrate is the better choice.
            </p>
            <Link
              href="/build/leopard-gecko"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-full transition-all"
            >
              Build a Leopard Gecko Habitat <ArrowRight size={20} />
            </Link>
          </div>

          <div className="mb-8 p-6 sm:p-8 rounded-3xl border-2 border-emerald-500/35 bg-emerald-500/[0.07] shadow-lg">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Zap className="text-emerald-400 shrink-0" size={24} />
              Quick Answer
            </h2>
            <ul className="space-y-2.5 text-slate-300 text-sm sm:text-base">
              <li className="text-slate-300">
                <span className="text-emerald-400 font-bold">Sand can be safe for leopard geckos</span>
              </li>
              <li className="flex flex-wrap gap-x-2 gap-y-1">
                <span className="text-emerald-400 font-bold shrink-0">Safe option →</span>
                <span>50/50 topsoil + playsand mix</span>
              </li>
              <li className="flex flex-wrap gap-x-2 gap-y-1">
                <span className="text-emerald-400 font-bold shrink-0">Unsafe →</span>
                <span>calcium sand, dyed sand, walnut shell</span>
              </li>
              <li className="flex flex-wrap gap-x-2 gap-y-1">
                <span className="text-emerald-400 font-bold shrink-0">Best for beginners →</span>
                <span>paper towel or slate tile</span>
              </li>
            </ul>
          </div>

          <GuideSection Icon={ShieldAlert} iconColor="#f87171" title="Why Sand Has a Bad Reputation">
            <p className="text-slate-300 mb-4">
              For years, pet stores pushed <strong>calcium sand</strong> and generic “desert blends” while tanks ran too cold or lacked proper hides. Animals got sick; sand took the blame. The lesson is not “all particles are evil”—it is that <strong>coated, clumping, or appetizing sands</strong> plus weak husbandry created avoidable cases. Inert quartz sand and soil mixes behave differently from calcium sand and should never be lumped together.
            </p>
            <p className="text-slate-300 mb-0">
              The problem was not sand itself—it was poor setup combined with the wrong materials.
            </p>
          </GuideSection>

          <GuideSection Icon={Layers} iconColor="#34d399" title="What Actually Causes Impaction">
            <p className="text-slate-300 mb-4">
              <strong>Impaction</strong> is when the digestive tract slows or blocks—often from multiple factors at once. It usually lines up with <strong>dehydration</strong>, <strong>incorrect temperatures</strong> (slow digestion), <strong>parasites or illness</strong>, or <strong>eating the wrong substrate</strong>. Leopard geckos are not UVB-dependent like bearded dragons, but chronic stress, poor warm hide temps, and bad feeders still matter. Substrate is only one part of the problem—fix heat, water, and diet before declaring sand the sole cause.
            </p>
          </GuideSection>

          <GuideSection Icon={CheckCircle2} iconColor="#22d3ee" title="Safe vs Unsafe Sand Types">
            <p className="text-slate-300 mb-4">
              <strong>Is sand safe for leopard geckos?</strong> It can be—when you pick inert material and run a dialed-in enclosure. The bag label matters less than whether you are using washed playsand or a topsoil playsand mix versus coated or “digestible” products.
            </p>
            <h3 className="text-base font-bold text-white mb-2">Safe (when used correctly)</h3>
            <ul className="space-y-2 text-slate-300 text-sm sm:text-base list-disc list-inside marker:text-emerald-400/90 mb-6">
              <li>
                <strong>Washed playsand</strong> (quartz, not coated)—often as half of a <strong>topsoil playsand mix</strong>
              </li>
              <li>
                <strong>50/50 topsoil mix</strong>: organic topsoil plus washed playsand, blended and managed dry in the warm zone
              </li>
            </ul>
            <h3 className="text-base font-bold text-white mb-2">Avoid</h3>
            <ul className="space-y-2 text-slate-300 text-sm sm:text-base list-disc list-inside marker:text-red-400/90 mb-4">
              <li>Calcium sand</li>
              <li>Dyed sand</li>
              <li>Walnut shell</li>
              <li>Anything sold as “digestible” sand</li>
            </ul>
            <p className="text-slate-300 mb-0">
              For a full substrate overview, use our{" "}
              <Link href="/guides/leopard-gecko-substrate" className="text-emerald-400 hover:text-emerald-300">
                Leopard Gecko Substrate Guide
              </Link>
              .
            </p>
          </GuideSection>

          <GuideSection Icon={CheckCircle2} iconColor="#a78bfa" title="When Sand Is Appropriate vs Not">
            <p className="text-slate-300 mb-4">
              Most beginners should not start with loose substrate.
            </p>
            <p className="text-slate-300 mb-0">
              Loose sand or a topsoil playsand mix fits keepers who already run a <strong>thermostat</strong>, offer <strong>three hides</strong>, and can spot early signs of illness. It is a poor first choice for <strong>quarantine</strong>, <strong>babies under heavy stress</strong>, or any setup still missing reliable warm-floor or overhead heat. If you are troubleshooting weight loss or abnormal stools, switch to solid substrate until a vet rules out parasites and other causes.
            </p>
          </GuideSection>

          <GuideSection Icon={CheckCircle2} iconColor="#34d399" title="Beginner Recommendation">
            <p className="text-slate-300 mb-4">
              <strong>Start with solid substrate</strong>—paper towel or slate tile—until heating and hides are boringly consistent. <strong>Upgrade later</strong> to a safe leopard gecko sand substrate or topsoil playsand mix only once setup is stable and you can monitor health and stools. That order reduces variables and matches how most experienced keepers teach the hobby.
            </p>
            <p className="text-slate-300 mb-0">
              For common hardware and substrate errors in one place, see our{" "}
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
              BuildMyHabitat removes unsafe substrate options like calcium sand and automatically pairs safe substrate with correct heating and hides—so you don’t risk impaction from mismatched setup decisions.
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
