<template>
  <transition name="fade-modal">
    <div v-if="showModal" class="info--modal sticky z-[9999] flex shrink-0">
      <div class="relative shrink-0">
        <div
          :class="showModalType?.type === 'error' ? 'bg-red' : 'bg-blue4'"
          class="py-2 z-[9999] min-w-fit h-[2.4rem] rounded-lg shadow-[0px_5px_12px_6px_rgba(0,0,0,0.6)]"
        >
          <div class="cursor-default px-8 text-white text-[15px] w-fit">
            <span
              v-if="showModalType?.type === 'favSong'"
              class="font-semibold mr-1"
              ><span v-if="showModalType?.status" class="mr-1"
                >Added to your</span
              >
              <span v-else class="mr-1">Removed from your</span>
              <span style="font-weight: 700">Liked Songs</span>
            </span>
            <span
              v-if="showModalType?.type === 'playlist'"
              class="font-semibold mr-1"
              ><span v-if="showModalType?.status">Saved to </span>
              <span v-else>Removed from </span>
              <span style="font-weight: 700">Your Library</span>
            </span>
            <span
              v-if="showModalType?.type === 'episode'"
              class="font-semibold mr-1"
              ><span v-if="showModalType?.status">Added to </span>
              <span v-else>Removed from </span>
              <span style="font-weight: 700">Your Episodes</span>
            </span>
            <span v-if="showModalType?.type === 'show'" class="font-semibold">
              <span v-if="showModalType?.status" class="mr-1"
                >Added to your
              </span>
              <span v-else>Removed from your</span>
              <span style="font-weight: 700">Podcast's and Show</span>
            </span>
            <span v-if="showModalType?.type === 'album'" class="font-semibold"
              ><span v-if="showModalType?.status" class="mr-1"
                >Added to your</span
              >
              <span v-else>Removed from your </span>
              <span style="font-weight: 700">Albums</span>
            </span>

            <span v-if="showModalType?.type === 'artist'" class="font-semibold"
              ><span v-if="showModalType?.status" class="mr-1"
                >Added to your</span
              >
              <span v-else>Removed from your </span>
              <span style="font-weight: 700">Artists</span>
            </span>
            <span v-if="showModalType?.type === 'queue'" class="font-semibold"
              >Added to queue</span
            >
            <span v-if="showModalType?.type === 'copyURL'" class="font-semibold"
              >Link copied to clipboard</span
            >
            <span v-if="showModalType?.type === 'error'" class="font-semibold"
              >Occured a problem
            </span>
            <span
              v-if="showModalType?.type === 'notUnderstand'"
              class="font-semibold"
              >Please read all information</span
            >
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      showModal: false,
      timer: null,
    };
  },
  methods: {
    closeModal() {},
  },
  computed: {
    showModalType() {
      return this.$store.getters["controller/getModalInfoType"];
    },
  },
  watch: {
    showModalType(newVal, oldVal) {
      if (newVal === oldVal || newVal !== oldVal) {
        clearTimeout(this.timer);
        this.showModal = true;
        this.timer = setTimeout(() => {
          this.showModal = false;
        }, 3000);
      }
    },
  },
  created() {
    clearTimeout(this.closeModal());
  },
};
</script>

<style scoped lang="scss">
.info--modal {
  position: absolute;
  bottom: 9%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.fade-modal-leave-active {
  transition: opacity 0.7s ease-out;
}
.fade-modal-enter-active {
  transition: opacity 0.1s ease-in 0.5s;
}

.fade-modal-enter-to,
.fade-modal-leave-from {
  opacity: 1;
}
.fade-modal-enter-from,
.fade-modal-leave-to {
  opacity: 0;
}
</style>
