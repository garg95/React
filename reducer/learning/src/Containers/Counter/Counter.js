import React, { Component } from 'react';
import {connect} from 'react-redux';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';
import * as actionTypes from '../../store/actions';

class Counter extends Component {
    state = {
        counter: 0
    }

    render () {
        return (
            <div>
                <CounterOutput value={this.props.ctr} />
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter}  />
                <CounterControl label="Add 10" clicked={this.props.onAddCounter}  />
                <CounterControl label="Subtract 15" clicked={this.props.onSubtractCounter}  />
                <hr />
                <button onClick={()=>this.props.onStoreResult(this.props.ctr)}>store result</button>
                <ul>
                    {this.props.storedResults.map(strResult=>{
                        return <li key={strResult.id} onClick={()=>this.props.onDeleteResult(strResult.id)}>{strResult.value}</li>;
                    })}
                </ul>
            </div>
        );
    }
}

const mapStateToProps=state=>{ //this state here is provided by redux which is basically the state that u have setup in reducer.js
    return {
        ctr:state.ctr.counter,
        storedResults:state.res.results
    }
}
//here we can say which type of actions we want to dispatch from container
const mapDispatchToProps=dispatch=>{
    return {
        onIncrementCounter:()=>dispatch({type:actionTypes.INCREMENT}),
        onDecrementCounter:()=>dispatch({type:actionTypes.DECREMENT}),
        onAddCounter:()=>dispatch({type:actionTypes.ADD, val:10}),
        onSubtractCounter:()=>dispatch({type:actionTypes.SUBTRACT,val:15}),
        onStoreResult:(result)=>dispatch({type:actionTypes.STORE_RESULT,result:result}),
        onDeleteResult:(id)=>dispatch({type:actionTypes.DELETE_RESULT,resultElId:id})
    }
}
//basically we pass 2 pieces of information to connect
//u can have lots of state so here in connect u can define which state u want to get for this container
//and which actions u want to dispatch
export default connect(mapStateToProps,mapDispatchToProps)(Counter);
//also if u dont need state and just want to execute function u can pass null in first parameter and
//just pass mapDispatchToProps like this connect(null,mapDispatchToProps)