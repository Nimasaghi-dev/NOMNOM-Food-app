import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import "../styles/filters.css";
import All from "../img/Starters.svg";
import Pizzas from "../img/Meals.svg";
import Desserts from "../img/Desserts.svg";
import Drinks from "../img/Drinks.svg";
import Starters from "../img/Vegan.svg";

const Filters = () => {
  const [, setActiveFilter] = useState("All");

  const filters = ["All", "Starters", "Pizzas", "Desserts", "Drinks"];
  const icons = [All, Starters, Pizzas, Desserts, Drinks];

  return (
    <>
      <ul className="filters-list">
        {filters.map((filter) => (
          <li key={filter} className="filters-item">
            <NavLink
              to={filter === "All" ? "/menu" : `/menu/${filter.toLowerCase()}`}
              end={filter === "All"}
              className={({ isActive }) =>
                isActive ? "filter-button active" : "filter-button"
              }
              onClick={() => setActiveFilter(filter)}
            >
              <div className="img-wrap">
                <img
                  className="filter-button-img"
                  src={icons[filters.indexOf(filter)]}
                  alt={filter}
                />
              </div>
              {filter}
            </NavLink>
          </li>
        ))}
      </ul>
      <Outlet />
    </>
  );
};

export default Filters;
