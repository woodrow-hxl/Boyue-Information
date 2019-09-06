<template>
  <div class="music-content">
    <!-- <div class="music-item" v-for="music in getmusic" :key="music.title">
      <div class="music-header">
        <img :src="music.image" alt />
        <div class="music-info">
          <div class="music-title">{{music.title}}</div>
          <Star :star="music.rating.average" />
          <span class="score">{{music.rating.average}}</span>
          <div class="publisher">{{music.publisher}}</div>
          <div class="pubdate">发行时间：{{music.pubdate}}</div>
        </div>
      </div>
      <div class="content">
        <div class="read"></div>
        <div class="buy"></div>
        <div class="author">作者：{{music.author[0]}}</div>
        <div class="author_intro" v-if="music.author_intro">介绍：{{music.author_intro}}</div>
        <div class="summary" v-if="music.summary">
          简介：
          <span>{{music.summary}}</span>
        </div>
        <div class="catalog" v-if="music.catalog">
          曲目：
          <span class="music-catalog" v-html="music.catalog.replace(/\n/g,'<br>')"></span>
        </div>
      </div>
    </div>
    <p class="other-items">歌手其他作品</p>
    <div class="otherbook" ref="others">
      <div class="showItem">
        <div
          class="list-item"
          v-for="(other,j) in otherBooks"
          :key="j"
          @click="changeBook(other.title)"
        >
          <img :src="other.images.small" alt="music" />
          <p class="item-title">{{other.title}}</p>
          <Star :star="other.rating.average" />
          <span class="item-score">{{other.rating.average}}</span>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
// import request from "superagent";
// import jsonp from "superagent-jsonp";
// import Star from "../components/Star";
// import BScroll from "better-scroll";
export default {
  data: () => ({
    song:'',
    name: "",
    type: 1,
    icon: [],
    getmusic: [],
    music: [
      { name: "新歌", type: 1 },
      { name: "摇滚", type: 11 },
      { name: "爵士", type: 12 },
      { name: "流行", type: 16 },
      { name: "经典老歌", type: 22 },
      { name: "情歌对唱", type: 23 }
    ]
  }),
  methods: {
    getsong() {
      this.song = this.$route.query.song;
      
    },
    filterMusic() {
      for (let i = 0; i < this.music.length; i++) {
        if (this.music[i].name == this.name) {
          this.type = this.music[i].type;
        }
      }
    },
    getMusics() {
      this.$http(
          `song&w=${this.song}&format=json`
        ).then(res=>{
          this.getmusic=res.data;
          
        })
    },
    
    // initScroll() {
    //   if (this.bookScroll) {
    //     this.bookScroll.refresh();
    //   } else {
    //     this.bookScroll = new BScroll(this.$refs.others, {
    //       scrollX: true,
    //       scrollY: false,
    //       click: true
    //     });
    //   }
    // }
  },
  mounted() {
    this.getsong();
    this.filterMusic();
    this.getMusics();
    // this.initScroll();
  },
  components: {
    // Star
  },
  // beforeDestroy() {
  //   this.bookScroll.destroy();
  //   this.bookScroll = null;
  // }
};
</script>

<style lang="scss" scoped>
.music-content {
  .music-item {
    padding: 1rem;
  }
  .music-header {
    display: flex;
    width: 100%;
    img {
      flex: 0 0 4.5rem;
      width: 4.5rem;
      height: 6rem;
    }
    .music-info {
      flex: 1;
      padding: 0 0.5rem 0.5rem;
      font-size: 0.65rem;
    }
    .music-title {
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
  .content {
    padding: 1rem 0;
    text-align: justify;
    line-height: 1.5rem;
    font-size: 0.8rem;
    .author_intro {
      padding: 0.5rem 0 0 2rem;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
    }
    .summary {
      padding: 1.5rem 0;
      span {
        padding: 0.5rem 0 0;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
      }
    }
    .music-catalog {
      padding: 0.5rem 0 0 2rem;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
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