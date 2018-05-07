import React, { Component } from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import Questions from './containers/Questions/Questions';
import VirtualWrapper from './hoc/VirtualWrapper/VirtualWrapper';


class App extends Component {
  render() {
      const routes = (
        <Switch>
            <Route path="/assessment" component={Questions}/>
            <Redirect to="/assessment"/>
        </Switch>
      )

    return (
        <VirtualWrapper>
            {routes}
        </VirtualWrapper>
    );
  }
}

export default App;
