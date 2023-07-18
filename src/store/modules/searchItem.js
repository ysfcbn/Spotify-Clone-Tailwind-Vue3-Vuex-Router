const searchItemModule = {
  namespaced: true,
  state: {
    searchItem: "",
    types: ["album", "artist", "playlist", "track", "show", "episode"],
    searchResultArr: null,
  },
  mutations: {
    searchItem(state, payload) {
      state.searchItem = payload;
    },
    searchResultArr(state, payload) {
      state.searchResultArr = payload;
    },
  },
  actions: {
    async searchItem({ commit }, payload) {
      commit("searchItem", await payload);
    },
    async searchResultArr({ commit }, payload) {
      commit("searchResultArr", await payload);
    },
  },
  getters: {
    getSearchItem(state) {
      return state.searchItem;
    },
    getTypes(state) {
      return state.types;
    },
    getSearchResultArr(state) {
      return state.searchResultArr;
    },
  },
};

export default searchItemModule;
