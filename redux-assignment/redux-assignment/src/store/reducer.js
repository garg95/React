import * as actionTypes from './actions';
const initialState={
    persons:[]
}

const reducer=(state=initialState,action)=>{
    switch(action.type){
        case actionTypes.ADD_PERSON:
            const newPerson = {
                id: Math.random(), // not really unique but good enough here!
                name: action.person.name,
                age: action.person.age
            }
            const updatedPersonsADD=state.persons.concat(newPerson);
            return{
                ...state,
                persons:updatedPersonsADD
            }
        case actionTypes.DELETE_PERSON:
            const updatedPersonsDELETE=state.persons.filter(person=>person.id!==action.id);
            return{
                ...state,
                persons:updatedPersonsDELETE
            }
    }

    return state;
}

export default reducer;