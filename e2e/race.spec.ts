// e2e/race.spec.ts
import { test, expect } from '@playwright/test'
import { RacePage } from './pages/RacePage.js'

test.describe('Horse Racing App E2E Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the application root
    await page.goto('/')
  })

  test('should generate schedule, run full race, and display results', async ({ page }) => {
    const race = new RacePage(page)

    // Click the Generate Program button
    await race.generate()

    // Wait up to 10s for 6 rounds to appear in the schedule panel
    await expect(race.scheduleItems).toHaveCount(6, { timeout: 10_000 })

    // Click the Start button to begin the race
    await race.run()

    // Wait up to 30s for all 6 results to appear in the results panel
    await expect(race.raceResults).toHaveCount(6, { timeout: 30_000 })

    // Now verify that the Pause (run) button is disabled
    await expect(race.runButton).toBeDisabled({ timeout: 5_000 })

    // Check that the first results table has the correct column headers
    const firstResult = race.raceResults.first()
    await expect(firstResult.getByRole('columnheader', { name: 'Position' })).toBeVisible()
    await expect(firstResult.getByRole('columnheader', { name: 'Name' })).toBeVisible()
  })
})
