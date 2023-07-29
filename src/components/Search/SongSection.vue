<template>
  <div
    id="songsSection"
    :class="{ 'mx-5 z-0': false }"
    class="relative h-full min-w-[450]"
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
                  : artist.name + ", "
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
import TrackItemsHeader from "../TrackItems/TrackItemsHeader.vue";
import TrackItems from "../TrackItems/TrackItems.vue";
export default {
  components: {
    TrackItems,
    TrackItemsHeader,
  },
  data() {
    return {
      options2: "",
      songSecEl: null,
      observer2: null,
      presentation: null,
      headerHeight: document.getElementById("header").getBoundingClientRect()
        .height,
      bodyHeight: document.body.getBoundingClientRect().height,
      bodyWidth: document.body.getBoundingClientRect().width,
      margin: false,
    };
  },
  methods: {
    trackDuration(duration) {
      const minutes = Math.floor(duration / 60000);
      const seconds = Math.floor((duration % 60000) / 1000);
      const result = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
      return result;
    },
    resizeOption2(options) {
      if (window.innerHeight - 92 <= 64) {
        this.bodyHeight = +window.innerHeight - 92;
        return;
      }

      this.bodyHeight = +window.innerHeight - 92;
      this.bodyWidth = +window.innerWidth - 92;

      this.observer2 ? this.observer2.unobserve(this.presentation) : "";

      return options;
    },
  },
  computed: {
    getAllSongs() {
      return this.$store.getters["searchItem/getAllSongs"];
    },
  },
  watch: {
    bodyHeight(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.bodyHeight = +newVal;
        this.bodyHeight = +this.bodyHeight.toFixed(1);
        this.options2 = {
          root: document.body,
          threshold: 0,
          rootMargin: `${
            +((this.headerHeight * 100) / this.bodyHeight).toFixed(1) * -1
          }% 0px -${
            100 - +((this.headerHeight * 100) / this.bodyHeight).toFixed(1)
          }% 0px`,
        };

        this.observer2
          ? (this.observer2 = new IntersectionObserver((entries) => {
              if (entries[0].isIntersecting) {
                this.presentation.classList.add("prebg");
                this.margin = false;
              } else {
                this.presentation.classList.remove("prebg");
                this.margin = true;
              }
            }, this.resizeOption2(this.options2)))
          : "";
        this.presentation ? this.observer2.observe(this.presentation) : "";
      }
    },
    bodyWidth(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.observer2
          ? (this.observer2 = new IntersectionObserver((entries) => {
              if (entries[0].isIntersecting) {
                this.presentation.classList.add("prebg");
                this.margin = false;
              } else {
                this.presentation.classList.remove("prebg");
                this.margin = true;
              }
            }, this.resizeOption2(this.options2)))
          : "";
        this.presentation ? this.observer2.observe(this.presentation) : "";
      }
    },
  },
  async created() {
    console.log("songsSection Mounted");
    window.addEventListener("resize", this.resizeOption2);
    setTimeout(() => {
      this.presentation = document.querySelector(".presentation");
      this.body = document.body;
      this.header = document.getElementById("header");
      this.songSecEl = document.getElementById("searchCategory");
      console.log(this.songSecEl);

      this.options = {
        root: null,
        threshold: [0.1, 0.4],
      };

      this.observer = new IntersectionObserver((entries) => {
        this.header.classList.toggle(
          "fav-songs-intersec-bg1",
          entries[0].intersectionRatio <= 0.4
        );
        this.header.classList.toggle(
          "fav-songs-intersec-bg2",
          entries[0].intersectionRatio <= 0.1
        );

        entries[0].intersectionRatio >= 0.1
          ? this.$store.dispatch("controller/closeHeaderBtn")
          : this.$store.dispatch("controller/showHeaderBtn");
      }, this.options);

      this.songSecEl ? this.observer.observe(this.songSecEl) : "";

      this.options2 = {
        root: document.body,
        threshold: 0,
        rootMargin: `${
          +((this.headerHeight * 100) / this.bodyHeight).toFixed(1) * -1
        }% 0px -${
          100 - +((this.headerHeight * 100) / this.bodyHeight).toFixed(1)
        }% 0px`,
      };

      this.observer2 = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          this.presentation.classList.add("prebg");
          this.margin = false;
        } else {
          this.presentation.classList.remove("prebg");
          this.margin = true;
        }
      }, this.options2);

      this.presentation ? this.observer2.observe(this.presentation) : "";
    }, 1);
  },

  beforeUnmount() {
    console.log("songsSection unMounted");
    if (this.songSecEl) {
      window.removeEventListener("resize", this.resizeOption2);
      this.observer.unobserve(this.songSecEl);
      this.observer2.unobserve(this.presentation);
      this.presentation.classList.remove("prebg");
      this.header.classList.remove("fav-songs-intersec-bg1");
      this.header.classList.remove("fav-songs-intersec-bg2");
    }
    this.margin = true;
  },
};
</script>

<style></style>
