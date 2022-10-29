const favTracksModule = {
  namespaced: true,
  state: {
    tracks: {},
  },
  mutations: {
    getTracks(state, payload) {
      state.tracks = payload;
    },
  },
  actions: {
    async getTracks({ commit }, payload) {
      commit("getTracks", await payload);
    },
  },
  getters: {
    getTracks(state) {
      return state.tracks;
    },
  },
};

export default favTracksModule;
