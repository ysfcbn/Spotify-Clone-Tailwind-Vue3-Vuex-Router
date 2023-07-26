import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			name: 'login',
			path: '/login',
			components: {
				loginPage: () => import('../components/LoginPage/LoginPage.vue'),
			},
		},
		{
			path: '/',
			name: 'home',
			component: () => import('../components/Home/Home.vue'),
		},
		{
			name: 'user',
			path: '/user/:id',
			component: () => import('../components/User/User.vue'),
			props: true,
		},
		{
			name: 'search',
			path: '/search',
			component: () => import('../components/Search/Search.vue'),
		},
		{
			name: 'searchResult',
			path: '/search/:q/:type',
			component: () => import('../components/Search/SearchResult.vue'),
		},
		{
			name: 'playlists',
			path: '/collection/playlists',
			component: () => import('../components/Collection/Playlists.vue'),
		},
		{
			name: 'podcasts',
			path: '/collection/podcasts',
			component: () => import('../components/Podcast/FavPodcasts.vue'),
		},
		{
			name: 'artists',
			path: '/collection/artists',
			component: () => import('../components/Artists/FavArtists.vue'),
		},
		{
			name: 'albums',
			path: '/collection/albums',
			component: () => import('../components/Album/FavAlbums.vue'),
		},
		{
			name: 'genres',
			path: '/genre/:id',
			component: () => import('../components/Genre/Genre.vue'),
			props: true,
		},
		{
			name: 'queue',
			path: '/queue',
			component: () => import('../components/Queue/Queue.vue'),
		},
		{
			name: 'episodes',
			path: '/collection/episodes',
			component: () => import('../components/Podcast/Episodes.vue'),
			props: true,
		},
		{
			name: 'episode',
			path: '/episode/:id',
			component: () => import('../components/Podcast/EpisodePage.vue'),
			props: true,
		},
		{
			name: 'show',
			path: '/show/:id',
			component: () => import('../components/Podcast/ShowPage.vue'),
			props: true,
		},
		{
			name: 'favTracks',
			path: '/collection/tracks',
			component: () => import('../components/FavoriteSongs/FavSongs.vue'),
		},
		{
			name: 'album',
			path: '/album/:id',
			component: () => import('../components/Album/Album.vue'),
			props: true,
		},

		{
			name: 'playlist',
			path: '/playlist/:id',
			component: () => import('../components/Playlist/LocatedPlaylist.vue'),
			props: true,
		},
		{
			name: 'track',
			path: '/track/:id',
			component: () => import('../components/TrackPage/TrackPage.vue'),
			props: true,
		},
		{
			name: 'artist',
			path: '/artist/:id',
			component: () => import('../components/Artists/ArtistPage.vue'),
			props: true,
		},
		{
			name: 'discography',
			path: '/artist/:id/discography/:type',
			component: () =>
				import('../components/Artists/Diskografi/DiskografiPage.vue'),
			props: true,
		},

		{
			path: '/nowhere',
			beforeEnter(to, from) {
				if (from.fullPath === '/search') {
					to.fullPath = from.fullPath;
					router.replace({ name: 'search' });
				} else {
					to.fullPath = from.fullPath;
					router.replace({ name: 'home' });
				}
			},
		},
		{
			path: '/:notFound(.*)*',
			redirect: { name: 'home' },
		},
	],

	linkActiveClass: 'active',
	linkExactActiveClass: 'exact-active',
	scrollBehavior(to, from, savedPosition) {
		return savedPosition || { top: 0, behavior: 'smooth' };
	},
});

export default router;
