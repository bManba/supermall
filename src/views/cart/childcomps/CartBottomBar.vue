<template>
  <div class="cart-bottom-bar">
    <div class="check-all-button">
      <check-button class="check-all" :is-checked="isCheckedAll" @click.native="checkClick"/>
      <span>全选</span>
    </div>

    <div class="total-price">
      合计：￥{{totalPrice}}
    </div>

    <div class="computed" @click="calcClick">
      去计算({{checkedLength}})
    </div>
  </div>
</template>

<script>
  import CheckButton from 'components/content/checkButton/CheckButton'

  import { mapGetters } from 'vuex'

  export default {
    name: "CartBottomBar",
    components: {
      CheckButton
    },
    computed: {
      ...mapGetters(['cartList']),
      totalPrice() {
        return this.cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.price * item.count
        }, 0).toFixed(2)
      },
      checkedLength() {
        return this.cartList.filter(item => item.checked).length
      },
      isCheckedAll() {
        if (this.cartList.length === 0) return false
        //filter
        // return !(cartList.filter(item => !item.checked).length)
        //find
        // return !(cartList.find(item => !item.checked))
        //for循环遍历
        for (let item of this.cartList) {
          if (!item.checked) {
            return false
          }
        }
        return true
      }
    },
    methods: {
      checkClick() {
        if (this.isCheckedAll) {
          this.cartList.forEach(item => item.checked = false)
        } else {
          this.cartList.forEach(item => item.checked = true)

        }
      },
      calcClick() {
        if (!this.isCheckedAll) {
          this.$toast.show('请选择商品')
        }
      }
    }
  }
</script>

<style scoped>
  .cart-bottom-bar {
    position: relative;
    display: flex;
    height: 40px;
    background-color: #f2f2f2;
  }

  .check-all-button {
    width: 80px;
    display: flex;
    align-items: center;
  }

  .check-all {
    width: 20px;
    height: 20px;
    margin-left: 10px;
    margin-right: 5px;
  }

  .total-price {
    flex: 1;
    line-height: 40px;
  }

  .computed {
    width: 90px;
    background-color: red;
    color: #fff;
    line-height: 40px;
    text-align: center;
  }
</style>
