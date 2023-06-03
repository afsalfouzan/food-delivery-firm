import * as service from "./service";

export default {
    state: {
      cart: [],
      order:[]
    },
    reducers: {
      cartData:(state,data) => {
        return {
          ...state,
          cart:data.cart
        }
      },
      orderData:(state,data) => {
        return {
          ...state,
          order:data.order
        }
      }
    },
    effects: {
        async cartview(params){
          try{
            let res = await service.cartview(params);
            this.cartData(res);
            return res;
          }catch(e){
            console.log(e)
          }
        },
        async addcart(params){
          try{
            let res = await service.addCart(params);
            this.cartData(res);
            return res;
          }catch(e){
            console.log(e)
          }
        },
        async removeitem(params){
          try{
            let res = await service.removeitem(params);
            this.cartData(res);
            return res;
          }catch(e){
            console.log(e)
          }
        },
        async updateCart(payload){
          try{
            let res = await service.updateCart(payload);
            this.cartData(res);
            return res;
          }catch(e){
            console.log(e)
          }
        },
        async addorder(payload,rootState){
          try{
            let res = await service.addorder(payload);
            this.orderData(res);
            return res;
          }catch(e){
            console.log(e)
          }
        },
        async getorders(payload,rootState){
          try{
            let res = await service.getorders(payload);
            this.orderData(res);
            return res;
          }catch(e){
            console.log(e)
          }
        },
  }
}