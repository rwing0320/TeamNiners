import React, { Component } from 'react';
import { Dashboard } from './EmployeeDashboard';
import { Redirect, Route, Switch, Router } from 'react-router-dom';
import './css/LoginPage.css';
import { EmployeeLogin } from './EmployeeLogin';
import { EmployeeGameMod } from './EmployeeGameMod';
import { EmployeeShowGames } from './EmployeeShowGames';
import { EmployeeGameReport } from './EmployeeGameReport';
import { EmployeeEditGame } from './EmployeeEditGame';
import { EmployeeDashBoardLayout } from './EmployeeDashboardLayout'

export class EmployeeLayout extends Component {
    displayName = EmployeeLayout.name
   

    constructor(props) {
        super(props);
        this.state = { isLoggedIn: false, error: "",  businessName: "", businessId: 0};
              
        this.setBusinessName = this.setBusinessName.bind(this);
           
    }
       

    setBusinessName(bn) {
        console.log("changing business name")
        this.setState({ data1: bn });
    }


    setIsLoggedIn(businessName, businessId) {
        this.setState({ isLoggedIn: true, businessName: businessName, businessId: businessId });
    }

    setIsLoggedOut() {
        this.setState({isLoggedIn: false})
    }

    changePage() {
        if (this.state.isLoggedIn) {
            //return <div><EmployeeNav data1={this.state.businessName} updateParentState={this.setIsLoggedOut.bind(this)}></EmployeeNav><Dashboard></Dashboard> <Redirect to='/dashboard' /></div>;

            return <EmployeeDashBoardLayout data1={this.state.businessName} data2={this.state.businessId} updateParentState={this.setIsLoggedOut.bind(this)}>

                    <Route  exact path='/dashboard'  component={Dashboard} />
                    <Route exact path='/ModifyGame' component={EmployeeGameMod} />
                    <Route exact path='/ShowGames' component={EmployeeShowGames} />
                <Route exact path='/Report' component={EmployeeGameReport} />
                <Route exact path='/EditGame' component={EmployeeEditGame} />

            </EmployeeDashBoardLayout>;
           
        }
        else {
            return <div><EmployeeLogin updateMemberPage={this.props.updatePageState} updatePageState={this.setIsLoggedIn.bind(this)}></EmployeeLogin> <Redirect to='/login' /></div>;
        }
    }

  
    render() {

        return (
            <div>
                {this.changePage()}
            </div>
            )

    }
}
