<template>
	<div
		v-if="isAuth"
		class="w-full bg-dark1 flex justify-start items-center hover:overflow-y-auto relative border-t border-opacwhite2"
	>
		<!-- Current Playing Track Info -->
		<TrackInfo :trackImgDisplay="trackImgDisplay" :toggleImg="toggleImg" />

		<!-- play/stop/rew/prev buttons -->
		<PlayController />

		<!-- volume bar and preferences -->
		<VolumeBar :mute="mute" :highVol="highVol" />
	</div>
	<SignUp v-if="!isAuth" />
</template>

<script>
import SignUp from './SignUp.vue';
import TrackInfo from './TrackInfo.vue';
import PlayController from './PlayController.vue';
import VolumeBar from './VolumeBar.vue';
export default {
	name: 'Footer',
	inheritAttrs: false,
	components: { TrackInfo, PlayController, VolumeBar, SignUp },
	props: ['trackImgDisplay', 'toggleImg', 'highVol', 'mute'],
	data() {
		return {};
	},
	computed: {
		isAuth() {
			return this.$store.getters.isAuth;
		},
	},
	mounted() {},
};
</script>

<style></style>
