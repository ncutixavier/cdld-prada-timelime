<template>
  <div
    class="sm:py-5 xs:px-2 xs:text-center sm:h-screen flex flex-col"
    :class="textAlignment"
    :style="{
      backgroundColor: backgroundColor,
    }"
  >
    <div
      class="uppercase text-[12px] font-medium hidden sm:flex"
      :class="labelPosition"
    >
      {{ data?.slideTitle }}
    </div>
    <div class="mt-4 xs:mt-6 mb-6 xs:mb-5">
      <div class="text-[20px] leading-6 font-bold">Galleria Bag</div>
      <div class="text-[14px] leading-[18px] mt-4 xs:mt-3 font-medium">
        {{ data?.slideText }}
      </div>
    </div>
    <div class="font-medium text-[14px] uppercase flex xs:justify-center gap-6">
      <router-link to="/" class="border-b-[1px] border-black"
        >shop now</router-link
      >
      <router-link to="/" class="border-b-[1px] border-black"
        >discover all bags</router-link
      >
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from "vue";
export default defineComponent({
  name: "double-left-panel",
  props: {
    label: String,
    alignment: String,
    imageWidth: Number,
    backgroundColor: { type: String, default: "#fff" },
    data: Object,
  },
  setup(props) {
    const textAlignment = computed(() => {
      return props.alignment === "start"
        ? "justify-start"
        : props.alignment === "end"
        ? "justify-end"
        : "justify-center";
    });
    const labelPosition = computed(() => {
      return props.imageWidth === 75 && props.alignment === "center"
        ? `absolute top-0 pt-5`
        : ``;
    });
    return {
      textAlignment,
      labelPosition,
    };
  },
});
</script>

<style lang="scss" scoped></style>
