import { ExternalLink, BookOpen } from "lucide-react";

export default function ResearchPage() {
  const articles = [
    {
      category: "Leopard Gecko",
      title: "Reptile Heating: Deep Heat Projectors vs. Heat Mats",
      snippet: "Research on infrared heating and its effects on reptile thermoregulation and muscle function.",
      date: "2024",
      url: "https://scholar.google.com/scholar?q=reptile+heating+deep+heat+projector+infrared+thermoregulation",
      tagColor: "text-emerald-300 border-emerald-500/30 bg-emerald-500/10",
      buttonColor: "bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/20",
    },
    {
      category: "Leopard Gecko",
      title: "Substrate Safety in Reptile Enclosures",
      snippet: "Peer-reviewed studies on substrate ingestion risks and safe substrate options for leopard geckos.",
      date: "2024",
      url: "https://scholar.google.com/scholar?q=leopard+gecko+substrate+safety+impaction+husbandry",
      tagColor: "text-emerald-300 border-emerald-500/30 bg-emerald-500/10",
      buttonColor: "bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/20",
    },
    {
      category: "Betta Fish",
      title: "Minimum Tank Size and Welfare in Betta splendens",
      snippet: "Scientific research on the effects of tank size on betta fish behavior, stress, and overall welfare.",
      date: "2024",
      url: "https://scholar.google.com/scholar?q=betta+fish+tank+size+welfare+behavior+stress",
      tagColor: "text-blue-300 border-blue-500/30 bg-blue-500/10",
      buttonColor: "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20",
    },
    {
      category: "Betta Fish",
      title: "The Nitrogen Cycle and Beneficial Bacteria",
      snippet: "Research on nitrification processes, beneficial bacteria, and aquarium water quality management.",
      date: "2024",
      url: "https://scholar.google.com/scholar?q=aquarium+nitrogen+cycle+nitrification+beneficial+bacteria",
      tagColor: "text-blue-300 border-blue-500/30 bg-blue-500/10",
      buttonColor: "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20",
    },
    {
      category: "General",
      title: "Aquatic Animal Welfare Standards",
      snippet: "Peer-reviewed research on fish welfare, environmental enrichment, and evidence-based care standards.",
      date: "2024",
      url: "https://scholar.google.com/scholar?q=aquatic+animal+welfare+fish+care+enrichment",
      tagColor: "text-purple-300 border-purple-500/30 bg-purple-500/10",
      buttonColor: "bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-900/20",
    },
    {
      category: "General",
      title: "Reptile Enclosure Design and Thermal Gradients",
      snippet: "Studies on enclosure materials, thermal gradients, and their impact on reptile health and behavior.",
      date: "2024",
      url: "https://scholar.google.com/scholar?q=reptile+enclosure+thermal+gradient+heating+husbandry",
      tagColor: "text-purple-300 border-purple-500/30 bg-purple-500/10",
      buttonColor: "bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-900/20",
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
              className="group p-4 sm:p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 shadow-lg"
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
                  className={`w-full md:w-auto shrink-0 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all ${article.buttonColor}`}
                >
                  View Research <ExternalLink size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}