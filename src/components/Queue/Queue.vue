<template>
	<section class="p-5 lg:ml-[1rem] h-fit">
		<div v-if="allQueueList.length">
			<div class="text-white text-lg flex flex-col gap-y-5">
				<h1 style="font-weight: 700" class="text-2xl">Queue</h1>
				<h2 style="font-weight: 700" class="text-lightest/80 text-[14px]">
					Now playing
				</h2>
			</div>
			<div class="mt-[0.5rem] h-fit mb-10">
				<TrackItems
					:key="getcurrentlyPlayingQueue?.id"
					:id="getcurrentlyPlayingQueue?.id"
					:track="getcurrentlyPlayingQueue"
					:index="0"
					:uri="getcurrentlyPlayingQueue?.uri"
					:trackID="getcurrentlyPlayingQueue?.id"
					:contextType="getcurrentlyPlayingQueue?.type"
					:queuePage2="queuePage"
				>
					<template #trackImg>
						<img
							class="object-fit w-[40px] h-[40px]"
							:src="getcurrentlyPlayingQueue?.album?.images[2]?.url"
							alt=""
						/>
					</template>
					<template #trackName>{{ getcurrentlyPlayingQueue?.name }}</template>
					<template #artist
						><router-link
							class="hover:underline"
							v-for="artist in getcurrentlyPlayingQueue?.artists"
							:key="artist.id"
							:to="{ name: 'artist', params: { id: `${artist.id}` } }"
						>
							{{
								getcurrentlyPlayingQueue?.artists.length > 1
									? artist.name ===
									  getcurrentlyPlayingQueue?.artists[
											getcurrentlyPlayingQueue?.artists.length - 1
									  ].name
										? artist.name
										: artist.name + ', '
									: artist.name
							}}
						</router-link></template
					>
					<template #albumName>{{
						getcurrentlyPlayingQueue?.album?.name
					}}</template>
					<template #duration>{{
						trackDuration((duration = getcurrentlyPlayingQueue?.duration_ms))
					}}</template>
				</TrackItems>
			</div>
			<div v-if="queueTrackList.length" class="mt-[0.5rem] h-fit mb-10">
				<div class="flex items-center justify-between w-full h-full mb-2">
					<h2
						style="font-weight: 700"
						class="text-lightest/80 text-[14px] mb-4"
					>
						Next in queue
					</h2>
					<button
						@click="clearQueue"
						style="font-weight: 700"
						class="rounded-full border-[1px] border-opacwhite2 text-[13px] tracking-wide w-fit px-3 py-1 text-white hover:border-white hover:scale-105 h-fit cursor-default"
					>
						Clear queue
					</button>
				</div>

				<TrackItems
					v-for="(track, i) in queueTrackList"
					:key="track?.id"
					:id="track?.id"
					:track="track"
					:index="i + 1"
					:uri="track?.uri"
					:trackID="track?.id"
					:contextType="track?.type"
					:queuePage="queuePage"
				>
					<template #trackImg>
						<img
							class="object-fit w-[40px] h-[40px]"
							:src="track?.album?.images[2]?.url"
							alt=""
						/>
					</template>
					<template #trackName>{{ track?.name }}</template>
					<template #artist
						><router-link
							class="hover:underline"
							v-for="artist in track?.artists"
							:key="artist.id"
							:to="{ name: 'artist', params: { id: `${artist.id}` } }"
						>
							{{
								track?.artists.length > 1
									? artist.name ===
									  track?.artists[track?.artists.length - 1].name
										? artist.name
										: artist.name + ', '
									: artist.name
							}}
						</router-link></template
					>
					<template #albumName>{{ track?.album?.name }}</template>
					<template #duration>{{
						trackDuration((duration = track?.duration_ms))
					}}</template>
				</TrackItems>
			</div>
			<div class="mt-[0.5rem] h-full">
				<h2 style="font-weight: 700" class="text-lightest/80 mb-4 text-[14px]">
					<span
						v-if="!getCurrentlyPlayingContextType"
						class="flex gap-x-2 w-full"
						>Next from:
						<router-link
							class="hover:text-white hover:underline"
							:key="getCurrentlyPlayingContextType"
							:to="{
								name: `artist`,
								params: { id: `${contextTypeID}` },
							}"
						>
							{{ contextName }}</router-link
						></span
					>
					<span
						v-else-if="getCurrentlyPlayingContextType !== 'collection'"
						class="flex gap-x-2 w-full"
						>Next from:
						<router-link
							class="hover:text-white hover:underline"
							:key="getCurrentlyPlayingContextType"
							:to="{
								name: `${getCurrentlyPlayingContextType}`,
								params: { id: `${contextTypeID}` },
							}"
						>
							{{ getQueueName }}</router-link
						></span
					>
					<span v-else>Next up</span>
				</h2>
				<TrackItems
					v-for="(track, i) in allQueueList"
					:key="track?.id"
					:id="track?.id"
					:track="track"
					:index="i + queueTrackListLength"
					:uri="track?.uri"
					:contextType="track?.type"
					:queuePage="queuePage"
					:trackID="track?.id"
					:findFavTracks="findFavTracks"
					:addGreenHeartFavTracks="addGreenHeartFavTracks"
					:removeGreenHeartFavTracks="removeGreenHeartFavTracks"
				>
					<template #trackImg>
						<img
							class="object-fit w-[40px] h-[40px]"
							:src="track?.album?.images[2]?.url"
							alt=""
						/>
					</template>
					<template #trackName>{{ track?.name }}</template>
					<template #artist
						><router-link
							class="hover:underline"
							v-for="artist in track?.artists"
							:key="artist.id"
							:to="{ name: 'artist', params: { id: `${artist.id}` } }"
						>
							{{
								track?.artists.length > 1
									? artist.name ===
									  track?.artists[track?.artists.length - 1].name
										? artist.name
										: artist.name + ', '
									: artist.name
							}}
						</router-link></template
					>
					<template #albumName>{{ track?.album?.name }}</template>
					<template #duration>{{
						trackDuration((duration = track?.duration_ms))
					}}</template>
				</TrackItems>
			</div>
		</div>
		<div
			v-else
			class="flex flex-col items-center gap-4 text-white p-5 lg:ml-[1rem] h-[8rem] bg-dark1 rounded-xl"
		>
			<h1 class="text-2xl">Queue is empty</h1>
			<router-link
				class="border h-fit w-[16rem] px-2 py-2 rounded-full flex items-center justify-center hover:scale-[1.04] text-white text-[14px] self-center"
				:to="{ name: 'search' }"
				:key="queue"
			>
				Search for something new</router-link
			>
		</div>
	</section>
</template>

<script>
import TrackItems from '../TrackItems/TrackItems.vue';
export default {
	name: 'Queue',
	components: { TrackItems },
	data() {
		return {
			queuePage: false,
			queueTrackListLength2: 0,
		};
	},
	computed: {
		allFavTracks() {
			return this.$store.getters['favTracks/getTracks']?.items;
		},
		totalFavTracks() {
			return this.$store.getters['favTracks/getTracks']?.total;
		},
		totalPlaylistTracks() {
			return this.$store.getters['playlists/getPlaylist']?.tracks?.total;
		},
		totalAlbumTracks() {
			return this.$store.getters['albums/getAlbum']?.total_tracks;
		},
		getCurrentlyPlayingTrack() {
			return this.$store.getters['controller/getCurrentlyPlayingTrack'];
		},
		getCurrentlyPlayingContextType() {
			return this.$store.getters['controller/getCurrentlyPlayingTrack']?.context
				?.type;
		},

		currentArtist() {
			return this.$store.getters['controller/getTrackInfoCurrentArtist'];
		},
		contextTypeID() {
			return this.getCurrentlyPlayingContextType === 'album'
				? this.getCurrentlyPlayingTrack?.item?.album?.id
				: this.getCurrentlyPlayingContextType === 'playlist'
				? this.getCurrentlyPlayingTrack?.context?.uri.split(':')[2]
				: !this.getCurrentlyPlayingContextType
				? this.currentArtist?.id
				: '';
		},
		getQueueName() {
			return this.$store.getters['controller/getQueueName'];
		},
		contextName() {
			return !this.getCurrentlyPlayingContextType
				? this.currentArtist?.name
				: this.getCurrentlyPlayingContextType !== 'collection'
				? this.getQueueName
				: '';
		},
		getcurrentlyPlayingQueue() {
			return this.$store.getters['controller/getUserQueue']?.currently_playing;
		},

		queueTrackList() {
			return this.$store.getters['controller/getQueueTrackList'];
		},
		lastQueueTrackListLength() {
			return this.$store.getters['controller/getLastQueueTrackListLength'];
		},
		queueTrackListLength() {
			return this.queueTrackList.length > 0
				? this.queueTrackList.length + 1
				: 1;
		},
		getUserQueue() {
			return this.$store.getters['controller/getUserQueue']?.queue;
		},
		getQueueUris() {
			return this.getUserQueue.map(item => item?.uri);
		},
		allQueueList() {
			return this.$store.getters['controller/getAllQueueList'];
		},

		getQueueTopFavTracks() {
			return this.$store.getters['controller/getQueueFavTrackIDs'];
		},
		addGreenHeartEl() {
			return this.getQueueTopFavTracks.map(item =>
				document.getElementById(`${item}`)
			);
		},
	},
	methods: {
		trackDuration(duration) {
			const minutes = Math.floor(duration / 60000);
			const seconds = Math.floor((duration % 60000) / 1000);
			const result = minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
			return result;
		},

		findFavTracks() {
			this.allFavTracks.forEach((track, i) => {
				this.getUserQueue.forEach((item, i) => {
					if (track.track.id === item.id) {
						this.$store.dispatch('controller/queueFavTrackIDs', item.id);
					}
				});
			});
		},
		addGreenHeartFavTracks(trackItem = false) {
			if (!trackItem) {
				this.addGreenHeartEl.forEach(item => {
					item?.children[4].children[0].classList.remove(
						'emptyHeart',
						'animationEmptyHeart'
					);
					item?.children[4].children[0].classList.add('greenHeart');

					item?.children[4].children[0].children[0].children[0].classList.remove(
						'hidden'
					);

					item?.children[4].children[0].children[0].children[1].classList.add(
						'hidden'
					);
				});
			} else {
				trackItem?.children[4].children[0].classList.remove(
					'emptyHeart',
					'animationEmptyHeart'
				);
				trackItem?.children[4].children[0].classList.add('greenHeart');
				trackItem?.children[4].children[0].classList.add('animationGreenHeart');
				trackItem?.children[4].children[0].children[0].children[0].classList.remove(
					'hidden'
				);

				trackItem?.children[4].children[0].children[0].children[1].classList.add(
					'hidden'
				);
			}
		},
		removeGreenHeartFavTracks(item) {
			item?.children[4].children[0].classList.remove(
				'greenHeart',
				'animationGreenHeart'
			);
			item?.children[4].children[0].classList.add('emptyHeart');
			item?.children[4].children[0].classList.add('animationEmptyHeart');

			item?.children[4].children[0].children[0].children[0].classList.add(
				'hidden'
			);
			item?.children[4].children[0].children[0].children[1].classList.remove(
				'hidden'
			);
		},
		clearQueue() {
			this.$store.commit('controller/clearQueueTrackList');
		},
	},
	watch: {},
	created() {
		this.queuePage = true;
		this.findFavTracks();
		this.addGreenHeartFavTracks();
		this.header = document.getElementById('header');
		this.header.classList.add('base2-intersec-bg2');
		if (
			this.queueTrackList.length &&
			this.lastQueueTrackListLength !== this.queueTrackList.length
		) {
			this.allQueueList.splice(0, this.queueTrackList.length);
			this.$store.commit(
				'controller/lastQueueTrackListLength',
				this.queueTrackList.length
			);
		}
	},
	unmounted() {
		this.$store.commit('controller/clearQueueTracksID');
		this.header ? this.header.classList.remove('base2-intersec-bg2') : '';
	},
};
</script>

<style scoped lang="scss">
.greenHeart {
	color: #1fdf64;
}
.animationGreenHeart {
	animation: heart 0.2s ease-in;
}

.emptyHeart {
	color: #9b9b9b;
}
.animationEmptyHeart {
	animation: emptyheart 0.2s ease-in-out 1 alternate;
}

@keyframes heart {
	33% {
		transform: scale(1.4);
	}
	66% {
		transform: scale(1.2);
	}
	100% {
		transform: scale(1.5);
	}
}
@keyframes emptyheart {
	33% {
		transform: translateX(-6px) rotate(-20deg);
	}
	66% {
		transform: translateX(6px) rotate(20deg);
	}
	100% {
		transform: translateX(0) rotate(0);
	}
}
</style>
