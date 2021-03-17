import React, { Component } from "react";
import { connect } from "react-redux";

import * as actionTypes from "../../store/actions";

import axios from "../../axios-orders";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Burger from "../../components/Burger/Burger"
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";

class BugerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false,
        error: false
    };

    // componentDidMount() {
    //     axios.get('/ingredients.json')
    //         .then(res => {
    //             this.setState({ ingredients: res.data });
    //         })
    //         .catch(err => {
    //             this.setState({ error: true });
    //         });
    // }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(k => {
                return ingredients[k]
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        return sum > 0;
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true })
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    };

    render() {
        const disabledInfo = {
            ...this.props.ings
        };

        for (const key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.state.error
            ? <p>Ingredients can't be loaded</p>
            : <Spinner />

        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        price={this.props.price}
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler} />
                </Aux>);

            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                price={this.props.price}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler} />;
        }

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingrName) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingrName }),
        onIngredientRemoved: (ingrName) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingrName })
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BugerBuilder, axios));