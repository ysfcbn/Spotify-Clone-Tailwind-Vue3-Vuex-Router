<template>
	<section class="genre-page p-5 lg:ml-[1rem]">
		<div id="genres" class="items-center flex min-h-[240px] w-full relative">
			<div class="text-white font-semibold">
				<h1
					class="w-full sm:text-8xl tracking-tighter"
					style="font-weight: 700"
				>
					{{ genreTitle }}
				</h1>
			</div>
		</div>

		<Card :genrePage="genrePage" :currentData="currentCategoryPlaylists">
			<template #cardTitle> {{ genreTitle }}</template>

			<template #imgContainer="{ data }">
				<div class="w-full relative mb-5">
					<img
						class="h-full w-full object-cover"
						:src="data?.images[0]?.url"
						alt="image"
					/>
				</div>
			</template>
			<template #firstTitle="{ data }">{{ data.name }}</template>
			<template #secondTitle="{ data }"
				><span>{{ data.description }}</span>
			</template>
			<template #playBtn="{ data }">
				<div
					:class="
						data?.uri === getCurrentlyPlayingTrack?.context?.uri &&
						getCurrentlyPlayingTrack?.is_playing
							? 'opacity-100 translate-y-[-0.4rem]'
							: 'opacity-0'
					"
					class="bg-dark1 rounded-full right-0 bottom-0 absolute flex items-center mx-2 group-hover:block group-hover:opacity-100 transition ease-in duration-200 group-hover:translate-y-[-0.4rem]"
				>
					<button
						@click="
							playContextUri(
								(uri = {
									uri: data?.uri,
									index: currentPlayingTrackIndex,
									type: data?.type,
									name: data?.name,
								}),
								(href = data?.href)
							)
						"
						@mousedown="leftClick = true"
						@mouseup="leftClick = false"
						id="playBtn"
						:class="{
							' bg-green3/80 scale-80': leftClick,
							'hover:scale-106 bg-green3/95 hover:bg-green3 ': !leftClick,
						}"
						class="p-[11px] rounded-full cursor-default shadow-[0px_5px_6px_2px_rgba(0,0,0,0.4)]"
					>
						<h1 class="text-white"></h1>
						<svg role="img" height="20" width="20" viewBox="0 0 24 24">
							<path
								v-if="
									data?.uri === getCurrentlyPlayingTrack?.context?.uri &&
									getCurrentlyPlayingTrack?.is_playing
								"
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
			</template>
		</Card>
		<section>
			<Info />
		</section>
	</section>
</template>

<script>
import Info from '../SpotifyInfo/Info.vue';
import axios from 'axios';
import Card from '../Cards/Card.vue';

export default {
	name: 'genrePage',
	props: {
		id: {
			type: String,
			required: true,
		},
	},
	components: { Info, Card },
	data() {
		return { genrePage: false, leftClick: false };
	},
	methods: {
		async fetchCategoryPlaylists() {
			await axios
				.get(
					`https://api.spotify.com/v1/browse/categories/${this.$route.params.id}/playlists?limit=50`,
					{
						headers: {
							Accept: 'application/json',
							'Content-Type': 'application/json',
							Authorization: 'Bearer ' + (await this.getToken),
						},
					}
				)
				.then(({ data }) => {
					console.log(data);
					this.$store.dispatch('genres/currentCategoryPlaylists', data);
				})
				.catch(err => console.log(err));
		},
		async fetchPlaylist(href) {
			await axios
				.get(href, {
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + this.getToken,
					},
				})
				.then(({ data }) => {
					this.$store.dispatch('playlists/getPlaylist', data);
				})
				.catch(err => console.log(err));
		},

		async playContextUri(uri, href) {
			console.log(uri);
			if (
				uri.uri === this.getCurrentlyPlayingTrack?.context?.uri &&
				this.getCurrentlyPlayingTrack?.is_playing
			) {
				await this.$store.dispatch('controller/pauseCurrentTrack');
			} else {
				await this.fetchPlaylist(href);
				uri.id =
					this.currentPlaylistTracks[this.currentPlayingTrackIndex]?.track.id;
				uri.index = this.currentPlayingTrackIndex;
				console.log(uri);
				await this.$store.dispatch('controller/playSelectedContext', uri);
			}
		},
	},
	computed: {
		isAuth() {
			return this.$store.getters.isAuth;
		},
		getToken() {
			return this.$store.getters.accessToken;
		},
		getToken() {
			return this.$store.getters.accessToken;
		},
		getCurrentlyPlayingTrack() {
			return this.$store.getters['controller/getCurrentlyPlayingTrack'];
		},
		currentTrackID() {
			return this.getCurrentlyPlayingTrack?.item?.id;
		},
		currentPlaylistTracks() {
			return this.$store.getters['playlists/getPlaylist']?.tracks?.items;
		},
		findCurrentPlayingTrackIndex() {
			return this.currentPlaylistTracks?.indexOf(
				this.currentPlaylistTracks?.find(
					item => item.track.id === this.currentTrackID
				)
			);
		},
		currentPlayingTrackIndex() {
			return this.findCurrentPlayingTrackIndex + 1
				? this.findCurrentPlayingTrackIndex
				: 0;
		},
		currentCategoryPlaylists() {
			return this.$store.getters['genres/getCurrentCategoryPlaylists']
				?.playlists?.items;
		},
		genreTitle() {
			return this.$store.getters['genres/getGenreTitle'];
		},
	},
	async created() {
		console.log('genrePage Mounted');
		this.genrePage = true;

		await this.fetchCategoryPlaylists();

		this.header = document.getElementById('header');
		this.genreEl = document.getElementById('genres');

		this.headerHeight = document
			.getElementById('header')
			.getBoundingClientRect().height;

		this.options = {
			root: null,
			threshold: [0.4, 0.95],
			rootMargin: `-${this.headerHeight}px`,
		};

		this.observer = new IntersectionObserver(entries => {
			console.log(entries);

			this.header.classList.toggle(
				'base-intersec-bg1',
				entries[0].intersectionRatio <= 0.95
			);

			this.header.classList.toggle(
				'base-intersec-bg2',
				entries[0].intersectionRatio <= 0.4
			);

			entries[0].intersectionRatio >= 0.4
				? this.$store.dispatch('controller/closeHeaderBtn')
				: this.$store.dispatch('controller/showHeaderBtn');
		}, this.options);
		console.log(this.observer);

		this.observer.observe(this.genreEl);
	},
	beforeUnmount() {
		console.log('genrePage Unmounted');
		this.observer.unobserve(this.genreEl);
		this.header.classList.remove('base-intersec-bg1');
		this.header.classList.remove('base-intersec-bg2');
		this.genrePage = false;
	},
};
</script>

<style></style>
