import { reactive } from 'vue';

const state = reactive({
  name: 'HelloPopup',
  data: null,
  isClosedFromButton: false,
});

const methods = {
  setPopupName(payload) {
    state.name = payload;
  },
  setPopupData(payload) {
    state.data = payload;
  },
  setIsClosedFromButton(payload) {
    state.isClosedFromButton = payload;
  },
};

export { state as popState, methods as popMethods };
