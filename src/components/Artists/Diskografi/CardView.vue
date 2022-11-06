<template>
	<div
		id="cardIntersect"
		class="h-[7rem]] w-full absolute bg-red top-[-4rem]"
	></div>
	<section class="cardWrapper mt-[2rem] sm:mx-[1rem] lg:mx-[2rem]">
		<div
			class="relative grid grid-cols-colDiscoCard grid-rows-rowDiscoCard gap-5"
		>
			<div
				v-for="album in renderTypes"
				:key="album.id"
				:id="album.id"
				class="bg-dark1 hover:bg-opacblack1 ease duration-300 w-full h-auto cursor-pointer rounded-md flex-1 isolate p-4 relative"
			>
				<div class="h-full group">
					<div class="w-full mb-5 relative">
						<img
							class="h-full w-full object-cover"
							:src="album?.images[0]?.url"
							alt=""
						/>
						<div
							class="right-0 bottom-0 p-2 absolute flex items-center right-0 bottom-0 py-1 px-2 group-hover:block opacity-0 group-hover:opacity-100 transition ease-in duration-200 group-hover:translate-y-[-0.4rem]"
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
					</div>
					<div class="flex items-middle flex-col justify-center">
						<div class="text-white max-w-full truncate">{{ album.name }}</div>
						<div class="text-sm text-lightest w-full mt-2">
							{{ cartAlbumYear(album.release_date) }}
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	name: 'CardList',
	props: ['viewCard', 'renderTypes'],
	data() {
		return {};
	},
	methods: {
		cartAlbumYear(currentSection) {
			return new Date(currentSection).getFullYear();
		},
	},

	mounted() {
		if (this.viewCard) {
			console.log('CardList Mounted!');

			this.header = document.getElementById('header');
			this.diskoHeader = document.getElementById('diskoHeader');
			this.CardEl = document.getElementById('cardIntersect');

			this.header.classList.remove('disko-intersec-bg1');
			this.diskoHeader.classList.remove('list--view-intersect');

			this.options = {
				root: null,
				threshold: 0.5,
			};

			this.observer = new IntersectionObserver((entries, obs) => {
				if (entries[0].intersectionRatio <= 0.5) {
					console.log(obs, entries[0].target, entries[0]);
					this.header.classList.add('disko-intersec-bg1');

					this.diskoHeader.classList.add('list--view-intersect');
				} else {
					console.log(obs, entries[0].target, entries[0]);

					this.header.classList.remove('disko-intersec-bg1');

					this.diskoHeader.classList.remove('list--view-intersect');
				}
			}, this.options);

			this.observer.observe(this.CardEl);
		}
	},
	beforeUnmount() {
		this.observer.unobserve(this.CardEl);
		this.header.classList.remove('disko-intersec-bg1');
		this.diskoHeader.classList.remove('list--view-intersect');
	},
};
</script>

<style></style>
