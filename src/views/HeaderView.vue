<template>
  <div class="container">
    <div class="header">
      <router-link to="/" tag="div">
      <img class="logo" :src="imgurl" alt="logo" />
      </router-link>
      <div class="header-title">
        <h2 class="top">豆瓣</h2>
        <div class="bottom">记录你的书影音生活</div>
      </div>
      <div class="menu">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    imgurl: require("../../public/image/douban-app-logo.png")
  }),
  methods: {
  },
  mounted() {
  },
  components: {
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  .header {
    display: flex;
    padding: 0 0.9rem;
    width: 100%;
    height: 3rem;
    align-items: center;
    z-index: 100;
    background-color: white;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    .logo {
      width: 1.95rem;
      height:1.95rem;
    }
  }
  .header-title {
    flex: 1;
    margin-left: 0.5rem;
    .top {
      font-size: 0.75rem;
      line-height: 1.05rem;
      color: #191919;
    }
    .bottom {
      font-size: 0.55rem;
      line-height: 0.8rem;
      color: #818181;
    }
  }
}
</style>