import React, { useReducer, useEffect, useCallback, useState } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from "./IngredientList";
import Search from './Search';
import ErrorModal from "../UI/ErrorModal";

const ingredientReducer = (currentIngredients, action) => {
  switch (action.type) {
    case 'SET':
      return action.ingredients;
    case 'ADD':
      return [...currentIngredients, action.ingredient];
    case 'DELETE':
      return currentIngredients.filter(x => x.id !== action.id);

    default:
      throw new Error('');
  }
};

const Ingredients = () => {
  const [userIngredients, dispatch] = useReducer(ingredientReducer, []);
  //const [userIngredients, setUserIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    console.log("useEffect - Ingredients.js - userIngredients dependency", userIngredients);
  }, [userIngredients]);

  const addIngredientHandler = ingredient => {
    setIsLoading(true);
    fetch('https://react-hooks-update-11-default-rtdb.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-Type': 'application/json' }
    }).then(response => {
      return response.json();
    }).then(responseData => {
      setIsLoading(false);
      // setUserIngredients(prevIngredients => [
      //   ...prevIngredients,
      //   {
      //     id: responseData.name,
      //     ...ingredient
      //   }
      // ]);
      dispatch({
        type: 'ADD',
        ingredient: {
          id: responseData.name,
          ...ingredient
        }
      });
    });
  };

  const removeIngredientHandler = id => {
    setIsLoading(true);
    fetch(`https://react-hooks-update-11-default-rtdb.firebaseio.com/ingredients/${id}.json`, {
      method: 'DELETE'
    })
      .then(response => {
        setIsLoading(false);
        // setUserIngredients(prevIngredients => prevIngredients.filter(ing => ing.id !== id));
        dispatch({
          type:'DELETE',
          id: id
        })
      })
      .catch(error => {
        setError(error.message);
      });
  };

  const filteredIngredientsHandler = useCallback(filteredIngredients => {
    // setUserIngredients(filteredIngredients);
    dispatch({
      type: 'SET',
      ingredients: filteredIngredients
    })
  }, []);

  const clearErrorHandler = () => {
    setError(null);
    setIsLoading(false);
  };

  return (
    <div className="App">
      {error && <ErrorModal onClose={clearErrorHandler}>{error}</ErrorModal>}

      <IngredientForm onAddIngredient={addIngredientHandler} loading={isLoading} />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        <IngredientList ingredients={userIngredients} onRemoveItem={id => { removeIngredientHandler(id) }} />
      </section>
    </div>
  );
};

export default Ingredients;
