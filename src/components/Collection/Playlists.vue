<template>
	<section class="Playlists-Page p-5 mt-2 lg:ml-[1rem]">
		<div class="text-white">
			<div id="playlists" class="mb-8">
				<div class="h-fit">
					<h2
						class="text-[1.5rem] text-white leading-7 tracking-tighter font-semibold"
					>
						Çalma Listeleri
					</h2>
				</div>
			</div>

			<!-- Cards -->
			<div
				class="relative grid grid-cols-col180 gap-5 grid-rows-1 flex-1 mb-10"
			>
				<div
					@click="toggleFavSong(msg, $event)"
					class="col-span-2 group hover:bg-opacblack1 ease duration-200 w-full h-auto cursor-pointer rounded-md flex-1 p-5 relative leading-8 text-md text-white bg-gradient-to-br from-purple3 to-blue2"
				>
					<div
						:class="{
							'opacity-100 translate-y-[-0.4rem]': isPlayingFavSongsContextUri,
							'opacity-0 ': !isPlayingFavSongsContextUri,
						}"
						class="z-10 absolute flex items-center group-hover:opacity-100 transition ease-in duration-200 right-1 bottom-1 p-3 group-hover:block group-hover:translate-y-[-0.5rem]"
					>
						<button
							id="playBtn"
							@click="
								playFavSongs(
									(uri = {
										uri: userFavSongsContextUri,
										index: 0,
										type: 'collection',
									})
								)
							"
							class="p-3 bg-green3 rounded-full cursor-default lg:group-hover:block hover:scale-105 shadow-[0px_5px_6px_2px_rgba(0,0,0,0.4)]"
						>
							<span>
								<svg role="img" height="24" width="24" viewBox="0 0 24 24">
									<path
										v-if="!isPlayingFavSongsContextUri"
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
					<div class="h-full relative">
						<div class="flex flex-col justify-end h-full relative">
							<div
								class="text-white max-h-[90px] overflow-hidden line-clamp-3 mb-8 w-full"
							>
								<span
									v-for="track in getFavTracks"
									:key="track.track.id"
									class=""
								>
									<span class="text-white font-semibol">
										{{ track.track.artists[0].name }}
										<span
											class="text-lightest after:content-['•'] after:inline-block after:px-1 after:text-lightest font-semibold"
										>
											{{ track.track.name }}
										</span></span
									>
								</span>
							</div>
							<div class="w-full min-h-[62px]">
								<div
									class="inline-block max-w-full text-3xl text-white tracking-tight pb-5"
									style="font-weight: 700"
								>
									Beğenilen Şarkılar
								</div>
								<div class="text-md text-white tracking-tight font-semibold">
									<div
										class="text-white lowercase leading-6 tracking-tight text-[16px]"
									>
										{{ totalTrack }} beğenilen şarkılar
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div
					@click="toggleEpisodes(msg, $event)"
					class="bg-dark1 hover:bg-opacblack1 ease duration-200 w-full cursor-pointer rounded-md flex-1 p-4 relative group"
				>
					<div class="h-full">
						<div
							class="relative py-[50%] w-full mb-5 relative flex items-start bg-podcastGreen2 justify-center rounded-md"
						>
							<svg
								role="img"
								height="64"
								width="64"
								viewBox="0 0 24 24"
								class="text-green3 absolute top-[50%] bottom-0 -translate-y-[50%]"
							>
								<path
									fill="currentColor"
									d="M7 1a3 3 0 00-3 3v17.167c0 1.448 1.657 2.27 2.81 1.393L12 18.612l5.19 3.948c1.153.876 2.81.055 2.81-1.393V4a3 3 0 00-3-3H7z"
								></path>
							</svg>

							<div
								class="absolute flex items-start right-0 bottom-0 py-1 px-2 group-hover:block opacity-0 group-hover:opacity-100 transition ease-in duration-200 group-hover:block group-hover:translate-y-[-0.4rem]"
							>
								<button
									id="playBtn"
									class="p-3 bg-green3 rounded-full cursor-default lg:group-hover:block hover:scale-110 shadow-[0px_5px_6px_2px_rgba(0,0,0,0.4)]"
								>
									<span>
										<svg role="img" height="24" width="24" viewBox="0 0 24 24">
											<path
												fill="text-black"
												d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"
											></path>
										</svg>
									</span>
								</button>
							</div>
						</div>
						<div class="flex items-middle flex-col justify-center">
							<div
								class="text-white max-w-full truncate leading-7"
								style="font-weight: 700"
							>
								Bölümlerin
							</div>
							<div class="text-sm text-lightest w-full truncate leading-7">
								{{ totalFavEpisodes }} bölüm
							</div>
						</div>
					</div>
				</div>
				<div
					v-for="playlist in getUserFavPlaylists"
					:key="playlist.id"
					:id="playlist.id"
					@click="selectedPlaylist((playlist = playlist), $event)"
					class="playlist--container bg-dark1 hover:bg-opacblack1 ease duration-200 w-full h-auto cursor-pointer rounded-md flex-1 p-4 relative group"
				>
					<div class="h-full">
						<div class="w-full mb-5 relative rounded-md">
							<img
								v-if="playlist?.images[0]?.url"
								class="object-cover rounded-md"
								:src="playlist?.images[0]?.url"
								alt=""
							/>
							<div
								v-else
								class="relative py-[50%] w-full mb-5 relative flex items-start bg-light justify-center rounded-md"
							>
								<svg
									height="100"
									width="100"
									viewBox="0 0 54 54"
									class="absolute top-[50%] bottom-0 -translate-y-[50%]"
								>
									<path
										fill="#808080"
										d="M52.16,0.249c-0.217-0.19-0.503-0.275-0.788-0.241l-31,4C19.873,4.072,19.5,4.497,19.5,5v6v28.623
	C17.674,37.428,14.773,36,11.5,36c-5.514,0-10,4.037-10,9s4.486,9,10,9s10-4.037,10-9v-33.12l29-3.742v22.485
	C48.674,28.428,45.773,27,42.5,27c-5.514,0-10,4.037-10,9s4.486,9,10,9s10-4.037,10-9V7V1C52.5,0.712,52.376,0.438,52.16,0.249z
	 M11.5,52c-4.411,0-8-3.141-8-7s3.589-7,8-7s8,3.141,8,7S15.911,52,11.5,52z M42.5,43c-4.411,0-8-3.141-8-7s3.589-7,8-7s8,3.141,8,7
	S46.911,43,42.5,43z M21.5,5.878l29-3.741v3.983l-29,3.741V5.878z"
									></path>
								</svg>
							</div>

							<div
								:class="{
									'opacity-100 translate-y-[-0.4rem]':
										getCurrentlyPlayingTrack?.is_playing &&
										playlist.uri === getCurrentlyPlayingTrack?.context?.uri,
									'opacity-0': !(
										getCurrentlyPlayingTrack?.is_playing &&
										playlist.uri === getCurrentlyPlayingTrack?.context?.uri
									),
								}"
								class="bg-dark1 rounded-full right-0 bottom-0 absolute flex items-center mx-2 group-hover:block group-hover:opacity-100 transition ease-in duration-200 group-hover:translate-y-[-0.4rem]"
							>
								<button
									v-if="playlist.tracks?.total"
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
										' bg-green3/80 scale-80': leftClick,
										'hover:scale-106 bg-green3/95 hover:bg-green3': !leftClick,
									}"
									class="p-[11px] rounded-full cursor-default shadow-[0px_5px_6px_2px_rgba(0,0,0,0.4)]"
								>
									<svg role="img" height="22" width="22" viewBox="0 0 24 24">
										<path
											v-if="
												!(
													getCurrentlyPlayingTrack?.is_playing &&
													playlist.uri ===
														getCurrentlyPlayingTrack?.context?.uri
												)
											"
											fill="text-black"
											d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"
										></path>
										<path
											v-else
											fill="text-black"
											d="M5.7 3a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7H5.7zm10 0a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7h-2.6z"
										></path>
									</svg>
								</button>
							</div>
						</div>
						<div class="flex items-middle flex-col justify-around">
							<div class="text-white max-w-full truncate leading-7">
								{{ playlist.name }}
							</div>
							<div class="text-sm text-lightest w-full line-clamp-2 leading-7">
								<span v-if="playlist.description">
									{{ playlist.description }}
								</span>
								<span v-else>
									Oluşturan:
									{{ playlist.owner.display_name }}
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<section>
			<Info />
		</section>
	</section>
</template>

<script>
import Info from '../SpotifyInfo/Info.vue';
import axios from 'axios';
export default {
	name: 'playlists',
	components: { Info },
	data() {
		return { librarySec: false, leftClick: false, typeOfSelectedSection: null };
	},
	methods: {
		toggleFavSong(_, event) {
			if (event.target.closest('#playBtn')?.id === 'playBtn') {
				console.log('toggle Play/Stop Playlists');
			} else this.$router.push('/collection/tracks');
		},

		toggleEpisodes(_, event) {
			if (event.target.closest('#playBtn')?.id === 'playBtn') {
				console.log('toggle Play/Stop Playlists');
			} else this.$router.push('/collection/episodes');
		},
		selectedPlaylist(playlist, event) {
			if (event.target.closest('#playBtn')?.id === 'playBtn') {
				console.log('toggle Play/Stop Playlists');
			} else {
				this.$router.push({ name: 'playlist', params: { id: playlist.id } });
			}
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
		async playFavSongs(uri) {
			console.log(uri);
			if (this.isPlayingFavSongsContextUri) {
				await this.$store.dispatch('controller/pauseCurrentTrack');
			} else {
				console.log(this.currentPlayingTrackIndex);
				uri.index = this.currentPlayingTrackIndex;
				if (
					this.getCurrentlyPlayingTrack.context?.type === 'collection' &&
					!this.currentPlayingTrackIndex
				) {
					console.log(this.getCurrentlyPlayingTrack.context?.type);
					uri.index = this.currentPlayingTrackIndex;
					await this.$store.dispatch('controller/playCurrentTrack', uri);
				} else {
					uri.index = this.currentPlayingTrackIndex;
					uri.type = 'collection';
					uri.id = this.currentTrackID;
					await this.$store.dispatch('controller/playSelectedContext', uri);
				}
			}
		},
		async playContextUri(uri, href) {
			console.log(uri);
			console.log(uri.type);
			console.log(href);
			if (
				this.isPlayingContextUri &&
				uri.uri === this.getCurrentlyPlayingTrack?.context?.uri
			) {
				await this.$store.dispatch('controller/pauseCurrentTrack');
			} else {
				if ((await uri.type) === 'playlist') {
					await this.fetchPlaylist(href);
					this.typeOfSelectedSection = 'playlist';
				}
				if ((await uri.type) === 'collection') {
					this.typeOfSelectedSection = 'collection';
				}
				if ((await uri.type) === 'episodes') {
					this.typeOfSelectedSection = 'episodes';
				}
				uri.id = this.currentPlaylistTracks[this.currentPlayingTrackIndex]?.id;
				uri.type = this.typeOfSelectedSection;
				uri.index = this.currentPlayingTrackIndex;
				console.log(uri);
				await this.$store.dispatch('controller/playSelectedContext', uri);
			}
		},
	},
	computed: {
		getToken() {
			return this.$store.getters.accessToken;
		},
		getCurrentUser() {
			return this.$store.getters.getCurrentUser;
		},
		currentUserUri() {
			return this.getCurrentUser?.uri;
		},

		userFavSongsContextUri() {
			return `${this.currentUserUri}:collection`;
		},
		isPlayingFavSongsContextUri() {
			return (
				this.getCurrentlyPlayingTrack?.context?.uri ===
					this.userFavSongsContextUri &&
				this.getCurrentlyPlayingTrack?.is_playing
			);
		},
		getCurrentlyPlayingTrack() {
			return this.$store.getters['controller/getCurrentlyPlayingTrack'];
		},
		currentTrackID() {
			return this.getCurrentlyPlayingTrack?.item?.id;
		},
		getFavTracks() {
			return this.$store.getters['favTracks/getTracks']?.items;
		},
		currentPlaylistTracks() {
			return this.$store.getters['playlists/getPlaylist']?.tracks?.items;
		},
		getCurrentPlaylistUri() {
			return this.$store.getters['playlists/getPlaylist']?.uri;
		},
		findCurrentPlayingTrackIndex() {
			return this.typeOfSelectedSection === 'playlist'
				? this.currentPlaylistTracks?.indexOf(
						this.currentPlaylistTracks?.find(
							item => item.track.id === this.currentTrackID
						)
				  )
				: this.typeOfSelectedSection === 'collection'
				? this.getFavTracks?.indexOf(
						this.getFavTracks?.find(
							item => item.track.id === this.currentTrackID
						)
				  )
				: this.typeOfSelectedSection === 'episodes'
				? this.currentAlbum?.indexOf(
						this.currentAlbum?.find(item => item.id === this.currentTrackID)
				  )
				: 0;
		},
		currentPlayingTrackIndex() {
			return this.findCurrentPlayingTrackIndex + 1
				? this.findCurrentPlayingTrackIndex
				: 0;
		},
		isPlayingContextUri() {
			return this.getCurrentlyPlayingTrack?.is_playing;
		},
		getUserFavPlaylists() {
			return this.$store.getters['playlists/getUserFavPlaylists'];
		},
		getFavTracks() {
			return this.$store.getters['favTracks/getTracks'].items;
		},
		totalTrack() {
			return this.$store.getters['favTracks/getTracks'].total;
		},
		totalFavEpisodes() {
			return this.$store.getters['episodes/getFavEpisodes']?.total;
		},
	},
	mounted() {
		this.librarySec = true;

		console.log('Playlists Mounted');

		this.header = document.getElementById('header');
		this.playlistsEl = document.getElementById('playlists');

		this.headerHeight = document
			.getElementById('header')
			.getBoundingClientRect().height;

		console.log(this.playlistsEl);

		this.options = {
			root: null,
			threshold: [0.4, 0.6],
			rootMargin: `-${this.headerHeight}px 0px 0px 0px`,
		};

		this.observer = new IntersectionObserver(entries => {
			this.header.classList.toggle(
				'librarySec-intersec-bg1',
				entries[0].intersectionRatio <= 0.6
			);

			this.header.classList.toggle(
				'librarySec-intersec-bg2',
				entries[0].intersectionRatio <= 0.4
			);
		}, this.options);
		console.log(this.observer);

		this.observer.observe(this.playlistsEl);
	},
	beforeUnmount() {
		this.librarySec = false;
		console.log('Library Unmounted');
		this.observer.unobserve(this.playlistsEl);
		this.header.classList.remove('librarySec-intersec-bg1');
		this.header.classList.remove('librarySec-intersec-bg2');
	},
};
</script>

<style></style>
