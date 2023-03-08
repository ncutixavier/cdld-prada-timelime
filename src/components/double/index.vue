<template>
  <div
    class="flex xs:flex-col-reverse justify-between xs:justify-center xs:items-start"
  >
    <div :class="textClass" class="xs:w-full relative">
      <double-left-panel
        :imageWidth="imageWidth"
        :alignment="alignment"
        class="double-text"
        label="GIFT FOR HER"
        :data="imageDetails"
      />
    </div>
    <div :class="imageClass" class="xs:w-full relative">
      <Swiper
        :slides-per-view="1"
        :speed="1000"
        :modules="modules"
        :autoplay="{
          disableOnInteraction: false,
        }"
        loop="true"
        ref="swiperContainer"
      >
        <SwiperSlide
          v-for="(slide, n) in data.slides"
          :data-swiper-autoplay="`${data.slideGeneralTiming * 1000}`"
          :key="n"
          v-on:mouseover="handlePause"
          v-on:mouseleave="handleLeavePause"
        >
          <DoubleRightPanel
            :imageMobile="slide.imageMobile"
            :imageDesktop="slide.imageDesktop"
            :imageTablet="slide.imageTablet"
          />
          <div
            class="uppercase text-[12px] font-medium hidden sm:flex text-white absolute right-5 top-5"
            v-if="imageWidth === 50"
          >
            GIFT FOR HER
          </div>

          <div
            class="text-[14px] font-medium hidden sm:flex text-gray-800 absolute left-[60%] top-[30%]"
            v-if="showImageLabel"
          >
            {{ slide.slideText }}
          </div>
        </SwiperSlide></Swiper
      >
      <div
        class="absolute left-0 top-0 z-10 xs:w-[34px] w-[46px] h-full flex justify-center items-center"
      >
        <div
          class="h-[6%] w-full flex justify-center items-center cursor-pointer"
          @click="handlePrev"
        >
          <TimelineIconButton
            icon="M15.75 19.5L8.25 12l7.5-7.5"
            stroke="#000"
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
            stroke="#000"
            size="h-[12px] w-[12px]"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TimelineIconButton from "../timeline/TimelineIconButton.vue";
import { defineComponent, computed, ref, watchEffect, onMounted } from "vue";
import DoubleRightPanel from "./DoubleRightPanel";
import DoubleLeftPanel from "./DoubleLeftPanel.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Pagination, EffectFade } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

export default defineComponent({
  name: "index_",
  components: {
    DoubleRightPanel,
    DoubleLeftPanel,
    Swiper,
    SwiperSlide,
    TimelineIconButton,
  },
  props: {
    data: Object,
  },
  setup(props) {
    console.log("DATA::", props.data?.slides);
    const imageWidth = ref(50);
    const alignment = ref("center");
    const swiperContainer = ref(null);
    const activeIndex = ref(0);
    const showImageLabel = ref(false);
    const imageDetails = ref(null);

    const imageClass = computed(() => {
      return imageWidth.value === 75 ? `w-[75%] ` : `w-[50%]`;
    });

    const textClass = computed(() => {
      return imageWidth.value === 75
        ? `sm:w-[25%] sm:pl-5`
        : `sm:w-[50%] sm:pl-[120px]`;
    });

    const handlePause = () => {
      const swiper = swiperContainer.value.$el.swiper;
      swiper.autoplay.stop();
      showImageLabel.value = true;
    };

    const handleLeavePause = () => {
      swiperContainer.value.$el.swiper.autoplay.start();
      showImageLabel.value = false;
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
        swiper.on("slideChange", (slide) => {
          activeIndex.value = swiper.realIndex;
          imageDetails.value = props.data?.slides[swiper.realIndex];
          console.log(slide);
        });
      }
    });

    onMounted(() => {
      imageDetails.value = props.data?.slides[0];
    });

    return {
      imageClass,
      imageWidth,
      textClass,
      alignment,
      modules: [Autoplay, Pagination, EffectFade],
      handleNext,
      handlePrev,
      swiperContainer,
      handlePause,
      handleLeavePause,
      showImageLabel,
      imageDetails,
    };
  },
});
</script>

<style lang="scss" scoped></style>
