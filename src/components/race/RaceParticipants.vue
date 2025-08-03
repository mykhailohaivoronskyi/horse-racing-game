<template>
  <BaseCard class="race-participants" :title="raceParticipantsTitle">
    <BaseTable class="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Condition</th>
          <th>Color</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="participant in participantsById" :key="participant.id">
          <td>{{ participant.name }}</td>
          <td>{{ participant.condition }}</td>
          <td>
            <span
              class="race-participants__color-indicator"
              :style="{ backgroundColor: participant.color }"
              :title="participant.color"
            />
          </td>
        </tr>
      </tbody>
    </BaseTable>
  </BaseCard>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

import { useRaceStore } from '@/stores/race'
import BaseTable from '../ui/BaseTable.vue'
import BaseCard from '../ui/BaseCard.vue'

const raceStore = useRaceStore()
const { participantsById, raceConfig } = storeToRefs(raceStore)

const totalParticipants = computed(() => Object.keys(participantsById.value).length)
const raceParticipantsTitle = computed(
  () => `${raceConfig.value.title} List (${totalParticipants.value})`,
)
</script>

<style scoped lang="scss">
.race-participants {
  grid-area: list;
  &__color-indicator {
    display: inline-block;
    width: 12px;
    height: 12px;
    margin-right: $spacing-xs;
    border-radius: 50%;
    vertical-align: middle;
    border: 1px solid $color-border;
  }
}
</style>
