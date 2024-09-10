import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';

const execAsync = promisify(exec);

const urls = [
  'https://example.com',
  'https://example.com/about',
  'https://example.com/contact'
];

async function runTests() {
  let fullReport = '<html><body>';
  
  for (const url of urls) {
    const { stdout } = await execAsync(`pa11y --reporter axe-cli ${url}`);
    fullReport += `<h2>Results for ${url}</h2><pre>${stdout}</pre>`;
  }
  
  fullReport += '</body></html>';
  
  await fs.writeFile('accessibility/axe-report.html', fullReport);
}

runTests();
