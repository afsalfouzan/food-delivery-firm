import React, { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/header";
import "./editproducts.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import Select from "react-select";
import { toast } from "react-toastify";
import * as Yup from "yup";

function EditProducts() {
  let dispatch = useDispatch();
  let navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [getcategory, defaultCategory] = useState(null);
  const [getstatus, defaultStatus] = useState(null);
  const [category, setCategory] = useState([]);

  const { id } = useParams();
  let params = {
    id: id,
  };
  console.log("id varunnundo");

  const status_option = [
    { value: "active", label: "active" },
    { value: "inactive", label: "inactive" },
    { value: "trash", label: "trash" },
  ];

  useEffect(() => {
    async function GetProduct() {
      let cat_data = await dispatch.productmodel.getcategory();
      let res = await dispatch.productmodel.getproduct(params);
      console.log(res, "res varum");
      setProduct(res.products.rows[0]);
      console.log(cat_data.categories, "category api call");

      //category mapping
      const options = [];
      cat_data.categories.map((item) => {
        return options.push({ value: item.id, label: item.name });
      });
      setCategory(options);

      // Default category
      const index = options.findIndex((object) => {
        return object.value == res.products.rows[0].category_id;
      });
      defaultCategory(index);
      console.log(getcategory, "default");

      //default status
      const statusIndex = status_option.findIndex((object) => {
        return object.value == res.products.rows[0].status;
      });
      defaultStatus(statusIndex);
    }
    GetProduct();
  }, []);

  console.log(product, "product varumooo");
  console.log(category[getcategory], "category varumooo");

  const notify = (r) => {
    toast.success(r, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const handleSubmit = async (value) => {
    console.log(value,"imaaaage")
    let params = {
      id: id,
      value: value,
    };
    await dispatch.productmodel.upadateProduct(params);
    notify(`${value.name} updated successfully`);
    navigate("/admin/products");
  };

  return (
    <div className="container_1">
      <div className="container_2">
        <Sidebar />
        {product && (
          <Formik
            initialValues={{
              name: `${product.name}`,
              description: `${product.description}`,
              price: `${product.price}`,
              status: `${product.status}`,
              category_id: `${product.category_id}`,
              image: `${product.image}`,
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string().required("Required"),
              description: Yup.string().required("Required"),
              status: Yup.string().required("Required"),
              category_id: Yup.string().required("Required"),
              price: Yup.string().required("Required"),
            })}
            onSubmit={(values) => {
              handleSubmit(values);
            }}
          >
            {({
              values,
              handleSubmit,
              handleChange,
              handleBlur,
              setFieldValue,
            }) => (
              <form
                id="edit_form"
                className="edit_form"
                method="POST"
                onSubmit={handleSubmit}
              >
                <label>Name :</label> <br></br>
                <input
                  type="text"
                  className="edit_box"
                  value={values.name}
                  id="edit_name"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <br />
                <br></br>
                <label>Description :</label> <br></br>
                <textarea
                  rows={4}
                  cols={25}
                  type="text"
                  value={values.description}
                  className="edit_text"
                  id="description"
                  name="description"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <br />
                <br></br>
                <label>Status :</label> <br></br>
                <Select
                  id="statuss"
                  classname="select1"
                  value={values.optionChange}
                  options={status_option}
                  defaultValue={status_option[getstatus]}
                  onChange={(value) =>
                    setFieldValue("category_id", value.value)
                  }
                />
                <br />
                <br></br>
                <label>Price :</label>
                <input
                  type="text"
                  className="edit_text"
                  value={values.price}
                  id="price"
                  name="price"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <br></br>
                <label>Upload Image :</label>
                <input
                  type="file"
                  name="image"
                  id="image"
                  onChange={(e) => {
                    setFieldValue("image", e.target.files[0]);
                  }}
                  onBlur={handleBlur}
                />
                <br />
                <br></br>
                <label>CATEGORY_NAME :</label> <br></br>
                <Select
                  id="category_idd"
                  classname="select1"
                  value={values.optionChange}
                  options={category}
                  defaultValue={category[getcategory]}
                  onChange={(value) =>
                    setFieldValue("category_id", value.value)
                  }
                />
                <br></br>
                <input
                  type="submit"
                  name="submit"
                  value="APPLY"
                  id="submit"
                  className="edit_button"
                />
              </form>
            )}
          </Formik>
        )}
      </div>
      <Header />
    </div>
  );
}
export default EditProducts;
