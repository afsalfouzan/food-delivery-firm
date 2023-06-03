import React, { useEffect } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialValues = {
  email: "",
  password: "",
};

const validate = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
};

function Login() {
  const notify = (r) => {
    toast.error(r, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [, setCookie] = useCookies(["auth_cookie"]);
  const { user } = useSelector((state) => state.auth);

  const onSubmit = async (value) => {
    console.log(value, "fow");
    let res = await dispatch.auth.login(value);
    if (res.users.message === "success") {
      setCookie("auth_cookie", res, { path: "/", maxAge: 86400 });
      if (res.users.role_id === 1) {
        navigate("/customer/products");
      } else {
        navigate("/admin/products");
      }
    }

 

    if (res.users.message === "password is incorrect") {
      notify();
    } else if (res.users.message === "invalid user id") {
      notify();
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });

  return (
    <div><h1 className="styless"> Welcome To The World Of Foodie.... </h1>
    <div className="login" id="login">
      
      <div className="head">
        <h1 className="companny">LOGIN PAGE</h1>
      </div>
      <div className="form">
        <form id="form1" method="POST" onSubmit={formik.handleSubmit}>
          <input
            type="text"
            placeholder="Enter email"
            className="text"
            id="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          <br />
          {formik.touched.email && formik.errors.email ? (
            <p>{formik.errors.email}</p>
          ) : null}
          <br />
          <input
            type="password"
            placeholder="••••••••••••••"
            className="password"
            name="password"
            id="pwd"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          <br />
          {formik.touched.password && formik.errors.password ? (
            <p>{formik.errors.password}</p>
          ) : null}
          <br />
          <input
            type="submit"
            name="submit"
            value="Login"
            id="submit"
            className="button1"
          />
        </form>
        <Link to={"/signup"}>
          <input
            type="Signup1"
            name="Signup1"
            value="Signup"
            id="Signup1"
            className="Signup1"
          />
        </Link>
      </div>
    </div>
    </div>
  );
}

export default Login;
