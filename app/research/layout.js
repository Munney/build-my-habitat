export const metadata = {
  title: 'Husbandry Research & Care Guides',
  description: 'Read the veterinary standards and scientific research behind our habitat recommendations. Learn about the Nitrogen Cycle, DHP Heating, and UVB safety.',
  openGraph: {
    title: 'HabitatBuilder Research Library',
    description: 'We don\'t guess. We build based on science. Read our care guides here.',
  },
};

export default function ResearchLayout({ children }) {
  return (
    <>
      {children}
    </>
  );
}