import React, { Component } from 'react';
import './App.scss';
import Exam from './containers/Exam';
import {Switch, Route, Redirect} from 'react-router-dom';

class App extends Component {
  render() {
      const routes = (
        <Switch>
            <Route path="/assessment" component={Exam}/>
            <Redirect to="/assessment"/>
        </Switch>
      )

    return (
        <div>
            {routes}
        </div>

    );
  }
}

export default App;
