<template>
  <div class="group-view">
    <div class="husttgeek">
      <img :src="husttgeek.avatar" alt />
      <span class="hus-name">{{husttgeek.name}}</span>
      <div class="hus-text">{{husttgeek.desc}}</div>
    </div>
    <div class="group-item" v-for="(g,i) in group" :key="i">
      <div class="header">
        <img :src="g.author.avatar" alt />
        <span class="group-name">{{g.author.name}}</span>
      </div>
      <div class="content">{{g.text}}</div>
    </div>
  </div>
</template>

<script>
import request from "superagent";
import jsonp from "superagent-jsonp";
export default {
  data: () => ({
    group: "",
    husttgeek: ""
  }),
  methods: {
    getHusttgeek() {
      request
        .get("https://api.douban.com/v2/group/husttgeek/")
        .use(jsonp({ timeout: 10000 }))
        .end((err, res) => {
          if (!err) {
            this.husttgeek = res.body;
          }
        });
    },
    loadMore() {
      request
        .get("https://api.douban.com/v2/group/topic/33488193/comments")
        .use(jsonp({ timeout: 10000 }))
        .end((err, res) => {
          if (!err) {
            this.group = res.body.comments;
          }
        });
    }
  },
  mounted() {
    this.getHusttgeek();
    this.loadMore();
  }
};
</script>

<style lang="scss" scoped>
.group-view {
  padding: 1rem 0.75rem;
  .husttgeek {
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
  .group-item {
    margin: 1rem 0;
    img {
      border-radius: 50%;
      margin: 0.2rem;
    }
    .group-name {
      padding: 0 0.25rem;
      font-size: 0.85rem;
      color: #191919;
    }
    .content {
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
}
</style>