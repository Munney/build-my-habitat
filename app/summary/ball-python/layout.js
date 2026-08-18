const baseUrl = "https://www.buildmyhabitat.com";

export const metadata = {
  title: "Your Ball Python Habitat Build | BuildMyHabitat",
  description: "Your verified ball python shopping list with Amazon cart, habitat safety score, and care reminders.",
  alternates: {
    canonical: `${baseUrl}/summary/ball-python`,
  },
  openGraph: {
    title: "Your Ball Python Habitat Build | BuildMyHabitat",
    description: "Verified ball python shopping list with Amazon cart and habitat safety score.",
    images: ["/ball-python.jpg"],
    url: `${baseUrl}/summary/ball-python`,
  },
};

export default function BallPythonSummaryLayout({ children }) {
  return <>{children}</>;
}
