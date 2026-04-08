export const metadata = {
  title: "Setup Help by Species | Habitat Setup Guides for Reptiles & Fish",
  description:
    "Setup help hub for BuildMyHabitat: step-by-step habitat setup guides organized by species, covering heating, lighting/UVB, substrate, cycling, and beginner-safe setup rules.",
  keywords:
    "setup help by species, habitat setup guides, reptile setup guides, fish tank setup guides, leopard gecko setup help, betta setup help, bearded dragon setup help",
  openGraph: {
    title: "Setup Help by Species | BuildMyHabitat",
    description:
      "Step-by-step habitat setup guides for reptiles and fish—organized by species so you can find the exact help you need faster.",
    images: ["/betta.jpg"],
  },
};

export default function SetupHelpLayout({ children }) {
  return <>{children}</>;
}
