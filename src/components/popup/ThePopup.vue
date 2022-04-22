<template>
  <div class="the-popup">
    <div class="content">
      <button v-if="popState.name !== 'LeavePopup'" class="close" @click="closeHandler" />

      <HelloPopup v-if="popState.name === 'HelloPopup'" @start-game="manageGame" />
      <LeavePopup v-if="popState.name === 'LeavePopup'" />
      <TimePopup v-if="popState.name === 'TimePopup'" @repeat="manageGame" />
    </div>
  </div>
</template>

<script setup>
import { popMethods, popState } from '@/store/popup';
import startTimer, { resetTime } from '@/composibles/timer';
import { score, generateField, refreshCounter } from '@/composibles/gameFieldGenerate';

import HelloPopup from './components/HelloPopup.vue';
import LeavePopup from './components/LeavePopup.vue';
import TimePopup from './components/TimePopup.vue';

const manageGame = (arg) => {
  if (arg === 'restartGame') {
    refreshCounter.value = 0;
    score.value = 0;
    resetTime();
    popMethods.setPopupData(null);
    generateField();
  }

  startTimer(() => popMethods.setPopupName(score.value ? 'HelloPopup' : 'TimePopup'));

  popMethods.setPopupName('');
};

const closeHandler = () => {
  if (popState.name === 'HelloPopup') {
    manageGame('start');
  } else {
    popMethods.setIsClosedFromButton(true);
    popMethods.setPopupName('');
  }
};
</script>

<style lang="scss" scoped>
.the-popup {
  overflow-y: scroll;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 100vw;
  min-height: 100vh;
  padding: 20px;
  background: rgba(236, 233, 230, .3);
  backdrop-filter: blur(5px);

  .content {
    position: relative;
    min-width: 320px;
    width: 760px;
    background: #fff;
    box-shadow: 0 0 5px #444;

    .close {
      position: absolute;
      top: 15px;
      right: 15px;
      width: 42px;
      height: 42px;
      border-radius: 50%;
      background: url("/img/popup/close.svg") center no-repeat;
      background-size: cover;
    }
  }
}

@media screen and (max-width: 800px) {
  .the-popup {
    padding: 20px 15px;

    .content {
      width: 500px;
    }
  }
}

@media screen and (max-width: 540px) {
  .the-popup {
    .content {
      width: 100%;

      .close {
        top: 5px;
        right: 5px;
        width: 30px;
        height: 30px;
      }
    }
  }
}
</style>
