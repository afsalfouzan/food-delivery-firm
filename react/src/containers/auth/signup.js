import React from "react";
import { useNavigate } from "react-router-dom";
import "./signup.css";
import { Formik,ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";



function Signup() {
const dispatch = useDispatch();
  const navigate = useNavigate();

//toaster
const notify = (r) => {
  toast.success(r, {
    position: toast.POSITION.TOP_RIGHT,
  });
};

  const handleSubmitted =async (data) => {
    console.log(data, "data varunnundoo");
    await dispatch.auth.insertuser(data)
    notify("Created Successfully")
    navigate("/login");
  };
  return (
    <div className="signup" id="signup">
      <div className="signup_head">
        <h2 className="signup_company">SIGNUP PAGE</h2>
      </div>
      <div className="signup_form" id="signup_form">
        <Formik
          initialValues={{
            first_name: "",
            last_name: "",
            email: "",
            phone_number: "",
            password: "",
            confirm_password:""
          }}
          validationSchema={Yup.object().shape({
            first_name: Yup.string().required("Required"),
            last_name: Yup.string().required("Required"),
            email: Yup.string().required("Required"),
            phone_number: Yup.string().required("Required"),
            password: Yup.string().required("Required"),
            confirm_password: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
          })}
          onSubmit={(values) => {
            handleSubmitted(values);
          }}
        >
          {({ values, handleSubmit, handleChange}) => (
            <form id="signup_form" method="POST" onSubmit={handleSubmit}>
              <label>First Name :</label> <br></br>
              <input
                type="text"
                className="signup_fn"
                id="first_name"
                name="first_name"
                value={values.first_name}
                onChange={handleChange}
              />
              <ErrorMessage name="first_name" component="span" className="form-error" />
              <br />
              <br></br>
              <label>Last Name :</label> <br></br>
              <input
                type="text"
                className="signup_ln"
                id="last_name"
                name="last_name"
                value={values.last_name}
                onChange={handleChange}
              />
              <ErrorMessage name="last_name" component="span" className="form-error" />
              <br />
              <br></br>
              <label>Email :</label> <br></br>
              <input
                type="text"
                className="signup_email"
                id="email"
                name="email"
                value={values.email}
                onChange={handleChange}
              />
              <ErrorMessage name="email" component="span" className="form-error" />
              <br />
              <br></br>
              <label>Phone Number :</label> <br></br>
              <input
                type="text"
                className="signup_pn"
                id="phone_number"
                name="phone_number"
                value={values.phone_number}
                onChange={handleChange}
              />
              <ErrorMessage name="phone_number" component="span" className="form-error" />
              <br />
              <br></br>
              <label>Password :</label>
              <br></br>
              <input
                type="text"
                className="signup_pn"
                id="password"
                name="password"
                value={values.password}
                onChange={handleChange}
              />
              <ErrorMessage name="password" component="span" className="form-error" />
              <br></br>
              <label>Confirm Password :</label>
              <br></br>
              <input
                type="text"
                className="signup_pn"
                id="confirm_password"
                name="confirm_password"
                value={values.confirm_password}
                onChange={handleChange}
              />
              <div>
              <ErrorMessage name="confirm password" component="span" className="form-error" />
              </div>
              <br></br>
              <br></br>
              <input
                type="submit"
                name="submit"
                value="SIGNUP"
                id="submit"
                className="signup_cl"
              />
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Signup;
