<template>
  <div class="crunchies">
    <router-link :to="{path:'/othermovies',query:{name:name}}" tag="div">
      <div class="crunchies-item"  @click="getname(pic.text)" v-for="(pic,index) in pics" :key="index" ref="myref">
        <div class="crunchies-left">
          <p class="bgcolor" ref="leftRef"></p>
          <div class="left-text">
            <div class="left-content">
              <span>{{pic.title}}</span>
              <div class="title">{{pic.week}}</div>
              <div class="text">{{pic.text}}</div>
            </div>
          </div>
        </div>
        <div class="line"></div>
        <div class="crunchies-right" ref="right" v-if="index===0">
          <p class="bgcolor" ref="rightRef"></p>
          <div class="movie-item" v-for="(m,j) in movie" :key="j" v-show="j<3">
            <span class="subject-title">{{j+1}}.{{m.subject.title}}</span>
            <span class="average">{{m.subject.rating.average}}</span>
          </div>
        </div>
        <div class="crunchies-right" ref="right" v-if="index==1">
          <p class="bgcolor" ref="rightRef"></p>
          <div class="movie-item" v-for="(t,j) in topmovie" :key="j" v-show="j<3">
            <span class="subject-title">{{j+1}}.{{t.title}}</span>
            <span class="average">{{t.rating.average}}</span>
          </div>
        </div>
        <div class="crunchies-right" ref="right" v-if="index===2">
          <p class="bgcolor" ref="rightRef"></p>
          <div class="movie-item" v-for="(h,j) in hotmovie" :key="j" v-show="j<3">
            <span class="subject-title">{{j+1}}.{{h.title}}</span>
            <span class="average">{{h.rating.average}}</span>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import request from "superagent";
import jsonp from "superagent-jsonp";

export default {
  data: () => ({
    name:'',
    movie: "",
    topmovie: "",
    hotmovie: "",
    pics: [
      {
        title: "豆瓣周榜",
        week: "WEEK",
        text: "华语口碑聚集",
        leftcolor: "rgba(76, 67, 51)",
        rightcolor: "rgba(76, 67, 51,0.8)",
        img:
          "url('https://img3.doubanio.com/view/photo/photo/public/p2559198424.jpg')"
      },
      {
        leftcolor: "rgb(50, 50, 59)",
        rightcolor: "rgba(50, 50, 59,0.8)",
        img:
          "url('https://img3.doubanio.com/view/photo/photo/public/p2309770674.jpg')"
      },
      {
        title: "豆瓣周榜",
        week: "WEEK",
        text: "热门电影",
        leftcolor: " rgba(54, 68, 76)",
        rightcolor: " rgba(54, 68, 76,0.8)",
        img:
          "url('https://img3.doubanio.com/view/photo/photo/public/p2563815623.jpg')"
      }
    ]
  }),
  methods: {
    getname(name) {
        this.name = name;
    },
    changeBg() {
      this.$refs.myref[1].firstElementChild.style.backgroundImage =
        "url('https://img1.doubanio.com/img/files/file-1543460329.png')";
      this.$refs.myref[1].firstElementChild.style.backgroundColor = this.pics[1].color;
      this.$refs.myref[1].firstElementChild.style.opacity = "1";
      this.$refs.myref[2].firstElementChild.style.paddingTop = "8px";
      for (let index = 0; index < this.pics.length; index++) {
        this.$refs.right[index].style.backgroundImage = this.pics[index].img;
        this.$refs.leftRef[index].style.backgroundColor = this.pics[
          index
        ].leftcolor;
        this.$refs.rightRef[index].style.backgroundColor = this.pics[
          index
        ].rightcolor;
      }
    },
    movies() {
      request
        .get(
          "http://api.douban.com/v2/movie/weekly?apikey=0df993c66c0c636e29ecbb5344252a4a"
        )
        .use(jsonp({ timeout: 10100 }))
        .end((err, res) => {
          if (!err) {
            this.movie = res.body.subjects;
          }
        });
    },
    TopMovies() {
      request
        .get(
          "http://api.douban.com/v2/movie/top250?apikey=0df993c66c0c636e29ecbb5344252a4a"
        )
        .use(jsonp({ timeout: 10200 }))
        .end((err, res) => {
          if (!err) {
            this.topmovie = res.body.subjects;
          }
        });
    },
    HotMovies() {
      request
        .get(
          "http://api.douban.com/v2/movie/in_theaters?apikey=0df993c66c0c636e29ecbb5344252a4a"
        )
        .use(jsonp({ timeout: 10300 }))
        .end((err, res) => {
          if (!err) {
            this.hotmovie = res.body.subjects;
          }
        });
    }
  },
  mounted() {
    this.changeBg();
    this.movies();
    this.TopMovies();
    this.HotMovies();
  }
};
</script>

<style lang="scss" scoped>
.crunchies {
  width: 100%;
  min-height: 15rem;
  padding: 1rem 0 0;
  .crunchies-item {
    width: 100%;
    height: 5rem;
    display: flex;
    margin-bottom: 0.75rem;
    border-radius: 0.25rem;
    overflow: hidden;
    .crunchies-left {
      position: relative;
      flex: 0 0 5rem;
      height: 5rem;
      background-repeat: no-repeat;
      background-size: cover;
    }
    .line {
      display: none;
      @media screen and (min-width: 360px) {
        display: block;
        width: 1px;
        height: 100%;
        background-color: white;
      }
    }
    .left-text {
      position: relative;
      padding: 1rem 0.5rem;
      font-size: 0.65rem;
      vertical-align: middle;
      text-align: center;
      color: #b6bbbc;
      z-index: 1;
      .left-content {
        min-width: 4rem;
        min-height: 3rem;
        line-height: 0.75rem;
        z-index: 1;
      }
      span {
        display: block;
      }
      .title {
        position: absolute;
        top: 1rem;
        left: 50%;
        transform: translateX(-50%);
        opacity: 0.2;
        font-size: 1.5rem;
      }
      .text {
        margin-top: 0.25rem;
        font-size: 0.85rem;
        color: #ededeb;
        line-height: 1;
      }
    }
    .crunchies-right {
      position: relative;
      flex: 1;
      padding: 0.75rem;
      background-repeat: no-repeat;
      background-size: cover;
      z-index: -2;
    }
    .movie-item {
      width: 100%;
      font-size: 0.65rem;
      line-height: 1rem;
      color: #fff;
      overflow: hidden;
    }
    .subject-title {
      max-width: 60%;
      display: inline-block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .bgcolor {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      height: 5rem;
      z-index: -2;
    }
    .average {
      display: inline-block;
      padding: 0 0.25rem;
      color: #ffac2d;
      vertical-align: top;
    }
  }
}
</style>