<template>
  <div
    class="flex text-lightest justify-end items-center min-w-[32%] shrink-0 mx-4"
  >
    <div v-if="true">
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
            d="M13.426 2.574a2.831 2.831 0 00-4.797 1.55l3.247 3.247a2.831 2.831 0 001.55-4.797zM10.5 8.118l-2.619-2.62A63303.13 63303.13 0 004.74 9.075L2.065 12.12a1.287 1.287 0 001.816 1.816l3.06-2.688 3.56-3.129zM7.12 4.094a4.331 4.331 0 114.786 4.786l-3.974 3.493-3.06 2.689a2.787 2.787 0 01-3.933-3.933l2.676-3.045 3.505-3.99z"
          ></path>
        </svg>
      </button>
    </div>
    <div class="mx-3">
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
            d="M15 15H1v-1.5h14V15zm0-4.5H1V9h14v1.5zm-14-7A2.5 2.5 0 013.5 1h9a2.5 2.5 0 010 5h-9A2.5 2.5 0 011 3.5zm2.5-1a1 1 0 000 2h9a1 1 0 100-2h-9z"
          ></path>
        </svg>
      </button>
    </div>
    <div class="mr-1">
      <button class="cursor-default">
        <svg
          role="img"
          height="14"
          width="14"
          class="hover:text-white"
          viewBox="0 0 16 16"
        >
          <path
            fill="currentColor"
            d="M6 2.75C6 1.784 6.784 1 7.75 1h6.5c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0114.25 15h-6.5A1.75 1.75 0 016 13.25V2.75zm1.75-.25a.25.25 0 00-.25.25v10.5c0 .138.112.25.25.25h6.5a.25.25 0 00.25-.25V2.75a.25.25 0 00-.25-.25h-6.5zm-6 0a.25.25 0 00-.25.25v6.5c0 .138.112.25.25.25H4V11H1.75A1.75 1.75 0 010 9.25v-6.5C0 1.784.784 1 1.75 1H4v1.5H1.75zM4 15H2v-1.5h2V15z"
          ></path>
          <path
            fill="currentColor"
            d="M13 10a2 2 0 11-4 0 2 2 0 014 0zm-1-5a1 1 0 11-2 0 1 1 0 012 0z"
          ></path>
        </svg>
      </button>
    </div>
    <div class="ml-1">
      <button class="cursor-default">
        <svg
          @click="muteVolume"
          height="15"
          width="15"
          viewBox="0 0 16 16"
          class="hover:text-white"
        >
          <path
            :fill="`${mute ? 'currentColor' : 'none'}`"
            d="M13.86 5.47a.75.75 0 00-1.061 0l-1.47 1.47-1.47-1.47A.75.75 0 008.8 6.53L10.269 8l-1.47 1.47a.75.75 0 101.06 1.06l1.47-1.47 1.47 1.47a.75.75 0 001.06-1.06L12.39 8l1.47-1.47a.75.75 0 000-1.06z"
          ></path>
          <path
            :fill="`${mute ? 'currentColor' : 'none'}`"
            d="M10.116 1.5A.75.75 0 008.991.85l-6.925 4a3.642 3.642 0 00-1.33 4.967 3.639 3.639 0 001.33 1.332l6.925 4a.75.75 0 001.125-.649v-1.906a4.73 4.73 0 01-1.5-.694v1.3L2.817 9.852a2.141 2.141 0 01-.781-2.92c.187-.324.456-.594.78-.782l5.8-3.35v1.3c.45-.313.956-.55 1.5-.694V1.5z"
          ></path>
          <path
            :fill="`${lowVol ? 'currentColor' : 'none'}`"
            d="M9.741.85a.75.75 0 01.375.65v13a.75.75 0 01-1.125.65l-6.925-4a3.642 3.642 0 01-1.33-4.967 3.639 3.639 0 011.33-1.332l6.925-4a.75.75 0 01.75 0zm-6.924 5.3a2.139 2.139 0 000 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 010 4.88z"
          ></path>
          <path
            :fill="`${medVol ? 'currentColor' : 'none'}`"
            d="M9.741.85a.75.75 0 01.375.65v13a.75.75 0 01-1.125.65l-6.925-4a3.642 3.642 0 01-1.33-4.967 3.639 3.639 0 011.33-1.332l6.925-4a.75.75 0 01.75 0zm-6.924 5.3a2.139 2.139 0 000 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 6.087a4.502 4.502 0 000-8.474v1.65a2.999 2.999 0 010 5.175v1.649z"
          ></path>
          <path
            :fill="`${highVol ? 'currentColor' : 'none'}`"
            d="M9.741.85a.75.75 0 01.375.65v13a.75.75 0 01-1.125.65l-6.925-4a3.642 3.642 0 01-1.33-4.967 3.639 3.639 0 011.33-1.332l6.925-4a.75.75 0 01.75 0zm-6.924 5.3a2.139 2.139 0 000 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 010 4.88z"
          ></path>
          <path
            :fill="`${highVol ? 'currentColor' : 'none'}`"
            d="M11.5 13.614a5.752 5.752 0 000-11.228v1.55a4.252 4.252 0 010 8.127v1.55z"
          ></path>
        </svg>
      </button>
    </div>
    <div
      id="volume--bar"
      class="flex items-center mx-1 mb-1 w-[18%] sm:min-w-[4.5rem] max-w-[7rem]"
      @click="setVolumePercent(msg, $event)"
    >
      <div class="group flex relative w-full h-1 bg-lightest/40 rounded-full">
        <span
          :style="{ width: percentVol + '%' }"
          class="absolute bg-white h-1 rounded-full group-hover:bg-green3"
        >
          <span
            class="block invisible group-hover:visible bg-white w-[13px] h-[13px] absolute rounded-full top-[-4px] right-[-8px]"
          ></span>
        </span>
      </div>
    </div>

    <div class="w-[3rem] mx-1 mb-1">
      <button class="cursor-default">
        <svg
          role="img"
          height="16"
          width="16"
          viewBox="0 0 16 16"
          class="hover:text-white"
        >
          <path
            fill="currentColor"
            d="M6.53 9.47a.75.75 0 010 1.06l-2.72 2.72h1.018a.75.75 0 010 1.5H1.25v-3.579a.75.75 0 011.5 0v1.018l2.72-2.72a.75.75 0 011.06 0zm2.94-2.94a.75.75 0 010-1.06l2.72-2.72h-1.018a.75.75 0 110-1.5h3.578v3.579a.75.75 0 01-1.5 0V3.81l-2.72 2.72a.75.75 0 01-1.06 0z"
          ></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "VolumeBar",
  data() {
    return {
      mute: false,
      lowVol: false,
      medVol: false,
      highVol: false,
      percentVol: Number,
      volumeBarEl: null,
    };
  },
  computed: {
    volumePercent() {
      return this.$store.getters["controller/getVolumePercent"];
    },
  },
  methods: {
    volumeLevel() {
      if (this.volumePercent > 0 && this.volumePercent <= 32) {
        this.lowVol = true;
        this.medVol = false;
        this.highVol = false;
        this.mute = false;
      }
      if (this.volumePercent >= 33 && this.volumePercent <= 65) {
        this.medVol = true;
        this.lowVol = false;
        this.highVol = false;
        this.mute = false;
      }
      if (this.volumePercent >= 66 && this.volumePercent <= 100) {
        this.highVol = true;
        this.medVol = false;
        this.lowVol = false;
        this.mute = false;
      }
      if (this.volumePercent === 0) {
        this.mute = true;
        this.highVol = false;
        this.medVol = false;
        this.lowVol = false;
      }
    },
    muteVolume() {
      if (this.mute) {
        this.volumeLevel();
        this.percentVol = this.volumePercent;
        this.$store.dispatch("controller/putVolumePercent", this.percentVol);
      } else {
        this.$store.dispatch("controller/putVolumePercent", 0);
        this.percentVol = 0;
        this.mute = true;
        this.highVol = false;
        this.medVol = false;
        this.lowVol = false;
      }
    },
    setVolumePercent(_, e) {
      const volPercent = (e.offsetX * 100) / this.volumeBarEl.offsetWidth;
      this.$store.dispatch(
        "controller/putVolumePercent",
        Math.round(volPercent)
      );
    },
  },
  watch: {
    volumePercent(newVal, oldVal) {
      this.volumeLevel();
      this.percentVol = this.volumePercent;
    },
  },
  mounted() {
    this.volumeLevel();
    this.percentVol = this.volumePercent;
    this.volumeBarEl = [document.querySelector("#volume--bar")][0];
    console.log(typeof this.volumeBarEl);
    console.log(this.volumeBarEl);
  },
};
</script>

<style></style>
<!-- , -->
