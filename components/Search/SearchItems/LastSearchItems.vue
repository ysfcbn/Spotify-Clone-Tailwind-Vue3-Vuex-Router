<template>
  <div
    class="bg-dark1 hover:bg-opacblack1 ease duration-200 w-full h-auto cursor-pointer rounded-md flex-1 p-4 relative group"
  >
    <div class="h-full">
      <div class="w-full mb-5 relative">
        <img
          :class="{
            ['rounded-full w-full h-full']: track.artist === 'Sanatçı',
          }"
          class="object-cover"
          :src="track.img"
          alt="album image"
        />
        <div
          class="absolute flex items-start right-0 bottom-0 py-1 px-2 opacity-0 group-hover:opacity-100 transition ease-in duration-200 group-hover:block group-hover:translate-y-[-0.4rem]"
        >
          <button
            class="p-3 bg-green3 rounded-full cursor-default lg:group-hover:block hover:scale-110 shadow-[0px_5px_6px_2px_rgba(0,0,0,0.4)]"
          >
            <span>
              <svg role="img" height="24" width="24" viewBox="0 0 24 24">
                <path
                  fill="text-black"
                  d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"
                ></path>
              </svg>
            </span>
          </button>
        </div>
        <div
          class="absolute flex items-start right-[-1rem] top-[-1rem] py-1 px-2 transition ease-in duration-200"
        >
          <button
            :id="track.id"
            @click="closeTrack(msg, $event)"
            class="close--button p-2 bg-opacblack rounded-full cursor-default hover:scale-110 text-white"
          >
            <svg role="img" height="16" width="16" viewBox="0 0 16 16" class="">
              <path
                fill="currentColor"
                d="M1.47 1.47a.75.75 0 011.06 0L8 6.94l5.47-5.47a.75.75 0 111.06 1.06L9.06 8l5.47 5.47a.75.75 0 11-1.06 1.06L8 9.06l-5.47 5.47a.75.75 0 01-1.06-1.06L6.94 8 1.47 2.53a.75.75 0 010-1.06z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <div class="flex items-middle flex-col justify-center">
        <div class="text-white max-w-full truncate">{{ track.name }}</div>
        <div class="text-sm text-lightest w-full truncate">
          {{ track.artist }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["track", "searchs"],
  emits: ["filterSearch"],
  data() {
    return { ButtonId: "" };
  },
  methods: {
    closeTrack(_, event) {
      console.log(this.searchs);
      this.ButtonId = event.target.closest(".close--button").id;
      this.$emit("filterSearch", this.ButtonId);
    },
  },
};
</script>

<style scoped>
.fade-cart-move,
.fade-card-enter-active,
.fade-card-leave-active {
  transition: opacity 0.1s ease-in;
}

.fade-card-leave-active {
  position: absolute;
  visibility: hidden;
}

.fade-card-enter-to,
.fade-card-leave-from {
  opacity: 1;
}
.fade-card-enter-from,
.fade-card-leave-to {
  opacity: 0;
}
</style>
