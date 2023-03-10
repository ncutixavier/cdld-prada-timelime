<template>
  <div
    class="sm:py-5 xs:px-2"
    :style="{
      backgroundColor: backgroundColor,
    }"
    :class="setTextAlignment.text"
  >
    <div
      class="uppercase font-medium hidden sm:flex"
      :class="labelPosition"
      :style="getPreTitleStyle"
    >
      {{ preTitle }}
    </div>
    <div class="sm:pt-[20px]">
      <component
        v-bind:is="setTitleTag"
        class="leading-6 font-bold xs:mt-[24px] mb-[12px]"
        :style="getTitleStyle"
        >{{ title }}</component
      >
      <div class="mb-[24px] xs:mb-[20px] font-medium" :style="getDescriptionStyle">
        {{ description }}
      </div>
    </div>
    <div
      class="font-medium text-[14px] uppercase flex gap-6"
      :class="setTextAlignment.link"
    >
      <a
        :href="cta1?.url"
        :style="getCTAStyle(cta1)"
        class="border-b-[1px] border-black"
        >{{ cta1?.label }}</a
      >
      <a :href="cta2?.url" :style="getCTAStyle(cta2)" class="border-b-[1px]">{{
        cta2?.label
      }}</a>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed, ref, watchEffect } from "vue";
import { screens } from "@/plugins/breakpoint";

export default defineComponent({
  name: "double-left-panel",
  props: {
    alignment: String,
    imageWidth: Number,
    backgroundColor: { type: String, default: "#fff" },
    titleHeaderTag: String,
    preTitleStyle: Object,
    preTitle: String,
    titleStyle: Object,
    title: String,
    descriptionStyle: Object,
    description: String,
    cta1: Object,
    cta2: Object,
    ctaStyle: Object,
    cardStyle: String,
  },
  setup(props) {
    const preTitleStyle = ref({ color: "#000", fontSize: 12 });
    const titleStyle = ref({ color: "#000", fontSize: 20 });
    const titleTag = ref("div");
    const descriptionStyle = ref({
      color: "#000",
      fontSize: 14,
      lineHeight: 18,
    });
    const ctaStyle = ref({ color: "#000", borderColor: "#000" });
    const breakpoints = ref();

    watchEffect(() => {
      window.addEventListener("resize", () => {
        breakpoints.value = screens();
      });
    });

    const labelPosition = computed(() => {
      return props.imageWidth === 75 && props.alignment === "center"
        ? `absolute top-0 pt-5`
        : ``;
    });

    const getPreTitleStyle = computed(() => {
      return {
        color: props.preTitleStyle.color
          ? props.preTitleStyle.color
          : preTitleStyle.value.color,
        fontSize: `${
          props.preTitleStyle.fontSize === 0
            ? preTitleStyle.value.fontSize
            : props.preTitleStyle.fontSize
        }px`,
      };
    });

    const getTitleStyle = computed(() => {
      return {
        color: props.titleStyle.color
          ? props.titleStyle.color
          : titleStyle.value.color,
        fontSize: `${
          props.titleStyle.fontSize === 0
            ? titleStyle.value.fontSize
            : props.titleStyle.fontSize
        }px`,
      };
    });

    const getDescriptionStyle = computed(() => {
      return {
        color: props.descriptionStyle.color
          ? props.descriptionStyle.color
          : descriptionStyle.value.color,
        fontSize: `${
          props.descriptionStyle.fontSize === 0
            ? descriptionStyle.value.fontSize
            : props.descriptionStyle.fontSize
        }px`,
        lineHeight: `${
          props.descriptionStyle.lineHeight === 0
            ? descriptionStyle.value.lineHeight
            : props.descriptionStyle.lineHeight
        }px`,
      };
    });

    const setTitleTag = computed(() => {
      return props.titleHeaderTag ? props.titleHeaderTag : titleTag.value;
    });

    const getCTAStyle = (cta) => {
      if (breakpoints.value?.mobile) {
        return cta?.colorFontMobile
          ? {
              color: cta?.colorFontMobile,
              borderColor: cta?.colorFontMobile,
            }
          : ctaStyle.value;
      } else if (breakpoints.value?.tablet) {
        return cta?.colorFontTablet
          ? {
              color: cta?.colorFontTablet,
              borderColor: cta?.colorFontTablet,
            }
          : ctaStyle.value;
      } else {
        return cta?.colorFontDesktop
          ? {
              color: cta?.colorFontDesktop,
              borderColor: cta?.colorFontDesktop,
            }
          : ctaStyle.value;
      }
    };

    const setTextAlignment = computed(() => {
      if (props.cardStyle?.toLowerCase() === "slider") {
        return {
          text: "xs:text-center",
          link: "xs:justify-center",
        };
      } else {
        return { text: "xs:text-left", link: "xs:justify-start" };
      }
    });

    return {
      labelPosition,
      getPreTitleStyle,
      getTitleStyle,
      getDescriptionStyle,
      setTitleTag,
      getCTAStyle,
      setTextAlignment,
    };
  },
});
</script>

<style lang="scss" scoped></style>
