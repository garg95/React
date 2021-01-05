import React from 'react';
// import './Person.css';
// import Radium from 'radium';
import styled from 'styled-components';


const StyledDiv=styled.div`
    margin:16px auto;
    border:1px solid #eee;
    box-shadow:0 2px 3px #ccc;
    padding:15px;
    text-align: center;
    width: 60%;

    @media (min-width:500px) {
                width:450px;
    }
    `;

const person=(props)=>{
    // const style={
    //     '@media (min-width:500px)':{
    //         width:'450px'
    //     }
    // };
    
    return  (
        <StyledDiv>
            <p onClick={props.click}>Name : {props.name} and Age : {props.age}  </p>
            <p>{props.children}</p>
            <input type="text" onChange={props.changed} value={props.name}/>
        </StyledDiv>
            
    );
}
export default person;

// export default Radium(person);