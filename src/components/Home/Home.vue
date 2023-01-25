<template>
	<section class="Main-Page p-5 mt-2 lg:ml-[1rem]">
		<Transition name="bg-color">
			<div v-if="isAuth">
				<div
					v-if="enter1"
					:style="{ 'background-image': active }"
					id="colorTheme"
					class="absolute w-full h-[312px] left-0 top-0 shrink-0 z-0"
				></div>
				<div
					v-else
					:style="{ 'background-image': colors[0] }"
					id="colorTheme"
					class="absolute w-full h-[312px] left-0 top-0 shrink-0 z-0"
				></div>
			</div>
		</Transition>

		<section v-if="isAuth" class="relative z-10 main-home text-white mb-[2rem]">
			<div class="mb-8">
				<div>
					<h2
						class="text-3xl text-white leading-7 tracking-tight font-semibold"
					>
						{{ message }}
					</h2>
				</div>
			</div>

			<div
				id="home--last--listen"
				class="h-full grid mb:gap-y-4 mb:gap-x-6 mb:grid-cols-2 xl:grid-cols-3 min-w-[440px] shrink-1 flex"
			>
				<LastListen
					v-for="(item, i) in recentlyPlayed"
					:key="item.track.id"
					:item="item"
					:index="i"
					:contextType="item.context?.type"
					:contextUri="item.context?.uri"
					@mouseenter="enter(i)"
					@mouseleave="leave(i)"
				/>
			</div>
		</section>
		<div v-if="isAuth">
			<Card :shows="true" :currentData="favShows">
				<template #cardTitle>Programların</template>

				<template #imgContainer="{ data }">
					<div class="w-full relative mb-5">
						<img
							class="h-full w-full object-cover rounded-md"
							:src="data?.show?.images[0]?.url"
							alt="image"
						/>
					</div>
				</template>
				<template #firstTitle="{ data }">{{ data.show.name }}</template>
				<template #secondTitle="{ data }"
					><span>{{ data.show.publisher }}</span>
				</template>
			</Card>

			<Card :currentData="currentUserTopArtists" :artists="true">
				<template #cardTitle>En sevdiğin sanatçılar</template>

				<template #imgContainer="{ data }">
					<div class="w-full relative mb-6">
						<img
							class="h-full w-full object-cover rounded-full shadow-[0px_5px_12px_10px_rgba(0,0,0,0.3)]"
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
							'opacity-100 translate-y-[-0.4rem]':
								getCurrentlyPlayingTrack?.item?.artists[0].id === data?.id &&
								getCurrentlyPlayingTrack?.is_playing &&
								!getCurrentlyPlayingTrack?.context &&
								isArtistContext,
						}"
						class="bg-dark1 rounded-full right-0 bottom-0 absolute flex items-center mx-2 group-hover:block opacity-0 group-hover:opacity-100 transition ease-in duration-200 group-hover:translate-y-[-0.4rem]"
					>
						<button
							@click="
								playArtistTopTracksFunc(
									(artistID = data.id),
									(href = data.href)
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

			<section class="mb-12 relative z-70">
				<div class="flex justify-between h-[3.3rem]">
					<div class="h-fit flex flex-col gap-1">
						<h2
							class="text-[1.5rem] text-white leading-7 tracking-tight hover:underline hover:text-underline-offset-8 cursor-pointer"
							style="font-weight: 700"
						>
							Yakında Çalınanlar
						</h2>
					</div>
					<div class="">
						<h6
							style="font-weight: 600"
							class="h-full mb:text-[10px] md:text-[12px] text-lg leading-10 text-lightest hover:underline hover:text-white uppercase cursor-pointer pb-2 tracking-widest"
						>
							HEPSİNİ GÖR
						</h6>
					</div>
				</div>

				<div
					class="relative grid grid-cols-col180 auto-rows-0 overflow-hidden grid-rows-1 gap-x-6"
				>
					<RecentlyPlayedCard
						v-for="(item, i) in recentlyPlayedCard"
						:key="item.track.id"
						:item="item"
						:index="i"
						:contextType="item?.context?.type ? item?.context?.type : 'album'"
						:contextUri="
							item?.context?.uri ? item?.context?.uri : item.track.album.uri
						"
					>
					</RecentlyPlayedCard>
				</div>
			</section>

			<Card :currentData="recommendationsTracks" :albums="true">
				<template #cardTitle>Bugün için tavsiye</template>
				<template #imgContainer="{ data }">
					<div class="w-full relative mb-5">
						<img
							class="h-full w-full object-cover"
							:src="data?.album?.images[0]?.url"
							alt="image"
						/>
					</div>
				</template>
				<template #firstTitle="{ data }">{{ data?.album?.name }}</template>
				<template #secondTitle="{ data }"
					><span class="capitalize">{{ data?.album?.type }}</span>
				</template>
				<template #playBtn="{ data }">
					<div
						:class="{
							'opacity-100 translate-y-[-0.4rem]	':
								data?.album?.uri === getCurrentlyPlayingTrack?.context?.uri &&
								getCurrentlyPlayingTrack?.is_playing,
						}"
						class="bg-dark1 rounded-full right-0 bottom-0 absolute flex items-center mx-2 group-hover:block opacity-0 group-hover:opacity-100 transition ease-in duration-200 group-hover:translate-y-[-0.4rem]"
					>
						<button
							@click="
								playContextUri(
									(uri = {
										uri: data?.album?.uri,
										index: currentPlayingTrackIndex,
										type: data?.album?.type,
									}),
									(href = data?.album?.href)
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
										data?.album?.uri ===
											getCurrentlyPlayingTrack?.context?.uri &&
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

			<Card :currentData="severalPlaylists" :severalPlaylist="true">
				<template #cardTitle>Günlük müzik ihtiyacın</template>

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
					><span>{{ data?.description }}</span>
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
								playContextUri(
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
								'hover:scale-106 bg-green3/95 hover:bg-green3 ': !leftClick,
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

			<Card
				:severalPlaylist="true"
				v-for="(item, i) in RandomSelectedPlaylists"
				v-show="RandomSelectedPlaylists[i]?.playlists?.items.length"
				:key="item"
				:currentData="RandomSelectedPlaylists[i]?.playlists?.items"
			>
				<template #cardTitle>{{ getRandomSelectedPlaylistsTitle[i] }}</template>

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
					><span>{{ data?.description }}</span>
				</template>
				<template #playBtn="{ data }">
					<div
						:class="{
							'opacity-100 translate-y-[-0.4rem]':
								data?.uri === getCurrentlyPlayingTrack?.context?.uri &&
								getCurrentlyPlayingTrack?.is_playing,
						}"
						class="bg-dark1 rounded-full right-0 bottom-0 absolute flex items-center mx-2 group-hover:block opacity-0 group-hover:opacity-100 transition ease-in duration-200 group-hover:translate-y-[-0.4rem]"
					>
						<button
							@click="
								playContextUri(
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
								'hover:scale-106 bg-green3/95 hover:bg-green3 ': !leftClick,
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
			<Info v-if="isAuth" />
		</div>
		<div v-if="!isAuth" id="home">
			<Card
				v-for="item in totaldummydata"
				:key="item"
				:currentData="item"
				:dummyCards="true"
			>
				<template #cardTitle>{{ item[0].mainTitle }}</template>
				<template #imgContainer="{ data }">
					<div class="w-full relative mb-5">
						<img
							class="h-full w-full object-cover"
							:src="data?.img"
							alt="image"
						/>
					</div>
				</template>
				<template #firstTitle="{ data }">{{ data?.firstTitle }}</template>
				<template #secondTitle="{ data }"
					><span>{{ data?.secondTitle }}</span>
				</template>
				<template #playBtn>
					<div
						class="right-0 bottom-0 absolute flex items-center py-1 px-2 group-hover:block opacity-0 group-hover:opacity-100 transition ease-in duration-200 group-hover:translate-y-[-0.4rem]"
					>
						<button
							id="playBtn"
							class="p-3 bg-green3 rounded-full cursor-default lg:group-hover:block hover:scale-110 shadow-[0px_5px_6px_2px_rgba(0,0,0,0.4)]"
						>
							<h1 class="text-white"></h1>
							<svg role="img" height="24" width="24" viewBox="0 0 24 24">
								<path
									v-if="false"
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
		</div>
	</section>
</template>

<script>
import LastListen from './LastListen.vue';
import Card from '../Cards/Card.vue';
import RecentlyPlayedCard from '../Cards/RecentlyPlayedCard.vue';
import Info from '../SpotifyInfo/Info.vue';
import axios from 'axios';

export default {
	components: { LastListen, Card, Info, RecentlyPlayedCard },

	data() {
		return {
			home: true,
			colorTheme: '',
			enter1: false,
			leftClick: false,
			clickedArtist: null,
			active: '',
			headerHeight: '',
			playlistID: '',
			randomIndexs: null,
			recentlyPlayedCards: false,
			typeOfSelectedSection: null,
			totaldummydata: [],
			dummydata: [
				{
					mainTitle: 'Chill',
					firstTitle: 'New Music Friday Türkiye',
					secondTitle: 'Haftanın en iyi yeni çıkışları. Kapak: Sefo x Jako',
					img: 'https://i.scdn.co/image/ab67706f000000021df043181e0a5b20707ce3a9',
					id: 1,
				},
				{
					firstTitle: 'Hit Dans',
					secondTitle: 'En hit dans parçaları. Kapak: Ilkan Gunuc',
					img: 'https://i.scdn.co/image/ab67706f0000000257b321386c2bac9552a2f0b2',
					id: 2,
				},
				{
					firstTitle: 'Pozitif',
					secondTitle: 'Good vibes only',
					img: 'https://i.scdn.co/image/ab67706f0000000284d1ff2af2a9e1cbac76cacd',
					id: 3,
				},
				{
					firstTitle: 'Hot Hits Türkiye',
					secondTitle:
						'Dinlemekten vazgeçemediklerin ve en yeni hitler. Kapak: Eftalya Yağcı x Lvbel C5',
					img: 'https://i.scdn.co/image/ab67706f0000000200d61755f8afe13a1b4d6e4a',
					id: 4,
				},

				{
					firstTitle: 'trend',
					secondTitle: 'internette olan biten📱',
					img: 'https://i.scdn.co/image/ab67706f00000002cc0636b16f853a0dbc03bfad',
					id: 5,
				},
				{
					firstTitle: 'Breathing',
					secondTitle: 'Ben Böhmer',
					img: 'https://i.scdn.co/image/ab67706f000000021df043181e0a5b20707ce3a9',
					id: 6,
				},
				{
					firstTitle: 'Turnalar',
					secondTitle: 'Murat Kekilli',
					img: 'https://i.scdn.co/image/ab67706f000000021df043181e0a5b20707ce3a9',

					id: 7,
				},
				{
					firstTitle: 'Empty Floor',
					secondTitle: 'Jan Blomqvist',
					img: 'https://i.scdn.co/image/ab67706f000000021df043181e0a5b20707ce3a9',

					id: 8,
				},
				{
					firstTitle: 'The Space in Between',
					secondTitle: 'Jan Blomqvist',
					img: 'https://i.scdn.co/image/ab67706f000000021df043181e0a5b20707ce3a9',

					id: 9,
				},

				{
					firstTitle: 'Breathing',
					secondTitle: 'Ben Böhmer',
					img: 'https://i.scdn.co/image/ab67706f000000021df043181e0a5b20707ce3a9',

					id: 10,
				},
			],
			dummydata2: [
				{
					mainTitle: 'Günlük müzik ihtiyacın.',
					firstTitle: 'DAily Mix 1',
					secondTitle:
						'Hans Zİmer , Jonas, Kaufmann, Mac Quayle ve Jona Shmidtmanth',
					img: 'https://dailymix-images.scdn.co/v2/img/ab6761610000e5eb371632043a8c12bb7eeeaf9d/1/tr/default',
					id: 1,
				},
				{
					firstTitle: 'Moshe Bareket Radio',
					secondTitle: 'Oluşturan: Spotify',
					img: 'https://seeded-session-images.scdn.co/v1/img/artist/5QTzEAiYtVwRtTwpOrmISO/tr',
					id: 2,
				},
				{
					firstTitle: 'Mini World Deluxe',
					secondTitle: 'Indila',
					img: 'https://i.scdn.co/image/ab67616d00001e02eb5b8d192f9b4dfc67e4834d',
					id: 3,
				},
				{
					firstTitle: 'Brain Food',
					secondTitle: 'Hypnotic electronic  for studies and a relax.',
					img: 'https://i.scdn.co/image/ab67706f000000021df043181e0a5b20707ce3a9',
					id: 4,
				},

				{
					firstTitle: 'Coffee Table Jazz',
					secondTitle: 'Relax to the sound of jazz.',
					img: 'https://i.scdn.co/image/ab67706f000000023e7580e54c5e6672d564f170',
					id: 5,
				},
			],
			dummydata3: [
				{
					mainTitle: 'Spotify Playlists',
					firstTitle: 'New Music Friday Türkiye',
					secondTitle: 'Haftanın en iyi yeni çıkışları. Kapak: Sefo x Jako',
					img: 'https://i.scdn.co/image/ab67706f000000021df043181e0a5b20707ce3a9',
					id: 1,
				},
				{
					firstTitle: 'Hit Dans',
					secondTitle: 'En hit dans parçaları. Kapak: Ilkan Gunuc',
					img: 'https://i.scdn.co/image/ab67706f0000000257b321386c2bac9552a2f0b2',
					id: 2,
				},
				{
					firstTitle: 'Pozitif',
					secondTitle: 'Good vibes only',
					img: 'https://i.scdn.co/image/ab67706f0000000284d1ff2af2a9e1cbac76cacd',
					id: 3,
				},
				{
					firstTitle: 'Hot Hits Türkiye',
					secondTitle:
						'Dinlemekten vazgeçemediklerin ve en yeni hitler. Kapak: Eftalya Yağcı x Lvbel C5',
					img: 'https://i.scdn.co/image/ab67706f0000000200d61755f8afe13a1b4d6e4a',
					id: 4,
				},

				{
					firstTitle: 'trend',
					secondTitle: 'internette olan biten📱',
					img: 'https://i.scdn.co/image/ab67706f00000002cc0636b16f853a0dbc03bfad',
					id: 5,
				},
				{
					firstTitle: 'Breathing',
					secondTitle: 'Ben Böhmer',
					img: 'https://i.scdn.co/image/ab67706f000000021df043181e0a5b20707ce3a9',
					id: 6,
				},
				{
					firstTitle: 'Turnalar',
					secondTitle: 'Murat Kekilli',
					img: 'https://i.scdn.co/image/ab67706f000000021df043181e0a5b20707ce3a9',

					id: 7,
				},
				{
					firstTitle: 'Empty Floor',
					secondTitle: 'Jan Blomqvist',
					img: 'https://i.scdn.co/image/ab67706f000000021df043181e0a5b20707ce3a9',

					id: 8,
				},
				{
					firstTitle: 'The Space in Between',
					secondTitle: 'Jan Blomqvist',
					img: 'https://i.scdn.co/image/ab67706f000000021df043181e0a5b20707ce3a9',

					id: 9,
				},

				{
					firstTitle: 'Breathing',
					secondTitle: 'Ben Böhmer',
					img: 'https://i.scdn.co/image/ab67706f000000021df043181e0a5b20707ce3a9',

					id: 10,
				},
			],
			dummydata4: [
				{
					mainTitle: 'Odaklan',
					firstTitle: 'DAily Mix 1',
					secondTitle:
						'Hans Zİmer , Jonas, Kaufmann, Mac Quayle ve Jona Shmidtmanth',
					img: 'https://dailymix-images.scdn.co/v2/img/ab6761610000e5eb371632043a8c12bb7eeeaf9d/1/tr/default',
					id: 1,
				},
				{
					firstTitle: 'Moshe Bareket Radio',
					secondTitle: 'Oluşturan: Spotify',
					img: 'https://seeded-session-images.scdn.co/v1/img/artist/5QTzEAiYtVwRtTwpOrmISO/tr',
					id: 2,
				},
				{
					firstTitle: 'Mini World Deluxe',
					secondTitle: 'Indila',
					img: 'https://i.scdn.co/image/ab67616d00001e02eb5b8d192f9b4dfc67e4834d',
					id: 3,
				},
				{
					firstTitle: 'Brain Food',
					secondTitle: 'Hypnotic electronic  for studies and a relax.',
					img: 'https://i.scdn.co/image/ab67706f000000021df043181e0a5b20707ce3a9',
					id: 4,
				},

				{
					firstTitle: 'Coffee Table Jazz',
					secondTitle: 'Relax to the sound of jazz.',
					img: 'https://i.scdn.co/image/ab67706f000000023e7580e54c5e6672d564f170',
					id: 5,
				},
			],
			dummydata5: [
				{
					mainTitle: 'Ruh hali',
					firstTitle: 'New Music Friday Türkiye',
					secondTitle: 'Haftanın en iyi yeni çıkışları. Kapak: Sefo x Jako',
					img: 'https://i.scdn.co/image/ab67706f000000021df043181e0a5b20707ce3a9',
					id: 1,
				},
				{
					firstTitle: 'Hit Dans',
					secondTitle: 'En hit dans parçaları. Kapak: Ilkan Gunuc',
					img: 'https://i.scdn.co/image/ab67706f0000000257b321386c2bac9552a2f0b2',
					id: 2,
				},
				{
					firstTitle: 'Pozitif',
					secondTitle: 'Good vibes only',
					img: 'https://i.scdn.co/image/ab67706f0000000284d1ff2af2a9e1cbac76cacd',
					id: 3,
				},
				{
					firstTitle: 'Hot Hits Türkiye',
					secondTitle:
						'Dinlemekten vazgeçemediklerin ve en yeni hitler. Kapak: Eftalya Yağcı x Lvbel C5',
					img: 'https://i.scdn.co/image/ab67706f0000000200d61755f8afe13a1b4d6e4a',
					id: 4,
				},

				{
					firstTitle: 'trend',
					secondTitle: 'internette olan biten📱',
					img: 'https://i.scdn.co/image/ab67706f00000002cc0636b16f853a0dbc03bfad',
					id: 5,
				},
				{
					firstTitle: 'Breathing',
					secondTitle: 'Ben Böhmer',
					img: 'https://i.scdn.co/image/ab67706f000000021df043181e0a5b20707ce3a9',
					id: 6,
				},
				{
					firstTitle: 'Turnalar',
					secondTitle: 'Murat Kekilli',
					img: 'https://i.scdn.co/image/ab67706f000000021df043181e0a5b20707ce3a9',

					id: 7,
				},
				{
					firstTitle: 'Empty Floor',
					secondTitle: 'Jan Blomqvist',
					img: 'https://i.scdn.co/image/ab67706f000000021df043181e0a5b20707ce3a9',

					id: 8,
				},
				{
					firstTitle: 'The Space in Between',
					secondTitle: 'Jan Blomqvist',
					img: 'https://i.scdn.co/image/ab67706f000000021df043181e0a5b20707ce3a9',

					id: 9,
				},

				{
					firstTitle: 'Breathing',
					secondTitle: 'Ben Böhmer',
					img: 'https://i.scdn.co/image/ab67706f000000021df043181e0a5b20707ce3a9',

					id: 10,
				},
			],
			dummydata6: [
				{
					mainTitle: 'Popüler Yeni Çıkanlar',
					firstTitle: 'DAily Mix 1',
					secondTitle:
						'Hans Zİmer , Jonas, Kaufmann, Mac Quayle ve Jona Shmidtmanth',
					img: 'https://dailymix-images.scdn.co/v2/img/ab6761610000e5eb371632043a8c12bb7eeeaf9d/1/tr/default',
					id: 1,
				},
				{
					firstTitle: 'Moshe Bareket Radio',
					secondTitle: 'Oluşturan: Spotify',
					img: 'https://seeded-session-images.scdn.co/v1/img/artist/5QTzEAiYtVwRtTwpOrmISO/tr',
					id: 2,
				},
				{
					firstTitle: 'Mini World Deluxe',
					secondTitle: 'Indila',
					img: 'https://i.scdn.co/image/ab67616d00001e02eb5b8d192f9b4dfc67e4834d',
					id: 3,
				},
				{
					firstTitle: 'Brain Food',
					secondTitle: 'Hypnotic electronic  for studies and a relax.',
					img: 'https://i.scdn.co/image/ab67706f000000021df043181e0a5b20707ce3a9',
					id: 4,
				},

				{
					firstTitle: 'Coffee Table Jazz',
					secondTitle: 'Relax to the sound of jazz.',
					img: 'https://i.scdn.co/image/ab67706f000000023e7580e54c5e6672d564f170',
					id: 5,
				},
			],
			recentlyPlayed: [],
			recentlyPlayedCard: [],
			colors: {
				0: 'linear-gradient(to bottom,rgba(72, 32, 176,0.4),rgba(72, 32, 176,0))',
				1: 'linear-gradient(to bottom,rgba(152,168, 176,0.4),rgba(152,168, 176,0))',
				2: 'linear-gradient(to bottom,rgba(48, 48, 64,0.4),rgba(48, 48, 64,0))',
				3: 'linear-gradient(to bottom,rgba(83, 83, 83,0.4),rgba(83, 83, 83,0))',
				4: 'linear-gradient(to bottom,rgba(168, 208, 120, 0.4),rgba(168, 208, 120,0))',
				5: 'linear-gradient(to bottom,rgba(184, 128, 120,0.4),rgba(184, 128, 120,0))',
			},
		};
	},

	methods: {
		async currentUser() {
			await axios
				.get('https://api.spotify.com/v1/me', {
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + this.getToken,
					},
				})
				.then(({ data }) => {
					this.$store.dispatch('currentUser', data);
				})
				.catch(err => console.log(err));
		},

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
					this.$store.dispatch('artists/favArtists', data.artists.items);
				})
				.catch(err => console.log(err));
		},
		async fetchTopArtists() {
			await axios
				.get('https://api.spotify.com/v1/me/top/artists', {
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + this.getToken,
					},
				})
				.then(({ data }) => {
					this.$store.dispatch('users/curUserTopArtists', data);
				})
				.catch(err => console.log(err));
		},
		async fetchFavAlbums() {
			await axios
				.get('https://api.spotify.com/v1/me/albums', {
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + this.getToken,
					},
				})
				.then(({ data }) => {
					this.$store.dispatch('albums/favAlbums', data.items);
				})
				.catch(err => console.log(err));
		},
		async fetchFavEpisodes() {
			await axios
				.get('https://api.spotify.com/v1/me/episodes?limit=50', {
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + this.getToken,
					},
				})
				.then(({ data }) => {
					this.$store.dispatch('episodes/favEpisodes', data);
				})
				.catch(err => console.log(err));
		},
		async fetchFavShows() {
			await axios
				.get('https://api.spotify.com/v1/me/shows?limit=50', {
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + this.getToken,
					},
				})
				.then(({ data }) => {
					this.$store.dispatch('shows/favShows', data);
				})
				.catch(err => console.log(err));
		},
		async fetchSeveralPlaylists() {
			await axios
				.get('https://api.spotify.com/v1/browse/featured-playlists', {
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + this.getToken,
					},
				})
				.then(({ data }) => {
					this.$store.dispatch('playlists/severalPlaylists', data);
				})
				.catch(err => console.log(err));
		},
		async fetchRecommendations() {
			await axios
				.get(
					'https://api.spotify.com/v1/recommendations?seed_artists=0YC192cP3KPCRWx8zr8MfZ&seed_genres=soundtracks&seed_tracks=6ZFbXIJkuI1dVNWvzJzown&limit=10&market=US',
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
					this.$store.dispatch('playlists/recommendationsTracks', data);
				})
				.catch(err => console.log(err));
		},

		async fetchBrowseCategories() {
			await axios
				.get('https://api.spotify.com/v1/browse/categories?limit=50', {
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + (await this.getToken),
					},
				})
				.then(({ data }) => {
					this.$store.dispatch('playlists/browseCategories', data);
				})
				.catch(err => console.log(err));
		},

		async fetchRandomPlaylists(categoryID) {
			await this.randomIndexs?.forEach(item => {
				axios
					.get(
						`https://api.spotify.com/v1/browse/categories/${categoryID[item].id}/playlists?limit=50`,
						{
							headers: {
								Accept: 'application/json',
								'Content-Type': 'application/json',
								Authorization: 'Bearer ' + this.getToken,
							},
						}
					)
					.then(({ data }) => {
						data.playlists.items.length > 9
							? (data.playlists.items.length = 9)
							: data;
						this.$store.dispatch(
							'playlists/randomSelectedPlaylistsTitle',
							categoryID[item].name
						);
						this.$store.dispatch('playlists/randomSelectedPlaylists', data);
					})
					.catch(err => console.log(err));
			});
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
		async fetchArtist(href) {
			await axios
				.get(href, {
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + this.getToken,
					},
				})
				.then(({ data }) => {
					console.log(data);
					this.$store.dispatch('artists/currentArtist', data);
				})
				.catch(err => console.log(err));
		},
		async fetchArtistTopTracks(artistID) {
			await axios
				.get(
					'https://api.spotify.com/v1/artists/' +
						artistID +
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
					this.$store.dispatch('artists/topTracks', data.tracks);
				})
				.catch(err => console.log(err));
		},

		async playContextUri(uri, href) {
			console.log(uri);
			if (
				uri.uri === this.getCurrentlyPlayingTrack?.context?.uri &&
				this.getCurrentlyPlayingTrack?.is_playing
			) {
				await this.$store.dispatch('controller/pauseCurrentTrack');
			} else {
				if ((await uri.type) === 'playlist') {
					this.typeOfSelectedSection = 'playlist';
					await this.fetchPlaylist(href);
					uri.id =
						this.currentPlaylist[this.currentPlayingTrackIndex]?.track.id;
				} else if ((await uri.type) === 'album') {
					this.typeOfSelectedSection = 'album';
					await this.fetchAlbum(href);
					uri.id = this.currentAlbumTracks[this.currentPlayingTrackIndex]?.id;
				}
				uri.index = this.currentPlayingTrackIndex;
				console.log(uri);
				await this.$store.dispatch('controller/playSelectedContext', uri);
			}
		},
		async playArtistTopTracksFunc(artistID, href) {
			this.clickedArtist = artistID;
			await this.fetchArtist(href);
			await this.fetchArtistTopTracks(artistID);
			await this.playArtistTopTracks(
				{
					uri: this.artistTopTrackUris,
					index: this.currentPlayingTrackIndex,
					type: 'artist',
					artistID: artistID,
				},
				href
			);
		},
		async playArtistTopTracks(uri) {
			this.typeOfSelectedSection = 'artist';
			console.log(uri);
			console.log(uri.index);
			if (this.isPlayingArtistTopTracks) {
				console.log('Pause ÇAlıştı');
				await this.$store.dispatch('controller/pauseCurrentTrack');
			} else {
				uri.index = await this.currentPlayingTrackIndex;
				await this.$store.dispatch('controller/playArtitsTopTracks', uri);
			}
		},

		async lastListenTracks() {
			return await this.getRecentlyPlayedTracks.reduce((acc, item, i) => {
				if (item.context && !acc[item.context.uri]) {
					if (this.recentlyPlayed.length < 6) {
						this.recentlyPlayed.push(item);
					}
				}
				if (item.context) {
					acc[item.context.uri] = item.context.uri;
				}
				return acc;
			}, {});
		},

		async lastListenCards() {
			return await this.getRecentlyPlayedTracks.reduce((acc, item, i) => {
				if (item.context && !acc[item.context.uri]) {
					this.recentlyPlayedCard.push(item);
				}

				if (!item.context && !acc[item.track.album.uri]) {
					this.recentlyPlayedCard.push(item);
				}
				if (item.context) {
					acc[item.context.uri] = item.context.uri;
				}
				if (!item.context) {
					acc[item.track.album.uri] = item.track.album.uri;
				}
				return acc;
			}, {});
		},

		randomNumbers() {
			let a;
			let i;
			for (a = [], i = 0; i < 46; ++i) a[i] = i;

			function shuffle(array) {
				let tmp,
					current,
					top = array.length;
				if (top)
					while (--top) {
						current = Math.floor(Math.random() * (top + 1));
						tmp = array[current];
						array[current] = array[top];
						array[top] = tmp;
					}
				array.length = 10;
				return array;
			}

			a = shuffle(a);
			this.randomIndexs ? '' : (this.randomIndexs = a);
		},

		enter(id) {
			this.active = this.colors[id];
			this.enter1 = true;
		},
		leave() {
			this.enter1 = false;
		},
	},

	computed: {
		isAuth() {
			return this.$store.getters.isAuth;
		},
		getToken() {
			return this.$store.getters.accessToken;
		},
		getRecentlyPlayedTracks() {
			return this.$store.getters['controller/getRecentlyPlayedTracks']?.items;
		},
		getSeveralPlaylists() {
			return this.$store.getters['playlists/getseveralPlaylists'];
		},
		severalPlaylists() {
			return this.getSeveralPlaylists?.playlists?.items;
		},
		recommendationsTracks() {
			return this.$store.getters['playlists/getRecommendationsTracks'].tracks;
		},
		message() {
			return this.getSeveralPlaylists?.message;
		},
		favTracks() {
			return this.$store.getters['favTracks/getTracks']?.items?.length;
		},
		getFavShows() {
			return this.$store.getters['shows/getFavShows']?.items?.length;
		},
		favShows() {
			return this.$store.getters['shows/getFavShows']?.items;
		},
		favEpisodes() {
			return this.$store.getters['episodes/getFavEpisodes']?.items?.length;
		},
		favAlbums() {
			return this.$store.getters['albums/getFavAlbums']?.length;
		},
		favArtists() {
			return this.$store.getters['artists/getFavArtists']?.length;
		},
		getCurrentUser() {
			return this.$store.getters.getCurrentUser;
		},
		currentUserUri() {
			return this.getCurrentUser?.uri;
		},
		userFavSongsLastListenItem() {
			return {
				context: {
					type: 'collection',
					uri: this.userFavSongsContextUri,
				},
				track: {
					id: this.getCurrentUser.id,
					image:
						'https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png',
				},
			};
		},
		userFavSongsContextUri() {
			return `${this.currentUserUri}:collection`;
		},
		getCurrentlyPlayingTrack() {
			return this.$store.getters['controller/getCurrentlyPlayingTrack'];
		},
		currentTrackID() {
			return this.getCurrentlyPlayingTrack?.item?.id;
		},
		currentPlaylist() {
			return this.$store.getters['playlists/getPlaylist']?.tracks?.items;
		},
		currentAlbumTracks() {
			return this.$store.getters['albums/getAlbum']?.tracks?.items;
		},
		artistTopTracks() {
			return this.$store.getters['artists/getTopTracks'];
		},
		artistTopTrackUris() {
			return this.artistTopTracks.map(item => item?.uri);
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
				this.getCurrentlyPlayingTrack?.item?.artists[0].id ===
					this.clickedArtist &&
				!this.getCurrentlyPlayingTrack?.context &&
				this.getCurrentlyPlayingTrack?.is_playing &&
				this.isArtistContext
			);
		},
		getCurrentUserTopArtists() {
			return this.$store.getters['users/getCurUserTopArtists']?.items?.length;
		},
		currentUserTopArtists() {
			return this.$store.getters['users/getCurUserTopArtists']?.items;
		},
		getBrowseCategories() {
			return this.$store.getters['playlists/getBrowseCategories']?.categories
				?.items;
		},
		RandomSelectedPlaylists() {
			return this.$store.getters['playlists/getRandomSelectedPlaylists'];
		},
		getRandomSelectedPlaylistsTitle() {
			return this.$store.getters['playlists/getRandomSelectedPlaylistsTitle'];
		},
	},
	watch: {
		isAuth(newVal) {
			if (!newVal) {
				this.totaldummydata = this.totaldummydata.concat(
					[this.dummydata],
					[this.dummydata2],
					[this.dummydata3],
					[this.dummydata4],
					[this.dummydata5],
					[this.dummydata6]
				);
			}
		},
	},
	async created() {
		console.log('Home Mounted');
		this.home = true;
		this.isAuth;
		const isAuth = await this.isAuth;

		this.colorTheme = document.getElementById('colorTheme');
		this.header = document.getElementById('header');

		if (!isAuth) {
			this.homeEl = document.getElementById('home');
			this.totaldummydata = this.totaldummydata.concat(
				[this.dummydata],
				[this.dummydata2],
				[this.dummydata3],
				[this.dummydata4],
				[this.dummydata5],
				[this.dummydata6]
			);
			this.options = {
				root: null,
				threshold: [0.4, 0.7],
				rootMargin: `-60px 0px 0px 0px`,
			};

			this.observer = new IntersectionObserver(entries => {
				this.header.classList.toggle(
					'home-not-auth--intersec-bg2',
					entries[0].intersectionRatio <= 0.7
				);
				this.header.classList.toggle(
					'home-not-auth--intersec-bg3',
					entries[0].intersectionRatio <= 0.4
				);
			}, this.options);
			this.observer.observe(this.homeEl);
		} else if (isAuth) {
			this.homeEl = document.getElementById('home--last--listen');
			this.options = {
				root: null,
				threshold: [0.8, 0.95],
				rootMargin: `-50px`,
			};

			this.observer = new IntersectionObserver(entries => {
				this.header.classList.toggle(
					'home-intersec-bg1',
					entries[0].intersectionRatio <= 0.95
				);
				this.header.classList.toggle(
					'home-intersec-bg2',
					entries[0].intersectionRatio <= 0.8
				);
			}, this.options);
			this.observer.observe(this.homeEl);
		}
		if (this.isAuth) {
			await this.$store.dispatch('controller/fetchRecentlyPlayedTracks');
			this.getCurrentUser ? '' : await this.currentUser();
			await this.lastListenTracks();
			await this.lastListenCards();
			this.recentlyPlayed.length < 6
				? this.recentlyPlayed.unshift(this.userFavSongsLastListenItem)
				: '';
			this.$store.dispatch(
				'controller/lastListenCards',
				this.recentlyPlayedCard
			);
			this.recommendationsTracks ? '' : await this.fetchRecommendations();
			this.getFavShows ? '' : await this.fetchFavShows();
			this.severalPlaylists ? '' : await this.fetchSeveralPlaylists();
			this.getCurrentUserTopArtists ? '' : await this.fetchTopArtists();
			this.favTracks ? '' : await this.fetchFavTracks();
			this.favArtists ? '' : await this.fetchFavArtists();
			this.favAlbums ? '' : await this.fetchFavAlbums();
			this.favEpisodes ? '' : await this.fetchFavEpisodes();
			if (!this.RandomSelectedPlaylists.length) {
				await this.fetchBrowseCategories();
				this.randomNumbers();
				await this.fetchRandomPlaylists(this.getBrowseCategories);
			}
		}
	},

	async beforeUnmount() {
		console.log('Home unMounted');

		this.home = true;
		const isAuth = await this.isAuth;

		if (!isAuth) return;

		this.observer.unobserve(this.homeEl);
		this.header.classList.remove('home-intersec-bg1');
		this.header.classList.remove('home-intersec-bg2');
	},
};
</script>

<style scoped>
.bg-color-enter-active,
.bg-color-leave-active {
	transition: opacity 0.8s ease-in;
}

.bg-color-enter-to,
.bg-color-leave-from {
	opacity: 1;
}
.bg-color-enter-from,
.bg-color-leave-to {
	opacity: 0;
}
</style>

<!-- openAlbum(_, e) {
      if (e.target.closest("#playBtn")?.id === "playBtn") {
        console.log("toggle Play/Stop Users");
      } else {
        const albumID = e.target.closest(".card--container").id;
        this.$router.push({ name: "album", params: { id: albumID } });
      }
    },
    openPlaylist(_, e) {
      if (e.target.closest("#playBtn")?.id === "playBtn") {
        console.log("toggle Play/Stop Users");
      } else {
        const playlistID = e.target.closest(".card--container").id;
        this.$router.push({ name: "playlist", params: { id: playlistID } });
      }
    },
    openShow(_, e) {
      const showID = e.target.closest(".card--container").id;
      this.$router.push({ name: "show", params: { id: showID } });
    },
    openArtist(_, event) {
      if (event.target.closest("#playBtn")?.id === "playBtn") {
        console.log("toggle Play/Stop Users");
      } else {
        const selectedID = event.target.closest(".card--container").id;
        console.log(selectedID);
        this.$router.push({ name: "artist", params: { id: selectedID } });
      }
    }, -->
