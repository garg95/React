import React from 'react';

import classes from './Order.css';

const orders=(props)=>{
    const ingredients=[];
    for(let ingredientName in props.ingredients)
    {
        ingredients.push({name:ingredientName,amount:props.ingredients[ingredientName]})
    }
    return(
    <div className={classes.Order}>
        <p>
            Ingredients:{ingredients.map(ing=>{
            return <span key={ing.name} style={{textTransform:'capitalize',
                                    display:'inline-block',
                                    margin:'0 8px'}}> {ing.name} ({ing.amount})</span>
        })}
        </p>
        <p>Price :<strong>{props.price.toFixed(2)}</strong></p>
    </div>
    );
};
export default orders;