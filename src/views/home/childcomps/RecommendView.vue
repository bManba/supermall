<template>
  <div class="recommend">
    <div v-for="item in recommends" class="recommend-view">
      <a :href="item.link">
        <img :src="item.image" alt="">
      </a>
      <div>{{item.title}}</div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "RecommendView",
    props: {
      recommends: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .recommend {
    display: flex;
    width: 100%;
    text-align: center;
    font-size: 14px;
    padding: 10px 0 15px;
    border-bottom: 8px solid #eee;
  }
  .recommend-view {
    flex: 1;
  }
  .recommend-view img {
    width: 60px;
    height: 60px;
  }
</style>
