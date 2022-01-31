<template>
  <div class="video-list">
    <h1 id="page-title">Home Page</h1>
    <VideoCard v-for="video of videos"
               :key="video.title"
               :data-slug="video.slug"
               :video="video"
    />
  </div>
</template>

<script>

import VideoCard from "@/components/VideoCard";
import API from "@/utils/Api";
export default {
  name: 'Home',
  components: {VideoCard},
  data() {
    return {
      videos: []
    }
  },
  async created() {
    this.videos = await API.getVideos()
  }
}
</script>

<style scoped>
.video-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
</style>
