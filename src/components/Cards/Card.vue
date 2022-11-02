<template>
	<section class="mb-12 relative z-70">
		<div class="flex justify-between h-[3.3rem]">
			<div class="h-fit flex flex-col gap-1">
				<h2
					class="text-[1.5rem] text-white leading-7 tracking-tight hover:underline hover:text-underline-offset-8 cursor-pointer"
					style="font-weight: 700"
				>
					<slot name="cardTitle"></slot>
				</h2>
				<h6 v-if="userPage" class="text-lightest text-sm">
					Yalnızca sana görünür
				</h6>
			</div>
			<div class="">
				<h6
					style="font-weight: 600"
					class="h-full mb:text-[10px] md:text-[12px] text-lg leading-10 text-lightest hover:underline hover:text-white uppercase cursor-pointer pb-2 tracking-widest"
				>
					<slot name="seeMore"> HEPSİNİ GÖR</slot>
				</h6>
			</div>
		</div>

		<div
			v-if="artistPage"
			class="relative w-full h-full grid col-span-full pb-5"
		>
			<div class="flex items-center justify-start text-sm">
				<button
					@click="togglePublications"
					:class="popPublications ? 'active' : 'inactive'"
					class="w-fit h-fit rounded-full px-3 py-[6px] cursor-default bg-dark2 hover:bg-dark3/70 transition duration-200"
				>
					<span>Popüler yayınlar</span>
				</button>
				<button
					@click="toggleAlbums"
					:class="albums ? 'active' : 'inactive'"
					class="w-fit h-fit rounded-full px-3 py-[6px] mx-2 cursor-default bg-dark2 hover:bg-dark3/70 transition duration-200"
				>
					<span>Albümler</span>
				</button>
				<button
					@click="toggleSingles"
					:class="singles ? 'active' : 'inactive'"
					class="w-fit h-fit rounded-full px-3 py-[6px] cursor-default bg-dark2 hover:bg-dark3/70 transition duration-200"
				>
					<span>Singlelar ve EPler</span>
				</button>
				<button
					v-if="isCompExist"
					@click="toggleCompilations"
					:class="compilations ? 'active' : 'inactive'"
					class="w-fit h-fit rounded-full px-3 py-[6px] cursor-default bg-dark2 hover:bg-dark3/70 transition duration-200 mx-2"
				>
					<span>Derlemeler</span>
				</button>
			</div>
		</div>
		<!-- Cards -->
		<div
			:class="{
				'mt-4': userPage,
				'auto-rows-auto gap-6': genrePage,
				'auto-rows-0 overflow-hidden grid-rows-1 gap-x-6': !genrePage,
			}"
			class="relative grid grid-cols-col180"
		>
			<div
				v-show="data"
				v-for="(data, i) in currentData"
				:key="data?.id"
				:id="shows ? data?.show.id : data?.id"
				:style="{ 'z-index': currentData.length - i }"
				class="card--container group bg-dark1 hover:bg-opacwhite1 ease duration-300 w-full cursor-pointer rounded-md flex-1 p-4 relative"
			>
				<div class="h-full w-full relative">
					<div
						:class="{
							'h-[65%] mb-[10%] w-full z-10': artists,
							'mb-5': !artists,
						}"
						class="w-full relative"
					>
						<slot name="imgContainer" :data="data"> </slot>
						<div
							v-if="!shows"
							class="right-0 bottom-0 absolute flex items-center py-1 px-2 group-hover:block opacity-0 group-hover:opacity-100 transition ease-in duration-200 group-hover:translate-y-[-0.4rem]"
						>
							<slot name="playBtn" :data="data">
								<button
									@click="playItems((uri = data?.uri), $event)"
									id="playBtn"
									class="p-3 bg-green3 rounded-full cursor-default lg:group-hover:block hover:scale-110 shadow-[0px_5px_6px_2px_rgba(0,0,0,0.4)]"
								>
									<span>
										<svg role="img" height="24" width="24" viewBox="0 0 24 24">
											<path
												fill="text-black"
												d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"
											></path>
										</svg>
									</span>
								</button>
							</slot>
						</div>
					</div>

					<div class="flex items-middle flex-col justify-center">
						<div class="text-white max-w-full text-base truncate font-semibold">
							<slot name="firstTitle" :data="data"></slot>
						</div>

						<div class="text-md text-lightest w-full line-clamp-2 mt-1">
							<slot name="secondTitle" :data="data"></slot>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	name: 'Card',
	props: [
		'currentData',
		'artistPage',
		'userPage',
		'shows',
		'genrePage',
		'popPublications',
		'albums',
		'singles',
		'artists',
		'compilations',
		'togglePublications',
		'toggleAlbums',
		'toggleSingles',
		'toggleCompilations',
	],
	data() {
		return {};
	},
	computed: {
		isCompExist() {
			return this.$store.getters['artists/isCompExist'];
		},
	},
	methods: {
		playItems(uri, e) {
			console.log(uri, e.target.closest('.card--container').id);
		},
	},

	mounted() {},
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
