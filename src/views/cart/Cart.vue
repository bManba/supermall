<template>
  <div id="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>

    <cart-list class="cart-list"/>

    <cart-bottom-bar/>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'

  import CartList from './childcomps/CartList'
  import CartBottomBar from './childcomps/CartBottomBar'

  import { mapGetters } from 'vuex'

  export default {
    name: "Cart",
    components: {
      NavBar,
      CartList,
      CartBottomBar

    },
    computed: {
      // cartLength() {
      //   return this.$store.getters.cartLength
      // },
      // cartList() {
      //   return this.$store.getters.cartList
      // }
      // ...mapGetters(['cartLength', 'cartList'])
      ...mapGetters({
        length: 'cartLength'
      })
    },

  }
</script>

<style scoped>
  #cart {
    height: 100vh;
  }
  .nav-bar {
    background-color: var(--color-tint);
    color: #ffffff;
  }
  .cart-list {
    height: calc(100% - 44px - 49px - 40px);
    /*position: absolute;*/
    /*top: 44px;*/
    /*bottom: 49px;*/
    /*width: 100%;*/
    overflow: hidden;
  }
</style>
