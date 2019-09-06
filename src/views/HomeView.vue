<template>
  <div class="home">
    <div class="container">
      <router-link to="/searchview" tag="div">
        <input class="search-item" type="text" placeholder="搜索书/影/音" />
      </router-link>
      <div class="nav">
        <ul class="item">
          <li class="item-movie">
            <router-link to="/findmovie" tag="div">
              <p>找电影</p>影院热映
            </router-link>
          </li>
          <li class="item-variety">
            <router-link to="/musicview" tag="div">
              <p>找音乐</p>新碟榜
            </router-link>
          </li>
          <li class="item-book">
            <router-link to="/bookview" tag="div">
              <p>畅销书</p>畅销排行
            </router-link>
          </li>
        </ul>
        <ol class="item">
          <li class="item-hobby">
            <router-link to="/grouplist" tag="div">
              <p>找小组</p>志趣相投
            </router-link>
          </li>
          <li class="item-music">
            <router-link to="/locationview" tag="div">
              <p>找同城</p>逸闻趣事
            </router-link>
          </li>
          <li class="item-art">
            <router-link to="/smallvideo" tag="div">
              <p>找视频</p>经典视频
            </router-link>
          </li>
        </ol>
      </div>
    </div>
    <div class="rakingList">
      <div class="list-title">
        <span class="raking-title">豆瓣榜单</span>
      </div>
      <Crunchies />
    </div>
    <div class="discuss">
      <span class="discuss-title">豆瓣热门趣闻</span>
      <div class="icon" v-if="event.length<1">
        <img src="../../public/image/loading_green.gif" alt />
      </div>
      <Discussion :event="event" />
    </div>
  </div>
</template>

<script>
import request from "superagent";
import jsonp from "superagent-jsonp";
import Crunchies from "../components/Crunchies";
import Discussion from "../components/Discussion";
export default {
  data: () => ({
    event: ""
  }),
  methods: {
    loadMore() {
      request
        .get("https://api.douban.com/v2/event/list?loc=108288&count=30")
        .use(jsonp({ timeout: 10000 }))
        .end((err, res) => {
          if (!err) {
            this.event = res.body.events;
          }
        });
    }
  },
  mounted() {
    this.loadMore();
  },
  components: {
    Crunchies,
    Discussion
  }
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  .container {
    padding: 1rem 0.9rem 0;
    width: 100%;
    height: 100%;
    .search-item {
      text-align: center;
    }
    .nav {
      width: 100%;
      border-radius: 0.2rem;
      border: 1px solid rgba(236, 236, 236, 0.5);
      .item {
        display: flex;
        margin-bottom: 0;
        height: 4rem;
      }
    }
    li {
      flex: 1;
      padding: 0.9rem 0;
      font-size: 0.65rem;
      letter-spacing: 1px;
      text-align: center;
      color: #818181;
      border-right: 1px solid rgba(236, 236, 236, 0.5);
      border-bottom: 1px solid rgba(236, 236, 236, 0.5);
      &:last-child {
        border-right: 0;
      }
      ol li {
        border-bottom: 0;
      }
      p {
        letter-spacing: 0;
        font-size: 0.95rem;
        line-height: 1.3rem;
        margin-bottom: 0.2rem;
      }
    }
    .item-movie {
      p {
        color: #2384e8;
      }
    }
    .item-variety {
      p {
        color: #7a6adb;
      }
    }
    .item-book {
      p {
        color: #9f7860;
      }
    }
    .item-hobby {
      p {
        color: #2ab8cc;
      }
    }
    .item-music {
      p {
        color: #f48f2e;
      }
    }
    .item-art {
      p {
        color: #f48f2e;
      }
    }
  }
  .rakingList {
    width: 100%;
    padding: 1rem 0.75rem 0.75rem;
    .list-title {
      display: flex;
      margin-bottom: 0.5rem;
      width: 100%;
      height: 1.5rem;
      .raking-title {
        flex: 1;
        font-size: 1.05rem;
        line-height: 1.5rem;
        color: #191919;
      }
    }
  }
  .discuss {
    width: 100%;
    padding: 0 0.75rem;
    .discuss-title {
      display: inline-block;
      font-size: 0.95rem;
      line-height: 1.3rem;
      color: #191919;
    }
  }
}
</style>