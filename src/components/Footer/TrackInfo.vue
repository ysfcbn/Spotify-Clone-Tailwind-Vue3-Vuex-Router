<template>
	<div class="flex w-[32%] min-w-[13rem] shrink-0 mr-2">
		<div
			v-show="getCurrentTrack"
			class="relative flex items-center justify-center ease-in duration-200 min-w-[14.5rem]"
			:class="{
				'right-[4.5rem] ease-in duration-200 ': !trackImgDisplay,
			}"
		>
			<div class="group relative shrink-0 mx-3">
				<span
					class="hidden group-hover:block text-lightest w-fit rounded-full p-1 bg-black/70 absolute right-1 top-1 hover:scale-112 hover:bg-black/90 hover:text-white"
					@click="toggleImg"
				>
					<svg role="img" height="12" width="12" viewBox="0 0 16 16">
						<path
							fill="currentColor"
							d="M.47 11.03a.75.75 0 001.06 0L8 4.56l6.47 6.47a.75.75 0 101.06-1.06L8 2.44.47 9.97a.75.75 0 000 1.06z"
						></path>
					</svg>
				</span>
				<img width="52" height="52" :src="currentTrackAlbumImage" />
			</div>
			<div
				class="trackInfo flex flex-col overflow-x-hidden pl-[1px] gap-y-1 min-w-[4rem] pr-4"
				:class="{
					'ml-2': !trackImgDisplay,
				}"
			>
				<div class="flex relative z-0">
					<router-link
						:to="{ name: 'album', params: { id: `${currentTrackAlbumID}` } }"
						class="mb:text-[12px] sm3:text-[13px] text-white flex shrink-0 hover:underline font-semibold cursor-pointer"
					>
						{{ currentTrackName }}
					</router-link>
				</div>
				<div class="flex relative z-0">
					<router-link
						:class="currentTrackArtistsArr.length > 1 ? 'artist--name' : ''"
						class="text-[11px] text-lightest shrink-0 hover:underline hover:text-white"
						v-for="artist in currentTrackArtistsArr"
						:key="artist.id"
						:to="{ name: 'artist', params: { id: `${artist.id}` } }"
					>
						{{
							currentTrackArtistsArr.length > 1
								? artist.name ===
								  currentTrackArtistsArr[currentTrackArtistsArr.length - 1].name
									? artist.name
									: artist.name + ','
								: artist.name
						}}
					</router-link>
				</div>
			</div>
			<div
				class="flex items-center justify-center text-lightest w-[5rem] shrink-0 h-full"
			>
				<button
					@click="removeAddToFav((trackID = currentTrackID))"
					:class="{
						greenHeart: currentTrackIsFav,
						'emptyHeart hover:text-white': !currentTrackIsFav,
					}"
					class="cursor-default"
					id="heart"
				>
					<svg role="img" height="14" width="14" viewBox="0 0 16 16" class="">
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

				<button class="ml-3 cursor-default">
					<svg
						class="hover:text-white"
						width="14"
						height="14"
						viewBox="0 0 16 16"
					>
						<g fill="currentColor" fill-rule="evenodd">
							<path
								d="M1 3v9h14V3H1zm0-1h14a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z"
								fill-rule="nonzero"
							></path>
							<path fill="currenColor" d="M10 8h4v3h-4z"></path>
						</g>
					</svg>
				</button>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';

export default {
	name: 'TrackInfo',
	props: ['toggleImg', 'trackImgDisplay'],
	data() {
		return {
			heartEl: null,
		};
	},
	computed: {
		isAuth() {
			return this.$store.getters.isAuth;
		},
		getToken() {
			return this.$store.getters.accessToken;
		},
		getCurrentTrack() {
			return this.$store.getters['controller/getCurrentlyPlayingTrack'];
		},
		currentTrackID() {
			return this.$store.getters['controller/getCurrentlyPlayingTrack']?.item
				.id;
		},
		currentTrackAlbumImage() {
			return this.$store.getters['controller/getCurrentTrackAlbumImage'];
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

		isPlaying() {
			return this.getCurrentTrack?.is_playing;
		},
	},
	methods: {
		async fetchFavTracks() {
			await axios
				.get('https://api.spotify.com/v1/me/tracks?limit=50', {
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + this.getToken,
					},
				})
				.then(({ data }) => {
					this.$store.dispatch('favTracks/getTracks', data);
				})
				.catch(err => console.log(err));
		},
		async addTrackToFav(trackID) {
			await fetch('https://api.spotify.com/v1/me/tracks?ids=' + trackID, {
				method: 'PUT',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + this.getToken,
				},
			})
				.then(data => {
					if (data.status === 200) {
						console.log(trackID, 'ADDED!!!!');
						this.$store.dispatch('controller/modalInfoType', {
							type: 'favSong',
							status: true,
						});
						this.fetchFavTracks();
						this.$store.dispatch('controller/isFavTrack');
					}
				})
				.catch(err => console.log(err));
		},
		async removeTrackToFav(trackID) {
			await axios
				.delete('https://api.spotify.com/v1/me/tracks?ids=' + trackID, {
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + this.getToken,
					},
				})
				.then(data => {
					if (data.status === 200) {
						console.log(trackID, 'DELETED!!!!');
						this.$store.dispatch('controller/modalInfoType', {
							type: 'favSong',
							status: false,
						});
						this.fetchFavTracks();
						this.$store.dispatch('controller/isFavTrack');
					}
				})
				.catch(err => console.log(err));
		},
		async removeAddToFav(currentTrackID) {
			if (this.currentTrackIsFav) {
				this.heartEl.classList.add('animationEmptyHeart');
				await this.removeTrackToFav(currentTrackID);
			} else {
				this.heartEl.classList.add('animationGreenHeart');
				await this.addTrackToFav(currentTrackID);
			}
		},
	},
	mounted() {
		console.log('CREATED!!!!! Footer');
		this.heartEl = document.querySelector('#heart');
		console.log(this.heartEl);
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
.trackInfo {
	position: relative;
	&::after {
		content: '';
		position: absolute;
		z-index: 0;
		width: 25px;
		height: 100%;
		top: 0;
		right: 0;
		background-image: linear-gradient(
			(to left, rgba(0, 0, 0, 0.8) 10%, rgba(0, 0, 0, 0.1) 100%)
		);
	}
	&::before {
		content: '';
		position: absolute;
		z-index: 10;
		width: 1px;
		height: 100%;
		top: 0;
		left: 0;
		background-image: linear-gradient(
			(to right, rgba(0, 0, 0, 1) 10%, rgba(0, 0, 0, 0.1) 100%)
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
