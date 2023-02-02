<template>
  <div
    role="row"
    class="group grid grid-rows-0 group border border-transparent relative h-[56px] hover:bg-light relative shrink-1 px-1 rounded-md gap-2"
    :class="{
      activeTrack: trackOptions,
      activeTrack: active,
      'lg:pl-[2rem]':
        favoriteSongs ||
        albumsPage ||
        singlePage ||
        favTrackPage2 ||
        playlistPage,
      'pl-5':
        favoriteSongs ||
        albumsPage ||
        singlePage ||
        diskografiPage ||
        favTrackPage ||
        favTrackPage2 ||
        playlistPage,
      'sm:grid-cols-colPreDisco':
        diskografiPage || albumsPage || singlePage || favTrackPage2,
      'sm:grid-cols-colArtPop': artistPage || favTrackPage,
      'sm:grid-cols-colPresm md2:grid-cols-colPremd lg2:grid-cols-colPre':
        !diskografiPage &&
        !albumsPage &&
        !singlePage &&
        !artistPage &&
        !favTrackPage &&
        !favTrackPage2,
      'mx-5 ': !margin && !diskografiPage,
    }"
    @click="active = true"
  >
    <div
      role="track-index"
      class="flex w-full h-full items-center justify-center"
    >
      <div class="relative flex text-right items-center justify-end pr-[14px] w-full">
        <span class="text-lg group-hover:hidden text-white">
          {{ index + 1 }}</span
        >
        <button class="absolute right-3">
          <svg role="img" height="16" width="16" viewBox="0 0 24 24">
            <path
              class=" hidden group-hover:block"
              fill="#FFFFFF"
              d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"
            ></path>
            <path
              class="hidden"
              fill="#FFFFFF"
              d="M5.7 3a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7H5.7zm10 0a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7h-2.6z"
            ></path>
          </svg>
        </button>
      </div>
    </div>

    <div class="flex justify-start items-center">
      <img
        v-if="
          !diskografiPage &&
          !albumsPage &&
          !singlePage &&
          !favTrackPage &&
          !favTrackPage2
        "
        class="object-fit w-[40px] h-[40px]"
        src="https://i.scdn.co/image/ab67616d0000485161f99dd2268d37e116721c25"
        alt=""
      />
      <div
        :class="{
          'pl-5':
            !diskografiPage &&
            !albumsPage &&
            !singlePage &&
            !favTrackPage &&
            !favTrackPage2,
        }"
        class="font-normal text-base truncate"
      >
        <div
          :class="{ 'hover:underline': favoriteSongs || playlistPage }"
          class="text-white truncate font-semibold"
        >
          <slot class="truncate" name="trackName"></slot>
        </div>
        <span class="text-xs sm3:text-sm text-lightest group-hover:text-white"
          ><span
            :class="{
              'hover:underline cursor-default':
                favoriteSongs ||
                albumsPage ||
                singlePage ||
                profile ||
                favTrackPage ||
                favTrackPage2 ||
                playlistPage,
            }"
            ><slot name="artist"></slot></span
        ></span>
      </div>
    </div>

    <div
      v-if="!albumsPage && !diskografiPage && !singlePage && !favTrackPage2"
      class="flex justify-start items-center hidden md2:flex sm:ml-[2px]"
    >
      <span
        class="text-sm text-lightest truncate group-hover:text-white font-semibold w-[5rem] text-right"
      >
        <span :class="{ 'hover:underline': favoriteSongs || playlistPage }">
          <slot name="albumName"></slot
        ></span>
        <span class="cursor-default w-full"
          ><slot name="listenNumber"></slot
        ></span>
      </span>
    </div>

    <div
      v-if="notShowArt"
      :class="{
        'lg2:flex': favoriteSongs || playlistPage,
      }"
      class="flex justify-start items-center hidden sm:ml-[5px]"
    >
      <span class="text-sm text-lightest">
        <a class="cursor-default" href="#"><slot name="favTime"></slot></a
      ></span>
    </div>

    <div class="flex justify-start items-center px-5">
      <button class="flex justify-center">
        <svg role="img" height="16" width="16" viewBox="0 0 16 16">
          <path
            v-if="this.$route.fullPath === '/collection/tracks'"
            fill="#1FDF64"
            d="M15.724 4.22A4.313 4.313 0 0012.192.814a4.269 4.269 0 00-3.622 1.13.837.837 0 01-1.14 0 4.272 4.272 0 00-6.21 5.855l5.916 7.05a1.128 1.128 0 001.727 0l5.916-7.05a4.228 4.228 0 00.945-3.577z"
          ></path>
          <path
            fill="#B3B3B3"
            :class="{ hidden: this.$route.fullPath === '/collection/tracks' }"
            class="invisible group-hover:visible"
            d="M1.69 2A4.582 4.582 0 018 2.023 4.583 4.583 0 0111.88.817h.002a4.618 4.618 0 013.782 3.65v.003a4.543 4.543 0 01-1.011 3.84L9.35 14.629a1.765 1.765 0 01-2.093.464 1.762 1.762 0 01-.605-.463L1.348 8.309A4.582 4.582 0 011.689 2zm3.158.252A3.082 3.082 0 002.49 7.337l.005.005L7.8 13.664a.264.264 0 00.311.069.262.262 0 00.09-.069l5.312-6.33a3.043 3.043 0 00.68-2.573 3.118 3.118 0 00-2.551-2.463 3.079 3.079 0 00-2.612.816l-.007.007a1.501 1.501 0 01-2.045 0l-.009-.008a3.082 3.082 0 00-2.121-.861z"
          ></path>
        </svg>
      </button>
      <div
        class="text-xs sm3:text-sm mx-[1rem] text-lightest w-[4rem] flex justify-end"
      >
        <slot name="duration"></slot>
      </div>
      <button @click="toggleTrackOptions" class="text-[#fff] cursor-default">
        <svg
          role="img"
          height="16"
          width="16"
          viewBox="0 0 16 16"
          class="invisible group-hover:visible"
          :class="{ visibleDots: trackOptions }"
        >
          <path
            fill="currentColor"
            d="M3 8a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm6.5 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM16 8a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
          ></path>
        </svg>
      </button>
    </div>
    <TrackOptions
      v-if="trackOptions"
      :album="album"
      :track="track"
      :trackOptions="trackOptions"
      :artistPage="artistPage"
      :selectArtCardName="selectArtCardName"
    />
  </div>
</template>

<script>
import TrackOptions from './TrackOptions.vue';

export default {
  name: 'PlaylistItems',
  components: { TrackOptions },
  props: [
    'index',
    'trackName',
    'artist',
    'album',
    'albumName',
    'favTime',
    'isFav',
    'duration',
    'favoriteSongs',
    'artistPage',
    'profile',
    'selectArtCardName',
    'diskografiPage',
    'albumsPage',
    'singlePage',
    'playlistPage',
    'favTrackPage',
    'favTrackPage2',
    'margin',
  ],
  data() {
    return {
      trackOptions: false,
      active: false,
    };
  },
  computed: {
    notShowArt() {
      return this.artistPage ? false : true;
    },
  },
  methods: {
    toggleTrackOptions() {
      this.trackOptions = !this.trackOptions;
    },
    close(e) {
      if (!this.$el.contains(e.target)) {
        this.trackOptions = false;
        this.active = false;
      }
    },
  },
  mounted() {
    document.addEventListener('click', this.close);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.close);
  },
};
</script>

<style>
.activeTrack {
  background-color: hsla(0, 0%, 100%, 0.3) !important;
}

.visibleDots {
  visibility: visible !important;
}
</style>
