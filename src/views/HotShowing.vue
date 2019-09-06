<template>
  <div class="hot-showing">
    <div class="icon" v-if="movies.length<1">
      <img src="../../public/image/loading_green.gif" alt />
    </div>
      <p>
        <ListView :movies="movies" />          
      </p>
  </div>
</template>

<script>
import request from "superagent";
import jsonp from "superagent-jsonp";
import ListView from "../components/ListView";
export default {
  data:()=>({
    movies:[]
  }),
  methods:{
    hotmovies() {
      request
        .get(
          "http://api.douban.com/v2/movie/in_theaters?apikey=0df993c66c0c636e29ecbb5344252a4a"
        )
        .use(jsonp({ timeout: 10000 }))
        .end((err, res) => {
          if (!err) {
            this.movies = res.body.subjects;
          }
        });
    },
  },
  mounted(){
    this.hotmovies()
  },
  components:{
    ListView
  }
}
</script>

<style>

</style>