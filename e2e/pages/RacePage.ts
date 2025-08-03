import { Page } from "@playwright/test"

export class RacePage {
  constructor(private page: Page) {

  }
  get scheduleItems() {
    return this.page.getByTestId('race-schedule').getByTestId('round-details')
  }
  get raceResults() {
    return this.page.getByTestId('race-results').getByTestId('round-details')
  }
  get firstRaceResult() {
    return this.raceResults.first()
  }
  get headerPosition() {
    return this.firstRaceResult.getByRole('columnheader', { name: 'Position' })
  }
  get headerName() {
    return this.firstRaceResult.getByRole('columnheader', { name: 'Name' })
  }
  get runButton() {
    return this.page.getByTestId('run-button')
  }
  generate() {
    return this.page.getByTestId('generate-schedule-button').click()
  }
  run() {
    return this.runButton.click()
  }
}
