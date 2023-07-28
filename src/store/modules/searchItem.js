import axios from 'axios';

const searchItemModule = {
	namespaced: true,
	state: {
		searchItem: '',
		types: ['album', 'artist', 'playlist', 'track', 'show', 'episode'],
		searchResultArr: null,
		topResult: null,
		songs: null,
		searchCategoryType: 'all',
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
		searchCategoryType(state, payload) {
			state.searchCategoryType = payload;
		},
	},
	actions: {
		async fetchSearchItem({ commit, dispatch, getters, state }) {
			await axios
				.get(
					`https://api.spotify.com/v1/search?q=${state.searchItem}&type=${state.types}&limit=10`,
					{
						headers: {
							Accept: 'application/json',
							'Content-Type': 'application/json',
							Authorization: 'Bearer ' + getters.getToken,
						},
					}
				)
				.then(({ data }) => {
					console.log(data);
					dispatch('searchResultArr', data);
				})
				.catch(err => console.log(err));
		},
		async topResult1({ commit, dispatch, getters }) {
			const types = Object.keys({ ...getters.getSearchResultArr });
			let selectedType = types[Math.floor(Math.random() * types.length)];
			let firstBox = { ...getters.getSearchResultArr[selectedType].items[0] };
			await dispatch('topResult', firstBox);
		},
		async topSongs({ commit, dispatch, getters }) {
			dispatch('songs', getters.getSearchResultArr?.tracks.items.slice(0, 4));
		},
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
		getToken(state, getters, rootState, rootGetters) {
			return rootGetters.accessToken;
		},
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
		getSearchCategoryType(state) {
			return state.searchCategoryType;
		},
	},
};

export default searchItemModule;
