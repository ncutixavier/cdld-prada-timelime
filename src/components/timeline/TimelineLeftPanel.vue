<template>
  <div class="timeline-left-panel">
    <div class="sm:h-[584px] xs:h-[466px] lg:h-[684px] relative">
      <img
        :src="getImageDependOnDevice()"
        alt=""
        srcset=""
        class="h-full w-full object-cover object-top lg:object-center"
      />
      <div class="absolute top-0 w-full">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { breakpoint } from "@/plugins/breakpoint";

export default defineComponent({
  name: "TimelineLeftPanel",
  props: {
    imageDesktop: { type: String, required: true },
    imageMobile: { type: String, required: true },
    imageTablet: { type: String, required: true },
  },

  setup(props) {

    const getImageDependOnDevice = () => {
      if (breakpoint.mobile.matches) {
        return props.imageMobile;
      }
      if (breakpoint.tablet.matches) {
        return props.imageTablet;
      }
      if (breakpoint.desktop.matches) {
        return props.imageDesktop;
      }
    };

    return { getImageDependOnDevice };
  },
});
</script>

<style lang="scss" scoped></style>
