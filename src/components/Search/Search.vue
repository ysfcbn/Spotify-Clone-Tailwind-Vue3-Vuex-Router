<template>
	<div class="Search-Page p-4 mt-8 lg:ml-[1rem] mx-4">
		<div v-if="$route.name === 'searchResult' && isAuth">
			<SearchResult> </SearchResult>
		</div>
		<div v-else>
			<LastSearchs
				v-if="visibleLastSearch && isAuth"
				@searchItems="searchItems"
			/>
			<Wrapper v-if="isAuth" id="search" />
			<BrowseAll />
			<Info v-if="isAuth" />
		</div>
	</div>
</template>

<script>
import Wrapper from './SearchItems/Wrapper.vue';
import SearchResult from './SearchResult.vue';
import BrowseAll from './SearchItems/BrowseAll.vue';
import LastSearchs from './SearchItems/LastSearchs.vue';
import Info from '../SpotifyInfo/Info.vue';
import axios from 'axios';

export default {
	name: 'Search',
	components: { Wrapper, BrowseAll, LastSearchs, Info, SearchResult },
	data() {
		return {
			visibleLastSearch: true,
			observer: '',
			seachEl: '',
			search: false,
		};
	},
	computed: {
		isAuth() {
			return this.$store.getters.isAuth;
		},
		getToken() {
			return this.$store.getters.accessToken;
		},
		isBrowseCategoriesEmpty() {
			return this.$store.getters['playlists/getBrowseCategories']?.categories
				?.items.lenght;
		},
	},
	methods: {
		searchItems(val) {
			console.log(val);
			this.visibleLastSearch = val;
		},
		async fetchGenreSeeds() {
			await axios
				.get(
					'https://api.spotify.com/v1/recommendations/available-genre-seeds',
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
				})
				.catch(err => console.log(err));
		},
	},
	async mounted() {
		console.log('Search Mounted');
		this.$store.commit('searchItem/searchCategoryType', 'all');
		this.search = true;
		await this.fetchGenreSeeds();
		if (!this.isAuth) return;

		this.header = document.getElementById('header');

		this.seachEl = document.getElementById('search');

		this.headerHeight = document
			.getElementById('header')
			.getBoundingClientRect().height;

		this.options = {
			root: null,
			threshold: [0.7, 0.95],
			rootMargin: `-${this.headerHeight}px`,
		};

		this.observer = new IntersectionObserver(entries => {
			this.header.classList.toggle(
				'base-intersec-bg1',
				entries[0].intersectionRatio <= 0.95
			);

			this.header.classList.add(
				'base-intersec-bg2',
				entries[0].intersectionRatio <= 0.7
			);
		}, this.options);

		this.observer.observe(this.seachEl);
	},
	beforeUnmount() {
		this.search = false;
		console.log('search Unmounted!');
		if (!this.isAuth) return;
		this.observer.unobserve(this.seachEl);
		this.header.classList.remove('base-intersec-bg1');
		this.header.classList.remove('base-intersec-bg2');
	},
};
</script>

<style></style>
