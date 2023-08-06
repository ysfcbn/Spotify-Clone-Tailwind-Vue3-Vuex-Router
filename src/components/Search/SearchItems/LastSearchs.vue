<template>
  <div v-if="getSearchedItem.length" id="lastSearch" class="mb-4">
    <div class="h-fit">
      <h2
        class="text-[1.5rem] text-white leading-7 tracking-tighter font-semibold"
      >
        Recent searches
      </h2>
    </div>
  </div>

  <!-- Cards -->
  <div v-if="searches.length">
    <transition-group
      name="fade-card"
      tag="div"
      class="relative grid grid-cols-col180 gap-x-6 auto-rows-0 grid-rows-1 overflow-hidden"
    >
      <LastSearchItems
        v-for="item in searches"
        :key="item.id"
        :item="item"
        :contextType="item.type"
        :contextUri="item.uri"
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
      searches: [],
      uniqID: [],
    };
  },
  methods: {
    closeTrack(id) {
      console.log(id);
      this.searches = this.searches.filter((item) => item.id !== id);
      this.$store.dispatch("searchItem/filterSearchedItem", this.searches);
      console.log(this.searches);
      if (!this.searches.length) {
        this.$emit("searchItems", false);
      } else this.$emit("searchItems", true);
    },
  },
  computed: {
    getSearchedItem() {
      return this.$store.getters["searchItem/getSearchedItem"];
    },
  },

  created() {
    console.log("LastSearch Mounted");
    this.header = document.getElementById("header");
    this.searches = this.getSearchedItem;
    if (this.searches.length) {
      setTimeout(() => {
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

        console.log(this.lastSearchsEl);
        console.log(this.header);
        this.lastSearchsEl ? this.observer.observe(this.lastSearchsEl) : "";
      }, 100);
    }
  },
  beforeUnmount() {
    console.log("LastSearchs beforeUnmount");
    console.log(this.lastSearchsEl);
    if (this.searches.length) {
      this.lastSearchsEl ? this.observer.unobserve(this.lastSearchsEl) : "";
    }

    this.header.classList.remove("search-intersec-bg1");
    this.header.classList.remove("search-intersec-bg2");
    // if (!this.searches.length) this.search = [];
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
