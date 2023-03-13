<template>
  <div :style="setContainerSpacing()">
    <div
      :style="
        data?.showDoubleComponent ? { display: 'flex' } : { display: 'none' }
      "
      class="xs:flex-col-reverse justify-between xs:justify-center xs:items-start relative"
      :class="reverseBlocks"
    >
      <div :class="textClass" class="xs:w-full flex flex-col justify-center">
        <double-component-left-panel
          :imageWidth="imageWidth"
          :alignment="alignment"
          :backgroundColor="
            data.enableTransparentBox ? 'transparent' : setBoxBackgroundColor()
          "
          :preTitleStyle="setPreTitleStyle()"
          :preTitle="data?.preTitle"
          :titleStyle="setTitleStyle()"
          :title="data?.title"
          :titleHeaderTag="data?.titleHeaderTag"
          :descriptionStyle="setDescriptionStyle()"
          :description="data?.description"
          :cta1="data?.cta1"
          :cta2="data?.cta2"
          :cardStyle="data?.cardStyle"
        />
      </div>
      <div :class="imageClass" class="xs:w-full relative">
        <double-component-slider :data="data" v-if="isSliderStyle" />

        <div class="" v-else>
          <card-image
            v-if="singleImageData?.type === 'image'"
            :imageMobile="singleImageData?.image.imageMobile"
            :imageDesktop="singleImageData?.image.imageDesktop"
            :imageTablet="singleImageData?.image.imageTablet"
            :isFullScreen="isFullScreenImage"
          />

          <double-component-video
            v-if="singleImageData?.type === 'video'"
            :isFullScreen="isFullScreenImage"
            :video="singleImageData?.video"
            :breakpoints="breakpoints"
          />

          <div
            class="uppercase z-20 text-[12px] font-medium hidden sm:flex absolute top-5"
            :class="data?.reverseBlocks ? 'left-5' : 'right-5'"
            v-if="imageWidth === 50"
            :style="setTopLabelStyle()"
          >
            {{ data?.topLabel }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed, ref, watchEffect, onMounted } from "vue";
import DoubleComponentSlider from "./DoubleComponentSlider";
import DoubleComponentLeftPanel from "./DoubleComponentLeftPanel.vue";
import { screens } from "@/plugins/breakpoint";
import CardImage from "./CardImage.vue";
import DoubleComponentVideo from "./DoubleComponentVideo.vue";

export default defineComponent({
  name: "index_",
  components: {
    DoubleComponentLeftPanel,
    DoubleComponentSlider,
    CardImage,
    DoubleComponentVideo,
  },
  props: {
    data: Object,
  },
  setup(props) {
    const imageWidth = ref(50);
    const alignment = ref("center");
    const breakpoints = ref();
    const isFullScreenImage = ref();

    const imageClass = computed(() => {
      return imageWidth.value === 75 ? `w-[75%] ` : `w-[50%]`;
    });

    const textClass = computed(() => {
      if (isFullScreenImage.value) {
        return "absolute top-0 z-30";
      } else {
        return imageWidth.value === 75
          ? `sm:w-[25%] sm:px-5`
          : `sm:w-[50%] sm:px-[120px]`;
      }
    });

    const reverseBlocks = computed(() => {
      return props.data?.reverseBlocks ? "flex-row-reverse" : "flex-row";
    });

    const setBoxBackgroundColor = () => {
      if (breakpoints.value?.mobile) {
        return props.data?.boxBackgroundColorMobile;
      } else if (breakpoints.value?.tablet) {
        return props.data?.boxBackgroundColorTablet;
      } else {
        return props.data?.boxBackgroundColorDesktop;
      }
    };

    const setPreTitleStyle = () => {
      if (breakpoints.value?.mobile) {
        return {
          color: props.data?.preTitleColorMobile,
          fontSize: props.data?.preTitleFontSizeMobile,
        };
      } else if (breakpoints.value?.tablet) {
        return {
          color: props.data?.preTitleColorTablet,
          fontSize: props.data?.preTitleFontSizeTablet,
        };
      } else {
        return {
          color: props.data?.preTitleColorDesktop,
          fontSize: props.data?.preTitleFontSizeDesktop,
        };
      }
    };

    const setTitleStyle = () => {
      if (breakpoints.value?.mobile) {
        return {
          color: props.data?.titleColorMobile,
          fontSize: props.data?.titleFontSizeMobile,
        };
      } else if (breakpoints.value?.tablet) {
        return {
          color: props.data?.titleColorTablet,
          fontSize: props.data?.titleFontSizeTablet,
        };
      } else {
        return {
          color: props.data?.titleColorDesktop,
          fontSize: props.data?.titleFontSizeDesktop,
        };
      }
    };

    const setTopLabelStyle = () => {
      if (breakpoints.value?.mobile) {
        return {
          color: props.data?.topLabelColorMobile,
        };
      } else if (breakpoints.value?.tablet) {
        return {
          color: props.data?.topLabelColorTablet,
        };
      } else {
        return {
          color: props.data?.topLabelColorDesktop,
        };
      }
    };

    const setDescriptionStyle = () => {
      if (breakpoints.value?.mobile) {
        return {
          color: props.data?.descriptionColorMobile,
          fontSize: props.data?.descriptionFontSizeMobile,
          lineHeight: props.data?.descriptionLineHeightMobile,
        };
      } else if (breakpoints.value?.tablet) {
        return {
          color: props.data?.descriptionColorTablet,
          fontSize: props.data?.descriptionFontSizeTablet,
          lineHeight: props.data?.descriptionLineHeightTablet,
        };
      } else {
        return {
          color: props.data?.descriptionColorDesktop,
          fontSize: props.data?.descriptionFontSizeDesktop,
          lineHeight: props.data?.descriptionLineHeightDesktop,
        };
      }
    };

    const setContainerSpacing = () => {
      if (breakpoints.value?.mobile) {
        return {
          marginTop: props.data?.marginTopMobile,
          marginBottom: props.data?.marginBottomMobile,
        };
      } else if (breakpoints.value?.tablet) {
        return {
          marginTop: props.data?.marginTopTablet,
          marginBottom: props.data?.marginBottomTablet,
        };
      } else {
        return {
          marginTop: props.data?.marginTop,
          marginBottom: props.data?.marginBottom,
        };
      }
    };

    watchEffect(() => {
      window.addEventListener("resize", () => {
        breakpoints.value = screens();
      });

      isFullScreenImage.value =
        breakpoints.value?.mobile &&
        !isSliderStyle.value &&
        props.data?.layoutMobile?.toLowerCase() === "inside";

      imageWidth.value = props.data?.layoutDesktop
        ? parseInt(props.data?.layoutDesktop.split("/")[1])
        : 50;
    });

    const isSliderStyle = computed(
      () => props.data?.cardStyle?.toLowerCase() === "slider"
    );

    const singleImageData = computed(
      () => props.data?.cardsSingleImage[0].mediaType
    );

    onMounted(() => {
      breakpoints.value = screens();
    });

    return {
      imageClass,
      imageWidth,
      textClass,
      alignment,
      reverseBlocks,
      setBoxBackgroundColor,
      setPreTitleStyle,
      setTitleStyle,
      setDescriptionStyle,
      setContainerSpacing,
      setTopLabelStyle,
      isSliderStyle,
      singleImageData,
      isFullScreenImage,
      breakpoints,
    };
  },
});
</script>

<style lang="scss" scoped></style>
