<template>
  <div class="hot-group">
    <div class="my-group">
      <h2>我的关注</h2>
      <div class="husttgeek">
        <router-link to="/groupview" tag="div">
          <img :src="husttgeek.avatar" alt />
          <span class="hus-name">{{husttgeek.name}}</span>
          <div class="hus-text">{{husttgeek.desc}}</div>
        </router-link>
      </div>
    </div>
    <h2 class="group-title">热门小组</h2>
    <div class="group-list" v-for="hot in hotGroup" :key="hot.name">
      <img :src="hot.img" alt />
      <span class="group-name">{{hot.title}}</span>
      <div class="desc">{{hot.desc}}</div>
    </div>
    <div class="more">查看更多小组</div>
    <h2 class="group-title">好好生活</h2>
    <div class="group-list" v-for="life in lifeGroup" :key="life.name">
      <img :src="life.img" alt />
      <span class="group-name">{{life.title}}</span>
      <div class="desc">{{life.desc}}</div>
    </div>
    <div class="more">查看更多小组</div>
    <h2 class="group-title">研究 · 探索 · 新知</h2>
    <div class="group-list" v-for="find in findGroup" :key="find.name">
      <img :src="find.img" alt />
      <span class="group-name">{{find.title}}</span>
      <div class="desc">{{find.desc}}</div>
    </div>
    <div class="more">更多相关小组</div>
  </div>
</template>

<script>
import request from "superagent";
import jsonp from "superagent-jsonp";
export default {
  data: () => ({
    hotGroup: "",
    lifeGroup: "",
    findGroup: "",
    husttgeek: ""
  }),
  methods: {
    async getData() {
      this.hotGroup = await this.$http.get("/group/hotGroup");
      this.hotGroup = this.hotGroup.data;
      this.lifeGroup = await this.$http.get("/group/lifeGroup");
      this.lifeGroup = this.lifeGroup.data;
      this.findGroup = await this.$http.get("/group/findGroup");
      this.findGroup = this.findGroup.data;
    },
    getHusttgeek() {
      request
        .get("https://api.douban.com/v2/group/husttgeek/")
        .use(jsonp({ timeout: 10000 }))
        .end((err, res) => {
          if (!err) {
            this.husttgeek = res.body;
          }
        });
    }
  },
  mounted() {
    this.getHusttgeek();
    this.getData();
  }
};
</script>

<style lang="scss" scoped>
.hot-group {
  padding: 1rem 0.75rem;
  .my-group {
    .hus-name {
      padding: 0 1rem;
      font-size: 0.85rem;
      color: #191919;
    }
    .hus-text {
      padding: 0.25rem 0.5rem;
      line-height: 1.25rem;
      text-indent: 2em;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
  }
  h2 {
    padding-top: 0.5rem;
    font-size: 0.9rem;
    color: #111;
  }
  .group-list {
    padding: 0.75rem 0;
    img {
      width: 2.1rem;
      height: 2.1rem;
    }
    .group-name {
      padding: 0 0.5rem;
      font-size: 0.9rem;
      color: #111;
    }
    .desc {
      padding: 0.5rem 0 0;
    }
  }
  .more {
    padding: 0.5rem;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    font-size: 0.75rem;
    text-align: center;
    color: #42bd56;
  }
}
</style>