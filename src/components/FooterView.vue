<template>
  <div class="footer">
    <div class="cover" v-show="show"></div>
    <div class="icon">
      <a-icon type="left" @click.stop="back" />
    </div>
    <div class="icon">
      <a-icon type="bars" @click.stop="show=!show" />
    </div>
    <div class="footer-menu" v-show="show" @click="show=!show">
      <p class="top">
        <router-link class="item" to="/findmovie" tag="div">
          <span>找电影</span>
        </router-link>
        <router-link class="item" to="/musicview" tag="div">
          <span>找音乐</span>
        </router-link>
        <router-link class="item" to="/bookview" tag="div">
          <span>畅销书</span>
        </router-link>
      </p>
      <p class="bottom">
        <router-link class="item" to="/grouplist" tag="div">
          <span>找小组</span>
        </router-link>
        <router-link class="item" to="/locationview" tag="div">
          <span>找同城</span>
        </router-link>
        <router-link class="item" to="/smallvideo" tag="div">
          <span>找视频</span>
        </router-link>
      </p>
      <p class="menu-down" @click.stop="show=!show">
        <a-icon class="down" type="down" />
      </p>
    </div>
    <router-link class="icon" to="/loginview" tag="div">
      <a-icon type="user" />
    </router-link>
  </div>
</template>

<script>
export default {
  data: () => ({
    show: false
  }),
  methods: {
    back() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
.footer {
  position: fixed;
  bottom: 0;
  left:0;
  right:0;
  padding-left: 0.75rem;
  display: flex;
  width: 100%;
  height: 1.5rem;
  line-height: 1.5rem;
  background-color: #fff;
  z-index: 1000;
  .cover {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #eee;
    opacity: 0.4;
  }
  .icon {
    flex: 1;
    text-align: center;
  }
  .footer-menu {
    position: fixed;
    padding: 0.75rem 0;
    bottom: 1.6rem;
    left: 1rem;
    right: 1rem;
    line-height: 0.75rem;
    border-radius: 5px;
    background-color: #fff;
  }
  .top,
  .bottom {
    display: flex;
    .item {
      flex: 1;
      font-size: 0.75rem;
      text-align: center;
    }
  }
  .top {
    .item:nth-child(1) {
      color: #2384e8;
    }
    .item:nth-child(2) {
      color: #7a6adb;
    }
    .item:nth-child(3) {
      color: #9f7860;
    }
  }
  .bottom {
    .item:nth-child(1) {
      color: #2ab8cc;
    }
    .item:nth-child(2) {
      color: #f48f2e;
    }
    .item:nth-child(3) {
      color: #2384e8;
    }
  }
  .menu-down {
    .down {
      position: absolute;
      left: 50%;
      bottom: 0;
      transform: translateX(-50%) translateY(-25%);
    }
  }
}
</style>