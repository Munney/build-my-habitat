"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ChevronDown, 
  ChevronUp,
  ArrowLeft,
  HelpCircle,
  CheckCircle2
} from "lucide-react";
import { analytics, trackEvent } from "../utils/analytics";
import { FAQSchema } from "../components/StructuredData";

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      category: "General",
      questions: [
        {
          q: "Is BuildMyHabitat free to use?",
          a: "Yes! BuildMyHabitat is completely free to use. We don't charge any fees. We earn a small commission when you purchase products through our Amazon affiliate links, but this doesn't cost you anything extra."
        },
        {
          q: "Are some links affiliate links?",
          a: "Yes. Some product links are affiliate links, which means we may earn a small commission at no extra cost to you. This supports ongoing guide updates, product reviews, and builder improvements."
        },
        {
          q: "How accurate are the prices?",
          a: "Prices are estimates based on current Amazon listings. Actual prices may vary slightly, and Amazon prices can change. We recommend checking the final price on Amazon before purchasing. We update prices periodically, but for the most current pricing, always check Amazon directly."
        },
        {
          q: "Do I have to buy everything from Amazon?",
          a: "No! You can use our builder to create your shopping list and then purchase items from any retailer you prefer. The Amazon links are just for convenience - you can find the same products at pet stores, specialty shops, or other online retailers."
        },
        {
          q: "Can I save or share my build?",
          a: "Yes! You can save your build by clicking the bookmark icon on your summary page. Saved builds are stored locally in your browser and can be accessed from the 'My Builds' page. You can also share your build by clicking the share button - the URL contains all your selections, so anyone with the link can see your exact configuration."
        },
        {
          q: "Do I still need to research animal care myself?",
          a: "Yes. The builder is designed to help you avoid common mistakes, but it does not replace responsible learning. Read species-specific guides, verify environmental targets, and stay current with published husbandry guidance."
        }
      ]
    },
    {
      category: "Safety & Restrictions",
      questions: [
        {
          q: "Why are some products blocked or restricted?",
          a: "We block products when they conflict with published husbandry guidance and conservative safety rules. Examples include calcium sand, reptile carpet, and undersized enclosures. These items are flagged to reduce avoidable welfare risks."
        },
        {
          q: "Can I override the restrictions?",
          a: "No. Restrictions are part of the builder's conservative safety model. If an item is blocked, choose a safer alternative from the recommended options and review the linked educational guidance."
        },
        {
          q: "Why is a thermostat required?",
          a: "Unregulated heat sources can reach temperatures over 150°F and cause severe burns. Every heat source MUST be connected to a thermostat - this is non-negotiable for reptile safety. It's the #1 cause of reptile injuries in captivity."
        },
        {
          q: "Are your recommendations vet-approved?",
          a: "BuildMyHabitat is not a veterinary service. Our recommendations are based on published husbandry research, welfare standards, and conservative safety rules. Always consult a qualified reptile, aquatic, or exotic animal veterinarian for medical concerns."
        },
        {
          q: "Does the builder guarantee safety?",
          a: "No tool can guarantee safety in every situation. The builder is designed to flag common unsafe products and incompatible setup choices, but your animal's health still depends on correct setup, maintenance, and ongoing observation."
        },
        {
          q: "Why is reptile carpet blocked in some contexts?",
          a: "Reptile carpet can trap waste and bacteria over time and may snag nails or claws. We use a conservative hygiene-first standard and recommend safer substrate options based on species and setup goals."
        },
        {
          q: "Is the generated shopping list required or optional?",
          a: "Optional. You can use it as a checklist and buy from any retailer. The list is meant to help you avoid missing essentials and incompatible combinations."
        }
      ]
    },
    {
      category: "Using the Builder",
      questions: [
        {
          q: "What's the difference between 'Beginner' and 'Experienced'?",
          a: "Beginner mode restricts potentially risky items (like loose substrates for geckos) to prevent common mistakes. Experienced mode unlocks all options for keepers who understand proper setup and monitoring. Both modes enforce critical safety requirements."
        },
        {
          q: "Can I go back and change my selections?",
          a: "Yes! On the summary page, click 'Edit Configuration' to go back and modify your selections. You can change any item at any time before purchasing."
        },
        {
          q: "What if I can't find a product on Amazon?",
          a: "If a product link doesn't work or the item is out of stock, you can search for similar products on Amazon or check other retailers. Look for products with the same specifications (size, wattage, etc.) to ensure compatibility."
        },
        {
          q: "How do I know if products are compatible?",
          a: "Our builder automatically checks compatibility. If there's a conflict, you'll see a warning message. For example, we'll warn you if you select a high-flow filter for a betta (they prefer gentle flow) or if you're missing required items."
        }
      ]
    },
    {
      category: "Products & Recommendations",
      questions: [
        {
          q: "Why do you recommend specific products?",
          a: "We recommend products that meet safety standards, are appropriate for the species, and are readily available. We prioritize safety and welfare over brand names. You can substitute similar products as long as they meet the same specifications."
        },
        {
          q: "Are cheaper alternatives safe?",
          a: "Sometimes, but not always. Price doesn't always indicate quality, but some cheap products cut corners on safety. For critical items like heaters and thermostats, we recommend reliable brands. For decor and accessories, you have more flexibility. Always prioritize safety over savings."
        },
        {
          q: "Do you update product recommendations?",
          a: "Yes, we periodically review and update our product database. If you notice outdated information or broken links, please let us know. We're always working to improve our recommendations based on new research and product availability."
        },
        {
          q: "Can I suggest products to add?",
          a: "We're always open to product suggestions! If you've found a great product that meets our safety standards, we'd love to hear about it. However, we only add products that we've verified for safety and compatibility."
        }
      ]
    },
    {
      category: "Care & Maintenance",
      questions: [
        {
          q: "How often should I update my habitat?",
          a: "Habitats don't need frequent updates, but you should replace worn items, upgrade as your pet grows, and refresh enrichment items periodically. Check our Care Sheets for specific maintenance schedules for each species."
        },
        {
          q: "What if my pet outgrows their enclosure?",
          a: "If your pet outgrows their enclosure, you'll need to upgrade. Our builder shows minimum and recommended sizes. It's always better to start with a larger enclosure if possible, as it provides better welfare and reduces the need for upgrades."
        },
        {
          q: "Do prices include shipping?",
          a: "No, our price estimates don't include shipping costs. Amazon Prime members get free shipping on eligible items. Shipping costs vary by location and item size. Check Amazon for final shipping costs."
        },
        {
          q: "What if I already have some items?",
          a: "Great! You can skip items you already own in the builder. Just don't select them, and they won't be added to your cart. Make sure your existing items meet our safety standards - check the tooltips for requirements."
        }
      ]
    }
  ];

  const toggleQuestion = (categoryIndex, questionIndex) => {
    const index = `${categoryIndex}-${questionIndex}`;
    setOpenIndex(openIndex === index ? null : index);
  };

  // Flatten FAQs for structured data
  const allFAQs = faqs.flatMap(category => 
    category.questions.map(q => ({
      question: q.q,
      answer: q.a
    }))
  );

  return (
    <main className="min-h-screen pt-28 pb-20 px-6 relative z-10">
      <FAQSchema faqs={allFAQs} />
      <div className="max-w-4xl mx-auto">
        
        {/* Back Button */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-medium text-base mb-8 group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back to Hub
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-6">
            Help & Support
          </div>
          <div className="flex items-center justify-center gap-3 mb-4">
            <HelpCircle className="text-emerald-400" size={40} />
            <h1 className="text-5xl md:text-6xl font-black text-white drop-shadow-lg">
              Frequently Asked Questions
            </h1>
          </div>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Everything you need to know about using BuildMyHabitat and building safe habitats.
          </p>
        </div>

        {/* FAQ Sections */}
        <div className="space-y-8">
          {faqs.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <CheckCircle2 className="text-emerald-400" size={24} />
                {category.category}
              </h2>
              
              <div className="space-y-4">
                {category.questions.map((faq, questionIndex) => {
                  const index = `${categoryIndex}-${questionIndex}`;
                  const isOpen = openIndex === index;
                  
                  return (
                    <div
                      key={questionIndex}
                      className="border border-white/10 rounded-xl overflow-hidden bg-slate-800/40"
                    >
                      <button
                        onClick={() => {
                          toggleQuestion(categoryIndex, questionIndex);
                          analytics.trackFAQToggle(category.category, faq.q);
                        }}
                        className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-white/5 transition-colors"
                      >
                        <span className="font-bold text-white flex-1">{faq.q}</span>
                        {isOpen ? (
                          <ChevronUp className="text-emerald-400 shrink-0" size={20} />
                        ) : (
                          <ChevronDown className="text-slate-400 shrink-0" size={20} />
                        )}
                      </button>
                      
                      <div className={`px-5 pb-5 pt-0 ${isOpen ? "block" : "block"}`}>
                        <p className="text-slate-300 leading-relaxed">{faq.a}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Still Have Questions */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/20 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Still Have Questions?
          </h3>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
            Check out our Care Sheets, Common Mistakes page, or Research articles for more detailed information.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/care-sheets"
              onClick={() => analytics.trackNavClick("care-sheets")}
              className="px-6 py-3 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-all"
            >
              View Care Sheets
            </Link>
            <Link
              href="/common-mistakes"
              onClick={() => analytics.trackNavClick("common-mistakes")}
              className="px-6 py-3 rounded-xl font-bold bg-red-600 hover:bg-red-500 text-white transition-all"
            >
              Common Mistakes
            </Link>
            <Link
              href="/research"
              onClick={() => analytics.trackNavClick("research")}
              className="px-6 py-3 rounded-xl font-bold bg-blue-600 hover:bg-blue-500 text-white transition-all"
            >
              Research Articles
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

