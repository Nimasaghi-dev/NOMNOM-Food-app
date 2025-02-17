import PropTypes from "prop-types";
import React from "react";
import remove from "../img/trash-icon.svg";

const CartItem = ({ item, onRemove }) => {
  const images = [];
  const importAll = (requireContext) =>
    requireContext.keys().forEach((key) => {
      images.push({
        src: requireContext(key),
        imgName: key,
      });
    });

  importAll(require.context("../img", false, /\.jpg$/));

  const img = images.find((img) => img.imgName === `./${item.imgId}.jpg`);

  return (
    <li className="cart-item">
      <div className="img-tex-wrap">
        {img && (
          <img
            src={img.src.default}
            alt={item.food_name}
            className="cart-item-img"
          />
        )}
        <div className="cart-item-text-wrap">
          <h4 className="cart-item-name">{item.food_name}</h4>
          <p className="cart-item-price">€{item.price.toFixed(2)}</p>
        </div>
      </div>
      <button onClick={() => onRemove(item.id)} className="cart-item-btn">
        <img src={remove} alt="Remove" className="cart-item-btn-icon" />
      </button>
    </li>
  );
};

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    food_name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    imgId: PropTypes.number.isRequired,
  }).isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default CartItem;
