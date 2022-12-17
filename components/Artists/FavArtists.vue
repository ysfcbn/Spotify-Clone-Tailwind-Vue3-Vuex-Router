<template>
	<section class="p-5 mt-2 lg:ml-[1rem]">
		<div class="relative">
			<div id="fav--artists" class="flex justify-between h-[2.5rem]">
				<div class="h-fit flex-end">
					<h2
						class="text-[1.5rem] text-white leading-7 tracking-tight font-semibold"
					>
						Sanatçılar
					</h2>
				</div>
			</div>
			<div class="relative grid grid-cols-colArt gap-6 auto-rows-auto mt-4">
				<artistItems
					v-for="artist in getFavArtists"
					:key="artist.id"
					:id="artist.id"
					:artist="artist"
				/>
			</div>
		</div>
		<section>
			<Info />
		</section>
	</section>
</template>

<script>
import artistItems from './ArtistItems.vue';
import Info from '../SpotifyInfo/Info.vue';

export default {
	name: 'FavArtists',
	components: { artistItems, Info },
	emits: ['selectedArtistName'],
	data() {
		return {
			favArtists: true,
			artistName: '',
			artists: [
				{
					id: 1,
					name: 'INNA',
					type: 'Sanatçı',
					monthlyListener: '8562540',
					img: 'https://i.scdn.co/image/ab6761610000f178571bd5587850d252e8fc892d',
				},
				{
					id: 2,
					name: 'Ben Böhmer',
					type: 'Sanatçı',
					monthlyListener: '9762510',
					img: 'https://i.scdn.co/image/ab67616100005174a8a48c12973f1621a9eea81d',
				},
				{
					id: 3,
					name: 'Jan Blomqvist',
					type: 'Sanatçı',
					monthlyListener: '5126545',
					img: 'https://i.scdn.co/image/ab67616100005174f1853b674364d4b6c7638d14',
				},
				{
					id: 4,
					name: 'Hans Zimmer',
					type: 'Sanatçı',
					monthlyListener: '10658214',
					img: 'https://i.scdn.co/image/ab67616100005174371632043a8c12bb7eeeaf9d',
				},
			],
		};
	},
	methods: {
		selectArtistName(name) {
			this.artistName = name;
			this.$emit('selectedArtistName', this.artistName);
		},
	},
	computed: {
		getFavArtists() {
			return this.$store.getters['artists/getFavArtists'];
		},
	},
	mounted() {
		this.favArtists = true;

		console.log('favArtists Mounted');

		this.header = document.getElementById('header');
		this.favArtistsEl = document.getElementById('fav--artists');

		this.headerHeight = document
			.getElementById('header')
			.getBoundingClientRect().height;

		this.options = {
			root: null,
			threshold: [0.4, 0.95],
			rootMargin: `-${this.headerHeight}px`,
		};

		this.observer = new IntersectionObserver(entries => {
			console.log(entries);

			this.header.classList.toggle(
				'librarySec4-intersec-bg1',
				entries[0].intersectionRatio <= 0.95
			);

			this.header.classList.toggle(
				'librarySec4-intersec-bg2',
				entries[0].intersectionRatio <= 0.4
			);
		}, this.options);
		console.log(this.observer);

		this.observer.observe(this.favArtistsEl);
	},
	beforeUnmount() {
		console.log('favPodcasts Unmounted');
		this.observer.unobserve(this.favArtistsEl);
		this.header.classList.remove('librarySec4-intersec-bg1');
		this.header.classList.remove('librarySec4-intersec-bg2');
		this.favArtists = false;
	},
};
</script>

<style></style>
