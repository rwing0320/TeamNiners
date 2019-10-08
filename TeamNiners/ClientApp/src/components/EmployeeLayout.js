import React, { Component } from 'react';
import axios from 'axios';
import { NavMenu } from './NavMenu';
import { Dashboard } from './Dashboard';
import { Redirect } from 'react-router-dom';
import { Col, Grid, Row, Button, Accordion, Panel } from 'react-bootstrap';
import './LoginPage.css';
import { EmployeeNav } from './EmployeeNav';
import { Layout } from './Layout';
import { EmployeeLogin } from './EmployeeLogin';

export class EmployeeLayout extends Component {
    displayName = EmployeeLayout.name
   

    constructor(props) {
        super(props);
        this.state = { isLoggedIn: false, error: "",  businessName: "" };
              
        this.setBusinessName = this.setBusinessName.bind(this);
           
    }
       

    setBusinessName(bn) {
        console.log("changing business name")
        this.setState({ data1: bn });
    }


    setIsLoggedIn(businessName) {
        this.setState({ isLoggedIn: true, businessName: businessName });
    }

    setIsLoggedOut() {
        this.setState({isLoggedIn: false})
    }

    changePage() {
        if (this.state.isLoggedIn) {
            return <div><EmployeeNav data1={this.state.businessName} updateParentState={this.setIsLoggedOut.bind(this)}></EmployeeNav><Dashboard></Dashboard> <Redirect to='/dashboard' /></div>;
        }
        else {
            return <div><EmployeeLogin updatePageState={this.setIsLoggedIn.bind(this)}></EmployeeLogin> <Redirect to='/login' /></div>;
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
