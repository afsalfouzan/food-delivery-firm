import React, { useEffect, useState } from "react";
import Navbar from "./components/customernavbar";
import Sidebar from "../products/components/categorylist";
import { useDispatch } from "react-redux";
import Productlist from "./components/productlist";
import "./products.css"

export default function Customerdashboard() {
  let dispatch = useDispatch();
  let [products, setProducts] = useState([]);
  let [category, setCategory] = useState([]);
  let [cart,setcart] = useState("")

  useEffect(() => {
    async function fetch() {
      let res = await dispatch.productmodel.getproduct();
      setProducts(res.products.rows);
      let cat_res = await dispatch.productmodel.getcategory();
      setCategory(cat_res.categories)
    }
    fetch();
  }, []);


  const fetchProducts = async (category) => {
    let params = { category_id: category }
    let p = await dispatch.productmodel.getproduct(params);
    setProducts(p.products.rows);
}

  return (
    <div className="container_customer">
      <div className="side_nav">
        <Navbar />
      </div>
      <div className="side_nav">
        <Sidebar category = {category} fetchProducts={fetchProducts}/>
      </div>
      <div className="side_cart">
      
      <div className="lis_map">
      {products.length ? <Productlist products={products} /> : null}
      </div>
      </div>     
    </div>
  );
}
