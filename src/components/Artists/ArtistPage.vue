<template>
	<section class="box-border">
		<div
			id="artistPage"
			class="p-5 max-h-[800px] h-[340px] min-h-[400px] w-full mt-[-96px] relative bg-dark5"
			:style="{ '--opacity': opac }"
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
							>Doğrulanmış Sanatçı</span
						>
					</div>

					<h1
						class="w-full mb-3 text-[5.5rem] leading-none py-1 tracking-tighter font-semibold whitespace-nowrap"
					>
						{{ artistName }}
					</h1>

					<div>
						<span class="mr-2"> 7.692.510 aylık dinleyici </span>
					</div>
				</div>
			</div>
		</div>

		<!-- Diğer Seçenekler -->
		<div
			class="absolute w-full h-[212px] left-0 shrink-0 z-0"
			style="background: linear-gradient(rgba(213, 33, 33,0.3), rgba(0, 0, 0,0)"
		></div>

		<div
			class="w-full h-[5rem] relative flex flex-col items-start justify-center pt-5"
		>
			<div class="w-full ml-[1.2rem] lg:ml-[2rem]">
				<div class="flex justify-start items-center">
					<div class="w-[5.5rem]">
						<button class="rounded-full bg-green3 p-[0.9rem] w-fit">
							<span>
								<svg
									role="img"
									height="28"
									width="28"
									viewBox="0 0 24 24"
									class=""
								>
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
					<div :class="{ 'w-[9.5rem]': follow, 'w-[6.6rem]': !follow }">
						<button
							@click="toggleFollow"
							type="button"
							:class="{
								'w-[8rem] border-white': follow,
								'hover:border-white border-opacwhite2': !follow,
							}"
							class="border cursor-default w-[5.5rem] h-fit text-white px-2 py-1 rounded-[5px]"
						>
							<span v-if="follow" class="text-sm" style="font-weight: 600"
								>TAKİP EDİLİYOR</span
							>
							<span v-else class="text-sm" style="font-weight: 600">
								TAKİP ET</span
							>
						</button>
					</div>

					<ArtistOptions :follow="follow" :toggleFollow="toggleFollow" />
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
							Popüler
						</h2>
					</div>
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
				class="m-2 text-[0.75rem] text-opacwhite5 hover:text-white leading-7 tracking-widest hover:text-underline-offset-8 font-semibold cursor-default uppercase mb-8"
			>
				<span v-if="!seeMore">See More</span>
				<span v-else>daha azını göster</span>
			</button>

			<Card
				@click="openCard(msg, $event)"
				:artistPage="true"
				:togglePublications="togglePublications"
				:toggleAlbums="toggleAlbums"
				:toggleSingles="toggleSingles"
				:popPublications="popPublications"
				:albums="albums"
				:singles="singles"
				:currentData="diskografiList"
			>
				<template #cardTitle>Diskografi</template>
				<template #seeMore>
					<span @click="toggleDiskografi" class="uppercase text-lightest"
						>HEPSİNİ GÖR</span
					>
				</template>

				<template #firstTitle="{ data }"
					><span>{{ data.trackName }}</span></template
				>
				<template #secondTitle="{ data }"
					><span>{{ data.year }}</span>
					<span class="before:content-['•'] before:mx-2">{{ data.type }}</span>
				</template>
			</Card>

			<Card @click="openCard(msg, $event)" :currentData="popularSongs">
				<template #cardTitle>Karşınızda {{ artistName }}</template>

				<template #firstTitle="{ data }"
					><span>{{ data.trackName }}</span></template
				>
				<template #secondTitle="{ data }"
					><span>{{ data.year }}</span>
				</template>
			</Card>

			<Card :artists="true" :currentData="fansLove">
				<template #cardTitle>Hayranlarının hoşlandığı</template>

				<template #firstTitle="{ data }"
					><span>{{ data.artistName }}</span></template
				>
				<template #secondTitle="{ data }"
					><span>{{ data.title }}</span>
				</template>
			</Card>

			<Card :currentData="albumList">
				<template #cardTitle>Bulunduğu Albüm</template>

				<template #firstTitle="{ data }"
					><span>{{ data.albumName }}</span></template
				>
				<template #secondTitle="{ data }"
					><span>{{ data.year }}</span>
					<span class="before:content-['•'] before:mx-2">{{ data.type }}</span>
				</template>
			</Card>

			<Card :currentData="ownPlaylists">
				<template #cardTitle>Sanatçı Çalma Listeleri</template>

				<template #firstTitle="{ data }"
					><span>{{ data.playlistName }}</span></template
				>
				<template #secondTitle="{ data }"
					><span>{{ data.title }}</span>
				</template>
			</Card>

			<Card :currentData="locatedPlaylists">
				<template #cardTitle>Yer Aldığı Çalma Listeleri</template>

				<template #firstTitle="{ data }"
					><span>{{ data.playlistName }}</span></template
				>
				<template #secondTitle="{ data }"
					><span>{{ data.title }}</span>
				</template>
			</Card>
		</section>

		<section class="p-5 lg:ml-[1rem]">
			<div
				class="grid grid-cols-info gap-6 auto-rows-auto grid-rows-1 shrink-1"
			>
				<div class="col-span-4 min-w-[516px]">
					<h2 class="text-[1.5rem] mb-[20px] text-white font-semibold">
						Hakkında
					</h2>
					<div class="col-span-4">
						<button
							class="relative h-[516px] rounded-xl bg-cover bg-center w-full bg-no-repeat hover:scale-[1.01] transition duration-200 linear"
						>
							<div class="w-full h-full bg-[rgba(0,0,0,0.3)]"></div>
							<div
								class="absolute bottom-0 p-[40px] text-white max-w-[672px] h-[11rem] box-border"
							>
								<div class="text-[1rem] text-left font-semibold">
									232432423 aylık dinleyici
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
			opac: '',
			prevRatio: null,
			follow: false,
			artistName: '',
			popPublications: true,
			albums: false,
			singles: false,
			albumID: '',
			singleID: '',
			firsFive: [],
			popSongs: [],
			albumList: [],
			singleList: [],
			diskografiList: [],
			ownPlaylists: [],
			locatedPlaylists: [],
			seeMore: false,

			popularSongs: [
				{
					trackName: 'UP',
					albumName: '2001',
					duration: '04:32',
					listensNumb: '22.343.434',
					year: '2022',
					type: 'Album',
					img: 'https://i.scdn.co/image/ab67616d00001e0275a2c90eca545e6b0557897c',
					id: 1,
				},
				{
					trackName: 'Magical Love',
					duration: '04:54',
					albumName: 'The Massacre',
					listensNumb: '65.344.434',
					year: '2022',
					type: 'Album',
					img: 'https://i.scdn.co/image/ab67616d00001e0275a2c90eca545e6b0557897c',
					id: 2,
				},
				{
					trackName: 'FlashBacks',
					duration: '05:35',
					albumName: 'No.6 Collaboration Project',
					listensNumb: '12.233.654',
					year: '2022',
					type: 'Album',
					img: 'https://i.scdn.co/image/ab67616d00001e0275a2c90eca545e6b0557897c',
					id: 3,
				},
				{
					trackName: 'It Dont Matter',
					duration: '05:12',
					listensNumb: '15.345.975',
					year: '2022',
					type: 'Single',
					img: 'https://i.scdn.co/image/ab67616d00001e02de335339b8c7223760c3add0',
					id: 4,
				},
				{
					trackName:
						'Sun is UpSun is UpSun is UpSun is UpSun is UpSun is UpSun is Up',
					duration: '03:25',
					listensNumb: '9.211.123',
					year: '2022',
					type: 'Single',
					img: 'https://i.scdn.co/image/ab67616d00001e02de335339b8c7223760c3add0',
					id: 5,
				},
				{
					trackName: 'Magical Love',
					albumName: 'The Truth About Love',
					duration: '04:54',
					listensNumb: '65.344.434',
					year: '2022',
					type: 'Album',
					img: 'https://i.scdn.co/image/ab67616d00001e0275a2c90eca545e6b0557897c',
					id: 6,
				},

				{
					trackName: 'FlashBacks',
					duration: '05:35',
					albumName: 'The Documentary',
					listensNumb: '12.233.654',
					year: '2022',
					type: 'Album',
					img: 'https://i.scdn.co/image/ab67616d00001e0275a2c90eca545e6b0557897c',
					id: 7,
				},
				{
					trackName: 'It Dont Matter',
					duration: '05:12',
					albumName: 'Konvicted',
					listensNumb: '15.345.975',
					year: '2022',
					type: 'Album',
					img: 'https://i.scdn.co/image/ab67616d00001e0275a2c90eca545e6b0557897c',
					id: 8,
				},
				{
					trackName: 'Sun is Up',
					duration: '03:25',
					listensNumb: '9.211.123',
					year: '2020',
					type: 'Single',
					img: 'https://i.scdn.co/image/ab67616d00001e02de335339b8c7223760c3add0',
					id: 9,
				},
				{
					trackName: 'UP',
					duration: '04:32',
					listensNumb: '22.343.434',
					year: '2022',
					type: 'Single',
					img: 'https://i.scdn.co/image/ab67616d00001e0275a2c90eca545e6b0557897c',
					id: 10,
				},
			],
			fansLove: [
				{
					artistName: 'D12',
					type: 'Artist',
					title: 'Sanatçı',
					img: 'https://i.scdn.co/image/ab6761610000f1784f52827861ae9b860a5e62f6',
					id: 1,
				},
				{
					artistName: 'Bad Meets Evil',
					type: 'Artist',
					title: 'Sanatçı',
					img: 'https://i.scdn.co/image/4f153c72bff6dccba21ffd360fc308f268a23659',
					id: 2,
				},
				{
					artistName: 'Obie Trice',
					type: 'Artist',
					title: 'Sanatçı',
					img: 'https://i.scdn.co/image/d6ebc26b7f361aa6de3a8992b49bf4a2536af3fc',
					id: 3,
				},
				{
					artistName: 'The Game',
					type: 'Artist',
					title: 'Sanatçı',
					img: 'https://i.scdn.co/image/ab6761610000f178a657aa5506945d264e147244',
					id: 4,
				},
				{
					artistName: 'DMX',
					type: 'Artist',
					title: 'Sanatçı',
					img: '	https://i.scdn.co/image/ab6772690000dd223074f51af22630a1c86da016',
					id: 5,
				},
				{
					artistName: 'James Newton Howard',
					type: 'Artist',
					title: 'Sanatçı',
					img: 'https://i.scdn.co/image/ab6761610000f178e9d190a9e39a772d84b068ab',
					id: 6,
				},
			],
			playlistList: [
				{
					id: 1,
					type: 'Owner',
					playlistName: 'EMINEM BEST OF',
					title: 'Oluşturan: Eminem',
					img: 'https://i.scdn.co/image/ab67706c0000da84132592c603bf37999f614f07',
				},
				{
					id: 2,
					type: 'Owner',
					playlistName: 'EMINEM COMPLETE',
					title: 'Oluşturan: Eminem',
					img: 'https://i.scdn.co/image/ab67706c0000da844343967b3ec617871c303473',
				},
				{
					id: 3,
					type: 'Owner',
					playlistName: 'RUN THAT BACK',
					title: 'Hip Hop Forever. Playlist Image: Eminem & Snoop Dogg',
					img: 'https://i.scdn.co/image/ab67706c0000da844343967b3ec617871c303473',
				},
				{
					id: 4,
					type: 'located',
					playlistName: 'This Is Eminem',
					title: 'This Is Eminem. The essential tracks, all in one playlist.',
					img: 'https://i.scdn.co/image/ab67706f000000027a181d9fed936372672c40ca',
				},
				{
					id: 5,
					type: 'located',
					playlistName: 'All Out 2000s',
					title: 'The biggest songs of the 2000s.',
					img: 'https://i.scdn.co/image/ab67706f00000002128217f6ecc1036a29759168',
				},
				{
					id: 6,
					type: 'located',
					playlistName: 'EMINEM BEST OF',
					title: 'Oluşturan: Eminem',
					img: 'https://i.scdn.co/image/ab67706c0000da84132592c603bf37999f614f07',
				},
				{
					id: 7,
					type: 'located',
					playlistName: 'Gold School',
					title: 'Taking it way back! Cover: Eminem',
					img: 'https://i.scdn.co/image/ab67706f00000002bb127d86cd3377c693b9f119',
				},
				{
					id: 8,
					type: 'located',
					playlistName: 'Top Gaming Tracks',
					title: 'Press playi press start',
					img: 'https://i.scdn.co/image/ab67706f00000002b3e682b5049e2e0b86da6b5a',
				},
				{
					id: 9,
					type: 'located',
					playlistName: "I Love My '90s Hip-Hop'",
					title: 'Real rap music from the golden era.',
					img: 'https://i.scdn.co/image/ab67706f0000000217f5a91128f800d0223948cd',
				},
			],
		};
	},
	computed: {
		isAuth() {
			return this.$store.getters.isAuth;
		},
		getToken() {
			return this.$store.getters.accessToken;
		},
		currentArtists() {
			return this.$store.getters['artists/getCurrentArtist'];
		},
		allFavTracks() {
			return this.$store.getters['favTracks/getTracks'].items;
		},
		artistTopTracks() {
			return this.$store.getters['artists/getTopTracks'];
		},
		getFavTracks() {
			return this.$store.getters['artists/getfavTracksID'];
		},
		addGreenHeartEl() {
			return this.getFavTracks.map(item => document.getElementById(`${item}`));
		},
	},
	methods: {
		async fetchArtist() {
			await axios
				.get('https://api.spotify.com/v1/artists/' + this.id, {
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + (await this.getToken),
					},
				})
				.then(({ data }) => {
					console.log(data);
					this.$store.dispatch('artists/currentArtist', data);
				})
				.catch(err => console.log(err));
		},
		async fetchArtistTopTracks() {
			await axios
				.get(
					'https://api.spotify.com/v1/artists/' +
						this.id +
						'/top-tracks?market=US',
					{
						headers: {
							Accept: 'application/json',
							'Content-Type': 'application/json',
							Authorization: 'Bearer ' + (await this.getToken),
						},
					}
				)
				.then(({ data }) => {
					console.log(data);
					this.$store.dispatch('artists/topTracks', data.tracks);
				})
				.catch(err => console.log(err));
		},

		toggleFollow() {
			this.follow = !this.follow;
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
		openCard(_, e) {
			if (!e.target.closest('.card--container')) return;
			if (this.popPublications) {
				const cardID = e.target.closest('.card--container').id;
				const selectedCardContent = [
					...e.target.closest('.card--container').children,
				];
				let cardType =
					selectedCardContent[0].children[1].children[1].children[1]
						.textContent;
				if (cardType === 'Album') {
					this.albumID = cardID;
					this.$router.push(`/album/${this.albumID}`);
				}
				if (cardType === 'Single') {
					this.singleID = cardID;
					this.$router.push(`/single/${this.singleID}`);
				}
			}
			if (this.singles) {
				this.singleID = e.target.closest('.card--container').id;
				this.$router.push(`/single/${this.singleID}`);
			} else if (this.albums) {
				this.albumID = e.target.closest('.card--container').id;
				this.$router.push(`/album/${this.albumID}`);
			}
		},

		togglePublications() {
			this.popPublications ? '' : (this.popPublications = true);
			this.albums ? (this.albums = false) : '';
			this.singles ? (this.singles = false) : '';
			this.diskografiList = this.popularSongs;
		},
		toggleAlbums() {
			console.log('toggle Albums');
			this.albums ? '' : (this.albums = true);
			this.popPublications ? (this.popPublications = false) : '';
			this.singles ? (this.singles = false) : '';
			this.diskografiList = this.albumList;
		},
		toggleSingles() {
			this.singles ? '' : (this.singles = true);
			this.albums ? (this.albums = false) : '';
			this.popPublications ? (this.popPublications = false) : '';
			this.diskografiList = this.singleList;
		},
		seeMoreFunc() {
			this.seeMore = !this.seeMore;
		},
		toggleDiskografi() {
			this.$router.push('/artist/id/discography/all');
		},
	},
	async created() {
		console.log('artistPage Mounted');
		this.artistPage = true;
		this.margin = true;
		this.prevRatio = 0.0;

		await this.fetchArtist();
		await this.fetchArtistTopTracks();

		this.popSongs = this.artistTopTracks;
		this.findFavTracks();
		await this.getFavTracks;

		console.log(this.addGreenHeartEl);
		console.log(this.getFavTracks);
		this.addGreenHeartFavTracks();

		this.albumList = this.diskografiList.filter(
			album => album.type === 'Album'
		);
		this.singleList = this.diskografiList.filter(
			single => single.type === 'Single'
		);
		this.ownPlaylists = this.playlistList.filter(
			playlist => playlist.type === 'Owner'
		);
		this.locatedPlaylists = this.playlistList.filter(
			playlist => playlist.type === 'located'
		);

		this.artistName = this.selectArtCardName;

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

					console.log(this.prevRatio);
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
				? this.$emit('toggleHeaderBtn', false)
				: this.$emit('toggleHeaderBtn', true);
		}, this.options);
		console.log(this.observer);

		this.observer.observe(this.artistEl);
	},

	beforeUnmount() {
		this.observer.unobserve(this.artistEl);
		this.header.classList.remove('fav-songs-intersec-bg1');
		this.header.classList.remove('fav-songs-intersec-bg2');
		this.$emit('toggleHeaderBtn', false);
		this.artistPage = false;
	},
	unmounted() {
		this.$store.dispatch('controller/closeHeaderBtn');
		this.$store.dispatch('artists/clearTracksID');
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
		background-attachment: fixed;
		background-position: center;
		background-image: url('https://i.ytimg.com/vi/uKWEDqkyKvU/maxresdefault.jpg');
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
