<template>
	<div
		@click="openItem(msg, $event)"
		class="item--container group xl:h-[5rem] sm:h-[4rem] min-w-[200px] flex items-center transition-colors duration-300 justify-start bg-opacwhite1 hover:bg-opacwhite2 relative rounded-md cursor-pointer box-border"
	>
		<div class="h-full shrink-0">
			<img
				class="mb:h-full object-cover rounded-l-sm"
				:src="itemImages"
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
				class="flex items-start mx-3 opacity-0 group-hover:opacity-100 transition ease-in duration-150 group-hover:block"
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
					class="hidden p-3 ml-3 bg-green3 rounded-full cursor-default lg:group-hover:block hover:scale-105 shadow-[0px_5px_6px_2px_rgba(0,0,0,0.4)]"
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
	</div>
</template>

<script>
export default {
	props: ['item', 'itemUri', 'contextType', 'contextUri', 'index'],
	data() {
		return {};
	},
	methods: {
		openItem(_, e) {
			if (!e.target.closest('.item--container')) {
				let contextID = this.contextUri.split(':').slice(2);
				this.$router.push({
					name: `${this.contextType}`,
					params: { id: `${contextID}` },
				});
			}
			if (e.target.closest('#playBtn')?.id === 'playBtn') {
				this.playContextUri({
					uri: this.contextUri,
					index: 0,
					type: this.contextType,
				});
			}
		},
		async playContextUri(uri) {
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
		contextName() {
			return this.contextType === 'artist'
				? this.item.track.artists[0].name
				: this.contextType === 'album'
				? this.item.track.album.name
				: this.item.track.album.name;
		},
		itemImages() {
			return this.contextType === 'album'
				? this.item.track.album.images[1].url
				: this.item.track.album.images[1].url;
		},
		currentTrackID() {
			return this.getCurrentlyPlayingTrack?.item?.id;
		},

		getCurrentlyPlayingTrack() {
			return this.$store.getters['controller/getCurrentlyPlayingTrack'];
		},
		isPlayingContextUri() {
			return (
				this.getCurrentlyPlayingTrack?.item.id === this.currentTrackID &&
				this.getCurrentlyPlayingTrack?.context === this.contextType &&
				this.getCurrentlyPlayingTrack?.is_playing
			);
		},
	},
	async created() {},
};
</script>

<style></style>
