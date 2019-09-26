import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';

export default class App extends Component {
  displayName = App.name

  render() {
      return (
          <Login>
            <Route exact path='/' component={Home} />
            <Route path='/counter' component={Counter} />
            <Route path='/fetchdata' component={FetchData} />
            <Route path='/login' component={Login} />
            <Route path='/dashboard' component={Dashboard} />
         </Login>

      //<Layout>
      //  <Route exact path='/' component={Home} />
      //  <Route path='/counter' component={Counter} />
      //  <Route path='/fetchdata' component={FetchData} />
      //  <Route path='/login' component={Login} />
      //</Layout>
    );
  }
}
