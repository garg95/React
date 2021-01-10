import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxiliary';
import classes from './Sidedrawer.css';


const sideDrawer = (props) => {
    let attachClass = [classes.Sidedrawer, classes.Close];
    if (props.showDrawer) {
        attachClass = [classes.Sidedrawer, classes.Open];
    }
    return (
        <Aux>
            <Backdrop show={props.showDrawer} closeModal={props.closed}/>
            <div className={attachClass.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>
    );
}

export default sideDrawer;