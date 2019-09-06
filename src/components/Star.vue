<template>
  <div class="star-content">
    <span v-for="(star,index) in starItems" :key="index" :class="['item-star',`star-${star}`]"></span>
  </div>
</template>

<script>
const starCount = 5;

export default {
  props:['star'],
  computed: {
    starItems() {
      let star=this.star>10? this.star/10 : this.star/2
      let num = Math.floor(star * 2) / 2;
      let result = [];
      for (let i = 0; i < starCount; i++) {
        if (i < Math.floor(num)) {
          result.push("on");
        } else if (i === Math.floor(num) && i < num) {
          result.push("half");
        } else {
          result.push("off");
        }
      }
      return result;
    }
  }
};
</script>

<style lang="scss" scoped>
.star-content {
  margin-bottom: 0.5rem;
  display: inline-block;
  vertical-align: top;
  .item-star {
    display: inline-block;
    width: 0.5rem;
    height:0.5rem;
    margin-right: 0.1rem;
    background-repeat: no-repeat;
    background-size: 0.5rem;

    &.star-on {
      background-image: url('../../public/image/star24_on@2x.png')
    }
    &.star-off {
      background-image: url('../../public/image/star24_off@2x.png')
    }
    &.star-half {
      background-image: url('../../public/image/star24_half@2x.png')
    }
  }
}
</style>