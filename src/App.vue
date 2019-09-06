<template>
  <div id="app">
    <div id="nav">
      <HeaderView />
      <router-view />
      <FooterView />
    </div>
  </div>
</template>
<script>
import HeaderView from "./views/HeaderView";
import FooterView from "./components/FooterView";
export default {
  components: {
    HeaderView,
    FooterView
  }
};
</script>
<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding-bottom: 2rem;
  width: 16rem;
  min-height: 28.4rem;
  overflow: hidden;
  .search-item {
      padding:0 1.75rem;
      width: 100%;
      height: 1.75rem;
      margin-bottom: 0.75rem;
      border-radius: 1rem;
      outline: 0;
      border: 0;
      z-index: 1000;

      box-shadow: none;
      font-size: 0.75rem;
      font-family: sans-serif;
      background-color: #f3f3f3;
    }
  .icon {
    width: 100vw;
    padding-right: 1.5rem;
    img {
      width: 2.5rem;
      height: 2.5rem;
      margin: 1.5rem 0 0 50%;
      transform: translateX(-50%);
    }
  }
  .title {
    display: flex;
    width: 100%;
    height: 2.5rem;
    line-height:2.5rem;
    font-size: 0.85rem;
    color: #111;
    span {
      flex: 1;
    }
    .more {
      flex: 0 0 2.5rem;
      display: inline-block;
      padding: 0 0.25rem;
      font-size: 0.7rem;
      text-align: right;
      color: #42bd56;
    }
  }
}
img {
  width: 2.5rem;
  height: 2.5rem;
}
</style>
