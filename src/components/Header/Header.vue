<template>
	<header
		id="header"
		:class="{
			'home-not-auth--intersec-bg1': !isAuth,
		}"
		class="h-[64px] z-[60] w-full top-0 itex-center sticky"
	>
		<div
			class="z-70 relative flex w-full items-center justify-between mb:text-xs md:text-sm lg:pl-[1rem]"
		>
			<div
				:class="{ truncate: isAuth && !isNavVisible }"
				class="flex mt-[4px] text-lightest"
			>
				<div @click="goBack" class="mt-[1px] flex justify-between items-center">
					<button class="w-fit h-fit rounded-full bg-dark1 p-[4px] ml-4">
						<svg
							class="text-white"
							role="img"
							height="24"
							width="24"
							viewBox="0 0 24 24"
						>
							<path
								fill="currentColor"
								d="M15.957 2.793a1 1 0 010 1.414L8.164 12l7.793 7.793a1 1 0 11-1.414 1.414L5.336 12l9.207-9.207a1 1 0 011.414 0z"
							></path>
						</svg>
					</button>
					<button
						@click="goForward"
						class="w-fit h-fit ml-4 p-[4px] rounded-full hidden lg:block bg-opacblack"
					>
						<svg
							class="text-lightest"
							role="img"
							height="24"
							width="24"
							viewBox="0 0 24 24"
						>
							<path
								fill="currentColor"
								d="M8.043 2.793a1 1 0 000 1.414L15.836 12l-7.793 7.793a1 1 0 101.414 1.414L18.664 12 9.457 2.793a1 1 0 00-1.414 0z"
							></path>
						</svg>
					</button>
				</div>

				<div
					v-if="currentPlaylist && !isNavVisible && !isSearchVisible"
					:class="{
						activeBtn: getHeaderBtn && isDiskografiPage && listView,
						'transition-opacity duration-700 activeBtn':
							getHeaderBtn && !isDiskografiPage,
					}"
					class="flex items-center relative sm:ml-3 lg:ml-2 opacity-0 truncate"
				>
					<div class="p-1 mr-2">
						<button
							@mousedown="leftClick = true"
							@mouseup="leftClick = false"
							@click="isHeaderBtnActive && playResumeTrack()"
							v-if="
								!isEpisodePage && !isShowPage && !isUsersPage && !isGenrePage
							"
							:class="{
								'bg-green3/70 scale-[1]': leftClick,
								'hover:scale-[1.04] bg-green3': !leftClick,
							}"
							class="rounded-full p-[0.8rem] relative text-black cursor-default lg:group-hover:block"
						>
							<span
								><svg
									role="img"
									height="22"
									width="22"
									viewBox="0 0 24 24"
									class=""
								>
									<path
										v-if="!isPlayingHeaderBtn"
										fill="currentColor"
										d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"
									></path>
									<path
										v-else
										fill="currentColor"
										d="M5.7 3a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7H5.7zm10 0a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7h-2.6z"
									></path>
								</svg>
							</span>
						</button>
					</div>

					<div class="text-2xl font-semibold text-white mb-1 truncate">
						<span v-if="isFavoriteSongs" style="font-weight: 700"
							>Liked Songs</span
						>
						<span v-if="isArtistPage" style="font-weight: 700">{{
							artistName
						}}</span>
						<span
							v-if="isDiskografiPage && listView"
							class="truncate"
							style="font-weight: 700"
							>{{ currentDiskoSection }}</span
						>
						<span
							v-if="isAlbumPage"
							class="truncate"
							style="font-weight: 700"
							>{{ albumName }}</span
						>

						<span
							v-if="isPlaylistPage"
							class="w-full truncate"
							style="font-weight: 700"
						>
							{{ playlistName }}
						</span>
						<span v-if="isTrackPage" style="font-weight: 700">{{
							trackName
						}}</span>
						<span v-if="isEpisodesPage" style="font-weight: 700">Episodes</span>
						<span v-if="isUsersPage" style="font-weight: 700">{{
							currentUserName
						}}</span>
						<span v-if="isEpisodePage" style="font-weight: 700">{{
							episodeName
						}}</span
						><span v-if="isShowPage" style="font-weight: 700">{{
							showName
						}}</span>
						<span v-if="isGenrePage" style="font-weight: 700">{{
							genreName
						}}</span>
					</div>
				</div>

				<div
					v-if="isUsersPage"
					:class="{ active: isUsersPage }"
					style="font-weight: 600"
					class="profile-header flex items-center relative opacity-0 transition-opacity duration-500"
				>
					{{ userName }}
				</div>

				<div
					v-if="isNavVisible"
					:style="{ 'font-weight': 700 }"
					class="flex w-full items-center text-lightest ml-8 sm:text-[12px] lg:text-[13px]"
				>
					<router-link
						to="/collection/playlists"
						id="playlists"
						class="py-[11px] px-[16px] text-white rounded-sm cursor-pointer mr-2 shrink-0"
						>Playlists</router-link
					>
					<router-link
						to="/collection/podcasts"
						id="podcsast"
						class="py-[11px] px-[16px] text-white rounded-sm cursor-pointer mr-2 hidden sm3:block"
						>Podcasts</router-link
					>
					<router-link
						to="/collection/artists"
						id="artists"
						class="py-[11px] px-[16px] text-white rounded-sm cursor-pointer mr-2 hidden lg2:block"
					>
						Artists
					</router-link>
					<router-link
						to="/collection/albums"
						id="albums"
						class="py-[11px] px-[16px] text-white rounded-sm cursor-pointer hidden lg2:block"
						>Albums</router-link
					>
					<button
						@click="toggleDropPlaylists"
						id="droplist"
						class="flex items-center h-[2.2rem] bg-light py-[8px] px-[12px] text-white rounded-md cursor-pointer mr-3 shrink-0 w-fit font-semibold lg2:hidden sm:flex relative"
					>
						<div
							v-if="dropPlaylists"
							:style="{ 'font-weight': 700 }"
							class="justify-start absolute sm:text-[12px] lg:text-[13px] z-50 bg-dark2 top-[2.7rem] left-0 p-[4px] h-fit w-[9.3rem] text-opacwhite3 font-medium whitespace-nowrap rounded-md cursor-default shadow-lg shadow-[0px_15px_15px_1px_rgba(0,0,0,0.4)]"
						>
							<router-link
								to="/collection/podcasts"
								:class="{ active2: activePodcasts }"
								class="flex justify-start w-full p-[12px] hover:bg-dark3 sm3:hidden"
							>
								Podcasts
							</router-link>
							<router-link
								to="/collection/artists"
								:class="{ active2: activeArtists }"
								class="flex justify-start w-full p-[12px] hover:bg-dark3`"
							>
								Artists
							</router-link>
							<router-link
								to="/collection/albums"
								:class="{ active2: activeAlbums }"
								class="flex justify-start w-full p-[12px] hover:bg-dark3`"
							>
								Albums
							</router-link>
						</div>
						<span class="mr-2">{{ currentSec }}</span>
						<svg
							fill="currentColor"
							role="img"
							height="16"
							width="16"
							viewBox="0 0 16 16"
						>
							<path v-if="dropPlaylists" d="M14 6l-6 6-6-6h12z"></path>
							<path v-else d="M14 10L8 4l-6 6h12z"></path>
						</svg>
						<svg
							class="hidden"
							fill="currentColor"
							role="img"
							height="16"
							width="16"
							viewBox="0 0 16 16"
						>
							<path d="M14 10L8 4l-6 6h12z"></path>
						</svg>
					</button>
				</div>

				<div
					v-show="isSearchVisible"
					class="flex items-center w-[22.8rem] shrink-1 px-4"
				>
					<div class="w-full z-10 relative">
						<form>
							<input
								placeholder="What do you want to listen to ?"
								type="text"
								ref="input"
								class="w-[100%] h-[3rem] rounded-full p-[10px] px-12 bg-light/70 text-white hover:bg-light focus:outline-white"
								v-model="inputField"
							/>
						</form>
						<span
							:class="{
								'text-white': inputField.length,
							}"
							class="absolute z-0 top-3 left-3 focus:text-white"
						>
							<svg
								role="img"
								height="24"
								width="24"
								aria-hidden="true"
								viewBox="0 0 24 24"
							>
								<path
									fill="currentColor"
									d="M10.533 1.279c-5.18 0-9.407 4.14-9.407 9.279s4.226 9.279 9.407 9.279c2.234 0 4.29-.77 5.907-2.058l4.353 4.353a1 1 0 101.414-1.414l-4.344-4.344a9.157 9.157 0 002.077-5.816c0-5.14-4.226-9.28-9.407-9.28zm-7.407 9.279c0-4.006 3.302-7.28 7.407-7.28s7.407 3.274 7.407 7.28-3.302 7.279-7.407 7.279-7.407-3.273-7.407-7.28z"
								></path>
							</svg>
						</span>
						<span
							@click="clean"
							v-if="inputField.length"
							class="absolute flex self-center text-white top-4 right-3"
						>
							<svg role="img" height="14" width="14" viewBox="0 0 16 16">
								<path
									fill="currentColor"
									d="M1.47 1.47a.75.75 0 011.06 0L8 6.94l5.47-5.47a.75.75 0 111.06 1.06L9.06 8l5.47 5.47a.75.75 0 11-1.06 1.06L8 9.06l-5.47 5.47a.75.75 0 01-1.06-1.06L6.94 8 1.47 2.53a.75.75 0 010-1.06z"
								></path>
							</svg>
						</span>
					</div>
				</div>
			</div>

			<div
				v-if="isAuth"
				@click="toggleDropDown"
				id="account--Icon"
				class="w-fit flex items-center text-white font-semibold shrink-0 mb-2 sm:mx-[1rem] lg:mx-[2rem] mt-3 p-[2px] bg-black rounded-full cursor-pointer hover:bg-opacblack4 relative"
			>
				<ul
					v-if="accountOptions"
					class="absolute bg-dark2 top-[2.7rem] right-0 p-[4px] h-fit w-[11rem] text-opacwhite3 whitespace-normal rounded cursor-default shadow-[0px_15px_15px_1px_rgba(0,0,0,0.4)]"
				>
					<li
						@click="goAccountPage"
						class="flex items-center justify-between w-full p-[10px] hover:bg-dark3"
					>
						<button class="cursor-default">
							<a href="#" class="cursor-default">Account</a>
						</button>
						<span>
							<svg
								role="img"
								height="16"
								width="16"
								viewBox="0 0 16 16"
								class="Svg-sc-1bi12j5-0 jgfuCe"
							>
								<path
									fill="currentColor"
									d="M1 2.75A.75.75 0 011.75 2H7v1.5H2.5v11h10.219V9h1.5v6.25a.75.75 0 01-.75.75H1.75a.75.75 0 01-.75-.75V2.75z"
								></path>
								<path
									fill="currentColor"
									d="M15 1v4.993a.75.75 0 11-1.5 0V3.56L8.78 8.28a.75.75 0 01-1.06-1.06l4.72-4.72h-2.433a.75.75 0 010-1.5H15z"
								></path></svg
						></span>
					</li>
					<li
						@click="goProfile(currentUserID)"
						class="w-full p-[10px] hover:bg-dark3"
					>
						<button>
							<span class="cursor-default">Profile</span>
						</button>
					</li>
					<li
						@click="goSupportPage"
						class="flex items-center justify-between w-full p-[10px] hover:bg-dark3"
					>
						<button class="cursor-default">
							<a href="#" class="cursor-default">Support</a>
						</button>
						<span>
							<svg
								role="img"
								height="16"
								width="16"
								viewBox="0 0 16 16"
								class="Svg-sc-1bi12j5-0 jgfuCe"
							>
								<path
									fill="currentColor"
									d="M1 2.75A.75.75 0 011.75 2H7v1.5H2.5v11h10.219V9h1.5v6.25a.75.75 0 01-.75.75H1.75a.75.75 0 01-.75-.75V2.75z"
								></path>
								<path
									fill="currentColor"
									d="M15 1v4.993a.75.75 0 11-1.5 0V3.56L8.78 8.28a.75.75 0 01-1.06-1.06l4.72-4.72h-2.433a.75.75 0 010-1.5H15z"
								></path></svg
						></span>
					</li>
					<li
						@click="goDownloadPage"
						class="flex items-center justify-between w-full p-[10px] hover:bg-dark3"
					>
						<button class="cursor-default">
							<a href="#" class="cursor-default">Download</a>
						</button>
						<span>
							<svg
								role="img"
								height="16"
								width="16"
								viewBox="0 0 16 16"
								class="Svg-sc-1bi12j5-0 jgfuCe"
							>
								<path
									fill="currentColor"
									d="M1 2.75A.75.75 0 011.75 2H7v1.5H2.5v11h10.219V9h1.5v6.25a.75.75 0 01-.75.75H1.75a.75.75 0 01-.75-.75V2.75z"
								></path>
								<path
									fill="currentColor"
									d="M15 1v4.993a.75.75 0 11-1.5 0V3.56L8.78 8.28a.75.75 0 01-1.06-1.06l4.72-4.72h-2.433a.75.75 0 010-1.5H15z"
								></path></svg
						></span>
					</li>
					<li
						class="w-full p-[10px] hover:bg-dark3 border-b border-lightest/20"
					>
						<button>
							<span class="cursor-default">Settings</span>
						</button>
					</li>
					<li @click="logout" class="w-full p-[10px] hover:bg-dark3">
						<button class="cursor-default">
							<span>Log out</span>
						</button>
					</li>
				</ul>
				<div
					class="w-[2rem] h-[2rem] text-white flex items-center bg-[#535353] rounded-full justify-center"
				>
					<div v-if="userAvatar">
						<img class="rounded-full" :src="userAvatar" alt="user" />
					</div>

					<svg v-else height="16" width="16" viewBox="0 0 16 16">
						<path
							fill="currentColor"
							d="M6.233.371a4.388 4.388 0 015.002 1.052c.421.459.713.992.904 1.554.143.421.263 1.173.22 1.894-.078 1.322-.638 2.408-1.399 3.316l-.127.152a.75.75 0 00.201 1.13l2.209 1.275a4.75 4.75 0 012.375 4.114V16H.382v-1.143a4.75 4.75 0 012.375-4.113l2.209-1.275a.75.75 0 00.201-1.13l-.126-.152c-.761-.908-1.322-1.994-1.4-3.316-.043-.721.077-1.473.22-1.894a4.346 4.346 0 01.904-1.554c.411-.448.91-.807 1.468-1.052zM8 1.5a2.888 2.888 0 00-2.13.937 2.85 2.85 0 00-.588 1.022c-.077.226-.175.783-.143 1.323.054.921.44 1.712 1.051 2.442l.002.001.127.153a2.25 2.25 0 01-.603 3.39l-2.209 1.275A3.25 3.25 0 001.902 14.5h12.196a3.25 3.25 0 00-1.605-2.457l-2.209-1.275a2.25 2.25 0 01-.603-3.39l.127-.153.002-.001c.612-.73.997-1.52 1.052-2.442.032-.54-.067-1.097-.144-1.323a2.85 2.85 0 00-.588-1.022A2.888 2.888 0 008 1.5z"
						></path>
					</svg>
				</div>
				<span class="px-2 hidden lg:block">{{ userName }}</span>
				<span class="pr-1 hidden lg:block">
					<svg role="img" height="16" width="16" viewBox="0 0 16 16">
						<path
							v-if="accountOptions"
							fill="currentColor"
							d="M14 10L8 4l-6 6h12z"
						></path>
						<path v-else fill="currentColor" d="M14 6l-6 6-6-6h12z"></path>
					</svg>
				</span>
			</div>
			<div
				v-if="!isAuth"
				class="flex items-center w-[14rem] justify-between mt-2 sm:mx-[1rem] lg:mx-[1.5rem] shrink-0"
			>
				<a
					:href="href"
					target="_blank"
					class="text-opacwhite5 text-base hover:scale-110 hover:text-white2 cursor-default"
				>
					Sign up</a
				><button
					@click="login"
					class="py-3 px-8 rounded-full bg-white2 hover:bg-[#f6f6f6] hover:scale-105 cursor-default"
				>
					<span class="text-black text-base font-semibold">Log in</span>
				</button>
			</div>
		</div>
	</header>
</template>

<script>
export default {
	data() {
		return {
			inputField: '',
			accountOptions: false,
			dropPlaylists: false,
			leftClick: false,
			historyCounter: 1,
			albumImg: '',
			href: 'https://accounts.spotify.com/tr/login?continue=https%3A%2F%2Fopen.spotify.com%2F',
		};
	},
	methods: {
		playResumeTrack() {
			this.$store.dispatch(
				'controller/isClickHeaderBtn',
				!this.isClickHeaderBtn
			);
		},

		clean() {
			this.inputField = '';
			this.$router.push({ name: 'search' });
		},
		logout() {
			this.$store.dispatch('logout');
			this.$router.push({ name: 'home' });
			const header = document.getElementById('header');
			header.classList.remove('home-intersec-bg1');
			header.classList.remove('home-intersec-bg2');
			header.classList.remove('home-not-auth--intersec-bg1');
			header.classList.remove('home-not-auth--intersec-bg2');
			header.classList.remove('home-not-auth--intersec-bg3');
		},
		login() {
			this.$router.push({ name: 'login' });
		},

		toggleDropPlaylists() {
			this.dropPlaylists = !this.dropPlaylists;
			this.accountOptions ? (this.accountOptions = false) : '';
		},
		toggleDropDown() {
			this.accountOptions = !this.accountOptions;
			this.dropPlaylists ? (this.dropPlaylists = false) : '';
		},
		goProfile(currentUserID) {
			this.$router.push({ name: 'user', params: { id: currentUserID } });
		},
		goAccountPage() {
			window.open('https://www.spotify.com/account/overview');
		},
		goSupportPage() {
			window.open('https://support.spotify.com/');
		},
		goDownloadPage() {
			window.open('https://www.spotify.com/download/windows/');
		},
		goBack() {
			this.$router.back();
		},
		goForward() {
			this.$router.forward();
		},

		close(e) {
			if (!this.$el.contains(e.target)) {
				this.accountOptions = false;
				this.dropPlaylists = false;
			}
		},
	},

	computed: {
		isAuth() {
			return this.$store.getters.isAuth;
		},
		userName() {
			return this.$store.getters.getCurrentUser?.display_name;
		},
		userAvatar() {
			return this.$store.getters.getCurrentUser?.images[0].url;
		},
		currentUserID() {
			return this.$store.getters.getCurrentUser?.id;
		},

		isNavVisible() {
			return (
				this.$route.fullPath === '/collection/playlists' ||
				this.$route.fullPath === '/collection/podcasts' ||
				this.$route.fullPath === '/collection/artists' ||
				this.$route.fullPath === '/collection/albums'
			);
		},
		inputFieldFormula() {
			return this.inputField.replaceAll(' ', '%20');
		},
		isSearchVisible() {
			return (
				this.$route.name === 'search' || this.$route.name === 'searchResult'
			);
		},
		getSearchItem() {
			return this.$store.getters['searchItem/getSearchItem'];
		},
		getSearchCategoryType() {
			return this.$store.getters['searchItem/getSearchCategoryType'];
		},
		currentSec() {
			return this.$route.fullPath === '/collection/playlists'
				? 'Playlists'
				: this.$route.fullPath === '/collection/podcasts'
				? 'Podcasts'
				: this.$route.fullPath === '/collection/artists'
				? 'Artists'
				: 'Albums';
		},

		isHeaderBtnActive() {
			return this.$store.getters['controller/isHeaderBtnActive'];
		},
		isPlayingHeaderBtn() {
			return this.$store.getters['controller/isPlayingHeaderBtn'];
		},
		isClickHeaderBtn() {
			return this.$store.getters['controller/isClickHeaderBtn'];
		},

		activePodcasts() {
			return this.$route.fullPath === '/collection/podcasts' ? true : false;
		},
		activeArtists() {
			return this.$route.fullPath === '/collection/artists' ? true : false;
		},
		activeAlbums() {
			return this.$route.fullPath === '/collection/albums' ? true : false;
		},

		isEpisodePage() {
			return this.$route.fullPath === `/episode/${this.$route.params.id}`;
		},
		isEpisodesPage() {
			return this.$route.fullPath === `/collection/episodes`;
		},
		isShowPage() {
			return this.$route.fullPath === `/show/${this.$route.params.id}`;
		},
		isGenrePage() {
			return this.$route.fullPath === `/genre/${this.$route.params.id}`;
		},
		isUsersPage() {
			return this.$route.fullPath === `/user/${this.$route.params.id}`;
		},
		isAlbumPage() {
			return this.$route.fullPath === `/album/${this.$route.params.id}`;
		},
		getSelectredType() {
			return this.$store.getters['discography/getSelectedType'];
		},
		isDiskografiPage() {
			return (
				this.$route.fullPath ===
				`/artist/${this.$route.params.id}/discography/${this.$route.params.type}`
			);
		},
		getDiscoRenderType() {
			return this.$store.getters['discography/getDiscoRenderType'];
		},
		listView() {
			return this.getDiscoRenderType === 'listView';
		},
		isFavoriteSongs() {
			return this.$route.fullPath === '/collection/tracks';
		},
		isArtistPage() {
			return this.$route.fullPath === `/artist/${this.$route.params.id}`;
		},
		isSinglePage() {
			return this.$route.fullPath === `/single/${this.$route.params.id}`;
		},
		isPlaylistPage() {
			return this.$route.fullPath === `/playlist/${this.$route.params.id}`;
		},

		isTrackPage() {
			return this.$route.fullPath === `/track/${this.$route.params.id}`;
		},
		getHeaderBtn() {
			return this.$store.getters['controller/getHeaderBtn'];
		},

		currentPlaylist() {
			return this.$store.getters['playlists/getPlaylist'];
		},

		currentUser() {
			return this.$store.getters['users/getUser'];
		},

		playlistName() {
			return this.currentPlaylist?.name;
		},
		albumName() {
			return this.$store.getters['albums/getAlbum']?.name;
		},
		trackName() {
			return this.$store.getters['albums/getCurrentTrack']?.name;
		},
		artistName() {
			return this.$store.getters['artists/getCurrentArtist']?.name;
		},
		episodeName() {
			return this.$store.getters['episodes/getCurrentEpisode']?.name;
		},
		showName() {
			return this.$store.getters['shows/getCurrentShow']?.name;
		},
		genreName() {
			return this.$store.getters['genres/getGenreTitle'];
		},

		currentDiskoSection() {
			return this.$store.getters['discography/getCurrentDiskoSection'];
		},
		currentUserName() {
			return this.$route.params.id === this.currentUserID ? this.userName : '';
		},
	},
	watch: {
		$route(to, from) {
			if (to.name !== 'searchResult') {
				this.$store.commit('searchItem/searchCategoryType', 'all');
			}
			this.accountOptions = false;
			this.dropPlaylists = false;
			setTimeout(() => {
				if (this.$refs.input) this.$refs.input.focus();
			}, 10);
			if (this.$route.name === 'search') {
				this.inputField = '';
				setTimeout(() => {
					if (this.$refs.input) this.$refs.input.focus();
				}, 100);
			}
		},
		async inputField(newVal, oldVal) {
			if (newVal === '') {
				this.$router.push({ name: 'search' });
			} else if (newVal !== oldVal) {
				console.log(this.inputField);
				await this.$store.dispatch('searchItem/searchItem', this.inputField);
				await this.$store.dispatch('searchItem/fetchSearchItem');
				await this.$store.dispatch('searchItem/topResult1');
				await this.$store.dispatch('searchItem/topSongs');

				this.$router.push({
					name: 'searchResult',
					params: { q: newVal, type: this.getSearchCategoryType },
				});
			}
		},
		getSearchCategoryType(newVal, oldVal) {
			if (newVal === '') {
				this.$router.push({ name: 'search' });
			} else if (newVal !== oldVal) {
				this.$router.push({
					params: { type: this.getSearchCategoryType },
				});
			}
		},
	},
	mounted() {
		document.addEventListener('click', this.close);
	},

	beforeUnmount() {
		document.removeEventListener('click', this.close);
	},
};
</script>

<style scoped lang="scss">
a.active {
	background-color: #333333;
}
a.active2 {
	color: #60a5fa !important;
	background-color: #333333 !important;
}
.activeBtn {
	opacity: 1 !important;
}

.fav-songs-intersec-bg1 {
	background-color: rgba(36, 22, 73, 0.6) !important;
}
.fav-songs-intersec-bg2 {
	background-color: rgb(36, 22, 73) !important;
}
.home-intersec-bg1 {
	background-color: rgba(36, 22, 73, 0.8) !important;
}
.home-intersec-bg2 {
	background-color: rgb(36, 22, 73) !important;
}
.profile-intersec-bg1 {
	background-color: rgba(33, 33, 33, 0.7) !important;
}
.profile-intersec-bg2 {
	background-color: rgb(33, 33, 33) !important;
}
.podcast-intersec-bg1 {
	background-color: rgba(0, 40, 32, 0.7) !important;
}

.podcast-intersec-bg2 {
	background-color: rgba(0, 40, 32, 1) !important;
}

.base-intersec-bg1 {
	background-color: rgba(7, 7, 7, 0.8) !important;
}
.base-intersec-bg2 {
	background-color: rgba(7, 7, 7) !important;
}
.base2-intersec-bg1 {
	background-color: rgba(18, 18, 18, 0.8) !important;
}
.base2-intersec-bg2 {
	background-color: rgba(18, 18, 18) !important;
}

.disko-intersec-bg1 {
	background-color: rgba(7, 7, 7) !important;
}
</style>
