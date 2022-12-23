<template>
	<div
		:id="contextID"
		@click="openItem(msg, $event)"
		class="item--container group xl:h-[5rem] sm:h-[4rem] min-w-[200px] flex items-center transition-colors duration-300 justify-start bg-opacwhite1 hover:bg-opacwhite2 relative rounded-md cursor-pointer box-border"
	>
		<div class="h-full shrink-0">
			<img
				class="mb:h-full object-cover rounded-l-sm"
				:src="contextImage"
				alt="image"
			/>
		</div>
		<div class="h-full w-full flex items-center justify-between">
			<div class="relative left-5 lg:w-[70%]">
				<h4 class="text-md text-white font-semibold line-clamp-2">
					{{ contextName }}
				</h4>
			</div>

			<div
				v-if="contextType === 'artist'"
				:class="{
					'opacity-0 ': !isPlayingArtistTopTracks,
				}"
				class="flex items-start mx-3 group-hover:opacity-100 transition ease-in duration-150"
			>
				<button
					id="playBtn"
					@click="
						playArtistTopTracks(
							(uri = {
								uri: artistTopTrackUris,
								index: currentPlayingTrackIndex,
								type: contextType,
								artistID: findArtistsID,
							})
						)
					"
					class="p-3 ml-3 bg-green3 sm:hidden lg:block rounded-full cursor-default hover:scale-105 shadow-[0px_5px_6px_2px_rgba(0,0,0,0.4)]"
				>
					<svg role="img" height="24" width="24" viewBox="0 0 24 24">
						<path
							v-if="!isPlayingArtistTopTracks"
							fill="text-black"
							d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"
						></path>
						<path
							v-else
							fill="text-black"
							d="M5.7 3a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7H5.7zm10 0a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7h-2.6z"
						></path>
					</svg>
				</button>
			</div>
			<div
				v-else
				:class="{
					'opacity-0 ': !isPlayingContextUri,
				}"
				class="flex items-start mx-3 group-hover:opacity-100 transition ease-in duration-150"
			>
				<button
					id="playBtn"
					@click="
						playContextUri(
							(uri = {
								uri: contextUri,
								index: 0,
								type: contextType,
							})
						)
					"
					class="p-3 ml-3 bg-green3 sm:hidden lg:block rounded-full cursor-default hover:scale-105 shadow-[0px_5px_6px_2px_rgba(0,0,0,0.4)]"
				>
					<svg role="img" height="24" width="24" viewBox="0 0 24 24">
						<path
							v-if="!isPlayingContextUri"
							fill="text-black"
							d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"
						></path>
						<path
							v-else
							fill="text-black"
							d="M5.7 3a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7H5.7zm10 0a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7h-2.6z"
						></path>
					</svg>
				</button>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
export default {
	props: ['item', 'contextType', 'contextUri', 'index'],
	data() {
		return {
			playlistImage: null,
			playlistName: null,
			artistImage: null,
			collectionName: 'Beğenilen Şarkılar',
		};
	},
	methods: {
		async fetchPlaylist() {
			await axios
				.get(`${this.item.context.href}`, {
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + this.getToken,
					},
				})
				.then(({ data }) => {
					this.playlistImage = data.images[0].url;
					this.playlistName = data.name;
				})
				.catch(err => console.log(err));
		},
		async fetchArtist() {
			await axios
				.get(`${this.item.context.href}`, {
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + this.getToken,
					},
				})
				.then(({ data }) => {
					this.artistImage = data.images[1].url;
				})
				.catch(err => console.log(err));
		},
		async playArtistTopTracks(uri) {
			console.log(uri);
			console.log(this.findCurrentPlayingTrackIndex);
			if (this.isPlayingArtistTopTracks) {
				await this.$store.dispatch('controller/pauseCurrentTrack');
			} else {
				uri.index = this.currentPlayingTrackIndex;
				await this.$store.dispatch('controller/playArtitsTopTracks', uri);
			}
		},
		async fetchArtistTopTracks(artistID) {
			await axios
				.get(
					'https://api.spotify.com/v1/artists/' +
						artistID +
						'/top-tracks?market=US',
					{
						headers: {
							Accept: 'application/json',
							'Content-Type': 'application/json',
							Authorization: 'Bearer ' + this.getToken,
						},
					}
				)
				.then(({ data }) => {
					console.log(data);
					this.$store.dispatch('artists/topTracks', data.tracks);
				})
				.catch(err => console.log(err));
		},
		async openItem(_, e) {
			let type = this.contextType;
			let contextID = this.contextUri.split(':').slice(2);
			if (e.target.closest('#playBtn')?.id === 'playBtn') {
				const artistID = this.contextUri.split(':').slice(2);

				if (this.contextType === 'artist') {
					await this.fetchArtistTopTracks(artistID);
					await this.playArtistTopTracks();
				} else
					this.playContextUri({
						uri: this.contextUri,
						index: 0,
						type: this.contextType,
					});
			} else if (e.target.closest('.item--container')) {
				console.log(contextID, type);
				if (type === 'collection') {
					this.$router.push({
						name: `favTracks`,
					});
				} else
					this.$router.push({
						name: `${this.contextType}`,
						params: { id: `${contextID}` },
					});
			}
		},
		async playContextUri(uri) {
			console.log(
				this.isPlayingContextUri,
				'this.contextType ==>',
				this.contextType
			);
			console.log(uri);
			if (this.isPlayingContextUri) {
				await this.$store.dispatch('controller/pauseCurrentTrack');
			} else {
				uri.index = 0;
				await this.$store.dispatch('controller/playSelectedContext', uri);
			}
		},
	},
	computed: {
		getToken() {
			return this.$store.getters.accessToken;
		},
		contextID() {
			return this.contextType === 'artist'
				? this.item.track.artists[0].id
				: this.contextType === 'album'
				? this.item.context.uri.split(':').slice(2)
				: this.contextType === 'playlist'
				? this.item.context.uri.split(':').slice(2)
				: '';
		},
		contextName() {
			return this.contextType === 'artist'
				? this.item.track.artists[0].name
				: this.contextType === 'album'
				? this.item.track.album.name
				: this.contextType === 'playlist'
				? this.playlistName
				: this.contextType === 'collection'
				? this.collectionName
				: '';
		},

		contextImage() {
			return this.contextType === 'album'
				? this.item.track.album.images[1].url
				: this.contextType === 'playlist'
				? this.playlistImage
				: this.contextType === 'artist'
				? this.artistImage
				: this.contextType === 'collection'
				? this.item.track.image
				: '';
		},

		artistTopTracks() {
			return this.$store.getters['artists/getTopTracks'];
		},
		artistTopTrackUris() {
			return this.artistTopTracks.map(item => item.uri);
		},
		getCurrentlyPlayingTrack() {
			return this.$store.getters['controller/getCurrentlyPlayingTrack'];
		},
		currentTrackID() {
			return this.getCurrentlyPlayingTrack?.item?.id;
		},

		findCurrentPlayingTrackIndex() {
			return this.artistTopTracks.indexOf(
				this.artistTopTracks.find(item => item.id === this.currentTrackID)
			);
		},
		currentPlayingTrackIndex() {
			return this.findCurrentPlayingTrackIndex + 1
				? this.findCurrentPlayingTrackIndex
				: 0;
		},
		findArtistsID() {
			return this.getCurrentlyPlayingTrack?.item?.artists?.find(
				item => item.id === this.currentTrackID
			);
		},
		isPlayingArtistTopTracks() {
			return (
				this.findArtistsID &&
				!this.getCurrentlyPlayingTrack?.context &&
				this.getCurrentlyPlayingTrack?.is_playing
			);
		},
		isPlayingContextUri() {
			return (
				this.getCurrentlyPlayingTrack?.context?.uri === this.contextUri &&
				this.getCurrentlyPlayingTrack?.is_playing
			);
		},
	},

	async created() {
		if (this.contextType === 'playlist') {
			await this.fetchPlaylist();
		} else if (this.contextType === 'artist') {
			await this.fetchArtist();
		}
	},
};
</script>

<style></style>
