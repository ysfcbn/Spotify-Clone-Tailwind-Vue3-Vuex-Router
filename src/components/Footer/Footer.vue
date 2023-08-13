<template>
  <div
    v-if="isAuth"
    class="h-[92px] bg-black flex justify-start items-center overflow-hidden relative border-t border-opacwhite2"
  >
    <!-- Current Playing Track Info -->
    <TrackInfo :trackImgDisplay="trackImgDisplay" :toggleImg="toggleImg" />

    <!-- play/stop/rew/prev buttons -->
    <PlayController />

    <!-- volume bar and preferences -->
    <VolumeBar />
  </div>
  <SignUp v-if="!isAuth" />
</template>

<script>
import SignUp from "./SignUp.vue";
import TrackInfo from "./TrackInfo.vue";
import PlayController from "./PlayController.vue";
import VolumeBar from "./VolumeBar.vue";
export default {
  name: "Footer",
  inheritAttrs: false,
  components: { TrackInfo, PlayController, VolumeBar, SignUp },
  props: ["trackImgDisplay", "toggleImg"],
  data() {
    return {};
  },
  computed: {
    isAuth() {
      return this.$store.getters.isAuth;
    },
  },
  async created() {
    if (!this.isAuth) return;
    await this.$store.dispatch("controller/fetchDevice");
    await this.$store.dispatch("controller/fetchPlaybackState");
    await this.$store.dispatch("controller/fetchCurrentlyPlayingTrack");
    await this.$store.dispatch("controller/fetchPlaybackState");
  },
};
</script>

<style></style>
