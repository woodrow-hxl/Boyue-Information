<template>
  <div class="loading-music">
    <div class="list-item" v-for="(music,i) in getmusic" :key="i">
        <img :src="music.pic_small" alt="book" />
        <p class="item-title">{{music.title}}</p>
        <Star :star="score[i]" />
        <span class="item-score">{{score[i]}}</span>
    </div>
    <div class="icon" v-if="getmusic.length<1">
      <img src="../../public/image/loading_green.gif" alt />
    </div>
  </div>
</template>

<script>
import Star from "../components/Star";
export default {
  props: ["name"],
  data: () => ({
    show: true,
    type: "",
    score: [],
    getmusic: [],
    music: [
      { name: "热歌", type: 2 },
      { name: "欧美金曲", type: 21 },
      { name: "影视金曲", type: 24 },
      { name: "网络歌曲", type: 25 }
    ]
  }),
  components: {
    Star
  },
  methods: {
    random(max, min) {
      return Math.random() * (max - min) + min;
    },
    scores() {
      for (let j = 0; j < 10; j++) {
        let str = this.random(9, 5);
        this.score.push(str.toFixed(1));
      }
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
    this.scores();
    this.filterMusic();
    this.getMusics();
  }
};
</script>

<style lang="scss" scoped>
.loading-music {
  width: 50rem;
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
}
</style>