import { describe, it, expect } from 'vitest'
import { generateParticipants, generateSchedule } from '../../src/utils/race';
import { RaceParticipant } from '../../src/types/race';

describe('race utils tests', () => {

  it('generateParticipants should create correct number of participants with valid properties', () => {
    const participants = generateParticipants(
      5,
      () => 'Name',
      () => 50,
      i => `color${i}`
    )
    expect(Object.keys(participants)).toHaveLength(5);
    (Object.values(participants) as Array<RaceParticipant>).forEach((participant, index) => {
      expect(participant.id).toBe(index + 1)
      expect(participant.name).toBe('Name')
      expect(participant.condition).toBe(50)
      expect(participant.color).toBe(`color${index}`)
    })
  })

  it('generateParticipants handles zero or negative totals gracefully', () => {
    expect(Object.keys(generateParticipants(0, () => '', () => 0, () => '')).length).toBe(0)
    expect(Object.keys(generateParticipants(-5, () => '', () => 0, () => '')).length).toBe(0)
  })

  it('generateSchedule should build correct rounds with proper distances and participant count', () => {
    const participants = generateParticipants(10, () => 'Name', () => 10, () => 'blue')
    const schedule = generateSchedule(participants, 3, 5, 1000, 200)
    expect(schedule).toHaveLength(3)
    schedule.forEach((round, index) => {
      expect(round.distance).toBe(1000 + 200 * (index + 1))
      expect(round.participants).toHaveLength(5)
    })
  })
})
