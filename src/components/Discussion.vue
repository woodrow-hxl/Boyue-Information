<template>
  <div class="discussion">
    <router-link :to="{path:'/eventview',query:{event:event[index]}}" tag="div">
      <div class="content" v-for="(e,i) in event" :key="i" ref="eventRef" @click="getEvent(i)">
        <div class="discussion-top">
          <div class="text">
            <h3>{{e.title}}</h3>
            <p v-html="e.content"></p>
          </div>
          <img :src="e.image_hlarge" alt />
        </div>
        <div class="discussion-bottom">
          <span class="category_name">{{e.category_name}}</span>
          <span class="subcategory_name" v-if="e.subcategory_name">本活动来自栏目 {{e.subcategory_name}}</span>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: ["event"],
  data: () => ({
    index:0
  }),
  methods: {
    getEvent(i){
      this.index=i
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.discussion {
  width: 100%;
  .content {
    width: 100%;
    padding: 1.5rem 0;
    border-bottom: 1px solid #ccc;
  }
  .discussion-top {
    display: flex;
    width: 100%;
    margin-bottom: 1.5rem;
    .text {
      flex: 1;
      width: 8.75rem;
    }
    h3 {
      font-size: 0.85rem;
      line-height: 1.25rem;
      text-align: justify;
      color: #494949;
      margin-bottom: 0.25rem;
    }
    p {
      font-size: 0.7rem;
      line-height: 1.25rem;
      height: 2.5rem;
      text-align: justify;
      color: #aaa;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    img {
      flex: 0 0 3.75rem;
      margin-left: 1.5rem;
      width: 4.25rem;
      height: 5.25rem;
      background-size: 100% 100%;
    }
  }
  .discussion-bottom {
    display: flex;
    font-size: 0.7rem;
    color: #ccc;
    .category_name {
      flex: 0 0 2.5rem;
      display: inline-block;
      text-align: left;
    }
    .subcategory_name {
      flex: 1;
      display: inline-block;
      text-align: right;
    }
  }
}
</style>