import endpoint from "./configTypes";
import { test, expect } from '@playwright/test';
//import { AxePlaywright }  from 'axe-playwright';
import { AxeBuilder } from '@axe-core/playwright';
import { createHtmlReport } from 'axe-html-reporter';
import { test as axeTest } from './fixtures/axe-fixture.ts';

axeTest('TESENA Shop accessibility', async ({ page, runAxe }) => {
  await page.goto('http://37.27.17.198:8084/cs');
  await runAxe(page);

// Verify that number equals 2
  //expect(number_subscriptions_allowed).toBe(0)
  const violationsCount = results.violations.length;
  expect(violationsCount, `Found ${violationsCount} accessibility violations`).toBe(0);
}); 



test("TESENA Shop", async ({ page }) => {

  // Go to the Droplets product page of DigitalOcean web page
  await page.goto('http://37.27.17.198:8084/cs');

  // Wait for the page to load
  await page.waitForLoadState('networkidle');

  // Relative XPath
 // await page.locator("div[class='products row'] img[alt='Hummingbird printed t-shirt']:visible").click();
 // const screenshot = await page.screenshot({path: './screenshots/test.png'});
  
 
 
  // Accessibility testing using Axe
  //const axe = AxePlaywright(page);
//  const axe = new AxeBuilder({ page });
//  const results = await axe.analyze();
  
 
/// Generate HTML report
//const reportHTML = createHtmlReport({
//  results: results,
//  options: {
//    projectKey: 'TESENA Shop',
//  },
//});



})