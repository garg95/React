import React from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';


const buildControls=(props)=>(
    <div className={classes.BuildControls}>
        <p> Current Price : <strong>{props.price.toFixed(2)}</strong></p>
        {Object.keys(props.ingredients).map(ctrl=>{
            return <BuildControl key={ctrl} label={ctrl} 
                                            add={props.add}
                                            remove={props.remove}
                                            disableIngredient={props.disableIngredient} />
        })}
        <button className={classes.OrderButton} 
                disabled={!props.purchasable}
                onClick={()=>props.ordered()}>ORDER NOW</button>
    </div>
);

export default buildControls;