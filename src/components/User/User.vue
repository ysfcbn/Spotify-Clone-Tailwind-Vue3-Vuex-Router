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
            class="absolute left-0 top-0 object-cover rounded-full group-hover:opacity-20"
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
              class="relative z-100 hidden group-hover:block mt-5"
            >
              <path
                fill="white"
                d="M17.318 1.975a3.329 3.329 0 114.707 4.707L8.451 20.256c-.49.49-1.082.867-1.735 1.103L2.34 22.94a1 1 0 01-1.28-1.28l1.581-4.376a4.726 4.726 0 011.103-1.735L17.318 1.975zm3.293 1.414a1.329 1.329 0 00-1.88 0L5.159 16.963c-.283.283-.5.624-.636 1l-.857 2.372 2.371-.857a2.726 2.726 0 001.001-.636L20.611 5.268a1.329 1.329 0 000-1.879z"
              ></path>
            </svg>
            <span class="hidden group-hover:block text-white mt-1 text-base"
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
                Herkese Açık {{ publicPlaylists.length }} Çalma Listesi
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
          <UserOptions />
        </div>
      </div>
    </div>

    <div v-if="isMyUserPage">
      <!-- en çok dinlenilenilen sanatçılar -->
      <section class="p-5 lg:ml-[1rem]">
        <Card
          @click="openArtist(msg, $event)"
          :userPage="userPage"
          :currentData="currentUserTopArtists"
        >
          <template #cardTitle>Bu ayın en çok dinlenen sanatçıları</template>

          <template #imgContainer="{ data }">
            <div class="w-full relative mb-5">
              <img
                class="h-full w-full object-cover rounded-full"
                :src="data?.images[0]?.url"
                alt="image"
              />
              <div
                class="right-0 bottom-0 absolute flex items-center py-1 px-2 group-hover:block opacity-0 group-hover:opacity-100 transition ease-in duration-200 group-hover:translate-y-[-0.4rem]"
              >
                <button
                  id="playBtn"
                  class="p-3 bg-green3 rounded-full cursor-default lg:group-hover:block hover:scale-110 shadow-[0px_5px_6px_2px_rgba(0,0,0,0.4)]"
                >
                  <span>
                    <svg role="img" height="24" width="24" viewBox="0 0 24 24">
                      <path
                        fill="text-black"
                        d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"
                      ></path>
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </template>
          <template #firstTitle="{ data }">{{ data.name }}</template>
          <template #secondTitle="{ data }"
            ><span>{{ data.type }}</span>
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
            :userPage="userPage"
            :topTracks="topTracks"
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
      <Card @click="openPlaylist(msg, $event)" :currentData="publicPlaylists">
        <template #cardTitle>Herkese Açık Çalma Listesi</template>
        <template #imgContainer="{ data }">
          <div class="w-full relative mb-5">
            <img
              class="h-full w-full object-cover rounded-full"
              :src="data?.images[0]?.url"
              alt="image"
            />
            <div
              class="right-0 bottom-0 absolute flex items-center py-1 px-2 group-hover:block opacity-0 group-hover:opacity-100 transition ease-in duration-200 group-hover:translate-y-[-0.4rem]"
            >
              <button
                id="playBtn"
                class="p-3 bg-green3 rounded-full cursor-default lg:group-hover:block hover:scale-110 shadow-[0px_5px_6px_2px_rgba(0,0,0,0.4)]"
              >
                <span>
                  <svg role="img" height="24" width="24" viewBox="0 0 24 24">
                    <path
                      fill="text-black"
                      d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"
                    ></path>
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </template>
        <template #firstTitle="{ data }">{{ data.name }}</template>
        <template #secondTitle="{ data }"
          ><span v-if="totalFollowers[data.id] !== 0"
            >{{ totalFollowers[data.id] }} Takipçi</span
          >
        </template>
      </Card>
    </section>

    <!-- takip ediliyor -->
    <section class="p-5 lg:ml-[1rem]">
      <Card
        :artists="true"
        @click="openArtist(msg, $event)"
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
    allFavTracks() {
      return this.$store.getters["favTracks/getTracks"].items;
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
          console.log(data);
          this.$store.dispatch("users/userPlaylists", data);
        })
        .catch((err) => console.log(err));
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
          console.log(data);
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
          console.log(data.status);
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
          console.log(data.status);
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

    openArtist(_, event) {
      if (event.target.closest("#playBtn")?.id === "playBtn") {
        console.log("toggle Play/Stop Users");
      } else {
        const selectedID = event.target.closest(".card--container").id;
        console.log(selectedID);
        this.$router.push({ name: "artist", params: { id: selectedID } });
      }
    },

    openPlaylist(_, event) {
      if (event.target.closest("#playBtn")?.id === "playBtn") {
        console.log("toggle Play/Stop Users");
      } else {
        const selectedID = event.target.closest(".card--container").id;
        console.log(selectedID);
        this.$router.push({ name: "playlist", params: { id: selectedID } });
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
            console.log(data);
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
      await this.fetchTopArtists();
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

    console.log(this.headerHeight);
    console.log(this.userEl);

    this.observer = new IntersectionObserver((entries) => {
      console.log(entries);
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

    this.observer.observe(this.userEl);
  },
  beforeUnmount() {
    this.observer.unobserve(this.userEl);
    this.header.classList.remove("profile-intersec-bg1");
    this.header.classList.remove("profile-intersec-bg2");
    this.$store.dispatch("users/clearTracksID");

    this.userOptions = false;
    this.userPage = false;
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
