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
					:style="{ 'background-image': colors[1] }"
					id="colorTheme"
					class="absolute w-full h-[312px] left-0 top-0 shrink-0 z-0"
				></div>
			</div>
		</Transition>
		<div v-if="!isAuth" id="home" class="absolute top-0 h-[25rem] w-full"></div>
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
				class="h-full grid sm:gap-y-4 sm:gap-x-6 sm:grid-cols-2 xl:grid-cols-3 min-w-[440px] shrink-1 flex"
			>
				<LastListen
					v-for="section in sections"
					:key="section.id"
					:section="section"
					@mouseenter="enter(section.id)"
					@mouseleave="leave(section.id)"
				/>
			</div>
		</section>

		<Card :shows="true" @click="openShow(msg, $event)" :currentData="favShows">
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

		<Card @click="openArtist(msg, $event)" :currentData="currentUserTopArtists">
			<template #cardTitle>En sevdiğin sanatçılar</template>

			<template #imgContainer="{ data }">
				<div class="w-full relative mb-5">
					<img
						class="h-full w-full object-cover rounded-full"
						:src="data?.images[0]?.url"
						alt="image"
					/>
				</div>
			</template>
			<template #firstTitle="{ data }">{{ data?.name }}</template>
			<template #secondTitle="{ data }"
				><span>{{ data?.type }}</span>
			</template>
		</Card>

		<Card @click="openPlaylist(msg, $event)" :currentData="severalPlaylists">
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
		</Card>

		<Card
			v-for="(item, i) in RandomSelectedPlaylists"
			v-show="RandomSelectedPlaylists[i]?.playlists?.items.length"
			:key="item"
			@click="openPlaylist(msg, $event)"
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
		</Card>
		<Info v-if="isAuth" />
	</section>
</template>

<script>
import LastListen from './LastListen.vue';
import Card from '../Cards/Card.vue';
import Info from '../SpotifyInfo/Info.vue';
import axios from 'axios';

export default {
	components: { LastListen, Card, Info },
	data() {
		return {
			home: true,
			colorTheme: '',
			enter1: false,
			active: '',
			headerHeight: '',
			playlistID: '',
			randomIndexs: null,
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
			sections: [
				{
					name: 'Beğenilen Şarkılar',
					id: 1,
					img: 'https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png',
				},
				{
					name: 'Hans Zimmer',
					id: 2,
					img: 'https://i.scdn.co/image/ab67706f00000002c5737f55b7195addae20994f',
				},
				{
					name: "Eminem: When I'm Gone",
					id: 3,
					img: ' https://i.scdn.co/image/ab67616d0000b273e7eb779a71e61702561a5e78',
				},
				{
					name: 'LXST CXTURY',
					id: 4,
					img: 'https://i.scdn.co/image/ab6761610000e5eba6d9fc1ca342f2f9bdd783af',
				},
				{
					name: 'INTERSTELLAR',
					id: 5,
					img: 'https://i.scdn.co/image/ab67616d0000b273ac29a65e7ffcfa6f9cb0d342',
				},
				{
					name: 'DAY ONE - HANS ZİMMER(Interstellar)',
					id: 6,
					img: 'https://i.scdn.co/image/ab67706c0000da849ee7a095aa96164af96048ab',
				},
			],
			colors: {
				1: 'linear-gradient(to bottom,rgba(72, 32, 176,0.4),rgba(72, 32, 176,0))',
				2: 'linear-gradient(to bottom,rgba(152,168, 176,0.4),rgba(152,168, 176,0))',
				3: 'linear-gradient(to bottom,rgba(48, 48, 64,0.4),rgba(48, 48, 64,0))',
				4: 'linear-gradient(to bottom,rgba(83, 83, 83,0.4),rgba(83, 83, 83,0))',
				5: 'linear-gradient(to bottom,rgba(168, 208, 120, 0.4),rgba(168, 208, 120,0))',
				6: 'linear-gradient(to bottom,rgba(184, 128, 120,0.4),rgba(184, 128, 120,0))',
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
						Authorization: 'Bearer ' + (await this.getToken),
					},
				})
				.then(({ data }) => {
					console.log(data);
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
						Authorization: 'Bearer ' + (await this.getToken),
					},
				})
				.then(({ data }) => {
					console.log(data.items);
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
						Authorization: 'Bearer ' + (await this.getToken),
					},
				})
				.then(({ data }) => {
					console.log(data.artists);
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
						Authorization: 'Bearer ' + (await this.getToken),
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
						Authorization: 'Bearer ' + (await this.getToken),
					},
				})
				.then(({ data }) => {
					console.log(data);
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
						Authorization: 'Bearer ' + (await this.getToken),
					},
				})
				.then(({ data }) => {
					console.log(data);
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
						Authorization: 'Bearer ' + (await this.getToken),
					},
				})
				.then(({ data }) => {
					console.log(data);
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
						Authorization: 'Bearer ' + (await this.getToken),
					},
				})
				.then(({ data }) => {
					console.log(data);
					this.$store.dispatch('playlists/severalPlaylists', data);
				})
				.catch(err => console.log(err));
		},
		async fetchSeveralPlaylists2() {
			await axios
				.get(
					'https://api.spotify.com/v1/browse/featured-playlists?timestamp=2022-10-24T09:00:00',
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
					console.log(data);
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
						console.log(data, categoryID[item].name);
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
			if (id !== 1) {
				this.active = this.colors[id];
				this.enter1 = true;
			}
		},
		leave() {
			this.enter1 = false;
		},
		openPlaylist(_, e) {
			if (e.target.closest('#playBtn')?.id === 'playBtn') {
				console.log('toggle Play/Stop Users');
			} else {
				const playlistID = e.target.closest('.card--container').id;
				this.$router.push({ name: 'playlist', params: { id: playlistID } });
			}
		},
		openShow(_, e) {
			const showID = e.target.closest('.card--container').id;
			this.$router.push({ name: 'show', params: { id: showID } });
		},
		openArtist(_, event) {
			if (event.target.closest('#playBtn')?.id === 'playBtn') {
				console.log('toggle Play/Stop Users');
			} else {
				const selectedID = event.target.closest('.card--container').id;
				console.log(selectedID);
				this.$router.push({ name: 'artist', params: { id: selectedID } });
			}
		},
	},
	computed: {
		isAuth() {
			return this.$store.getters.isAuth;
		},
		getToken() {
			return this.$store.getters.accessToken;
		},
		getSeveralPlaylists() {
			return this.$store.getters['playlists/getseveralPlaylists'];
		},
		severalPlaylists() {
			return this.getSeveralPlaylists?.playlists?.items;
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
			return this.$store.state.currentUser;
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
		async isAuth(newVal) {
			if (newVal) {
				this.totaldummydata = [];
				this.totaldummydata = this.totaldummydata.concat(
					[this.dummydata],
					[this.dummydata2]
				);
			} else {
				this.totaldummydata = [];
				this.totaldummydata = this.totaldummydata.concat(
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
		const isAuth = await this.isAuth;

		this.colorTheme = document.getElementById('colorTheme');
		this.header = document.getElementById('header');

		if (!isAuth) {
			this.homeEl = document.getElementById('home');
			this.options = {
				root: null,
				threshold: [0.4, 0.7],
				rootMargin: `-60px 0px 0px 0px`,
			};

			this.observer = new IntersectionObserver(entries => {
				console.log(entries);

				this.header.classList.toggle(
					'home-not-auth--intersec-bg2',
					entries[0].intersectionRatio <= 0.7
				);
				this.header.classList.toggle(
					'home-not-auth--intersec-bg3',
					entries[0].intersectionRatio <= 0.4
				);
			}, this.options);
			console.log(this.observer);
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
			this.getCurrentUser ? '' : await this.currentUser();
			this.favTracks ? '' : await this.fetchFavTracks();
			await this.$store.dispatch('controller/fetchCurrentlyPlayingTrack');
			await this.$store.dispatch('controller/fetchPlaybackState');
			await this.$store.dispatch('controller/fetchDevice');

			this.favArtists ? '' : await this.fetchFavArtists();
			this.getCurrentUserTopArtists ? '' : await this.fetchTopArtists();
			this.favAlbums ? '' : await this.fetchFavAlbums();
			this.favEpisodes ? '' : await this.fetchFavEpisodes();
			this.getFavShows ? '' : await this.fetchFavShows();
			this.severalPlaylists ? '' : await this.fetchSeveralPlaylists();
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
