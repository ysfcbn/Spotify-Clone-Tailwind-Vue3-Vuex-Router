import { createApp, defineAsyncComponent } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import store from "./store/index.js";

import App from "./App.vue";
import "./index.css";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: "login",
      path: "/login",
      components: {
        loginPage: () => import("./components/LoginPage/LoginPage.vue"),
      },
    },
    {
      path: "/",
      name: "home",
      component: () => import("../src/components/Home/Home.vue"),
    },
    {
      name: "user",
      path: "/user/:id",
      component: () => import("./components/User/User.vue"),
      props: true,
    },
    {
      name: "search",
      path: "/search",
      component: () => import("../src/components/Search/Search.vue"),
    },
    {
      name: "playlists",
      path: "/collection/playlists",
      component: () => import("../src/components/Collection/Playlists.vue"),
    },
    {
      name: "podcasts",
      path: "/collection/podcasts",
      component: () => import("./components/Podcast/FavPodcasts.vue"),
    },
    {
      name: "artists",
      path: "/collection/artists",
      component: () => import("./components/Artists/FavArtists.vue"),
    },
    {
      name: "albums",
      path: "/collection/albums",
      component: () => import("./components/Album/FavAlbums.vue"),
    },
    {
      name: "genres",
      path: "/genre/:id",
      component: () => import("./components/Genre/Genre.vue"),
      props: true,
    },
    {
      name: "episodes",
      path: "/collection/episodes",
      component: () => import("../src/components/Podcast/Episodes.vue"),
      props: true,
    },
    {
      name: "episode",
      path: "/episode/:id",
      component: () => import("../src/components/Podcast/EpisodePage.vue"),
      props: true,
    },
    {
      name: "show",
      path: "/show/:id",
      component: () => import("../src/components/Podcast/ShowPage.vue"),
      props: true,
    },
    {
      name: "favTracks",
      path: "/collection/tracks",
      component: () => import("../src/components/FavoriteSongs/FavSongs.vue"),
    },
    {
      name: "album",
      path: "/album/:id",
      component: () => import("../src/components/Album/Album.vue"),
      props: true,
    },
    {
      name: "single",
      path: "/single/:id",
      component: () => import("../src/components/Album/Single.vue"),
    }, // "/album/id olarak değişecek"
    {
      name: "playlist",
      path: "/playlist/:id",
      component: () => import("../src/components/Playlist/LocatedPlaylist.vue"),
      props: true,
    },
    {
      name: "track",
      path: "/track/:id",
      component: () => import("../src/components/TrackPage/TrackPage.vue"),
      props: true,
    },
    {
      name: "artist",
      path: "/artist/:id",
      component: () => import("../src/components/Artists/ArtistPage.vue"),
      props: true,
    },
    {
      path: "/artist/id/discography/:all",
      component: () =>
        import("../src/components/Artists/Diskografi/DiskografiPage.vue"),
    },
    {
      path: "/nowhere",
      beforeEnter(to, from) {
        if (from.fullPath === "/search") {
          to.fullPath = from.fullPath;
          router.replace({ name: "search" });
        } else {
          to.fullPath = from.fullPath;
          router.replace({ name: "home" });
        }
      },
    },
    {
      path: "/:notFound(.*)*",
      redirect: { name: "home" },
    },
  ],

  linkActiveClass: "active",
  linkExactActiveClass: "exact-active",
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0, behavior: "smooth" };
  },
});

const app = createApp(App);

app.use(router);

app.use(store);

app.mount("#app");
