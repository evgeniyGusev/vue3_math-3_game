<template>
  <div class="hello-popup">
    <div class="title" v-html="content.title" />
    <div class="text" v-html="content.text" />

    <TheButton @click="startGame">
      {{ content.button }}
    </TheButton>
  </div>
</template>

<script setup>
import { computed, ref, defineEmits } from 'vue';
import TheButton from '@/components/general/TheButton.vue';
import { mainState } from '@/store/data';

const emit = defineEmits(['start-game']);
const step = ref(1);
const content = computed(() => ({
  title: mainState.state.helloPopupContent.title.value,
  text: mainState.state.helloPopupContent.description.value,
  button: 'Играть!',
}));

const startGame = () => {
  emit('start-game', 'start');
};
</script>

<style lang="scss" scoped>
.hello-popup {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 40px 20px;
  text-align: center;

  .title {
    margin-bottom: 15px;
    font-family: "PF Din Text Comp Pro", sans-serif;
    font-size: 60px;
    line-height: 1;
    text-transform: uppercase;
  }

  .text {
    margin-bottom: 40px;
    font-size: 20px;
    line-height: 28px;
  }

  .picture {
    max-width: 450px;
    margin-bottom: 25px;

    img {
      max-height: 280px;
    }
  }

  .link {
    margin-top: 8px;
    font-size: 16px;
    line-height: 28px;
  }
}

@media screen and (max-width: 800px) {
  .hello-popup {
    width: 100%;
    padding: 35px 15px 10px;

    .title {
      font-size: 40px;
      line-height: 40px;
    }

    .text {
      margin-bottom: 20px;
      font-size: 16px;
      line-height: 24px;
    }

    .picture {
      width: 320px;

      img {
        width: 320px;
      }
    }

    .the-button {
      width: 240px;
      height: 60px;
      padding: 13px 0;
      font-size: 30px;
    }
  }
}

@media screen and (max-width: 500px) {
  .hello-popup {
    .title {
      font-size: 32px;
      line-height: 32px;
    }

    .picture {
      width: 100%;

      img {
        width: 100%;
      }
    }
  }
}
</style>
