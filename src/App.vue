<template>
  <router-view v-if="isLoginPage" name="loginPage"></router-view>

  <div
    v-if="!isLoginPage"
    class="body bg-dark overflow-y-hidden box-content flex"
    style="font-family: 'proxima-nova', sans-serif Arial"
  >
    <AppInfoModal></AppInfoModal>

    <!-- side nav -->
    <Sidebar
      class="max-w-[18rem]"
      :trackImgDisplay="trackImgDisplay"
      :toggleImg="toggleImg"
    />

    <!-- main content -->
    <div
      class="main-view-container w-full min-w-[530px] overflow-x-hidden z-0 relative"
    >
      <!-- header -->
      <Header name="header" />
      <router-view v-slot="{ Component }">
        <component :is="Component" :key="$route.path"> </component>
      </router-view>
    </div>
    <div v-if="getCurrentTrackInfo">
      <CurrentTrackInfo />
    </div>
  </div>

  <div v-if="!isLoginPage" class="absolute bottom-0 w-full z-[900]">
    <Footer
      class="flex-none"
      :trackImgDisplay="trackImgDisplay"
      :toggleImg="toggleImg"
    />
  </div>
</template>

<script>
import Header from "./components/Header/Header.vue";
import Sidebar from "./components/Sidebar/Sidebar.vue";
import CurrentTrackInfo from "./components/Sidebar/CurrentTrackInfo.vue";
import LoginPage from "./components/LoginPage/LoginPage.vue";
import AppInfoModal from "./components/Modal/AppInfoModal.vue";
import AppHowitsWork from "./components/Modal/AppHowitsWork.vue";
import Footer from "./components/Footer/Footer.vue";
export default {
  components: {
    Header,
    Sidebar,
    Footer,
    CurrentTrackInfo,
    LoginPage,
    AppInfoModal,
    AppHowitsWork,
  },
  data() {
    return {
      trackImgDisplay: true,
    };
  },
  computed: {
    isLoginPage() {
      return this.$route.path === "/login";
    },
    pending() {
      return console.log("fallback component is pending");
    },
    getCurrentTrackInfo() {
      return this.$store.getters["controller/getCurrentTrackInfo"];
    },
  },
  methods: {
    toggleImg() {
      this.trackImgDisplay = !this.trackImgDisplay;
    },
  },
};
</script>

<style>
.body {
  display: flex;
}
.main-view-container {
  height: calc(100vh - 92px);
}
.beforeDot:before {
  content: " • ";
}
.afterDot:after {
  content: " • ";
}
.prebg {
  background-color: #181818;
}

.fade-card-enter-active,
.fade-card-leave-active {
  transition: opacity 50ms ease-in;
}

.fade-card-enter-from,
.fade-card-leave-to {
  opacity: 0;
}
</style>
