<template>
  <div class="race-header">
    <span class="race-header__title">{{ raceConfig.title }} Racing</span>
    <RaceControls />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useRaceStore } from '@/stores/race'
import RaceControls from './RaceControls.vue'

const raceStore = useRaceStore()
const { raceConfig } = storeToRefs(raceStore)
</script>

<style lang="scss" scoped>
.race-header {
  grid-area: header;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: $spacing-md;
  background: $color-primary;
  border-bottom: 1px solid $color-border;
  &__title {
    @extend .text-heading;
  }
}
</style>
