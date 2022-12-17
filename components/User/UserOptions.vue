<template>
	<button @click="toggleOptions" class="absolute text-lightest cursor-default">
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
			v-if="profileOptions"
			class="z-40 absolute bg-dark2 top-[2rem] left-0 p-[4px] h-fit w-[11.6rem] text-opacwhite3 whitespace-normal rounded shadow-[0px_15px_15px_1px_rgba(0,0,0,0.4)]"
		>
			<li class="w-full flex justify-start p-[6px] md:p-[8px] hover:bg-dark3">
				<button class="cursor-default">
					<span class="text-xs md:text-sm">Profili düzenle</span>
				</button>
			</li>
			<li class="w-full flex justify-start p-[6px] md:p-[8px] hover:bg-dark3">
				<button class="cursor-default">
					<span class="text-xs md:text-sm">Profil bağlantısını kopyala</span>
				</button>
			</li>
		</ul>
	</button>
</template>

<script>
export default {
	name: 'ProfileOptions',
	data() {
		return {
			profileOptions: false,
		};
	},
	methods: {
		toggleOptions() {
			this.profileOptions = !this.profileOptions;
		},
		close(e) {
			if (!this.$el.contains(e.target)) {
				this.profileOptions = false;
				console.log(this.profileOptions);
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
