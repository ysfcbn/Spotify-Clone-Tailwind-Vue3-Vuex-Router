<template>
	<section class="box-border">
		<div
			id="favoriteSongss"
			class="bg-bgpurple p-5 max-h-[800px] min-h-[340px] w-full mt-[-66px] relative shadow-[2px_0px_5px_5px_rgba(0,0,0,0.4)] bg-gradient-to-b from-bgpurple to-purple2"
			style="height: 326px"
		>
			<div class="flex items-end justify-start h-full lg:ml-[1rem]">
				<div
					class="flex sm:w-[192px] sm:min-w-[192px] xl:h-[232px] xl:w-[232px] xl:min-w-[232px] shadow-[0_8px_40px_10px_rgba(0,0,0,0.6)] rounded-[12px]"
				>
					<img
						class="object-cover h-full w-full"
						src="https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png"
						alt="fav"
					/>
				</div>
				<div class="flex flex-col text-white font-semibold px-4">
					<h2 class="">ÇALMA LİSTESİ</h2>
					<span>
						<h1
							class="w-full sm:text-3xl md:text-4xl lg1:text-6xl xl:text-8xl tracking-tighter py-2"
							style="font-weight: 700"
						>
							Beğenilen Şarkılar
						</h1>
					</span>
					<div
						class="flex flex-wrap mt-2 text-white w-full text-xs sm3:text-sm h-full font-semibold"
					>
						<div class="w-full flex items-center flex-nowrap shrink-0">
							<div class="w-8 h-8" v-if="userAvatar">
								<img class="rounded-full" :src="userAvatar" alt="user" />
							</div>
							<span class="ml-2">
								<router-link
									class="hover:underline cursor-pointer"
									:to="{ name: 'user', params: { id: currentUserID } }"
									href="#"
									>{{ userName }}</router-link
								>
							</span>

							<span class="before:content-['•'] before:mx-2"
								>{{ totalTrack }} <span class="ml-1">şarkı</span></span
							>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div
			class="absolute w-full h-[212px] left-0 shrink-0 z-0 bg-gradient-to-b from-purple4/40 to-dark"
		></div>

		<div class="w-full h-[6.8rem] relative flex items-start py-[24px]">
			<div class="w-full ml-[1.2rem] flex items-center lg:ml-[2rem]">
				<button
					class="rounded-full bg-green3 p-[0.9rem] cursor-default hover:scale-104 hover:bg-[#1fdf64]"
				>
					<span>
						<svg role="img" height="28" width="28" viewBox="0 0 24 24">
							<path
								fill="currentColor"
								d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"
							></path>
						</svg>
						<svg
							role="img"
							height="28"
							width="28"
							viewBox="0 0 24 24"
							class="hidden"
						>
							<path
								d="M5.7 3a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7H5.7zm10 0a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7h-2.6z"
							></path>
						</svg>
					</span>
				</button>
			</div>
		</div>

		<!-- Playlist -->
		<div
			:class="{ 'mx-5': margin }"
			class="playlistContainer relative h-full min-w-[450]"
		>
			<trackItemsHeader :margin="margin" :favoriteSongs="favoriteSongs" />
			<div class="trackItems--container mt-2">
				<TrackItems
					v-for="({ track }, i) in favTracks"
					:key="track.id"
					:id="track.id"
					:uri="track.uri"
					:index="i"
					:favoriteSongs="favoriteSongs"
					:margin="margin"
					:removeGreenHeartFavTracks="removeGreenHeartFavTracks"
				>
					<template #trackIndex> </template>
					<template #trackImg>
						<img
							class="object-fit w-[40px] h-[40px]"
							:src="track.album.images[2]?.url"
							alt=""
						/>
					</template>

					<template #trackName
						><router-link
							:to="{ name: 'track', params: { id: `${track.id}` } }"
						>
							{{ track.name }}</router-link
						></template
					>
					<template #artist
						><router-link
							class="hover:underline"
							v-for="artist in track.artists"
							:key="artist.id"
							:to="{ name: 'artist', params: { id: `${artist.id}` } }"
						>
							{{
								track.artists.length > 1
									? artist.name === track.artists[track.artists.length - 1].name
										? artist.name
										: artist.name + ', '
									: artist.name
							}}
						</router-link></template
					>
					<template #albumName
						><router-link
							:to="{
								name: 'album',
								params: { id: `${track.album.id}` },
							}"
						>
							{{ track.album.name }}</router-link
						></template
					>
					<template #favTime>{{
						uploadDate((date = favTracks[i].added_at))
					}}</template>
					<template #duration>{{
						trackDuration((duration = track.duration_ms))
					}}</template>
				</TrackItems>
			</div>
		</div>
	</section>
</template>

<script>
import TrackItems from '../TrackItems/TrackItems.vue';
import trackItemsHeader from '../TrackItems/TrackItemsHeader.vue';
import axios from 'axios';

export default {
	name: 'FavoriteSongs',
	components: { TrackItems, trackItemsHeader },

	data() {
		return {
			favoriteSongs: false,
			albumOptions: false,
			episodeOptions: false,
			options2: '',
			favSongEl: null,
			observer2: null,
			presentation: null,
			headerHeight: document.getElementById('header').getBoundingClientRect()
				.height,
			bodyHeight: document.body.getBoundingClientRect().height,
			bodyWidth: document.body.getBoundingClientRect().width,
			margin: false,
		};
	},
	methods: {
		async fetchFavTracks() {
			await axios
				.get('https://api.spotify.com/v1/me/tracks?limit=50', {
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + (await this.getToken),
					},
				})
				.then(({ data }) => {
					console.log(data.items);
					this.$store.dispatch('favTracks/getTracks', data);
				})
				.catch(err => console.log(err));
		},

		removeGreenHeartFavTracks(item) {
			item.children[4].children[0].classList.remove('greenHeart');
			item.children[4].children[0].classList.add('emptyHeart');
			item.children[4].children[0].classList.add('animationEmptyHeart');
		},

		uploadDate(date) {
			const today = new Date();
			const trackDate = new Date(date);
			const totalMiliSeconds = Math.abs(
				Math.round(today.getTime() - trackDate.getTime())
			);

			const year = new Date(date).getFullYear();
			const month = this.getMonths[new Date(date).getMonth()];
			const day = new Date(date).getDate();
			const hours = Math.round(totalMiliSeconds / 1000 / 60 / 60);
			const minutes = Math.abs(
				Math.floor((totalMiliSeconds / 1000 / 60 / 60) * 60)
			);
			const seconds = Math.floor(
				((totalMiliSeconds / 1000 / 60 / 60) * 60 - minutes) * 60
			);

			if (
				Math.abs(Math.floor((trackDate - today) / (1000 * 60 * 60 * 24))) < 31
			) {
				const isDay = Math.abs(
					Math.round(
						(today.getTime() - trackDate.getTime()) / 1000 / 60 / 60 / 24
					)
				);
				if (isDay > 0) {
					return isDay + ' gün önce';
				} else {
					return totalMiliSeconds < 60000
						? seconds + ' saniye önce'
						: totalMiliSeconds > 60000 && totalMiliSeconds < 3600000
						? minutes + ' dakika önce'
						: totalMiliSeconds > 3600000
						? hours + ' saat önce'
						: '';
				}
			} else return `${day} ${month} ${year}`;
		},
		trackDuration(duration) {
			const minutes = Math.floor(duration / 60000);
			const seconds = Math.floor((duration % 60000) / 1000);
			const result = minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
			return result;
		},

		toggleEpisodeOptions() {
			this.episodeOptions = !this.episodeOptions;
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
		userName() {
			return this.$store.getters.getCurrentUser?.display_name;
		},
		userAvatar() {
			return this.$store.getters.getCurrentUser?.images[0]?.url;
		},
		currentUserID() {
			return this.$store.getters.getCurrentUser?.id;
		},
		favTracks() {
			return this.$store.getters['favTracks/getTracks']?.items;
		},
		totalTrack() {
			return this.$store.getters['favTracks/getTracks']?.total;
		},
		trackImage() {
			return this.favTracks.images[0]?.url;
		},

		getMonths() {
			return this.$store.getters['controller/getMonths'];
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
	},

	async created() {
		window.addEventListener('resize', this.resizeOption2);
		this.favoriteSongs = true;
		console.log('FavoriteSongs Mounted');

		this.favTracks?.length ? '' : this.fetchFavTracks();

		setTimeout(() => {
			this.presentation = document.querySelector('.presentation');
			this.body = document.body;
			this.header = document.getElementById('header');
			this.favSongEl = document.getElementById('favoriteSongss');
			console.log(this.favSongEl);

			this.options = {
				root: null,
				threshold: [0.1, 0.4],
			};

			this.observer = new IntersectionObserver(entries => {
				this.header.classList.toggle(
					'fav-songs-intersec-bg1',
					entries[0].intersectionRatio <= 0.4
				);
				this.header.classList.toggle(
					'fav-songs-intersec-bg2',
					entries[0].intersectionRatio <= 0.1
				);

				entries[0].intersectionRatio >= 0.1
					? this.$store.dispatch('controller/closeHeaderBtn')
					: this.$store.dispatch('controller/showHeaderBtn');
			}, this.options);

			this.favSongEl ? this.observer.observe(this.favSongEl) : '';

			this.options2 = {
				root: document.body,
				threshold: 0,
				rootMargin: `${
					+((this.headerHeight * 100) / this.bodyHeight).toFixed(1) * -1
				}% 0px -${
					100 - +((this.headerHeight * 100) / this.bodyHeight).toFixed(1)
				}% 0px`,
			};

			this.observer2 = new IntersectionObserver(entries => {
				if (entries[0].isIntersecting) {
					this.presentation.classList.add('prebg');
					this.margin = false;
				} else {
					this.presentation.classList.remove('prebg');
					this.margin = true;
				}
			}, this.options2);

			this.presentation ? this.observer2.observe(this.presentation) : '';
		}, 1);
	},

	beforeUnmount() {
		console.log('FavoriteSongs unMounted');
		if (this.favSongEl) {
			window.removeEventListener('resize', this.resizeOption2);
			this.observer.unobserve(this.favSongEl);
			this.observer2.unobserve(this.presentation);
			this.presentation.classList.remove('prebg');
			this.header.classList.remove('fav-songs-intersec-bg1');
			this.header.classList.remove('fav-songs-intersec-bg2');
		}
		this.margin = true;
		this.favoriteSongs = false;
	},
	unmounted() {
		this.$store.dispatch('controller/closeHeaderBtn');
	},
};
</script>

<style></style>
