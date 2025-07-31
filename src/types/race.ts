export type RaceParticipant = {
  id: number
  name: string
  condition: number
  color: string
}

export type RaceParticipantsById = Record<RaceParticipant["id"], RaceParticipant>

export type RoundDetails = {
  roundNumber: number,
  distance: number,
  participants: Array<RaceParticipant>
}

export type RaceRoundsDetails = Array<RoundDetails>

export type RoundResults = Array<{
  participantId: RaceParticipant["id"];
  finishTick: number;
}>

export type RaceResults = Array<RoundResults>

export type RaceConfig = {
  totalParticipants: number,
  totalRounds: number,
  participantsPerRound: number,
  title: string,
  distanceBase: number,
  distanceIncreaseStep: number,
}
