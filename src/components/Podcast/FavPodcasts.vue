<template>
  <section class="favPodcasts-Page p-5 mt-2 lg:ml-[1rem]">
    <div class="text-white">
      <div id="favPodcasts" class="mb-8">
        <div class="h-fit">
          <h2
            class="text-[1.6rem] text-white leading-7 tracking-tighter"
            style="font-weight: 700"
          >
            Your Episodes
          </h2>
        </div>
      </div>

      <!-- Cards -->
      <div
        class="relative grid grid-cols-col180 gap-4 grid-rows-1 flex-1 mb-10"
      >
        <div
          @click="togglePodcastPage(msg, $event)"
          class="col-span-2 group ease duration-200 w-full h-auto cursor-pointer rounded-md flex-1 p-4 relative leading-8 text-md text-white bg-gradient-to-br from-podcastGreen6 to-green6"
        >
          <div
            class="z-10 absolute flex items-center opacity-0 group-hover:opacity-100 transition ease-in duration-200 right-1 bottom-1 p-3 group-hover:block group-hover:translate-y-[-0.5rem]"
          >
            <button
              id="playBtn"
              class="p-[12px] bg-green3 rounded-full cursor-default lg:group-hover:block hover:scale-105 shadow-[0px_5px_6px_2px_rgba(0,0,0,0.4)]"
            >
              <span>
                <svg role="img" height="20" width="20" viewBox="0 0 24 24">
                  <path
                    fill="text-black"
                    d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"
                  ></path>
                </svg>
              </span>
            </button>
          </div>
          <div class="h-full relative">
            <div class="flex flex-col justify-end h-full relative">
              <div
                class="flex items-end text-white max-h-[90px] mb-8 w-full overflow-hidden"
              >
                <div
                  class="text-elipsis overflow-hidden whitespace-normal line-clamp-3"
                >
                  <span
                    v-for="{ episode } in getFavEpisodes"
                    :key="episode.id"
                    class="text-white font-semibold after:text-opacwhite5 after:content-['•']"
                  >
                    <span class=""></span>
                    {{ episode.name }}
                    <span class="text-opacwhite5 pr-1">{{
                      episode.show.name
                    }}</span>
                  </span>
                </div>
              </div>

              <div class="w-full min-h-[68px] flex flex-col justify-between">
                <a href="#" class="inline-block max-w-full">
                  <div
                    class="text-4xl text-white leading-7 tracking-tight"
                    style="font-weight: 700"
                  >
                    Your Episodes
                  </div>
                </a>
                <div
                  class="text-md text-white leading-7 tracking-tight font-semibold"
                >
                  <div
                    class="text-white lowercase leading-6 tracking-tight text-[16px]"
                  >
                    {{ totalFavEpisodes }} {{ episodeCalc }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          @click="toggleShowPage(msg, $event)"
          v-for="{ show } in getFavShows"
          :key="show.id"
          :id="show.id"
          class="show-card-container bg-dark1 hover:bg-opacblack1 ease duration-200 w-full h-auto cursor-pointer rounded-md flex-1 p-4 relative group"
        >
          <div class="h-full">
            <div class="w-full mb-5 relative">
              <img
                class="object-cover"
                :src="show?.images[0]?.url"
                alt="show image"
              />
            </div>
            <div class="flex items-middle flex-col justify-center">
              <div class="text-white max-w-full truncate">{{ show.name }}</div>
              <div class="text-sm text-lightest w-full truncate">
                {{ show.publisher }}
              </div>
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
  name: "favPodcasts",
  components: { Info },
  data() {
    return {
      favPodcasts: false,
    };
  },
  methods: {
    togglePodcastPage(_, event) {
      if (event.target.closest("#playBtn")?.id === "playBtn") {
        console.log("toggle Play/Stop  FavPodcast Episodes");
      } else this.$router.push("/collection/episodes");
    },
    toggleShowPage(_, event) {
      const selecktedID = event.target.closest(".show-card-container").id;
      this.$router.push({ name: "show", params: { id: selecktedID } });
    },
  },
  computed: {
    getFavEpisodes() {
      return this.$store.getters["episodes/getFavEpisodes"]?.items;
    },
    totalFavEpisodes() {
      return this.$store.getters["episodes/getFavEpisodes"]?.total;
    },
    episodeCalc() {
      return this.totalFavEpisodes > 1 ? "episodes" : "episode";
    },
    getFavShows() {
      return this.$store.getters["shows/getFavShows"]?.items;
    },
  },
  mounted() {
    this.favPodcasts = true;

    console.log("favPodcasts Mounted");

    this.header = document.getElementById("header");
    this.favPodcastsEl = document.getElementById("favPodcasts");

    this.headerHeight = document
      .getElementById("header")
      .getBoundingClientRect().height;

    this.options = {
      root: null,
      threshold: [0.4, 0.95],
      rootMargin: `-${this.headerHeight}px`,
    };

    console.log(this.headerHeight);
    console.log(this.favPodcastsEl);

    this.observer = new IntersectionObserver((entries) => {
      console.log(entries);

      this.header.classList.toggle(
        "librarySec2-intersec-bg1",
        entries[0].intersectionRatio <= 0.95
      );

      this.header.classList.toggle(
        "librarySec2-intersec-bg2",
        entries[0].intersectionRatio <= 0.4
      );
    }, this.options);
    console.log(this.observer);

    this.observer.observe(this.favPodcastsEl);
  },
  beforeUnmount() {
    console.log("favPodcasts Unmounted");
    this.observer.unobserve(this.favPodcastsEl);
    this.header.classList.remove("librarySec2-intersec-bg1");
    this.header.classList.remove("librarySec2-intersec-bg2");
    this.favPodcasts = false;
  },
};
</script>

<style></style>
