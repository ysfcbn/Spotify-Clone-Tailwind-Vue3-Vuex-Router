<template>
  <div class="flex m-4 w-[29%] min-w-[12.5rem]">
    <div
      :class="`relative flex items-center justify-center ease-in duration-200 ${
        !trackImgDisplay ? 'right-[5rem] ease-in duration-200' : 'right-[0rem]'
      }`"
    >
      <div class="group img relative shrink-0 mr-4">
        <span
          class="hidden group-hover:block text-lightest w-fit rounded-full p-1 bg-opacblack absolute right-1 top-1 hover:scale-105 hover:bg-opacblack3 hover:text-white"
          @click="toggleImg"
        >
          <svg role="img" height="16" width="16" viewBox="0 0 16 16">
            <path
              fill="currentColor"
              d="M.47 11.03a.75.75 0 001.06 0L8 4.56l6.47 6.47a.75.75 0 101.06-1.06L8 2.44.47 9.97a.75.75 0 000 1.06z"
            ></path>
          </svg>
        </span>
        <img
          width="60"
          height="60"
          src="https://i.scdn.co/image/ab67616d00001e02ba05d7b5b57bfbea40019ab5"
        />
      </div>
      <div class="flex flex-col overflow-x-hidden shrink min-w-[20%]">
        <div class="flex shrink-0 w-fit">
          <p class="text-sm text-white shrink-0 hover:underline">
            Dark Noise (Live In Munich) - Mixed
          </p>
        </div>
        <div class="flex shrink-0 min-w-fit">
          <p
            class="text-[11px] text-lightest shrink-0 hover:underline hover:text-white"
          >
            Jan Blomqvist
          </p>
        </div>
      </div>
      <div class="flex items-center justify-center text-lightest">
        <button class="ml-5">
          <svg
            role="img"
            height="18"
            width="18"
            viewBox="0 0 16 16"
            class="hover:text-white"
          >
            <path
              fill="currentColor"
              d="M1.69 2A4.582 4.582 0 018 2.023 4.583 4.583 0 0111.88.817h.002a4.618 4.618 0 013.782 3.65v.003a4.543 4.543 0 01-1.011 3.84L9.35 14.629a1.765 1.765 0 01-2.093.464 1.762 1.762 0 01-.605-.463L1.348 8.309A4.582 4.582 0 011.689 2zm3.158.252A3.082 3.082 0 002.49 7.337l.005.005L7.8 13.664a.264.264 0 00.311.069.262.262 0 00.09-.069l5.312-6.33a3.043 3.043 0 00.68-2.573 3.118 3.118 0 00-2.551-2.463 3.079 3.079 0 00-2.612.816l-.007.007a1.501 1.501 0 01-2.045 0l-.009-.008a3.082 3.082 0 00-2.121-.861z"
            ></path>
            <path
              fill="none"
              d="M15.724 4.22A4.313 4.313 0 0012.192.814a4.269 4.269 0 00-3.622 1.13.837.837 0 01-1.14 0 4.272 4.272 0 00-6.21 5.855l5.916 7.05a1.128 1.128 0 001.727 0l5.916-7.05a4.228 4.228 0 00.945-3.577z"
            ></path>
          </svg>
        </button>
        <button class="ml-5 hidden">
          <svg
            role="img"
            height="16"
            width="16"
            viewBox="0 0 16 16"
            class="text-lightest hover:text-white"
          >
            <path
              fill="currentColor"
              d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8z"
            ></path>
            <path
              fill="currentColor"
              d="M11.75 8a.75.75 0 01-.75.75H8.75V11a.75.75 0 01-1.5 0V8.75H5a.75.75 0 010-1.5h2.25V5a.75.75 0 011.5 0v2.25H11a.75.75 0 01.75.75z"
            ></path>
          </svg>
        </button>
        <button class="ml-5 hidden">
          <svg
            role="img"
            height="16"
            width="16"
            viewBox="0 0 16 16"
            class="text-green3"
          >
            <path
              fill="currentColor"
              d="M0 8a8 8 0 1116 0A8 8 0 010 8zm11.748-1.97a.75.75 0 00-1.06-1.06l-4.47 4.47-1.405-1.406a.75.75 0 10-1.061 1.06l2.466 2.467 5.53-5.53z"
            ></path>
          </svg>
        </button>

        <button class="ml-4">
          <svg
            class="hover:text-white"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g fill="currentColor" fill-rule="evenodd">
              <path
                d="M1 3v9h14V3H1zm0-1h14a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z"
                fill-rule="nonzero"
              ></path>
              <path fill="currenColor" d="M10 8h4v3h-4z"></path>
            </g>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TrackInfo",
  props: ["toggleImg", "trackImgDisplay"],
  data() {
    return {};
  },
};
</script>

<style></style>
