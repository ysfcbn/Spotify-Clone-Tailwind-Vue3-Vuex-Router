const searchItemModule = {
	namespaced: true,
	state: {
		searchItem: '',
		types: ['album', 'artist', 'playlist', 'track', 'show', 'episode'],
		searchResultArr: null,
		topResult: null,
		songs: null,
	},
	mutations: {
		searchItem(state, payload) {
			state.searchItem = payload;
		},
		searchResultArr(state, payload) {
			state.searchResultArr = payload;
		},
		topResult(state, payload) {
			state.topResult = payload;
		},
		songs(state, payload) {
			state.songs = payload;
		},
	},
	actions: {
		async searchItem({ commit }, payload) {
			commit('searchItem', await payload);
		},
		async searchResultArr({ commit }, payload) {
			commit('searchResultArr', await payload);
		},
		async topResult({ commit }, payload) {
			commit('topResult', await payload);
		},
		async songs({ commit }, payload) {
			commit('songs', await payload);
		},
	},
	getters: {
		getSearchItem(state) {
			return state.searchItem;
		},
		getTypes(state) {
			return state.types;
		},
		getSearchResultArr(state) {
			return state.searchResultArr;
		},
		getTopResult(state) {
			return state.topResult;
		},
		getSongs(state) {
			return state.songs;
		},
	},
};

export default searchItemModule;
