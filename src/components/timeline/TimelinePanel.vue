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
      rewind="true"
    >
      <SwiperSlide
        class="swiper-slide"
        :style="setContainerColor()"
        v-for="(timeline, n) in timelines?.timelineSlides"
        :data-swiper-autoplay="
          timeline.singleSlideTiming > 0
            ? `${timeline.singleSlideTiming * 1000}`
            : `${timelines.slideGeneralTiming * 1000}`
        "
        :key="n"
      >
        <div class="grid sm:grid-cols-2" :style="setContainerSpacing()">
          <div>
            <TimelineLeftPanel
              :imageMobile="timeline.imageMobile"
              :imageDesktop="timeline.imageDesktop"
              :imageTablet="timeline.imageTablet"
              :handleNext="handleNext"
              :handlePrev="handlePrev"
              :enableShadowMobile="timeline.enableShadowMobile"
            >
              <div class="hidden xs:block">
                <div
                  class="flex gap-0.5 pt-5 pb-4 px-4"
                >
                  <LinearProgress
                    :style="{ width: `${progressWidth}%` }"
                    v-for="(t, index) in timelines?.timelineSlides"
                    v-bind:key="index"
                    :is-active="index === activeIndex"
                    :progress-time="
                      t.singleSlideTiming > 0
                        ? t.singleSlideTiming * 1000
                        : timelines.slideGeneralTiming * 1000
                    "
                    :activeColor="setTimelineColor()"
                    :isViewed="index < activeIndex"
                    @click="navigateToSpecificSlide(index)"
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
            <div class="hidden sm:flex gap-1">
              <LinearProgress
                :style="{ width: `${progressWidth}%` }"
                v-for="(t, index) in timelines?.timelineSlides"
                v-bind:key="index"
                :is-active="index === activeIndex"
                :progress-time="
                  t.singleSlideTiming > 0
                    ? t.singleSlideTiming * 1000
                    : timelines.slideGeneralTiming * 1000
                "
                :activeColor="setTimelineColor()"
                :isViewed="index < activeIndex"
                @click="navigateToSpecificSlide(index)"
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
              class="xs:text-[14px] text-[16px] font-normal xs:h-[200px] h-[60%] overflow-auto xs:p-5 leading-[22px] xs:leading-[20px]"
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
import { screens } from "@/plugins/breakpoint";
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
    const progressWidth = ref(0);
    const activeIndex = ref(0);
    const breakpoints = ref();
    const state = reactive({
      swiper: null,
    });

    const handleNext = () => {
      const swiper = document.querySelector(".swiper").swiper;
      swiper.slideNext();
    };

    const handlePrev = () => {
      const swiper = document.querySelector(".swiper").swiper;
      swiper.slidePrev();
    };

    const navigateToSpecificSlide = (index) => {
      const swiper = document.querySelector(".swiper").swiper;
      swiper.slideTo(index);
    };

    watchEffect(() => {
      window.addEventListener("resize", () => {
        breakpoints.value = screens();
      });

      if (state.swiper) {
        const swiper = document.querySelector(".swiper").swiper;
        swiper.on("slideChange", (slide) => {
          activeIndex.value = swiper.realIndex;
          let timelineTitle, prevTimelineTitle;
          let currentSlide = slide?.slides[activeIndex.value];
          let previousSlide = slide?.slides[activeIndex.value - 1];

          if (breakpoints.value?.mobile) {
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

    const setTextColor = () => {
      if (breakpoints.value?.mobile || breakpoints.value?.tablet) {
        return props.timelines.textColorTabletMobile;
      }
      if (breakpoints.value?.desktop) {
        return props.timelines.textColorDesktop;
      }
    };

    const setContainerSpacing = () => {
      if (breakpoints.value?.mobile) {
        return `
          margin-top: ${props.timelines.marginTopMobile}px;
          margin-bottom: ${props.timelines.marginBottomMobile}px;`;
      } else if (breakpoints.value?.tablet) {
        return `
          margin-top: ${props.timelines.marginTopTablet}px;
          margin-bottom: ${props.timelines.marginBottomTablet}px;`;
      } else {
        return `
          margin-top: ${props.timelines.marginTop}px;
          margin-bottom: ${props.timelines.marginBottom}px;`;
      }
    };

    const setContainerColor = () => {
      if (breakpoints.value?.mobile || breakpoints.value?.tablet) {
        return {
          backgroundColor: props.timelines.backgroundColorTabletMobile,
        };
      } else {
        return {
          backgroundColor: props.timelines.backgroundColorDesktop,
        };
      }
    };

    const setTimelineColor = () => {
      if (breakpoints.value?.mobile || breakpoints.value?.tablet) {
        return props.timelines.timelineColorTabletMobile;
      }
      if (breakpoints.value?.desktop) {
        return props.timelines.timelineColorDesktop;
      }
    };

    onMounted(() => {
      state.swiper = document.querySelector(".swiper").swiper;
      progressWidth.value = parseInt(
        100 / props.timelines?.timelineSlides?.length
      );
    });

    return {
      handleNext,
      handlePrev,
      modules: [EffectFade, Autoplay, Pagination],
      state,
      setTextColor,
      setContainerSpacing,
      setContainerColor,
      setTimelineColor,
      activeIndex,
      navigateToSpecificSlide,
      progressWidth,
    };
  },
});
</script>

<style lang="scss" scoped>
@keyframes slide {
  from {
    -webkit-transform: translateY(30px);
    transform: translateY(30px);
    opacity: 0;
  }
  to {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
  }
}
.animate-slide {
  animation: slide 0.3s ease-in;
}
</style>
