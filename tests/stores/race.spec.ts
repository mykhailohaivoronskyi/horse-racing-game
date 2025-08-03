import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach } from 'vitest'
import { useRaceStore } from '../../src/stores/race'
import { RaceConfig } from '../../src/types/race';

describe('race store tests', () => {
  beforeEach(() => {
    // Initialize a fresh Pinia instance before each test
    setActivePinia(createPinia())
  })

  it('initRace initializes participants and schedule correctly', () => {
    const store = useRaceStore()
    const RACE_CONFIG: RaceConfig = {
      totalParticipants: 4,
      totalRounds: 3,
      participantsPerRound: 10,
      title: 'Horse',
      distanceBase: 1000,
      distanceIncreaseStep: 200,
    }
    store.initRace(RACE_CONFIG)

    // Should generate 4 participants
    expect(Object.keys(store.participantsById)).toHaveLength(4)

    // Should set total rounds and create a schedule of length 3
    expect(store.raceConfig.totalRounds).toBe(3)
    expect(store.raceSchedule).toHaveLength(3)

    // Current round index should reset to 0
    expect(store.currentRoundIndex).toBe(0)
  })

  it('hasNextRound reflects availability of the next round', () => {
    const store = useRaceStore()
    const RACE_CONFIG: RaceConfig = {
      totalParticipants: 2,
      totalRounds: 2,
      participantsPerRound: 10,
      title: 'Horse',
      distanceBase: 1000,
      distanceIncreaseStep: 200,
    }
    store.initRace(RACE_CONFIG)

    // Initially there is a next round (0 < 1)
    expect(store.hasNextRound).toBe(true)

    // Set index to last round
    store.currentRoundIndex = 1
    expect(store.hasNextRound).toBe(false)
  })

  it('isRaceFinished becomes true when all round results have been saved', () => {
    const store = useRaceStore()
    const RACE_CONFIG: RaceConfig = {
      totalParticipants: 2,
      totalRounds: 2,
      participantsPerRound: 10,
      title: 'Horse',
      distanceBase: 1000,
      distanceIncreaseStep: 200,
    }
    store.initRace(RACE_CONFIG)

    // Initially the race is not finished
    expect(store.isRaceFinished).toBe(false)

    // Push results for the first round
    store.raceResults.push([{ participantId: 1, finishTick: 100 }, { participantId: 2, finishTick: 100 }])
    expect(store.isRaceFinished).toBe(false)

    // Push results for the second (final) round
    store.raceResults.push([{ participantId: 1, finishTick: 200 }, { participantId: 2, finishTick: 200 }])
    expect(store.isRaceFinished).toBe(true)
  })
})
