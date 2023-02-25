<template>
  <section class="p-5 mt-2 lg:ml-[1rem]">
    <div class="text-white text-lg flex flex-col gap-y-5">
      <h1 style="font-weight: 700" class="text-2xl">Queue</h1>
      <h2 style="font-weight: 700" class="text-lightest text-[16px]">
        Now playing
      </h2>
    </div>
    <TrackItems> </TrackItems>
  </section>
</template>

<script>
import TrackItems from "../TrackItems/TrackItems.vue";
export default {
  components: [TrackItems],
  data() {
    return {};
  },
  computed: {
    getUserQueue() {
      return this.$store.getters["controller/getUserQueue"];
    },
  },
  mounted() {
    console.log(this.getUserQueue);
  },
};
</script>

<style></style>
