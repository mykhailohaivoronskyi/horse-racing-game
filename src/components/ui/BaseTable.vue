<template>
  <table class="base-table">
    <slot />
  </table>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
@use 'sass:color';

.base-table {
  width: 100%;
  border-collapse: collapse;
  background-color: $color-white;
  font-size: $font-size-base;
  color: $color-text-dark;

  :slotted(th),
  :slotted(td) {
    padding: $spacing-sm $spacing-md;
    text-align: left;
    border: 1px solid $color-border;
  }

  :slotted(th) {
    background-color: $color-primary;
    color: $color-white;
    font-weight: $font-weight-bold;
    font-size: $font-size-sm;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  :slotted(tbody) {
    tr {
      &:hover {
        background-color: color.adjust($color-bg-light, $lightness: 5%);
      }
      &:nth-child(even) {
        background-color: $color-bg-light;
      }
    }
  }

  &--compact {
    :slotted(th),
    :slotted(td) {
      padding: $spacing-xs $spacing-sm;
      font-size: $font-size-sm;
    }
  }

  &--borderless {
    :slotted(th),
    :slotted(td) {
      border: none;
    }
  }

  &--striped {
    :slotted(tbody) {
      tr:nth-child(even) {
        background-color: $color-bg-light;
      }
    }
  }
}
</style>
