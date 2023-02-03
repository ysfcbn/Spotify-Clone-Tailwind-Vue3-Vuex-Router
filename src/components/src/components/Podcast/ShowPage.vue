<template>
  <section class="box-border">
    <div
      id="showPage"
      class="p-5 h-[326px] max-h-[800px] min-h-[340px] w-full mt-[-66px] relative shadow-[2px_0px_5px_5px_rgba(0,0,0,0.4)]"
      :style="{ '--bgShowImage': `url(${showImage})` }"
    >
      <div class="relative flex items-end justify-start h-full lg:ml-[1rem]">
        <div
          class="flex sm:w-[192px] sm:min-w-[192px] xl:h-[232px] xl:w-[232px] xl:min-w-[232px] shadow-[0_8px_40px_10px_rgba(0,0,0,0.6)] rounded-[12px]"
        >
          <img
            class="object-cover h-full w-full rounded-[12px]"
            :src="currentShow?.images[0]?.url"
            alt="podcast"
          />
        </div>
        <div class="flex flex-col text-white font-semibold px-4">
          <h2 class="">PODCAST</h2>
          <span>
            <h1
              class="w-full sm:text-3xl md:text-5xl xl:text-8xl tracking-tighter py-2 cursor-default"
            >
              {{ currentShow.name }}
            </h1>
            <h2 id="info"></h2>
          </span>
          <div
            class="flex flex-wrap mt-2 text-white w-full text-xs sm3:text-sm h-full font-semibold"
          >
            <div class="flex items-center flex-nowrap shrink-0">
              <span class="flex items-center w-[16.2rem] text-xl">{{
                currentShow.publisher
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <div
    class="w-full h-[5rem] relative flex flex-col items-start justify-center pt-5"
  >
    <div class="w-full ml-[1.5rem] lg:ml-[2.3rem]">
      <div class="flex justify-start items-center">
        <div
          :class="{
            'w-[9.5rem]': currentShowIsFav,
            'w-[6.6rem]': !currentShowIsFav,
          }"
        >
          <button
            @click="addRemoveShow"
            type="button"
            :class="{
              'w-[8rem] border-white': currentShowIsFav,
              'hover:border-white border-opacwhite2': !currentShowIsFav,
            }"
            class="border cursor-default w-[5.5rem] h-fit text-white px-2 py-1 rounded-[5px]"
          >
            <span
              v-if="currentShowIsFav"
              class="text-sm"
              style="font-weight: 600"
              >TAKİP EDİLİYOR</span
            >
            <span v-else class="text-sm" style="font-weight: 600">
              TAKİP ET</span
            >
          </button>
        </div>
        <div class="ml-2 flex items-center">
          <ShowOptions
            :follow="currentShowIsFav"
            :addRemoveShow="addRemoveShow"
          />
        </div>
      </div>
    </div>
  </div>

  <!-- episodes section -->
  <div class="sm:ml-[1.5rem] lg:ml-[2.3rem] lg3:mr-[2rem] mb-[4rem]">
    <div
      class="grid sm:max-w-[760px] lg3:max-w-[1600px] lg3:grid-cols-colShow mt-5 gap-8"
    >
      <!-- Description Section -->
      <div
        class="sm:max-w-[790px] lg3:row-span-3 lg3:col-start-2 lg3:col-end-3"
      >
        <h2
          class="text-white1 text-2xl tracking-tighter"
          style="font-weight: 700"
        >
          Hakkında
        </h2>
        <div
          id="show--description"
          class="absolute hidden text-lightest max-w-[45rem]"
        ></div>

        <div class="py-[16px] relative text-lightest max-w-[45rem]">
          <p id="show--description1"></p>
          <button v-if="seeMoreBtn" @click="toggleDescription">
            <span
              v-if="!toggle"
              class="text-white font-semibold cursor-pointer"
              >{{ more }}</span
            >
            <p
              v-else
              class="absolute bottom-[-5px] left-[-2px] text-white font-semibold cursor-pointer w-[8rem] hover:underline"
            >
              {{ less }}
            </p>
          </button>
        </div>
      </div>
      <div
        class="lg3:row-start-1 lg3:row-end-3 lg3:col-start-1 lg3:col-end-2 sm:max-w-[790px] lg3:max-w-[1600px] max-h-[188px] bg-opacwhite1 rounded-[5px]"
      >
        <PodcastEpisodes
          :key="nextEpisode.id"
          :id="nextEpisode.id"
          :index="nextEpisodeIndex"
          :episode="nextEpisode"
          :podcastShowPage="podcastShowPage"
          :isNextEpisode="true"
          :checkUserFavEpisode="checkUserFavEpisode"
        />
      </div>

      <div
        class="lg3:row-start-3 lg3:col-start-1 lg3:col-end-2 sm:ml-[1.5rem] lg:ml-[1.4rem]"
      >
        <h3
          class="text-white text-2xl lg3:mt-4 tracking-tighter"
          style="font-weight: 700"
        >
          Tüm Bölümler
        </h3>
      </div>

      <div
        class="lg3:row-start-3 lg3:mt-16 lg3:row-end-3 lg3:col-start-1 lg3:col-end-2 sm:max-w-[790px] lg3:max-w-[1600px]"
      >
        <PodcastEpisodes
          class="sm:max-w-[790px] lg3:max-w-[1600px]"
          v-for="(episode, i) in allEpisodes"
          :key="episode.id"
          :index="i"
          :episode="episode"
          :podcastShowPage="podcastShowPage"
          :checkUserFavEpisode="checkUserFavEpisode"
        />
      </div>
    </div>
    <div class="sm:ml-[1.5rem] lg:ml-[2.3rem]">
      <Info />
    </div>
  </div>
</template>

<script>
import ShowOptions from "../Podcast/ShowOptions.vue";
import PodcastEpisodes from "../Podcast/PodcastEpisodes.vue";
import EpisodeOptions from "../Podcast/EpisodeOptions.vue";
import Info from "../SpotifyInfo/Info.vue";
import axios from "axios";

export default {
  name: "ShowPage",
  components: { ShowOptions, PodcastEpisodes, EpisodeOptions, Info },
  props: {
    index: { required: false },
    episode: { required: false },
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      podcastShowPage: true,
      episodeOptions: false,
      follow: false,
      toggle: false,
      seeMoreBtn: true,
      more: "... daha fazlasını göster",
      less: "daha azını göster",
    };
  },
  methods: {
    async fetchFavEpisodes() {
      return await axios
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
    isNewEpisode() {
      const today = new Date();
      const isWeek = Math.abs(
        Math.round(
          (today.getTime() -
            new Date(this.nextEpisode?.release_date).getTime()) /
            1000 /
            60 /
            60 /
            24
        )
      );
      if (this.nextEpisode?.resume_point.fully_played) return false;

      return isWeek <= 7 ? true : false;
    },
    selectedEpisode(_, event) {
      event.target.closest("#play")
        ? ""
        : event.target.closest("#share")
        ? ""
        : event.target.closest("#add-library")
        ? ""
        : event.target.closest("#options")
        ? ""
        : event.target.closest("#episode--options")
        ? ""
        : this.$router.push({
            name: "episode",
            params: { id: `${this.nextEpisode?.id}` },
          });
    },
    async fetchFavShows() {
      return await axios
        .get("https://api.spotify.com/v1/me/shows?limit=50", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + (await this.getToken),
          },
        })
        .then(({ data }) => {
          console.log(data);
          this.$store.dispatch("shows/favShows", data);
        })
        .catch((err) => console.log(err));
    },
    async fetchShow() {
      await axios
        .get("https://api.spotify.com/v1/shows/" + this.$route.params.id, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + (await this.getToken),
          },
        })
        .then(({ data }) => {
          this.$store.dispatch("shows/currentShow", data);
        })
        .catch((err) => console.log(err));
    },
    async checkUserFavShow() {
      await axios
        .get(
          "https://api.spotify.com/v1/me/shows/contains?ids=" +
            this.$route.params.id,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + (await this.getToken),
            },
          }
        )
        .then(({ data }) => {
          this.$store.dispatch("shows/currentShowIsFav", ...data);
        })
        .catch((err) => console.log(err));
    },
    async checkUserFavEpisode() {
      await axios
        .get(
          "https://api.spotify.com/v1/me/episodes/contains?ids=" +
            this.allEpisodesIDs,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + (await this.getToken),
            },
          }
        )
        .then(({ data }) => {
          this.$store.dispatch("episodes/currentEpisodeIsFav", data);
        })
        .catch((err) => console.log(err));
    },
    async removeAddEpisode(currentID, event) {
      console.log(currentID);
      let selectedID;
      if (currentID) {
        selectedID = currentID;
      } else selectedID = event.target.closest(".episodeContainer").id;
      console.log(selectedID);
      const isFavEpisodeID = this.favEpisodes.find(
        (item) => item.episode.id === selectedID
      )?.episode.id;
      isFavEpisodeID
        ? await this.deleteEpisode(isFavEpisodeID)
        : await this.addEpisode(selectedID);
      await this.fetchFavEpisodes();
      this.podcastShowPage ? await this.checkUserFavEpisode() : "";
    },
    async addEpisode(episodeID) {
      await fetch("https://api.spotify.com/v1/me/episodes?ids=" + episodeID, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + (await this.getToken),
        },
      })
        .then((data) => {
          console.log(data.status);
          if (data.status === 200) {
            console.log(episodeID, "ADDED!!!!");
            this.isUserFavEpisode();
          }
        })
        .catch((err) => console.log(err));
    },
    async deleteEpisode(selectedID) {
      await axios
        .delete("https://api.spotify.com/v1/me/episodes?ids=" + selectedID, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + (await this.getToken),
          },
        })
        .then((data) => {
          console.log(data.status);
          if (data.status === 200) {
            console.log(selectedID, "DELETED!!!!");
            this.fetchFavEpisodes();
          }
        })
        .catch((err) => console.log(err));
    },
    removeEpisodeOptionsFunc(val) {
      val ? this.removeAddEpisode(val) : "";
    },
    async followShow() {
      await fetch(
        "https://api.spotify.com/v1/me/shows?ids=" + this.$route.params.id,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + (await this.getToken),
          },
        }
      )
        .then((data) => {
          console.log(data.status);
          this.$store.dispatch("controller/modalInfoType", {
            type: "show",
            status: true,
          });
          if (data.status === 200) this.checkUserFavShow();
        })
        .catch((err) => console.log(err));
    },
    async unfollowShow() {
      await axios
        .delete(
          "https://api.spotify.com/v1/me/shows?ids=" + this.$route.params.id,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + (await this.getToken),
            },
          }
        )
        .then((data) => {
          console.log(data.status);
          this.$store.dispatch("controller/modalInfoType", {
            type: "show",
            status: false,
          });
          if (data.status === 200) this.checkUserFavShow();
        })
        .catch((err) => console.log(err));
    },

    async addRemoveShow() {
      if (this.currentShowIsFav) {
        await this.unfollowShow();
        await this.fetchFavShows();
      } else {
        await this.followShow();
        await this.fetchFavShows();
      }
    },
    htmlDescription() {
      const descriptionEl = document.getElementById("show--description");
      const descriptionEl1 = document.getElementById("show--description1");
      let splittedDesc;
      if (typeof this.currentShow.html_description === "string") {
        splittedDesc = this.currentShow.html_description.split(" ");
        if (splittedDesc.length > 10) {
          splittedDesc.length = Math.floor(splittedDesc.length / 2);
        } else {
          this.seeMoreBtn = false;
        }
      } else descriptionEl.innerHTML = `${this.currentShow.html_description}`;

      const pTagsArr = [...descriptionEl.getElementsByTagName("p")];
      if (pTagsArr.length) {
        console.log(pTagsArr[0]);
        pTagsArr[0].length = 20;
        console.log(pTagsArr[0]);

        descriptionEl1.innerHTML = `${pTagsArr[0].innerHTML}`;
      } else {
        descriptionEl1.innerHTML = splittedDesc.join(" ");
      }
      if (this.toggle) {
        descriptionEl1.innerHTML = `${this.currentShow.html_description}`;
      }
    },

    toggleDescription() {
      this.toggle = !this.toggle;
      this.htmlDescription();
    },
  },
  computed: {
    isAuth() {
      return this.$store.getters.isAuth;
    },
    getToken() {
      return this.$store.getters.accessToken;
    },
    getMonths() {
      return this.$store.getters["controller/getMonths"];
    },
    currentShow() {
      return this.$store.getters["shows/getCurrentShow"];
    },
    favEpisodes() {
      return this.$store.getters["episodes/getFavEpisodes"].items;
    },
    allEpisodes() {
      return this.currentShow?.episodes?.items;
    },
    nextEpisode() {
      return this.allEpisodes[
        this.allEpisodes.indexOf(
          this.allEpisodes.filter(
            (item) => item.resume_point.fully_played === false
          )[0]
        )
      ];
    },
    nextEpisodeIndex() {
      return this.allEpisodes.indexOf(
        this.allEpisodes.filter(
          (item) => item.resume_point.fully_played === false
        )[0]
      );
    },
    resumePosition() {
      return this.nextEpisode?.resume_point.resume_position_ms;
    },
    showImage() {
      return this.currentShow?.images[0]?.url;
    },
    allEpisodesIDs() {
      return this.allEpisodes?.map((item) => item.id).join(",");
    },
    currentEpisodeIsFav() {
      return this.$store.getters["episodes/getCurrentEpisodeIsFav"];
    },

    episodeIsFav() {
      return this.currentEpisodeIsFav[this.nextEpisodeIndex];
    },
    currentShowIsFav() {
      return this.$store.getters["shows/getCurrentShowIsFav"];
    },
  },
  async created() {
    console.log("podcastShowPage Mounted!");
    this.podcastShowPage = true;

    await this.fetchShow();
    await this.checkUserFavEpisode();
    await this.checkUserFavShow();
    this.htmlDescription();

    this.header = document.getElementById("header");
    this.showPageEl = document.getElementById("showPage");

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

    this.observer.observe(this.showPageEl);
  },

  beforeUnmount() {
    this.observer.unobserve(this.showPageEl);
    this.header.classList.remove("podcast-intersec-bg1");
    this.header.classList.remove("podcast-intersec-bg2");
    this.podcastShowPage = false;
  },
};
</script>

<style scoped lang="scss">
#showPage {
  &::before {
    content: "";
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
    background-size: cover;
    background-position: top;
    background-image: var(--bgShowImage);
    filter: blur(7rem);
    width: 110%;
    height: 100%;
    opacity: 0.8;
  }
}
</style>
