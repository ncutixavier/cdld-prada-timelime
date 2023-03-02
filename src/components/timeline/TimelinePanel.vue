<template>
  <div class="timeline-panel min-h-screen flex items-center">
    <div
      class="bg-white w-[100%] sm:mx-[53px] sm:py-[48px] grid sm:grid-cols-2"
    >
      <div class=""><timeline-left-panel /></div>
      <div
        class="timeline-panel-description sm:pl-[79px] sm:pr-[59px]"
      >
        <div class="text-[44px] font-bold sm:py-[26px]">1998</div>
        <div class="text-[16px] font-normal sm:h-[445px] overflow-auto">
          Starting from the idea of raising the performance dictated by the Luna
          Rossa team's needs, Prada designed the iconic sneaker in 1998,
          intending to increase their capabilities.

        </div>
        <div class="flex items-center justify-between w-[70px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#000000"
            class="w-[24px] h-[24px] cursor-pointer"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#000000"
            class="w-[24px] h-[24px] cursor-pointer"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TimelineLeftPanel from "./TimelineLeftPanel";
export default {
  components: {
    TimelineLeftPanel,
  },
};
</script>

<style lang="scss" scoped></style>
