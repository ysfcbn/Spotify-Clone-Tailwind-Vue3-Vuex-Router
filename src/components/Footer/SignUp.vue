<template>
	<div
		class="flex items-center justify-between bg-gradient-to-r from-signUpbg1 to-signUpbg2 h-[92px] relative w-full gap-x-4"
	>
		<div class="ml-10 min-w-[30rem] flex flex-col h-fit justify-between">
			<p
				class="text-white font-extralight text-[12px] uppercase tracking-wider leading-5"
			>
				PREVIEW OF SPOTIFY
			</p>
			<p class="text-opacwhite3 text-[12px] tracking-wide leading-5">
				Sign up to get unlimited songs and podcasts with occasional ads. No
				credit card needed.
			</p>
		</div>
		<button
			class="py-3 px-4 w-fit flex shrink-0 rounded-full bg-white2 hover:bg-[#f6f6f6] hover:scale-105 cursor-default md:mr-[1rem]"
		>
			<a
				target="_blank"
				:href="href"
				class="text-black text-base font-semibold"
			>
				Sign up free</a
			>
		</button>
	</div>
</template>

<script>
export default {
	data() {
		return {
			href: 'https://accounts.spotify.com/tr/login?continue=https%3A%2F%2Fopen.spotify.com%2F',
		};
	},
};
</script>

<style></style>
