export const ALLOWED_CATEGORIES = {
  'data/leopard-gecko.json': [
    'enclosures', 'heating', 'substrates', 'hides',
    'supplements', 'feeding',
  ],
  'data/betta.json': [
    'enclosures', 'filtration', 'heating', 'substrates',
    'decor', 'watercare',
  ],
  'data/bearded-dragon.json': [
    'enclosures', 'heating', 'lighting', 'substrates',
    'hides', 'decor', 'supplements', 'feeding',
  ],
  'data/ball-python.json': [
    'enclosures', 'heating', 'uvb', 'substrates',
    'humidity', 'hides', 'water', 'monitoring', 'feeding',
  ],
  'data/crested-gecko.json': [
    'enclosures', 'heating', 'uvb', 'lighting', 'substrates',
    'humidity', 'decor', 'supplements', 'monitoring',
  ],
};

/**
 * Returns { ok: true, targetFile } or { ok: false, targetFile }.
 * Verifies the CSV species maps to a known file and the category is allowed for that file.
 */
export function validateSpeciesCategory(speciesMap, speciesName, categoryName) {
  const targetFile = speciesMap[speciesName];
  if (!targetFile) {
    return { ok: false, targetFile: null };
  }

  const allowed = ALLOWED_CATEGORIES[targetFile];
  if (!allowed || !allowed.includes(categoryName)) {
    return { ok: false, targetFile };
  }

  return { ok: true, targetFile };
}

export function logSkippedRow(speciesCell, categoryCell, targetFile) {
  console.log(`Skipped: ${speciesCell.trim()} | ${categoryCell.trim()} does not belong in ${targetFile}`);
}
