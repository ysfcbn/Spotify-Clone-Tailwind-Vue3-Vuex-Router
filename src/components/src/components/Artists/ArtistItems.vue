<template>
	<!-- Cards -->
	<button
		@click="selectedArtist(msg, $event)"
		class="artist--card bg-dark1 hover:bg-opacblack1 ease duration-300 w-full h-auto cursor-pointer rounded-md flex-1 isolate p-4 relative"
	>
		<div class="h-full group">
			<div class="w-full mb-5 relative">
				<img
					class="h-full w-full object-cover rounded-full shadow-[0px_5px_15px_8px_rgba(0,0,0,0.4)]"
					:src="artist?.images[0]?.url"
					alt="artist"
				/>
				<div
					:class="{
						'opacity-100 translate-y-[-0.4rem]': isPlayingArtistTopTracks,
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
						</span>
					</button>
				</div>
			</div>
			<div class="flex items-start flex-col justify-center">
				<div class="text-white max-w-full truncate">
					{{ artist.name }}
				</div>
				<div class="text-sm text-lightest max-w-full truncate capitalize">
					{{ artist.type }}
				</div>
			</div>
		</div>
	</button>
</template>

<script>
import axios from 'axios';

export default {
	props: ['artist'],
	data() {
		return {
			leftClick: false,
		};
	},
	methods: {
		async selectedArtist(_, event) {
			const cardID = event.target.closest('.artist--card').id;
			if (event.target.closest('#playBtn')?.id === 'playBtn') {
				await this.fetchArtistTopTracks(cardID);
				await this.fetchArtist(
					'https://api.spotify.com/v1/artists/' + cardID,
					true
				);
				await this.playArtistTopTracks({
					uri: this.artistTopTrackUris,
					index: this.currentPlayingTrackIndex,
					type: 'artist',
					artistID: cardID,
				});
			} else {
				this.$router.push({ name: 'artist', params: { id: cardID } });
			}
		},
		async fetchArtist(href) {
			await axios
				.get(href, {
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + this.getToken,
					},
				})
				.then(({ data }) => {
					this.$store.dispatch('artists/currentArtist', data);
				})
				.catch(err => console.log(err));
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
		async playArtistTopTracks(uri) {
			console.log(uri);
			console.log(uri.index);
			if (this.isPlayingArtistTopTracks) {
				await this.$store.dispatch('controller/pauseCurrentTrack');
			} else {
				uri.index = await this.currentPlayingTrackIndex;
				await this.$store.dispatch('controller/playArtitsTopTracks', uri);
			}
		},
	},
	computed: {
		getToken() {
			return this.$store.getters.accessToken;
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

		isPlayingArtistTopTracks() {
			return (
				this.getCurrentlyPlayingTrack?.item?.artists[0].id === this.artist.id &&
				!this.getCurrentlyPlayingTrack?.context &&
				this.getCurrentlyPlayingTrack?.is_playing
			);
		},
	},
};
</script>

<style></style>
