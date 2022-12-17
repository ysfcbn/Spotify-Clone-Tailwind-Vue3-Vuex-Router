<template>
  <section class="genre-page p-5 lg:ml-[1rem]">
    <div id="genres" class="items-center flex min-h-[240px] w-full relative">
      <div class="text-white font-semibold">
        <h1
          class="w-full sm:text-8xl tracking-tighter"
          style="font-weight: 700"
        >
          {{ genreTitle }}
        </h1>
      </div>
    </div>

    <Card
      :genrePage="genrePage"
      @click="selectedPlaylist(msg, $event)"
      :currentData="currentCategoryPlaylists"
    >
      <template #cardTitle> {{ genreTitle }}</template>

      <template #imgContainer="{ data }">
        <div class="w-full relative mb-5">
          <img
            class="h-full w-full object-cover"
            :src="data?.images[0]?.url"
            alt="image"
          />
        </div>
      </template>
      <template #firstTitle="{ data }">{{ data.name }}</template>
      <template #secondTitle="{ data }"
        ><span>{{ data.description }}</span>
      </template>
    </Card>
    <section>
      <Info />
    </section>
  </section>
</template>

<script>
import Info from "../SpotifyInfo/Info.vue";
import axios from "axios";
import Card from "../Cards/Card.vue";

export default {
  name: "genrePage",
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  components: { Info, Card },
  data() {
    return { genrePage: false };
  },
  methods: {
    async fetchCategoryPlaylists() {
      await axios
        .get(
          `https://api.spotify.com/v1/browse/categories/${this.$route.params.id}/playlists?limit=50`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + (await this.getToken),
            },
          }
        )
        .then(({ data }) => {
          console.log(data);
          this.$store.dispatch("genres/currentCategoryPlaylists", data);
        })
        .catch((err) => console.log(err));
    },
    selectedPlaylist(_, event) {
      if (event.target.closest("#playBtn")?.id === "playBtn") {
        console.log("toggle Play/Stop Playlists");
      } else {
        const currentID = event.target.closest(".card--container").id;
        this.$router.push({ name: "playlist", params: { id: currentID } });
      }
    },
  },
  computed: {
    isAuth() {
      return this.$store.getters.isAuth;
    },
    getToken() {
      return this.$store.getters.accessToken;
    },
    currentCategoryPlaylists() {
      return this.$store.getters["genres/getCurrentCategoryPlaylists"]
        ?.playlists?.items;
    },
    genreTitle() {
      return this.$store.getters["genres/getGenreTitle"];
    },
  },
  async created() {
    console.log("genrePage Mounted");
    this.genrePage = true;

    await this.fetchCategoryPlaylists();

    this.header = document.getElementById("header");
    this.genreEl = document.getElementById("genres");

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

      entries[0].intersectionRatio >= 0.4
        ? this.$store.dispatch("controller/closeHeaderBtn")
        : this.$store.dispatch("controller/showHeaderBtn");
    }, this.options);
    console.log(this.observer);

    this.observer.observe(this.genreEl);
  },
  beforeUnmount() {
    console.log("genrePage Unmounted");
    this.observer.unobserve(this.genreEl);
    this.header.classList.remove("librarySec3-intersec-bg1");
    this.header.classList.remove("librarySec3-intersec-bg2");
    this.genrePage = false;
  },
};
</script>

<style></style>
