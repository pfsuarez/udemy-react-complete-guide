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
  const { isLoading, error, data, reqExtra, reqIdentifier, sendRequest } = useHttp();


  useEffect(() => {
    console.log("useEffect - Ingredients.js - userIngredients dependency", userIngredients);

    if(!isLoading && !error) {
      if (reqIdentifier === 'REMOVE_IDENTIFIER') {
        dispatch({ type: 'DELETE', id: reqExtra })
      } else if(reqIdentifier === 'ADD_IDENTIFIER') {
        dispatch({ type: 'ADD', ingredient: {id: data.name, ...reqExtra} });
      }
    }
  }, [data, reqExtra, reqIdentifier, isLoading]);

  const addIngredientHandler = useCallback(ingredient => {
    sendRequest('https://react-hooks-update-11-default-rtdb.firebaseio.com/ingredients.json',
      'POST',
      JSON.stringify(ingredient),
      ingredient,
      'ADD_INGREDIENT');
  }, []);

  const removeIngredientHandler = useCallback(id => {
    sendRequest(`https://react-hooks-update-11-default-rtdb.firebaseio.com/ingredients/${id}.json`,
      'DELETE',
      null,
      id,
      'REMOVE_INGREDIENT');
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
