<template>
  <div class="flex flex-col min-w-[36%] shrink-0">
    <div class="flex justify-center pb-2 w-full">
      <div class="flex justify-between text-lightest w-14 mr-6">
        <button
          @click="toggleShuffle"
          id="shuffle"
          :style="{ '--visible': shuffleVisiblity }"
          class="cursor-default relative mt-[2px]"
        >
          <svg
            role="img"
            height="14"
            width="14"
            viewBox="0 0 16 16"
            class="hover:text-white"
          >
            <path
              :fill="isShuffle ? '#1FDF64' : 'currentColor'"
              d="M13.151.922a.75.75 0 10-1.06 1.06L13.109 3H11.16a3.75 3.75 0 00-2.873 1.34l-6.173 7.356A2.25 2.25 0 01.39 12.5H0V14h.391a3.75 3.75 0 002.873-1.34l6.173-7.356a2.25 2.25 0 011.724-.804h1.947l-1.017 1.018a.75.75 0 001.06 1.06L15.98 3.75 13.15.922zM.391 3.5H0V2h.391c1.109 0 2.16.49 2.873 1.34L4.89 5.277l-.979 1.167-1.796-2.14A2.25 2.25 0 00.39 3.5z"
            ></path>
            <path
              :fill="isShuffle ? '#1FDF64' : 'currentColor'"
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
        <button
          @click="toggleRepeatMode"
          id="repeat"
          class="cursor-default relative"
          :style="{ '--visible': repeatMode !== 'off' ? 'visible' : 'hidden' }"
        >
          <svg
            class="hover:text-white"
            role="img"
            height="14"
            width="14"
            viewBox="0 0 16 16"
          >
            <path
              :fill="
                repeatMode === 'off'
                  ? 'currentColor'
                  : repeatMode === 'context'
                  ? '#1FDF64'
                  : 'none'
              "
              d="M0 4.75A3.75 3.75 0 013.75 1h8.5A3.75 3.75 0 0116 4.75v5a3.75 3.75 0 01-3.75 3.75H9.81l1.018 1.018a.75.75 0 11-1.06 1.06L6.939 12.75l2.829-2.828a.75.75 0 111.06 1.06L9.811 12h2.439a2.25 2.25 0 002.25-2.25v-5a2.25 2.25 0 00-2.25-2.25h-8.5A2.25 2.25 0 001.5 4.75v5A2.25 2.25 0 003.75 12H5v1.5H3.75A3.75 3.75 0 010 9.75v-5z"
            ></path>
            <path
              :fill="repeatMode !== 'off' ? '#1FDF64' : 'currentColor'"
              d="M0 4.75A3.75 3.75 0 0 1 3.75 1h.75v1.5h-.75A2.25 2.25 0 0 0 1.5 4.75v5A2.25 2.25 0 0 0 3.75 12H5v1.5H3.75A3.75 3.75 0 0 1 0 9.75v-5zM12.25 2.5h-.75V1h.75A3.75 3.75 0 0 1 16 4.75v5a3.75 3.75 0 0 1-3.75 3.75H9.81l1.018 1.018a.75.75 0 1 1-1.06 1.06L6.939 12.75l2.829-2.828a.75.75 0 1 1 1.06 1.06L9.811 12h2.439a2.25 2.25 0 0 0 2.25-2.25v-5a2.25 2.25 0 0 0-2.25-2.25z"
            ></path>
            <path
              :fill="repeatMode === 'track' ? '#1FDF64' : 'none'"
              d="M9.12 8V1H7.787c-.128.72-.76 1.293-1.787 1.313V3.36h1.57V8h1.55z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
    <!-- track bar -->
    <div
      class="flex items-center justify-around text-lightest text-sm min-w-[17rem]"
    >
      <div
        :class="
          isStarwarsAlbum
            ? 'mt-[2px] mb:w-[2.8rem]  md:w-[2.6rem] lg:w-[2.4rem]'
            : 'w-[2rem]'
        "
        class="text-[0.6rem] font-semibold tracking-widest cursor-default h-5"
      >
        {{ timeParse(trackSeek) }}
      </div>
      <div
        v-if="isStarwarsAlbum"
        :class="
          isStarwarsAlbum && starWarsBarIcons[`${index}`].id === 1
            ? 'w-[5.2rem]'
            : 'w-[5.3rem]'
        "
        class="h-full z-10 flex-none"
      >
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
        :class="{
          'h-1': !isStarwarsAlbum,
          'mb-[-2.1px]':
            (isStarwarsAlbum && starWarsBarIcons[`${index}`].id === 1) || 3,
        }"
        class="progress--bar--container relative group w-full bg-lightest/40 rounded-full"
        @click="seekToPosition(msg, $event)"
        :style="{
          height: isStarwarsAlbum ? starWarsBarIcons[`${index}`].height : '4px',
        }"
      >
        <div
          id="progress--bar"
          :style="styleObject"
          :class="{
            ' bg-white': !isStarwarsAlbum,
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
        </div>
      </div>
      <div
        @click="toggleDuration"
        class="text-[0.6rem] w-[1rem] font-semibold ml-[5px] tracking-widest cursor-default"
      >
        <div v-if="!reverseDuration">
          <span>
            {{ timeParse(trackDuration) }}
          </span>
        </div>
        <div v-else>
          <span> -{{ timeParse(getReverseDuration) }} </span>
        </div>
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
      reverseDuration: false,
      index: 0,
      progressBarWidth: "0%",
      progresBarEl: null,
      starWarsBarIcons: [
        {
          id: 0,
          url: "https://open.spotifycdn.com/cdn/images/sw_saber_anakin.46a12813.png",
          edgeColor: "rgb(55, 132, 214)",
          blurColor: "#2e77d0",
          height: "7px",
        },
        {
          id: 1,
          url: "https://open.spotifycdn.com/cdn/images/sw_saber_luke.170f9698.png",
          edgeColor: "rgb(135, 220, 90)",
          blurColor: "#1ed760",
          height: "10px",
        },
        {
          id: 2,
          url: "https://open.spotifycdn.com/cdn/images/sw_saber_vader.78296917.png",
          edgeColor: "rgb(229, 17, 21)",
          blurColor: "#cd1a2b",
          height: "7px",
        },
        {
          id: 3,
          url: "https://open.spotifycdn.com/cdn/images/sw_saber_rey.b4a2ccc1.png",
          edgeColor: "rgb(249, 164, 11)",
          blurColor: " rgb(253, 175, 33)",
          height: "10px",
        },
        {
          id: 4,
          url: "https://open.spotifycdn.com/cdn/images/sw_saber_leia.47a0ef84.png",
          edgeColor: "rgb(55, 132, 214)",
          blurColor: "#2e77d0",
          height: "8px",
        },
        {
          id: 5,
          url: "https://open.spotifycdn.com/cdn/images/sw_saber_mace.de90025a.png",
          edgeColor: "rgb(90, 22, 167)",
          blurColor: "rgb(172, 57, 193)",
          height: "6px",
        },
        {
          id: 6,
          url: "https://open.spotifycdn.com/cdn/images/sw_saber_ahsoka1.dd3102a7.png",
          edgeColor: "rgb(255,255,255)",
          blurColor: "rgb(255,255,255)",
          height: "6px",
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
    repeatMode() {
      return this.$store.getters["controller/getRepeatMode"];
    },
    isShuffle() {
      return this.$store.getters["controller/isShuffle"];
    },
    shuffleVisiblity() {
      return this.isShuffle ? "visible" : "hidden";
    },
    trackDuration() {
      return this.$store.getters["controller/getCurrentDuration"];
    },
    trackSeek() {
      return this.$store.getters["controller/getCurrentProgress"];
    },
    getReverseDuration() {
      return this.$store.getters["controller/getLastReverseProgressMS"];
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
    timeParse(duration) {
      const minutes = Math.floor(duration / 60000);
      const seconds = Math.floor((duration % 60000) / 1000);
      const result = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
      return result;
    },
    seekToPosition(_, e) {
      const jumpToSeek = (e.offsetX * 100) / this.progresBarEl.offsetWidth;
      const seekTo = (Math.round(jumpToSeek) * this.trackDuration) / 100;
      console.log(Math.round(jumpToSeek));
      console.log(Math.round(seekTo));
      this.$store.dispatch("controller/seekToPosition", Math.round(seekTo));
      this.$store.commit(
        "controller/currentProgressMS",
        this.getCurrentlyPlayingTrack?.progress_ms
      );
    },
    toggleShuffle() {
      this.$store.dispatch("controller/toggleShuffle", !this.isShuffle);
    },
    async toggleRepeatMode() {
      switch (this.repeatMode) {
        case "off":
          await this.$store.dispatch("controller/toggleRepeatMode", "context");
          break;
        case "context":
          await this.$store.dispatch("controller/toggleRepeatMode", "track");
          break;
        case "track":
          await this.$store.dispatch("controller/toggleRepeatMode", "off");
          break;
      }
    },
    toggleDuration() {
      this.reverseDuration = !this.reverseDuration;
    },
    changeBladeIcon() {
      this.index !== 6 ? (this.index = this.index + 1) : (this.index = 0);
    },
  },
  watch: {
    playerProgress(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.progressBarWidth = newVal + "%";
        if (newVal >= 99.65) {
          this.$store.commit(
            "controller/currentProgressMS",
            this.trackDuration
          );
          console.log("TRAKC DURATİON 99%", this.trackDuration);
          this.$store.dispatch("controller/clearIntervalFunc");
          this.repeatMode === "track"
            ? this.$store.dispatch("controller/fetchCurrentlyPlayingTrack")
            : this.$store.dispatch("controller/skipToNextTrack");
        }
      } else {
        this.progressBarWidth = oldVal + "%";
      }
    },
  },
  mounted() {
    this.progresBarEl = [
      document.querySelector(".progress--bar--container"),
    ][0];
  },
};
</script>

<style lang="scss" scoped>
#shuffle::after {
  content: "";
  display: block;
  position: absolute;
  color: #1fdf64;
  background-color: #1fdf64;
  width: 4px;
  height: 4px;
  transform: translateX(-50%);
  left: 50%;
  bottom: 0;
  border-radius: 100%;
  visibility: var(--visible);
}
#repeat::after {
  content: "";
  display: block;
  position: absolute;
  color: #1fdf64;
  background-color: #1fdf64;
  width: 4px;
  height: 4px;
  transform: translateX(-50%);
  left: 50%;
  bottom: 0;
  border-radius: 100%;
  visibility: var(--visible);
}
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
    var(--saberColor) 0,
    var(--saberColor) 10%,
    #fff 10%,
    #fff 90%,
    var(--saberColor) 90%,
    var(--saberColor) 100%
  );
  box-shadow: 0px 0px 12px 3px var(--saberColor);
  background-color: var(--background-color);
  height: 100%;
  width: 100%;
}
#progress--bar:hover {
  background-color: var(--background-color-hover);
}
.progress--bar--container:hover {
  #progress--bar {
    background-color: var(--background-color-hover);
    animation: blink 0.1s linear infinite;
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
