import axios from "axios";
import React, { useEffect, useState } from "react";
import pizza from "../img/home.jpg";
import fake from "../img/1.jpg";
import { Link } from "react-router-dom";

function AvailableRestaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  // Number of restaurants per page
  const itemsPerPage = 1;

  // Fetch restaurants from the backend API
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get("/api/restaurants");
        setRestaurants(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []); // Only runs once when the component mounts

  // Pagination logic
  const totalPages = Math.ceil((restaurants.length + 1) / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRestaurants = restaurants.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  // Handle page change
  // const goToPage = (pageNumber) => {
  //   setCurrentPage(pageNumber);
  // };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="restaurants">
      <h2 className="restaurants-title">Available Restaurants</h2>
      <p className="restaurants-text">
        Explore top restaurants near you and get your favorite meals delivered
        straight to your door.
      </p>

      {/* Display the current restaurants */}
      <ul className="restaurants-list">
        {currentRestaurants.map((restaurant) => (
          <li key={restaurant._id} className="restaurants-list-item">
            <img
              src={pizza}
              alt={restaurant.name}
              className="restaurants-list-item-img"
            />
            <h3 className="restaurants-list-item-title">{restaurant.name}</h3>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurant.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="restaurants-list-item-address"
            >
              {restaurant.address}
            </a>
            <a
              href={`tel:${restaurant.phone}`}
              className="restaurants-list-item-tel"
            >
              {restaurant.phone}
            </a>
            <p className="restaurants-list-item-tag">
              {restaurant.cuisine} cuisine
            </p>
            <Link to="/menu" className="restaurants-list-item-btn">
              Check the menu
            </Link>
          </li>
        ))}
        {/* Add the fake "Coming soon" only on the last page */}
        {currentPage === totalPages && (
          <li className="restaurants-list-fake">
            <img src={fake} className="restaurants-list-fake-img" />
            <p>Coming soon</p>
          </li>
        )}
      </ul>

      {/* Pagination controls */}
      <div className="restaurant-pagination">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="restaurant-pagination-btn"
        >
          Previous
        </button>
        {/* Display page numbers */}
        {/* {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => goToPage(index + 1)}
            style={{
              fontWeight: currentPage === index + 1 ? "bold" : "normal",
            }}
          >
            {index + 1}
          </button>
        ))} */}

        <button
          className="restaurant-pagination-btn"
          onClick={nextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default AvailableRestaurants;
