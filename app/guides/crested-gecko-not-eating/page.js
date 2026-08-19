"use client";

import React from "react";
import Link from "next/link";
import {
  Thermometer,
  Home,
  ShieldAlert,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  HelpCircle,
  Zap,
} from "lucide-react";
import Footer from "../../components/Footer";
import { FAQSchema } from "../../components/StructuredData";

export default function CrestedGeckoNotEatingPage() {
  const faqs = [
    {
      question: "Why is my crested gecko not eating?",
      answer:
        "The most common causes in order: 1) Temperature too high (causes stress and appetite loss), 2) Shedding (geckos often refuse food before and during shed), 3) Fermented or stale CGD (replace every 24-48 hours), 4) New environment adjustment, 5) Illness. Check temperature first.",
    },
    {
      question: "How long can a crested gecko go without eating?",
      answer:
        "Healthy adult crested geckos can fast for several weeks without serious harm, especially during cooler months or before shedding. However, prolonged fasting combined with weight loss, lethargy, or other symptoms warrants veterinary attention.",
    },
    {
      question: "Does shedding cause crested geckos to stop eating?",
      answer:
        "Yes. Crested geckos commonly refuse food 1-2 days before shedding and may not eat during the shed cycle. This is normal. Appetite should return within a few days after shedding is complete.",
    },
    {
      question: "Can bad CGD cause my crested gecko to stop eating?",
      answer:
        "Yes. CGD ferments within 24-48 hours and becomes unpalatable. Geckos will refuse fermented food even when hungry. Always replace CGD with fresh mix and clean the feeding dish regularly.",
    },
    {
      question: "What tricks can stimulate a crested gecko's appetite?",
      answer:
        "Try a different CGD flavor, offer live insects (dubia roaches or crickets), ensure temperatures are in the 72-78°F range, feed at night when geckos are active, and minimize handling to reduce stress. If appetite does not return after 2-3 weeks, consult a reptile veterinarian.",
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
              Crested Gecko Not Eating?
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-6">
              The most common causes of appetite loss in crested geckos and step-by-step fixes to get your gecko eating again.
            </p>
            <Link href="/build/crested-gecko" className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-full transition-all">
              Build a Crested Gecko Habitat <ArrowRight size={20} />
            </Link>
          </div>

          <div className="mb-8 p-6 sm:p-8 rounded-3xl border-2 border-purple-500/35 bg-purple-500/[0.07] shadow-lg">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Zap className="text-purple-400 shrink-0" size={24} />
              Quick Answer
            </h2>
            <ul className="space-y-2.5 text-slate-300 text-sm sm:text-base">
              <li><strong>Temperature too high</strong> is the #1 cause of appetite loss</li>
              <li><strong>Shedding</strong> is #2 — geckos often refuse food before and during shed</li>
              <li><strong>Fermented CGD</strong> is #3 — replace every 24-48 hours</li>
              <li>Healthy adults can <strong>fast for weeks</strong> without serious harm</li>
            </ul>
          </div>

          <GuideSection Icon={Thermometer} iconColor="#fb923c" title="Check Temperature First">
            <p className="text-slate-300 mb-4">
              Temperature is the #1 cause of appetite loss in crested geckos. Unlike species that stop eating when too cold, crested geckos stop eating when too hot. Heat stress suppresses appetite and can be fatal if not corrected.
            </p>
            <ul className="space-y-3 mb-0">
              <GuidePoint accent="purple">Verify ambient temperature is 72-78°F — use a digital thermometer</GuidePoint>
              <GuidePoint alert>Temperatures above 85°F cause appetite loss and heat stress</GuidePoint>
              <GuidePoint alert>Check if the enclosure is in direct sunlight or a hot room</GuidePoint>
              <GuidePoint accent="purple">Cool the enclosure immediately if temperatures exceed 82°F</GuidePoint>
              <GuidePoint accent="purple">Fix temperature before trying any other appetite-stimulation tricks</GuidePoint>
            </ul>
          </GuideSection>

          <GuideSection Icon={CheckCircle2} iconColor="#22d3ee" title="Normal Reasons for Not Eating">
            <p className="text-slate-300 mb-4">
              Not all appetite loss is cause for concern. Crested geckos naturally reduce feeding in several normal situations.
            </p>
            <ul className="space-y-3 mb-0">
              <GuidePoint accent="purple"><strong>Shedding:</strong> Refuse food 1-2 days before and during shed — completely normal</GuidePoint>
              <GuidePoint accent="purple"><strong>Cooler months:</strong> Reduced metabolism leads to less frequent feeding</GuidePoint>
              <GuidePoint accent="purple"><strong>New environment:</strong> Adjustment period of 1-2 weeks after rehoming is normal</GuidePoint>
              <GuidePoint accent="purple"><strong>Adult fasting:</strong> Healthy adults can go weeks without eating — monitor weight, not just food intake</GuidePoint>
              <GuidePoint accent="purple"><strong>Breeding season:</strong> Males may fast during breeding behavior</GuidePoint>
            </ul>
          </GuideSection>

          <GuideSection Icon={ShieldAlert} iconColor="#f87171" title="CGD Quality and Freshness">
            <p className="text-slate-300 mb-4">
              Fermented CGD is the #3 cause of appetite refusal. CGD breaks down within 24-48 hours at room temperature, developing an off smell and unpalatable taste that geckos will refuse even when hungry.
            </p>
            <ul className="space-y-3 mb-0">
              <GuidePoint accent="purple">Replace CGD every 24-48 hours without exception</GuidePoint>
              <GuidePoint accent="purple">Clean the feeding dish when replacing food — residue accelerates fermentation</GuidePoint>
              <GuidePoint accent="purple">Try a different CGD flavor — geckos can develop preferences or aversions</GuidePoint>
              <GuidePoint alert>Never offer CGD that smells sour or has been sitting for more than 48 hours</GuidePoint>
            </ul>
          </GuideSection>

          <GuideSection Icon={ShieldAlert} iconColor="#e879f9" title="When to Be Concerned">
            <p className="text-slate-300 mb-4">
              Most appetite loss resolves on its own within days to weeks. However, certain combinations of symptoms warrant immediate veterinary attention.
            </p>
            <ul className="space-y-3 mb-0">
              <GuidePoint alert>Weight loss combined with prolonged fasting — weigh weekly to track trends</GuidePoint>
              <GuidePoint alert>Lethargy, weakness, or inability to cling to surfaces</GuidePoint>
              <GuidePoint alert>Visible discharge from mouth or nose</GuidePoint>
              <GuidePoint alert>Rapid weight loss in juveniles — they cannot fast as long as adults</GuidePoint>
              <GuidePoint accent="purple">If no improvement after 2-3 weeks with corrected husbandry, consult a reptile vet</GuidePoint>
            </ul>
          </GuideSection>

          <GuideSection Icon={Home} iconColor="#34d399" title="Tricks to Stimulate Appetite">
            <ul className="space-y-3 mb-0">
              <GuidePoint accent="purple">Offer a different CGD flavor — variety can restart interest</GuidePoint>
              <GuidePoint accent="purple">Try live insects (dubia roaches, crickets) to trigger hunting response</GuidePoint>
              <GuidePoint accent="purple">Feed at night when crested geckos are naturally most active</GuidePoint>
              <GuidePoint accent="purple">Minimize handling and disturbances to reduce stress</GuidePoint>
              <GuidePoint accent="purple">Ensure the enclosure has proper vertical space, hides, and climbing structure</GuidePoint>
            </ul>
          </GuideSection>

          <div className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <FAQItem key={i} question={faq.question} answer={faq.answer} accent="purple" />
              ))}
            </div>
          </div>

          <div className="my-12 p-6 rounded-2xl bg-slate-800/80 border border-slate-700">
            <h2 className="text-lg font-bold text-white mb-3">Related Guides</h2>
            <p className="text-slate-400 text-sm mb-0">
              <Link href="/guides/crested-gecko-setup" className="text-purple-400 hover:text-purple-300">Crested Gecko Setup Guide</Link>
              {" · "}
              <Link href="/guides/crested-gecko-diet-guide" className="text-purple-400 hover:text-purple-300">Crested Gecko Diet Guide</Link>
              {" · "}
              <Link href="/guides/crested-gecko-temperature-guide" className="text-purple-400 hover:text-purple-300">Crested Gecko Temperature Guide</Link>
            </p>
          </div>

          <div className="mt-16 text-center p-8 rounded-3xl bg-purple-500/10 border border-purple-500/30">
            <h2 className="text-2xl font-black text-white mb-4">Get your gecko eating again</h2>
            <p className="text-slate-300 max-w-xl mx-auto mb-6">
              BuildMyHabitat ensures your setup has correct temperatures, fresh feeding tools, and compatible products so appetite problems are prevented from the start.
            </p>
            <Link href="/build/crested-gecko" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-full transition-all">
              Build a Crested Gecko Habitat <ArrowRight size={20} />
            </Link>
          </div>
        </div>
        <div className="max-w-3xl mx-auto mt-16 p-6 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-white font-bold text-lg mb-1">Ready to build your setup?</h3>
            <p className="text-slate-400 text-sm">
              The builder selects compatible, research-verified products and generates your complete shopping list.
            </p>
          </div>
          <Link href="/build/crested-gecko" className="shrink-0 px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-full transition-all whitespace-nowrap">
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

function GuidePoint({ children, alert, accent = "amber" }) {
  const accentClass = accent === "amber" ? "text-amber-400" : "text-purple-400";
  return (
    <li className="flex items-start gap-3 text-slate-300 leading-relaxed">
      <div className="shrink-0 mt-1">
        {alert ? <ShieldAlert size={18} className="text-red-400" /> : <CheckCircle2 size={18} className={accentClass} />}
      </div>
      <div>{children}</div>
    </li>
  );
}

function FAQItem({ question, answer, accent = "amber" }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const accentClass = accent === "amber" ? "text-amber-400" : "text-purple-400";
  return (
    <div className="bg-slate-900/50 rounded-2xl border border-white/10 overflow-hidden">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-900/30" aria-expanded={isOpen}>
        <h3 className="text-lg font-bold text-white pr-4">{question}</h3>
        <HelpCircle size={20} className={`${accentClass} shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && <div className="px-6 pb-4"><p className="text-slate-300 leading-relaxed">{answer}</p></div>}
    </div>
  );
}
