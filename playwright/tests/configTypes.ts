import { test as base, Page } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';
import { createHtmlReport } from 'axe-html-reporter';
import fs from 'fs';
import path from 'path';

type AxeFixture = {
  runAxe: (page: Page, testName: string) => Promise<void>;
};

export const test = base.extend<AxeFixture>({
  runAxe: async ({}, use) => {
    await use(async (page: Page, testName: string) => {
      const axe = new AxeBuilder({ page });
      const results = await axe.analyze();

      const reportPath = path.join(__dirname, '..', 'axe-report.html');
      let existingReport = '';
      if (fs.existsSync(reportPath)) {
        existingReport = fs.readFileSync(reportPath, 'utf8');
      }

      const newReportHTML = createHtmlReport({
        results: results,
        options: {
          projectKey: 'TESENA Shop',
        },
      });

      const combinedReport = existingReport + `<h2>${testName}</h2>` + newReportHTML;
      fs.writeFileSync(reportPath, combinedReport);

      const violationsCount = results.violations.length;
      expect(violationsCount, `Found ${violationsCount} accessibility violations`).toBe(0);
    });
  },
});
