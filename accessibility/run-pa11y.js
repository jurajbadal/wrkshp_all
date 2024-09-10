import pa11y from 'pa11y';
import htmlReporter from 'pa11y-reporter-html-plus';
import { promises as fs } from 'fs';
import path from 'path';

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
  const reportDir = 'accessibility';
  await fs.mkdir(reportDir, { recursive: true });
  await fs.writeFile(path.join(reportDir, 'plus-report.html'), fullReport);
}

runTests();

