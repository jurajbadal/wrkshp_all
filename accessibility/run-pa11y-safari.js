const pa11y = require('pa11y');
const puppeteer = require('puppeteer');
const fs = require('fs');

const urls = [
  'https://example.com',
  'https://example.com/about',
  'https://example.com/contact'
];

async function runTests() {
  const browser = await puppeteer.launch({
    executablePath: '/Applications/Safari.app/Contents/MacOS/Safari',
    headless: false
  });
  
  let fullReport = '<html><body>';
  for (const url of urls) {
    const result = await pa11y(url, {
      browser: browser,
      standard: 'WCAG2AA'
    });
    fullReport += `<h2>Results for ${url}</h2>`;
    fullReport += `<pre>${JSON.stringify(result, null, 2)}</pre>`;
  }
  fullReport += '</body></html>';
  
  fs.writeFileSync('Accessibility/report-safari.html', fullReport);
  
  await browser.close();
}

runTests();
