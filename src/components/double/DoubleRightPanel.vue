<template>
  <div class="bg-gray-500 h-screen w-full xs:h-[343px]">
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
      default:
        "https://images.unsplash.com/photo-1607085941350-7d46c83aa9f5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzh8fHByYWRhJTIwZmFzaGlvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    },
    imageTablet: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1604493972174-eec83b5f5586?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8cHJhZGF8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    },

    imageDesktop: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1610461888750-10bfc601b874?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MnxMdW9TRWFTcjlmY3x8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
    },
  },
});
</script>

<style lang="scss" scoped></style>
