<template>
  <div class="sub-category">
    <grid-view :cols="3" :lineSpace="15" :v-margin="20" v-if="subCategory.list">
      <div class="item" v-for="(item, index) in subCategory.list" :key="index">
        <a :href="item.link">
          <img class="item-img" :src="item.image" alt="">
          <div class="item-text">{{item.title}}</div>
        </a>
      </div>
    </grid-view>
  </div>
</template>

<script>
  import GridView from 'components/common/gridView/GridView'

  export default {
    name: "SubCategory",
    components: {
      GridView
    },
    props: {
      subCategory: {
        type: Object,
        default() {
          return {}
        }
      }
    }
  }
</script>

<style scoped>
  .panel img {
    width: 100%;
  }

  .item {
    text-align: center;
    font-size: 12px;
  }

  .item-img {
    width: 80%;
  }

  .item-text {
    margin-top: 15px;
  }
</style>
