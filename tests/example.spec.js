// // @ts-check
// import { test, expect} from '@playwright/test'
// test.describe('Test Suite',()=>{
//   // test.beforeAll(()=>{
//   //   console.log('Before All hook')
//   // })
//   // test.beforeEach(()=>{
//   //   console.log('Before Each hook')
//   // })
//   // test.afterAll(()=>{
//   //   console.log('After All hook')
//   // })
//   // test.afterEach(()=>{
//   //   console.log('After Each hook')
//   // })
//   test('TC1. Has title @smoke', async ({ page }) => {
//     // console.log('First test')
//     await page.goto('https://playwright.dev/');
//     await expect(page).toHaveTitle(/Playwright/);
//   });
//
//   test('TC2. Get started link @smoke @regression', async ({ page }) => {
//     // console.log('Second test')
//     await page.goto('https://playwright.dev/');
//     await page.getByRole('link', { name: 'Get started' }).click();
//     await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
//   });
// })