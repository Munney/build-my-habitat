/**
 * JSON-LD HowTo schema for the Betta builder page.
 * Rendered in layout so it appears in initial HTML for crawlers.
 */
const BASE_URL = "https://www.buildmyhabitat.com";

export default function SeoSchemaBetta() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Build a Betta Fish Tank Setup",
    description:
      "Step-by-step guide to build a healthy betta tank: choose 5+ gallon tank, filter, heater and thermometer, substrate, plants or decor, and water conditioner. Get a complete shopping list with prices.",
    url: `${BASE_URL}/build/betta`,
    totalTime: "PT15M",
    step: [
      { "@type": "HowToStep", name: "Select tank size (5+ gallons)", text: "Choose a tank of at least 5 gallons. No bowls. Larger tanks are more stable.", position: 1 },
      { "@type": "HowToStep", name: "Choose filter", text: "Select a filter. Low-flow or sponge filters are best for bettas. Required for the nitrogen cycle.", position: 2 },
      { "@type": "HowToStep", name: "Choose heater and thermometer", text: "Select a heater (50W or 100W) and a thermometer. Water must stay 78–80°F.", position: 3 },
      { "@type": "HowToStep", name: "Choose substrate", text: "Select substrate (gravel, sand, or plant soil). Bare bottom is also an option.", position: 4 },
      { "@type": "HowToStep", name: "Add plants or decor", text: "Add silk or live plants and decor. Avoid plastic plants to prevent fin damage.", position: 5 },
      { "@type": "HowToStep", name: "Add water conditioner and test kit", text: "Include water conditioner and optionally a test kit for the nitrogen cycle.", position: 6 },
    ],
    supply: [
      { "@type": "HowToSupply", name: "Aquarium (5+ gallons)" },
      { "@type": "HowToSupply", name: "Filter (low-flow recommended)" },
      { "@type": "HowToSupply", name: "Heater" },
      { "@type": "HowToSupply", name: "Thermometer" },
      { "@type": "HowToSupply", name: "Substrate" },
      { "@type": "HowToSupply", name: "Plants or decor (no plastic)" },
      { "@type": "HowToSupply", name: "Water conditioner" },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
