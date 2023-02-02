<template>
  <section class="begenilen-sarkılar box-border">
    <div
      v-if="currentPath"
      :id="`${
        currentPath === 'favoriteSongs'
          ? 'favoriteSongs'
          : currentPath === 'episodes'
          ? 'episodes'
          : currentPath === 'albums'
          ? 'albums'
          : ''
      }`"
      :class="{
        'bg-bgpurple ': currentPath === 'favoriteSongs' ? true : false,
        'bg-orange2': albumsPage,
        'bg-gradient-to-b from-red2 to-red4': singlesPage,
        'bg-gradient-to-b from-podcastGreen to-podcastGreen2 ':
          currentPath === 'episodes' ? true : false,
        'bg-gradient-to-b from-yellow1 to-yellow2 ': episodePage,
        'bg-gradient-to-b from-purple6 to-purple7': podcastShowPage,
      }"
      class="p-5 max-h-[800px] min-h-[340px] w-full mt-[-66px] relative shadow-[2px_0px_5px_5px_rgba(0,0,0,0.4)] bg-gradient-to-b from-darkpurple via-purpl4 to-dark-1"
      style="height: 326px"
    >
      <div class="flex items-end justify-start h-full lg:ml-[1rem]">
        <div
          class="flex sm:w-[192px] sm:min-w-[192px] xl:h-[232px] xl:w-[232px] xl:min-w-[232px] shadow-[0_8px_40px_10px_rgba(0,0,0,0.6)] rounded-[12px]"
        >
          <img
            v-if="currentPath"
            class="object-cover h-full w-full"
            src="https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png"
            alt="fav"
          />
          <img
            v-else-if="albumsPage"
            class="object-cover h-full w-full"
            src="https://i.scdn.co/image/ab67616d00001e0201288d5dc8b701031d97a0d7"
            alt="albums"
          />
          <img
            v-else-if="singlesPage"
            class="object-cover h-full w-full"
            src="https://i.scdn.co/image/ab67616d00001e02b01a195b8d8dc4dc6c5e2bc6"
            alt="single"
          />
          <img
            v-else-if="episodePage"
            class="object-cover h-full w-full rounded-[12px]"
            src="https://i.scdn.co/image/ab6765630000ba8aaa7f14fc7a7bd4a48f4bda4b"
            alt="single"
          />
          <img
            v-else-if="podcastShowPage"
            class="object-cover h-full w-full rounded-[12px]"
            src="https://i.scdn.co/image/ab67656300005f1f703be55a2a4e288a39cc1709"
            alt="podcast"
          />
          <div
            v-else-if="podcastsPage"
            class="flex items-center justify-center sm:w-[192px] sm:min-w-[192px] sm:h-[192px] xl:h-[232px] xl:w-[232px] xl:min-w-[232px] bg-podcastGreen3 rounded-lg"
          >
            <svg
              role="img"
              height="64"
              width="64"
              viewBox="0 0 24 24"
              class="text-green5"
            >
              <path
                fill="currentColor"
                d="M7 1a3 3 0 00-3 3v17.167c0 1.448 1.657 2.27 2.81 1.393L12 18.612l5.19 3.948c1.153.876 2.81.055 2.81-1.393V4a3 3 0 00-3-3H7z"
              ></path>
            </svg>
          </div>
        </div>
        <div class="flex flex-col text-white font-semibold px-4">
          <h2 v-if="currentPath || podcastsPage" class="">ÇALMA LİSTESİ</h2>
          <h2 v-else-if="albumsPage" class="">ALBÜM</h2>
          <h2 v-else-if="singlesPage" class="">SINGLE</h2>
          <h2 v-else-if="episodePage" class="">PODCAST BÖLÜMÜ</h2>
          <h2 v-else-if="podcastShowPage" class="">PODCAST</h2>
          <span>
            <h1
              v-if="currentPath"
              class="w-full sm:text-3xl md:text-5xl xl:text-8xl tracking-tighter py-2"
            >
              Beğenilen Şarkılar
            </h1>
            <h1
              v-else-if="albumsPage"
              class="w-full sm:text-3xl md:text-5xl xl:text-8xl tracking-tighter py-2"
            >
              ALBÜM ADI
            </h1>
            <h1
              v-else-if="singlesPage"
              class="w-full sm:text-3xl md:text-5xl xl:text-8xl tracking-tighter py-2"
            >
              SINGLE ADI
            </h1>
            <h1
              v-else-if="podcastsPage"
              class="w-full sm:text-3xl md:text-5xl xl:text-8xl tracking-tighter py-2"
            >
              Bölümlerin
            </h1>
            <h1
              v-else-if="episodePage"
              class="w-full sm:text-3xl md:text-5xl xl:text-8xl tracking-tighter py-2"
            >
              Nikola Tesla
            </h1>
            <h1
              v-else-if="podcastShowPage"
              class="w-full sm:text-3xl md:text-5xl xl:text-8xl tracking-tighter py-2"
            >
              Podcastin Adı
            </h1>
            <h2 id="info"></h2>
          </span>
          <div
            class="flex flex-wrap mt-2 text-white w-full text-xs sm3:text-sm h-full font-semibold"
          >
            <div class="flex items-center flex-nowrap shrink-0">
              <span v-if="currentPath || podcastsPage" class="mr-2">
                <a href="#">Yusuf Ç.</a>
              </span>
              <span
                v-else-if="albumsPage"
                class="flex items-center justify-around w-[6.2rem]"
              >
                <img
                  src="https://i.scdn.co/image/ab6761610000f1789b494e739143983605696170"
                  alt="sanatçı adı"
                  class="w-[1.6rem] h-[1.6rem] rounded-xl"
                />
                <a href="#">Sanatçı adı</a>
              </span>
              <span
                v-else-if="singlesPage"
                class="flex items-center justify-around w-[6.2rem]"
              >
                <img
                  src="https://i.scdn.co/image/ab6761610000f1789b494e739143983605696170"
                  alt="sanatçı adı"
                  class="w-[1.6rem] h-[1.6rem] rounded-xl"
                />
                <a href="#">Sanatçı adı</a>
              </span>

              <span v-if="currentPath" class="beforeDot"
                >{{ albums.length }} şarkı</span
              >
              <div v-else-if="albumsPage">
                <span class="beforeDot ml-2">2017</span>
                <span class="beforeDot">{{ albums.length }} şarkı,</span>
                <span class="text-sm ml-2 text-opacwhite5">2 sa 10 dk</span>
              </div>
              <div v-else-if="singlesPage">
                <span class="beforeDot ml-2">2017</span>
                <span class="beforeDot">{{ albums.length }} şarkı,</span>
                <span class="text-sm ml-2 text-opacwhite5">3 sa 10 dk</span>
              </div>
              <span v-else-if="podcastsPage" class="beforeDot"
                >{{ albums.length }} bölüm</span
              >
              <span
                v-else-if="episodePage"
                class="flex items-center w-[16.2rem]"
              >
                <a
                  class="hover:underline sm:text-xl md:text-3xl tracking-tighter py-2"
                  href="#"
                  >Podcast Adı</a
                >
              </span>
              <span
                v-else-if="podcastShowPage"
                class="flex items-center w-[16.2rem] text-xl"
                >Podcast sahibinin adı</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="
        currentPath ||
        albumsPage ||
        singlesPage ||
        podcastsPage ||
        episodePage ||
        podcastShowPage
      "
      class="absolute w-full h-[212px] left-0 shrink-0 z-0"
      :class="{
        'bg-gradient-to-b from-purple4  to-dark-1': currentPath,
        'bg-gradient-to-b from-orange3 dark': albumsPage,
        'bg-gradient-to-b from-red3 dark': singlesPage,
        'bg-gradient-to-b from-podcastGreen4 dark': podcastsPage,
        'bg-gradient-to-b from-yellow4 dark': episodePage,
        'bg-gradient-to-b from-purple8 dark': podcastShowPage,
      }"
    ></div>

    <div
      v-if="episodePage"
      class="flex items-center text-opacwhite3 font-semibold text-sm sm:pl-4 sm:pt-6 lg:pl-8"
    >
      <div class="flex items-center">
        <p class="">27 Tem</p>
        <p class="before:content-['·'] before:pl-1">
          <span v-if="!listened" class=""> 47 dk. 12 sn</span>
          <span v-else class=""> Çalındı</span>
        </p>
      </div>
      <div v-if="listened" class="px-2">
        <svg
          role="img"
          height="16"
          width="16"
          class="text-podcastGreen5"
          viewBox="0 0 16 16"
        >
          <path
            fill="currentColor"
            d="M15.53 2.47a.75.75 0 010 1.06L4.907 14.153.47 9.716a.75.75 0 011.06-1.06l3.377 3.376L14.47 2.47a.75.75 0 011.06 0z"
          ></path>
        </svg>
      </div>
      <div v-else class="episode--bar--wrapper ml-3 h-4 flex items-center">
        <div
          id="episode-bar"
          class="group relative w-[5.8rem] max-w-[85px] h-1 bg-opacwhite2 rounded-full"
        >
          <span
            class="absolute bg-white w-[5%] max-w-[85px] h-1 absolute rounded-full"
          >
          </span>
        </div>
      </div>
    </div>

    <div
      v-if="
        currentPath || albumsPage || singlesPage || podcastsPage || episodePage
      "
      class="w-full h-[6.8rem] relative flex items-start py-[24px]"
    >
      <div class="w-full ml-[1.2rem] flex items-center lg:ml-[2rem]">
        <button class="rounded-full bg-green3 p-[0.9rem] cursor-default">
          <span>
            <svg role="img" height="28" width="28" viewBox="0 0 24 24" class="">
              <path
                fill="currentColor"
                d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"
              ></path>
            </svg>
            <svg
              role="img"
              height="28"
              width="28"
              viewBox="0 0 24 24"
              class="hidden"
            >
              <path
                d="M5.7 3a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7H5.7zm10 0a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7h-2.6z"
              ></path>
            </svg>
          </span>
        </button>
        <div v-if="albumsPage || singlesPage">
          <button class="p-[0.9rem] ml-4 mx-1 text-lightest cursor-default">
            <svg role="img" height="32" width="32" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M5.21 1.57a6.757 6.757 0 016.708 1.545.124.124 0 00.165 0 6.741 6.741 0 015.715-1.78l.004.001a6.802 6.802 0 015.571 5.376v.003a6.689 6.689 0 01-1.49 5.655l-7.954 9.48a2.518 2.518 0 01-3.857 0L2.12 12.37A6.683 6.683 0 01.627 6.714 6.757 6.757 0 015.21 1.57zm3.12 1.803a4.757 4.757 0 00-5.74 3.725l-.001.002a4.684 4.684 0 001.049 3.969l.009.01 7.958 9.485a.518.518 0 00.79 0l7.968-9.495a4.688 4.688 0 001.049-3.965 4.803 4.803 0 00-3.931-3.794 4.74 4.74 0 00-4.023 1.256l-.008.008a2.123 2.123 0 01-2.9 0l-.007-.007a4.757 4.757 0 00-2.214-1.194z"
              ></path>
            </svg>
          </button>
          <button
            @click="toggleAlbumOptions"
            class="text-lightest cursor-default w-fit relative"
          >
            <svg
              role="img"
              height="32"
              width="32"
              viewBox="0 0 24 24"
              class="hover:text-white pointer-events-none"
            >
              <path
                fill="currentColor"
                d="M4.5 13.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm15 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm-7.5 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
              ></path>
            </svg>
          </button>
          <AlbumsOptions
            v-if="albumOptions"
            :albumOptions="albumOptions"
            @toggleAlbumOptions="toggleAlbumOptions"
          />
        </div>
        <div v-if="episodePage || podcastShowPage">
          <button
            @click="addCollection"
            class="p-[0.9rem] ml-4 mx-1 text-lightest cursor-default hover:text-white"
          >
            <svg
              role="img"
              height="32"
              width="32"
              viewBox="0 0 24 24"
              :class="{ hidden: !inCollection }"
            >
              <path
                fill="currentColor"
                d="M11.999 3a9 9 0 100 18 9 9 0 000-18zm-11 9c0-6.075 4.925-11 11-11s11 4.925 11 11-4.925 11-11 11-11-4.925-11-11z"
              ></path>
              <path
                fill="currentColor"
                d="M17.999 12a1 1 0 01-1 1h-4v4a1 1 0 11-2 0v-4h-4a1 1 0 110-2h4V7a1 1 0 112 0v4h4a1 1 0 011 1z"
              ></path>
            </svg>
            <svg
              role="img"
              height="32"
              width="32"
              viewBox="0 0 24 24"
              :class="{ hidden: inCollection }"
              class="text-green3"
            >
              <path
                fill="currentColor"
                d="M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12zm16.398-2.38a1 1 0 00-1.414-1.413l-6.011 6.01-1.894-1.893a1 1 0 00-1.414 1.414l3.308 3.308 7.425-7.425z"
              ></path>
            </svg>
          </button>
          <button
            @click="toggleEpisodeOptions"
            class="text-lightest cursor-default w-fit relative hover:text-white"
          >
            <svg
              role="img"
              height="32"
              width="32"
              viewBox="0 0 24 24"
              class="hover:text-white pointer-events-none"
            >
              <path
                fill="currentColor"
                d="M4.5 13.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm15 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm-7.5 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Playlist -->
    <div
      :class="{ 'mx-5': margin || diskografiPage }"
      class="playlistContainer relative h-full min-w-[450]"
    >
      <div
        v-if="favoriteSongs || diskografiPage || albumsPage || singlesPage"
        :class="{
          'sticky top-[64px] lg:pl-[2.2rem]': !diskografiPage,
        }"
        class="w-[100%] presentation py-1 border-b border-opacwhite overflow-hidden pl-[1.4rem]"
        style="z-index: 30"
      >
        <div :class="{ 'mx-5': !margin && !diskografiPage }">
          <div
            :class="{
              'sm:grid-cols-colPreDisco':
                diskografiPage || albumsPage || singlesPage,
              'sm:grid-cols-colPresm md2:grid-cols-colPremd lg2:grid-cols-colPre':
                !diskografiPage && !albumsPage && !singlesPage,
            }"
            class="grid text-lightest text-xs sm3:text-sm items-center min-w-[300px] gap-2"
          >
            <div class="text-lg flex justify-start items-end h-full w-full">
              #
            </div>
            <div class="">BAŞLIK</div>
            <div
              :class="{
                hidden: diskografiPage || albumsPage,
                'md2:block': !diskografiPage && !albumsPage && !singlesPage,
              }"
              class="hidden"
            >
              ALBÜM
            </div>
            <div
              :class="{
                hidden: diskografiPage || albumsPage,
                'lg2:block': !diskografiPage && !albumsPage && !singlesPage,
              }"
              class="hidden"
            >
              TARİH EKLENDİ
            </div>
            <div
              :class="{
                'sm:pr-4 md2:pr-[3.3rem] lg2:ml-4':
                  !diskografiPage && !albumsPage && !singlesPage,

                'sm:pr-14': diskografiPage || albumsPage || singlesPage,
              }"
              class="flex items-center justify-end w-full h-full"
            >
              <div class="flex items-start">
                <svg
                  role="img"
                  height="16"
                  width="16"
                  viewBox="0 0 16 16"
                  class=""
                >
                  <path
                    fill="currentColor"
                    d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8z"
                  ></path>
                  <path
                    fill="currentColor"
                    d="M8 3.25a.75.75 0 01.75.75v3.25H11a.75.75 0 010 1.5H7.25V4A.75.75 0 018 3.25z"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="pt-[10px] w-full">
        <div
          v-if="!podcastsPage && !episodePage && !podcastShowPage"
          class="playlists h-fit w-full text-lightest"
        >
          <slot name="playlistItems">
            <PlaylistItems
              v-for="(album, i) in albums"
              :key="album.id"
              :id="album.id"
              :album="album"
              :index="i"
              :favoriteSongs="currentPath"
              :profile="profile"
              :artistPage="artistPage"
              :margin="margin"
            >
              <template v-slot:trackName
                ><a href="#" @click="toggleSinglesPage">
                  {{ album.trackName }}</a
                ></template
              >
              <template v-slot:artist
                ><a href="#" @click="toggleArtistsPage(msg, $event)">
                  {{ album.artist }}</a
                ></template
              >
              <template v-slot:albumName
                ><a href="#" @click="toggleAlbumsPage">
                  {{ album.albumName }}</a
                ></template
              >
              <template v-slot:favTime>{{ album.favTime }}</template>
              <template v-slot:duration>{{ album.duration }}</template>
            </PlaylistItems>
          </slot>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import PlaylistItems from "./PlaylistItems.vue";
import EpisodeOptions from "../Podcast/EpisodeOptions.vue";

export default {
  name: "Playlist",
  components: { PlaylistItems, EpisodeOptions },
  emits: [
    "toggleHeaderBtn",
    "visToggleHeaderBtn",
    "selectedArtistName",
    "addCollectionE",
  ],
  props: [
    "profile",
    "favoriteSongs",
    "artistPage",
    "diskografiPage",
    "albumsPage",
    "singlesPage",
    "podcastsPage",
    "episodePage",
    "podcastShowPage",
    "listened",
    "inCollection",
    "toggleSinglesPage",
    "toggleArtistPage",
    "toggleAlbumsPage",
    "togglePodcastsPage",
    "toggleEpisodePage",
  ],

  data() {
    return {
      albumOptions: false,
      episodeOptions: false,
      info: "",
      options2: "",
      observer2: null,
      presentation: null,
      headerHeight: document.getElementById("header").getBoundingClientRect()
        .height,
      bodyHeight: document.body.getBoundingClientRect().height,
      bodyWidth: document.body.getBoundingClientRect().width,
      margin: false,
      albums: [
        {
          trackName: "Breathing",
          artist: "Ben Böhmer",
          albumName: "Begin Again",
          duration: "03:25",
          favTime: "13 gün önce",
          id: 1,
        },
        {
          trackName: "Turnalar",
          artist: "Murat Kekilli",
          albumName: "Albüm adı-1",
          duration: "03:25",
          favTime: "13 gün önce",
          id: 2,
        },
        {
          trackName: "Empty Floor",
          artist: "Jan Blomqvist",
          albumName: "Disconnected",
          duration: "03:25",
          favTime: "13 gün önce",
          id: 3,
        },
        {
          trackName: "The Space in Between",
          artist: "Jan Blomqvist",
          albumName: "Albüm adı-2",
          duration: "03:25",
          favTime: "13 gün önce",
          id: 4,
        },

        {
          trackName: "Breathing",
          artist: "Ben Böhmer",
          albumName: "Begin Again",
          duration: "03:25",
          favTime: "13 gün önce",
          id: 5,
        },

        {
          trackName: "Breathing",
          artist: "Ben Böhmer",
          albumName: "Begin Again",
          duration: "03:25",
          favTime: "13 gün önce",
          id: 6,
        },
        {
          trackName: "Breathing",
          artist: "Ben Böhmer",
          albumName: "Begin Again",
          duration: "03:25",
          favTime: "13 gün önce",
          id: 7,
        },
        {
          trackName: "Breathing",
          artist: "Ben Böhmer",
          albumName: "Begin Again",
          duration: "03:25",
          favTime: "13 gün önce",
          id: 8,
        },
        {
          trackName: "Breathing",
          artist: "Ben Böhmer",
          albumName: "Begin Again",
          duration: "03:25",
          favTime: "13 gün önce",
          id: 9,
        },
        {
          trackName: "Breathing",
          artist: "Ben Böhmer",
          albumName: "Begin Again",
          duration: "03:25",
          favTime: "13 gün önce",
          id: 10,
        },
        {
          trackName: "Breathing",
          artist: "Ben Böhmer",
          albumName: "Begin Again",
          duration: "03:25",
          favTime: "13 gün önce",
          id: 11,
        },
        {
          trackName: "Breathing",
          artist: "Ben Böhmer",
          albumName: "Begin Again",
          duration: "03:25",
          favTime: "13 gün önce",
          id: 12,
        },
        {
          trackName: "Breathing",
          artist: "Ben Böhmer",
          albumName: "Begin Again",
          duration: "03:25",
          favTime: "13 gün önce",
          id: 13,
        },
        {
          trackName: "Breathing",
          artist: "Ben Böhmer",
          albumName: "Begin Again",
          duration: "03:25",
          favTime: "13 gün önce",
          id: 14,
        },
        {
          trackName: "Breathing",
          artist: "Ben Böhmer",
          albumName: "Begin Again",
          duration: "03:25",
          favTime: "13 gün önce",
          id: 15,
        },
        {
          trackName: "Breathing",
          artist: "Ben Böhmer",
          albumName: "Begin Again",
          duration: "03:25",
          favTime: "13 gün önce",
          id: 16,
        },
        {
          trackName: "Breathing",
          artist: "Ben Böhmer",
          albumName: "Begin Again",
          duration: "03:25",
          favTime: "13 gün önce",
          id: 17,
        },
        {
          trackName: "Breathing",
          artist: "Ben Böhmer",
          albumName: "Begin Again",
          duration: "03:25",
          favTime: "13 gün önce",
          id: 1,
        },
        {
          trackName: "Turnalar",
          artist: "Murat Kekilli",
          albumName: "Albüm adı-1",
          duration: "03:25",
          favTime: "13 gün önce",
          id: 2,
        },
        {
          trackName: "Empty Floor",
          artist: "Jan Blomqvist",
          albumName: "Disconnected",
          duration: "03:25",
          favTime: "13 gün önce",
          id: 3,
        },
        {
          trackName: "The Space in Between",
          artist: "Jan Blomqvist",
          albumName: "Albüm adı-2",
          duration: "03:25",
          favTime: "13 gün önce",
          id: 4,
        },

        {
          trackName: "Breathing",
          artist: "Ben Böhmer",
          albumName: "Begin Again",
          duration: "03:25",
          favTime: "13 gün önce",
          id: 5,
        },

        {
          trackName: "Breathing",
          artist: "Ben Böhmer",
          albumName: "Begin Again",
          duration: "03:25",
          favTime: "13 gün önce",
          id: 6,
        },
        {
          trackName: "Breathing",
          artist: "Ben Böhmer",
          albumName: "Begin Again",
          duration: "03:25",
          favTime: "13 gün önce",
          id: 7,
        },
        {
          trackName: "Breathing",
          artist: "Ben Böhmer",
          albumName: "Begin Again",
          duration: "03:25",
          favTime: "13 gün önce",
          id: 8,
        },
        {
          trackName: "Breathing",
          artist: "Ben Böhmer",
          albumName: "Begin Again",
          duration: "03:25",
          favTime: "13 gün önce",
          id: 9,
        },
        {
          trackName: "Breathing",
          artist: "Ben Böhmer",
          albumName: "Begin Again",
          duration: "03:25",
          favTime: "13 gün önce",
          id: 10,
        },
        {
          trackName: "Breathing",
          artist: "Ben Böhmer",
          albumName: "Begin Again",
          duration: "03:25",
          favTime: "13 gün önce",
          id: 11,
        },
        {
          trackName: "Breathing",
          artist: "Ben Böhmer",
          albumName: "Begin Again",
          duration: "03:25",
          favTime: "13 gün önce",
          id: 12,
        },
        {
          trackName: "Breathing",
          artist: "Ben Böhmer",
          albumName: "Begin Again",
          duration: "03:25",
          favTime: "13 gün önce",
          id: 13,
        },
        {
          trackName: "Breathing",
          artist: "Ben Böhmer",
          albumName: "Begin Again",
          duration: "03:25",
          favTime: "13 gün önce",
          id: 14,
        },
        {
          trackName: "Breathing",
          artist: "Ben Böhmer",
          albumName: "Begin Again",
          duration: "03:25",
          favTime: "13 gün önce",
          id: 15,
        },
        {
          trackName: "Breathing",
          artist: "Ben Böhmer",
          albumName: "Begin Again",
          duration: "03:25",
          favTime: "13 gün önce",
          id: 16,
        },
        {
          trackName: "Breathing",
          artist: "Ben Böhmer",
          albumName: "Begin Again",
          duration: "03:25",
          favTime: "13 gün önce",
          id: 17,
        },
      ],
    };
  },
  methods: {
    toggleAlbumOptions() {
      this.albumOptions = !this.albumOptions;
    },
    toggleEpisodeOptions() {
      this.episodeOptions = !this.episodeOptions;
    },
    addCollection() {
      this.inCollection
        ? this.$emit("addCollectionE", false)
        : this.$emit("addCollectionE", true);
    },
    ifInCollection(val) {
      return val ? "block" : "hidden";
    },
    toggleAlbumOptions(val) {
      this.albumOptions = val;
    },
    toggleArtistsPage(_, e) {
      console.log(e.target.textContent);
      this.toggleArtistPage();
      this.$emit("selectedArtistName", e.target.textContent);
    },

    resizeOption2(options) {
      if (window.innerHeight <= 64) {
        this.info = window.innerHeight;
        this.bodyHeight = +window.innerHeight;
        return;
      }

      this.info = window.innerHeight;
      this.bodyHeight = +window.innerHeight;
      this.bodyWidth = +window.innerWidth;

      document.getElementById("info").textContent = this.info;

      this.observer2 ? this.observer2.unobserve(this.presentation) : "";

      return options;
    },
  },
  computed: {
    currentPath() {
      return this.$route.path === "/collection/tracks"
        ? "favoriteSongs"
        : this.$route.path === "/collection/episodes"
        ? "episodes"
        : false;
    },
  },
  watch: {
    bodyHeight(newVal, oldVal) {
      if (newVal !== oldVal) {
        console.log("height çalıştı");
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
  },

  mounted() {
    window.addEventListener("resize", this.resizeOption2);

    console.log("favSongs Mounted");
    console.log(this.bodyHeight);
    this.$emit("visToggleHeaderBtn", true);

    this.presentation = document.querySelector(".presentation");
    this.body = document.body;
    this.header = document.getElementById("header");
    this.favSongEl = document.getElementById("favoriteSongs");

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
        ? this.$emit("toggleHeaderBtn", false)
        : this.$emit("toggleHeaderBtn", true);
    }, this.options);

    this.observer.observe(this.favSongEl);

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
        console.log("intersect", obs);
        this.presentation.classList.add("prebg");
        this.margin = false;
      } else {
        console.log("notintersect", obs);
        this.presentation.classList.remove("prebg");
        this.margin = true;
      }
    }, this.options2);

    this.observer2.observe(this.presentation);
  },

  beforeUnmount() {
    window.removeEventListener("resize", this.resizeOption2);
    this.observer.unobserve(this.favSongEl);
    this.observer2.unobserve(this.presentation);
    this.presentation.classList.remove("prebg");
    this.header.classList.remove("fav-songs-intersec-bg1");
    this.header.classList.remove("fav-songs-intersec-bg2");
    this.$emit("visToggleHeaderBtn", false);
    this.margin = true;
  },
};
</script>

<style>
.prebg {
  background-color: rgb(24, 24, 24);
}
hr {
  display: block;
  unicode-bidi: isolate;
  margin-block-start: 0.5em;
  margin-block-end: 0.5em;
  margin-inline-start: auto;
  margin-inline-end: auto;
  overflow: hidden;
  border-style: inset;
  border-width: 1px;
  border-color: rgba(255, 255, 255, 0.1);
}
</style>

<!-- if (
				this.bodyWidth > document.body.getBoundingClientRect().width ||
				this.bodyWidth < document.body.getBoundingClientRect().width
			) {
				this.widthWatcher = false;
			} -->
