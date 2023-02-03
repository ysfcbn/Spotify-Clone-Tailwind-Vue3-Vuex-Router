<template>
	<div
		:id="contextID"
		@click="openItem(msg, $event)"
		class="item--container group mb:h-[3.8rem] lg1:h-[4.5rem] min-w-[200px] flex items-center transition-colors duration-300 bg-opacwhite1 hover:bg-opacwhite2 relative rounded-md cursor-pointer box-border overflow-hidden"
	>
		<div class="h-full shrink-0">
			<img
				class="mb:h-full object-cover rounded-l-sm"
				:src="contextImage"
				alt="image"
			/>
		</div>
		<div class="h-full w-full flex items-center justify-between">
			<div class="relative left-5 md3:w-[65%] lg:w-[70%]">
				<h4 class="text-md text-white font-semibold line-clamp-2">
					{{ contextName }}
				</h4>
			</div>

			<div
				v-if="contextType === 'artist'"
				:class="{
					'opacity-0 ': !isPlayingArtistTopTracks,
					'sm:opacity-0 md2:opacity-100  ': isPlayingArtistTopTracks,
				}"
				class="flex items-start mx-3 md2:group-hover:opacity-100 bg-dark1 rounded-full transition ease-in duration-150"
			>
				<button
					@click="playArtistTopTracks"
					@mousedown="leftClick = true"
					@mouseup="leftClick = false"
					id="playBtn"
					:class="{
						' bg-green3/80 scale-80': leftClick,
						'hover:scale-106 bg-green3/95 hover:bg-green3': !leftClick,
					}"
					class="bg-cover p-3 rounded-full cursor-default shadow-[0px_5px_6px_2px_rgba(0,0,0,0.4)]"
				>
					<svg role="img" height="24" width="24" viewBox="0 0 24 24">
						<path
							v-if="isPlayingArtistTopTracks"
							fill="text-black"
							d="M5.7 3a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7H5.7zm10 0a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7h-2.6z"
						></path>
						<path
							v-else
							fill="text-black"
							d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"
						></path>
					</svg>
				</button>
			</div>
			<div
				v-else
				:class="{
					'opacity-0': !isPlayingContextUri,
					'sm:opacity-0 md2:opacity-100  ': isPlayingContextUri,
				}"
				class="mx-3 md2:group-hover:opacity-100 transition ease-in duration-150"
			>
				<button
					id="playBtn"
					@click="
						playContextUri(
							(uri = {
								uri: contextUri,
								index: currentPlayingTrackIndex,
								type: contextType,
							}),
							(href = item?.context?.href)
						)
					"
					@mousedown="leftClick = true"
					@mouseup="leftClick = false"
					:class="{
						' bg-green3/80 scale-80': leftClick,
						'hover:scale-105 bg-green3/95 hover:bg-green3': !leftClick,
					}"
					class="p-[10px] rounded-full cursor-default shadow-[0px_5px_6px_2px_rgba(0,0,0,0.4)]"
				>
					<svg role="img" height="22" width="22" viewBox="0 0 24 24">
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
			leftClick: false,
			artistID: null,
			collectionName: 'Beğenilen Şarkılar',
		};
	},
	methods: {
		async fetchPlaylist(href = this.item.context.href) {
			await axios
				.get(href, {
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + this.getToken,
					},
				})
				.then(({ data }) => {
					this.playlistImage = data.images[0].url;
					this.playlistName = data.name;
					this.$store.dispatch('playlists/getPlaylist', data);
				})
				.catch(err => console.log(err));
		},
		async fetchAlbum(href) {
			await axios
				.get(href, {
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + this.getToken,
					},
				})
				.then(({ data }) => {
					console.log(this.item);
					this.$store.dispatch('albums/getAlbum', data);
				})
				.catch(err => console.log(err));
		},
		async fetchArtist(href = this.item.context.href, selectedArtist = false) {
			await axios
				.get(href, {
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + this.getToken,
					},
				})
				.then(({ data }) => {
					this.artistImage = data.images[1].url;
					if (selectedArtist) {
						console.log(data);
						this.$store.dispatch('artists/currentArtist', data);
					}
				})
				.catch(err => console.log(err));
		},
		async playArtistTopTracks(uri) {
			console.log(this.isPlayingArtistTopTracks);
			console.log(uri);
			console.log(this.artistID);
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
			const contextID = this.contextUri.split(':').slice(2);
			if (e.target.closest('#playBtn')?.id === 'playBtn') {
				if (this.contextType === 'artist') {
					this.artistID = contextID[0];
					await this.fetchArtistTopTracks(this.artistID);
					await this.fetchArtist(
						'https://api.spotify.com/v1/artists/' + this.artistID,
						true
					);
					await this.playArtistTopTracks({
						uri: this.artistTopTrackUris,
						index: this.currentPlayingTrackIndex,
						type: this.contextType,
						artistID: this.artistID,
					});
				} else
					this.playContextUri(
						{
							uri: this.contextUri,
							index: this.currentPlayingTrackIndex,
							type: this.contextType,
							id: this.currentTrackID,
						},
						this.item?.context?.href
					);
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
		async playContextUri(uri, href) {
			console.log(uri);
			if (this.isPlayingContextUri) {
				await this.$store.dispatch('controller/pauseCurrentTrack');
			} else {
				if ((await uri.type) === 'playlist') {
					this.typeOfSelectedSection = 'playlist';
					await this.fetchPlaylist(href);
					if (
						this.getCurrentlyPlayingTrack?.context.type ===
						this.typeOfSelectedSection
					) {
						uri.id =
							this.currentPlaylist[this.currentPlayingTrackIndex]?.track.id;
					}
				} else if ((await uri.type) === 'album') {
					this.typeOfSelectedSection = 'album';
					await this.fetchAlbum(href);
					if (
						this.getCurrentlyPlayingTrack?.context.type ===
						this.typeOfSelectedSection
					) {
						uri.id = this.currentAlbumTracks[this.currentPlayingTrackIndex]?.id;
					}
				}
				uri.index = this.currentPlayingTrackIndex;
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
		currentAlbumTracks() {
			return this.$store.getters['albums/getAlbum']?.tracks?.items;
		},
		currentPlaylist() {
			return this.$store.getters['playlists/getPlaylist']?.tracks?.items;
		},
		currentArtist() {
			return this.$store.getters['artists/getCurrentArtist'];
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
		getFavTracks() {
			return this.$store.getters['favTracks/getTracks']?.items;
		},
		findCurrentPlayingTrackIndex() {
			return this.contextType === 'playlist' &&
				this.contextType === this.getCurrentlyPlayingTrack?.context.type
				? this.currentPlaylist?.indexOf(
						this.currentPlaylist?.find(
							item => item.track.id === this.currentTrackID
						)
				  )
				: this.contextType === 'album' &&
				  this.contextType === this.getCurrentlyPlayingTrack?.context.type
				? this.currentAlbumTracks?.indexOf(
						this.currentAlbumTracks?.find(
							item => item.id === this.currentTrackID
						)
				  )
				: this.contextType === 'artist' &&
				  this.contextType === this.getCurrentlyPlayingTrack?.context.type
				? this.artistTopTracks.indexOf(
						this.artistTopTracks.find(item => item.id === this.currentTrackID)
				  )
				: this.contextType === 'collection' &&
				  this.contextType === this.getCurrentlyPlayingTrack?.context.type
				? this.getFavTracks.indexOf(
						this.getFavTracks.find(
							item => item.track.id === this.currentTrackID
						)
				  )
				: 0;
		},
		currentPlayingTrackIndex() {
			return this.findCurrentPlayingTrackIndex + 1
				? this.findCurrentPlayingTrackIndex
				: 0;
		},
		isArtistContext() {
			return this.$store.getters['controller/isArtistContext'];
		},
		isPlayingArtistTopTracks() {
			return (
				this.getCurrentlyPlayingTrack?.item?.artists[0].id ===
					this.item?.track.artists[0].id &&
				!this.getCurrentlyPlayingTrack?.context &&
				this.getCurrentlyPlayingTrack?.is_playing &&
				this.isArtistContext
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
