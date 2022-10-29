<template>
  <header
    id="header"
    :class="{
      'home-not-auth--intersec-bg1': !isAuth,
    }"
    class="h-[64px] z-[60] w-full top-0 shrink sticky"
  >
    <div
      class="z-70 relative flex items-center justify-between mb:text-xs md:text-sm bg-transparent lg:pl-[1rem]"
    >
      <div
        :class="{ truncate: isAuth && !isNavVisible }"
        class="flex mt-[8px] text-lightest"
      >
        <div
          @click="goBack"
          :class="{
            'cursor-not-allowed': this.historyCounter === 1,
          }"
          class="mt-[1px] flex justify-between items-center"
        >
          <button
            class="w-fit h-fit rounded-full bg-opacblack p-[4px] ml-4 cursor-default"
          >
            <svg
              role="img"
              height="24"
              width="24"
              viewBox="0 0 24 24"
              :class="{
                'cursor-not-allowed': this.historyCounter === 1,
              }"
            >
              <path
                fill="currentColor"
                d="M15.957 2.793a1 1 0 010 1.414L8.164 12l7.793 7.793a1 1 0 11-1.414 1.414L5.336 12l9.207-9.207a1 1 0 011.414 0z"
              ></path>
            </svg>
          </button>
          <button
            @click="goForward"
            :class="{
              'cursor-not-allowed': this.historyCounter === 1,
              'bg-opacblack': this.historyCounter !== 1,
            }"
            class="w-fit h-fit ml-4 p-[4px] rounded-full hidden lg:block"
          >
            <svg
              role="img"
              height="24"
              width="24"
              viewBox="0 0 24 24"
              :class="{ 'cursor-not-allowed': this.historyCounter === 1 }"
              class="text-opacwhite"
            >
              <path
                fill="currentColor"
                d="M8.043 2.793a1 1 0 000 1.414L15.836 12l-7.793 7.793a1 1 0 101.414 1.414L18.664 12 9.457 2.793a1 1 0 00-1.414 0z"
              ></path>
            </svg>
          </button>
        </div>

        <div
          v-if="currentPlaylist && !isNavVisible"
          :class="{
            'transition-all duration-700 activeBtn': getHeaderBtn,
          }"
          class="flex items-center relative ml-4 opacity-0 truncate"
        >
          <button
            v-if="!isEpisodePage && !isShowPage && !isUsersPage && !isGenrePage"
            class="rounded-full bg-green3 p-[0.7rem] relative text-black cursor-default lg:group-hover:block hover:scale-110 mr-4"
          >
            <span
              ><svg
                role="img"
                height="22"
                width="22"
                viewBox="0 0 24 24"
                class=""
              >
                <path
                  fill="currentColor"
                  d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"
                ></path></svg
              ><svg
                role="img"
                height="22"
                width="22"
                viewBox="0 0 24 24"
                class="hidden"
              >
                <path
                  d="M5.7 3a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7H5.7zm10 0a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7h-2.6z"
                ></path></svg
            ></span>
          </button>
          <span
            v-if="isFavoriteSongs"
            class="text-2xl font-semibold text-white"
            style="font-weight: 700"
            >Beğenilen Şarkılar</span
          >
          <span
            v-if="isArtistPage"
            class="text-2xl font-semibold text-white"
            style="font-weight: 700"
            >{{ selectArtCardName }}</span
          >
          <span
            v-if="isDiskografiPage"
            class="text-2xl font-semibold text-white"
            style="font-weight: 700"
            >{{ currentDiskoSection }}</span
          >
          <span
            v-if="isAlbumPage"
            class="text-2xl font-semibold text-white truncate"
            style="font-weight: 700"
            >{{ albumName }}</span
          >
          <span
            v-if="isSinglePage"
            class="text-2xl font-semibold text-white"
            style="font-weight: 700"
            >Single Adı</span
          >
          <div
            v-if="isPlaylistPage"
            class="w-full text-2xl font-semibold text-white truncate"
            style="font-weight: 700"
          >
            {{ playlistName }}
          </div>
          <span
            v-if="isTrackPage"
            class="text-2xl font-semibold text-white"
            style="font-weight: 700"
            >{{ trackName }}</span
          >
          <span
            v-if="isEpisodesPage"
            class="text-2xl font-semibold text-white"
            style="font-weight: 700"
            >Bölümlerin</span
          >
          <span
            v-if="isUsersPage"
            class="text-2xl font-semibold text-white"
            style="font-weight: 700"
            >{{ currentUserName }}</span
          >
          <span
            v-if="isEpisodePage"
            class="text-2xl font-semibold text-white"
            style="font-weight: 700"
            >{{ episodeName }}</span
          ><span
            v-if="isShowPage"
            class="text-2xl font-semibold text-white"
            style="font-weight: 700"
            >{{ showName }}</span
          >
          <span
            v-if="isGenrePage"
            class="text-2xl font-semibold text-white"
            style="font-weight: 700"
            >{{ genreName }}</span
          >
        </div>

        <div
          v-if="visToggleHeaderProfile"
          :class="{ active: toggleHeaderProfile }"
          class="profile-header flex w-full items-center relative opacity-0 transition-opacity duration-500"
        >
          <span
            class="ml-4 text-2xl tracking-tighter text-white"
            style="font-weight: 600"
            >{{ userName }}</span
          >
        </div>

        <div
          v-if="isNavVisible"
          class="flex w-full items-center text-lightest ml-8 font-semibold"
        >
          <router-link
            to="/collection/playlists"
            id="playlists"
            class="py-[11px] px-[16px] text-white rounded-sm cursor-pointer mr-2 shrink-0"
            >Çalma Listeleri</router-link
          >
          <router-link
            to="/collection/podcasts"
            id="podcsast"
            class="py-[11px] px-[16px] text-white rounded-sm cursor-pointer mr-2 hidden md2:block"
            >Podcast'ler</router-link
          >
          <router-link
            to="/collection/artists"
            id="artists"
            class="py-[11px] px-[16px] text-white rounded-sm cursor-pointer mr-2 hidden lg2:block"
          >
            Sanatçılar
          </router-link>
          <router-link
            to="/collection/albums"
            id="albums"
            class="py-[11px] px-[16px] text-white rounded-sm cursor-pointer hidden lg2:block"
            >Albümler</router-link
          >
          <button
            @click="toggleDropPlaylists"
            id="droplist"
            class="flex items-center h-[2.2rem] bg-light py-[8px] px-[12px] text-white rounded-md cursor-pointer mr-3 shrink-0 w-fit font-semibold lg2:hidden sm:flex relative"
          >
            <div
              v-if="dropPlaylists"
              class="justify-start absolute z-50 bg-dark2 top-[2.7rem] left-0 p-[4px] h-fit w-[9.3rem] text-opacwhite3 font-medium whitespace-nowrap rounded-md cursor-default shadow-lg shadow-[0px_15px_15px_1px_rgba(0,0,0,0.4)]"
            >
              <router-link
                to="/collection/podcasts"
                :class="{ active2: activePodcasts }"
                class="flex justify-start w-full p-[12px] hover:bg-dark3 md2:hidden"
              >
                Podcast'ler
              </router-link>
              <router-link
                to="/collection/artists"
                :class="{ active2: activeArtists }"
                class="flex justify-start w-full p-[12px] hover:bg-dark3`"
              >
                Sanatçılar
              </router-link>
              <router-link
                to="/collection/albums"
                :class="{ active2: activeAlbums }"
                class="flex justify-start w-full p-[12px] hover:bg-dark3`"
              >
                Albümler
              </router-link>
            </div>
            <span class="mr-2">{{ currentSec }}</span>
            <svg
              fill="currentColor"
              role="img"
              height="16"
              width="16"
              viewBox="0 0 16 16"
            >
              <path v-if="dropPlaylists" d="M14 6l-6 6-6-6h12z"></path>
              <path v-else d="M14 10L8 4l-6 6h12z"></path>
            </svg>
            <svg
              class="hidden"
              fill="currentColor"
              role="img"
              height="16"
              width="16"
              viewBox="0 0 16 16"
            >
              <path d="M14 10L8 4l-6 6h12z"></path>
            </svg>
          </button>
        </div>

        <div
          v-if="isSearchVisible"
          class="flex items-center justify-start w-full pl-4"
        >
          <div class="w-full relative">
            <form>
              <input
                placeholder="Sanatçılar, şarkılar ve podcastler"
                type="text"
                class="w-[22.8rem] rounded-full p-[10px] px-12 text-black focus:outline-none"
              />
            </form>
            <span class="absolute text-black top-2 left-3">
              <svg
                role="img"
                height="24"
                width="24"
                aria-hidden="true"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M10.533 1.279c-5.18 0-9.407 4.14-9.407 9.279s4.226 9.279 9.407 9.279c2.234 0 4.29-.77 5.907-2.058l4.353 4.353a1 1 0 101.414-1.414l-4.344-4.344a9.157 9.157 0 002.077-5.816c0-5.14-4.226-9.28-9.407-9.28zm-7.407 9.279c0-4.006 3.302-7.28 7.407-7.28s7.407 3.274 7.407 7.28-3.302 7.279-7.407 7.279-7.407-3.273-7.407-7.28z"
                ></path>
              </svg>
            </span>
          </div>
        </div>
      </div>

      <div
        v-if="isAuth"
        @click="toggleAccount"
        id="account--Icon"
        class="w-fit flex items-center text-white font-semibold shrink-0 mb-2 sm:mx-[1rem] lg:mx-[2rem] mt-3 p-[2px] bg-black rounded-full cursor-pointer hover:bg-opacblack4 relative"
      >
        <ul
          v-if="accountOptions"
          class="absolute bg-dark2 top-[2.7rem] right-0 p-[4px] h-fit w-[11rem] text-opacwhite3 whitespace-normal rounded cursor-default shadow-[0px_15px_15px_1px_rgba(0,0,0,0.4)]"
        >
          <li
            class="flex items-center justify-between w-full p-[10px] hover:bg-dark3"
          >
            <button class="cursor-default">
              <a href="#" class="cursor-default">Hesap</a>
            </button>
            <span>
              <svg
                role="img"
                height="16"
                width="16"
                viewBox="0 0 16 16"
                class="Svg-sc-1bi12j5-0 jgfuCe"
              >
                <path
                  fill="currentColor"
                  d="M1 2.75A.75.75 0 011.75 2H7v1.5H2.5v11h10.219V9h1.5v6.25a.75.75 0 01-.75.75H1.75a.75.75 0 01-.75-.75V2.75z"
                ></path>
                <path
                  fill="currentColor"
                  d="M15 1v4.993a.75.75 0 11-1.5 0V3.56L8.78 8.28a.75.75 0 01-1.06-1.06l4.72-4.72h-2.433a.75.75 0 010-1.5H15z"
                ></path></svg
            ></span>
          </li>
          <li
            @click="toggleProfile(currentUserID)"
            class="w-full p-[10px] hover:bg-dark3"
          >
            <button>
              <span class="cursor-default">Profil</span>
            </button>
          </li>
          <li class="w-full p-[10px] hover:bg-dark3">
            <button @click="logout" class="cursor-default">
              <span>Oturumu kapat</span>
            </button>
          </li>
        </ul>
        <div
          class="w-[2rem] h-[2rem] text-white flex items-center bg-[#535353] rounded-full justify-center"
        >
          <div v-if="userAvatar">
            <img class="rounded-full" :src="userAvatar" alt="user" />
          </div>

          <svg v-else height="16" width="16" viewBox="0 0 16 16">
            <path
              fill="currentColor"
              d="M6.233.371a4.388 4.388 0 015.002 1.052c.421.459.713.992.904 1.554.143.421.263 1.173.22 1.894-.078 1.322-.638 2.408-1.399 3.316l-.127.152a.75.75 0 00.201 1.13l2.209 1.275a4.75 4.75 0 012.375 4.114V16H.382v-1.143a4.75 4.75 0 012.375-4.113l2.209-1.275a.75.75 0 00.201-1.13l-.126-.152c-.761-.908-1.322-1.994-1.4-3.316-.043-.721.077-1.473.22-1.894a4.346 4.346 0 01.904-1.554c.411-.448.91-.807 1.468-1.052zM8 1.5a2.888 2.888 0 00-2.13.937 2.85 2.85 0 00-.588 1.022c-.077.226-.175.783-.143 1.323.054.921.44 1.712 1.051 2.442l.002.001.127.153a2.25 2.25 0 01-.603 3.39l-2.209 1.275A3.25 3.25 0 001.902 14.5h12.196a3.25 3.25 0 00-1.605-2.457l-2.209-1.275a2.25 2.25 0 01-.603-3.39l.127-.153.002-.001c.612-.73.997-1.52 1.052-2.442.032-.54-.067-1.097-.144-1.323a2.85 2.85 0 00-.588-1.022A2.888 2.888 0 008 1.5z"
            ></path>
          </svg>
        </div>
        <span class="px-2 hidden lg:block">{{ userName }}</span>
        <span class="pr-1 hidden lg:block">
          <svg role="img" height="16" width="16" viewBox="0 0 16 16">
            <path
              v-if="accountOptions"
              fill="currentColor"
              d="M14 10L8 4l-6 6h12z"
            ></path>
            <path v-else fill="currentColor" d="M14 6l-6 6-6-6h12z"></path>
          </svg>
        </span>
      </div>
      <div
        v-if="!isAuth"
        class="flex items-center w-[14rem] justify-between mt-2 sm:mx-[1rem] lg:mx-[1.5rem] shrink-0"
      >
        <button
          class="text-opacwhite5 text-base hover:scale-110 hover:text-white2 cursor-default"
        >
          Kaydol</button
        ><button
          @click="login"
          class="py-3 px-8 rounded-full bg-white2 hover:bg-[#f6f6f6] hover:scale-105 cursor-default"
        >
          <span class="text-black text-base font-semibold">Oturum aç</span>
        </button>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  props: [
    "toggleHeaderBtn",
    "visToggleHeaderBtn",
    "toggleHeaderProfile",
    "visToggleHeaderProfile",
    "toggleHeaderDisko",
    "visToggleHeaderDisko",
    "selectArtCardName",
    "currentDiskoSection",
  ],
  data() {
    return {
      accountOptions: false,
      dropPlaylists: false,
      historyCounter: 1,
      albumImg: "",
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.push({ name: "home" });
      const header = document.getElementById("header");
      header.classList.remove("home-intersec-bg1");
      header.classList.remove("home-intersec-bg2");
      header.classList.remove("home-not-auth--intersec-bg1");
      header.classList.remove("home-not-auth--intersec-bg2");
      header.classList.remove("home-not-auth--intersec-bg3");
    },
    login() {
      this.$router.push({ name: "login" });
    },
    toggleDropPlaylists() {
      this.dropPlaylists = !this.dropPlaylists;
      this.accountOptions ? (this.accountOptions = false) : "";
    },
    toggleAccount() {
      this.accountOptions = !this.accountOptions;
      this.dropPlaylists ? (this.dropPlaylists = false) : "";
    },
    toggleProfile(currentUserID) {
      this.$router.push({ name: "user", params: { id: currentUserID } });
    },

    goBack() {
      this.$router.back();
    },
    goForward() {
      this.$router.forward();
    },

    close(e) {
      if (!this.$el.contains(e.target)) {
        this.accountOptions = false;
        this.dropPlaylists = false;
      }
    },
  },

  computed: {
    isAuth() {
      return this.$store.getters.isAuth;
    },
    userName() {
      return this.$store.getters.getCurrentUser?.display_name;
    },
    userAvatar() {
      return this.$store.getters.getCurrentUser?.images[0].url;
    },
    currentUserID() {
      return this.$store.getters.getCurrentUser?.id;
    },

    isNavVisible() {
      return (
        this.$route.fullPath === "/collection/playlists" ||
        this.$route.fullPath === "/collection/podcasts" ||
        this.$route.fullPath === "/collection/artists" ||
        this.$route.fullPath === "/collection/albums"
      );
    },

    isSearchVisible() {
      return this.$route.fullPath === "/search";
    },
    currentSec() {
      return this.$route.fullPath === "/collection/playlists"
        ? "Çalma Listeleri"
        : this.$route.fullPath === "/collection/podcasts"
        ? "Podcastler"
        : this.$route.fullPath === "/collection/artists"
        ? "Sanatçılar"
        : "Albümler";
    },
    activePodcasts() {
      return this.$route.fullPath === "/collection/podcasts" ? true : false;
    },
    activeArtists() {
      return this.$route.fullPath === "/collection/artists" ? true : false;
    },
    activeAlbums() {
      return this.$route.fullPath === "/collection/albums" ? true : false;
    },

    isEpisodePage() {
      return this.$route.fullPath === `/episode/${this.$route.params.id}`;
    },
    isEpisodesPage() {
      return this.$route.fullPath === `/collection/episodes`;
    },
    isShowPage() {
      return this.$route.fullPath === `/show/${this.$route.params.id}`;
    },
    isGenrePage() {
      return this.$route.fullPath === `/genre/${this.$route.params.id}`;
    },
    isUsersPage() {
      return this.$route.fullPath === `/user/${this.$route.params.id}`;
    },
    isAlbumPage() {
      return this.$route.fullPath === `/album/${this.$route.params.id}`;
    },
    isDiskografiPage() {
      return this.$route.fullPath === "/artist/id/discography/all";
    },
    isFavoriteSongs() {
      return this.$route.fullPath === "/collection/tracks";
    },
    isArtistPage() {
      return this.$route.fullPath === "/artist/id";
    },
    isSinglePage() {
      return this.$route.fullPath === `/single/${this.$route.params.id}`;
    },
    isPlaylistPage() {
      return this.$route.fullPath === `/playlist/${this.$route.params.id}`;
    },

    isTrackPage() {
      return this.$route.fullPath === `/track/${this.$route.params.id}`;
    },
    getHeaderBtn() {
      return this.$store.getters["controller/getHeaderBtn"];
    },

    currentPlaylist() {
      return this.$store.getters["playlists/getPlaylist"];
    },

    currentUser() {
      return this.$store.getters["users/getUser"];
    },

    playlistName() {
      return this.currentPlaylist?.name;
    },
    albumName() {
      return this.$store.getters["albums/getAlbum"]?.name;
    },
    trackName() {
      return this.$store.getters["artists/getCurrentTrack"]?.name;
    },
    episodeName() {
      return this.$store.getters["episodes/getCurrentEpisode"]?.name;
    },
    showName() {
      return this.$store.getters["shows/getCurrentShow"]?.name;
    },
    genreName() {
      return this.$store.getters["genres/getGenreTitle"];
    },

    currentUserName() {
      return this.$route.params.id === this.currentUserID ? this.userName : "";
    },
  },
  watch: {
    $route() {
      this.accountOptions = false;
      this.dropPlaylists = false;
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

<style scoped lang="scss">
#header {
  &::before {
    content: "";
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: top;
    background-color: var(--bgAlbumImage);
    backdrop-filter: blur(5px);
  }
}
a.active {
  background-color: #333333;
}
a.active2 {
  color: #60a5fa !important;
  background-color: #333333 !important;
}
.activeBtn {
  opacity: 1 !important;
}

.fav-songs-intersec-bg1 {
  background-color: #35685b;
}
.fav-songs-intersec-bg2 {
  background-color: #35685b;
}

.profile-intersec-bg1 {
  background-color: rgba(33, 33, 33, 0.7) !important;
}
.profile-intersec-bg2 {
  background-color: rgb(33, 33, 33) !important;
}

.home-not-auth--intersec-bg1 {
  background-color: rgba(7, 7, 7, 0.5) !important;
}
.home-not-auth--intersec-bg2 {
  background-color: rgba(7, 7, 7, 0.8) !important;
}
.home-not-auth--intersec-bg3 {
  background-color: rgba(7, 7, 7, 1) !important;
}

.home-intersec-bg1 {
  background-color: rgba(36, 22, 73, 0.8) !important;
}
.home-intersec-bg2 {
  background-color: rgb(36, 22, 73) !important;
}
.trackPage-intersec-bg1 {
  background-color: #121212 !important;
}

.librarySec-intersec-bg1 {
  background-color: rgba(7, 7, 7, 0.7) !important;
}
.librarySec-intersec-bg2 {
  background-color: rgb(7, 7, 7) !important;
}

.librarySec2-intersec-bg1 {
  background-color: rgba(7, 7, 7, 0.7) !important;
}
.librarySec2-intersec-bg2 {
  background-color: rgb(7, 7, 7) !important;
}

.librarySec3-intersec-bg1 {
  background-color: rgba(7, 7, 7, 0.7) !important;
}
.librarySec3-intersec-bg2 {
  background-color: rgb(7, 7, 7) !important;
}

.librarySec4-intersec-bg1 {
  background-color: rgba(7, 7, 7, 0.7) !important;
}
.librarySec4-intersec-bg2 {
  background-color: rgb(7, 7, 7) !important;
}

.search-intersec-bg1 {
  background-color: rgba(7, 7, 7, 0.7) !important;
}
.search-intersec-bg2 {
  background-color: rgb(7, 7, 7) !important;
}

.disko-intersec-bg1 {
  background-color: rgba(7, 7, 7) !important;
}
.disko-intersec-bg2 {
  background-color: rgb(206, 20, 20) !important;
}
.podcast-intersec-bg1 {
  background-color: rgba(0, 40, 32, 0.7) !important;
}

.podcast-intersec-bg2 {
  background-color: rgba(0, 40, 32, 1) !important;
}
</style>
