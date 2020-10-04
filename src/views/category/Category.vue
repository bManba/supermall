<template>
  <div id="category">
    <nav-bar class="nav-bar"><div slot="center">商品分类</div></nav-bar>

    <div class="content">
      <category-menu :category="category" @itemSelect="itemSelect"></category-menu>

      <scroll id="tab-content" :data="[categoryData]">

        <sub-category :subCategory="showSubCate"/>

        <tab-control :titles="['综合', '新品', '销量']"
                     @itemClick="tabClick"/>
        <tab-content-detail :categoryDetail="showCategoryDetail"/>
      </scroll>
    </div>


  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import Scroll from 'components/common/scroll/Scroll'
  import TabControl from "components/content/tabcontrol/TabControl";

  import CategoryMenu from './childComps/CategoryMenu'
  import SubCategory from './childComps/SubCategory'
  import TabContentDetail from "./childComps/TabContentDetail";

  import { getCategory, getSubcategory, getCategoryDetail } from "network/category";
  import { POP, SELL, NEW, tabControlMixin} from 'common/mixin'

  export default {
    name: "Category",
    components: {
      TabContentDetail,
      TabControl,
      NavBar,
      Scroll,
      CategoryMenu,
      SubCategory
    },
    mixins: [POP, SELL, NEW, tabControlMixin],
    data() {
      return {
        category: [],
        categoryData: {},
        currentIndex: -1
      }
    },
    created() {
      getCategory().then(res => {
        console.log(res);
        this.category = res.data.data.category.list

        for (let i = 0; i < this.category.length; i++) {
          this.categoryData[i] = {
            subCategory: {},
            categoryDetail: {
              'pop': [],
              'new': [],
              'sell': []
            }
          }
        }
        this._getSubcategory(0)
      })


    },
    computed: {
      showSubCate() {
        if (this.currentIndex === -1) return {}
        return this.categoryData[this.currentIndex].subCategory
      },
      showCategoryDetail() {
        if (this.currentIndex === -1) return []
        return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
      }
    },
    methods: {
      //网络请求
      _getSubcategory(index) {
        this.currentIndex = index
        // console.log(index);
        const mailKey  = this.category[index].maitKey
        getSubcategory(mailKey).then(res => {
          console.log(res);
          this.categoryData[index].subCategory = res.data.data
          this.categoryData = {...this.categoryData}
          this._getCategoryDetail(POP)
          this._getCategoryDetail(NEW)
          this._getCategoryDetail(SELL)
        })
      },
      _getCategoryDetail(type) {
        // 1.获取请求的miniWallkey
        const miniWallkey = this.category[this.currentIndex].miniWallkey;
        // 2.发送请求,传入miniWallkey和type
        getCategoryDetail(miniWallkey, type).then(res => {
          // 3.将获取的数据保存下来
          console.log(res);
          console.log(this.currentIndex);
          this.categoryData[this.currentIndex].categoryDetail[type] = res.data
          this.categoryData = {...this.categoryData}
        })
      },
      //方法
      itemSelect(index) {
        this._getSubcategory(index)
      }
    }
  }
</script>

<style scoped>
  #category {
    height: 100vh;
  }

  .content {
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;

    display: flex;
  }

  .nav-bar {
    background-color: var(--color-tint);
    color: #ffffff;
    font-weight: 700;
  }

  #tab-content {
    flex: 1;
    height: 100%;
    overflow: hidden;
  }
</style>
