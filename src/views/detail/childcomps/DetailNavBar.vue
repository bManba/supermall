<template>
  <nav-bar>
    <div slot="left" class="back" @click="backClick">
      <img src="~assets/img/common/back.svg" alt="">
    </div>
    <div slot="center" class="titles">
      <div v-for="(item, index) in titles"
           class="titles-item"
           :class="{active: currentIndex === index}"
           @click="titlesClick(index)">
        {{item}}
      </div>
    </div>
  </nav-bar>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'

  export default {
    name: "DetailNavBar",
    components: {
      NavBar
    },
    data() {
      return {
        titles: ['商品', '参数', '评论', '推荐'],
        currentIndex: 0
      }
    },
    methods: {
      titlesClick(index) {
        this.currentIndex = index
        this.$emit('itemClick', index)
      },
      backClick() {
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
  .titles {
    display: flex;
    font-size: 14px;
  }

  .titles-item {
    flex: 1;
  }

  .active {
    color: var(--color-high-text);
  }

  .back img {
    padding-top: 11px;
    height: 29px;
    width: 22px;
  }
</style>
