<template>
  <div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      :stroke="stroke"
      :class="`${size} cursor-pointer`"
      @click="click"
    >
      <path stroke-linecap="round" stroke-linejoin="round" :d="icon" />
    </svg>
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "TimelineTitle",
  props: {
    icon: { type: String, required: true },
    click: Function,
    stroke: String,
    size: { type: String, default: "w-[24px] h-[24px]" },
  },
});
</script>

<style lang="scss" scoped></style>
