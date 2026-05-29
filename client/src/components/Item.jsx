import React from "react";
import PropTypes from "prop-types";

const Item = ({ item }) => {
  const { food_name, price, description, imgId } = item;

  const images = [];
  const importAll = (requireContext) =>
    requireContext.keys().forEach((key) => {
      images.push({
        src: requireContext(key),
        imgName: key,
      });
    });

  importAll(require.context("../img", false, /\.jpg$/));

  const img = images.find((img) => img.imgName === `./${imgId}.jpg`);

  return (
    <div className="menu-list-item-container">
      <img
        src={img.src.default}
        alt={food_name}
        className="menu-list-item-image"
      />
      <div className="menu-list-item-title-price">
        <h3 className="menu-list-item-title">{food_name}</h3>
        <h4 className="menu-list-item-price">{price} €</h4>
      </div>
      <p className="menu-list-item-description">{description}</p>
    </div>
  );
};

Item.propTypes = {
  item: PropTypes.shape({
    food_name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    imgId: PropTypes.number.isRequired,
  }).isRequired,
};

export default Item;
