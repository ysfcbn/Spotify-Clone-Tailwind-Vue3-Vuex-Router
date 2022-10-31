const artistModule = {
	namespaced: true,
	state: {
		currentArtist: '',
		currentArtistIsFav: '',
		currentTrack: {},
		topTracks: [],
		favArtists: [],
		favTracksIDInArtist: [],
	},
	mutations: {
		currentArtist(state, payload) {
			state.currentArtist = payload;
		},
		currentArtistIsFav(state, payload) {
			state.currentArtistIsFav = payload;
		},
		currentTrack(state, payload) {
			state.currentTrack = payload;
		},
		topTracks(state, payload) {
			state.topTracks = payload;
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
	},
	actions: {
		async currentArtist({ commit }, payload) {
			commit('currentArtist', await payload);
		},
		async currentArtistIsFav({ commit }, payload) {
			commit('currentArtistIsFav', await payload);
		},
		async currentTrack({ commit }, payload) {
			commit('currentTrack', await payload);
		},
		async topTracks({ commit }, payload) {
			commit('topTracks', await payload);
		},
		favTracksID({ commit }, payload) {
			commit('favTracksID', payload);
		},
		clearTracksID({ commit }) {
			commit('clearTracksID');
		},
		async favArtists({ commit }, payload) {
			commit('favArtists', await payload);
		},
	},
	getters: {
		getCurrentArtist(state) {
			return state.currentArtist;
		},
		getCurrentArtistIsFav(state) {
			return state.currentArtistIsFav;
		},
		getCurrentTrack(state) {
			return state.currentTrack;
		},
		getTopTracks(state) {
			return state.topTracks;
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
