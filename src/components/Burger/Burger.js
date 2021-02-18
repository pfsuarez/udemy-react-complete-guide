import React from "react";

import classes from "./Burger.module.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = props => {
    const transformedIngredients = Object.keys(props.ingredients)
                                        .map(k => {
                                            return [...Array(props.ingredients[k])]
                                                        .map((_, i) => {
                                                            return <BurgerIngredient key={k + i} type={k} />
                                                        }) //[,]
                                        });

    console.log("", transformedIngredients);
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger;