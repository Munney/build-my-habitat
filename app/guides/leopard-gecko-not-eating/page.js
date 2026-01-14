"use client";

import React from "react";
import Link from "next/link";
import { 
  AlertTriangle,
  CheckCircle2,
  ArrowRight, 
  ArrowLeft,
  HelpCircle,
  ShieldAlert,
  Thermometer,
  Home,
  Droplets,
  Heart
} from "lucide-react";
import Footer from "../../components/Footer";
import { FAQSchema } from "../../components/StructuredData";

export default function GeckoNotEatingPage() {
  const faqs = [
    {
      question: "Why is my leopard gecko not eating?",
      answer: "Common causes include: 1) Incorrect temperature (too cold or too hot), 2) Stress from improper setup or handling, 3) Shedding (geckos often don't eat while shedding), 4) Illness or parasites, 5) Wrong food or feeding schedule, 6) New environment (adjustment period). Check temperature first, then look for signs of stress or illness."
    },
    {
      question: "How long can a leopard gecko go without eating?",
      answer: "Healthy adult leopard geckos can go 1-2 weeks without eating, especially during shedding. However, if your gecko hasn't eaten for more than 2 weeks, or if it's a juvenile (under 6 months), seek veterinary care immediately. Juveniles need to eat more frequently and can't go as long without food."
    },
    {
      question: "What temperature should a leopard gecko tank be for eating?",
      answer: "Leopard geckos need a warm side of 88-92°F (31-33°C) and a cool side of 70-75°F (21-24°C). If temperatures are too low, geckos become lethargic and stop eating because they can't digest food properly. Always check your temperatures first when a gecko stops eating."
    },
    {
      question: "Can stress cause a leopard gecko to stop eating?",
      answer: "Yes, stress is a common cause of appetite loss. Stressors include: improper setup (too small tank, wrong substrate, lack of hides), excessive handling, loud noises, other pets, improper lighting, or recent changes to the environment. Reduce stress by ensuring proper setup and minimizing disturbances."
    },
    {
      question: "Do leopard geckos stop eating when shedding?",
      answer: "Yes, leopard geckos often stop eating 1-3 days before and during shedding. This is normal behavior. They may also become less active and hide more. Once shedding is complete, they should resume eating. If they don't eat for more than a week after shedding, investigate other causes."
    },
    {
      question: "What should I do if my leopard gecko won't eat?",
      answer: "1) Check temperatures (warm side 88-92°F, cool side 70-75°F), 2) Check for signs of shedding, 3) Ensure proper setup (adequate hides, correct substrate, proper lighting), 4) Reduce stress (minimize handling, ensure quiet environment), 5) Try different food items, 6) If no improvement after 1-2 weeks, consult a reptile veterinarian."
    },
    {
      question: "Can illness cause a leopard gecko to stop eating?",
      answer: "Yes, illness is a common cause. Signs include: weight loss, lethargy, unusual behavior, discharge from mouth/nose, difficulty shedding, or visible parasites. If your gecko shows these signs along with not eating, seek veterinary care immediately. Early treatment is crucial."
    },
    {
      question: "How do I get my leopard gecko to start eating again?",
      answer: "1) Fix temperature issues (most common cause), 2) Ensure proper setup with adequate hides and correct substrate, 3) Reduce stress by minimizing handling and ensuring quiet environment, 4) Try different food items (crickets, mealworms, dubia roaches), 5) Offer food at night (geckos are crepuscular), 6) If no improvement, consult a reptile veterinarian."
    }
  ];

  return (
    <>
      <FAQSchema faqs={faqs} />
      <main className="min-h-screen pt-28 pb-20 px-6 relative z-10">
        
        <div className="max-w-4xl mx-auto mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-medium text-sm group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </div>

        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-6">
            Problem-Solving Guide
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 drop-shadow-lg leading-tight">
            Leopard Gecko Not Eating?
          </h1>
          <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Complete guide to why leopard geckos stop eating and how to fix it. Learn about temperature issues, stress, illness, and proper solutions.
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-amber-500/10 border-2 border-amber-500/30 p-6 rounded-2xl flex items-start gap-4">
            <AlertTriangle size={32} className="text-amber-400 shrink-0" />
            <div>
              <h2 className="text-2xl font-bold text-amber-400 mb-3">⚠️ When to Seek Veterinary Care</h2>
              <p className="text-amber-200 leading-relaxed">
                If your gecko hasn't eaten for <strong>more than 2 weeks</strong>, is a <strong>juvenile under 6 months</strong>, shows signs of <strong>illness</strong> (weight loss, lethargy, discharge), or has <strong>visible parasites</strong>, seek veterinary care immediately.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          
          <GuideSection Icon={Thermometer} iconColor="#fb923c" title="1. Temperature Issues (Most Common Cause)">
            <p className="text-slate-300 mb-4">
              <strong className="text-white">Incorrect temperature is the #1 cause</strong> of leopard geckos not eating. Geckos are cold-blooded and need proper heat to digest food.
            </p>
            <ul className="space-y-3">
              <GuidePoint>
                <strong>Required Temperatures:</strong> Warm side 88-92°F (31-33°C), cool side 70-75°F (21-24°C). Use a digital thermometer to verify.
              </GuidePoint>
              <GuidePoint alert>
                <strong>Too Cold:</strong> If temperatures are below 85°F on the warm side, geckos can't digest food and will stop eating. They become lethargic and may hide constantly.
              </GuidePoint>
              <GuidePoint alert>
                <strong>Too Hot:</strong> Temperatures above 95°F can cause heat stress, leading to loss of appetite and dehydration.
              </GuidePoint>
              <GuidePoint>
                <strong>Solution:</strong> Check temperatures with a digital thermometer. Ensure you have proper heating (halogen or DHP) with a thermostat. Fix temperature issues first—this solves most eating problems.
              </GuidePoint>
            </ul>
          </GuideSection>

          <GuideSection Icon={Home} iconColor="#34d399" title="2. Stress and Improper Setup">
            <p className="text-slate-300 mb-4">
              Stress from improper setup is the second most common cause. Leopard geckos need secure, properly set up enclosures to feel safe enough to eat.
            </p>
            <ul className="space-y-3">
              <GuidePoint>
                <strong>Inadequate Hides:</strong> Geckos need at least 3 hides (warm, cool, and moist). Without proper hiding places, they feel exposed and stressed.
              </GuidePoint>
              <GuidePoint>
                <strong>Wrong Substrate:</strong> Dangerous substrates (calcium sand, wood chips) or lack of substrate can cause stress. Use paper towels, tile, or safe loose substrate.
              </GuidePoint>
              <GuidePoint>
                <strong>Too Small Tank:</strong> Tanks smaller than 20 gallons (40 gallons recommended) cause stress and don't allow proper temperature gradients.
              </GuidePoint>
              <GuidePoint>
                <strong>Excessive Handling:</strong> Too much handling, especially in a new environment, causes stress. Minimize handling until the gecko is eating regularly.
              </GuidePoint>
              <GuidePoint>
                <strong>Solution:</strong> Ensure proper setup with adequate hides, correct substrate, proper tank size, and minimal disturbances. Let the gecko settle in.
              </GuidePoint>
            </ul>
          </GuideSection>

          <GuideSection Icon={Droplets} iconColor="#22d3ee" title="3. Shedding (Normal Behavior)">
            <p className="text-slate-300 mb-4">
              Leopard geckos often stop eating 1-3 days before and during shedding. This is <strong className="text-white">normal behavior</strong> and not a cause for concern.
            </p>
            <ul className="space-y-3">
              <GuidePoint>
                <strong>Signs of Shedding:</strong> Dull, grayish skin, increased hiding, reduced activity, and loss of appetite 1-3 days before shedding.
              </GuidePoint>
              <GuidePoint>
                <strong>During Shedding:</strong> Geckos may not eat while actively shedding. This is normal and they should resume eating once shedding is complete.
              </GuidePoint>
              <GuidePoint>
                <strong>Moist Hide Essential:</strong> Ensure your gecko has a moist hide with damp moss or paper towels. This helps with shedding and prevents stuck shed.
              </GuidePoint>
              <GuidePoint>
                <strong>When to Worry:</strong> If your gecko doesn't resume eating within a week after shedding, or if shedding takes longer than 2-3 days, investigate other causes.
              </GuidePoint>
            </ul>
          </GuideSection>

          <GuideSection Icon={Heart} iconColor="#f87171" title="4. Illness and Health Issues">
            <p className="text-slate-300 mb-4">
              Illness can cause loss of appetite. It's important to recognize signs of illness and seek veterinary care when needed.
            </p>
            <ul className="space-y-3">
              <GuidePoint alert>
                <strong>Signs of Illness:</strong> Weight loss, lethargy, unusual behavior, discharge from mouth/nose, difficulty shedding, visible parasites, or abnormal stool.
              </GuidePoint>
              <GuidePoint alert>
                <strong>Parasites:</strong> Internal parasites can cause loss of appetite, weight loss, and lethargy. A fecal exam by a veterinarian can diagnose this.
              </GuidePoint>
              <GuidePoint alert>
                <strong>Metabolic Bone Disease (MBD):</strong> Caused by lack of proper UVB or calcium supplementation. Signs include weakness, difficulty moving, and loss of appetite.
              </GuidePoint>
              <GuidePoint alert>
                <strong>Impaction:</strong> Blockage from ingesting substrate or large food items. Signs include no eating, no defecation, and lethargy. Requires immediate veterinary care.
              </GuidePoint>
              <GuidePoint>
                <strong>Solution:</strong> If you see signs of illness along with not eating, seek veterinary care immediately. Early treatment is crucial for recovery.
              </GuidePoint>
            </ul>
          </GuideSection>

          <GuideSection Icon={CheckCircle2} iconColor="#a78bfa" title="5. Solutions: How to Get Your Gecko Eating Again">
            <p className="text-slate-300 mb-4">
              Follow these steps in order to address the most common causes and get your gecko eating again:
            </p>
            <ul className="space-y-3">
              <GuidePoint>
                <strong>Step 1: Check Temperatures</strong> - Verify warm side is 88-92°F and cool side is 70-75°F. Fix temperature issues first—this solves most problems.
              </GuidePoint>
              <GuidePoint>
                <strong>Step 2: Ensure Proper Setup</strong> - Check that you have adequate hides (3 minimum), correct substrate, proper tank size (20+ gallons), and proper lighting.
              </GuidePoint>
              <GuidePoint>
                <strong>Step 3: Reduce Stress</strong> - Minimize handling, ensure quiet environment, check for stressors (other pets, loud noises, excessive activity).
              </GuidePoint>
              <GuidePoint>
                <strong>Step 4: Check for Shedding</strong> - If your gecko is shedding, wait for it to complete. They should resume eating after shedding.
              </GuidePoint>
              <GuidePoint>
                <strong>Step 5: Try Different Food</strong> - Offer different food items (crickets, mealworms, dubia roaches). Some geckos are picky eaters.
              </GuidePoint>
              <GuidePoint>
                <strong>Step 6: Feed at Night</strong> - Leopard geckos are crepuscular (active at dawn/dusk). Try offering food in the evening when they're more active.
              </GuidePoint>
              <GuidePoint alert>
                <strong>Step 7: Veterinary Care</strong> - If no improvement after 1-2 weeks, or if you see signs of illness, consult a reptile veterinarian immediately.
              </GuidePoint>
            </ul>
          </GuideSection>

        </div>

        <div className="max-w-4xl mx-auto mt-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-slate-400 text-lg">Common questions about leopard geckos not eating</p>
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
            <Link href="/care-sheets" className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 hover:border-emerald-500/40 transition-all text-center">
              <h3 className="text-sm font-bold text-white mb-1">Care Sheets</h3>
              <p className="text-xs text-slate-400">Quick reference</p>
            </Link>
          </div>
        </div>

        <div className="max-w-4xl mx-auto text-center mt-12">
          <h2 className="text-3xl font-black text-white mb-6">Need Help Setting Up Your Gecko Tank?</h2>
          <p className="text-slate-300 leading-relaxed max-w-2xl mx-auto mb-10">
            Use our interactive builder to create a complete leopard gecko setup with proper temperatures, hides, and all essential equipment.
          </p>
          <Link href="/build/leopard-gecko" className="inline-flex items-center justify-center gap-2 px-8 py-4 md:px-10 md:py-5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-full transition-all hover:scale-105 shadow-xl shadow-emerald-900/30 text-sm md:text-lg whitespace-nowrap">
            Launch Gecko Builder <ArrowRight size={20} className="shrink-0 md:w-6 md:h-6" />
          </Link>
        </div>

      </main>
      <Footer />
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

