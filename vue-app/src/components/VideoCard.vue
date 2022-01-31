<template>
  <div class="video-card">
    <img :src="image" class=".image" height="100" width="150" @mouseover="hover = true" @mouseout="hover = false" />
    <h1 :id="video.title" class="video-title">{{video.title}}</h1>
    <button type="button" class="watch-button" @click="navigate()">Watch</button>
  </div>
</template>

<script>
export default {
  name: 'VideoCard',
  props: {
    video: Object
  },
  data() {
    return {
      hover: false,
    }
  },
  methods: {
    navigate() {
      this.$router.push({name: 'Video', params: {slug: this.video.slug}})
    }
  },
  computed: {
    image() {
      return this.hover ? this.video.hoverImage : this.video.coverImage
    }
  }
}
</script>

<style scoped>
.video-card {
  display: flex;
  align-items: center;
  gap: 24px;
}
.watch-button {
  border: none;
  border-radius: 8px;
  cursor: pointer;
  color: white;
  background-color: lightskyblue;
  height: fit-content;
  padding: 8px 16px;
}
</style>
