import React from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import "./header.css";

export default function Header() {
  const [cookies, , removeCookie] = useCookies("auth_cookie");
  function Signout() {
    console.log("cokieeeeee");
    removeCookie("auth_cookie",{path : '/'});

  }
  return (
    <div className="header">
      <nav className="nav1">
        <h2 className="gfl">GFL Good For Life</h2>
        <div className="dropdon">
          <ul className="ull">
            <li className="dropdown li">
              <li className="li">
                <Link to=" " className="dropbtn">
                  <img
                    src="https://image.shutterstock.com/image-vector/user-avatar-icon-sign-profile-600w-1145752283.jpg"
                    alt="Avatar"
                    className="avatar"
                  ></img>
                </Link>
              </li>
              <div className="dropdown-content">
                <Link to=" ">Profile</Link>
                <Link to="/login" onClick={Signout}>
                  Signout
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
