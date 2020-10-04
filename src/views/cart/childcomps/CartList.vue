<template>
    <scroll ref="scroll">
      <cart-list-item
        v-for="(item, index) in list"
        :key="index"
        :item-info="item">
        {{item}}
      </cart-list-item>
    </scroll>
</template>

<script>
  import Scroll from 'components/common/scroll/Scroll'

  import CartListItem from './CartListItem'

  import {mapGetters} from 'vuex'

  export default {
    name: "CartList",
    components: {
      Scroll,
      CartListItem
    },
    computed: {
      ...mapGetters({
        list: 'cartList'
      })
    },
    activated() {
      this.$refs.scroll.refresh()
    }
  }
</script>

<style scoped>

</style>
