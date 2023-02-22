<template>
	<div class="h-screen relative overflow-x-hidden">
		<AppHowitsWork
			:showModalContainer="showModalContainer"
			:showModal="showModal"
			@close="closeModalFunc(false)"
		></AppHowitsWork>
		<div class="logo">
			<div class="flex justify-center items-center">
				<svg class="w-[12rem] h-[6rem]" role="img" viewBox="0 0 80 24 ">
					<path
						fill="currentColor"
						d="M18.616 10.639c-3.77-2.297-9.99-2.509-13.59-1.388a1.077 1.077 0 0 1-1.164-.363 1.14 1.14 0 0 1-.119-1.237c.136-.262.37-.46.648-.548 4.132-1.287 11-1.038 15.342 1.605a1.138 1.138 0 0 1 .099 1.863 1.081 1.081 0 0 1-.813.213c-.142-.02-.28-.07-.403-.145Zm-.124 3.402a.915.915 0 0 1-.563.42.894.894 0 0 1-.69-.112c-3.144-1.983-7.937-2.557-11.657-1.398a.898.898 0 0 1-.971-.303.952.952 0 0 1-.098-1.03.929.929 0 0 1 .54-.458c4.248-1.323 9.53-.682 13.14 1.595a.95.95 0 0 1 .3 1.286Zm-1.43 3.267a.73.73 0 0 1-.45.338.712.712 0 0 1-.553-.089c-2.748-1.722-6.204-2.111-10.276-1.156a.718.718 0 0 1-.758-.298.745.745 0 0 1-.115-.265.757.757 0 0 1 .092-.563.737.737 0 0 1 .457-.333c4.455-1.045 8.277-.595 11.361 1.338a.762.762 0 0 1 .241 1.028ZM11.696 0C5.237 0 0 5.373 0 12c0 6.628 5.236 12 11.697 12 6.46 0 11.698-5.372 11.698-12 0-6.627-5.238-12-11.699-12h.001Zm20.126 11.078c-2.019-.494-2.379-.84-2.379-1.57 0-.688.633-1.151 1.572-1.151.91 0 1.814.352 2.76 1.076a.131.131 0 0 0 .187-.03l.987-1.426a.139.139 0 0 0-.025-.185c-1.127-.928-2.396-1.378-3.88-1.378-2.18 0-3.703 1.342-3.703 3.263 0 2.06 1.315 2.788 3.585 3.352 1.932.457 2.258.84 2.258 1.524 0 .757-.659 1.229-1.72 1.229-1.18 0-2.141-.408-3.216-1.364a.13.13 0 0 0-.188.016l-1.106 1.35a.137.137 0 0 0 .013.188c1.252 1.147 2.79 1.752 4.451 1.752 2.35 0 3.869-1.317 3.869-3.356 0-1.723-1.003-2.676-3.465-3.29Zm10.487 2.31c0 1.454-.874 2.47-2.125 2.47-1.235 0-2.169-1.061-2.169-2.47 0-1.41.933-2.47 2.17-2.47 1.23 0 2.124 1.038 2.124 2.47Zm-1.706-4.354c-1.018 0-1.854.412-2.543 1.256v-.95a.136.136 0 0 0-.038-.095.132.132 0 0 0-.093-.04h-1.81a.131.131 0 0 0-.093.04.136.136 0 0 0-.039.096v10.546c0 .076.06.137.133.137h1.809a.132.132 0 0 0 .093-.041.136.136 0 0 0 .038-.096v-3.329c.69.794 1.525 1.18 2.543 1.18 1.893 0 3.808-1.494 3.808-4.35 0-2.858-1.915-4.354-3.808-4.354Zm8.72 6.839c-1.297 0-2.274-1.068-2.274-2.486 0-1.422.943-2.455 2.244-2.455 1.305 0 2.288 1.069 2.288 2.487 0 1.422-.949 2.454-2.258 2.454Zm0-6.838c-2.438 0-4.347 1.926-4.347 4.383 0 2.432 1.896 4.338 4.317 4.338 2.445 0 4.36-1.92 4.36-4.369 0-2.44-1.901-4.353-4.33-4.353Zm9.535.17h-1.99V7.117a.136.136 0 0 0-.08-.126.13.13 0 0 0-.052-.01h-1.809a.133.133 0 0 0-.093.04.136.136 0 0 0-.038.095v2.087h-.87a.131.131 0 0 0-.122.085.139.139 0 0 0-.01.052v1.595c0 .074.06.135.132.135h.87v4.126c0 1.667.809 2.513 2.404 2.513.648 0 1.186-.138 1.694-.434a.135.135 0 0 0 .067-.117V15.64a.137.137 0 0 0-.063-.115.13.13 0 0 0-.129-.006c-.349.18-.685.263-1.061.263-.58 0-.84-.271-.84-.876V11.07h1.99a.13.13 0 0 0 .094-.04.136.136 0 0 0 .039-.096V9.339a.137.137 0 0 0-.039-.096.132.132 0 0 0-.094-.04v.001Zm6.934.007v-.255c0-.755.281-1.092.914-1.092.376 0 .68.077 1.019.194a.13.13 0 0 0 .118-.02.135.135 0 0 0 .056-.11V6.365a.137.137 0 0 0-.026-.081.133.133 0 0 0-.068-.05 4.852 4.852 0 0 0-1.502-.22c-1.67 0-2.554.965-2.554 2.788v.393h-.87a.132.132 0 0 0-.093.04.136.136 0 0 0-.038.096v1.603c0 .075.059.136.132.136h.87v6.364c0 .075.058.135.131.135h1.809c.072 0 .131-.06.131-.135V11.07h1.69l2.586 6.362c-.294.669-.583.802-.977.802-.319 0-.654-.098-.998-.29a.133.133 0 0 0-.105-.01.135.135 0 0 0-.078.072l-.612 1.38a.137.137 0 0 0 .056.175 3.733 3.733 0 0 0 1.932.508c1.334 0 2.073-.638 2.724-2.355l3.137-8.317a.14.14 0 0 0-.014-.126.131.131 0 0 0-.108-.06h-1.883a.132.132 0 0 0-.126.092l-1.928 5.651L69.006 9.3a.133.133 0 0 0-.124-.088h-3.09v.001Zm-4.02-.008h-1.809a.132.132 0 0 0-.093.041.136.136 0 0 0-.038.096v8.094c0 .075.06.135.132.135h1.809c.072 0 .131-.06.131-.135V9.34a.136.136 0 0 0-.038-.096.133.133 0 0 0-.094-.04Zm-.896-3.685a1.295 1.295 0 0 0-.919.393c-.243.25-.379.586-.377.937a1.342 1.342 0 0 0 .377.938 1.304 1.304 0 0 0 .92.393c.346-.002.677-.143.92-.393s.379-.587.377-.938c0-.735-.581-1.33-1.296-1.33h-.002Zm15.918 4.49h-.331v.434h.331c.165 0 .264-.083.264-.216 0-.142-.099-.217-.264-.217Zm.215.619.36.517h-.304l-.323-.474h-.279v.474h-.254v-1.37h.595c.31 0 .515.163.515.436a.412.412 0 0 1-.31.417Zm-.282-1.31c-.652 0-1.146.532-1.146 1.183 0 .65.49 1.175 1.139 1.175.652 0 1.147-.532 1.147-1.183 0-.65-.492-1.174-1.14-1.174Zm-.007 2.488a1.259 1.259 0 0 1-.904-.384 1.296 1.296 0 0 1-.368-.92c0-.717.563-1.314 1.279-1.314a1.259 1.259 0 0 1 .903.384 1.295 1.295 0 0 1 .369.921c0 .717-.563 1.314-1.279 1.314Z"
					></path>
				</svg>
			</div>
			<hr class="hr" />
		</div>

		<div class="main-container flex flex-col items-center">
			<div
				class="login-cotainer flex flex-col items-center justify-center mt-[2rem]"
			>
				<p class="text-black text-[14px] mb-2" style="font-weight: 700">
					Devam etmek için Spotify'da oturum aç.
				</p>

				<div class="loginBtns flex flex-col items-center gap-y-3 text-[16px]">
					<button
						class="cursor-default text-white/90 bg-facebook border border-gray2 hover:border-dark rounded-full py-3 w-[28rem] tracking-widest font-semibold flex items-center justify-center"
					>
						<span class="mr-3">
							<svg role="img" height="20" width="20" viewBox="0 0 24 24">
								<path
									fill="rgb(255,255,255,0.9)"
									d="M20 3H4a1 1 0 00-1 1v16a1 1 0 001 1h8.62v-7h-2.35v-2.69h2.35v-2a3.27 3.27 0 013.49-3.59 19.25 19.25 0 012.1.11v2.43h-1.44c-1.13 0-1.35.54-1.35 1.32v1.73h2.69L17.76 14h-2.34v7H20a1 1 0 001-1V4a1 1 0 00-1-1z"
								></path>
							</svg>
						</span>
						FACEBOOK İLE DEVAM ET
					</button>
					<button
						class="cursor-default text-white/90 bg-dark4 border border-gray2 hover:border-dark rounded-full py-3 w-[28rem] tracking-widest font-semibold flex items-center justify-center"
						style="font-weight: 700"
					>
						<span class="mr-3"
							><svg
								fill="#ffffff"
								xmlns="http://www.w3.org/2000/svg"
								width="18"
								height="18"
								viewBox="0 0 496.255 608.728"
							>
								<path
									d="M273.81 52.973C313.806.257 369.41 0 369.41 0s8.271 49.562-31.463 97.306c-42.426 50.98-90.649 42.638-90.649 42.638s-9.055-40.094 26.512-86.971zM252.385 174.662c20.576 0 58.764-28.284 108.471-28.284 85.562 0 119.222 60.883 119.222 60.883s-65.833 33.659-65.833 115.331c0 92.133 82.01 123.885 82.01 123.885s-57.328 161.357-134.762 161.357c-35.565 0-63.215-23.967-100.688-23.967-38.188 0-76.084 24.861-100.766 24.861C89.33 608.73 0 455.666 0 332.628c0-121.052 75.612-184.554 146.533-184.554 46.105 0 81.883 26.588 105.852 26.588z"
								/></svg
						></span>
						APPLE İLE DEVAM ET
					</button>
					<button
						class="cursor-default text-gray border border-gray2 hover:border-dark rounded-full py-3 w-[28rem] tracking-widest font-semibold flex items-center justify-center"
					>
						<span class="mr-3 mt-1">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="18"
								height="18"
								viewBox="0 0 512 512"
							>
								<path
									fill="#fbbb00"
									d="M113.47 309.408 95.648 375.94l-65.139 1.378C11.042 341.211 0 299.9 0 256c0-42.451 10.324-82.483 28.624-117.732h.014L86.63 148.9l25.404 57.644c-5.317 15.501-8.215 32.141-8.215 49.456.002 18.792 3.406 36.797 9.651 53.408z"
								/>
								<path
									fill="#518ef8"
									d="M507.527 208.176C510.467 223.662 512 239.655 512 256c0 18.328-1.927 36.206-5.598 53.451-12.462 58.683-45.025 109.925-90.134 146.187l-.014-.014-73.044-3.727-10.338-64.535c29.932-17.554 53.324-45.025 65.646-77.911h-136.89V208.176h245.899z"
								/>
								<path
									fill="#28b446"
									d="m416.253 455.624.014.014C372.396 490.901 316.666 512 256 512c-97.491 0-182.252-54.491-225.491-134.681l82.961-67.91c21.619 57.698 77.278 98.771 142.53 98.771 28.047 0 54.323-7.582 76.87-20.818l83.383 68.262z"
								/>
								<path
									fill="#f14336"
									d="m419.404 58.936-82.933 67.896C313.136 112.246 285.552 103.82 256 103.82c-66.729 0-123.429 42.957-143.965 102.724l-83.397-68.276h-.014C71.23 56.123 157.06 0 256 0c62.115 0 119.068 22.126 163.404 58.936z"
								/></svg
						></span>
						GOOGLE İLE DEVAM ET
					</button>
				</div>
				<div class="mt-4 flex items-center">
					<hr class="hrs w-[11.5rem]" />
					<span class="text-black text-sm font-semibold mx-4 uppercase"
						>Veya</span
					>
					<hr class="hrs w-[11.5rem]" />
				</div>
			</div>
			<div
				class="w-[28rem] form-container flex flex-col items-start mt-[1rem] gap-y-2"
			>
				<label for="client_id" class="text-sm font-semibold">Client ID</label>
				<div class="relative w-full grid place-items-center">
					<input
						v-model="client_ID"
						:maxlength="maxlenght"
						id="client_id"
						type="text"
						placeholder="Client ID"
						class="border-2 w-full p-2 text-md rounded-md hover:border-dark focus:outline-dark border-gray2 focus:border-4 focus:border-dark font-semibold"
					/>
					<span
						:style="{ color: client_ID.length === 32 ? 'green' : 'gray' }"
						class="absolute right-2"
						>{{ client_ID.length }}/32</span
					>
				</div>
				<label for="secret_secret" class="text-sm font-semibold"
					>Secret ID</label
				>

				<div class="relative w-full grid place-items-center">
					<input
						v-model="client_Secret"
						id="secret_secret"
						type="text"
						placeholder="Secret ID"
						disabled="disabled"
						class="border-2 w-full p-2 text-md rounded-md focus:outline-dark border-gray2/20 focus:border-4 focus:border-dark font-semibold"
					/>
					<span
						:style="{ color: client_Secret.length === 32 ? 'green' : 'gray' }"
						class="absolute right-2"
						>{{ client_Secret.length }}/32</span
					>
				</div>

				<div class="w-full flex justify-content mt-2">
					<button
						@click="openModal"
						class="font-semibold w-fit m-auto text-blue3"
					>
						How it's Work?
					</button>
				</div>

				<button
					@click.prevent="login"
					class="w-full mt-[1rem] rounded-full text-black font-semibold bg-green3 text-md uppercase p-3 hover:scale-105 cursor-default mb-2"
				>
					OTURUM AÇ
				</button>
				<hr class="hrs w-full" />
				<div class="flex flex-col items-center gap-y-4">
					<p class="text-black text-[20px]" style="font-weight: 700">
						Hesabın yok mu?
					</p>

					<button
						class="cursor-default text-md text-gray border border-gray2 hover:border-dark rounded-full py-3 w-[28rem] tracking-widest font-semibold flex items-center justify-center uppercase"
					>
						spotify için kaydol
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { getAuth, accessToken } from '../LoginPage/auth.js';
import AppHowitsWork from '../Modal/AppHowitsWork.vue';

export default {
	components: [AppHowitsWork],
	data() {
		return {
			maxlenght: 32,
			client_ID: '',
			client_Secret: '',
			encodedID: '',
			showModal: false,
			showModalContainer: false,
		};
	},
	methods: {
		login() {
			getAuth(this.client_ID);
		},
		openModal() {
			this.showModal = true;
			this.showModalContainer = true;
		},
		closeModalFunc(val) {
			this.showModal = val;

			setTimeout(() => {
				this.showModalContainer = val;
			}, 300);
		},
	},
	computed: {
		getToken() {
			return this.$store.getters.accessToken;
		},
	},
	watch: {
		getToken(newVal) {
			newVal
				? this.$router.push({ name: 'home' })
				: this.$router.push({ name: 'login' });
		},
	},
	mounted() {
		if (window.location.hash) {
			this.$store.dispatch('getAccessToken', accessToken(window.location.hash));
		}
	},
	components: { AppHowitsWork },
};
</script>

<style scoped>
.hr {
	border: none;
	height: 1px;
	background-color: rgba(7, 7, 7, 0.2);
}
.hrs {
	margin: 12px 0px 20px;
	border-top: 2px solid rgb(217, 218, 220);
}
.form-container input::placeholder {
	color: rgba(0, 0, 0, 0.5);
	font-weight: 600;
	letter-spacing: 2px;
}
.fadeContainer-enter-active,
.fadeContainer-leave-active {
	transition: all 1s ease-in;
}
.fadeContainer-enter-from {
	opacity: 0;
}
.fadeContainer-leave-to {
	opacity: 0;
}
</style>
