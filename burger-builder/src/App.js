import React, { Component } from 'react';
import Layout from '../src/components/Layout/Layout';
import BurgerBuilder from '../src/containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Order from './containers/Orders/Order';

import { Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <Switch>
            <Route component={Checkout} path='/checkout' />
            <Route component={Order} path='/orders' />
            <Route component={BurgerBuilder} path='/' exact />
          </Switch>



          {/* <BurgerBuilder />
          <Checkout /> */}
        </Layout>
      </div>
    );
  }
}

export default App;
