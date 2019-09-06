<template>
  <div class="book-content">
    <div class="book-item" v-for="book in getbook" :key="book.title">
      <div class="book-header">
        <img :src="book.image" alt />
        <div class="book-info">
          <div class="book-title">{{book.title}}</div>
          <Star :star="book.rating.average" />
          <span class="score">{{book.rating.average}}</span>
          <div class="publisher">{{book.publisher}}</div>
          <div class="pubdate">出版日期：{{book.pubdate}}</div>
          <div class="price">价格：{{book.price}}</div>
        </div>
      </div>
      <div class="reading">
        <span class="icon-read-want">想读</span>
        <span class="icon-radio-checked">在读</span>
        <span class="icon-star">读过</span>
      </div>
      <div class="inline-reader">
        <span class="icon-book"></span>
        <span>在线试读</span>
      </div>
      <div class="buy-book">
        <span class="icon-icon-link"></span>
        <span>电子书/纸质版购买</span>
      </div>
      <div class="content">
        <div class="read"></div>
        <div class="buy"></div>
        <div class="author">作者：{{book.author[0]}}</div>
        <div class="author_intro" v-if="book.author_intro">介绍：{{book.author_intro}}</div>
        <div class="summary" v-if="book.summary">
          简介：
          <span>{{book.summary}}</span>
        </div>
        <div class="catalog" v-if="book.catalog">
          目录：
          <span class="book-catalog" v-html="book.catalog.replace(/\n/g,'<br>')"></span>
        </div>
      </div>
    </div>
    <p class="other-items">作者其他作品</p>
    <div class="otherbook" ref="others">
      <div class="showItem">
        <div
          class="list-item"
          v-for="(other,j) in otherBooks"
          :key="j"
          @click="changeBook(other.title)"
        >
          <img :src="other.images.small" alt="book" />
          <p class="item-title">{{other.title}}</p>
          <Star :star="other.rating.average" />
          <span class="item-score">{{other.rating.average}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import request from "superagent";
import jsonp from "superagent-jsonp";
import Star from "../components/Star";
import BScroll from "better-scroll";
export default {
  data: () => ({
    name: "",
    author: "",
    getbook: "",
    otherBooks: []
  }),
  methods: {
    getname() {
      this.name = this.$route.query.name;
    },
    changeBook(name) {
      this.getBooks(name, 1);
      this.getBooks(this.author, 10);
      window.scrollTo(0, 0);
    },
    initial() {},
    getBooks(data, count) {
      request
        .get(
          `https://api.douban.com/v2/book/search?q=${data}&apikey=0df993c66c0c636e29ecbb5344252a4a&count=${count}`
        )
        .use(jsonp({ timeout: 10000 }))
        .end((err, res) => {
          if (!err) {
            if (count == 1) {
              this.getbook = res.body.books;
              this.author = res.body.books[0].author[0];
            }
            this.otherBooks = res.body.books;
          }
        });
    },
    initScroll() {
      if (this.bookScroll) {
        this.bookScroll.refresh();
      } else {
        this.bookScroll = new BScroll(this.$refs.others, {
          scrollX: true,
          scrollY: false,
          click: true
        });
      }
    },
    getAuthor() {
      this.getBooks(this.author, 10);
    }
  },
  mounted() {
    this.getname();
    this.getBooks(this.name, 1);
    this.initScroll();
  },
  watch: {
    author() {
      if (this.author) {
        this.getAuthor();
      }
    }
  },
  components: {
    Star
  },
  beforeDestroy() {
    this.bookScroll.destroy();
    this.bookScroll = null;
  }
};
</script>

<style lang="scss" scoped>
.book-content {
  .book-item {
    padding: 1rem;
  }
  .book-header {
    display: flex;
    width: 100%;
    img {
      flex: 0 0 4.5rem;
      width: 4.5rem;
      height: 6rem;
    }
    .book-info {
      flex: 1;
      padding: 0 0.5rem 0.5rem;
      font-size: 0.65rem;
    }
    .book-title {
      padding-bottom: 0.25rem;
      font-size: 0.9rem;
      width: 10rem;
      line-height: 1.5rem;
      font-weight: bold;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .publisher,
    .pubdate,
    .catalog,
    .price {
      line-height: 1.1rem;
    }
  }
  .reading {
    display: flex;
    height: 2rem;
    padding: 0.5rem 1rem 0;
    border-bottom: 1px solid #eee;
    span {
      flex: 1;
      text-align: center;
      color: #191919;
    }
  }
  .inline-reader,
  .buy-book {
    height: 2rem;
    line-height: 2rem;
    color: #191919;
    border-bottom: 1px solid #eee;
    .icon-book,
    .icon-icon-link {
      display: inline-block;
      margin-right: 1rem;
    }
  }
  .content {
    padding: 1rem 0;
    text-align: justify;
    line-height: 1.5rem;
    font-size: 0.8rem;
    .author_intro {
      padding: 0.5rem 0 0 2rem;
      margin-bottom: 1rem;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
    }
    .summary {
      padding: 1rem 0 ;
      border-top: 1px solid #eee;
      border-bottom: 1px solid #eee;
      span {
        padding: 0.5rem 0 0;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
      }
    }
    .catalog{
      margin-top: 1rem;
      .book-catalog {
      padding: 0.5rem 0 0 2rem;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
    }
    }
  }
  .other-items {
    padding: 0.5rem 0.75rem;
    font-size: 0.8rem;
    line-height: 1.5rem;
  }
  .otherbook {
    margin-left: 0.75rem;
    .showItem {
      width: 50rem;
    }
    .list-item {
      flex: 0 0 4.5rem;
      display: inline-block;
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
  }
}
</style>