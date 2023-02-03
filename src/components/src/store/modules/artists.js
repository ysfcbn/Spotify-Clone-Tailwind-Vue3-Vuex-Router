const artistModule = {
  namespaced: true,
  state: {
    currentArtist: "",
    selectedCardArtist: "",
    currentArtistIsFav: "",
    favArtists: [],
    topTracks: [],
    selectedCardTopTracks: [],
    artistPublications: [],
    artistAlbums: [],
    artistSingles: [],
    fansLove: [],
    artistCompilations: [],
    favTracksIDInArtist: [],
  },
  mutations: {
    currentArtist(state, payload) {
      state.currentArtist = payload;
    },
    selectedCardArtist(state, payload) {
      state.selectedCardArtist = payload;
    },
    currentArtistIsFav(state, payload) {
      state.currentArtistIsFav = payload;
    },
    topTracks(state, payload) {
      state.topTracks = payload;
    },
    selectedCardTopTracks(state, payload) {
      state.selectedCardTopTracks = payload;
    },
    artistPublications(state, payload) {
      state.artistPublications = payload;
    },
    artistCompilations(state, payload) {
      state.artistCompilations = payload;
    },
    artistAlbums(state, payload) {
      state.artistAlbums = payload;
    },
    artistSingles(state, payload) {
      state.artistSingles = payload;
    },
    fansLove(state, payload) {
      state.fansLove = payload;
    },
    favTracksID(state, payload) {
      state.favTracksIDInArtist.push(payload);
    },
    clearTracksID(state) {
      state.favTracksIDInArtist = [];
    },
    favArtists(state, payload) {
      state.favArtists = payload;
    },
    clearArtistPageData(state) {},
  },
  actions: {
    async currentArtist({ commit }, payload) {
      commit("currentArtist", await payload);
    },
    async selectedCardArtist({ commit }, payload) {
      commit("selectedCardArtist", await payload);
    },
    async currentArtistIsFav({ commit }, payload) {
      commit("currentArtistIsFav", await payload);
    },
    async topTracks({ commit }, payload) {
      commit("topTracks", await payload);
    },
    async selectedCardTopTracks({ commit }, payload) {
      commit("selectedCardTopTracks", await payload);
    },

    async artistPublications({ commit }, payload) {
      commit("artistPublications", await payload);
    },
    async artistCompilations({ commit }, payload) {
      commit("artistCompilations", await payload);
    },
    async artistAlbums({ commit }, payload) {
      commit("artistAlbums", await payload);
    },
    async artistSingles({ commit }, payload) {
      commit("artistSingles", await payload);
    },
    async fansLove({ commit }, payload) {
      commit("fansLove", await payload);
    },
    favTracksID({ commit }, payload) {
      commit("favTracksID", payload);
    },
    clearTracksID({ commit }) {
      commit("clearTracksID");
    },
    clearArtistPageData({ commit }) {
      commit("clearArtistPageData");
    },
    async favArtists({ commit }, payload) {
      commit("favArtists", await payload);
    },
  },
  getters: {
    getCurrentArtist(state) {
      return state.currentArtist;
    },
    getSelectedCardArtist(state) {
      return state.selectedCardArtist;
    },
    getCurrentArtistIsFav(state) {
      return state.currentArtistIsFav;
    },
    getTopTracks(state) {
      return state.topTracks;
    },
    getSelectedCardTopTracks(state) {
      return state.selectedCardTopTracks;
    },
    getArtistPublications(state) {
      return state.artistPublications;
    },
    getArtistCompilations(state) {
      return state.artistCompilations;
    },
    getArtistAlbums(state) {
      return state.artistAlbums;
    },
    getArtistSingles(state) {
      return state.artistSingles;
    },
    getFansLove(state) {
      return state.fansLove;
    },
    getfavTracksID(state) {
      return state.favTracksIDInArtist;
    },
    getFavArtists(state) {
      return state.favArtists;
    },
  },
};

export default artistModule;
