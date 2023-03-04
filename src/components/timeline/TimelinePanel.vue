<template>
  <div
    class="min-h-screen items-center"
    :style="timelines.showTimeline ? 'display: flex' : 'display: none'"
  >
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
          class="xs:w-[90%] sm:w-[90%] w-[80%] mx-auto grid sm:grid-cols-2"
          :style="setContainerStyles()"
        >
          <div>
            <TimelineLeftPanel
              :imageMobile="timeline.imageMobile"
              :imageDesktop="timeline.imageDesktop"
              :imageTablet="timeline.imageTablet"
            >
              <div class="hidden xs:block">
                <div class="flex justify-between items-center pt-5 pb-4 px-4">
                  <LinearProgress
                    :style="`width: ${state.progressWidth}%;`"
                    v-for="(t, index) in timelines?.timelineSlides"
                    v-bind:key="index"
                    :is-active="index === activeIndex"
                    :progress-time="
                      t.singleSlideTiming > 0
                        ? t.singleSlideTiming * 1000
                        : timelines.slideGeneralTiming * 1000
                    "
                    :activeColor="setTimelineColor()"
                  />
                </div>
                <TimelineTitle
                  class="px-2 year-mobile"
                  v-if="timeline.enableInsideTitleMobile"
                  :title="timeline.slideTitle"
                  :titleColorDesktop="timelines.titleColorDesktop"
                  :titleColorTabletMobile="timelines.titleColorTabletMobile"
                />
              </div>
            </TimelineLeftPanel>
          </div>

          <div class="sm:pl-[79px] sm:pr-[59px] relative">
            <div class="hidden sm:flex justify-between items-center">
              <LinearProgress
                :style="`width: ${state.progressWidth}%;`"
                v-for="(t, index) in timelines?.timelineSlides"
                v-bind:key="index"
                :is-active="index === activeIndex"
                :progress-time="
                  t.singleSlideTiming > 0
                    ? t.singleSlideTiming * 1000
                    : timelines.slideGeneralTiming * 1000
                "
                :activeColor="setTimelineColor()"
              />
            </div>

            <!-- display only on mobile if not enabled inside -->
            <TimelineTitle
              v-if="!timeline.enableInsideTitleMobile"
              :title="timeline.slideTitle"
              class="hidden xs:flex mt-5"
              :titleColorDesktop="timelines.titleColorDesktop"
              :titleColorTabletMobile="timelines.titleColorTabletMobile"
            />

            <!-- display from tablet -->
            <TimelineTitle
              :title="timeline.slideTitle"
              class="hidden sm:flex year"
              :titleColorDesktop="timelines.titleColorDesktop"
              :titleColorTabletMobile="timelines.titleColorTabletMobile"
            />

            <div
              class="xs:text-[14px] text-[16px] font-normal xs:h-[200px] h-[60%] overflow-auto xs:p-5"
              :style="`color: ${setTextColor()}`"
            >
              {{ timeline.slideText }}
            </div>
            <div
              class="hidden sm:flex items-center justify-between w-[70px] absolute bottom-0"
            >
              <TimelineIconButton
                icon="M15.75 19.5L8.25 12l7.5-7.5"
                :stroke="timelines.arrowsColorDesktop"
                @click="handlePrev"
              />
              <TimelineIconButton
                icon="M8.25 4.5l7.5 7.5-7.5 7.5"
                :stroke="timelines.arrowsColorDesktop"
                @click="handleNext"
              />
            </div>
          </div>
        </div> </SwiperSlide
    ></Swiper>
  </div>
</template>

<script>
import TimelineLeftPanel from "./TimelineLeftPanel";
import TimelineTitle from "./TimelineTitle";
import TimelineIconButton from "./TimelineIconButton";
import { defineComponent, reactive, onMounted, watchEffect, ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { EffectFade, Autoplay, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { breakpoint } from "@/plugins/breakpoint";
import LinearProgress from "./LinearProgress";

export default defineComponent({
  components: {
    TimelineLeftPanel,
    TimelineTitle,
    TimelineIconButton,
    Swiper,
    SwiperSlide,
    LinearProgress,
  },

  props: {
    timelines: Object,
    autoplay: { type: Boolean, default: true },
  },

  setup(props) {
    // const progress = ref(
    //   Array.from({ length: props.timelines?.timelineSlides?.length }, () => 0)
    // );
    const activeIndex = ref(0);
    const state = reactive({
      progressWidth: 0,
      swiper: null,
    });

    const handleNext = () => {
      const swiper = document.querySelector(".swiper").swiper;
      swiper.slideNext();
    };

    watchEffect(() => {
      if (state.swiper) {
        const swiper = document.querySelector(".swiper").swiper;
        swiper.on("slideChange", (slide) => {
          activeIndex.value = swiper.realIndex;
          let timelineTitle, prevTimelineTitle;
          let currentSlide = slide?.slides[activeIndex.value];
          let previousSlide = slide?.slides[activeIndex.value - 1];

          if (breakpoint.mobile.matches) {
            timelineTitle = currentSlide?.querySelector(".year-mobile");
            prevTimelineTitle = previousSlide?.querySelector(".year-mobile");
          } else {
            timelineTitle = currentSlide?.querySelector(".year");
            prevTimelineTitle = previousSlide?.querySelector(".year");
          }

          timelineTitle?.classList.remove("animate-slide");
          timelineTitle?.classList.add("animate-slide");
          prevTimelineTitle?.classList.remove("animate-slide");
        });
      }
    });

    const handlePrev = () => {
      const swiper = document.querySelector(".swiper").swiper;
      swiper.slidePrev();
    };

    const setTextColor = () => {
      if (breakpoint.mobile.matches || breakpoint.tablet.matches) {
        return props.timelines.textColorTabletMobile;
      }
      if (breakpoint.desktop.matches) {
        return props.timelines.textColorDesktop;
      }
    };

    const setContainerStyles = () => {
      if (breakpoint.mobile.matches) {
        return `
          padding-top: ${props.timelines.marginTopMobile}px;
          padding-bottom: ${props.timelines.marginBottomMobile}px;
          background: ${props.timelines.backgroundColorTabletMobile}`;
      } else if (breakpoint.tablet.matches) {
        return `
          padding-top: ${props.timelines.marginTopTablet}px;
          padding-bottom: ${props.timelines.marginBottomTablet}px;
          background: ${props.timelines.backgroundColorTabletMobile}`;
      } else {
        return `
          padding-top: ${props.timelines.marginTop}px;
          padding-bottom: ${props.timelines.marginBottom}px;
          background: ${props.timelines.backgroundColorDesktop}`;
      }
    };

    const setTimelineColor = () => {
      if (breakpoint.mobile.matches || breakpoint.tablet.matches) {
        return props.timelines.timelineColorTabletMobile;
      }
      if (breakpoint.desktop.matches) {
        return props.timelines.timelineColorDesktop;
      }
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
      setTextColor,
      setContainerStyles,
      setTimelineColor,
      activeIndex,
    };
  },
});
</script>

<style lang="scss" scoped>
@keyframes slide {
  from {
    opacity: 0;
    transform: translateY(-30%);
  }
  to {
    opacity: 1;
  }
}
.animate-slide {
  animation: slide 1s ease-in;
}
</style>
