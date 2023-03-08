<template>
  <div class="h-screen w-full xs:h-[343px]">
    <picture>
      <source media="(max-width:425px)" :srcset="imageMobile" />
      <source media="(max-width: 768px)" :srcset="imageTablet" />
      <img
        :src="imageDesktop"
        alt=""
        class="h-full w-full object-cover object-center"
      />
    </picture>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    imageMobile: {
      type: String,
    },
    imageTablet: {
      type: String,
    },

    imageDesktop: {
      type: String,
    },
    handleNext: Function,
    handlePrev: Function,
  },
});
</script>

<style lang="scss" scoped></style>
