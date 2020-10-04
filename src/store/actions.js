import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutations-type'

export default {
  addCart(context, payload) {
    //1.payload新添加的商品
    // let oldProduct = null;
    // for (let item of state.cartList) {
    //   if (item.iid === payload.iid) {
    //     oldProduct = item
    //   }
    // }
    return new Promise((resolve, reject) => {
      const oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
      // 2.判断oldProduct
      if (oldProduct) {
        // oldProduct.count += 1
        context.commit(ADD_COUNTER, oldProduct)
        resolve('当前商品+1')
      } else {
        payload.count = 1
        // context.state.carList.push(payload)
        context.commit(ADD_TO_CART, payload)
        resolve('商品加入购物车')
      }
    })

  }
}
