/**
 * Encode/decode build params to a URL-safe slug for shareable rate URLs.
 * Slug is base64url(JSON.stringify(params)) so the URL is self-contained.
 */

function base64UrlEncode(str) {
  const base64 = typeof btoa !== "undefined" ? btoa(str) : Buffer.from(str, "utf8").toString("base64");
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlDecode(slug) {
  let base64 = (slug || "").replace(/-/g, "+").replace(/_/g, "/");
  const pad = base64.length % 4;
  if (pad) base64 += "=====".slice(0, 4 - pad);
  try {
    return typeof atob !== "undefined" ? atob(base64) : Buffer.from(base64, "base64").toString("utf8");
  } catch {
    return null;
  }
}

/**
 * Encode build params (same shape as URL search params) to a path-safe slug.
 * @param {Record<string, string>} params - e.g. { enclosure: "10g", filtration: "hob", heating: "50w,thermometer" }
 * @returns {string} slug for use in /rate/[species]/[configId]
 */
export function encodeParamsToSlug(params) {
  if (!params || typeof params !== "object") return "";
  const cleaned = {};
  for (const [k, v] of Object.entries(params)) {
    if (v != null && String(v).trim() !== "") cleaned[k] = String(v).trim();
  }
  try {
    return base64UrlEncode(JSON.stringify(cleaned));
  } catch {
    return "";
  }
}

/**
 * Decode a slug back to params object.
 * @param {string} slug
 * @returns {Record<string, string> | null}
 */
export function decodeSlugToParams(slug) {
  if (!slug || typeof slug !== "string") return null;
  const json = base64UrlDecode(slug);
  if (!json) return null;
  try {
    const parsed = JSON.parse(json);
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch {
    return null;
  }
}
