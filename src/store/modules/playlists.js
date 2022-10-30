const playlistModule = {
	namespaced: true,
	state: {
		currentPlaylist: {},
		userFavPlaylists: [],
		favTracksIDInPlaylist: [],
		severalPlaylists: {},
		browseCategories: [],
		randomSelectedPlaylists: [],
		randomSelectedPlaylistsTitle: [],
	},
	mutations: {
		clearPlaylist(state) {
			state.currentPlaylist = {};
		},
		getPlaylist(state, payload) {
			state.currentPlaylist = payload;
		},
		favTracksID(state, payload) {
			state.favTracksIDInPlaylist.push(payload);
		},
		clearTracksID(state) {
			state.favTracksIDInPlaylist = [];
		},
		userPlaylists(state, payload) {
			state.userFavPlaylists = payload;
		},
		severalPlaylists(state, payload) {
			state.severalPlaylists = payload;
		},
		browseCategories(state, payload) {
			state.browseCategories = payload;
		},

		randomSelectedPlaylists(state, payload) {
			state.randomSelectedPlaylists.length < 10
				? state.randomSelectedPlaylists.push(payload)
				: '';
		},
		randomSelectedPlaylistsTitle(state, payload) {
			state.randomSelectedPlaylists.length < 10
				? state.randomSelectedPlaylistsTitle.push(payload)
				: '';
		},
	},
	actions: {
		clearPlaylist({ commit }) {
			commit('clearPlaylist');
		},
		async getPlaylist({ commit }, payload) {
			commit('getPlaylist', await payload);
		},
		favTracksID({ commit }, payload) {
			commit('favTracksID', payload);
		},
		clearTracksID({ commit }) {
			commit('clearTracksID');
		},
		async userPlaylists({ commit }, payload) {
			await commit('userPlaylists', await payload);
		},
		async severalPlaylists({ commit }, payload) {
			commit('severalPlaylists', await payload);
		},
		async browseCategories({ commit }, payload) {
			commit('browseCategories', await payload);
		},

		randomSelectedPlaylists({ commit }, payload) {
			commit('randomSelectedPlaylists', payload);
		},
		randomSelectedPlaylistsTitle({ commit }, payload) {
			commit('randomSelectedPlaylistsTitle', payload);
		},
	},
	getters: {
		getPlaylist(state) {
			return state.currentPlaylist;
		},
		getUserFavPlaylists(state) {
			return state.userFavPlaylists;
		},
		getfavTracksID(state) {
			return state.favTracksIDInPlaylist;
		},
		getseveralPlaylists(state) {
			return state.severalPlaylists;
		},
		getBrowseCategories(state) {
			return state.browseCategories;
		},
		getRandomSelectedPlaylists(state) {
			return state.randomSelectedPlaylists;
		},
		getRandomSelectedPlaylistsTitle(state) {
			return state.randomSelectedPlaylistsTitle;
		},
	},
};

export default playlistModule;
