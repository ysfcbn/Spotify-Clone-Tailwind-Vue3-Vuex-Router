<template>
	<div
		v-show="showModalContainer"
		@click="closeModal($event)"
		class="modal--container w-full h-full absolute flex bg-light/80 items-center justify-center"
	>
		<transition name="fade">
			<div
				v-show="showModal"
				class="modal bg-dark2 flex flex-col items-center relative z-[999] h-[35rem] w-[40rem] max-w-[40rem] mb-10 rounded-lg gap-y-6"
			>
				<div class="h-[70%] w-[40rem] p-4 relative">
					<div class="pb-8 flex items-center absolute w-full h-full">
						<div
							v-show="index !== 0"
							class="absolute z-30 flex justify-center items-center left-[-16px]"
						>
							<button
								@click="prev"
								class="btn-prev bg-lightest hover:bg-lightest/50 p-2 rounded-full hover:scale-106 shadow-[0_0px_8px_1px_rgba(0,0,0,0.4)]"
							>
								<span class="text-black">
									<svg role="img" height="22" width="22" viewBox="0 0 24 24">
										<path
											fill="currentColor"
											d="M15.957 2.793a1 1 0 010 1.414L8.164 12l7.793 7.793a1 1 0 11-1.414 1.414L5.336 12l9.207-9.207a1 1 0 011.414 0z"
										></path>
									</svg>
								</span>
							</button>
						</div>

						<div
							v-show="index !== 5"
							class="z-30 flex justify-center items-center absolute right-[16px] h-full"
						>
							<button
								@click="next"
								class="btn-next bg-lightest hover:bg-lightest/50 p-2 rounded-full hover:scale-106 shadow-[0_0px_8px_1px_rgba(0,0,0,0.4)]"
							>
								<span class="text-black">
									<svg role="img" height="22" width="22" viewBox="0 0 24 24">
										<path
											fill="currentColor"
											d="M8.043 2.793a1 1 0 000 1.414L15.836 12l-7.793 7.793a1 1 0 101.414 1.414L18.664 12 9.457 2.793a1 1 0 00-1.414 0z"
										></path>
									</svg>
								</span>
							</button>
						</div>
						<div
							class="text-white w-full flex justify-center absolute z-[9999] bottom-2 gap-x-2"
						>
							<span
								@click="jumpIndex((index = i))"
								class="rounded-full px-[5px] bg-lightest text-[10px] text-white cursor-pointer"
								v-for="(item, i) of images.length"
								:key="i"
								:class="{ 'scale-150 translate duration-200': i === index }"
								:id="i"
								>{{ item }}</span
							>
						</div>
					</div>
					<div
						class="w-full h-full bg-dark rounded-lg shadow-[0_1px_15px_4px_rgba(0,0,0,0.9)]"
					>
						<transition name="slide" mode="out-in">
							<img
								v-if="showImage"
								:style="{
									'--translateFrom': translateFrom,
									'--translateLeave': translateLeave,
								}"
								class="w-[100%] h-[100%] rounded-lg cover-object"
								:src="currentImage(index)"
								alt="img"
							/>
						</transition>
					</div>
				</div>
				<transition name="slide">
					<div class="px-5">
						<p
							v-show="showImage"
							class="text-white inline-block flex w-fit font-semibold"
						>
							{{ images[index].description }}
						</p>
					</div>
				</transition>
				<div class="w-full flex items-center absolute bottom-4 justify-between">
					<p class="ml-4 text-md font-semibol text-white">
						This works only for
						<span class="font-semibold text-podcastGreen5">premium</span>
						users!
					</p>
					<button
						@mousedown="leftClick = true"
						@mouseup="leftClick = false"
						@click="understand"
						class="flex items-center gap-x-2 bg-green3 p-3 mr-4 rounded-full text-textColor/80 hover:text-[#ffffff] hover:bg-green font-semibold capitalize text-sm"
						:class="{
							'bg-green3/40 scale-[1]': leftClick,
							'hover:scale-106 hover:bg-green3': !leftClick,
						}"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="14"
							height="14"
							viewBox="0 0 26 20"
						>
							<path
								fill="currentColor"
								d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
							/>
						</svg>
						Understand
					</button>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
export default {
	emits: ['close'],
	props: ['showModal', 'showModalContainer'],
	data() {
		return {
			leftClick: false,
			images: [
				{
					id: 0,
					description:
						'Firstly, go this "https://developer.spotify.com/dashboard/" URL and click "CREATE ANN APP" button.',
					src: new URL(`../../assets/images/0.png`, import.meta.url).href,
				},
				{
					id: 1,
					description: 'Choose your App name and click "CREATE" button.',
					src: new URL(`../../assets/images/1.png`, import.meta.url).href,
				},
				{
					id: 2,
					description:
						'On the screen that appears when you enter the application click "EDİT SETTİNGS" button.',
					src: new URL(`../../assets/images/2.png`, import.meta.url).href,
				},
				{
					id: 3,
					description: `This is most important part.
						1) write in the first field "https://spotify-clone-vue3.vercel.app"
						2) write in the second field "https://spotify-clone-vue3.vercel.app/login"`,
					src: new URL(`../../assets/images/3.png`, import.meta.url).href,
				},
				{
					id: 4,
					description: 'Dont forget to save changes',
					src: new URL(`../../assets/images/4.png`, import.meta.url).href,
				},
				{
					id: 5,
					description:
						'Finaly copy your client ID and paste first input field. Before logging in from this application, you must make sure that you are logged into the original spotify and keep it open as long as the application is running.',
					src: new URL(`../../assets/images/5.png`, import.meta.url).href,
				},
			],
			index: 0,
			translateFrom: '',
			translateLeave: '',
			showImage: true,
			showedAllInfo: false,
		};
	},
	methods: {
		closeModal(e) {
			if (!this.$el.contains(e.target.closest('.modal'))) {
				this.$emit('close');
			}
		},
		currentImage(index) {
			return this.images[index].src;
		},
		next() {
			if (this.index <= 4) {
				this.index++;
				this.translateFrom = 'translateX(-50px)';
				this.translateLeave = 'translateX(50px)';
				this.changeImage();
			}
		},
		prev() {
			if (this.index >= 0) {
				this.index--;
				this.translateFrom = 'translateX(50px)';
				this.translateLeave = 'translateX(-50px)';
				this.changeImage();
			}
		},
		changeImage() {
			this.showImage = false;
			setTimeout(() => {
				this.showImage = true;
			}, 100);
		},
		understand() {
			this.showedAllInfo
				? this.$emit('close')
				: this.$store.dispatch('controller/modalInfoType', {
						type: 'notUnderstand',
				  });
		},
	emits: ['close'],
	props: ['showModal', 'showModalContainer'],
	data() {
		return {
			leftClick: false,
			images: [
				{
					id: 0,
					description:
						'Firstly, go this "https://developer.spotify.com/dashboard/" URL and click "CREATE ANN APP" button.',
					src: new URL(`../../assets/images/0.png`, import.meta.url).href,
				},
				{
					id: 1,
					description: 'Choose your App name and click "CREATE" button.',
					src: new URL(`../../assets/images/1.png`, import.meta.url).href,
				},
				{
					id: 2,
					description:
						'On the screen that appears when you enter the application click "EDİT SETTİNGS" button.',
					src: new URL(`../../assets/images/2.png`, import.meta.url).href,
				},
				{
					id: 3,
					description: `This is most important part.
						1) write in the first field "https://spotify-clone-vue3.vercel.app"
						2) write in the second field "https://spotify-clone-vue3.vercel.app/login"`,
					src: new URL(`../../assets/images/3.png`, import.meta.url).href,
				},
				{
					id: 4,
					description: 'Dont forget to save changes',
					src: new URL(`../../assets/images/4.png`, import.meta.url).href,
				},
				{
					id: 5,
					description:
						'Finaly copy your client ID and paste first input field. Before logging in from this application, you must make sure that you are logged into the original spotify and keep it open as long as the application is running.',
					src: new URL(`../../assets/images/5.png`, import.meta.url).href,
				},
			],
			index: 0,
			translateFrom: '',
			translateLeave: '',
			showImage: true,
			showedAllInfo: false,
		};
	},
	methods: {
		closeModal(e) {
			if (!this.$el.contains(e.target.closest('.modal'))) {
				this.$emit('close');
			}
		},
		currentImage(index) {
			return this.images[index].src;
		},
		next() {
			if (this.index <= 4) {
				this.index++;
				this.translateFrom = 'translateX(-50px)';
				this.translateLeave = 'translateX(50px)';
				this.changeImage();
			}
		},
		prev() {
			if (this.index >= 0) {
				this.index--;
				this.translateFrom = 'translateX(50px)';
				this.translateLeave = 'translateX(-50px)';
				this.changeImage();
			}
		},
		changeImage() {
			this.showImage = false;
			setTimeout(() => {
				this.showImage = true;
			}, 100);
		},
		understand() {
			this.showedAllInfo
				? this.$emit('close')
				: this.$store.dispatch('controller/modalInfoType', {
						type: 'notUnderstand',
				  });
		},

		jumpIndex(index) {
			this.translateFrom = '';
			this.translateLeave = '';
			this.index = index;
			this.changeImage();
		},
	},
	watch: {
		index(newVal) {
			newVal === 5 ? (this.showedAllInfo = true) : '';
		},
	},
	mounted() {
		console.log('how its work mounted');
	},
};
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
	transition: all 0.1s ease-in;
}
.slide-enter-from {
	opacity: 0;
	transform: var(--translateFrom);
}
.slide-leave-to {
	opacity: 0;
	transform: var(--translateLeave);
}

.fade-enter-active,
.fade-leave-active {
	transition: all 0.3s ease-in;
}
.fade-enter-from {
	opacity: 0;
	transform: translateY(30px);
}
.fade-leave-to {
	opacity: 0;
	transform: translateY(30px);
}
</style>
