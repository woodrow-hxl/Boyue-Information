<template>
  <div class="movie-content">
  <div class="movie">
  <router-link to="/searchview" tag="div">
      <input class="search-item" type="text" placeholder="搜索书/影/音"/>
    </router-link>
    <div class="header">
      <img class="img" src="https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2543631842.jpg" alt="">
      <img class="img" src="https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2190768432.jpg" alt="">
      <img class="img" src="https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2221281086.jpg" alt="">
      <p class="text">今日可播放电影已更新</p>
    </div>
    <div class="content">
      <div class="title">
        <router-link to="/findmovie/hotshowing" tag="div">
          <span class="movie-type">影院热映</span>
        </router-link>
        <router-link to="/findmovie/showmovie" tag="div">
          <span class="movie-type">即将上映</span>
        </router-link>
        <router-link :to="{path:'/othermovies',query:{name:name}}" tag="p">
        <p class="item-more" @click="getname('影院热映')">更多</p>
        </router-link>
      </div>
      <router-view />
      <div class="title">
        <span>豆瓣榜单</span>
        <!-- <router-link to="/findmovie/hotshowing" tag="p"> -->
        <p class="more" @click="getname('影院热映')">更多</p>
        <!-- </router-link> -->
      </div>
      <Crunchies />
      <div class="title">
        <span>分类浏览</span>
        <p class="more">更多</p>
      </div>
      <div class="icon">
        <img src="../../public/image/loading_green.gif" alt />
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import Crunchies from "../components/Crunchies";
export default {
  data: () => ({
    name:'',
    comingMovie: [],
    imgs: []
  }),
  methods: {
    getname(name) {
      this.name = name;
    },
  },
  components: {
    Crunchies,
  }
};
</script>

<style lang="scss" scoped>
.movie {
  padding: 1rem 0.75rem;
  width: 100%;
  .search-item{
      text-align: center;
    }
  .header {
    position: relative;
    margin-top:1rem;
    width: 100%;
    height: 4.5rem;
    border-radius: 4px;
    background-color: rgb(76, 48, 46);
    .img{
      position: absolute;
      bottom: 0.75rem;
      border-radius: 4px;
    }
    .img:nth-child(1){
      left:0.75rem;
      width: 3.2rem;
      height: 4.5rem;
      z-index: 3
    }
    .img:nth-child(2){
      left:2.5rem;
      width: 2.9rem;
      height: 4rem;
      z-index: 2;
    }
    .img:nth-child(3){
      left:4.2rem;
      width: 2.5rem;
      height: 3.5rem;
      z-index: 1;
    }
    .text{
      float: right;
      padding: 0.5rem 1rem;
      width: 50%;
      font-size: 0.75rem;
      line-height: 1rem;
      font-weight: 500;
      color:#fff;

    }
  }
  .movie-type {
    padding-bottom: 0.75rem;
    color: #818181;
  }
  .link-active {
    span {
      border-bottom: 2px solid #191919;
      color: #191919;
    }
  }
  .movie-type {
    padding-bottom: 0.75rem;
    color: #818181;
    margin-right: 0.5rem;
  }
  .link-active {
    span {
      border-bottom: 2px solid #191919;
      color: #191919;
    }
  }
  .item-more {
    display: inline-block;
    width: 6.4rem;
    font-size: 0.7rem;
    text-align: right;
    color: #42bd56;
  }
}
</style>