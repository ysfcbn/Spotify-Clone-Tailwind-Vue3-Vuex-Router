<template>
	<div
		@click="closeModal($event)"
		v-show="showModal"
		class="modal--container w-full h-full absolute flex bg-light/80 items-center justify-center"
	>
		<div
			class="modal flex flex-col items-center relative z-[999] h-[35rem] w-[40rem] max-w-[40rem] mb-10 rounded-lg bg-white gap-y-6"
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
						v-show="index !== 4"
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
							class="rounded-full px-1 bg-lightest text-[10px] text-white"
							v-for="(item, i) of images.length"
							:key="i"
							:class="{ 'scale-150 translate duration-200': i === index }"
							:id="i"
							>{{ item }}</span
						>
					</div>
				</div>
				<div
					class="w-full h-full bg-dark rounded-lg shadow-[0_1px_15px_1px_rgba(0,0,0,0.4)]"
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
						class="capitalize text-black inline-block flex w-fit font-semibold"
					>
						{{ images[index].description }}
					</p>
				</div>
			</transition>
			<div class="w-full flex items-center absolute bottom-4 justify-between">
				<p class="ml-4 text-md font-semibol text-black">
					This works only for
					<span class="font-semibold text-podcastGreen5">premium</span> users!
				</p>
				<button
					@click="$emit('close')"
					class="flex items-center gap-x-2 bg-green3 p-3 mr-4 rounded-full text-textColor/80 hover:text-[#ffffff] hover:bg-green font-semibold capitalize text-sm"
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
	</div>
</template>

<script>
export default {
	emits: ['close'],
	props: ['showModal'],
	data() {
		return {
			images: [
				{
					id: 0,
					description:
						'Firstly, go this "https://developer.spotify.com/dashboard/" URL and click "CREATE ANN APP" button.',
					src: new URL(`../../assets/images/0.png`, import.meta.url).href,
				},
				{
					id: 1,
					description: 'choose your App name and click "CREATE" button.',
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
						1) write in the first field "https://spotify-clone-music.vercel.app"
						2) write in the second field "https://spotify-clone-music.vercel.app/login"`,
					src: new URL(`../../assets/images/3.png`, import.meta.url).href,
				},
				{
					id: 4,
					description: 'Dont forget to save changes',
					src: new URL(`../../assets/images/4.png`, import.meta.url).href,
				},
			],
			index: 0,
			translateFrom: '',
			translateLeave: '',
			showImage: true,
			scrollWrapper: null,
			sliderItems: null,
			scrollVal: null,
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
			}, 200);
		},
	},
	mounted() {
		console.log('wrapper mounted');
		this.scrollWrapper = document.querySelector('.scroll-wrapper');
		this.scrollVal = document.querySelector('.scroll-wrapper');
		this.sliderItems = document.querySelectorAll('.slider-items');
	},
};
</script>

<style>
.slide-enter-active,
.slide-leave-active {
	transition: all 0.3s ease-in;
}
.slide-enter-from {
	opacity: 0;
	transform: var(--translateFrom);
}
.slide-leave-to {
	opacity: 0;
	transform: var(--translateLeave);
}
</style>
