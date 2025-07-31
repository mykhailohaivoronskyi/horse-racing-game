import { Page } from "@playwright/test"

export class RacePage {
  constructor(private page: Page) { }
  generate() { return this.page.getByTestId('generate-schedule-button').click() }
  run() { return this.page.getByTestId('run-button').click() }
  get scheduleItems() { return this.page.locator('.race-view__schedule .round-details') }
  get raceResults() { return this.page.locator('.race-view__results .round-details') }
  get runButton() { return this.page.getByTestId('run-button') }
}
