import { computed, ref } from 'vue';

export const names = ref([]);

const fakeNames = computed(() => ([
  Math.random() >= 0.5 ? names.value[0] : names.value[1],
  Math.random() >= 0.5 ? names.value[2] : names.value[3],
  Math.random() >= 0.3 ? names.value[4] : names.value[5],
  Math.random() >= 0.3 ? names.value[2] : names.value[1],
]));

const width = 5;
const height = 5;
const items = ref([]);
const score = ref(0);
const refreshCounter = ref(0);

const separator = (ident, os) => {
  let counter = 1;
  const total = [];

  while (counter <= ident) {
    // eslint-disable-next-line no-loop-func
    const neutral = items.value.filter((el) => el[os] === counter);

    total.push(neutral);
    counter++;
  }

  return total;
};

const getName = (flag) => {
  return flag
    ? names.value[Math.floor(Math.random() * names.value.length)]
    : fakeNames.value[Math.floor(Math.random() * fakeNames.value.length)];
};

const generateField = () => {
  items.value = [];

  for (let y = 1; y <= width; y++) {
    for (let x = 1; x <= height; x++) {
      items.value.push({
        name: getName('init'),
        x,
        y,
      });
    }
  }
};

const getFieldRows = computed(() => separator(width, 'y'));
const getFieldColumns = computed(() => separator(height, 'x'));

const destroyer = (array, callback) => {
  setTimeout(() => {
    array.forEach((prox) => {
      items.value[items.value.indexOf(prox)].deleted = true;
    });
  }, 200);

  setTimeout(() => {
    array.forEach((prox) => {
      items.value[items.value.indexOf(prox)].name = getName();
    });
  }, 350);

  setTimeout(() => {
    array.forEach((prox) => {
      items.value[items.value.indexOf(prox)].deleted = false;
    });
  }, 900);

  setTimeout(() => {
    callback();
  }, 950);
};

export {
  items as checkers,
  getFieldRows as fieldRows,
  getFieldColumns as fieldColumns,
  score,
  refreshCounter,
  getName,
  destroyer,
  generateField,
};
