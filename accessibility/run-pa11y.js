import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';

const execAsync = promisify(exec);

const urls = [
  'http://37.27.17.198:8084/cs',
  'https://example.com/about',
  'https://example.com/contact'
];

async function runTests() {
  const reportDir = 'accessibility';
  await fs.mkdir(reportDir, { recursive: true });

  for (const url of urls) {
    const command = `npx pa11y --reporter=html-plus ${url}`;
    const { stdout } = await execAsync(command);
    await fs.appendFile(path.join(reportDir, 'plus-report.html'), stdout);
  }
}

runTests();
