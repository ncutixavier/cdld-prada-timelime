<template>
  <div
    class="w-full"
    :class="getImageHeight"
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
  </div>
</template>

<script>
import { defineComponent, computed } from "vue";

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
    isFullScreen: Boolean,
  },
  setup(props) {
    const getImageHeight = computed(() => {
      return props.isFullScreen ? "h-screen" : "h-screen xs:h-[343px]";
    });
    return { getImageHeight };
  },
});
</script>

<style lang="scss" scoped></style>
