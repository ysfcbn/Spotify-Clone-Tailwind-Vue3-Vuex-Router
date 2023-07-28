<template>
	<section class="mb-12 relative z-70">
		<div class="flex justify-between h-[3.3rem]">
			<div class="h-fit flex flex-col gap-1">
				<h2
					class="text-[1.3rem] text-white leading-7 tracking-tighter hover:underline hover:text-underline-offset-8 cursor-pointer"
					style="font-weight: 700"
				>
					<slot name="cardTitle"></slot>
				</h2>
				<h6 v-if="userPage" class="text-lightest text-sm">
					Only visible to you
				</h6>
			</div>
			<div class="">
				<h6
					style="font-weight: 700"
					class="h-full mb:text-[11px] leading-10 text-lightest hover:underline cursor-pointer pb-2 px-2 tracking-widest font-semibold"
				>
					<slot name="seeMore"> Show all</slot>
				</h6>
			</div>
		</div>

		<div
			v-if="artistPage"
			class="relative w-full h-full grid col-span-full pb-5"
		>
			<div class="flex items-center justify-start text-sm">
				<button
					@click="togglePublications"
					:class="popPublications ? 'active' : 'inactive'"
					class="w-fit h-fit rounded-full px-3 py-[6px] cursor-default bg-dark2 hover:bg-dark3/70 transition duration-200"
				>
					<span>Popular releases</span>
				</button>
				<button
					@click="toggleAlbums"
					:class="albums ? 'active' : 'inactive'"
					class="w-fit h-fit rounded-full px-3 py-[6px] mx-2 cursor-default bg-dark2 hover:bg-dark3/70 transition duration-200"
				>
					<span>Albums</span>
				</button>
				<button
					@click="toggleSingles"
					:class="singles ? 'active' : 'inactive'"
					class="w-fit h-fit rounded-full px-3 py-[6px] cursor-default bg-dark2 hover:bg-dark3/70 transition duration-200"
				>
					<span>Singles and EPs</span>
				</button>
				<button
					v-if="isCompExist"
					@click="toggleCompilations"
					:class="compilations ? 'active' : 'inactive'"
					class="w-fit h-fit rounded-full px-3 py-[6px] cursor-default bg-dark2 hover:bg-dark3/70 transition duration-200 mx-2"
				>
					<span>Compilations</span>
				</button>
			</div>
		</div>
		<!-- Cards -->
		<div
			:class="{
				'mt-4': userPage,

				'auto-rows-auto gap-6': !userPage && getSearchCategoryType !== 'all',
				'auto-rows-0 overflow-hidden grid-rows-1 gap-x-6': !genrePage,
			}"
			class="relative grid grid-cols-col180"
		>
			<div
				v-show="data"
				@click="openCard((data = data), $event)"
				v-for="(data, i) in currentData"
				:key="
					recentlyPlayedTracks
						? data?.track?.album?.id
						: dummyCards
						? data[i]?.id
						: data.id
				"
				:id="
					shows
						? data?.show?.id
						: artists
						? data?.id
						: albums
						? data?.album?.id
						: data?.context?.type === 'artist' && recentlyPlayedCards
						? data?.track?.artists[0]?.id
						: data?.context?.type === 'playlist' && recentlyPlayedCards
						? data?.context?.uri.split(':').slice(2)
						: recentlyPlayedTracks || recentlyPlayedCards
						? data?.track?.album?.id
						: dummyCards
						? data[i]?.id
						: data?.id
				"
				:style="{ 'z-index': currentData.length - i }"
				class="card--container group bg-dark1 hover:bg-opacwhite1 ease duration-300 w-full cursor-pointer rounded-md flex-1 p-4 relative"
			>
				<div class="h-full w-full relative">
					<div
						:class="{
							'h-[65%] mb-[10%] w-full z-10': artists,
							'mb-5': !artists,
						}"
						class="w-full relative"
					>
						<slot name="imgContainer" :data="data"> </slot>
						<slot name="playBtn" :data="data">
							<div
								v-if="!shows && !follows && !topResultShows && !episodes"
								class="right-0 bottom-0 absolute flex items-center py-1 px-2 group-hover:block opacity-0 group-hover:opacity-100 transition ease-in duration-200 group-hover:translate-y-[-0.4rem]"
							>
								<button
									id="playBtn"
									class="p-[10px] bg-green3 rounded-full cursor-default lg:group-hover:block hover:scale-110 shadow-[0px_5px_6px_2px_rgba(0,0,0,0.4)]"
								>
									<h1 class="text-white"></h1>
									<svg role="img" height="24" width="24" viewBox="0 0 24 24">
										<path
											v-if="false"
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
						</slot>
					</div>

					<div class="flex items-middle flex-col justify-center">
						<div
							class="text-white max-w-full text-[15px] truncate font-semibold"
						>
							<slot name="firstTitle" :data="data"></slot>
						</div>

						<div class="text-[13px] text-lightest w-full line-clamp-2 mt-1">
							<slot name="secondTitle" :data="data">
								<span v-if="data?.context?.type === 'playlist'">
									{{ playlistDesc }}
								</span>
								<router-link
									v-else
									class="hover:underline"
									v-for="artist in data?.track?.artists"
									:key="artist?.id"
									:to="{ name: 'artist', params: { id: `${artist.id}` } }"
								>
									{{
										data.track.artists.length > 1
											? artist.name ===
											  data.track.artists[data.track.artists.length - 1].name
												? artist.name
												: artist.name + ', '
											: artist.name
									}}
								</router-link>
							</slot>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import axios from 'axios';
export default {
	name: 'Card',
	props: [
		'currentData',
		'contextType',
		'artistPage',
		'userPage',
		'follows',
		'shows',
		'topResultShows',
		'episodes',
		'genrePage',
		'popPublications',
		'albums',
		'singles',
		'artists',
		'recentlyPlayedTracks',
		'recentlyPlayedCards',
		'dummyCards',
		'severalPlaylist',
		'compilations',
		'togglePublications',
		'toggleAlbums',
		'toggleSingles',
		'toggleCompilations',
	],
	data() {
		return {
			playlistID: '',
			isCardPlaying: false,
			playlistImage: null,
			playlistDesc: null,
			artistImage: null,
			index: '',
		};
	},
	computed: {
		getToken() {
			return this.$store.getters.accessToken;
		},
		isCompExist() {
			return this.$store.getters['discography/isCompExist'];
		},
	},
	methods: {
		async openCard(data, e) {
			console.log(data);
			const cardID = e.target.closest('.card--container').id;
			let type = data?.context?.type;
			if (!type) {
				type = data?.album?.type ? data?.album?.type : data?.type;
			}

			if (e.target.closest('#playBtn')?.id === 'playBtn') return;

			if (type) {
				console.log('CARD CONTEXT TYPE!!!!!', type);
				type === 'album'
					? this.$router.push({ name: 'album', params: { id: cardID } })
					: type === 'artist'
					? this.$router.push({ name: 'artist', params: { id: cardID } })
					: '';
				if (type === 'playlist') {
					this.$router.push({
						name: 'playlist',
						params: { id: `${cardID}` },
					});
				}
				if (this.topResultShows) {
					this.$router.push({ name: 'show', params: { id: cardID } });
				}
				if (this.episodes) {
					this.$router.push({ name: 'episode', params: { id: cardID } });
				}
			} else if (this.artists) {
				this.$router.push({ name: 'artist', params: { id: cardID } });
			} else if (this.shows) {
				this.$router.push({ name: 'show', params: { id: cardID } });
			} else {
				this.$router.push({ name: 'album', params: { id: cardID } });
			}
		},
		async fetchPlaylist(href) {
			return await axios
				.get(href, {
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + this.getToken,
					},
				})
				.then(({ data }) => {
					console.log(data);
					console.log(data.images[1].url);
					this.playlistImage = data.images[1].url;
					this.playlistDesc = data.description;
				})
				.catch(err => console.log(err));
		},
		async fetchArtist(href) {
			return await axios
				.get(href, {
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + this.getToken,
					},
				})
				.then(({ data }) => {
					console.log(data.images[0].url);
					this.artistImage = data.images[0].url;
				})
				.catch(err => console.log(err));
		},
	},
	computed: {
		getSearchCategoryType() {
			return this.$store.getters['searchItem/getSearchCategoryType'];
		},
	},

	async created() {},
};
</script>

<style scoped>
.active {
	background-color: white !important;
	color: #000000 !important;
	font-weight: 500;
}
.inactive {
	background-color: #282828 !important;
	color: white !important;
	font-weight: 500;
}
</style>
