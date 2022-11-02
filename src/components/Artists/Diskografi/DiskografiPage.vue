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
			<DiskoOptions @selectedType="selectedTypeFunc" />
			<button
				@click="toggleView(msg, $event)"
				:class="{ 'bg-dark2': viewList }"
				class="view-list rounded-full text-opacwhite3 mx-3 p-2 hover:bg-dark2"
			>
				<svg
					role="img"
					height="16"
					width="16"
					viewBox="0 0 16 16"
					class="Svg-sc-1bi12j5-0 EQkJl"
				>
					<path
						fill="currentColor"
						d="M15 14.5H5V13h10v1.5zm0-5.75H5v-1.5h10v1.5zM15 3H5V1.5h10V3zM3 3H1V1.5h2V3zm0 11.5H1V13h2v1.5zm0-5.75H1v-1.5h2v1.5z"
					></path>
				</svg>
			</button>
			<button
				@click="toggleView(msg, $event)"
				:class="{ 'bg-dark2': viewCard }"
				class="view-card hover:bg-dark2 rounded-full text-opacwhite3 p-2"
			>
				<svg
					role="img"
					height="16"
					width="16"
					viewBox="0 0 16 16"
					class="Svg-sc-1bi12j5-0 EQkJl"
				>
					<path
						fill="currentColor"
						d="M1 1h6v6H1V1zm1.5 1.5v3h3v-3h-3zM1 9h6v6H1V9zm1.5 1.5v3h3v-3h-3zM9 1h6v6H9V1zm1.5 1.5v3h3v-3h-3zM9 9h6v6H9V9zm1.5 1.5v3h3v-3h-3z"
					></path>
				</svg>
			</button>
		</div>
		<div v-if="viewList">
			<ListView
				v-for="(data, i) in renderTypes"
				:key="data.id"
				:indx="i"
				:renderTypes="renderTypes"
				:data="data"
				:diskografiPage="diskografiPage"
				:viewList="viewList"
				@visToggleHeaderDisko="visToggleHeaderDiskoFunc"
				@toggleHeaderDisko="toggleHeaderDiskoFunc"
				@sectionTitle="diskoSectionName"
				@selectedArtistName2="selectedArtsitNameFunc"
			/>
		</div>

		<div v-if="viewCard">
			<CardView
				v-for="(data, i) in renderTypes"
				:key="data.id"
				:indx="i"
				:renderTypes="renderTypes"
				:data="data"
				:viewCard="viewCard"
				:diskografiPage="diskografiPage"
			/>
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
			selected: {},
			viewList: true,
			viewCard: false,
			margin: false,
			selectedType: '',
			renderTypes: [],
		};
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
	},
	methods: {
		toggleView(_, e) {
			if (e.target.closest('.view-list')) {
				this.viewList = true;
				this.viewCard = false;
			} else {
				this.viewCard = true;
				this.viewList = false;
			}
		},
		selectedTypeFunc(name) {
			console.log(name);
			this.selected = name;
			for (const select in this.selected) {
				this.selected[select] === true ? (this.selectedType = select) : '';
			}
			console.log(this.selectedType);
			this.renderSelectedType();
		},
		toggleHeaderDiskoFunc(value) {
			this.$emit('toggleHeaderDisko', value);
		},
		visToggleHeaderDiskoFunc(value) {
			this.$emit('visToggleHeaderDisko', value);
		},
		diskoSectionName(name) {
			this.$emit('sectionTitle', name);
		},
		selectedArtsitNameFunc(name) {
			this.$emit('selectedArtistName', name);
		},

		renderSelectedType() {
			switch (this.selectedType) {
				case 'all':
					this.renderTypes = this.artistPublications;
					break;
				case 'album':
					this.renderTypes = this.artistAlbums;
					break;
				case 'singles':
					this.renderTypes = this.artistSingles;
					break;
				case 'compilations':
					this.renderTypes = this.artistCompilations;
					break;
				default:
					console.log(`Sorry, we are out of type`);
			}
		},
	},

	mounted() {
		this.diskografiPage = true;
		this.renderTypes = this.artistPublications;
	},
	updated() {
		console.log(this.selected);
	},
};
</script>

<style></style>
