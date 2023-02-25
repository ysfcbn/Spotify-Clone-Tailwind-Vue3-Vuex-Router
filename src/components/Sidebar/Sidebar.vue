<template>
  <div
    :class="{ 'relative min-w-[15.5rem]': isAuth, 'min-w-[14rem]': !isAuth }"
    class="sidebar bg-black text-[0.8125rem] mb:text-xs sm3:text-[13px]"
  >
    <div class="p-5">
      <svg viewBox="0 0 2100 440">
        <path
          fill="#f1f1f1"
          d="M8 171c0 92 76 168 168 168s168-76 168-168S268 4 176 4 8 79 8 171zm230 78c-39-24-89-30-147-17-14 2-16-18-4-20 64-15 118-8 162 19 11 7 0 24-11 18zm17-45c-45-28-114-36-167-20-17 5-23-21-7-25 61-18 136-9 188 23 14 9 0 31-14 22zM80 133c-17 6-28-23-9-30 59-18 159-15 221 22 17 9 1 37-17 27-54-32-144-35-195-19zm379 91c-17 0-33-6-47-20-1 0-1 1-1 1l-16 19c-1 1-1 2 0 3 18 16 40 24 64 24 34 0 55-19 55-47 0-24-15-37-50-46-29-7-34-12-34-22s10-16 23-16 25 5 39 15c0 0 1 1 2 1s1-1 1-1l14-20c1-1 1-1 0-2-16-13-35-20-56-20-31 0-53 19-53 46 0 29 20 38 52 46 28 6 32 12 32 22 0 11-10 17-25 17zm95-77v-13c0-1-1-2-2-2h-26c-1 0-2 1-2 2v147c0 1 1 2 2 2h26c1 0 2-1 2-2v-46c10 11 21 16 36 16 27 0 54-21 54-61s-27-60-54-60c-15 0-26 5-36 17zm30 78c-18 0-31-15-31-35s13-34 31-34 30 14 30 34-12 35-30 35zm68-34c0 34 27 60 62 60s62-27 62-61-26-60-61-60-63 27-63 61zm30-1c0-20 13-34 32-34s33 15 33 35-13 34-32 34-33-15-33-35zm140-58v-29c0-1 0-2-1-2h-26c-1 0-2 1-2 2v29h-13c-1 0-2 1-2 2v22c0 1 1 2 2 2h13v58c0 23 11 35 34 35 9 0 18-2 25-6 1 0 1-1 1-2v-21c0-1 0-2-1-2h-2c-5 3-11 4-16 4-8 0-12-4-12-12v-54h30c1 0 2-1 2-2v-22c0-1-1-2-2-2h-30zm129-3c0-11 4-15 13-15 5 0 10 0 15 2h1s1-1 1-2V93c0-1 0-2-1-2-5-2-12-3-22-3-24 0-36 14-36 39v5h-13c-1 0-2 1-2 2v22c0 1 1 2 2 2h13v89c0 1 1 2 2 2h26c1 0 1-1 1-2v-89h25l37 89c-4 9-8 11-14 11-5 0-10-1-15-4h-1l-1 1-9 19c0 1 0 3 1 3 9 5 17 7 27 7 19 0 30-9 39-33l45-116v-2c0-1-1-1-2-1h-27c-1 0-1 1-1 2l-28 78-30-78c0-1-1-2-2-2h-44v-3zm-83 3c-1 0-2 1-2 2v113c0 1 1 2 2 2h26c1 0 1-1 1-2V134c0-1 0-2-1-2h-26zm-6-33c0 10 9 19 19 19s18-9 18-19-8-18-18-18-19 8-19 18zm245 69c10 0 19-8 19-18s-9-18-19-18-18 8-18 18 8 18 18 18zm0-34c9 0 17 7 17 16s-8 16-17 16-16-7-16-16 7-16 16-16zm4 18c3-1 5-3 5-6 0-4-4-6-8-6h-8v19h4v-6h4l4 6h5zm-3-9c2 0 4 1 4 3s-2 3-4 3h-4v-6h4z"
        ></path>
      </svg>
    </div>
    <div class="">
      <!-- Ana sayfa -->
      <router-link
        to="/"
        :class="{ active: homeNav }"
        class="group hover:opacity-100 text-opacwhite3 opacity-70 transition duration-300 pl-4 mb-4 cursor-pointer flex items-center font-semibold flex-row mx-2"
      >
        <span class="flex align-center justify-center rounded-xs">
          <svg role="img" height="22" width="22" viewBox="0 0 24 24">
            <path
              v-if="homeNav"
              fill="currentColor"
              d="M13.5 1.515a3 3 0 00-3 0L3 5.845a2 2 0 00-1 1.732V21a1 1 0 001 1h6a1 1 0 001-1v-6h4v6a1 1 0 001 1h6a1 1 0 001-1V7.577a2 2 0 00-1-1.732l-7.5-4.33z"
            ></path>
            <path
              v-else
              fill="currentColor"
              d="M12.5 3.247a1 1 0 00-1 0L4 7.577V20h4.5v-6a1 1 0 011-1h5a1 1 0 011 1v6H20V7.577l-7.5-4.33zm-2-1.732a3 3 0 013 0l7.5 4.33a2 2 0 011 1.732V21a1 1 0 01-1 1h-6.5a1 1 0 01-1-1v-6h-3v6a1 1 0 01-1 1H3a1 1 0 01-1-1V7.577a2 2 0 011-1.732l7.5-4.33z"
            ></path>
          </svg> </span
        ><span class="ml-4">Home</span>
      </router-link>

      <!-- Ara -->
      <router-link
        to="/search"
        :class="{ active: searchNav }"
        class="hover:opacity-100 text-opacwhite3 opacity-70 transition duration-300group pl-4 mb-4 cursor-pointer flex items-center font-semibold flex-row mx-2"
      >
        <span class="flex align-center justify-center rounded-xs">
          <svg role="img" height="22" width="22" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M1.126 10.558c0-5.14 4.226-9.28 9.407-9.28 5.18 0 9.407 4.14 9.407 9.28a9.157 9.157 0 01-2.077 5.816l4.344 4.344a1 1 0 01-1.414 1.414l-4.353-4.353a9.454 9.454 0 01-5.907 2.058c-5.18 0-9.407-4.14-9.407-9.28zm9.407-7.28c-4.105 0-7.407 3.274-7.407 7.28s3.302 7.279 7.407 7.279 7.407-3.273 7.407-7.28c0-4.005-3.302-7.278-7.407-7.278z"
            ></path>

            <path
              v-if="searchNav"
              fill="currentColor"
              d="M15.356 10.558c0 2.623-2.16 4.75-4.823 4.75-2.664 0-4.824-2.127-4.824-4.75s2.16-4.75 4.824-4.75c2.664 0 4.823 2.127 4.823 4.75z"
            ></path>
          </svg> </span
        ><span class="ml-4">Search</span>
      </router-link>

      <!-- Kitaplığın -->
      <router-link
        @click="toggleCollectionPopup"
        :to="openCollection"
        :class="{ 'opacity-70': !activeNav }"
        class="hover:opacity-100 text-opacwhite3 transition duration-300 group pl-4 cursor-pointer flex items-center font-semibold flex-row mx-2"
        exact
      >
        <span class="flex align-center justify-center rounded-xs">
          <svg role="img" height="22" width="22" viewBox="0 0 24 24">
            <path
              v-if="activeNav"
              fill="#ffffff"
              d="M3 22a1 1 0 01-1-1V3a1 1 0 012 0v18a1 1 0 01-1 1zM15.5 2.134A1 1 0 0014 3v18a1 1 0 001 1h6a1 1 0 001-1V6.464a1 1 0 00-.5-.866l-6-3.464zM9 2a1 1 0 00-1 1v18a1 1 0 102 0V3a1 1 0 00-1-1z"
            ></path>
            <path
              v-else
              fill="currentColor"
              d="M14.5 2.134a1 1 0 011 0l6 3.464a1 1 0 01.5.866V21a1 1 0 01-1 1h-6a1 1 0 01-1-1V3a1 1 0 01.5-.866zM16 4.732V20h4V7.041l-4-2.309zM3 22a1 1 0 01-1-1V3a1 1 0 012 0v18a1 1 0 01-1 1zm6 0a1 1 0 01-1-1V3a1 1 0 012 0v18a1 1 0 01-1 1z"
            ></path>
          </svg>
        </span>
        <span class="ml-4">Your Library</span>
      </router-link>

      <transition-group name="fade-Popup">
        <AppSignUpPopUp
          @emit-visible="visibleFunc"
          v-if="collectionPopup && visible && !isAuth"
          class="left-[9.7rem] top-[9.5rem]"
        >
          <template #title>Enjoy Your Library</template>
          <template #description
            >Log in to see saved songs, podcasts, artists, and playlists in Your
            Library.</template
          >
        </AppSignUpPopUp>
      </transition-group>
    </div>

    <!-- Çalma Listesi Oluştur -->
    <button
      @click="toggleCreatePlaylistPopup"
      class="group pl-4 mt-10 cursor-pointer flex items-center font-semibold flex-row mx-2 text-white opacity-70 hover:opacity-100 transition duration-300"
    >
      <span
        class="bg-lightest group-hover:bg-white flex align-center justify-center rounded-xs px-1.5 py-1.5"
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          height="10"
          width="10"
          aria-hidden="true"
          viewBox="0 0 16 16"
        >
          <path d="M14 7H9V2H7v5H2v2h5v5h2V9h5z"></path>
          <path fill="none" d="M0 0h16v16H0z"></path></svg></span
      ><span class="ml-4">Create Playlist</span>
    </button>
    <transition-group name="fade-Popup">
      <AppSignUpPopUp
        @emit-visible="visibleFunc"
        v-if="createPlaylistPopup && visible && !isAuth"
        class="left-[11.5rem] top-[13.2rem]"
      >
        <template #title>Create a playlist</template>
        <template #description>Log in to create and share playlists.</template>
      </AppSignUpPopUp>
    </transition-group>

    <!-- Beğenilen Şarkılar -->
    <router-link
      @click="toggleFavoriteSongsPopup"
      :to="openFavSongs"
      class="hover:opacity-100 text-opacwhite3 opacity-70 transition duration-300 pt-3 px-4 w-full flex items-center font-semibold mx-2 relative items-center h-fit"
      exact
    >
      <span
        class="w-[1.4rem] h-[1.4rem] flex items-center justify-center bg-gradient-to-br from-purple-900 to-blue-300"
        ><svg height="12" width="12" aria-hidden="true" viewBox="0 0 16 16">
          <path fill="none" d="M0 0h16v16H0z"></path>
          <path
            fill="currentColor"
            d="M13.797 2.727a4.057 4.057 0 0 0-5.488-.253.558.558 0 0 1-.31.112.531.531
                  0 0 1-.311-.112 4.054 4.054 0 0 0-5.487.253c-.77.77-1.194 1.794-1.194 2.883s.424
                  2.113 1.168 2.855l4.462 5.223a1.791 1.791 0 0 0 2.726 0l4.435-5.195a4.052 4.052
                  0 0 0 1.195-2.883 4.057 4.057 0 0 0-1.196-2.883z"
          ></path></svg></span
      ><span class="ml-4 flex-start">Liked Songs</span>
      <button
        id="pause"
        v-if="isPlayingCollection"
        @click="pauseTrack(_, $event)"
        class="absolute right-[2rem] bottom-0 cursor-default group flex items-center justify-center w-10 h-4 z-50"
      >
        <svg
          role="img"
          height="16"
          width="16"
          viewBox="0 0 16 16"
          class="group-hover:hidden"
        >
          <path
            fill="#1FDF64"
            d="M9.741.85a.75.75 0 01.375.65v13a.75.75 0 01-1.125.65l-6.925-4a3.642 3.642 0 01-1.33-4.967 3.639 3.639 0 011.33-1.332l6.925-4a.75.75 0 01.75 0zm-6.924 5.3a2.139 2.139 0 000 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 010 4.88z"
          ></path>
          <path
            fill="#1FDF64"
            d="M11.5 13.614a5.752 5.752 0 000-11.228v1.55a4.252 4.252 0 010 8.127v1.55z"
          ></path>
        </svg>
        <svg
          role="img"
          height="20"
          width="20"
          class="hidden group-hover:block"
          viewBox="0 0 24 24"
        >
          <path
            fill="#FFFFFF"
            d="M5.7 3a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7H5.7zm10 0a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7h-2.6z"
          ></path>
        </svg>
      </button>
    </router-link>

    <transition-group name="fade-Popup">
      <AppSignUpPopUp
        @emit-visible="visibleFunc"
        v-if="favoriteSongsPopup && visible && !isAuth"
        class="left-[15rem] top-[15.5rem]"
      >
        <template #title>Enjoy your Liked Songs</template>
        <template #description
          >Log in to see all the songs you’ve liked in one easy
          playlist.</template
        >
      </AppSignUpPopUp>
    </transition-group>

    <!-- Episodes -->
    <router-link
      v-if="isAuth"
      :to="{ name: 'episodes' }"
      class="hover:opacity-100 text-opacwhite3 opacity-70 transition duration-300 relative w-full mt-3 px-4 flex items-center justify-start font-semibold mx-2"
    >
      <span
        class="w-[1.4rem] h-[1.4rem] flex items-center justify-center bg-green4"
      >
        <svg
          role="img"
          height="14"
          width="14"
          aria-hidden="true"
          viewBox="0 0 16 16"
        >
          <path
            fill="#1ed760"
            d="M3.75 0A1.75 1.75 0 002 1.75v12.952c0 1.051 1.22 1.633 2.037.972l3.962-3.208 3.943 3.204c.817.663 2.038.082 2.038-.97V1.75A1.75 1.75 0 0012.23 0H3.75z"
          ></path></svg></span
      ><span class="ml-4 h-full">Your Episodes</span>
      <button
        v-if="isPlayingEpisodes"
        class="absolute right-[2rem] bottom-1 cursor-default group flex items-center justify-center w-10"
      >
        <svg
          role="img"
          height="16"
          width="16"
          viewBox="0 0 16 16"
          class="group-hover:hidden"
        >
          <path
            fill="#1FDF64"
            d="M9.741.85a.75.75 0 01.375.65v13a.75.75 0 01-1.125.65l-6.925-4a3.642 3.642 0 01-1.33-4.967 3.639 3.639 0 011.33-1.332l6.925-4a.75.75 0 01.75 0zm-6.924 5.3a2.139 2.139 0 000 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 010 4.88z"
          ></path>
          <path
            fill="#1FDF64"
            d="M11.5 13.614a5.752 5.752 0 000-11.228v1.55a4.252 4.252 0 010 8.127v1.55z"
          ></path>
        </svg>
        <svg
          role="img"
          height="20"
          width="20"
          class="hidden group-hover:block"
          viewBox="0 0 24 24"
        >
          <path
            fill="#FFFFFF"
            d="M5.7 3a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7H5.7zm10 0a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7h-2.6z"
          ></path>
        </svg>
      </button>
    </router-link>

    <!-- line -->
    <div v-if="isAuth" class="h-px mx-6 mt-4 bg-light"></div>

    <!-- My Playlists -->
    <div
      v-if="isAuth"
      class="container-list w-full min-h-0 overflow-y-scroll overflow-x-hidden flex"
      :style="{
        height: setHeight,
      }"
    >
      <div class="mx-6 flex flex-col h-fit pb-2">
        <router-link
          v-for="playlist in getUserFavPlaylists"
          :id="playlist.id"
          :key="playlist.id"
          :to="{ name: 'playlist', params: { id: `${playlist.id}` } }"
          class="text-white w-[12rem] h-fit opacity-70 mb:text-[13px] hover:text-white hover:opacity-100 cursor-default leading-7 truncate"
        >
          {{ playlist.name }}
        </router-link>
      </div>
    </div>
    <div
      v-if="isAuth"
      id="download--app"
      :class="`absolute  bottom-0 bg-black w-full h-[2.5rem] ${
        !trackImgDisplay ? 'h-[17.8rem] ease-in duration-200' : ''
      }`"
    >
      <button
        class="group pl-[12px] cursor-pointer flex items-center font-semibold mx-2 relative text-lightest hover:text-white h-[1rem]"
      >
        <span
          class="group-hover:text-white flex items-center justify-center rounded-xs py-1.5 shrink-0"
        >
          <svg
            role="img"
            height="24"
            width="24"
            viewBox="0 0 24 24"
            class="h-5"
          >
            <path
              fill="currentColor"
              d="M12 3a9 9 0 100 18 9 9 0 000-18zM1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12z"
            ></path>
            <path
              fill="currentColor"
              d="M12 6.05a1 1 0 011 1v7.486l1.793-1.793a1 1 0 111.414 1.414L12 18.364l-4.207-4.207a1 1 0 111.414-1.414L11 14.536V7.05a1 1 0 011-1z"
            ></path>
          </svg> </span
        ><span class="ml-5">Install App</span>
      </button>
      <div
        :class="`w-full relative ease-in duration-200 mt-2 ${
          trackImgDisplay
            ? 'bottom-[-6px] ease-in duration-200'
            : 'bottom-[-1px] ease-in duration-200'
        } `"
      >
        <div class="w-full h-full group">
          <img
            class="w-full h-full object-cover"
            :src="currentTrackAlbumImage"
            alt="album ımg"
          />
          <span
            @click="toggleImg"
            class="hidden bg-black p-1 text-white absolute top-1 right-2 rounded-full hover:scale-105 opacity-50 hover:opacity-100 group-hover:block"
          >
            <svg role="img" height="16" width="16" viewBox="0 0 16 16">
              <path
                fill="currentColor"
                d="M.47 4.97a.75.75 0 011.06 0L8 11.44l6.47-6.47a.75.75 0 111.06 1.06L8 13.56.47 6.03a.75.75 0 010-1.06z"
              ></path>
            </svg>
          </span>
        </div>
        <div></div>
      </div>
    </div>
    <div v-else class="cokiees w-full relative">
      <div class="absolute bottom-[15rem] left-6 flex flex-col gap-y-4 text-xs">
        <a
          draggable="false"
          href="https://www.spotify.com/legal/cookies-policy/"
          target="_blank"
          rel="noopener"
          ><span class="text-opacwhite6 hover:underline">Cookies</span></a
        ><a
          draggable="false"
          href="https://www.spotify.com/legal/privacy-policy/"
          target="_blank"
          rel="noopener"
          ><span class="text-opacwhite6 hover:underline">Security</span></a
        >
      </div>
    </div>
  </div>
</template>

<script>
import AppSignUpPopUp from "../Cards/AppSignUpPopUp.vue";

export default {
  name: "Sidebar",
  components: { AppSignUpPopUp },
  props: ["toggleImg", "trackImgDisplay"],
  data() {
    return {
      containerListHeight: 335,
      dowloadAppHeight: "",
      collectionPopup: false,
      createPlaylistPopup: false,
      favoriteSongsPopup: false,
      visible: true,
    };
  },
  methods: {
    async fetchPlaylists() {
      await fetch(
        "https://api.spotify.com/v1/me/playlists" + "?limit=50&offset=0",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + (await this.getToken),
          },
        }
      )
        .then((data) => data.json())
        .then((data) => {
          this.$store.dispatch("playlists/userPlaylists", data.items);
        })
        .catch((err) => console.log(err));
    },

    selectedPlaylist(_, event) {
      const currentID = event.target.id;
      this.$router.push({ name: "playlist", params: { id: currentID } });
    },

    toggleCollectionPopup() {
      this.visible = true;
      !this.collectionPopup || this.collectionPopup
        ? (this.collectionPopup = true)
        : "";
      this.createPlaylistPopup ? (this.createPlaylistPopup = false) : "";
      this.favoriteSongsPopup ? (this.favoriteSongsPopup = false) : "";
    },
    toggleCreatePlaylistPopup() {
      this.visible = true;
      !this.createPlaylistPopup
        ? (this.createPlaylistPopup = true)
        : (this.createPlaylistPopup = true);
      this.collectionPopup ? (this.collectionPopup = false) : "";
      this.favoriteSongsPopup ? (this.favoriteSongsPopup = false) : "";
    },
    toggleFavoriteSongsPopup() {
      this.visible = true;
      !this.favoriteSongsPopup ? (this.favoriteSongsPopup = true) : "";
      this.createPlaylistPopup ? (this.createPlaylistPopup = false) : "";
      this.collectionPopup ? (this.collectionPopup = false) : "";
    },
    visibleFunc(val) {
      this.visible = val;
    },
    pauseTrack(_, e) {
      if (e.target.closest("#pause").id === "pause") {
        this.$store.dispatch("controller/pauseCurrentTrack");
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
    currentTrackAlbumImage() {
      return this.$store.getters["controller/getCurrentTrackAlbumImage"];
    },
    getUserFavPlaylists() {
      return this.$store.getters["playlists/getUserFavPlaylists"];
    },
    openCollection() {
      return !this.isAuth ? "/nowhere" : "/collection/playlists";
    },
    openFavSongs() {
      return !this.isAuth ? "/nowhere" : "/collection/tracks";
    },

    setHeight() {
      return `calc(100% - ${
        this.containerListHeight + this.dowloadAppHeight
      }px)`;
    },
    activeNav() {
      return this.$route.path === "/collection/playlists"
        ? true
        : this.$route.path === "/collection/podcasts"
        ? true
        : this.$route.path === "/collection/artists"
        ? true
        : this.$route.path === "/collection/albums"
        ? true
        : false;
    },
    searchNav() {
      return this.$route.path === "/search";
    },
    homeNav() {
      return this.$route.path === "/";
    },
    getCurrentTrack() {
      return this.$store.getters["controller/getCurrentlyPlayingTrack"];
    },

    isPlayingCollection() {
      return (
        this.getCurrentTrack?.context?.type === "collection" &&
        this.getCurrentTrack?.is_playing
      );
    },
    isPlayingEpisodes() {
      return this.getCurrentTrack?.currently_playing_type === "episode";
    },
  },
  watch: {
    trackImgDisplay(newVal, oldVal) {
      newVal ? (this.dowloadAppHeight = 48) : (this.dowloadAppHeight = 280);
    },
  },

  async mounted() {
    if (!this.isAuth) return;
    console.log("sidebar Mounted!");
    this.dowloadAppHeight =
      document.querySelector("#download--app").clientHeight;

    //fetch favorite playlists
    await this.fetchPlaylists();
  },
};
</script>

<style>
.sidebar {
  height: calc(100vh - 80px);
}
.cokiees {
  height: calc(100% - 92px);
}

a.active {
  opacity: 100%;
  color: white;
}

.fade-Popup-enter-active,
.fade-Popup-leave-active {
  transition: 0.2s ease-in;
  transform: translateX(15px);
}

.fade-Popup-enter-to,
.fade-Popup-leave-from {
  transform: translateX(0px);

  opacity: 1;
}
.fade-Popup-enter-from {
  transform: translateX(2px);
  opacity: 0;
}
.fade-Popup-leave-to {
  opacity: 0;
  transform: translateX(-2px);
}
</style>
