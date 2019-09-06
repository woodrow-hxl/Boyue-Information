<template>
  <div class="content">
    <div class="view-item" v-for="(res,i) in smallVideo" :key="i">
      <video class="video" :src="res.video" controls></video>
      <div class="desc">{{res.title}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["offset"],
  data: () => ({
    res: "",
    smallVideo: []
  }),
  methods: {
    videos() {
      if (this.offset) {
        this.$http(
          `mv/19550453/feeds/essence?limit=30&offset=${this.offset}`
        ).then(res => {
          let str = res.data.data;
          this.res = str;
          for (let i = 0; i < str.length; i++) {
            if (str[i].target.thumbnail_extra_info) {
              let video = JSON.stringify(
                str[i].target.thumbnail_extra_info.playlist.ld.url
              );
              video = video.replace(/"/g, "");
              let title = str[i].target.excerpt;
              this.smallVideo.push({ video, title });
            }
          }
        });
      }
    }
  },
  mounted() {
    this.videos();
  }
};
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  .view-item {
    width: 100%;
    margin: 0.25rem 0;
    border-bottom: 1px dashed #ccc;
    video {
      display: block;
      padding: 0.5rem 0.5rem 0;
      width: 100%;
      height: 8rem;
    }
    .desc {
      width: 100%;
      margin-bottom: 0.5rem;
      padding: 0.5rem 1rem;
      height: 3.5rem;
      line-height: 1rem;
      font-size: 0.65rem;
      text-align: justify;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
  }
}
</style>