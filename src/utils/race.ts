import { getOrdinalSuffix, getRandomInt, pickRandomUnique } from '@/utils/common';
import type { RaceParticipant, RaceParticipantsById, RaceRoundsDetails, RoundDetails } from '@/types/race';


export function calculateParticipantStep(
  participant: RaceParticipant,
  delta: number,
  distance: number
): number {
  if (!participant) {
    return 0
  }
  const SPEED_SCALE = 3;
  const baseSpeed = getRandomInt(10, 20);
  const bonus = (participant.condition / 100) * 10;

  const speed = baseSpeed + bonus;

  const scaled = (speed / distance) * SPEED_SCALE;

  return delta * scaled;
}


export function getRoundTitle(roundDetails: RoundDetails) {
  if (!roundDetails) {
    return ''
  }
  return `${getOrdinalSuffix(roundDetails.roundNumber)} Lap - ${roundDetails.distance}m`
}


export function generateParticipants(
  total: number,
  getName: () => string,
  getCondition: () => number,
  getColor: (index: number) => string,
): RaceParticipantsById {
  const participants: RaceParticipantsById = {}
  for (let i = 0; i < total; i++) {
    const id = i + 1
    participants[id] = {
      id,
      name: getName(),
      condition: getCondition(),
      color: getColor(i),
    }
  }
  return participants
}

export function generateSchedule(
  participantsById: Record<RaceParticipant['id'], RaceParticipant>,
  totalRounds: number = 0,
  participantsPerRound: number = 0,
  distanceBase: number = 0,
  distanceIncreaseStep: number = 0,
): RaceRoundsDetails {
  const rounds: RaceRoundsDetails = []
  const allParticipants = Object.values(participantsById)

  for (let i = 0; i < totalRounds; i++) {
    const distance = distanceBase + distanceIncreaseStep * (i + 1)
    const participants = pickRandomUnique(allParticipants, participantsPerRound)
    rounds.push({ roundNumber: i + 1, distance, participants })
  }

  return rounds
}

export function isRoundFinished(currentRoundFinishTicks: Array<number | null>) {
  return currentRoundFinishTicks.every((finishTick) => finishTick !== null)
}
