<template>
  <div class="relative h-[2px] rounded-full bg-gray-300">
    <div
      class="h-full rounded-full transition-all"
      :style="{
        backgroundColor: activeColor,
        opacity: isViewed ? 1 : 0.3,
      }"
    ></div>

    <div
      class="absolute top-0 left-0 h-full rounded-full transition-all"
      :style="{
        width: `${progress}%`,
        backgroundColor: activeColor,
      }"
    ></div>
  </div>
</template>

<script>
import { ref, watch, onMounted, onUnmounted } from "vue";

export default {
  props: {
    isActive: { type: Boolean, default: false },
    isViewed: { type: Boolean, default: false },
    activeColor: { type: String, default: "#000000" },
    progressTime: { type: Number, default: 6000 },
  },

  setup(props) {
    const progress = ref(0);
    let intervalId;
    const startProgress = () => {
      if (intervalId) clearInterval(intervalId);
      intervalId = setInterval(() => {
        if (progress.value < 100) {
          progress.value += 1;
        } else {
          clearInterval(intervalId);
        }
      }, props.progressTime / 100);
    };

    const stopProgress = () => {
      clearInterval(intervalId);
      progress.value = 0;
    };
    watch(
      () => props.isActive,
      (isActive) => {
        if (isActive) {
          startProgress();
        } else {
          stopProgress();
        }
      }
    );
    onMounted(() => {
      if (props.isActive) {
        startProgress();
      }
    });

    onUnmounted(() => {
      stopProgress();
    });

    return {
      progress,
    };
  },
};
</script>
