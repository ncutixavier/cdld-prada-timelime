<template>
  <div class="timeline-left-panel">
    <div class="sm:h-[584px] xs:h-[466px] relative">
      <picture>
        <source media="(max-width:425px)" :srcset="imageMobile" />
        <source media="(max-width: 768px)" :srcset="imageTablet" />
        <img
          :src="imageDesktop"
          alt=""
          class="h-full w-full object-cover object-center"
        />
      </picture>

      <div class="absolute top-0 w-full">
        <slot />
      </div>
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
  },

});
</script>

<style lang="scss" scoped></style>
