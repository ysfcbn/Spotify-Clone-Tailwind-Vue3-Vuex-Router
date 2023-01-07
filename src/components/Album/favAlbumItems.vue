<template>
	<div
		@click="openSelectedAlbum((album = album), $event)"
		class="album--card bg-dark1 hover:bg-opacblack1 ease duration-300 w-full h-auto cursor-pointer rounded-md flex-1 p-4 relative"
	>
		<div class="h-full group">
			<div class="w-full mb-5 relative">
				<img
					class="h-full w-full object-cover"
					:src="album?.images[0]?.url"
					alt=""
				/>
				<div
					:class="{
						'opacity-100 translate-y-[-0.4rem]': isPlayingContextUri,
					}"
					class="bg-dark1 rounded-full right-0 bottom-0 absolute flex items-center right-0 bottom-0 my-1 mx-2 group-hover:block opacity-0 group-hover:opacity-100 transition ease-in duration-200 group-hover:translate-y-[-0.4rem]"
				>
					<button
						@mousedown="leftClick = true"
						@mouseup="leftClick = false"
						id="playBtn"
						:class="{
							' bg-green3/80 scale-80': leftClick,
							'hover:scale-110 bg-green3/95 hover:bg-green3': !leftClick,
						}"
						class="p-3 rounded-full cursor-default shadow-[0px_5px_6px_2px_rgba(0,0,0,0.4)]"
					>
						<span>
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
						</span>
					</button>
				</div>
			</div>
			<div class="flex items-middle flex-col justify-center">
				<h2 class="text-white max-w-full truncate">
					{{ album.name }}
				</h2>
				<div class="text-lightest line-clamp-2">
					<span
						v-for="artist in album.artists"
						:key="artist.id"
						:id="artist.id"
						class="artist--card text-sm hover:underline cursor-pointer w-full"
					>
						{{
							album.artists.length > 1
								? artist.name === album.artists[album.artists.length - 1].name
									? artist.name
									: artist.name + ', '
								: artist.name
						}}
					</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';

export default {
	props: ['album'],
	data() {
		return { leftClick: false };
	},
	methods: {
		async openSelectedAlbum(album, e) {
			const cardID = e.target.closest('.album--card').id;
			if (e.target.closest('#playBtn')?.id === 'playBtn') {
				await this.fetchAlbum(album?.href);
				await this.playContextUri({
					uri: album.uri,
					index: this.currentPlayingTrackIndex,
					type: 'album',
				});
			} else {
				this.$router.push({ name: 'album', params: { id: cardID } });
			}
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
					this.$store.dispatch('albums/getAlbum', data);
				})
				.catch(err => console.log(err));
		},
		async playContextUri(uri) {
			if (this.isPlayingContextUri) {
				await this.$store.dispatch('controller/pauseCurrentTrack');
			} else {
				uri.index = this.currentPlayingTrackIndex;
				await this.$store.dispatch('controller/playSelectedContext', uri);
			}
		},
	},
	computed: {
		getToken() {
			return this.$store.getters.accessToken;
		},
		getFavAlbums() {
			return this.$store.getters['albums/getFavAlbums'];
		},

		currentAlbumTracks() {
			return this.$store.getters['albums/getAlbum']?.tracks?.items;
		},
		getCurrentlyPlayingTrack() {
			return this.$store.getters['controller/getCurrentlyPlayingTrack'];
		},
		currentTrackID() {
			return this.getCurrentlyPlayingTrack?.item?.id;
		},

		findCurrentPlayingTrackIndex() {
			return this.currentAlbumTracks?.indexOf(
				this.currentAlbumTracks?.find(item => item.id === this.currentTrackID)
			);
		},
		currentPlayingTrackIndex() {
			return this.findCurrentPlayingTrackIndex + 1
				? this.findCurrentPlayingTrackIndex
				: 0;
		},
		isPlayingContextUri() {
			return (
				this.getCurrentlyPlayingTrack?.context?.uri === this.album.uri &&
				this.getCurrentlyPlayingTrack?.is_playing
			);
		},
	},
};
</script>

<style></style>
