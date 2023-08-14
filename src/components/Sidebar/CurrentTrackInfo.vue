<template>
	<div
		:class="{
			'relative  min-w-[15rem] max-w-[40rem] ': isAuth,
		}"
		class="infoContainer bg-dark1 mb:text-xs sm3:text-[13px] px-4 overflow-y-auto overflow-x-hidden"
	>
		<!-- Contextname -->
		<div
			class="relative flex items-center justify-between ease-in duration-200 min-w-[14.5rem] w-[100%] shrink-0 h-[4rem]"
		>
			<div class="flex relative z-0 text-white">
				<router-link
					v-if="!getCurrentlyPlayingContextType"
					:key="artistID"
					:to="{ name: 'artist', params: { id: `${contextTypeID}` } }"
					class="md:text-[17px] lg:text-[18px] shrink-0 font-semibold cursor-pointer hover:underline"
				>
					{{ contextName }}
				</router-link>
				<router-link
					v-else-if="getCurrentlyPlayingContextType !== 'collection'"
					class="md:text-[17px] lg:text-[18px] shrink-0 font-semibold cursor-pointer hover:underline"
					:key="contextTypeID"
					:to="{
						name: `${getCurrentlyPlayingContextType}`,
						params: {
							id: `${contextTypeID}`,
						},
					}"
				>
					{{ contextName }}</router-link
				>

				<router-link
					v-else
					:key="getCurrentlyPlayingContextType"
					:to="{ name: 'favTracks' }"
					class="md:text-[17px] lg:text-[18px] shrink-0 font-semibold cursor-pointer hover:underline"
				>
					Liked Songs
				</router-link>
			</div>
			<div
				class="trackInfo2 text-lightest bg-dark1 rounded-full relative flex shrink-0 left-10 w-[4rem]"
			>
				<button
					@click="closeCurrentTrackInfo"
					class="close--button p-[5px] hover:bg-white/20 rounded-full hover:scale-110 text-white/80 transition ease-in duration-100 z-20"
				>
					<svg role="img" height="14" width="14" viewBox="0 0 16 16" class="">
						<path
							fill="currentColor"
							d="M1.47 1.47a.75.75 0 011.06 0L8 6.94l5.47-5.47a.75.75 0 111.06 1.06L9.06 8l5.47 5.47a.75.75 0 11-1.06 1.06L8 9.06l-5.47 5.47a.75.75 0 01-1.06-1.06L6.94 8 1.47 2.53a.75.75 0 010-1.06z"
						></path>
					</svg>
				</button>
			</div>
		</div>
		<div class="flex flex-col gap-4">
			<!-- contextImage -->
			<div class="w-full relative">
				<div class="w-full relative">
					<img
						class="rounded-lg rounded-full shadow-[0px_5px_15px_8px_rgba(0,0,0,0.4)] mb:h-full object-cover"
						:src="currentTrackAlbumImage"
						alt="image"
					/>
				</div>
			</div>

			<!-- trackname & artistname -->
			<div
				class="relative flex items-center justify-between ease-in duration-200 min-w-[14.5rem] w-[100%] shrink-0 mb-2"
			>
				<div
					class="flex flex-col overflow-hidden pl-[1px] gap-y-2 min-w-[4rem] h-[4.2rem]"
				>
					<div class="flex relative z-0">
						<router-link
							:to="{ name: 'album', params: { id: `${currentTrackAlbumID}` } }"
							class="mb:text-[12px] sm3:text-[13px] md:text-xl lg:text-2xl text-white flex shrink-0 hover:underline font-semibold cursor-pointer"
						>
							{{ currentTrackName }}
						</router-link>
					</div>
					<div class="flex relative z-0 h-full">
						<router-link
							:class="currentTrackArtistsArr.length > 1 ? 'artist--name' : ''"
							class="mb:text-[11px] sm:text-[13px] lg:text-[15px] text-lightest shrink-0 hover:underline hover:text-white h-fit"
							v-for="artist in currentTrackArtistsArr"
							:key="artist.id"
							:to="{ name: 'artist', params: { id: `${artist.id}` } }"
						>
							{{
								currentTrackArtistsArr.length > 1
									? artist.name ===
									  currentTrackArtistsArr[currentTrackArtistsArr.length - 1]
											.name
										? artist.name
										: artist.name + `,`
									: artist.name
							}}
						</router-link>
					</div>
				</div>
				<div
					class="trackInfo flex items-center justify-between text-lightest gap-x-3 relative top-1 shrink-0 h-full"
				>
					<button
						@click="removeAddToFav((trackID = currentTrackID))"
						:class="{
							greenHeart: currentTrackIsFav,
							'emptyHeart hover:text-white': !currentTrackIsFav,
						}"
						class="ml-2"
						id="heart"
					>
						<svg role="img" height="16" width="16" viewBox="0 0 16 16" class="">
							<path
								fill="currentColor"
								d="M1.69 2A4.582 4.582 0 018 2.023 4.583 4.583 0 0111.88.817h.002a4.618 4.618 0 013.782 3.65v.003a4.543 4.543 0 01-1.011 3.84L9.35 14.629a1.765 1.765 0 01-2.093.464 1.762 1.762 0 01-.605-.463L1.348 8.309A4.582 4.582 0 011.689 2zm3.158.252A3.082 3.082 0 002.49 7.337l.005.005L7.8 13.664a.264.264 0 00.311.069.262.262 0 00.09-.069l5.312-6.33a3.043 3.043 0 00.68-2.573 3.118 3.118 0 00-2.551-2.463 3.079 3.079 0 00-2.612.816l-.007.007a1.501 1.501 0 01-2.045 0l-.009-.008a3.082 3.082 0 00-2.121-.861z"
							></path>
							<path
								:fill="currentTrackIsFav ? 'currentColor' : 'none'"
								d="M15.724 4.22A4.313 4.313 0 0012.192.814a4.269 4.269 0 00-3.622 1.13.837.837 0 01-1.14 0 4.272 4.272 0 00-6.21 5.855l5.916 7.05a1.128 1.128 0 001.727 0l5.916-7.05a4.228 4.228 0 00.945-3.577z"
							></path>
						</svg>
					</button>
					<button>
						<svg
							role="img"
							height="16"
							width="16"
							viewBox="0 0 16 16"
							class="hover:text-white"
						>
							<path
								fill="currentColor"
								d="M3 8a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm6.5 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM16 8a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
								data-v-5ab716ef=""
							></path>
						</svg>
					</button>
				</div>
			</div>

			<!-- About the Artist -->
			<div
				:id="artistID"
				class="card--container relative group bg-opacwhite1 ease duration-300 w-full cursor-pointer rounded-md"
			>
				<div class="w-full relative">
					<img
						class="h-fit w-full object-cover rounded-t-lg opacity-80"
						:src="artistImage"
						alt="image"
					/>
				</div>
				<div
					style="font-weight: 700"
					class="absolute text-white text-base top-0 pl-4 p-2 opacity-100"
				>
					About the Artist
				</div>
				<div class="px-2 pt-2">
					<div class="flex flex-col p-2">
						<div
							class="text-white max-w-full h-[1.5rem] text-[20px] truncate font-semibold hover"
						>
							<router-link
								:key="artistID"
								:to="{ name: 'artist', params: { id: `${artistID}` } }"
								class="hover:underline"
								>{{ artistName }}</router-link
							>
						</div>
						<div
							class="flex items-center justify-between text-lightest font-semibold w-full sm:text-[11px] lg:text-[15px]"
						>
							<span class="leading-5">
								{{ currentArtistMonthlyListeners }} monthly listeners
							</span>
							<div class="w-[5.4rem]">
								<button
									@click="addRemoveArtist"
									:class="{
										'border-white': currentArtistIsFav,
										'hover:border-white border-opacwhite2 ':
											!currentArtistIsFav,
									}"
									class="border h-fit w-full text-white px-2 py-2 rounded-full flex items-center justify-center"
								>
									<span
										v-if="currentArtistIsFav"
										class="text-[14px] self-center"
										style="font-weight: 600"
										>Unfollow</span
									>
									<span
										v-else
										class="text-[14px] self-center"
										style="font-weight: 600"
									>
										Follow</span
									>
								</button>
							</div>
						</div>
					</div>
					<div class="p-2 mb-3 h-[4.5rem] text-justify text-lightest">
						<span
							style="font-weight: 400"
							class="line-clamp-3 text-[14px] leading-5"
							>With an impressive string of hits, numerous awards under her
							trendy belt and concerts throughout Europe, Asia, Latin enon, one
							of those enon, one of those
						</span>
					</div>
				</div>
			</div>

			<!-- Next Queue -->
			<div class="relative px-2 pb-2 bg-opacwhite1 w-full mb-6 rounded-lg">
				<div
					v-if="allQueueList.length"
					style="font-weight: 700"
					class="flex items-center justify-between h-[2rem] text-[15px] p-2 h-[3.2rem]"
				>
					<span class="text-white">Next in queue</span>
					<router-link
						style="font-weight: 700"
						:to="{ name: 'queue' }"
						key="2"
						class="text-[13px] text-lightest self-center hover:text-white hover:underline hover:scale-[1.03] w-[4.8rem]"
						>Open queue</router-link
					>
				</div>
				<div
					v-else
					style="font-weight: 700"
					class="flex items-center justify-between h-[3rem] text-[15px] p-2 h-[3rem]"
				>
					<span class="text-white">Your queue is empty</span>
				</div>

				<div
					v-if="allQueueList.length"
					class="flex shrink-1 group hover:bg-opacwhite1 p-2 rounded-lg trackInfo3"
				>
					<div class="relative flex items-center">
						<div class="flex relative shrink-0">
							<div class="flex items-center" data-testid="play-next-button">
								<span class="group-hover:invisible visible w-[1.5rem]"
									><svg
										role="img"
										height="16"
										width="16"
										viewBox="0 0 16 16"
										data-encore-id="icon"
									>
										<path
											fill="hsla(0,0%,100%,.7)"
											d="M10 2v9.5a2.75 2.75 0 1 1-2.75-2.75H8.5V2H10zm-1.5 8.25H7.25A1.25 1.25 0 1 0 8.5 11.5v-1.25z"
										></path></svg></span
								><button
									@click="playTrack"
									class="absolute group-hover:visible invisible"
								>
									<svg role="img" height="16" width="16" viewBox="0 0 24 24">
										<path
											fill="white"
											d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"
										></path>
									</svg>
								</button>
							</div>
							<img
								width="52"
								height="52"
								:src="nextQueue?.album?.images[0]?.url"
							/>
						</div>
						<div
							class="flex flex-col overflow-x-hidden min-w-[4rem] pl-4 gap-2"
						>
							<div class="flex relative z-0">
								<router-link
									:to="{
										name: 'album',
										params: { id: `${nextQueue?.album?.id}` },
									}"
									class="mb:text-[12px] sm3:text-[14px] text-white flex shrink-0 hover:underline font-semibold cursor-pointer"
								>
									{{ nextQueue?.name }}
								</router-link>
							</div>
							<div class="flex relative z-0">
								<router-link
									:class="nextQueue?.artists.length > 1 ? 'artist--name' : ''"
									class="text-[13px] text-lightest shrink-0 hover:underline hover:text-white"
									v-for="artist in nextQueue?.artists"
									:key="artist.id"
									:to="{ name: 'artist', params: { id: `${artist.id}` } }"
								>
									{{
										nextQueue?.artists.length > 1
											? artist.name ===
											  nextQueue?.artists[nextQueue?.artists.length - 1].name
												? artist.name
												: artist.name + ','
											: artist.name
									}}
								</router-link>
							</div>
						</div>
					</div>
				</div>
				<div v-else class="w-[90%] p-1">
					<router-link
						class="border h-fit w-full px-2 py-2 rounded-full flex items-center justify-center hover:scale-[1.04] text-white text-[14px] self-center"
						:to="{ name: 'search' }"
						:key="queue"
					>
						Search for something new</router-link
					>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
import AppSignUpPopUp from '../Cards/AppSignUpPopUp.vue';

export default {
	name: 'Sidebar',
	components: { AppSignUpPopUp },
	props: ['toggleImg', 'trackImgDisplay'],
	data() {
		return {};
	},
	methods: {
		async fetchFavArtists() {
			await axios
				.get('https://api.spotify.com/v1/me/following?type=artist', {
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + this.getToken,
					},
				})
				.then(({ data }) => {
					console.log(data.artists);
					this.$store.dispatch('artists/favArtists', data.artists.items);
				})
				.catch(err => console.log(err));
		},
		async followArtist(artistID) {
			await fetch(
				'https://api.spotify.com/v1/me/following?type=artist&ids=' + artistID,
				{
					method: 'PUT',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + this.getToken,
					},
				}
			)
				.then(data => {
					console.log(data.status);
					if (data.status === 204) {
						this.$store.dispatch(
							'controller/checkUserFavArtist',
							this.artistID
						);

						this.$store.dispatch('controller/modalInfoType', {
							type: 'artist',
							status: true,
						});
					}
				})
				.catch(err => console.log(err));
		},
		async unfollowArtist(artistID) {
			await axios
				.delete(
					'https://api.spotify.com/v1/me/following?type=artist&ids=' + artistID,
					{
						headers: {
							Accept: 'application/json',
							'Content-Type': 'application/json',
							Authorization: 'Bearer ' + this.getToken,
						},
					}
				)
				.then(data => {
					console.log(data.status);
					if (data.status === 204) {
						this.$store.dispatch(
							'controller/checkUserFavArtist',
							this.artistID
						);
						this.$store.dispatch('controller/modalInfoType', {
							type: 'artist',
							status: false,
						});
					}
				})
				.catch(err => console.log(err));
		},

		async addRemoveArtist() {
			if (this.currentArtistIsFav) {
				await this.unfollowArtist(this.artistID);
				await this.fetchFavArtists();
			} else {
				await this.followArtist(this.artistID);
				await this.fetchFavArtists();
			}
		},

		playTrack() {
			this.$store.dispatch('controller/skipToNextTrack');
		},
		closeCurrentTrackInfo() {
			this.$store.commit('controller/currentTrackInfo', false);
		},
	},
	computed: {
		isAuth() {
			return this.$store.getters.isAuth;
		},
		getToken() {
			return this.$store.getters.accessToken;
		},
		currentTrackAlbumImage() {
			return this.$store.getters['controller/getCurrentTrackAlbumImage'];
		},
		getUserFavPlaylists() {
			return this.$store.getters['playlists/getUserFavPlaylists'];
		},

		getCurrentlyPlayingTrack() {
			return this.$store.getters['controller/getCurrentlyPlayingTrack'];
		},
		artistID() {
			return this.getCurrentlyPlayingTrack?.item?.artists[0]?.id;
		},
		artistName() {
			return this.getCurrentlyPlayingTrack?.item?.artists[0]?.name;
		},
		currentArtist() {
			return this.$store.getters['controller/getTrackInfoCurrentArtist'];
		},
		artistImage() {
			return this.currentArtist?.images[0]?.url;
		},
		currentArtistIsFav() {
			return this.$store.getters['artists/getCurrentArtistIsFav'];
		},
		countryFormat() {
			return this.$store.getters['controller/getCountryCode'];
		},
		currentArtistMonthlyListeners() {
			return new Intl.NumberFormat(this.countryFormat).format(
				this.currentArtist?.followers?.total
			);
		},
		getCurrentlyPlayingContextType() {
			return this.$store.getters['controller/getCurrentlyPlayingTrack']?.context
				?.type;
		},

		contextTypeID() {
			return this.getCurrentlyPlayingContextType === 'album'
				? this.getCurrentlyPlayingTrack?.item?.album?.id
				: this.getCurrentlyPlayingContextType === 'playlist'
				? this.getCurrentlyPlayingTrack?.context?.uri.split(':')[2]
				: !this.getCurrentlyPlayingContextType
				? this.currentArtist?.id
				: '';
		},
		getQueueName() {
			return this.$store.getters['controller/getQueueName'];
		},
		contextName() {
			return !this.getCurrentlyPlayingContextType
				? this.artistName
				: this.getCurrentlyPlayingContextType !== 'collection'
				? this.getQueueName
				: '';
		},
		queueTrackList() {
			return this.$store.getters['controller/getQueueTrackList'];
		},
		allQueueList() {
			return this.$store.getters['controller/getAllQueueList'];
		},
		nextQueue() {
			return this.queueTrackList.length
				? this.queueTrackList[0]
				: this.allQueueList[0];
		},
		getCurrentTrack() {
			return this.$store.getters['controller/getCurrentlyPlayingTrack'];
		},
		currentTrackID() {
			return this.$store.getters['controller/getCurrentlyPlayingTrack']?.item
				.id;
		},

		currentTrackIsFav() {
			return this.$store.getters['controller/getCurrentTrackIsFav'];
		},
		currentTrackName() {
			return this.getCurrentTrack ? this.getCurrentTrack?.item?.name : '';
		},
		currentTrackAlbumID() {
			return this.getCurrentTrack
				? this.getCurrentTrack?.item?.album?.id
				: 'null';
		},
		currentTrackArtistsArr() {
			return this.getCurrentTrack?.item?.artists;
		},
		currentTrackArtists() {
			return this.getCurrentTrack ? this.currentTrackArtistsArr[0].name : '';
		},
		isPlayingCollection() {
			return (
				this.getCurrentTrack?.context?.type === 'collection' &&
				this.getCurrentTrack?.is_playing
			);
		},
	},
	watch: {},

	async created() {
		console.log('currentTrackInfo Mounted!');
	},
};
</script>

<style lang="scss" scoped>
.artist--name {
	&::after {
		display: inline-block;
		content: '\00a0';
	}
}
.infoContainer {
	height: calc(100vh - 92px);
}
.trackInfo {
	position: relative;

	&::after {
		content: '';
		position: absolute;
		z-index: 200;
		width: 20px;
		height: 300%;
		top: -20px;
		left: -14px;
		background-image: linear-gradient(
			(to left, rgba(24, 24, 24, 1) 15%, rgba(24, 24, 24, 0.1) 100%)
		);
	}
}

.trackInfo2 {
	position: relative;

	&::after {
		content: '';
		position: absolute;
		z-index: 10;
		width: 20px;
		height: 100%;
		top: 0;
		left: -18px;
		background-image: linear-gradient(
			(to left, rgba(24, 24, 24, 1) 15%, rgba(24, 24, 24, 0.1) 100%)
		);
	}
}

.trackInfo3 {
	position: relative;

	&::before {
		content: '';
		position: absolute;
		z-index: 10;
		width: 15px;
		height: 100%;
		top: 0;
		right: 5px;
		background-image: linear-gradient(
			(to left, rgba(50, 50, 50, 0.8) 25%, rgba(50, 50, 50, 0.1) 100%)
		);
	}
}
.trackInfo3:hover {
	position: relative;

	&::before {
		background-image: linear-gradient(
			(to left, rgba(69, 69, 69, 0.8) 25%, rgba(69, 69, 69, 0.1) 100%)
		);
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
	animation: emptyheart 0.25s ease-in-out 1 alternate;
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
		transform: translateX(-5px) rotate(-10deg);
	}
	66% {
		transform: translateX(5px) rotate(10deg);
	}
	100% {
		transform: translateX(0) rotate(0);
	}
}
</style>
