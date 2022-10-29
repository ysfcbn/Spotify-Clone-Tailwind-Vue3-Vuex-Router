<template>
	<router-view name="loginPage"></router-view>
	<div
		v-if="!isLoginPage"
		class="body bg-dark overflow-y-hidden box-content flex"
		style="font-family: 'proxima-nova', sans-serif Arial"
	>
		<!-- side nav -->
		<Sidebar
			class="max-w-[18rem]"
			:albums="albums"
			:trackImgDisplay="trackImgDisplay"
			:toggleImg="toggleImg"
		/>
		<!-- main content -->
		<div
			class="main-view-container w-full min-w-[530px] overflow-y-auto overflow-x-hidden z-0 relative"
		>
			<!-- header -->
			<Header name="header" />

			<router-view v-slot="{ Component }" class="mb-[2rem]">
				<component :is="Component" :key="$route.path"></component>
			</router-view>
		</div>
	</div>

	<div v-if="!isLoginPage" class="absolute bottom-0 w-full z-[900]">
		<Footer
			class="flex-none"
			:trackImgDisplay="trackImgDisplay"
			:toggleImg="toggleImg"
			:mute="mute"
			:highVol="highVol"
		/>
	</div>
</template>

<script>
import Header from './components/Header/Header.vue';
import Sidebar from './components/Sidebar/Sidebar.vue';
import Footer from './components/Footer/Footer.vue';
import LoginPage from './components/LoginPage/LoginPage.vue';

export default {
	components: {
		Header,
		Sidebar,
		Footer,
		LoginPage,
	},
	data() {
		return {
			selectArtCardName: '',
			currentDiskoSection: '',
			toggleHeaderProfile: '',
			visToggleHeaderProfile: false,
			toggleHeaderDisko: '',
			visToggleHeaderDisko: false,
			trackImgDisplay: true,
			playBtnDisplay: false,
			highVol: true,
			mute: false,

			albums: [
				{ name: 'yerli pop' },
				{ name: 'yabancı hit' },
				{ name: 'yerli pop' },
				{ name: 'yabancı hit' },
				{ name: 'yerli pop' },
				{ name: 'yabancı hit' },
				{ name: 'yerli pop' },
				{ name: 'yabancı hit' },
				{ name: 'yerli pop' },
				{ name: 'yabancı hit' },
				{ name: 'yerli pop' },
				{ name: 'yabancı hit' },
				{ name: 'yerli pop' },
				{ name: 'yabancı hit' },
				{ name: 'yerli pop' },
				{ name: 'yabancı hit' },
				{ name: 'yerli pop' },
				{ name: 'yabancı hit' },
				{ name: 'yerli pop' },
				{ name: 'yabancı hit' },
				{ name: 'yerli pop' },
				{ name: 'yabancı hit' },
				{ name: 'yerli pop' },
				{ name: 'yabancı hit' },
				{ name: 'yerli pop' },
				{ name: 'yabancı hit' },
				{ name: 'yerli pop' },
				{ name: 'yabancı hit' },
				{ name: 'yerli pop' },
				{ name: 'yabancı hit' },
				{ name: 'yerli pop' },
				{ name: 'yabancı hit' },
			],
		};
	},
	computed: {
		isLoginPage() {
			return this.$route.path === '/login' ? true : false;
		},
		pending() {
			return console.log('fallback component is pending');
		},
	},

	methods: {
		selectArtistName(name) {
			this.selectArtCardName = name;
		},

		diskoSectionName(name) {
			this.currentDiskoSection = name;
		},

		toggleHeaderProfileFunc(value) {
			this.toggleHeaderProfile = value;
		},

		visToggleHeaderProfileFunc(value) {
			this.visToggleHeaderProfile = value;
		},

		toggleHeaderDiskoFunc(value) {
			this.toggleHeaderDisko = value;
		},

		visToggleHeaderDiskoFunc(value) {
			this.visToggleHeaderDisko = value;
		},

		toggleImg() {
			this.trackImgDisplay = !this.trackImgDisplay;
		},

		selectedTrack(e) {
			console.log(e.target);
		},
		listenInfoFunc(val) {},
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
	content: ' • ';
}
.afterDot:after {
	content: ' • ';
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
