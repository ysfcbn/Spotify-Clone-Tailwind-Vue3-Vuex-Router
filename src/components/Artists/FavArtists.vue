<template>
	<section class="p-5 mt-2 lg:ml-[1rem]">
		<div class="relative">
			<div id="fav--artists" class="flex justify-between h-[2.5rem]">
				<div class="h-fit flex-end">
					<h2
						class="text-[1.5rem] text-white leading-7 tracking-tight font-semibold"
					>
						Artists
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
	data() {
		return {
			favArtists: true,
		};
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
				'base-intersec-bg1',
				entries[0].intersectionRatio <= 0.95
			);

			this.header.classList.toggle(
				'base-intersec-bg2',
				entries[0].intersectionRatio <= 0.4
			);
		}, this.options);
		console.log(this.observer);

		this.observer.observe(this.favArtistsEl);
	},
	beforeUnmount() {
		console.log('favPodcasts Unmounted');
		this.observer.unobserve(this.favArtistsEl);
		this.header.classList.remove('base-intersec-bg1');
		this.header.classList.remove('base-intersec-bg2');
		this.favArtists = false;
	},
};
</script>

<style></style>
