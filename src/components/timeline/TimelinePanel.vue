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
          class="sm:bg-white bg-[#e5e5e5] w-[90%] min-h-[680px] mx-auto grid sm:grid-cols-2"
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
                  <div
                    v-for="p in timelines?.timelineSlides?.length"
                    v-bind:key="p"
                    class="h-[2px] bg-black opacity-30"
                    :style="`width: ${state.progressWidth}%;${
                      p === n + 1 ? 'opacity: 1' : 'opacity: 0.3'
                    };background: ${setTimelineColor()}`"
                  ></div>
                </div>
                <TimelineTitle
                  class="px-2"
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
              <div
                v-for="p in timelines?.timelineSlides?.length"
                v-bind:key="p"
                class="h-[2px] bg-black relative opacity-30"
                :style="`width: ${state.progressWidth}%;${
                  p === n + 1 ? 'opacity:1' : 'opacity:0.3'
                };background: ${setTimelineColor()}`"
              ></div>
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
              class="hidden sm:flex"
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

export default defineComponent({
  components: {
    TimelineLeftPanel,
    TimelineTitle,
    TimelineIconButton,
    Swiper,
    SwiperSlide,
  },

  props: {
    timelines: Object,
  },

  setup(props) {
    const progress = ref(
      Array.from({ length: props.timelines?.timelineSlides?.length }, () => 0)
    );

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
        swiper.on("slideChange", function (e) {
          console.log("*** swiper.activeIndex", e, swiper.realIndex);
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
      progress,
      setTextColor,
      setContainerStyles,
      setTimelineColor,
    };
  },
});
</script>

<style lang="scss" scoped></style>
