<template>
	<div
		@click="openItem"
		class="group xl:h-[5rem] sm:h-[4rem] min-w-[200px] flex items-center transition-colors duration-300 justify-start bg-opacwhite1 hover:bg-opacwhite2 relative rounded-md cursor-pointer box-border"
	>
		<div class="h-full shrink-0">
			<img
				class="mb:h-full object-cover rounded-l-sm"
				:src="itemImage"
				alt="image"
			/>
		</div>
		<div class="h-full w-full flex items-center justify-between">
			<div class="relative left-5 lg:w-[70%]">
				<h4 class="text-md text-white font-semibold line-clamp-2">
					{{ item.track.name }}
				</h4>
			</div>
			<div
				class="flex items-start mx-3 opacity-0 group-hover:opacity-100 transition ease-in duration-150 group-hover:block"
			>
				<button
					class="hidden p-3 ml-3 bg-green3 rounded-full cursor-default lg:group-hover:block hover:scale-105 shadow-[0px_5px_6px_2px_rgba(0,0,0,0.4)]"
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
	</div>
</template>

<script>
export default {
	props: ['item', 'itemUri', 'contextType', 'contextUri'],
	data() {
		return {};
	},
	methods: {
		openItem() {
			let contextID = this.contextUri.split(':').slice(2);
			this.$router.push({
				name: `${this.contextType}`,
				params: { id: `${contextID}` },
			});
		},
		playContextUri() {},
	},
	computed: {
		itemImage() {
			return this.item?.track.album?.images[1]?.url;
		},
	},
};
</script>

<style></style>
