import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/Sidedrawer';

class Layout extends Component {
    state=({
        showDrawer:true
    });
    closeSideDrawerHandler=()=>{
        this.setState({
            showDrawer:false
        });
    }
    openSideDrawerHandler=()=>{
        this.setState({
            showDrawer:true
        });
    }
    sideDrawerToggleClicked=()=>{
        this.setState((prevState)=>{
            return {showDrawer:!prevState.showDrawer};
        });
    }
    render() {
        return (
            <Aux>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleClicked}/>
                <SideDrawer showDrawer={this.state.showDrawer} closed={this.closeSideDrawerHandler}/>
                <div>side drawer,backdrop,toolbar</div>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

export default Layout;