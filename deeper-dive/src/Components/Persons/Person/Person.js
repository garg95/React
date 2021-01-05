import React, { Component } from 'react';
import classes from './Person.css';
import Aux from '../../../hoc/Auxiliary'
import withClass from '../../../hoc/withClass'
import PropTypes from 'prop-types'
// import Radium from 'radium';
// import styled from 'styled-components';
import AuthContext from '../../../Context/auth-context'



class Person extends Component {
    constructor(props) {
        super(props);
        this.inputElementRef = React.createRef();
    }
    static contextType=AuthContext; // name should be exactly this

    componentDidMount(){
        this.inputElementRef.current.focus();
    }
    render() {
        return (
            <Aux>
                {this.context.isAuthenticated?<p>Authenticated</p>:<p>not authenticated</p>}
                {/* <AuthContext.Consumer>
                    {(context)=>context.isAuthenticated?<p>Authenticated</p>:<p>not authenticated</p>}
                </AuthContext.Consumer> */}
                <p onClick={this.props.click}>Name : {this.props.name} and Age : {this.props.age}  </p>
                <p>{this.props.children}</p>
                <input
                    type="text"
                    onChange={this.props.changed}
                    value={this.props.name}
                    ref={this.inputElementRef} />
            </Aux>

        );
    }
}

Person.propTypes = {
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    changed: PropTypes.func
};
export default withClass(Person, classes.Person);

// export default Radium(person);