<template>
  <section class="favAlbums-Page p-5 mt-2 lg:ml-[1rem]">
    <div class="text-white">
      <div id="favAlbums" class="mb-7">
        <div class="h-fit">
          <h2
            class="text-[1.6rem] text-white leading-7 tracking-tighter"
            style="font-weight: 700"
          >
            Albümler
          </h2>
        </div>
      </div>
    </div>

    <div
      class="relative grid grid-cols-col180 sm:gap-3 md2:gap-6 grid-rows-auto"
    >
      <div
        v-for="album in getFavAlbums"
        :key="album.album.id"
        :id="album.album.id"
        @click="openSelectedAlbum(msg, $event)"
        class="album--card bg-dark1 hover:bg-opacblack1 ease duration-300 w-full h-auto cursor-pointer rounded-md flex-1 p-4 relative"
      >
        <div class="h-full group">
          <div class="w-full mb-5 relative">
            <img
              class="h-full w-full object-cover"
              :src="album?.album?.images[0]?.url"
              alt=""
            />
            <div
              class="right-0 bottom-0 p-2 absolute flex items-center right-0 bottom-0 py-1 px-2 group-hover:block opacity-0 group-hover:opacity-100 transition ease-in duration-200 group-hover:translate-y-[-0.4rem]"
            >
              <button
                id="playBtn"
                class="p-3 bg-green3 rounded-full cursor-default lg:group-hover:block hover:scale-110 shadow-[0px_5px_6px_2px_rgba(0,0,0,0.4)]"
              >
                <span>
                  <svg role="img" height="24" width="24" viewBox="0 0 24 24">
                    <path
                      fill="text-black"
                      d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"
                    ></path>
                  </svg>
                </span>
              </button>
            </div>
          </div>
          <div class="flex items-middle flex-col justify-center">
            <h2 class="text-white max-w-full truncate">
              {{ album.album.name }}
            </h2>
            <div class="text-lightest line-clamp-2">
              <span
                v-for="artist in album.album.artists"
                :key="artist.id"
                :id="artist.id"
                class="artist--card text-sm hover:underline cursor-pointer w-full"
              >
                {{
                  album.album.artists.length > 1
                    ? artist.name ===
                      album.album.artists[album.album.artists.length - 1].name
                      ? artist.name
                      : artist.name + ", "
                    : artist.name
                }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <section>
      <Info />
    </section>
  </section>
</template>

<script>
import Info from "../SpotifyInfo/Info.vue";

export default {
  name: "FavAlbums",
  props: [],
  components: { Info },
  data() {
    return { favAlbums: false };
  },
  methods: {
    openSelectedAlbum(_, e) {
      console.log(e.target.closest(".artist--card"));
      if (e.target.closest("#playBtn")?.id === "playBtn") {
        console.log("toggle Play/Stop Playlists");
      } else {
        const currentID = e.target.closest(".album--card").id;
        this.$router.push({ name: "album", params: { id: currentID } });
      }
      if (e.target.closest(".artist--card")?.id) {
        const currentID = e.target.closest(".artist--card").id;
        this.$router.push({ name: "artist", params: { id: currentID } });
      }
    },
  },
  computed: {
    getFavAlbums() {
      return this.$store.getters["albums/getFavAlbums"];
    },
  },
  mounted() {
    this.favAlbums = true;

    console.log("favAlbums Mounted");

    this.header = document.getElementById("header");
    this.favAlbumsEl = document.getElementById("favAlbums");

    this.headerHeight = document
      .getElementById("header")
      .getBoundingClientRect().height;

    this.options = {
      root: null,
      threshold: [0.4, 0.95],
      rootMargin: `-${this.headerHeight}px`,
    };

    this.observer = new IntersectionObserver((entries) => {
      console.log(entries);

      this.header.classList.toggle(
        "librarySec3-intersec-bg1",
        entries[0].intersectionRatio <= 0.95
      );

      this.header.classList.toggle(
        "librarySec3-intersec-bg2",
        entries[0].intersectionRatio <= 0.4
      );
    }, this.options);
    console.log(this.observer);

    this.observer.observe(this.favAlbumsEl);
  },
  beforeUnmount() {
    console.log("FavAlbums Unmounted");
    this.observer.unobserve(this.favAlbumsEl);
    this.header.classList.remove("librarySec3-intersec-bg1");
    this.header.classList.remove("librarySec3-intersec-bg2");
    this.favAlbums = false;
  },
};
</script>

<style></style>
