"use client";

import React from "react";
import Link from "next/link";
import {
  UtensilsCrossed,
  Droplets,
  ArrowRight,
  ArrowLeft,
  ShieldAlert,
  CheckCircle2,
  HelpCircle,
} from "lucide-react";
import Footer from "../../components/Footer";
import { FAQSchema } from "../../components/StructuredData";

export default function BeardedDragonFeedingPage() {
  const faqs = [
    {
      question: "How often should I feed a baby bearded dragon?",
      answer: "Baby bearded dragons (0–4 months) should be fed insects 2–3 times per day, as many appropriately sized insects as they will eat in 10–15 minutes. Offer fresh greens daily. Dust insects with calcium at most feedings and with a multivitamin 1–2 times per week.",
    },
    {
      question: "How often should I feed an adult bearded dragon?",
      answer: "Adult bearded dragons (18+ months) should get fresh greens daily. Insects can be offered 2–4 times per week, depending on body condition. Dust insects with calcium (with or without D3 per your UVB setup) and multivitamin weekly. Avoid overfeeding insects to prevent obesity.",
    },
    {
      question: "Can bearded dragons eat fruit?",
      answer: "Fruit is high in sugar and should be offered rarely, if at all. Stick to staple greens and occasional vegetables (e.g. squash, bell pepper) for plant matter. Focus on leafy greens as the main vegetable component.",
    },
    {
      question: "Why are dried insects not recommended for bearded dragons?",
      answer: "Dried insects are low in moisture and nutrients compared to live or properly gut-loaded insects. Bearded dragons need the hydration and nutrition from live prey. Dried insects also do not stimulate natural hunting behavior and can contribute to impaction risk if overfed.",
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
              Bearded Dragon Feeding Guide
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-6">
              Staple insects and greens, supplementation, and age-based schedules so your dragon gets the right balance from day one.
            </p>
            <Link href="/build/bearded-dragon" className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-full transition-all">
              Build a Bearded Dragon Habitat <ArrowRight size={20} />
            </Link>
          </div>

          <GuideSection Icon={UtensilsCrossed} iconColor="#34d399" title="Bearded Dragons Are Omnivores">
            <p className="text-slate-300 mb-4">
              Bearded dragons need both <strong>insects</strong> and <strong>leafy greens and vegetables</strong>. The ratio shifts with age: babies eat more insects; adults should get most of their calories from greens, with insects several times a week. For full husbandry context, see our <Link href="/guides/bearded-dragon-care" className="text-emerald-400 hover:text-emerald-300">Bearded Dragon Care Guide</Link>.
            </p>
          </GuideSection>

          <GuideSection Icon={UtensilsCrossed} iconColor="#22d3ee" title="Staple and Occasional Insects">
            <p className="text-slate-300 mb-4">
              Keep prey no larger than the space between the dragon’s eyes to reduce choking and impaction. <strong>Staples:</strong> dubia roaches, crickets, black soldier fly larvae (BSFL). <strong>Occasional:</strong> silkworms, hornworms (moderation), mealworms (sparingly for adults). Waxworms and butterworms are high-fat treats only. Dried insects are not recommended—they lack moisture and full nutrition; use live or freshly killed, gut-loaded insects.
            </p>
          </GuideSection>

          <GuideSection Icon={UtensilsCrossed} iconColor="#a78bfa" title="Staple Greens and Occasional Vegetables">
            <p className="text-slate-300 mb-4">
              Leafy greens form the base of the plant side. Rotate staples: collard, mustard, dandelion, turnip greens, escarole, endive. Add variety with butternut squash, acorn squash, bell pepper, zucchini. Use spinach and kale sparingly (oxalates/goitrogens); avoid iceberg. Fruit is high in sugar—offer rarely, if at all.
            </p>
          </GuideSection>

          <GuideSection Icon={UtensilsCrossed} iconColor="#fb923c" title="Baby Bearded Dragon Feeding">
            <p className="text-slate-300 mb-4">
              Babies (0–4 months) need more protein and frequent meals. Offer insects 2–3 times per day, as many appropriately sized prey as they will eat in 10–15 minutes per session. Offer fresh greens daily even if they ignore them at first. Dust insects with calcium at almost every feeding; use calcium with D3 if you lack strong T5 UVB, or calcium without D3 if you have proper UVB. Multivitamin 1–2 times per week on insects. See our <Link href="/guides/bearded-dragon-lighting-uvb" className="text-emerald-400 hover:text-emerald-300">Lighting & UVB Guide</Link> for D3 and basking.
            </p>
          </GuideSection>

          <GuideSection Icon={UtensilsCrossed} iconColor="#eab308" title="Juvenile and Adult Feeding">
            <p className="text-slate-300 mb-4">
              Juveniles (4–18 months): insects once or twice daily (10–15 min per session), greens daily as the main offering; calcium on most insect feedings, multivitamin weekly. Adults (18+ months): fresh salad daily with variety; insects 2–4 times per week depending on body condition—a few dozen per week is often enough. Dust insects with calcium when offered; multivitamin once a week on one insect meal. Cap insect intake to avoid obesity.
            </p>
          </GuideSection>

          <GuideSection Icon={Droplets} iconColor="#22d3ee" title="Hydration and Supplements">
            <p className="text-slate-300 mb-4">
              Bearded dragons get much of their water from fresh, moist greens and well-hydrated insects. A shallow water bowl is still recommended; misting greens or offering water on a spoon can encourage drinking. For supplementation: with strong T5 UVB (10.0 or 12%), use <strong>calcium without D3</strong> on insects; without proper UVB, use <strong>calcium with D3</strong>. Multivitamin about once a week on one insect feeding. Do not double-dose D3 if your multivitamin already contains it.
            </p>
          </GuideSection>

          <GuideSection Icon={ShieldAlert} iconColor="#f87171" title="Foods to Avoid and Feeding Mistakes">
            <p className="text-slate-300 mb-4">
              Avoid: fireflies (toxic), wild-caught insects (pesticides/parasites), avocado, rhubarb; no dog/cat food or dairy. Do not feed insects larger than the space between the eyes; do not skip greens for adults (obesity and deficiency risks); do not rely on dried insects; avoid overfeeding fatty insects or fruit.
            </p>
          </GuideSection>

          <div className="my-12 p-6 rounded-2xl bg-slate-800/80 border border-slate-700">
            <h2 className="text-lg font-bold text-white mb-3">Deep-Dive Guides</h2>
            <p className="text-slate-400 text-sm mb-0">Diet ties into basking and UVB for D3. See our <Link href="/guides/bearded-dragon-care" className="text-emerald-400 hover:text-emerald-300">Care Guide</Link>, <Link href="/guides/bearded-dragon-lighting-uvb" className="text-emerald-400 hover:text-emerald-300">Lighting & UVB</Link>, and <Link href="/guides/bearded-dragon-tank-setup" className="text-emerald-400 hover:text-emerald-300">Tank Setup</Link> for full context.
            </p>
          </div>

          <div className="mt-16 text-center p-8 rounded-3xl bg-emerald-500/10 border border-emerald-500/30">
            <h2 className="text-2xl font-black text-white mb-4">A habitat that supports proper feeding and basking</h2>
            <p className="text-slate-300 max-w-xl mx-auto mb-6">
              BuildMyHabitat’s builder includes bowls, basking zones, and equipment sized to your enclosure—so your setup supports a healthy diet and thermoregulation from day one.
            </p>
            <Link href="/build/bearded-dragon" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-full transition-all">
              Build a Bearded Dragon Habitat <ArrowRight size={20} />
            </Link>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <FAQItem key={i} question={faq.question} answer={faq.answer} />
              ))}
            </div>
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
