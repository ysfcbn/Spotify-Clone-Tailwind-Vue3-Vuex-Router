<template>
	<div
		:class="{
			'top-[114px]': diskografiPage,
			'top-[64px] sticky': !diskografiPage && !searchResult,
			'top-[94px] sticky': searchResult,
		}"
		class="w-[100%] presentation py-1 border-b border-opacwhite overflow-hidden pl-[1.4rem] lg:pl-[2.2rem] prebg"
		style="z-index: 30"
	>
		<div :class="{ 'mx-5': !margin }">
			<div
				:class="{
					'md2:grid-cols-colPremd  mb:grid-cols-colPresm ': searchResult,
					'mb:grid-cols-colPreDisco': albumPage || diskografiPage,
					'mb:grid-cols-colPresm md2:grid-cols-colPremd lg2:grid-cols-colPre':
						favoriteSongs || playlistPage,
				}"
				class="grid text-lightest mb:text-[11px] sm3:text-[12px] items-center min-w-[300px] gap-2 font-semibold"
			>
				<div
					class="mb:text-base md:text-lg flex justify-start items-end h-full w-full"
				>
					#
				</div>
				<div>Title</div>
				<div v-if="!albumPage && !diskografiPage" class="hidden md2:block">
					Album
				</div>
				<div
					v-if="!albumPage && !diskografiPage && !searchResult"
					class="hidden lg2:block"
				>
					Date added
				</div>
				<div
					:class="{
						'justify-end mb:pr-12 md2:pr-[3rem]': albumPage || searchResult,
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
		'favoriteSongs',
		'playlistPage',
		'diskografiPage',
		'searchResult',
	],
};
</script>

<style></style>
