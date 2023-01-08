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
			<li
				v-if="!isMyUserPage"
				@click="addRemoveUser"
				class="w-full flex justify-start p-[6px] md:p-[8px] hover:bg-dark3 truncate"
			>
				<button class="cursor-default">
					<span v-if="!follow" class="text-xs md:text-sm">Takip Et </span>
					<span v-else class="text-xs md:text-sm">Takip Etmeyi Bırak </span>
				</button>
			</li>
			<li class="w-full flex justify-start p-[6px] md:p-[8px] hover:bg-dark3">
				<button class="cursor-default">
					<span v-if="!isMyUserPage" class="text-xs md:text-sm">Engelle</span>
					<span v-else class="text-xs md:text-sm">Profili Düzenle</span>
				</button>
			</li>
			<li
				v-if="!isMyUserPage"
				class="flex items-center justify-between w-full p-[10px] hover:bg-dark3"
			>
				<button class="cursor-default">
					<a href="#" class="cursor-default">Bildir</a>
				</button>
				<span>
					<svg
						role="img"
						height="16"
						width="16"
						viewBox="0 0 16 16"
						class="Svg-sc-1bi12j5-0 jgfuCe"
					>
						<path
							fill="currentColor"
							d="M1 2.75A.75.75 0 011.75 2H7v1.5H2.5v11h10.219V9h1.5v6.25a.75.75 0 01-.75.75H1.75a.75.75 0 01-.75-.75V2.75z"
						></path>
						<path
							fill="currentColor"
							d="M15 1v4.993a.75.75 0 11-1.5 0V3.56L8.78 8.28a.75.75 0 01-1.06-1.06l4.72-4.72h-2.433a.75.75 0 010-1.5H15z"
						></path></svg
				></span>
			</li>
			<li
				@click="copyUserURL"
				class="w-full flex justify-start p-[6px] md:p-[8px] hover:bg-dark3"
			>
				<button class="cursor-default">
					<span class="text-xs md:text-sm">Profil Bağlantısını Kopyala</span>
				</button>
			</li>
		</ul>
	</button>
</template>

<script>
export default {
	name: 'ProfileOptions',
	props: ['isMyUserPage', 'addRemoveUser', 'follow', 'userURL'],
	data() {
		return {
			profileOptions: false,
		};
	},
	methods: {
		toggleOptions() {
			this.profileOptions = !this.profileOptions;
		},
		copyUserURL() {
			console.log(this.userURL);
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
