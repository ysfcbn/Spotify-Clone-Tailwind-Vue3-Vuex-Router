<template>
	<div
		@click="openSelectedAlbum((album = data), $event)"
		class="card--container bg-dark1 hover:bg-opacblack1 ease duration-300 w-full h-auto cursor-pointer rounded-md flex-1 p-4 relative"
	>
		<div class="h-full group">
			<div class="w-full mb-5 relative">
				<img
					class="h-full w-full object-cover"
					:src="data?.images[0]?.url"
					alt=""
				/>
				<div
					:class="{
						'opacity-100 translate-y-[-0.4rem]': isPlayingContextUri,
						'opacity-0': !isPlayingContextUri,
					}"
					class="bg-dark rounded-full right-0 bottom-0 absolute flex items-center mx-1 group-hover:block group-hover:opacity-100 transition ease-in duration-200 group-hover:translate-y-[-0.4rem]"
				>
					<button
						@mousedown="leftClick = true"
						@mouseup="leftClick = false"
						id="playBtn"
						:class="{
							' bg-green3/80 scale-80': leftClick,
							'hover:scale-106 bg-green3/95 hover:bg-green3': !leftClick,
						}"
						class="p-[10px] rounded-full cursor-default shadow-[0px_5px_6px_2px_rgba(0,0,0,0.4)]"
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
				<div class="text-white max-w-full truncate">{{ data.name }}</div>
				<div class="text-sm text-lightest w-full mt-2">
					{{ cartAlbumYear(data.release_date) }}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';

export default {
	name: 'CardList',
	props: ['data', 'diskografiPage', 'renderTypes', 'indx', 'viewCard'],
	data() {
		return { leftClick: false };
	},
	computed: {
		getToken() {
			return this.$store.getters.accessToken;
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
				this.getCurrentlyPlayingTrack?.context?.uri ===
					this.renderTypes[this.indx].uri &&
				this.getCurrentlyPlayingTrack?.is_playing
			);
		},
	},
	methods: {
		async openSelectedAlbum(data, e) {
			const cardID = e.target.closest('.card--container').id;
			if (e.target.closest('#playBtn')?.id === 'playBtn') {
				await this.fetchAlbum(data?.href);
				await this.playContextUri({
					uri: data.uri,
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
				uri.type = 'album';
				uri.id = this.currentAlbumTracks[this.currentPlayingTrackIndex]?.id;
				uri.index = this.currentPlayingTrackIndex;
				await this.$store.dispatch('controller/playSelectedContext', uri);
			}
		},
		cartAlbumYear(currentSection) {
			return new Date(currentSection).getFullYear();
		},
	},

	mounted() {
		if (this.viewCard) {
			console.log('CardList Mounted!');

			this.header = document.getElementById('header');
			this.diskoHeader = document.getElementById('diskoHeader');
			this.CardEl = document.getElementById('cardIntersect');

			this.header.classList.remove('disko-intersec-bg1');
			this.diskoHeader.classList.remove('list--view-intersect');

			this.options = {
				root: null,
				threshold: 0.5,
			};

			this.observer = new IntersectionObserver((entries, obs) => {
				if (entries[0].intersectionRatio <= 0.5) {
					this.header.classList.add('disko-intersec-bg1');

					this.diskoHeader.classList.add('list--view-intersect');
				} else {
					this.header.classList.remove('disko-intersec-bg1');

					this.diskoHeader.classList.remove('list--view-intersect');
				}
			}, this.options);

			this.observer.observe(this.CardEl);
		}
	},
	beforeUnmount() {
		this.observer.unobserve(this.CardEl);
		this.header.classList.remove('disko-intersec-bg1');
		this.diskoHeader.classList.remove('list--view-intersect');
	},
};
</script>

<style></style>
