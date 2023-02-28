<template>
  <section class="podcast--page box-border">
    <div
      id="episodes"
      class="p-5 max-h-[800px] min-h-[340px] w-full mt-[-66px] relative bg-gradient-to-b from-podcastGreen to-podcastGreen2 shadow-[2px_0px_5px_5px_rgba(0,0,0,0.4)] bg-gradient-to-b from-darkpurple via-purpl4 to-dark-1"
      style="height: 326px"
    >
      <div class="flex items-end justify-start h-full lg:ml-[1rem]">
        <div
          class="flex sm:w-[192px] sm:min-w-[192px] xl:h-[232px] xl:w-[232px] xl:min-w-[232px] shadow-[0_8px_40px_10px_rgba(0,0,0,0.6)] rounded-[12px]"
        >
          <div
            class="flex items-center justify-center sm:w-[192px] sm:min-w-[192px] sm:h-[192px] xl:h-[232px] xl:w-[232px] xl:min-w-[232px] bg-podcastGreen rounded-md"
          >
            <svg
              role="img"
              height="64"
              width="64"
              viewBox="0 0 24 24"
              class="text-green5"
            >
              <path
                fill="currentColor"
                d="M7 1a3 3 0 00-3 3v17.167c0 1.448 1.657 2.27 2.81 1.393L12 18.612l5.19 3.948c1.153.876 2.81.055 2.81-1.393V4a3 3 0 00-3-3H7z"
              ></path>
            </svg>
          </div>
        </div>
        <div
          style="font-weight: 700"
          class="flex flex-col text-xs text-white px-4"
        >
          <h2 class="">PLAYLIST</h2>
          <span>
            <h1
              class="w-full sm:text-3xl md:text-5xl xl:text-8xl tracking-tighter py-2"
            >
              Your Episodes
            </h1>

            <h2 id="info"></h2>
          </span>
          <div
            class="flex flex-wrap mt-2 text-white w-full text-xs sm3:text-sm h-full font-semibold"
          >
            <div class="w-full flex items-center flex-nowrap shrink-0">
              <div class="w-7 h-7" v-if="userAvatar">
                <img class="rounded-full" :src="userAvatar" alt="user" />
              </div>
              <span class="ml-2">
                <router-link
                  class="hover:underline cursor-pointer"
                  style="font-weight: 700"
                  :to="{
                    name: 'user',
                    params: { id: currentUserID },
                  }"
                  >{{ userName }}</router-link
                >
              </span>

              <span
                class="before:content-['•'] before:mx-1 text-sm"
                style="font-weight: 500"
                >{{ totalEpisode }} {{ episodeCalc }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="bg-gradient-to-b from-podcastGreen4 dark absolute w-full h-[212px] left-0 shrink-0 z-0"
    ></div>

    <div class="w-full h-[6.8rem] relative flex items-start py-[24px]">
      <div class="w-full ml-[1.2rem] flex items-center lg:ml-[2rem]">
        <button
          class="rounded-full bg-green3 p-[0.9rem] cursor-default hover:scale-105"
        >
          <span>
            <svg role="img" height="28" width="28" viewBox="0 0 24 24" class="">
              <path
                fill="currentColor"
                d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"
              ></path>
            </svg>
            <svg
              role="img"
              height="28"
              width="28"
              viewBox="0 0 24 24"
              class="hidden"
            >
              <path
                d="M5.7 3a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7H5.7zm10 0a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7h-2.6z"
              ></path>
            </svg>
          </span>
        </button>
      </div>
    </div>
    <PodcastEpisodes
      v-for="(episode, i) in userFavEpisodes"
      :key="episode.id"
      :index="i"
      :episode="episode.episode"
      :episodes="episodes"
      :isUserFavEpisode="isUserFavEpisode"
    />

    <section class="sm:pl-5 lg:p-5 lg:ml-[1rem]">
      <Info />
    </section>
  </section>
</template>

<script>
import PodcastEpisodes from "./PodcastEpisodes.vue";
import EpisodeOptions from "./EpisodeOptions.vue";
import Info from "../SpotifyInfo/Info.vue";
import axios from "axios";

export default {
  name: "Episodes",
  components: { PodcastEpisodes, EpisodeOptions, Info },
  props: ["episode", "index"],
  data() {
    return {
      episodes: false,
    };
  },
  computed: {
    getToken() {
      return this.$store.getters.accessToken;
    },
    getCurrentUser() {
      return this.$store.getters.getCurrentUser;
    },
    currentUserID() {
      return this.getCurrentUser?.id;
    },
    userName() {
      return this.getCurrentUser?.display_name;
    },
    userAvatar() {
      return this.getCurrentUser?.images[0]?.url;
    },
    getFavEpisodes() {
      return this.$store.getters["episodes/getFavEpisodes"];
    },
    totalEpisode() {
      return this.getFavEpisodes.total;
    },
    episodeCalc() {
      return this.totalFavEpisodes > 1 ? "episodes" : "episode";
    },
    userFavEpisodes() {
      return this.getFavEpisodes.items;
    },
    getUserFavEpisodes() {
      return this.getFavEpisodes?.items?.length;
    },
    favEpisodesIDs() {
      return this.userFavEpisodes.map((item) => item.episode.id).join(",");
    },
  },
  methods: {
    async fetchFavEpisodes() {
      await axios
        .get("https://api.spotify.com/v1/me/episodes?limit=50", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + (await this.getToken),
          },
        })
        .then(({ data }) => {
          console.log(data);
          this.$store.dispatch("episodes/favEpisodes", data);
        })
        .catch((err) => console.log(err));
    },
    async isUserFavEpisode() {
      await axios
        .get(
          `https://api.spotify.com/v1/me/episodes/contains?ids=` +
            this.favEpisodesIDs,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + this.getToken,
            },
          }
        )
        .then(({ data }) => {
          this.$store.dispatch("episodes/isFavEpisode", data);
        })
        .catch((err) => console.log(err));
    },
  },

  async created() {
    console.log("episodes Mounted");
    this.episodes = true;
    this.getUserFavEpisodes ? "" : await this.fetchFavEpisodes();
    await this.isUserFavEpisode();

    this.header = document.getElementById("header");
    this.episodesEl = document.getElementById("episodes");

    this.options = {
      root: null,
      threshold: [0.1, 0.4],
    };

    this.observer = new IntersectionObserver((entries) => {
      this.header.classList.toggle(
        "podcast-intersec-bg1",
        entries[0].intersectionRatio <= 0.4
      );
      this.header.classList.toggle(
        "podcast-intersec-bg2",
        entries[0].intersectionRatio <= 0.1
      );

      entries[0].intersectionRatio >= 0.1
        ? this.$store.dispatch("controller/closeHeaderBtn")
        : this.$store.dispatch("controller/showHeaderBtn");
    }, this.options);

    this.observer.observe(this.episodesEl);
  },

  beforeUnmount() {
    console.log("Episodes unMounted");

    this.observer.unobserve(this.episodesEl);
    this.header.classList.remove("podcast-intersec-bg1");
    this.header.classList.remove("podcast-intersec-bg2");
    this.episodes = false;
  },
  unmounted() {
    this.$store.dispatch("controller/closeHeaderBtn");
  },
};
</script>

<style></style>
