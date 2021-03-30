import React, { useContext } from 'react';

import Card from '../UI/Card';
import './ProductItem.css';
import { ProductsContext } from "../../context/products-context";
import { useStore } from "../../hooks-store/store";

const ProductItem = props => {
  //const toggleFav = useContext(ProductsContext).toggleFav;

  const toggleFav = useStore(false)[1];

  console.log("ID", props.id);

  return (
    <Card style={{ marginBottom: '1rem' }}>
      <div className="product-item">
        <h2 className={props.isFav ? 'is-fav' : ''}>{props.title}</h2>
        <p>{props.description}</p>
        <button
          className={!props.isFav ? 'button-outline' : ''}
          onClick={() => toggleFav('TOGGLE_FAV', props.id)}
        >
          {props.isFav ? 'Un-Favorite' : 'Favorite'}
        </button>
      </div>
    </Card>
  );
};

export default ProductItem;
