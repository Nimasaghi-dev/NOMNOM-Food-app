import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Item from "./Item";
import { useCart } from "../context/CartContext";
import useFetch from "../hooks/useFetch";
import { Outlet, useParams, useSearchParams } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import { toast } from "react-toastify";

const MenuList = () => {
  const { filter } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 6;
  const [totalPages, setTotalPages] = useState(0);
  const [items, setItems] = useState(null);

  // Track which item id was just added so we can show a brief "Added!" state
  const [addedItemId, setAddedItemId] = useState(null);

  const { isLoading, error, performFetch } = useFetch(
    `/menu/${filter ? filter : ""}?page=${page}&limit=${limit}`,
    (response) => {
      setItems(response.result);
      setTotalPages(response.totalPages);
    },
  );

  const [loadingDelay, setLoadingDelay] = useState(false);

  useEffect(() => {
    setLoadingDelay(true);
    const timer = setTimeout(() => {
      performFetch();
      setLoadingDelay(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [filter, page, limit]);

  const { addToCart } = useCart();

  const handleAddToCart = (item) => {
    addToCart(item);
    toast.success(`${item.food_name} added to cart!`, {
      position: "bottom-right",
      autoClose: 1800,
      hideProgressBar: true,
    });

    // Show "Added!" on the button for 1.2 seconds, then revert
    setAddedItemId(item._id);
    setTimeout(() => setAddedItemId(null), 1200);
  };

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage, limit });
  };

  let content = null;

  if (loadingDelay || isLoading) {
    content = <LoadingSpinner />;
  } else if (error != null) {
    content = <div>Error: {error.toString()}</div>;
  } else {
    content = (
      <ul className="menu-list">
        {items &&
          items.map((item) => {
            const isAdded = addedItemId === item._id;
            return (
              <li key={item._id} data-elementid={item._id} className="menu-list-item">
                <Item item={item} />
                <button
                  onClick={() => handleAddToCart(item)}
                  className={`menu-list-add-btn ${isAdded ? "added" : ""}`}
                  disabled={isAdded}
                >
                  {isAdded ? "✓ Added!" : "Add to cart"}
                </button>
              </li>
            );
          })}
      </ul>
    );
  }

  return (
    <div className="menu-container">
      {content}
      <div className="menu-pagination">
        <button
          className="menu-pagination-button"
          disabled={isLoading || page <= 1}
          onClick={() => handlePageChange(page - 1)}
        >
          Previous
        </button>
        <span className="menu-pagination-text">
          Page {page} of {totalPages}
        </span>
        <button
          className="menu-pagination-button"
          disabled={isLoading || page >= totalPages}
          onClick={() => handlePageChange(page + 1)}
        >
          Next
        </button>
      </div>
      <Outlet />
    </div>
  );
};

MenuList.propTypes = {
  filter: PropTypes.string,
};

export default MenuList;
