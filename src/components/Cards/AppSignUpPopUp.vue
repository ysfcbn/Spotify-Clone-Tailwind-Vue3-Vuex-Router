<template>
  <div
    class="absolute z-[999] bg-blue3 text-white rounded-lg p-4 w-[20.75rem] before:content-[''] before:border-y-[8px] before:border-r-[8px] before:border-r-blue3 before:border-l-0 before:border-solid before:absolute before:top-[10px] before:left-[-0.5rem] before:text-blue3 before:border-transparent"
  >
    <div class="text-white w-full flex flex-col justify-between h-full">
      <div class="mb-2">
        <p class="text-lg font-semibold"><slot name="title"></slot></p>
        <p class="text-sm mt-2 text-white font-semibold">
          <slot class="font-semibold" name="description"></slot>
        </p>
      </div>
      <div class="flex items-center justify-end w-full">
        <button
          @click="notNow"
          style="font-weight: 700"
          class="py-3 px-4 font-medium hover:scale-105 cursor-default text-white text-[12px] tracking-wider"
        >
          Not Now
        </button>

        <button
          @click="login"
          style="font-weight: 700"
          class="py-2 px-4 rounded-full bg-white hover:scale-105 text-black cursor-default w-fit text-[13px]"
        >
          Log in
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SignUpPopUp",
  props: ["visible", "createPlaylist"],
  emits: ["emit-visible"],

  computed: {
    notNow() {
      this.$emit("emit-visible", false);
    },
  },
  methods: {
    close(e) {
      if (!this.$el.contains(e.target)) {
        this.$emit("emit-visible", false);
      }
    },
    login() {
      this.$router.push({ name: "login" });
    },
  },

  mounted() {
    setTimeout(() => {
      document.addEventListener("click", this.close);
    }, 100);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.close);
  },
};
</script>

<style></style>
