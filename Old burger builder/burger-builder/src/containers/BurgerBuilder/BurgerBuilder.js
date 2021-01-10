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
    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }
    //when we click on backdrop
    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }
    continuePurchaseHandler = () => {
        this.setState({
            loading: true
        });
        //created some dummy data
        const orders = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'max',
                address: {
                    street: 'HBC',
                    zipCode: '1234',
                    country: 'india'
                },
                email: 'dfshg@df.com',
                deliveryMethod: 'fastest'
            }
        }
        axios.post('/orders.json', orders)
            .then(response => {
                this.setState({ loading: false, purchasing: false });
            })
            .catch(error => { this.setState({ loading: false, purchasing: false }); });
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