<template>
  <div class="race-controls">
    <BaseButton
      data-testid="generate-schedule-button"
      @click="generateRaceSchedule"
      :disabled="isRunning"
      >Generate Program</BaseButton
    >
    <BaseButton
      data-testid="run-button"
      @click="isRunning ? pauseRace() : startRace()"
      :disabled="isRaceFinished"
    >
      {{ isRunning ? 'Pause' : 'Start' }}</BaseButton
    >
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useRaceStore } from '@/stores/race'

import BaseButton from '../ui/BaseButton.vue'

const raceStore = useRaceStore()
const { isRunning, isRaceFinished } = storeToRefs(raceStore)
const { generateRaceSchedule, startRace, pauseRace } = raceStore
</script>

<style scoped lang="scss">
.race-controls {
  display: flex;
  gap: $spacing-md;
}
</style>
