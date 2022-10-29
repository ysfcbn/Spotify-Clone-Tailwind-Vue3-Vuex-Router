<template>
  <section class="main-search2 text-white relative mb-[2rem]">
    <div class="mb-6">
      <div class="h-fit">
        <h2
          style="font-weight: 700"
          class="text-[1.6rem] text-white leading-7 tracking-tight"
        >
          Hepsine göz at
        </h2>
      </div>
    </div>

    <div
      class="relative grid mb:grid-cols-col243 md:grid-cols-colsqr sm:gap-3 md:gap-6 grid-rows-1 auto-rows-auto"
    >
      <div
        v-for="item in getBrowseCategories"
        :key="item.id"
        :id="item.id"
        @click="openGenrePlaylists(item.name, $event)"
        :style="{ 'background-color': generateHexCode() }"
        class="square-cont w-full cursor-pointer rounded-md flex-1 p-4 relative overflow-hidden"
      >
        <div class="w-full">
          <img
            class="h-[100px] w-[100px] object-cover absolute rotate-[25deg] bottom-[-5px] right-[-1rem]"
            :src="item?.icons[0]?.url"
            alt=""
          />
          <h3
            class="text-white text-[24px] absolute leading-5 w-fit tracking-tight font-semibold"
          >
            {{ item.name }}
          </h3>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Browse All",
  computed: {
    isAuth() {
      return this.$store.getters.isAuth;
    },
    getToken() {
      return this.$store.getters.accessToken;
    },
    getBrowseCategories() {
      return this.$store.getters["playlists/getBrowseCategories"]?.categories
        ?.items;
    },
  },
  methods: {
    openGenrePlaylists(categoryName, event) {
      const categoryID = event.target.closest(".square-cont").id;
      console.log(categoryID, categoryName);
      this.$store.dispatch("genres/genreTitle", categoryName);
      this.$router.push({ name: "genres", params: { id: categoryID } });
    },

    generateHexCode() {
      return "#" + Math.floor(Math.random() * 900000);
    },
  },
};
</script>

<style scoped>
.square-cont::after {
  content: "";
  padding-bottom: 100%;
  display: block;
}
</style>
