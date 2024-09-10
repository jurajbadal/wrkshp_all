const pa11y = require('pa11y');
const fs = require('fs');
const axeReporter = require('axe-reporter-html');

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

  const htmlReport = axeReporter.createHtmlReport({ results });
  fs.writeFileSync('accessibility/axe-report.html', htmlReport);
}

runTests();
