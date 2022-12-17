<template>
	<ul
		class="z-[9999] absolute bg-dark2 top-[2.5rem] right-[1.65rem] p-[4px] h-fit w-[15rem] text-opacwhite3 text-sm whitespace-normal rounded cursor-default shadow-[0px_15px_15px_1px_rgba(0,0,0,0.4)]"
	>
		<li class="w-full p-[10px] hover:bg-dark3 border-b border-opacwhite">
			<button class="w-full flex justify-start">
				<span class="cursor-default">Sıraya ekle</span>
			</button>
		</li>
		<li class="w-full p-[10px] hover:bg-dark3">
			<button class="cursor-default">
				<span>Şarkı radyosuna git</span>
			</button>
		</li>
		<li
			@mouseenter="visible = true"
			@mouseleave="visible = false"
			class="w-full p-[10px] hover:bg-dark3 flex justify-between"
		>
			<button class="cursor-default">
				<span>Sanatçıya git</span>
			</button>
			<span
				><svg
					role="img"
					height="16"
					width="16"
					class="rotate-90"
					viewBox="0 0 16 16"
				>
					<path fill="currentColor" d="M14 10L8 4l-6 6h12z"></path></svg
			></span>
			<ul
				v-if="visible"
				class="z-[9999] absolute bg-dark2 top-[5.3rem] left-[-9.8rem] p-[4px] h-fit w-[10rem] text-opacwhite3 text-sm whitespace-normal rounded cursor-default shadow-[0px_15px_15px_1px_rgba(0,0,0,0.4)]"
			>
				<li class="w-full p-[10px] hover:bg-dark3">
					<button class="cursor-default">
						<span v-if="artistPage">{{ selectArtCardName }}</span>
						<span v-else>{{ album.artist }}</span>
					</button>
				</li>
			</ul>
		</li>
		<li class="w-full p-[10px] hover:bg-dark3">
			<button class="cursor-default">
				<span>Albüme git</span>
			</button>
		</li>
		<li class="w-full p-[10px] hover:bg-dark3 border-b border-opacwhite">
			<button class="cursor-default">
				<span>Katkıda bulunanları göster</span>
			</button>
		</li>
		<li class="w-full p-[10px] hover:bg-dark3 w-full">
			<button class="cursor-default flex justify-start">
				<span>Beğenilen Şarkıları listeden kaldır</span>
			</button>
		</li>
		<li
			class="w-full p-[10px] hover:bg-dark3 border-b border-opacwhite flex justify-between"
		>
			<button class="cursor-default">
				<span>Çalma listesine ekler</span>
			</button>
			<span
				><svg
					role="img"
					height="16"
					width="16"
					class="rotate-90"
					viewBox="0 0 16 16"
				>
					<path fill="currentColor" d="M14 10L8 4l-6 6h12z"></path></svg
			></span>
		</li>
		<li
			@mouseenter="visible1 = true"
			@mouseleave="visible1 = false"
			class="w-full p-[10px] hover:bg-dark3 border-b border-opacwhite flex justify-between"
		>
			<button class="cursor-default">
				<span>Paylaş</span>
			</button>
			<span>
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
			<ul
				v-if="visible1"
				class="z-40 absolute bg-dark2 top-[18.2rem] left-[-11.8rem] p-[4px] h-fit w-[12rem] text-opacwhite3 whitespace-normal rounded shadow-[0px_15px_15px_1px_rgba(0,0,0,0.4)]"
			>
				<li
					class="w-full flex justify-start p-[6px] md:p-[8px] hover:bg-dark3 border-opacwhite"
				>
					<button class="cursor-default">
						<span class="text-xs md:text-sm">Şarkı Bağlantısını Kopyala</span>
					</button>
				</li>
				<li class="w-full flex justify-start p-[6px] md:p-[8px] hover:bg-dark3">
					<button class="cursor-default">
						<span class="text-xs md:text-sm">Parçayı göm</span>
					</button>
				</li>
			</ul>
		</li>
		<li class="w-full p-[10px] hover:bg-dark3">
			<button class="cursor-default">
				<span>Masaüstü uygulamasında aç</span>
			</button>
		</li>
	</ul>
</template>

<script>
export default {
	name: 'TrackOptions',
	props: ['album', 'trackOptions', 'artistPage', 'selectArtCardName'],
	data() {
		return {
			visible: false,
			visible1: false,
		};
	},
	mounted() {
		if (this.artistPage)
			console.log(this.selectArtCardName, 'Trackoption Mounted');
	},
	beforeUnmount() {
		if (this.album) console.log(this.album.artist, 'Trackoption unMounted');
	},
};
</script>

<style></style>
