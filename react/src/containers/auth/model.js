import * as service from "./services";
import { toast } from "react-toastify"

export default {
  state: {
    user: []
  },
  reducers: {
    setUserDetails: (state, data) => {
      console.log(data,"dataaaaaaaaaaa")
      return {
        ...state,
        user:data.users
      };
    },
    displayError: (state, error) => {
      return toast( error.message, {
          position: "top-right",
      });
    },
  },
  effects: {
    async login(payload, rootState) {
      console.log(payload,"payload")
      try {
        let res = await service.login(payload);
        console.log("user data",res)
        this.setUserDetails(res);
        if (res.users.message !== "success") {
          this.displayError(res.users)
        }
        return res;
      } catch (e) {
        return e;
      }
    },
    async insertuser(payload,rootState) {
      try{
        let res = await service.insertuser(payload);
        this.setUserDetails(res);
        return res;
      }catch(e){
        return e;
      }
    }
  }
};