import { reactive } from 'vue';
import { mainState } from '@/store/data';

let interval;
let callbackMethod;

export const time = reactive({
  minutes: 0,
  seconds: 0,
});

export const resetTime = () => {
  time.minutes = mainState.state.timeMinutes.value;
  time.seconds = mainState.state.timeSeconds.value;
};

export const pauseTimer = () => {
  clearInterval(interval);
  interval = undefined;
};

export default function startTimer(callback) {
  if (!callbackMethod) {
    // кэшируем коллбэк для использования при его отсутствии в аргументе
    callbackMethod = callback || (() => console.log('null callback'));
  }
  interval = setInterval(() => {
    if (!time.minutes && !time.seconds) {
      clearInterval(interval);

      if (callback && typeof callback === 'function') {
        callback();
      } else {
        callbackMethod();
      }
    } else if (time.minutes && !time.seconds) {
      time.minutes -= 1;
      time.seconds = 59;
    } else {
      time.seconds -= 1;
    }
  }, 1000);
}
