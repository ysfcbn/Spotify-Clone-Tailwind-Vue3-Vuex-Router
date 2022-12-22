<template>
  <section class="mb-12 relative z-70">
    <div class="flex justify-between h-[3.3rem]">
      <div class="h-fit flex flex-col gap-1">
        <h2
          class="text-[1.5rem] text-white leading-7 tracking-tight hover:underline hover:text-underline-offset-8 cursor-pointer"
          style="font-weight: 700"
        >
          <slot name="cardTitle"></slot>
        </h2>
        <h6 v-if="userPage" class="text-lightest text-sm">
          Yalnızca sana görünür
        </h6>
      </div>
      <div class="">
        <h6
          style="font-weight: 600"
          class="h-full mb:text-[10px] md:text-[12px] text-lg leading-10 text-lightest hover:underline hover:text-white uppercase cursor-pointer pb-2 tracking-widest"
        >
          <slot name="seeMore"> HEPSİNİ GÖR</slot>
        </h6>
      </div>
    </div>

    <div
      v-if="artistPage"
      class="relative w-full h-full grid col-span-full pb-5"
    >
      <div class="flex items-center justify-start text-sm">
        <button
          @click="togglePublications"
          :class="popPublications ? 'active' : 'inactive'"
          class="w-fit h-fit rounded-full px-3 py-[6px] cursor-default bg-dark2 hover:bg-dark3/70 transition duration-200"
        >
          <span>Popüler yayınlar</span>
        </button>
        <button
          @click="toggleAlbums"
          :class="albums ? 'active' : 'inactive'"
          class="w-fit h-fit rounded-full px-3 py-[6px] mx-2 cursor-default bg-dark2 hover:bg-dark3/70 transition duration-200"
        >
          <span>Albümler</span>
        </button>
        <button
          @click="toggleSingles"
          :class="singles ? 'active' : 'inactive'"
          class="w-fit h-fit rounded-full px-3 py-[6px] cursor-default bg-dark2 hover:bg-dark3/70 transition duration-200"
        >
          <span>Singlelar ve EPler</span>
        </button>
        <button
          v-if="isCompExist"
          @click="toggleCompilations"
          :class="compilations ? 'active' : 'inactive'"
          class="w-fit h-fit rounded-full px-3 py-[6px] cursor-default bg-dark2 hover:bg-dark3/70 transition duration-200 mx-2"
        >
          <span>Derlemeler</span>
        </button>
      </div>
    </div>
    <!-- Cards -->
    <div
      :class="{
        'mt-4': userPage,
        'auto-rows-auto gap-6': genrePage,
        'auto-rows-0 overflow-hidden grid-rows-1 gap-x-6': !genrePage,
      }"
      class="relative grid grid-cols-col180"
    >
      <div
        v-show="data"
        @click="openCard((data = data), $event)"
        v-for="(data, i) in currentData"
        :key="recentlyPlayedTracks ? data?.track?.album?.id : data?.id"
        :id="
          shows
            ? data?.show.id
            : artists
            ? data?.id
            : albums
            ? data?.album?.id
            : data?.context?.type === 'artist' && recentlyPlayedCards
            ? data?.track?.artists[0]?.id
            : data?.context?.type === 'playlist' && recentlyPlayedCards
            ? data?.context?.uri.split(':').slice(2)
            : recentlyPlayedTracks || recentlyPlayedCards
            ? data?.track?.album?.id
            : data?.id
        "
        :style="{ 'z-index': currentData.length - i }"
        class="card--container group bg-dark1 hover:bg-opacwhite1 ease duration-300 w-full cursor-pointer rounded-md flex-1 p-4 relative"
      >
        <div class="h-full w-full relative">
          <div
            :class="{
              'h-[65%] mb-[10%] w-full z-10': artists,
              'mb-5': !artists,
            }"
            class="w-full relative"
          >
            <slot name="imgContainer" :data="data">
              {{ contextType }}
              <div class="w-full relative mb-5">
                <img
                  :class="
                    data?.context?.type === 'artist' ? 'rounded-full' : ''
                  "
                  class="h-full w-full object-cover"
                  src="image"
                  alt="image"
                />
              </div>
            </slot>
            <slot name="playBtn" :data="data"> </slot>
          </div>

          <div class="flex items-middle flex-col justify-center">
            <div class="text-white max-w-full text-base truncate font-semibold">
              <slot name="firstTitle" :data="data"></slot>
            </div>

            <div class="text-md text-lightest w-full line-clamp-2 mt-1">
              <slot name="secondTitle" :data="data">
                <span v-if="data?.context?.type === 'playlist'">
                  {{ playlistDesc }}
                </span>
                <router-link
                  v-else
                  class="hover:underline"
                  v-for="artist in data?.track?.artists"
                  :key="artist?.id"
                  :to="{ name: 'artist', params: { id: `${artist.id}` } }"
                >
                  {{
                    data.track.artists.length > 1
                      ? artist.name ===
                        data.track.artists[data.track.artists.length - 1].name
                        ? artist.name
                        : artist.name + ", "
                      : artist.name
                  }}
                </router-link>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
export default {
  name: "Card",
  props: [
    "currentData",
    "contextType",
    "artistPage",
    "userPage",
    "shows",
    "genrePage",
    "popPublications",
    "albums",
    "singles",
    "artists",
    "recentlyPlayedTracks",
    "recentlyPlayedCards",
    "severalPlaylist",
    "compilations",
    "togglePublications",
    "toggleAlbums",
    "toggleSingles",
    "toggleCompilations",
  ],
  data() {
    return {
      playlistID: "",
      isCardPlaying: false,
      playlistImage: null,
      playlistDesc: null,
      artistImage: null,
      index: "",
    };
  },
  computed: {
    getToken() {
      return this.$store.getters.accessToken;
    },
    isCompExist() {
      return this.$store.getters["discography/isCompExist"];
    },

    // isDataPlaylist() {
    // 	return this.data.context.type === 'playlist'
    // 		? this.fetchPlaylist(this.data.context.href)
    // 		: false;
    // },
    getLastListenCards() {
      return this.$store.getters["controller/getLastListenCards"];
    },
    getPlaylistIDs() {
      return this.$store.getters["controller/getPlaylistIDs"];
    },
    getArtistIDs() {
      return this.$store.getters["controller/getArtistIDs"];
    },
    // getLastListenPlaylistContextIDs() {
    // 	if (this.recentlyPlayedCards) {
    // 		return this.getLastListenCards.map((item, i) => {
    // 			if (item.context && item.context.type === 'playlist') {
    // 				this.$store.dispatch('controller/playlistIDs', i);
    // 			}
    // 		});
    // 	}
    // },
    // getLastListenArtistContextIDs() {
    // 	if (this.recentlyPlayedCards) {
    // 		return this.getLastListenCards.map((item, i) => {
    // 			if (item.context && item.context.type === 'artist') {
    // 				this.$store.dispatch('controller/artistIDs', i);
    // 			}
    // 		});
    // 	}
    // },
    // async contextImage() {
    // 	return this.currentData[0]?.context?.type === 'playlist'
    // 		? await this.fetchPlaylist(this.currentData[0].context.href)
    // 		: this.currentData[0]?.context?.type === 'artist'
    // 		? await this.fetchArtist(this.currentData[0].context.href)
    // 		: this.currentData[0]?.track?.album?.images[1].url;
    // },
  },
  methods: {
    async openCard(data, e) {
      console.log(data);
      const cardID = e.target.closest(".card--container").id;
      let type = data?.context?.type;
      if (!type) {
        type = data?.album?.type;
      }
      if (!type) type = data?.type;
      const isShow = data?.type;
      console.log(isShow);
      console.log(type);
      if (e.target.closest("#playBtn")?.id === "playBtn") {
        console.log("toggle Play/Stop Users");
        console.log(this.isCardPlaying);
        console.log(cardID);
        await this.playContextUri();
        console.log(
          data?.context?.uri.split(":").slice(2),
          cardID,
          "dasdasdasdas"
        );
        data?.context?.uri.split(":").slice(2) === cardID
          ? (this.isCardPlaying = true)
          : (this.isCardPlaying = false);
        console.log(this.isCardPlaying, "isCardPlaying2");
      } else {
        if (type) {
          console.log("CARD CONTEXT TYPE!!!!!", type);
          type === "album"
            ? this.$router.push({ name: "album", params: { id: cardID } })
            : type === "artist"
            ? this.$router.push({ name: "artist", params: { id: cardID } })
            : "";
          if (type === "playlist") {
            this.$router.push({
              name: "playlist",
              params: { id: `${cardID}` },
            });
          }
        } else if (this.artists) {
          this.$router.push({ name: "artist", params: { id: cardID } });
        } else if (this.shows) {
          this.$router.push({ name: "show", params: { id: cardID } });
        } else {
          this.$router.push({ name: "album", params: { id: cardID } });
        }
      }
    },
    async fetchPlaylist(href) {
      return await axios
        .get(href, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.getToken,
          },
        })
        .then(({ data }) => {
          console.log(data);
          console.log(data.images[1].url);
          this.playlistImage = data.images[1].url;
          this.playlistDesc = data.description;
        })
        .catch((err) => console.log(err));
    },
    async fetchArtist(href) {
      return await axios
        .get(href, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.getToken,
          },
        })
        .then(({ data }) => {
          console.log(data.images[0].url);
          this.artistImage = data.images[0].url;
        })
        .catch((err) => console.log(err));
    },
  },

  async created() {
    console.log(this.currentData);
    console.log(this.albums);
    console.log(this.recentlyPlayedCards);

    this.getLastListenPlaylistContextIDs;
    this.getLastListenArtistContextIDs;
    // this.activeData?.context?.type === 'artist'
    // 	? await this.fetchArtist()
    // 	: this.activeData?.context?.type === 'playlist'
    // 	? await this.fetchPlaylist()
    // 	: '';
  },
};
</script>

<style scoped>
.active {
  background-color: white !important;
  color: #000000 !important;
  font-weight: 500;
}
.inactive {
  background-color: #282828 !important;
  color: white !important;
  font-weight: 500;
}
</style>
