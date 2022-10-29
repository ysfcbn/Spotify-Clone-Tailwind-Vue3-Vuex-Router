<template>
	<section v-if="currentTrack && isAuth" class="box-border">
		<div
			id="track--page"
			class="relative z-10 p-5 h-[326px] max-h-[800px] min-h-[340px] w-full mt-[-66px] shadow-[2px_0px_5px_5px_rgba(0,0,0,0.4)]"
			:style="{
				'--bgTrackImage': `url(${albumTrackImage})`,
			}"
		>
			<div class="relative flex items-end justify-start h-full lg:ml-[1rem]">
				<div
					class="flex sm:w-[192px] sm:min-w-[192px] xl:h-[232px] xl:w-[232px] xl:min-w-[232px] shadow-[0_8px_40px_10px_rgba(0,0,0,0.6)] rounded-[12px]"
				>
					<img class="h-full w-full" :src="albumTrackImage" alt="single" />
				</div>
				<div class="flex flex-col text-white font-semibold px-4">
					<h2 class="text-sm">ŞARKI</h2>
					<span>
						<h1
							class="w-full sm:text-3xl md:text-5xl md2:text-6xl xl:text-7xl tracking-tighter py-2"
							style="font-weight: 700"
						>
							{{ currentTrack.name }}
						</h1>
					</span>
					<div
						class="flex items-center flex-wrap mt-2 text-white w-full text-xs sm3:text-sm h-full font-semibold"
					>
						<div class="flex items-center flex-nowrap shrink-0">
							<span class="flex items-center justify-around gap-x-2">
								<div class="w-8 h-8">
									<img class="rounded-full" :src="artistImg" alt="user" />
								</div>
								<router-link
									:to="{
										name: 'artist',
										params: { id: `${currentTrack?.artists[0]?.id}` },
									}"
									class="hover:underline cursor-pointer after:content-['•'] after:ml-1 after:inline-block"
								>
									{{ currentTrack.artists[0].name }}
								</router-link>
							</span>
						</div>
						<div>
							<span class="ml-1 after:content-['•'] after:mx-1">{{
								albumYear(currentTrack?.album.release_date)
							}}</span>
							<span class="text-sm">{{
								trackDuration((duration = currentTrack.duration_ms))
							}}</span>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div
			class="relative z-20 w-full h-[6.8rem] relative flex items-start py-[24px]"
		>
			<div class="w-full ml-[1.2rem] flex items-center lg:ml-[2rem]">
				<button
					class="rounded-full bg-green3 p-[0.9rem] cursor-default hover:scale-105"
				>
					<span>
						<svg role="img" height="28" width="28" viewBox="0 0 24 24" class="">
							<path
								fill="currentColor"
								d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"
							></path>

							<path
								class="hidden"
								d="M5.7 3a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7H5.7zm10 0a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7h-2.6z"
							></path>
						</svg>
					</span>
				</button>
				<div>
					<button
						@click="unFollowTrack"
						id="heartBtn"
						class="p-[0.9rem] w-[4rem] ml-4 mx-1 text-lightest cursor-default hover:text-white"
						:class="{
							greenHeart: isFavTrack,
							emptyHeart: !isFavTrack,
						}"
					>
						<svg role="img" height="32" width="32" viewBox="0 0 24 24">
							<path
								fill="currentColor"
								d="M5.21 1.57a6.757 6.757 0 016.708 1.545.124.124 0 00.165 0 6.741 6.741 0 015.715-1.78l.004.001a6.802 6.802 0 015.571 5.376v.003a6.689 6.689 0 01-1.49 5.655l-7.954 9.48a2.518 2.518 0 01-3.857 0L2.12 12.37A6.683 6.683 0 01.627 6.714 6.757 6.757 0 015.21 1.57zm3.12 1.803a4.757 4.757 0 00-5.74 3.725l-.001.002a4.684 4.684 0 001.049 3.969l.009.01 7.958 9.485a.518.518 0 00.79 0l7.968-9.495a4.688 4.688 0 001.049-3.965 4.803 4.803 0 00-3.931-3.794 4.74 4.74 0 00-4.023 1.256l-.008.008a2.123 2.123 0 01-2.9 0l-.007-.007a4.757 4.757 0 00-2.214-1.194z"
							></path>
							<path
								v-if="isFavTrack"
								:class="{ 'text-green3': isFavTrack }"
								fill="currentColor"
								d="M8.667 1.912a6.257 6.257 0 00-7.462 7.677c.24.906.683 1.747 1.295 2.457l7.955 9.482a2.015 2.015 0 003.09 0l7.956-9.482a6.188 6.188 0 001.382-5.234l-.49.097.49-.099a6.303 6.303 0 00-5.162-4.98h-.002a6.24 6.24 0 00-5.295 1.65.623.623 0 01-.848 0 6.257 6.257 0 00-2.91-1.568z"
							></path>
						</svg>
					</button>
					<button
						@click="toggleAppOptions"
						class="text-lightest hover:text-white cursor-default w-fit relative"
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
						:TrackPage="TrackPage"
						v-if="appOptions"
						:appOptions="appOptions"
						@toggleAppOptions="toggleAppOptions"
					>
						<template #openRadio>Şarkı radyosuna git</template></AppOptions
					>
				</div>
			</div>
		</div>

		<div class="p-5 lg:ml-[1rem] relative lg3:flex">
			<div v-if="lyrics" class="min-w-[60%] mb-8">
				<h2 class="text-white text-3xl font-semibold tracking-tighter">
					Şarkı Sözleri
				</h2>
				<br />
				<div class="text-lightest">
					<Lyrics />
				</div>
			</div>
			<div :class="{ 'lg3:w-[30%]': lyrics }" class="sm:w-full">
				<div
					:class="{ 'hover:bg-dark2': lyrics, 'hover:bg-opacwhite1': !lyrics }"
					class="flex items-center gap-x-4 w-full transition duration-300 p-2 cursor-pointer rounded-md"
				>
					<div class="h-20 w-30 z-10">
						<img
							class="rounded-[100%] object-cover h-[5rem] w-[5rem]"
							:src="artistImg"
							alt="artistImg"
						/>
					</div>
					<div class="flex flex-col gap-y-1">
						<h2
							class="uppercase text-sm text-opacwhite5"
							style="font-weight: 700"
						>
							Sanatçı
						</h2>
						<h4
							class="text-white/95 font-semibold cursor-ponter hover:underline"
						>
							{{ currentTrack.artists[0].name }}
						</h4>
					</div>
				</div>
			</div>
		</div>

		<!-- Popüler Songs -->

		<section class="p-5 lg:ml-[1rem]">
			<div class="relative mb-2">
				<div class="h-fit flex flex-col h-[3.8rem]">
					<span class="text-lightest text-sm">Popüler Parçalar -</span>
					<h2
						class="text-[1.5rem] text-white leading-7 tracking-tight"
						style="font-weight: 600"
					>
						{{ currentTrack?.artists[0].name }}
					</h2>
				</div>
			</div>
			<div
				:class="{ 'h-[17.5rem]': !seeMore, 'h-full': seeMore }"
				class="relative overflow-y-hidden wrapper"
			>
				<TrackItems
					v-for="(track, i) in popSongs"
					:key="track.id"
					:id="track.id"
					:index="i"
					:TrackPage="TrackPage"
					:margin="true"
					:findFavTracks="findFavTracks"
					:addGreenHeartFavTracks="addGreenHeartFavTracks"
					:removeGreenHeartFavTracks="removeGreenHeartFavTracks"
					:findFavTracks2="findFavTracks2"
					:addGreenHeartFavTracks2="addGreenHeartFavTracks2"
					:removeGreenHeartFavTracks2="removeGreenHeartFavTracks2"
				>
					<template #trackImg>
						<img
							class="object-fit w-[40px] h-[40px] mr-4"
							:src="track?.album?.images[2]?.url"
							alt=""
						/>
					</template>
					<template #trackName>
						<p class="cursor-default">{{ track.name }}</p></template
					>
					<template #listenNumber>{{ track.popularity }}</template>
					<template #duration>{{
						trackDuration((duration = track.duration_ms))
					}}</template>
				</TrackItems>
			</div>

			<button
				@click="seeMoreFunc"
				class="m-2 mb-10 text-[0.75rem] text-opacwhite5 hover:text-white leading-7 tracking-widest hover:text-underline-offset-8 font-semibold cursor-default uppercase"
			>
				<span v-if="!seeMore">See More</span>
				<span v-else>daha azını göster</span>
			</button>

			<Card :currentData="artistTopTracks">
				<template #cardTitle
					>{{ currentTrack?.artists[0].name }}- Popüler Müzikleri</template
				>
				<template #seeMore>Diskografiye bak</template>
				<template #imgContainer="{ data }">
					<div class="w-full relative mb-5">
						<img
							class="h-full w-full object-cover"
							:src="data.album.images[0].url"
							alt="image"
						/>
						<div
							class="right-0 bottom-0 absolute flex items-center py-1 px-2 group-hover:block opacity-0 group-hover:opacity-100 transition ease-in duration-200 group-hover:translate-y-[-0.4rem]"
						>
							<button
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
				</template>
				<template #firstTitle="{ data }">{{ data.name }}</template>
				<template #secondTitle="{ data }"
					><span>{{ albumYear(data.album.release_date) }}</span>
					<span class="before:content-['•'] before:mx-2">{{
						data.album.album_type
					}}</span>
				</template>
			</Card>

			<Card :currentData="popularAlbums">
				<template #cardTitle
					>{{ currentTrack?.artists[0].name }} - Popüler Albümleri</template
				>
				<template #seeMore>Diskografiye bak</template>
				<template #imgContainer="{ data }">
					<div class="w-full relative mb-5">
						<img
							class="h-full w-full object-cover"
							:src="data.images[0].url"
							alt="image"
						/>
						<div
							class="right-0 bottom-0 absolute flex items-center py-1 px-2 group-hover:block opacity-0 group-hover:opacity-100 transition ease-in duration-200 group-hover:translate-y-[-0.4rem]"
						>
							<button
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
				</template>
				<template #firstTitle="{ data }">{{ data.name }}</template>
				<template #secondTitle="{ data }"
					><span>{{ albumYear(data.release_date) }}</span>
					<span class="before:content-['•'] before:mx-2">{{
						data.album_type
					}}</span>
				</template>
			</Card>

			<Card :currentData="popularSingles">
				<template #cardTitle
					>{{ currentTrack?.artists[0].name }} - Popüler Single ve
					EP'leri</template
				>
				<template #seeMore>Diskografiye bak</template>
				<template #imgContainer="{ data }">
					<div class="w-full relative mb-5">
						<img
							class="h-full w-full object-cover"
							:src="data.images[0].url"
							alt="image"
						/>
						<div
							class="right-0 bottom-0 absolute flex items-center py-1 px-2 group-hover:block opacity-0 group-hover:opacity-100 transition ease-in duration-200 group-hover:translate-y-[-0.4rem]"
						>
							<button
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
				</template>
				<template #firstTitle="{ data }">{{ data.name }}</template>
				<template #secondTitle="{ data }"
					><span>{{ albumYear(data.release_date) }}</span>
					<span class="before:content-['•'] before:mx-2">{{
						data.album_type
					}}</span>
				</template>
			</Card>

			<div class="text-lightest text-[11px] mt-14">
				<div class="relative h-full min-w-[450]">
					<div class="mb-[2px] sm:w-full">
						<div
							class="flex items-center gap-x-4 w-full bg-dark2 hover:bg-dark3 transition duration-300 cursor-pointer rounded-t-lg"
						>
							<div class="w-20 h-20">
								<img
									class="w-full h-full rounded-tl-lg"
									:src="currentTrack.album?.images[0]?.url"
									alt=""
								/>
							</div>
							<div class="flex flex-col gap-y-1">
								<h2 class="text-xs text-opacwhite5" style="font-weight: 700">
									{{ currentTrack.album.album_type }}'dan:
								</h2>
								<h4
									class="text-white text-[16px] cursor-ponter hover:underline"
									style="font-weight: 700"
								>
									{{ currentTrack.album.name }}
								</h4>
							</div>
						</div>
					</div>
					<div class="w-full">
						<div class="playlists2 h-fit w-full text-lightest">
							<TrackItems
								:class="track.id"
								v-for="(track, i) in albumTracks"
								:key="track.id"
								:id="track.id"
								:track="track"
								:index="i"
								:TrackPage2="TrackPage"
								:TrackPage="TrackPage"
								:margin="true"
								:findFavTracks="findFavTracks"
								:addGreenHeartFavTracks="addGreenHeartFavTracks"
								:removeGreenHeartFavTracks="removeGreenHeartFavTracks"
								:findFavTracks2="findFavTracks2"
								:addGreenHeartFavTracks2="addGreenHeartFavTracks2"
								:removeGreenHeartFavTracks2="removeGreenHeartFavTracks2"
							>
								<template v-slot:trackName
									><span> {{ track.name }}</span></template
								>
								<template v-slot:artist
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
								<template v-slot:duration>{{
									trackDuration((duration = track.duration_ms))
								}}</template>
							</TrackItems>
						</div>
					</div>
				</div>
				<div class="mt-8">
					<p class="text-[11px]" v-for="copy in copyrights" :key="copy.type">
						{{ copy.text }}
					</p>
				</div>
			</div>
		</section>
	</section>
</template>

<script>
import TrackItems from '../TrackItems/TrackItems.vue';
import Lyrics from './Lyrics.vue';
import Card from '../Cards/Card.vue';
import AppOptions from '../AppOptions/AppOptions.vue';
import axios from 'axios';

export default {
	name: 'Track',
	components: { TrackItems, Lyrics, Card, AppOptions },
	props: {
		id: {
			type: String,
			required: true,
		},
	},

	data() {
		return {
			lyrics: false,
			appOptions: false,
			TrackPage: true,
			seeMore: false,
			margin: false,
			artistImg: '',
			heartBtn: document.getElementById('heartBtn'),
			copyrights: [],
			popSongs: [],
			albumTracks: [],
			popularAlbums: [],
			popularSingles: [],
		};
	},
	computed: {
		isAuth() {
			return this.$store.getters.isAuth;
		},
		getToken() {
			return this.$store.getters.accessToken;
		},
		currentTrack() {
			return this.$store.getters['artists/getCurrentTrack'];
		},
		artistTopTracks() {
			return this.$store.getters['artists/getTopTracks'];
		},
		artistFirstFiveTracks() {
			return this.$store.getters['artists/getTopTracks'].slice(0, 5);
		},

		trackArtistName() {
			return this.currentTrack?.artists;
		},
		allFavTracks() {
			return this.$store.getters['favTracks/getTracks'].items;
		},
		albumTrackImage() {
			return this.currentTrack?.album?.images[1].url;
		},
		isFavTrack() {
			return this.allFavTracks?.filter(
				item => item.track.id === this.$route.params.id
			).length > 0
				? true
				: false;
		},
		getFavTracksonalbum() {
			return this.$store.getters['albums/getfavTracksID'];
		},
		getFavTracksonalbum2() {
			return this.$store.getters['albums/getfavTracksID2'];
		},

		addGreenHeartEl() {
			return this.getFavTracksonalbum.map(item =>
				document.getElementById(`${item}`)
			);
		},
		addGreenHeartEl2() {
			return this.getFavTracksonalbum2.map(item =>
				document.getElementsByClassName(`${item}`)
			);
		},
	},
	watch: {
		async trackArtistName(newVal) {
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
		},
	},
	methods: {
		async fetchFavTracks() {
			return await axios
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
		async fetchTrack() {
			return await axios
				.get('https://api.spotify.com/v1/tracks/' + this.id, {
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + (await this.getToken),
					},
				})
				.then(({ data }) => {
					console.log(data);
					this.$store.dispatch('artists/currentTrack', data);
				})
				.catch(err => console.log(err));
		},
		async fetchArtistTopTracks() {
			return await axios
				.get(
					'https://api.spotify.com/v1/artists/' +
						this.currentTrack?.artists[0].id +
						'/top-tracks?market=ES',
					{
						headers: {
							Accept: 'application/json',
							'Content-Type': 'application/json',
							Authorization: 'Bearer ' + (await this.getToken),
						},
					}
				)
				.then(({ data }) => {
					console.log(data.tracks);
					this.$store.dispatch('artists/topTracks', data.tracks);
				})
				.catch(err => console.log(err));
		},
		async fetchArtistTopAlbums() {
			return await axios
				.get(
					'https://api.spotify.com/v1/artists/' +
						this.currentTrack?.artists[0].id +
						'/albums?include_groups=album',
					{
						headers: {
							Accept: 'application/json',
							'Content-Type': 'application/json',
							Authorization: 'Bearer ' + (await this.getToken),
						},
					}
				)
				.then(({ data }) => {
					console.log(data.items);
					return data.items;
				})
				.catch(err => console.log(err));
		},
		async fetchArtistTopSingles() {
			return await axios
				.get(
					'https://api.spotify.com/v1/artists/' +
						this.currentTrack?.artists[0].id +
						'/albums?include_groups=single,compilation',
					{
						headers: {
							Accept: 'application/json',
							'Content-Type': 'application/json',
							Authorization: 'Bearer ' + (await this.getToken),
						},
					}
				)
				.then(({ data }) => {
					console.log(data.items);
					return data.items;
				})
				.catch(err => console.log(err));
		},

		async fetchTotalTracks() {
			return await axios
				.get(await this.currentTrack?.album.href, {
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + (await this.getToken),
					},
				})
				.then(({ data }) => {
					console.log(data);
					this.copyrights = data.copyrights;
					this.albumType = data.album_type;
					return data.tracks.items;
				})
				.catch(err => console.log(err));
		},

		async unFollowTrack() {
			if (this.isFavTrack) {
				await axios
					.delete('https://api.spotify.com/v1/me/tracks?ids=' + this.id, {
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
							this.fetchFavTracks().then(() => {
								this.$store.dispatch('albums/clearTracksID');
								this.$store.dispatch('albums/clearTracksID2');
								this.findFavTracks();
								this.findFavTracks2();
								this.removeGreenHeartFavTracks(
									document.getElementById(this.id)
								);
								this.removeGreenHeartFavTracks2(
									document.getElementsByClassName(this.id)
								);
							});
						}
					})
					.catch(err => console.log(err));
			} else {
				await this.followTrack();
			}
		},

		async followTrack() {
			await fetch('https://api.spotify.com/v1/me/tracks?ids=' + this.id, {
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
						this.fetchFavTracks().then(() => {
							this.$store.dispatch('albums/clearTracksID');
							this.$store.dispatch('albums/clearTracksID2');
							this.findFavTracks();
							this.findFavTracks2();
							this.addGreenHeartFavTracks(document.getElementById(this.id));
							this.addGreenHeartFavTracks2(
								document.getElementsByClassName(this.id)
							);
						});
					}
				})
				.catch(err => console.log(err));
		},

		findFavTracks() {
			this.allFavTracks.forEach(track => {
				this.artistTopTracks.forEach(item => {
					if (track.track.id === item.id) {
						this.$store.dispatch('albums/favTracksID', item.id);
					}
				});
			});
		},
		findFavTracks2() {
			this.allFavTracks.forEach(track => {
				this.albumTracks.forEach(item => {
					if (track.track.id === item.id) {
						this.$store.dispatch('albums/favTracksID2', item.id);
					}
				});
			});
		},

		addGreenHeartFavTracks(trackItem = false) {
			if (!trackItem) {
				this.addGreenHeartEl.forEach(item => {
					item?.children[4].children[0].classList.remove(
						'emptyHeart',
						'animationEmptyHeart'
					);
					item?.children[4].children[0].classList.add('greenHeart');

					item?.children[4].children[0].children[0].children[0].classList.remove(
						'hidden'
					);

					item?.children[4].children[0].children[0].children[1].classList.add(
						'hidden'
					);
				});
			} else {
				trackItem?.children[4].children[0].classList.remove(
					'emptyHeart',
					'animationEmptyHeart'
				);
				trackItem?.children[4].children[0].classList.add('greenHeart');
				trackItem?.children[4].children[0].classList.add('animationGreenHeart');
				trackItem?.children[4].children[0].children[0].children[0].classList.remove(
					'hidden'
				);

				trackItem?.children[4].children[0].children[0].children[1].classList.add(
					'hidden'
				);
			}
		},
		removeGreenHeartFavTracks(item) {
			item?.children[4].children[0].classList.remove(
				'greenHeart',
				'animationGreenHeart'
			);
			item?.children[4].children[0].classList.add('emptyHeart');
			item?.children[4].children[0].classList.add('animationEmptyHeart');

			item?.children[4].children[0].children[0].children[0].classList.add(
				'hidden'
			);
			item?.children[4].children[0].children[0].children[1].classList.remove(
				'hidden'
			);
		},
		addGreenHeartFavTracks2(trackItem = false) {
			if (!trackItem) {
				this.addGreenHeartEl2.forEach(item => {
					item[0].children[4].children[0].classList.remove(
						'emptyHeart',
						'animationEmptyHeart'
					);
					item[0].children[4].children[0].classList.add('greenHeart');

					item[0].children[4].children[0].children[0].children[0].classList.remove(
						'hidden'
					);

					item[0].children[4].children[0].children[0].children[1].classList.add(
						'hidden'
					);
				});
			} else {
				trackItem[0]?.children[4].children[0].classList.remove(
					'emptyHeart',
					'animationEmptyHeart'
				);
				trackItem[0]?.children[4].children[0].classList.add('greenHeart');
				trackItem[0]?.children[4].children[0].classList.add(
					'animationGreenHeart'
				);
				trackItem[0]?.children[4].children[0].children[0].children[0].classList.remove(
					'hidden'
				);

				trackItem[0]?.children[4].children[0].children[0].children[1].classList.add(
					'hidden'
				);
			}
		},
		removeGreenHeartFavTracks2(item) {
			item[0]?.children[4].children[0].classList.remove(
				'greenHeart',
				'animationGreenHeart'
			);
			item[0]?.children[4].children[0].classList.add('emptyHeart');
			item[0]?.children[4].children[0].classList.add('animationEmptyHeart');

			item[0]?.children[4].children[0].children[0].children[0].classList.add(
				'hidden'
			);
			item[0]?.children[4].children[0].children[0].children[1].classList.remove(
				'hidden'
			);
		},

		trackDuration(duration) {
			const minutes = Math.floor(duration / 60000);
			const seconds = Math.floor((duration % 60000) / 1000);
			const result = minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
			return result;
		},
		albumYear(date) {
			return new Date(`${date}`).getFullYear();
		},
		toggleAppOptions() {
			this.appOptions = !this.appOptions;
		},

		toggleArtistPage(_, e) {
			this.$emit('selectedArtistName', e.target.textContent);
			this.$router.push('/artist/id');
		},
		async seeMoreFunc() {
			this.seeMore = !this.seeMore;
		},
	},

	async created() {
		console.log('TrackPage Mounted');
		this.TrackPage = true;

		await this.fetchTrack();
		await this.fetchArtistTopTracks();
		this.albumTracks = await this.fetchTotalTracks();
		this.albumTracks =
			this.albumTracks.length > 9
				? this.albumTracks.slice(0, 9)
				: this.albumTracks;

		this.popularAlbums = await this.fetchArtistTopAlbums();
		this.popularAlbums =
			this.popularAlbums.length > 9
				? this.popularAlbums.slice(0, 9)
				: this.popularAlbums;

		this.popularSingles = await this.fetchArtistTopSingles();
		this.popularSingles =
			this.popularSingles.length > 9
				? this.popularSingles.slice(0, 9)
				: this.popularSingles;

		this.popSongs = this.artistTopTracks;
		await this.getFavTracksonalbum;
		await this.getFavTracksonalbum2;

		this.findFavTracks();
		this.findFavTracks2();
		this.addGreenHeartFavTracks();
		this.addGreenHeartFavTracks2();

		this.header = document.getElementById('header');
		this.TrackEl = document.getElementById('track--page');

		this.options = {
			root: null,
			threshold: [0.1, 0.5, 1],
		};

		this.observer = new IntersectionObserver(entries => {
			console.log(entries);
			this.header.classList.toggle(
				'trackPage-intersec-bg1',
				entries[0].intersectionRatio <= 0.5
			);

			entries[0].intersectionRatio >= 0.1
				? this.$store.dispatch('controller/closeHeaderBtn')
				: this.$store.dispatch('controller/showHeaderBtn');
		}, this.options);

		this.observer.observe(this.TrackEl);
	},

	beforeUnmount() {
		this.header.classList.remove('trackPage-intersec-bg1');
		this.observer.unobserve(this.TrackEl);
		this.TrackPage = false;
	},
	unmounted() {
		this.$store.dispatch('controller/closeHeaderBtn');
		this.$store.dispatch('albums/clearTracksID');
		this.$store.dispatch('albums/clearTracksID2');
	},
};
</script>

<style scoped lang="scss">
#track--page {
	&::before {
		content: '';
		position: absolute;
		z-index: 0;
		top: 0;
		left: 0;
		background-size: cover;
		background-position: top;
		background-image: var(--bgTrackImage);
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
