<template>
	<section class="diskografi relative min-w-[100px]" style="heigth: 100vh">
		<div
			id="diskoHeader"
			class="relative flex items-center justify-between lg:px-8 px-5 w-full py-1 sticky top-[64px]"
			style="z-index: 102"
		>
			<div class="text-white w-full font-semibold text-2xl">
				<a class="hover:underline" href="#">{{ selectArtCardName }}</a>
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

		<CardView v-if="viewCard" :viewCard="viewCard" />
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
	props: ['diskografiPage', 'selectArtCardName'],
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
			selectedType: '',
			renderTypes: [],
			albums: [],
			singles: [],
			artAlbums: [
				{
					trackName: 'Breathing Ben Böhmer Ben BöhmerBen BöhmerBen Böhmer',
					artist: 'Ben Böhmer',
					albumName: 'Begin Again',
					duration: '03:25',
					favTime: '13 gün önce',
					type: 'single',
					id: 1,
				},
				{
					trackName: 'Turnalar',
					artist: 'Murat Kekilli',
					albumName: 'Albüm adı-1',
					duration: '03:25',
					favTime: '13 gün önce',
					type: 'album',
					id: 2,
				},
				{
					trackName: 'Empty Floor',
					artist: 'Jan Blomqvist',
					albumName: 'Disconnected',
					duration: '03:25',
					favTime: '13 gün önce',
					type: 'album',
					id: 3,
				},
				{
					trackName: 'deneneme Floor',
					artist: 'yusuf  Blomqvist',
					albumName: 'Kuşlar',
					duration: '03:45',
					favTime: '12 gün önce',
					type: 'album',
					id: 4,
				},

				{
					trackName: 'mehmet Floor',
					artist: 'yusuf  Blomqvist',
					albumName: 'Çiçekler',
					duration: '03:45',
					favTime: '12 gün önce',
					type: 'single',
					id: 5,
				},

				{
					trackName: 'yusuf Floor',
					artist: 'yusuf  Blomqvist',
					albumName: 'Gökyüzü MAVİ',
					duration: '03:45',
					favTime: '12 gün önce',
					type: 'album',
					id: 6,
				},

				{
					trackName: 'kuşlar kuşlar',
					artist: 'yusuf  Blomqvist',
					albumName: 'Kuşlar Uçuyor',
					duration: '03:45',
					favTime: '12 gün önce',
					type: 'album',
					id: 7,
				},

				{
					trackName: 'yapraklar',
					artist: 'yusuf  Blomqvist',
					albumName: 'SONBAHAR',
					duration: '03:45',
					favTime: '12 gün önce',
					type: 'album',
					id: 8,
				},
			],
		};
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
					this.renderTypes = this.artAlbums;
					break;
				case 'album':
					this.albums = this.artAlbums.filter(album => album.type === 'album');
					console.log(this.albums);
					this.renderTypes = this.albums;
					break;
				case 'singles':
					this.singles = this.artAlbums.filter(
						single => single.type === 'single'
					);
					console.log(this.singles);

					this.renderTypes = this.singles;
					break;
				case 'compilations':
					this.singles = this.artAlbums.filter(
						single => single.type === 'single'
					);
					this.renderTypes = this.singles;
					break;
				default:
					console.log(`Sorry, we are out of ${expr}.`);
			}
		},
	},

	mounted() {
		this.diskografiPage = true;
		this.renderTypes = this.artAlbums;
	},
	updated() {
		console.log(this.selected);
	},
};
</script>

<style></style>
