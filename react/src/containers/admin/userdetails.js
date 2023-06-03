import React, { useEffect, useState } from "react";
import "./userdetails.css";
import Header from "../components/header";
import Sidebar from "../components/sidebar";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Select from "react-select";
import { toast } from "react-toastify";
import { confirm } from "react-confirm-box";
import config from "../../config/index";
import ReactPaginate from "react-paginate";

function Userdetails() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let [getUsers, setUsers] = useState([]);
  let [getRoles, setRoles] = useState([]);
  let [role_id, getRole] = useState("");
  let [status, getStatus] = useState("");
  const [search, setSearch] = useState("");
  const [pageCount, setpageCount] = useState(0);

  const notify = (r) => {
    toast.success(r, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  let offset = 0;
  let limit = config.limit;
  let params = {
    role_id: role_id,
    status: status,
    offset: offset,
    limit: limit,
  };

  const handlePageClick = async (data) => {
    offset = data.selected * limit;
    params = {
      role_id: role_id,
      status: status,
      search: search,
      limit: limit,
      offset: `${offset}`,
    };
    fetchUsers(params);
  };

  useEffect(() => {
    async function defaultUsers() {
      let res = await dispatch.productmodel.Getusers();
      setUsers(res.users.rows);

      let role_data = await dispatch.productmodel.Getroles();
      setRoles(role_data.roles);
    }
    defaultUsers();
    fetchUsers(params);
  }, []);

  //fetch users
  const fetchUsers = async (datas) => {
    if (datas.role_id) {
      getRole(datas.role_id);
      params = {
        role_id: datas.role_id,
        status: status,
        search: search,
        limit,
        offset: `${offset}`,
      };
    }
    if (datas.status) {
      getStatus(datas.role_id);
      params = {
        role_id: role_id,
        status: datas.status,
        search: search,
        limit,
        offset: `${offset}`,
      };
    }
    if (datas.search) {
      setSearch(datas.search);
      params = {
        role_id: role_id,
        status: status,
        search: datas.search,
        limit,
        offset: `${offset}`,
      };
    }

    const data = await dispatch.productmodel.Getusers(params);
    setUsers(data.users.rows);
    const total = data.users.count;
    setpageCount(Math.ceil(total / limit));
  };

  //Roles dropdown
  const options = getRoles.map((d) => ({
    value: d.id,
    label: d.role_name,
  }));

  //status options
  const statusoptions = [
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "Inactive" },
    { value: "trash", label: "trash" },
  ];


  


  //delete user
  const confirmBox = {
    labels: {
      confirmable: "Confirm",
      cancellable: "Cancel",
    },
  };
  const trashUser = async (data) => {
    const selected = await confirm(
      `Are you sure to delete the  ${data.first_name}`,
      confirmBox
    );
    if (selected) {
      await dispatch.productmodel.deleteUser(data.id);
      notify("User Trashed");
    }
  };
  //update user
  const edituser = (id) => {
    navigate(`/admin/users/edit/${id}`);
  };
  return (
    <div>
      <div className="header">
        <Header />
      </div>
      <div className="sidebar_users">
        <Sidebar />
      </div>

      <div className="mid12">
        <div className="role_select">
          <Select
            className="select_role"
            id="role_id"
            options={options}
            onChange={(e) => {
              fetchUsers({ role_id: e.value });
            }}
          />
        </div>
        <div className="status_select">
          <Select
            className="select_status"
            id="role_id"
            options={statusoptions}
            onChange={(e) => {
              fetchUsers({ status: e.value });
            }}
          />
        </div>
        <div className="productsearch">
          <input
            type="text"
            className="onproductSearch"
            onChange={(e) => fetchUsers({search: e.target.value})}
            placeholder="Search Here"
          />
        </div>

        <div className="add-button">
          <Link to="/admin/users/create">
            <input
              type="button"
              name="button"
              value="ADD USERS"
              id="button"
              className="button2"
            />
          </Link>
        </div>
      </div>
      <div className="tab-wrap">
        <table className="table1">
          <thead>
            <tr>
              <th className="thh">ID</th>
              <th className="thh">FIRST NAME</th>
              <th className="thh">LAST NAME</th>
              <th className="thh">EMAIL</th>
              <th className="thh">PHONE NUMBER</th>
              <th className="thh">ROLE NAME</th>
              <th className="thh">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {getUsers.map((data) => (
              <tr>
                <td>{data.id}</td>
                <td>{data.first_name}</td>
                <td>{data.last_name}</td>
                <td>{data.email}</td>
                <td>{data.phone_number}</td>
                <td>{data.role.role_name}</td>
                <td>
                  <button onClick={() => edituser(data.id)}>EDIT</button>
                  <button
                    className="deleteproduct"
                    onClick={() => {
                      trashUser(data);
                    }}
                  >
                    DELETE
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="userspagination">
        <ReactPaginate
          previousLabel={"<<"}
          nextLabel={">>"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={"pagination justify-content-center"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
          activeClassName={"active"}
        />
      </div>
    </div>
  );
}

export default Userdetails;
