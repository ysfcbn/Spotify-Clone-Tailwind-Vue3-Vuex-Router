<template>
  <section v-if="currentPlaylist && isAuth" class="box-border">
    <div
      id="playlistPage"
      :class="{
        'bg-gradient-to-b from-opacblack2 to-opacblack3': !playlistFollowers,
      }"
      class="relative z-10 p-5 h-[326px] max-h-[800px] min-h-[340px] w-full mt-[-66px] shadow-[2px_0px_5px_5px_rgba(0,0,0,0.4)]"
      :style="{ '--bgPlaylistImage': `url(${playlistİmage})` }"
    >
      <div class="relative flex items-end justify-start h-full lg:ml-[1rem]">
        <div
          class="flex sm:w-[192px] sm:min-h-[192px] sm:min-w-[192px] xl:h-[232px] xl:w-[232px] xl:min-w-[232px] shadow-[0_8px_40px_10px_rgba(0,0,0,0.6)] rounded-[12px]"
        >
          <img
            v-if="playlistİmage"
            class="object-cover h-full w-full"
            :src="playlistİmage"
            alt="single"
          />
          <div v-else class="grid place-items-center w-full">
            <svg height="60" width="60" viewBox="0 0 54 54">
              <path
                fill="#808080"
                d="M52.16,0.249c-0.217-0.19-0.503-0.275-0.788-0.241l-31,4C19.873,4.072,19.5,4.497,19.5,5v6v28.623
	C17.674,37.428,14.773,36,11.5,36c-5.514,0-10,4.037-10,9s4.486,9,10,9s10-4.037,10-9v-33.12l29-3.742v22.485
	C48.674,28.428,45.773,27,42.5,27c-5.514,0-10,4.037-10,9s4.486,9,10,9s10-4.037,10-9V7V1C52.5,0.712,52.376,0.438,52.16,0.249z
	 M11.5,52c-4.411,0-8-3.141-8-7s3.589-7,8-7s8,3.141,8,7S15.911,52,11.5,52z M42.5,43c-4.411,0-8-3.141-8-7s3.589-7,8-7s8,3.141,8,7
	S46.911,43,42.5,43z M21.5,5.878l29-3.741v3.983l-29,3.741V5.878z"
              />
            </svg>
          </div>
        </div>
        <div class="flex flex-col text-white px-4">
          <h2 style="font-weight: 700" class="uppercase text-xs">Playlist</h2>
          <span>
            <h1
              class="w-full sm:text-3xl md:text-4xl xl:text-5xl tracking-tighter py-2"
              style="font-weight: 700"
            >
              {{ playlistName }}
            </h1>
          </span>
          <div class="description my-1 text-lightest font-normal">
            <p class="line-clamp-2">
              {{ playlistDescription }}
            </p>
          </div>
          <div
            class="flex flex-wrap items-center text-white w-full text-xs sm3:text-sm h-full font-semibold tracking-tight mt-2"
          >
            <div class="flex items-center shrink-0">
              <div class="w-6 h-6 mr-2" v-if="playlistOwnerAvatar">
                <img
                  class="rounded-full"
                  :src="playlistOwnerAvatar"
                  alt="user"
                />
              </div>
              <span
                v-if="playlistOwner"
                class="hover:underline text-base"
                style="font-weight: 700"
              >
                <router-link
                  :to="{ name: 'user', params: { id: playlistOwnerID } }"
                  >{{ owner }}
                </router-link>
              </span>
              <div v-if="playlistFollowers" class="flex flex-nowrap shrink-0">
                <span class="before:content-['•'] before:mx-2"
                  >{{ playlistFollowers }} likes</span
                >
              </div>
            </div>
            <div v-if="totalPlaylistTracks">
              <span class="before:content-['•'] before:mx-2"
                >{{ totalPlaylistTracks }} songs,</span
              >
              <span class="text-sm ml-2 text-opacwhite5">{{
                totalDuration()
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full h-[6.8rem] relative z-20 flex items-start py-[24px]">
      <div class="w-full ml-[1.2rem] flex items-center lg:ml-[2rem]">
        <button
          v-if="totalPlaylistTracks"
          @mousedown="leftClick = true"
          @mouseup="leftClick = false"
          @click="
            playPlaylistContext(
              (uri = {
                uri: playlistUri,
                index: currentPlayingTrackIndex,
                type: contextType,
                id: currentTrackID,
              })
            )
          "
          :class="{
            'bg-green3/70 scale-[1]': leftClick,
            'hover:scale-[1.04] bg-green3/95 hover:bg-green3': !leftClick,
          }"
          class="rounded-full p-[12px] cursor-default"
        >
          <svg height="26" width="26" viewBox="0 0 24 24" class="">
            <path
              v-if="!isPlayingPlaylistContextUri"
              fill="currentColor"
              d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"
            ></path>

            <path
              v-else
              fill="currentColor"
              d="M5.7 3a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7H5.7zm10 0a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7h-2.6z"
            ></path>
          </svg>
        </button>
        <div>
          <button
            v-if="totalPlaylistTracks"
            @click="unFollowPlaylist"
            id="heartBtn"
            class="p-[0.9rem] w-[4rem] ml-3 cursor-default"
            :class="{
              greenHeart: isFavPlaylist,
              emptyHeart: !isFavPlaylist,
            }"
          >
            <svg
              :class="{
                'hover:text-white': !isFavPlaylist,
              }"
              height="28"
              width="28"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M5.21 1.57a6.757 6.757 0 016.708 1.545.124.124 0 00.165 0 6.741 6.741 0 015.715-1.78l.004.001a6.802 6.802 0 015.571 5.376v.003a6.689 6.689 0 01-1.49 5.655l-7.954 9.48a2.518 2.518 0 01-3.857 0L2.12 12.37A6.683 6.683 0 01.627 6.714 6.757 6.757 0 015.21 1.57zm3.12 1.803a4.757 4.757 0 00-5.74 3.725l-.001.002a4.684 4.684 0 001.049 3.969l.009.01 7.958 9.485a.518.518 0 00.79 0l7.968-9.495a4.688 4.688 0 001.049-3.965 4.803 4.803 0 00-3.931-3.794 4.74 4.74 0 00-4.023 1.256l-.008.008a2.123 2.123 0 01-2.9 0l-.007-.007a4.757 4.757 0 00-2.214-1.194z"
              ></path>
              <path
                v-if="isFavPlaylist"
                :class="{ 'text-green3': isFavPlaylist }"
                fill="currentColor"
                d="M8.667 1.912a6.257 6.257 0 00-7.462 7.677c.24.906.683 1.747 1.295 2.457l7.955 9.482a2.015 2.015 0 003.09 0l7.956-9.482a6.188 6.188 0 001.382-5.234l-.49.097.49-.099a6.303 6.303 0 00-5.162-4.98h-.002a6.24 6.24 0 00-5.295 1.65.623.623 0 01-.848 0 6.257 6.257 0 00-2.91-1.568z"
              ></path>
            </svg>
          </button>
          <button
            @click="toggleAppOptions"
            class="text-lightest cursor-default w-fit relative hover:text-white"
          >
            <svg
              height="32"
              width="32"
              viewBox="0 0 24 24"
              class="pointer-events-none"
            >
              <path
                fill="currentColor"
                d="M4.5 13.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm15 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm-7.5 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
              ></path>
            </svg>
          </button>
          <AppOptions
            :playlistPage="playlistPage"
            v-if="appOptions"
            :appOptions="appOptions"
            :isFavPlaylist="isFavPlaylist"
            :unFollowPlaylist="unFollowPlaylist"
            @toggleAppOptions="toggleAppOptions"
          >
          </AppOptions>
        </div>
      </div>
    </div>

    <!-- Playlist -->
    <div
      v-if="totalPlaylistTracks"
      :class="{ 'mx-5 z-0': margin }"
      class="playlistContainer relative h-full min-w-[450]"
    >
      <TrackItemsHeader :margin="margin" :playlistPage="playlistPage" />
      <div class="trackItems--container mt-2">
        <TrackItems
          v-for="({ track }, i) in playlistTracksItems"
          :key="track?.id"
          :id="track?.id"
          :uri="playlistUri"
          :itemUri="track?.uri"
          :track="track"
          :trackID="track?.id"
          :contextType="contextType"
          :index="i"
          :playlistPage="playlistPage"
          :margin="margin"
          :findFavTracks="findFavTracks"
          :addGreenHeartFavTracks="addGreenHeartFavTracks"
          :removeGreenHeartFavTracks="removeGreenHeartFavTracks"
        >
          <template #trackImg>
            <img
              class="object-fit w-[40px] h-[40px]"
              :src="track?.album?.images[2]?.url"
              alt=""
            />
          </template>
          <template #trackName
            ><router-link :to="{ name: 'track', params: { id: track?.id } }">
              {{ track?.name }}</router-link
            ></template
          >
          <template #artist
            ><router-link
              class="hover:underline"
              v-for="artist in track?.artists"
              :key="artist?.id"
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
          <template #albumName
            ><router-link
              :to="{
                name: 'album',
                params: { id: `${track?.album.id}` },
              }"
            >
              {{ track?.album.name }}</router-link
            ></template
          >
          <template #favTime>{{
            uploadDate((date = playlistTracksItems[i].added_at))
          }}</template>
          <template #duration>{{
            trackDuration((duration = track?.duration_ms))
          }}</template>
        </TrackItems>
      </div>
    </div>
  </section>
  <section
    v-else
    class="text-white text-4xl w-full h-fit grid items-placed-center"
  >
    <div class="">LOADİNG...</div>
  </section>
</template>

<script>
import TrackItems from "../TrackItems/TrackItems.vue";
import TrackItemsHeader from "../TrackItems/TrackItemsHeader.vue";
import AppOptions from "../AppOptions/AppOptions.vue";
import axios from "axios";

export default {
  name: "PlaylistPage",
  components: { TrackItems, TrackItemsHeader, AppOptions },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      owner: "",
      appOptions: false,
      leftClick: false,
      playlistPage: true,
      contextType: "playlist",
      margin: false,
      options2: "",
      observer2: null,
      presentation: null,
      headerHeight: document.getElementById("header").getBoundingClientRect()
        .height,
      bodyHeight: document.body.getBoundingClientRect().height,
      bodyWidth: document.body.getBoundingClientRect().width,
      heartBtn: document.getElementById("heartBtn"),
    };
  },
  methods: {
    async fetchPlaylist() {
      await axios
        .get("https://api.spotify.com/v1/playlists/" + this.id, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.getToken,
          },
        })
        .then(({ data }) => {
          this.$store.dispatch("playlists/getPlaylist", data);
        })
        .catch((err) => console.log(err));
    },
    async fetchUser(href) {
      await axios
        .get(href, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.getToken,
          },
        })
        .then(({ data }) => {
          console.log(data);
          this.$store.dispatch("users/user", data);
        })
        .catch((err) => console.log(err));
    },
    async playPlaylistContext(uri) {
      console.log(uri);
      if (this.isPlayingPlaylistContextUri) {
        await this.$store.dispatch("controller/pauseCurrentTrack");
      } else {
        uri.id = this.playlistTracks[this.currentPlayingTrackIndex]?.id;
        uri.index = this.currentPlayingTrackIndex;
        uri.type = this.contextType;
        console.log(
          "LOCATED PLAYLİST CONTEXT PLAY INDEX",
          this.currentPlayingTrackIndex
        );
        !this.currentPlayingTrackIndex
          ? await this.$store.dispatch("controller/playSelectedContext", uri)
          : await this.$store.dispatch("controller/playCurrentTrack", uri);
      }
    },
    async unFollowPlaylist() {
      this.appOptions = false;
      if (this.isFavPlaylist) {
        await axios
          .delete(
            "https://api.spotify.com/v1/playlists/" + this.id + "/followers",
            {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + this.getToken,
              },
            }
          )
          .then((data) => {
            if (data.status !== 200) {
              this.$store.dispatch("controller/modalInfoType", {
                type: "error",
              });
            }
            if (data.status === 200) {
              heartBtn.classList.add("animationEmptyHeart");
              heartBtn.classList.remove("animationGreenHeart");
              this.$store.dispatch("controller/modalInfoType", {
                type: "playlist",
                status: false,
              });
              axios
                .get(
                  "https://api.spotify.com/v1/me/playlists" +
                    "?limit=50&offset=0",
                  {
                    headers: {
                      Accept: "application/json",
                      "Content-Type": "application/json",
                      Authorization: "Bearer " + this.getToken,
                    },
                  }
                )
                .then(({ data }) => {
                  this.$store.dispatch("playlists/userPlaylists", data.items);
                })
                .catch((err) => console.log(err));
            }
          })
          .catch((err) => {
            console.log(err);
            this.$store.dispatch("controller/modalInfoType", {
              type: "error",
              status: true,
            });
          });
      } else {
        await this.FollowPlaylist();
      }
    },

    async FollowPlaylist() {
      await axios
        .put(
          "https://api.spotify.com/v1/playlists/" + this.id + "/followers",
          {
            public: true,
          },
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + this.getToken,
            },
          }
        )
        .then((data) => {
          if (data.status === 200) {
            heartBtn.classList.add("animationGreenHeart");
            heartBtn.classList.remove("animationEmptyHeart");
            this.$store.dispatch("controller/modalInfoType", {
              type: "playlist",
              status: true,
            });
            axios
              .get(
                "https://api.spotify.com/v1/me/playlists" +
                  "?limit=50&offset=0",
                {
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + this.getToken,
                  },
                }
              )
              .then(({ data }) => {
                this.$store.dispatch("playlists/userPlaylists", data.items);
              })
              .catch((err) => console.log(err));
          }
        })
        .catch((err) => {
          console.log(err);
          this.$store.dispatch("controller/modalInfoType", {
            type: "error",
            status: true,
          });
        });
    },
    // async checkFavTracks() {
    // 	await axios
    // 		.get(
    // 			'https://api.spotify.com/v1/me/trakcs/contains?ids=' +
    // 				this.allFavTrackIDs,
    // 			{
    // 				headers: {
    // 					Accept: 'application/json',
    // 					'Content-Type': 'application/json',
    // 					Authorization: 'Bearer ' + this.getToken,
    // 				},
    // 			}
    // 		)
    // 		.then(({ data }) => {
    // 			this.$store.dispatch('episodes/currentEpisodeIsFav', data);
    // 		})
    // 		.catch(err => console.log(err));
    // },
    findFavTracks() {
      this.allFavTracks.forEach((track, i) => {
        this.playlistTracksItems.forEach((item, i) => {
          if (track?.track?.id === item?.track?.id) {
            this.$store.dispatch("playlists/favTracksID", item?.track?.id);
          }
        });
      });
    },
    addGreenHeartFavTracks(trackItem = false) {
      if (!trackItem) {
        this.addGreenHeartEl.forEach((item) => {
          item.children[4].children[0].classList.remove(
            "emptyHeart",
            "animationEmptyHeart"
          );
          item.children[4].children[0].classList.add("greenHeart");

          item.children[4].children[0].children[0].children[0].classList.remove(
            "hidden"
          );

          item.children[4].children[0].children[0].children[1].classList.add(
            "hidden"
          );
        });
      } else {
        trackItem.children[4].children[0].classList.remove(
          "emptyHeart",
          "animationEmptyHeart"
        );
        trackItem.children[4].children[0].classList.add("greenHeart");
        trackItem.children[4].children[0].classList.add("animationGreenHeart");
        trackItem.children[4].children[0].children[0].children[0].classList.remove(
          "hidden"
        );

        trackItem.children[4].children[0].children[0].children[1].classList.add(
          "hidden"
        );
      }
    },

    removeGreenHeartFavTracks(item) {
      item.children[4].children[0].classList.remove(
        "greenHeart",
        "animationGreenHeart"
      );
      item.children[4].children[0].classList.add("emptyHeart");
      item.children[4].children[0].classList.add("animationEmptyHeart");

      item.children[4].children[0].children[0].children[0].classList.add(
        "hidden"
      );
      item.children[4].children[0].children[0].children[1].classList.remove(
        "hidden"
      );
    },
    toggleAppOptions() {
      this.appOptions = !this.appOptions;
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
    uploadDate(date) {
      const today = new Date();
      const trackDate = new Date(date);
      const totalMiliSeconds = Math.abs(
        Math.round(today.getTime() - trackDate.getTime())
      );

      const year = new Date(date).getFullYear();
      const month = this.getMonths[new Date(date).getMonth()];
      const day = new Date(date).getDate();
      const hours = Math.round(totalMiliSeconds / 1000 / 60 / 60);
      const minutes = Math.abs(
        Math.floor((totalMiliSeconds / 1000 / 60 / 60) * 60)
      );
      const seconds = Math.floor(
        ((totalMiliSeconds / 1000 / 60 / 60) * 60 - minutes) * 60
      );

      if (
        Math.abs(Math.floor((trackDate - today) / (1000 * 60 * 60 * 24))) < 31
      ) {
        const isDay = Math.abs(
          Math.round(
            (today.getTime() - trackDate.getTime()) / 1000 / 60 / 60 / 24
          )
        );
        if (isDay > 0) {
          return isDay + " gün önce";
        } else {
          return totalMiliSeconds < 60000
            ? seconds + " saniye önce"
            : totalMiliSeconds > 60000 && totalMiliSeconds < 3600000
            ? minutes + " dakika önce"
            : totalMiliSeconds > 3600000
            ? hours + " saat önce"
            : "";
        }
      } else return `${day} ${month} ${year}`;
    },
    trackDuration(duration) {
      const minutes = Math.floor(duration / 60000);
      const seconds = Math.floor((duration % 60000) / 1000);
      const result = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
      return result;
    },
    totalDuration() {
      const totalMiliSeconds = this.currentPlaylist?.tracks?.items?.reduce(
        (acc, { track }) => {
          acc += track?.duration_ms ? track.duration_ms : 0;
          return acc;
        },
        0
      );
      const hours = Math.floor(totalMiliSeconds / 1000 / 60 / 60);
      const minutes = () => {
        if (totalMiliSeconds > 3600000) {
          return Math.abs(
            Math.floor((totalMiliSeconds / 1000 / 60 / 60 - hours) * 60)
          );
        } else {
          return Math.floor((totalMiliSeconds / 1000 / 60 / 60) * 60);
        }
      };
      const seconds = Math.abs(
        Math.floor(((totalMiliSeconds / 1000 / 60 / 60) * 60 - minutes()) * 60)
      );
      const result = () => {
        if (totalMiliSeconds > 3600000) {
          return hours >= 5
            ? "about " + hours + " hr " + minutes() + " min"
            : hours + " hr " + minutes() + " min";
        } else {
          return minutes() + " min " + seconds + " sec";
        }
      };

      return result();
    },
  },
  computed: {
    isAuth() {
      return this.$store.getters.isAuth;
    },
    getToken() {
      return this.$store.getters.accessToken;
    },
    currentPlaylist() {
      return this.$store.getters["playlists/getPlaylist"];
    },
    currentPlaylistOwnerHref() {
      return this.$store.getters["playlists/getPlaylist"]?.owner?.href;
    },
    playlistİmage() {
      return this.$store.getters["playlists/getPlaylist"]?.images[0]?.url;
    },
    playlistName() {
      return this.currentPlaylist?.name;
    },
    playlistDescription() {
      return this.currentPlaylist?.description;
    },
    playlistOwnerAvatar() {
      return this.$store.getters["users/getUser"]?.images[0]?.url;
    },
    playlistOwner() {
      return this.currentPlaylist?.owner?.display_name;
    },

    playlistOwnerID() {
      return this.currentPlaylist?.owner?.id;
    },
    playlistFollowers() {
      return this.currentPlaylist?.followers?.total;
    },
    isFavPlaylist() {
      return this.$store.getters["playlists/getUserFavPlaylists"].filter(
        (item) => item.id === this.$route.params.id
      ).length > 0
        ? true
        : false;
    },
    playlistUri() {
      return this.currentPlaylist?.uri;
    },
    getCurrentlyPlayingTrack() {
      return this.$store.getters["controller/getCurrentlyPlayingTrack"];
    },
    currentTrackID() {
      return this.getCurrentlyPlayingTrack?.item?.id;
    },
    playlistTracks() {
      return this.currentPlaylist?.tracks?.items;
    },

    findCurrentPlayingTrackIndex() {
      return this.getCurrentlyPlayingTrack?.context?.type === this.contextType
        ? this.playlistTracks.indexOf(
            this.playlistTracks.find(
              (item) => item.track.id === this.currentTrackID
            )
          )
        : 0;
    },
    currentPlayingTrackIndex() {
      return this.findCurrentPlayingTrackIndex + 1
        ? this.findCurrentPlayingTrackIndex
        : 0;
    },
    isPlayingPlaylistContextUri() {
      return (
        this.getCurrentlyPlayingTrack?.context?.uri === this.playlistUri &&
        this.getCurrentlyPlayingTrack?.is_playing
      );
    },

    isClickHeaderBtn() {
      return this.$store.getters["controller/isClickHeaderBtn"];
    },

    totalPlaylistTracks() {
      return this.currentPlaylist?.tracks?.total;
    },
    allFavTracks() {
      return this.$store.getters["favTracks/getTracks"]?.items;
    },
    // allFavTrackIDs() {
    // 	return this.getFavTracksonplaylist?.map(item => item.id).join(',');
    // },
    getFavTracksonplaylist() {
      return this.$store.getters["playlists/getfavTracksID"];
    },
    playlistTracksItems() {
      return this.currentPlaylist?.tracks?.items;
    },
    addGreenHeartEl() {
      return this.getFavTracksonplaylist.map((item) =>
        document.getElementById(`${item}`)
      );
    },
    getMonths() {
      return this.$store.getters["controller/getMonths"];
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
    isPlayingPlaylistContextUri(newVal) {
      if (newVal) {
        this.$store.dispatch("controller/isPlayingHeaderBtn", newVal);
      } else {
        this.$store.dispatch("controller/isPlayingHeaderBtn", newVal);
      }
    },
    async isClickHeaderBtn(newVal, oldVal) {
      if (newVal !== oldVal) {
        await this.playPlaylistContext({
          uri: this.playlistUri,
          index: this.currentPlayingTrackIndex,
          type: this.contextType,
          id: this.currentTrackID,
        });
      }
    },
    margin(newVal, oldVal) {
      newVal && this.appOptions
        ? (this.appOptions = true)
        : oldVal && this.appOptions
        ? (this.appOptions = false)
        : (this.appOptions = false);
    },
  },

  async created() {
    window.addEventListener("resize", this.resizeOption2);
    this.playlistPage = true;
    this.playlistTracksItems;
    console.log("locatedPlaylist Mounted");
    (await this.isPlayingPlaylistContextUri)
      ? this.$store.dispatch("controller/isPlayingHeaderBtn", true)
      : this.$store.dispatch("controller/isPlayingHeaderBtn", false);

    await this.fetchPlaylist();
    await this.fetchUser(this.currentPlaylistOwnerHref);

    this.owner = this.playlistOwner;

    this.findFavTracks();
    await this.getFavTracksonplaylist;
    this.addGreenHeartFavTracks();

    setTimeout(() => {
      this.header = document.getElementById("header");
      this.playlistEl = document.getElementById("playlistPage");
      this.playlistTracksItems?.length
        ? (this.presentation = document.querySelector(".presentation"))
        : "";

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

      this.playlistTracksItems.length
        ? this.observer.observe(this.playlistEl)
        : "";

      this.options2 = {
        root: document.body,
        threshold: 0,
        rootMargin: `${
          +((this.headerHeight * 100) / this.bodyHeight).toFixed(1) * -1
        }% 0px -${
          100 - +((this.headerHeight * 100) / this.bodyHeight).toFixed(1)
        }% 0px`,
      };

      this.observer2 = new IntersectionObserver((entries, obs) => {
        if (entries[0].isIntersecting) {
          this.presentation.classList.add("prebg");
          this.margin = false;
        } else {
          this.presentation.classList.remove("prebg");
          this.margin = true;
        }
      }, this.options2);

      this.playlistTracksItems?.length
        ? this.observer2.observe(this.presentation)
        : "";
    }, 1);
  },
  beforeUnmount() {
    console.log("loacatedPlaylist Unmounted!");

    window.removeEventListener("resize", this.resizeOption2);
    this.playlistTracksItems?.length && this.playlistEl
      ? this.observer.unobserve(this.playlistEl)
      : "";
    this.playlistTracksItems?.length && this.playlistEl
      ? this.observer2.unobserve(this.presentation)
      : "";
    this.playlistTracksItems?.length && this.playlistEl
      ? this.presentation.classList.remove("prebg")
      : "";
    this.header?.classList.remove("fav-songs-intersec-bg1");
    this.header?.classList.remove("fav-songs-intersec-bg2");
    this.$emit("visToggleHeaderBtn", false);
    this.playlistPage = false;
    this.$store.dispatch("controller/isClickHeaderBtn", null);
  },
  unmounted() {
    this.$store.dispatch("controller/closeHeaderBtn");
    this.$store.dispatch("playlists/clearTracksID");
    this.$store.dispatch("controller/isPlayingHeaderBtn", null);
  },
};
</script>

<style scoped lang="scss">
#playlistPage {
  &::before {
    content: "";
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
    background-size: cover;
    background-position: top;
    background-image: var(--bgPlaylistImage);
    filter: blur(8rem);
    width: 110%;
    height: 100%;
  }
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
