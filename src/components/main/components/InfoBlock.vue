<template>
  <div class="info-wrapper">
    <div class="text-wrapper">
      <picture>
        <img :src="mainState.state.logo.value" class="logo" :alt="mainState.state.h1.value">
      </picture>
      <h4 class="title" v-html="mainState.state.h1.value"/>
      <p class="subtitle" v-html="mainState.state.description.value"/>
    </div>
  </div>
</template>

<script setup>
import { mainState } from '@/store/data';
</script>

<style scoped lang="scss">
.info-wrapper {
  display: flex;
  flex-direction: column;
  width: 45%;
  margin-right: 20px;

  .text-wrapper {
    width: 100%;

    .logo {
      max-width: 50%;
      height: auto;
      margin-bottom: 30px;
    }

    .title{
      margin-bottom: 20px;
      text-transform: uppercase;
      font-family: 'PF Din Text Comp Pro', sans-serif;
      font-size: 60px;
      line-height: 72px;
    }

    .subtitle {
      margin-bottom: 60px;
      font-family: 'HelveticaNeueCyr', sans-serif;
      font-weight: 400;
      font-size: 24px;
      line-height: 32px;
    }
  }
}

@media screen and (max-width: 1000px) {
  .info-wrapper {
    width: 100%;

    align-items: center;
    .text-wrapper {
      display: none;
    }
  }
}
</style>
