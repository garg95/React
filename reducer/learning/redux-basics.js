const redux=require('redux');
const createStore=redux.createStore;

const initialState={
    counter:0
}
//Reducer
const rootReducer=(state=initialState,action)=>{ //here action could be INC_COUNTER or ADD_COUNTER
    if(action.type==='INC_COUNTER'){
        //state.counter++; //this is immutable and u should always mutate your state
        return {
            ...state,//here we have created a copy of state
            counter:state.counter+1
        }
    }
    if(action.type==='ADD_COUNTER'){
        //state.counter++; //this is immutable and u should always mutate your state
        return {
            ...state,//here we have created a copy of state
            counter:state.counter+10
        }
    }
    return state;
};

//Store
const store =createStore(rootReducer);
console.log(store.getState());

//subscription
//they make sure that we dont have to manually call getstate.here in this code if we want to get the current 
//state snapshot and inform me that i need to get getstate() because something is changed
//becuase if we have to manually do like console.log() we have to guess it
//this subscription has to be setup right after store is created so that we get informed about any future dispatches
store.subscribe(()=>{
    //here u can write any code on state update
    console.log('[Subscription]',store.getState());
})

//dispatching actions
store.dispatch({type:'INC_COUNTER'});
store.dispatch({type:'ADD_COUNTER',value:10});
//dont mistype type property. this is important for info that which type of action was dispatched
//and what should we do in reducer
//Now after this type u can add any other property u want ,it doesnt matter hwat property it is after type
console.log(store.getState());

