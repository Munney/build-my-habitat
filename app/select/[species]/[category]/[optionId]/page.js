import Link from "next/link";
import bettaConfig from "../../../../../data/betta.json";
import leopardConfig from "../../../../../data/leopard-gecko.json";

const SPECIES_CONFIG = {
  betta: {
    label: "Betta fish",
    config: bettaConfig,
    categories: {
      tank: {
        key: "tanks",
        label: "Tank size",
        buildPath: "/build/betta",
        buildParam: "tank",
        unitField: "volume",
        unitLabel: "gallons",
      },
      equipment: {
        key: "equipment",
        label: "Equipment",
        buildPath: "/build/betta",
        buildParam: "equipment",
      },
      substrate: {
        key: "substrate",
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
      food: {
        key: "food",
        label: "Food",
        buildPath: "/build/betta",
        buildParam: "food",
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
      <main className="min-h-screen bg-slate-950 text-slate-50 px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-4">
          <Link
            href="/"
            className="text-xs text-slate-400 mb-1 hover:text-slate-200"
          >
            ← Back home
          </Link>
          <h1 className="text-2xl font-bold">Species not supported</h1>
          <p className="text-slate-300 text-sm">
            We don&apos;t have a configuration for this species yet.
          </p>
        </div>
      </main>
    );
  }

  const catCfg = speciesCfg.categories[category];
  if (!catCfg) {
    return (
      <main className="min-h-screen bg-slate-950 text-slate-50 px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-4">
          <Link
            href="/"
            className="text-xs text-slate-400 mb-1 hover:text-slate-200"
          >
            ← Back home
          </Link>
          <h1 className="text-2xl font-bold">Category not supported</h1>
          <p className="text-slate-300 text-sm">
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
      <main className="min-h-screen bg-slate-950 text-slate-50 px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-4">
          <Link
            href={`/select/${species}/${category}`}
            className="text-xs text-slate-400 mb-1 hover:text-slate-200"
          >
            ← Back to {catCfg.label.toLowerCase()} choices
          </Link>
          <h1 className="text-2xl font-bold">Option not found</h1>
          <p className="text-slate-300 text-sm">
            We couldn&apos;t find that option. Try choosing again.
          </p>
        </div>
      </main>
    );
  }

  const products = option.products || [];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="space-y-2">
          <Link
            href={`/select/${species}/${category}`}
            className="text-xs text-slate-400 mb-1 hover:text-slate-200"
          >
            ← Back to {catCfg.label.toLowerCase()} choices
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold">
            {option.label} – product options
          </h1>
          <p className="text-slate-300 text-sm md:text-base">
            These are some recommended products for this{" "}
            {catCfg.label.toLowerCase()}. Open them to compare details, then
            continue building your setup.
          </p>

          <Link
            href={`${catCfg.buildPath}?${catCfg.buildParam}=${option.id}`}
            className="inline-flex mt-2 px-4 py-2 rounded-xl bg-sky-500 text-slate-950 font-semibold text-sm hover:bg-sky-400 transition"
          >
            Use this {catCfg.label.toLowerCase()} in my build
          </Link>
        </header>

        <section className="space-y-3">
          {products.length === 0 ? (
            <p className="text-slate-300 text-sm">
              No specific products have been added yet for this option. You can
              still use it in your build and search for products on your
              preferred store.
            </p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {products.map((prod, idx) => (
                <div
                  key={`${option.id}-${idx}`}
                  className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 flex flex-col justify-between"
                >
                  <div className="space-y-1">
                    <h2 className="text-base font-semibold text-slate-50">
                      {prod.name}
                    </h2>
                    {prod.store && (
                      <p className="text-xs text-slate-400">
                        Store: {prod.store}
                      </p>
                    )}
                    {typeof prod.price === "number" && (
                      <p className="text-lg font-bold text-sky-400">
                        ${prod.price}
                      </p>
                    )}
                  </div>

                  <div className="mt-4 flex flex-col gap-2">
                    <a
                      href={prod.url}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full text-center px-4 py-2 rounded-xl bg-slate-800 text-slate-50 font-semibold text-xs hover:bg-slate-700 transition"
                    >
                      Open product page
                    </a>
                    <Link
                      href={`${catCfg.buildPath}?${catCfg.buildParam}=${option.id}`}
                      className="w-full text-center px-4 py-2 rounded-xl border border-sky-500 text-sky-400 font-semibold text-xs hover:bg-sky-500/10 transition"
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
