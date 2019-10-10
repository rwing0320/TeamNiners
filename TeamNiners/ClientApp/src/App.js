import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { EmployeeLayout } from './components/EmployeeLayout';
import { Dashboard } from './components/EmployeeDashboard';
import { MemberLayout } from './components/MemberLayout';
import { Redirect} from 'react-router-dom';

export default class App extends Component {
  displayName = App.name

    constructor(props) {
        super(props);
        this.state = { pageOn: "Member", error: "", businessName: "", businessId: 0 };

        //this.setBusinessName = this.setBusinessName.bind(this);


        this.goToHomePage = this.goToHomePage.bind(this);
    }


    goToHomePage(pageNum) {

        if (pageNum == 1) {
            this.setState({ pageOn: "Member" });
        }
        else {
            this.setState({ pageOn: "Business" });
        }
        
        
    }

    changePage() {
        if (this.state.pageOn == "Business") {
            //return <div><EmployeeNav data1={this.state.businessName} updateParentState={this.setIsLoggedOut.bind(this)}></EmployeeNav><Dashboard></Dashboard> <Redirect to='/dashboard' /></div>;
            return<div>
            <EmployeeLayout updatePageState={this.goToHomePage.bind(this)}>
                <Route exact path='/' component={Home} />
                <Route path='/counter' component={Counter} />
                <Route path='/fetchdata' component={FetchData} />
                <Route path='/login' component={EmployeeLayout} />
                <Route path='/dashboard' component={Dashboard} />
            </EmployeeLayout> <Redirect to='/login' /></div>


        }
        else {
            return <div><MemberLayout updatePageState={this.goToHomePage.bind(this)}>
                <Route exact path='/member' component={Home} />
                <Route path='/counter' component={Counter} />
                <Route path='/fetchdata' component={FetchData} />
                
            </MemberLayout> <Redirect to='/member' /></div>;
        }
    }

  render() {
      return (
          //<EmployeeLayout>
          //  <Route exact path='/' component={Home} />
          //  <Route path='/counter' component={Counter} />
          //  <Route path='/fetchdata' component={FetchData} />
          //  <Route path='/login' component={EmployeeLayout} />
          //  <Route path='/dashboard' component={Dashboard} />
          //</EmployeeLayout>
        <div>
           {this.changePage()}
        </div>
    );
  }
}
