<template>
  <scroll id="tab-menu">
    <div class="category-menu">
      <div class="category-menu-item"
           v-for="(item, index) in category"
           @click="menuClcik(index)"
           :class="{active: currentIndex === index}"
           :key="index">
        {{item.title}}
      </div>
    </div>
  </scroll>
</template>

<script>
  import Scroll from 'components/common/scroll/Scroll'
  export default {
    name: "CategoryMenu",
    components: {
      Scroll
    },
    props: {
      category: {
        type: Array,
        default: []
      }
    },
    data() {
      return {
        currentIndex: 0
      }
    },
    methods: {
      menuClcik(index) {
        this.currentIndex = index
        this.$emit('itemSelect', index)
      }
    }
  }
</script>

<style scoped>
  #tab-menu {
    background-color: #f6f6f6;
    height: 100%;
    width: 100px;
    box-sizing: border-box;
    overflow: hidden;
  }
  .category-menu-item {

    height: 45px;
    line-height: 45px;
    text-align: center;
    font-size: 14px;
  }

  .category-menu-item.active {
    font-weight: 700;
    color: var(--color-high-text);
    background-color: #fff;
    border-left: 3px solid var(--color-high-text);
  }
</style>
