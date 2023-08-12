<template>
	<div
		:class="{
			'relative w-[100%] min-w-[15rem]   max-w-[28rem]': isAuth,
		}"
		class="track-info bg-gradient-to-b from-black to-black-50 mb:text-xs sm3:text-[13px] px-4"
	>
		<!-- Contextname -->
		<div
			class="relative flex items-center justify-between text-white h-[5rem] max-w-fit bg-red"
		>
			<span
				class="relative text-white font-semibold mb:text-[12px] sm3:text-[13px] text-white flex shrink-0 cursor-pointer z-0"
			>
				<router-link
					class="hover:underline"
					:key="getCurrentlyPlayingContextType"
					:to="{
						name: `${getCurrentlyPlayingContextType}`,
						params: { id: `${contextTypeID}` },
					}"
				>
					{{ getQueueName }}</router-link
				>
			</span>

			<div
				class="relative flex shrink-0 items-center transition ease-in duration-200 z-[999]"
			>
				<button
					@click="closeTrack(msg, $event)"
					class="close--button p-2 hover:bg-white/20 rounded-full hover:scale-110 text-white/80 transition ease-in duration-200"
				>
					<svg role="img" height="16" width="16" viewBox="0 0 16 16" class="">
						<path
							fill="currentColor"
							d="M1.47 1.47a.75.75 0 011.06 0L8 6.94l5.47-5.47a.75.75 0 111.06 1.06L9.06 8l5.47 5.47a.75.75 0 11-1.06 1.06L8 9.06l-5.47 5.47a.75.75 0 01-1.06-1.06L6.94 8 1.47 2.53a.75.75 0 010-1.06z"
						></path>
					</svg>
				</button>
			</div>
		</div>

		<!-- contextImage -->
		<div class="h-full w-full relative">
			<div class="w-full relative mb-5">
				<img
					class="rounded-lg rounded-full shadow-[0px_5px_15px_8px_rgba(0,0,0,0.4)] mb:h-full object-cover"
					src="https://i.scdn.co/image/ab6761610000e5eb06cb6902e0666278278ae1f4"
					alt="image"
				/>
			</div>
		</div>

		<!-- trackname & artistname -->
		<div
			class="trackInfo flex flex-col overflow-x-hidden pl-[1px] gap-y-1 min-w-[4rem] pr-4"
		>
			<div class="flex relative z-0">
				<router-link
					:to="{ name: 'album', params: { id: 1 } }"
					class="mb:text-[12px] sm3:text-[13px] text-white flex shrink-0 hover:underline font-semibold cursor-pointer"
				>
					asdsa
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
</template>

<script>
import AppSignUpPopUp from '../Cards/AppSignUpPopUp.vue';

export default {
	name: 'Sidebar',
	components: { AppSignUpPopUp },
	props: ['toggleImg', 'trackImgDisplay'],
	data() {
		return {
			containerListHeight: 335,
			dowloadAppHeight: '',
			collectionPopup: false,
			createPlaylistPopup: false,
			favoriteSongsPopup: false,
			visible: true,
		};
	},
	methods: {},
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
		getCurrentlyPlayingContextType() {
			return this.$store.getters['controller/getCurrentlyPlayingTrack']?.context
				?.type;
		},

		contextTypeID() {
			return this.getCurrentlyPlayingContextType === 'album'
				? this.getCurrentlyPlayingTrack?.item?.album?.id
				: this.getCurrentlyPlayingContextType === 'playlist'
				? this.getCurrentlyPlayingTrack?.context?.uri.split(':')[2]
				: '';
		},
		getQueueName() {
			return this.$store.getters['controller/getQueueName'];
		},
		isPlayingCollection() {
			return (
				this.getCurrentTrack?.context?.type === 'collection' &&
				this.getCurrentTrack?.is_playing
			);
		},
	},
	watch: {},

	async mounted() {
		if (!this.isAuth) return;
		console.log('currentTrackInfo Mounted!');
	},
};
</script>

<style></style>
