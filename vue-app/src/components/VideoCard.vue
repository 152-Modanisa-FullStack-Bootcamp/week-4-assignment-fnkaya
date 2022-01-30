<template>
  <div class="video-card">
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
  methods: {
    navigate() {
      this.$router.push({name: 'Video', params: {slug: this.video.slug}})
    }
  }
}
</script>

<style scoped>
.video-card {
  display: flex;
  align-items: center;
}
.watch-button {
  border: none;
  border-radius: 8px;
  cursor: pointer;
  color: white;
  background-color: lightskyblue;
  height: fit-content;
  padding: 8px 16px;
  margin-left: 24px;
}
</style>
