<template>
  <section class="box-border">
    <div
      id="user"
      class="p-5 h-[340px] max-h-[800px] min-h-[280px] w-full mt-[-64px] relative"
      :style="{ '--bgUserImage': `url(${currentUserImage})` }"
    >
      <div class="relative flex items-end justify-start h-full lg:ml-[1rem]">
        <div
          :class="{
            'bg-dark': currentUserImage,
            'bg-dark2': !currentUserImage,
          }"
          class="group relative rounded-full p-5 h-[192px] w-[192px] sm:w-[192px] sm:min-w-[192px] xl:h-[232px] xl:w-[232px] xl:min-w-[232px] shadow-[0_8px_75px_15px_rgba(0,0,0,0.35)]"
        >
          <img
            v-if="currentUserImage"
            :class="{ 'group-hover:opacity-20': isMyUserPage }"
            class="absolute left-0 top-0 object-cover rounded-full"
            :src="currentUserImage"
            alt="user image"
          />
          <div
            class="relative z-90 group flex flex-col items-center justify-center h-full w-full text-lightest cursor-default mt-[-0.5rem]"
          >
            <svg
              v-if="!currentUserImage"
              height="44"
              width="44"
              viewBox="0 0 16 16"
              class="group-hover:hidden"
            >
              <path
                fill="currentColor"
                d="M6.233.371a4.388 4.388 0 015.002 1.052c.421.459.713.992.904 1.554.143.421.263 1.173.22 1.894-.078 1.322-.638 2.408-1.399 3.316l-.127.152a.75.75 0 00.201 1.13l2.209 1.275a4.75 4.75 0 012.375 4.114V16H.382v-1.143a4.75 4.75 0 012.375-4.113l2.209-1.275a.75.75 0 00.201-1.13l-.126-.152c-.761-.908-1.322-1.994-1.4-3.316-.043-.721.077-1.473.22-1.894a4.346 4.346 0 01.904-1.554c.411-.448.91-.807 1.468-1.052zM8 1.5a2.888 2.888 0 00-2.13.937 2.85 2.85 0 00-.588 1.022c-.077.226-.175.783-.143 1.323.054.921.44 1.712 1.051 2.442l.002.001.127.153a2.25 2.25 0 01-.603 3.39l-2.209 1.275A3.25 3.25 0 001.902 14.5h12.196a3.25 3.25 0 00-1.605-2.457l-2.209-1.275a2.25 2.25 0 01-.603-3.39l.127-.153.002-.001c.612-.73.997-1.52 1.052-2.442.032-.54-.067-1.097-.144-1.323a2.85 2.85 0 00-.588-1.022A2.888 2.888 0 008 1.5z"
              ></path>
            </svg>
            <svg
              height="48"
              width="48"
              aria-hidden="true"
              viewBox="0 0 24 24"
              :class="{ 'group-hover:block': isMyUserPage }"
              class="relative z-100 hidden mt-5"
            >
              <path
                fill="white"
                d="M17.318 1.975a3.329 3.329 0 114.707 4.707L8.451 20.256c-.49.49-1.082.867-1.735 1.103L2.34 22.94a1 1 0 01-1.28-1.28l1.581-4.376a4.726 4.726 0 011.103-1.735L17.318 1.975zm3.293 1.414a1.329 1.329 0 00-1.88 0L5.159 16.963c-.283.283-.5.624-.636 1l-.857 2.372 2.371-.857a2.726 2.726 0 001.001-.636L20.611 5.268a1.329 1.329 0 000-1.879z"
              ></path>
            </svg>
            <span
              :class="{ 'group-hover:block': isMyUserPage }"
              class="hidden text-white mt-1 text-base"
              >Fotoğraf seç</span
            >
          </div>
        </div>

        <div
          class="flex flex-col items-start text-white w-full text-xs sm3:text-sm xl:h-[200px] h-[152px] font-semibold tracking-tight ml-4 mt-2"
        >
          <div>
            <h2 class="text-[12px] leading-4 font-semibold">PROFİL</h2>
          </div>
          <h1
            class="md2:my-4 sm:text-5xl md:text-5xl xl:text-8xl tracking-tighter py-2 font-extrabold whitespace-nowrap self-start flex"
          >
            {{ currentUserName }}
          </h1>
          <div
            class="flex flex-wrap items-center text-white w-full text-xs sm3:text-sm h-full font-semibold tracking-tight mt-2"
          >
            <div class="flex items-center shrink-0">
              <span class="">
                Herkese Açık {{ publicPlaylists?.length }} Çalma Listesi
              </span>
            </div>
            <div class="flex shrink-0 wrap">
              <router-link
                to="/"
                class="hover:underline before:content-['•'] before:mx-1 before:inline-block"
              >
                {{ currentUserTotalFollowers }} Takipçi
              </router-link>
            </div>
            <div class="flex shrink-0 wrap">
              <router-link
                to="/"
                class="hover:underline before:content-['•'] before:mx-1 before:inline-block"
                >Takip Edilenler: {{ curUserFollowedArtists.length }}
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Diğer Seçenekler -->
    <div
      class="absolute w-full h-[212px] left-0 shrink-0 z-0"
      style="background-image: linear-gradient(to bottom, rgba(33, 33, 33,0.5), rgba(0, 0, 0,0.1)"
    ></div>

    <div
      :class="{ 'top-5': !isMyUserPage, 'top-10': isMyUserPage }"
      class="w-full h-[3.8rem] relative flex flex-col items-start"
    >
      <div class="flex w-full ml-[1.5rem] lg:ml-[2.3rem]">
        <div class="flex justify-start items-center">
          <div
            v-if="!isMyUserPage"
            :class="{
              'w-[9.5rem]': currentUserIsFav,
              'w-[6.6rem]': !currentUserIsFav,
            }"
          >
            <button
              @click="addRemoveUser"
              type="button"
              :class="{
                'w-[8rem] border-white': currentUserIsFav,
                'hover:border-white border-opacwhite2': !currentUserIsFav,
              }"
              class="border cursor-default w-[5.5rem] h-fit text-white px-2 py-1 rounded-[5px]"
            >
              <span
                v-if="currentUserIsFav"
                class="text-sm"
                style="font-weight: 600"
                >TAKİP EDİLİYOR</span
              >
              <span v-else class="text-sm" style="font-weight: 600">
                TAKİP ET</span
              >
            </button>
          </div>
        </div>
        <div class="flex items-center">
          <UserOptions
            :isMyUserPage="isMyUserPage"
            :userURL="currentUserUrl"
            :addRemoveUser="addRemoveUser"
            :follow="currentUserIsFav"
          />
        </div>
      </div>
    </div>

    <div v-if="isMyUserPage">
      <!-- en çok dinlenilenilen sanatçılar -->
      <section class="p-5 lg:ml-[1rem]">
        <Card :userPage="userPage" :currentData="currentUserTopArtists">
          <template #cardTitle>Bu ayın en çok dinlenen sanatçıları</template>
          <template #imgContainer="{ data }">
            <div class="w-full relative mb-5">
              <img
                class="h-full w-full object-cover rounded-full shadow-[0px_5px_12px_10px_rgba(0,0,0,0.3)]"
                :src="data?.images[0]?.url"
                alt="image"
              />
            </div>
          </template>
          <template #firstTitle="{ data }">{{ data?.name }}</template>
          <template #secondTitle="{ data }"
            ><span class="capitalize">{{ data?.type }}</span>
          </template>
          <template #playBtn="{ data }">
            <div
              :class="{
                'opacity-100 translate-y-[-0.4rem]':
                  getCurrentlyPlayingTrack?.item?.artists[0].id === data?.id &&
                  getCurrentlyPlayingTrack?.is_playing &&
                  isArtistContext &&
                  !getCurrentlyPlayingTrack?.context,
              }"
              class="bg-dark1 rounded-full right-0 bottom-0 absolute flex items-center my-1 mx-2 group-hover:block opacity-0 group-hover:opacity-100 transition ease-in duration-200 group-hover:translate-y-[-0.4rem]"
            >
              <button
                @click="
                  playArtistTopTracksFunc(
                    (artistID = data.id),
                    (href = data.href)
                  )
                "
                @mousedown="leftClick = true"
                @mouseup="leftClick = false"
                id="playBtn"
                :class="{
                  ' bg-green3/80 scale-80': leftClick,
                  'hover:scale-110 bg-green3/95 hover:bg-green3': !leftClick,
                }"
                class="p-3 rounded-full cursor-default shadow-[0px_5px_6px_2px_rgba(0,0,0,0.4)]"
              >
                <h1 class="text-white"></h1>
                <svg role="img" height="24" width="24" viewBox="0 0 24 24">
                  <path
                    v-if="
                      getCurrentlyPlayingTrack?.item?.artists[0].id ===
                        data?.id &&
                      getCurrentlyPlayingTrack?.is_playing &&
                      isArtistContext &&
                      !getCurrentlyPlayingTrack?.context
                    "
                    fill="text-black"
                    d="M5.7 3a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7H5.7zm10 0a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7h-2.6z"
                  ></path>
                  <path
                    v-else
                    fill="text-black"
                    d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"
                  ></path>
                </svg>
              </button>
            </div>
          </template>
        </Card>
      </section>

      <!-- en çok dinlenilenilen parçalar -->
      <section class="p-5 lg:ml-[1rem]">
        <div class="relative">
          <div class="flex justify-between items-stretch h-[3.3rem]">
            <div class="h-fit flex-end">
              <h2
                class="text-[1.5rem] text-white leading-7 tracking-tight hover:underline hover:text-underline-offset-8 font-semibold cursor-pointer"
              >
                Bu ayın en çok dinlenen parçaları
              </h2>
              <h6 class="text-lightest text-sm">Yalnızca sana görünür</h6>
            </div>
            <div class="self-end">
              <h6
                class="h-full md:text-[12px] text-[10px] font-semibold leading-10 text-lightest hover:underline hover:text-white underline-offset-2 uppercase cursor-pointer"
              >
                HEPSİNİ GÖR
              </h6>
            </div>
          </div>
        </div>

        <div class="mt-[0.5rem]">
          <TrackItems
            v-for="(track, i) in topTracks"
            :key="track.id"
            :id="track.id"
            :index="i"
            :uri="track.uri"
            :userTopTrackUris="userTopTrackUris"
            :userPage="userPage"
            :trackID="track.id"
            :contextType="track.type"
            :findFavTracks="findFavTracks"
            :addGreenHeartFavTracks="addGreenHeartFavTracks"
            :removeGreenHeartFavTracks="removeGreenHeartFavTracks"
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
                    ? artist.name ===
                      track.artists[track.artists.length - 1].name
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
      </section>
    </div>
    <!-- herkese açık çalma listesi -->
    <section class="p-5 lg:ml-[1rem]">
      <Card :currentData="publicPlaylists">
        <template #cardTitle>Herkese Açık Çalma Listesi</template>
        <template #imgContainer="{ data }">
          <div class="h-full">
            <div class="w-full relative mb-5">
              <img
                v-if="data?.images[0]?.url"
                class="object-cover rounded-md"
                :src="data?.images[0]?.url"
                alt="playlist Image"
              />
              <div
                v-else
                class="relative py-[50%] w-full mb-5 relative flex items-start bg-light justify-center rounded-md"
              >
                <svg
                  height="100"
                  width="100"
                  viewBox="0 0 54 54"
                  class="absolute top-[50%] bottom-0 -translate-y-[50%]"
                >
                  <path
                    fill="#808080"
                    d="M52.16,0.249c-0.217-0.19-0.503-0.275-0.788-0.241l-31,4C19.873,4.072,19.5,4.497,19.5,5v6v28.623
	C17.674,37.428,14.773,36,11.5,36c-5.514,0-10,4.037-10,9s4.486,9,10,9s10-4.037,10-9v-33.12l29-3.742v22.485
	C48.674,28.428,45.773,27,42.5,27c-5.514,0-10,4.037-10,9s4.486,9,10,9s10-4.037,10-9V7V1C52.5,0.712,52.376,0.438,52.16,0.249z
	 M11.5,52c-4.411,0-8-3.141-8-7s3.589-7,8-7s8,3.141,8,7S15.911,52,11.5,52z M42.5,43c-4.411,0-8-3.141-8-7s3.589-7,8-7s8,3.141,8,7
	S46.911,43,42.5,43z M21.5,5.878l29-3.741v3.983l-29,3.741V5.878z"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </template>
        <template #firstTitle="{ data }">{{ data.name }}</template>
        <template #secondTitle="{ data }"
          ><span v-if="totalFollowers[data.id] !== 0"
            >{{ totalFollowers[data.id] }} Takipçi</span
          >
        </template>
        <template #playBtn="{ data }">
          <div
            :class="{
              'opacity-100 translate-y-[-0.4rem]':
                getCurrentlyPlayingTrack?.is_playing &&
                data.uri === getCurrentlyPlayingTrack?.context?.uri,
            }"
            class="bg-dark1 rounded-full right-0 bottom-0 absolute flex items-center my-1 mx-2 group-hover:block opacity-0 group-hover:opacity-100 transition ease-in duration-200 group-hover:translate-y-[-0.4rem]"
          >
            <button
              v-if="data?.images[0]?.url"
              id="playBtn"
              @click="
                playContextUri(
                  (uri = {
                    uri: data.uri,
                    index: currentPlayingTrackIndex,
                    type: data.type,
                  }),
                  (href = data.href)
                )
              "
              @mousedown="leftClick = true"
              @mouseup="leftClick = false"
              :class="{
                ' bg-green3/80 scale-80': leftClick,
                'hover:scale-110 bg-green3/95 hover:bg-green3': !leftClick,
              }"
              class="p-3 rounded-full cursor-default shadow-[0px_5px_6px_2px_rgba(0,0,0,0.4)]"
            >
              <svg role="img" height="24" width="24" viewBox="0 0 24 24">
                <path
                  v-if="
                    !(
                      getCurrentlyPlayingTrack?.is_playing &&
                      data.uri === getCurrentlyPlayingTrack?.context?.uri
                    )
                  "
                  fill="text-black"
                  d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"
                ></path>
                <path
                  v-else
                  fill="text-black"
                  d="M5.7 3a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7H5.7zm10 0a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7h-2.6z"
                ></path>
              </svg>
            </button>
          </div>
        </template>
      </Card>
    </section>

    <!-- takip ediliyor -->
    <section class="p-5 lg:ml-[1rem]">
      <Card
        :follows="true"
        :artists="true"
        :currentData="curUserFollowedArtists"
      >
        <template #cardTitle>Takip Ediliyor</template>

        <template #imgContainer="{ data }">
          <div class="w-full relative mb-5">
            <img
              class="h-full w-full object-cover rounded-full"
              :src="data?.images[0]?.url"
              alt="image"
            />
          </div>
        </template>
        <template #firstTitle="{ data }">{{ data.name }}</template>
        <template #secondTitle><span>Profil</span> </template>
      </Card>
    </section>
  </section>
</template>

<script>
import TrackItems from "../TrackItems/TrackItems.vue";
import UserOptions from "./UserOptions.vue";
import Info from "../SpotifyInfo/Info.vue";
import axios from "axios";
import Card from "../Cards/Card.vue";

export default {
  components: { TrackItems, UserOptions, Info, Card },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      userPage: true,
      leftClick: false,

      typeOfSelectedSection: null,
      publicPlaylistsData: {},
    };
  },
  computed: {
    isAuth() {
      return this.$store.getters.isAuth;
    },
    getToken() {
      return this.$store.getters.accessToken;
    },
    currentUserID() {
      return this.$store.getters.getCurrentUser?.id;
    },
    isMyUserPage() {
      return this.currentUserID === this.$route.params.id;
    },
    currentUser() {
      return this.isMyUserPage
        ? this.$store.getters.getCurrentUser
        : this.$store.getters["users/getUser"];
    },
    currentUserIsFav() {
      return this.$store.getters["users/getCurrentUserIsFav"];
    },
    currentUserName() {
      return this.currentUser?.display_name;
    },
    currentUserUrl() {
      return this.currentUser?.external_urls.spotify;
    },
    currentUserImage() {
      return this.currentUser?.images[0]?.url;
    },
    currentUserTotalFollowers() {
      return this.currentUser?.followers.total;
    },
    currentUserTopArtists() {
      return this.$store.getters["users/getCurUserTopArtists"]?.items;
    },
    currentUserTopTracks() {
      return this.$store.getters["users/getCurUserTopTracks"]?.items;
    },
    getUserTopFavTracks() {
      return this.$store.getters["users/getFavTracksID"];
    },
    topTracks() {
      return this.currentUserTopTracks?.slice(0, 4);
    },
    userTopTrackUris() {
      return this.topTracks.map((item) => item?.uri);
    },
    allFavTracks() {
      return this.$store.getters["favTracks/getTracks"].items;
    },
    currentPlaylistTracks() {
      return this.$store.getters["playlists/getPlaylist"]?.tracks?.items;
    },
    getCurrentPlaylistUri() {
      return this.$store.getters["playlists/getPlaylist"]?.uri;
    },

    getCurrentlyPlayingTrack() {
      return this.$store.getters["controller/getCurrentlyPlayingTrack"];
    },
    currentTrackID() {
      return this.getCurrentlyPlayingTrack?.item?.id;
    },
    currentPlaylist() {
      return this.$store.getters["playlists/getPlaylist"]?.tracks?.items;
    },
    isArtistContext() {
      return this.$store.getters["controller/isArtistContext"];
    },
    artistTopTracks() {
      return this.$store.getters["artists/getTopTracks"];
    },
    artistTopTrackUris() {
      return this.artistTopTracks.map((item) => item?.uri);
    },
    findCurrentPlayingTrackIndex() {
      return this.typeOfSelectedSection === "playlist"
        ? this.currentPlaylist?.indexOf(
            this.currentPlaylist?.find(
              (item) => item.track.id === this.currentTrackID
            )
          )
        : this.typeOfSelectedSection === "artist"
        ? this.artistTopTracks.indexOf(
            this.artistTopTracks.find((item) => item.id === this.currentTrackID)
          )
        : this.typeOfSelectedSection === "topTracks"
        ? this.topTracks.indexOf(
            this.topTracks.find((item) => item.id === this.currentTrackID)
          )
        : "";
    },
    currentPlayingTrackIndex() {
      return this.findCurrentPlayingTrackIndex + 1
        ? this.findCurrentPlayingTrackIndex
        : 0;
    },

    isPlayingArtistTopTracks() {
      return (
        this.getCurrentlyPlayingTrack?.item?.artists[0].id ===
          this.clickedArtist &&
        !this.getCurrentlyPlayingTrack?.context &&
        this.isArtistContext &&
        this.getCurrentlyPlayingTrack?.is_playing
      );
    },
    isPlayingContextUri() {
      return this.getCurrentlyPlayingTrack?.is_playing;
    },
    addGreenHeartEl() {
      return this.getUserTopFavTracks.map((item) =>
        document.getElementById(`${item}`)
      );
    },
    curUserFollowedArtists() {
      return this.isMyUserPage
        ? this.$store.getters["artists/getFavArtists"]
        : "";
    },
    publicPlaylists() {
      return this.isMyUserPage
        ? this.$store.getters["playlists/getUserFavPlaylists"].filter(
            (item) => item.public === true
          )
        : this.$store.getters["users/getUserPlaylists"].items;
    },
    publicPlaylistsHref() {
      return this.publicPlaylists.map((item) => item.href);
    },
    totalFollowers() {
      return this.$store.getters["users/getPublicPlaylistFollowers"];
    },
  },
  methods: {
    async fetchUser() {
      await axios
        .get("https://api.spotify.com/v1/users/" + this.$route.params.id, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + (await this.getToken),
          },
        })
        .then(({ data }) => {
          console.log(data);
          this.$store.dispatch("users/user", data);
        })
        .catch((err) => console.log(err));
    },
    async fetchUserPlaylists() {
      await axios
        .get(
          `https://api.spotify.com/v1/users/${this.$route.params.id}/playlists`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + (await this.getToken),
            },
          }
        )
        .then(({ data }) => {
          this.$store.dispatch("users/userPlaylists", data);
        })
        .catch((err) => console.log(err));
    },
    async fetchArtist(href) {
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
          this.$store.dispatch("artists/currentArtist", data);
        })
        .catch((err) => console.log(err));
    },
    async fetchArtistTopTracks(artistID) {
      await axios
        .get(
          "https://api.spotify.com/v1/artists/" +
            artistID +
            "/top-tracks?market=US",
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + this.getToken,
            },
          }
        )
        .then(({ data }) => {
          console.log(data);
          this.$store.dispatch("artists/topTracks", data.tracks);
        })
        .catch((err) => console.log(err));
    },
    async fetchPlaylist(href) {
      await axios
        .get(href, {
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
    async playContextUri(uri, href) {
      if (
        this.isPlayingContextUri &&
        uri.uri === this.getCurrentlyPlayingTrack?.context?.uri
      ) {
        await this.$store.dispatch("controller/pauseCurrentTrack");
      } else {
        if ((await uri.type) === "playlist") {
          this.typeOfSelectedSection = "playlist";
          await this.fetchPlaylist(href);
          uri.id =
            this.currentPlaylist[this.currentPlayingTrackIndex]?.track.id;
        }
        uri.index = this.currentPlayingTrackIndex;
        console.log(uri);
        await this.$store.dispatch("controller/playSelectedContext", uri);
      }
    },
    async playArtistTopTracksFunc(artistID, href) {
      this.clickedArtist = artistID;
      await this.fetchArtist(href);
      await this.fetchArtistTopTracks(artistID);
      await this.playArtistTopTracks(
        {
          uri: this.artistTopTrackUris,
          index: this.currentPlayingTrackIndex,
          type: "artist",
          artistID: artistID,
        },
        href
      );
    },

    async playArtistTopTracks(uri) {
      this.typeOfSelectedSection = "artist";
      console.log(uri);
      console.log(uri.index);
      if (this.isPlayingArtistTopTracks) {
        console.log("Pause ÇAlıştı");
        await this.$store.dispatch("controller/pauseCurrentTrack");
      } else {
        uri.index = await this.currentPlayingTrackIndex;
        await this.$store.dispatch("controller/playArtitsTopTracks", uri);
      }
    },
    async checkUserIsFavUser() {
      await axios
        .get(
          "https://api.spotify.com/v1/me/following/contains?type=user&ids=" +
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
          this.$store.dispatch("users/currentUserIsFav", ...data);
        })
        .catch((err) => console.log(err));
    },
    async followUser() {
      await fetch(
        "https://api.spotify.com/v1/me/following?type=user&ids=" +
          this.$route.params.id,
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
          if (data.status === 204) this.checkUserIsFavUser();
        })
        .catch((err) => console.log(err));
    },
    async unfollowUser() {
      await axios
        .delete(
          "https://api.spotify.com/v1/me/following?type=user&ids=" +
            this.$route.params.id,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + (await this.getToken),
            },
          }
        )
        .then((data) => {
          if (data.status === 204) this.checkUserIsFavUser();
        })
        .catch((err) => console.log(err));
    },

    async addRemoveUser() {
      if (this.currentUserIsFav) {
        await this.unfollowUser();
      } else {
        await this.followUser();
      }
    },

    async fetchTopTracks() {
      await axios
        .get("https://api.spotify.com/v1/me/top/tracks", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + (await this.getToken),
          },
        })
        .then(({ data }) => {
          console.log(data);
          this.$store.dispatch("users/curUserTopTracks", data);
        })
        .catch((err) => console.log(err));
    },

    findFavTracks() {
      this.allFavTracks.forEach((track, i) => {
        this.topTracks.forEach((item, i) => {
          if (track.track.id === item.id) {
            this.$store.dispatch("users/favTracksID", item.id);
          }
        });
      });
    },
    addGreenHeartFavTracks(trackItem = false) {
      if (!trackItem) {
        this.addGreenHeartEl.forEach((item) => {
          item?.children[4].children[0].classList.remove(
            "emptyHeart",
            "animationEmptyHeart"
          );
          item?.children[4].children[0].classList.add("greenHeart");

          item?.children[4].children[0].children[0].children[0].classList.remove(
            "hidden"
          );

          item?.children[4].children[0].children[0].children[1].classList.add(
            "hidden"
          );
        });
      } else {
        trackItem?.children[4].children[0].classList.remove(
          "emptyHeart",
          "animationEmptyHeart"
        );
        trackItem?.children[4].children[0].classList.add("greenHeart");
        trackItem?.children[4].children[0].classList.add("animationGreenHeart");
        trackItem?.children[4].children[0].children[0].children[0].classList.remove(
          "hidden"
        );

        trackItem?.children[4].children[0].children[0].children[1].classList.add(
          "hidden"
        );
      }
    },
    removeGreenHeartFavTracks(item) {
      item?.children[4].children[0].classList.remove(
        "greenHeart",
        "animationGreenHeart"
      );
      item?.children[4].children[0].classList.add("emptyHeart");
      item?.children[4].children[0].classList.add("animationEmptyHeart");

      item?.children[4].children[0].children[0].children[0].classList.add(
        "hidden"
      );
      item?.children[4].children[0].children[0].children[1].classList.remove(
        "hidden"
      );
    },
    trackDuration(duration) {
      const minutes = Math.floor(duration / 60000);
      const seconds = Math.floor((duration % 60000) / 1000);
      const result = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
      return result;
    },

    async getTotalFollowers(href) {
      return await href.forEach((item, i) => {
        axios
          .get(`${item}`, {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + this.getToken,
            },
          })
          .then(({ data }) => {
            this.publicPlaylistsData[data.id] = data.followers.total;
            this.$store.dispatch(
              "users/publicPlaylistFollowers",
              this.publicPlaylistsData
            );
          })
          .catch((err) => console.log(err));
      });
    },
  },

  async created() {
    console.log("user Mounted");
    this.userPage = true;
    await this.fetchUser();
    if (this.isMyUserPage) {
      await this.fetchTopTracks();
      this.findFavTracks();
      this.addGreenHeartFavTracks();
    } else {
      await this.fetchUserPlaylists();
    }
    await this.checkUserIsFavUser();

    this.getTotalFollowers(this.publicPlaylistsHref);

    this.header = document.getElementById("header");
    this.userEl = document.getElementById("user");

    this.options = {
      root: null,
      threshold: [0.1, 0.4],
    };
    this.headerHeight = document
      .getElementById("header")
      .getBoundingClientRect().height;

    this.observer = new IntersectionObserver((entries) => {
      this.header.classList.toggle(
        "profile-intersec-bg1",
        entries[0].intersectionRatio <= 0.4
      );
      this.header.classList.toggle(
        "profile-intersec-bg2",
        entries[0].intersectionRatio <= 0.1
      );

      entries[0].intersectionRatio >= 0.1
        ? this.$store.dispatch("controller/closeHeaderBtn")
        : this.$store.dispatch("controller/showHeaderBtn");
    }, this.options);
    console.log(this.observer);

    this.userEl ? this.observer.observe(this.userEl) : "";
  },
  beforeUnmount() {
    this.userOptions = false;
    this.userPage = false;
    if (!this.userEl) return;
    this.observer.unobserve(this.userEl);
    this.header.classList.remove("profile-intersec-bg1");
    this.header.classList.remove("profile-intersec-bg2");
    this.$store.dispatch("users/clearTracksID");
  },
  unmounted() {
    this.$store.dispatch("controller/closeHeaderBtn");
    this.$store.dispatch("users/clearTracksID");
    this.$store.dispatch("users/clearPublicPlaylistFollowers");
  },
};
</script>

<style scoped lang="scss">
#user {
  &::before {
    content: "";
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
    background-size: cover;
    background-position: top;
    background-image: var(--bgUserImage);
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
