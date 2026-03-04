"use client";

/**
 * Extract ASIN from Amazon URLs. Supports:
 * /dp/ASIN, /gp/product/ASIN, /gp/aw/d/ASIN, ?asin=ASIN
 */
export function getAsinFromUrl(url) {
  if (!url || typeof url !== "string") return null;
  const patterns = [
    /(?:dp|gp\/product)\/([A-Z0-9]{10})/i,
    /gp\/aw\/d\/([A-Z0-9]{10})/i,
    /[?&]asin=([A-Z0-9]{10})/i,
  ];
  for (const regex of patterns) {
    const match = url.match(regex);
    if (match) return match[1];
  }
  return null;
}

/**
 * Deduplicate items by ASIN (keeps first occurrence).
 */
export function dedupeByAsin(items, getAsin = (item) => item.asin || getAsinFromUrl(item.defaultProductUrl)) {
  const seen = new Set();
  return items.filter((item) => {
    const asin = getAsin(item);
    if (!asin || seen.has(asin)) return false;
    seen.add(asin);
    return true;
  });
}

/**
 * Build Amazon cart URL from items. Uses quantity from item.quantity or 1.
 */
export function buildAmazonCartUrl(items, affiliateTag) {
  const baseUrl = "https://www.amazon.com/gp/aws/cart/add.html";
  const params = new URLSearchParams();
  params.append("AssociateTag", affiliateTag);
  const unique = dedupeByAsin(items);
  let index = 1;
  unique.forEach((item) => {
    const asin = item.asin || getAsinFromUrl(item.defaultProductUrl);
    if (asin) {
      params.append(`ASIN.${index}`, asin);
      params.append(`Quantity.${index}`, String(item.quantity != null ? item.quantity : 1));
      index++;
    }
  });
  return `${baseUrl}?${params.toString()}`;
}

/**
 * Stable config ID for the session (use in useMemo(() => Math.floor(Math.random() * 99999), []).
 */
export function getStableConfigId() {
  return Math.floor(Math.random() * 99999);
}
