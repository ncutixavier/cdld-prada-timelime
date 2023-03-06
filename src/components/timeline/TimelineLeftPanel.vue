<template>
  <div class="timeline-left-panel">
    <div
      class="sm:h-[584px] xs:h-[466px] relative"
      :class="enableShadowMobile ? 'xs:shadow-none shadow-md' : 'shadow'"
    >
      <picture>
        <source media="(max-width:425px)" :srcset="imageMobile" />
        <source media="(max-width: 768px)" :srcset="imageTablet" />
        <img
          :src="imageDesktop"
          alt=""
          class="h-full w-full object-cover object-center"
        />
      </picture>

      <div class="absolute top-0 w-full z-10">
        <slot />
      </div>

      <div
        class="hidden xs:block absolute left-0 top-0 w-20 left-mobile-tap h-full"
        @click="handlePrev"
      ></div>
      <div
        @click="handleNext"
        class="hidden xs:block absolute right-0 top-0 w-20 right-mobile-tap h-full"
      ></div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "TimelineLeftPanel",
  props: {
    imageDesktop: { type: String, required: true },
    imageMobile: { type: String, required: true },
    imageTablet: { type: String, required: true },
    handleNext: Function,
    handlePrev: Function,
    enableShadowMobile: Boolean,
  },
});
</script>

<style lang="scss" scoped></style>
