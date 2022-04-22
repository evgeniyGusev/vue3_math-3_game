<template>
  <div class="leave-popup">
    <div class="content">
      <div class="title-yellow">
        НЕ УХОДИТЕ
      </div>
      <div class="text">
        Вы уверены, что хотите закончить игру?<br>Ваши баллы сгорят!
      </div>
      <TheButton @click="continueGame">
        Продолжить игру
      </TheButton>
    </div>
  </div>
</template>

<script setup>
import startTimer from '@/composibles/timer';
import { popMethods } from '@/store/popup';
import { mainState } from '@/store/data';
import TheButton from '@/components/general/TheButton.vue';

const continueGame = () => {
  popMethods.setPopupName('');
  startTimer();
};
</script>

<style lang="scss" scoped>
.leave-popup {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 45px;

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 35px 10px;
    border: 1px solid #000;
    background: #fff;
    text-align: center;

    .text {
      margin-bottom: 22px;
      font-size: 20px;
      line-height: 149.49%;
    }

    .the-button {
      padding: 19px 0;
    }
  }
}
</style>
