const episodeModule = {
  namespaced: true,
  state: {
    favEpisodes: {},
    isFavEpisode: [],
    currentEpisode: [],
    severalEpisodes: [],
    currentEpisodeIsFav: "",
  },
  mutations: {
    favEpisodes(state, payload) {
      state.favEpisodes = payload;
    },
    isFavEpisode(state, payload) {
      state.isFavEpisode = payload;
    },
    currentEpisode(state, payload) {
      state.currentEpisode = payload;
    },
    currentEpisodeIsFav(state, payload) {
      state.currentEpisodeIsFav = payload;
    },
    severalEpisodes(state, payload) {
      state.severalEpisodes = payload;
    },
  },
  actions: {
    async favEpisodes({ commit }, payload) {
      commit("favEpisodes", await payload);
    },
    async isFavEpisode({ commit }, payload) {
      commit("isFavEpisode", await payload);
    },
    async currentEpisode({ commit }, payload) {
      commit("currentEpisode", await payload);
    },
    async currentEpisodeIsFav({ commit }, payload) {
      commit("currentEpisodeIsFav", await payload);
    },
    async severalEpisodes({ commit }, payload) {
      commit("severalEpisodes", await payload);
    },
  },
  getters: {
    getFavEpisodes(state) {
      return state.favEpisodes;
    },
    getIsFavEpisode(state) {
      return state.isFavEpisode;
    },
    getCurrentEpisode(state) {
      return state.currentEpisode;
    },
    getCurrentEpisodeIsFav(state) {
      return state.currentEpisodeIsFav;
    },
    getseveralEpisodes(state) {
      return state.severalEpisodes;
    },
  },
};

export default episodeModule;
