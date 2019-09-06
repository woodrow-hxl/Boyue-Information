<template>
  <div class="event-view">
    <div class="header">
      <img :src="event.image" alt />
      <div class="header-content">
        <div class="header-title">{{event.title}}</div>
        <div class="header-time">{{event.begin_time}}</div>
        <div class="header-place">{{event.address}}</div>
        <div class="free">{{event.price_range}}</div>
        <div class="type">{{event.category_name}}</div>
        <span class="hobby">{{event.wisher_count}}人感兴趣</span>
        <span class="join">{{event.participant_count}}人要参加</span>
      </div>
    </div>
    <p>活动详情</p>
    <div class="content" v-html="event.content"></div>
  </div>
</template>

<script>
export default {
  data: () => ({
    event: []
  }),
  methods: {
    getEvent() {
      this.event = this.$route.query.event;
    }
  },
  mounted() {
    this.getEvent();
  }
};
</script>

<style lang="scss" scoped>
.event-view {
  width: 100%;
  padding: 0.5rem;
  .header {
    display: flex;
    width: 100%;
    img {
      flex: 0 0 4.5rem;
      width: 4.5rem;
      height: 7rem;
    }
    .header-content {
      flex: 1;
      padding:0 0.5rem 0.5rem;
      font-size: 0.65rem;
      box-sizing: border-box;
    }
    .header-title {
      font-size: 0.9rem;
      width: 10rem;
      line-height: 1rem;
      font-weight: bold;
      overflow: hidden;
      text-overflow: ellipsis; 
      white-space: nowrap;
    }
    .header-time,.free,.hobby,.join ,.type{
      line-height: 1rem;
    }
    .hobby{
      margin-right: 1.5rem;
    }
  }
  p{
    padding: 1.5rem 0;
  }
  .content{
    padding: 0 0.5rem;
    font-size: 0.8rem;
    color:#333;
    line-height: 1rem;
    text-align: justify;
    img{
      display: inline-block;
    }
  }
}
</style>