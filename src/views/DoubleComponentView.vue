<template>
  <div class="min-h-screen"><double-component :data="getData" /></div>
</template>

<script>
import { defineComponent, computed } from "vue";
import DoubleComponent from "../components/double";
import doubleConfig from "@/configs/doubleConfig";

export default defineComponent({
  components: {
    DoubleComponent,
  },
  setup() {
    const getData = computed(() => {
      return doubleConfig;
    });

    return { getData };
  },
});
</script>

<style lang="scss" scoped></style>
