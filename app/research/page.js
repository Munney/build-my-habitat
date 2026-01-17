"use client";

import { useEffect } from "react";
import { ExternalLink, BookOpen } from "lucide-react";
import { analytics, trackEvent } from "../utils/analytics";

export default function ResearchPage() {
  // Track page view
  useEffect(() => {
    trackEvent("research_page_view", {});
  }, []);
  const articles = [
    {
      category: "Betta Fish",
      title: "Life Beyond a Jar: Effects of Tank Size and Furnishings on the Behaviour and Welfare of Siamese Fighting Fish",
      snippet: "This peer-reviewed study from Animal Welfare journal demonstrates that bettas housed in larger, furnished tanks were more active and exhibited fewer abnormal behaviors compared to those in smaller, barren jars.",
      date: "2021",
      url: "https://www.cambridge.org/core/journals/animal-welfare/article/life-beyond-a-jar-effects-of-tank-size-and-furnishings-on-the-behaviour-and-welfare-of-siamese-fighting-fish-betta-splendens/001D7050503D7D31F937B5C72CCC668B",
      tagColor: "text-blue-300 border-blue-500/30 bg-blue-500/10",
      buttonColor: "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20",
    },
    {
      category: "Betta Fish",
      title: "Life in a Fishbowl: Space and Environmental Enrichment Affect Behaviour of Betta splendens",
      snippet: "Published research showing that male bettas confined in small bowls exhibited reduced swimming behavior compared to those in larger aquaria, with a minimum of 10 liters recommended for full expression of natural behaviors.",
      date: "2020",
      url: "https://www.cambridge.org/core/journals/animal-welfare/article/life-in-a-fishbowl-space-and-environmental-enrichment-affect-behaviour-of-betta-splendens/2A9DD22C6BC2D833EAC4F03508A8E3B4",
      tagColor: "text-blue-300 border-blue-500/30 bg-blue-500/10",
      buttonColor: "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20",
    },
    {
      category: "Betta Fish",
      title: "Timing of Isolation from an Enriched Environment Determines Aggressive Behavior in Betta splendens",
      snippet: "BMC Zoology study investigating how the timing of isolation from enriched environments affects aggression and sexual maturity in betta fish, suggesting that group housing in enriched environments can reduce aggression.",
      date: "2021",
      url: "https://bmczool.biomedcentral.com/articles/10.1186/s40850-021-00081-x",
      tagColor: "text-blue-300 border-blue-500/30 bg-blue-500/10",
      buttonColor: "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20",
    },
    {
      category: "Leopard Gecko",
      title: "The Effect of Enrichment on Leopard Geckos Housed in Different Maintenance Systems",
      snippet: "Peer-reviewed study from Animals journal examining how environmental enrichment affects leopard geckos in rack systems versus terrariums, highlighting the importance of enrichment for their welfare.",
      date: "2023",
      url: "https://www.mdpi.com/2076-2615/13/6/1111",
      tagColor: "text-emerald-300 border-emerald-500/30 bg-emerald-500/10",
      buttonColor: "bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/20",
    },
    {
      category: "Leopard Gecko",
      title: "Memory in Leopard Geckos (Eublepharis macularius) in a Morris Water Maze Task",
      snippet: "Research from Animals journal assessing the learning and memory capabilities of leopard geckos, providing insights into their cognitive abilities and demonstrating their capacity for spatial learning.",
      date: "2024",
      url: "https://www.mdpi.com/2076-2615/15/14/2014",
      tagColor: "text-emerald-300 border-emerald-500/30 bg-emerald-500/10",
      buttonColor: "bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/20",
    },
    {
      category: "Resources",
      title: "Google Scholar - Pet Care Research",
      snippet: "Access peer-reviewed research papers on reptile and fish husbandry, welfare, and care standards.",
      date: "Ongoing",
      url: "https://scholar.google.com/scholar?q=reptile+fish+husbandry+welfare+care",
      tagColor: "text-amber-300 border-amber-500/30 bg-amber-500/10",
      buttonColor: "bg-amber-600 hover:bg-amber-500 text-white shadow-lg shadow-amber-900/20",
    },
    {
      category: "Resources",
      title: "PubMed - Veterinary Research",
      snippet: "National Library of Medicine database with peer-reviewed veterinary and animal welfare research.",
      date: "Ongoing",
      url: "https://pubmed.ncbi.nlm.nih.gov/?term=reptile+husbandry+OR+fish+welfare+OR+pet+care",
      tagColor: "text-amber-300 border-amber-500/30 bg-amber-500/10",
      buttonColor: "bg-amber-600 hover:bg-amber-500 text-white shadow-lg shadow-amber-900/20",
    }
  ];

  return (
    <>
    <main className="relative min-h-screen py-20 px-4 sm:px-6">
      <div className="relative z-10 max-w-4xl mx-auto space-y-8 sm:space-y-12">
        
        {/* Header */}
        <div className="space-y-4 text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight flex flex-wrap items-center gap-2 sm:gap-3 justify-center md:justify-start drop-shadow-xl text-white">
            <BookOpen className="text-sky-500" size={32} />
            <span>Research & <span className="text-slate-300">Evidence</span></span>
          </h1>
          <p className="text-slate-200 text-base sm:text-lg max-w-2xl leading-relaxed drop-shadow-md font-medium px-2 sm:px-0">
            We don't just guess. Every product recommended on HabitatBuilder is backed by modern husbandry standards and vet-approved research.
          </p>
        </div>

        {/* Article Grid */}
        <div className="grid gap-6">
          {articles.map((article, i) => (
            <div 
              key={i} 
              className="group p-4 sm:p-6 rounded-2xl card-warm hover:bg-slate-800/70 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="space-y-3 flex-1 min-w-0">
                  {/* Category Badge */}
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest border ${article.tagColor}`}>
                      {article.category}
                    </span>
                    <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">• {article.date}</span>
                  </div>
                  
                  {/* Content */}
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-sky-200 transition-colors">
                      {article.title}
                    </h2>
                    <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-medium">
                      {article.snippet}
                    </p>
                  </div>
                </div>
                
                {/* Button (Now uses dynamic colors) */}
                <a 
                  href={article.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={() => analytics.trackResearchView(article.title)}
                  className={`w-full md:w-auto shrink-0 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all ${article.buttonColor}`}
                >
                  Read Study <ExternalLink size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
    <Footer />
  </>
  );
}