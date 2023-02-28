<template>
  <div
    role="row"
    class="track--container group grid grid-rows-0 border border-transparent h-[50px] hover:bg-light shrink px-1 rounded-md gap-3"
    :class="{
      relative: !artistPage,
      activeTrack: trackOptions,
      activeTrack: active,
      'lg:pl-[2rem]':
        favoriteSongs ||
        albumPage ||
        singlePage ||
        TrackPage2 ||
        artistPage ||
        playlistPage,
      'pl-5':
        favoriteSongs ||
        albumPage ||
        singlePage ||
        userPage ||
        TrackPage ||
        artistPage ||
        diskografiPage ||
        queuePage ||
        queuePage2 ||
        playlistPage,
      'lg:grid-cols-colProfile mb:grid-cols-colPresm':
        userPage || queuePage || queuePage2,
      'mb:grid-cols-colPreDisco': diskografiPage || albumPage || singlePage,
      'mb:grid-cols-colArtPop': artistPage || TrackPage || TrackPage2,
      'mb:grid-cols-colPresm md2:grid-cols-colPremd lg2:grid-cols-colPre':
        !diskografiPage &&
        !albumPage &&
        !singlePage &&
        !artistPage &&
        !TrackPage &&
        !userPage &&
        !queuePage &&
        !queuePage2 &&
        !TrackPage2,
      'mx-5 ':
        !margin && !diskografiPage && !userPage && !queuePage && !queuePage2,
    }"
    @click="active = true"
  >
    <div
      role="track-index"
      class="flex w-full h-full items-center justify-center"
    >
      <div
        class="relative flex text-right items-center justify-end pr-[14px] w-full"
      >
        <span
          :class="{
            invisible: isPlaying,
            ' text-green3': addTextGreen,
            'group-hover:visible text-white': !isPlaying,
          }"
          class="text-lg group-hover:invisible"
        >
          {{ index + 1 }}</span
        >
        <button
          @click="
            playTrack(
              (uris = { uri: uri, index: index, id: null, type: null }),
              $event
            )
          "
          class="absolute right-3 cursor-default"
        >
          <svg role="img" height="16" width="16" viewBox="0 0 24 24">
            <path
              :class="{
                invisible: isPlaying,
                'group-hover:visible': !isPlaying,
              }"
              class="invisible"
              fill="#FFFFFF"
              d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"
            ></path>
            <path
              :class="{
                invisible: !isPlaying,
                'group-hover:visible': isPlaying,
              }"
              class="invisible"
              fill="#FFFFFF"
              d="M5.7 3a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7H5.7zm10 0a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7h-2.6z"
            ></path>
          </svg>
          <Equalizer
            v-if="isPlaying"
            class="block group-hover:hidden"
          ></Equalizer>
        </button>
      </div>
    </div>

    <div class="flex justify-start items-center">
      <slot name="trackImg">
        <img
          v-show="!diskografiPage && !albumPage && !singlePage && !TrackPage2"
          class="object-fit w-[40px] h-[40px]"
          alt=""
        />
      </slot>
      <div
        :class="{
          'pl-5':
            !diskografiPage &&
            !albumPage &&
            !singlePage &&
            !TrackPage &&
            !TrackPage2,
        }"
        class="font-normal mb:text-sm sm3:text-[14px] truncate"
      >
        <div
          :class="{
            'hover:underline': favoriteSongs || playlistPage,
            'text-green3 font-normal': addTextGreen,
          }"
          class="text-white sm:max-w-[13rem] md:max-w-full truncate font-semibold"
        >
          <slot name="trackName"></slot>
        </div>

        <div
          class="mb:text-xs sm3:text-[12px] group-hover:text-white sm:max-w-[13rem] md:max-w-full truncate pt-1 cursor-default font-semibold"
          :class="{
            'text-white': active,
            'text-lightest ': !active,
          }"
        >
          <slot name="artist"></slot>
        </div>
      </div>
    </div>

    <div
      v-if="!albumPage && !diskografiPage && !singlePage"
      :class="{
        'sm:ml-[1rem] lg:flex': userPage || queuePage || queuePage2,
      }"
      class="flex justify-start items-center hidden sm:ml-[2px]"
    >
      <span
        class="mb:text-xs sm3:text-[13px] group-hover:text-white font-semibold truncate"
        :class="{ 'text-white': active, 'text-lightest': !active }"
      >
        <span :class="{ 'hover:underline': favoriteSongs || playlistPage }">
          <slot name="albumName"></slot
        ></span>
      </span>
    </div>

    <div
      :class="{
        'lg2:flex': favoriteSongs || playlistPage,
      }"
      class="flex justify-start items-center hidden sm:ml-[5px]"
    >
      <span class="text-[14px] text-lightest hover:cursor-default">
        <slot name="favTime"></slot>
      </span>
    </div>

    <div
      :class="{ 'sm:ml-[1rem]': userPage || queuePage || queuePage2 }"
      class="flex justify-start items-center pr-3"
    >
      <button
        id="heart_icon"
        @click="addRemoveFavTrack(msg, $event)"
        class="group flex justify-center cursor-default"
      >
        <svg role="img" height="16" width="16" viewBox="0 0 16 16">
          <path
            v-if="this.$route.fullPath === '/collection/tracks'"
            fill="#1fdf64"
            d="M15.724 4.22A4.313 4.313 0 0012.192.814a4.269 4.269 0 00-3.622 1.13.837.837 0 01-1.14 0 4.272 4.272 0 00-6.21 5.855l5.916 7.05a1.128 1.128 0 001.727 0l5.916-7.05a4.228 4.228 0 00.945-3.577z"
          ></path>
          <path
            v-else
            fill="currentColor"
            class="hidden hover:text-[#1fdf64]"
            d="M15.724 4.22A4.313 4.313 0 0012.192.814a4.269 4.269 0 00-3.622 1.13.837.837 0 01-1.14 0 4.272 4.272 0 00-6.21 5.855l5.916 7.05a1.128 1.128 0 001.727 0l5.916-7.05a4.228 4.228 0 00.945-3.577z"
          ></path>
          <path
            fill="currentColor"
            class="group-hover:visible group-hover:text-white"
            :class="{
              visible: active,
              invisible: !active,
            }"
            d="M1.69 2A4.582 4.582 0 018 2.023 4.583 4.583 0 0111.88.817h.002a4.618 4.618 0 013.782 3.65v.003a4.543 4.543 0 01-1.011 3.84L9.35 14.629a1.765 1.765 0 01-2.093.464 1.762 1.762 0 01-.605-.463L1.348 8.309A4.582 4.582 0 011.689 2zm3.158.252A3.082 3.082 0 002.49 7.337l.005.005L7.8 13.664a.264.264 0 00.311.069.262.262 0 00.09-.069l5.312-6.33a3.043 3.043 0 00.68-2.573 3.118 3.118 0 00-2.551-2.463 3.079 3.079 0 00-2.612.816l-.007.007a1.501 1.501 0 01-2.045 0l-.009-.008a3.082 3.082 0 00-2.121-.861z"
          ></path>
        </svg>
      </button>

      <div
        class="text-[13px] sm3:text-[14px] mx-[1rem] text-lightest w-[4rem] flex justify-end text-center cursor-default"
      >
        <slot name="duration"></slot>
      </div>
      <button @click="toggleTrackOptions" class="text-[#fff] cursor-default">
        <svg
          role="img"
          height="16"
          width="16"
          viewBox="0 0 16 16"
          class="group-hover:visible"
          :class="{
            visibleDots: trackOptions,
            visible: active,
            invisible: !active,
          }"
        >
          <path
            fill="currentColor"
            d="M3 8a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm6.5 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM16 8a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
          ></path>
        </svg>
      </button>
    </div>
    <TrackOptions
      v-if="trackOptions"
      :trackOptions="trackOptions"
      :uri="itemUri"
      :index="index"
      :track="track"
      :artistPage="artistPage"
      @closeTrackOption="closeTrackOptionFunc(val)"
    />
  </div>
</template>

<script>
import TrackOptions from "../TrackItems/TrackOptions.vue";
import Equalizer from "../Icons/Equalizer.vue";
import axios from "axios";

export default {
  name: "PlaylistItems",
  components: { TrackOptions, Equalizer },
  props: [
    "index",
    "artist",
    "favTime",
    "isFav",
    "duration",
    "favoriteSongs",
    "uri",
    "itemUri",
    "track",
    "trackID",
    "contextType",
    "artistPage",
    "userPage",
    "queuePage",
    "queuePage2",
    "artistTopTrackUris",
    "userTopTrackUris",
    "diskografiPage",
    "albumPage",
    "singlePage",
    "playlistPage",
    "TrackPage",
    "TrackPage2",
    "margin",
    "favTracksID",
    "findFavTracks",
    "addGreenHeartFavTracks",
    "removeGreenHeartFavTracks",
    "findFavTracks2",
    "addGreenHeartFavTracks2",
    "removeGreenHeartFavTracks2",
  ],
  data() {
    return {
      trackOptions: false,
      active: false,
      playingTrackID: null,
    };
  },
  computed: {
    getToken() {
      return this.$store.getters.accessToken;
    },
    allFavTracks() {
      return this.$store.getters["favTracks/getTracks"].items;
    },
    getFavTracksOnPlaylist() {
      return this.$store.getters["playlists/getfavTracksID"];
    },
    getUserTopFavTracks() {
      return this.$store.getters["users/getFavTracksID"];
    },
    getFavTracksDiscographyAlbum() {
      return this.$store.getters["discography/getfavTracksID"];
    },
    getFavTracksOnAlbum() {
      return this.$store.getters["albums/getfavTracksID"];
    },
    getFavTracksOnAlbum2() {
      return this.$store.getters["albums/getfavTracksID2"];
    },
    getFavTracksOnArtistTopTracks() {
      return this.$store.getters["artists/getfavTracksID"];
    },
    getCurrentlyPlayingTrack() {
      return this.$store.getters["controller/getCurrentlyPlayingTrack"];
    },
    currentPlayingItemID() {
      return this.getCurrentlyPlayingTrack?.item?.id;
    },
    currentPlayingContextType() {
      return this.$store.getters["controller/currentContextType"];
    },
    isArtistContext() {
      return this.$store.getters["controller/isArtistContext"];
    },
    currentTrackIsPlaying() {
      return this.getCurrentlyPlayingTrack?.is_playing;
    },
    currentTrackID() {
      return this.$store.getters["controller/currentTrackID"];
    },
    isPlaying() {
      return this.contextType === "artist"
        ? this.currentTrackID === this.trackID &&
            this.currentTrackIsPlaying &&
            !this.currentPlayingContextType &&
            this.isArtistContext
        : this.contextType === "track"
        ? this.currentTrackID === this.trackID &&
          this.currentTrackIsPlaying &&
          !this.currentPlayingContextType &&
          !this.isArtistContext
        : this.currentTrackIsPlaying &&
          this.currentPlayingContextType === this.contextType &&
          this.currentPlayingItemID === this.trackID;
    },
    addTextGreen() {
      return this.contextType === "artist"
        ? this.currentTrackID === this.trackID &&
            !this.currentPlayingContextType
        : this.contextType === "track"
        ? this.currentTrackID === this.trackID &&
          !this.currentPlayingContextType
        : this.currentTrackID === this.trackID &&
          this.contextType === this.currentPlayingContextType;
    },
  },

  methods: {
    async playTrack(uris, e) {
      console.log(uris);
      this.playingTrackID = e.target.closest(".track--container").id;
      let contextUri = uris;
      let isArtistContext = contextUri.uri.split(":").slice(1)[0];

      if (this.isPlaying) {
        isArtistContext === "artist"
          ? (contextUri.type = this.contextType)
          : "";
        await this.$store.dispatch("controller/pauseCurrentTrack");
      } else {
        contextUri.id = this.playingTrackID;
        if (isArtistContext === "artist") {
          contextUri.index = this.index;
          contextUri.type = this.contextType;
          contextUri.uri = this.artistTopTrackUris;
          await this.$store.dispatch(
            "controller/playArtitsTopTracks",
            contextUri
          );
        }
        if (this.userPage) {
          contextUri.index = this.index;
          contextUri.id = "track";
          contextUri.uri = this.userTopTrackUris;
          await this.$store.dispatch(
            "controller/playArtitsTopTracks",
            contextUri
          );
        }
        if (this.queuePage) {
          contextUri.index = this.index;
          contextUri.id = "track";
          await this.$store.dispatch(
            "controller/playArtitsTopTracks",
            contextUri
          );
        } else {
          contextUri.type = this.contextType;
          await this.$store.dispatch(
            "controller/playSelectedContext",
            contextUri
          );
        }
      }
    },
    async fetchFavTracks() {
      await axios
        .get("https://api.spotify.com/v1/me/tracks?limit=50", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.getToken,
          },
        })
        .then(({ data }) => {
          console.log(data.items);
          this.$store.dispatch("favTracks/getTracks", data);
          this.$store.dispatch("controller/isFavTrack");
        })
        .catch((err) => console.log(err));
    },

    async addRemoveFavTrack(_, e) {
      const trackID = e.target.closest(".track--container").id;
      console.log(trackID);
      console.log("selected track ID =", trackID);
      console.log(
        this.allFavTracks.find((item) => item.track.id === trackID)?.track.id
      );
      const isFavTrackID = this.allFavTracks.find(
        (item) => item.track.id === trackID
      )?.track.id;
      isFavTrackID
        ? this.removeFavTrack(isFavTrackID)
        : this.addFavTrack(trackID);
    },

    selectedTrackEl(trackID) {
      if (this.playlistPage)
        return document.getElementById(
          `${
            this.getFavTracksOnPlaylist[
              `${this.getFavTracksOnPlaylist.indexOf(trackID)}`
            ]
          }`
        );
      if (this.albumPage)
        return document.getElementById(
          `${
            this.getFavTracksOnAlbum[
              `${this.getFavTracksOnAlbum.indexOf(trackID)}`
            ]
          }`
        );
      if (this.diskografiPage)
        return document.getElementById(
          `${
            this.getFavTracksDiscographyAlbum[
              `${this.getFavTracksDiscographyAlbum.indexOf(trackID)}`
            ]
          }`
        );
      if (this.userPage)
        return document.getElementById(
          `${
            this.getUserTopFavTracks[
              `${this.getUserTopFavTracks.indexOf(trackID)}`
            ]
          }`
        );

      if (this.favoriteSongs) {
        let index;
        this.allFavTracks.filter((item, i) => {
          return item.track.id === trackID ? (index = i) : "";
        });
        return document.getElementById(this.allFavTracks[index]?.track?.id);
      }
      if (this.TrackPage)
        return document.getElementById(
          `${
            this.getFavTracksOnAlbum[
              `${this.getFavTracksOnAlbum.indexOf(trackID)}`
            ]
          }`
        );
      if (this.artistPage)
        return document.getElementById(
          `${
            this.getFavTracksOnArtistTopTracks[
              `${this.getFavTracksOnArtistTopTracks.indexOf(trackID)}`
            ]
          }`
        );
    },
    selectedTrackEl2(trackID) {
      return document.getElementsByClassName(
        `${
          this.getFavTracksOnAlbum2[
            `${this.getFavTracksOnAlbum2.indexOf(trackID)}`
          ]
        }`
      );
    },
    async addFavTrack(trackID) {
      await fetch("https://api.spotify.com/v1/me/tracks?ids=" + trackID, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.getToken,
        },
      })
        .then((data) => {
          console.log(data.status);
          if (data.status !== 200) {
            this.$store.dispatch("controller/modalInfoType", {
              type: "error",
            });
          }
          if (data.status === 200)
            this.$store
              .dispatch("controller/modalInfoType", {
                type: "favSong",
                status: true,
              })
              .then(() => {
                this.fetchFavTracks()
                  .then(() => {
                    this.playlistPage
                      ? this.$store.dispatch("playlists/clearTracksID")
                      : this.albumPage || this.TrackPage
                      ? this.$store.dispatch("albums/clearTracksID") &
                        this.$store.dispatch("albums/clearTracksID2")
                      : this.userPage
                      ? this.$store.dispatch("users/clearTracksID")
                      : this.artistPage
                      ? this.$store.dispatch("artists/clearTracksID")
                      : this.diskografiPage
                      ? this.$store.dispatch("discography/clearTracksID")
                      : "";
                    this.findFavTracks();
                    this.TrackPage ? this.findFavTracks2() : "";
                  })
                  .then(() => {
                    const trackItem = document.getElementById(trackID);
                    const trackItem2 = document.getElementsByClassName(trackID);
                    this.addGreenHeartFavTracks(trackItem);
                    this.TrackPage
                      ? this.addGreenHeartFavTracks2(trackItem2)
                      : "";
                  });
              });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async removeFavTrack(trackID) {
      await fetch("https://api.spotify.com/v1/me/tracks?ids=" + trackID, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.getToken,
        },
      })
        .then((data) => {
          console.log(data.status);
          if (data.status !== 200) {
            this.$store.dispatch("controller/modalInfoType", {
              type: "error",
            });
          }
          if (data.status === 200) {
            this.$store.dispatch("controller/modalInfoType", {
              type: "favSong",
              status: false,
            });
            if (this.favoriteSongs) {
              this.removeGreenHeartFavTracks(this.selectedTrackEl(trackID));
            }
            this.fetchFavTracks()
              .then(() => {
                if (
                  this.getFavTracksOnPlaylist.length ||
                  this.getFavTracksOnAlbum.length ||
                  this.getFavTracksOnAlbum2.length ||
                  this.getFavTracksOnArtistTopTracks.length ||
                  this.getUserTopFavTracks.length ||
                  this.getFavTracksDiscographyAlbum.length
                ) {
                  console.log(this.selectedTrackEl(trackID));

                  this.removeGreenHeartFavTracks(this.selectedTrackEl(trackID));

                  this.TrackPage
                    ? this.removeGreenHeartFavTracks2(
                        this.selectedTrackEl2(trackID)
                      )
                    : "";
                }
              })
              .then(() => {
                if (
                  this.getFavTracksOnPlaylist.length ||
                  this.getFavTracksOnAlbum.length ||
                  this.getFavTracksOnAlbum2.length ||
                  this.getFavTracksOnArtistTopTracks.length ||
                  this.getUserTopFavTracks.length ||
                  this.getFavTracksDiscographyAlbum.length
                ) {
                  this.$store.dispatch("playlists/clearTracksID");
                  this.$store.dispatch("albums/clearTracksID");
                  this.$store.dispatch("artists/clearTracksID");
                  this.$store.dispatch("users/clearTracksID");
                  this.$store.dispatch("albums/clearTracksID2");
                  this.$store.dispatch("discography/clearTracksID");
                  this.findFavTracks();
                  this.TrackPage ? this.findFavTracks2() : "";
                }
              });
          }
        })
        .catch((err) => console.log(err));
    },
    toggleTrackOptions() {
      this.trackOptions = !this.trackOptions;
    },
    closeTrackOptionFunc(val) {
      this.trackOptions = val;
    },

    close(e) {
      if (!this.$el.contains(e.target.closest(".track--container"))) {
        this.trackOptions = false;
        this.active = false;
      }
    },
  },
  watch: {
    playingTrackID(newVal, oldVal) {
      if (newVal !== oldVal) {
        console.log("ÇALIŞTIII!!!!!!!😊😊😊😊😊😊😊");
      }
    },
  },
  mounted() {
    document.addEventListener("click", this.close);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.close);
  },
};
</script>

<style scoped>
.activeTrack {
  background-color: hsla(0, 0%, 100%, 0.3) !important;
}

.visibleDots {
  visibility: visible !important;
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
  animation: emptyheart 0.25s ease-in-out 1 alternate;
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
    transform: translateX(-5px) rotate(-10deg);
  }
  66% {
    transform: translateX(5px) rotate(10deg);
  }
  100% {
    transform: translateX(0) rotate(0);
  }
}
</style>
