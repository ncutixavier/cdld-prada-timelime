<template>
  <div class="timeline-left-panel">
    <div :class="`w-[600px] h-[500px]`">
      <div
        :class="`w-full h-full bg-accent-dark bg-cover 
            xs:bg-[url(https://dev3.prada.com/content/dam/pradanux/menu_official_assets/mobile/highlights_bags/bag_1.jpg)]
            sm:bg-[url(https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFzaGlvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60)]
            md:bg-[url(https://dev3.prada.com/content/dam/pradanux/menu_official_assets/desktop/bags/bag_1.jpg)]
        `"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TimelineLeftPanel",
};
</script>

<style lang="scss" scoped></style>
