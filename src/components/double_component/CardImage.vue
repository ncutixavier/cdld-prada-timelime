<template>
  <!-- <div class="w-full" :class="getImageHeight"> -->
  <picture>
    <source media="(max-width:425px)" :srcset="imageMobile" />
    <source media="(max-width: 768px)" :srcset="imageTablet" />
    <img
      :src="imageDesktop"
      alt=""
      class="h-full w-full object-cover object-center"
    />
  </picture>
  <!-- </div> -->
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
    imageWidth: Number,
  },
  setup(props) {
    const getImageHeight = computed(() => {
      if (props.isFullScreen) {
        return "h-full";
      } else if (!props.isFullScreen && props.imageWidth === 75) {
        return "h-full xs:h-[75vh]";
      } else {
        return "h-full xs:h-[50vh]";
      }
    });
    return { getImageHeight };
  },
});
</script>

<style lang="scss" scoped></style>
