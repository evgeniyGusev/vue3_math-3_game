<template>
  <main class="the-main">
    <InfoBlock />
    <TheGame />
  </main>
</template>

<script setup>
import TheGame from './components/TheGame.vue';
import InfoBlock from './components/InfoBlock.vue';
</script>

<style lang="scss" scoped>
.the-main {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1760px;
  margin: 0 auto;
  padding: 90px 30px 50px;
}

@media screen and (max-width: 1760px) {
  .the-main {
    width: 100%;
  }
}

@media screen and (max-width: 1000px) {
  .the-main {
    flex-direction: column-reverse;
    padding: 43px 20px 20px;
  }
}

@media screen and (min-width: 1000px) and (max-height: 860px) {
  .the-main {
    padding-top: 10px;
    transform: translateY(-80px) scale(.8);
  }
}
</style>
