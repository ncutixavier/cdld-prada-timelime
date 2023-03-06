<template>
  <div
    class="text-[44px] font-bold sm:py-[26px] xs:px-4 xs:text-[20px] leading-[48px] xs:leading-[24px]"
    :style="`color: ${setTitleColor()}`"
  >
    {{ title }}
  </div>
</template>

<script>
import { defineComponent, watchEffect, ref } from "vue";
import { screens } from "@/plugins/breakpoint";

export default defineComponent({
  name: "TimelineTitle",
  props: {
    title: { type: String, required: true },
    titleColorDesktop: {
      type: String,
      default: "#000",
    },
    titleColorTabletMobile: { type: String, default: "#000" },
  },

  setup(props) {
    const breakpoints = ref();

    watchEffect(() => {
      window.addEventListener("resize", () => {
        breakpoints.value = screens();
      });
    });

    const setTitleColor = () => {
      if (breakpoints.value?.mobile || breakpoints.value?.tablet) {
        return props.titleColorTabletMobile;
      }
      if (breakpoints.value?.desktop) {
        return props.titleColorDesktop;
      }
    };

    return { setTitleColor };
  },
});
</script>

<style lang="scss" scoped></style>
