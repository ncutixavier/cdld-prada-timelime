<template>
  <div class="relative slider-container z-10 cursor-none h-full">
    <Swiper
      :slides-per-view="imageWidth === 75 ? 1.4 : 1"
      :speed="data.sliderSpeed ? data.sliderSpeed * 2000 : 1000"
      :modules="modules"
      :autoplay="{
        disableOnInteraction: true,
      }"
      :loop="data?.enableInfiniteScroll ?? false"
      ref="swiperContainer"
      :space-between="2"
      class="h-full"
    >
      <SwiperSlide
        v-for="(slide, n) in data?.cardsSlider"
        :data-swiper-autoplay="`${data.slideGeneralTiming * 1000}`"
        :key="n"
        v-on:mouseover="handlePause"
        v-on:mouseleave="handleLeavePause"
      >
        <card-image
          :imageMobile="slide.imageMobile"
          :imageDesktop="slide.imageDesktop"
          :imageTablet="slide.imageTablet"
          :imageWidth="imageWidth"
          :isFullScreen="isFullScreen"
        /> </SwiperSlide
    ></Swiper>
    <div
      class="absolute left-0 top-0 z-10 xs:w-[34px] w-[46px] h-full flex justify-center items-center"
    >
      <div
        class="h-[6%] w-full flex justify-center items-center cursor-pointer"
        @click="handlePrev"
      >
        <TimelineIconButton
          icon="M15.75 19.5L8.25 12l7.5-7.5"
          stroke="#fff"
          size="h-[12px] w-[12px]"
        />
      </div>
    </div>
    <div
      class="absolute right-0 top-0 z-10 xs:w-[34px] w-[46px] h-full flex justify-center items-center"
    >
      <div
        class="h-[6%] w-full flex justify-center items-center cursor-pointer"
        @click="handleNext"
      >
        <TimelineIconButton
          icon="M8.25 4.5l7.5 7.5-7.5 7.5"
          stroke="#fff"
          size="h-[12px] w-[12px]"
        />
      </div>
    </div>
  </div>
  <div class="custom-cursor z-50 flex items-center text-white">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-6 h-6 mr-2"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
      />
    </svg>
    {{ data?.title }}
  </div>
</template>

<script>
import { defineComponent, ref, watchEffect, onMounted } from "vue";
import CardImage from "./CardImage.vue";
import TimelineIconButton from "../timeline/TimelineIconButton.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Pagination, EffectFade } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

export default defineComponent({
  components: {
    CardImage,
    TimelineIconButton,
    Swiper,
    SwiperSlide,
  },
  props: {
    data: Object,
    imageWidth: Number,
    isFullScreen: Boolean,
  },
  setup(props) {
    const swiperContainer = ref(null);

    const handlePause = () => {
      const swiper = swiperContainer.value.$el.swiper;
      swiper.autoplay.stop();
    };

    const handleLeavePause = () => {
      swiperContainer.value.$el.swiper.autoplay.start();
    };

    const handleNext = () => {
      swiperContainer.value.$el.swiper.slideNext();
    };

    const handlePrev = () => {
      swiperContainer.value.$el.swiper.slidePrev();
    };

    watchEffect(() => {
      if (swiperContainer.value) {
        const swiper = swiperContainer.value.$el.swiper;

        if (props.data?.enableAutoplay) {
          swiper.autoplay.start();
        } else {
          swiper.autoplay.stop();
        }
      }
    });

    onMounted(() => {
      const cursor = document.querySelector(".custom-cursor");
      const sliderContainer = document.querySelector(".slider-container");

      sliderContainer.addEventListener("mousemove", (e) => {
        cursor.style.left = e.pageX + "px";
        cursor.style.top = e.pageY + "px";
      });
    });

    return {
      handleNext,
      handlePrev,
      swiperContainer,
      handlePause,
      handleLeavePause,
      modules: [Autoplay, Pagination, EffectFade],
    };
  },
});
</script>

<style lang="scss" scoped>
.custom-cursor {
  position: fixed;
  pointer-events: none;
  height: 50px;
}
</style>
