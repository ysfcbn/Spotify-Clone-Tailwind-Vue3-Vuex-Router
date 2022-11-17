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
		currentTrackIsFav: '',
		userQueue: [],
		recentlyPlayedTracks: null,
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
					dispatch('fetchRecentlyPlayedTracks');
				})
				.catch(err => console.log(err));
		},
		async transferDevice({ getters }) {
			await fetch(`https://api.spotify.com/v1/me/player`, {
				method: 'PUT',
				body: JSON.stringify(
					{ device_ids: [await getters.deviceID] },
					{ play: false }
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

		async playSelectedTrack({ getters, dispatch }, contextUri) {
			await axios
				.put(
					`https://api.spotify.com/v1/me/player/play?device_id=${getters.deviceID}`,
					{
						context_uri: contextUri.uri,
						offset: { position: contextUri.index },
						position_ms:
							getters.getCurrentlyPlayingTrack?.item.track_number - 1 ===
							contextUri.index
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
						console.log(
							`Selected ${contextUri.index}==> index numbered favSong started`
						);
						dispatch('fetchCurrentlyPlayingTrack')
							.then(() => {
								console.log(getters.currentTrackID);
								console.log(
									'context type=>',
									getters.getCurrentlyPlayingTrack?.context?.type
								);
								let selectedPlayingTrackEl = [
									document.getElementById(`${getters.currentTrackID}`),
								];
								dispatch('addGreenTextTrackName', selectedPlayingTrackEl[0]);
							})
							.catch(err => console.log(err));
					}
				})
				.catch(err => console.log(err));
		},

		async playSelectedContext({ getters, dispatch }, contextUri) {
			console.log(contextUri.index);
			contextUri.index ? contextUri.index : (contextUri.index = 0);
			await axios
				.put(
					`https://api.spotify.com/v1/me/player/play?device_id=${getters.deviceID}`,
					{
						context_uri: contextUri.uri,
						offset: { position: contextUri.index },
						position_ms:
							contextUri.type === 'favSongs'
								? getters.getCurrentlyPlayingTrack.progress_ms
								: getters.getCurrentlyPlayingTrack?.item.track_number - 1 ===
								  contextUri.index
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
								let selectedPlayingTrackEl = [
									document.getElementById(`${getters.currentTrackID}`),
								];
								dispatch('addGreenTextTrackName', selectedPlayingTrackEl[0]);
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
		async skipToNextTrack({ getters, dispatch }) {
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
			).then(data => {
				console.log(data);
				if (data.status === 204) {
					console.log('skipped to Next Track!');
					let selectedTrackEl = [
						document.querySelector('.trackItems--container'),
					];
					console.log(selectedTrackEl[0]);
					if (selectedTrackEl[0]) {
						selectedTrackEl = [...selectedTrackEl[0].children];
						dispatch('removeGreenTextTrackName', selectedTrackEl);
						dispatch('fetchCurrentlyPlayingTrack')
							.then(() => {
								console.log(getters.currentTrackID);
								let selectedPlayingTrackEl = [
									document.getElementById(`${getters.currentTrackID}`),
								];
								console.log(selectedPlayingTrackEl);
								selectedPlayingTrackEl[0]
									? dispatch('addGreenTextTrackName', selectedPlayingTrackEl[0])
									: '';
							})
							.catch(err => console.log(err));
					} else dispatch('fetchCurrentlyPlayingTrack');
				}
			});
		},
		async skipToPrevTrack({ getters, dispatch }) {
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
						let selectedTrackEl = [
							document.querySelector('.trackItems--container'),
						];
						selectedTrackEl = [...selectedTrackEl[0].children];
						dispatch('removeGreenTextTrackName', selectedTrackEl);
						dispatch('fetchCurrentlyPlayingTrack')
							.then(() => {
								console.log(getters.currentTrackID);
								let selectedPlayingTrackEl = [
									document.getElementById(`${getters.currentTrackID}`),
								];
								dispatch('addGreenTextTrackName', selectedPlayingTrackEl[0]);
							})
							.catch(err => console.log(err));
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
						dispatch('fetchCurrentlyPlayingTrack');
					}
				})
				.catch(err => console.log(err));
		},
		async fetchRecentlyPlayedTracks({ getters, commit }) {
			await axios
				.get(`https://api.spotify.com/v1/me/player/recently-played`, {
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

		addGreenTextTrackName(_, item) {
			console.log(item);
			item.children[0].children[0].children[0].classList.add('text-green3');
			item.children[1].children[1].children[0].classList.add('text-green3');
		},
		removeGreenTextTrackName(_, item) {
			console.log('REMOVE ÇALIŞTIIIII✌✌✌✌✌✌');
			item.forEach(track => {
				track.children[0].children[0].children[0].classList.remove(
					'text-green3'
				);
				track.children[1].children[1].children[0].classList.remove(
					'text-green3'
				);
			});
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
		currentTrackID(state) {
			return state.currentTrackID;
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
		getHeaderBtn(state) {
			return state.headerBtn;
		},
		getMonths(state) {
			return state.months;
		},
	},
};

export default controllerModule;
