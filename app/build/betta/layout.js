const BASE_URL = "https://www.buildmyhabitat.com";

export const metadata = {
  title: "Betta Fish Tank Setup Builder (Free) | 5+ Gallon Guide & Shopping List",
  description:
    "Design a healthy betta fish tank setup (no bowls). Build a 5+ gallon planted aquarium with safe heaters, low-flow filters, and proper betta care. Get a complete shopping list with prices.",
  keywords:
    "betta fish tank setup, betta fish setup, betta fish tank size, betta fish care, betta fish habitat, betta fish heater, betta fish filter, betta fish tank requirements, betta fish beginner guide, betta fish planted tank",
  alternates: {
    canonical: `${BASE_URL}/build/betta`,
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Betta Fish Tank Setup Builder | 5+ Gallon Shopping List",
    description:
      "Stop using bowls. Build a proper 5+ gallon betta tank with safe heating and gentle filtration. Get a complete shopping list with prices.",
    images: ["/betta.jpg"],
    url: `${BASE_URL}/build/betta`,
  },
};

import SeoSchemaBetta from "../../components/SeoSchemaBetta";

export default function BettaLayout({ children }) {
  return (
    <>
      <SeoSchemaBetta />
      {children}
    </>
  );
}