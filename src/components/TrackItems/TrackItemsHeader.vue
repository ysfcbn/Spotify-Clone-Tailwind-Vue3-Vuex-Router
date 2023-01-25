<template>
	<div
		:class="{
			'top-[114px]': diskografiPage,
			'top-[64px] sticky': !diskografiPage,
		}"
		class="w-[100%] presentation py-1 border-b border-opacwhite overflow-hidden pl-[1.4rem] lg:pl-[2.2rem]"
		style="z-index: 30"
	>
		<div :class="{ 'mx-5': !margin }">
			<div
				:class="{
					'mb:grid-cols-colPreDisco': albumPage || diskografiPage,
					'mb:grid-cols-colPresm md2:grid-cols-colPremd lg2:grid-cols-colPre':
						favoriteSongs || playlistPage,
				}"
				class="grid text-lightest mb:text-xs sm3:text-[13px] items-center min-w-[300px] gap-2"
			>
				<div class="text-lg flex justify-start items-end h-full w-full">#</div>
				<div>BAŞLIK</div>
				<div v-if="!albumPage && !diskografiPage" class="hidden md2:block">
					ALBÜM
				</div>
				<div v-if="!albumPage && !diskografiPage" class="hidden lg2:block">
					TARİH EKLENDİ
				</div>
				<div
					:class="{
						'justify-end mb:pr-12 md2:pr-[3rem]': albumPage,
						'justify-center mb:pl-[10px]': favoriteSongs || playlistPage,
						'justify-end mb:pr-[3rem] ': diskografiPage,
					}"
					class="flex items-center w-full h-full"
				>
					<div class="flex items-start">
						<svg role="img" height="16" width="16" viewBox="0 0 16 16" class="">
							<path
								fill="currentColor"
								d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8z"
							></path>
							<path
								fill="currentColor"
								d="M8 3.25a.75.75 0 01.75.75v3.25H11a.75.75 0 010 1.5H7.25V4A.75.75 0 018 3.25z"
							></path>
						</svg>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'trackItemsHeader',
	props: [
		'margin',
		'albumPage',
		'user',
		'favoriteSongs',
		'playlistPage',
		'diskografiPage',
	],
};
</script>

<style></style>
