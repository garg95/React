import React, { Component } from 'react'
import Person from './Person/Person'
class Persons extends Component {
    //4 (updateLifecycle)
    shouldComponentUpdate(nextProps,nextState){
        console.log('[Persons.js] shouldComponentUpdate');
        if(nextProps.persons!==this.props.persons){
            return true;
        }
        else{
            return false;
        }
        //return true;
    }
    //6 (updateLifecycle)
    getSnapshotBeforeUpdate(prevProps,prevState){
        console.log('[Persons.js] getSnapshotBeforeUpdate');
        return {message:'snapshot'};
    }
    //7 (updateLifecycle)
    componentDidUpdate(prevProps,prevState,snapshot){
        console.log('[Persons.js] componentDidUpdate');
        console.log(snapshot);
    }
    // use this function whenever u want to do cleanup for anything
    componentWillUnmount(){
        console.log('[Persons.js] componentWillUnmount');
    }
    //5 (updateLifecycle)
    render() {
        console.log('[Persons.js] render');
        return this.props.persons.map((person, index) => {

            return (<Person
                name={person.name}
                age={person.age}
                click={() => this.props.clicked(index)}
                key={person.keyId}
                changed={(event) => this.props.changed(event, person.keyId)} />
            );
        });
    }
}
export default Persons;