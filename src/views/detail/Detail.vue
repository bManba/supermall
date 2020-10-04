<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"
                    @itemClick="titleClick"
                    ref="nav"/>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probeType="3">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo"
                         @imageLoad="imageLoad"/>
      <detail-param-info :param-info="paramInfo" ref="params"/>
      <detail-comment-info :comment-info="commentInfo" ref="comment"/>
      <goods-list :goods="recommends" ref="recommends"/>
    </scroll>
    <detail-bottom-bar @addCart="addCart"/>

    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>

</template>

<script>
  import DetailSwiper from "./childcomps/DetailSwiper";
  import DetailNavBar from './childcomps/DetailNavBar'
  import DetailBaseInfo from './childcomps/DetailBaseInfo'
  import DetailShopInfo from './childcomps/DetailShopInfo'
  import DetailGoodsInfo from './childcomps/DetailGoodsInfo'
  import DetailParamInfo from './childcomps/DetailParamInfo'
  import DetailCommentInfo from './childcomps/DetailCommentInfo'
  import DetailBottomBar from './childcomps/DetailBottomBar'



  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backtop/BackTop'
  import GoodsList from 'components/content/goods/GoodsList'

  // import Toast from 'components/common/toast/Toast'


  import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "network/detail";

  import {debounce} from "common/utils";
  import {BACKTOP_DISTANCE, backTopMixin} from "common/mixin";


  export default {
    name: "Detail",
    components: {
      DetailGoodsInfo,
      DetailSwiper,
      DetailNavBar,
      DetailBaseInfo,
      DetailShopInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      Scroll,
      BackTop,
      GoodsList,
      // Toast
    },
    mixins: [backTopMixin],
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [],
        currentIndex: 0,
        getThemeTopYs: null,
        // message: '',
        // show: false
      }
    },
    created() {
      this.iid = this.$route.params.iid

      getDetail(this.iid).then(res => {
        console.log(res);

        const data = res.data.result
        this.topImages = data.itemInfo.topImages

        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        this.shop = new Shop(data.shopInfo)

        this.detailInfo = data.detailInfo

        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        if(data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }


        //获取的是DOM渲染之后，但是图片未计算在内
        // this.$nextTick(() => {
        //   this.themeTopYs = []
        //   this.themeTopYs.push(0)
        //   this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        //   this.themeTopYs.push(this.$refs.recommends.$el.offsetTop)
        //   console.log(this.themeTopYs);
        // })

      })

      getRecommend().then(res => {
        console.log(res);
        const data = res.data.data
        this.recommends = data.list
      })

      this.getThemeTopYs = debounce(() => {
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop - 45)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 45)
        this.themeTopYs.push(this.$refs.recommends.$el.offsetTop - 45)
        this.themeTopYs.push(Number.MAX_VALUE)

        console.log(this.themeTopYs);
      }, 100)
    },
    // updated() {
    //   this.themeTopYs = []
    //   this.themeTopYs.push(0)
    //   this.themeTopYs.push(this.$refs.params.$el.offsetTop)
    //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
    //   this.themeTopYs.push(this.$refs.recommends.$el.offsetTop)
    //   console.log(this.themeTopYs);
    // },
    methods: {
      imageLoad() {
        this.$refs.scroll.refresh()
        this.getThemeTopYs()

        // this.themeTopYs = []
        // this.themeTopYs.push(0)
        // this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        // this.themeTopYs.push(this.$refs.recommends.$el.offsetTop)
        //
        // console.log(this.themeTopYs);
      },
      titleClick(index) {
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100)
      },
      contentScroll(position) {
        const positionY = -position.y

        let length = this.themeTopYs.length
        for (let i = 0; i < length - 1; i++) {
          // if (this.currentIndex !== i &&((i < length - 1 && positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) || (i === length - 1 && positionY > this.themeTopYs[i]))) {
          //   this.currentIndex = i
          //   console.log(this.currentIndex);
          //   this.$refs.nav.currentIndex = this.currentIndex
          // }
          if ((this.currentIndex !== i) && (positionY >= this.themeTopYs[i]) && (positionY < this.themeTopYs[i+1])) {
            this.currentIndex = i
            // console.log(this.currentIndex);
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }

        this.isShowBackTop = positionY > BACKTOP_DISTANCE
      },
      addCart() {
        const product = {}
        product.iid = this.iid
        product.img = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.realPrice

        // this.$store.commit('addCart', product)
        this.$store.dispatch('addCart', product).then(res => {
          // this.show = true;
          // this.message = res;
          //
          // setTimeout(() => {
          //   this.show = false;
          //   this.message = ''
          // }, 1500)
          this.$toast.show(res)
        })
      }


    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content {
    height: calc(100% - 46px - 58px);
    overflow: hidden;
  }
</style>
