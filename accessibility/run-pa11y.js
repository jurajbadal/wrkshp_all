const pa11y = require('pa11y');
const htmlReporter = require('pa11y-reporter-html-plus');
const fs = require('fs').promises;

const urls = [
  'http://37.27.17.198:8084/cs',
  'https://example.com/about',
  'https://example.com/contact'
];

async function runTests() {
  let fullReport = '';
  for (const url of urls) {
    const result = await pa11y(url, {
      standard: 'WCAG2AA',
      reporter: 'html-plus'
    });
    const htmlResult = await htmlReporter.results(result);
    fullReport += `<h2>Results for ${url}</h2>`;
    fullReport += htmlResult;
  }

  await fs.writeFile('accessibility/report.html', fullReport);
}

runTests();
