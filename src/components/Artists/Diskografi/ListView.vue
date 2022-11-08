<template>
  <div class="">
    <div
      :id="indexCalc ? 'firstElement' : ''"
      :class="{
        'absolute h-[20rem] top-[-6.5rem] w-full ': indexCalc,
      }"
      class="p-[32px] flex bg-gradient-to-b from-dark1 to-dark relative z-50"
    >
      <div
        :class="{ 'flex-col justify-end': indexCalc }"
        class="mr-6 flex shrink-0"
      >
        <img
          class="w-[9rem] h-[9rem]"
          :src="data?.images[0]?.url"
          alt="track image"
        />
      </div>
      <div
        class="flex flex-col justify-around"
        :class="{ 'mt-[6.8rem]': indexCalc, 'mt-[-0.3rem]': !indexCalc }"
      >
        <span
          class="font-semibold text-3xl hover:underline text-white line-clamp-2"
        >
          <router-link :to="{ name: 'album', params: { id: data?.id } }">{{
            data?.name
          }}</router-link>
        </span>
        <div class="text-sm">
          <span class="text-lightest">{{ albumType }}</span>
          <span class="text-lightest before:content-['•'] before:mx-1">{{
            cartAlbumYear(data.release_date)
          }}</span>
          <span class="text-lightest before:content-['•'] before:mx-1"
            >{{ data?.total_tracks }} şarkı</span
          >
        </div>
        <div class="flex items-center justify-between text-lightest w-[7.5rem]">
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
          <button
            :id="renderTypes[indx].id"
            @click="unFollowAlbum((id = false), $event)"
            :class="{
              greenHeart: isFavAlbum(renderTypes[indx].id),
              emptyHeart: !isFavAlbum(renderTypes[indx].id),
            }"
            class="heartBtn cursor-default hover:text-white"
          >
            <svg role="img" height="24" width="24" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M5.21 1.57a6.757 6.757 0 016.708 1.545.124.124 0 00.165 0 6.741 6.741 0 015.715-1.78l.004.001a6.802 6.802 0 015.571 5.376v.003a6.689 6.689 0 01-1.49 5.655l-7.954 9.48a2.518 2.518 0 01-3.857 0L2.12 12.37A6.683 6.683 0 01.627 6.714 6.757 6.757 0 015.21 1.57zm3.12 1.803a4.757 4.757 0 00-5.74 3.725l-.001.002a4.684 4.684 0 001.049 3.969l.009.01 7.958 9.485a.518.518 0 00.79 0l7.968-9.495a4.688 4.688 0 001.049-3.965 4.803 4.803 0 00-3.931-3.794 4.74 4.74 0 00-4.023 1.256l-.008.008a2.123 2.123 0 01-2.9 0l-.007-.007a4.757 4.757 0 00-2.214-1.194z"
              ></path>
              <path
                v-if="isFavAlbum(renderTypes[indx].id)"
                :class="{ 'text-green3': isFavAlbum(renderTypes[indx].id) }"
                fill="currentColor"
                d="M8.667 1.912a6.257 6.257 0 00-7.462 7.677c.24.906.683 1.747 1.295 2.457l7.955 9.482a2.015 2.015 0 003.09 0l7.956-9.482a6.188 6.188 0 001.382-5.234l-.49.097.49-.099a6.303 6.303 0 00-5.162-4.98h-.002a6.24 6.24 0 00-5.295 1.65.623.623 0 01-.848 0 6.257 6.257 0 00-2.91-1.568z"
              ></path>
            </svg>
          </button>
          <button
            @click="toggleAppOptions(_, $event)"
            :id="indexCalc ? 'firstElement' : ''"
            class="text-lightest cursor-default w-fit relative"
          >
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
          <AppOptions
            v-if="appOptions"
            :id="renderTypes[indx].id"
            :diskografiPage="diskografiPage"
            :firstElement="firstElement"
            :isFavAlbum="isFavAlbum(renderTypes[indx].id)"
            @unFollowAlbumE="optionUnfollowID"
            :appOptions="appOptions"
            @toggleAppOptions="toggleAppOptions"
          />
        </div>
      </div>
    </div>
  </div>
  <div
    :id="data.name"
    :class="{ 'mt-[-7rem]': indexCalc }"
    class="playlistContainer relative h-full min-w-[450] mb-5 disko--title sm:mx-5"
  >
    <TrackItemsHeader
      class="mb-4"
      :margin="margin"
      :diskografiPage="diskografiPage"
    />
    <TrackItems
      class="lg:ml-3"
      v-for="(track, i) in playlistTracks[0]?.items"
      :key="track.id"
      :id="track.id"
      :index="i"
      :diskografiPage="diskografiPage"
      :findFavTracks="findFavTracks"
      :addGreenHeartFavTracks="addGreenHeartFavTracks"
      :removeGreenHeartFavTracks="removeGreenHeartFavTracks"
    >
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
      <template #duration>{{
        trackDuration((duration = track.duration_ms))
      }}</template>
    </TrackItems>
  </div>
</template>

<script>
import TrackItems from "../../TrackItems/TrackItems.vue";
import TrackItemsHeader from "../../TrackItems/TrackItemsHeader.vue";
import AppOptions from "../../AppOptions/AppOptions.vue";
import axios from "axios";

export default {
  components: { TrackItems, TrackItemsHeader, AppOptions },
  props: ["data", "diskografiPage", "renderTypes", "indx", "viewList"],

  data() {
    return {
      options: "",
      appOptions: false,
      firstElement: false,
      observer: null,
      margin: true,
      headerHeight: document.getElementById("header").getBoundingClientRect()
        .height,
      bodyHeight: document.body.getBoundingClientRect().height,
      playlistTracks: [],
    };
  },

  computed: {
    isAuth() {
      return this.$store.getters.isAuth;
    },
    getToken() {
      return this.$store.getters.accessToken;
    },
    indexCalc() {
      return +this.indx === 0 ? true : false;
    },
    albumType() {
      return (
        this.data?.album_type.charAt(0).toUpperCase() +
        this.data?.album_type.slice(1)
      );
    },
    currentSectionAlbumsID() {
      return this.$store.getters["discography/getCurrentSectionAlbumsID"];
    },
    allFavAlbums() {
      return this.$store.getters["albums/getFavAlbums"];
    },
    allFavTracks() {
      return this.$store.getters["favTracks/getTracks"].items;
    },
    getFavTracksonalbum() {
      return this.$store.getters["discography/getfavTracksID"];
    },
    addGreenHeartEl() {
      return this.getFavTracksonalbum.map((item) =>
        document.getElementById(`${item}`)
      );
    },
  },

  methods: {
    trackDuration(duration) {
      const minutes = Math.floor(duration / 60000);
      const seconds = Math.floor((duration % 60000) / 1000);
      const result = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
      return result;
    },
    cartAlbumYear(currentSection) {
      return new Date(currentSection).getFullYear();
    },
    resizeOption(options) {
      if (window.innerHeight <= 115) {
        this.bodyHeight = +window.innerHeight;
        return;
      }
      this.observer
        ? this.diskoEl.forEach((section) => {
            this.observer.unobserve(section);
          })
        : "";
      this.bodyHeight = +window.innerHeight;

      return options;
    },
    async fetchPlaylistTracks(index, playlist) {
      await axios
        .get(`https://api.spotify.com/v1/albums/${playlist[index].id}/tracks`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + (await this.getToken),
          },
        })
        .then(({ data }) => {
          console.log(data);
          this.playlistTracks.push(data);
        })
        .catch((err) => console.log(err));
    },
    async fetchFavAlbums() {
      return await axios
        .get("https://api.spotify.com/v1/me/albums", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + (await this.getToken),
          },
        })
        .then(({ data }) => {
          console.log(data);
          this.$store.dispatch("albums/favAlbums", data.items);
        })
        .catch((err) => console.log(err));
    },
    isFavAlbum(id) {
      return this.allFavAlbums?.filter((item) => item.album.id === id).length >
        0
        ? true
        : false;
    },
    optionUnfollowID(val) {
      this.unFollowAlbum(val, false);
    },
    async unFollowAlbum(id, event) {
      let currentHeartBtnID;
      id
        ? (currentHeartBtnID = id)
        : (currentHeartBtnID = event.target.closest(".heartBtn").id);
      console.log(currentHeartBtnID);
      if (this.isFavAlbum(currentHeartBtnID)) {
        await axios
          .delete(
            "https://api.spotify.com/v1/me/albums?ids=" + currentHeartBtnID,
            {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + (await this.getToken),
              },
            }
          )
          .then((data) => {
            console.log(data);
            if (data.status === 200) {
              let albumID = document.getElementById(currentHeartBtnID);
              albumID.classList.add("animationEmptyHeart");
              albumID.classList.remove("animationGreenHeart");
              this.fetchFavAlbums();
            }
          })
          .catch((err) => console.log(err));
      } else {
        await this.followAlbum(currentHeartBtnID);
      }
    },

    async followAlbum(currentHeartBtnID) {
      await fetch(
        "https://api.spotify.com/v1/me/albums?ids=" + currentHeartBtnID,
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
          console.log(data);
          if (data.status === 200) {
            let albumID = document.getElementById(currentHeartBtnID);
            albumID.classList.add("animationGreenHeart");
            albumID.classList.remove("animationEmptyHeart");
            this.fetchFavAlbums();
          }
        })
        .catch((err) => console.log(err));
    },

    findFavTracks() {
      this.allFavTracks.forEach((track, i) => {
        this.playlistTracks[0]?.items.forEach((item, i) => {
          if (track.track.id === item.id) {
            this.$store.dispatch("discography/favTracksID", item.id);
          }
        });
      });
    },

    addGreenHeartFavTracks(trackItem = false) {
      if (!trackItem) {
        this.addGreenHeartEl.forEach((item) => {
          item.children[3].children[0].classList.remove(
            "emptyHeart",
            "animationEmptyHeart"
          );
          item.children[3].children[0].classList.add("greenHeart");

          item.children[3].children[0].children[0].children[0].classList.remove(
            "hidden"
          );

          item.children[3].children[0].children[0].children[1].classList.add(
            "hidden"
          );
        });
      } else {
        trackItem.children[3].children[0].classList.remove(
          "emptyHeart",
          "animationEmptyHeart"
        );
        trackItem.children[3].children[0].classList.add("greenHeart");
        trackItem.children[3].children[0].classList.add("animationGreenHeart");
        trackItem.children[3].children[0].children[0].children[0].classList.remove(
          "hidden"
        );

        trackItem.children[3].children[0].children[0].children[1].classList.add(
          "hidden"
        );
      }
    },
    removeGreenHeartFavTracks(item) {
      item.children[3].children[0].classList.remove(
        "greenHeart",
        "animationGreenHeart"
      );
      item.children[3].children[0].classList.add("emptyHeart");
      item.children[3].children[0].classList.add("animationEmptyHeart");

      item.children[3].children[0].children[0].children[0].classList.add(
        "hidden"
      );
      item.children[3].children[0].children[0].children[1].classList.remove(
        "hidden"
      );
    },
    toggleAppOptions(_, e) {
      this.appOptions = !this.appOptions;
      e.target.closest("#firstElement")
        ? (this.firstElement = true)
        : (this.firstElement = false);
    },
  },

  watch: {
    bodyHeight(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.bodyHeight = +newVal;
        this.bodyHeight = +this.bodyHeight.toFixed(1);

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
                  this.$store.dispatch(
                    "discography/currentDiskoSection",
                    entry.target.id
                  );
                }
                if (!entry.isIntersecting) {
                  this.$store.dispatch("discography/clearCurrentDiskoSection");
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

  async created() {
    window.addEventListener("resize", this.resizeOption);
    console.log("ListView Mounted");

    console.log(this.playlistTracks);
    console.log(this.renderTypes[this.indx].id);
    console.log(this.currentSectionAlbumsID);
    console.log(this.allFavAlbums);
    await this.currentSectionAlbumsID;
    await this.allFavAlbums;

    await this.fetchPlaylistTracks(this.indx, this.renderTypes);

    this.findFavTracks();

    await this.getFavTracksonalbum;

    this.addGreenHeartFavTracks();

    this.header = document.getElementById("header");
    this.diskoHeader = document.getElementById("diskoHeader");
    this.firstEl = document.getElementById("firstElement");
    this.diskoEl = document.querySelectorAll(".disko--title");

    this.headerHeight =
      this.header.getBoundingClientRect().height +
      document.getElementById("diskoHeader").getBoundingClientRect().height;

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
          this.$store.dispatch(
            "discography/currentDiskoSection",
            entry.target.id
          );
          this.$store.dispatch("controller/showHeaderBtn");
        }
        if (!entry.isIntersecting) {
          this.$store.dispatch("discography/clearCurrentDiskoSection");
          this.$store.dispatch("controller/closeHeaderBtn");
        }
      });
    }, this.options);

    this.diskoEl
      ? this.diskoEl.forEach((section) => {
          this.observer.observe(section);
        })
      : "";

    this.options2 = {
      root: null,
      threshold: 0.9,
    };

    this.observer2 = new IntersectionObserver((entries, obs) => {
      if (entries[0].intersectionRatio <= 0.9) {
        this.header.classList.add("disko-intersec-bg1");
        this.diskoHeader.classList.add("list--view-intersect");
      } else {
        this.header.classList.remove("disko-intersec-bg1");

        this.diskoHeader.classList.remove("list--view-intersect");
      }
    }, this.options2);

    this.firstEl ? this.observer2.observe(this.firstEl) : "";
  },

  beforeUnmount() {
    window.removeEventListener("resize", this.resizeOption);
    this.header ? this.header.classList.remove("disko-intersec-bg1") : "";
    this.diskoHeader
      ? this.diskoHeader.classList.remove("list--view-intersect")
      : "";
    this.$emit("visToggleHeaderDisko", false);
    this.$emit("toggleHeaderDisko", false);
    if (this.viewList) {
      this.diskoEl
        ? this.diskoEl.forEach((section) => {
            this.observer.unobserve(section);
          })
        : "";
      this.firstEl ? this.observer2.unobserve(this.firstEl) : "";
    }
  },

  unmounted() {
    this.$store.dispatch("controller/closeHeaderBtn");
    this.$store.dispatch("discography/clearTracksID");
  },
};
</script>

<style>
.list--view-intersect {
  background-color: #181818 !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2) !important;
}

.greenHeart {
  color: #1fdf64;
}
.animationGreenHeart {
  animation: heart 0.2s ease-in;
}

.emptyHeart {
  color: #9b9b9b;
}
.animationEmptyHeart {
  animation: emptyheart 0.2s ease-in-out 1 alternate;
}

@keyframes heart {
  33% {
    transform: scale(1.4);
  }
  66% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1.5);
  }
}
@keyframes emptyheart {
  33% {
    transform: translateX(-6px) rotate(-20deg);
  }
  66% {
    transform: translateX(6px) rotate(20deg);
  }
  100% {
    transform: translateX(0) rotate(0);
  }
}
</style>
<!-- -->
