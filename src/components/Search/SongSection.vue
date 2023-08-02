<template>
	<div
		id="songSection"
		:class="{ 'mx-5 z-0': margin }"
		class="playlistContainer relative h-full min-w-[450]"
	>
		<trackItemsHeader :margin="true" :searchResult="true" />
		<div class="trackItems--container mt-2">
			<TrackItems
				v-for="(track, i) in getAllSongs"
				:key="track.id"
				:id="track.id"
				:track="track"
				:uri="track.uri"
				:searchResult2="true"
				:itemUri="track.uri"
				:trackID="track.id"
				:index="i"
				:margin="true"
				:contextType="track.type"
			>
				<template #trackImg>
					<img
						class="object-fit w-[40px] h-[40px]"
						:src="track.album.images[2]?.url"
						alt=""
					/>
				</template>
				<template #trackName>{{ track.name }}</template>
				<template #artist
					><router-link
						class="hover:underline"
						v-for="artist in track.artists"
						:key="artist.id"
						:to="{ name: 'artist', params: { id: `${artist.id}` } }"
					>
						{{
							track.artists.length > 1
								? artist.name === track.artists[track.artists.length - 1].name
									? artist.name
									: artist.name + ', '
								: artist.name
						}}
					</router-link></template
				>
				<template #albumName>{{ track.album.name }}</template>

				<template #duration>{{
					trackDuration((duration = track.duration_ms))
				}}</template>
			</TrackItems>
		</div>
	</div>
</template>

<script>
import TrackItemsHeader from '../TrackItems/TrackItemsHeader.vue';
import TrackItems from '../TrackItems/TrackItems.vue';
export default {
	components: {
		TrackItems,
		TrackItemsHeader,
	},
	data() {
		return {};
	},
	methods: {
		trackDuration(duration) {
			const minutes = Math.floor(duration / 60000);
			const seconds = Math.floor((duration % 60000) / 1000);
			const result = minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
			return result;
		},
	},
	computed: {
		getAllSongs() {
			return this.$store.getters['searchItem/getAllSongs'];
		},
	},
};
</script>

<style></style>
