import { Howl } from "howler";

const controllerModule = {
  namespaced: true,
  state: {
    months: [
      "Jan",
      "Feb",
      "March",
      "April",
      "May",
      "June",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ],
    currentSong: "",
    headerBtn: false,
  },
  mutations: {
    showHeaderBtn(state) {
      state.headerBtn = true;
    },
    closeHeaderBtn(state) {
      state.headerBtn = false;
    },
  },
  actions: {
    showHeaderBtn({ commit }) {
      commit("showHeaderBtn");
    },
    closeHeaderBtn({ commit }) {
      commit("closeHeaderBtn");
    },
  },
  getters: {
    getHeaderBtn(state) {
      return state.headerBtn;
    },
    getMonths(state) {
      return state.months;
    },
  },
};

export default controllerModule;
