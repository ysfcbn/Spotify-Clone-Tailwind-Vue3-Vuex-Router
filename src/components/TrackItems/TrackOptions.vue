<template>
  <ul
    :class="{
      'top-[2.5rem] right-[1rem]': !artistPage,
      'right-[3.5rem]': artistPage,
    }"
    :style="{
      top: [`${index + 1}`],
    }"
    class="option--container z-[9999] absolute bg-dark2 p-[4px] h-fit w-[15rem] text-opacwhite3 text-sm whitespace-normal rounded cursor-default shadow-[0px_15px_15px_1px_rgba(0,0,0,0.4)]"
  >
    <li
      @click="addToQueue((uri = { uri: uri, index: index }))"
      class="w-full p-[10px] hover:bg-dark3 border-b border-opacwhite1"
    >
      <button class="w-full flex justify-start cursor-default">
        <span class="cursor-default">Add to queue</span>
      </button>
    </li>
    <li class="w-full p-[10px] hover:bg-dark3">
      <button class="cursor-default">
        <span>Go to song radio</span>
      </button>
    </li>
    <li
      v-if="track.artists.length > 1"
      @mouseenter="visibleArt = true"
      @mouseleave="visibleArt = false"
      class="w-full p-[10px] hover:bg-dark3 flex justify-between"
    >
      <button class="cursor-default">
        <span>Go to artist</span>
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
        v-if="visibleArt"
        class="z-[9999] absolute bg-dark2 top-[5.3rem] left-[-9.8rem] p-[4px] h-fit w-[10rem] text-opacwhite3 text-sm whitespace-normal rounded cursor-default shadow-[0px_15px_15px_1px_rgba(0,0,0,0.4)]"
      >
        <li
          v-for="artist in track.artists"
          :key="artist.id"
          class="w-full p-[10px] hover:bg-dark3"
          @click="openArtist(artist.id)"
        >
          <button class="cursor-default">
            <span>
              {{ artist.name }}
            </span>
          </button>
        </li>
      </ul>
    </li>
    <li
      v-else
      @click="openArtist(track.artists[0].id)"
      class="w-full p-[10px] hover:bg-dark3 flex justify-between"
    >
      <button class="cursor-default">
        <span>Go to artist</span>
      </button>
    </li>
    <li
      @click="openAlbum(track.album.id)"
      class="w-full p-[10px] hover:bg-dark3"
    >
      <button class="cursor-default">
        <span>Go to album</span>
      </button>
    </li>
    <li class="w-full p-[10px] hover:bg-dark3 border-b border-opacwhite1">
      <button class="cursor-default">
        <span>Show credits</span>
      </button>
    </li>
    <li class="w-full p-[10px] hover:bg-dark3 w-full">
      <button class="cursor-default flex justify-start">
        <span>Remove from your Liked Songs</span>
      </button>
    </li>
    <li
      @mouseenter="visiblePlaylist = true"
      @mouseleave="visiblePlaylist = false"
      class="group w-full flex justify-start p-[6px] md:p-[8px] hover:bg-dark3 border-b border-opacwhite1"
    >
      <button class="cursor-default flex items-center justify-between w-full">
        <span class="text-xs md:text-sm">Add to playlist</span>
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
        v-if="visiblePlaylist"
        class="z-40 absolute bg-dark2 top-[-7rem] left-[-15.5rem] p-[4px] h-[25rem] w-[15.8rem] text-opacwhite3 whitespace-normal rounded shadow-[0px_15px_15px_1px_rgba(0,0,0,0.4)]"
      >
        <li
          class="w-full flex items-center justify-start hover:bg-dark3 border-opacwhite mb-1"
        >
          <input
            v-model="searchEl"
            type="text"
            placeholder="Find a playlist"
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
          <button
            id="close--btn"
            @click="clean"
            v-if="typing"
            class="right-0 px-3 absolute"
          >
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
            <span class="text-xs md:text-sm">Create playlist</span>
          </button>
        </li>
      </ul>
    </li>
    <li
      @mouseenter="visibleShare = true"
      @mouseleave="visibleShare = false"
      class="group w-full flex justify-start p-[6px] md:p-[8px] hover:bg-dark3 border-b border-opacwhite1"
    >
      <button class="cursor-default flex items-center justify-between w-full">
        <span>Share</span>
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
      </button>

      <ul
        v-if="visibleShare"
        class="z-40 absolute bg-dark2 top-[17.8rem] left-[-11.8rem] p-[4px] h-fit w-[12rem] text-opacwhite3 whitespace-normal rounded shadow-[0px_15px_15px_1px_rgba(0,0,0,0.4)]"
      >
        <li
          @click="copyURL"
          class="w-full flex justify-start p-[6px] md:p-[8px] hover:bg-dark3 border-opacwhite"
        >
          <button class="cursor-default">
            <span class="text-xs md:text-sm">Copy Song Link</span>
          </button>
        </li>
        <li class="w-full flex justify-start p-[6px] md:p-[8px] hover:bg-dark3">
          <button class="cursor-default">
            <span class="text-xs md:text-sm">Embed track</span>
          </button>
        </li>
      </ul>
    </li>
    <li class="w-full p-[10px] hover:bg-dark3">
      <button class="cursor-default">
        <span>Open in Desktop app</span>
      </button>
    </li>
  </ul>
</template>

<script>
export default {
  name: "TrackOptions",
  props: ["artistPage", "uri", "index", "track"],
  emits: ["closeTrackOption", "cleanBtnE"],
  data() {
    return {
      visibleArt: false,
      visiblePlaylist: false,
      visibleShare: false,
      searching: false,
      searchEl: "",
    };
  },
  methods: {
    async addToQueue(uri) {
      await this.$store.dispatch("controller/addItemToQueue", uri.uri);
      this.$emit("closeTrackOption", false);
    },
    openArtist(artistID) {
      this.$router.push({ name: "artist", params: { id: artistID } });
    },
    openAlbum(albumID) {
      this.$router.push({ name: "album", params: { id: albumID } });
    },

    clean() {
      this.searchEl = "";
    },

    copyURL() {
      this.$store.dispatch("controller/modalInfoType", {
        type: "copyURL",
        status: true,
      });
      this.$emit("closeTrackOption", false);
    },
  },
  computed: {
    typing() {
      return this.searchEl.length
        ? (this.searching = true)
        : (this.searching = false);
    },
  },
  mounted() {},
  beforeUnmount() {},
};
</script>

<style></style>
