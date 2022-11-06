import { createStore } from 'vuex';
import controllerModule from './modules/controller.js';
import playlistModule from './modules/playlists.js';
import albumModule from './modules/albums.js';
import favTracksModule from './modules/favTracks.js';
import artistModule from './modules/artists';
import episodeModule from './modules/episodes.js';
import showModule from './modules/shows.js';
import userModule from './modules/users.js';
import genreModule from './modules/genres.js';
import discographyModule from './modules/discography.js';

// Create a new store instance.
const store = createStore({
	modules: {
		controller: controllerModule,
		playlists: playlistModule,
		albums: albumModule,
		favTracks: favTracksModule,
		artists: artistModule,
		episodes: episodeModule,
		shows: showModule,
		users: userModule,
		genres: genreModule,
		discography: discographyModule,
	},
	state: {
		accessToken: null,
		isLoggedIn: false,
		currentUser: null,
	},
	mutations: {
		getAccessToken(state, payload) {
			state.accessToken = payload;
		},
		login(state) {
			state.isLoggedIn = true;
		},
		logout(state) {
			state.isLoggedIn = false;
			state.accessToken = null;
		},
		currentUser(state, payload) {
			state.currentUser = payload;
		},
	},
	actions: {
		async getAccessToken({ commit }, payload) {
			commit('getAccessToken', await payload);
			commit('login');
		},
		login({ commit }) {
			commit('login');
		},
		logout({ commit }) {
			commit('logout');
		},
		async currentUser({ commit }, payload) {
			commit('currentUser', await payload);
		},
	},
	getters: {
		accessToken(state) {
			return state.accessToken;
		},
		isAuth(state) {
			return state.isLoggedIn;
		},
		getCurrentUser(state) {
			return state.currentUser;
		},
	},
});

export default store;
