<template>
  <div
    data-testid="round-details"
    class="round-details"
    :class="{
      'round-details--active': props.active,
    }"
  >
    <BaseTable>
      <caption class="round-details__label">
        {{
          getRoundTitle(props.roundDetails)
        }}
      </caption>
      <thead>
        <tr>
          <th scope="col">Position</th>
          <th scope="col">Name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(participant, index) in props.roundDetails.participants" :key="participant.id">
          <td>{{ index + 1 }}</td>
          <td>{{ participant.name }}</td>
        </tr>
      </tbody>
    </BaseTable>
  </div>
</template>

<script setup lang="ts">
import type { RoundDetails } from '@/types/race'
import { getRoundTitle } from '@/utils/race'

import BaseTable from '../ui/BaseTable.vue'

const props = defineProps<{
  roundDetails: RoundDetails
  active: boolean
}>()
</script>

<style scoped lang="scss">
.round-details {
  &__label {
    color: $color-text-muted;
    font-weight: bold;
    padding: $spacing-xs $spacing-sm;
    text-align: center;
  }
  &--active &__label {
    background: $color-accent;
    color: $color-white;
  }
}
</style>
