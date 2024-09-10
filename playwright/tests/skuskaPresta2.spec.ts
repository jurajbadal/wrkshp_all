import endpoint from "./configTypes";
import { AxeBuilder } from '@axe-core/playwright';
import { createHtmlReport } from 'axe-html-reporter';
import { test } from './fixtures/axe-fixture.ts';

test('TESENA Shop accessibility', async ({ page, runAxe }) => {
  await page.goto('http://37.27.17.198:8084/cs');
  await runAxe(page);
});

 




