import React from 'react';

import classes from './BuildControl.css';

const buildControl =(props)=>(
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div>
        <button className={classes.More} 
                onClick={()=>props.add(props.label)}
                >more</button>
        <button className={classes.Less} 
                onClick={()=>props.remove(props.label)}
                disabled={props.disableIngredient[props.label]}>less</button>
    </div>
);

export default buildControl;