<template>
  <div class="music-view">
    <div class="music-content">
    <router-link to="/searchview" tag="div">
      <input class="search-item" type="text" placeholder="搜索书/影/音"/>
    </router-link>
      <div class="title">
        <span>热歌榜</span>
        <router-link :to="{path:'/othersongs',query:{name:name}}" tag="p">
          <p class="more" @click="getname('热歌')">更多</p>
        </router-link>
      </div>
      <div class="scroll" ref="hotmusic">
        <LoadingMusic :name="sendName[0]" />
      </div>
      <div class="title">
        <span>欧美金曲榜</span>
        <router-link :to="{path:'/othersongs',query:{name:name}}" tag="p">
          <p class="more" @click="getname('欧美金曲')">更多</p>
        </router-link>
      </div>

      <div class="scroll" ref="europemusic">
        <LoadingMusic :name="sendName[1]" />
      </div>
      <div class="title">
        <span>影视金曲榜</span>
        <router-link :to="{path:'/othersongs',query:{name:name}}" tag="p">
          <p class="more" @click="getname('影视金曲')">更多</p>
        </router-link>
      </div>
      <div class="scroll" ref="ftvmusic">
        <LoadingMusic :name="sendName[2]" />
      </div>
      <div class="title">
        <span>网络歌曲榜</span>
        <router-link :to="{path:'/othersongs',query:{name:name}}" tag="p">
          <p class="more" @click="getname('网络歌曲')">更多</p>
        </router-link>
      </div>
      <div class="scroll" ref="net_music">
        <LoadingMusic :name="sendName[3]" />
      </div>
      <p class="listshow">分类浏览</p>
      <div class="classlist">
        <div class="list-left">
          <p v-for="l in listLeft" :key="l">
            <router-link :to="{path:'/othersongs',query:{name:name}}" tag="span">
              <span @click="getname(l)">{{l}}</span>
            </router-link>
            <i></i>
          </p>
        </div>
        <div class="list-right">
          <p v-for="r in listRight" :key="r">
            <router-link :to="{path:'/othersongs',query:{name:name}}" tag="span">
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
import LoadingMusic from "../components/LoadingMusic";
export default {
  data: () => ({
    name: "",
    sendName: ["热歌", "欧美金曲", "影视金曲", "网络歌曲"],
    listLeft: ["摇滚", "爵士", "流行"],
    listRight: ["新歌", "经典老歌", "情歌对唱"],
    score: [],
    hotmusic: "",
    europemusic: "",
    filmandtvmusic: "",
    netmusic: ""
  }),
  components: {
    LoadingMusic,
  },
  methods: {
    getname(name) {
      this.name = name;
    },
    scores() {
      for (let j = 0; j < 10; j++) {
        let str = this.random(9, 5);
        this.score.push(str);
      }
    },
    initScroll() {
      if (this.hotScroll) {
        this.hotScroll.refresh();
      } else {
        this.hotScroll = new BScroll(this.$refs.hotmusic, {
          scrollX: true,
          scrollY: false,
          click: true
        });
      }

      if (this.europeScroll) {
        this.europeScroll.refresh();
      } else {
        this.europeScroll = new BScroll(this.$refs.europemusic, {
          scrollX: true,
          scrollY: false,
          click: true
        });
      }

      if (this.ftvScroll) {
        this.ftvScroll.refresh();
      } else {
        this.ftvScroll = new BScroll(this.$refs.ftvmusic, {
          scrollX: true,
          scrollY: false,
          click: true
        });
      }
      if (this.net_Scroll) {
        this.net_Scroll.refresh();
      } else {
        this.net_Scroll = new BScroll(this.$refs.net_music, {
          scrollX: true,
          scrollY: false,
          click: true
        });
      }
    }
  },
  mounted() {
    this.initScroll();
  },
  beforeDestroy() {
    this.hotScroll.destroy();
    this.hotScroll = null;
    this.europeScroll.destroy();
    this.europeScroll = null;
    this.ftvScroll.destroy();
    this.ftvScroll = null;
    this.net_Scroll.destroy();
    this.net_Scroll = null;
  }
};
</script>

<style lang="scss" scoped>
.music-view {
  .music-content {
    padding: 0rem 0.75rem;
    .search-item{
      text-align: center;
    }
    .listshow {
      padding: 1.5rem 0 0;
      font-size: 0.85rem;
      color: #111;
    }
    .search-item{
      margin:1rem 0 0 0;
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
    .title {
      display: flex;
      padding:0;
      height:1.5rem;
      width: 100%;
      font-size: 0.85rem;
      color: #111;
      span {
        flex: 1;
      }
      .more {
        flex: 0 0 2.5rem;
        display: inline-block;
        font-size: 0.7rem;
        text-align: right;
        color: #42bd56;
      }
    }
  }
}
</style>