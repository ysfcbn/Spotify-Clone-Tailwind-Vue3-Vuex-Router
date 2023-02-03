<template>
	<p v-for="lyric in lyrics" :key="lyric">{{ lyric }}</p>
</template>

<script>
export default {
	data() {
		return {
			lyrics: [],
		};
	},
	mounted() {
		this.FetchLyric = [
			"The way you shake it, I can't believe it",
			"I ain't never seen an ass like that",
			'The way you move it, you make my pee-pee go',
			"D-doin', doin', doin'",
			"I don't believe it, it's almost too good to be true",
		];
		this.lyrics = this.FetchLyric;
	},
};
</script>

<style></style>
