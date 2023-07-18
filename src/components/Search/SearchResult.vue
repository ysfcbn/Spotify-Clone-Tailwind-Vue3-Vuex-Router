<template>
	<div class="Search-Result p-4 lg:ml-[1rem] mx-4">
		<div class="relative w-full h-full grid col-span-full pb-5">
			<div class="flex items-center justify-start text-sm">
				<button
					class="w-fit h-fit rounded-full px-3 py-[6px] cursor-default bg-dark2 transition duration-200"
				>
					<span class="text-white">All</span>
				</button>
				<button
					class="w-fit h-fit rounded-full px-3 py-[6px] mx-2 cursor-default bg-dark2 hover:bg-dark3/70 transition duration-200"
				>
					<span class="text-white">Playlists</span>
				</button>
				<button
					class="min-w-fit h-fit rounded-full px-3 py-[6px] cursor-default bg-dark2 hover:bg-dark3/70 transition duration-200"
				>
					<span class="text-white">Podcasts & Shows</span>
				</button>
				<button
					class="w-fit h-fit rounded-full px-3 py-[6px] cursor-default bg-dark2 hover:bg-dark3/70 transition duration-200 mx-2"
				>
					<span class="text-white">Artists</span>
				</button>
				<button
					class="w-fit h-fit rounded-full px-3 py-[6px] cursor-default bg-dark2 hover:bg-dark3/70 transition duration-200 mx-2"
				>
					<span class="text-white">Songs</span>
				</button>
				<button
					class="w-fit h-fit rounded-full px-3 py-[6px] cursor-default bg-dark2 hover:bg-dark3/70 transition duration-200 mx-2"
				>
					<span class="text-white">Profiles</span>
				</button>
				<button
					class="min-w-fit h-fit rounded-full px-3 py-[6px] cursor-default bg-dark2 hover:bg-dark3/70 transition duration-200 mx-2"
				>
					<span class="text-white">Genres & Moods</span>
				</button>
				<button
					class="w-fit h-fit rounded-full px-3 py-[6px] cursor-default bg-dark2 hover:bg-dark3/70 transition duration-200 mx-2"
				>
					<span class="text-white">Albums</span>
				</button>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';

export default {
	data() {
		return {};
	},
	methods: {
		async fetchSearchItem() {
			await axios
				.get(
					`https://api.spotify.com/v1/search?q=${this.searchItem}&type=${this.types}`,
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
	computed: {
		isAuth() {
			return this.$store.getters.isAuth;
		},
		getToken() {
			return this.$store.getters.accessToken;
		},
		searchItem() {
			return this.$store.getters['searchItem/getSearchItem'];
		},
		types() {
			return this.$store.getters['searchItem/getTypes'];
		},
	},
	mounted() {
		console.log('searchResult Mounted!');
		this.fetchSearchItem();
	},
};
</script>

<style></style>
