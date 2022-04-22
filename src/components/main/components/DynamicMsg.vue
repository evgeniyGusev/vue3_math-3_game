<template>
  <div class="container">
    <div class="msg-wrapper">
      <p
        v-html="props.msg"
      />
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  msg: {
    type: String,
    default: 'Упс! кажется, что-то пошло не так...',
  },
});
</script>

<style scoped lang="scss">
.container {
  height: 350px;
  .msg-wrapper {
    position: relative;
    max-width: 450px;
    height: fit-content;
    padding: 15px 40px 15px 90px;
    background: #ffffff;
    border-radius: 20px;
    box-shadow: 0px 0px 27px 8px rgba(34, 60, 80, 0.26);

    &::before {
      content: '';
      position: absolute;
      bottom: -40px;
      left: 220px;
      display: inline-block;
      width: 0;
      height: 0;
      border-bottom-right-radius: 5px;
      border-style: solid;
      border-width: 0 80px 45px 0;
      border-color: transparent #ffffff transparent transparent;
      box-shadow: 59px 0px 27px -36px rgba(34, 60, 80, 0.34);
    }

    &::after {
      content: '';
      position: absolute;
      top: 5px;
      left: 7px;
      width: 66px;
      height: 75px;
      background-image: url('/img/main/info/lamp.png');
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
    }

    p {
      font-size: 20px;
      line-height: 30px;
      color: #2B2B2B;
      font-family: 'HelveticaNeueCyr', sans-serif;
    }
  }
}

@media screen and (max-width: 768px){
.container {
  display: flex;
  justify-content: center;
  height: 260px;
  .msg-wrapper {
    max-width: 660px;
    width: 90%;
    &:before {
      left: 430px;
    }
  }
}
}
@media screen and (max-width: 626px){
  .container {
    height: 240px;
    .msg-wrapper {
      max-width: 450px;
      width: 90%;
      padding: 20px 15px 25px 90px;
      &:before {
        left: 190px;
      }
      p {
        font-size: 16px;
        line-height: 21px;
      }
    }
  }
}

@media screen and (max-width: 450px){
  .container {
    margin-bottom: 75px;
    .msg-wrapper {
      padding: 15px 15px 10px 90px;
    }
  }
}
</style>
