<template>
	<section class="episode--page">
		<div
			id="episodePage"
			class="p-5 h-[326px] max-h-[800px] min-h-[340px] w-full mt-[-66px] relative shadow-[2px_0px_5px_5px_rgba(0,0,0,0.4)]"
			:style="{ '--bgEpisodeImage': `url(${episodeImage})` }"
		>
			<div class="relative flex items-end justify-start h-full lg:ml-[1rem]">
				<div
					class="flex sm:w-[192px] sm:min-w-[192px] xl:h-[232px] xl:w-[232px] xl:min-w-[232px] shadow-[0_8px_40px_10px_rgba(0,0,0,0.6)] rounded-[12px]"
				>
					<img
						class="object-cover h-full w-full rounded-[12px]"
						:src="episodeImage"
						alt="single"
					/>
				</div>
				<div class="flex flex-col text-white font-semibold px-4">
					<h2 class="text-sm tracking-tighter uppercase">podcast bölümü</h2>
					<h1
						class="w-full sm:text-2xl md:text-4xl lg:text-5xl lg3:text-6xl xl:text-7xl xl2:text-8xl tracking-tighter py-2 cursor-default"
					>
						{{ currentEpisode.name }}
					</h1>
					<div
						class="flex flex-wrap mt-2 text-white w-full text-xs sm3:text-sm h-full font-semibold"
					>
						<div class="flex items-center flex-nowrap shrink-0">
							<span class="flex items-center">
								<router-link
									:to="{ name: 'show', params: { id: currentEpisode.show.id } }"
									class="hover:underline sm:text-xl md:text-2xl tracking-tighter py-2"
								>
									{{ currentEpisode.show.name }}
								</router-link>
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div
			class="relative flex items-center text-opacwhite3 font-semibold text-sm sm:pl-4 sm:pt-6 lg:pl-8"
		>
			<div class="flex items-center">
				<p class="">{{ currentReleaseDate() }}</p>
				<p class="before:content-['·'] before:px-1">
					<span v-if="!ifPlayed && !resumePosition">
						{{
							totalDuration(
								ifPlayed,
								currentEpisode.duration_ms,
								resumePosition
							)
						}}</span
					>
					<span v-if="!ifPlayed && resumePosition">
						{{
							totalDuration(
								ifPlayed,
								currentEpisode.duration_ms,
								resumePosition
							)
						}}</span
					>
					<span v-else-if="ifPlayed" class=""> Çalındı</span>
				</p>
			</div>
			<div v-if="ifPlayed" class="px-2">
				<svg
					role="img"
					height="16"
					width="16"
					class="text-podcastGreen5"
					viewBox="0 0 16 16"
				>
					<path
						fill="currentColor"
						d="M15.53 2.47a.75.75 0 010 1.06L4.907 14.153.47 9.716a.75.75 0 011.06-1.06l3.377 3.376L14.47 2.47a.75.75 0 011.06 0z"
					></path>
				</svg>
			</div>
			<div
				v-else-if="resumePosition"
				class="episode--bar--wrapper ml-3 h-4 flex items-center"
			>
				<div
					id="episode-bar"
					class="group relative w-[5.8rem] max-w-[85px] h-1 bg-opacwhite2 rounded-full"
				>
					<span
						:style="{
							width:
								episodeBarProgress(currentEpisode.duration_ms, resumePosition) +
								'%',
						}"
						class="absolute bg-white max-w-[85px] h-1 absolute rounded-full"
					>
					</span>
				</div>
			</div>
		</div>

		<div class="w-full h-[6.8rem] relative flex items-start py-[24px]">
			<div class="w-full ml-[1.2rem] flex items-center lg:ml-[2rem]">
				<button class="rounded-full bg-green3 p-[0.9rem] cursor-default">
					<span>
						<svg role="img" height="28" width="28" viewBox="0 0 24 24" class="">
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
						@click="addRemoveEpisode"
						class="p-[0.9rem] ml-4 mx-1 text-lightest cursor-default hover:text-white"
					>
						<svg
							v-if="currentEpisodeIsFav"
							role="img"
							height="32"
							width="32"
							viewBox="0 0 24 24"
							class="text-green3"
						>
							<path
								fill="currentColor"
								d="M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12zm16.398-2.38a1 1 0 00-1.414-1.413l-6.011 6.01-1.894-1.893a1 1 0 00-1.414 1.414l3.308 3.308 7.425-7.425z"
							></path>
						</svg>
						<svg v-else role="img" height="32" width="32" viewBox="0 0 24 24">
							<path
								fill="currentColor"
								d="M11.999 3a9 9 0 100 18 9 9 0 000-18zm-11 9c0-6.075 4.925-11 11-11s11 4.925 11 11-4.925 11-11 11-11-4.925-11-11z"
							></path>
							<path
								fill="currentColor"
								d="M17.999 12a1 1 0 01-1 1h-4v4a1 1 0 11-2 0v-4h-4a1 1 0 110-2h4V7a1 1 0 112 0v4h4a1 1 0 011 1z"
							></path>
						</svg>
					</button>
					<button
						@click="toggleEpisodeOptions"
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
					<EpisodeOptions
						v-if="episodeOptions"
						:episodePage="episodePage"
						@toggleEpisodeOptions="toggleEpisodeOptionsFunc"
					/>
				</div>
			</div>
		</div>

		<div class="content--spacing sm:pl-4 lg:pl-8">
			<h2
				class="text-white1 text-2xl py-[16px] tracking-tighter"
				style="font-weight: 700"
			>
				Bölüm Açıklaması
			</h2>
			<div
				id="episode--description"
				class="absolute hidden text-lightest max-w-[45rem]"
			></div>

			<div class="py-[16px] relative text-lightest max-w-[45rem]">
				<p id="episode--description1"></p>
				<button v-if="seeMoreBtn" @click="toggleDescription">
					<span
						v-if="!toggle"
						class="text-white font-semibold cursor-pointer"
						>{{ more }}</span
					>
					<p
						v-else
						class="absolute bottom-[-5px] left-[-2px] text-white font-semibold cursor-pointer w-[8rem] hover:underline"
					>
						{{ less }}
					</p>
				</button>
			</div>

			<div class="my-10 relative">
				<div class="hover:scale-105 absolute">
					<router-link
						:to="{ name: 'show', params: { id: currentEpisode?.show.id } }"
						class="text-white border-textColor hover:border-white border-[1px] rounded-full px-4 py-1 text-sm"
						style="font-weight: 700"
						>Bölümlerin hepsini gör</router-link
					>
				</div>
			</div>

			<div v-if="false" class="mt-[7rem]">
				<h2
					class="text-white text-2xl tracking-tighter my-8"
					style="font-weight: 700"
				>
					Şunlardan da hoşlanabilirsin
				</h2>

				<div class="grid grid-cols-colEpisode grid-rows-auto gap-6">
					<div
						v-for="data in 8"
						:key="data"
						class="bg-dark1 hover:bg-opacblack1 ease duration-300 w-full cursor-pointer rounded-md flex-1 isolate p-4 relative"
					>
						<div class="h-full rounded-md">
							<div class="w-full mb-5 relative">
								<img
									class="h-[130px] w-[130px] object-cover rounded-md"
									src="https://i.scdn.co/image/ab67656300005f1f3b34c43eca7241253bc81fab"
									alt=""
								/>
								<div
									class="absolute bottom-[-0.6rem] left-[-0.5rem] rounded-md"
								>
									<img
										class="h-[40px] w-[40px] object-cover rounded-md"
										src="	https://i.scdn.co/image/ab6765630000f68df27d822aaea4e886ebfd5668"
										alt=""
									/>
								</div>
							</div>

							<div class="flex items-center justify-around flex-col h-[3rem]">
								<div
									class="text-white max-w-full truncate text-[17px] font-semibold"
								>
									Değersizlik Duygusu
								</div>
								<div class="text-xs text-lightest font-semibold w-full">
									<span>21 May</span>
									<span class="before:content-['·'] before:px-2">21 Dk</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
	<section class="sm:pl-5 lg:p-5 lg:ml-[1rem]">
		<Info />
	</section>
</template>

<script>
import Info from '../SpotifyInfo/Info.vue';
import EpisodeOptions from '../Podcast/EpisodeOptions.vue';
import axios from 'axios';

export default {
	name: 'EpisodePage',
	components: { Info, EpisodeOptions },
	props: {
		id: {
			type: String,
			required: true,
		},
	},
	data() {
		return {
			episodePage: false,
			episodeOptions: false,
			toggle: false,
			seeMoreBtn: true,
			more: '... daha fazlasını göster',
			less: 'daha azını göster',
		};
	},
	computed: {
		isAuth() {
			return this.$store.getters.isAuth;
		},
		getToken() {
			return this.$store.getters.accessToken;
		},
		currentEpisode() {
			return this.$store.getters['episodes/getCurrentEpisode'];
		},
		currentEpisodeIsFav() {
			return this.$store.getters['episodes/getCurrentEpisodeIsFav'];
		},
		episodeImage() {
			return this.currentEpisode?.images[0]?.url;
		},

		ifPlayed() {
			return this.currentEpisode?.resume_point?.fully_played;
		},
		resumePosition() {
			return this.currentEpisode?.resume_point?.resume_position_ms;
		},

		getMonths() {
			return this.$store.getters['controller/getMonths'];
		},
	},
	methods: {
		async fetchFavEpisodes() {
			return await axios
				.get('https://api.spotify.com/v1/me/episodes?limit=50', {
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + (await this.getToken),
					},
				})
				.then(({ data }) => {
					console.log(data);
					this.$store.dispatch('episodes/favEpisodes', data);
				})
				.catch(err => console.log(err));
		},
		async fetchEpisode() {
			await axios
				.get('https://api.spotify.com/v1/episodes/' + this.$route.params.id, {
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + (await this.getToken),
					},
				})
				.then(({ data }) => {
					console.log(data);
					this.$store.dispatch('episodes/currentEpisode', data);
				})
				.catch(err => console.log(err));
		},
		async checkUserFavEpisode() {
			await axios
				.get(
					'https://api.spotify.com/v1/me/episodes/contains?ids=' +
						this.$route.params.id,
					{
						headers: {
							Accept: 'application/json',
							'Content-Type': 'application/json',
							Authorization: 'Bearer ' + (await this.getToken),
						},
					}
				)
				.then(({ data }) => {
					this.$store.dispatch('episodes/currentEpisodeIsFav', ...data);
				})
				.catch(err => console.log(err));
		},
		async addEpisode() {
			await fetch(
				'https://api.spotify.com/v1/me/episodes?ids=' + this.$route.params.id,
				{
					method: 'PUT',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + (await this.getToken),
					},
				}
			)
				.then(data => {
					console.log(data.status);
					if (data.status === 200) this.checkUserFavEpisode();
				})
				.catch(err => console.log(err));
		},
		async deleteEpisode() {
			await axios
				.delete(
					'https://api.spotify.com/v1/me/episodes?ids=' + this.$route.params.id,
					{
						headers: {
							Accept: 'application/json',
							'Content-Type': 'application/json',
							Authorization: 'Bearer ' + (await this.getToken),
						},
					}
				)
				.then(data => {
					console.log(data.status);
					if (data.status === 200) this.checkUserFavEpisode();
				})
				.catch(err => console.log(err));
		},

		htmlDescription() {
			const descriptionEl = document.getElementById('episode--description');
			const descriptionEl1 = document.getElementById('episode--description1');

			descriptionEl.innerHTML = `${this.currentEpisode.html_description}`;

			const pTagsArr = [...descriptionEl.getElementsByTagName('p')];
			if (pTagsArr.length) {
				descriptionEl1.innerHTML = `${pTagsArr[0].innerHTML}`;
			} else {
				descriptionEl1.innerHTML = this.currentEpisode.description;
				this.seeMoreBtn = false;
			}
			if (this.toggle) {
				descriptionEl1.innerHTML = `${this.currentEpisode.html_description}`;
				const aTagsArr = [...descriptionEl1.getElementsByTagName('a')];
				if (aTagsArr.length) {
					aTagsArr.forEach(tag => {
						tag.style.color = '#ffffff';
						tag.style.fontWeight = '600';
						tag.style.textDecoration = 'underline';
					});
				}
			}
		},
		currentReleaseDate() {
			const day = new Date(this.currentEpisode?.release_date).getDate();

			const month =
				this.getMonths[new Date(this.currentEpisode?.release_date).getMonth()];
			return `${day} ${month} `;
		},
		totalDuration(played, duration, resume = false) {
			const totalMiliSeconds = duration - resume;

			const hours = Math.floor(totalMiliSeconds / 1000 / 60 / 60);

			const minutes = () => {
				if (totalMiliSeconds > 3600000) {
					return Math.abs(
						Math.floor((totalMiliSeconds / 1000 / 60 / 60 - hours) * 60)
					);
				} else {
					return Math.floor((totalMiliSeconds / 1000 / 60 / 60) * 60);
				}
			};
			const seconds = Math.abs(
				Math.floor(((totalMiliSeconds / 1000 / 60 / 60) * 60 - minutes()) * 60)
			);

			const result = () => {
				if (played && resume) {
					if (totalMiliSeconds > 3600000) {
						return hours + ' sa. ' + minutes() + ' dk.' + ' kaldı';
					} else {
						return minutes() + ' dk. ' + seconds + ' sn.' + ' kaldı';
					}
				} else if (!played && !resume) {
					if (totalMiliSeconds > 3600000) {
						return hours + ' sa. ' + minutes() + ' dk.';
					} else {
						return minutes() + ' dk. ' + seconds + ' sn.';
					}
				} else if (!played && resume) {
					if (totalMiliSeconds > 3600000) {
						return hours + ' sa. ' + minutes() + ' dk.' + ' kaldı';
					} else {
						return minutes() + ' dk. ' + seconds + ' sn.' + ' kaldı';
					}
				} else if (played) {
					if (totalMiliSeconds > 3600000) {
						return hours + ' sa. ' + minutes() + ' dk.';
					} else {
						return minutes() + ' dk. ' + seconds + ' sn.';
					}
				}
			};
			return result();
		},
		episodeBarProgress(duration, resume) {
			return (100 * resume) / duration;
		},

		toggleDescription() {
			this.toggle = !this.toggle;
			this.htmlDescription();
		},
		toggleEpisodeOptions() {
			this.episodeOptions = !this.episodeOptions;
		},
		toggleEpisodeOptionsFunc(val) {
			this.episodeOptions = val;
		},

		async addRemoveEpisode() {
			if (this.currentEpisodeIsFav) {
				await this.deleteEpisode();
				await this.fetchFavEpisodes();
			} else {
				await this.addEpisode();
				await this.fetchFavEpisodes();
			}
		},
	},

	async created() {
		console.log('EpisodePage Mounted!');
		this.episodePage = true;

		await this.fetchEpisode();
		await this.checkUserFavEpisode();

		this.header = document.getElementById('header');
		this.episodeEl = document.getElementById('episodePage');
		this.htmlDescription();

		this.options = {
			root: null,
			threshold: [0.1, 0.4],
		};

		this.observer = new IntersectionObserver(entries => {
			this.header.classList.toggle(
				'podcast-intersec-bg1',
				entries[0].intersectionRatio <= 0.4
			);
			this.header.classList.toggle(
				'podcast-intersec-bg2',
				entries[0].intersectionRatio <= 0.1
			);

			entries[0].intersectionRatio >= 0.1
				? this.$store.dispatch('controller/closeHeaderBtn')
				: this.$store.dispatch('controller/showHeaderBtn');
		}, this.options);

		this.observer.observe(this.episodeEl);
	},

	beforeUnmount() {
		this.observer.unobserve(this.episodeEl);
		this.header.classList.remove('podcast-intersec-bg1');
		this.header.classList.remove('podcast-intersec-bg2');
		this.episodePage = false;
	},
};
</script>

<style scoped lang="scss">
#episodePage {
	&::before {
		content: '';
		position: absolute;
		z-index: 0;
		top: 0;
		left: 0;
		background-size: cover;
		background-position: top;
		background-image: var(--bgEpisodeImage);
		filter: blur(7rem);
		width: 110%;
		height: 100%;
		opacity: 0.8;
	}
}
</style>
