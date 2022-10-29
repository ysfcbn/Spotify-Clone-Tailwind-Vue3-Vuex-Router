<template>
	<button
		@click="toggleOptions"
		class="text-lightest cursor-default w-fit relative"
	>
		<svg
			role="img"
			height="32"
			width="32"
			viewBox="0 0 24 24"
			class="hover:text-white"
		>
			<path
				fill="currentColor"
				d="M4.5 13.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm15 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm-7.5 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
			></path>
		</svg>
		<ul
			v-if="artistOptions"
			class="z-40 absolute bg-dark2 top-[2rem] left-0 p-[4px] h-fit w-[11.6rem] text-opacwhite3 whitespace-normal rounded shadow-[0px_15px_15px_1px_rgba(0,0,0,0.4)]"
		>
			<li
				@click="toggleFollow"
				class="w-full flex justify-start p-[6px] md:p-[8px] hover:bg-dark3 truncate"
			>
				<button class="cursor-default">
					<span v-if="!follow" class="text-xs md:text-sm">Takip Et </span>
					<span v-else class="text-xs md:text-sm">Takip Etmei Bırak </span>
				</button>
			</li>
			<li class="w-full flex justify-start p-[6px] md:p-[8px] hover:bg-dark3">
				<button class="cursor-default">
					<span class="text-xs md:text-sm">Sanatçı radyosuna git</span>
				</button>
			</li>
			<li
				@mouseenter="visible = true"
				@mouseleave="visible = false"
				class="group w-full flex justify-start p-[6px] md:p-[8px] hover:bg-dark3 border-b border-opacwhite"
			>
				<button class="cursor-default flex items-center justify-between w-full">
					<span class="text-xs md:text-sm">Paylaş</span>
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
					class="z-40 absolute bg-dark2 top-[5.2rem] left-[11.4rem] p-[4px] h-fit w-[13.8rem] text-opacwhite3 whitespace-normal rounded shadow-[0px_15px_15px_1px_rgba(0,0,0,0.4)]"
				>
					<li
						class="w-full flex justify-start p-[6px] md:p-[8px] hover:bg-dark3 border-opacwhite"
					>
						<button class="cursor-default">
							<span class="text-xs md:text-sm"
								>Sanatçının bağlantısını kopyala</span
							>
						</button>
					</li>
					<li
						class="w-full flex justify-start p-[6px] md:p-[8px] hover:bg-dark3"
					>
						<button class="cursor-default">
							<span class="text-xs md:text-sm">Sanatçıyı göm</span>
						</button>
					</li>
				</ul>
			</li>
			<li class="w-full flex justify-start p-[6px] md:p-[8px] hover:bg-dark3">
				<button class="cursor-default">
					<span class="text-xs md:text-sm">Sanatçı radyosuna git</span>
				</button>
			</li>
		</ul>
	</button>
</template>

<script>
export default {
	name: 'ArtistOptions',
	props: ['follow', 'toggleFollow'],
	data() {
		return {
			artistOptions: false,
			visible: false,
		};
	},
	methods: {
		toggleOptions() {
			this.artistOptions = !this.artistOptions;
		},
		paylasDropDown() {
			this.paylasDropDown = true;
		},
		close(e) {
			if (!this.$el.contains(e.target)) {
				this.artistOptions = false;
			}
		},
	},
	mounted() {
		document.addEventListener('click', this.close);
	},
	beforeUnmount() {
		document.removeEventListener('click', this.close);
	},
};
</script>

<style></style>
