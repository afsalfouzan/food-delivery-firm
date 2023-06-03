import * as service from "./service";

export default {
  state: {
    products: [],
    categories: [],
    users:[]
  },
  reducers: {
    RolesDetails:(state,data) => {
      return {
        ...state,
        categories:data.roles
      }
    },

    UserDetails:(state,data) => {
      return{
        ...state,
        users:data.users
      }
    },
    getproductDetails: (state, data) => {
      return {
        ...state,
        products: data.products,
      };
    },
    getcategoryDetails: (state, data) => {
      return {
        ...state,
        categories: data.categories,
      };
    },
  },
  effects: {
    async Getusers(params){
      try{
        let res = await service.Getusers(params);
        this.UserDetails(res);
        return res;
      }catch(e){
        console.log(e)
      }
    },
    
    async Getroles(){
      try{
        let res = await service.Getroles();
        this.RolesDetails(res);
        return res;
      }catch(e) {
        console.log(e)
      }
    },
    async createproduct(value, rootState) {
      console.log(value, "payload");
      try {
        let res = await service.createproduct(value);
        console.log("product data", res);
        this.getproductDetails(res);
        return res;
      } catch (e) {
        console.log(e);
      }
    },
    async getproduct(params, state) {
      try {
        let res = await service.getproducts(params);
        console.log("data", res);
        this.getproductDetails(res);
        return res;
      } catch (e) {
        console.log(e);
      }
    },
    async getcategory(payload, rootState) {
      try {
        let res = await service.getcategorys(payload);
        console.log("category");
        this.getcategoryDetails(res);
        return res;
      } catch (e) {
        console.log(e);
      }
    },
    async deleteProduct(id, rootState) {
      try {
        let res = await service.deleteProduct(id);
        this.setproductDetails(res);
        return res;
      } catch (e) {
        console.log(e);
      }
    },
    async upadateProduct(params) {
      try{
        let res = await service.upadateProduct(params);
        this.getproductDetails(res);
        return res;
      }catch(e){
        console.log(e);
      }
    },
    async deleteUser(id, rootState) {
      try {
        let res = await service.TrashUser(id);
        this.UserDetails(res);
        return res;
      } catch (e) {
        console.log(e);
      }
    },
    async updateUser(params, rootState) {
      try {
        let res = await service.updateUser(params);
        this.UserDetails(res);
        return res;
      } catch (e) {
        console.log(e);
      }
    },
  },
};
