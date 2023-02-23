<template>
  <section class="box-border">
    <div
      id="profile"
      class="p-5 max-h-[800px] min-h-[280px] w-full mt-[-64px] relative"
      style="height: 340px; background-image: linear-gradient(to bottom, rgb(83, 83, 83), rgb(32, 32, 32);"
    >
      <div class="flex items-end justify-start h-full lg:ml-[1rem]">
        <div
          class="bg-dark2 rounded-full p-5 h-[192px] w-[192px] sm:w-[192px] sm:min-w-[192px] xl:h-[232px] xl:w-[232px] xl:min-w-[232px] shadow-[0_8px_75px_15px_rgba(0,0,0,0.35)]"
        >
          <div
            class="group flex flex-col items-center justify-center h-full w-full text-lightest cursor-default mt-[-0.5rem]"
          >
            <svg
              role="img"
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
              role="img"
              height="48"
              width="48"
              aria-hidden="true"
              viewBox="0 0 24 24"
              class="hidden group-hover:block mt-5"
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
          class="flex flex-col h-[65%] items-start justify-end text-white px-6"
        >
          <h2 class="text-[12px] leading-4 font-semibold">PROFİL</h2>
          <h1
            class="w-full my-2 text-5xl md:text-7xl xl:text-9xl tracking-tighter py-2 font-extrabold whitespace-nowrap"
          >
            Yusuf Ç.
          </h1>

          <div>
            <span class="mr-2"> 4 Takip Ediliyor </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Diğer Seçenekler -->
    <div
      class="absolute w-full h-[212px] left-0 shrink-0 z-0"
      style="background-image: linear-gradient(to bottom, rgba(33, 33, 33,0.5), rgba(0, 0, 0,0.1)"
    ></div>

    <div class="w-full h-[3.8rem] relative flex flex-col items-start py-[24px]">
      <div class="w-full ml-[1.2rem] lg:ml-[2rem]">
        <ProfileOptions />
      </div>
    </div>

    <!-- en çok dinlenilenilen sanatçılar -->

    <section class="p-5 lg:ml-[1rem]">
      <div class="relative">
        <div class="flex justify-between items-stretch h-[3.3rem]">
          <div class="h-fit flex-end">
            <h2
              class="text-[1.5rem] text-white leading-7 tracking-tight hover:underline hover:text-underline-offset-8 font-semibold cursor-pointer"
            >
              Bu ayın en çok dinlenen sanatçıları
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

        <!-- Cards -->
        <div
          class="relative grid grid-cols-3 md:grid-cols-col100 gap-x-6 grid-rows-1 auto-rows-0 overflow-hidden"
        >
          <div
            class="bg-dark1 hover:bg-opacblack1 ease duration-300 w-full h-auto cursor-pointer rounded-md flex-1 isolate p-4 relative"
          >
            <div class="h-full group">
              <div class="w-full mb-5 relative">
                <img
                  class="h-full w-full object-cover rounded-full"
                  src="https://i.scdn.co/image/ab676161000051744427d7dc65eb8194d2d80f11"
                  alt=""
                />
                <div
                  class="right-0 bottom-0 p-2 absolute flex items-center right-0 bottom-0 py-1 px-2 group-hover:block opacity-0 group-hover:opacity-100 transition ease-in duration-200 group-hover:translate-y-[-0.4rem]"
                >
                  <button
                    class="p-3 bg-green rounded-full cursor-default lg:group-hover:block hover:scale-110 shadow-[0px_5px_6px_2px_rgba(0,0,0,0.4)]"
                  >
                    <span>
                      <svg
                        role="img"
                        height="24"
                        width="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="text-black"
                          d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"
                        ></path>
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
              <div class="flex items-middle flex-col justify-center">
                <div class="text-white max-w-full truncate">Glückskind</div>
                <div class="text-sm text-lightest w-full truncate">Sanatçı</div>
              </div>
            </div>
          </div>

          <div
            class="bg-dark1 hover:bg-opacblack1 ease duration-300 w-full h-auto cursor-pointer rounded-md flex-1 isolate p-4 relative"
          >
            <div class="h-full group">
              <div class="w-full mb-5 relative">
                <img
                  class="h-full w-full object-cover rounded-full"
                  src="	https://i.scdn.co/image/ab6761610000517422d5b3657e51eaaa0ea3c2d3"
                  alt=""
                />
                <div
                  class="right-0 bottom-0 p-2 absolute flex items-center right-0 bottom-0 py-1 px-2 group-hover:block opacity-0 group-hover:opacity-100 transition ease-in duration-200 group-hover:translate-y-[-0.4rem]"
                >
                  <button
                    class="p-3 bg-green rounded-full cursor-default lg:group-hover:block hover:scale-110 shadow-[0px_5px_6px_2px_rgba(0,0,0,0.4)]"
                  >
                    <span>
                      <svg
                        role="img"
                        height="24"
                        width="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="text-black"
                          d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"
                        ></path>
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
              <div class="flex items-middle flex-col justify-center">
                <div class="text-white max-w-full truncate">
                  Twilight Music Sculpture
                </div>
                <div class="text-sm text-lightest w-full truncate">Sanatçı</div>
              </div>
            </div>
          </div>

          <div
            class="bg-dark1 hover:bg-opacblack1 ease duration-300 w-full h-auto cursor-pointer rounded-md flex-1 isolate p-4 relative"
          >
            <div class="h-full group">
              <div class="w-full mb-5 relative">
                <img
                  class="h-full w-full object-cover rounded-full"
                  src="https://i.scdn.co/image/ab67616100005174a8a48c12973f1621a9eea81d"
                  alt=""
                />
                <div
                  class="right-0 bottom-0 p-2 absolute flex items-center right-0 bottom-0 py-1 px-2 group-hover:block opacity-0 group-hover:opacity-100 transition ease-in duration-200 group-hover:translate-y-[-0.4rem]"
                >
                  <button
                    class="p-3 bg-green rounded-full cursor-default lg:group-hover:block hover:scale-110 shadow-[0px_5px_6px_2px_rgba(0,0,0,0.4)]"
                  >
                    <span>
                      <svg
                        role="img"
                        height="24"
                        width="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="text-black"
                          d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"
                        ></path>
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
              <div class="flex items-middle flex-col justify-center">
                <div class="text-white max-w-full truncate">Ben Böhmer</div>
                <div class="text-sm text-lightest w-full truncate">Sanatçı</div>
              </div>
            </div>
          </div>

          <div
            class="bg-dark1 hover:bg-opacblack1 ease duration-300 w-full h-auto cursor-pointer rounded-md flex-1 isolate p-4 relative"
          >
            <div class="h-full group">
              <div class="w-full mb-5 relative">
                <img
                  class="h-full w-full object-cover rounded-full"
                  src="https://i.scdn.co/image/ab67616100005174f1853b674364d4b6c7638d14"
                  alt=""
                />
                <div
                  class="right-0 bottom-0 p-2 absolute flex items-center right-0 bottom-0 py-1 px-2 group-hover:block opacity-0 group-hover:opacity-100 transition ease-in duration-200 group-hover:translate-y-[-0.4rem]"
                >
                  <button
                    class="p-3 bg-green rounded-full cursor-default lg:group-hover:block hover:scale-110 shadow-[0px_5px_6px_2px_rgba(0,0,0,0.4)]"
                  >
                    <span>
                      <svg
                        role="img"
                        height="24"
                        width="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="text-black"
                          d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"
                        ></path>
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
              <div class="flex items-middle flex-col justify-center">
                <div class="text-white max-w-full truncate">Jan Blomqvist</div>
                <div class="text-sm text-lightest w-full truncate">Sanatçı</div>
              </div>
            </div>
          </div>
        </div>
      </div>
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

      <div class="mt-[1rem]">
        <PlaylistItems
          v-for="(track, i) in mostListen"
          :key="track.id"
          :index="i"
          :profile="profile"
        >
          <template #trackName>{{ track.trackName }}</template>
          <template #artist>{{ track.artist }}</template>
          <template #albumName>{{ track.albumName }}</template>
          <template #duration>{{ track.duration }}</template>
        </PlaylistItems>
      </div>
    </section>

    <!-- takip ediliyor -->

    <section class="p-5 lg:ml-[1rem]">
      <div class="relative">
        <div class="flex justify-between items-stretch h-[3.3rem]">
          <div class="h-fit flex-end">
            <h2
              class="text-[1.5rem] text-white leading-7 tracking-tight hover:underline hover:text-underline-offset-8 font-semibold cursor-pointer"
            >
              Takip Ediliyor
            </h2>
          </div>
          <div class="self-end">
            <h6
              class="h-full md:text-[12px] text-[10px] font-semibold leading-10 text-lightest hover:underline hover:text-white underline-offset-2 uppercase cursor-pointer"
            >
              HEPSİNİ GÖR
            </h6>
          </div>
        </div>

        <!-- Cards -->
        <div
          class="relative grid grid-cols-3 md:grid-cols-col100 gap-x-6 grid-rows-1 auto-rows-0 overflow-hidden"
        >
          <div
            class="bg-dark1 hover:bg-opacblack1 ease duration-300 w-full h-auto cursor-pointer rounded-md flex-1 isolate p-4 relative"
          >
            <div class="h-full group">
              <div class="w-full mb-5 relative">
                <img
                  class="h-full w-full object-cover rounded-full"
                  src="https://i.scdn.co/image/ab676161000051744427d7dc65eb8194d2d80f11"
                  alt=""
                />
                <div
                  class="right-0 bottom-0 p-2 absolute flex items-center right-0 bottom-0 py-1 px-2 group-hover:block opacity-0 group-hover:opacity-100 transition ease-in duration-200 group-hover:translate-y-[-0.4rem]"
                >
                  <button
                    class="p-3 bg-green rounded-full cursor-default lg:group-hover:block hover:scale-110 shadow-[0px_5px_6px_2px_rgba(0,0,0,0.4)]"
                  >
                    <span>
                      <svg
                        role="img"
                        height="24"
                        width="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="text-black"
                          d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"
                        ></path>
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
              <div class="flex items-middle flex-col justify-center">
                <div class="text-white max-w-full truncate">Glückskind</div>
                <div class="text-sm text-lightest w-full truncate">Sanatçı</div>
              </div>
            </div>
          </div>

          <div
            class="bg-dark1 hover:bg-opacblack1 ease duration-300 w-full h-auto cursor-pointer rounded-md flex-1 isolate p-4 relative"
          >
            <div class="h-full group">
              <div class="w-full mb-5 relative">
                <img
                  class="h-full w-full object-cover rounded-full"
                  src="	https://i.scdn.co/image/ab6761610000517422d5b3657e51eaaa0ea3c2d3"
                  alt=""
                />
                <div
                  class="right-0 bottom-0 p-2 absolute flex items-center right-0 bottom-0 py-1 px-2 group-hover:block opacity-0 group-hover:opacity-100 transition ease-in duration-200 group-hover:translate-y-[-0.4rem]"
                >
                  <button
                    class="p-3 bg-green rounded-full cursor-default lg:group-hover:block hover:scale-110 shadow-[0px_5px_6px_2px_rgba(0,0,0,0.4)]"
                  >
                    <span>
                      <svg
                        role="img"
                        height="24"
                        width="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="text-black"
                          d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"
                        ></path>
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
              <div class="flex items-middle flex-col justify-center">
                <div class="text-white max-w-full truncate">
                  Twilight Music Sculpture
                </div>
                <div class="text-sm text-lightest w-full truncate">Sanatçı</div>
              </div>
            </div>
          </div>

          <div
            class="bg-dark1 hover:bg-opacblack1 ease duration-300 w-full h-auto cursor-pointer rounded-md flex-1 isolate p-4 relative"
          >
            <div class="h-full group">
              <div class="w-full mb-5 relative">
                <img
                  class="h-full w-full object-cover rounded-full"
                  src="https://i.scdn.co/image/ab67616100005174a8a48c12973f1621a9eea81d"
                  alt=""
                />
                <div
                  class="right-0 bottom-0 p-2 absolute flex items-center right-0 bottom-0 py-1 px-2 group-hover:block opacity-0 group-hover:opacity-100 transition ease-in duration-200 group-hover:translate-y-[-0.4rem]"
                >
                  <button
                    class="p-3 bg-green rounded-full cursor-default lg:group-hover:block hover:scale-110 shadow-[0px_5px_6px_2px_rgba(0,0,0,0.4)]"
                  >
                    <span>
                      <svg
                        role="img"
                        height="24"
                        width="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="text-black"
                          d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"
                        ></path>
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
              <div class="flex items-middle flex-col justify-center">
                <div class="text-white max-w-full truncate">Ben Böhmer</div>
                <div class="text-sm text-lightest w-full truncate">Sanatçı</div>
              </div>
            </div>
          </div>

          <div
            class="bg-dark1 hover:bg-opacblack1 ease duration-300 w-full h-auto cursor-pointer rounded-md flex-1 isolate p-4 relative"
          >
            <div class="h-full group">
              <div class="w-full mb-5 relative">
                <img
                  class="h-full w-full object-cover rounded-full"
                  src="https://i.scdn.co/image/ab67616100005174f1853b674364d4b6c7638d14"
                  alt=""
                />
                <div
                  class="right-0 bottom-0 p-2 absolute flex items-center right-0 bottom-0 py-1 px-2 group-hover:block opacity-0 group-hover:opacity-100 transition ease-in duration-200 group-hover:translate-y-[-0.4rem]"
                >
                  <button
                    class="p-3 bg-green rounded-full cursor-default lg:group-hover:block hover:scale-110 shadow-[0px_5px_6px_2px_rgba(0,0,0,0.4)]"
                  >
                    <span>
                      <svg
                        role="img"
                        height="24"
                        width="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="text-black"
                          d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"
                        ></path>
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
              <div class="flex items-middle flex-col justify-center">
                <div class="text-white max-w-full truncate">Jan Blomqvist</div>
                <div class="text-sm text-lightest w-full truncate">Sanatçı</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section>
        <Info />
      </section>
    </section>
  </section>
</template>

<script>
import PlaylistItems from "../FavoriteSongs/PlaylistItems.vue";
import ProfileOptions from "./ProfileOptions.vue";
import Info from "../SpotifyInfo/Info.vue";

export default {
  components: { PlaylistItems, ProfileOptions, Info },
  emits: ["visToggleHeaderProfile", "toggleHeaderProfile"],
  data() {
    return {
      profile: true,
      mostListen: [
        {
          trackName: "STAY1",
          artist: "dsfsdfsd",
          albumName: "album adı1",
          duration: "05:12",
          favTime: "12 gün önce",
          id: 1,
        },
        {
          trackName: "STAY2",
          artist: "asddsf",
          albumName: "album adı2",
          duration: "05:12",
          favTime: "12 gün önce",
          id: 2,
        },
        {
          trackName: "STAY3",
          artist: "sdfsdfa",
          albumName: "album adı3",
          duration: "05:12",
          favTime: "12 gün önce",
          id: 3,
        },
        {
          trackName: "STAY4",
          artist: "234dsasd",
          albumName: "album adı4",
          duration: "05:12",
          favTime: "12 gün önce",
          id: 4,
        },
        {
          trackName: "STAY5",
          artist: "qweqwsada2",
          albumName: "album adı5",
          duration: "05:12",
          favTime: "12 gün önce",
          id: 5,
        },
      ],
    };
  },
  mounted() {
    console.log("profile Mounted");
    this.profile = true;
    this.$emit("visToggleHeaderProfile", true);

    this.header = document.getElementById("header");
    this.profileEl = document.getElementById("profile");

    this.options = {
      root: null,
      threshold: [0.1, 0.4],
    };
    this.headerHeight = document
      .getElementById("header")
      .getBoundingClientRect().height;

    console.log(this.headerHeight);
    console.log(this.profileEl);

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
        ? this.$emit("toggleHeaderProfile", false)
        : this.$emit("toggleHeaderProfile", true);
    }, this.options);
    console.log(this.observer);

    this.observer.observe(this.profileEl);
  },
  beforeUnmount() {
    this.observer.unobserve(this.profileEl);
    this.header.classList.remove("profile-intersec-bg1");
    this.header.classList.remove("profile-intersec-bg2");
    this.$emit("visToggleHeaderProfile", false);
    this.profileOptions = false;
    this.profile = false;
  },
};
</script>

<style></style>
