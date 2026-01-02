import Link from "next/link";
import bettaConfig from "../../../../../data/betta.json";
import leopardConfig from "../../../../../data/leopard-gecko.json";

const SPECIES_CONFIG = {
  betta: {
    label: "Betta fish",
    config: bettaConfig,
    categories: {
      tank: {
        key: "enclosures",
        label: "Tank size",
        buildPath: "/build/betta",
        buildParam: "enclosure",
        unitField: "volume",
        unitLabel: "gallons",
      },
      equipment: {
        key: "filtration",
        label: "Equipment",
        buildPath: "/build/betta",
        buildParam: "filtration",
      },
      substrate: {
        key: "substrates",
        label: "Substrate",
        buildPath: "/build/betta",
        buildParam: "substrate",
      },
      plants: {
        key: "plants",
        label: "Plants",
        buildPath: "/build/betta",
        buildParam: "plants",
      },
      decor: {
        key: "decor",
        label: "Decor",
        buildPath: "/build/betta",
        buildParam: "decor",
      },
      watercare: {
        key: "watercare",
        label: "Water Care",
        buildPath: "/build/betta",
        buildParam: "watercare",
      },
    },
  },

  "leopard-gecko": {
    label: "Leopard gecko",
    config: leopardConfig,
    categories: {
      enclosure: {
        key: "enclosures",
        label: "Enclosure",
        buildPath: "/build/leopard-gecko",
        buildParam: "enclosure",
      },
      heating: {
        key: "heating",
        label: "Heating",
        buildPath: "/build/leopard-gecko",
        buildParam: "heating",
      },
      substrate: {
        key: "substrates",
        label: "Substrate",
        buildPath: "/build/leopard-gecko",
        buildParam: "substrate",
      },
      hides: {
        key: "hides",
        label: "Hides",
        buildPath: "/build/leopard-gecko",
        buildParam: "hides",
      },
      supplements: {
        key: "supplements",
        label: "Supplements",
        buildPath: "/build/leopard-gecko",
        buildParam: "supplements",
      },
    },
  },
};

export default async function UniversalProductOptions({ params }) {
  const { species, category, optionId } = await params;

  const speciesCfg = SPECIES_CONFIG[species];
  if (!speciesCfg) {
    return (
      <main className="relative min-h-screen pt-28 pb-20 px-6 bg-[#020617] text-slate-200">
        <div className="relative z-10 max-w-3xl mx-auto space-y-4">
          <Link
            href="/"
            className="text-sm text-slate-400 hover:text-slate-200 transition-colors inline-flex items-center gap-2"
          >
            ← Back home
          </Link>
          <h1 className="text-3xl font-bold text-white">Species not supported</h1>
          <p className="text-slate-300">
            We don&apos;t have a configuration for this species yet.
          </p>
        </div>
      </main>
    );
  }

  const catCfg = speciesCfg.categories[category];
  if (!catCfg) {
    return (
      <main className="relative min-h-screen pt-28 pb-20 px-6 bg-[#020617] text-slate-200">
        <div className="relative z-10 max-w-3xl mx-auto space-y-4">
          <Link
            href="/"
            className="text-sm text-slate-400 hover:text-slate-200 transition-colors inline-flex items-center gap-2"
          >
            ← Back home
          </Link>
          <h1 className="text-3xl font-bold text-white">Category not supported</h1>
          <p className="text-slate-300">
            We don&apos;t have a product options page configured for this
            category yet.
          </p>
        </div>
      </main>
    );
  }

  const config = speciesCfg.config;
  const items = config[catCfg.key] || [];
  const option = items.find((item) => item.id === optionId);

  if (!option) {
    return (
      <main className="relative min-h-screen pt-28 pb-20 px-6 bg-[#020617] text-slate-200">
        <div className="relative z-10 max-w-3xl mx-auto space-y-4">
          <Link
            href={`/select/${species}/${category}`}
            className="text-sm text-slate-400 hover:text-slate-200 transition-colors inline-flex items-center gap-2"
          >
            ← Back to {catCfg.label.toLowerCase()} choices
          </Link>
          <h1 className="text-3xl font-bold text-white">Option not found</h1>
          <p className="text-slate-300">
            We couldn&apos;t find that option. Try choosing again.
          </p>
        </div>
      </main>
    );
  }

  const products = option.products || [];

  return (
    <main className="relative min-h-screen pt-28 pb-20 px-6 bg-[#020617] text-slate-200">
      <div className="relative z-10 max-w-4xl mx-auto space-y-8">
        <header className="space-y-4">
          <Link
            href={`/select/${species}/${category}`}
            className="text-sm text-slate-400 hover:text-slate-200 transition-colors inline-flex items-center gap-2"
          >
            ← Back to {catCfg.label.toLowerCase()} choices
          </Link>
          <h1 className="text-4xl md:text-5xl font-black text-white">
            {option.label} – Product Options
          </h1>
          <p className="text-slate-300 text-lg">
            These are some recommended products for this{" "}
            {catCfg.label.toLowerCase()}. Open them to compare details, then
            continue building your setup.
          </p>

          <Link
            href={`${catCfg.buildPath}?${catCfg.buildParam}=${option.id}`}
            className="inline-flex mt-2 px-6 py-3 rounded-xl bg-sky-500 text-white font-bold text-sm hover:bg-sky-400 transition-colors"
          >
            Use this {catCfg.label.toLowerCase()} in my build
          </Link>
        </header>

        <section className="space-y-4">
          {products.length === 0 ? (
            <div className="p-6 rounded-2xl bg-slate-900/60 backdrop-blur-md border border-white/10">
              <p className="text-slate-300">
                No specific products have been added yet for this option. You can
                still use it in your build and search for products on your
                preferred store.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {products.map((prod, idx) => (
                <div
                  key={`${option.id}-${idx}`}
                  className="rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md p-6 flex flex-col justify-between hover:bg-white/10 transition-all duration-300"
                >
                  <div className="space-y-2">
                    <h2 className="text-lg font-bold text-white">
                      {prod.name}
                    </h2>
                    {prod.store && (
                      <p className="text-xs text-slate-400 uppercase tracking-wide">
                        {prod.store}
                      </p>
                    )}
                    {typeof prod.price === "number" && (
                      <p className="text-xl font-bold text-sky-400 font-mono">
                        ${prod.price.toFixed(2)}
                      </p>
                    )}
                  </div>

                  <div className="mt-6 flex flex-col gap-2">
                    <a
                      href={prod.url}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full text-center px-4 py-2 rounded-xl bg-slate-800 text-white font-semibold text-sm hover:bg-slate-700 transition-colors"
                    >
                      Open product page
                    </a>
                    <Link
                      href={`${catCfg.buildPath}?${catCfg.buildParam}=${option.id}`}
                      className="w-full text-center px-4 py-2 rounded-xl border border-sky-500 text-sky-400 font-semibold text-sm hover:bg-sky-500/10 transition-colors"
                    >
                      Use this {catCfg.label.toLowerCase()} in my build
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
