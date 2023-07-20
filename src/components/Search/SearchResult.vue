<template>
	<div class="Search-Result p-4 lg:ml-[1rem] mx-4">
		<div class="relative">
			<div class="flex items-center justify-start text-sm overflow-x-auto">
				<button
					class="w-fit h-fit rounded-full px-3 py-[6px] cursor-default bg-dark2 transition duration-200"
				>
					<span class="text-white">All</span>
				</button>
				<button
					class="w-fit h-fit rounded-full px-3 py-[6px] mx-2 cursor-default bg-dark2 hover:bg-dark3/70 transition duration-200"
				>
					<span class="text-white">Playlists</span>
				</button>
				<button
					class="min-w-fit h-fit rounded-full px-3 py-[6px] cursor-default bg-dark2 hover:bg-dark3/70 transition duration-200"
				>
					<span class="text-white">Podcasts & Shows</span>
				</button>
				<button
					class="w-fit h-fit rounded-full px-3 py-[6px] cursor-default bg-dark2 hover:bg-dark3/70 transition duration-200 mx-2"
				>
					<span class="text-white">Artists</span>
				</button>
				<button
					class="w-fit h-fit rounded-full px-3 py-[6px] cursor-default bg-dark2 hover:bg-dark3/70 transition duration-200 mx-2"
				>
					<span class="text-white">Songs</span>
				</button>
				<button
					class="w-fit h-fit rounded-full px-3 py-[6px] cursor-default bg-dark2 hover:bg-dark3/70 transition duration-200 mx-2"
				>
					<span class="text-white">Profiles</span>
				</button>
				<button
					class="min-w-fit h-fit rounded-full px-3 py-[6px] cursor-default bg-dark2 hover:bg-dark3/70 transition duration-200 mx-2"
				>
					<span class="text-white">Genres & Moods</span>
				</button>
				<button
					class="w-fit h-fit rounded-full px-3 py-[6px] cursor-default bg-dark2 hover:bg-dark3/70 transition duration-200 mx-2"
				>
					<span class="text-white">Albums</span>
				</button>
			</div>
			<div class="grid grid-cols-10 mt-4 gap-6">
				<div
					:id="getTopResult?.id"
					@click="selectedCard((type = getTopResult?.type), $event)"
					class="min-w-[22rem] max-w-[28rem] lg1:col-span-4 sm:col-span-4 sm:col-start-1 sm:col-span-7 lg1:row-start-1 lg1:col-start-1 cursor-pointer"
				>
					<h2 class="cursor-default text-white pb-4 text-2xl font-semibold">
						Top Result
					</h2>
					<div
						class="relative flex flex-col bg-dark2 rounded-lg group hover:bg-opacwhite1/20 ease duration-300 py-2"
					>
						<div
							v-if="topResultType !== 'episode' && topResultType !== 'show'"
							class="right-2 bottom-2 absolute flex items-center py-1 px-2 group-hover:block opacity-0 group-hover:opacity-100 transition ease-in duration-200 group-hover:translate-y-[-0.4rem]"
						>
							<button
								@click="
									playContextUri(
										(uri = {
											uri: playlist.uri,
											index: 0,
											type: 'playlist',
										}),
										(href = playlist.href)
									)
								"
								@mousedown="leftClick = true"
								@mouseup="leftClick = false"
								id="playBtn"
								:class="{
									'bg-green3/80 scale-80': leftClick,
									'hover:scale-106 bg-green3/95 hover:bg-green3': !leftClick,
								}"
								class="p-[10px] bg-green3 rounded-full lg:group-hover:block hover:scale-110 shadow-[0px_5px_6px_2px_rgba(0,0,0,0.4)]"
							>
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
						<div class="ml-4 mt-2 self-start w-20 h-20">
							<img
								:class="[
									topResultType === 'artist'
										? 'rounded-full shadow-[0_6px_20px_5px_rgba(0,0,0,0.8)]'
										: 'rounded-lg shadow-[0_8px_40px_10px_rgba(0,0,0,0.2)]',
								]"
								class="w-20 h-20"
								:src="topResultImage"
								alt="deneme"
							/>
						</div>
						<div class="p-4 w-[90%]">
							<h2 class="text-white font-semibold text-2xl line-clamp-1">
								{{ getTopResult?.name }}
							</h2>
						</div>
						<div class="flex items-center w-[70%]">
							<div class="pl-4 flex flex-wrap items-center gap-1 h-[2rem]">
								<div
									v-if="topResultType === 'episode'"
									class="flex items-center justify- text-opacwhite1/50 text-sm"
								>
									<p class="">{{ currentReleaseDate() }}</p>
									<p class="before:content-['·'] before:px-1">
										<span> {{ totalDuration(getTopResult?.duration_ms) }}</span>
									</p>
								</div>
								<div
									v-if="topResultType === 'show'"
									class="text-opacwhite1/50 text-sm"
								>
									<p class="">{{ getTopResult?.publisher }}</p>
								</div>
								<router-link
									v-show="
										topResultType === 'track' || topResultType === 'album'
									"
									class="hover:underline text-opacwhite/60 text-xs block"
									v-for="artist in getTopResult?.artists"
									:key="artist.id"
									:to="{ name: 'artist', params: { id: `${artist.id}` } }"
								>
									{{
										getTopResult?.artists.length > 1
											? artist.name ===
											  getTopResult?.artists[getTopResult?.artists.length - 1]
													.name
												? artist.name
												: artist.name + ', '
											: artist.name
									}}
								</router-link>
								<span
									v-if="topResultType === 'playlist'"
									class="text-sm text-opacwhite/40"
									>By
									{{
										topResultType === 'playlist'
											? getTopResult?.owner?.display_name
											: ''
									}}</span
								>
								<p
									style="font-weight: 700"
									:class="{
										'ml-1': topResultType !== 'artist',
									}"
									class="w-fit rounded-full bg-dark1 text-white text-xs px-3 py-1 capitalize"
								>
									{{ topResultTypeName }}
								</p>
							</div>
						</div>
					</div>
				</div>
				<div
					class="min-w-[25rem] lg1:col-span-6 sm:row-start-2 sm:col-span-full lg1:row-start-1"
				>
					<h2 class="text-white pb-4 text-2xl font-semibold">Songs</h2>
					<div class="relative flex h-full rounded-lg">
						<div class="overflow-hidden wrapper">
							<TrackItems
								v-for="(track, i) in getSongs"
								:key="track.id"
								:id="track.id"
								:track="track"
								:uri="track.uri"
								:searchResult="true"
								:itemUri="track.uri"
								:trackID="track.id"
								:index="i"
								:margin="true"
							>
								<template #trackImg>
									<img
										class="object-fit w-[40px] h-[40px]"
										:src="track.album.images[2]?.url"
										alt=""
									/>
								</template>
								<template #trackName>{{ track.name }}</template>
								<template #artist
									><router-link
										class="hover:underline"
										v-for="artist in track.artists"
										:key="artist.id"
										:to="{ name: 'artist', params: { id: `${artist.id}` } }"
									>
										{{
											track.artists.length > 1
												? artist.name ===
												  track.artists[track.artists.length - 1].name
													? artist.name
													: artist.name + ', '
												: artist.name
										}}
									</router-link></template
								>

								<template #duration>{{
									trackDuration((duration = track.duration_ms))
								}}</template>
							</TrackItems>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
import TrackItems from '../TrackItems/TrackItems.vue';

export default {
	name: 'PlaylistPage',
	components: { TrackItems },
	data() {
		return {
			selectedType: '',
			firstBox: '',
			leftClick: false,
		};
	},
	methods: {
		async fetchSearchItem() {
			await axios
				.get(
					`https://api.spotify.com/v1/search?q=${this.searchItem}&type=${this.types}`,
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
					this.$store.dispatch('searchItem/searchResultArr', data);
				})
				.catch(err => console.log(err));
		},
		topResult() {
			const types = Object.keys({ ...this.getSearchResult });
			this.selectedType = types[Math.floor(Math.random() * types.length)];
			let firstBox = { ...this.getSearchResult[this.selectedType].items[0] };
			this.$store.dispatch('searchItem/topResult', firstBox);
		},
		selectedCard(type, event) {
			if (event.target.closest('#playBtn')?.id === 'playBtn') {
				console.log('toggle Play/Stop Playlists');
			} else {
				this.$router.push({ name: type, params: { id: type.id } });
			}
		},
		topSongs() {
			let songs = this.getSearchResult.tracks.items.slice(0, 4);
			this.$store.dispatch('searchItem/songs', songs);
		},
		//Episode
		currentReleaseDate() {
			const day = new Date(this.getTopResult?.release_date).getDate();

			const month =
				this.getMonths[new Date(this.getTopResult?.release_date).getMonth()];
			return `${month} ${day} `;
		},
		totalDuration(duration) {
			const hours = Math.floor(duration / 1000 / 60 / 60);

			const minutes = () => {
				if (duration > 3600000) {
					return Math.abs(Math.floor((duration / 1000 / 60 / 60 - hours) * 60));
				} else {
					return Math.floor((duration / 1000 / 60 / 60) * 60);
				}
			};
			const result = () => {
				if (duration > 3600000) {
					return hours + ' hr ' + minutes() + ' min';
				} else {
					return minutes() + ' min ';
				}
			};
			return result();
		},
		//Songs
		trackDuration(duration) {
			const minutes = Math.floor(duration / 60000);
			const seconds = Math.floor((duration % 60000) / 1000);
			const result = minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
			return result;
		},
	},
	computed: {
		isAuth() {
			return this.$store.getters.isAuth;
		},
		getToken() {
			return this.$store.getters.accessToken;
		},
		searchItem() {
			return this.$store.getters['searchItem/getSearchItem'];
		},
		types() {
			return this.$store.getters['searchItem/getTypes'];
		},
		getSearchResult() {
			return this.$store.getters['searchItem/getSearchResultArr'];
		},
		getTopResult() {
			return this.$store.getters['searchItem/getTopResult'];
		},
		topResultType() {
			return this.getTopResult?.type;
		},
		topResultTypeName() {
			return this.topResultType === 'track'
				? 'Song'
				: this.topResultType === 'show'
				? 'Podcast'
				: this.topResultType;
		},
		topResultImage() {
			return this.topResultType === 'track'
				? this.getTopResult?.album?.images[0]?.url
				: this.getTopResult?.images[0]?.url;
		},

		getSongs() {
			return this.$store.getters['searchItem/getSongs'];
		},

		getMonths() {
			return this.$store.getters['controller/getMonths'];
		},
	},
	watch: {
		topResultType(val) {
			console.log(val);
		},
	},
	async mounted() {
		console.log('searchResult Mounted!');
		await this.fetchSearchItem();
		this.topResult();
		this.topSongs();
	},
};
</script>

<style></style>
