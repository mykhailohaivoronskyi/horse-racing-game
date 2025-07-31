<template>
  <BaseCard class="race-rounds-info" :title="props.title">
    <RoundDetails
      v-for="(roundDetails, index) in raceRoundDetails"
      :key="roundDetails.roundNumber"
      ref="round-details"
      :roundDetails="roundDetails"
      :active="index === activeRoundIndex"
    />
  </BaseCard>
</template>

<script setup lang="ts">
import { nextTick, useTemplateRef, watch } from 'vue'

import RoundDetails from './RoundDetails.vue'
import type { RaceRoundsDetails } from '@/types/race'
import BaseCard from '../ui/BaseCard.vue'

const props = defineProps<{
  title: string
  raceRoundDetails: RaceRoundsDetails
  activeRoundIndex: number
}>()

const roundDetailsRefs = useTemplateRef('round-details')

watch(
  () => props.activeRoundIndex,
  async (newVal) => {
    await nextTick()
    if (!roundDetailsRefs.value?.[newVal]) {
      return
    }
    roundDetailsRefs.value[newVal].$el.scrollIntoView({
      behavior: 'smooth',
    })
  },
  { immediate: true },
)
</script>
