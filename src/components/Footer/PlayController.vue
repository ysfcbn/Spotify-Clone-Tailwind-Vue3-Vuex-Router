<template>
	<div class="flex flex-col min-w-[37.6%] shrink-0 mx-2">
		<div class="flex justify-center mb-2 w-full">
			<div class="flex justify-between text-lightest w-14 mr-6">
				<button class="cursor-default">
					<svg
						role="img"
						height="16"
						width="16"
						viewBox="0 0 16 16"
						class="hover:text-white"
					>
						<path
							fill="currentColor"
							d="M13.151.922a.75.75 0 10-1.06 1.06L13.109 3H11.16a3.75 3.75 0 00-2.873 1.34l-6.173 7.356A2.25 2.25 0 01.39 12.5H0V14h.391a3.75 3.75 0 002.873-1.34l6.173-7.356a2.25 2.25 0 011.724-.804h1.947l-1.017 1.018a.75.75 0 001.06 1.06L15.98 3.75 13.15.922zM.391 3.5H0V2h.391c1.109 0 2.16.49 2.873 1.34L4.89 5.277l-.979 1.167-1.796-2.14A2.25 2.25 0 00.39 3.5z"
						></path>
						<path
							fill="currentColor"
							d="M7.5 10.723l.98-1.167.957 1.14a2.25 2.25 0 001.724.804h1.947l-1.017-1.018a.75.75 0 111.06-1.06l2.829 2.828-2.829 2.828a.75.75 0 11-1.06-1.06L13.109 13H11.16a3.75 3.75 0 01-2.873-1.34l-.787-.938z"
						></path>
					</svg>
				</button>

				<button class="cursor-default">
					<svg
						role="img"
						height="16"
						width="16"
						viewBox="0 0 16 16"
						class="hover:text-white"
					>
						<path
							fill="currentColor"
							d="M3.3 1a.7.7 0 01.7.7v5.15l9.95-5.744a.7.7 0 011.05.606v12.575a.7.7 0 01-1.05.607L4 9.149V14.3a.7.7 0 01-.7.7H1.7a.7.7 0 01-.7-.7V1.7a.7.7 0 01.7-.7h1.6z"
						></path>
					</svg>
				</button>
			</div>

			<button
				@click="playCurrentTrack"
				id="playBtn"
				class="items-center bg-white rounded-full w-fit p-[10px] cursor-default hover:scale-110 text-dark"
			>
				<svg
					v-if="!isPlaying"
					role="img"
					height="16"
					width="16"
					viewBox="0 0 16 16"
				>
					<path
						fill="currentColor"
						d="M3 1.713a.7.7 0 011.05-.607l10.89 6.288a.7.7 0 010 1.212L4.05 14.894A.7.7 0 013 14.288V1.713z"
					></path>
				</svg>

				<svg v-else role="img" height="16" width="16" viewBox="0 0 16 16">
					<path
						fill="currentColor"
						d="M2.7 1a.7.7 0 00-.7.7v12.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V1.7a.7.7 0 00-.7-.7H2.7zm8 0a.7.7 0 00-.7.7v12.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V1.7a.7.7 0 00-.7-.7h-2.6z"
					></path>
				</svg>
			</button>

			<div class="flex justify-between w-14 text-lightest ml-6">
				<button class="cursor-default">
					<svg
						class="hover:text-white"
						role="img"
						height="16"
						width="16"
						viewBox="0 0 16 16"
					>
						<path
							fill="currentColor"
							d="M12.7 1a.7.7 0 00-.7.7v5.15L2.05 1.107A.7.7 0 001 1.712v12.575a.7.7 0 001.05.607L12 9.149V14.3a.7.7 0 00.7.7h1.6a.7.7 0 00.7-.7V1.7a.7.7 0 00-.7-.7h-1.6z"
						></path>
					</svg>
				</button>
				<button class="cursor-default">
					<svg
						class="hover:text-white"
						role="img"
						height="16"
						width="16"
						viewBox="0 0 16 16"
					>
						<path
							fill="currentColor"
							d="M0 4.75A3.75 3.75 0 013.75 1h8.5A3.75 3.75 0 0116 4.75v5a3.75 3.75 0 01-3.75 3.75H9.81l1.018 1.018a.75.75 0 11-1.06 1.06L6.939 12.75l2.829-2.828a.75.75 0 111.06 1.06L9.811 12h2.439a2.25 2.25 0 002.25-2.25v-5a2.25 2.25 0 00-2.25-2.25h-8.5A2.25 2.25 0 001.5 4.75v5A2.25 2.25 0 003.75 12H5v1.5H3.75A3.75 3.75 0 010 9.75v-5z"
						></path>
					</svg>
				</button>
			</div>
		</div>
		<!-- track bar -->
		<div
			class="flex items-center justify-around text-lightest text-sm min-w-[17rem]"
		>
			<div class="text-xs mr-2">01:00</div>
			<div class="group h-1 w-full bg-lightest rounded-full relative">
				<span
					class="absolute bg-white w-[15%] h-1 absolute rounded-full group-hover:bg-green3"
				>
					<span
						class="hidden group-hover:block bg-white w-[13px] h-[13px] absolute rounded-full top-[-5px] right-[-8px]"
					></span>
				</span>
			</div>
			<div class="text-xs ml-2">02:45</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'PlayController',
	props: [],
	data() {
		return {};
	},
	computed: {
		getCurrentTrack() {
			return this.$store.getters['controller/getCurrentlyPlayingTrack'];
		},
		currentTrackUri() {
			return this.getCurrentTrack?.context.uri;
		},
		isPlaying() {
			return this.getCurrentTrack?.is_playing;
		},
	},
	methods: {
		async playCurrentTrack() {
			await this.$store.dispatch('controller/fetchCurrentlyPlayingTrack');
			this.isPlaying
				? this.$store.dispatch('controller/pauseCurrentTrack')
				: this.$store.dispatch('controller/playCurrentTrack');
		},
	},
};
</script>

<style></style>
