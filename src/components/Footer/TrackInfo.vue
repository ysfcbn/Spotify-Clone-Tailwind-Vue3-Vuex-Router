<template>
	<div class="flex ml-3 w-[29%] min-w-[13.3rem] flex-shrink mr-5">
		<div
			v-show="getCurrentTrack"
			:class="`relative flex items-center justify-center ease-in duration-200 ${
				!trackImgDisplay ? 'right-[5rem] ease-in duration-200' : 'right-[0rem]'
			}`"
		>
			<div class="group relative shrink-0 mr-3">
				<span
					class="hidden group-hover:block text-lightest w-fit rounded-full p-1 bg-opacblack absolute right-1 top-1 hover:scale-105 hover:bg-opacblack3 hover:text-white"
					@click="toggleImg"
				>
					<svg role="img" height="16" width="16" viewBox="0 0 16 16">
						<path
							fill="currentColor"
							d="M.47 11.03a.75.75 0 001.06 0L8 4.56l6.47 6.47a.75.75 0 101.06-1.06L8 2.44.47 9.97a.75.75 0 000 1.06z"
						></path>
					</svg>
				</span>
				<img width="56" height="56" :src="currentTrackAlbumImage" />
			</div>
			<div
				class="trackInfo flex flex-col overflow-x-hidden flex-shrink min-w-[5rem] gap-y-1 pr-4"
			>
				<div class="flex shrink-0 w-fit relative z-0">
					<router-link
						:to="{ name: 'album', params: { id: `${currentTrackID}` } }"
						class="text-[14px] text-white shrink-0 hover:underline font-semibold cursor-pointer"
					>
						{{ currentTrackName }}
					</router-link>
				</div>
				<div class="flex shrink-0 min-w-fit relative z-0">
					<router-link
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
									: `${artist.name},`
								: artist.name
						}}
					</router-link>
				</div>
			</div>
			<div class="flex items-center justify-center text-lightest">
				<button
					:class="{
						greenHeart: currentTrackIsFav,
						'emptyHeart hover:text-white': !currentTrackIsFav,
					}"
					class="ml-3 cursor-default"
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

				<button class="ml-4 cursor-default">
					<svg class="hover:text-white" width="16" height="16">
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
export default {
	name: 'TrackInfo',
	props: ['toggleImg', 'trackImgDisplay'],
	data() {
		return {};
	},
	computed: {
		getCurrentTrack() {
			return this.$store.getters['controller/getCurrentlyPlayingTrack'];
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
		currentTrackID() {
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
	methods: {},
	created() {
		console.log('CREATED!!!!! Footer');
	},
};
</script>

<style lang="scss" scoped>
.trackInfo {
	position: relative;
	&::after {
		content: '';
		position: absolute;
		z-index: 0;
		width: 10px;
		height: 100%;
		top: 0;
		right: 0;
		background-image: linear-gradient(
			(to left, rgba(24, 24, 24, 1) 10%, rgba(24, 24, 24, 0.1) 100%)
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
			(to right, rgba(24, 24, 24, 1) 10%, rgba(24, 24, 24, 0.1) 100%)
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
