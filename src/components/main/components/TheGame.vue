<template>
  <div class="the-game">
    <img :src="mainState.state.logo.value" class="logo" :alt="mainState.state.h1.value">

    <div class="info">
      <div class="score">
        Вы набрали: <span>{{ score }} баллов</span>
      </div>
      <button
        :class="['shuffle-btn', { 'shuffle-btn-disabled' : refreshCounter >= 3 }]"
        :disabled="refreshCounter >= 3"
        @click="refreshField"
      >
        <img class="btn-icon" srcset="/img/main/shuffle-icon.png, /img/main/shuffle-icon@2x.png 2x" alt="shuffle">
        <span class="btn-text">Перемешать</span>
      </button>
      <div class="timer">
        {{ `${'0' + time.minutes}:${time.seconds < 10 ? '0' + time.seconds : time.seconds}` }}
      </div>
    </div>

    <div class="field">
      <div
        v-for="(item, i) in checkers"
        :key="i"
        :class="[
          'item',
          {
            '_dragging': checkerBeingDragged?.x === item.x && checkerBeingDragged?.y === item.y,
            '_deleted': item.deleted,
            '_not-move': item.notMove,
          }
        ]"
        :style="{ backgroundImage: `url('${item.name}')` }"
        @click="clickHandler(item)"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { mainState } from '@/store/data';
import { time } from '@/composibles/timer';
import { popState } from '@/store/popup';
import {
  checkers,
  fieldRows,
  fieldColumns,
  score,
  refreshCounter,
  generateField,
  destroyer as separator,
} from '@/composibles/gameFieldGenerate';

const checkerBeingDragged = ref(null);
const indexOfCheckerBeingDragged = computed(() => checkers.value.indexOf(checkers.value.find((el) => el.x === checkerBeingDragged.value.x && el.y === checkerBeingDragged.value.y)));

const checkerBeingReplace = ref(null);
const indexOfCheckerBeingReplace = computed(() => checkers.value.indexOf(checkers.value.find((el) => el.x === checkerBeingReplace.value.x && el.y === checkerBeingReplace.value.y)));

const setScores = (scores, hasRat) => {
  let newScore;

  switch (scores) {
    case 3:
      newScore = 30;
      break;
    case 4:
      newScore = 50;
      break;
    case 5:
      newScore = 100;
      break;
    default:
      newScore = 100;
  }

  if (!popState.isClosedFromButton) {
    if (!hasRat && score.value + newScore <= mainState.state.maxPossibleScore.value) {
      score.value += newScore;
    } else if (!hasRat && score.value + newScore > mainState.state.maxPossibleScore.value) {
      score.value = mainState.state.maxPossibleScore.value;
    } else if (hasRat && score.value) {
      score.value -= newScore;
    }
  }
};

// проходится по полю и уничтожает все линии
const lineDestroyer = (arr) => {
  let miniArr = [];

  arr.forEach((el, i) => {
    if (!miniArr.length) {
      miniArr.push(el);
    } else {
      const last = miniArr[miniArr.length - 1];

      if (last.name === el.name) {
        miniArr.push(el);

        if (miniArr.length >= 3 && i === arr.length - 1) {
          separator(miniArr, checkLinesCanBeDestroyed);
          setScores(miniArr.length);
          miniArr = [];
        }
      } else if (last.name !== el.name && miniArr.length < 3) {
        miniArr = [el];
      } else if (miniArr.length >= 3) {
        separator(miniArr, checkLinesCanBeDestroyed);
        setScores(miniArr.length);
        miniArr = [];
      }
    }
  });

  miniArr = [];
};

const checkLinesCanBeDestroyed = () => {
  fieldRows.value.forEach((subArr) => {
    lineDestroyer(subArr);
  });

  fieldColumns.value.forEach((sub) => {
    lineDestroyer(sub);
  });
};

const refreshField = () => {
  generateField();
  setTimeout(() => {
    checkLinesCanBeDestroyed();
  }, 910);
  refreshCounter.value += 1;
};

// eslint-disable-next-line consistent-return
const checkValid = (rowEquals, columnEquals, row2Equals, column2Equals, x1, x2, y1, y2, name1, name2) => {
  if (rowEquals.length < 2 && columnEquals.length < 2 && row2Equals.length < 2 && column2Equals.length < 2) {
    return false;
  }

  // TODO это дно когда-нибудь нужно поменять на что-то более джентельменское. Возможно не в этой механике, и даже не в этой жизни
  if (rowEquals.length >= 2 && rowEquals.some((el) => el.x === x2 - 1 || el.x === x2 + 1)) {
    const coords = rowEquals.map((coord) => coord.x);

    if (coords.some((coord) => coord === x2 + 1) && coords.some((coord) => coord === x2 - 1)) {
      return true;
    }

    if (coords.some((coord) => coord === x2 + 1) && coords.some((coord) => coord === x2 + 2)) {
      return true;
    }

    if (coords.some((coord) => coord === x2 - 1) && coords.some((coord) => coord === x2 - 2)) {
      return true;
    }
  }

  if (row2Equals.length >= 2 && row2Equals.some((el) => el.x === x1 - 1 || el.x === x1 + 1)) {
    const coords = row2Equals.map((coord) => coord.x);

    if (coords.some((coord) => coord === x1 + 1) && coords.some((coord) => coord === x1 - 1)) {
      return true;
    }

    if (coords.some((coord) => coord === x1 + 1) && coords.some((coord) => coord === x1 + 2)) {
      return true;
    }

    if (coords.some((coord) => coord === x1 - 1) && coords.some((coord) => coord === x1 - 2)) {
      return true;
    }
  }

  if (columnEquals.length >= 2 && columnEquals.some((el) => el.y === y2 - 1 || el.y === y2 + 1)) {
    const coords = columnEquals.map((coord) => coord.y);

    if (coords.some((coord) => coord === y2 + 1) && coords.some((coord) => coord === y2 - 1)) {
      return true;
    }

    if (coords.some((coord) => coord === y2 + 1) && coords.some((coord) => coord === y2 + 2)) {
      return true;
    }

    if (coords.some((coord) => coord === y2 - 1) && coords.some((coord) => coord === y2 - 2)) {
      return true;
    }
  }

  if (column2Equals.length >= 2 && column2Equals.some((el) => el.y === y1 - 1 || el.y === y1 + 1)) {
    const coords = column2Equals.map((coord) => coord.y);

    if (coords.some((coord) => coord === y1 + 1) && coords.some((coord) => coord === y1 - 1)) {
      return true;
    }

    if (coords.some((coord) => coord === y1 + 1) && coords.some((coord) => coord === y1 + 2)) {
      return true;
    }

    if (coords.some((coord) => coord === y1 - 1) && coords.some((coord) => coord === y1 - 2)) {
      return true;
    }
  }

  return false;
};

// eslint-disable-next-line consistent-return
const clickHandler = (item) => {
  if (!checkerBeingDragged.value) {
    checkerBeingDragged.value = item;
  } else {
    const { x: x1, y: y1, name: name1 } = checkerBeingDragged.value;
    const { x: x2, y: y2, name: name2 } = item;
    let validMove;

    if (((x2 === x1 + 1 || x2 === x1 - 1) && y2 === y1) || ((y2 === y1 + 1 || y2 === y1 - 1) && x2 === x1)) {
      // строка и столбец для новой координаты
      const rowEquals = fieldRows.value.filter((rowArr) => rowArr[0].y === y2)[0]
        .filter((rowItem) => rowItem.name === name1 && rowItem.x !== x1);
      const columnEquals = fieldColumns.value.filter((rowArr) => rowArr[0].x === x2)[0]
        .filter((columnItem) => columnItem.name === name1 && columnItem.y !== y1);

      // строка и столбец для координаты, откуда перемещаем
      const row2Equals = fieldRows.value.filter((rowArr) => rowArr[0].y === y1)[0]
        .filter((row2Item) => row2Item.name === name2 && row2Item.x !== x2);
      const column2Equals = fieldColumns.value.filter((rowArr) => rowArr[0].x === x1)[0]
        .filter((column2Item) => column2Item.name === name2 && column2Item.y !== y2);

      validMove = checkValid(rowEquals, columnEquals, row2Equals, column2Equals, x1, x2, y1, y2, name1, name2);
    }

    if (validMove) {
      // записываем заменяемую шашку
      checkerBeingReplace.value = item;

      // меняем поля name для шашек
      checkers.value[indexOfCheckerBeingReplace.value].deleted = true;
      checkers.value[indexOfCheckerBeingReplace.value].name = checkerBeingDragged.value.name;
      checkers.value[indexOfCheckerBeingDragged.value].name = name2;

      checkLinesCanBeDestroyed();

      // сбрасываем взятую и заменяемую шашки
      setTimeout(() => {
        checkers.value[indexOfCheckerBeingReplace.value].deleted = false;
        checkerBeingDragged.value = null;
        checkerBeingReplace.value = null;
      }, 700);
    } else {
      const dragged = checkers.value[indexOfCheckerBeingDragged.value];
      dragged.notMove = true;
      checkerBeingDragged.value = null;

      // eslint-disable-next-line no-return-assign
      setTimeout(() => dragged.notMove = false, 200);
    }
  }
};

watch(() => popState.name, (val) => {
  if (!val) checkLinesCanBeDestroyed();
});
</script>

<style lang="scss" scoped>
.the-game {
  width: 680px;

  .logo {
    display: none;
  }

  .info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 26px;

    .score,
    .timer {
      padding: 13px 20px;
      background: #fff;
      font-size: 20px;
      line-height: 20px;
      color: #1D1D1B;
    }

    .score > span,
    .timer {
      font-weight: bold;
    }

    .shuffle-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 207px;
      height: 46px;
      background: linear-gradient(0deg, #75CDFE, #75CDFE);
      cursor: pointer;

      .btn-icon {
        display: none;
      }

      .btn-text {
        font-size: 20px;
        line-height: 20px;
      }
    }
  }

  .field {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
    grid-gap: 20px;
    width: 100%;
    height: 680px;

    .item {
      cursor: pointer;
      background-position: center;
      background-repeat: no-repeat;
      background-color: transparent;
      background-size: contain;
      transition: all .25s;
      border: 1px solid #444;
      border-radius: 4px;

      &._replaced {
        transform: scale(1.1);
        box-shadow: 0 0 20px green;
        transition: all .2s;
      }

      &._deleted {
        opacity: .5;
        transform: scale(0) rotate(500deg);
        background-image: url('https://cdn.dribbble.com/users/518045/screenshots/2703062/dribbble_inkassacia_4.png') !important;
        transition: all .5s;
      }

      &._dragging {
        transform: scale(.8);
        box-shadow: 0 0 15px darkslateblue;
        transition: all .2s;
      }

      &._not-move {
        transform: rotate(15deg);
        box-shadow: 0 0 55px red;
        transition: all .2s;
      }
    }
  }
}

@media screen and (max-width: 1180px) {
  .the-game {
    width: 550px;

    .field {
      height: 550px;
    }
  }
}

@media screen and (max-width: 1000px) {
  .the-game {
    width: 600px;
    margin: 0 auto 50px;

    .logo {
      display: block;
      max-height: 100px;
      width: auto;
      margin-bottom: 20px;
    }
  }
}

@media screen and (max-width: 640px) {
  .the-game {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;

    .info {
      .shuffle-btn {
        width: 46px;
        height: 46px;

        .btn-icon {
          display: block;
        }

        .btn-text {
          display: none;
        }

        &-disabled {
          opacity: .6;
        }
      }
    }

    .field {
      grid-gap: 10px;
    }
  }
}

@media screen and (max-width: 450px) {
  .the-game {
    height: 480px;

    .info {
      margin-bottom: 26px;

      .score,
      .timer {
        padding: 10px;
        font-size: 16px;
        line-height: 18px;
        color: #1D1D1B;
      }

      .shuffle-btn {
        width: 38px;
        height: 38px;
      }
    }

    .field {
      height: 100%;
    }
  }
}
</style>
