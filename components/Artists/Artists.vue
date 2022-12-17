<template>
	<section id="artists" class="Artists-Page p-5 mt-2 lg:ml-[1rem]">
		<div class="relative">
			<div class="flex justify-between h-[2.5rem]">
				<div class="h-fit flex-end">
					<h2
						class="text-[1.5rem] text-white leading-7 tracking-tight hover:underline hover:text-underline-offset-8 font-semibold"
					>
						Sanatçılar
					</h2>
				</div>
			</div>
			<div class="relative grid grid-cols-colArt gap-6 auto-rows-auto">
				<artistItems
					v-for="artist in artists"
					:key="artist.id"
					:artist="artist"
					:artists="artists"
					@cardName1="selectArtistName"
				/>
			</div>
		</div>
	</section>
</template>

<script>
import artistItems from './ArtistItems.vue';
export default {
	components: { artistItems },
	props: ['toggleArtistPage'],
	emits: ['selectedArtistName'],
	data() {
		return {
			artistName: '',
			artists: [
				{
					id: 1,
					name: 'INNA',
					type: 'Sanatçı',
					monthlyListener: '8562540',
					img: 'https://i.scdn.co/image/ab6761610000f178571bd5587850d252e8fc892d',
				},
				{
					id: 2,
					name: 'Ben Böhmer',
					type: 'Sanatçı',
					monthlyListener: '9762510',
					img: 'https://i.scdn.co/image/ab67616100005174a8a48c12973f1621a9eea81d',
				},
				{
					id: 3,
					name: 'Jan Blomqvist',
					type: 'Sanatçı',
					monthlyListener: '5126545',
					img: 'https://i.scdn.co/image/ab67616100005174f1853b674364d4b6c7638d14',
				},
				{
					id: 4,
					name: 'Hans Zimmer',
					type: 'Sanatçı',
					monthlyListener: '10658214',
					img: 'https://i.scdn.co/image/ab67616100005174371632043a8c12bb7eeeaf9d',
				},
			],
		};
	},
	methods: {
		selectArtistName(name) {
			this.artistName = name;
			console.log(this.artistName);
			this.$emit('selectedArtistName', this.artistName);
			this.toggleArtistPage();
		},
	},
};
</script>

<style></style>
