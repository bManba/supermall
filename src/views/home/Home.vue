<template>
  <div id="home">
    <nav-bar class="home-nav-bar"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends"/>
    <feature-view></feature-view>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import HomeSwiper from './childcomps/HomeSwiper'
  import RecommendView from './childcomps/RecommendView'
  import FeatureView from './childcomps/FeatureView'

  import {getHomeMultidata} from "network/home";


  export default {
    name: "Home",
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView
    },
    data() {
      return {
        banners: [],
        recommends: []
      }
    },
    created() {
      getHomeMultidata().then(res => {
        // console.log(res);
        this.banners = res.data.data.banner.list;
        this.recommends = res.data.data.recommend.list
      })
    }
  }
</script>

<style scoped>
  .home-nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
