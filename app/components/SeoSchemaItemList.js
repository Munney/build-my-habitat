"use client";

/**
 * JSON-LD ItemList schema for summary/build receipt pages.
 * Renders selected items so rich results can show the list.
 */
const BASE_URL = "https://www.buildmyhabitat.com";

export default function SeoSchemaItemList({ items = [], listName = "Leopard Gecko Habitat Shopping List", species = "leopard-gecko" }) {
  if (!items || items.length === 0) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: listName,
    url: `${BASE_URL}/summary/${species}`,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label || item.name || "Habitat item",
      ...(item.price != null && { offers: { "@type": "Offer", price: item.price, priceCurrency: "USD" } }),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
