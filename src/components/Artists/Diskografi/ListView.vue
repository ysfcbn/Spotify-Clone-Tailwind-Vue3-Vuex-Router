<template>
  <div class="">
    <div
      :id="indexCalc ? 'firstElement' : ''"
      :class="{
        'absolute h-[20rem] top-[-7rem] w-full z-0': indexCalc,
      }"
      class="p-[32px] flex bg-gradient-to-b from-dark1 to-dark relative"
    >
      <div
        :class="{ 'flex-col justify-end': indexCalc }"
        class="mr-6 flex shrink-0"
      >
        <img
          class="w-[9rem] h-[9rem]"
          src="https://i.scdn.co/image/ab67616d00001e02a1790a2cceb42f4ccabcebbb"
          alt="track image"
        />
      </div>
      <div :class="{ 'mt-[6.8rem]': indexCalc, 'mt-[-0.3rem]': !indexCalc }">
        <span class="font-semibold text-3xl hover:underline text-white">
          <router-link to="/album/id">{{ data.albumName }}</router-link>
        </span>
        <div class="text-sm mt-2">
          <span class="text-lightest">Albüm</span>
          <span class="text-lightest before:content-['•'] before:mx-1"
            >2022</span
          >
          <span class="text-lightest before:content-['•'] before:mx-1"
            >84 şarkı</span
          >
          <h2 id="info" class="text-white"></h2>
        </div>
        <div
          class="flex items-center justify-between absolute bottom-8 text-lightest w-[7rem]"
        >
          <div>
            <button
              class="items-center bg-white rounded-full w-fit p-[8px] cursor-default hover:scale-110"
            >
              <svg
                role="img"
                height="14"
                width="14"
                viewBox="0 0 16 16"
                class="hidden"
              >
                <path
                  fill="#000"
                  d="M2.7 1a.7.7 0 00-.7.7v12.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V1.7a.7.7 0 00-.7-.7H2.7zm8 0a.7.7 0 00-.7.7v12.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V1.7a.7.7 0 00-.7-.7h-2.6z"
                ></path></svg
              ><svg
                role="img"
                height="16"
                width="16"
                viewBox="0 0 16 16"
                class=""
              >
                <path
                  fill="#000"
                  d="M3 1.713a.7.7 0 011.05-.607l10.89 6.288a.7.7 0 010 1.212L4.05 14.894A.7.7 0 013 14.288V1.713z"
                ></path>
              </svg>
            </button>
          </div>
          <button type="button" class="">
            <svg role="img" height="24" width="24" viewBox="0 0 24 24" class="">
              <path
                fill="currentColor"
                d="M5.21 1.57a6.757 6.757 0 016.708 1.545.124.124 0 00.165 0 6.741 6.741 0 015.715-1.78l.004.001a6.802 6.802 0 015.571 5.376v.003a6.689 6.689 0 01-1.49 5.655l-7.954 9.48a2.518 2.518 0 01-3.857 0L2.12 12.37A6.683 6.683 0 01.627 6.714 6.757 6.757 0 015.21 1.57zm3.12 1.803a4.757 4.757 0 00-5.74 3.725l-.001.002a4.684 4.684 0 001.049 3.969l.009.01 7.958 9.485a.518.518 0 00.79 0l7.968-9.495a4.688 4.688 0 001.049-3.965 4.803 4.803 0 00-3.931-3.794 4.74 4.74 0 00-4.023 1.256l-.008.008a2.123 2.123 0 01-2.9 0l-.007-.007a4.757 4.757 0 00-2.214-1.194z"
              ></path>
            </svg>
          </button>
          <button class="text-lightest cursor-default w-fit relative">
            <svg
              role="img"
              height="26"
              width="26"
              viewBox="0 0 24 24"
              class="hover:text-white"
            >
              <path
                fill="currentColor"
                d="M4.5 13.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm15 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm-7.5 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
    <div
      :id="data.albumName"
      :class="{ 'mt-[-7rem]': indexCalc }"
      class="playlistContainer relative h-full min-w-[450] mx-5 mb-5 disko--title lg:mx-4"
    >
      <div
        class="w-[100%] presentation py-1 border-b border-opacwhite overflow-hidden pl-[1.4rem]"
        style="z-index: 30"
      >
        <div>
          <div
            class="grid sm:grid-cols-colPreDisco text-lightest text-xs sm3:text-sm items-center min-w-[300px] gap-2"
          >
            <div class="text-lg flex justify-start items-end h-full w-full">
              #
            </div>
            <div class="">BAŞLIK</div>

            <div class="flex items-center justify-end w-full h-full sm:pr-14">
              <div class="flex items-start">
                <svg
                  role="img"
                  height="16"
                  width="16"
                  viewBox="0 0 16 16"
                  class=""
                >
                  <path
                    fill="currentColor"
                    d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8z"
                  ></path>
                  <path
                    fill="currentColor"
                    d="M8 3.25a.75.75 0 01.75.75v3.25H11a.75.75 0 010 1.5H7.25V4A.75.75 0 018 3.25z"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PlaylistItems
        v-for="(track, i) in renderTypes"
        :key="track.id"
        :index="i"
        class="my-2"
        :diskografiPage="diskografiPage"
      >
        <template #trackName>{{ track.trackName }}</template>
        <template #artist
          ><span
            @click="toggleArtistPage(msg, $event)"
            class="text-lightest hover:underline"
          >
            {{ track.artist }}
          </span>
        </template>
        <template #duration>{{ track.duration }}</template>
      </PlaylistItems>
    </div>
  </div>
</template>

<script>
import PlaylistItems from "../../FavoriteSongs/PlaylistItems.vue";

export default {
  components: { PlaylistItems },
  props: ["data", "diskografiPage", "renderTypes", "indx", "viewList"],
  emits: [
    "visToggleHeaderDisko",
    "toggleHeaderDisko",
    "sectionTitle",
    "selectedArtistName2",
  ],
  data() {
    return {
      info: "",
      options: "",
      observer: null,

      headerHeight: document.getElementById("header").getBoundingClientRect()
        .height,
      bodyHeight: document.body.getBoundingClientRect().height,
    };
  },

  computed: {
    indexCalc() {
      return +this.indx === 0 ? true : false;
    },
  },

  methods: {
    toggleArtistPage(_, e) {
      this.$emit("selectedArtistName2", e.target.textContent);
      this.$router.push("/artist/id");
    },
    reportWindowSize() {
      this.observer
        ? this.diskoEl.forEach((section) => {
            this.observer.unobserve(section);
          })
        : "";
      console.log("reportWindowSize");
    },

    resizeOption(options) {
      if (window.innerHeight <= 115) {
        this.info = window.innerHeight;
        this.bodyHeight = +window.innerHeight;
        return;
      }
      this.info = window.innerHeight;
      document.getElementById("info").textContent = this.info;
      this.bodyHeight = +window.innerHeight;

      return options;
    },
  },

  watch: {
    bodyHeight(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.bodyHeight = +newVal;
        this.bodyHeight = +this.bodyHeight.toFixed(1);

        this.$emit("visToggleHeaderDisko", true);

        this.headerHeight =
          this.header.getBoundingClientRect().height +
          document.getElementById("diskoHeader").getBoundingClientRect().height;
        console.log(this.headerHeight);

        this.options = {
          root: document.body,
          threshold: 0,
          rootMargin: `${
            11 - +((this.headerHeight * 100) / this.bodyHeight).toFixed(1)
          }% 0px -${
            96 - +((this.headerHeight * 100) / this.bodyHeight).toFixed(1)
          }% 0px`,
        };

        this.observer
          ? (this.observer = new IntersectionObserver((entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  console.log("observing", entry.target.id);
                  this.$emit("sectionTitle", entry.target.id);
                  this.$emit("toggleHeaderDisko", true);
                }
                if (!entry.isIntersecting) {
                  console.log("Not observing", entry.target.id);

                  this.$emit("toggleHeaderDisko", false);
                }
              });
            }, this.resizeOption(this.options)))
          : "";

        this.diskoEl
          ? this.diskoEl.forEach((section) => {
              this.observer.observe(section);
            })
          : "";
      }
    },
  },

  mounted() {
    window.addEventListener("resize", this.resizeOption);
    window.addEventListener("resize", this.reportWindowSize);

    console.log("ListView Mounted");
    this.header = document.getElementById("header");
    this.diskoHeader = document.getElementById("diskoHeader");
    this.firstEl = document.getElementById("firstElement");
    this.diskoEl = document.querySelectorAll(".disko--title");

    this.$emit("visToggleHeaderDisko", true);

    this.headerHeight =
      this.header.getBoundingClientRect().height +
      document.getElementById("diskoHeader").getBoundingClientRect().height;
    console.log(this.headerHeight);

    this.options = {
      root: document.body,
      threshold: 0,
      rootMargin: `${
        11 - +((this.headerHeight * 100) / this.bodyHeight).toFixed(1)
      }% 0px -${
        96 - +((this.headerHeight * 100) / this.bodyHeight).toFixed(1)
      }% 0px`,
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.$emit("sectionTitle", entry.target.id);
          this.$emit("toggleHeaderDisko", true);
        }
        if (!entry.isIntersecting) {
          this.$emit("toggleHeaderDisko", false);
        }
      });
    }, this.options);

    this.diskoEl.forEach((section) => {
      this.observer.observe(section);
    });

    this.options2 = {
      root: null,
      threshold: 0.9,
    };

    this.observer2 = new IntersectionObserver((entries, obs) => {
      if (entries[0].intersectionRatio <= 0.9) {
        console.log(obs);
        this.header.classList.add("disko-intersec-bg1");

        this.diskoHeader.classList.add("list--view-intersect");
      } else {
        this.header.classList.remove("disko-intersec-bg1");

        this.diskoHeader.classList.remove("list--view-intersect");
      }
    }, this.options2);

    this.observer2.observe(this.firstEl);
  },

  beforeUnmount() {
    window.removeEventListener("resize", this.resizeOption);
    window.removeEventListener("resize", this.reportWindowSize);
    this.header.classList.remove("disko-intersec-bg1");
    this.diskoHeader.classList.remove("list--view-intersect");
    this.$emit("visToggleHeaderDisko", false);
    this.$emit("toggleHeaderDisko", false);
    if (this.viewList) {
      this.diskoEl.forEach((section) => {
        this.observer.unobserve(section);
      });
      this.observer2.unobserve(this.firstEl);
    }
  },
};
</script>

<style>
.list--view-intersect {
  background-color: #181818 !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2) !important;
}
</style>
