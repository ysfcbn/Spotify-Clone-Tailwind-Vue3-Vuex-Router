<template>
	<!-- Cards -->
	<button
		:id="artist.name"
		@click="selectedArtist(msg, $event)"
		class="artist--card bg-dark1 hover:bg-opacblack1 ease duration-300 w-full h-auto cursor-pointer rounded-md flex-1 isolate p-4 relative"
	>
		<div class="h-full group">
			<div class="w-full mb-5 relative">
				<img
					class="h-full w-full object-cover rounded-full"
					:src="artist?.images[0]?.url"
					alt="artist"
				/>
				<div
					class="right-0 bottom-0 p-2 absolute flex items-center right-0 bottom-0 py-1 px-2 group-hover:block opacity-0 group-hover:opacity-100 transition ease-in duration-200 group-hover:translate-y-[-0.4rem]"
				>
					<button
						id="playBtn"
						class="p-3 bg-green rounded-full cursor-default lg:group-hover:block hover:scale-110 shadow-[0px_5px_6px_2px_rgba(0,0,0,0.4)]"
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
				</div>
			</div>
			<div class="flex items-start flex-col justify-center">
				<div class="text-white max-w-full truncate">
					{{ artist.name }}
				</div>
				<div class="text-sm text-lightest max-w-full truncate">
					{{ artist.type }}
				</div>
			</div>
		</div>
	</button>
</template>

<script>
export default {
	props: ['artist'],
	emits: ['cardName1'],
	data() {
		return {
			artistCardName: '',
		};
	},
	methods: {
		selectedArtist(_, event) {
			if (event.target.closest('#playBtn')?.id === 'playBtn') {
				console.log('toggle Play/Stop Playlists');
			} else {
				const currentID = event.target.closest('.artist--card').id;
				this.$router.push({ name: 'artist', params: { id: currentID } });
			}
		},
	},
};
</script>

<style></style>
