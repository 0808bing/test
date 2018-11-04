<template>
  <div class="tabs-app">
    <div class="tabs-total"><span><b v-text="items.length"></b> item left</span></div>
    <!-- <div class="btn">
      <span class="btn-all">all</span>
      <span class="active">active</span>
      <span class="completed">completed</span>
    </div> -->
    <div class="tabs-clear" @click="clearAll"><span>clear all </span></div>
  </div>
</template>
<script>
export default {
  props: ['items','cleanItem'],
  data() {
    return {

    }
  },
  methods: {
    clearAll(){
      this.cleanItem(true)
    }
  }
}
</script>
<style lang="stylus">
  .tabs-app
    padding 20px 0
    display flex
    div
      flex 1
      span 
        padding 3px
        border 1px solid red
        border-radius 4px
        background orange
        color #666
        b 
         color red
         font-size 20px
</style>


