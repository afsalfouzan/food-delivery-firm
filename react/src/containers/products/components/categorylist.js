import React from "react";
import { Link } from "react-router-dom";
import "./categorylist.css";

export default function Sidebar({category, fetchProducts}) {
  console.log(category, "cateeeeeeeeeeeee");
  return (
    <div>
      <div className="sidebar">
        <ul className="colul">
          <h2 className="food_menu">Food Menu</h2>
          {category.map((categ, index) => (
            <li
              key={index}
              className="col-mini11"
              id={categ.id}
              onClick={(e) => { fetchProducts(categ.id) }}
            >
              <Link to=" ">{categ.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
