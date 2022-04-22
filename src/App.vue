<template>
  <div :id="mainState.state.theme.value">
    <TheMain />
    <TheFooter />
    <ThePopup v-if="popState.name" />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { time, pauseTimer } from '@/composibles/timer';
import { popState, popMethods } from '@/store/popup';
import { mainState, mainMethods } from '@/store/data';
import { names, generateField } from '@/composibles/gameFieldGenerate';
import data from '@/mock/data';
import TheMain from '@/components/main/TheMain.vue';
import TheFooter from '@/components/footer/TheFooter.vue';
import ThePopup from '@/components/popup/ThePopup.vue';

mainMethods.setState(data);
names.value = mainState.state.tiles.value;
time.minutes = mainState.state.timeMinutes.value;
time.seconds = mainState.state.timeSeconds.value;
generateField();

onMounted(() => {
  document.addEventListener('mouseleave', () => {
    if (!popState.name) {
      popMethods.setPopupName('LeavePopup');
      pauseTimer();
    }
  });
});
</script>

<style lang="scss">
</style>
