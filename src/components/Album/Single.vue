<template>
	<section>
		<section class="single--page">
			<div
				id="singlePage"
				class="p-5 max-h-[800px] min-h-[340px] w-full mt-[-66px] relative bg-orange2 shadow-[2px_0px_5px_5px_rgba(0,0,0,0.4)] bg-gradient-to-b from-darkpurple via-purpl4 to-dark-1"
				style="height: 326px"
			>
				<div class="flex items-end justify-start h-full lg:ml-[1rem]">
					<div
						class="flex sm:w-[192px] sm:min-w-[192px] xl:h-[232px] xl:w-[232px] xl:min-w-[232px] shadow-[0_8px_40px_10px_rgba(0,0,0,0.6)] rounded-[12px]"
					>
						<img
							class="object-cover h-full w-full"
							src="https://i.scdn.co/image/ab67616d00001e02b437ee27293d4669d7f40248"
							alt="single"
						/>
					</div>
					<div class="flex flex-col text-white font-semibold px-4">
						<h2 class="">SINGLE</h2>
						<span>
							<h1
								class="w-full sm:text-3xl md:text-5xl xl:text-8xl tracking-tighter py-2"
							>
								SINGLE ADI
							</h1>

							<h2 id="info"></h2>
						</span>
						<div
							class="flex items-center flex-wrap mt-2 text-white w-full text-xs sm3:text-sm h-full font-semibold"
						>
							<div class="flex items-center flex-nowrap shrink-0">
								<span class="flex items-center w-full gap-x-2">
									<img
										src="https://i.scdn.co/image/ab6761610000f1789b494e739143983605696170"
										alt="sanatçı adı"
										class="w-[1.6rem] h-[1.6rem] rounded-xl"
									/>
									<a href="#">Sanatçı adı</a>
								</span>
							</div>
							<div>
								<span class="before:content-['•'] before:mx-2">2017</span>
								<span class="before:content-['•']">20 şarkı,</span>
								<span class="text-sm ml-2 text-opacwhite5">2 sa 10 dk</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div
				class="absolute w-full h-[212px] left-0 shrink-0 z-0 bg-gradient-to-b from-orange3 dark"
			></div>

			<div class="w-full h-[6.8rem] relative flex items-start py-[24px]">
				<div class="w-full ml-[1.2rem] flex items-center lg:ml-[2rem]">
					<button class="rounded-full bg-green3 p-[0.9rem] cursor-default">
						<span>
							<svg
								role="img"
								height="28"
								width="28"
								viewBox="0 0 24 24"
								class=""
							>
								<path
									fill="currentColor"
									d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"
								></path>
							</svg>
							<svg
								role="img"
								height="28"
								width="28"
								viewBox="0 0 24 24"
								class="hidden"
							>
								<path
									d="M5.7 3a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7H5.7zm10 0a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7h-2.6z"
								></path>
							</svg>
						</span>
					</button>
					<div>
						<button
							class="p-[0.9rem] ml-4 mx-1 text-lightest cursor-default hover:text-white"
						>
							<svg role="img" height="32" width="32" viewBox="0 0 24 24">
								<path
									fill="currentColor"
									d="M5.21 1.57a6.757 6.757 0 016.708 1.545.124.124 0 00.165 0 6.741 6.741 0 015.715-1.78l.004.001a6.802 6.802 0 015.571 5.376v.003a6.689 6.689 0 01-1.49 5.655l-7.954 9.48a2.518 2.518 0 01-3.857 0L2.12 12.37A6.683 6.683 0 01.627 6.714 6.757 6.757 0 015.21 1.57zm3.12 1.803a4.757 4.757 0 00-5.74 3.725l-.001.002a4.684 4.684 0 001.049 3.969l.009.01 7.958 9.485a.518.518 0 00.79 0l7.968-9.495a4.688 4.688 0 001.049-3.965 4.803 4.803 0 00-3.931-3.794 4.74 4.74 0 00-4.023 1.256l-.008.008a2.123 2.123 0 01-2.9 0l-.007-.007a4.757 4.757 0 00-2.214-1.194z"
								></path>
							</svg>
						</button>
						<button
							@click="toggleAppOptions"
							class="text-lightest cursor-default w-fit relative hover:text-white"
						>
							<svg
								role="img"
								height="32"
								width="32"
								viewBox="0 0 24 24"
								class="hover:text-white pointer-events-none"
							>
								<path
									fill="currentColor"
									d="M4.5 13.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm15 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm-7.5 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
								></path>
							</svg>
						</button>
						<AppOptions
							:singlePage="singlePage"
							v-if="appOptions"
							:appOptions="appOptions"
							@toggleAppOptions="toggleAppOptions"
						/>
					</div>
				</div>
			</div>

			<div
				:class="{ 'mx-5': margin }"
				class="playlistContainer relative h-full min-w-[450]"
			>
				<div
					class="w-[100%] presentation py-1 border-b border-opacwhite overflow-hidden pl-[1.4rem] sticky top-[64px] lg:pl-[2.2rem] z-30"

				>
					<div :class="{ 'mx-5': !margin }">
						<div
							class="grid sm:grid-cols-colPreDisco text-lightest text-xs sm3:text-sm items-center min-w-[300px] gap-2"
						>
							<div class="text-lg flex justify-start items-end h-full w-full">
								#
							</div>
							<div class="">BAŞLIK</div>

							<div
								class="flex items-center justify-end w-full h-full sm:pr-4 sm:pr-14 md2:pr-[3.3rem]"
							>
								<div class="flex items-start">
									<svg
										role="img"
										height="16"
										width="16"
										viewBox="0 0 16 16"
										class=""
									>
										<path
											fill="currentColor"
											d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8z"
										></path>
										<path
											fill="currentColor"
											d="M8 3.25a.75.75 0 01.75.75v3.25H11a.75.75 0 010 1.5H7.25V4A.75.75 0 018 3.25z"
										></path>
									</svg>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="pt-[10px] w-full">
					<div class="playlists h-fit w-full text-lightest">
						<slot name="playlistItems">
							<PlaylistItems
								v-for="(single, i) in artAlbums"
								:key="single.id"
								:id="single.id"
								:single="single"
								:index="i"
								:singlePage="singlePage"
								:margin="margin"
							>
								<template v-slot:trackName
									><span> {{ single.trackName }}</span></template
								>
								<template v-slot:artist
									><router-link to="/artist/id">
										{{ single.artist }}</router-link
									></template
								>
								<template v-slot:duration>{{ single.duration }}</template>
							</PlaylistItems>
						</slot>
					</div>
				</div>
			</div>

			<div class="text-lightest text-[11px] mt-10 sm:ml-5 lg:ml-[2.4rem]">
				<div>
					<p>1 Ocak 2013</p>
					<div>
						<p>© 2013 Aftermath Records</p>
						<p>℗ 2013 Aftermath Records</p>
					</div>
				</div>
			</div>

			<!-- More Singles -->
			<section class="sm:pl-5 lg:p-5 lg:ml-[1rem] mt-10">
				<div class="relative">
					<div class="flex justify-between items-stretch h-[2.8rem]">
						<div class="h-fit flex-end">
							<h2
								class="text-[1.5rem] text-white leading-7 tracking-tight hover:underline hover:text-underline-offset-8 font-semibold cursor-pointer"
							>
								Daha fazla Eminem
							</h2>
						</div>
						<div class="self-center">
							<h6
								@click="toggleDiskografiPage"
								class="h-full mb:text-xs sm3:text-sm font-semibold leading-10 text-lightest hover:underline underline-offset-2 uppercase cursor-pointer"
							>
								DİSKOGRAFİYE BAK
							</h6>
						</div>
					</div>

					<!-- Cards -->
					<div class="my-5">
						<div
							class="relative grid grid-cols-col100 gap-x-6 grid-rows-1 auto-rows-0 overflow-hidden"
						>
							<div
								v-for="song in 10"
								:key="song"
								class="bg-dark1 hover:bg-opacblack1 ease duration-300 w-full h-auto cursor-pointer rounded-md flex-1 isolate p-4 relative"
							>
								<div class="h-full group">
									<div class="w-full mb-2 relative">
										<img
											class="h-full w-full object-cover"
											src="https://i.scdn.co/image/ab67706f00000003a436e3f6117f461ea879c8a2"
											alt=""
										/>
										<div
											class="right-0 bottom-0 p-2 absolute flex items-center right-0 bottom-0 py-1 px-2 group-hover:block opacity-0 group-hover:opacity-100 transition ease-in duration-200 group-hover:translate-y-[-0.4rem]"
										>
											<button
												class="p-3 bg-green3 rounded-full cursor-default lg:group-hover:block hover:scale-105 shadow-[0px_5px_6px_2px_rgba(0,0,0,0.4)]"
											>
												<span>
													<svg
														role="img"
														height="24"
														width="24"
														viewBox="0 0 24 24"
													>
														<path
															fill="text-black"
															d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"
														></path>
													</svg>
												</span>
											</button>
										</div>
									</div>
									<div class="flex items-middle flex-col justify-center">
										<div
											class="text-white max-w-full truncate mb-2 font-semibold"
										>
											Recovery
										</div>
										<div class="text-sm text-lightest w-full">2022</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<Info />
			</section>
		</section>
	</section>
</template>

<script>
import PlaylistItems from '../FavoriteSongs/PlaylistItems.vue';
import Info from '../SpotifyInfo/Info.vue';
import AppOptions from '../AppOptions/AppOptions.vue';

export default {
	components: { PlaylistItems, Info, AppOptions },
	props: ['singlesPage'],
	data() {
		return {
			appOptions: false,
			singlePage: false,
			margin: true,
			options2: '',
			observer2: null,
			presentation: null,
			headerHeight: document.getElementById('header').getBoundingClientRect()
				.height,
			bodyHeight: document.body.getBoundingClientRect().height,
			bodyWidth: document.body.getBoundingClientRect().width,
			artAlbums: [
				{
					trackName: 'Breathing Ben Böhmer Ben BöhmerBen BöhmerBen Böhmer',
					artist: 'Ben Böhmer',
					albumName: 'Begin Again',
					duration: '03:25',
					favTime: '13 gün önce',
					id: 1,
				},
				{
					trackName: 'Turnalar',
					artist: 'Murat Kekilli',
					albumName: 'Albüm adı-1',
					duration: '03:25',
					favTime: '13 gün önce',
					id: 2,
				},
			],
		};
	},
	methods: {
		toggleAppOptions() {
			this.appOptions = !this.appOptions;
		},

		resizeOption2(options) {
			if (window.innerHeight - 92 <= 64) {
				this.info = window.innerHeight - 92;
				this.bodyHeight = +window.innerHeight - 92;

				return;
			}
			this.info = window.innerHeight - 92;
			this.bodyHeight = +window.innerHeight - 92;
			this.bodyWidth = +window.innerWidth - 92;

			document.getElementById('info').textContent = this.info;

			this.observer2 ? this.observer2.unobserve(this.presentation) : '';

			return options;
		},
	},
	watch: {
		bodyHeight(newVal, oldVal) {
			if (newVal !== oldVal) {
				this.bodyHeight = +newVal;
				this.bodyHeight = +this.bodyHeight.toFixed(1);
				this.options2 = {
					root: document.body,
					threshold: 0,
					rootMargin: `${
						+((this.headerHeight * 100) / this.bodyHeight).toFixed(1) * -1
					}% 0px -${
						100 - +((this.headerHeight * 100) / this.bodyHeight).toFixed(1)
					}% 0px`,
				};

				this.observer2
					? (this.observer2 = new IntersectionObserver(entries => {
							if (entries[0].isIntersecting) {
								this.presentation.classList.add('prebg');
								this.margin = false;
							} else {
								this.presentation.classList.remove('prebg');
								this.margin = true;
							}
					  }, this.resizeOption2(this.options2)))
					: '';
				this.presentation ? this.observer2.observe(this.presentation) : '';
			}
		},
		bodyWidth(newVal, oldVal) {
			if (newVal !== oldVal) {
				this.observer2
					? (this.observer2 = new IntersectionObserver(entries => {
							if (entries[0].isIntersecting) {
								this.presentation.classList.add('prebg');
								this.margin = false;
							} else {
								this.presentation.classList.remove('prebg');
								this.margin = true;
							}
					  }, this.resizeOption2(this.options2)))
					: '';
				this.presentation ? this.observer2.observe(this.presentation) : '';
			}
		},
	},

	mounted() {
		window.addEventListener('resize', this.resizeOption2);
		this.singlePage = true;

		console.log('singlesPage Mounted');
		this.$emit('visToggleHeaderBtn', true);

		this.header = document.getElementById('header');
		this.singleEl = document.getElementById('singlePage');
		this.presentation = document.querySelector('.presentation');

		this.options = {
			root: null,
			threshold: [0.1, 0.4],
		};

		this.observer = new IntersectionObserver(entries => {
			console.log(entries);
			this.header.classList.toggle(
				'fav-songs-intersec-bg1',
				entries[0].intersectionRatio <= 0.4
			);
			this.header.classList.toggle(
				'fav-songs-intersec-bg2',
				entries[0].intersectionRatio <= 0.1
			);

			entries[0].intersectionRatio >= 0.1
				? this.$emit('toggleHeaderBtn', false)
				: this.$emit('toggleHeaderBtn', true);
		}, this.options);
		console.log(this.observer);

		this.observer.observe(this.singleEl);

		this.options2 = {
			root: document.body,
			threshold: 0,
			rootMargin: `${
				+((this.headerHeight * 100) / this.bodyHeight).toFixed(1) * -1
			}% 0px -${
				100 - +((this.headerHeight * 100) / this.bodyHeight).toFixed(1)
			}% 0px`,
		};

		this.observer2 = new IntersectionObserver((entries, obs) => {
			if (entries[0].isIntersecting) {
				console.log('intersect', obs);
				this.presentation.classList.add('prebg');
				this.margin = false;
			} else {
				console.log('notintersect', obs);
				this.presentation.classList.remove('prebg');
				this.margin = true;
			}
		}, this.options2);

		this.observer2.observe(this.presentation);
	},

	beforeUnmount() {
		window.removeEventListener('resize', this.resizeOption2);
		this.observer.unobserve(this.singleEl);
		this.observer2.unobserve(this.presentation);
		this.presentation.classList.remove('prebg');
		this.header.classList.remove('fav-songs-intersec-bg1');
		this.header.classList.remove('fav-songs-intersec-bg2');
		this.$emit('visToggleHeaderBtn', false);
		this.singlePage = false;
	},
};
</script>

<style></style>
