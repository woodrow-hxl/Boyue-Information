<template>
  <div class="location-view">
    <p>热门城市</p>
    <div class="city">
      <span class="city-item" @click="getLocationCity(c)" :class="[{active:c==searchCity},{list_right:(i+1)%3==0}]" v-for="(c,i) in city" :key="c">{{c}}</span>
    </div>
    <p class="city-title">所选城市：{{searchCity}}</p>
    <div class="icon" v-if="event.length<1 || !show">
      <img src="../../public/image/loading_green.gif" alt />
    </div>
    <div class="city-event" v-show="show">
      <Discussion :event="event" />
    </div>
  </div>
</template>

<script>
import request from "superagent";
import jsonp from "superagent-jsonp";
import Discussion from "../components/Discussion";
export default {
  data: () => ({
    event: "",
    show:true,
    cityId: "118281",
    searchCity: "广州",
    city: [
      "深圳",
      "广州",
      "上海",
      "北京",
      "成都",
      "天津",
      "南京",
      "武汉",
      "杭州"
    ]
  }),
  methods: {
    getLocationCity(city){
      this.searchCity=city
    },
    searchId() {
      request
        .get(
          `https://api.douban.com/v2/loc/list?apikey=0df993c66c0c636e29ecbb5344252a4a`
        )
        .use(jsonp({ timeout: 10000 }))
        .end((err, res) => {
          if (!err) {
            let str = res.body.locs;
            str = str.filter(item => {
              if (item.name == this.searchCity) {
                return item;
              }
            });
            this.cityId = parseInt(str[0].id);
            
          }
        });
    },
    loadMore() {
      request
        .get(`https://api.douban.com/v2/event/list?loc=${this.cityId}&count=30`)
        .use(jsonp({ timeout: 10000 }))
        .end((err, res) => {
          if (!err) {
            this.event = res.body.events;
            this.show=true
          }
        });
    },
    getCity() {
       this.$http(`api/getLocation`).then(res => {
            this.searchCity = res.data.data.nm;
        });
    }
  },
  watch:{
    searchCity(){
      this.show=false
      this.searchId()
      this.loadMore()
    }
  },
  mounted() {
    this.searchId();
    this.loadMore();
    this.getCity()
  },
  components: {
    Discussion
  }
};
</script>

<style lang="scss" scoped>
.location-view {
  padding: 0rem 0.75rem;
  p {
    margin: 0;
    height: 3rem;
    line-height: 3rem;
    font-size: 0.85rem;
    color: #111;
  }
  .city-title {
    margin-top: 1rem;
    padding: 0;
    height: 2rem;
  }
  .city {
    width: 100%;
    .active{
      background-color: rgba(66,189,86,0.3);
      // opacity: 0.4;
    }
    .city-item {
      display: inline-block;
      margin-top: 0.5rem;
      margin-right: 1.2rem;
      border: 1px solid #ccc;
      border-radius: 25px;
      width: 4rem;
      height: 1.5rem;
      line-height: 1.5rem;
      font-size: 0.8rem;
      text-align: center;
      color: #42bd56;
    }
    .list_right {
      margin-right: 0;
    }
  }
}
</style>