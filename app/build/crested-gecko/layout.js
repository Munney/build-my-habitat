const baseUrl = "https://www.buildmyhabitat.com";

export const metadata = {
  title: "Crested Gecko Setup Builder (Free) | Build a Tall Tropical Habitat",
  description: "Build a complete crested gecko setup. Choose a tall enclosure, thermostat-controlled heat, low-output UVB, humidity cycling, dense foliage, and CGD diet.",
  keywords: "crested gecko setup, crested gecko enclosure, crested gecko tank size, 18x18x24 crested gecko, crested gecko humidity, crested gecko UVB, crested gecko diet, CGD",
  alternates: {
    canonical: `${baseUrl}/build/crested-gecko`,
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Crested Gecko Setup Builder (Free) | Build a Tall Tropical Habitat",
    description: "Build a complete crested gecko setup with a tall enclosure, humidity cycling, UVB, and CGD diet.",
    images: ["/crested-gecko.jpg"],
    url: `${baseUrl}/build/crested-gecko`,
  },
};

export default function CrestedGeckoLayout({ children }) {
  return <>{children}</>;
}
