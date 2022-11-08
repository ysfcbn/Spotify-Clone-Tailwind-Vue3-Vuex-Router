<template>
  <button
    @click="togglediskografiOptions"
    id="typeSelection"
    class="z-100 relative rounded-md flex items-center justify-between text-opacwhite5 hover:text-white p-1 h-full font-semibold w-fit"
  >
    <div
      :class="[curWidth]"
      class="text-sm min-w-[72px] flex items-center justify-between px-[6px] py-[4px]"
    >
      <span class="w-full">{{ activeType }}</span>
      <svg
        v-if="!active"
        role="img"
        height="16"
        width="16"
        viewBox="0 0 16 16"
        class="pointer-events-none"
      >
        <path fill="currentColor" d="M14 6l-6 6-6-6h12z"></path>
      </svg>
      <svg
        v-else
        role="img"
        height="16"
        width="16"
        viewBox="0 0 16 16"
        class=""
      >
        <path fill="currentColor" d="M14 10L8 4l-6 6h12z"></path>
      </svg>
    </div>

    <div
      v-if="diskografiOption"
      class="type--list z-40 absolute bg-dark2 top-[2.5rem] left-0 p-[4px] min-w-[160px] max-w-[360px] h-fit w-fit text-opacwhite3 whitespace-normal rounded shadow-[0px_15px_15px_1px_rgba(0,0,0,0.4)]"
    >
      <router-link
        :to="{ name: 'discography', params: { type: 'all' } }"
        class="w-full flex justify-start p-[6px] md:p-[8px] hover:bg-dark3"
      >
        <div class="cursor-default w-full flex justify-between">
          <span
            :class="{ 'text-green3': this.$route.params.type === 'all' }"
            class="text-xs md:text-sm"
            >Tümü</span
          >
          <svg
            v-if="this.$route.params.type === 'all'"
            role="img"
            height="16"
            width="16"
            viewBox="0 0 16 16"
            class="text-green3"
          >
            <path
              fill="currentColor"
              d="M15.53 2.47a.75.75 0 010 1.06L4.907 14.153.47 9.716a.75.75 0 011.06-1.06l3.377 3.376L14.47 2.47a.75.75 0 011.06 0z"
            ></path>
          </svg>
        </div>
      </router-link>
      <router-link
        :to="{ name: 'discography', params: { type: 'albums' } }"
        class="w-full flex justify-start p-[6px] md:p-[8px] hover:bg-dark3"
      >
        <div class="cursor-default w-full flex justify-between">
          <span
            :class="{ 'text-green3': this.$route.params.type === 'albums' }"
            class="text-xs md:text-sm"
            >Albümler</span
          >
          <svg
            v-if="this.$route.params.type === 'albums'"
            role="img"
            height="16"
            width="16"
            viewBox="0 0 16 16"
            class="text-green3"
          >
            <path
              fill="currentColor"
              d="M15.53 2.47a.75.75 0 010 1.06L4.907 14.153.47 9.716a.75.75 0 011.06-1.06l3.377 3.376L14.47 2.47a.75.75 0 011.06 0z"
            ></path>
          </svg>
        </div>
      </router-link>
      <router-link
        :to="{ name: 'discography', params: { type: 'singles' } }"
        class="w-full flex justify-start p-[6px] md:p-[8px] hover:bg-dark3"
      >
        <div class="cursor-default w-full flex justify-between">
          <span
            :class="{ 'text-green3': this.$route.params.type === 'singles' }"
            class="text-xs md:text-sm w-full flex"
            >Single'lar ve EP'ler</span
          >
          <svg
            v-if="this.$route.params.type === 'singles'"
            role="img"
            height="16"
            width="16"
            viewBox="0 0 16 16"
            class="text-green3"
          >
            <path
              fill="currentColor"
              d="M15.53 2.47a.75.75 0 010 1.06L4.907 14.153.47 9.716a.75.75 0 011.06-1.06l3.377 3.376L14.47 2.47a.75.75 0 011.06 0z"
            ></path>
          </svg>
        </div>
      </router-link>
      <router-link
        v-if="isCompExist"
        :to="{ name: 'discography', params: { type: 'compilations' } }"
        class="w-full flex justify-start p-[6px] md:p-[8px] hover:bg-dark3"
      >
        <div class="cursor-default w-full flex justify-between">
          <span
            :class="{
              'text-green3': this.$route.params.type === 'compilations',
            }"
            class="text-xs md:text-sm"
            >Derlemeler</span
          >
          <svg
            v-if="this.$route.params.type === 'compilations'"
            role="img"
            height="16"
            width="16"
            viewBox="0 0 16 16"
            class="text-green3"
          >
            <path
              fill="currentColor"
              d="M15.53 2.47a.75.75 0 010 1.06L4.907 14.153.47 9.716a.75.75 0 011.06-1.06l3.377 3.376L14.47 2.47a.75.75 0 011.06 0z"
            ></path>
          </svg>
        </div>
      </router-link>
    </div>
  </button>
</template>

<script>
export default {
  name: "DiskoOptions",
  props: {
    type: {
      type: String,
      required: false,
    },
  },

  data() {
    return {
      active: false,
      diskografiOption: false,
      all: true,
      albums: false,
      singlesEps: false,
      compilations: false,
    };
  },

  methods: {
    togglediskografiOptions() {
      this.diskografiOption = !this.diskografiOption;
      this.active = !this.active;
    },

    close(e) {
      if (!this.$el.contains(e.target)) {
        this.diskografiOption = false;
        if (this.active) this.active = false;
      }
    },
  },
  computed: {
    curWidth() {
      return this.getSelectredType === "all"
        ? "w-[5rem]"
        : this.getSelectredType === "singles"
        ? "w-[10rem]"
        : "w-[6.5rem]";
    },
    isCompExist() {
      return this.$store.getters["discography/isCompExist"];
    },
    getSelectredType() {
      return this.$store.getters["discography/getSelectedType"];
    },
    activeType() {
      return this.getSelectredType === "all"
        ? "Tümü"
        : this.getSelectredType === "albums"
        ? "Albümler"
        : this.getSelectredType === "singles"
        ? "Single'ler ve EP'ler"
        : this.getSelectredType === "compilations"
        ? "Derlemeler"
        : null;
    },
  },
  watch: {},
  mounted() {
    document.addEventListener("click", this.close);
  },
  beforeUnmount() {
    console.log("options unmounted!");
    document.removeEventListener("click", this.close);
  },
};
</script>

<style></style>
