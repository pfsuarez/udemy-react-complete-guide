import React, { useReducer, useEffect, useCallback, useMemo } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from "./IngredientList";
import Search from './Search';
import ErrorModal from "../UI/ErrorModal";
import useHttp from "../../hooks/http";

const ingredientReducer = (currentIngredients, action) => {
  switch (action.type) {
    case 'SET':
      return action.ingredients;
    case 'ADD':
      return [...currentIngredients, action.ingredient];
    case 'DELETE':
      return currentIngredients.filter(x => x.id !== action.id);

    default:
      throw new Error('Should not get there!');
  }
};

const Ingredients = () => {
  const [userIngredients, dispatch] = useReducer(ingredientReducer, []);
  const { isLoading, error, data, sendRequest } = useHttp();


  useEffect(() => {
    console.log("useEffect - Ingredients.js - userIngredients dependency", userIngredients);
  }, [userIngredients]);

  const addIngredientHandler = useCallback(ingredient => {
    // dispatchHttp({ type: 'SEND' });
    // fetch('https://react-hooks-update-11-default-rtdb.firebaseio.com/ingredients.json', {
    //   method: 'POST',
    //   body: JSON.stringify(ingredient),
    //   headers: { 'Content-Type': 'application/json' }
    // }).then(response => {
    //   return response.json();
    // }).then(responseData => {
    //   dispatchHttp({ type: 'RESPONSE' })
    //   dispatch({
    //     type: 'ADD',
    //     ingredient: {
    //       id: responseData.name,
    //       ...ingredient
    //     }
    //   });
    // });
  }, []);

  const removeIngredientHandler = useCallback(id => {
    sendRequest(`https://react-hooks-update-11-default-rtdb.firebaseio.com/ingredients/${id}.json`, 'DELETE');
    // dispatchHttp({ type: 'SEND' });
    // fetch(`https://react-hooks-update-11-default-rtdb.firebaseio.com/ingredients/${id}.json`, {
    //   method: 'DELETE'
    // })
    //   .then(response => {
    //     dispatchHttp({ type: 'RESPONSE' })
    //     dispatch({
    //       type: 'DELETE',
    //       id: id
    //     })
    //   })
    //   .catch(error => {
    //     dispatchHttp({ type: 'ERROR', errorMessage: error.message });
    //   });
  }, [sendRequest]);

  const filteredIngredientsHandler = useCallback(filteredIngredients => {
    dispatch({
      type: 'SET',
      ingredients: filteredIngredients
    })
  }, []);

  const clearErrorHandler = useCallback(() => {
    // dispatchHttp({ type: 'CLEAR' });
  }, []);

  const ingredientsList = useMemo(() => {
    return <IngredientList
      ingredients={userIngredients}
      onRemoveItem={id => { removeIngredientHandler(id) }} />
  }, [userIngredients, removeIngredientHandler]);

  return (
    <div className="App">
      {error && <ErrorModal onClose={clearErrorHandler}>{error}</ErrorModal>}

      <IngredientForm onAddIngredient={addIngredientHandler} loading={isLoading} />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        {ingredientsList}
      </section>
    </div>
  );
};

export default Ingredients;
