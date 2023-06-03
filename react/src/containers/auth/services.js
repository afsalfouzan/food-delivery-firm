import axios from "axios";
import { api } from "../../helpers/axios";


export function login(user) {
  return api().post('/api/user/loginuser', user)
    .then((res) => res.data)
    .catch((e) => console.log("Error", e))
}

export function insertuser(payload) {
  return api().post('/api/user/insertuserdata', payload)
    .then((res) => res.data)
    .catch((e) => console.log("Error", e))
}