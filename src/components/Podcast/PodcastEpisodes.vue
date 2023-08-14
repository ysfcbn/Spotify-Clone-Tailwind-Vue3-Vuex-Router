<template>
	<div
		:class="{
			' lg:mx-[1rem]': episodes,
			'hover:bg-opacwhite1': !isNextEpisode,
		}"
		class="sm:pl-[1.4rem] group max-w-[990px] min-w-[440px] shrink-0 hover:rounded-[4px] cursor-pointer relative z-100"
	>
		<hr
			v-if="!isNextEpisode"
			class="group-hover:invisible border border-white/10"
		/>
		<div
			:id="episode.id"
			@click="selectedEpisode(msg, $event)"
			:class="{ 'w-full': episodes }"
			class="episodeContainer grid grid-cols-colPodcast grid-rows-rowPodcast py-5"
		>
			<div
				v-if="!isNextEpisode"
				class="sm:row-span-1 md2:row-span-2 rounded-lg sm:w-[64px] sm:h-[64px] md2:w-[112px] md2:h-[112px] mr-[24px]"
			>
				<img
					class="w-[7rem] h-full rounded-lg"
					:src="episodeImage"
					alt="fatih acet"
				/>
			</div>

			<div
				class="text-white flex flex-col shrink-0 col-start-2 col-end-4 gap-1 pr-[2rem]"
			>
				<div v-if="isNextEpisode">
					<h4
						class="text-sm font-semibold text-lightest pb-1 grid row-start-0 col-start-1 col-end-4"
					>
						<span v-if="!episode.resume_point.resume_position_ms"
							>Sıradaki</span
						>
						<span v-else>Dinlemeye devam et</span>
					</h4>
				</div>
				<div class="flex">
					<span
						v-if="isNewEpisode()"
						class="w-2 h-2 bg-newEpisode mr-2 rounded-full self-start mt-2 shrink-0"
					></span>
					<router-link
						:to="{ name: 'episode', params: { id: episode.id } }"
						class="hover:underline"
					>
						<h4 class="text-base font-semibold">
							{{ episode.name }}
						</h4></router-link
					>
				</div>
				<div
					id="podcast"
					class="w-fit"
					v-if="!searchResult && !podcastShowPage"
				>
					<router-link
						:to="{ name: 'show', params: { id: episode.show.id } }"
						class="flex-start hover:underline"
						><h5 class="text-sm" style="font-weight: 700">
							{{ episode.show.name }}
						</h5>
					</router-link>
				</div>
			</div>

			<div
				:class="{ 'col-span-full': isNextEpisode }"
				class="description row-start-2 col-span-full sm:col-start-1 md2:col-start-2 col-end-4 pr-[2rem] pt-4"
			>
				<p class="text-lightest text-sm line-clamp-2">
					{{ episode.description }}
				</p>
			</div>
			<div
				class="row-start-2 mt-[4.5rem] sm:col-start-1 md2:col-start-2 col-end-3 flex items-center"
			>
				<div>
					<button
						id="play"
						:class="{ 'bg-white': !isNextEpisode, 'bg-green3': isNextEpisode }"
						class="items-center rounded-full w-fit p-[8px] cursor-default hover:scale-110"
					>
						<svg
							role="img"
							height="14"
							width="14"
							viewBox="0 0 16 16"
							class="hidden"
						>
							<path
								fill="#000"
								d="M2.7 1a.7.7 0 00-.7.7v12.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V1.7a.7.7 0 00-.7-.7H2.7zm8 0a.7.7 0 00-.7.7v12.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V1.7a.7.7 0 00-.7-.7h-2.6z"
							></path></svg
						><svg height="16" width="16" viewBox="0 0 16 16" class="">
							<path
								fill="#000"
								d="M3 1.713a.7.7 0 011.05-.607l10.89 6.288a.7.7 0 010 1.212L4.05 14.894A.7.7 0 013 14.288V1.713z"
							></path>
						</svg>
					</button>
				</div>
				<div class="text-lightest text-sm shrink-0">
					<div class="flex items-center font-semibold ml-5">
						<p class="pr-2">{{ currentReleaseDate() }}</p>
						<p
							v-if="!ifPlayed || (!podcastShowPage && !searchResult)"
							class="before:content-['·'] before:px-1"
						>
							<span>
								{{
									totalDuration(ifPlayed, episode.duration_ms, resumePosition)
								}}</span
							>
						</p>

						<div
							v-if="podcastShowPage && ifPlayed ? false : resumePosition"
							class="episode--bar--wrapper ml-3 h-4 flex items-center"
						>
							<div
								id="episode-bar"
								class="group relative w-[5.8rem] max-w-[85px] h-1 bg-opacwhite2 rounded-full"
							>
								<span
									:style="{
										width:
											episodeBarProgress(episode.duration_ms, resumePosition) +
											'%',
									}"
									class="absolute bg-white max-w-[85px] h-1 absolute rounded-full"
								>
								</span>
							</div>
						</div>

						<div
							v-else-if="
								(ifPlayed && podcastShowPage) || (searchResult && ifPlayed)
							"
							class="before:content-['·'] before:px-1 pr-2 flex items-center"
						>
							<span class="px-2">Played</span>

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
					</div>
				</div>
			</div>
			<div class="row-start-2 mt-[4.5rem] col-start-3">
				<div
					class="relative text-lightest flex items-center w-full justify-around"
				>
					<button
						id="share"
						class="hover:text-white cursor-default group-hover:visible invisible"
					>
						<span aria-hidden="true"
							><svg role="img" height="24" width="24" viewBox="0 0 24 24">
								<path
									fill="currentColor"
									d="M3 8a1 1 0 011-1h3.5v2H5v11h14V9h-2.5V7H20a1 1 0 011 1v13a1 1 0 01-1 1H4a1 1 0 01-1-1V8z"
								></path>
								<path
									fill="currentColor"
									d="M12 12.326a1 1 0 001-1V3.841l1.793 1.793a1 1 0 101.414-1.414L12 .012 7.793 4.22a1 1 0 101.414 1.414L11 3.84v7.485a1 1 0 001 1z"
								></path></svg
						></span></button
					><button
						@click="
							removeAddEpisode(
								(currentID = this.removeEpisodeOptionsFunc()),
								$event
							)
						"
						id="add-library"
						type="button"
						class="cursor-default"
					>
						<svg
							v-show="episodeIsFav"
							role="img"
							height="24"
							width="24"
							viewBox="0 0 24 24"
							class="text-green3"
						>
							<path
								fill="currentColor"
								d="M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12zm16.398-2.38a1 1 0 00-1.414-1.413l-6.011 6.01-1.894-1.893a1 1 0 00-1.414 1.414l3.308 3.308 7.425-7.425z"
							></path>
						</svg>
						<svg
							v-show="!episodeIsFav"
							role="img"
							height="24"
							width="24"
							viewBox="0 0 24 24"
							class="invisible text-lightest hover:text-white group-hover:visible"
						>
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
						id="options"
						@click="toggleEpisodeOptions"
						type="button"
						class="hover:text-white group-hover:visible invisible cursor-default"
					>
						<svg role="img" height="24" width="24" viewBox="0 0 24 24">
							<path
								fill="currentColor"
								d="M4.5 13.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm15 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm-7.5 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
							></path>
						</svg>
					</button>
					<EpisodeOptions
						id="episode--options"
						class="absolute"
						v-if="episodeOptions"
						:episodeOptions="episodeOptions"
						:episodes="episodes"
						:podcastShowPage="podcastShowPage"
						:searchResult="true"
						:episodeIsFav="episodeIsFav"
						@removeEpisodeOptions="removeEpisodeOptionsFunc"
						@toggleEpisodeOptions="toggleEpisodeOptionsFunc"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import EpisodeOptions from './EpisodeOptions.vue';
import axios from 'axios';

export default {
	name: 'PodcastEpisodes',
	components: { EpisodeOptions },
	props: [
		'episode',
		'index',
		'isNextEpisode',
		'episodes',
		'podcastShowPage',
		'checkUserFavEpisode',
		'searchResult',
	],
	data() {
		return {
			episodeOptions: false,
		};
	},
	computed: {
		getToken() {
			return this.$store.getters.accessToken;
		},
		getMonths() {
			return this.$store.getters['controller/getMonths'];
		},
		favEpisodes() {
			return this.$store.getters['episodes/getFavEpisodes'].items;
		},
		episodeImage() {
			return this.episode?.images[0]?.url;
		},
		checkUserFavEpisodes() {
			return this.$store.getters['episodes/getIsFavEpisode'];
		},
		ifPlayed() {
			return this.episode.resume_point.fully_played;
		},
		resumePosition() {
			return this.episode.resume_point.resume_position_ms;
		},
		currentEpisodeIsFav() {
			return this.$store.getters['episodes/getCurrentEpisodeIsFav'];
		},
		episodeIsFav() {
			return this.episodes
				? this.checkUserFavEpisodes[this.index]
				: this.podcastShowPage || this.searchResult
				? this.currentEpisodeIsFav[this.index]
				: '';
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

		async removeAddEpisode(currentID, event) {
			console.log(currentID);
			let selectedID;
			if (currentID) {
				selectedID = currentID;
			} else selectedID = event.target.closest('.episodeContainer').id;
			console.log(selectedID);
			const isFavEpisodeID = this.favEpisodes.find(
				item => item.episode.id === selectedID
			)?.episode.id;
			isFavEpisodeID
				? await this.deleteEpisode(isFavEpisodeID)
				: await this.addEpisode(selectedID);
			await this.fetchFavEpisodes();
			this.podcastShowPage ? await this.checkUserFavEpisode() : '';
			this.searchResult ? await this.checkUserFavEpisode() : '';
		},
		removeEpisodeOptionsFunc(val) {
			val ? this.removeAddEpisode(val) : '';
		},
		async addEpisode(episodeID) {
			await fetch('https://api.spotify.com/v1/me/episodes?ids=' + episodeID, {
				method: 'PUT',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + (await this.getToken),
				},
			})
				.then(data => {
					console.log(data.status);
					if (data.status === 200) {
						console.log(episodeID, 'ADDED!!!!');
						this.$store.dispatch('controller/modalInfoType', {
							type: 'episode',
							status: true,
						});
						this.isUserFavEpisode();
					}
				})
				.catch(err => console.log(err));
		},
		async deleteEpisode(selectedID) {
			await axios
				.delete('https://api.spotify.com/v1/me/episodes?ids=' + selectedID, {
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + (await this.getToken),
					},
				})
				.then(data => {
					console.log(data.status);
					if (data.status === 200) {
						console.log(selectedID, 'DELETED!!!!');
						this.$store.dispatch('controller/modalInfoType', {
							type: 'episode',
							status: false,
						});
						this.fetchFavEpisodes();
					}
				})
				.catch(err => console.log(err));
		},

		toggleEpisodeOptions() {
			this.episodeOptions = !this.episodeOptions;
		},
		toggleEpisodeOptionsFunc(val) {
			this.episodeOptions = val;
		},
		selectedEpisode(_, event) {
			event.target.closest('#play')
				? ''
				: event.target.closest('#share')
				? ''
				: event.target.closest('#add-library')
				? ''
				: event.target.closest('#options')
				? ''
				: event.target.closest('#podcast')
				? ''
				: event.target.closest('#episode--options')
				? ''
				: this.$router.push({
						name: 'episode',
						params: { id: `${this.episode.id}` },
				  });
		},

		totalDuration(played, duration, resume = false) {
			let totalMiliSeconds;
			let hours;
			let minutes;
			let seconds;

			if (played && resume) {
				totalMiliSeconds = duration - resume;

				hours = Math.floor(totalMiliSeconds / 1000 / 60 / 60);

				minutes = () => {
					if (totalMiliSeconds > 3600000) {
						return Math.abs(
							Math.floor((totalMiliSeconds / 1000 / 60 / 60 - hours) * 60)
						);
					} else {
						return Math.floor((totalMiliSeconds / 1000 / 60 / 60) * 60);
					}
				};
				seconds = Math.abs(
					Math.floor(
						((totalMiliSeconds / 1000 / 60 / 60) * 60 - minutes()) * 60
					)
				);
			} else if (played) {
				totalMiliSeconds = this.episode.duration_ms;
				hours = Math.floor(totalMiliSeconds / 1000 / 60 / 60);

				minutes = () => {
					if (totalMiliSeconds > 3600000) {
						return Math.abs(
							Math.floor((totalMiliSeconds / 1000 / 60 / 60 - hours) * 60)
						);
					} else {
						return Math.floor((totalMiliSeconds / 1000 / 60 / 60) * 60);
					}
				};
				seconds = Math.abs(
					Math.floor(
						((totalMiliSeconds / 1000 / 60 / 60) * 60 - minutes()) * 60
					)
				);
			} else {
				totalMiliSeconds = duration - resume;

				hours = Math.floor(totalMiliSeconds / 1000 / 60 / 60);

				minutes = () => {
					if (totalMiliSeconds > 3600000) {
						return Math.abs(
							Math.floor((totalMiliSeconds / 1000 / 60 / 60 - hours) * 60)
						);
					} else {
						return Math.floor((totalMiliSeconds / 1000 / 60 / 60) * 60);
					}
				};
				seconds = Math.abs(
					Math.floor(
						((totalMiliSeconds / 1000 / 60 / 60) * 60 - minutes()) * 60
					)
				);
			}

			const result = () => {
				if (played && resume) {
					if (totalMiliSeconds > 3600000) {
						return hours + ' hr ' + minutes() + ' min' + ' left';
					} else {
						return minutes() + ' min ' + seconds + ' sec' + ' left';
					}
				} else if (!played && !resume) {
					if (totalMiliSeconds > 3600000) {
						return hours + ' hr ' + minutes() + ' min';
					} else {
						return minutes() + ' min ' + seconds + ' sec';
					}
				} else if (!played && resume) {
					if (totalMiliSeconds > 3600000) {
						return hours + ' hr ' + minutes() + ' min' + ' left';
					} else {
						return minutes() + ' min ' + seconds + ' sec' + ' left';
					}
				} else if (played) {
					if (totalMiliSeconds > 3600000) {
						return hours + ' hr ' + minutes() + ' min';
					} else {
						return minutes() + ' min ' + seconds + ' sec';
					}
				}
			};

			return result();
		},
		currentReleaseDate() {
			const day = new Date(this.episode?.release_date).getDate();
			const month =
				this.getMonths[new Date(this.episode?.release_date).getMonth()];
			const year = new Date(this.episode?.release_date).getFullYear();
			if (new Date().getFullYear() === year) {
				return `${month} ${day}`;
			} else {
				return `${month} ${year}`;
			}
		},
		isNewEpisode() {
			const today = new Date();
			const isWeek = Math.abs(
				Math.round(
					(today.getTime() - new Date(this.episode?.release_date).getTime()) /
						1000 /
						60 /
						60 /
						24
				)
			);
			if (this.episode?.resume_point.fully_played) return false;
			return isWeek <= 7 ? true : false;
		},
		episodeBarProgress(duration, resume) {
			return (100 * resume) / duration;
		},
	},
	created() {
		console.log('podcastEpisode created!');
	},
};
</script>

<style lang="scss" scoped>
#new-episode {
	&::before {
		content: ' ';
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background-color: #0c6bfac5;
	}
}
</style>
