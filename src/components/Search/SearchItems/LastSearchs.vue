<template>
  <div v-if="searchs.length" id="lastSearch" class="mb-4">
    <div class="h-fit">
      <h2
        class="text-[1.5rem] text-white leading-7 tracking-tighter font-semibold"
      >
        Yakındaki aramalar
      </h2>
    </div>
  </div>

  <!-- Cards -->
  <div v-if="searchs.length" class="mb-8" id="lastSearchs">
    <transition-group
      name="fade-card"
      tag="div"
      class="relative grid grid-cols-col180 gap-x-6 auto-rows-0 grid-rows-1 overflow-hidden"
    >
      <LastSearchItems
        v-for="track in searchs"
        :key="track.id"
        :track="track"
        :searchs="searchs"
        @filterSearch="closeTrack"
      ></LastSearchItems>
    </transition-group>
  </div>
</template>

<script>
import LastSearchItems from "./LastSearchItems.vue";
export default {
  components: { LastSearchItems },
  emits: ["searchItems"],
  data() {
    return {
      observer: "",
      lastSeachEl: "",
      searchs: [
        {
          name: "Inndia",
          artist: "INNA",
          id: 1,
          img: "https://i.scdn.co/image/ab67616d00001e02789b5fef31115d1437e2d5a5",
        },
        {
          name: "Fazıl Say",
          artist: "Sanatçı",
          id: 4,
          img: "https://i.scdn.co/image/ab6761610000f17827edf3bf7aa851010a60f9b6",
        },
        {
          name: "La Tortura (feat. Alejandro Sanz)",
          artist: "Shakira",
          id: 3,
          img: "https://i.scdn.co/image/ab67616d00001e02f342e70aacda9d78cfb6ce7a",
        },
        {
          name: "S.T.A.Y",
          artist: "Hans Zimmer",
          id: 2,
          img: "https://i.scdn.co/image/ab67616d00001e02ac29a65e7ffcfa6f9cb0d342",
        },
        {
          name: "Adele",
          artist: "Sanatçı",
          id: 5,
          img: "https://i.scdn.co/image/ab6761610000f17868f6e5892075d7f22615bd17",
        },
      ],
    };
  },

  mounted() {
    this.header = document.getElementById("header");

    if (this.searchs.length) {
      console.log("LastSearch Mounted");

      this.lastSearchsEl = document.getElementById("lastSearch");

      this.headerHeight = document
        .getElementById("header")
        .getBoundingClientRect().height;

      this.options = {
        root: null,
        threshold: [0.2, 0.95],
        rootMargin: `-${this.headerHeight}px`,
      };

      this.observer = new IntersectionObserver((entries) => {
        this.header.classList.toggle(
          "search-intersec-bg1",
          entries[0].intersectionRatio <= 0.95
        );

        this.header.classList.toggle(
          "search-intersec-bg2",
          entries[0].intersectionRatio <= 0.7
        );
      }, this.options);

      this.observer.observe(this.lastSearchsEl);
    }
  },
  beforeUnmount() {
    console.log("LastSearchs beforeUnmount");
    this.searchs.length
      ? this.observer.unobserve(this.lastSearchsEl)
      : this.observer.unobserve(this.lastSearchsEl);

    this.header.classList.remove("search-intersec-bg1");
    this.header.classList.remove("search-intersec-bg2");
    // if (!this.searchs.length) this.search = [];
  },
  methods: {
    closeTrack(id) {
      console.log(id);
      this.searchs = this.searchs.filter((track) => track.id !== +id);
      if (!this.searchs.length) {
        this.$emit("searchItems", false);
      } else this.$emit("searchItems", true);
    },
  },
};
</script>

<style>
.fade-cart-move,
.fade-card-enter-active,
.fade-card-leave-active {
  transition: opacity 1s ease-in;
}

.fade-card-leave-active {
  position: absolute;
  visibility: hidden;
}

.fade-card-enter-to,
.fade-card-leave-from {
  opacity: 1;
}
.fade-card-enter-from,
.fade-card-leave-to {
  opacity: 0;
}
</style>
