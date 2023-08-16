<template>
  <div v-if="isAuth" class="p-4 lg:ml-[1rem]" id="search-result">
    <!-- search Category -->
    <SearchCategory class=""></SearchCategory>

    <!-- First Box (Top Result) -->
    <div v-if="getSearchCategoryType === 'all'" class="relative">
      <div class="grid grid-cols-[repeat(10,minmax(180px, 5fr))] mt-4 gap-4">
        <div
          :id="getTopResult?.id"
          @click="openCard((data = getTopResult), $event)"
          class="card--container min-w-[22rem] max-w-[28rem] lg1:col-span-1 sm:col-span-1 sm:col-start-1 lg1:row-start-1 lg1:col-start-1 cursor-pointer"
        >
          <h2 class="cursor-default text-white pb-4 text-2xl font-semibold">
            Top Result
          </h2>
          <div
            class="relative flex flex-col bg-dark1 rounded-lg group hover:bg-opacwhite/10 ease duration-300 gap-3 py-4"
          >
            <div
              v-if="topResultType !== 'episode' && topResultType !== 'show'"
              :class="{
                'opacity-100 translate-y-[-0.4rem]':
                  isPlayingContextUriFirstBox,
                'opacity-0': !isPlayingContextUriFirstBox,
              }"
              class="bg-dark rounded-full right-2 bottom-2 absolute flex items-center mx-2 group-hover:block group-hover:opacity-100 transition ease-in duration-200 group-hover:translate-y-[-0.4rem]"
            >
              <button
                @click="
                  playContextUri(
                    (uri = {
                      uri: getTopResult.uri,
                      index: currentPlayingTrackIndex,
                      type: getTopResult.type,
                    }),
                    (href = getTopResult.href)
                  )
                "
                @mousedown="leftClick = true"
                @mouseup="leftClick = false"
                id="playBtn"
                :class="{
                  'bg-green3/80 scale-80': leftClick,
                  'hover:scale-106 bg-green3/95 hover:bg-green3': !leftClick,
                }"
                class="p-[10px] bg-green3 rounded-full lg:group-hover:block hover:scale-110 shadow-[0px_5px_6px_2px_rgba(0,0,0,0.4)]"
              >
                <svg role="img" height="24" width="24" viewBox="0 0 24 24">
                  <path
                    v-if="isPlayingContextUriFirstBox"
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
            <div class="ml-4 mt-2 w-24 h-24">
              <img
                :class="[
                  topResultType === 'artist'
                    ? 'rounded-full shadow-[0_2px_20px_5px_rgba(0,0,0,0.8)]'
                    : 'rounded-lg shadow-[0_1px_20px_10px_rgba(0,0,0,0.5)]',
                ]"
                class="w-24 h-24"
                :src="topResultImage"
                alt="content image"
              />
            </div>
            <div class="px-2 w-full">
              <div
                style="font-weight: 700"
                :class="[
                  this.topResultType === 'artist'
                    ? 'text-[2.5rem] '
                    : 'text-[2rem] ',
                ]"
                class="text-white line-clamp-1 leading-10 tracking-tighter p-2"
              >
                {{ getTopResult?.name }}
              </div>
            </div>
            <div class="flex items-center w-[70%] h-[1rem]">
              <div class="pl-4 flex flex-wrap items-center gap-1">
                <div
                  v-if="topResultType === 'episode'"
                  class="flex items-center justify- text-lightest text-[11px] tracking-tighter font-semibold"
                >
                  <p class="">{{ currentReleaseDate() }}</p>
                  <p class="before:content-['·'] before:px-1">
                    <span> {{ totalDuration(getTopResult?.duration_ms) }}</span>
                  </p>
                </div>
                <div
                  v-if="topResultType === 'show'"
                  class="text-lightest text-sm"
                >
                  <p class="">{{ getTopResult?.publisher }}</p>
                </div>
                <router-link
                  v-show="
                    topResultType === 'track' || topResultType === 'album'
                  "
                  class="hover:underline text-opacwhite/60 text-sm block"
                  v-for="artist in getTopResult?.artists"
                  :key="artist.id"
                  :to="{ name: 'artist', params: { id: `${artist.id}` } }"
                >
                  {{
                    getTopResult?.artists.length > 1
                      ? artist.name ===
                        getTopResult?.artists[getTopResult?.artists.length - 1]
                          .name
                        ? artist.name
                        : artist.name + ", "
                      : artist.name
                  }}
                </router-link>
                <span
                  v-if="topResultType === 'playlist'"
                  class="text-sm text-opacwhite/40"
                  >By
                  {{
                    topResultType === "playlist"
                      ? getTopResult?.owner?.display_name
                      : ""
                  }}</span
                >
                <p
                  style="font-weight: 700"
                  :class="{
                    'ml-1': topResultType !== 'artist',
                  }"
                  class="w-fit rounded-full bg-dark text-white text-xs px-3 py-1 capitalize"
                >
                  {{ topResultTypeName }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- categoryType === 'all' Songs Section -->
        <div
          :class="{
            'lg4:col-span-4 lg4:row-start-1': !getCurrentTrackInfo,
            'xl3:col-span-6 xl3:row-start-1': getCurrentTrackInfo,
          }"
          class="min-w-[30rem] sm:row-start-2 sm:col-span-full"
        >
          <h2 class="text-white pb-4 text-2xl font-semibold">Songs</h2>
          <div class="relative h-full rounded-lg">
            <div class="overflow-hidden wrapper">
              <TrackItems
                v-for="(track, i) in getSongs"
                :key="track.id"
                :id="track.id"
                :track="track"
                :uri="track.uri"
                :searchResult="true"
                :itemUri="track.uri"
                :trackID="track.id"
                :index="i"
                :margin="true"
                :contextType="track.type"
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

                <template #duration>{{
                  trackDuration((duration = track.duration_ms))
                }}</template>
              </TrackItems>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- categoryType === 'songs' Songs Section -->
    <SongSection v-if="getSearchCategoryType === 'songs'"></SongSection>
    <div class="relative top-6" v-if="isAuth">
      <!-- Featured Playlists -->
      <Card
        v-if="
          topResultType === 'artist' &&
          featuredSpotify.length &&
          getSearchCategoryType === 'all'
        "
        :currentData="featuredSpotify"
        :severalPlaylist="true"
        class="mt-6"
      >
        <template #cardTitle>Featured {{ getTopResult?.name }}</template>

        <template #imgContainer="{ data }">
          <div class="w-full relative mb-5">
            <img
              class="h-full w-full object-cover"
              :src="data?.images[0]?.url"
              alt="image"
            />
          </div>
        </template>
        <template #firstTitle="{ data }">{{ data?.name }}</template>
        <template #secondTitle="{ data }"
          ><span class="text-[13px] font-semibold"
            >By {{ data?.owner?.display_name }}</span
          >
        </template>
        <template #playBtn="{ data }">
          <div
            :class="
              data?.uri === getCurrentlyPlayingTrack?.context?.uri &&
              getCurrentlyPlayingTrack?.is_playing
                ? 'opacity-100 translate-y-[-0.4rem]'
                : 'opacity-0'
            "
            class="bg-dark1 rounded-full right-0 bottom-0 absolute flex items-center mx-2 group-hover:block group-hover:opacity-100 transition ease-in duration-200 group-hover:translate-y-[-0.4rem]"
          >
            <button
              @click="
                playContextUri(
                  (uri = {
                    uri: data?.uri,
                    index: currentPlayingTrackIndex,
                    type: data?.type,
                  }),
                  (href = data?.href)
                )
              "
              @mousedown="leftClick = true"
              @mouseup="leftClick = false"
              id="playBtn"
              :class="{
                ' bg-green3/80 scale-80': leftClick,
                'hover:scale-106 bg-green3/95 hover:bg-green3 ': !leftClick,
              }"
              class="p-[11px] rounded-full cursor-default shadow-[0px_5px_6px_2px_rgba(0,0,0,0.4)]"
            >
              <h1 class="text-white"></h1>
              <svg role="img" height="20" width="20" viewBox="0 0 24 24">
                <path
                  v-if="
                    data?.uri === getCurrentlyPlayingTrack?.context?.uri &&
                    getCurrentlyPlayingTrack?.is_playing
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

      <!-- Artists -->
      <Card
        v-if="
          getSearchCategoryType === 'artists' || getSearchCategoryType === 'all'
        "
        :currentData="getSearchResult?.artists?.items"
        :artists="true"
      >
        <template v-if="getSearchCategoryType !== 'artists'" #cardTitle
          >Artists</template
        >

        <template #imgContainer="{ data }">
          <div class="w-full relative mb-4">
            <img
              class="h-full w-full object-cover rounded-full shadow-[0px_5px_12px_10px_rgba(0,0,0,0.3)]"
              :src="data?.images[0]?.url"
              alt="image"
            />
          </div>
        </template>
        <template #firstTitle="{ data }">{{ data?.name }}</template>
        <template #secondTitle="{ data }"
          ><span class="capitalize text-[13px] font-semibold">{{
            data?.type
          }}</span>
        </template>
        <template #playBtn="{ data }">
          <div
            :class="
              this.getCurrentlyPlayingTrack?.item?.artists[0]?.id ===
                data?.id &&
              getCurrentlyPlayingTrack?.is_playing &&
              !getCurrentlyPlayingTrack?.context &&
              isArtistContext
                ? 'opacity-100 translate-y-[-0.4rem]'
                : 'opacity-0'
            "
            class="bg-dark1 rounded-full right-0 bottom-0 absolute flex items-center mx-2 group-hover:block group-hover:opacity-100 transition ease-in duration-200 group-hover:translate-y-[-0.4rem]"
          >
            <button
              @click="
                playArtistTopTracksFunc(
                  (artistID = data?.id),
                  (href = data?.href)
                )
              "
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
                  v-if="
                    getCurrentlyPlayingTrack?.item?.artists[0]?.id ===
                      data?.id &&
                    getCurrentlyPlayingTrack?.is_playing &&
                    !getCurrentlyPlayingTrack?.context &&
                    isArtistContext
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

      <!-- Albums -->
      <Card
        v-if="
          getSearchCategoryType === 'albums' || getSearchCategoryType === 'all'
        "
        :currentData="getSearchResult?.albums?.items"
      >
        <template v-if="getSearchCategoryType !== 'albums'" #cardTitle
          >Albums</template
        >
        <template #imgContainer="{ data }">
          <div class="w-full relative mb-5">
            <img
              class="h-full w-full object-cover"
              :src="data?.images[0]?.url"
              alt="image"
            />
          </div>
        </template>
        <template #firstTitle="{ data }">{{ data?.name }}</template>
        <template #secondTitle="{ data }"
          ><span class="capitalize text-[13px] font-semibold">{{
            new Date(data?.release_date).getFullYear() + " • "
          }}</span>
          <span class="inline">
            <router-link
              class="hover:underline text-[13px] font-semibold"
              v-for="artist in data?.artists"
              :key="artist.id"
              :to="{ name: 'artist', params: { id: `${artist.id}` } }"
            >
              {{
                data?.artists?.length > 1
                  ? artist.name === data?.artists[data.artists.length - 1].name
                    ? artist.name
                    : artist.name + `, `
                  : artist.name
              }}
            </router-link>
          </span>
        </template>
        <template #playBtn="{ data }">
          <div
            :class="
              data?.uri === getCurrentlyPlayingTrack?.context?.uri &&
              getCurrentlyPlayingTrack?.is_playing
                ? 'opacity-100 translate-y-[-0.4rem]'
                : 'opacity-0'
            "
            class="bg-dark1 rounded-full right-0 bottom-0 absolute flex items-center mx-2 group-hover:block group-hover:opacity-100 transition ease-in duration-200 group-hover:translate-y-[-0.4rem]"
          >
            <button
              @click="
                playContextUri(
                  (uri = {
                    uri: data?.uri,
                    index: currentPlayingTrackIndex,
                    type: data?.type,
                  }),
                  (href = data?.href)
                )
              "
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
                  v-if="
                    data?.uri === getCurrentlyPlayingTrack?.context?.uri &&
                    getCurrentlyPlayingTrack?.is_playing
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

      <!-- Playlists -->
      <Card
        v-if="
          getSearchCategoryType === 'playlists' ||
          getSearchCategoryType === 'all'
        "
        :currentData="getSearchResult?.playlists?.items"
        :severalPlaylist="true"
      >
        <template v-if="getSearchCategoryType !== 'playlists'" #cardTitle
          >Playlists</template
        >

        <template #imgContainer="{ data }">
          <div class="w-full relative mb-5">
            <img
              class="h-full w-full object-cover"
              :src="data?.images[0]?.url"
              alt="image"
            />
          </div>
        </template>
        <template #firstTitle="{ data }">{{ data?.name }}</template>
        <template #secondTitle="{ data }"
          ><span class="text-[13px] font-semibold">{{
            "By " + data?.owner?.display_name
          }}</span>
        </template>
        <template #playBtn="{ data }">
          <div
            :class="
              data?.uri === getCurrentlyPlayingTrack?.context?.uri &&
              getCurrentlyPlayingTrack?.is_playing
                ? 'opacity-100 translate-y-[-0.4rem]'
                : 'opacity-0'
            "
            class="bg-dark1 rounded-full right-0 bottom-0 absolute flex items-center mx-2 group-hover:block group-hover:opacity-100 transition ease-in duration-200 group-hover:translate-y-[-0.4rem]"
          >
            <button
              @click="
                playContextUri(
                  (uri = {
                    uri: data.uri,
                    index: currentPlayingTrackIndex,
                    type: data?.type,
                  }),
                  (href = data?.href)
                )
              "
              @mousedown="leftClick = true"
              @mouseup="leftClick = false"
              id="playBtn"
              :class="{
                ' bg-green3/80 scale-80': leftClick,
                'hover:scale-106 bg-green3/95 hover:bg-green3 ': !leftClick,
              }"
              class="p-[11px] rounded-full cursor-default shadow-[0px_5px_6px_2px_rgba(0,0,0,0.4)]"
            >
              <h1 class="text-white"></h1>
              <svg role="img" height="20" width="20" viewBox="0 0 24 24">
                <path
                  v-if="
                    data?.uri === getCurrentlyPlayingTrack?.context?.uri &&
                    getCurrentlyPlayingTrack?.is_playing
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

      <!-- podcasts/shows -->
      <Card
        v-if="
          getSearchCategoryType === 'podcasts' ||
          getSearchCategoryType === 'all'
        "
        :topResultShows="true"
        :currentData="getSearchResult?.shows?.items"
      >
        <template #cardTitle>Podcasts & Shows</template>

        <template #imgContainer="{ data }">
          <div class="w-full relative mb-5">
            <img
              class="h-full w-full object-cover rounded-md"
              :src="data?.images[0]?.url"
              alt="image"
            />
          </div>
        </template>
        <template #firstTitle="{ data }">{{ data?.name }}</template>
        <template #secondTitle="{ data }"
          ><span class="text-[13px] font-semibold">{{ data?.publisher }}</span>
        </template>
      </Card>

      <!-- categoryType === 'podcasts' Episodes -->
      <div
        class="mb-6 max-w-[890px] min-w-[440px]"
        v-if="getSearchCategoryType === 'podcasts'"
      >
        <h3
          class="text-white text-[1.3rem] tracking-tighter pb-4"
          style="font-weight: 700"
        >
          Episodes
        </h3>

        <PodcastEpisodes
          class="sm:max-w-[790px] lg3:max-w-[1600px]"
          v-for="(episode, i) in allEpisodes"
          :key="episode.id"
          :index="i"
          :episode="episode"
          :searchResult="true"
          :checkUserFavEpisode="checkUserFavEpisode"
        />
      </div>

      <!-- Episodes -->
      <Card
        v-if="getSearchCategoryType === 'all'"
        :episodes="true"
        :currentData="allEpisodes"
      >
        <template #cardTitle>Episodes</template>

        <template #imgContainer="{ data }">
          <div class="w-full relative mb-5">
            <img
              class="h-full w-full object-cover rounded-md"
              :src="data?.images[0]?.url"
              alt="image"
            />
          </div>
        </template>
        <template #firstTitle="{ data }">{{ data?.name }}</template>
        <template #secondTitle="{ data }">
          <span class="text-[13px] font-semibold">{{
            currentReleaseDate(data.release_date)
          }}</span>
          <span
            class="text-[13px] font-semibold before:content-['·'] before:pr-1"
          >
            <span> {{ totalDuration(data?.duration_ms) }}</span>
          </span>
        </template>
      </Card>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import TrackItems from "../TrackItems/TrackItems.vue";
import SearchCategory from "./SearchCategory.vue";
import Card from "../Cards/Card.vue";
import SongSection from "./SongSection.vue";
import PodcastEpisodes from "../Podcast/PodcastEpisodes.vue";

export default {
  name: "PlaylistPage",
  components: {
    TrackItems,
    Card,
    SearchCategory,
    SongSection,
    PodcastEpisodes,
  },
  data() {
    return {
      selectedType: "",
      firstBox: "",
      header: "",
      leftClick: false,
      typeOfSelectedSection: null,
      clickedArtist: null,
    };
  },
  methods: {
    async fetchPlaylist(href = this.getTopResult?.href) {
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
    async fetchArtist(href = this.getTopResult?.href) {
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
    async playArtistTopTracksFunc(artistID, href) {
      this.clickedArtist = artistID;
      await this.fetchArtist(href);
      await this.fetchArtistTopTracks(artistID);
      await this.playArtistTopTracks({
        uri: await this.artistTopTrackUris,
        index: await this.currentPlayingTrackIndex,
        type: "artist",
        artistID: artistID,
      });
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

    async openCard(data, e) {
      console.log(data);
      if (e.target.closest("#artistName")?.id === "artistName") return;
      if (e.target.closest("#playBtn")?.id === "playBtn") return;

      this.$store.dispatch("searchItem/searchedItem", data);
      this.$router.push({ name: data.type, params: { id: data.id } });
    },
    async playArtistTopTracks(uri) {
      console.log(uri);
      console.log(uri.index);
      console.log(this.findCurrentPlayingTrackIndex);
      if (this.isPlayingArtistTopTracksCard) {
        await this.$store.dispatch("controller/pauseCurrentTrack");
      } else {
        uri.index = await this.currentPlayingTrackIndex;
        await this.$store.dispatch("controller/playArtitsTopTracks", uri);
      }
    },
    async playContextUri(uri, href) {
      console.log(uri);
      if (this.topResultType === "artist" && this.isPlayingArtistTopTracks) {
        await this.$store.dispatch("controller/pauseCurrentTrack");
      } else if (
        (uri.uri === this.getCurrentlyPlayingTrack?.context?.uri &&
          this.getCurrentlyPlayingTrack?.is_playing) ||
        (this.topResultType === "track" &&
          this.getCurrentlyPlayingTrack?.item?.uri === this.getTopResult?.uri &&
          this.getCurrentlyPlayingTrack?.is_playing)
      ) {
        await this.$store.dispatch("controller/pauseCurrentTrack");
      } else {
        if ((await uri.type) === "playlist") {
          this.typeOfSelectedSection = "playlist";
          await this.fetchPlaylist(href);
          uri.id =
            this.currentPlaylist[this.currentPlayingTrackIndex]?.track.id;
          uri.name = this.playlistName;
        } else if ((await uri.type) === "album") {
          this.typeOfSelectedSection = "album";
          await this.fetchAlbum(href);
          uri.id = this.currentAlbumTracks[this.currentPlayingTrackIndex]?.id;
          uri.name = this.currentAlbumName;
        } else if ((await uri.type) === "artist") {
          this.typeOfSelectedSection = "artist";
          await this.fetchArtist(href);
          await this.fetchArtistTopTracks(this.getTopResult?.id);
          uri.id = this.artistTopTracks[this.currentPlayingTrackIndex]?.id;
          await this.playArtistTopTracks({
            uri: this.artistTopTrackUris,
            index: this.currentPlayingTrackIndex,
            type: this.topResultType,
            artistID: this.getTopResult?.id,
          });
        } else if ((await uri.type) === "track") {
          await this.fetchTrack(href);
          uri.id = this.getTopResult?.id;
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

    //Episode
    currentReleaseDate(date = 0) {
      if (date) {
        const day = new Date(date).getDate();

        const month = this.getMonths[new Date(date).getMonth()];
        return `${month} ${day} `;
      }
      const day = new Date(this.getTopResult?.release_date).getDate();

      const month =
        this.getMonths[new Date(this.getTopResult?.release_date).getMonth()];
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
    async checkUserFavEpisode() {
      await axios
        .get(
          "https://api.spotify.com/v1/me/episodes/contains?ids=" +
            this.allEpisodesIDs,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + this.getToken,
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
      this.checkUserFavEpisode();
    },
    //Songs
    trackDuration(duration) {
      const minutes = Math.floor(duration / 60000);
      const seconds = Math.floor((duration % 60000) / 1000);
      const result = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
      return result;
    },
  },
  computed: {
    isAuth() {
      return this.$store.getters.isAuth;
    },
    getToken() {
      return this.$store.getters.accessToken;
    },
    searchItem() {
      return this.$store.getters["searchItem/getSearchItem"];
    },
    types() {
      return this.$store.getters["searchItem/getTypes"];
    },
    getSearchResult() {
      return this.$store.getters["searchItem/getSearchResultArr"];
    },
    allEpisodes() {
      return this.getSearchResult?.episodes?.items;
    },
    allEpisodesIDs() {
      return this.allEpisodes?.map((item) => item.id).join(",");
    },
    favEpisodes() {
      return this.$store.getters["episodes/getFavEpisodes"].items;
    },

    getCurrentTrackInfo() {
      return this.$store.getters["controller/getCurrentTrackInfo"];
    },
    getSearchCategoryType() {
      return this.$store.getters["searchItem/getSearchCategoryType"];
    },
    featuredSpotify() {
      return this.getSearchResult?.playlists?.items.reduce((acc, item) => {
        item.owner.display_name === "Spotify" ? acc.push(item) : "";
        return acc;
      }, []);
    },
    getTopResult() {
      return this.$store.getters["searchItem/getTopResult"];
    },
    topResultType() {
      return this.getTopResult?.type;
    },
    topResultTypeName() {
      return this.topResultType === "track"
        ? "Song"
        : this.topResultType === "show"
        ? "Podcast"
        : this.topResultType;
    },
    topResultImage() {
      return this.topResultType === "track"
        ? this.getTopResult?.album?.images[0]?.url
        : this.getTopResult?.images[0]?.url;
    },

    getSongs() {
      return this.$store.getters["searchItem/getSongs"];
    },

    getMonths() {
      return this.$store.getters["controller/getMonths"];
    },
    getCurrentAlbum() {
      return this.$store.getters["albums/getAlbum"];
    },

    currentAlbumTracks() {
      return this.getCurrentAlbum?.tracks?.items;
    },
    currentAlbumName() {
      return this.getCurrentAlbum?.name;
    },
    getCurrentPlaylist() {
      return this.$store.getters["playlists/getPlaylist"];
    },
    currentPlaylist() {
      return this.getCurrentPlaylist?.tracks?.items;
    },
    playlistName() {
      return this.getCurrentPlaylist?.name;
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

    getCurrentArtistID() {
      return this.$store.getters["artists/getCurrentArtist"]?.id;
    },
    findCurrentPlayingTrackIndex() {
      return this.typeOfSelectedSection === "album"
        ? this.currentAlbumTracks?.indexOf(
            this.currentAlbumTracks?.find(
              (item) => item.id === this.currentTrackID
            )
          )
        : this.typeOfSelectedSection === "playlist"
        ? this.currentPlaylist?.indexOf(
            this.currentPlaylist?.find(
              (item) => item.track.id === this.currentTrackID
            )
          )
        : this.typeOfSelectedSection === "artist" || this.clickedArtist
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
        this.getCurrentlyPlayingTrack?.item?.artists[0]?.id ===
          this.getTopResult?.id &&
        !this.getCurrentlyPlayingTrack?.context &&
        this.getCurrentlyPlayingTrack?.is_playing
      );
    },
    isArtistContext() {
      return this.$store.getters["controller/isArtistContext"];
    },
    isPlayingArtistTopTracksCard() {
      return (
        this.getCurrentlyPlayingTrack?.item?.artists[0]?.id ===
          this.clickedArtist &&
        !this.getCurrentlyPlayingTrack?.context &&
        this.getCurrentlyPlayingTrack?.is_playing &&
        this.isArtistContext
      );
    },
    isPlayingContextUri() {
      return this.typeOfSelectedSection === "album"
        ? this.getCurrentlyPlayingTrack?.context?.uri ===
            this.getCurrentAlbum?.uri &&
            this.getCurrentlyPlayingTrack?.is_playing
        : this.typeOfSelectedSection === "playlist"
        ? this.getCurrentlyPlayingTrack?.context?.uri ===
            this.getCurrentPlaylist?.uri &&
          this.getCurrentlyPlayingTrack?.is_playing
        : this.typeOfSelectedSection === "artist"
        ? this.isPlayingArtistTopTracks
        : "";
    },
    isPlayingContextUriFirstBox() {
      return this.topResultType === "artist"
        ? this.isPlayingArtistTopTracks
        : this.topResultType !== "track"
        ? this.getCurrentlyPlayingTrack?.context?.uri ===
            this.getTopResult?.uri && this.getCurrentlyPlayingTrack?.is_playing
        : this.getCurrentlyPlayingTrack?.item?.uri === this.getTopResult?.uri &&
          this.getCurrentlyPlayingTrack?.is_playing &&
          !this.getCurrentlyPlayingTrack?.context;
    },
  },

  watch: {
    topResultType(val) {
      console.log(val);
      console.log(this.featuredSpotify);
    },
  },

  async created() {
    console.log("searchResult created!");
    await this.checkUserFavEpisode();
    this.header = document.getElementById("header");
    this.header.classList.add("base2-intersec-bg2");
  },
  beforeUnmount() {
    this.search = false;
    console.log("search Unmounted!");
    if (!this.isAuth) return;
    this.header ? this.header.classList.remove("base2-intersec-bg2") : "";
  },
};
</script>

<style></style>
