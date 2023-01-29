<template>
  <!-- Cards -->

  <div
    @click="openCard((data = item), $event)"
    :id="contextID"
    class="card--container group bg-dark1 hover:bg-opacwhite1 ease duration-300 w-full cursor-pointer rounded-md flex-1 p-4 relative"
  >
    <div class="h-full w-full relative">
      <div class="w-full relative">
        <div class="w-full relative mb-5">
          <img
            :class="{
              'rounded-full rounded-full shadow-[0px_5px_15px_8px_rgba(0,0,0,0.4)]':
                isArtistCard,
              'rounded-l-sm': !isArtistCard,
            }"
            class="mb:h-full object-cover"
            :src="contextImage"
            alt="image"
          />
        </div>
        <div
          v-if="contextType === 'artist'"
          :class="{
            'opacity-100 translate-y-[-0.4rem]': isPlayingArtistTopTracks,
          }"
          class="bg-dark1 rounded-full right-0 bottom-0 absolute flex items-center mx-2 group-hover:block opacity-0 group-hover:opacity-100 transition ease-in duration-200 group-hover:translate-y-[-0.4rem]"
        >
          <button
            @click="playArtistTopTracks"
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
                v-if="!isPlayingArtistTopTracks"
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
        <div
          v-else
          :class="{
            'opacity-100 translate-y-[-0.4rem]': isPlayingContextUri,
            'opacity-0': !isPlayingContextUri,
          }"
          class="bg-dark rounded-full right-0 bottom-0 absolute flex items-center mx-2 group-hover:block group-hover:opacity-100 transition ease-in duration-200 group-hover:translate-y-[-0.4rem]"
        >
          <button
            @click="
              playContextUri(
                (uri = {
                  uri: contextUri,
                  index: currentPlayingTrackIndex,
                  type: contextType,
                }),
                (href = item?.context?.href)
              )
            "
            id="playBtn"
            @mousedown="leftClick = true"
            @mouseup="leftClick = false"
            :class="{
              ' bg-green3/80 scale-80': leftClick,
              'hover:scale-106 bg-green3/95 hover:bg-green3': !leftClick,
            }"
            class="p-3 rounded-full cursor-default shadow-[0px_5px_6px_2px_rgba(0,0,0,0.4)]"
          >
            <svg role="img" height="20" width="20" viewBox="0 0 24 24">
              <path
                v-if="!isPlayingContextUri"
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
      </div>

      <div class="flex items-middle flex-col justify-center">
        <div class="text-white max-w-full text-[15px] truncate font-semibold">
          {{ contextName }}
        </div>

        <div class="text-[13px] text-lightest w-full line-clamp-2 mt-1">
          <span v-if="contextType === 'playlist'"> {{ playlistDesc }} </span>
          <div v-if="contextType === 'artist'">
            <span class="capitalize"> {{ contextType }} </span>
          </div>
          <div v-else>
            <router-link
              id="artistName"
              class="hover:underline after:content-[''] after:ml-1 after:inline-block"
              v-for="artist in item?.track?.artists"
              :key="artist?.id"
              :to="{ name: 'artist', params: { id: `${artist.id}` } }"
            >
              {{
                item.track.artists.length > 1
                  ? artist.name ===
                    item.track.artists[item.track.artists.length - 1].name
                    ? artist.name
                    : artist.name + ","
                  : artist.name
              }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Card",
  props: ["item", "contextType", "contextUri", "index"],

  data() {
    return {
      playlistImage: null,
      playlistName: null,
      artistImage: null,
      artistID: null,
      leftClick: false,
      playlistDesc: null,
      typeOfSelectedSection: null,
      isCardPlaying: false,
    };
  },
  methods: {
    async fetchPlaylist(href = this.item.context.href) {
      await axios
        .get(href, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.getToken,
          },
        })
        .then(({ data }) => {
          this.playlistImage = data.images[0].url;
          this.playlistName = data.name;
          this.playlistDesc = data.description;
          this.$store.dispatch("playlists/getPlaylist", data);
        })
        .catch((err) => console.log(err));
    },
    async fetchArtist(href = this.item.context.href, selectedArtist = false) {
      await axios
        .get(href, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.getToken,
          },
        })
        .then(({ data }) => {
          this.artistImage = data.images[1].url;
          if (selectedArtist) {
            console.log(data);
            this.$store.dispatch("artists/currentArtist", data);
          }
        })
        .catch((err) => console.log(err));
    },
    async fetchAlbum(href) {
      await axios
        .get(href, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.getToken,
          },
        })
        .then(({ data }) => {
          console.log(this.item);
          this.$store.dispatch("albums/getAlbum", data);
        })
        .catch((err) => console.log(err));
    },
    async playArtistTopTracks(uri) {
      this.typeOfSelectedSection = "artist";
      console.log(uri);
      console.log(uri.index);
      console.log(this.findCurrentPlayingTrackIndex);
      if (this.isPlayingArtistTopTracks) {
        await this.$store.dispatch("controller/pauseCurrentTrack");
      } else {
        uri.index = await this.currentPlayingTrackIndex;
        await this.$store.dispatch("controller/playArtitsTopTracks", uri);
      }
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
    async openCard(data, e) {
      console.log(data);
      const cardID = e.target.closest(".card--container").id;
      if (e.target.closest("#artistName")?.id === "artistName") return;
      if (e.target.closest("#playBtn")?.id === "playBtn") {
        console.log("toggle Play/Stop Users");
        console.log(cardID);
        if (this.contextType === "artist") {
          this.artistID = cardID;
          await this.fetchArtistTopTracks(this.artistID);
          await this.fetchArtist(
            "https://api.spotify.com/v1/artists/" + this.artistID,
            true
          );
          await this.playArtistTopTracks({
            uri: this.artistTopTrackUris,
            index: this.currentPlayingTrackIndex,
            type: this.contextType,
            artistID: this.artistID,
          });
        } else
          await this.playContextUri(
            {
              uri: this.contextUri,
              index: this.currentPlayingTrackIndex,
              type: this.contextType,
            },
            this.item?.context?.href
          );
      } else {
        this.contextType === "album"
          ? this.$router.push({ name: "album", params: { id: cardID } })
          : this.contextType === "artist"
          ? this.$router.push({ name: "artist", params: { id: cardID } })
          : this.contextType === "playlist"
          ? this.$router.push({ name: "playlist", params: { id: cardID } })
          : "";
      }
    },
    async playContextUri(uri, href) {
      if (this.isPlayingContextUri) {
        await this.$store.dispatch("controller/pauseCurrentTrack");
      } else {
        if ((await uri.type) === "playlist") {
          await this.fetchPlaylist(href);
          this.typeOfSelectedSection = "playlist";
          uri.id =
            this.currentPlaylist[this.currentPlayingTrackIndex]?.track.id;
        } else if ((await uri.type) === "album") {
          this.typeOfSelectedSection = "album";
          console.log(href);
          if (!this.item.context) {
            await this.fetchAlbum(this.item.track.album.href);
          } else await this.fetchAlbum(href);
          uri.id = this.currentAlbumTracks[this.currentPlayingTrackIndex]?.id;
        }
        uri.index = this.currentPlayingTrackIndex;
        console.log(uri);
        await this.$store.dispatch("controller/playSelectedContext", uri);
      }
    },
  },
  computed: {
    getToken() {
      return this.$store.getters.accessToken;
    },
    contextID() {
      return this.contextType === "artist"
        ? this.item.track.artists[0].id
        : this.contextType === "album"
        ? this.item.track.album.id
        : this.contextType === "playlist"
        ? this.item.context.uri.split(":").slice(2)
        : "";
    },
    contextName() {
      return this.contextType === "artist"
        ? this.item.track.artists[0].name
        : this.contextType === "album"
        ? this.item.track.album.name
        : this.contextType === "playlist"
        ? this.playlistName
        : this.contextType === "collection"
        ? this.collectionName
        : "";
    },

    contextImage() {
      return this.contextType === "album"
        ? this.item.track.album.images[1].url
        : this.contextType === "playlist"
        ? this.playlistImage
        : this.contextType === "artist"
        ? this.artistImage
        : this.contextType === "collection"
        ? this.item.track.image
        : "";
    },
    isArtistCard() {
      return this.item?.context?.type === "artist";
    },

    currentAlbumTracks() {
      return this.$store.getters["albums/getAlbum"]?.tracks?.items;
    },
    currentPlaylist() {
      return this.$store.getters["playlists/getPlaylist"]?.tracks?.items;
    },
    artistTopTracks() {
      return this.$store.getters["artists/getTopTracks"];
    },
    artistTopTrackUris() {
      return this.artistTopTracks.map((item) => item.uri);
    },
    getCurrentlyPlayingTrack() {
      return this.$store.getters["controller/getCurrentlyPlayingTrack"];
    },
    currentTrackID() {
      return this.getCurrentlyPlayingTrack?.item?.id;
    },

    findCurrentPlayingTrackIndex() {
      return this.typeOfSelectedSection === "playlist"
        ? this.currentPlaylist?.indexOf(
            this.currentPlaylist?.find(
              (item) => item.track.id === this.currentTrackID
            )
          )
        : this.typeOfSelectedSection === "album"
        ? this.currentAlbumTracks?.indexOf(
            this.currentAlbumTracks?.find(
              (item) => item.id === this.currentTrackID
            )
          )
        : this.typeOfSelectedSection === "artist"
        ? this.artistTopTracks.indexOf(
            this.artistTopTracks.find((item) => item.id === this.currentTrackID)
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
          this.item?.track.artists[0].id &&
        !this.getCurrentlyPlayingTrack?.context &&
        this.getCurrentlyPlayingTrack?.is_playing
      );
    },
    isPlayingContextUri() {
      return (
        this.getCurrentlyPlayingTrack?.context?.uri === this.contextUri &&
        this.getCurrentlyPlayingTrack?.is_playing
      );
    },
  },

  async created() {
    this.item?.context?.type === "artist"
      ? await this.fetchArtist()
      : this.item?.context?.type === "playlist"
      ? await this.fetchPlaylist()
      : "";
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
