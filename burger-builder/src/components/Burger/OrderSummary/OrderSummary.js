import React,{Component} from 'react';

import Aux from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    componentDidUpdate(){
        console.log('[OrderSummary]');
    }
    render (){
        const ingredientsSummary = Object.keys(this.props.ingredients).map(igkey => {
            return <li key={igkey}><span style={{ textTransform: 'capitalize' }}>{igkey}</span>: {this.props.ingredients[igkey]}</li>
        });
        return(
            <Aux>
            <h3> Your Order</h3>
            <p>A delicious burger with following ingredients:</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <h4><strong>Order Total</strong>: {this.props.price.toFixed(2)}</h4>
            <p> Continue to checkout?</p>
            <Button btnType='Danger' clicked={this.props.purchaseCancel}>Cancel</Button>
            <Button btnType='Success' clicked={this.props.continuePurchase}>Checkout</Button>
        </Aux>
        );
    }
};

export default OrderSummary;