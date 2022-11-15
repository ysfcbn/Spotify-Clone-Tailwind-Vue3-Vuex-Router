<template>
	<div class="absolute bottom-[1px] right-[1px]">
		<svg class="equalizer" width="16" height="16" viewBox="0 0 24 24">
			<rect
				fill="currentColor"
				class="eq-bar eq-bar--1"
				x="4"
				y="4"
				width="3"
				height="8"
			/>
			<rect
				fill="currentColor"
				class="eq-bar eq-bar--2"
				x="9"
				y="4"
				width="3.7"
				height="16"
			/>
			<rect
				fill="currentColor"
				class="eq-bar eq-bar--3"
				x="14"
				y="4"
				width="3.7"
				height="11"
			/>
			<rect
				fill="currentColor"
				class="eq-bar eq-bar--4"
				x="20"
				y="4"
				width="3.7"
				height="18"
			/>
		</svg>
	</div>
</template>

<script>
export default {};
</script>

<style scoped>
.equalizer {
	color: #1db954;
	background-color: transparent;
}

.eq-bar {
	background-color: #1db954;
	transform: scale(1, -1) translate(0, -24px);
}

.eq-bar--1 {
	animation-name: short-eq;
	animation-duration: 0.5s;
	animation-iteration-count: infinite;
	animation-delay: 0s;
}

.eq-bar--1 {
	animation-name: short-eq;
	animation-duration: 0.5s;
	animation-iteration-count: infinite;
	animation-delay: 0s;
}

.eq-bar--2 {
	animation-name: tall-eq;
	animation-duration: 0.5s;
	animation-iteration-count: infinite;
	animation-delay: 0.17s;
}

.eq-bar--3 {
	animation-name: short-eq;
	animation-duration: 0.5s;
	animation-iteration-count: infinite;
	animation-delay: 0.34s;
}

.eq-bar--4 {
	animation-name: tall-eq;
	animation-duration: 0.5s;
	animation-iteration-count: infinite;
	animation-delay: 0.44s;
}

@keyframes short-eq {
	0% {
		height: 8px;
	}

	50% {
		height: 4px;
	}

	100% {
		height: 8px;
	}
}

@keyframes tall-eq {
	0% {
		height: 16px;
	}

	50% {
		height: 6px;
	}

	100% {
		height: 16px;
	}
}
</style>
