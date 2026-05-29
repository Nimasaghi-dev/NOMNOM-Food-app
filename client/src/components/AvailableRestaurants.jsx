import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import pizza from "../img/home.jpg";
import fake from "../img/1.jpg";

function AvailableRestaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // One restaurant card per page; the last page also shows the "Coming soon" card
  const itemsPerPage = 1;

  const onSuccess = (data) => {
    setRestaurants(data.result);
  };

  const { isLoading, error, performFetch } = useFetch(
    "/restaurants",
    onSuccess,
  );

  // Fetch restaurants once when the component first renders
  useEffect(() => {
    performFetch();
  }, []);

  const totalPages = Math.ceil((restaurants.length + 1) / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRestaurants = restaurants.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Could not load restaurants. Please try again later.</div>;
  }

  return (
    <div className="restaurants">
      <h2 className="restaurants-title">Available Restaurants</h2>
      <p className="restaurants-text">
        Explore top restaurants near you and get your favorite meals delivered
        straight to your door.
      </p>

      <ul className="restaurants-list">
        {currentRestaurants.map((restaurant) => (
          <li key={restaurant._id} className="restaurants-list-item">
            <img
              src={pizza}
              alt={restaurant.name}
              className="restaurants-list-item-img"
            />
            <h3 className="restaurants-list-item-title">{restaurant.name}</h3>
            {/* Clicking the address opens it in Google Maps */}
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

        {/* Show the placeholder card only on the last page */}
        {currentPage === totalPages && (
          <li className="restaurants-list-fake">
            <img src={fake} className="restaurants-list-fake-img" alt="Coming soon" />
            <p>Coming soon</p>
          </li>
        )}
      </ul>

      <div className="restaurant-pagination">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="restaurant-pagination-btn"
        >
          Previous
        </button>
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
