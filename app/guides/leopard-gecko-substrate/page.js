"use client";

import React from "react";
import Link from "next/link";
import { 
  Droplets, 
  AlertTriangle,
  CheckCircle2,
  ArrowRight, 
  ArrowLeft,
  HelpCircle,
  ShieldAlert,
  Box,
  Home
} from "lucide-react";
import Footer from "../../components/Footer";
import { FAQSchema } from "../../components/StructuredData";

export default function GeckoSubstratePage() {
  const faqs = [
    {
      question: "What substrate is safe for leopard geckos?",
      answer: "Safe substrates include: 1) Paper towels (best for beginners), 2) Slate tile or textured reptile carpet, 3) A 70/30 mix of organic topsoil and playsand (for experienced keepers). These substrates are easy to clean, don't cause impaction, and are safe for leopard geckos."
    },
    {
      question: "Is calcium sand safe for leopard geckos?",
      answer: "No, calcium sand is NOT safe for leopard geckos. It's a major impaction risk because geckos are attracted to the calcium and may ingest it, causing deadly blockages. Calcium sand also clumps when wet, creating hard masses that can cause impaction. Avoid calcium sand completely."
    },
    {
      question: "Can leopard geckos use wood chips as substrate?",
      answer: "No, wood chips are dangerous for leopard geckos. They can cause impaction if ingested, may contain harmful chemicals or oils, and can harbor bacteria and mold. Wood chips are also difficult to clean and maintain. Use safe alternatives like paper towels, tile, or topsoil/sand mix."
    },
    {
      question: "What is the best substrate for beginner leopard gecko keepers?",
      answer: "Paper towels are the best substrate for beginners. They're 100% safe (no impaction risk), easy to clean and replace, inexpensive, and allow you to monitor your gecko's health (easy to see droppings). Once you're experienced, you can consider a 70/30 topsoil/sand mix for natural digging behavior."
    },
    {
      question: "Can leopard geckos use sand as substrate?",
      answer: "Pure sand is not recommended for leopard geckos, but a 70/30 mix of organic topsoil and playsand is safe for experienced keepers. The topsoil helps prevent the sand from being too loose and reduces impaction risk. Never use pure sand, calcium sand, or colored sand."
    },
    {
      question: "What causes impaction in leopard geckos?",
      answer: "Impaction is caused by ingesting substrate that cannot be digested, creating a blockage in the digestive tract. Common causes: calcium sand (geckos are attracted to it), loose substrates that stick to food, or substrates that clump when wet. Signs include no eating, no defecation, and lethargy. Requires immediate veterinary care."
    },
    {
      question: "How do I set up substrate for a leopard gecko?",
      answer: "For beginners: Use paper towels, replace weekly or when soiled. For experienced keepers: Use a 70/30 mix of organic topsoil and playsand, 2-3 inches deep, spot clean daily, replace every 3-6 months. Always ensure substrate is clean, dry, and free of sharp objects or chemicals."
    },
    {
      question: "Can I use reptile carpet for leopard geckos?",
      answer: "Yes, textured reptile carpet is safe for leopard geckos. It's easy to clean, doesn't cause impaction, and provides good traction. However, it needs regular cleaning to prevent bacteria buildup, and claws can sometimes get caught. Paper towels or tile are often easier alternatives."
    }
  ];

  return (
    <>
      <FAQSchema faqs={faqs} />
      <main className="min-h-screen pt-28 pb-20 px-6 relative z-10">
        
        <div className="max-w-4xl mx-auto mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-medium text-base group">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back to Hub
          </Link>
        </div>

        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-6">
            Complete Guide
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 drop-shadow-lg leading-tight">
            Leopard Gecko Substrate Guide 2025
          </h1>
          <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Learn which substrates are safe for leopard geckos and which are dangerous. Complete guide to choosing the right substrate to prevent impaction.
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-red-500/10 border-2 border-red-500/30 p-6 rounded-2xl flex items-start gap-4">
            <ShieldAlert size={32} className="text-red-400 shrink-0" />
            <div>
              <h2 className="text-2xl font-bold text-red-400 mb-3">⚠️ Dangerous Substrates to Avoid</h2>
              <p className="text-red-200 leading-relaxed">
                <strong>Calcium sand, wood chips, and pure sand</strong> are dangerous and can cause deadly impaction. These substrates are major health risks and should never be used for leopard geckos.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          
          <GuideSection Icon={CheckCircle2} iconColor="#34d399" title="1. Safe Substrates for Leopard Geckos">
            <p className="text-slate-300 mb-4">
              These substrates are safe and recommended for leopard geckos. Choose based on your experience level and preferences.
            </p>
            <ul className="space-y-3">
              <GuidePoint>
                <strong>Paper Towels (Best for Beginners):</strong> 100% safe, easy to clean, inexpensive, and allows you to monitor your gecko's health. Replace weekly or when soiled. No impaction risk.
              </GuidePoint>
              <GuidePoint>
                <strong>Slate Tile:</strong> Natural, easy to clean, provides good traction, and maintains heat well. No impaction risk. Can be textured for better grip.
              </GuidePoint>
              <GuidePoint>
                <strong>Textured Reptile Carpet:</strong> Safe, easy to clean, provides good traction. Needs regular cleaning to prevent bacteria. Claws can sometimes get caught.
              </GuidePoint>
              <GuidePoint>
                <strong>70/30 Topsoil/Sand Mix (Experienced Keepers):</strong> A mix of 70% organic topsoil and 30% playsand is safe for experienced keepers. Allows natural digging behavior. Must be properly prepared and maintained.
              </GuidePoint>
            </ul>
          </GuideSection>

          <GuideSection Icon={AlertTriangle} iconColor="#f87171" title="2. Dangerous Substrates to Avoid">
            <p className="text-slate-300 mb-4">
              These substrates are <strong className="text-red-400">dangerous and can cause impaction, illness, or death</strong>. Never use these for leopard geckos.
            </p>
            <ul className="space-y-3">
              <GuidePoint alert>
                <strong>Calcium Sand (CRITICAL DANGER):</strong> Geckos are attracted to the calcium and will ingest it, causing deadly impaction. Also clumps when wet, creating hard masses. This is one of the most dangerous substrates.
              </GuidePoint>
              <GuidePoint alert>
                <strong>Wood Chips/Bark:</strong> Can cause impaction if ingested, may contain harmful chemicals or oils, and can harbor bacteria and mold. Difficult to clean and maintain.
              </GuidePoint>
              <GuidePoint alert>
                <strong>Pure Sand:</strong> Too loose and can cause impaction. Sand can stick to food and be ingested accidentally. Only safe when mixed with topsoil (70/30 mix).
              </GuidePoint>
              <GuidePoint alert>
                <strong>Colored Sand:</strong> Contains dyes and chemicals that can be harmful. Also has the same impaction risks as regular sand.
              </GuidePoint>
              <GuidePoint alert>
                <strong>Walnut Shells:</strong> Sharp edges can cause injuries, and ingestion causes impaction. Also can harbor bacteria.
              </GuidePoint>
            </ul>
          </GuideSection>

          <GuideSection Icon={Box} iconColor="#fb923c" title="3. Understanding Impaction Risk">
            <p className="text-slate-300 mb-4">
              Impaction is a deadly condition where substrate blocks the digestive tract. Understanding the risks helps you choose safe substrates.
            </p>
            <ul className="space-y-3">
              <GuidePoint>
                <strong>What is Impaction?</strong> Impaction occurs when substrate is ingested and cannot be digested, creating a blockage in the digestive tract. This prevents food from passing and can be fatal.
              </GuidePoint>
              <GuidePoint alert>
                <strong>Signs of Impaction:</strong> No eating, no defecation, lethargy, bloating, difficulty moving, and loss of appetite. Requires immediate veterinary care.
              </GuidePoint>
              <GuidePoint>
                <strong>Why Some Substrates Are Dangerous:</strong> Loose substrates (sand) can stick to food, clumping substrates (calcium sand) form hard masses, and attractive substrates (calcium sand) encourage ingestion.
              </GuidePoint>
              <GuidePoint>
                <strong>Prevention:</strong> Use safe substrates (paper towels, tile), ensure proper temperatures (88-92°F warm side) for digestion, and feed in a dish or on a platform to reduce substrate ingestion.
              </GuidePoint>
            </ul>
          </GuideSection>

          <GuideSection Icon={Home} iconColor="#a78bfa" title="4. Substrate Setup and Maintenance">
            <p className="text-slate-300 mb-4">
              Proper substrate setup and maintenance are crucial for your gecko's health. Follow these guidelines based on your chosen substrate.
            </p>
            <ul className="space-y-3">
              <GuidePoint>
                <strong>Paper Towels:</strong> Lay flat on tank bottom, replace weekly or when soiled, easy to spot clean. Best for monitoring health and beginners.
              </GuidePoint>
              <GuidePoint>
                <strong>Tile:</strong> Cut to fit tank, can be textured for grip, easy to clean with reptile-safe cleaner, maintains heat well.
              </GuidePoint>
              <GuidePoint>
                <strong>Reptile Carpet:</strong> Cut to fit, clean weekly with reptile-safe cleaner, replace when worn or soiled. Check for loose threads that could catch claws.
              </GuidePoint>
              <GuidePoint>
                <strong>70/30 Topsoil/Sand Mix:</strong> 2-3 inches deep, spot clean daily, replace every 3-6 months, ensure it's dry and free of chemicals. Only for experienced keepers.
              </GuidePoint>
              <GuidePoint>
                <strong>Feeding Considerations:</strong> Feed in a dish or on a platform to reduce substrate ingestion. This is especially important with loose substrates.
              </GuidePoint>
            </ul>
          </GuideSection>

          <GuideSection Icon={CheckCircle2} iconColor="#22d3ee" title="5. Choosing the Right Substrate for You">
            <p className="text-slate-300 mb-4">
              The best substrate depends on your experience level and preferences. Here's how to choose:
            </p>
            <ul className="space-y-3">
              <GuidePoint>
                <strong>For Beginners:</strong> Start with paper towels. They're 100% safe, easy to maintain, and allow you to learn proper care without substrate concerns.
              </GuidePoint>
              <GuidePoint>
                <strong>For Natural Look:</strong> Use slate tile or textured reptile carpet. They look natural, are easy to clean, and are completely safe.
              </GuidePoint>
              <GuidePoint>
                <strong>For Natural Behavior:</strong> Once experienced, consider a 70/30 topsoil/sand mix. This allows natural digging behavior but requires proper maintenance.
              </GuidePoint>
              <GuidePoint>
                <strong>For Easy Maintenance:</strong> Paper towels or tile are easiest to maintain. They're simple to clean and replace, making maintenance quick and easy.
              </GuidePoint>
              <GuidePoint alert>
                <strong>Never Compromise Safety:</strong> No matter your preference, never use dangerous substrates like calcium sand or wood chips. Safety always comes first.
              </GuidePoint>
            </ul>
          </GuideSection>

        </div>

        <div className="max-w-4xl mx-auto mt-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-slate-400 text-lg">Common questions about leopard gecko substrate</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto mt-20 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Related Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/build/leopard-gecko" className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 hover:border-emerald-500/40 transition-all text-center">
              <h3 className="text-sm font-bold text-white mb-1">Interactive Builder</h3>
              <p className="text-xs text-slate-400">Build your setup</p>
            </Link>
            <Link href="/guides/leopard-gecko-setup" className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 hover:border-emerald-500/40 transition-all text-center">
              <h3 className="text-sm font-bold text-white mb-1">Complete Setup Guide</h3>
              <p className="text-xs text-slate-400">Full guide</p>
            </Link>
            <Link href="/common-mistakes" className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 hover:border-emerald-500/40 transition-all text-center">
              <h3 className="text-sm font-bold text-white mb-1">Common Mistakes</h3>
              <p className="text-xs text-slate-400">Avoid dangers</p>
            </Link>
          </div>
        </div>

        <div className="max-w-4xl mx-auto text-center mt-12">
          <h2 className="text-3xl font-black text-white mb-6">Ready to Build Your Gecko Setup?</h2>
          <p className="text-slate-300 leading-relaxed max-w-2xl mx-auto mb-10">
            Use our interactive builder to create a complete leopard gecko setup with safe substrate and all essential equipment.
          </p>
          <Link href="/build/leopard-gecko" className="inline-flex items-center justify-center gap-2 px-8 py-4 md:px-10 md:py-5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-full transition-all hover:scale-105 shadow-xl shadow-emerald-900/30 text-sm md:text-lg whitespace-nowrap">
            Launch Gecko Builder <ArrowRight size={20} className="shrink-0 md:w-6 md:h-6" />
          </Link>
        </div>

      </main>
      <Footer variant="minimal" />
    </>
  );
}

function GuideSection({ Icon, iconColor, title, children }) {
  return (
    <section className="bg-slate-800 p-8 rounded-3xl border border-slate-700 shadow-lg">
      <div className="flex items-center gap-4 mb-6 border-b border-slate-700 pb-4">
        <div className="p-3 bg-slate-900/50 rounded-2xl border border-slate-700 shadow-inner">
          <Icon size={32} style={{ color: iconColor }} />
        </div>
        <h2 className="text-2xl font-bold text-white">{title}</h2>
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
    <div className="bg-slate-900/50 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-900/30 transition-colors" aria-expanded={isOpen}>
        <h3 className="text-lg font-bold text-white pr-4">{question}</h3>
        <HelpCircle size={20} className={`text-emerald-400 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && <div className="px-6 pb-4"><p className="text-slate-300 leading-relaxed">{answer}</p></div>}
    </div>
  );
}

