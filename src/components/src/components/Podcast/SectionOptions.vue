<template>
	<ul
		class="z-40 absolute bg-dark2 top-[4.8rem] left-[10rem] p-[4px] h-fit w-[12.6rem] text-opacwhite3 whitespace-normal rounded shadow-[0px_15px_15px_1px_rgba(0,0,0,0.4)]"
	>
		<li
			class="w-full flex justify-start p-[6px] md:p-[8px] hover:bg-dark3 truncate"
		>
			<button class="cursor-default">
				<span class="text-xs md:text-sm">Sıraya Ekle </span>
			</button>
		</li>
		<li
			class="w-full flex justify-start p-[6px] md:p-[8px] hover:bg-dark3 border-b border-opacwhite"
		>
			<button class="cursor-default">
				<span class="text-xs md:text-sm">Bölümlerin'den kaldır</span>
			</button>
		</li>
		<li class="w-full flex justify-start p-[6px] md:p-[8px] hover:bg-dark3">
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
				<span class="text-xs md:text-sm">Çalma listesine ekle</span>
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
						placeholder="Çalma listesi ara"
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
					<button @click="clean" v-if="typing" class="right-0 px-3 absolute">
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
						<span class="text-xs md:text-sm">Çalma listesi oluştur</span>
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
				v-if="visible2"
				class="z-40 absolute bg-dark2 top-[10rem] left-[12.4rem] p-[4px] h-fit w-[13.8rem] text-opacwhite3 whitespace-normal rounded shadow-[0px_15px_15px_1px_rgba(0,0,0,0.4)]"
			>
				<li
					class="w-full flex justify-start p-[6px] md:p-[8px] hover:bg-dark3 border-opacwhite"
				>
					<button class="cursor-default">
						<span class="text-xs md:text-sm">Bölüm bağlantısını kopyala</span>
					</button>
				</li>
				<li class="w-full flex justify-start p-[6px] md:p-[8px] hover:bg-dark3">
					<button class="cursor-default">
						<span class="text-xs md:text-sm">Bölümü göm</span>
					</button>
				</li>
			</ul>
		</li>
		<li class="w-full flex justify-start p-[6px] md:p-[8px] hover:bg-dark3">
			<button class="cursor-default">
				<span class="text-xs md:text-sm">Masaüstü uygulamasında aç</span>
			</button>
		</li>
	</ul>
</template>

<script>
export default {
	name: 'SectionOptions',
	props: [''],
	emits: ['toggleSectionOptions'],
	data() {
		return {
			visible: false,
			visible2: false,
			searching: false,
			searchEl: '',
		};
	},
	methods: {
		paylasDropDown() {
			this.paylasDropDown = true;
		},

		visibleFunc2() {
			this.visible = false;
			document.addEventListener('click', this.close);
		},
		clean() {
			this.searchEl = '';
		},
	},
};
</script>

<style></style>
