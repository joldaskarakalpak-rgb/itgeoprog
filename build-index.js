#!/usr/bin/env node
/**
 * Создаёт списки файлов для сайта.
 * Netlify запускает при каждой сборке — новые записи появляются сами.
 */
const fs = require('fs');
const path = require('path');

function buildIndex(folder, outFile) {
  const dir = path.join(__dirname, folder);
  let names = [];
  try {
    names = fs.readdirSync(dir)
      .filter(f => f.endsWith('.md'))
      .sort()
      .reverse();
  } catch (e) {
    names = [];
  }
  const out = path.join(__dirname, outFile);
  fs.writeFileSync(out, JSON.stringify(names, null, 2), 'utf8');
  console.log(`${outFile}: ${names.length} файлов`);
}

buildIndex('content/news', 'content/news-index.json');
buildIndex('content/products', 'content/products-index.json');
buildIndex('content/programs', 'content/programs-index.json');
console.log('Индексы обновлены.');
