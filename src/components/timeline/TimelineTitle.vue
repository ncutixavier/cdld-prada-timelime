<template>
  <div
    class="text-[44px] font-bold sm:py-[26px] xs:px-4 xs:text-[20px]"
    :style="`color: ${setTitleColor()}`"
  >
    {{ title }}
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { breakpoint } from "@/plugins/breakpoint";

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
    const setTitleColor = () => {
      if (breakpoint.mobile.matches || breakpoint.tablet.matches) {
        return props.titleColorTabletMobile;
      }
      if (breakpoint.desktop.matches) {
        return props.titleColorDesktop;
      }
    };

    return { setTitleColor };
  },
});
</script>

<style lang="scss" scoped></style>
