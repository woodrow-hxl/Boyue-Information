<template>
  <div class="newsongs">
    <div class="header">
      <!-- <img :src="icon.pic_s210" alt /> -->
      <span class="name">{{name}}榜</span>
    </div>
    <div class="content" v-for="(item,i) in getmusic" :key="i">
      <img :src="item.pic_small" alt />
      <div class="songs-item">
        <div class="songs-name">{{item.title}}</div>
        <span class="score"></span>
        <div class="songs-author">{{item.author}}
            <span>/</span>
            {{item.publishtime}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
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
    getname() {
      this.name = this.$route.query.name;
    },
    filterMusic() {
      for (let i = 0; i < this.music.length; i++) {
        if (this.music[i].name == this.name) {
          this.type = this.music[i].type;
        }
      }
    },
    getMusics() {
      
      this.$http(`ting&type=${this.type}&size=10&offset=0`).then(res => {
        this.getmusic = res.data.song_list;
      });
    }
  },
  mounted() {
    this.getname();
    this.filterMusic();
    this.getMusics();
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
    img {
      height: 100%;
      width: 4rem;
      border-radius: 50%;
    }
    .name {
      display: inline-block;
      width: 60%;
      line-height: 2rem;
      font-size: 0.9rem;
    }
  }
  .content {
    display: flex;
    width: 100%;
    padding: 1rem 0;
    border-bottom: 1px solid #ccc;
    img {
      flex: 0 0 4.5rem;
      width: 4.5rem;
      height: 4.5rem;
    }
    .songs-item {
      flex: 1;
      padding: 0 0.5rem;
    }
    .songs-name {
      font-size: 0.8rem;
      font-weight: bold;
      line-height: 1.5rem;
    }
    .songs-author {
      font-size: 0.7rem;
      line-height: 2rem;
      span{
          padding: 0 0.25rem;
      }
    }
  }
}
</style>