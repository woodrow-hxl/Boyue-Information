<template>
  <div class="search-view">
    <div class="search-icon">
      <input class="search-item" type="text" v-model="name" placeholder="搜索书/影/音" ref="searchRef" />
      <span class="icon-search"></span>
    </div>
    <div class="wrapper" v-if="msg&&name!=''">
        <div class="content" v-for="(item,i) in searchs" :key="i" @click="sendName">
          <img :src="item.image" alt v-if="item.image" />
          <img :src="item.img.replace(/\/w.h/,'')" v-else />
          <div class="movies-item">
            <div class="movies-title">{{item.nm||item.title}}</div>
            <div class="movies-name">
              <span v-for="(author,i) in item.author" :key="i">
                <span v-if="from=='bookview'">{{author}}</span>
                <span v-if="from=='musicview'">{{author.name}}</span>
              </span>
            </div>
            <div class="star" v-if="item.sc">
              <Star :star="item.sc" />
              <span class="score">{{item.sc}}</span>
            </div>
            <div class="star" v-else-if="item.rating">
              <Star :star="item.rating.average" />
              <span class="score">{{item.rating.average}}</span>
            </div>
            <div class="no-star" v-else>暂无评分</div>
            <div class="movies-time">
              {{item.pubDesc||item.publisher}}
              <div v-if="from=='musicview'">
                <span v-for="date in item.attrs.pubdate" :key="date">{{date}}</span>
              </div>
            </div>

            <span class="item-star">{{item.star}}</span>
            <span class="cast">
              {{item.cat||item.summary}}
              <div v-if="from=='musicview'">
                <span v-for="version in item.attrs.version" :key="version">{{version}}</span>
              </div>
            </span>
          </div>
        </div>
    </div>
    <div class="result" v-else-if="name==''">请输入查询内容</div>
    <div class="res" v-else>查询结果为空</div>
  </div>
</template>

<script>
import request from "superagent";
import jsonp from "superagent-jsonp";
import Star from "../components/Star";
const pinyin = require("pinyin");
export default {
  data: () => ({
    name: "",
    pinyinName:'',
    msg: true,
    from: "",
    searchs: ""
  }),
  methods: {
    searchMovies(name) {
      this.$http(`api/searchList?cityId=10&kw=${name}`).then(res => {
        if (name != "" && res.data.data.movies) {
          this.msg = true;
          this.searchs = res.data.data.movies.list;
        } else {
          this.msg = false;
        }
      });
    },
    searchMusics(name) {
      request
        .get(
          `https://api.douban.com/v2/music/search?q=${name}&apikey=0df993c66c0c636e29ecbb5344252a4a`
        )
        .use(jsonp({ timeout: 10000 }))
        .end((err, res) => {
          if (!err) {
            this.msg = true;
            this.searchs = res.body.musics;
          } else {
            this.msg = false;
          }
        });
    },
    searchBooks(name) {
      request
        .get(
          `https://api.douban.com/v2/book/search?tag=${name}&apikey=0df993c66c0c636e29ecbb5344252a4a`
        )
        .use(jsonp({ timeout: 10000 }))
        .end((err, res) => {
          if (!err) {
            this.msg = true;
            this.searchs = res.body.books;
          } else {
            this.msg = false;
          }
        });
    },
    sendName(){
      if (this.from == "homeview" || this.from == "hotshowing") {
          this.$router.push({path:'/othermovies',query:{name:this.pinyinName}})
        }  else if (this.from == "bookview") {
          this.$router.push({path:'/bookcontent',query:{name:this.name}})
        }
    }
  },
  mounted() {
    this.$refs.searchRef.focus();
  },
  watch: {
    name() {
      if (this.name != "") {
        this.msg = true;
        if (this.from == "homeview" || this.from == "hotshowing") {
          this.pinyinName = pinyin(this.name,{
            style:pinyin.STYLE_NORMAL
          }).join("");
          this.searchMovies(this.pinyinName);
        } else if (this.from == "musicview"||this.from == "musiccontent") {
          this.searchMusics(this.name);
        } else if (this.from == "bookview"||this.from=="bookcontent") {
          this.searchBooks(this.name);
        }
      }
    }
  },
  components: {
    Star
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.from = from.name;
    });
  }
};
</script>

<style lang="scss" scoped>
.search-view {
  padding: 1rem 0.9rem 0;
  width: 100%;
  height: 100%;
  .search-icon {
    position: relative;
    .search-item {
      padding: 0 1.75rem;
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
    .icon-search {
      position: absolute;
      top: 50%;
      left: 0.25rem;
      transform: translateY(-80%);
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
    .movies-title {
      width: 8.5rem;
      font-size: 0.8rem;
      font-weight: bold;
      line-height: 1.2rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .movies-name {
      display: flex;
      width: 8.5rem;
      font-size: 0.65em;
      line-height: 1.2rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .star {
      height: 1rem;
      overflow: hidden;
    }
    .no-star {
      padding-top: 0.25rem;
      height: 1rem;
      font-size: 0.8rem;
    }
    .score {
      display: inline-block;
      padding-left: 0.5rem;
      font-size: 0.65rem;
    }
    .movies-time {
      width: 75%;
      margin-top: 0.25rem;
      font-size: 0.65rem;
      line-height: 1.3rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    white-space: nowrap;
  }
  .item-star {
    display: block;
    width: 8.5rem;
    font-size: 0.65em;
    line-height: 1.2rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .cast {
    display: inline-block;
    width: 8.5rem;
    font-size: 0.65em;
    line-height: 1.2rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .result,
  .res {
    width: 100%;
    height: 2rem;
    line-height: 2rem;
    text-align: center;
  }
}
</style>