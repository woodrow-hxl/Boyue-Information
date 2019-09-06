<template>
  <div class="movie-content">
    <div class="show-item" v-if="movies">
      <div
        class="list-item"
        :class="{current:(j+1)%3==0}"
        v-for="(m,j) in movies"
        :key="j"
        v-show="j<6"
      >
        <img :src="m.images.small" alt="movie" />
        <p class="item-title">{{m.title}}</p>
        <Star :star="m.rating.stars" />
        <span class="item-score">{{m.rating.average}}</span>
      </div>
    </div>
    <div class="show-item" v-if="comingMovie">
      <div
        class="list-item"
        :class="{current:(j+1)%3==0}"
        v-for="(m,j) in comingMovie"
        :key="j"
        v-show="j<6"
      >
        <img :src="m.images.small" alt="movie" />
        <p class="item-title">{{m.title}}</p>
        <Star :star="m.rating.stars" />
        <span class="item-score">{{m.rating.average}}</span>
      </div>
    </div>
    <div class="show-item" v-if="suspense">
      <div
        class="list-item"
        :class="{current:(j+1)%3==0}"
        v-for="(m,j) in suspense"
        :key="j"
        v-show="j<6"
      >
        <img :src="m.images.small" alt="movie" />
        <p class="item-title">{{m.title}}</p>
        <Star :star="m.rating.stars" />
        <span class="item-score">{{m.rating.average}}</span>
      </div>
    </div>
    <div class="show-item" v-if="loveMovie">
      <div
        class="list-item"
        :class="{current:(j+1)%3==0}"
        v-for="(m,j) in loveMovie"
        :key="j"
        v-show="j<6"
      >
        <img :src="m.images.small" alt="movie" />
        <p class="item-title">{{m.title}}</p>
        <Star :star="m.rating.stars" />
        <span class="item-score">{{m.rating.average}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import Star from "../components/Star";
export default {
  props: [
    "movies",
    "comingMovie",
    "suspense",
    "loveMovie",
    "fictionbook",
    "nonfictionbook"
  ],
  data: () => ({}),
  components: {
    Star
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.movie-content {
  width: 100%;
  .list-item {
    display: inline-block;
    margin-right: 0.5rem;
    margin-top: 0.5rem;
    width: 4.5rem;
    height: 6.3rem;
    background-repeat: no-repeat;
    background-size: cover;
    &.current {
      margin-right: 0;
    }
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