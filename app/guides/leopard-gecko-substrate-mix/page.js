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
      question: "What is the best 50/50 mix for a leopard gecko?",
      answer:
        "A common safe naturalistic mix is roughly 50% organic topsoil (no fertilizer, no perlite) and 50% washed playsand. Both components must be clean and additive-free. This mix holds light burrows and looks natural while avoiding calcium sand and other marketed “reptile sands” that increase risk.",
    },
    {
      question: "How deep should leopard gecko substrate be?",
      answer:
        "For a simple naturalistic setup, about 2–4 inches is typical. Deeper layers are mainly for bioactive or heavy digging goals and need planning for moisture and cleanup. Very thin layers dry out fast and offer little benefit.",
    },
    {
      question: "Should beginners use a substrate mix?",
      answer:
        "Beginners often do best on solid substrate first—paper towel or slate tile—while they dial in heating, three hides, and feeding. Loose mix adds monitoring (humidity pockets, cleaning) and is easier to manage once the basics are stable.",
    },
    {
      question: "Does loose substrate always cause impaction?",
      answer:
        "No. Impaction is often tied to dehydration, illness, incorrect temperatures, or swallowing unsafe materials (e.g. calcium sand), not loose substrate alone. Safe mix plus correct husbandry is widely used; if health or feeding is off, fix that before blaming substrate.",
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
              Safe 50/50 topsoil and playsand mixes, realistic depth, and when solid substrate is the smarter choice.
            </p>
            <Link
              href="/build/leopard-gecko"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-full transition-all"
            >
              Build a Leopard Gecko Habitat <ArrowRight size={20} />
            </Link>
          </div>

          <GuideSection Icon={Layers} iconColor="#34d399" title="What Makes a Safe Substrate Mix">
            <p className="text-slate-300 mb-4">
              A safe mix is <strong>inert</strong>, <strong>additive-free</strong>, and <strong>not designed to be eaten</strong> for calcium. Organic topsoil should have no fertilizers, pesticides, or perlite. Playsand should be washed quartz sand—not calcium sand, not dyed craft sand, and not coarse construction blends with unknown additives. The goal is stable, fine-to-medium particles that pass with normal digestion when the animal is healthy and husbandry is correct.
            </p>
          </GuideSection>

          <GuideSection Icon={CheckCircle2} iconColor="#22d3ee" title="Recommended Mix: 50/50 Topsoil + Playsand">
            <p className="text-slate-300 mb-4">
              Blend roughly equal parts <strong>organic topsoil</strong> and <strong>washed playsand</strong>. Screen or rinse if there is dust or debris. This combination drains better than sand alone, supports light digging, and is a standard choice for naturalistic leopard gecko enclosures when temperatures and hides are correct. For a full comparison of solid vs loose options, see our{" "}
              <Link href="/guides/leopard-gecko-substrate" className="text-emerald-400 hover:text-emerald-300">
                Leopard Gecko Substrate Guide
              </Link>
              .
            </p>
          </GuideSection>

          <GuideSection Icon={ShieldAlert} iconColor="#f87171" title="Why Impaction Is Often Misunderstood">
            <p className="text-slate-300 mb-4">
              Impaction is a <strong>symptom cluster</strong>, not a single-substrate verdict. Dehydration, parasites, low core temperatures, fasting stress, and swallowing the wrong substrate (especially calcium sand) all raise risk. Leopard geckos do not depend on UVB the way many diurnal lizards do, but overall health, hydration, and correct warm-side temperatures still matter for gut motility. Blaming “all loose substrate” ignores cases where husbandry—not particle type—was the driver.
            </p>
          </GuideSection>

          <GuideSection Icon={Ruler} iconColor="#a78bfa" title="How Deep Substrate Should Be">
            <p className="text-slate-300 mb-4">
              For a typical display tank with overhead heating and dry ambient air, <strong>2–4 inches</strong> of mix is enough for light burrowing and easy spot cleaning. Going deeper is mainly for bioactive setups (drainage layer, cleanup crew, moisture management). Very shallow layers look patchy and dry unevenly; excessively deep dry layers without a plan can hide stale pockets under decor.
            </p>
          </GuideSection>

          <GuideSection Icon={CheckCircle2} iconColor="#34d399" title="When Solid Substrate Is Better">
            <p className="text-slate-300 mb-4">
              Use <strong>paper towel</strong> or <strong>slate tile</strong> for quarantine, new acquisitions, troubleshooting health issues, or your first months as a keeper. Solid substrate removes ingestion variables, simplifies hygiene, and lets you focus on thermostat-controlled heat, three hides, and diet. You can move to a 50/50 mix later without changing the rest of your standards. Enclosure layout and heating still follow the same rules—see our{" "}
              <Link href="/guides/leopard-gecko-setup" className="text-emerald-400 hover:text-emerald-300">
                Leopard Gecko Setup Guide
              </Link>{" "}
              for tank size, hides, and heat placement.
            </p>
          </GuideSection>

          <GuideSection Icon={ShieldAlert} iconColor="#f87171" title="Common Mistakes">
            <p className="text-slate-300 mb-0">
              <strong>Calcium sand</strong>—marketed as safe but commonly linked to consumption and impaction. <strong>Reptile carpet</strong>—snags toes and harbors bacteria. <strong>Walnut shell</strong>—sharp and risky. <strong>Wood chips or aromatic woods</strong>—wrong species entirely. If you want a loose natural floor, stick to clean topsoil + playsand and keep heating on a thermostat with a proper warm hide.
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
              BuildMyHabitat’s Leopard Gecko builder pairs safe substrate options with compatible heating, hides, and enclosure size—so your shopping list stays within current husbandry standards.
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
