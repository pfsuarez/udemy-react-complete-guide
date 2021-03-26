import React, { useState, useEffect } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from "./IngredientList";
import Search from './Search';

const Ingredients = () => {
  const [userIngredients, setUserIngredients] = useState([]);

  useEffect(() => {
    console.log("useEffect - Ingredients.js");

    fetch('https://react-hooks-update-11-default-rtdb.firebaseio.com/ingredients.json')
      .then(response => response.json())
      .then(responseData => {
        console.log("useEffect - Ingredients.js", responseData);
        const loadedIngredients = [];

        for (const key in responseData) {
          loadedIngredients.push({
            id: key,
            title: responseData[key].title,
            amount: responseData[key].amount
          })
        }

        //setUserIngredients(loadedIngredients);
      });
  }, []);

  useEffect(()=> {
    console.log("useEffect - Ingredients.js - userIngredients dependency", userIngredients);
  }, [userIngredients]);

  const addIngredientHandler = ingredient => {
    fetch('https://react-hooks-update-11-default-rtdb.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-Type': 'application/json' }
    }).then(response => {
      return response.json();
    }).then(responseData => {
      setUserIngredients(prevIngredients => [
        ...prevIngredients,
        {
          id: responseData.name,
          ...ingredient
        }
      ]);
    });
  };

  const removeIngredientHandler = id => {
    setUserIngredients(prevIngredients => prevIngredients.filter(ing => ing.id !== id));
  };

  const filteredIngredientsHandler = filteredIngredients => {
    setUserIngredients(filteredIngredients);
  };

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        <IngredientList ingredients={userIngredients} onRemoveItem={id => { removeIngredientHandler(id) }} />
      </section>
    </div>
  );
};

export default Ingredients;
