<template>
  <BaseCard class="race-track" :title="roundTitle">
    <div class="race-track__content">
      <div
        v-memo="[currentRoundProgress[index], participant.color, participant.name]"
        class="race-track__lane"
        v-for="(participant, index) in currentRoundParticipants"
        :key="participant.id"
      >
        <span class="race-track__lane-number">{{ index + 1 }}</span>
        <div
          class="race-track__participant"
          :style="{
            transform: `translateX(${currentRoundProgress[index]}cqw)`,
          }"
        >
          <slot name="icon" :participant="participant"> No Participant </slot>
        </div>
      </div>
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

import { useRaceStore } from '@/stores/race'
import { getRoundTitle } from '@/utils/race'

import BaseCard from '../ui/BaseCard.vue'

const raceStore = useRaceStore()

const { currentRoundDetails, currentRoundProgress, currentRoundParticipants } =
  storeToRefs(raceStore)
const roundTitle = computed(() => getRoundTitle(currentRoundDetails.value))
</script>

<style scoped lang="scss">
.race-track {
  grid-area: track;
  position: relative;
  background: $color-bg-light;
  padding-right: 0;
  border-right: 2px solid $color-accent;
  &::before {
    content: '🏁';
    position: absolute;
    top: 0;
    right: 0;
    font-size: 1.5rem;
  }
  &__content {
    flex: 1;
    overflow-y: auto;
  }
  &__lane {
    position: relative;
    height: 80px;
    flex: 0 0 80px;
    border-top: 1px dashed $color-border;
    display: flex;
    align-items: center;
    overflow: hidden;
    container-type: size;
  }
  &__lane-number {
    @extend .text-subheading;
    z-index: +1;
    width: 2rem;
    color: $color-white;
    background: $color-green;
    text-align: center;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__participant {
    position: absolute;
    margin-left: $spacing-xl;
    will-change: transform;
  }
}
</style>
