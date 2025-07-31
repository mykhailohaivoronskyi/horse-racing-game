import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'

import type { RaceConfig, RaceParticipantsById, RaceResults, RaceRoundsDetails } from '@/types/race';
import { generateHorseName } from '@/utils/horseGenerator';
import { getRandomInt, getUniqueColor } from '@/utils/common';
import { calculateParticipantStep, generateParticipants, generateSchedule } from '@/utils/race';
import { useRaceEngine } from '@/composables/useRaceEngine';

export const useRaceStore = defineStore('race', () => {
  const participantsById = ref<RaceParticipantsById>({})

  const raceSchedule = ref<RaceRoundsDetails>([])
  const currentRoundIndex = ref(0)
  const currentRoundProgress = ref<Array<number>>([])
  const currentRoundFinishTicks = ref<Array<number | null>>([])
  const raceConfig = ref<RaceConfig>({
    totalParticipants: 1,
    totalRounds: 1,
    participantsPerRound: 1,
    title: 'Default',
    distanceBase: 100,
    distanceIncreaseStep: 20,
  })
  const raceResults = ref<RaceResults>([])

  const currentRoundDetails = computed(() => raceSchedule.value[currentRoundIndex.value])
  const currentRoundParticipants = computed(() => currentRoundDetails.value?.participants ?? [])

  function initCurrentRoundProgress() {
    currentRoundProgress.value = Array(raceConfig.value.participantsPerRound).fill(0)
    currentRoundFinishTicks.value = Array(raceConfig.value.participantsPerRound).fill(null)
  }

  watch(participantsById, initCurrentRoundProgress, { immediate: true })

  function generateRaceSchedule() {
    pauseRace()
    initCurrentRoundProgress()
    currentRoundIndex.value = 0
    raceResults.value = []
    raceSchedule.value = generateSchedule(
      participantsById.value,
      raceConfig.value.totalRounds,
      raceConfig.value.participantsPerRound,
      raceConfig.value.distanceBase,
      raceConfig.value.distanceIncreaseStep
    )
  }

  function initRace(raceConfigData: RaceConfig) {
    raceConfig.value = raceConfigData
    const { totalParticipants } = raceConfig.value
    participantsById.value = generateParticipants(
      totalParticipants,
      generateHorseName,
      () => getRandomInt(1, 100),
      (i) => getUniqueColor(totalParticipants, i)
    )
    generateRaceSchedule()
  }

  const hasNextRound = computed(() =>
    currentRoundIndex.value + 1 < raceConfig.value.totalRounds
  )

  const isRaceFinished = computed(
    () => raceResults.value.length === raceConfig.value.totalRounds
  )


  function startNextRound() {
    initCurrentRoundProgress()
    if (hasNextRound.value) {
      currentRoundIndex.value++
      startRace()
    }
  }

  const { isRunning, start: startRace, pause: pauseRace } = useRaceEngine(
    (delta, now) => {
      const updatedProgress = currentRoundProgress.value.map((progress, index) =>
        progress +
        calculateParticipantStep(
          currentRoundParticipants.value[index],
          delta,
          currentRoundDetails.value.distance
        )
      )

      const updatedFinishTicks = updatedProgress.map((prog, index) =>
        prog >= 100 && currentRoundFinishTicks.value[index] === null
          ? now
          : currentRoundFinishTicks.value[index]
      )

      currentRoundProgress.value = updatedProgress
      currentRoundFinishTicks.value = updatedFinishTicks
    }
  )


  function saveRoundFinishTicks() {
    const results = currentRoundParticipants.value.map((participant, participantIndex) => ({
      participantId: participant.id,
      finishTick: currentRoundFinishTicks.value[participantIndex] ?? Infinity,
    }))
    raceResults.value.push(results)
  }

  const isCurrentRoundFinished = computed(
    () => currentRoundFinishTicks.value.every((finishTick) => finishTick !== null)
  )
  watch(isCurrentRoundFinished, (newVal) => {
    if (!newVal) {
      return
    }
    pauseRace()
    saveRoundFinishTicks()
    startNextRound()
  })

  return {
    initRace,
    participantsById,
    generateRaceSchedule,
    raceSchedule,
    raceConfig,
    currentRoundDetails,
    currentRoundParticipants,
    currentRoundIndex,
    hasNextRound,
    isRunning,
    currentRoundFinishTicks,
    startRace,
    pauseRace,
    currentRoundProgress,
    raceResults,
    isRaceFinished,
  }
})
