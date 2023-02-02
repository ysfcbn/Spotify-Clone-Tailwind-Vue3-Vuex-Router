<template>
  <div class="flex flex-col min-w-[36%] shrink-0">
    <div class="flex justify-center mb-2 w-full">
      <div class="flex justify-between text-lightest w-14 mr-6">
        <button class="cursor-default">
          <svg
            role="img"
            height="14"
            width="14"
            viewBox="0 0 16 16"
            class="hover:text-white"
          >
            <path
              fill="currentColor"
              d="M13.151.922a.75.75 0 10-1.06 1.06L13.109 3H11.16a3.75 3.75 0 00-2.873 1.34l-6.173 7.356A2.25 2.25 0 01.39 12.5H0V14h.391a3.75 3.75 0 002.873-1.34l6.173-7.356a2.25 2.25 0 011.724-.804h1.947l-1.017 1.018a.75.75 0 001.06 1.06L15.98 3.75 13.15.922zM.391 3.5H0V2h.391c1.109 0 2.16.49 2.873 1.34L4.89 5.277l-.979 1.167-1.796-2.14A2.25 2.25 0 00.39 3.5z"
            ></path>
            <path
              fill="currentColor"
              d="M7.5 10.723l.98-1.167.957 1.14a2.25 2.25 0 001.724.804h1.947l-1.017-1.018a.75.75 0 111.06-1.06l2.829 2.828-2.829 2.828a.75.75 0 11-1.06-1.06L13.109 13H11.16a3.75 3.75 0 01-2.873-1.34l-.787-.938z"
            ></path>
          </svg>
        </button>

        <button
          @mousedown="leftClick = true"
          @mouseup="leftClick = false"
          @click="skipToPrevTrack"
          class="cursor-default"
        >
          <svg
            role="img"
            height="14"
            width="14"
            viewBox="0 0 16 16"
            :class="{
              'text-lightest': leftClick,
              'hover:text-white': !leftClick,
            }"
          >
            <path
              fill="currentColor"
              d="M3.3 1a.7.7 0 01.7.7v5.15l9.95-5.744a.7.7 0 011.05.606v12.575a.7.7 0 01-1.05.607L4 9.149V14.3a.7.7 0 01-.7.7H1.7a.7.7 0 01-.7-.7V1.7a.7.7 0 01.7-.7h1.6z"
            ></path>
          </svg>
        </button>
      </div>

      <button
        @mousedown="leftClick = true"
        @mouseup="leftClick = false"
        @click="playCurrentTrack"
        id="playBtn"
        class="items-center bg-white rounded-full w-fit p-[9px] cursor-default text-dark"
        :class="{
          'scale-[1]': leftClick,
          'hover:scale-106': !leftClick,
        }"
      >
        <svg
          v-if="!isPlaying"
          role="img"
          height="14"
          width="14"
          viewBox="0 0 16 16"
        >
          <path
            fill="currentColor"
            d="M3 1.713a.7.7 0 011.05-.607l10.89 6.288a.7.7 0 010 1.212L4.05 14.894A.7.7 0 013 14.288V1.713z"
          ></path>
        </svg>

        <svg v-else role="img" height="14" width="14" viewBox="0 0 16 16">
          <path
            fill="currentColor"
            d="M2.7 1a.7.7 0 00-.7.7v12.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V1.7a.7.7 0 00-.7-.7H2.7zm8 0a.7.7 0 00-.7.7v12.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V1.7a.7.7 0 00-.7-.7h-2.6z"
          ></path>
        </svg>
      </button>

      <div class="flex justify-between w-14 text-lightest ml-6">
        <button
          @mousedown="leftClick = true"
          @mouseup="leftClick = false"
          @click="skipToNextTrack"
          class="cursor-default"
        >
          <svg
            :class="{
              'text-lightest': leftClick,
              'hover:text-white': !leftClick,
            }"
            role="img"
            height="14"
            width="14"
            viewBox="0 0 16 16"
          >
            <path
              fill="currentColor"
              d="M12.7 1a.7.7 0 00-.7.7v5.15L2.05 1.107A.7.7 0 001 1.712v12.575a.7.7 0 001.05.607L12 9.149V14.3a.7.7 0 00.7.7h1.6a.7.7 0 00.7-.7V1.7a.7.7 0 00-.7-.7h-1.6z"
            ></path>
          </svg>
        </button>
        <button class="cursor-default">
          <svg
            class="hover:text-white"
            role="img"
            height="14"
            width="14"
            viewBox="0 0 16 16"
          >
            <path
              fill="currentColor"
              d="M0 4.75A3.75 3.75 0 013.75 1h8.5A3.75 3.75 0 0116 4.75v5a3.75 3.75 0 01-3.75 3.75H9.81l1.018 1.018a.75.75 0 11-1.06 1.06L6.939 12.75l2.829-2.828a.75.75 0 111.06 1.06L9.811 12h2.439a2.25 2.25 0 002.25-2.25v-5a2.25 2.25 0 00-2.25-2.25h-8.5A2.25 2.25 0 001.5 4.75v5A2.25 2.25 0 003.75 12H5v1.5H3.75A3.75 3.75 0 010 9.75v-5z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
    <!-- track bar -->
    <div
      class="flex items-center justify-around text-lightest text-sm min-w-[17rem]"
    >
      <div class="text-[11px] mr-2 w-[1.5rem]">
        {{ trackDurationFunc((duration = trackSeek)) }}
      </div>
      <div v-if="isStarwarsAlbum" class="w-[5.2rem] h-full z-20 flex-none">
        <button
          @click="changeBladeIcon"
          class="cursor-default"
          id="saber"
          :style="{
            '--saberImg': `url(${starWarsBarIcons[`${index}`].url})`,
          }"
        ></button>
      </div>
      <div
        :class="{ 'h-[8px]': isStarwarsAlbum, 'h-1': !isStarwarsAlbum }"
        class="progress--bar--container relative group w-full bg-lightest/40 rounded-full"
      >
        <span
          id="progress--bar"
          :style="styleObject"
          :class="{
            'h-[8px]': isStarwarsAlbum,
            'h-1 bg-white': !isStarwarsAlbum,
          }"
          class="absolute rounded-full group-hover:bg-green3"
        >
          <span
            :class="{
              'top-[-2px]': isStarwarsAlbum,
              'top-[-4px]': !isStarwarsAlbum,
            }"
            class="block invisible group-hover:visible bg-white absolute w-[12px] h-[12px] rounded-full right-[-5px]"
          ></span>
        </span>
      </div>
      <div class="text-[11px] ml-2">
        {{ trackDurationFunc((duration = trackDuration)) }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlayController",
  props: [],
  data() {
    return {
      leftClick: false,
      index: 0,
      progressBarWidth: "0%",
      starWarsBarIcons: [
        {
          id: 0,
          url: "https://open.spotifycdn.com/cdn/images/sw_saber_anakin.46a12813.png",
          edgeColor: "rgb(55, 132, 214)",
          blurColor: "#2e77d0",
        },
        {
          id: 1,
          url: "https://open.spotifycdn.com/cdn/images/sw_saber_luke.170f9698.png",
          edgeColor: "rgb(135, 220, 90)",
          blurColor: "#1ed760",
        },
        {
          id: 2,
          url: "https://open.spotifycdn.com/cdn/images/sw_saber_vader.78296917.png",
          edgeColor: "rgb(229, 17, 21)",
          blurColor: "#cd1a2b",
        },
        {
          id: 3,
          url: "https://open.spotifycdn.com/cdn/images/sw_saber_rey.b4a2ccc1.png",
          edgeColor: "rgb(249, 164, 11)",
          blurColor: " rgb(253, 175, 33)",
        },
        {
          id: 4,
          url: "https://open.spotifycdn.com/cdn/images/sw_saber_leia.47a0ef84.png",
          edgeColor: "rgb(55, 132, 214)",
          blurColor: "#2e77d0",
        },
        {
          id: 5,
          url: "https://open.spotifycdn.com/cdn/images/sw_saber_mace.de90025a.png",
          edgeColor: "rgb(90, 22, 167)",
          blurColor: "rgb(172, 57, 193)",
        },
        {
          id: 6,
          url: "https://open.spotifycdn.com/cdn/images/sw_saber_ahsoka1.dd3102a7.png",
          edgeColor: "rgb(255,255,255)",
          blurColor: "rgb(255,255,255)",
        },
      ],
    };
  },
  computed: {
    getCurrentlyPlayingTrack() {
      return this.$store.getters["controller/getCurrentlyPlayingTrack"];
    },
    currentPlayingTrackID() {
      return this.$store.getters["controller/currentTrackID"];
    },
    currentTrackUri() {
      return this.getCurrentlyPlayingTrack?.context.uri;
    },
    isPlaying() {
      return this.getCurrentlyPlayingTrack?.is_playing;
    },
    trackDuration() {
      return this.$store.getters["controller/getCurrentDuration"];
    },
    trackSeek() {
      return this.$store.getters["controller/getCurrentProgress"];
    },
    isStarwarsAlbum() {
      return (
        this.getCurrentlyPlayingTrack?.item?.name.includes("Star Wars") ||
        this.getCurrentlyPlayingTrack?.item?.album.name.includes("Star Wars")
      );
    },
    playerProgress() {
      return this.$store.getters["controller/getPlayerProgress"];
    },
    styleObject() {
      return {
        "--saberColor": this.isStarwarsAlbum
          ? this.starWarsBarIcons[this.index].blurColor
          : "",
        "--background-color": !this.isStarwarsAlbum ? "#ffffff" : "",
        "--background-color-hover": !this.isStarwarsAlbum ? "#1FDF64" : "",
        width: this.progressBarWidth,
      };
    },
  },
  methods: {
    async playCurrentTrack() {
      await this.$store.dispatch("controller/fetchCurrentlyPlayingTrack");
      this.isPlaying
        ? this.$store.dispatch("controller/pauseCurrentTrack")
        : this.$store.dispatch("controller/playCurrentTrack");
    },
    async skipToNextTrack() {
      await this.$store.dispatch("controller/skipToNextTrack");
    },
    async skipToPrevTrack() {
      await this.$store.dispatch("controller/skipToPrevTrack");
    },
    trackDurationFunc(duration) {
      const minutes = Math.floor(duration / 60000);
      const seconds = Math.floor((duration % 60000) / 1000);
      const result = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
      return result;
    },
    changeBladeIcon() {
      this.index !== 6 ? (this.index = this.index + 1) : (this.index = 0);
    },
  },
  watch: {
    playerProgress(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.progressBarWidth = newVal + "%";
        if (newVal >= 100) {
          this.$store.commit(
            "controller/currentProgressMS",
            this.trackDuration
          );
          console.log("TRAKC DURATİON 99%", this.trackDuration);
          this.$store.dispatch("controller/clearIntervalFunc");
          this.$store.dispatch("controller/skipToNextTrack");
        }
      } else {
        this.progressBarWidth = oldVal + "%";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#saber {
  background-size: contain;
  background-image: var(--saberImg);
  background-position: 100%;
  background-repeat: no-repeat;
  width: 5.5rem;
  height: 2rem;
  display: block;
  top: 56%;
  position: absolute;
}
#progress--bar {
  background: linear-gradient(
    to bottom,
    var(--saberColor),
    #fff 50%,
    var(--saberColor)
  );
  box-shadow: 0px 0px 12px 1px var(--saberColor);
  background-color: var(--background-color);
}
#progress--bar:hover {
  background-color: var(--background-color-hover);
  animation: blink 0.1s linear infinite;
}
.progress--bar--container:hover {
  #progress--bar {
    background-color: var(--background-color-hover);
  }
}
@keyframes blink {
  0% {
    box-shadow: 0px 0px 12px 6px var(--saberColor);
  }
  15% {
    box-shadow: 0px 0px 19px 1px var(--saberColor);
  }
  30% {
    box-shadow: 0px 0px 12px 6px var(--saberColor);
  }
  60% {
    box-shadow: 0px 0px 19px 1px var(--saberColor);
  }
  75% {
    box-shadow: 0px 0px 12px 6px var(--saberColor);
  }
  90% {
    box-shadow: 0px 0px 19px 1px var(--saberColor);
  }
  100% {
    box-shadow: 0px 0px 12px 6px var(--saberColor);
  }
}
</style>
