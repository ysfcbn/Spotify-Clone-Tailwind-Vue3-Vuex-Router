<template>
	<section class="box-border">
		<div
			id="artistPage"
			class="p-5 max-h-[400px] h-[340px] min-h-[400px] w-full mt-[-96px] relative bg-dark5 z-10"
			:style="{ '--opacity': opac, '--bgArtistImage': `url(${artistImage})` }"
		>
			<div
				class="flex items-end justify-start h-full lg:ml-[1rem] relative z-100"
			>
				<div class="flex flex-col h-[65%] items-start justify-end text-white">
					<div class="relative flex items-center pb-2">
						<div
							class="absolute bg-white w-[0.9rem] h-[0.9rem] rounded-full left-[6px] z-10"
						></div>
						<span class="relative text-verifiedAccount z-20">
							<svg
								role="img"
								height="24"
								width="24"
								class="Svg-sc-1bi12j5-0 NJEYP b0NcxAbHvRbqgs2S8QDg"
								viewBox="0 0 24 24"
							>
								<path
									fill="currentColor"
									d="M10.814.5a1.658 1.658 0 012.372 0l2.512 2.572 3.595-.043a1.658 1.658 0 011.678 1.678l-.043 3.595 2.572 2.512c.667.65.667 1.722 0 2.372l-2.572 2.512.043 3.595a1.658 1.658 0 01-1.678 1.678l-3.595-.043-2.512 2.572a1.658 1.658 0 01-2.372 0l-2.512-2.572-3.595.043a1.658 1.658 0 01-1.678-1.678l.043-3.595L.5 13.186a1.658 1.658 0 010-2.372l2.572-2.512-.043-3.595a1.658 1.658 0 011.678-1.678l3.595.043L10.814.5zm6.584 9.12a1 1 0 00-1.414-1.413l-6.011 6.01-1.894-1.893a1 1 0 00-1.414 1.414l3.308 3.308 7.425-7.425z"
								></path>
							</svg>
						</span>
						<span class="text-[13px] leading-4 w-[8.2rem] flex justify-end"
							>Verified Artist</span
						>
					</div>

					<h1
						class="w-full mb-3 text-[5.5rem] leading-none py-1 tracking-tighter font-semibold whitespace-nowrap"
					>
						{{ currentArtist?.name }}
					</h1>

					<div>
						<span class="mr-2">
							{{ currentArtistMonthlyListeners }} monthly listeners
						</span>
					</div>
				</div>
			</div>
		</div>

		<!-- Diğer Seçenekler -->
		<div
			class="absolute w-full h-[212px] left-0 shrink-0 z-[-10]"
			style="background: linear-gradient(rgba(213, 33, 33,0.3), rgba(0, 0, 0,0)"
		></div>

		<div
			class="w-full h-[5rem] relative flex flex-col items-start justify-center pt-5"
		>
			<div class="w-full ml-[1.2rem] lg:ml-[2rem]">
				<div class="flex justify-start items-center">
					<div class="w-[5.5rem]">
						<button
							@mousedown="leftClick = true"
							@mouseup="leftClick = false"
							@click="playArtistTopTracksFunc((artistID = id))"
							:class="{
								'bg-green3/70 scale-[1]': leftClick,
								'hover:scale-[1.04] bg-green3/95 hover:bg-green3': !leftClick,
							}"
							class="rounded-full p-[12px] w-fit cursor-default"
						>
							<svg
								role="img"
								height="28"
								width="28"
								viewBox="0 0 24 24"
								class=""
							>
								<path
									v-if="!isPlayingArtistTopTracks"
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
					</div>

					<div
						:class="{
							'w-[9.5rem]': currentArtistIsFav,
							'w-[6.6rem]': !currentArtistIsFav,
						}"
					>
						<button
							@click="addRemoveArtist"
							:class="{
								'w-[8rem] border-white': currentArtistIsFav,
								'hover:border-white border-opacwhite2': !currentArtistIsFav,
							}"
							class="border cursor-default w-[5.5rem] h-fit text-white px-2 py-2 rounded-[5px] flex items-center justify-center"
						>
							<span
								v-if="currentArtistIsFav"
								class="text-xs self-center"
								style="font-weight: 600"
								>FOLLOWING</span
							>
							<span v-else class="text-xs self-center" style="font-weight: 600">
								FOLLOW</span
							>
						</button>
					</div>

					<ArtistOptions
						:follow="currentArtistIsFav"
						:addRemoveArtist="addRemoveArtist"
						:artistURL="currentArtistURL"
					/>
				</div>
			</div>
		</div>

		<!-- Popüler -->

		<section class="p-5 lg:ml-[1rem]">
			<div class="relative">
				<div class="flex justify-between h-[3.3rem]">
					<div class="h-fit flex-end">
						<h2
							class="text-[1.5rem] text-white leading-7 tracking-tight hover:underline hover:text-underline-offset-8 font-semibold cursor-pointer"
						>
							Popular
						</h2>
					</div>
				</div>
			</div>

			<div
				:class="{ 'h-[15.8rem]': !seeMore, 'h-full': seeMore }"
				class="overflow-hidden wrapper"
			>
				<TrackItems
					v-for="(track, i) in topSongs"
					:key="track.id"
					:id="track.id"
					:uri="currentArtistUri"
					:itemUri="track.uri"
					:artistTopTrackUris="artistTopTrackUris"
					:track="track"
					:trackID="track.id"
					:contextType="contextType"
					:index="i"
					:artistPage="true"
					:margin="true"
					:findFavTracks="findFavTracks"
					:addGreenHeartFavTracks="addGreenHeartFavTracks"
					:removeGreenHeartFavTracks="removeGreenHeartFavTracks"
				>
					<template #trackImg>
						<img
							class="object-fit w-[40px] h-[40px] mr-4"
							:src="track?.album?.images[2]?.url"
							alt=""
						/>
					</template>
					<template #trackName>
						<p class="cursor-default truncate">{{ track.name }}</p></template
					>
					<template #listenNumber>{{ track.popularity }}</template>
					<template #duration>{{
						trackDuration((duration = track.duration_ms))
					}}</template>
				</TrackItems>
			</div>
			<button
				@click="seeMoreFunc"
				class="m-4 sm:text-[11px] sm3:text-[0.75rem] text-opacwhite5 hover:text-white leading-7 tracking-widest hover:text-underline-offset-8 font-semibold cursor-default mb-8"
			>
				<span v-if="!seeMore">See More</span>
				<span v-else>Show less</span>
			</button>

			<Card
				:artistPage="true"
				:togglePublications="togglePublications"
				:toggleAlbums="toggleAlbums"
				:toggleSingles="toggleSingles"
				:popPublications="popPublications"
				:toggleCompilations="toggleCompilations"
				:albums="albums"
				:singles="singles"
				:compilations="compilations"
				:currentData="diskografiList"
			>
				<template #cardTitle>Discography</template>
				<template #seeMore>
					<router-link
						@click="openDiscografi"
						:to="{
							name: 'discography',
							params: { id: currentArtist?.id, type: this.type },
						}"
						class="text-lightest"
						>Show all</router-link
					>
				</template>
				<template #imgContainer="{ data }">
					<img
						class="h-full w-full object-cover"
						:src="data?.images[0].url"
						alt="image"
					/>
				</template>
				<template #firstTitle="{ data }"
					><span>{{ data.name }}</span></template
				>
				<template #secondTitle="{ data }"
					><span>{{ cartAlbumYear(data.release_date) }}</span>
					<span class="before:content-['•'] before:mx-2">{{
						data.album_type
					}}</span>
				</template>
				<template #playBtn="{ data }">
					<div
						:class="
							getCurrentlyPlayingTrack?.is_playing &&
							data.uri === getCurrentlyPlayingTrack?.context?.uri
								? 'opacity-100 translate-y-[-0.4rem]'
								: 'opacity-0'
						"
						class="bg-dark1 rounded-full right-0 bottom-0 absolute flex items-center mx-2 group-hover:block group-hover:opacity-100 transition ease-in duration-200 group-hover:translate-y-[-0.4rem]"
					>
						<button
							v-if="data?.images[0]?.url"
							id="playBtn"
							@click="
								playContextUri(
									(uri = {
										uri: data.uri,
										index: currentPlayingTrackIndex,
										type: data.type,
									}),
									(href = data.href)
								)
							"
							@mousedown="leftClick = true"
							@mouseup="leftClick = false"
							:class="{
								' bg-green3/80 scale-80': leftClick,
								'hover:scale-104 bg-green3/95 hover:bg-green3': !leftClick,
							}"
							class="p-3 rounded-full cursor-default shadow-[0px_3px_3px_1px_rgba(0,0,0,0.3)]"
						>
							<svg role="img" height="18" width="18" viewBox="0 0 24 24">
								<path
									v-if="
										!(
											getCurrentlyPlayingTrack?.is_playing &&
											data.uri === getCurrentlyPlayingTrack?.context?.uri
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
				</template>
			</Card>

			<Card :currentData="frontOfYou">
				<template #cardTitle>Featuring {{ currentArtist?.name }}</template>
				<template #imgContainer="{ data }">
					<img
						class="h-full w-full object-cover"
						:src="data?.images[0]?.url"
						alt="image"
					/>
				</template>
				<template #firstTitle="{ data }"
					><span>{{ data.name }}</span></template
				>
				<template #secondTitle="{ data }"
					><span>{{ cartAlbumYear(data.release_date) }}</span>
					<span class="before:content-['•'] before:mx-2">{{
						data.album_type
					}}</span>
				</template>
				<template #playBtn="{ data }">
					<div
						:class="
							getCurrentlyPlayingTrack?.is_playing &&
							data.uri === getCurrentlyPlayingTrack?.context?.uri
								? 'opacity-100 translate-y-[-0.4rem]'
								: 'opacity-0'
						"
						class="bg-dark1 rounded-full right-0 bottom-0 absolute flex items-center mx-2 group-hover:block group-hover:opacity-100 transition ease-in duration-200 group-hover:translate-y-[-0.4rem]"
					>
						<button
							v-if="data?.images[0]?.url"
							id="playBtn"
							@click="
								playContextUri(
									(uri = {
										uri: data.uri,
										index: currentPlayingTrackIndex,
										type: data.type,
									}),
									(href = data.href)
								)
							"
							@mousedown="leftClick = true"
							@mouseup="leftClick = false"
							:class="{
								' bg-green3/80 scale-80': leftClick,
								'hover:scale-104 bg-green3/95 hover:bg-green3': !leftClick,
							}"
							class="p-3 rounded-full cursor-default shadow-[0px_3px_3px_1px_rgba(0,0,0,0.3)]"
						>
							<svg role="img" height="20" width="20" viewBox="0 0 24 24">
								<path
									v-if="
										!(
											getCurrentlyPlayingTrack?.is_playing &&
											data.uri === getCurrentlyPlayingTrack?.context?.uri
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
				</template>
			</Card>

			<Card :artists="true" :currentData="fansLove?.artists">
				<template #cardTitle>Fans also like</template>
				<template #imgContainer="{ data }">
					<img
						class="h-full w-full object-cover rounded-[100%] shadow-[0px_10px_16px_8px_rgba(0,0,0,0.4)]"
						:src="data?.images[0]?.url"
						alt="image"
					/>
				</template>
				<template #firstTitle="{ data }"
					><span>{{ data.name }}</span></template
				>
				<template #secondTitle="{ data }"
					><span>{{ data.type }}</span>
				</template>
				<template #playBtn="{ data }">
					<div
						:class="
							getCurrentlyPlayingTrack?.item?.artists[0].id === data?.id &&
							getCurrentlyPlayingTrack?.is_playing &&
							!getCurrentlyPlayingTrack?.context &&
							isArtistContext
								? 'opacity-100 translate-y-[-0.4rem]'
								: 'opacity-0'
						"
						class="bg-dark1 rounded-full right-0 bottom-0 absolute flex items-center mx-2 group-hover:block group-hover:opacity-100 transition ease-in duration-200 group-hover:translate-y-[-0.4rem]"
					>
						<button
							@click="
								playArtistTopTracksFunc(
									(artistID = data?.id),
									(href = data?.href)
								)
							"
							@mousedown="leftClick = true"
							@mouseup="leftClick = false"
							id="playBtn"
							:class="{
								' bg-green3/80 scale-80': leftClick,
								'hover:scale-104 bg-green3/95 hover:bg-green3': !leftClick,
							}"
							class="p-3 rounded-full cursor-default shadow-[0px_3px_3px_1px_rgba(0,0,0,0.3)]"
						>
							<h1 class="text-white"></h1>
							<svg role="img" height="20" width="20" viewBox="0 0 24 24">
								<path
									v-if="
										getCurrentlyPlayingTrack?.item?.artists[0].id ===
											data?.id &&
										getCurrentlyPlayingTrack?.is_playing &&
										!getCurrentlyPlayingTrack?.context &&
										isArtistContext
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
		</section>

		<section class="p-5 lg:ml-[1rem]">
			<div
				class="grid grid-cols-info gap-6 auto-rows-auto grid-rows-1 shrink-1"
			>
				<div class="col-span-4 min-w-[516px]">
					<h2 class="text-[1.5rem] mb-[20px] text-white font-semibold">
						About
					</h2>
					<div class="col-span-4">
						<button
							:style="{ '--bgArtistImage': `url(${artistImage})` }"
							class="info-container relative h-[516px] rounded-xl bg-cover bg-center w-full bg-no-repeat hover:scale-[1.01] transition duration-200 linear"
						>
							<div class="w-full h-full bg-[rgba(0,0,0,0.3)]"></div>
							<div
								class="absolute bottom-0 p-[40px] text-white max-w-[672px] h-[11rem] box-border"
							>
								<div class="text-[1rem] text-left font-semibold">
									Monthly {{ currentArtistMonthlyListeners }} listeners
								</div>
								<div
									class="mt-[8px] h-[4.5rem] text-justify overflow-hidden line-clamp-3"
								>
									With an impressive string of hits, numerous awards under her
									trendy belt and concerts throughout Europe, Asia, Latin enon,
									one of those larger-than-life stars of the moment. One of the
									most exciting voices in the dance world, the Romanian artist
									has blazed through the global charts with hits like Hot, Sun
									Is Up or Déjà vu, reaching the top slots in dozen of
									countries, from Romania, to Japan, Mexico, Turkey, Argentina,
									Spain, Finland, Poland and the U.S. The queen of dance music
									collaborated with lots of top worldwide artists like
								</div>
							</div>
						</button>
					</div>
				</div>
				<div class="col-span-2">
					<h2 class="text-[1.5rem] p-2 mb-[10px] text-white font-semibold">
						Ürünler
					</h2>
					<ul class="">
						<li class="group hover:bg-dark2 p-2">
							<a href="#" class="flex items-center relative">
								<img
									class="object-cover object-center w-[4.5rem]"
									src="https://merch-img.scdn.co/https%3A%2F%2Fmerchbar.imgix.net%2Fproduct%2F4%2F1616%2F36719716%2F4988002763795.jpg%3Fblend64%3DaHR0cHM6Ly9tZXJjaGJhci5pbWdpeC5uZXQvfnRleHQ_dHh0LWZvbnQ9c2Fucy1zZXJpZi1ib2xkJnR4dC1jb2xvcj1mZmYmdHh0LXNpemU9NjQmdHh0LXBhZD0xNiZ3PTMyMCZiZz1mNzMxMTkmZHByPTImdHh0LWFsaWduPW1pZGRsZSUyQ2NlbnRlciZ0eHQ2ND1UMDRnVTBGTVJRJTNEJTNE%26blend-mode%3Dnormal%26blend-align%3Dbottom%2Cleft%26dpr%3D2%26blend-w%3D0.75%26w%3D640%26h%3D640?h=300&w=300&s=11a9d67006f00d98f64a31687f161ec6"
									alt="sale image"
								/>
								<div class="mx-4">
									<h3 class="text-white font-semibold">NIRVANA CD</h3>
									<p class="text-opacwhite5 text-sm">
										This is a new, unopened CD in its original packaging.
									</p>
								</div>
								<svg
									role="img"
									height="16"
									width="16"
									class="text-lightest absolute top-2 right-2 hidden group-hover:block"
									viewBox="0 0 16 16"
								>
									<path
										fill="currentColor"
										d="M1 2.75A.75.75 0 011.75 2H7v1.5H2.5v11h10.219V9h1.5v6.25a.75.75 0 01-.75.75H1.75a.75.75 0 01-.75-.75V2.75z"
									></path>
									<path
										fill="currentColor"
										d="M15 1v4.993a.75.75 0 11-1.5 0V3.56L8.78 8.28a.75.75 0 01-1.06-1.06l4.72-4.72h-2.433a.75.75 0 010-1.5H15z"
									></path>
								</svg>
							</a>
						</li>
						<li class="group hover:bg-dark2 p-2">
							<a href="#" class="flex items-center relative">
								<img
									class="object-cover object-center w-[4.5rem]"
									src="https://merch-img.scdn.co/https%3A%2F%2Fmerchbar.imgix.net%2Fproduct%2F4%2F1616%2F36719716%2F4988002763795.jpg%3Fblend64%3DaHR0cHM6Ly9tZXJjaGJhci5pbWdpeC5uZXQvfnRleHQ_dHh0LWZvbnQ9c2Fucy1zZXJpZi1ib2xkJnR4dC1jb2xvcj1mZmYmdHh0LXNpemU9NjQmdHh0LXBhZD0xNiZ3PTMyMCZiZz1mNzMxMTkmZHByPTImdHh0LWFsaWduPW1pZGRsZSUyQ2NlbnRlciZ0eHQ2ND1UMDRnVTBGTVJRJTNEJTNE%26blend-mode%3Dnormal%26blend-align%3Dbottom%2Cleft%26dpr%3D2%26blend-w%3D0.75%26w%3D640%26h%3D640?h=300&w=300&s=11a9d67006f00d98f64a31687f161ec6"
									alt="sale image"
								/>
								<div class="mx-4">
									<h3 class="text-white font-semibold">NIRVANA CD</h3>
									<p class="text-opacwhite5 text-sm">
										This is a new, unopened CD in its original packaging.
									</p>
								</div>
								<svg
									role="img"
									height="16"
									width="16"
									class="text-lightest absolute top-2 right-2 hidden group-hover:block"
									viewBox="0 0 16 16"
								>
									<path
										fill="currentColor"
										d="M1 2.75A.75.75 0 011.75 2H7v1.5H2.5v11h10.219V9h1.5v6.25a.75.75 0 01-.75.75H1.75a.75.75 0 01-.75-.75V2.75z"
									></path>
									<path
										fill="currentColor"
										d="M15 1v4.993a.75.75 0 11-1.5 0V3.56L8.78 8.28a.75.75 0 01-1.06-1.06l4.72-4.72h-2.433a.75.75 0 010-1.5H15z"
									></path>
								</svg>
							</a>
						</li>
					</ul>
				</div>
			</div>
			<section class="sm:pl-5 lg:p-5 lg:ml-[1rem]">
				<Info />
			</section>
		</section>
	</section>
</template>

<script>
import TrackItems from '../TrackItems/TrackItems.vue';
import ArtistOptions from './ArtistOptions.vue';
import Info from '../SpotifyInfo/Info.vue';
import Card from '../Cards/Card.vue';
import axios from 'axios';

export default {
	name: 'artistPage',
	components: {
		TrackItems,
		ArtistOptions,
		Info,
		Card,
	},
	props: {
		id: {
			type: String,
			required: true,
		},
	},
	data() {
		return {
			artistPage: true,
			typeOfSelectedSection: null,
			type: 'all',
			selectedArtistCardID: null,
			contextType: 'artist',
			opac: '',
			leftClick: false,
			prevRatio: null,
			follow: false,
			popPublications: true,
			albums: false,
			shuffled: false,
			singles: false,
			compilations: false,
			topSongs: [],
			diskografiList: [],
			frontOfYou: [],
			seeMore: false,
		};
	},
	computed: {
		isAuth() {
			return this.$store.getters.isAuth;
		},
		getToken() {
			return this.$store.getters.accessToken;
		},
		currentArtist() {
			return this.$store.getters['artists/getCurrentArtist'];
		},
		currentArtistURL() {
			return this.currentArtist?.external_urls.spotify;
		},
		currentArtistUri() {
			return this.currentArtist?.uri;
		},
		countryFormat() {
			return this.$store.getters['controller/getCountryCode'];
		},
		currentArtistMonthlyListeners() {
			return new Intl.NumberFormat(this.countryFormat).format(
				this.currentArtist?.followers?.total
			);
		},
		artistImage() {
			return this.currentArtist?.images[0]?.url;
		},
		currentArtistIsFav() {
			return this.$store.getters['artists/getCurrentArtistIsFav'];
		},
		allFavTracks() {
			return this.$store.getters['favTracks/getTracks'].items;
		},

		currentAlbumTracks() {
			return this.$store.getters['albums/getAlbum']?.tracks?.items;
		},
		artistTopTracks() {
			return this.$store.getters['artists/getTopTracks'];
		},
		artistTopTrackUris() {
			return this.artistTopTracks.map(item => item.uri);
		},
		selectedCardArtistTopTracks() {
			return this.$store.getters['artists/getSelectedCardTopTracks'];
		},
		selectedCardArtistTopTrackUris() {
			return this.selectedCardArtistTopTracks.map(item => item.uri);
		},
		getCurrentlyPlayingTrack() {
			return this.$store.getters['controller/getCurrentlyPlayingTrack'];
		},
		currentTrackID() {
			return this.getCurrentlyPlayingTrack?.item?.id;
		},
		isPlayingContextUri() {
			return this.getCurrentlyPlayingTrack?.is_playing;
		},

		findCurrentPlayingTrackIndex() {
			return this.typeOfSelectedSection === 'playlist'
				? this.currentPlaylist?.indexOf(
						this.currentPlaylist?.find(
							item => item.track.id === this.currentTrackID
						)
				  )
				: this.typeOfSelectedSection === 'album'
				? this.currentAlbumTracks?.indexOf(
						this.currentAlbumTracks?.find(
							item => item.id === this.currentTrackID
						)
				  )
				: this.typeOfSelectedSection === 'artist'
				? this.selectedCardArtistTopTracks.indexOf(
						this.selectedCardArtistTopTracks.find(
							item => item.id === this.currentTrackID
						)
				  )
				: this.typeOfSelectedSection === this.id
				? this.artistTopTracks.indexOf(
						this.artistTopTracks.find(item => item.id === this.currentTrackID)
				  )
				: '';
		},
		currentPlayingTrackIndex() {
			return this.findCurrentPlayingTrackIndex + 1
				? this.findCurrentPlayingTrackIndex
				: 0;
		},
		isArtistContext() {
			return this.$store.getters['controller/isArtistContext'];
		},
		isPlayingArtistTopTracks() {
			return (
				this.getCurrentlyPlayingTrack?.item?.artists[0]?.id === this.id &&
				!this.getCurrentlyPlayingTrack?.context &&
				this.getCurrentlyPlayingTrack?.is_playing &&
				this.isArtistContext
			);
		},
		isPlayingArtistTopCardTracks() {
			return (
				this.getCurrentlyPlayingTrack?.item?.artists[0]?.id ===
					this.selectedArtistCardID &&
				!this.getCurrentlyPlayingTrack?.context &&
				this.getCurrentlyPlayingTrack?.is_playing &&
				this.isArtistContext
			);
		},

		isClickHeaderBtn() {
			return this.$store.getters['controller/isClickHeaderBtn'];
		},

		artistPublications() {
			return this.$store.getters['artists/getArtistPublications'];
		},
		artistAlbums() {
			return this.$store.getters['artists/getArtistAlbums'];
		},
		artistSingles() {
			return this.$store.getters['artists/getArtistSingles'];
		},
		artistCompilations() {
			return this.$store.getters['artists/getArtistCompilations'];
		},
		fansLove() {
			return this.$store.getters['artists/getFansLove'];
		},
		getFavTracks() {
			return this.$store.getters['artists/getfavTracksID'];
		},
		addGreenHeartEl() {
			return this.getFavTracks.map(item => document.getElementById(`${item}`));
		},
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
		async fetchArtist(href = false) {
			await axios
				.get(href ? href : 'https://api.spotify.com/v1/artists/' + this.id, {
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + this.getToken,
					},
				})
				.then(({ data }) => {
					console.log(data);
					href
						? this.$store.dispatch('artists/selectedCardArtist', data)
						: this.$store.dispatch('artists/currentArtist', data);
				})
				.catch(err => console.log(err));
		},
		async fetchArtistTopTracks(artistID = false) {
			await axios
				.get(
					artistID
						? 'https://api.spotify.com/v1/artists/' +
								artistID +
								'/top-tracks?market=US'
						: 'https://api.spotify.com/v1/artists/' +
								this.id +
								'/top-tracks?market=US',
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
					artistID
						? this.$store.dispatch('artists/selectedCardTopTracks', data.tracks)
						: this.$store.dispatch('artists/topTracks', data.tracks);
				})
				.catch(err => console.log(err));
		},
		async playArtistTopTracksFunc(artistID, href) {
			if (this.id === artistID) {
				this.selectedArtistCardID = null;
				await this.fetchArtist();
				await this.fetchArtistTopTracks();
				await this.playArtistTopTracks(
					{
						uri: this.artistTopTrackUris,
						index: this.currentPlayingTrackIndex,
						type: 'artist',
						artistID: artistID,
					},
					href
				);
			} else {
				this.selectedArtistCardID = artistID;
				await this.fetchArtist(href);
				await this.fetchArtistTopTracks(artistID);
				await this.playArtistTopTracks(
					{
						uri: this.selectedCardArtistTopTrackUris,
						index: this.currentPlayingTrackIndex,
						type: 'artist',
						artistID: artistID,
					},
					href
				);
			}
		},

		async playArtistTopTracks(uri) {
			console.log(uri);

			if (this.id === uri.artistID) {
				this.typeOfSelectedSection = this.id;
				if (this.isPlayingArtistTopTracks) {
					await this.$store.dispatch('controller/pauseCurrentTrack');
				} else {
					this.getCurrentlyPlayingTrack?.context
						? (uri.index = 0)
						: (uri.index = this.currentPlayingTrackIndex);
					await this.$store.dispatch('controller/playArtitsTopTracks', uri);
				}
			} else {
				this.typeOfSelectedSection = 'artist';
				if (this.isPlayingArtistTopCardTracks) {
					await this.$store.dispatch('controller/pauseCurrentTrack');
				} else {
					this.getCurrentlyPlayingTrack?.context
						? (uri.index = 0)
						: (uri.index = this.currentPlayingTrackIndex);
					await this.$store.dispatch('controller/playArtitsTopTracks', uri);
				}
			}
		},
		async fetchAlbum(href) {
			await axios
				.get(href, {
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + this.getToken,
					},
				})
				.then(({ data }) => {
					this.$store.dispatch('albums/getAlbum', data);
				})
				.catch(err => console.log(err));
		},

		async fetchArtistPublications() {
			await axios
				.get('https://api.spotify.com/v1/artists/' + this.id + '/albums', {
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + this.getToken,
					},
				})
				.then(({ data }) => {
					console.log(data);
					this.$store.dispatch('artists/artistPublications', data);
				})
				.catch(err => console.log(err));
		},
		async fetchArtistAlbums() {
			await axios
				.get(
					'https://api.spotify.com/v1/artists/' +
						this.id +
						'/albums?include_groups=album,single,compilation',
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
					this.$store.dispatch('artists/artistAlbums', data);
				})
				.catch(err => console.log(err));
		},
		async fetchArtistSingles() {
			await axios
				.get(
					'https://api.spotify.com/v1/artists/' +
						this.id +
						'/albums?include_groups=single',
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
					this.$store.dispatch('artists/artistSingles', data);
				})
				.catch(err => console.log(err));
		},
		async fetchArtistCompilations() {
			await axios
				.get(
					'https://api.spotify.com/v1/artists/' +
						this.id +
						'/albums?include_groups=compilation',
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
					this.$store.dispatch('artists/artistCompilations', data);
				})
				.catch(err => console.log(err));
		},
		async fetchFansLoveArtists() {
			await axios
				.get(
					'https://api.spotify.com/v1/artists/' + this.id + '/related-artists',
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
					this.$store.dispatch('artists/fansLove', data);
				})
				.catch(err => console.log(err));
		},
		async checkUserFavArtist() {
			await axios
				.get(
					'https://api.spotify.com/v1/me/following/contains?type=artist&ids=' +
						this.id,
					{
						headers: {
							Accept: 'application/json',
							'Content-Type': 'application/json',
							Authorization: 'Bearer ' + this.getToken,
						},
					}
				)
				.then(({ data }) => {
					this.$store.dispatch('artists/currentArtistIsFav', ...data);
				})
				.catch(err => console.log(err));
		},
		async followArtist() {
			await fetch(
				'https://api.spotify.com/v1/me/following?type=artist&ids=' + this.id,
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
						this.checkUserFavArtist();
						this.$store.dispatch('controller/modalInfoType', {
							type: 'artist',
							status: true,
						});
					}
				})
				.catch(err => console.log(err));
		},
		async unfollowArtist() {
			await axios
				.delete(
					'https://api.spotify.com/v1/me/following?type=artist&ids=' + this.id,
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
						this.checkUserFavArtist();
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
				await this.unfollowArtist();
				await this.fetchFavArtists();
			} else {
				await this.followArtist();
				await this.fetchFavArtists();
			}
		},
		async playContextUri(uri, href) {
			console.log(this.currentPlayingTrackIndex);
			if (
				this.isPlayingContextUri &&
				uri.uri === this.getCurrentlyPlayingTrack?.context?.uri
			) {
				await this.$store.dispatch('controller/pauseCurrentTrack');
			} else {
				if ((await uri.type) === 'album') {
					this.typeOfSelectedSection = 'album';
					uri.uri !== this.getCurrentlyPlayingTrack?.context?.uri
						? await this.fetchAlbum(href)
						: '';
				}
				console.log(uri);
				console.log(this.currentPlayingTrackIndex);
				console.log(this.currentAlbumTracks[this.currentPlayingTrackIndex]?.id);
				uri.id = this.currentAlbumTracks[this.currentPlayingTrackIndex]?.id;
				uri.index = this.currentPlayingTrackIndex;
				await this.$store.dispatch('controller/playSelectedContext', uri);
			}
		},
		findFavTracks() {
			this.allFavTracks.forEach(track => {
				this.artistTopTracks.forEach(item => {
					if (track.track.id === item.id) {
						this.$store.dispatch('artists/favTracksID', item.id);
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
		trackDuration(duration) {
			const minutes = Math.floor(duration / 60000);
			const seconds = Math.floor((duration % 60000) / 1000);
			const result = minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
			return result;
		},

		cartAlbumYear(currentSection) {
			return new Date(currentSection).getFullYear();
		},

		openDiscografi() {
			this.$store.dispatch('discography/selectedType', this.type);
		},

		togglePublications() {
			this.popPublications ? '' : (this.popPublications = true);
			this.albums ? (this.albums = false) : '';
			this.singles ? (this.singles = false) : '';
			this.compilations ? (this.compilations = false) : '';
			this.type = 'all';
			this.diskografiList = this.artistPublications?.items;
		},
		async toggleAlbums() {
			this.albums ? '' : (this.albums = true);
			this.popPublications ? (this.popPublications = false) : '';
			this.singles ? (this.singles = false) : '';
			this.compilations ? (this.compilations = false) : '';
			this.type = 'albums';
			this.diskografiList = this.artistAlbums?.items;
		},
		async toggleSingles() {
			this.singles ? '' : (this.singles = true);
			this.albums ? (this.albums = false) : '';
			this.popPublications ? (this.popPublications = false) : '';
			this.compilations ? (this.compilations = false) : '';
			this.type = 'singles';
			this.diskografiList = this.artistSingles?.items;
		},
		toggleCompilations() {
			this.compilations ? '' : (this.compilations = true);
			this.albums ? (this.albums = false) : '';
			this.singles ? (this.singles = false) : '';
			this.popPublications ? (this.popPublications = false) : '';
			this.type = 'compilations';
			this.diskografiList = this.artistCompilations?.items;
		},
		seeMoreFunc() {
			this.seeMore = !this.seeMore;
		},
	},
	watch: {
		isPlayingArtistTopTracks(newVal) {
			if (newVal) {
				this.$store.dispatch('controller/isPlayingHeaderBtn', newVal);
			} else {
				this.$store.dispatch('controller/isPlayingHeaderBtn', newVal);
			}
		},
		async isClickHeaderBtn(newVal, oldVal) {
			if (newVal !== oldVal) {
				await this.playArtistTopTracks({
					uri: this.artistTopTrackUris,
					index: this.currentPlayingTrackIndex,
					type: this.contextType,
					artistID: this.id,
				});
			}
		},
	},
	async created() {
		console.log('artistPage Mounted');
		this.artistPage = true;
		this.margin = true;
		this.prevRatio = 0.0;

		await this.fetchArtist();
		await this.fetchArtistTopTracks();
		this.topSongs = this.artistTopTracks;
		this.isPlayingArtistTopTracks
			? this.$store.dispatch('controller/isPlayingHeaderBtn', true)
			: this.$store.dispatch('controller/isPlayingHeaderBtn', false);
		this.findFavTracks();
		await this.getFavTracks;
		this.addGreenHeartFavTracks();

		await this.checkUserFavArtist();

		await this.fetchArtistPublications();
		this.diskografiList = this.artistPublications?.items;
		await this.fetchArtistAlbums();
		await this.fetchArtistSingles();
		this.frontOfYou = this.artistAlbums?.items;
		console.log(this.frontOfYou);
		if (!this.shuffled) {
			this.frontOfYou = this.frontOfYou.sort(() => Math.random() - 0.5);
			this.shuffled = true;
		}

		await this.fetchArtistCompilations();
		this.artistCompilations?.items.length
			? this.$store.dispatch('discography/isCompExist', true)
			: this.$store.dispatch('discography/isCompExist', false);

		await this.fetchFansLoveArtists();

		this.header = document.getElementById('header');
		this.artistEl = document.getElementById('artistPage');

		this.buildThresholdList = function () {
			let thresholds = [];
			let numSteps = 20;

			for (let i = 1.0; i <= numSteps; i++) {
				let ratio = i / numSteps;
				thresholds.push(ratio);
			}

			thresholds.push(0);
			return thresholds;
		};

		this.options = {
			root: null,
			threshold: this.buildThresholdList(),
		};

		this.observer = new IntersectionObserver(entries => {
			entries.forEach(entry => {
				if (entry.intersectionRatio > this.prevRatio) {
					this.prevRatio = entry.intersectionRatio;
					this.opac = entry.intersectionRatio + 0.15;
					entry.intersectionRatio <= 0.3 ? (this.opac = 0.15) : '';
				} else {
					this.prevRatio = entry.intersectionRatio;
					this.opac = this.prevRatio - 0.2;
					entry.intersectionRatio <= 0.4 ? (this.opac = 0) : '';
				}
			});

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
		console.log(this.observer);

		this.observer.observe(this.artistEl);
	},

	beforeUnmount() {
		this.artistPage = false;
		if (!this.artistEl) return;
		this.observer.unobserve(this.artistEl);
		this.header.classList.remove('fav-songs-intersec-bg1');
		this.header.classList.remove('fav-songs-intersec-bg2');
	},
	unmounted() {
		this.$store.dispatch('controller/closeHeaderBtn');
		this.$store.dispatch('artists/clearTracksID');
		this.$store.dispatch('artists/clearArtistPageData');
	},
};
</script>

<style scoped lang="scss">
.active {
	background-color: white !important;
	color: #000000 !important;
	font-weight: 500;
}
.inactive {
	background-color: #282828 !important;
	color: white !important;
	font-weight: 500;
}

.info {
	background-image: linear-gradient(
			rgba(0, 0, 0, 0) 0%,
			rgba(0, 0, 0, 0.7) 100%
		),
		url('https://i.scdn.co/image/ab6761670000ecd403d8cd0eee5f305be414ab4d');
	background-repeat: no-repeat;
	background-color: red;
}

#artistPage {
	&::before {
		content: '';
		opacity: var(--opacity);
		position: absolute;
		z-index: 0;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		padding: 5rem;
		background-repeat: no-repeat;
		background-size: cover;
		background-attachment: scroll;
		background-position: center;
		background-image: var(--bgArtistImage);
		transition: all 0.2s;
	}
}

.info-container {
	&::before {
		content: '';
		position: absolute;
		z-index: 0;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		border-radius: 0.5rem;
		background-repeat: no-repeat;
		background-size: cover;
		background-attachment: scroll;
		background-position: center;
		background-image: var(--bgArtistImage);
		transition: all 0.2s;
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
