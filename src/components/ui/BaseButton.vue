<template>
  <button
    class="base-button"
    :class="[props.variant && `base-button--${props.variant}`]"
    :disabled="props.disabled"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script lang="ts" setup>
const props = defineProps<{
  variant?: 'primary' | 'danger'
  disabled?: boolean
}>()

defineEmits(['click'])
</script>

<style lang="scss" scoped>
.base-button {
  padding: $spacing-sm $spacing-md;
  border-radius: 4px;
  font-weight: bold;
  border: 1px solid $color-border;
  background: $color-white;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: $color-bg-light;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  &--primary,
  &--danger {
    color: $color-white;
    border: none;
  }
  &--primary {
    background: $color-primary;
  }

  &--danger {
    background: $color-accent;
  }
}
</style>
