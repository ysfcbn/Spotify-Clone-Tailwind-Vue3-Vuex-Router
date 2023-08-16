<template>
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
          :class="
            getCurrentlyPlayingTrack?.item?.artists[0].id === item?.id &&
            getCurrentlyPlayingTrack?.is_playing &&
            !getCurrentlyPlayingTrack?.context &&
            isArtistContext
              ? 'opacity-100 translate-y-[-0.4rem]'
              : 'opacity-0'
          "
          class="bg-dark1 rounded-full right-0 bottom-0 absolute flex items-center mx-2 group-hover:block group-hover:opacity-100 transition ease-in duration-200 group-hover:translate-y-[-0.4rem]"
        >
          <button
            @click="playArtistTopTracks"
            @mousedown="leftClick = true"
            @mouseup="leftClick = false"
            id="playBtn"
            :class="{
              ' bg-green3/80 scale-80': leftClick,
              'hover:scale-106 bg-green3/95 hover:bg-green3': !leftClick,
            }"
            class="p-[11px] rounded-full cursor-default shadow-[0px_5px_6px_2px_rgba(0,0,0,0.4)]"
          >
            <h1 class="text-white"></h1>
            <svg role="img" height="20" width="20" viewBox="0 0 24 24">
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
          v-else-if="
            contextType == 'album' ||
            contextType == 'playlist' ||
            contextType === 'track'
          "
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
                (href = item?.href)
              )
            "
            id="playBtn"
            @mousedown="leftClick = true"
            @mouseup="leftClick = false"
            :class="{
              ' bg-green3/80 scale-80': leftClick,
              'hover:scale-106 bg-green3/95 hover:bg-green3': !leftClick,
            }"
            class="p-[11px] rounded-full cursor-default shadow-[0px_5px_6px_2px_rgba(0,0,0,0.4)]"
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
      <div
        class="absolute flex items-start right-[-1rem] top-[-1rem] py-1 px-2 transition ease-in duration-200"
      >
        <button
          :id="item.id"
          @click="closeTrack(msg, $event)"
          class="close--button p-2 bg-opacblack rounded-full cursor-default hover:scale-110 text-white"
        >
          <svg role="img" height="16" width="16" viewBox="0 0 16 16" class="">
            <path
              fill="currentColor"
              d="M1.47 1.47a.75.75 0 011.06 0L8 6.94l5.47-5.47a.75.75 0 111.06 1.06L9.06 8l5.47 5.47a.75.75 0 11-1.06 1.06L8 9.06l-5.47 5.47a.75.75 0 01-1.06-1.06L6.94 8 1.47 2.53a.75.75 0 010-1.06z"
            ></path>
          </svg>
        </button>
      </div>
      <div class="flex items-middle flex-col justify-center">
        <div class="text-white max-w-full text-[15px] truncate font-semibold">
          {{ contextName }}
        </div>

        <div
          class="text-[13px] text-lightest w-full line-clamp-2 mt-1 font-semibold"
        >
          <span v-if="contextType === 'playlist'">
            {{ "By " + item?.owner?.display_name }}
          </span>
          <div
            class="inline"
            v-if="contextType === 'episode' || contextType === 'album'"
          >
            <span class="text-[13px]">{{
              currentReleaseDate(item?.release_date, contextType === "album")
            }}</span>
            <span
              v-if="contextType === 'episode'"
              class="text-[13px] before:content-['·'] before:pr-1"
            >
              <span> {{ totalDuration(item?.duration_ms) }}</span>
            </span>
          </div>
          <span v-if="contextType === 'show'">
            {{ "By " + item.publisher }}
          </span>
          <div v-if="contextType === 'artist'">
            <span class="capitalize"> {{ contextType }} </span>
          </div>
          <div v-else class="inline">
            <router-link
              id="artistName"
              class="hover:underline"
              v-for="artist in item?.artists"
              :key="artist?.id"
              :to="{ name: 'artist', params: { id: `${artist.id}` } }"
            >
              {{
                item.artists.length > 1
                  ? artist.name === item.artists[item.artists.length - 1].name
                    ? artist.name
                    : artist.name + `, `
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
  props: ["item", "contextType", "contextUri", "index"],
  emits: ["filterSearch"],
  data() {
    return {
      ButtonId: "",
      artistID: null,
      leftClick: false,
      typeOfSelectedSection: null,
    };
  },
  methods: {
    async fetchPlaylist(href = this.item.href) {
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
    async fetchArtist(href = this.item.href, selectedArtist = false) {
      await axios
        .get(href, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.getToken,
          },
        })
        .then(({ data }) => {
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
    async fetchTrack(href) {
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
          this.$store.dispatch("albums/currentTrack", data);
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
      if (e.target.closest(".close--button")?.id) return;
      if (e.target.closest("#artistName")?.id === "artistName") return;
      if (e.target.closest("#playBtn")?.id === "playBtn") {
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
            this.item?.href
          );
      } else {
        this.contextType === "album"
          ? this.$router.push({ name: "album", params: { id: cardID } })
          : this.contextType === "artist"
          ? this.$router.push({ name: "artist", params: { id: cardID } })
          : this.contextType === "playlist"
          ? this.$router.push({ name: "playlist", params: { id: cardID } })
          : this.contextType === "episode"
          ? this.$router.push({ name: "episode", params: { id: cardID } })
          : this.contextType === "show"
          ? this.$router.push({ name: "show", params: { id: cardID } })
          : this.contextType === "track"
          ? this.$router.push({ name: "track", params: { id: cardID } })
          : "";
      }
    },
    async playContextUri(uri, href) {
      if (this.isPlayingContextUri) {
        await this.$store.dispatch("controller/pauseCurrentTrack");
      } else if (
        this.contextType === "track" &&
        this.currentTrackID === this.item?.uri &&
        this.getCurrentlyPlayingTrack?.is_playing &&
        !this.isArtistContext
      ) {
        await this.$store.dispatch("controller/pauseCurrentTrack");
      } else {
        if ((await uri.type) === "playlist") {
          await this.fetchPlaylist(href);
          this.typeOfSelectedSection = "playlist";
          uri.id =
            this.currentPlaylist[this.currentPlayingTrackIndex]?.track.id;
          uri.name = this.currentPlaylistName;
        } else if ((await uri.type) === "album") {
          this.typeOfSelectedSection = "album";

          await this.fetchAlbum(href);
          uri.id = this.currentAlbumTracks[this.currentPlayingTrackIndex]?.id;
          uri.name = this.currentAlbumName;
        } else if ((await uri.type) === "track") {
          await this.fetchTrack(href);
          uri.id = this.item?.id;
        }
        uri.index = this.currentPlayingTrackIndex;
        console.log(uri);
        uri.type === "track"
          ? await this.$store.dispatch("controller/playSelectedTrack", uri)
          : uri.type !== "artist"
          ? await this.$store.dispatch("controller/playSelectedContext", uri)
          : "";
      }
    },
    currentReleaseDate(date = 0, isAlbum = false) {
      if (isAlbum) {
        const year = new Date(date).getFullYear();
        return `${year} • `;
      } else if (date) {
        const day = new Date(date).getDate();

        const month = this.getMonths[new Date(date).getMonth()];
        return `${month} ${day} `;
      }
      const day = new Date(date.release_date).getDate();

      const month = this.getMonths[new Date(date.release_date).getMonth()];
      return `${month} ${day} `;
    },
    totalDuration(duration) {
      const hours = Math.floor(duration / 1000 / 60 / 60);

      const minutes = () => {
        if (duration > 3600000) {
          return Math.abs(Math.floor((duration / 1000 / 60 / 60 - hours) * 60));
        } else {
          return Math.floor((duration / 1000 / 60 / 60) * 60);
        }
      };
      const result = () => {
        if (duration > 3600000) {
          return hours + " hr " + minutes() + " min";
        } else {
          return minutes() + " min ";
        }
      };
      return result();
    },
    closeTrack(_, event) {
      console.log(event);
      this.ButtonId = event.target.closest(".close--button").id;
      console.log(this.ButtonId);
      this.$emit("filterSearch", this.ButtonId);
    },
  },
  computed: {
    getToken() {
      return this.$store.getters.accessToken;
    },
    contextID() {
      return this.item?.id;
    },
    contextName() {
      return this.item?.name;
    },

    contextImage() {
      return this.contextType === "track"
        ? this.item?.album?.images[0]?.url
        : this.item?.images[0]?.url;
    },
    isArtistCard() {
      return this.item?.type === "artist";
    },

    currentAlbumTracks() {
      return this.$store.getters["albums/getAlbum"]?.tracks?.items;
    },
    currentAlbumName() {
      return this.$store.getters["albums/getAlbum"]?.name;
    },
    currentPlaylist() {
      return this.$store.getters["playlists/getPlaylist"]?.tracks?.items;
    },
    currentPlaylistName() {
      return this.$store.getters["playlists/getPlaylist"]?.name;
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
        : this.typeOfSelectedSection === "artist" &&
          this.contextType !== "track"
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
        this.getCurrentlyPlayingTrack?.item?.artists[0].id === this.item?.id &&
        !this.getCurrentlyPlayingTrack?.context &&
        this.getCurrentlyPlayingTrack?.is_playing
      );
    },
    allQueueList() {
      return this.$store.getters["controller/getAllQueueList"];
    },
    isArtistContext() {
      return this.$store.getters["controller/isArtistContext"];
    },
    isPlayingContextUri() {
      return this.contextType === "track"
        ? !this.getCurrentlyPlayingTrack?.context &&
            !this.isArtistContext &&
            this.currentTrackID === this.item?.id &&
            this.getCurrentlyPlayingTrack?.is_playing
        : this.getCurrentlyPlayingTrack?.context?.uri === this.contextUri &&
            this.getCurrentlyPlayingTrack?.is_playing;
    },
    getMonths() {
      return this.$store.getters["controller/getMonths"];
    },
    async created() {
      this.item?.type === "artist"
        ? await this.fetchArtist()
        : this.item?.type === "playlist"
        ? await this.fetchPlaylist()
        : "";
    },
  },
};
</script>

<style scoped></style>
