const genreModule = {
  namespaced: true,
  state: {
    currentCategoryPlaylists: {},
    genreTitle: "",
  },
  mutations: {
    currentCategoryPlaylists(state, payload) {
      state.currentCategoryPlaylists = payload;
    },
    genreTitle(state, payload) {
      state.genreTitle = payload;
    },
  },
  actions: {
    async currentCategoryPlaylists({ commit }, payload) {
      commit("currentCategoryPlaylists", await payload);
    },
    async genreTitle({ commit }, payload) {
      commit("genreTitle", await payload);
    },
  },
  getters: {
    getCurrentCategoryPlaylists(state) {
      return state.currentCategoryPlaylists;
    },
    getGenreTitle(state) {
      return state.genreTitle;
    },
  },
};

export default genreModule;
