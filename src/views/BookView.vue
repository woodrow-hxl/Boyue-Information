<template>
  <div class="book-view">
    <div class="book-content">
    <router-link to="/searchview" tag="div">
      <input class="search-item" type="text" placeholder="搜索书/影/音"/>
    </router-link>
      <div class="title">
      <span>
        最受关注图书
        <i class="sider">|</i>虚构类
      </span>
      <router-link :to="{path:'/otherbooks',query:{name:name}}" tag="p">
        <p class="more" @click="getname('虚构')">更多</p>
      </router-link>
    </div>
    <div class="icon" v-if="fictionbook.length<1">
      <img src="../../public/image/loading_green.gif" alt />
    </div>
    <div class="scroll" ref="fic">
      <div class="show-item">
        <div class="list-item" v-for="(fic,j) in fictionbook" :key="j">
          <router-link :to="{path:'/bookcontent',query:{name:fic.title}}" tag="span">
            <img :src="fic.images.small" alt="book" />
            <p class="item-title">{{fic.title}}</p>
            <Star :star="fic.rating.average" @change="changeStar(fic)" />
            <span class="item-score">{{fic.rating.average}}</span>
          </router-link>
        </div>
      </div>
    </div>
    <div class="title">
      <span>
        最受关注图书
        <i class="sider">|</i>非虚构类
      </span>
      <router-link :to="{path:'/otherbooks',query:{name:name}}" tag="p">
        <p class="more" @click="getname('非虚构')">更多</p>
      </router-link>
    </div>
    <div class="icon" v-if="nonfictionbook.length<1">
      <img src="../../public/image/loading_green.gif" alt />
    </div>
    <div class="scroll" ref="nonfic">
      <div class="show-item">
        <div class="list-item" v-for="(non,j) in nonfictionbook" :key="j">
          <router-link :to="{path:'/bookcontent',query:{name:non.title}}" tag="span">
            <img :src="non.images.small" alt="book" />
            <p class="item-title">{{non.title}}</p>
            <Star :star="non.rating.average" />
            <span class="item-score">{{non.rating.average}}</span>
          </router-link>
        </div>
      </div>
    </div>
    <p class="listshow">分类浏览</p>
    <div class="classlist">
      <div class="list-left">
        <p v-for="l in listLeft" :key="l">
          <router-link :to="{path:'/otherbooks',query:{name:name}}" tag="span">
            <span @click="getname(l)">{{l}}</span>
          </router-link>
          <i></i>
        </p>
      </div>
      <div class="list-right">
        <p v-for="r in listRight" :key="r">
          <router-link :to="{path:'/otherbooks',query:{name:name}}" tag="span">
            <span @click="getname(r)">{{r}}</span>
          </router-link>
          <i></i>
        </p>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import request from "superagent";
import jsonp from "superagent-jsonp";
import Star from "../components/Star";
export default {
  data: () => ({
    name: "",
    listLeft: ["小说", "历史", "青春", "随笔", "推理", "奇幻"],
    listRight: ["爱情", "外国文学", "励志", "传记", "旅行", "经营"],
    fictionbook: "",
    nonfictionbook: ""
  }),
  components: {
    Star,
  },
  methods: {
    getname(name) {
      this.name = name;
    },
    initScroll() {
      if (this.ficScroll) {
        this.ficScroll.refresh();
      } else {
        this.ficScroll = new BScroll(this.$refs.fic, {
          scrollX: true,
          scrollY: false,
          probeType:1,
          click: true
        });
      }

      if (this.nonficScroll) {
        this.nonficScroll.refresh();
      } else {
        this.nonficScroll = new BScroll(this.$refs.nonfic, {
          scrollX: true,
          scrollY: false,
          click: true
        });
      }
    },
    fictionBooks() {
      request
        .get(
          "https://api.douban.com/v2/book/search?tag=虚构&apikey=0df993c66c0c636e29ecbb5344252a4a"
        )
        .use(jsonp({ timeout: 10000 }))
        .end((err, res) => {
          if (!err) {
            this.fictionbook = res.body.books;
          }
        });
    },
    nonFictionBooks() {
      request
        .get(
          "https://api.douban.com/v2/book/search?tag=非虚构&apikey=0df993c66c0c636e29ecbb5344252a4a&start=5"
        )
        .use(jsonp({ timeout: 10000 }))
        .end((err, res) => {
          if (!err) {
            this.nonfictionbook = res.body.books;
          }
        });
    }
  },
  mounted() {
    this.fictionBooks();
    this.nonFictionBooks();
    this.initScroll();
  },
  beforeDestroy() {
    this.ficScroll.destroy();
    this.ficScroll = null;
    this.nonficScroll.destroy();
    this.nonficScroll = null;
  }
};
</script>

<style lang="scss" scoped>
.book-content {
  padding: 1rem 0.75rem;
  width: 100%;
  overflow: hidden;
  .search-item{
      text-align: center;
    }
  .sider {
    display: inline-block;
    padding: 2px;
    font-weight: 700;
    vertical-align: bottom;
  }
  .show-item {
    width: 100rem;
  }
  .list-item {
    display: inline-block;
    white-space: nowrap;
    margin-right: 0.5rem;
    margin-top: 0.5rem;
    width: 4.5rem;
    height: 6.3rem;
    background-repeat: no-repeat;
    background-size: cover;
  }

  img {
    width: 100%;
    height: 100%;
    border-radius: 4px;
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
  .item-score {
    font-weight: 500;
    font-size: 0.6rem;
    color: #818181;
    margin-left: 0.2rem;
    margin-bottom: 0.5rem;
  }
  .listshow {
    padding: 1.5rem 0 0;
    font-size: 0.85rem;
    color: #111;
  }
  .classlist {
    display: flex;
    width: 100%;
    padding: 1rem 0;
    .list-left {
      flex: 1;
      border-right: 1px solid #eee;
      border-top: 1px solid #eee;
      i {
        margin-right: 1rem;
      }
    }
    .list-right {
      flex: 1;
      border-top: 1px solid #eee;
      p {
        padding-left: 0.75rem;
      }
    }
    i {
      display: block;
      float: right;
      margin-top: 0.8rem;
      margin-right: 0.75rem;
      width: 0.4rem;
      height: 0.4rem;
      font-weight: bold;
      border-right: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      transform: rotate(-45deg);
    }
    p {
      line-height: 2.1rem;
      font-size: 0.75rem;
      color: #42bd56;
      border-bottom: 1px solid #eee;
    }
  }
}
</style>