<template>
  <button class="app-button" :disabled="disabled" @click="$emit('click')">
    <slot />
  </button>
</template>

<script setup>
import { defineEmits, defineProps } from 'vue';

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['click']);
</script>

<style lang="scss" scoped>
.app-button {
  width: 300px;
  padding: 16px 0;
  border: 1px solid black;
  font-family: "PF Din Text Comp Pro", sans-serif;
  font-size: 36px;
  color: #000;
  transition: all .2s;

  &:disabled {
    opacity: .5;
    cursor: not-allowed;
  }
}
</style>
