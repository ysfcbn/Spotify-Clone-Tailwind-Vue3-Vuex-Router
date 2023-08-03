<template>
	<ul
		:class="{
			'top-[2.2rem] left-[7rem]': episodes || podcastShowPage || searchResult,
			'top-[4.5rem] left-[10rem]': episodePage,
		}"
		class="z-40 absolute bg-dark2 p-[4px] h-fit w-[12.6rem] text-opacwhite3 whitespace-normal rounded shadow-[0px_15px_15px_1px_rgba(0,0,0,0.4)]"
	>
		<li
			class="w-full flex justify-start p-[6px] md:p-[8px] hover:bg-dark3 truncate"
		>
			<button class="cursor-default">
				<span class="text-xs md:text-sm">Add to queue</span>
			</button>
		</li>

		<li
			v-if="!episodeIsFav"
			class="w-full flex justify-start p-[6px] md:p-[8px] hover:bg-dark3"
		>
			<button @click="removeAddEpisode(msg, $event)" class="cursor-default">
				<span class="text-xs md:text-sm">Save to Your Episodes</span>
			</button>
		</li>
		<li
			v-else
			class="w-full flex justify-start p-[6px] md:p-[8px] hover:bg-dark3"
		>
			<button @click="removeAddEpisode(msg, $event)" class="cursor-default">
				<span class="text-xs md:text-sm">Remove from Your Episodesr</span>
			</button>
		</li>
		<li
			v-if="episodes || podcastShowPage || searchResult"
			class="w-full flex justify-start p-[6px] md:p-[8px] hover:bg-dark3"
		>
			<button class="cursor-default">
				<span class="text-xs md:text-sm">Bölüm Açıklamasına Bakın</span>
			</button>
		</li>
		<li
			@mouseenter="visibleFunc"
			@mouseleave="visibleFunc2"
			class="group w-full flex justify-start p-[6px] md:p-[8px] hover:bg-dark3 border-b border-opacwhite"
		>
			<button class="cursor-default flex items-center justify-between w-full">
				<span class="text-xs md:text-sm">Add to playlist</span>
				<span class="text-white">
					<svg
						role="img"
						height="16"
						width="16"
						class="rotate-90"
						viewBox="0 0 16 16"
					>
						<path fill="currentColor" d="M14 10L8 4l-6 6h12z"></path>
					</svg>
				</span>
			</button>
			<ul
				v-if="visible"
				class="z-40 absolute bg-dark2 top-[-15rem] left-[12.4rem] p-[4px] h-[25rem] w-[15.8rem] text-opacwhite3 whitespace-normal rounded shadow-[0px_15px_15px_1px_rgba(0,0,0,0.4)]"
			>
				<li
					class="w-full flex items-center justify-start hover:bg-dark3 border-opacwhite mb-1"
				>
					<input
						v-model="searchEl"
						type="text"
						placeholder="Find a playlist"
						class="text-sm w-[15.3rem] bg-opacwhite relative rounded-md pl-8 h-8 left-0 focus:outline-none"
					/>
					<div class="absolute pl-2">
						<span class=""
							><svg
								role="img"
								height="16"
								width="16"
								class="text-opacwhite5"
								aria-hidden="true"
								viewBox="0 0 16 16"
							>
								<path
									fill="currentColor"
									d="M7 1.75a5.25 5.25 0 100 10.5 5.25 5.25 0 000-10.5zM.25 7a6.75 6.75 0 1112.096 4.12l3.184 3.185a.75.75 0 11-1.06 1.06L11.304 12.2A6.75 6.75 0 01.25 7z"
								></path></svg
						></span>
					</div>
					<button
						id="close--btn"
						@click="clean"
						v-if="typing"
						class="right-0 px-3 absolute"
					>
						<svg
							role="img"
							height="16"
							width="16"
							viewBox="0 0 16 16"
							class="text-opacwhite5"
						>
							<path
								fill="currentColor"
								d="M1.47 1.47a.75.75 0 011.06 0L8 6.94l5.47-5.47a.75.75 0 111.06 1.06L9.06 8l5.47 5.47a.75.75 0 11-1.06 1.06L8 9.06l-5.47 5.47a.75.75 0 01-1.06-1.06L6.94 8 1.47 2.53a.75.75 0 010-1.06z"
							></path>
						</svg>
					</button>
				</li>
				<li
					class="w-full flex justify-start p-[6px] md:p-[8px] hover:bg-dark3 border-b border-opacwhite"
				>
					<button class="cursor-default">
						<span class="text-xs md:text-sm">Create playlist</span>
					</button>
				</li>
			</ul>
		</li>
		<li
			@mouseenter="visible2 = true"
			@mouseleave="visible2 = false"
			class="group w-full flex justify-start p-[6px] md:p-[8px] hover:bg-dark3 border-b border-opacwhite"
		>
			<button class="cursor-default flex items-center justify-between w-full">
				<span class="text-xs md:text-sm">Share</span>
				<span class="text-white">
					<svg
						role="img"
						height="16"
						width="16"
						class="rotate-90"
						viewBox="0 0 16 16"
					>
						<path fill="currentColor" d="M14 10L8 4l-6 6h12z"></path>
					</svg>
				</span>
			</button>
			<ul
				v-if="visible2"
				class="z-40 absolute bg-dark2 top-[10rem] left-[12.4rem] p-[4px] h-fit w-[13.8rem] text-opacwhite3 whitespace-normal rounded shadow-[0px_15px_15px_1px_rgba(0,0,0,0.4)]"
			>
				<li
					class="w-full flex justify-start p-[6px] md:p-[8px] hover:bg-dark3 border-opacwhite"
				>
					<button class="cursor-default">
						<span class="text-xs md:text-sm">Copy Episode Link</span>
					</button>
				</li>
				<li class="w-full flex justify-start p-[6px] md:p-[8px] hover:bg-dark3">
					<button class="cursor-default">
						<span class="text-xs md:text-sm">Embed episode</span>
					</button>
				</li>
			</ul>
		</li>
		<li class="w-full flex justify-start p-[6px] md:p-[8px] hover:bg-dark3">
			<button class="cursor-default">
				<span class="text-xs md:text-sm">Open in Desktop app</span>
			</button>
		</li>
	</ul>
</template>

<script>
export default {
	name: 'EpisodeOptions',
	emits: ['toggleEpisodeOptions', 'removeEpisodeOptions'],
	props: [
		'episodeOptions',
		'episodes',
		'episodePage',
		'podcastShowPage',
		'searchResult',
		'episodeIsFav',
	],
	data() {
		return {
			visible: false,
			visible2: false,
			searching: false,
			searchEl: '',
		};
	},
	methods: {
		async removeAddEpisode(_, event) {
			const selectedID = event.target.closest('.episodeContainer').id;
			console.log(selectedID);
			this.$emit('removeEpisodeOptions', selectedID);
			this.$emit('toggleEpisodeOptions', false);
		},
		visibleFunc() {
			this.visible = true;
			document.removeEventListener('click', this.close);
		},
		visibleFunc2() {
			this.visible = false;
			document.addEventListener('click', this.close);
		},
		clean() {
			this.searchEl = '';
		},
		close(e) {
			if (!this.$el.contains(e.target)) {
				if (
					this.episodePage ||
					this.podcastShowPage ||
					this.searchResult ||
					this.episodes
				)
					this.$emit('toggleEpisodeOptions', false);
				console.log(
					'clickledi',
					this.episodePage ||
						this.podcastShowPage ||
						this.searchResult ||
						this.episodes
				);
			}
		},
	},
	computed: {
		typing() {
			return this.searchEl.length
				? (this.searching = true)
				: (this.searching = false);
		},
	},
	mounted() {
		console.log('sadasdas', this.episodes);
		setTimeout(() => {
			document.addEventListener('click', this.close);
		}, 100);
	},
	beforeUnmount() {
		document.removeEventListener('click', this.close);
	},
};
</script>

<style></style>
