<template>
	<div class="flex items-center justify-start text-sm overflow-x-auto">
		<button
			@click="toggleAll"
			:class="all ? 'active' : 'inactive'"
			class="w-fit h-fit rounded-full px-3 py-[6px] cursor-default bg-dark2 transition duration-200"
		>
			<span>All</span>
		</button>
		<button
			@click="toggleArtists"
			:class="artists ? 'active' : 'inactive'"
			class="w-fit h-fit rounded-full px-3 py-[6px] cursor-default bg-dark2 hover:bg-dark3/70 transition duration-200 mx-2"
		>
			<span>Artists</span>
		</button>
		<button
			@click="togglePlaylists"
			:class="playlists ? 'active' : 'inactive'"
			class="w-fit h-fit rounded-full px-3 py-[6px] mx-2 cursor-default bg-dark2 hover:bg-dark3/70 transition duration-200"
		>
			<span>Playlists</span>
		</button>
		<button
			@click="toggleAlbums"
			:class="albums ? 'active' : 'inactive'"
			class="w-fit h-fit rounded-full px-3 py-[6px] cursor-default bg-dark2 hover:bg-dark3/70 transition duration-200 mx-2"
		>
			<span>Albums</span>
		</button>
		<button
			@click="togglePodcasts"
			:class="podcasts ? 'active' : 'inactive'"
			class="min-w-fit h-fit rounded-full px-3 py-[6px] cursor-default bg-dark2 hover:bg-dark3/70 transition duration-200"
		>
			<span>Podcasts & Shows</span>
		</button>
		<button
			@click="toggleSongs"
			:class="songs ? 'active' : 'inactive'"
			class="w-fit h-fit rounded-full px-3 py-[6px] cursor-default bg-dark2 hover:bg-dark3/70 transition duration-200 mx-2"
		>
			<span>Songs</span>
		</button>
	</div>
</template>

<script>
export default {
	data() {
		return {
			type: 'all',
			all: true,
			songs: false,
			playlists: false,
			albums: false,
			podcasts: false,
			artists: false,
		};
	},
	methods: {
		toggleAll() {
			this.all ? '' : (this.all = true);
			this.albums ? (this.albums = false) : '';
			this.songs ? (this.songs = false) : '';
			this.playlists ? (this.playlists = false) : '';
			this.podcasts ? (this.podcasts = false) : '';
			this.artists ? (this.artists = false) : '';
			this.type = 'all';
			this.$store.commit('searchItem/searchCategoryType', this.type);
		},
		toggleAlbums() {
			this.albums ? '' : (this.albums = true);
			this.all ? (this.all = false) : '';
			this.songs ? (this.songs = false) : '';
			this.playlists ? (this.playlists = false) : '';
			this.podcasts ? (this.podcasts = false) : '';
			this.artists ? (this.artists = false) : '';
			this.type = 'albums';
			this.$store.commit('searchItem/searchCategoryType', this.type);
		},
		toggleSongs() {
			this.songs ? '' : (this.songs = true);
			this.albums ? (this.albums = false) : '';
			this.all ? (this.all = false) : '';
			this.playlists ? (this.playlists = false) : '';
			this.podcasts ? (this.podcasts = false) : '';
			this.artists ? (this.artists = false) : '';
			this.type = 'songs';
			this.$store.commit('searchItem/searchCategoryType', this.type);
		},
		togglePlaylists() {
			this.playlists ? '' : (this.playlists = true);
			this.albums ? (this.albums = false) : '';
			this.songs ? (this.songs = false) : '';
			this.all ? (this.all = false) : '';
			this.artists ? (this.artists = false) : '';
			this.podcasts ? (this.podcasts = false) : '';
			this.type = 'playlists';
			this.$store.commit('searchItem/searchCategoryType', this.type);
		},
		toggleArtists() {
			this.artists ? '' : (this.artists = true);
			this.albums ? (this.albums = false) : '';
			this.songs ? (this.songs = false) : '';
			this.playlists ? (this.playlists = false) : '';
			this.podcasts ? (this.podcasts = false) : '';
			this.all ? (this.all = false) : '';
			this.type = 'artists';
			this.$store.commit('searchItem/searchCategoryType', this.type);
		},
		togglePodcasts() {
			this.podcasts ? '' : (this.podcasts = true);
			this.albums ? (this.albums = false) : '';
			this.songs ? (this.songs = false) : '';
			this.artists ? (this.artists = false) : '';
			this.playlists ? (this.playlists = false) : '';
			this.all ? (this.all = false) : '';
			this.type = 'podcasts';
			this.$store.commit('searchItem/searchCategoryType', this.type);
		},
	},
	computed: {
		getSearchCategoryType() {
			return this.$store.getters['searchItem/getSearchCategoryType'];
		},
	},
	watch: {},

	mounted() {
		if (this.type) {
			this.getSearchCategoryType === 'all'
				? this.toggleAll()
				: this.getSearchCategoryType === 'artists'
				? this.toggleArtists()
				: this.getSearchCategoryType === 'playlists'
				? this.togglePlaylists()
				: this.getSearchCategoryType === 'albums'
				? this.toggleAlbums()
				: this.getSearchCategoryType === 'podcasts'
				? this.togglePodcasts()
				: this.toggleSongs();
		}
	},
};
</script>

<style scoped>
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
</style>
