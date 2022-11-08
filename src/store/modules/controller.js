import axios from 'axios';

const controllerModule = {
	namespaced: true,
	state: {
		months: [
			'Jan',
			'Feb',
			'March',
			'April',
			'May',
			'June',
			'July',
			'Aug',
			'Sept',
			'Oct',
			'Nov',
			'Dec',
		],
		currentlyPlayingTrack: null,
		playbackState: null,
		headerBtn: false,
		device_id: '8c639f9118629481363ba368739ab6eb2867c75d',
		device: null,
	},
	mutations: {
		myDevice(state, payload) {
			state.device = payload;
		},
		currentlyPlayingTrack(state, payload) {
			state.currentlyPlayingTrack = payload;
		},
		playbackState(state, payload) {
			state.playbackState = payload;
		},
		showHeaderBtn(state) {
			state.headerBtn = true;
		},
		closeHeaderBtn(state) {
			state.headerBtn = false;
		},
	},
	actions: {
		async fetchDevice({ dispatch, getters, state, commit }) {
			await axios
				.get(`https://api.spotify.com/v1/me/player/devices`, {
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + (await getters.getToken),
					},
				})
				.then(({ data }) => {
					console.log('DEVİCE!!!! ', data);
					commit('myDevice', data);
				})
				.catch(err => console.log(err));
		},
		async fetchCurrentlyPlayingTrack({ dispatch, getters, state }) {
			await axios
				.get(
					`https://api.spotify.com/v1/me/player/currently-playing?device_id=${state.device_id}`,
					{
						headers: {
							Accept: 'application/json',
							'Content-Type': 'application/json',
							Authorization: 'Bearer ' + (await getters.getToken),
						},
					}
				)
				.then(({ data }) => {
					console.log(data);
					dispatch('currentlyPlayingTrack', data);
				})
				.catch(err => console.log(err));
		},
		async currentlyPlayingTrack({ commit }, currentTrack) {
			commit('currentlyPlayingTrack', await currentTrack);
		},
		async fetchPlaybackState({ dispatch, getters }) {
			await axios
				.get('https://api.spotify.com/v1/me/player', {
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + (await getters.getToken),
					},
				})
				.then(({ data }) => {
					console.log(data);
					dispatch('playbackState', data);
				})
				.catch(err => console.log(err));
		},
		async playbackState({ commit }, playback_State) {
			commit('playbackState', await playback_State);
		},
		async playCurrentTrack({ getters, dispatch }) {
			console.log(getters.getCurrentlyPlayingTrack.context.uri);
			fetch(`https://api.spotify.com/v1/me/player/play`, {
				method: 'PUT',
				context_uri: JSON.stringify(
					getters.getCurrentlyPlayingTrack.context.uri
				),
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + (await getters.getToken),
				},
			})
				.then(data => {
					console.log(data);
					if (data.status === 204) {
						console.log('Playback started');
						dispatch('fetchCurrentlyPlayingTrack');
					}
				})
				.catch(err => console.log(err));
		},
		async pauseCurrentTrack({ getters, dispatch }) {
			fetch(`https://api.spotify.com/v1/me/player/pause`, {
				method: 'PUT',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + (await getters.getToken),
				},
			})
				.then(data => {
					console.log(data);
					if (data.status === 204) {
						console.log('Playback paused');
						dispatch('fetchCurrentlyPlayingTrack');
					}
				})
				.catch(err => console.log(err));
		},
		showHeaderBtn({ commit }) {
			commit('showHeaderBtn');
		},
		closeHeaderBtn({ commit }) {
			commit('closeHeaderBtn');
		},
	},
	getters: {
		getToken(state, getters, rootState, rootGetters) {
			return rootGetters.accessToken;
		},
		getCurrentlyPlayingTrack(state) {
			return state.currentlyPlayingTrack;
		},
		getPlaybackState(state) {
			return state.playbackState;
		},
		getHeaderBtn(state) {
			return state.headerBtn;
		},
		getMonths(state) {
			return state.months;
		},
	},
};

export default controllerModule;
