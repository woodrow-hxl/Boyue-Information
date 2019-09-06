<template>
  <div class="newsongs">
    <div class="header">
      <span class="name">{{name}}</span>
    </div>
    <div class="wrapper" v-if="name=='华语口碑聚集'">
      <div class="content" v-for="(item,i) in getmovie" :key="i">
        <img :src="item.subject.images.small" alt />
        <div class="movies-item">
          <div class="movies-name">{{item.subject.title}}</div>
          <div class="star" v-if="item.subject.rating.average">
            <Star :star="item.subject.rating.stars" />
            <span class="score">{{item.subject.rating.average}}</span>
          </div>
          <div class="no-star" v-else>暂无评分</div>
          <div class="movies-time">{{item.subject.pubdates[0]}}</div>
          <span class="item-genres" v-for="(g,i) in item.subject.genres" :key="i">
            {{g}}
            <span v-if="i!=item.subject.genres.length-1">/</span>
          </span>
          <div class="item-casts">
            <span class="cast" v-for="(cast,i) in item.subject.casts" :key="i">
              {{cast.name}}
              <span v-if="i!=item.subject.casts.length-1">/</span>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="wrapper" v-else>
      <div class="content" v-for="(item,i) in getmovie" :key="i" >
        <img :src="item.images.small" alt />
        <div class="movies-item">
          <div class="movies-name">{{item.title}}</div>
          <div class="star" v-if="item.rating.average">
            <Star :star="item.rating.stars" />
            <span class="score">{{item.rating.average}}</span>
          </div>
          <div class="no-star" v-else>暂无评分</div>
          <div class="movies-time">{{item.pubdates[0]}}</div>
          <span class="item-genres" v-for="(g,i) in item.genres" :key="i">
            {{g}}
            <span v-if="i!=item.genres.length-1">/</span>
          </span>
          <div class="item-casts">
            <span class="cast" v-for="(cast,i) in item.casts" :key="i">
              {{cast.name}}
              <span v-if="i!=item.casts.length-1">/</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import request from "superagent";
import jsonp from "superagent-jsonp";
import Star from "../components/Star";
export default {
  data: () => ({
    type: "top250",
    movieType: [
      { name: "影院热映", type: "in_theaters" },
      { name: "华语口碑聚集", type: "weekly" },
      { name: "TOP250", type: "top250" },
      { name: "热门电影", type: "in_theaters" }
    ],
    getmovie: [],
    name: "TOP250"
  }),
  methods: {
    getname() {
      if(this.$route.query.name){
        this.name = this.$route.query.name
      }
    },
    filterMovies() {
      for (let i = 0; i < this.movieType.length; i++) {
        if (this.movieType[i].name == this.name) {
          this.type = this.movieType[i].type;
        }
      }
    },
    getMovies() {
      request
        .get(
          `http://api.douban.com/v2/movie/${this.type}?apikey=0df993c66c0c636e29ecbb5344252a4a`
        )
        .use(jsonp({ timeout: 10000 }))
        .end((err, res) => {
          if (!err) {
            this.getmovie = res.body.subjects;
          }
        });
    }
  },
  mounted() {
    this.getname();
    this.filterMovies();
    this.getMovies();
  },
  components: {
    Star
  }
};
</script>

<style lang="scss" scoped>
.newsongs {
  width: 100%;
  padding: 0.75rem;
  .header {
    width: 100%;
    height: 3rem;
    line-height: 3rem;
    .name {
      display: inline-block;
      width: 60%;
      height: 100%;
      line-height: 1.5rem;
      font-size: 0.9rem;
    }
  }
  .content {
    display: flex;
    width: 100%;
    padding: 1rem 0;
    border-bottom: 1px solid #ccc;
    img {
      flex: 0 0 4.5rem;
      width: 4rem;
      height: 6rem;
      border-radius: 4px;
    }
    .movies-item {
      flex: 1;
      padding: 0 0.5rem;
    }
    .movies-name {
      width: 90%;
      font-size: 0.8rem;
      font-weight: bold;
      line-height: 1.2rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .star {
      height: 1rem;
      overflow: hidden;
    }
    .no-star{
      padding-top: 0.25rem;
      height: 1rem;
      font-size: 0.8rem;
    }
    .score {
      display: inline-block;
      padding-left: 0.5rem;
      font-size: 0.7rem;
    }
    .movies-time {
      width: 75%;
      margin-top: 0.25rem;
      font-size: 0.7rem;
      line-height: 1.3rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .item-casts {
      width: 8rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .cast {
      font-size: 0.7rem;
      line-height: 1.2rem;
    }
    .item-genres {
      font-size: 0.7rem;
      line-height: 1rem;
    }
  }
}
</style>