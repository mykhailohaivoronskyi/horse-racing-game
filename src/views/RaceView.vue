<template>
  <div class="race-view">
    <RaceHeader />
    <RaceParticipants />
    <RaceTrack>
      <template #icon="{ participant }">
        <div class="race-view__horse">
          <i
            :style="{
              filter: `drop-shadow(0 0 5px ${participant.color}) brightness(1.1)`,
            }"
          >
            🐎
          </i>
          <div>
            {{ participant.name }}
          </div>
        </div>
      </template>
    </RaceTrack>
    <RaceRoundsInfo
      class="race-view__schedule"
      title="Program"
      :race-round-details="raceSchedule"
      :activeRoundIndex="currentRoundIndex"
    />
    <RaceRoundsInfo
      class="race-view__results"
      title="Results"
      :race-round-details="displayableRaceResults"
      :activeRoundIndex="displayableRaceResults.length - 1"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRaceStore } from '@/stores/race'
import { getRoundTitle } from '@/utils/race'
import type { RaceConfig } from '@/types/race'

import RaceHeader from '@/components/race/RaceHeader.vue'
import RaceParticipants from '@/components/race/RaceParticipants.vue'
import RaceTrack from '@/components/race/RaceTrack.vue'
import RaceRoundsInfo from '@/components/race/RaceRoundsInfo.vue'

const raceStore = useRaceStore()
const { initRace, pauseRace } = raceStore
const { raceSchedule, raceResults, participantsById, currentRoundIndex } = storeToRefs(raceStore)

const RACE_CONFIG: RaceConfig = {
  totalParticipants: 20,
  totalRounds: 6,
  participantsPerRound: 10,
  title: 'Horse',
  distanceBase: 1000,
  distanceIncreaseStep: 200,
}

onMounted(() => {
  initRace(RACE_CONFIG)
})

onBeforeUnmount(() => {
  pauseRace()
})

const displayableRaceResults = computed(() =>
  raceResults.value.map((roundResults, roundIndex) => {
    const roundDetails = raceSchedule.value[roundIndex]
    const sortedParticipants = roundResults
      .map(({ participantId, finishTick }) => ({
        participantDetails: participantsById.value[participantId],
        finishTick,
      }))
      .sort((a, b) => a.finishTick - b.finishTick)
    return {
      ...roundDetails,
      roundTitle: getRoundTitle(roundDetails),
      participants: sortedParticipants.map(({ participantDetails }) => participantDetails),
    }
  }),
)
</script>

<style lang="scss" scoped>
.race-view {
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: 360px 1fr 275px 275px;
  grid-template-areas:
    'header header header header'
    'list track schedule results';
  height: 100vh;
  gap: $spacing-md;
  padding: $spacing-md;
  &__horse {
    line-height: 1;
    > i {
      font-size: 60px;
      transform: scaleX(-1);
      display: inline-block;
    }
  }
  &__schedule {
    grid-area: schedule;
  }
  &__results {
    grid-area: results;
  }
}
</style>
