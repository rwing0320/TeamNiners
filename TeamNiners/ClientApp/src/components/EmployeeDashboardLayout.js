import React, { Component } from 'react';
import { Dashboard } from './EmployeeDashboard';
import './css/LoginPage.css';
import { EmployeeNav } from './EmployeeNav';
import { EmployeeGameMod } from './EmployeeGameMod';
import { EmployeeShowGames } from './EmployeeShowGames';
import { EmployeeGameReport } from './EmployeeGameReport';
import { Link, Redirect } from 'react-router-dom';

export class EmployeeDashBoardLayout extends Component {
    displayName = EmployeeDashBoardLayout.name
   

    constructor(props) {
        super(props);
        this.state = { isLoggedIn: false, error: "", businessName: "", dashboardLoaded: false, pageNumber: 1, cameFrom: 0 };
           
        console.log("the businessId: " + this.props.data2);
        this.callLogout = this.callLogout.bind(this);
    }

    callLogout() {
        this.props.updateParentState();
    }

    loadDash() {
        if (this.state.dashboardLoaded == false) {
           
            this.setState({ dashboardLoaded: true });
        }
    }

    changePageNumber(pageNumber) {
        this.setState({ pageNumber: pageNumber});
    }

    changePage() {
        if (this.state.pageNumber == 1) {
            <Redirect to="/dashboard" />
            return <div><Dashboard data2={this.props.data2} changePage={this.changePageNumber.bind(this)} updateParentState={this.callLogout.bind(this)}></Dashboard></div>;
        }
        else if (this.state.pageNumber == 2) {
            <Link to={`/ModifyGame`} ></Link>
            return <EmployeeGameMod data2={this.props.data2} changePage={this.changePageNumber.bind(this)}></EmployeeGameMod>
        } else if (this.state.pageNumber == 3) {
            <Link to={`/ShowGames`} ></Link>
            return <EmployeeShowGames data2={this.props.data2} changePage={this.changePageNumber.bind(this)}></EmployeeShowGames>
        }
        else if (this.state.pageNumber == 4) {
            <Link to="/Report" ></Link>
            return <EmployeeGameReport data2={this.props.data2} changePage={this.changePageNumber.bind(this)}></EmployeeGameReport>
        }
    }

    render() {

        return (
            <div>
                <EmployeeNav data1={this.props.data1} updateParentState={this.props.updateParentState}></EmployeeNav>
                

                {this.changePage()}
                
            </div>
            
            )
    }
}
//{this.props.children}

//<Redirect to={{
//    pathname: '/dashboard',
//    state: { id: this.props.data2 }

//}}