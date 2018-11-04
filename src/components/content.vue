<template>
  <div class="app-content">
    <input 
      type="text" 
      class="add-input" 
      autofocus="autofocus" 
      placeholder="请输入内容" 
      @keyup.enter="addTodo" 
    />
    <item :items="itemData" :item-num="itemNum"></item>
    <tabs :items="itemData" :clean-item="cleanItem"></tabs>
  </div>
</template>
<script>
import Item from './item.vue'
import Tabs from './tabs.vue'
export default {
  data() {
    return {
      itemData: []
    }
  },
  methods: {
    addTodo(e) {
      let value = e.target.value
      if(!value){
        return
      }
      this.itemData.push(value)
      e.target.value = ''
    },
    itemNum(msg){
      this.itemData.splice(msg, 1)
    },
    cleanItem(msg){
      if(msg){
        this.itemData.splice(0)
      }
    }
  },
  components: {
    Item,
    Tabs
  }
}
</script>
<style lang="stylus">
  .app-content
    margin 30px
    padding 30px
    background white
    input
      border 1px solid #cccccc
      border-radius 4px
      padding 10px
      width 100%
      font-size 16px
      color #666
</style>


