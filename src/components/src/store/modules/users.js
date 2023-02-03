const userModule = {
  namespaced: true,
  state: {
    user: {},
    curUserTopArtists: {},
    curUserTopTracks: {},
    favTracksID: [],
    publicPlaylistFollowers: [],
    currentUserIsFav: "",
    userPlaylists: {},
  },
  mutations: {
    user(state, payload) {
      state.user = payload;
    },
    curUserTopArtists(state, payload) {
      state.curUserTopArtists = payload;
    },
    curUserTopTracks(state, payload) {
      state.curUserTopTracks = payload;
    },
    favTracksID(state, payload) {
      state.favTracksID.push(payload);
    },
    publicPlaylistFollowers(state, payload) {
      state.publicPlaylistFollowers = payload;
    },
    clearTracksID(state) {
      state.favTracksID = [];
    },
    clearPublicPlaylistFollowers(state) {
      state.publicPlaylistFollowers = [];
    },
    currentUserIsFav(state, payload) {
      state.currentUserIsFav = payload;
    },
    userPlaylists(state, payload) {
      state.userPlaylists = payload;
    },
  },
  actions: {
    async user({ commit }, payload) {
      commit("user", await payload);
    },
    async curUserTopArtists({ commit }, payload) {
      commit("curUserTopArtists", await payload);
    },
    async curUserTopTracks({ commit }, payload) {
      commit("curUserTopTracks", await payload);
    },
    favTracksID({ commit }, payload) {
      commit("favTracksID", payload);
    },
    publicPlaylistFollowers({ commit }, payload) {
      commit("publicPlaylistFollowers", payload);
    },
    clearTracksID({ commit }) {
      commit("clearTracksID");
    },
    clearPublicPlaylistFollowers({ commit }) {
      commit("clearPublicPlaylistFollowers");
    },
    async currentUserIsFav({ commit }, payload) {
      commit("currentUserIsFav", await payload);
    },
    async userPlaylists({ commit }, payload) {
      commit("userPlaylists", await payload);
    },
  },
  getters: {
    getUser(state) {
      return state.user;
    },
    getCurUserTopArtists(state) {
      return state.curUserTopArtists;
    },
    getCurUserTopTracks(state) {
      return state.curUserTopTracks;
    },
    getFavTracksID(state) {
      return state.favTracksID;
    },
    getPublicPlaylistFollowers(state) {
      return state.publicPlaylistFollowers;
    },
    getCurrentUserIsFav(state) {
      return state.currentUserIsFav;
    },
    getUserPlaylists(state) {
      return state.userPlaylists;
    },
  },
};

export default userModule;
