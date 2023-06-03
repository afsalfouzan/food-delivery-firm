import React, { useEffect, useState } from "react";
import Select from "react-select";
import "./edituser.css";
import Header from "../components/header";
import Sidebar from "../components/sidebar";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Formik } from "formik";

function Edituser() {
  const dispatch = useDispatch();

  const [setUser, getUser] = useState();
  const [setRoles, getRoles] = useState([]);
  const [getstatus, defaultStatus] = useState(null);
  const [setdefaultRoute, defaultRole] = useState();

  const { id } = useParams();
  let params = {
    id: id,
  };
  const status_option = [
    { value: "active", label: "active" },
    { value: "inactive", label: "inactive" },
    { value: "trash", label: "trash" },
  ];

  useEffect(() => {
    async function Getuseredit() {
      let res = await dispatch.productmodel.Getusers(params);
      console.log(res, "user varunnundoo");
      getUser(res.users.rows[0]);
      let role_data = await dispatch.productmodel.Getroles();
      console.log(role_data, "role_data varunnundoo");

      const options = [];
      role_data.roles.map((item) => {
        return options.push({ value: item.id, label: item.role_name });
      });
      getRoles(options);
    }
    Getuseredit();
  }, []);
  console.log(setUser, setRoles, "setuser varunnundoo");
  const handleSubmit = async (value) => {
    console.log(value, "valueeeeeee");
    let params = {
      id: id,
      value: value,
    };
    await dispatch.productmodel.updateUser(params);
  };

  return (
    <div className="editt" id="signup">
      <Header />
      <div className="sidebar_users">
        <Sidebar />
      </div>
      <div className="edit_form" id="signup_form">
        <div className="edit_head">
          <h2 className="signup_company">MODIFY USER DETAILS</h2>
        </div>
        {setUser && (
          <Formik
            initialValues={{
              first_name: `${setUser.first_name}`,
              last_name: `${setUser.last_name}`,
              email: `${setUser.email}`,
              phone_number: `${setUser.phone_number}`,
              role_id: `${setUser.role_id}`,
              status: `${setUser.status}`,
            }}
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
                className="edit_form11"
                method="POST"
                onSubmit={handleSubmit}
              >
                <label>First Name :</label> <br></br>
                <input
                  type="text"
                  className="signup_fn"
                  id="first_name"
                  name="first_name"
                  value={values.first_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
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
                  onBlur={handleBlur}
                />
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
                  onBlur={handleBlur}
                />
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
                  onBlur={handleBlur}
                />
                <br />
                <br></br>
                <label>Role Name :</label>
                <br />
                <Select
                  id="role_id"
                  classname="select1"
                  options={setRoles}
                  onChange={(value) => setFieldValue("role_id", value.value)}
                  value={setRoles.filter(
                    (options) => options.value == values.role_id
                  )}
                />
                <br />
                <label>Status :</label>
                <br></br>
                <Select
                  id="statuss"
                  classname="select1"
                  options={status_option}
                  onChange={(value) => setFieldValue("status", value.value)}
                  value={status_option.filter(
                    (option) => option.value == values.status
                  )}
                />
                <br></br>
                <br></br>
                <input
                  type="submit"
                  name="submit"
                  value="MODIFY"
                  id="submit"
                  className="signup_cl"
                />
              </form>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
}

export default Edituser;
