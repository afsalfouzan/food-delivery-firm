import React, { useEffect, useState } from "react";
import "./addproducts.css";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Header from "../components/header";
import Sidebar from "../components/sidebar";
import Select from "react-select";

const initialValues = {
  name: "",
  description: "",
  status: "",
  price: "",
  category_id: "",
};



const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = "Required";
  }

  if (!values.description) {
    errors.description = "Required";
  }
  if (!values.status) {
    errors.status = "Required";
  }
  if (!values.price) {
    errors.price = "Required";
  }
  return errors;
};

export default function Addproducts() {
  const [selectedcategory, setSelected] = useState();
  const [category, setCategory] = useState([]);

  useEffect(() => {
    async function fetchcategory() {
      let res = await dispatch.productmodel.getcategory();
      setCategory(res.categories);
    }
    fetchcategory();
  }, []);

  const options = category.map((d) => ({
    value: d.id,
    label: d.name,
  }));

  const handleChange = (e) => {
    setSelected(e.value);
  };

  const dispatch = useDispatch();
  let navigate = useNavigate();

  const onSubmit = async (value) => {
    value.category_id = selectedcategory;
    let res = await dispatch.productmodel.createproduct(value);

    if (res.message === "product exists") {
      alert("Product already exists!! Kindly add a Unique Product");
    }
    navigate("/admin/products");
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });
  return (
    <div>
      <Header />
      <Sidebar />
      <div className="products" id="products">
        <div className="head">
          <h2 className="company">ADD PRODUCTS</h2>
        </div>
        <div className="form" id="form1">
          <form id="form" method="POST" onSubmit={formik.handleSubmit}>
            <label>Name :</label> <br></br>
            <input
              type="text"
              placeholder="Product name"
              className="box"
              id="name"
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            <br />
            {formik.touched.name && formik.errors.name ? (
              <p>{formik.errors.name}</p>
            ) : null}
            <br></br>
            <label>Description :</label> <br></br>
            <textarea
              rows={4}
              cols={25}
              type="text"
              placeholder="Description"
              className="text"
              id="description"
              name="description"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
            />
            <br />
            {formik.touched.description && formik.errors.description ? (
              <p>{formik.errors.description}</p>
            ) : null}
            <br></br>
            <label>Status :</label> <br></br>
            <input
              type="text"
              placeholder="Status"
              className="status"
              id="status"
              name="status"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.status}
            />
            <br />
            {formik.touched.status && formik.errors.status ? (
              <p>{formik.errors.status}</p>
            ) : null}
            <br></br>
            <label>Price :</label> <br></br>
            <input
              type="text"
              placeholder="Price"
              className="text"
              id="price"
              name="price"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.price}
            />
            <br />
            {formik.touched.price && formik.errors.price ? (
              <p>{formik.errors.price}</p>
            ) : null}
            <br></br>
            <label>Category_ID :</label> <br></br>
            <Select
              id="category_idd"
              classname="box"
              options={options}
              onChange={(e) => handleChange(e)}
            />
            <br></br>
            <input
              type="submit"
              name="submit"
              value="Add product"
              id="submit"
              className="button"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
