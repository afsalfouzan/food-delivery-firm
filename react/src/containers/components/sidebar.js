import React from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";

export default function Sidebar() {
  return (
    <div>
      <div className="sidebar">
        <ul className="col1" id="sidebar">
         <li className="col-mini" id = "sidebar2"  ><Link  to={'/admin/users'} className='linkto' >  USERS </Link> </li>
          <li className="col-mini" id="sidebar2"><Link to = '/admin/products/' className="linkto" >PRODUCTS</Link></li>
        </ul>
      </div>
    </div>
  );
}
