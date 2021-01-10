import React, { Component } from 'react';

import './AddPerson.css';

class AddPerson extends Component {
    state={
        name:'',
        age:''
    }
    nameCheangedhandler=(event)=>{
        this.setState({name:event.target.value});
    }
    ageCheangedhandler=(event)=>{
        this.setState({age:event.target.value});
    }
    render() {
        return (
            <div className="AddPerson">
                <input type='text' 
                    placeholder='name' 
                    onChange={this.nameCheangedhandler} 
                    value={this.state.name}/>
                <input type='text' placeholder='age'
                    onChange={this.ageCheangedhandler} 
                    value={this.state.age}/>
                <button onClick={()=>this.props.personAdded(this.state.name,this.state.age)}>Add Person</button>
            </div>
        );
    }

}

export default AddPerson;