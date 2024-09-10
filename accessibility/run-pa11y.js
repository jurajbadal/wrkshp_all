import pa11y from 'pa11y';
import htmlReporter from 'pa11y-reporter-html-plus';
import { promises as fs } from 'fs';

const urls = [
  'https://example.com',
  'https://example.com/about',
  'https://example.com/contact'
];

async function runTests() {
  let fullReport = '<html><body>';
  for (const url of urls) {
    const result = await pa11y(url, {
      standard: 'WCAG2AA',
      reporter: 'html-plus'
    });
    const htmlResult = await htmlReporter.results(result);
    fullReport += `<h2>Results for ${url}</h2>`;
    fullReport += htmlResult;
  }
  fullReport += '</body></html>';

  await fs.writeFile('Accessibility/plus-report.html', fullReport);
}

runTests();
