import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const files = [
  'data/leopard-gecko.json',
  'data/betta.json',
  'data/bearded-dragon.json',
  'data/ball-python.json',
  'data/crested-gecko.json',
];

files.forEach((filePath) => {
  const fullPath = path.join(__dirname, '..', filePath);
  const data = JSON.parse(fs.readFileSync(fullPath, 'utf8'));

  Object.keys(data).forEach((category) => {
    if (Array.isArray(data[category])) {
      const seen = new Map();
      data[category].forEach((item) => {
        // Handle both 'name' (ball/crested) and 'label' (betta/gecko/bearded) formats
        const key = item.name || item.label || item.id;
        if (key) seen.set(key, item);
      });
      data[category] = Array.from(seen.values());
      console.log(`  ${category}: ${data[category].length} items`);
    }
  });

  fs.writeFileSync(fullPath, JSON.stringify(data, null, 2));
  console.log(`✓ Deduplicated ${filePath}`);
});
