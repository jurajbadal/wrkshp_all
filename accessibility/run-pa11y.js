const pa11y = require('pa11y');
const fs = require('fs');

const urls = [
  'http://37.27.17.198:8084/cs',
  'https://example.com/about',
  'https://example.com/contact'
];

async function runTests() {
  let fullReport = '<html><body>';
  for (const url of urls) {
    const result = await pa11y(url, {
      standard: 'WCAG2AA'
    });
    fullReport += `<h2>Results for ${url}</h2>`;
    fullReport += `<pre>${JSON.stringify(result, null, 2)}</pre>`;
  }
  fullReport += '</body></html>';
  
  fs.writeFileSync('accessibility/report.html', fullReport);
}

runTests();
