<template>
  <div class="Search-Result p-4 mt-8 lg:ml-[1rem] mx-4">
    <div
      v-if="searchResult"
      class="relative w-full h-full grid col-span-full pb-5"
    >
      <div class="flex items-center justify-start text-sm">
        <button
          @click="toggleAll"
          :class="popPublications ? 'active' : 'inactive'"
          class="w-fit h-fit rounded-full px-3 py-[6px] cursor-default bg-dark2 hover:bg-dark3/70 transition duration-200"
        >
          <span>Popular releases</span>
        </button>
        <button
          @click="toggleAlbums"
          :class="albums ? 'active' : 'inactive'"
          class="w-fit h-fit rounded-full px-3 py-[6px] mx-2 cursor-default bg-dark2 hover:bg-dark3/70 transition duration-200"
        >
          <span>Albums</span>
        </button>
        <button
          @click="toggleSingles"
          :class="singles ? 'active' : 'inactive'"
          class="w-fit h-fit rounded-full px-3 py-[6px] cursor-default bg-dark2 hover:bg-dark3/70 transition duration-200"
        >
          <span>Singles and EPs</span>
        </button>
        <button
          v-if="isCompExist"
          @click="toggleCompilations"
          :class="compilations ? 'active' : 'inactive'"
          class="w-fit h-fit rounded-full px-3 py-[6px] cursor-default bg-dark2 hover:bg-dark3/70 transition duration-200 mx-2"
        >
          <span>Compilations</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
