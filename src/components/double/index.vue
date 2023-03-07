<template>
  <div
    :class="`items-${state.double.alignment}`"
    class="flex xs:flex-col-reverse justify-between xs:justify-center xs:items-start relative"
  >
    <div
      class="uppercase text-[12px] font-medium absolute top-0 hidden sm:flex pl-5 pt-5"
      v-if="state.double.width === 75"
    >
      GIFT FOR HER
    </div>

    <div
      :class="state.double.width === 50 ? 'sm:pl-[120px]' : 'sm:pl-5'"
      class="sm:py-5 xs:px-2 xs:w-full xs:text-center"
    >
      <div
        class="uppercase text-[12px] font-medium hidden sm:flex"
        v-if="state.double.width === 50"
      >
        GIFT FOR HER
      </div>
      <div class="mt-4 xs:mt-6 mb-6 xs:mb-5">
        <div class="text-[20px] leading-6 font-bold">Galleria Bag</div>
        <div class="text-[14px] leading-[18px] mt-4 xs:mt-3 font-medium">
          A synthesis of classicism and futurism
        </div>
      </div>
      <div
        class="font-medium text-[14px] uppercase flex xs:justify-center gap-6"
      >
        <router-link to="/" class="border-b-[1px] border-black"
          >shop now</router-link
        >
        <router-link to="/" class="border-b-[1px] border-black"
          >discover all bags</router-link
        >
      </div>
    </div>
    <div :class="`w-[${state.double.width}%] xs:w-full relative`">
      <DoubleRightPanel />
      <div
        class="uppercase text-[12px] font-medium hidden sm:flex text-white absolute right-5 top-5"
        v-if="state.double.width === 50"
      >
        GIFT FOR HER
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive } from "vue";
import DoubleRightPanel from "./DoubleRightPanel";

export default defineComponent({
  name: "index_",
  components: {
    DoubleRightPanel,
  },
  setup() {
    const state = reactive({
      double: {
        alignment: "center",
        width: 50,
      },
    });

    return { state };
  },
});
</script>

<style lang="scss" scoped></style>
