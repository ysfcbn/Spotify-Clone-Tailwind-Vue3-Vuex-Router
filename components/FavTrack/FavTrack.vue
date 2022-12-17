<template>
	<section class="favtrack--page">
		<div
			id="favTrack"
			class="p-5 max-h-[800px] min-h-[340px] w-full mt-[-66px] relative bg-orange2 shadow-[2px_0px_5px_5px_rgba(0,0,0,0.4)] bg-gradient-to-b from-darkpurple via-purpl4 to-dark-1"
			style="height: 326px"
		>
			<div class="flex items-end justify-start h-full lg:ml-[1rem]">
				<div
					class="flex sm:w-[192px] sm:min-w-[192px] xl:h-[232px] xl:w-[232px] xl:min-w-[232px] shadow-[0_8px_40px_10px_rgba(0,0,0,0.6)] rounded-[12px]"
				>
					<img
						class="object-cover h-full w-full"
						src="https://i.scdn.co/image/ab67616d00001e02b437ee27293d4669d7f40248"
						alt="single"
					/>
				</div>
				<div class="flex flex-col text-white font-semibold px-4">
					<h2 class="text-sm">ŞARKI</h2>
					<span>
						<h1
							class="w-full sm:text-3xl md:text-5xl xl:text-8xl tracking-tighter py-2 uppercase"
						>
							Şarkı ADI
						</h1>
					</span>
					<div
						class="flex items-center flex-wrap mt-2 text-white w-full text-xs sm3:text-sm h-full font-semibold"
					>
						<div class="flex items-center flex-nowrap shrink-0">
							<span class="flex items-center justify-around">
								<span
									@click="toggleArtistPage(msg, $event)"
									class="hover:underline cursor-pointer"
									>Sanatçı adı</span
								>
							</span>
						</div>
						<div>
							<span class="beforeDot ml-2">2017</span>
							<span class="beforeDot text-sm">2:10</span>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div
			class="absolute w-full h-[212px] left-0 shrink-0 z-0 bg-gradient-to-b from-orange3 dark"
		></div>

		<div class="w-full h-[6.8rem] relative flex items-start py-[24px]">
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
					<button class="p-[0.9rem] ml-4 mx-1 text-lightest cursor-default">
						<svg role="img" height="32" width="32" viewBox="0 0 24 24">
							<path
								fill="#1FDF64"
								d="M5.21 1.57a6.757 6.757 0 016.708 1.545.124.124 0 00.165 0 6.741 6.741 0 015.715-1.78l.004.001a6.802 6.802 0 015.571 5.376v.003a6.689 6.689 0 01-1.49 5.655l-7.954 9.48a2.518 2.518 0 01-3.857 0L2.12 12.37A6.683 6.683 0 01.627 6.714 6.757 6.757 0 015.21 1.57zm3.12 1.803a4.757 4.757 0 00-5.74 3.725l-.001.002a4.684 4.684 0 001.049 3.969l.009.01 7.958 9.485a.518.518 0 00.79 0l7.968-9.495a4.688 4.688 0 001.049-3.965 4.803 4.803 0 00-3.931-3.794 4.74 4.74 0 00-4.023 1.256l-.008.008a2.123 2.123 0 01-2.9 0l-.007-.007a4.757 4.757 0 00-2.214-1.194z"
							></path>
							<path
								fill="#1FDF64"
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
						:favTrackPage="favTrackPage"
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
					<div class="w-20 h-20">
						<img
							class="rounded-full"
							src="	https://i.scdn.co/image/ab6761610000f178a00b11c129b27a88fc72f36b"
							alt=""
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
							Eminem
						</h4>
					</div>
				</div>
			</div>
		</div>

		<!-- Popüler Songs -->

		<section class="p-5 lg:ml-[1rem]">
			<div class="relative">
				<div class="h-fit flex flex-col h-[3.8rem]">
					<span class="text-lightest text-sm">Popüler Parçalar -</span>
					<h2
						class="text-[1.5rem] text-white leading-7 tracking-tight"
						style="font-weight: 600"
					>
						Sanatçı
					</h2>
				</div>
			</div>

			<PlaylistItems
				v-for="(track, i) in popSongs"
				:key="track.id"
				:index="i"
				:favTrackPage="favTrackPage"
				:margin="margin"
			>
				<template #trackName>{{ track.trackName }}</template>
				<template #listenNumber>{{ track.listensNumb }}</template>
				<template #duration>{{ track.duration }}</template>
			</PlaylistItems>
			<button
				@click="seeMoreFunc"
				class="m-2 mb-10 text-[0.75rem] text-opacwhite5 hover:text-white leading-7 tracking-widest hover:text-underline-offset-8 font-semibold cursor-default uppercase"
			>
				<span v-if="!seeMore">See More</span>
				<span v-else>daha azını göster</span>
			</button>

			<Card :dummydata="popularSongs">
				<template #cardTitle>Sanatçı Adı - Popüler Müzikleri</template>
				<template #seeMore>Diskografiye bak</template>
				<template #firstTitle="{ data }">{{ data.trackName }}</template>
				<template #secondTitle="{ data }"
					><span>{{ data.year }}</span>
					<span class="before:content-['•'] before:mx-2">{{ data.type }}</span>
				</template>
			</Card>

			<Card :dummydata="albumList">
				<template #cardTitle>Sanatçı Adı - Popüler Albümleri</template>
				<template #seeMore>Diskografiye bak</template>
				<template #firstTitle="{ data }">{{ data.trackName }}</template>
				<template #secondTitle="{ data }"
					><span>{{ data.year }}</span>
					<span class="before:content-['•'] before:mx-2">{{ data.type }}</span>
				</template>
			</Card>

			<Card :dummydata="singleList">
				<template #cardTitle>Sanatçı Adı - Popüler Single ve EP'leri</template>
				<template #seeMore>Diskografiye bak</template>
				<template #firstTitle="{ data }">{{ data.trackName }}</template>
				<template #secondTitle="{ data }"
					><span>{{ data.year }}</span>
					<span class="before:content-['•'] before:mx-2">{{ data.type }}</span>
				</template>
			</Card>
		</section>

		<div class="text-lightest text-[11px] sm:ml-5 lg:ml-[2.4rem]">
			<div class="relative h-full min-w-[450]">
				<div class="mb-[2px] sm:w-full">
					<div
						class="flex items-center gap-x-4 w-full bg-dark2 hover:bg-dark3 transition duration-300 cursor-pointer rounded-t-lg"
					>
						<div class="w-20 h-20">
							<img
								class="w-full h-full rounded-tl-lg"
								src="https://i.scdn.co/image/ab67616d00001e0276a961f15c943dae0b9bb7cf"
								alt=""
							/>
						</div>
						<div class="flex flex-col gap-y-1">
							<h2 class="text-xs text-opacwhite5" style="font-weight: 700">
								Single'dan:
							</h2>
							<h4
								class="text-white font-semibold cursor-ponter hover:underline"
							>
								Ass Like That
							</h4>
						</div>
					</div>
				</div>
				<div class="w-full">
					<div class="playlists h-fit w-full text-lightest">
						<PlaylistItems
							v-for="(track, i) in tracks"
							:key="track.id"
							:id="track.id"
							:track="track"
							:index="i"
							:favTrackPage2="favTrackPage"
							:margin="true"
						>
							<template v-slot:trackName
								><span> {{ track.trackName }}</span></template
							>
							<template v-slot:artist
								><span
									class="hover:underline cursor-pointer"
									@click="toggleArtistPage(msg, $event)"
								>
									{{ track.artist }}</span
								></template
							>
							<template v-slot:duration>{{ track.duration }}</template>
						</PlaylistItems>
					</div>
				</div>
			</div>
			<div class="mt-8">
				<p>1 Ocak 2013</p>
				<div>
					<p>© 2013 Aftermath Records</p>
					<p>℗ 2013 Aftermath Records</p>
				</div>
			</div>
		</div>

		<section class="sm:pl-5 lg:p-5 lg:ml-[1rem]">
			<Info />
		</section>
	</section>
</template>

<script>
import PlaylistItems from '../FavoriteSongs/PlaylistItems.vue';
import Info from '../SpotifyInfo/Info.vue';
import Lyrics from './Lyrics.vue';
import Card from '../Cards/Card.vue';
import AppOptions from '../AppOptions/AppOptions.vue';

export default {
	name: 'favTrack',
	components: { PlaylistItems, Info, Lyrics, Card, AppOptions },
	props: ['singlesPage'],
	emits: ['selectedArtistName', 'visToggleHeaderBtn', 'toggleHeaderBtn'],
	data() {
		return {
			lyrics: false,
			appOptions: false,
			favTrackPage: true,
			seeMore: false,
			firsFive: [],
			popSongs: [],
			albumList: [],
			singleList: [],
			diskografiList: [],

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

			tracks: [
				{
					trackName: 'Breathing Ben Böhmer Ben BöhmerBen BöhmerBen Böhmer',
					artist: 'Ben Böhmer',
					albumName: 'Begin Again',
					duration: '03:25',
					favTime: '13 gün önce',
					id: 1,
				},
				{
					trackName: 'Breathing Ben Bösada',
					artist: 'Ben Böhmer',
					albumName: 'Begin sadsad',
					duration: '03:25',
					favTime: '13 gün önce',
					id: 2,
				},
			],
		};
	},
	methods: {
		toggleAppOptions() {
			this.appOptions = !this.appOptions;
		},

		toggleArtistPage(_, e) {
			this.$emit('selectedArtistName', e.target.textContent);
			this.$router.push('/artist/id');
		},
		seeMoreFunc() {
			this.seeMore = !this.seeMore;
			this.popSongs = this.seeMore ? this.popularSongs : this.firsFive;
		},
	},

	mounted() {
		console.log('favTrackPage Mounted');
		this.favTrackPage = true;

		this.diskografiList = this.popularSongs;
		this.firsFive = this.popularSongs.slice(0, 5);
		this.popSongs = this.firsFive;

		this.albumList = this.diskografiList.filter(
			album => album.type === 'Album'
		);
		this.singleList = this.diskografiList.filter(
			single => single.type === 'Single'
		);
		console.log(this.popSongs, this.firsFive);
		this.$emit('visToggleHeaderBtn', true);

		this.header = document.getElementById('header');
		this.favTrackEl = document.getElementById('favTrack');

		this.options = {
			root: null,
			threshold: [0.1, 0.4, 1],
		};

		this.observer = new IntersectionObserver(entries => {
			console.log(entries);
			this.header.classList.add(
				'trackPage-intersec-bg1',
				entries[0].intersectionRatio >= 1
			);

			entries[0].intersectionRatio >= 0.1
				? this.$emit('toggleHeaderBtn', false)
				: this.$emit('toggleHeaderBtn', true);
		}, this.options);
		console.log(this.observer);

		this.observer.observe(this.favTrackEl);
	},

	beforeUnmount() {
		this.observer.unobserve(this.favTrackEl);
		this.header.classList.remove('trackPage-intersec-bg1');
		this.$emit('visToggleHeaderBtn', false);
		this.favTrackPage = false;
	},
};
</script>

<style></style>
