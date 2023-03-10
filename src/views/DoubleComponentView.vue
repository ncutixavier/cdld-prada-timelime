<template>
  <div class="min-h-screen"><double-component :data="getData" /></div>
</template>

<script>
import { defineComponent, computed } from "vue";
import DoubleComponent from "../components/double_component";
import doubleComponentConfig from "@/configs/doubleComponentConfig";

export default defineComponent({
  components: {
    DoubleComponent,
  },
  setup() {
    const getData = computed(() => {
      return doubleComponentConfig;
    });

    return { getData };
  },
});
</script>

<style lang="scss" scoped></style>
