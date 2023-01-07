<template>
	<section class="favAlbums-Page p-5 mt-2 lg:ml-[1rem]">
		<div class="text-white">
			<div id="favAlbums" class="mb-7">
				<div class="h-fit">
					<h2
						class="text-[1.6rem] text-white leading-7 tracking-tighter"
						style="font-weight: 700"
					>
						Albümler
					</h2>
				</div>
			</div>
		</div>

		<div
			class="relative grid grid-cols-col180 sm:gap-3 md2:gap-6 grid-rows-auto"
		>
			<favAlbumItems
				v-for="album in getFavAlbums"
				:key="album.album.id"
				:id="album.album.id"
				:album="album.album"
			>
			</favAlbumItems>
		</div>
		<section>
			<Info />
		</section>
	</section>
</template>

<script>
import Info from '../SpotifyInfo/Info.vue';
import FavAlbumItems from './favAlbumItems.vue';

export default {
	name: 'FavAlbums',
	components: { Info, FavAlbumItems },
	data() {
		return { favAlbums: false };
	},

	computed: {
		getFavAlbums() {
			return this.$store.getters['albums/getFavAlbums'];
		},
	},
	mounted() {
		this.favAlbums = true;

		console.log('favAlbums Mounted');

		this.header = document.getElementById('header');
		this.favAlbumsEl = document.getElementById('favAlbums');

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
				'librarySec3-intersec-bg1',
				entries[0].intersectionRatio <= 0.95
			);

			this.header.classList.toggle(
				'librarySec3-intersec-bg2',
				entries[0].intersectionRatio <= 0.4
			);
		}, this.options);
		console.log(this.observer);

		this.observer.observe(this.favAlbumsEl);
	},
	beforeUnmount() {
		console.log('FavAlbums Unmounted');
		this.observer.unobserve(this.favAlbumsEl);
		this.header.classList.remove('librarySec3-intersec-bg1');
		this.header.classList.remove('librarySec3-intersec-bg2');
		this.favAlbums = false;
	},
};
</script>

<style></style>
