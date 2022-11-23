import { test, expect } from '@playwright/test'

const SemVerRegex =
  /^([0-9]+)\.([0-9]+)\.([0-9]+)(?:-([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?(?:\+[0-9A-Za-z-]+)?$/

test('frontend has the status page and it shows the frontend and bff status', async ({
  page,
}) => {
  await page.goto(`${process.env.FRONTEND_URL}/status`)

  // <head>
  await expect(page).toHaveTitle(/Status/)
  // </head>

  // <body>
  await expect(page.locator('h1')).toHaveText(/Status/)

  // Frontend Status
  // https://playwright.dev/docs/selectors#parent-selector
  const frontendStatusCard = page
    .locator('h2', { hasText: /^\s*Frontend Status\s*$/ })
    .locator('..')
  await expect(frontendStatusCard).not.toBeNull
  await expect(
    frontendStatusCard
      .locator('dt', { hasText: /^\s*name:\s*$/ })
      // https://playwright.dev/docs/selectors#xpath-selectors
      .locator('xpath=/following-sibling::dd[1]')
  ).toHaveText(/^\s*frontend\s*$/)
  await expect(
    frontendStatusCard
      .locator('dt', { hasText: /^\s*name:\s*$/ })
      .locator('xpath=/following-sibling::dd[1]')
  ).not.toContainText('undef')
  await expect(
    frontendStatusCard
      .locator('dt', { hasText: /^\s*state:\s*$/ })
      .locator('xpath=/following-sibling::dd[1]')
  ).toHaveText(/^\s*healthy\s*$/)
  await expect(
    frontendStatusCard
      .locator('dt', { hasText: /^\s*version:\s*$/ })
      .locator('xpath=/following-sibling::dd[1]')
  ).toHaveText(SemVerRegex)
  await expect(
    frontendStatusCard
      .locator('dt', { hasText: /^\s*version:\s*$/ })
      .locator('xpath=/following-sibling::dd[1]')
  ).not.toContainText('undef')

  // BFF Status
  // https://playwright.dev/docs/selectors#intermediate-matches
  // https://github.com/microsoft/playwright/issues/11522#issuecomment-1029392073
  // const bffStatusCard = page.locator(
  //   'main >> div >> *div >> h2:has-text("BFF Status")'
  // )
  const bffStatusCard = page
    .locator('h2', { hasText: /^\s*BFF Status\s*$/ })
    .locator('..')
  await expect(bffStatusCard).not.toBeNull
  await expect(
    bffStatusCard
      .locator('dt', { hasText: /^\s*name:\s*$/ })
      .locator('xpath=/following-sibling::dd[1]')
  ).toHaveText(/^\s*bff\s*$/)
  await expect(
    bffStatusCard
      .locator('dt', { hasText: /^\s*name:\s*$/ })
      .locator('xpath=/following-sibling::dd[1]')
  ).not.toContainText('undef')
  await expect(
    bffStatusCard
      .locator('dt', { hasText: /^\s*state:\s*$/ })
      .locator('xpath=/following-sibling::dd[1]')
  ).toHaveText(/^\s*healthy\s*$/)
  await expect(
    bffStatusCard
      .locator('dt', { hasText: /^\s*version:\s*$/ })
      .locator('xpath=/following-sibling::dd[1]')
  ).toHaveText(SemVerRegex)
  await expect(
    bffStatusCard
      .locator('dt', { hasText: /^\s*version:\s*$/ })
      .locator('xpath=/following-sibling::dd[1]')
  ).not.toContainText('undef')
  // </body>
})
