import React from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import App from '../App';
import Login from "../containers/auth/login";
import store from "../store";
import { Provider } from 'react-redux';
import Addproducts from "../containers/admin/addproducts";
import Listproducts from "../containers/admin/listproducts";
import PrivateRoute from "./privateroute";
import PublicRoute from "./publicroute";
import EditProducts from "../containers/admin/editproducts"
import signup from "../containers/auth/signup";
import Userdetails from "../containers/admin/userdetails";
import Addusers from "../containers/admin/addusers";
import Edituser from "../containers/admin/edituser";
import Customerdashboard from "../containers/products/products";
import CartList from "../containers/products/cartlist";
import OrdersList from "../containers/products/orderslist";



function CustomRoute() {
    return(<div>

        <Provider store = {store} >
        <BrowserRouter> 
         <Routes>
//cutomer
<Route path="/customer/products" element = {<PrivateRoute component= {Customerdashboard} />}></Route>
{/* <Route path="/customer/products" element = {<Customerdashboard />}></Route> */}
//cartlist
<Route path="/products/cartlist" element = {<PrivateRoute component= {CartList} />}></Route>

//order list
<Route path="/products/order" element = {<PrivateRoute component= {OrdersList} />}></Route>



//admin/products
        <Route path="/" element = {<App />}></Route>
        <Route path="/login" element = {<PublicRoute component = {Login} />}></Route>
        <Route path="/signup" element = {<PublicRoute component= {signup} />}></Route>
        <Route path="/admin/products/create" element = {<PrivateRoute component= {Addproducts} />}></Route>
        <Route path="/admin/products" element = {<PrivateRoute component= {Listproducts} />}></Route>
        <Route path="/admin/products/edit/:id" element = {<PrivateRoute component= {EditProducts} />}></Route>

//admin/users
        <Route path="/admin/users" element = {<PrivateRoute component= {Userdetails} />}></Route>
        <Route path="/admin/users/create" element = {<PrivateRoute component= {Addusers} />}></Route>
        <Route path="/admin/users/edit/:id" element = {<PrivateRoute component= {Edituser} />}></Route>

         </Routes>
        </BrowserRouter>
        </Provider>

    </div>);
}

export default CustomRoute;