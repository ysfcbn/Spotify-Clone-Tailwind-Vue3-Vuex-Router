<template>
	<section v-if="currentAlbum && isAuth" class="albums--page">
		<div
			id="albumPage"
			class="p-5 max-h-[800px] min-h-[340px] h-[326px] w-full mt-[-66px] relative shadow-[2px_0px_5px_5px_rgba(0,0,0,0.4)]"
			:style="{ '--bgAlbumImage': `url(${albumImage})` }"
		>
			<div class="relative flex items-end justify-start h-full lg:ml-[1rem]">
				<div
					class="flex mb:w-[192px] mb:min-w-[192px] xl:h-[232px] xl:w-[232px] xl:min-w-[232px] shadow-[0_8px_40px_10px_rgba(0,0,0,0.6)] rounded-[12px]"
				>
					<img
						class="object-cover mb:h-full w-full"
						:src="albumImage"
						alt="albums"
					/>
				</div>
				<div class="flex flex-col text-white px-4 ml-2">
					<h2
						style="font-weight: 700"
						class="uppercase text-sm tracking-tighter"
					>
						{{ albumType }}
					</h2>
					<span>
						<h1
							:class="{
								'lg3:text-5xl xl1:text-6xl xl2:text-8xl md:text-3xl':
									albumName.length < 32,
								' md:text-3xl lg1:text-4xl lg3:text-5xl xl1:text-6xl xl2:text-7xl':
									albumName.length > 32,
							}"
							class="w-full sm:text-xl tracking-tighter py-2 xl:pb-4"
							style="font-weight: 700"
						>
							{{ albumName }}
						</h1>
					</span>
					<div
						class="flex items-center flex-wrap mt-2 text-white w-full text-xs sm3:text-sm h-full font-semibold"
					>
						<div class="flex items-center flex-nowrap shrink-0">
							<span class="flex items-center gap-x-2">
								<img
									v-if="artistImage"
									:src="artistImage ? artistImg : artistImage"
									alt="sanatçı adı"
									class="font-semibold w-[1.6rem] h-[1.6rem] rounded-xl"
								/>
								<router-link
									v-for="artist in albumArtistName"
									:key="artist.id"
									:to="{
										name: 'artist',
										params: { id: artist.id },
									}"
									class="hover:underline after:content-['•'] after:ml-1 after:inline-block"
									>{{ artist.name }}</router-link
								>
							</span>
						</div>
						<div>
							<span class="ml-1 after:content-['•'] after:mx-1">{{
								albumYear
							}}</span>
							<span class=""
								>{{ currentAlbum?.tracks.items.length }} şarkı,</span
							>
							<span class="text-sm ml-2 text-opacwhite5">{{
								totalDuration()
							}}</span>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="w-full h-[6.8rem] relative flex items-start py-[24px]">
			<div class="w-full ml-[1.2rem] flex items-center lg:ml-[2rem]">
				<button
					@mousedown="leftClick = true"
					@mouseup="leftClick = false"
					@click="
						playCurrentAlbumContext(
							(uri = {
								uri: albumUri,
								index: currentPlayingTrackIndex,
								type: contextType,
								id: currentTrackID,
							}),
							(href = $route.params.id)
						)
					"
					:class="{
						'bg-green3/70 scale-[1]': leftClick,
						'hover:scale-[1.04] bg-green3/95 hover:bg-green3': !leftClick,
					}"
					class="rounded-full p-[1rem] cursor-default"
				>
					<svg role="img" height="28" width="28" viewBox="0 0 24 24">
						<path
							v-if="!isPlayingAlbumContextUri"
							fill="currentColor"
							d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"
						></path>
						<path
							v-else
							fill="currentColor"
							d="M5.7 3a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7H5.7zm10 0a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7h-2.6z"
						></path>
					</svg>
				</button>
				<div>
					<button
						@click="unFollowAlbum"
						id="heartBtn"
						class="p-[0.9rem] w-[4rem] ml-4 mx-1 cursor-default"
						:class="{
							greenHeart: isFavAlbum,
							emptyHeart: !isFavAlbum,
						}"
					>
						<svg
							:class="{
								'hover:text-white': !isFavAlbum,
							}"
							role="img"
							height="32"
							width="32"
							viewBox="0 0 24 24"
						>
							<path
								fill="currentColor"
								d="M5.21 1.57a6.757 6.757 0 016.708 1.545.124.124 0 00.165 0 6.741 6.741 0 015.715-1.78l.004.001a6.802 6.802 0 015.571 5.376v.003a6.689 6.689 0 01-1.49 5.655l-7.954 9.48a2.518 2.518 0 01-3.857 0L2.12 12.37A6.683 6.683 0 01.627 6.714 6.757 6.757 0 015.21 1.57zm3.12 1.803a4.757 4.757 0 00-5.74 3.725l-.001.002a4.684 4.684 0 001.049 3.969l.009.01 7.958 9.485a.518.518 0 00.79 0l7.968-9.495a4.688 4.688 0 001.049-3.965 4.803 4.803 0 00-3.931-3.794 4.74 4.74 0 00-4.023 1.256l-.008.008a2.123 2.123 0 01-2.9 0l-.007-.007a4.757 4.757 0 00-2.214-1.194z"
							></path>
							<path
								v-if="isFavAlbum"
								:class="{ 'text-green3': isFavAlbum }"
								fill="currentColor"
								d="M8.667 1.912a6.257 6.257 0 00-7.462 7.677c.24.906.683 1.747 1.295 2.457l7.955 9.482a2.015 2.015 0 003.09 0l7.956-9.482a6.188 6.188 0 001.382-5.234l-.49.097.49-.099a6.303 6.303 0 00-5.162-4.98h-.002a6.24 6.24 0 00-5.295 1.65.623.623 0 01-.848 0 6.257 6.257 0 00-2.91-1.568z"
							></path>
						</svg>
					</button>
					<button
						@click="toggleAppOptions"
						class="text-lightest cursor-default w-fit relative hover:text-white"
					>
						<svg
							role="img"
							height="32"
							width="32"
							viewBox="0 0 24 24"
							class="hover:text-white pointer-events-none"
						>
							<path
								fill="currentColor"
								d="M4.5 13.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm15 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm-7.5 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
							></path>
						</svg>
					</button>
					<AppOptions
						v-if="appOptions"
						:albumPage="albumPage"
						:isFavAlbum="isFavAlbum"
						:followAlbum="followAlbum"
						:unFollowAlbum="unFollowAlbum"
						:appOptions="appOptions"
						@toggleAppOptions="toggleAppOptions"
					/>
				</div>
			</div>
		</div>

		<div
			:class="{ 'mx-5': margin }"
			class="playlistContainer relative h-full min-w-[450]"
		>
			<TrackItemsHeader :margin="margin" :albumPage="albumPage" />
			<div class="trackItems--container mt-2">
				<TrackItems
					v-for="(item, i) in albumData?.tracks?.items"
					:key="item.id"
					:id="item.id"
					:uri="albumUri"
					:itemUri="item.uri"
					:track="item"
					:trackID="item.id"
					:contextType="contextType"
					:index="i"
					:albumPage="albumPage"
					:margin="margin"
					:findFavTracks="findFavTracks"
					:addGreenHeartFavTracks="addGreenHeartFavTracks"
					:removeGreenHeartFavTracks="removeGreenHeartFavTracks"
				>
					<template v-slot:trackName
						><div class="cursor-default truncate">
							{{ item.name }}
						</div></template
					>
					<template v-slot:artist
						><router-link
							class="hover:underline"
							v-for="artist in item.artists"
							:key="artist.id"
							:to="{ name: 'artist', params: { id: `${artist.id}` } }"
						>
							{{
								item.artists.length > 1
									? artist.name === item.artists[item.artists.length - 1].name
										? artist.name
										: artist.name + ', '
									: artist.name
							}}
						</router-link></template
					>
					<template v-slot:duration>{{
						trackDuration((duration = albumData?.tracks?.items[i]?.duration_ms))
					}}</template>
				</TrackItems>
			</div>
		</div>

		<div class="text-lightest mt-10 sm:ml-5 lg:ml-[2.4rem]">
			<div>
				<p class="text-md mb-1">{{ currentReleaseDate() }}</p>
				<div>
					<p class="text-[11px]" v-for="copy in copyrights" :key="copy.type">
						{{ copy.text }}
					</p>
				</div>
			</div>
		</div>

		<!-- More Singles -->
		<section
			v-if="artistAlbums.length"
			class="sm:pl-5 lg:p-5 lg:ml-[1rem] mt-10"
		>
			<!-- Cards -->
			<Card :currentData="artistAlbums">
				<template #cardTitle>
					Daha fazla {{ albumArtistName[0].name }}</template
				>
				<template #seeMore>DİSKOGRAFİYE BAK</template>

				<template #imgContainer="{ data }">
					<div class="w-full relative mb-5">
						<img
							class="h-full w-full object-cover"
							:src="data?.images[0]?.url"
							alt="image"
						/>
					</div>
				</template>
				<template #firstTitle="{ data }">{{ data?.name }}</template>
				<template #secondTitle="{ data }"
					><span class="capitalize">{{ data?.type }}</span>
				</template>
				<template #playBtn="{ data }">
					<div
						:class="{
							'opacity-100 translate-y-[-0.4rem]	':
								data?.uri === getCurrentlyPlayingTrack?.context?.uri &&
								getCurrentlyPlayingTrack?.is_playing,
						}"
						class="bg-dark1 rounded-full right-0 bottom-0 absolute flex items-center mx-2 group-hover:block opacity-0 group-hover:opacity-100 transition ease-in duration-200 group-hover:translate-y-[-0.4rem]"
					>
						<button
							@click="
								playAlbumContextUri(
									(uri = {
										uri: data?.uri,
										index: currentPlayingTrackIndex,
										type: data?.type,
									}),
									(href = data?.href)
								)
							"
							@mousedown="leftClick = true"
							@mouseup="leftClick = false"
							id="playBtn"
							:class="{
								' bg-green3/80 scale-80': leftClick,
								'hover:scale-106 bg-green3/95 hover:bg-green3': !leftClick,
							}"
							class="p-3 rounded-full cursor-default shadow-[0px_5px_6px_2px_rgba(0,0,0,0.4)]"
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

			<Info />
		</section>
	</section>
</template>

<script>
import TrackItems from '../TrackItems/TrackItems.vue';
import TrackItemsHeader from '../TrackItems/TrackItemsHeader.vue';
import AppOptions from '../AppOptions/AppOptions.vue';
import Card from '../Cards/Card.vue';
import Info from '../SpotifyInfo/Info.vue';
import axios from 'axios';

export default {
	components: { TrackItems, TrackItemsHeader, Info, AppOptions, Card },
	emits: ['selectedArtistName', 'toggleHeaderBtn', 'visToggleHeaderBtn'],
	props: {
		id: {
			type: String,
			required: true,
		},
	},

	data() {
		return {
			albumPage: true,
			contextType: 'album',
			typeOfSelectedSection: null,
			appOptions: false,
			leftClick: false,
			margin: true,
			options2: '',
			observer2: null,
			presentation: null,
			headerHeight: document.getElementById('header').getBoundingClientRect()
				.height,
			bodyHeight: document.body.getBoundingClientRect().height,
			bodyWidth: document.body.getBoundingClientRect().width,
			albumData: [],
			totalArtist: [],
			artistAlbums: [],
			artistImg: '',
		};
	},
	methods: {
		async fetchAlbum(href = this.$route.params.id) {
			return await axios
				.get('https://api.spotify.com/v1/albums/' + href, {
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + (await this.getToken),
					},
				})
				.then(({ data }) => {
					this.$store.dispatch('albums/getAlbum', data);
					return data;
				})
				.catch(err => console.log(err));
		},
		async playCurrentAlbumContext(uri, href) {
			console.log(uri);
			if (this.isPlayingAlbumContextUri) {
				await this.$store.dispatch('controller/pauseCurrentTrack');
			} else {
				uri.index = this.currentPlayingTrackIndex;
				await this.fetchAlbum(href);
				uri.id = this.currentAlbumTracks[this.currentPlayingTrackIndex]?.id;
				!this.currentPlayingTrackIndex
					? await this.$store.dispatch('controller/playSelectedContext', uri)
					: await this.$store.dispatch('controller/playCurrentTrack', uri);
			}
		},
		async playAlbumContextUri(uri, href) {
			console.log(uri);
			if (
				uri.uri === this.getCurrentlyPlayingTrack?.context?.uri &&
				this.getCurrentlyPlayingTrack?.is_playing
			) {
				await this.$store.dispatch('controller/pauseCurrentTrack');
			} else {
				await this.fetchAlbum(href);
				uri.index = this.currentPlayingTrackIndex;
				uri.id = this.currentAlbumTracks[this.currentPlayingTrackIndex]?.id;
				console.log(uri);
				await this.$store.dispatch('controller/playSelectedContext', uri);
			}
		},
		async fetchFavAlbums() {
			return await axios
				.get('https://api.spotify.com/v1/me/albums', {
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + (await this.getToken),
					},
				})
				.then(({ data }) => {
					console.log(data);
					this.$store.dispatch('albums/favAlbums', data.items);
				})
				.catch(err => console.log(err));
		},
		async fetchArtistAlbums() {
			return await axios
				.get(
					'https://api.spotify.com/v1/artists/' +
						this.albumArtistName[0]?.id +
						'/albums',
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
					return data;
				})
				.catch(err => console.log(err));
		},

		async unFollowAlbum() {
			if (this.isFavAlbum) {
				await axios
					.delete('https://api.spotify.com/v1/me/albums?ids=' + this.id, {
						headers: {
							Accept: 'application/json',
							'Content-Type': 'application/json',
							Authorization: 'Bearer ' + (await this.getToken),
						},
					})
					.then(data => {
						console.log(data);
						if (data.status === 200) {
							heartBtn.classList.add('animationEmptyHeart');
							heartBtn.classList.remove('animationGreenHeart');
							this.$store.dispatch('controller/modalInfoType', {
								type: 'album',
								status: false,
							});
							this.fetchFavAlbums();
						}
					})
					.catch(err => console.log(err));
			} else {
				await this.followAlbum();
			}
		},

		async followAlbum() {
			await fetch('https://api.spotify.com/v1/me/albums?ids=' + this.id, {
				method: 'PUT',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + (await this.getToken),
				},
			})
				.then(data => {
					console.log(data);
					if (data.status === 200) {
						heartBtn.classList.add('animationGreenHeart');
						heartBtn.classList.remove('animationEmptyHeart');
						this.$store.dispatch('controller/modalInfoType', {
							type: 'album',
							status: true,
						});
						this.fetchFavAlbums();
					}
				})
				.catch(err => console.log(err));
		},

		findFavTracks() {
			this.allFavTracks.forEach((track, i) => {
				this.currentAlbumTracks.forEach((item, i) => {
					if (track.track.id === item.id) {
						this.$store.dispatch('albums/favTracksID', item.id);
					}
				});
			});
		},

		addGreenHeartFavTracks(trackItem = false) {
			if (!trackItem) {
				this.addGreenHeartEl.forEach(item => {
					item.children[3].children[0].classList.remove(
						'emptyHeart',
						'animationEmptyHeart'
					);
					item.children[3].children[0].classList.add('greenHeart');

					item.children[3].children[0].children[0].children[0].classList.remove(
						'hidden'
					);

					item.children[3].children[0].children[0].children[1].classList.add(
						'hidden'
					);
				});
			} else {
				trackItem.children[3].children[0].classList.remove(
					'emptyHeart',
					'animationEmptyHeart'
				);
				trackItem.children[3].children[0].classList.add('greenHeart');
				trackItem.children[3].children[0].classList.add('animationGreenHeart');
				trackItem.children[3].children[0].children[0].children[0].classList.remove(
					'hidden'
				);

				trackItem.children[3].children[0].children[0].children[1].classList.add(
					'hidden'
				);
			}
		},
		removeGreenHeartFavTracks(item) {
			item.children[3].children[0].classList.remove(
				'greenHeart',
				'animationGreenHeart'
			);
			item.children[3].children[0].classList.add('emptyHeart');
			item.children[3].children[0].classList.add('animationEmptyHeart');

			item.children[3].children[0].children[0].children[0].classList.add(
				'hidden'
			);
			item.children[3].children[0].children[0].children[1].classList.remove(
				'hidden'
			);
		},

		cartAlbumYear(i) {
			return new Date(`${this.artistAlbums[i].release_date}`).getFullYear();
		},
		trackDuration(duration) {
			const minutes = Math.floor(duration / 60000);
			const seconds = Math.floor((duration % 60000) / 1000);
			const result = minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
			return result;
		},

		toggleAppOptions() {
			this.appOptions = !this.appOptions;
		},
		totalDuration() {
			const totalMiliSeconds = this.albumData?.tracks?.items?.reduce(
				(acc, track) => {
					acc += track.duration_ms;
					return acc;
				},
				0
			);
			const hours = Math.round(totalMiliSeconds / 1000 / 60 / 60);
			const minutes = () => {
				if (totalMiliSeconds > 3600000) {
					return Math.abs(
						Math.floor((totalMiliSeconds / 1000 / 60 / 60 - hours) * 60)
					);
				} else {
					return Math.floor((totalMiliSeconds / 1000 / 60 / 60) * 60);
				}
			};
			const seconds = Math.abs(
				Math.floor(((totalMiliSeconds / 1000 / 60 / 60) * 60 - minutes()) * 60)
			);
			const result = () => {
				if (totalMiliSeconds > 3600000) {
					return hours >= 5
						? 'yaklaşık ' + hours + ' sa. ' + minutes() + ' dk.'
						: hours + ' sa. ' + minutes() + ' dk.';
				} else {
					return minutes() + ' dk. ' + seconds + ' sn.';
				}
			};
			return result();
		},
		currentReleaseDate() {
			const day = new Date(this.currentAlbum?.release_date).getDate();
			const month =
				this.getMonths[new Date(this.currentAlbum?.release_date).getMonth()];
			const year = new Date(this.currentAlbum?.release_date).getFullYear();
			return `${day} ${month} ${year}`;
		},
		resizeOption2(options) {
			if (window.innerHeight - 92 <= 64) {
				this.bodyHeight = +window.innerHeight - 92;

				return;
			}
			this.bodyHeight = +window.innerHeight - 92;
			this.bodyWidth = +window.innerWidth - 92;

			this.observer2 ? this.observer2.unobserve(this.presentation) : '';

			return options;
		},
	},
	computed: {
		isAuth() {
			return this.$store.getters.isAuth;
		},
		getToken() {
			return this.$store.getters.accessToken;
		},

		allFavTracks() {
			return this.$store.getters['favTracks/getTracks'].items;
		},

		currentAlbum() {
			return this.$store.getters['albums/getAlbum'];
		},
		currentAlbumTracks() {
			return this.currentAlbum?.tracks?.items;
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
		isPlayingAlbumContextUri() {
			return (
				this.getCurrentlyPlayingTrack?.context?.uri === this.albumUri &&
				this.getCurrentlyPlayingTrack?.is_playing
			);
		},

		isClickHeaderBtn() {
			return this.$store.getters['controller/isClickHeaderBtn'];
		},

		isFavAlbum() {
			return this.allFavAlbums?.filter(
				item => item.album.id === this.$route.params.id
			).length > 0
				? true
				: false;
		},
		allFavAlbums() {
			return this.$store.getters['albums/getFavAlbums'];
		},
		albumType() {
			return this.currentAlbum?.album_type;
		},
		albumName() {
			return this.currentAlbum?.name;
		},
		albumUri() {
			return this.currentAlbum?.uri;
		},
		albumArtistName() {
			return this.currentAlbum?.artists;
		},
		albumImage() {
			return this.currentAlbum?.images[0]?.url;
		},
		artistImage() {
			return this.currentAlbum?.artists.length === 1
				? this.currentAlbum?.images[2]?.url
				: '';
		},
		albumYear() {
			return new Date(`${this.currentAlbum?.release_date}`).getFullYear();
		},
		getMonths() {
			return this.$store.getters['controller/getMonths'];
		},

		copyrights() {
			return this.currentAlbum?.copyrights;
		},

		getFavTracksonalbum() {
			return this.$store.getters['albums/getfavTracksID'];
		},
		addGreenHeartEl() {
			return this.getFavTracksonalbum.map(item =>
				document.getElementById(`${item}`)
			);
		},
	},
	watch: {
		bodyHeight(newVal, oldVal) {
			if (newVal !== oldVal) {
				this.bodyHeight = +newVal;
				this.bodyHeight = +this.bodyHeight.toFixed(1);
				this.options2 = {
					root: document.body,
					threshold: 0,
					rootMargin: `${
						+((this.headerHeight * 100) / this.bodyHeight).toFixed(1) * -1
					}% 0px -${
						100 - +((this.headerHeight * 100) / this.bodyHeight).toFixed(1)
					}% 0px`,
				};

				this.observer2
					? (this.observer2 = new IntersectionObserver(entries => {
							if (entries[0].isIntersecting) {
								this.presentation.classList.add('prebg');
								this.margin = false;
							} else {
								this.presentation.classList.remove('prebg');
								this.margin = true;
							}
					  }, this.resizeOption2(this.options2)))
					: '';
				this.presentation ? this.observer2.observe(this.presentation) : '';
			}
		},
		bodyWidth(newVal, oldVal) {
			if (newVal !== oldVal) {
				this.observer2
					? (this.observer2 = new IntersectionObserver(entries => {
							if (entries[0].isIntersecting) {
								this.presentation.classList.add('prebg');
								this.margin = false;
							} else {
								this.presentation.classList.remove('prebg');
								this.margin = true;
							}
					  }, this.resizeOption2(this.options2)))
					: '';
				this.presentation ? this.observer2.observe(this.presentation) : '';
			}
		},
		async albumArtistName(newVal) {
			if (newVal.length === 1) {
				await axios
					.get(newVal[0].href, {
						headers: {
							Accept: 'application/json',
							'Content-Type': 'application/json',
							Authorization: 'Bearer ' + (await this.getToken),
						},
					})
					.then(({ data }) => {
						console.log(data);
						this.artistImg = data.images[2].url;
					})
					.catch(err => console.log(err));
			}
		},
		isPlayingAlbumContextUri(newVal) {
			if (newVal) {
				this.$store.dispatch('controller/isPlayingHeaderBtn', newVal);
			} else {
				this.$store.dispatch('controller/isPlayingHeaderBtn', newVal);
			}
		},
		async isClickHeaderBtn(newVal, oldVal) {
			if (newVal !== oldVal) {
				await this.playCurrentAlbumContext({
					uri: this.albumUri,
					index: this.currentPlayingTrackIndex,
					type: this.contextType,
					id: this.currentTrackID,
				});
			}
		},
	},

	async created() {
		console.log('albumPage Created');
		window.addEventListener('resize', this.resizeOption2);

		this.albumData = await this.fetchAlbum();
		this.artistAlbums = await this.fetchArtistAlbums();
		this.artistAlbums = this.artistAlbums.items.slice(0, 10);

		this.albumPage = true;

		(await this.isPlayingAlbumContextUri)
			? this.$store.dispatch('controller/isPlayingHeaderBtn', true)
			: this.$store.dispatch('controller/isPlayingHeaderBtn', false);

		this.findFavTracks();

		await this.getFavTracksonalbum;

		console.log(this.addGreenHeartEl);
		this.addGreenHeartFavTracks();

		this.header = document.getElementById('header');
		this.albumsEl = document.getElementById('albumPage');
		this.presentation = document.querySelector('.presentation');
		this.options = {
			root: null,
			threshold: [0.1, 0.4],
		};

		this.observer = new IntersectionObserver(entries => {
			entries[0].intersectionRatio >= 0.1
				? this.$store.dispatch('controller/closeHeaderBtn')
				: this.$store.dispatch('controller/showHeaderBtn');
		}, this.options);

		this.albumsEl ? this.observer.observe(this.albumsEl) : '';

		this.options2 = {
			root: document.body,
			threshold: 0,
			rootMargin: `${
				+((this.headerHeight * 100) / this.bodyHeight).toFixed(1) * -1
			}% 0px -${
				100 - +((this.headerHeight * 100) / this.bodyHeight).toFixed(1)
			}% 0px`,
		};

		this.observer2 = new IntersectionObserver((entries, obs) => {
			if (entries[0].isIntersecting) {
				this.presentation.classList.add('prebg');
				this.margin = false;
			} else {
				this.presentation.classList.remove('prebg');
				this.margin = true;
			}
		}, this.options2);

		this.presentation ? this.observer2.observe(this.presentation) : '';
	},

	beforeUnmount() {
		console.log('albumPage unMounted!');
		this.albumPage = false;
		window.removeEventListener('resize', this.resizeOption2);
		if (!this.albumsEl) return;
		this.observer.unobserve(this.albumsEl);
		this.observer2.unobserve(this.presentation);
		this.presentation.classList.remove('prebg');
		this.header.classList.remove('fav-songs-intersec-bg1');
		this.header.classList.remove('fav-songs-intersec-bg2');
		this.$store.dispatch('controller/isClickHeaderBtn', null);
	},
	unmounted() {
		this.$store.dispatch('controller/closeHeaderBtn');
		this.$store.dispatch('albums/clearTracksID');
		this.$store.dispatch('albums/clearAlbum');
		this.$store.dispatch('controller/isPlayingHeaderBtn', null);
	},
};
</script>

<style scoped lang="scss">
.footer--contaier a:hover {
	text-decoration: underline;
	color: #f0f0f0f0;
}
.footer--contaier li {
	line-height: 32px;
	font-size: 16px;
}
.footer--contaier p {
	line-height: 32px;
	font-size: 18px;
}

.footer--bottom--links span,
.copyright p {
	font-size: 15px;
	margin-right: 16px;
	margin-bottom: 8px;
}
.footer--bottom--links span:hover {
	text-decoration: underline;
	color: #f0f0f0f0;
}
#albumPage {
	&::before {
		content: '';
		position: absolute;
		z-index: 0;
		top: 0;
		left: 0;
		background-size: cover;
		background-position: top;
		background-image: var(--bgAlbumImage);
		filter: blur(8rem);
		width: 110%;
		height: 100%;
	}
}

.greenHeart {
	color: #1fdf64;
}
.animationGreenHeart {
	animation: heart 0.2s ease-in;
}

.emptyHeart {
	color: #9b9b9b;
}
.animationEmptyHeart {
	animation: emptyheart 0.2s ease-in-out 1 alternate;
}

@keyframes heart {
	33% {
		transform: scale(1.4);
	}
	66% {
		transform: scale(1.2);
	}
	100% {
		transform: scale(1.5);
	}
}
@keyframes emptyheart {
	33% {
		transform: translateX(-6px) rotate(-20deg);
	}
	66% {
		transform: translateX(6px) rotate(20deg);
	}
	100% {
		transform: translateX(0) rotate(0);
	}
}
</style>
