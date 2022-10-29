const showModule = {
	namespaced: true,
	state: {
		favShows: {},
		currentShow: {},
		currentShowIsFav: '',
	},
	mutations: {
		favShows(state, payload) {
			state.favShows = payload;
		},
		currentShow(state, payload) {
			state.currentShow = payload;
		},
		currentShowIsFav(state, payload) {
			state.currentShowIsFav = payload;
		},
	},
	actions: {
		async favShows({ commit }, payload) {
			commit('favShows', await payload);
		},
		async currentShow({ commit }, payload) {
			commit('currentShow', await payload);
		},
		async currentShowIsFav({ commit }, payload) {
			commit('currentShowIsFav', await payload);
		},
	},
	getters: {
		getFavShows(state) {
			return state.favShows;
		},
		getCurrentShow(state) {
			return state.currentShow;
		},
		getCurrentShowIsFav(state) {
			return state.currentShowIsFav;
		},
	},
};

export default showModule;
