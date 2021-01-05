import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    meat: 1.3,
    bacon: 0.7,
    cheese: 0.4,
    salad: 0.5
};

class burgerbuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing:false
    };
    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients).map(igkey => {
            return ingredients[igkey];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);
        this.setState({
            purchasable: sum > 0
        });
    }
    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const ingredientsCopy = { ...this.state.ingredients };
        ingredientsCopy[type] = updatedCount;
        const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
        this.setState({
            ingredients: ingredientsCopy,
            totalPrice: newPrice
        });
        this.updatePurchaseState(ingredientsCopy);
    };
    removeIngredientHandler = (type) => {
        console.log(type);
        const oldCount = this.state.ingredients[type];
        if (oldCount > 0) {
            const updatedCount = oldCount - 1;
            const ingredientsCopy = { ...this.state.ingredients };
            const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
            ingredientsCopy[type] = updatedCount;
            this.setState({
                ingredients: ingredientsCopy,
                totalPrice: newPrice
            });
        }
        this.updatePurchaseState();
    };
    //works when we click order now button
    purchaseHandler=()=>{
        this.setState({purchasing:true});
    }
    //when we click on backdrop
    purchaseCancelHandler=()=>{
        this.setState({purchasing:false});
    }
    continuePurchaseHandler=()=>{
        alert('burraahh');
    }
    render() {
        const disabledIngredient = { ...this.state.ingredients };
        for (var key in disabledIngredient) {
            disabledIngredient[key] = disabledIngredient[key] <= 0
        };
        return (
            <Aux>
                <Modal show={this.state.purchasing} closeModal={this.purchaseCancelHandler}>
                    <OrderSummary ingredients={this.state.ingredients} 
                                  purchaseCancel={this.purchaseCancelHandler}
                                  continuePurchase={this.continuePurchaseHandler}
                                  price={this.state.totalPrice}/>
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls ingredients={this.state.ingredients}
                    add={this.addIngredientHandler}
                    remove={this.removeIngredientHandler}
                    disableIngredient={disabledIngredient}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler} />
            </Aux>
        );
    }
}

export default burgerbuilder;