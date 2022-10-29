<template>
	<button
		@click="togglediskografiOptions"
		id="typeSelection"
		class="z-100 relative bg-dark2 rounded-md flex items-center justify-between text-opacwhite5 hover:text-white p-1 h-full font-semibold cursor-default w-fit"
	>
		<div
			:class="[curWidth]"
			class="text-sm min-w-[72px] flex items-center justify-between px-[6px] py-[4px]"
		>
			<span class="w-full">{{ selected }}</span>
			<svg
				v-if="!active"
				role="img"
				height="16"
				width="16"
				viewBox="0 0 16 16"
				class="pointer-events-none"
			>
				<path fill="currentColor" d="M14 6l-6 6-6-6h12z"></path>
			</svg>
			<svg
				v-else
				role="img"
				height="16"
				width="16"
				viewBox="0 0 16 16"
				class=""
			>
				<path fill="currentColor" d="M14 10L8 4l-6 6h12z"></path>
			</svg>
		</div>

		<ul
			v-if="diskografiOption"
			id="getSongs"
			class="type--list z-40 absolute bg-dark2 top-[2.5rem] left-0 p-[4px] min-w-[160px] max-w-[360px] h-fit w-fit text-opacwhite3 whitespace-normal rounded shadow-[0px_15px_15px_1px_rgba(0,0,0,0.4)]"
		>
			<li
				@click="toggleAll"
				class="w-full flex justify-start p-[6px] md:p-[8px] hover:bg-dark3"
			>
				<button class="cursor-default w-full flex justify-between">
					<span class="text-xs md:text-sm">Tümü</span>
					<svg
						v-if="all"
						role="img"
						height="16"
						width="16"
						viewBox="0 0 16 16"
						class=""
					>
						<path
							fill="currentColor"
							d="M15.53 2.47a.75.75 0 010 1.06L4.907 14.153.47 9.716a.75.75 0 011.06-1.06l3.377 3.376L14.47 2.47a.75.75 0 011.06 0z"
						></path>
					</svg>
				</button>
			</li>
			<li
				@click="toggleAlbums"
				class="w-full flex justify-start p-[6px] md:p-[8px] hover:bg-dark3"
			>
				<button class="cursor-default w-full flex justify-between">
					<span class="text-xs md:text-sm">Albümler</span>
					<svg
						v-if="albums"
						role="img"
						height="16"
						width="16"
						viewBox="0 0 16 16"
						class="Svg-sc-1bi12j5-0 EQkJl"
					>
						<path
							fill="currentColor"
							d="M15.53 2.47a.75.75 0 010 1.06L4.907 14.153.47 9.716a.75.75 0 011.06-1.06l3.377 3.376L14.47 2.47a.75.75 0 011.06 0z"
						></path>
					</svg>
				</button>
			</li>
			<li
				@click="toggleSingles"
				class="w-full flex justify-start p-[6px] md:p-[8px] hover:bg-dark3"
			>
				<button class="cursor-default w-full flex justify-between">
					<span class="text-xs md:text-sm w-full flex"
						>Single'lar ve EP'ler</span
					>
					<svg
						v-if="singlesEps"
						role="img"
						height="16"
						width="16"
						viewBox="0 0 16 16"
						class="Svg-sc-1bi12j5-0 EQkJl"
					>
						<path
							fill="currentColor"
							d="M15.53 2.47a.75.75 0 010 1.06L4.907 14.153.47 9.716a.75.75 0 011.06-1.06l3.377 3.376L14.47 2.47a.75.75 0 011.06 0z"
						></path>
					</svg>
				</button>
			</li>
			<li
				@click="toggleCompilations"
				class="w-full flex justify-start p-[6px] md:p-[8px] hover:bg-dark3"
			>
				<button class="cursor-default w-full flex justify-between">
					<span class="text-xs md:text-sm">Derlemeler</span>
					<svg
						v-if="compilations"
						role="img"
						height="16"
						width="16"
						viewBox="0 0 16 16"
						class="Svg-sc-1bi12j5-0 EQkJl"
					>
						<path
							fill="currentColor"
							d="M15.53 2.47a.75.75 0 010 1.06L4.907 14.153.47 9.716a.75.75 0 011.06-1.06l3.377 3.376L14.47 2.47a.75.75 0 011.06 0z"
						></path>
					</svg>
				</button>
			</li>
		</ul>
	</button>
</template>

<script>
export default {
	name: 'DiskoOptions',
	emits: ['selectedType'],

	data() {
		return {
			selected: 'Tümü',
			active: false,
			diskografiOption: false,
			all: true,
			albums: false,
			singlesEps: false,
			compilations: false,
		};
	},
	methods: {
		togglediskografiOptions() {
			this.diskografiOption = !this.diskografiOption;
			this.active = !this.active;
		},

		toggleAll() {
			this.$router.push('/artist/id/discography/all');
			this.all ? '' : (this.all = true);
			this.selected = 'Tümü';
			this.albums ? (this.albums = false) : '';
			this.singlesEps ? (this.singlesEps = false) : '';
			this.compilations ? (this.compilations = false) : '';
			this.selectedType();
		},
		toggleAlbums() {
			this.$router.push('/artist/id/discography/album');
			this.albums ? '' : (this.albums = true);
			this.selected = 'Albümler';
			this.all ? (this.all = false) : '';
			this.singlesEps ? (this.singlesEps = false) : '';
			this.compilations ? (this.compilations = false) : '';
			this.selectedType();
		},
		toggleSingles() {
			this.$router.push('/artist/id/discography/single');
			this.singlesEps ? '' : (this.singlesEps = true);
			this.selected = `Single'lar ve EP'ler`;
			this.albums ? (this.albums = false) : '';
			this.all ? (this.all = false) : '';
			this.compilations ? (this.compilations = false) : '';
			this.selectedType();
		},
		toggleCompilations() {
			this.$router.push('/artist/id/discography/compilation');
			this.compilations ? '' : (this.compilations = true);
			this.selected = 'Derlemeler';
			this.albums ? (this.albums = false) : '';
			this.all ? (this.all = false) : '';
			this.singlesEps ? (this.singlesEps = false) : '';
			this.selectedType();
		},

		selectedType() {
			this.$emit('selectedType', {
				all: this.all,
				singles: this.singlesEps,
				album: this.albums,
				compilations: this.compilations,
			});
		},

		close(e) {
			if (!this.$el.contains(e.target)) {
				this.diskografiOption = false;
				if (this.active) this.active = false;
			}
		},
	},
	computed: {
		curWidth() {
			return this.all
				? 'w-[5rem]'
				: this.singlesEps
				? 'w-[10rem]'
				: 'w-[6.5rem]';
		},
	},

	mounted() {
		document.addEventListener('click', this.close);
	},
	beforeUnmount() {
		console.log('options unmounted!');
		document.removeEventListener('click', this.close);
	},
};
</script>

<style></style>
<!-- 		e.target ===
					document.getElementById('typeSelection').closest('.type--list') -->
