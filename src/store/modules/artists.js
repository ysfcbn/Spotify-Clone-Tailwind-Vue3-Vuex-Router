const artistModule = {
	namespaced: true,
	state: {
		currentTrack: {},
		topTracks: [],
		favArtists: [],
	},
	mutations: {
		currentTrack(state, payload) {
			state.currentTrack = payload;
		},
		topTracks(state, payload) {
			state.topTracks = payload;
		},
		favArtists(state, payload) {
			state.favArtists = payload;
		},
	},
	actions: {
		async currentTrack({ commit }, payload) {
			commit('currentTrack', await payload);
		},
		async topTracks({ commit }, payload) {
			commit('topTracks', await payload);
		},
		async favArtists({ commit }, payload) {
			commit('favArtists', await payload);
		},
	},
	getters: {
		getCurrentTrack(state) {
			return state.currentTrack;
		},
		getTopTracks(state) {
			return state.topTracks;
		},
		getFavArtists(state) {
			return state.favArtists;
		},
	},
};

export default artistModule;
