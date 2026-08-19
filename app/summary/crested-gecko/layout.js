const baseUrl = "https://www.buildmyhabitat.com";

export const metadata = {
  title: "Your Crested Gecko Habitat Build | BuildMyHabitat",
  description: "Your verified crested gecko shopping list with Amazon cart, habitat safety score, and care reminders.",
  alternates: {
    canonical: `${baseUrl}/summary/crested-gecko`,
  },
  openGraph: {
    title: "Your Crested Gecko Habitat Build | BuildMyHabitat",
    description: "Verified crested gecko shopping list with Amazon cart and habitat safety score.",
    images: ["/crested-gecko.jpg"],
    url: `${baseUrl}/summary/crested-gecko`,
  },
};

export default function CrestedGeckoSummaryLayout({ children }) {
  return <>{children}</>;
}
