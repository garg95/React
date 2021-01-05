import React, { Component} from 'react';
import classcss from './App.css';
import Person from './Person/Person'
// import Radium ,{StyleRoot}from 'radium'
import { render } from 'react-dom';
import styled from 'styled-components';
import ErrorElement from './ErrorHandler/ErrorHandler'
// const StyledButton=styled.button`
//     background-color:${props=>props.alt?'red':'green'};
//     font:inherit;
//     border: 1px solid blue;
//     padding:8px;
//     cursor:pointer;
//     &:hover {
//     background-color:${props=>props.alt?'salmon':'lightgreen'}
//     }
// `;


class App extends Component {
  state={
    persons:[
      {keyId:'1',name:"vishal",age:25},
      {keyId:'2',name:"harsh",age:25},
      {keyId:'3',name:"kartik",age:25}
    ],  
    otherState:"hula huh",
    showPerson:false
  };
  

  nameChangedHandler=(event,keyId)=>{
      const personIndex=this.state.persons.findIndex(x=>{return x.keyId===keyId});
      const person={...this.state.persons[personIndex]};
      person.name=event.target.value;
      const personslist=[...this.state.persons];
      personslist[personIndex]=person;
      this.setState({
        persons:personslist
      })
  }
  togglePersonslist=()=>{
    this.setState({
        showPerson:!this.state.showPerson
      });
      
  }
  deletePersonHandler=(index)=>{
      const personList=this.state.persons.slice();
      personList.splice(index,1);
      this.setState({
        persons:personList
      })
  }
  switchNameHandler=(newName)=>{
        
    this.setState({
      persons:[
        {name:newName,age:25},
        {name:"harsh",age:22},
        {name:"kartik",age:26}
      ]
    });
    // style.backgroundColor='red';
  }
  
    render(){
      let person=null;
      let classes=[];
      const cssarray=[classcss.Button];
      // const style={
      //   backgroundColor:'white',
      //   font:'inherit',
      //   border: '1px solid blue',
      //   padding:'8px',
      //   cursor:'pointer',
      //   ':hover':{
      //     backgroundColor:'green'
      //   }
      // }
    
      if(this.state.persons.length<=2)
      {
        // classes.push('Red');
        classes.push(classcss.Red);
      }
      if(this.state.persons.length<=1)
      {
        classes.push(classcss.Bold);
      }
      if(this.state.showPerson){
        person=(
          <div>
            {this.state.persons.map((x,index)=>{
              return <ErrorElement key={x.keyId} >
                  <Person name={x.name} age ={x.age} click={this.deletePersonHandler.bind(this,index)} 
                              changed={(event)=>this.nameChangedHandler(event,x.keyId)}/>
                </ErrorElement>
            })}
          </div>
        )
        cssarray.push(classcss.Red);
      }
      
    return (
          <div className={classcss.App}>
            <button 
              onClick={()=>this.switchNameHandler('hema')}
              >click
            </button>
            <button className={cssarray.join(' ')} onClick={this.togglePersonslist}>show list
            </button>
            {/* <StyledButton alt={this.state.showPerson} onClick={this.togglePersonslist}>show list
            </StyledButton> */}
            <h1 className={classes.join(' ')}>Hi i am a react app</h1>
            {person}
          </div>
    );
    }
}
export default App;

// export default Radium(App);


