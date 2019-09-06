<template>
  <div class="video-view">
    <div class="view-title">
      <span>
        经典视频
        <span>音乐</span>
      </span>
    </div>
    <div class="video-text" v-for="s in index" :key="s">
      <VideoView :offset="offset" />
    </div>
    <div class="icon" v-if="smallVideo.length<1">
      <img src="../../public/image/loading_green.gif" alt />
    </div>
  </div>
</template>

<script>
import VideoView from "../components/VideoView";
export default {
  data: () => ({
    show: true,
    scrollTop: "",
    index: 1,
    smallVideo: [],
    res: "",
    offset: 10
  }),
  components: {
    VideoView,
  },
  methods: {
    selectType() {
      window.addEventListener("touchstart", function() {});
    },
    scrollHeight() {
      let _this = this;
      let height = 568;
      window.addEventListener("scroll", function() {
        let scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop;
        let clientHeight = document.body.clientHeight - height;
        if (scrollTop >= clientHeight && _this.show) {
          _this.offset += 10;
          _this.show = false;
          _this.index++;
        }
        _this.show = true;
      });
    }
  },
  // watch: {
  //   scrollTop(newval, oldval) {
  //     let _this = this;
  //     let height = 300;
  //     window.addEventListener("touchmove", function() {
  //       _this.scrollTop = event.touches[0].pageY;
  //       let pageTop = document.body.clientHeight - height;
  //       if (_this.scrollTop > pageTop && !_this.show) {
  //         _this.show = true;
  //         _this.offset += 10;
  //         _this.index += 1;
  //       }
  //       _this.show = false;
  //     });
  //   }
  // },
  mounted() {
    this.selectType();
    this.scrollHeight()
  },
  destroyed() {
    window.removeEventListener("scroll", this.scrollHeight);
  }
};
</script>

<style lang="scss" scoped>
.video-view {
  padding: 0 0.75rem;
  width: 100%;
  .view-title {
    display: flex;
    padding: 0 0.2rem;
    width: 100%;
    height: 2rem;
    line-height: 2rem;
    font-size: 0.85rem;
    background-color: #42bd56;
    span {
      flex: 1;
      color: #ccc;
    }
    .icon-menu {
      flex: 0 0 3rem;
      padding: 0 0.25rem;
      width: 3rem;
      font-size: 1.4rem;
      height: 70%;
      line-height: 1.4rem;
      text-align: right;
      vertical-align: top;
      color: #fff;
      transform: translateY(20%);
    }
  }
}
</style>