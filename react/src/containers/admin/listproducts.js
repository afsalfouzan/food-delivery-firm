import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Header from "../components/header";
import Sidebar from "../components/sidebar";
import { Link, useNavigate } from "react-router-dom";
import "./listproducts.css";
import Select from "react-select";
import ReactPaginate from "react-paginate";
import config from "../../config/index";
import { confirm } from "react-confirm-box";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Listproducts() {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [category_id, setCategoryId] = useState("");
  const [status, setStatusId] = useState("");
  const [search, setSearchId] = useState("");
  const [pageCount, setpageCount] = useState(0);
  let offset = 0;
  let limit = config.limit;
  let params = {
    offset: offset,
    limit: limit,
    status: status,
    category_id: category_id,
    search: search,
  };

  const handlePageClick = (data) => {
    let offset = data.selected * limit;

    let params = {
      offset: offset,
      category_id: category_id,
      status: status,
      search: search,
      limit: limit,
    };
    fetchAdmin(params);
  };

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProducts() {
      let res = await dispatch.productmodel.getcategory();
      let res2 = await dispatch.productmodel.getproduct(params);
      setCategory(res.categories);
      setProducts(res2.products.rows);
      const total = res2.products.count;
      setpageCount(Math.ceil(total / limit));
    }
    fetchProducts();
    fetchAdmin(params);
  }, []);
  console.log(pageCount, "default count");

  //fetch Products
  const fetchAdmin = async (params) => {
    if (params.category_id) {
      setCategoryId(params.category_id);
      params = {
        category_id: params.category_id,
        limit: limit,
        offset: offset,
        status: status,
        search: search,
      };
    }
    if (params.status) {
      setStatusId(params.status);
      params = {
        status: params.status,
        limit: limit,
        offset: offset,
        category_id: category_id,
        search: search,
      };
    }
    if (params.search) {
      setSearchId(params.search);
      params = {
        search: params.search,
        limit: limit,
        offset: offset,
        status: status,
        category_id: category_id,
      };
    }

    const data = await dispatch.productmodel.getproduct(params);
    setProducts(data.products.rows);
    const fetchTotal = data.products.count;
    setpageCount(Math.ceil(fetchTotal / limit));
  };
  console.log(pageCount, "fetchuser count");

  //category fetch
  const options = category.map((d) => ({
    value: d.id,
    label: d.name,
  }));
  const statusOptions = [
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "Inactive" },
    { value: "Trash", label: "Trash" },
  ];

  //search

  const notify = (r) => {
    toast.success(r, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  // const onSearch = async(e) => {
  //   console.log(e.target.value, "search ndoooooooo");
  //   let params = {
  //     search: e.target.value,
  //   };
  //   await fetchAdmin(params)
  // };

  //edit function
  const editproducts = (id) => {
    navigate(`/admin/products/edit/${id}`);
  };

  //delete function
  const confirmBox = {
    labels: {
      confirmable: "Confirm",
      cancellable: "Cancel",
    },
  };

  const deleteProduct = async (Res) => {
    const selected = await confirm(
      `Are you sure to delete the product ${Res.name}`,
      confirmBox
    );
    if (selected) {
      await dispatch.productmodel.upadateProduct(Res.id);
      notify("Product Trashed");
    }
  };

  return (
    <div>
      <div className="headerr">
        <Header />
      </div>
      <div className="bodyy">
        <div className="sidebarr">
          <Sidebar />
        </div>
        <div className="mid">
          <Select
            className="select1"
            id="category_id"
            options={options}
            onChange={(e) => fetchAdmin({ category_id: e.value })}
          />
          <div className="statusalign">
            <Select
              className="statusdropdown"
              id="status"
              options={statusOptions}
              onChange={(e) => fetchAdmin({ status: e.value })}
            />
          </div>
          <div className="productsearch">
            <input
              type="text"
              className="onproductSearch"
              onChange={(e) => fetchAdmin({ search: e.target.value })}
              placeholder="Search Here"
            />
          </div>

          <div className="add-button">
            <Link to="/admin/products/create">
              <input
                type="button"
                name="button"
                value="Add product"
                id="button"
                className="button2"
              />
            </Link>
          </div>
        </div>
        <div className="mid1">
          <div className="tab-wrap">
            <table className="table1">
              <thead>
                <tr>
                  <th className="thh">ID</th>
                  <th className="thh">NAME</th>
                  <th className="thh">DESCRIPTION</th>
                  <th className="thh">Status</th>
                  <th className="thh">PRICE</th>
                  <th className="thh">CATEGORY_NAME</th>
                  <th className="thh">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {products.map((Res) => (
                  <tr>
                    <td>{Res.id} </td>
                    <td>{Res.name}</td>
                    <td>{Res.description}</td>
                    <td>{Res.status}</td>
                    <td>{Res.price}</td>
                    <td>{Res.category.name}</td>
                    <td>
                      <button onClick={() => editproducts(Res.id)}>EDIT</button>
                      <button
                        className="deleteproduct"
                        onClick={() => {
                          deleteProduct(Res);
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

          <div className="pagin1" id="pagination">
            <ReactPaginate
              previousLabel={"previous"}
              nextLabel={"next"}
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
      </div>
    </div>
  );
}

export default Listproducts;
