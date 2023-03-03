<template>
  <div class="min-h-screen flex items-center">
    <Swiper
      :effect="'fade'"
      :slides-per-view="1"
      :modules="modules"
      :autoplay="{
        disableOnInteraction: false,
      }"
    >
      <SwiperSlide
        class="swiper-slide"
        v-for="(timeline, n) in timelines?.timelineSlides"
        :data-swiper-autoplay="
          timeline.singleSlideTiming > 0
            ? `${timeline.singleSlideTiming * 1000}`
            : `${timelines.slideGeneralTiming * 1000}`
        "
        :key="n"
      >
        <div
          class="sm:bg-white bg-[#e5e5e5] w-[90%] mx-auto sm:py-[48px] grid sm:grid-cols-2"
        >
          <div class="">
            <TimelineLeftPanel
              :imageMobile="timeline.imageMobile"
              :imageDesktop="timeline.imageDesktop"
              :imageTablet="timeline.imageTablet"
            >
              <div class="hidden xs:block">
                <div class="flex justify-between items-center">
                  <div
                    v-for="p in timelines?.timelineSlides?.length"
                    v-bind:key="p"
                    class="h-[2px] bg-black relative opacity-30"
                    :style="`width: ${state.progressWidth}%;${
                      p === n + 1 ? 'opacity:1' : 'opacity:0.3'
                    }`"
                  ></div>
                </div>
                <div
                  v-if="timeline.enableInsideTitleMobile"
                  class="text-[44px] font-bold sm:py-[26px] xs:px-2 fadeInBottom"
                >
                  {{ timeline.slideTitle }}
                </div>
              </div>
            </TimelineLeftPanel>
          </div>

          <div class="sm:pl-[79px] sm:pr-[59px] relative">
            <div class="hidden sm:flex justify-between items-center">
              <div
                v-for="p in timelines?.timelineSlides?.length"
                v-bind:key="p"
                class="h-[2px] bg-black relative opacity-30"
                :style="`width: ${state.progressWidth}%;${
                  p === n + 1 ? 'opacity:1' : 'opacity:0.3'
                }`"
              ></div>
            </div>
            <div
              v-if="!timeline.enableInsideTitleMobile"
              class="hidden xs:flex text-[44px] font-bold sm:py-[26px] xs:px-4 fadeInBottom"
            >
              {{ timeline.slideTitle }}
            </div>
            <div
              class="hidden sm:flex text-[44px] font-bold sm:py-[26px] xs:px-4 fadeInBottom"
            >
              {{ timeline.slideTitle }}
            </div>

            <div
              class="xs:text-[14px] text-[16px] font-normal xs:h-[200px] h-[60%] overflow-auto xs:p-5"
            >
              {{ timeline.slideText }}
            </div>
            <div
              class="hidden sm:flex items-center justify-between w-[70px] absolute bottom-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#000000"
                class="w-[24px] h-[24px] cursor-pointer"
                @click="handlePrev"
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
                @click="handleNext"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </div>
          </div>
        </div> </SwiperSlide
    ></Swiper>
  </div>
</template>

<script>
import TimelineLeftPanel from "./TimelineLeftPanel";
import { defineComponent, reactive, onMounted, watchEffect, ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { EffectFade, Autoplay, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

export default defineComponent({
  components: {
    TimelineLeftPanel,
    Swiper,
    SwiperSlide,
  },

  props: {
    timelines: Array,
  },

  setup(props) {
    const progress = ref(
      Array.from({ length: props.timelines?.timelineSlides?.length }, () => 0)
    );

    const state = reactive({
      progressWidth: 0,
      swiper: null,
      progress: Array.from(
        { length: props.timelines?.timelineSlides?.length },
        () => 0
      ),
      screens: {},
    });

    const handleNext = () => {
      const swiper = document.querySelector(".swiper").swiper;
      swiper.slideNext();
    };

    watchEffect(() => {
      // if (state.swiper) {
      //   const swiper = document.querySelector(".swiper").swiper;
      //   console.log(swiper);
      //   swiper.on("slideChange", function (e) {
      //     console.log("*** swiper.activeIndex", e, swiper.realIndex);
      //     startAnimation(e);
      //     document.querySelector(".fadeInBottom").classList.add("fadeInBottom");
      //   });
      // }
    });

    const handlePrev = () => {
      const swiper = document.querySelector(".swiper").swiper;
      swiper.slidePrev();
    };

    onMounted(() => {
      state.progressWidth =
        parseInt(100 / props.timelines?.timelineSlides?.length) - 3;
      state.swiper = document.querySelector(".swiper").swiper;
    });

    return {
      handleNext,
      handlePrev,
      modules: [EffectFade, Autoplay, Pagination],
      state,
      progress,
    };
  },
});
</script>

<style lang="scss" scoped>
.fadeInBottom {
  animation-name: fadeInBottom;
  animation-duration: 0.8s;
  animation-fill-mode: both;
}

@keyframes load {
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
}

@keyframes fadeInBottom {
  from {
    opacity: 0;
    transform: translateY(-30%);
  }
  to {
    opacity: 1;
  }
}
</style>
