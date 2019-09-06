<template>
  <div class="movie-content">
    <div class="icon" v-if="comingMovie.length<1">
      <img src="../../public/image/loading_green.gif" alt />
    </div>
    <div
      class="movie-item"
      :class="{current:(j+1)%3==0}"
      v-for="(m,j) in comingMovie"
      :key="j"
      v-show="j<6"
    >
      <img :src="m.images.small" alt="movie" />
      <p class="item-title">{{m.title}}</p>
      <span class="item-count">{{m.collect_count}}人想看</span>
      <span class="item-time">{{m.mainland_pubdate}}</span>
    </div>
  </div>
</template>

<script>
import request from "superagent";
import jsonp from "superagent-jsonp";
export default {
  data: () => ({
    comingMovie: []
  }),
  methods: {
    upcoming() {
      request
        .get(
          "http://api.douban.com/v2/movie/coming_soon?apikey=0df993c66c0c636e29ecbb5344252a4a"
        )
        .use(jsonp({ timeout: 10000 }))
        .end((err, res) => {
          if (!err) {
            this.comingMovie = res.body.subjects;
          }
        });
    }
  },
  mounted() {
    this.upcoming();
  }
};
</script>

<style lang="scss" scoped>
.movie-content {
  width: 100%;
  padding: 0.5rem 0 0;
  .show-item {
    width: 100%;
  }
  .movie-item {
    display: inline-block;
    margin-right: 0.5rem;
    margin-top: 0.5rem;
    width: 4.5rem;
    height: 6.3rem;
    background-repeat: no-repeat;
    background-size: cover;
    &.current {
      margin-right: 0;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
  .item-title {
    width: 100%;
    font-size: 0.65rem;
    font-weight: 700;
    line-height: 1.15rem;
    color: #191919;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .item-count {
    display: inline-block;
    font-size: 0.6rem;
    color: #191919;
  }
  .item-time {
    display: inline-block;
    font-size: 0.6rem;
  }
}
</style>