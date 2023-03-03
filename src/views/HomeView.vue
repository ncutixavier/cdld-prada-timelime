<template>
  <div class="bg-[#e5e5e5] min-h-screen">
    <TimelinePanel :timelines="timelines" />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import TimelinePanel from "@/components/timeline/TimelinePanel.vue";
import timelineConfig from "@/configs/timelineConfig";

export default defineComponent({
  components: {
    TimelinePanel,
  },
  setup() {
    const timelines = timelineConfig;

    return { timelines };
  },
});
</script>

<style lang="scss" scoped></style>
