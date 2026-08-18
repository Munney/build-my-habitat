const baseUrl = "https://www.buildmyhabitat.com";

export const metadata = {
  title: "Ball Python Setup Builder (Free) | Build a 4x2x2 Habitat",
  description: "Build a complete ball python setup. Choose a 4×2×2 enclosure, overhead heat + thermostat, humidity tools, deep substrate, and essential hides. Get a verified shopping list.",
  keywords: "ball python setup, ball python enclosure, ball python tank size, 4x2x2 ball python, ball python humidity, ball python heating, ball python hides, ball python substrate",
  alternates: {
    canonical: `${baseUrl}/build/ball-python`,
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Ball Python Setup Builder (Free) | Build a 4x2x2 Habitat",
    description: "Build a complete ball python setup with overhead heat, thermostat, humidity control, and essential hides.",
    images: ["/ball-python.jpg"],
    url: `${baseUrl}/build/ball-python`,
  },
};

export default function BallPythonLayout({ children }) {
  return <>{children}</>;
}
