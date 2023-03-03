<template>
  <div class="timeline-left-panel">
    <div class="h-[584px] sm:h-[413px] xs:h-[466px] relative">
      <img
        :src="imageTablet"
        alt=""
        v-if="breakpoints.tablet.matches"
        class="object-cover h-full w-full"
      />
      <img
        :src="imageMobile"
        alt=""
        v-else-if="breakpoints.mobile.matches"
        class="object-cover h-full w-full"
      />
      <img
        :src="imageDesktop"
        v-else-if="breakpoints.desktop.matches"
        alt=""
        class="object-cover h-full w-full"
      />
      <div class="absolute top-0 px-2 pt-5 pb-4 w-full">
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

  setup() {
    const breakpoints = useBreakpoints({
      mobile: 425,
      tablet: 768,
      desktop: [769],
    });

    return { breakpoints };
  },
});
</script>

<style lang="scss" scoped></style>
