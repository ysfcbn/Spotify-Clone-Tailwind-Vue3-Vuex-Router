const albumModule = {
	namespaced: true,
	state: {
		currentAlbum: {},
		favAlbums: [],
		favTracksIDInAlbum: [],
		favTracksIDInAlbum2: [],
		currentTrack: {},
		selectedCardAlbum: null,
	},
	mutations: {
		favAlbums(state, payload) {
			state.favAlbums = payload;
		},
		getAlbum(state, payload) {
			state.currentAlbum = payload;
		},
		clearAlbum(state) {
			state.currentAlbum = {};
		},
		clearCurrentTrack(state) {
			state.currentTrack = {};
		},
		favTracksID(state, payload) {
			state.favTracksIDInAlbum.push(payload);
		},
		favTracksID2(state, payload) {
			state.favTracksIDInAlbum2.push(payload);
		},
		clearTracksID(state) {
			state.favTracksIDInAlbum = [];
		},
		clearTracksID2(state) {
			state.favTracksIDInAlbum2 = [];
		},
		currentTrack(state, payload) {
			state.currentTrack = payload;
		},
		selectedCardAlbum(state, payload) {
			state.selectedCardAlbum = payload;
		},
	},
	actions: {
		async favAlbums({ commit }, payload) {
			commit('favAlbums', await payload);
		},
		async getAlbum({ commit }, payload) {
			commit('getAlbum', await payload);
		},
		clearAlbum({ commit }) {
			commit('clearAlbum');
		},
		clearCurrentTrack({ commit }) {
			commit('clearCurrentTrack');
		},
		favTracksID({ commit }, payload) {
			commit('favTracksID', payload);
		},
		favTracksID2({ commit }, payload) {
			commit('favTracksID2', payload);
		},
		clearTracksID({ commit }) {
			commit('clearTracksID');
		},
		clearTracksID2({ commit }) {
			commit('clearTracksID2');
		},
		async currentTrack({ commit }, payload) {
			commit('currentTrack', await payload);
		},
		async selectedCardAlbum({ commit }, payload) {
			commit('selectedCardAlbum', await payload);
		},
	},
	getters: {
		getFavAlbums(state) {
			return state.favAlbums;
		},
		getAlbum(state) {
			return state.currentAlbum;
		},
		getfavTracksID(state) {
			return state.favTracksIDInAlbum;
		},
		getfavTracksID2(state) {
			return state.favTracksIDInAlbum2;
		},
		getCurrentTrack(state) {
			return state.currentTrack;
		},
		getSelectedCardAlbum(state) {
			return state.selectedCardAlbum;
		},
	},
};

export default albumModule;
