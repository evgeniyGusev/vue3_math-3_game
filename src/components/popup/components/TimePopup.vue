<template>
  <div class="time-popup">
    <div class="title-yellow">
      ВРЕМЯ ВЫШЛО
    </div>
    <div class="text">
      Вы не успели набрать баллы.<br>
      Попробуете еще раз?
    </div>
    <TheButton @click="emit('repeat', 'restartGame')">
      Сыграть еще раз
    </TheButton>
    <a :href="mainState.state.gameRulesLink.value" class="rules" target="_blank">
      Правила акции
    </a>
  </div>
</template>

<script setup>
import { defineEmits } from 'vue';
import { mainState } from '@/store/data';
import TheButton from '@/components/general/TheButton.vue';

const emit = defineEmits(['repeat']);
</script>

<style lang="scss" scoped>
.time-popup {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 25px 0;
  text-align: center;

  .image {
    margin-bottom: 8px;
  }

  .text {
    margin-bottom: 20px;
    font-size: 20px;
    line-height: 150%;
  }

  .the-button {
    margin-bottom: 20px;
    padding: 18px 0;
  }
}

@media screen and (max-width: 420px) {
  .time-popup {
    .title-yellow {
      width: 215px;
      font-size: 33px;
    }

    .image {
      margin-bottom: 8px;
    }

    .text {
      margin-bottom: 15px;
      font-size: 16px;
    }

    .the-button {
      padding: 16px 0;
      font-size: 24px;
    }
  }
}
</style>
