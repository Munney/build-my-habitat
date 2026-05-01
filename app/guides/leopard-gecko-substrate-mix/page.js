"use client";

import React from "react";
import Link from "next/link";
import {
  Layers,
  CheckCircle2,
  ShieldAlert,
  Ruler,
  ArrowRight,
  ArrowLeft,
  HelpCircle,
} from "lucide-react";
import Footer from "../../components/Footer";
import { FAQSchema } from "../../components/StructuredData";

export default function LeopardGeckoSubstrateMixPage() {
  const faqs = [
    {
      question: "What is the best leopard gecko substrate mix?",
      answer:
        "A widely used safe mix is roughly half organic topsoil (no fertilizer, no perlite) and half washed playsand. Both parts should be clean and free of fertilizers, pesticides, or extra additives. This leopard gecko substrate mix supports light burrows and a natural look while avoiding calcium sand and other risky “reptile sands.”",
    },
    {
      question: "How deep should a topsoil and playsand mix be?",
      answer:
        "For a simple naturalistic setup, about 2–4 inches of topsoil and playsand mix is typical. Deeper layers are mainly for bioactive setups and need a plan for moisture and cleaning. Very thin layers dry out quickly and add little benefit.",
    },
    {
      question: "Should beginners use a loose substrate mix?",
      answer:
        "Many keepers start on paper towel or slate tile while they lock in heating, three hides, and feeding. A loose topsoil and playsand mix is easier to manage once those basics are stable. That order reduces variables while you learn.",
    },
    {
      question: "Does loose substrate always cause impaction in leopard geckos?",
      answer:
        "No. Impaction is not caused by one material alone. Dehydration, illness, wrong temperatures, parasites, or swallowing unsafe substrate (like calcium sand) are common factors. A safe topsoil and playsand mix with correct husbandry is used successfully by many keepers—fix health and diet before blaming substrate only.",
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
              Leopard Gecko Substrate Mix Guide
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-6">
              The safest 50/50 topsoil and playsand mix for leopard geckos, correct substrate depth, and when solid substrate is the better choice for beginners.
            </p>
            <Link
              href="/build/leopard-gecko"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-full transition-all"
            >
              Build a Leopard Gecko Habitat <ArrowRight size={20} />
            </Link>
          </div>

          <GuideSection Icon={Layers} iconColor="#34d399" title="What Makes a Safe Leopard Gecko Substrate Mix">
            <p className="text-slate-300 mb-4">
              Choose materials that are <strong>free of fertilizers, pesticides, or additives</strong>—and not sold as “digestible” or calcium-coated sand. Organic topsoil should not contain perlite or unknown fillers. Playsand should be washed quartz sand: not calcium sand, not dyed craft sand, and not coarse construction blends with mystery ingredients. You want steady, fine-to-medium grains that move through a healthy gecko when temperatures, hydration, and diet are right.
            </p>
          </GuideSection>

          <GuideSection Icon={CheckCircle2} iconColor="#22d3ee" title="Recommended Mix: 50/50 Topsoil and Playsand">
            <p className="text-slate-300 mb-4">
              Blend roughly equal parts <strong>organic topsoil</strong> and <strong>washed playsand</strong>. Screen or rinse off dust if needed. This topsoil and playsand mix drains better than sand alone, supports light digging, and fits naturalistic leopard gecko setups when heat and hides are correct. This mix is widely used because it balances safety, drainage, and natural digging behavior.
            </p>
            <p className="text-slate-300 mb-0">
              For solid vs loose options and what counts as leopard gecko substrate safe, see our{" "}
              <Link href="/guides/leopard-gecko-substrate" className="text-emerald-400 hover:text-emerald-300">
                Leopard Gecko Substrate Guide
              </Link>
              .
            </p>
          </GuideSection>

          <div className="mb-8 p-6 sm:p-8 rounded-3xl border-2 border-emerald-500/35 bg-emerald-500/[0.07] shadow-lg">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <CheckCircle2 className="text-emerald-400 shrink-0" size={24} />
              Quick Recommendation
            </h2>
            <div className="grid sm:grid-cols-2 gap-6 text-slate-300 text-sm sm:text-base leading-relaxed">
              <div>
                <p className="font-semibold text-white mb-2">If you want the safest beginner setup</p>
                <ul className="space-y-2 list-disc list-inside marker:text-emerald-500">
                  <li>Use paper towel or slate tile</li>
                  <li>Focus on heating, hides, and feeding first</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-white mb-2">If you want a natural setup</p>
                <ul className="space-y-2 list-disc list-inside marker:text-emerald-500">
                  <li>Use a 50/50 topsoil + playsand mix</li>
                  <li>Maintain proper temperatures and hydration</li>
                </ul>
              </div>
            </div>
          </div>

          <GuideSection Icon={ShieldAlert} iconColor="#f87171" title="Leopard Gecko Substrate and Impaction: Why It’s Misunderstood">
            <p className="text-slate-300 mb-4">
              <strong>Impaction is not caused by one material alone.</strong> Dehydration, parasites, low warm-side temperatures, stress, and eating the wrong substrate (especially calcium sand) all raise risk. Leopard geckos are crepuscular and do not need UVB the way many day-active lizards do, but overall health, water intake, and correct belly heat still matter for digestion. Blaming “all loose substrate” misses cases where husbandry—not particle type—was the real problem.
            </p>
          </GuideSection>

          <GuideSection Icon={Ruler} iconColor="#a78bfa" title="How Deep Should Leopard Gecko Substrate Mix Be?">
            <p className="text-slate-300 mb-4">
              For a typical tank with overhead heating and dry air, <strong>2–4 inches</strong> of your topsoil and playsand mix is enough for light burrowing and straightforward spot cleaning. Deeper layers are mainly for bioactive plans (drainage, cleanup crew, moisture control). Very shallow layers dry unevenly. Too much dry substrate without planning can trap waste under decor.
            </p>
          </GuideSection>

          <GuideSection Icon={CheckCircle2} iconColor="#34d399" title="When Solid Substrate Is Better for Beginners">
            <p className="text-slate-300 mb-4">
              Use <strong>paper towel</strong> or <strong>slate tile</strong> for quarantine, new animals, health troubleshooting, or your first months as a keeper. Solid substrate removes ingestion variables, simplifies cleaning, and lets you focus on thermostat-controlled heat, three hides, and diet. You can move to a 50/50 topsoil and playsand mix later without changing the rest of your standards. Enclosure layout and heating follow the same rules—see our{" "}
              <Link href="/guides/leopard-gecko-setup" className="text-emerald-400 hover:text-emerald-300">
                Leopard Gecko Setup Guide
              </Link>{" "}
              for tank size, hides, and heat placement.
            </p>
            <p className="text-slate-300 mb-0">
              Most beginners should start with solid substrate, then switch to a natural mix once they are comfortable.
            </p>
          </GuideSection>

          <GuideSection Icon={ShieldAlert} iconColor="#f87171" title="Common Leopard Gecko Substrate Mistakes">
            <p className="text-slate-300 mb-3">
              Avoid these common substrate mistakes:
            </p>
            <ul className="space-y-2 text-slate-300 text-sm sm:text-base list-disc list-inside marker:text-red-400/90">
              <li>
                <strong>Calcium sand</strong> — often eaten on purpose; high impaction risk.
              </li>
              <li>
                <strong>Reptile carpet</strong> — snags toes and traps bacteria.
              </li>
              <li>
                <strong>Walnut shell</strong> — sharp and unsafe to swallow.
              </li>
              <li>
                <strong>Wood chips or aromatic woods</strong> — wrong for leopard geckos.
              </li>
            </ul>
            <p className="text-slate-300 mt-4 mb-0">
              If you use a loose natural floor, stick to clean topsoil and playsand, keep heating on a thermostat, and provide a proper warm hide.
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
              <Link href="/guides/leopard-gecko-setup" className="text-emerald-400 hover:text-emerald-300">
                Leopard Gecko Setup Guide
              </Link>
            </p>
          </div>

          <div className="mt-16 text-center p-8 rounded-3xl bg-emerald-500/10 border border-emerald-500/30">
            <h2 className="text-2xl font-black text-white mb-4">Substrate choices that skip the guesswork</h2>
            <p className="text-slate-300 max-w-xl mx-auto mb-6">
              BuildMyHabitat automatically selects safe substrate, heating, and enclosure combinations—so you don’t have to second-guess compatibility or risk common setup mistakes.
            </p>
            <Link
              href="/build/leopard-gecko"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-full transition-all"
            >
              Build a Leopard Gecko Habitat <ArrowRight size={20} />
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
          href="/build/leopard-gecko"
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
