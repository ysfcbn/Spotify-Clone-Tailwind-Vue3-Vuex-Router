<template>
	<section class="main-search text-white relative h-full">
		<div class="mb-3">
			<div class="h-fit">
				<h2 class="text-[1.5rem] text-white leading-7 tracking-tight">
					En çok dinlediğin türler
				</h2>
			</div>
		</div>

		<div class="wrapper-container relative mb-[17rem]">

			<div
				class="absolute z-30 flex justify-center items-center left-[-18px] h-[13rem]"
			>
				<button
					@click="prev"
					class="btn-prev bg-[#f6f6f6] hover:bg-[#fff] p-3 rounded-full hover:scale-110"
				>
					<span class="text-black">
						<svg
							role="img"
							height="24"
							width="24"
							viewBox="0 0 24 24"
							class="Svg-sc-1bi12j5-0 jgfuCe"
						>
							<path
								fill="currentColor"
								d="M15.957 2.793a1 1 0 010 1.414L8.164 12l7.793 7.793a1 1 0 11-1.414 1.414L5.336 12l9.207-9.207a1 1 0 011.414 0z"
							></path>
						</svg>
					</span>
				</button>
			</div>

			<div
				class="z-30 flex justify-center items-center absolute right-[-22px] h-full h-[13rem]"
			>
				<button
					@click="next"
					class="btn-next bg-[#fff] hover:bg-[#fff] p-3 rounded-full hover:scale-110"
				>
					<span class="text-black">
						<svg
							role="img"
							height="24"
							width="24"
							viewBox="0 0 24 24"
							class="Svg-sc-1bi12j5-0 jgfuCe"
						>
							<path
								fill="currentColor"
								d="M8.043 2.793a1 1 0 000 1.414L15.836 12l-7.793 7.793a1 1 0 101.414 1.414L18.664 12 9.457 2.793a1 1 0 00-1.414 0z"
							></path>
						</svg>
					</span>
				</button>
			</div>

			<div class="scroll-wrapper absolute w-full h-fit z-0 overflow-hidden">
				<div
					class="grid grid-cols-col8 grid-rows-1 auto-rows-0 gap-x-20 h-fit relative"
				>
					<a
						class="slider-items col-span-2 bg-purplee h-[220px] relative overflow-hidden rounded-lg w-fit"
					>
						<div class="">
							<h3
								class="px-5 mt-7 text-[40px] text-white leading-7 tracking-tighter font-semibold w-[400px]"
							>
								Dans ve Elektronik
							</h3>
							<img
								class="h-[128px] w-[128px] object-cover mb-5 absolute rotate-[25deg] translate-x-[18%] translate-y-[-2%] bottom-[-2rem] right-0"
								src="	https://i.scdn.co/image/ab67706f000000020377baccf69ede3cf1a26eff"
								alt=""
							/>
						</div>
					</a>

					<a
						class="slider-items col-span-2 bg-red h-[220px] relative overflow-hidden rounded-lg w-fit"
					>
						<div class="">
							<h3
								class="px-5 mt-7 text-[40px] text-white leading-7 tracking-tighter font-semibold w-[400px]"
							>
								Dans ve Elektronik
							</h3>
							<img
								class="h-[128px] w-[128px] object-cover mb-5 absolute rotate-[25deg] translate-x-[18%] translate-y-[-2%] bottom-[-2rem] right-0"
								src="	https://i.scdn.co/image/ab67706f000000020377baccf69ede3cf1a26eff"
								alt=""
							/>
						</div>
					</a>
					<a
						class="slider-items col-span-2 bg-purplee2 h-[220px] relative overflow-hidden rounded-lg w-fit"
					>
						<div class="">
							<h3
								class="px-5 mt-7 text-[40px] text-white leading-7 tracking-tighter font-semibold w-[400px]"
							>
								Dans ve Elektronik
							</h3>
							<img
								class="h-[128px] w-[128px] object-cover mb-5 absolute rotate-[25deg] translate-x-[18%] translate-y-[-2%] bottom-[-2rem] right-0"
								src="	https://i.scdn.co/image/ab67706f000000020377baccf69ede3cf1a26eff"
								alt=""
							/>
						</div>
					</a>
					<a
						class="slider-items last-slide col-span-2 bg-orange h-[220px] relative overflow-hidden rounded-lg w-fit"
					>
						<div class="">
							<h3
								class="px-5 mt-7 text-[40px] text-white leading-7 tracking-tighter font-semibold w-[400px]"
							>
								Dans ve Elektronik
							</h3>
							<img
								class="h-[128px] w-[128px] object-cover mb-5 absolute rotate-[25deg] translate-x-[18%] translate-y-[-2%] bottom-[-2rem] right-0"
								src="	https://i.scdn.co/image/ab67706f000000020377baccf69ede3cf1a26eff"
								alt=""
							/>
						</div>
					</a>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
//slider

export default {
	data() {
		return {
			scrollWrapper: null,
			sliderItems: null,
			scrollVal: null,
		};
	},
	methods: {
		next() {
			this.scrollWrapper.scrollLeft += 400;

			this.scrollVal.addEventListener('scroll', e => {
				const scroble = e.target.scrollLeft;
				let liveScroll = e.target;
			});
			this.lastSlide();
		},
		prev() {
			this.scrollWrapper.scrollLeft -= 400;
		},
		lastSlide() {
			let last =
				this.sliderItems[this.sliderItems.length - 1].getBoundingClientRect();
		},
	},

	mounted() {
		console.log('wrapper mounted');
		this.scrollWrapper = document.querySelector('.scroll-wrapper');
		this.scrollVal = document.querySelector('.scroll-wrapper');

		this.sliderItems = document.querySelectorAll('.slider-items');
	},

	beforeMount() {
		console.log('wrapper beforeMount');
	},
	unmounted() {
		console.log('wrapper unMount');
	},
	beforeUnmount() {
		console.log('wrapper beforeUnmount');
	},
};
</script>

<style scoped>
.scroll-wrapper {
	scroll-behavior: smooth;
}

.wrapper-container button:active {
	background: #b3b3b3;
}
</style>
