import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '.././../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    meat: 1.3,
    bacon: 0.7,
    cheese: 0.4,
    salad: 0.5
};

class burgerbuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error:false
    };
    componentDidMount() {
        axios.get('https://react-my-burger-392ab-default-rtdb.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ ingredients: response.data });
            })
            .catch(error=>{
                this.setState({error:true});
            });
    }
    updatePurchaseState(ingredients) {
        console.log(ingredients);
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
        //console.log(type);
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
            this.updatePurchaseState(ingredientsCopy);
        }
        
    };
    //works when we click order now button
    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }
    //when we click on backdrop
    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }
    continuePurchaseHandler = () => {
        
        const queryParams=[];

        for(let i in this.state.ingredients)
        {
            queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push("price="+this.state.totalPrice);
        const queryString=queryParams.join('&');

        this.props.history.push({
            pathname:'/checkout',
            search:'?'+queryString
        });
    }
    render() {
        const disabledIngredient = { ...this.state.ingredients };
        for (var key in disabledIngredient) {
            disabledIngredient[key] = disabledIngredient[key] <= 0
        };

        
        let burger = this.state.error?<p>ingredients cant be loaded</p>:<Spinner />;
        let orderSummary=null;
        if (this.state.ingredients) {
            burger = (
                <Aux>
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
             orderSummary = <OrderSummary ingredients={this.state.ingredients}
                purchaseCancel={this.purchaseCancelHandler}
                continuePurchase={this.continuePurchaseHandler}
                price={this.state.totalPrice} />
        }
        if (this.state.loading) {
            orderSummary = <Spinner />;
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} closeModal={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(burgerbuilder, axios);