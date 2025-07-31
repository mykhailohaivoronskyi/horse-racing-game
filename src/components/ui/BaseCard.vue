<template>
  <div class="base-card">
    <span v-if="props.title" class="base-card__title">{{ props.title }}</span>
    <div class="base-card__content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title?: string
}>()
</script>

<style scoped lang="scss">
.base-card {
  padding: $spacing-md;
  background: $color-bg-light;
  border: 1px solid $color-border;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  &__title {
    @extend .text-subheading;
    flex: 0 0 auto;
    margin-bottom: $spacing-sm;
    display: inline-block;
  }
  &__content {
    min-width: 0;
    flex: 1;
    overflow-y: auto;
  }
}
</style>
