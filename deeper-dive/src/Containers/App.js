import React, { Component } from 'react';
import classcss from './App.css'
import './App.css';
import Persons from '../Components/Persons/Persons'
import Cockpit from '../Components/Cockpit/Cockpit'
import withClass from '../hoc/withClass'
import Auxiliary from '../hoc/Auxiliary';
import AuthContext from '../../src/Context/auth-context'
class App extends Component {
  constructor(props) {
    super(props);
    console.log('[App.js] constructor'); //1
  }

  state = {
    persons: [
      { keyId: '1', name: "vishal", age: 25 },
      { keyId: '2', name: "harsh", age: 25 },
      { keyId: '3', name: "kartik", age: 25 }
    ],
    otherState: "hula huh",
    showPerson: false,
    removeCockpit: false,
    changeCounter: 0,
    isAuthenticated: false
  };
  //2
  static getDerivedStateFromProps(props, state) {
    console.log('[App.js] getDerivedStateFromProps', props);
    return state;
  }
  //4
  componentDidMount() {
    console.log('[App.js] componentDidMount');
  }
  //2 (updateLifecycle)
  shouldComponentUpdate(nextProps, nextState) {
    console.log('[App.js] shouldComponentUpdate');
    return true;
  }
  //8 (updateLifecycle)
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('[App.js] componentDidUpdate')
  }

  nameChangedHandler = (event, keyId) => {
    const personIndex = this.state.persons.findIndex(x => { return x.keyId === keyId });
    const person = { ...this.state.persons[personIndex] };
    person.name = event.target.value;
    const personslist = [...this.state.persons];
    personslist[personIndex] = person;
    this.setState((prevState, props) => {
      return {
        persons: personslist,
        changeCounter: prevState.changeCounter + 1
      };
    });
  }
  togglePersonslist = () => {
    this.setState({
      showPerson: !this.state.showPerson
    });

  }
  deletePersonHandler = (index) => {
    const personList = this.state.persons.slice();
    personList.splice(index, 1);
    this.setState({
      persons: personList
    })
  }
  loginHandler = () => {
    this.setState({
      isAuthenticated: !this.state.isAuthenticated
    });
  }
  switchNameHandler = (newName) => {

    this.setState({
      persons: [
        { name: newName, age: 25 },
        { name: "harsh", age: 22 },
        { name: "kartik", age: 26 }
      ]
    });
    // style.backgroundColor='red';
  }
  //3 (updateLifecycle)
  render() {
    console.log('[App.js] render');//3
    let person = null;
    const cssarray = [classcss.Button];


    if (this.state.showPerson) {
      person = (
        <div>
          <Persons
            persons={this.state.persons}
            clicked={this.deletePersonHandler}
            changed={this.nameChangedHandler} />
        </div>
      )
      cssarray.push(classcss.Red);
    }

    return (
      <Auxiliary>
        <button onClick={() => { this.setState({ removeCockpit: !this.state.removeCockpit }); }}>
          Remove cockpit
            </button>
            <button onClick={this.loginHandler}>hit me</button>

        <AuthContext.Provider 
        value={{isAuthenticated:this.state.isAuthenticated,login:this.loginHandler}}>
          {this.state.removeCockpit ? null :
            <Cockpit
              title={this.props.appTitle}
              personsLength={this.state.persons.length}
              toggle={this.togglePersonslist}
              showPersons={this.state.showPerson} />
          }
          {person}
        </AuthContext.Provider>
      </Auxiliary>
    );
  }
}

export default withClass(App, classcss.App);
