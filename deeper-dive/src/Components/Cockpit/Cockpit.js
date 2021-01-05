import React, { useEffect,useRef,useContext } from 'react'
import cssClasses from './Cockpit.css'
import AuthContext from '../../Context/auth-context'

const cockpit = (props) => {
const toggleBtn=useRef();

    useEffect(()=>{
        console.log('[Cockpit.js] useEffect');
        //http request taking time
        // setTimeout(() => {
        //     alert('data saved');
        // }, 1000);
        toggleBtn.current.click();
        //this return functionality works at last when component ends
        //so it works like a componentWillUnmount functionality in persons.js
        return ()=>{
            console.log('[Cockpit.js] clean up work in useEffect')  //for this to work u should have empty array as 2nd parameter
        }
    },[]); //pass the empty array when you want it to be executed only first time
    
    useEffect(()=>{
        console.log('[Cockpit.js] 2nd useEffect');

        return ()=>{
            console.log('[Cockpit.js] 2nd clean up work in useEffect');
        }
    });// here we have not passed 2nd parameter so return part will also run everytime
    let cssClassesVar = [];
    let cssBtnVar = '';
    const authContext=useContext(AuthContext);
    if (props.showPersons) {
        cssBtnVar = cssClasses.Red;
    }
    if (props.personsLength <= 2) {
        cssClassesVar.push(cssClasses.Red);
    }
    if (props.personsLength <= 1) {
        cssClassesVar.push(cssClasses.Bold);
    }
    return (
        <div className={cssClasses.Cockpit}>
            <h1 className={cssClassesVar.join(' ')}>Hi i am a react app and also {props.title}</h1>
            <button ref={toggleBtn} className={cssBtnVar} onClick={props.toggle}>show list</button>
        </div>

    );
}
export default React.memo(cockpit);