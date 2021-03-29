import React, { useReducer, useEffect, useCallback, useMemo } from 'react';

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
      throw new Error('Should not get there!');
  }
};

const httpReducer = (currentHttpState, action) => {
  switch (action.type) {
    case 'CLEAR':
      return { isLoading: false, error: null };
    case 'SEND':
      return { isLoading: true, error: null };
    case 'RESPONSE':
      return { ...currentHttpState, isLoading: false };
    case 'ERROR':
      return { isLoading: false, error: action.errorMessage };
    default:
      throw new Error('Should not get there!');
  }
}

const Ingredients = () => {
  const [userIngredients, dispatch] = useReducer(ingredientReducer, []);
  const [httpState, dispatchHttp] = useReducer(httpReducer, { isLoading: false, error: null });

  useEffect(() => {
    console.log("useEffect - Ingredients.js - userIngredients dependency", userIngredients);
  }, [userIngredients]);

  const addIngredientHandler = useCallback(ingredient => {
    dispatchHttp({ type: 'SEND' });
    fetch('https://react-hooks-update-11-default-rtdb.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-Type': 'application/json' }
    }).then(response => {
      return response.json();
    }).then(responseData => {
      dispatchHttp({ type: 'RESPONSE' })
      dispatch({
        type: 'ADD',
        ingredient: {
          id: responseData.name,
          ...ingredient
        }
      });
    });
  }, []);

  const removeIngredientHandler = useCallback(id => {
    dispatchHttp({ type: 'SEND' });
    fetch(`https://react-hooks-update-11-default-rtdb.firebaseio.com/ingredients/${id}.json`, {
      method: 'DELETE'
    })
      .then(response => {
        dispatchHttp({ type: 'RESPONSE' })
        dispatch({
          type: 'DELETE',
          id: id
        })
      })
      .catch(error => {
        dispatchHttp({ type: 'ERROR', errorMessage: error.message });
      });
  }, []);

  const filteredIngredientsHandler = useCallback(filteredIngredients => {
    dispatch({
      type: 'SET',
      ingredients: filteredIngredients
    })
  }, []);

  const clearErrorHandler = useCallback(() => {
    dispatchHttp({ type: 'CLEAR' });
  }, []);

  const ingredientsList = useMemo(() => {
    return <IngredientList
      ingredients={userIngredients}
      onRemoveItem={id => { removeIngredientHandler(id) }} />
  }, [userIngredients, removeIngredientHandler]);

  return (
    <div className="App">
      {httpState.error && <ErrorModal onClose={clearErrorHandler}>{httpState.error}</ErrorModal>}

      <IngredientForm onAddIngredient={addIngredientHandler} loading={httpState.isLoading} />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        {ingredientsList}
      </section>
    </div>
  );
};

export default Ingredients;
