<template>
  <div class="newsongs">
    <div class="header">
      <span class="name">{{name}}类</span>
    </div>
    <div class="content" v-for="(item,i) in getbook" :key="i">
      <router-link :to="{path:'/bookcontent',query:{name:item.title}}" class="linkTo" tag="div">
        <img :src="item.images.small" alt />
        <div class="books-item">
          <div class="books-name">{{item.title}}</div>
          <div class="star">
            <Star :star="item.rating.average" />
            <span class="score">{{item.rating.average}}</span>
          </div>
          <div class="books-author">
            {{item.author[0]}}
            <span>/</span>
            {{item.pubdate}}
          </div>
          <div class="publisher">{{item.publisher}}</div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import request from "superagent";
import jsonp from "superagent-jsonp";
import Star from "../components/Star";
export default {
  data: () => ({
    type: 1,
    getbook: [],
    name: ""
  }),
  methods: {
    getname() {
      this.name = this.$route.query.name;
    },
    getBooks() {
      request
        .get(
          `https://api.douban.com/v2/book/search?tag=${this.name}&apikey=0df993c66c0c636e29ecbb5344252a4a`
        )
        .use(jsonp({ timeout: 10000 }))
        .end((err, res) => {
          if (!err) {
            this.getbook = res.body.books;
          }
        });
    }
  },
  mounted() {
    this.getname();
    this.getBooks();
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
    width: 100%;
    border-bottom: 1px solid #ccc;
    .linkTo{
    display: flex;
    padding: 1rem 0;
      width: 100%;
      height: 100%;
    }
    img {
      flex: 0 0 4.5rem;
      width: 3.5rem;
      height: 6rem;
      border-radius: 4px;
    }
    .books-item {
      flex: 1;
      padding: 0 0.5rem;
      font-size: 0.65rem;
    }
    .books-name {
      padding-bottom: 0.3rem;
      width: 8rem;
      font-size: 0.8rem;
      font-weight: bold;
      line-height: 1.3rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .star {
      height: 1rem;
      overflow: hidden;
    }
    .score {
      display: inline-block;
      padding-left: 0.5rem;
      font-size: 0.7rem;
    }
    .books-author {
      width: 8rem;
      font-size: 0.7rem;
      line-height: 1.5rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      span {
        padding: 0 0.1rem;
      }
    }
    .publisher {
      font-size: 0.7rem;
      line-height: 1.5rem;
    }
  }
}
</style>