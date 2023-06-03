import { api,newApi } from "./../../helpers/axios";

export function createproduct(value) {
  return newApi()
    .post("/api/admin/products/create", value)
    .then((res) => res.data)
    .catch((e) => console.log("Error", e));
}

export function getproducts(params) {
  let param = new URLSearchParams(params).toString();
  return api()
    .get("/api/admin/getproduct?" + param)
    .then((res) => res.data)
    .catch((e) => console.log("Error", e));
}

export function getcategorys(payload) {
  let param = new URLSearchParams(payload).toString();
  console.log(param,"paraaaaaaaaaaaaaaaam")
  return api()
    .get(`/api/admin/getcategory?id=${param}`)
    .then((res) =>res.data)
    .catch((e) => console.log("Error", e));
}

export function deleteProduct(id){
  return api().put(`/api/admin/products/deleteProduct?id=${id}`)
  .then((res) => res.data)
  .catch((e) => console.log("Error",e));
}

export function upadateProduct(params) {
  console.log(params,"feeeeeeeeeeeeeeeei")
  return newApi().put(`/api/admin/products/updateProduct?id=${params.id}`,params.value)
  .then((res) =>res.data)
  .catch((e)=>console.log("Error",e));
}

export function Getusers(params){
let param = new URLSearchParams(params).toString();
return api().get('/api/users/list?'+param)
.then((res) => res.data)
.catch((e)=>console.log("Error",e));
}

export function Getroles(){

  return api().get('/api/roles')
  .then((res) => res.data)
  .catch((e) => console.log("Error",e))
}

export function TrashUser(id){
  
  return api().put(`/api/user/trash?id=${id}`)
  .then((res) => res.data)
  .catch((e) => console.log("Error",e))
}

export function updateUser(params) {

  return api().put(`/api/user/update?id=${params.id}`,params.value)
  .then((res) =>res.data)
  .catch((e)=>console.log("Error",e));
}

