import Link from "next/link";
import { notFound } from "next/navigation";
import bettaConfig from "../../../../data/betta.json";
import leopardConfig from "../../../../data/leopard-gecko.json";

const SPECIES_CONFIG = {
  betta: {
    label: "Betta fish",
    config: bettaConfig,
    categories: {
      tank: { key: "enclosures", label: "Tank size", buildPath: "/build/betta", buildParam: "enclosure" },
      equipment: { key: "filtration", label: "Equipment", buildPath: "/build/betta", buildParam: "filtration" },
      substrate: { key: "substrates", label: "Substrate", buildPath: "/build/betta", buildParam: "substrate" },
      plants: { key: "plants", label: "Plants", buildPath: "/build/betta", buildParam: "plants" },
      decor: { key: "decor", label: "Decor", buildPath: "/build/betta", buildParam: "decor" },
      watercare: { key: "watercare", label: "Water Care", buildPath: "/build/betta", buildParam: "watercare" },
    },
  },
  "leopard-gecko": {
    label: "Leopard gecko",
    config: leopardConfig,
    categories: {
      enclosure: { key: "enclosures", label: "Enclosure", buildPath: "/build/leopard-gecko", buildParam: "enclosure" },
      heating: { key: "heating", label: "Heating", buildPath: "/build/leopard-gecko", buildParam: "heating" },
      substrate: { key: "substrates", label: "Substrate", buildPath: "/build/leopard-gecko", buildParam: "substrate" },
      hides: { key: "hides", label: "Hides", buildPath: "/build/leopard-gecko", buildParam: "hides" },
      supplements: { key: "supplements", label: "Supplements", buildPath: "/build/leopard-gecko", buildParam: "supplements" },
    },
  },
};

export default async function CategoryOptions({ params }) {
  const { species, category } = await params;

  const speciesCfg = SPECIES_CONFIG[species];
  if (!speciesCfg) {
    notFound();
  }

  const catCfg = speciesCfg.categories[category];
  if (!catCfg) {
    notFound();
  }

  const config = speciesCfg.config;
  const items = config[catCfg.key] || [];

  return (
    <main className="relative min-h-screen pt-28 pb-20 px-6 bg-[#020617] text-slate-200">
      <div className="relative z-10 max-w-4xl mx-auto space-y-8">
        <header className="space-y-4">
          <Link
            href="/"
            className="text-sm text-slate-400 hover:text-slate-200 transition-colors inline-flex items-center gap-2"
          >
            ← Back home
          </Link>
          <h1 className="text-4xl md:text-5xl font-black text-white">
            {catCfg.label} Options
          </h1>
          <p className="text-slate-300 text-lg">
            Choose a {catCfg.label.toLowerCase()} option to see product recommendations.
          </p>
        </header>

        <div className="grid gap-4 md:grid-cols-2">
          {items.map((item) => (
            <Link
              key={item.id}
              href={`/select/${species}/${category}/${item.id}`}
              className="group p-6 rounded-2xl bg-slate-900/60 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1"
            >
              <h2 className="text-xl font-bold text-white mb-2 group-hover:text-sky-200 transition-colors">
                {item.label}
              </h2>
              {item.price !== undefined && (
                <p className="text-sky-400 font-mono font-bold">
                  ${(item.price || 0).toFixed(2)}
                </p>
              )}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

