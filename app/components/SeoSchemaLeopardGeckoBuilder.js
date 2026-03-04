/**
 * JSON-LD HowTo schema for the Leopard Gecko builder page.
 * Rendered in layout so it appears in initial HTML for crawlers.
 */
const BASE_URL = "https://buildmyhabitat.com";

export default function SeoSchemaLeopardGeckoBuilder() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Build a Leopard Gecko Habitat",
    description: "Step-by-step guide to build a complete leopard gecko setup: choose experience level, enclosure size, heating (Halogen or DHP plus thermostat), UVB, substrate, hides, and supplements. Get a verified shopping list.",
    url: `${BASE_URL}/build/leopard-gecko`,
    totalTime: "PT15M",
    step: [
      {
        "@type": "HowToStep",
        name: "Choose experience level",
        text: "Select Beginner (hides unsafe options) or Experienced (unlocks full database).",
        position: 1,
      },
      {
        "@type": "HowToStep",
        name: "Choose enclosure size",
        text: "Select tank size. Minimum 20 gallons for adults; 40-gallon breeder recommended.",
        position: 2,
      },
      {
        "@type": "HowToStep",
        name: "Choose heating and thermostat",
        text: "Select one primary heat source (Halogen or Deep Heat Projector) and a thermostat. Thermostat is mandatory for safety.",
        position: 3,
      },
      {
        "@type": "HowToStep",
        name: "Choose substrate",
        text: "Select a safe substrate (e.g. paper towels, slate, reptile carpet, or approved loose options for experienced keepers).",
        position: 4,
      },
      {
        "@type": "HowToStep",
        name: "Choose hides",
        text: "Select warm hide, cool hide, and humid hide. All three are required for leopard gecko health.",
        position: 5,
      },
      {
        "@type": "HowToStep",
        name: "Choose supplements",
        text: "Select calcium (with or without D3 based on UVB) and multivitamin.",
        position: 6,
      },
    ],
    supply: [
      { "@type": "HowToSupply", name: "Reptile enclosure (20–40+ gallons)" },
      { "@type": "HowToSupply", name: "Primary heat source (halogen or DHP)" },
      { "@type": "HowToSupply", name: "Thermostat" },
      { "@type": "HowToSupply", name: "UVB lighting (optional)" },
      { "@type": "HowToSupply", name: "Safe substrate" },
      { "@type": "HowToSupply", name: "Warm, cool, and humid hides" },
      { "@type": "HowToSupply", name: "Calcium and multivitamin supplements" },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
