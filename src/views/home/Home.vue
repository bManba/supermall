<template>
  <div id="home">
    <nav-bar class="home-nav-bar"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行', '新款', '精选']"
                 @itemClick="tabClick"
                 ref="tabControl1"
                 class="tab-control"
                 v-show="isTabFixed"/>
    <scroll class="wrapper"
            ref="scroll"
            :probeType="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control :titles="['流行', '新款', '精选']"
                   @itemClick="tabClick"
                   ref="tabControl2"/>
      <goods-list :goods="showGoods"/>
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop"/>

  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabcontrol/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import BackTop from 'components/content/backtop/BackTop'
  import Scroll from 'components/common/scroll/Scroll'

  import HomeSwiper from './childcomps/HomeSwiper'
  import RecommendView from './childcomps/RecommendView'
  import FeatureView from './childcomps/FeatureView'

  import { getHomeMultidata, getGoodsData } from "network/home";
  import { debounce } from "common/utils"

  import {BACKTOP_DISTANCE, backTopMixin} from "common/mixin";


  export default {
    name: "Home",
    components: {
      NavBar,
      Scroll,
      TabControl,
      GoodsList,
      BackTop,
      HomeSwiper,
      RecommendView,
      FeatureView
    },
    mixins: [backTopMixin],
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        currentType: 'pop',
        TabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0
      }
    },
    created() {
      this.getHomeMultidata()

      this.getGoodsData('pop')
      this.getGoodsData('new')
      this.getGoodsData('sell')

    },
    mounted() {
      // 监听item中图片加载完成
      const refresh = debounce(this.$refs.scroll.refresh, 50)
      this.$bus.$on('itemImageLoad', () => {
        // this.$refs.scroll.refresh()
        refresh()
      })

    },
    activated() {
      this.$refs.scroll.scrollTo(0, this.saveY)
      // console.log(this.saveY);
      this.$refs.scroll.refresh()
    },
    deactivated() {
      this.saveY = this.$refs.scroll.getScrollY()
      // console.log(this.saveY);
      // console.log('---');
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    // destroyed() {
    //   this.saveY = this.$refs.scroll.getScrollY()
    //   console.log('----');
    // },
    methods: {
      /**
       *事件监听相关方法
       */
      tabClick(index) {
        switch (index) {
           case 0:
             this.currentType = 'pop'
             break
           case 1:
             this.currentType = 'new'
             break
           case 2:
             this.currentType = 'sell'
             break
         }
         this.$refs.tabControl1.currentIndex = index;
         this.$refs.tabControl2.currentIndex = index;
      },

      contentScroll(position) {
        // console.log(position);
        this.isShowBackTop = (-position.y) > BACKTOP_DISTANCE

        this.isTabFixed = (-position.y) > this.tabOffsetTop

      },
      loadMore() {
         this.getGoodsData(this.currentType)
      },
      swiperImageLoad() {
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      },

      /**
       * 网络请求相关方法
       */
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          // console.log(res);
          this.banners = res.data.data.banner.list;
          this.recommends = res.data.data.recommend.list
        })
      },
      getGoodsData(type) {
        const page = this.goods[type].page + 1
        getGoodsData(type, page).then(res => {
          // console.log(res);
          this.goods[type].list.push(...res.data.data.list)
          this.goods[type].page += 1

          this.$refs.scroll.finishPullUp()

        })
      }
    }
  }
</script>

<style scoped>
  #home {
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
  }
  .home-nav-bar {
    background-color: var(--color-tint);
    color: #fff;

    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*z-index: 9;*/
  }
  .wrapper {
    overflow: hidden;
    position: absolute;
    bottom: 49px;
    top: 44px;
    left: 0;
    right: 0;
  }
  /*.wrapper {*/
    /*height: 300px;*/
    /*overflow: hidden;*/
  /*}*/
  .tab-control {
    position: relative;
    z-index: 9;
  }
</style>
