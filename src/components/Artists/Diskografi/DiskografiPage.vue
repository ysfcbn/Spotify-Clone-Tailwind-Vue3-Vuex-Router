<template>
	<section class="diskografi relative min-w-[100px]" style="heigth: 100vh">
		<div
			id="diskoHeader"
			class="relative flex items-center justify-between lg:px-8 px-5 w-full py-1 sticky top-[64px]"
			style="z-index: 102"
		>
			<div class="text-white w-full font-semibold text-2xl">
				<router-link
					class="hover:underline"
					:to="{ name: 'artist', params: { id: currentArtist?.id } }"
					>{{ currentArtist?.name }}</router-link
				>
			</div>
			<DiskoOptions />
			<button
				@click="toggleView(msg, $event)"
				:class="{ 'bg-dark2': listView }"
				class="view-list rounded-full text-opacwhite3 mx-3 p-2 hover:bg-dark2"
			>
				<svg role="img" height="16" width="16" viewBox="0 0 16 16">
					<path
						fill="currentColor"
						d="M15 14.5H5V13h10v1.5zm0-5.75H5v-1.5h10v1.5zM15 3H5V1.5h10V3zM3 3H1V1.5h2V3zm0 11.5H1V13h2v1.5zm0-5.75H1v-1.5h2v1.5z"
					></path>
				</svg>
			</button>
			<button
				@click="toggleView(msg, $event)"
				:class="{ 'bg-dark2': cardView }"
				class="view-card hover:bg-dark2 rounded-full text-opacwhite3 p-2"
			>
				<svg role="img" height="16" width="16" viewBox="0 0 16 16">
					<path
						fill="currentColor"
						d="M1 1h6v6H1V1zm1.5 1.5v3h3v-3h-3zM1 9h6v6H1V9zm1.5 1.5v3h3v-3h-3zM9 1h6v6H9V1zm1.5 1.5v3h3v-3h-3zM9 9h6v6H9V9zm1.5 1.5v3h3v-3h-3z"
					></path>
				</svg>
			</button>
		</div>
		<div v-if="listView">
			<ListView
				v-for="(data, i) in selectedType"
				:key="data.id"
				:indx="i"
				:renderTypes="selectedType"
				:data="data"
				:diskografiPage="diskografiPage"
				:viewList="listView"
			/>
		</div>
		<div v-else>
			<CardView :renderTypes="selectedType" :viewCard="cardView" />
		</div>

		<section class="sm:pl-5 lg:p-5 lg:ml-[1rem]">
			<Info />
		</section>
	</section>
</template>

<script>
import DiskoOptions from './DiskoOptions.vue';
import ListView from './ListView.vue';
import CardView from './CardView.vue';
import Info from '../../SpotifyInfo/Info.vue';

export default {
	name: 'Diskografi',
	components: {
		DiskoOptions,
		ListView,
		CardView,
		Info,
	},

	emits: [
		'visToggleHeaderDisko',
		'toggleHeaderDisko',
		'sectionTitle',
		'selectedArtistName',
	],
	data() {
		return {
			diskografiPage: true,
			margin: false,
			currentPath: '',
			currentSectionAlbums: [],
		};
	},
	watch: {
		$route(to, from) {
			let pathArr = to.path.split('/');
			this.currentPath = pathArr[pathArr.length - 1];
			console.log(this.currentPath);
			this.$store.dispatch('discography/selectedType', this.currentPath);
		},
	},
	computed: {
		currentArtist() {
			return this.$store.getters['artists/getCurrentArtist'];
		},
		artistPublications() {
			return this.$store.getters['artists/getArtistPublications']?.items;
		},
		artistAlbums() {
			return this.$store.getters['artists/getArtistAlbums']?.items;
		},
		artistSingles() {
			return this.$store.getters['artists/getArtistSingles']?.items;
		},
		artistCompilations() {
			return this.$store.getters['artists/getArtistCompilations']?.items;
		},
		selectedType() {
			return this.getSelectedType === 'all'
				? this.artistPublications
				: this.getSelectedType === 'albums'
				? this.artistAlbums
				: this.getSelectedType === 'singles'
				? this.artistSingles
				: this.getSelectedType === 'compilations'
				? this.artistCompilations
				: null;
		},
		getSelectedType() {
			return this.$store.getters['discography/getSelectedType'];
		},
		getDiscoRenderType() {
			return this.$store.getters['discography/getDiscoRenderType'];
		},
		listView() {
			return this.getDiscoRenderType === 'listView';
		},
		cardView() {
			return this.getDiscoRenderType === 'cardView';
		},
	},
	methods: {
		toggleView(_, e) {
			if (e.target.closest('.view-list')) {
				this.$store.dispatch('discography/discoRenderType', 'listView');
			} else {
				this.$store.dispatch('discography/discoRenderType', 'cardView');
			}
		},
	},

	created() {
		this.diskografiPage = true;
		if (!this.selectedType) {
			this.artistPublications.forEach(item =>
				this.currentSectionAlbums.push(item.id)
			);
		} else
			this.selectedType.forEach(item =>
				this.currentSectionAlbums.push(item.id)
			);
		this.$store.dispatch(
			'discography/currentSectionAlbumsID',
			this.currentSectionAlbums
		);
	},
	unmounted() {
		this.$store.dispatch('controller/closeHeaderBtn');
	},
};
</script>

<style></style>
