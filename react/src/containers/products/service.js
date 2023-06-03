import { api } from "./../../helpers/axios";

export function cartview(params) {
    let param = new URLSearchParams(params).toString();
    return api().get('/api/cart/view?'+param)
      .then((res) => res.data)
      .catch((e) => console.log("Error", e));
  }

  export function addCart(params) {
    console.log(params,"paraaaaaaaaaaaa")
    // let param = new URLSearchParams(params).toString();
    return api().post('/api/cart/add', params)
      .then((res) => res.data)
      .catch((e) => console.log("Error", e));
  }

  export function removeitem(params){
    console.log(params,"serviceeeeeeeee")
    let param = new URLSearchParams(params).toString();
    return api().delete(`/api/cart/delete?`+param)
    .then((res) => res.data)
    .catch((e) => console.log("Error",e));
  }

export async function updateCart(payload){
    let param = new URLSearchParams(payload.params).toString();
    return await api().put('/api/cart/update?'+param,payload.value)
     .then((res) =>res.data)
     .catch((e)=>console.log("Error",e))
 }

 export function addorder(params) {
  return api().post('/api/order/add', params)
    .then((res) => res.data)
    .catch((e) => console.log("Error", e));
}

export function getorders(params) {
  let param = new URLSearchParams(params).toString();
  return api().get('/api/order/view?'+param)
    .then((res) => res.data)
    .catch((e) => console.log("Error", e));
}