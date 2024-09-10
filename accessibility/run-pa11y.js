import pa11y from 'pa11y';
import fs from 'fs/promises';
import createHTMLReport from 'axe-reporter-html';

const urls = [
  'https://example.com',
  'https://example.com/about',
  'https://example.com/contact'
];

async function runTests() {
  let results = [];
  for (const url of urls) {
    const result = await pa11y(url, {
      standard: 'WCAG2AA',
      runner: 'axe'
    });
    results.push(result);
  }

  const html = await createHTMLReport(results);
  await fs.writeFile('accessibility/axe-report.html', html);
}

runTests();
