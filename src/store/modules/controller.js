import axios from 'axios';
import { stringify } from 'qs';

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
		currentTrackAlbumImage: null,
		headerBtn: false,
		device_id: null,
		myDevice: null,
		volumePercent: null,
		currentTrackID: null,
		currentContextType: null,
		currentTrackIsFav: '',
		userQueue: [],
		recentlyPlayedTracks: null,
		lastListenCards: null,

		isPlayingHeaderBtn: null,
		isClickHeaderBtn: null,
	},
	mutations: {
		myDevice(state, payload) {
			state.myDevice = payload;
		},
		volumePercent(state, payload) {
			state.volumePercent = payload;
		},
		deviceID(state, id) {
			state.device_id = id;
		},
		currentTrackID(state, id) {
			state.currentTrackID = id;
		},
		currentContextType(state, type) {
			state.currentContextType = type;
		},
		currentlyPlayingTrack(state, payload) {
			state.currentlyPlayingTrack = payload;
		},
		playbackState(state, payload) {
			state.playbackState = payload;
		},
		currentTrackAlbumImage(state, payload) {
			state.currentTrackAlbumImage = payload;
		},
		currentTrackIsFav(state, payload) {
			state.currentTrackIsFav = payload;
		},
		userQueue(state, payload) {
			state.userQueue = payload;
		},
		recentlyPlayedTracks(state, payload) {
			state.recentlyPlayedTracks = payload;
		},
		lastListenCards(state, payload) {
			state.lastListenCards = payload;
		},

		isPlayingHeaderBtn(state, payload) {
			state.isPlayingHeaderBtn = payload;
		},
		isClickHeaderBtn(state, payload) {
			state.isClickHeaderBtn = payload;
		},

		showHeaderBtn(state) {
			state.headerBtn = true;
		},
		closeHeaderBtn(state) {
			state.headerBtn = false;
		},
	},
	actions: {
		async fetchDevice({ getters, commit, dispatch }) {
			await axios
				.get(`https://api.spotify.com/v1/me/player/devices`, {
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + getters.getToken,
					},
				})
				.then(({ data }) => {
					console.log('DEVİCE!!!! ', data);
					commit('myDevice', data.devices);
					commit('deviceID', data.devices[0].id);
					dispatch('transferDevice');
					dispatch('volumePercent');
				})
				.catch(err => console.log(err));
		},
		async transferDevice({ getters }) {
			await fetch(`https://api.spotify.com/v1/me/player`, {
				method: 'PUT',
				body: JSON.stringify(
					{ device_ids: [await getters.deviceID] },
					{ play: true }
				),
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + getters.getToken,
				},
			})
				.then(data => {
					console.log(data);
					if (data.status === 204) {
						console.log('Playback transfered');
					}
				})
				.catch(err => console.log(err));
		},
		async fetchCurrentlyPlayingTrack({ commit, dispatch, getters }) {
			await axios
				.get(
					`https://api.spotify.com/v1/me/player/currently-playing?device_id=${getters.deviceID}`,
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
					if (data) {
						dispatch('currentlyPlayingTrack', data);
						commit('currentContextType', data?.context?.type);
						commit('currentTrackID', data.item.id);
						dispatch('isFavTrack');
						dispatch('userQueue');
						commit('currentTrackAlbumImage', data.item.album.images[0].url);
					}
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
					data ? dispatch('playbackState', data) : '';
				})
				.catch(err => console.log(err));
		},
		async playbackState({ commit }, playback_State) {
			commit('playbackState', await playback_State);
		},
		async isFavTrack({ dispatch, getters }) {
			await axios
				.get(
					`https://api.spotify.com/v1/me/tracks/contains?ids=` +
						getters.currentTrackID,
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
					dispatch('currentTrackIsFav', ...data);
				})
				.catch(err => console.log(err));
		},
		async currentTrackIsFav({ commit }, payload) {
			commit('currentTrackIsFav', await payload);
		},
		async volumePercent({ commit, state }) {
			commit('volumePercent', await state.myDevice[0].volume_percent);
		},
		async playCurrentTrack({ getters, dispatch }) {
			if (!getters.getCurrentlyPlayingTrack?.item?.uri) return;
			await fetch(`https://api.spotify.com/v1/me/player/play`, {
				method: 'PUT',
				context_uri: JSON.stringify(
					getters.getCurrentlyPlayingTrack?.item?.uri
				),
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + getters.getToken,
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
		async playSelectedTrack({ getters, dispatch }, uri) {
			await axios
				.put(
					`https://api.spotify.com/v1/me/player/play?device_id=${getters.deviceID}`,
					{
						uris: [uri.uri],
						position_ms:
							uri.id === getters.getCurrentlyPlayingTrack?.item.id
								? getters.getCurrentlyPlayingTrack.progress_ms
								: 0,
					},
					{
						headers: {
							Accept: 'application/json',
							'Content-Type': 'application/json',
							Authorization: 'Bearer ' + getters.getToken,
						},
					}
				)
				.then(data => {
					if (data.status === 204) {
						dispatch('fetchCurrentlyPlayingTrack')
							.then(() => {
								console.log(getters.currentTrackID);
							})
							.catch(err => console.log(err));
					}
				})
				.catch(err => console.log(err));
		},
		async playArtitsTopTracks({ getters, dispatch }, uris) {
			await axios
				.put(
					`https://api.spotify.com/v1/me/player/play?device_id=${getters.deviceID}`,
					{
						uris: [uris.uri[uris.index], ...uris.uri.slice(uris.index + 1)],
						position_ms:
							uris.type === 'artist' &&
							uris.artistID ===
								getters.getCurrentlyPlayingTrack?.item.artists[0].id
								? getters.getCurrentlyPlayingTrack.progress_ms
								: (await uris.id) === getters.getCurrentlyPlayingTrack?.item.id
								? getters.getCurrentlyPlayingTrack.progress_ms
								: 0,
					},
					{
						headers: {
							Accept: 'application/json',
							'Content-Type': 'application/json',
							Authorization: 'Bearer ' + getters.getToken,
						},
					}
				)
				.then(data => {
					if (data.status === 204) {
						dispatch('fetchCurrentlyPlayingTrack')
							.then(() => {
								console.log(getters.currentTrackID);
							})
							.catch(err => console.log(err));
					}
				})
				.catch(err => console.log(err));
		},
		async seekToPositionSelectedTrack({ getters }) {
			await fetch(
				`https://api.spotify.com/v1/me/player/seek?position_ms=${progress_ms}&device_id=${getters.deviceID}`,
				{
					method: 'PUT',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + getters.getToken,
					},
				}
			)
				.then(data => {
					if (data.status === 204) {
						console.log('Selected Track Seek To Position');
					}
				})
				.catch(err => console.log(err));
		},

		async playSelectedContext({ getters, dispatch }, contextUri) {
			await axios
				.put(
					`https://api.spotify.com/v1/me/player/play?device_id=${getters.deviceID}`,
					{
						context_uri: await contextUri.uri,
						offset: { position: await contextUri.index },
						position_ms:
							(await contextUri.type) ===
								getters.getCurrentlyPlayingTrack?.context?.type &&
							(await contextUri.uri) ===
								getters.getCurrentlyPlayingTrack?.context?.uri
								? getters.getCurrentlyPlayingTrack.progress_ms
								: (await contextUri.id) ===
								  getters.getCurrentlyPlayingTrack?.item.id
								? getters.getCurrentlyPlayingTrack.progress_ms
								: 0,
					},
					{
						headers: {
							Accept: 'application/json',
							'Content-Type': 'application/json',
							Authorization: 'Bearer ' + getters.getToken,
						},
					}
				)
				.then(data => {
					console.log(data);
					if (data.status === 204) {
						console.log('context started');
						dispatch('fetchCurrentlyPlayingTrack')
							.then(() => {
								console.log(getters.currentTrackID);
								console.log(
									'context type=>',
									getters.getCurrentlyPlayingTrack?.context?.type
								);
							})
							.catch(err => console.log(err));
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
					Authorization: 'Bearer ' + getters.getToken,
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

		async skipToNextTrack({ getters, dispatch, rootGetters }) {
			await fetch(
				`https://api.spotify.com/v1/me/player/next?device_id=${getters.deviceID}`,
				{
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + getters.getToken,
					},
				}
			)
				.then(data => {
					console.log(data);
					if (data.status === 204) {
						console.log('skipped to Next Track!');
						dispatch('fetchCurrentlyPlayingTrack');
					}
				})
				.catch(err => console.log(err));
		},
		async skipToPrevTrack({ getters, dispatch, state }) {
			fetch(
				`https://api.spotify.com/v1/me/player/previous?device_id=${getters.deviceID}`,
				{
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + getters.getToken,
					},
				}
			)
				.then(data => {
					console.log(data);
					if (data.status === 204) {
						console.log('skipped to Previous Track!');
						dispatch('fetchCurrentlyPlayingTrack');
					}
				})
				.catch(err => console.log(err));
		},

		async userQueue({ getters, commit }) {
			await axios
				.get(`https://api.spotify.com/v1/me/player/queue`, {
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + getters.getToken,
					},
				})
				.then(({ data }) => {
					console.log(data, '!!!USER QUEUE!!!!');
					commit('userQueue', data);
				})
				.catch(err => console.log(err));
		},
		async addItemToQueue({ getters, dispatch }, uri) {
			fetch(
				`https://api.spotify.com/v1/me/player/queue?uri=${uri}&device_id=${getters.deviceID}`,
				{
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + (await getters.getToken),
					},
				}
			)
				.then(data => {
					console.log(data);
					if (data.status === 204) {
						console.log('!!!!!!!!item added to Queue!!!!!!!!!!!!');
						dispatch('userQueue');
					}
				})
				.catch(err => console.log(err));
		},

		async fetchRecentlyPlayedTracks({ getters, commit, state }) {
			await axios
				.get(`https://api.spotify.com/v1/me/player/recently-played?limit=50`, {
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + getters.getToken,
					},
				})
				.then(({ data }) => {
					console.log(data, 'RECENTLY PLAYED TRACKS');
					commit('recentlyPlayedTracks', data);
				})
				.catch(err => console.log(err));
		},
		lastListenCards({ commit }, payload) {
			commit('lastListenCards', payload);
		},

		isPlayingHeaderBtn({ commit }, isPlaying) {
			commit('isPlayingHeaderBtn', isPlaying);
		},
		isClickHeaderBtn({ commit }, playResume) {
			commit('isClickHeaderBtn', playResume);
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
		deviceID(state) {
			return state.device_id;
		},
		getRecentlyPlayedTracks(state) {
			return state.recentlyPlayedTracks;
		},
		getLastListenCards(state) {
			return state.lastListenCards;
		},

		currentTrackID(state) {
			return state.currentTrackID;
		},

		currentContextType(state) {
			return state.currentContextType;
		},
		getVolumePercent(state) {
			return state.volumePercent;
		},
		getCurrentlyPlayingTrack(state) {
			return state.currentlyPlayingTrack;
		},
		getPlaybackState(state) {
			return state.playbackState;
		},
		getCurrentTrackAlbumImage(state) {
			return state.currentTrackAlbumImage;
		},
		getCurrentTrackIsFav(state) {
			return state.currentTrackIsFav;
		},
		isPlayingHeaderBtn(state) {
			return state.isPlayingHeaderBtn;
		},
		isClickHeaderBtn(state) {
			return state.isClickHeaderBtn;
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
