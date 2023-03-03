<template>
  <div class="timeline-left-panel">
    <div class="md:h-[584px] sm:h-[413px] xs:h-[466px] relative">
      <div
        class="h-full w-full bg-no-repeat bg-cover bg-center"
        :style="{
          backgroundImage: `url(${getImageDependOnDevice()})`,
        }"
      ></div>
      <div class="absolute top-0 w-full">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import useBreakpoints from "vue-next-breakpoints";

export default defineComponent({
  name: "TimelineLeftPanel",
  props: {
    imageDesktop: { type: String, required: true },
    imageMobile: { type: String, required: true },
    imageTablet: { type: String, required: true },
  },

  setup(props) {
    const breakpoints = useBreakpoints({
      mobile: 425,
      tablet: [426, 768],
      desktop: [769],
    });

    const getImageDependOnDevice = () => {
      if (breakpoints.mobile.matches) {
        return props.imageMobile;
      }
      if (breakpoints.tablet.matches) {
        return props.imageTablet;
      }
      if (breakpoints.desktop.matches) {
        return props.imageDesktop;
      }
    };

    return { breakpoints, getImageDependOnDevice };
  },
});
</script>

<style lang="scss" scoped></style>
