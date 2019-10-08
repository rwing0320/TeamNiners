import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { EmployeeLayout } from './components/EmployeeLayout';
import { Dashboard } from './components/EmployeeDashboard';

export default class App extends Component {
  displayName = App.name

  render() {
      return (
          <EmployeeLayout>
            <Route exact path='/' component={Home} />
            <Route path='/counter' component={Counter} />
            <Route path='/fetchdata' component={FetchData} />
            <Route path='/login' component={EmployeeLayout} />
            <Route path='/dashboard' component={Dashboard} />
          </EmployeeLayout>
    );
  }
}
