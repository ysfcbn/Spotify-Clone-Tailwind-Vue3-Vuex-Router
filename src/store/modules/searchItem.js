const searchItemModule = {
	namespaced: true,
	state: {
		searchItem: '',
		types: ['album', 'artist', 'playlist', 'track', 'show', 'episode'],
	},
	mutations: {
		searchItem(state, payload) {
			state.searchItem = payload;
		},
	},
	actions: {
		async searchItem({ commit }, payload) {
			commit('searchItem', await payload);
		},
	},
	getters: {
		getSearchItem(state) {
			return state.searchItem;
		},
		getTypes(state) {
			return state.types;
		},
	},
};

export default searchItemModule;
