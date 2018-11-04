<template>
  <ul>
    <li v-for="(item,index) in items" :key="index">{{item}}<span @click="delItem(index)">x</span></li>
  </ul>
</template>
<script>
export default {
  props: ['items','itemNum'],
  data() {
    return {

    }
  },
  methods: {
    delItem(index){
      this.itemNum(index)
    }
  }
}
</script>
<style lang="stylus">
  ul 
    li 
      color #666
      height 30px
      span 
        float right
        width 30px
        height 30px
        text-align center
        text-decoration none
</style>


