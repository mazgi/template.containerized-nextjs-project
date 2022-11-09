import { test, expect } from '@playwright/test'

test('frontend has the status page and it shows the frontend and bff status', async ({
  page,
}) => {
  await page.goto(`${process.env.FRONTEND_URL}/status`)
  await expect(page).toHaveTitle(/Status/)

  // H1
  await expect(page.locator('h1')).toHaveText(/Status/)

  // Frontend Status
  // https://playwright.dev/docs/selectors#parent-selector
  const frontendStatusCard = page
    .locator('h2', { hasText: 'Frontend Status' })
    .locator('..')
  await expect(frontendStatusCard).not.toBeNull
  await expect(
    frontendStatusCard.locator('p', { hasText: /^name:/ })
  ).not.toHaveText(/\+undef$/)
  await expect(
    frontendStatusCard.locator('p', { hasText: /^state:/ })
  ).toHaveText(/healthy/)
  await expect(
    frontendStatusCard.locator('p', { hasText: /^version:/ })
  ).not.toHaveText(/\+undef$/)

  // BFF Status
  // https://playwright.dev/docs/selectors#intermediate-matches
  // https://github.com/microsoft/playwright/issues/11522#issuecomment-1029392073
  // const bffStatusCard = page.locator(
  //   'main >> div >> *div >> h2:has-text("BFF Status")'
  // )
  const bffStatusCard = page
    .locator('h2', { hasText: 'BFF Status' })
    .locator('..')
  await expect(bffStatusCard).not.toBeNull
  await expect(
    bffStatusCard.locator('p', { hasText: /^name:/ })
  ).not.toHaveText(/\+undef$/)
  await expect(bffStatusCard.locator('p', { hasText: /^state:/ })).toHaveText(
    /healthy/
  )
  await expect(
    bffStatusCard.locator('p', { hasText: /^version:/ })
  ).not.toHaveText(/\+undef$/)
})
