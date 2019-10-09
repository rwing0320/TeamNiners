import React, { Component } from 'react';
import axios from 'axios';
import { NavMenu } from './NavMenu';
import { Dashboard } from './EmployeeDashboard';
import { Redirect } from 'react-router-dom';
import { Col, Grid, Row, Button, Accordion, Panel } from 'react-bootstrap';
import './css/LoginPage.css';
import { EmployeeNav } from './EmployeeNav';
import { Layout } from './Layout';
import { EmployeeLogin } from './EmployeeLogin';

export class EmployeeDashBoardLayout extends Component {
    displayName = EmployeeDashBoardLayout.name
   

    constructor(props) {
        super(props);
        this.state = { isLoggedIn: false, error: "", businessName: "", dashboardLoaded: false};
           
        console.log("the businessId: " + this.props.data2);
           
    }

    loadDash() {
        if (this.state.dashboardLoaded == false) {
           
            this.setState({ dashboardLoaded: true });
        }
    }

    render() {

        return (
            <div>
                <EmployeeNav data1={this.props.data1} updateParentState={this.props.updateParentState}></EmployeeNav>
                

                <Redirect to={{
                    pathname: '/dashboard',
                    state: { id: this.props.data2 }
                }}
                />

                {this.props.children}
            </div>
            
            )
    }
}
