<template>
  <div class="w-full h-full">
    <div class="relative h-full w-full" v-if="video?.contentType === 'youtube'">
      <card-image
        class="absolute inset-0 object-cover w-full h-full"
        :imageMobile="youtubeVideo.coverMobile"
        :imageDesktop="youtubeVideo.coverDesktop"
        :imageTablet="youtubeVideo.coverTablet"
      />

      <iframe
        class="absolute inset-0 h-full w-full"
        :src="ytLink"
        frameborder="0"
        allowfullscreen
      >
      </iframe>
    </div>

    <div class="relative h-full w-full" v-if="video?.contentType === 'dam'">
      <img
        v-if="handleHideVideo"
        :src="fallbackImage"
        :alt="altText"
        class="w-full h-full object-cover object-center absolute inset-0"
      />

      <video
        v-else
        ref="videoPlayer"
        class="w-full h-full object-cover object-center relative"
        :src="getVideoUrl()"
        :autoplay="damVideo?.settings?.enableAutoplay"
        :muted="damVideo?.settings?.enableMute"
        :loop="damVideo?.settings?.enableLoop"
        :alt="altText"
        @focus="handleFocus"
        @blur="handleBlur"
        @click="handleClick"
        @mouseover="handleMouseOver"
        :poster="fallbackImage"
        :split-video-on-device="damVideo?.settings?.enableSplitVideoOnDevice"
      >
        Your browser does not support the video tag.
      </video>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed, watchEffect } from "vue";
import CardImage from "./CardImage.vue";

export default {
  props: {
    video: { type: Object, required: true },
    isFullScreen: Boolean,
    breakpoints: Boolean,
    imageWidth: Number,
  },
  components: {
    CardImage,
  },
  setup(props) {
    const videoPlayer = ref(null);
    const damVideo = ref(props.video?.dam);
    const youtubeVideo = ref(props.video?.youtube);
    const ytLink = ref();

    const handleFocus = () => {
      if (damVideo.value?.settings.enablePlayOnFocus) {
        videoPlayer.value.play();
      }
    };

    const handleBlur = () => {
      if (damVideo.value?.settings.enablePlayOnFocus) {
        videoPlayer.value.pause();
      }
    };

    const handleMouseOver = async () => {
      if (damVideo.value?.settings.enablePlayOnHover) {
        videoPlayer.value.play();
      }
    };

    const handleClick = () => {
      if (damVideo.value?.settings.enablePlayOnClick) {
        videoPlayer.value?.addEventListener("click", () => {
          if (videoPlayer.value.paused) {
            videoPlayer.value.play();
          } else {
            videoPlayer.value.pause();
          }
        });
      }
    };

    const setIconColor = () => {
      if (props.breakpoints?.mobile) {
        return damVideo.value.colors.iconColorMobile;
      } else if (props.breakpoints?.tablet) {
        return damVideo.value.colors.iconColorTablet;
      } else {
        return damVideo.value.colors.iconColorDesktop
          ? damVideo.value.colors.iconColorDesktop
          : "#000";
      }
    };

    const getVideoUrl = () => {
      if (props.breakpoints?.mobile) {
        return damVideo.value.videoMobile;
      } else if (props.breakpoints?.tablet) {
        return damVideo.value.videoTablet;
      } else {
        return damVideo.value.videoDesktop;
      }
    };

    const fallbackImage = (() => {
      if (props.breakpoints?.mobile) {
        return damVideo.value.fallbackImageMobile;
      } else if (props.breakpoints?.tablet) {
        return damVideo.value.fallbackImageTablet;
      } else {
        return damVideo.value.fallbackImageDesktop;
      }
    })();

    const getImageHeight = computed(() => {
      if (props.isFullScreen) {
        return "h-screen";
      } else if (props.imageWidth === 75) {
        return "h-screen xs:h-[75vh]";
      } else {
        return "h-screen xs:h-[50vh]";
      }
    });

    const handleHideVideo = computed(() => {
      if (props.breakpoints?.mobile) {
        return damVideo.value.settings.hideVideoOnMobile;
      } else if (props.breakpoints?.tablet) {
        return damVideo.value.settings.hideVideoOnTablet;
      } else if (props.breakpoints?.desktop) {
        return damVideo.value.settings.hideVideoOnDesktop;
      } else {
        return false;
      }
    });

    const getYtVideo = computed(() => {
      return `https://www.youtube.com/embed/${props.video?.youtube?.videoDesktop}?autoplay=`;
    });

    watchEffect(() => {
      const settings = youtubeVideo.value?.settings;
      let link = `${getYtVideo.value}${settings?.enableAutoplay ? 1 : 0}&mute=${
        settings?.enableMute ? 1 : 0
      }&loop=${settings?.enableLoop ? 1 : 0}&controls=${
        settings?.enableControls ? 1 : 0
      }`;
      ytLink.value = link;
    });

    onMounted(() => {
      damVideo.value = props.video?.dam;
      youtubeVideo.value = props.video?.youtube;
      const settings = youtubeVideo.value?.settings;

      let link = `${getYtVideo.value}${settings?.enableAutoplay ? 1 : 0}&mute=${
        settings?.enableMute ? 1 : 0
      }&loop=${settings?.enableLoop ? 1 : 0}&controls=${
        settings?.enableControls ? 1 : 0
      }`;
      ytLink.value = link;

      handleClick();
      document.documentElement.style.setProperty(
        "--icon-color",
        setIconColor()
      );
    });

    return {
      videoPlayer,
      getVideoUrl,
      fallbackImage,
      damVideo,
      handleFocus,
      handleBlur,
      handleMouseOver,
      getImageHeight,
      handleHideVideo,
      handleClick,
      getYtVideo,
      youtubeVideo,
      ytLink,
    };
  },
};
</script>
